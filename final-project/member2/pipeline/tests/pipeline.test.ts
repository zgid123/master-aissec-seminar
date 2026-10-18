import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, readFile, symlink, access } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import {
  validateSession,
  extractWindows,
  fitNormalizers,
  transformWindows,
  FEATURE_COLUMNS,
  generateSession,
  generateDataset,
  processDataset,
} from "../src/index.js";
import { Random, sessionSeed } from "../src/generate.js";
import {
  readJson,
  readCsv,
  saveJson,
  packageRoot,
  filesUnder,
  digest,
  unique,
} from "../src/io.js";
import type {
  Session,
  Config,
  Window,
  ManifestRow,
  Normalizers,
} from "../src/types.js";
const config = await readJson<Config>(join(packageRoot, "config.json"));
function sample(): Session {
  return {
    schema_version: "1.0",
    data_kind: "synthetic",
    metadata: { participant_id: "SIM01", session_id: "sample" },
    events: [
      { type: "start", t_ms: 0 },
      { type: "down", t_ms: 10, pair_id: 1, group: "typing", composing: false },
      {
        type: "down",
        t_ms: 20,
        pair_id: 2,
        group: "correction",
        composing: true,
      },
      { type: "up", t_ms: 50, pair_id: 1, group: "typing", composing: false },
      {
        type: "up",
        t_ms: 80,
        pair_id: 2,
        group: "correction",
        composing: true,
      },
      { type: "stop", t_ms: 90 },
    ],
  };
}
const close = (a: number, b: number) =>
  assert.ok(Math.abs(a - b) <= 1e-6 + 1e-6 * Math.abs(b), `${a} != ${b}`);
test("hand-calculated features, quartiles, overlap, proportions and rate", () => {
  const { strokes, quality } = validateSession(sample(), "train"),
    { windows, tails } = extractWindows(strokes, [2]),
    w = windows[0];
  assert.deepEqual(
    strokes.map((s) => s.dwell_ms),
    [40, 60],
  );
  assert.deepEqual(
    [
      w.dwell_median_ms,
      w.dwell_iqr_ms,
      w.dwell_mad_ms,
      w.flight_median_ms,
      w.down_down_median_ms,
    ],
    [50, 10, 10, -30, 10],
  );
  close(Number(w.strokes_per_minute), 120000 / 70);
  assert.deepEqual(
    [
      w.correction_proportion,
      w.composing_proportion,
      w.negative_flight_proportion,
      w.pause_proportion,
    ],
    [0.5, 0.5, 1, 0],
  );
  assert.equal(quality.composition_strokes, 1);
  assert.equal(tails[0].dropped_tail_strokes, 0);
});
test("collection goals are derived from accepted strokes and active recording time", () => {
  const data = sample();
  data.data_kind = "real";
  data.metadata.collection_mode = "formal";
  const formal = validateSession(data, "train").quality;
  assert.equal(formal.collection_mode, "formal");
  assert.equal(formal.target_strokes, 1000);
  assert.equal(formal.target_recording_seconds, 480);
  assert.equal(formal.stroke_target_met, false);
  assert.equal(formal.recording_target_met, false);
  assert.equal(formal.session_target_met, false);
  delete data.metadata.collection_mode;
  assert.equal(validateSession(data, "train").quality.collection_mode, "unspecified");
});
for (const bad of [NaN, Infinity, -1, true, "10"])
  test(`invalid timestamp ${String(bad)} rejected`, () => {
    const d = sample();
    (d.events[1] as unknown as Record<string, unknown>).t_ms = bad;
    assert.throws(() => validateSession(d, "train"), /timestamp/);
  });
test("unsorted timestamps rejected", () => {
  const d = sample();
  d.events[2].t_ms = 1;
  assert.throws(() => validateSession(d, "train"), /timestamp/);
});
for (const part of ["session", "metadata", "event"])
  test(`malformed ${part} rejected`, () => {
    const d: Record<string, unknown> = sample() as unknown as Record<
      string,
      unknown
    >;
    if (part === "metadata") d.metadata = "bad";
    if (part === "event") (d.events as unknown[])[0] = "bad";
    assert.throws(() => validateSession(part === "session" ? [] : d, "train"));
  });
test("missing release breaks adjacency and contributes tails", () => {
  const d = sample();
  d.events.splice(2, 0, {
    type: "down",
    t_ms: 15,
    pair_id: 3,
    group: "typing",
    composing: false,
  });
  const { strokes, quality } = validateSession(d, "train");
  assert.deepEqual(quality.exclusion_reasons, { missing_up: 1 });
  assert.equal(unique(strokes.map((s) => s.segment_id)).length, 2);
  const { windows, tails } = extractWindows(strokes, [2]);
  assert.equal(windows.length, 0);
  assert.equal(
    tails.reduce((a, t) => a + Number(t.dropped_tail_strokes), 0),
    2,
  );
});
test("duplicate release excludes entire pair", () => {
  const d = sample();
  d.events.splice(4, 0, { ...d.events[3], t_ms: 55 });
  const { strokes, quality } = validateSession(d, "train");
  assert.deepEqual(quality.exclusion_reasons, { duplicate_pair_events: 1 });
  assert.deepEqual(
    strokes.map((s) => s.pair_id),
    [2],
  );
});
test("cross-boundary pairs excluded; paused time removed", () => {
  const d = sample();
  d.events.splice(
    3,
    0,
    { type: "boundary", t_ms: 30 },
    { type: "resume", t_ms: 40 },
  );
  const { strokes, quality } = validateSession(d, "validation");
  assert.equal(strokes.length, 0);
  assert.deepEqual(quality.exclusion_reasons, { cross_boundary_pair: 2 });
  close(quality.recording_seconds, 0.08);
  close(quality.paused_seconds, 0.01);
});
test("repeat is diagnostic and long pause is retained", () => {
  const d = sample();
  d.events.splice(3, 0, { type: "repeat", t_ms: 30 });
  let v = validateSession(d, "train");
  assert.equal(v.strokes.length, 2);
  assert.equal(v.quality.repeats, 1);
  for (const e of d.events)
    if (e.pair_id === 2 || e.type === "stop") e.t_ms += 3000;
  d.events.sort((a, b) => a.t_ms - b.t_ms);
  v = validateSession(d, "train");
  const w = extractWindows(v.strokes, [2]).windows[0];
  assert.equal(w.pause_proportion, 1);
  assert.equal(w.flight_median_ms, 2970);
  assert.ok(Number(w.strokes_per_minute) < 40);
});
test("state and schema errors fail predictably", () => {
  for (const type of ["unknown", "resume", "start", "stop"]) {
    const d = sample();
    d.events.splice(1, 0, { type, t_ms: 1 });
    assert.throws(() => validateSession(d, "train"));
  }
  const d = sample();
  d.events.splice(1, 0, { type: "boundary", t_ms: 1 });
  assert.throws(() => validateSession(d, "train"), /paused/);
  assert.throws(
    () => validateSession({ ...sample(), schema_version: "2.0" }, "train"),
    /schema/,
  );
  assert.throws(() => validateSession(sample(), "bad" as "train"), /split/);
});
test("group mismatch, composition mismatch, missing down and negative dwell excluded", () => {
  for (const reason of [
    "invalid_group",
    "invalid_composition_flag",
    "missing_down",
    "negative_dwell",
  ]) {
    const d = sample();
    if (reason === "invalid_group") d.events[3].group = "correction";
    if (reason === "invalid_composition_flag") d.events[3].composing = true;
    if (reason === "missing_down") d.events.splice(1, 1);
    if (reason === "negative_dwell") {
      d.events[1].t_ms = 60;
      d.events.sort((a, b) => a.t_ms - b.t_ms);
    }
    assert.equal(
      validateSession(d, "train").quality.exclusion_reasons[reason],
      1,
    );
  }
});
test("generator deterministic, independent per session, timing-only and synthetic", () => {
  const a = generateSession(config, config.profiles[0], 1, 1),
    b = generateSession(config, config.profiles[0], 1, 1),
    c = generateSession(config, config.profiles[0], 2, 1);
  assert.deepEqual(a, b);
  assert.notDeepEqual(a, c);
  assert.equal(a.data_kind, "synthetic");
  assert.equal(typeof a.metadata.seed, "string");
  assert.match(String(a.metadata.seed), /^[a-f0-9]{32}$/);
  for (const e of a.events)
    assert.ok(!["key", "code", "text", "data"].some((k) => k in e));
  assert.ok(!("consent" in a.metadata) && !("started_at" in a.metadata));
  const { strokes, quality } = validateSession(a, "train");
  assert.equal(strokes.length, 1200);
  assert.equal(quality.excluded_pairs, 2);
  assert.equal(quality.interruptions, 2);
  assert.ok(
    quality.paused_seconds > 0 &&
      quality.recording_seconds < quality.wall_seconds,
  );
  assert.ok(strokes.every((s) => s.dwell_ms > 0 && !s.composing));
});
test("PRNG fixed reference stream and session seed contract", () => {
  // xoshiro128** published transition: [1,2,3,4] starts with output 11520.
  const rng = new Random("00000001000000020000000300000004");
  assert.equal(rng.uniform() * 4294967296, 11520);
  assert.equal(rng.uniform() * 4294967296, 0);
  assert.equal(rng.uniform() * 4294967296, 5927040);
  assert.equal(sessionSeed(42, "SIM01", 1, 1).length, 32);
  assert.notEqual(
    sessionSeed(42, "SIM01", 1, 1),
    sessionSeed(42, "SIM01", 1, 2),
  );
});
test("window sizes and partial tails; reject invalid sizes", () => {
  const { strokes } = validateSession(
    generateSession(config, config.profiles[0], 1, 1),
    "train",
  );
  const full = extractWindows(strokes);
  assert.deepEqual(
    [20, 50, 100].map(
      (s) => full.windows.filter((w) => w.window_size === s).length,
    ),
    [60, 24, 12],
  );
  assert.ok(full.tails.every((t) => t.dropped_tail_strokes === 0));
  const partial = extractWindows(
    strokes.filter((s) => s.segment_id === 0).slice(0, 103),
  );
  assert.deepEqual(
    [20, 50, 100].map(
      (s) => partial.windows.filter((w) => w.window_size === s).length,
    ),
    [5, 2, 1],
  );
  assert.deepEqual(
    partial.tails.map((t) => t.dropped_tail_strokes),
    [3, 3, 3],
  );
  for (const sizes of [[1], [2, 2], [2.5]])
    assert.throws(() => extractWindows(strokes, sizes));
});
function normalizationFixture(): Window[] {
  const rows: Window[] = [];
  for (const [participant, base] of [
    ["SIM01", 10],
    ["SIM02", 100],
  ] as const) {
    for (const [split, count] of [
      ["train", 3],
      ["validation", 1],
      ["test", 1],
    ] as const)
      for (let i = 0; i < count; i++)
        rows.push({
          participant_id: participant,
          session_id: participant + split,
          data_kind: "synthetic",
          segment_id: 0,
          window_id: `${participant}_${split}_${i}`,
          window_size: 50,
          split,
          start_ms: 0,
          end_ms: 1,
          ...Object.fromEntries(
            FEATURE_COLUMNS.map((f) => [f, base + (split === "train" ? i : 5)]),
          ),
        });
  }
  return rows;
}
test("fit uses train only, claimed target and immutable inputs", () => {
  const w = normalizationFixture(),
    copy = structuredClone(w),
    p = fitNormalizers(w),
    altered = w.map((r) =>
      r.split === "train"
        ? r
        : {
            ...r,
            ...Object.fromEntries(FEATURE_COLUMNS.map((f) => [f, 999999])),
          },
    );
  assert.deepEqual(fitNormalizers(altered), p);
  const impostor = w.filter(
      (r) => r.participant_id === "SIM02" && r.split === "test",
    ),
    x = transformWindows(impostor, p, "SIM01")[0];
  close(Number(x[FEATURE_COLUMNS[0]]), (105 - 11) / 1.4826);
  assert.equal(x.claimed_profile, "SIM01");
  assert.equal(x.participant_id, "SIM02");
  assert.deepEqual(w, copy);
});
test("zero MAD inactive mask produces finite zeros", () => {
  const w = normalizationFixture();
  w.filter((r) => r.split === "train").forEach(
    (r) => (r[FEATURE_COLUMNS[0]] = 5),
  );
  const p = fitNormalizers(w);
  assert.equal(p.profiles["SIM01:50"].active[0], false);
  const x = transformWindows(w, p);
  assert.ok(
    x.every(
      (r) =>
        r[FEATURE_COLUMNS[0]] === 0 &&
        FEATURE_COLUMNS.every((f) => Number.isFinite(r[f])),
    ),
  );
});
test("missing training profiles are omitted; transform, contract and finite checks stay strict", () => {
  const w = normalizationFixture(),
    p = fitNormalizers(w);
  const noTrain = fitNormalizers(
    w.map((r) =>
      r.participant_id === "SIM02" ? { ...r, split: "test" } : r,
    ),
  );
  assert.equal(noTrain.profiles["SIM02:50"], undefined);
  assert.throws(() => transformWindows(w, noTrain), /No training/);
  assert.throws(() => transformWindows(w, p, "MISSING"), /No training/);
  assert.throws(
    () => transformWindows(w, { ...p, feature_columns: [] }),
    /contract/,
  );
  w[0][FEATURE_COLUMNS[0]] = NaN;
  assert.throws(() => fitNormalizers(w), /finite/);
  assert.throws(() => transformWindows(w, p), /finite/);
});
test("invalid generation configs rejected", () => {
  for (const patch of [
    { days: 2 },
    { strokes_per_session: 301 },
    { pause_probability: 2 },
    { generator_version: "1.0.0" },
    { profiles: [{ ...config.profiles[0], participant_id: "../outside" }] },
  ])
    assert.throws(() =>
      generateSession({ ...config, ...patch }, config.profiles[0], 1, 1),
    );
});
test("end-to-end partial failure, report exports, provenance, reproducibility and overwrite protection", async () => {
  const root = await mkdtemp(join(tmpdir(), "member2-test-"));
  try {
    const tiny = {
      ...config,
      profiles: config.profiles.slice(0, 1),
      strokes_per_session: 300,
      sessions_per_day: 1,
    };
    const input = join(root, "input"),
      rows = await generateDataset(tiny, input);
    rows.push({ ...rows[0] });
    await saveJson(join(input, "manifest.json"), rows);
    const out = join(root, "out"),
      run = await processDataset(
        input,
        join(input, "manifest.json"),
        tiny,
        out,
      );
    assert.equal(run.status, "partial_failure");
    assert.equal(run.rejected_files, 1);
    const windows = await readCsv<Window>(join(out, "windows.csv"));
    for (const split of ["train", "validation", "test"])
      assert.equal(windows.filter((w) => w.split === split).length, 24);
    assert.ok(windows.every((w) => w.data_kind === "synthetic"));
    assert.equal(
      (await readFile(join(out, "report.vi.html"), "utf8")).split(
        "data:image/png;base64,",
      ).length - 1,
      5,
    );
    assert.equal(
      (await filesUnder(join(out, "figures"))).filter((p) => p.endsWith(".png"))
        .length,
      5,
    );
    assert.equal(
      (await filesUnder(join(out, "figures"))).filter((p) => p.endsWith(".svg"))
        .length,
      5,
    );
    for (const [file, hash] of Object.entries(run.output_hashes))
      assert.equal(await digest(join(out, file)), hash);
    assert.ok(Object.keys(run.source_hashes).includes("src/pipeline.ts"));
    assert.ok(Object.keys(run.input_hashes).length);
    const second = join(root, "second");
    await processDataset(input, join(input, "manifest.json"), tiny, second);
    for (const file of [
      "windows.csv",
      "normalized_windows.csv",
      "normalizers.json",
      "report.md",
      "figures/01_timing_distributions.svg",
      "figures/01_timing_distributions.png",
    ])
      assert.equal(
        await digest(join(out, file)),
        await digest(join(second, file)),
        file,
      );
    await assert.rejects(
      processDataset(input, join(input, "manifest.json"), tiny, out),
      /empty/,
    );
    const generatedAgain = join(root, "again");
    await generateDataset(tiny, generatedAgain);
    for (const r of rows)
      assert.equal(
        await digest(join(input, r.file)),
        await digest(join(generatedAgain, r.file)),
      );
    const cli = spawnSync(
      process.execPath,
      [
        join(packageRoot, "dist/src/cli.js"),
        "process",
        "--config",
        join(packageRoot, "config.json"),
        "--input",
        input,
        "--manifest",
        join(input, "manifest.json"),
        "--output",
        join(root, "cli"),
      ],
      { encoding: "utf8" },
    );
    assert.equal(cli.status, 2, cli.stderr);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
test("manifest conflicts, real-session eligibility, aggregate reports and data-kind isolation", async () => {
  const root = await mkdtemp(join(tmpdir(), "member2-manifest-"));
  try {
    const tiny = {
        ...config,
        profiles: config.profiles.slice(0, 1),
        strokes_per_session: 300,
        sessions_per_day: 1,
      },
      input = join(root, "input"),
      rows = await generateDataset(tiny, input);
    rows.unshift({ ...rows[0], split: "test" });
    rows.push({ ...rows[0], file: "../outside.json" });
    await saveJson(join(root, "outside.json"), sample());
    await symlink(join(root, "outside.json"), join(input, "escape.json"));
    rows.push({ ...rows[0], file: "escape.json" });
    await saveJson(join(input, "manifest.json"), rows);
    const run = await processDataset(
      input,
      join(input, "manifest.json"),
      tiny,
      join(root, "out"),
    );
    assert.equal(run.rejected_files, 3);
    const rejections = await readJson<{ reason: string }[]>(
      join(root, "out/rejections.json"),
    );
    assert.match(rejections[0].reason, /day\/split/);
    assert.match(rejections[1].reason, /inside input/);
    assert.match(rejections[2].reason, /inside input/);
    const realConfig = {
        ...config,
        profiles: config.profiles.slice(0, 1),
        strokes_per_session: 1200,
        sessions_per_day: 2,
      },
      realInput = join(root, "real-input"),
      generated = await generateDataset(realConfig, realInput),
      dayOne = generated.filter((r) => r.study_day === 1),
      dayTwo = generated.find((r) => r.study_day === 2)!,
      dayThree = generated.find((r) => r.study_day === 3)!,
      selected = [...dayOne, dayTwo, dayThree],
      real: ManifestRow[] = [];
    for (const r of selected) {
      const d = await readJson<Session>(join(realInput, r.file)),
        day = r.study_day!,
        daySessionNumber = Number(d.metadata.session_number ?? 1),
        sessionId = `P01-D${day}-S${daySessionNumber}`;
      d.data_kind = "real";
      d.events = d.events
        .filter(
          (event) =>
            event.pair_id === undefined || Number(event.pair_id) <= (day === 2 ? 800 : 2000),
        )
        .map((event) => ({ ...event, t_ms: event.t_ms * 3 }));
      d.metadata = {
        participant_id: "P01",
        session_id: sessionId,
        collection_mode: "formal",
        started_at: `2026-01-0${day}T${daySessionNumber === 1 ? "08" : "09"}:00:00.000Z`,
        timezone: "UTC",
      };
      const file = `raw/${sessionId}.json`;
      await saveJson(join(realInput, file), d);
      real.push({
        ...r,
        file,
        participant_id: "P01",
        session_id: sessionId,
        data_kind: "real",
        split: (["train", "validation", "test"] as const)[day - 1],
        study_day: day,
      });
    }
    const pilot = await readJson<Session>(join(realInput, real[0].file));
    pilot.metadata.session_id = "P01-pilot";
    pilot.metadata.collection_mode = "pilot";
    await saveJson(join(realInput, "raw/P01-pilot.json"), pilot);
    real.push({
      ...real[0],
      file: "raw/P01-pilot.json",
      session_id: "P01-pilot",
    });
    const unspecified = await readJson<Session>(join(realInput, real[1].file));
    unspecified.metadata.session_id = "P01-unspecified";
    delete unspecified.metadata.collection_mode;
    await saveJson(join(realInput, "raw/P01-unspecified.json"), unspecified);
    real.push({
      ...real[1],
      file: "raw/P01-unspecified.json",
      session_id: "P01-unspecified",
    });
    await saveJson(join(realInput, "manifest.json"), real);
    const realRun = await processDataset(
      realInput,
      join(realInput, "manifest.json"),
      realConfig,
      join(root, "real"),
    );
    assert.equal(realRun.data_kind, "real");
    assert.equal(realRun.rejected_files, 0);
    assert.deepEqual(realRun.summary.study_design, {
      target_participants: 20,
      participants: 1,
      participants_missing_target: 19,
      protocol_complete_participants: 1,
      protocol_incomplete_participants: 0,
      target_formal_sessions: 80,
      formal_sessions: 4,
      formal_sessions_missing_target: 76,
      eligible_sessions: 3,
      excluded_sessions: 3,
      study_complete: false,
      exclusion_reasons: {
        below_stroke_target: 1,
        collection_mode_unspecified: 1,
        pilot_mode: 1,
      },
    });
    const qualityRows = await readCsv(join(root, "real/sessions.csv"));
    assert.equal(qualityRows.length, 6);
    for (const id of ["P01-D1-S1", "P01-D1-S2", "P01-D3-S1"])
      assert.equal(
        qualityRows.find((r) => r.session_id === id)?.research_eligible,
        true,
      );
    assert.match(
      String(
        qualityRows.find((r) => r.session_id === "P01-D2-S1")?.eligibility_reasons,
      ),
      /below_stroke_target/,
    );
    assert.match(
      String(
        qualityRows.find((r) => r.session_id === "P01-pilot")?.eligibility_reasons,
      ),
      /pilot_mode/,
    );
    assert.match(
      String(
        qualityRows.find((r) => r.session_id === "P01-unspecified")?.eligibility_reasons,
      ),
      /collection_mode_unspecified/,
    );
    const realWindows = await readCsv<Window>(join(root, "real/windows.csv"));
    assert.ok(realWindows.every((w) => w.session_id !== "P01-D2-S1"));
    assert.ok(realWindows.every((w) => !w.session_id.includes("pilot")));
    assert.ok(realWindows.every((w) => !w.session_id.includes("unspecified")));
    const realNormalizers = await readJson<Normalizers>(
      join(root, "real/normalizers.json"),
    );
    assert.deepEqual(
      realNormalizers.profiles["P01:50"].training_sessions,
      ["P01-D1-S1", "P01-D1-S2"],
    );
    const design = await readJson<Record<string, unknown>>(
      join(root, "real/study_design_summary.json"),
    );
    assert.equal(design.eligible_sessions, 3);
    assert.doesNotMatch(JSON.stringify(design), /P01|SIM01/);
    const realReport = await readFile(join(root, "real/report.vi.html"), "utf8");
    assert.match(realReport, /DỮ LIỆU NGƯỜI THAM GIA/);
    assert.match(realReport, /Thống kê này không chứng minh/);
    assert.doesNotMatch(realReport, /SIM01|P01|P01-pilot/);
    const realFigure = await readFile(
      join(root, "real/figures/02_session_variation.svg"),
      "utf8",
    );
    assert.match(realFigure, /REAL PARTICIPANT DATA/);
    assert.doesNotMatch(realFigure, /SIM01|P01/);
    const noTrainRows: ManifestRow[] = [];
    for (const row of real.slice(0, 4)) {
      const data = await readJson<Session>(join(realInput, row.file));
      if (row.study_day === 1)
        data.events = data.events.filter(
          (event) => event.pair_id === undefined || Number(event.pair_id) <= 800,
        );
      const file = `raw/no-train-${row.session_id}.json`;
      await saveJson(join(realInput, file), data);
      noTrainRows.push({ ...row, file });
    }
    await saveJson(join(realInput, "manifest.json"), noTrainRows);
    await processDataset(
      realInput,
      join(realInput, "manifest.json"),
      realConfig,
      join(root, "no-train-profiles"),
    );
    const noTrainWindows = await readCsv<Window>(
        join(root, "no-train-profiles/windows.csv"),
      ),
      noTrainNormalized = await readCsv<Window>(
        join(root, "no-train-profiles/normalized_windows.csv"),
      ),
      noTrainParameters = await readJson<Normalizers>(
        join(root, "no-train-profiles/normalizers.json"),
      ),
      noTrainExclusions = await readCsv(
        join(root, "no-train-profiles/normalization_exclusions.csv"),
      ),
      noTrainQuality = await readCsv(
        join(root, "no-train-profiles/sessions.csv"),
      ),
      featureDistributions = await readCsv(
        join(root, "real/feature_distribution_summary.csv"),
      );
    assert.ok(noTrainWindows.length > 0);
    assert.equal(noTrainNormalized.length, 0);
    assert.deepEqual(noTrainParameters.profiles, {});
    assert.ok(
      noTrainExclusions.every(
        (row) => row.reason === "missing_eligible_training_windows",
      ),
    );
    assert.match(
      String(noTrainQuality[0]?.normalization_exclusion_reasons),
      /missing_eligible_training_windows_W100/,
    );
    assert.ok(featureDistributions.length > 0);
    assert.equal("participant_id" in (featureDistributions[0] ?? {}), false);

    const retake = await readJson<Session>(join(realInput, real[3].file));
    retake.metadata.session_id = "P01-D2-RETAKE";
    retake.metadata.started_at = "2026-01-02T12:00:00.000Z";
    const retakeFile = "raw/P01-D2-RETAKE.json";
    await saveJson(join(realInput, retakeFile), retake);
    const retakeRow: ManifestRow = {
      ...real[2],
      file: retakeFile,
      session_id: "P01-D2-RETAKE",
      supersedes_session_id: real[2].session_id,
    };
    await saveJson(join(realInput, "manifest.json"), [
      ...real.slice(0, 4),
      retakeRow,
      ...real.slice(4),
    ]);
    const retakeRun = await processDataset(
      realInput,
      join(realInput, "manifest.json"),
      realConfig,
      join(root, "retake"),
    );
    assert.equal(retakeRun.summary.study_design?.formal_sessions, 4);
    assert.equal(retakeRun.summary.study_design?.protocol_complete_participants, 1);
    assert.equal(retakeRun.summary.study_design?.eligible_sessions, 4);
    const retakeQuality = await readCsv(join(root, "retake/sessions.csv"));
    assert.equal(
      retakeQuality.find((row) => row.session_id === real[2].session_id)
        ?.superseded_by_session_id,
      "P01-D2-RETAKE",
    );
    assert.match(
      String(
        retakeQuality.find((row) => row.session_id === real[2].session_id)
          ?.eligibility_reasons,
      ),
      /superseded_session/,
    );
    assert.equal(
      (await readCsv<Window>(join(root, "retake/windows.csv"))).some(
        (window) => window.session_id === real[2].session_id,
      ),
      false,
    );
    const d = await readJson<Session>(join(realInput, generated[0].file));
    await saveJson(join(realInput, "raw/SIM01-synthetic.json"), d);
    const mixed = [
      ...real,
      {
        ...generated[0],
        file: "raw/SIM01-synthetic.json",
      },
    ];
    await saveJson(join(realInput, "manifest.json"), mixed);
    await assert.rejects(
      processDataset(
        realInput,
        join(realInput, "manifest.json"),
        realConfig,
        join(root, "mixed"),
      ),
      /Do not mix/,
    );
    await saveJson(join(realInput, "manifest.json"), [real[3]]);
    const cli = spawnSync(
      process.execPath,
      [
        join(packageRoot, "dist/src/cli.js"),
        "process",
        "--config",
        join(packageRoot, "config.json"),
        "--input",
        realInput,
        "--manifest",
        join(realInput, "manifest.json"),
        "--output",
        join(root, "no-train"),
      ],
      { encoding: "utf8" },
    );
    assert.equal(cli.status, 0, cli.stderr);
    assert.equal(JSON.parse(cli.stdout).study_design.eligible_sessions, 0);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("CSV round trip preserves string IDs and numeric/boolean column types", async () => {
  const root = await mkdtemp(join(tmpdir(), "member2-csv-"));
  try {
    const { writeCsv } = await import("../src/io.js");
    const rows = [
      {
        participant_id: "001",
        session_id: "True",
        window_id: "0002",
        claimed_profile: "002",
        split: "test",
        data_kind: "synthetic",
        group: "typing",
        pair_id: 3,
        segment_id: 0,
        window_size: 50,
        composing: true,
        dwell_median_ms: 12.5,
      },
    ];
    const path = join(root, "features.csv");
    await writeCsv(path, rows);
    assert.deepEqual(await readCsv(path), rows);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("constant-value timing histograms stay finite", async () => {
  const { histogram } = await import("../src/charts.js");
  const bins = histogram([100, 100, 100], 100, 100, 10, true);
  assert.ok(bins.every(([x, y]) => Number.isFinite(x) && Number.isFinite(y)));
  assert.ok(Math.abs(bins.reduce((s, [_x, y]) => s + y * 0.1, 0) - 1) < 1e-10);
});

test("partial rejection may remove validation sessions without losing valid outputs", async () => {
  const root = await mkdtemp(join(tmpdir(), "member2-partial-split-"));
  try {
    const tiny = {
      ...config,
      profiles: config.profiles.slice(0, 1),
      strokes_per_session: 300,
      sessions_per_day: 1,
    };
    const input = join(root, "input"),
      rows = await generateDataset(tiny, input);
    rows[1].split = "test";
    await saveJson(join(input, "manifest.json"), rows);
    const out = join(root, "processed"),
      run = await processDataset(
        input,
        join(input, "manifest.json"),
        tiny,
        out,
      );
    assert.equal(run.status, "partial_failure");
    assert.equal(run.rejected_files, 1);
    assert.equal(run.summary.sessions, 2);
    const drift = await readCsv(join(out, "session_drift_summary.csv"));
    assert.equal(drift[0].validation, "");
    assert.equal(typeof drift[0].test_minus_train_percent, "number");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
