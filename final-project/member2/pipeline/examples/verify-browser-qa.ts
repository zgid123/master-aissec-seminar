import assert from "node:assert/strict";
import { access, mkdtemp, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import {
  readJson,
  readCsv,
  saveJson,
  packageRoot,
  unique,
} from "../src/io.js";
import {
  processDataset,
  FEATURE_COLUMNS,
  validateSession,
  extractWindows,
} from "../src/index.js";
import type {
  Config,
  Window,
  QualityDetails,
  ManifestRow,
} from "../src/types.js";

const root = resolve(process.argv[2]);
await access(join(root, "QA_ONLY.txt"));
const browser = await readJson<{
  automated_only: boolean;
  participant_observations: number;
}>(join(root, "browser-result.json"));
assert.ok(browser.automated_only && browser.participant_observations === 0);
const config = await readJson<Config>(join(packageRoot, "config.json")),
  output = await mkdtemp(join(root, "processed-qa-"));
const run = await processDataset(
  root,
  join(root, "manifest.json"),
  config,
  output,
);
assert.equal(run.status, "complete");
assert.equal(run.rejected_files, 0);
const report = await readFile(join(output, "report.vi.html"), "utf8");
assert.match(report, /DỮ LIỆU NGƯỜI THAM GIA/);
assert.match(report, /Không có phiên đủ điều kiện/);
assert.doesNotMatch(report, /P01|P02|P03|P04/);
const windows = await readCsv<Window>(join(output, "windows.csv")),
  processedStrokes = await readCsv(join(output, "strokes.csv")),
  quality = await readJson<QualityDetails[]>(
    join(output, "quality_details.json"),
  ),
  parameters = await readJson<{ profiles: Record<string, unknown> }>(
    join(output, "normalizers.json"),
  );
assert.equal(quality.length, 12);
assert.equal(windows.length, 0);
assert.equal(processedStrokes.length, 0);
assert.equal(Object.keys(parameters.profiles).length, 0);
assert.ok(
  quality.every(
    (q) =>
      q.collection_mode === "pilot" &&
      q.research_eligible === false &&
      q.eligibility_reasons.includes("pilot_mode") &&
      q.exclusion_reasons.missing_up === 1 &&
      q.interruptions === 2 &&
      q.repeats >= 1 &&
      q.composition_strokes > 0 &&
      q.valid_strokes < 300 &&
      q.recording_seconds < 300,
  ),
);
const manifest = await readJson<ManifestRow[]>(join(root, "manifest.json")),
  observedWindows: Window[] = [];
let validStrokeCount = 0;
for (const row of manifest) {
  const validated = validateSession(
      await readJson(join(root, row.file)),
      row.split,
    ),
    extracted = extractWindows(
      validated.strokes,
      config.window_sizes,
      config.pause_threshold_ms,
    );
  validStrokeCount += validated.strokes.length;
  observedWindows.push(...extracted.windows);
}
assert.ok(validStrokeCount > 0);
assert.ok(observedWindows.length > 0);
assert.deepEqual(
  unique(observedWindows.map((w) => w.window_size)).sort((a, b) => a - b),
  [20, 50, 100],
);
assert.ok(
  observedWindows.every((window) =>
    FEATURE_COLUMNS.every((feature) => Number.isFinite(window[feature])),
  ),
);
const result = {
  ...browser,
  pipeline_result: "passed",
  runtime: "TypeScript / Node.js",
  generated_at_utc: run.generated_at_utc,
  raw_valid_strokes: validStrokeCount,
  raw_feature_windows: observedWindows.length,
  research_feature_windows: windows.length,
  pilot_sessions_retained_for_quality: quality.length,
  checks: [
    "privacy",
    "four automated profiles and twelve unique sessions",
    "short-session warnings and recomputed targets",
    "missing releases, composition flags, repeats and interruptions",
    "raw event parsing and finite feature extraction at W=20/50/100",
    "pilot fixtures retained in quality outputs and excluded from research features",
    "aggregate quality report contains no participant IDs",
  ],
};
await saveJson(join(root, "integration-result.json"), result);
if (process.argv[3]) await saveJson(process.argv[3], result);
console.log(JSON.stringify(result, null, 2));
