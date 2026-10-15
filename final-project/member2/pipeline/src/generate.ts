import { createHash } from "node:crypto";
import { join } from "node:path";
import { saveJson } from "./io.js";
import type {
  Config,
  Profile,
  Session,
  TimingEvent,
  ManifestRow,
} from "./types.js";
export const GENERATOR_VERSION = "2.0.0-xoshiro128ss-boxmuller";
export const sessionSeed = (
  master: number,
  profile: string,
  day: number,
  session: number,
) =>
  createHash("sha256")
    .update(`${master}:${profile}:${day}:${session}`)
    .digest("hex")
    .slice(0, 32);
/** xoshiro128**: four big-endian SHA-256 words; uniform in [0,1). */
export class Random {
  private state: number[];
  constructor(seed: string) {
    this.state = Array.from(
      { length: 4 },
      (_, i) => parseInt(seed.slice(i * 8, i * 8 + 8), 16) >>> 0,
    );
    if (!this.state.some((x) => x)) this.state[0] = 1;
  }
  uniform() {
    const s = this.state,
      rot = (x: number, k: number) => ((x << k) | (x >>> (32 - k))) >>> 0;
    const result = Math.imul(rot(Math.imul(s[1], 5), 7), 9) >>> 0,
      t = s[1] << 9;
    s[2] ^= s[0];
    s[3] ^= s[1];
    s[1] ^= s[2];
    s[0] ^= s[3];
    s[2] ^= t;
    s[3] = rot(s[3], 11);
    return result / 4294967296;
  }
  normal(sigma: number) {
    return (
      Math.sqrt(-2 * Math.log(1 - this.uniform())) *
      Math.cos(2 * Math.PI * this.uniform()) *
      sigma
    );
  }
  range([lo, hi]: [number, number]) {
    return lo + (hi - lo) * this.uniform();
  }
}
export function validateConfig(c: Config) {
  if (
    !c ||
    typeof c !== "object" ||
    !Array.isArray(c.profiles) ||
    !c.profiles.length
  )
    throw new Error("Config requires profiles");
  for (const key of [
    "master_seed",
    "sessions_per_day",
    "strokes_per_session",
    "segments_per_session",
  ] as const) {
    if (
      !Number.isSafeInteger(c[key]) ||
      c[key] < (key === "master_seed" ? 0 : 1)
    )
      throw new Error(`Invalid ${key}`);
  }
  if (c.days !== 3)
    throw new Error(
      "The fixed study split requires exactly three synthetic days",
    );
  if (
    c.strokes_per_session < c.segments_per_session ||
    c.strokes_per_session % c.segments_per_session
  )
    throw new Error(
      "strokes_per_session must be divisible by segments_per_session",
    );
  if (c.generator_version !== GENERATOR_VERSION)
    throw new Error(`Use generator_version ${GENERATOR_VERSION} for new data`);
  for (const key of [
    "dwell_log_sigma",
    "interval_log_sigma",
    "session_log_sigma",
    "day_drift_log_sigma",
    "pace_innovation_sigma",
    "correction_cluster_multiplier",
    "pause_threshold_ms",
  ] as const) {
    if (!Number.isFinite(c[key]) || c[key] < 0)
      throw new Error(`Invalid ${key}`);
  }
  if (
    !Number.isFinite(c.pace_ar_coefficient) ||
    Math.abs(c.pace_ar_coefficient) >= 1
  )
    throw new Error("Invalid pace_ar_coefficient");
  for (const key of [
    "separator_probability",
    "pause_probability",
    "repeat_probability",
  ] as const)
    if (!Number.isFinite(c[key]) || c[key] < 0 || c[key] > 1)
      throw new Error(`Invalid ${key}`);
  for (const key of [
    "pause_extra_ms_range",
    "boundary_pause_ms_range",
  ] as const)
    if (
      !Array.isArray(c[key]) ||
      c[key].length !== 2 ||
      c[key].some((x) => !Number.isFinite(x) || x < 0) ||
      c[key][0] > c[key][1]
    )
      throw new Error(`Invalid ${key}`);
  const ids = new Set<string>();
  for (const p of c.profiles) {
    if (!/^[A-Za-z0-9_-]+$/.test(p.participant_id) || ids.has(p.participant_id))
      throw new Error("Invalid or duplicate profile ID");
    ids.add(p.participant_id);
    if (
      ![p.dwell_median_ms, p.interval_median_ms].every(
        (x) => Number.isFinite(x) && x > 0,
      ) ||
      !Number.isFinite(p.correction_probability) ||
      p.correction_probability < 0 ||
      p.correction_probability + c.separator_probability > 1 ||
      p.correction_probability * c.correction_cluster_multiplier +
        c.separator_probability >
        1
    )
      throw new Error("Invalid profile parameters");
  }
  if (
    !Array.isArray(c.window_sizes) ||
    !c.window_sizes.length ||
    c.window_sizes.some((x) => !Number.isSafeInteger(x) || x < 2) ||
    new Set(c.window_sizes).size !== c.window_sizes.length
  )
    throw new Error("Invalid window_sizes");
}
export function generateSession(
  config: Config,
  profile: Profile,
  day: number,
  session: number,
): Session {
  validateConfig(config);
  const seed = sessionSeed(
      config.master_seed,
      profile.participant_id,
      day,
      session,
    ),
    rng = new Random(seed),
    dayRng = new Random(
      sessionSeed(config.master_seed, profile.participant_id, day, 0),
    );
  const dayEffect = dayRng.normal(config.day_drift_log_sigma) * (day - 1),
    sessionEffect = rng.normal(config.session_log_sigma) + dayEffect;
  const events: TimingEvent[] = [{ type: "start", t_ms: 0 }],
    perSegment = config.strokes_per_session / config.segments_per_session;
  let cursor = 100,
    pairId = 0,
    pace = 0;
  let previousCorrection: boolean = false;
  const round = (n: number) => {
    if (!Number.isFinite(n))
      throw new Error("Simulation produced nonfinite timing");
    return Math.round(n * 1e6) / 1e6;
  };
  for (let segment = 0; segment < config.segments_per_session; segment++) {
    const chunk: TimingEvent[] = [];
    for (let i = 0; i < perSegment; i++) {
      if (i) {
        let interval =
          profile.interval_median_ms *
          Math.exp(
            sessionEffect + pace + rng.normal(config.interval_log_sigma),
          );
        if (rng.uniform() < config.pause_probability)
          interval += rng.range(config.pause_extra_ms_range);
        cursor += interval;
      }
      pace =
        config.pace_ar_coefficient * pace +
        rng.normal(config.pace_innovation_sigma);
      const dwell =
        profile.dwell_median_ms *
        Math.exp(
          0.3 * (sessionEffect + pace) + rng.normal(config.dwell_log_sigma),
        );
      const probability: number =
          profile.correction_probability *
          (previousCorrection ? config.correction_cluster_multiplier : 1),
        p = rng.uniform();
      const group: "correction" | "separator" | "typing" =
        p < probability
          ? "correction"
          : p < probability + config.separator_probability
            ? "separator"
            : "typing";
      previousCorrection = group === "correction";
      const fields = { pair_id: ++pairId, group, composing: false } as const;
      chunk.push(
        { type: "down", t_ms: round(cursor), ...fields },
        { type: "up", t_ms: round(cursor + dwell), ...fields },
      );
      if (rng.uniform() < config.repeat_probability)
        chunk.push({ type: "repeat", t_ms: round(cursor + dwell / 2) });
    }
    chunk.sort((a, b) => a.t_ms - b.t_ms);
    events.push(...chunk);
    cursor = chunk.at(-1)!.t_ms + 100;
    if (segment < config.segments_per_session - 1) {
      events.push({
        type: "down",
        t_ms: round(cursor),
        pair_id: ++pairId,
        group: "typing",
        composing: false,
      });
      cursor += 100;
      events.push({
        type: "boundary",
        t_ms: round(cursor),
        reason: "simulated_break",
      });
      cursor += rng.range(config.boundary_pause_ms_range);
      events.push({ type: "resume", t_ms: round(cursor) });
      cursor += 100;
    }
  }
  events.push({ type: "stop", t_ms: round(cursor) });
  return {
    schema_version: "1.0",
    data_kind: "synthetic",
    metadata: {
      participant_id: profile.participant_id,
      session_id: `${profile.participant_id}_D${day}_S${session}`,
      study_day: day,
      session_number: session,
      time_basis: "simulated_relative_ms",
      generator_version: GENERATOR_VERSION,
      seed,
      seed_encoding: "sha256-first-128-bits-hex",
      simulation_settings: config,
      description:
        "Simulated profile; no human participant, consent, browser observation or collection date.",
    },
    events,
  };
}
export async function generateDataset(config: Config, output: string) {
  validateConfig(config);
  const rows: ManifestRow[] = [];
  for (const profile of config.profiles)
    for (let day = 1; day <= 3; day++)
      for (let session = 1; session <= config.sessions_per_day; session++) {
        const data = generateSession(config, profile, day, session),
          file = `raw/${data.metadata.session_id}.json`;
        await saveJson(join(output, file), data);
        rows.push({
          file,
          participant_id: profile.participant_id,
          session_id: data.metadata.session_id,
          study_day: day,
          split: ({ 1: "train", 2: "validation", 3: "test" } as const)[
            day as 1 | 2 | 3
          ],
          data_kind: "synthetic",
        });
      }
  await saveJson(join(output, "manifest.json"), rows);
  return rows;
}
