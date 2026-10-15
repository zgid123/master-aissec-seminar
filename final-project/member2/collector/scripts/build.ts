import type { CollectorServer } from "../src/server/types.ts";
import { build } from "esbuild";
import { createHash } from "node:crypto";
import { readFile, mkdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const client = await build({
  absWorkingDir: root,
  entryPoints: ["src/client/main.tsx"],
  bundle: true,
  write: false,
  format: "esm",
  platform: "browser",
  target: "es2022",
  minify: true,
  jsx: "automatic",
  define: { "process.env.NODE_ENV": '"production"' },
});
const js = client.outputFiles[0].text;
const css = await readFile(
  new URL("../src/client/style.css", import.meta.url),
  "utf8",
);
const hash = (text: string) =>
  createHash("sha256").update(text).digest("hex").slice(0, 16);
const jsPath = `/assets/app.${hash(js)}.js`;
const cssPath = `/assets/style.${hash(css)}.css`;
const html = (
  await readFile(new URL("../src/index.html", import.meta.url), "utf8")
)
  .replace("__JS_PATH__", jsPath)
  .replace("__CSS_PATH__", cssPath);
const assets = {
  [jsPath]: { body: js, contentType: "text/javascript; charset=utf-8" },
  [cssPath]: { body: css, contentType: "text/css; charset=utf-8" },
};
const virtualSource = `export const html=${JSON.stringify(html)};export const assets=${JSON.stringify(assets)};`;
const output = new URL("../dist/", import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(new URL("server/", output), { recursive: true });
await build({
  absWorkingDir: root,
  entryPoints: ["src/server/index.ts"],
  outfile: "dist/server/index.js",
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2022",
  minify: true,
  plugins: [
    {
      name: "embedded-assets",
      setup(build) {
        build.onResolve({ filter: /^virtual:assets$/ }, () => ({
          path: "assets",
          namespace: "embedded",
        }));
        build.onLoad({ filter: /.*/, namespace: "embedded" }, () => ({
          contents: virtualSource,
          loader: "js",
        }));
      },
    },
  ],
});
// Verify the standalone Hono module used by the local Node server.
const code = await readFile(new URL("server/index.js", output), "utf8");
const { default: worker } = (await import(
  `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`
)) as { default: CollectorServer };
if (typeof worker?.fetch !== "function")
  throw new Error("Worker must export default.fetch");
const response = await worker.fetch(
  new Request("https://test.local/api/health"),
);
if (
  !response.ok ||
  ((await response.json()) as { status?: string }).status !== "ok"
)
  throw new Error("Worker health check failed");
console.log(
  `Built React client + Hono Worker (${Buffer.byteLength(code)} bytes).`,
);
