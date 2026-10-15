import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
const args = process.argv.slice(2);
const help = "Từ member2: node --experimental-strip-types collector/scripts/demo.ts [--setup-only | --check-only] [--skip-install] [--with-deps] [--port 4173]";
if (args.includes("--help")) {
  console.log(help);
  process.exit(0);
}
let port = 4173;
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--port") {
    port = Number(args[++i]);
    if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Cổng phải từ 1 đến 65535.");
  } else if (!["--setup-only", "--check-only", "--skip-install", "--with-deps"].includes(args[i])) {
    throw new Error(`Tham số không hợp lệ: ${args[i]}\n${help}`);
  }
}
if (args.includes("--setup-only") && (args.includes("--check-only") || args.includes("--skip-install"))) {
  throw new Error("--setup-only không kết hợp với --check-only hoặc --skip-install.");
}
if (args.includes("--with-deps") && args.includes("--skip-install")) {
  throw new Error("--with-deps cần bước cài đặt; không kết hợp với --skip-install.");
}
const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const version = spawnSync(pnpm, ["--version"], { cwd: join(root, "collector"), encoding: "utf8", shell: process.platform === "win32" });
if (version.status !== 0 || version.stdout.trim() !== "12.11.2") {
  throw new Error("Cần pnpm 12.11.2. Chạy corepack enable pnpm rồi chạy lại script.");
}
// Fail before setup if another process already owns the selected port.
if (!args.includes("--setup-only")) await new Promise<void>((resolve, reject) => {
  const probe = createServer();
  probe.once("error", () => reject(new Error(`Cổng ${port} đang bận; dùng --port <cổng khác>.`)));
  probe.listen(port, "0.0.0.0", () => probe.close(() => resolve()));
});
await mkdir(join(root, ".artifacts"), { recursive: true });
const output = await mkdtemp(join(root, ".artifacts/demo-"));
const baseUrl = `http://localhost:${port}`;
const steps: { name: string; result: string; log: string }[] = [];
const active = new Set<ChildProcess>();
let interrupted = false;
const stop = () => {
  interrupted = true;
  for (const child of active) child.kill("SIGTERM");
};
process.on("SIGINT", stop);
process.on("SIGTERM", stop);

async function run(name: string, directory: "collector" | "pipeline", command: string[], node = false): Promise<string> {
  if (interrupted) throw new Error("Đã dừng theo yêu cầu.");
  console.log(`\n▶ ${name}`);
  const log = join(output, `${String(steps.length + 1).padStart(2, "0")}.log`);
  const child = spawn(node ? process.execPath : pnpm, command, {
    cwd: join(root, directory),
    env: { ...process.env, BASE_URL: baseUrl },
    shell: !node && process.platform === "win32",
    stdio: ["ignore", "pipe", "pipe"],
  });
  active.add(child);
  let stdout = "", combined = "";
  child.stdout.on("data", (chunk: Buffer) => { stdout += chunk.toString(); combined += chunk.toString(); process.stdout.write(chunk); });
  child.stderr.on("data", (chunk: Buffer) => { combined += chunk.toString(); process.stderr.write(chunk); });
  const code = await new Promise<number | null>((resolve, reject) => {
    child.once("error", reject);
    child.once("close", resolve);
  }).finally(() => active.delete(child));
  await writeFile(log, combined);
  steps.push({ name, result: code === 0 ? "passed" : "failed", log });
  if (code !== 0 || interrupted) throw new Error(`${name} chưa đạt. Xem ${log}`);
  return stdout;
}

let server: ChildProcess | undefined;
let serverClosed: Promise<void> | undefined;
let failure: string | undefined;
try {
  if (!args.includes("--skip-install")) {
    for (const directory of ["pipeline", "collector"] as const) {
      await run(`Cài thư viện ${directory}`, directory, ["install", "--frozen-lockfile"]);
      await run(`Cài Chromium ${directory}`, directory, ["exec", "playwright", "install", ...(args.includes("--with-deps") ? ["--with-deps"] : []), "chromium"]);
    }
  }
  if (args.includes("--setup-only")) {
    for (const directory of ["pipeline", "collector"] as const) {
      await run(`Biên dịch ${directory}`, directory, ["run", "build"]);
    }
    await writeFile(join(output, "result.json"), JSON.stringify({ result: "passed", mode: "setup", generated_at_utc: new Date().toISOString(), steps }, null, 2));
    console.log(`\n✓ Cài đặt và biên dịch hoàn tất.\nNhật ký: ${output}\nTiếp theo: make check hoặc make run`);
  } else {
    await run("Kiểm thử quy trình xử lý", "pipeline", ["test"]);
    await run("Kiểm thử và biên dịch công cụ thu", "collector", ["test"]);
    server = spawn(process.execPath, ["--import", "tsx", "server/dev.ts"], {
      cwd: join(root, "collector"), env: { ...process.env, PORT: String(port) }, stdio: ["ignore", "pipe", "pipe"],
    });
    active.add(server);
    let serverError: Error | undefined;
    server.on("error", (error) => { serverError = error; });
    let serverLog = "";
    server.stdout?.on("data", (chunk: Buffer) => { serverLog += chunk.toString(); });
    server.stderr?.on("data", (chunk: Buffer) => { serverLog += chunk.toString(); });
    serverClosed = new Promise((resolve) => server!.once("close", () => resolve()));
    const deadline = Date.now() + 30_000;
    while (true) {
      if (interrupted || serverError || server.exitCode !== null || server.signalCode !== null) throw new Error(`Máy chủ đã dừng: ${serverError?.message ?? serverLog}`);
      try {
        const response = await fetch(`${baseUrl}/api/health`, { signal: AbortSignal.timeout(1000) });
        const health = await response.json() as { status?: string; app?: string };
        if (response.ok && health.status === "ok" && health.app === "aissec-keystroke-collector") {
          const log = join(output, "health.json");
          await writeFile(log, JSON.stringify(health, null, 2));
          steps.push({ name: "Sức khỏe máy chủ", result: "passed", log });
          break;
        }
      } catch (error) {
        if (error instanceof Error && error.cause instanceof Error && error.cause.message === "bad port") {
          throw new Error(`Cổng ${port} bị trình duyệt chặn; dùng --port 4180.`);
        }
        // Wait until the server is ready, within the startup deadline.
      }
      if (Date.now() > deadline) throw new Error(`Máy chủ không sẵn sàng sau 30 giây. ${serverLog}`);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    const smoke = await run("Kiểm tra giao diện và riêng tư trên trình duyệt", "collector", ["run", "test:browser"]);
    await writeFile(join(output, "browser-smoke.json"), JSON.stringify(JSON.parse(smoke.trim().split("\n").reverse().find((line) => line.startsWith("{"))!), null, 2));
    const profiles = await run("Thu 12 phiên tự động cho bốn hồ sơ", "collector", ["run", "test:four-profiles"]);
    const qa = JSON.parse(profiles.trim().split("\n").reverse().find((line) => line.startsWith("{"))!) as { result: string; automated_only: boolean; output: string };
    if (qa.result !== "passed" || !qa.automated_only) throw new Error("Kết quả thu tự động không hợp lệ.");
    await run("Đưa dữ liệu thu qua quy trình xử lý", "pipeline", ["run", "verify:browser", qa.output, join(output, "browser-integration.json")]);
    await run("Đối chiếu tái lập bộ dữ liệu chính thức", "pipeline", ["run", "verify:reproducibility", join(root, "artifacts"), join(output, "reproducibility.json")]);
    for (const target of ["SIM01", "SIM02", "SIM03", "SIM04"]) {
      const handoff = await run(`Kiểm tra bàn giao ${target}`, "pipeline", ["dist/examples/handoff.js", join(root, "artifacts/processed"), target], true);
      const result = JSON.parse(handoff) as { shape: number[]; claimed_profile: string };
      if (result.claimed_profile !== target || result.shape.join(",") !== "192,12") throw new Error(`Kích thước bàn giao ${target} không đúng.`);
      await writeFile(join(output, `handoff-${target}.json`), handoff);
    }
    await run("Xuất PDF báo cáo", "pipeline", ["run", "export:pdf", join(root, "artifacts/processed/report.vi.html"), join(output, "report.vi.pdf")]);
    const pdf = await readFile(join(output, "report.vi.pdf"));
    if (pdf.subarray(0, 5).toString() !== "%PDF-") throw new Error("Đầu ra báo cáo không phải PDF.");
    console.log(`\n✓ Tất cả kiểm tra đạt.\nCông cụ thu: ${baseUrl}\nBáo cáo: ${pathToFileURL(join(root, "artifacts/processed/report.vi.html"))}\nKết quả và PDF mới: ${output}\nDữ liệu tự động (chỉ QA): ${qa.output}`);
    await writeFile(join(output, "result.json"), JSON.stringify({ result: "passed", generated_at_utc: new Date().toISOString(), base_url: baseUrl, automated_only: true, qa_directory: qa.output, steps }, null, 2));
    if (!args.includes("--check-only")) {
      console.log("Máy chủ đang mở để demo. Nhấn Ctrl+C để kết thúc.");
      await serverClosed;
      if (!interrupted) throw new Error(`Máy chủ dừng ngoài dự kiến. ${serverLog}`);
    }
  }
} catch (error) {
  failure = error instanceof Error ? error.message : String(error);
  console.error(`\n✗ ${failure}\nNhật ký: ${output}`);
  await writeFile(join(output, "result.json"), JSON.stringify({ result: interrupted ? "interrupted" : "failed", error: failure, steps }, null, 2));
  process.exitCode = interrupted ? 130 : 1;
} finally {
  stop();
  if (serverClosed) {
    const timer = setTimeout(() => server?.kill("SIGKILL"), 5000);
    await serverClosed;
    clearTimeout(timer);
  }
}
