import type {
  CollectionMetadata,
  RecordedSession,
} from "../src/shared/types.ts";
// Optional browser QA: pnpm install --frozen-lockfile && pnpm exec playwright install --with-deps chromium.
// Run pnpm start separately, then pnpm run test:browser. Never use this data in research.
import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const output = new URL("../.artifacts/browser-qa/", import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1100 },
  acceptDownloads: true,
});
const errors: string[] = [];
const unexpectedRequests: string[] = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("request", (r) => {
  if (!["document", "script", "stylesheet"].includes(r.resourceType()))
    unexpectedRequests.push(r.url());
});
try {
  await page.goto(process.env.BASE_URL ?? "http://localhost:4173");
  await page.locator("#start").waitFor();
  await page.screenshot({
    path: fileURLToPath(new URL("desktop.png", output)),
    fullPage: true,
  });
  assert.equal(await page.locator("#participant option").count(), 21);
  assert.equal(await page.locator("#collection-mode").inputValue(), "formal");
  assert.equal(await page.locator(".progress").getAttribute("aria-valuemax"), "1000");
  await page.locator("#collection-mode").selectOption("pilot");
  assert.equal(await page.locator(".progress").getAttribute("aria-valuemax"), "300");
  await page.locator("#collection-mode").selectOption("formal");
  await page.locator("#start").click();
  assert.equal(await page.locator("#typing-area").isDisabled(), true);
  await page.locator("#participant").selectOption("P01");
  await page.locator("#consent").check();
  await page.locator("#start").click();
  assert.equal(await page.locator("#typing-area").isEnabled(), true);
  await page.keyboard.type("mot ngay hoc tap binh thuong.", { delay: 15 });
  assert.equal(
    await page.locator("#typing-area").inputValue(),
    "mot ngay hoc tap binh thuong.",
  );
  await page.locator("#typing-area").evaluate((el) => {
    el.dataset.qaIdentity = "same-node";
  });
  await page.keyboard.down("a");
  await page.keyboard.down("a");
  await page.keyboard.up("a");
  await page.keyboard.press("Backspace");
  await page
    .locator("#typing-area")
    .evaluate((el) =>
      el.dispatchEvent(
        new CompositionEvent("compositionstart", {
          data: "PRIVATE_COMPOSITION",
        }),
      ),
    );
  await page.keyboard.type("tieengs vieetj", { delay: 15 });
  await page
    .locator("#typing-area")
    .evaluate((el) =>
      el.dispatchEvent(
        new CompositionEvent("compositionend", { data: "PRIVATE_COMPOSITION" }),
      ),
    );
  const before = await page.locator("#typing-area").inputValue();
  assert.equal(
    await page.locator("#typing-area").getAttribute("data-qa-identity"),
    "same-node",
  );
  const pastePrevented = await page
    .locator("#typing-area")
    .evaluate(
      (el) =>
        !el.dispatchEvent(
          new Event("paste", { bubbles: true, cancelable: true }),
        ),
    );
  assert.ok(pastePrevented);
  assert.equal(await page.locator("#typing-area").inputValue(), before);
  await page.locator("h1").click();
  assert.equal(await page.locator("#status").textContent(), "Tạm dừng");
  assert.equal(await page.locator("#typing-area").getAttribute("readonly"), "");
  await page.locator("#resume").click();
  await page.keyboard.type(" tiep tuc", { delay: 15 });
  assert.ok(Number(await page.locator("#count").textContent()) > 40);
  await page.locator("#stop").click();
  assert.equal(await page.locator("#typing-area").inputValue(), "");
  assert.equal(await page.locator("#start").isDisabled(), true);
  const downloadPromise = page.waitForEvent("download");
  await page.locator("#download").click();
  const download = await downloadPromise;
  const downloadPath = await download.path();
  assert.ok(downloadPath);
  const text = await readFile(downloadPath, "utf8");
  const data = JSON.parse(text) as RecordedSession<CollectionMetadata>;
  assert.doesNotMatch(
    text,
    /mot ngay|PRIVATE_COMPOSITION|Key[A-Z]|"key"|"code"|"text"/,
  );
  assert.equal(data.metadata.participant_id, "P01");
  assert.equal(data.metadata.collection_mode, "formal");
  assert.equal(data.metadata.goal_strokes, 1000);
  assert.equal(data.metadata.goal_recording_seconds, 480);
  assert.equal(data.metadata.goal_met, false);
  assert.equal(data.events.at(-1)?.type, "stop");
  assert.ok(data.events.some((e) => e.type === "down" && e.composing));
  assert.ok(data.events.some((e) => e.type === "repeat"));
  assert.ok(data.events.some((e) => e.type === "boundary"));
  assert.equal(await page.locator("#start").isEnabled(), true);
  // Store only a count summary, never a file falsely labelled as participant observations.
  const firstSession = await page.locator("#session-id").textContent();
  await page.locator("#start").click();
  assert.notEqual(
    await page.locator("#session-id").textContent(),
    firstSession,
  );
  assert.equal(await page.locator("#count").textContent(), "0");
  await page.locator("#stop").click();
  await page.setViewportSize({ width: 390, height: 844 });
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  await page.screenshot({
    path: fileURLToPath(new URL("mobile.png", output)),
    fullPage: true,
  });
  assert.deepEqual(errors, []);
  assert.deepEqual(unexpectedRequests, []);
  console.log(
    JSON.stringify({
      result: "passed",
      automated_only: true,
      exported_events: data.events.length,
      completed_strokes: data.events.filter((e) => e.type === "up").length,
      checks: [
        "required fields",
        "keyboard capture",
        "repeat",
        "composition flags",
        "paste blocked",
        "focus pause/resume",
        "JSON privacy",
        "new session reset",
        "mobile layout",
        "no data requests",
        "no JS errors",
      ],
    }),
  );
} finally {
  await browser.close();
}
