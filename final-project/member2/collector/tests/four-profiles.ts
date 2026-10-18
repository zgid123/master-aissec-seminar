import type {
  CollectionMetadata,
  RecordedSession,
} from "../src/shared/types.ts";
// Automated workflow QA only. Exports retain the collector schema's `real` value,
// but are quarantined here and must never enter participant/research manifests.
import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const output = new URL(
  `../.artifacts/four-profiles-${Date.now()}/`,
  import.meta.url,
);
await mkdir(output, { recursive: true });
await writeFile(
  new URL("QA_ONLY.txt", output),
  "AUTOMATED BROWSER FIXTURES. No participants or consent. Never use as research observations. data_kind reflects collector schema only.\n",
);
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const page = await browser.newPage({ acceptDownloads: true });
const errors: string[] = [],
  requests: string[] = [];
const manifest: {
  file: string;
  participant_id: string;
  session_id: string;
  data_kind: "real";
  split: "train" | "validation" | "test";
}[] = [];
const sessions: {
  participant_id: string;
  split: string;
  session_id: string;
  exported_events: number;
  input_sha256: string;
}[] = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("request", (request) => {
  if (!["document", "script", "stylesheet"].includes(request.resourceType()))
    requests.push(request.url());
});
const text = "automated workflow sample ".repeat(5); // 130 complete physical strokes
try {
  await page.goto(process.env.BASE_URL ?? "http://localhost:4173");
  await page.locator("#start").waitFor();
  for (let profile = 1; profile <= 4; profile++) {
    const participant = `P0${profile}`;
    await page.locator("#participant").selectOption(participant);
    await page.locator("#collection-mode").selectOption("pilot");
    await page.locator("#consent").check(); // Form behavior only, no human consent.
    for (const split of ["train", "validation", "test"] as const) {
      await page.locator("#start").click();
      assert.equal(await page.locator("#count").textContent(), "0");
      await page.keyboard.type(text.slice(0, 30), { delay: profile });
      if (profile === 1 && split === "test") {
        await page.waitForTimeout(2100); // Pause inside a complete 50/100-key window.
      }
      await page.keyboard.type(text.slice(30), { delay: profile });
      // Overlap produces a valid negative flight; repeated down is diagnostic.
      await page.keyboard.down("a");
      await page.keyboard.down("a");
      await page.keyboard.down("b");
      await page.keyboard.up("a");
      await page.keyboard.up("b");
      await page.keyboard.press("Backspace");
      await page
        .locator("#typing-area")
        .evaluate((el) =>
          el.dispatchEvent(
            new CompositionEvent("compositionstart", {
              data: "QA_PRIVATE_COMPOSITION",
            }),
          ),
        );
      await page.keyboard.type("tieengs", { delay: profile });
      await page
        .locator("#typing-area")
        .evaluate((el) =>
          el.dispatchEvent(
            new CompositionEvent("compositionend", {
              data: "QA_PRIVATE_COMPOSITION",
            }),
          ),
        );
      // Lose a release at a focus boundary, then start a fresh segment.
      await page.keyboard.down("z");
      await page.locator("h1").click();
      await page.keyboard.up("z");
      assert.equal(await page.locator("#status").textContent(), "Tạm dừng");
      await page.locator("#resume").click();
      await page.keyboard.type(text, { delay: profile });
      await page.locator("#stop").click();
      assert.match(
        (await page.locator("#notice").textContent()) ?? "",
        /Chưa đạt mục tiêu pilot/,
      );
      assert.equal(await page.locator("#typing-area").inputValue(), "");
      const pending = page.waitForEvent("download");
      await page.locator("#download").click();
      const download = await pending;
      const downloadPath = await download.path();
      assert.ok(downloadPath);
      const raw = await readFile(downloadPath, "utf8");
      assert.doesNotMatch(
        raw,
        /automated workflow sample|QA_PRIVATE_COMPOSITION|"key"|"code"|"text"/,
      );
      const data = JSON.parse(raw) as RecordedSession<CollectionMetadata>;
      assert.equal(data.data_kind, "real");
      assert.equal(data.metadata.participant_id, participant);
      assert.equal(data.metadata.collection_mode, "pilot");
      assert.equal(data.metadata.goal_met, false);
      assert.equal(data.events.at(-1)?.type, "stop");
      assert.ok(data.events.some((event) => event.type === "repeat"));
      assert.ok(
        data.events.some((event) => event.type === "down" && event.composing),
      );
      assert.ok(data.events.some((event) => event.type === "boundary"));
      const file = `${participant}_${split}.json`;
      await writeFile(new URL(file, output), raw);
      manifest.push({
        file,
        participant_id: participant,
        session_id: data.metadata.session_id,
        data_kind: "real",
        split,
      });
      sessions.push({
        participant_id: participant,
        split,
        session_id: data.metadata.session_id,
        exported_events: data.events.length,
        input_sha256: createHash("sha256").update(raw).digest("hex"),
      });
    }
  }
  assert.equal(new Set(sessions.map((session) => session.session_id)).size, 12);
  assert.deepEqual(errors, []);
  assert.deepEqual(requests, []);
  await writeFile(
    new URL("manifest.json", output),
    JSON.stringify(manifest, null, 2),
  );
  const result = {
    result: "passed",
    automated_only: true,
    participant_observations: 0,
    collector_data_kind: "real",
    provenance_note:
      "Collector schema value is not evidence of human observation. All files are automated QA fixtures.",
    sessions,
    browser_errors: errors,
    unexpected_requests: requests,
  };
  await writeFile(
    new URL("browser-result.json", output),
    JSON.stringify(result, null, 2),
  );
  console.log(
    JSON.stringify({
      result: "passed",
      automated_only: true,
      sessions: sessions.length,
      output: fileURLToPath(output),
    }),
  );
} finally {
  await browser.close();
}
