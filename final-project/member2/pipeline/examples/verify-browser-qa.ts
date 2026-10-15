import assert from "node:assert/strict";
import { access, mkdtemp } from "node:fs/promises";
import { join, resolve } from "node:path";
import {
  readJson,
  readCsv,
  saveJson,
  packageRoot,
  groupBy,
  unique,
} from "../src/io.js";
import {
  processDataset,
  FEATURE_COLUMNS,
  fitNormalizers,
  transformWindows,
  validateSession,
  extractWindows,
} from "../src/index.js";
import type {
  Config,
  Window,
  Stroke,
  Normalizers,
  QualityDetails,
  Row,
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
await assert.rejects(access(join(output, "report.md")));
const windows = await readCsv<Window>(join(output, "windows.csv")),
  strokes = await readCsv<Stroke>(join(output, "strokes.csv")),
  quality = await readJson<QualityDetails[]>(
    join(output, "quality_details.json"),
  ),
  parameters = await readJson<Normalizers>(join(output, "normalizers.json"));
assert.equal(quality.length, 12);
assert.equal(unique(windows.map((w) => w.participant_id)).length, 4);
assert.ok(
  groupBy(windows, ["session_id"]).every(
    (g) => unique(g.map((w) => w.split)).length === 1,
  ),
);
assert.ok(
  groupBy(windows, ["participant_id"]).every(
    (g) => unique(g.map((w) => w.split)).length === 3,
  ),
);
assert.deepEqual(
  unique(windows.map((w) => w.window_size)).sort((a, b) => a - b),
  [20, 50, 100],
);
assert.ok(
  quality.every(
    (q) =>
      q.exclusion_reasons.missing_up === 1 &&
      q.interruptions === 2 &&
      q.repeats >= 1 &&
      q.composition_strokes > 0 &&
      q.valid_strokes < 300 &&
      q.recording_seconds < 300,
  ),
);
for (const feature of [
  "negative_flight_proportion",
  "pause_proportion",
  "correction_proportion",
])
  assert.ok(windows.some((w) => Number(w[feature]) > 0));
const tails = await readCsv<Row>(join(output, "window_tails.csv"));
assert.ok(tails.some((r) => Number(r.dropped_tail_strokes) > 0));
for (const w of windows) {
  const g = strokes.filter(
    (s) => s.session_id === w.session_id && s.segment_id === w.segment_id,
  );
  assert.ok(
    w.start_ms >= Math.min(...g.map((s) => s.down_ms)) - 1e-4 &&
      w.end_ms <= Math.max(...g.map((s) => s.up_ms)) + 1e-4,
  );
}
const altered = windows.map((w) =>
  w.split === "train"
    ? w
    : { ...w, ...Object.fromEntries(FEATURE_COLUMNS.map((f) => [f, 999999])) },
);
const refitted = fitNormalizers(windows);
assert.deepEqual(fitNormalizers(altered), refitted);
const close = (a: number, b: number) =>
  assert.ok(Math.abs(a - b) <= 1e-6 + 1e-6 * Math.abs(b), `${a} != ${b}`);
// Verify full-precision fits from raw events; CSV's nine significant digits can
// amplify relative error when MAD is small compared with a feature's magnitude.
const manifest = await readJson<ManifestRow[]>(join(root, "manifest.json")),
  rawWindows: Window[] = [];
for (const row of manifest) {
  const validated = validateSession(
    await readJson(join(root, row.file)),
    row.split,
  );
  rawWindows.push(
    ...extractWindows(
      validated.strokes,
      config.window_sizes,
      config.pause_threshold_ms,
    ).windows,
  );
}
const fullPrecision = fitNormalizers(rawWindows);
assert.deepEqual(fullPrecision, parameters);
for (const [key, p] of Object.entries(refitted.profiles))
  for (const field of ["median", "scale"] as const)
    p[field].forEach((v, i) => {
      const training = windows.filter(
        (w) =>
          w.split === "train" && `${w.participant_id}:${w.window_size}` === key,
      );
      const maxRounding = Math.max(
        ...training.map((w) => {
          const x = Math.abs(Number(w[FEATURE_COLUMNS[i]]));
          return x === 0 ? 0 : 0.5 * 10 ** (Math.floor(Math.log10(x)) - 8);
        }),
      );
      const bound =
        field === "scale"
          ? 2 * parameters.scale_factor * maxRounding
          : maxRounding;
      assert.ok(
        Math.abs(v - parameters.profiles[key][field][i]) <= bound + 1e-9,
        `CSV fit exceeds serialization error bound: ${key} ${field} ${FEATURE_COLUMNS[i]}`,
      );
    });
const candidates = windows.filter(
    (w) => w.split === "test" && w.window_size === 50,
  ),
  targets = [];
for (const target of unique(windows.map((w) => w.participant_id)).sort()) {
  const transformed = transformWindows(candidates, parameters, target),
    fitted = parameters.profiles[`${target}:50`];
  transformed.forEach((w, i) => {
    assert.equal(w.claimed_profile, target);
    assert.equal(w.participant_id, candidates[i].participant_id);
    FEATURE_COLUMNS.forEach((f, j) => {
      assert.ok(Number.isFinite(w[f]));
      close(
        Number(w[f]),
        fitted.active[j]
          ? (Number(candidates[i][f]) - fitted.median[j]) / fitted.scale[j]
          : 0,
      );
    });
  });
  targets.push({
    claimed_profile: target,
    shape: [transformed.length, FEATURE_COLUMNS.length],
    active_features: fitted.active.filter(Boolean).length,
  });
}
const result = {
  ...browser,
  pipeline_result: "passed",
  runtime: "TypeScript / Node.js",
  generated_at_utc: run.generated_at_utc,
  valid_strokes: strokes.length,
  windows_by_size: Object.fromEntries(
    groupBy(windows, ["window_size"]).map((g) => [g[0].window_size, g.length]),
  ),
  excluded_missing_releases: quality.reduce((s, q) => s + q.excluded_pairs, 0),
  targets,
  checks: [
    "privacy",
    "four profiles and twelve unique sessions",
    "short-session warning",
    "missing releases",
    "composition flags",
    "repeats",
    "negative flight",
    "corrections",
    "long pause",
    "segment boundaries",
    "partial tails",
    "session-isolated splits",
    "train-only fitting",
    "four target normalizers",
    "finite model inputs",
    "no research report",
  ],
};
await saveJson(join(root, "integration-result.json"), result);
if (process.argv[3]) await saveJson(process.argv[3], result);
console.log(JSON.stringify(result, null, 2));
