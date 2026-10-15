import type {
  Session,
  Split,
  Stroke,
  QualityDetails,
  TimingEvent,
} from "./types.js";
const EVENT_TYPES = new Set([
  "start",
  "stop",
  "down",
  "up",
  "boundary",
  "resume",
  "composition_start",
  "composition_end",
  "repeat",
  "shortcut",
  "duplicate_down",
  "unmatched_up",
  "unidentified",
]);
export const STROKE_COLUMNS = [
  "participant_id",
  "session_id",
  "data_kind",
  "segment_id",
  "pair_id",
  "down_ms",
  "up_ms",
  "dwell_ms",
  "group",
  "composing",
  "split",
];
const object = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);
export function validateSession(
  input: unknown,
  split: Split,
): { strokes: Stroke[]; quality: QualityDetails } {
  if (!object(input)) throw new Error("Session must be an object");
  if (
    input.schema_version !== "1.0" ||
    !["real", "synthetic"].includes(String(input.data_kind))
  )
    throw new Error("Unsupported schema_version or data_kind");
  if (!["train", "validation", "test"].includes(split))
    throw new Error("An explicit train/validation/test split is required");
  const meta = input.metadata;
  if (!object(meta)) throw new Error("metadata must be an object");
  if (
    !["participant_id", "session_id"].every(
      (k) => typeof meta[k] === "string" && (meta[k] as string).trim(),
    )
  )
    throw new Error("Missing participant_id or session_id");
  if (!Array.isArray(input.events) || input.events.length < 2)
    throw new Error("Missing events");
  if (!input.events.every(object))
    throw new Error("Every event must be an object");
  const data = input as unknown as Session,
    events = data.events;
  if (events[0].type !== "start" || events.at(-1)!.type !== "stop")
    throw new Error("Expected start and stop boundaries");
  let previous = -1,
    physical = 0,
    recording = 0,
    running: number | null = null,
    paused = false;
  const pairs = new Map<number, { e: TimingEvent; segment: number }[]>(),
    diagnostics: Record<string, number> = {};
  for (const [index, e] of events.entries()) {
    const t = e.t_ms,
      kind = e.type;
    if (typeof t !== "number" || !Number.isFinite(t) || t < 0 || t < previous)
      throw new Error(`Invalid or non-monotonic timestamp at event ${index}`);
    previous = t;
    if (!EVENT_TYPES.has(kind))
      throw new Error(`Unknown event type at event ${index}`);
    diagnostics[kind] = (diagnostics[kind] ?? 0) + 1;
    if (kind === "start") {
      if (index !== 0) throw new Error("Repeated start");
      running = t;
    } else if (kind === "boundary") {
      if (paused) throw new Error("Boundary while already paused");
      recording += t - running!;
      running = null;
      paused = true;
      physical++;
    } else if (kind === "resume") {
      if (!paused) throw new Error("Resume without boundary");
      running = t;
      paused = false;
    } else if (kind === "stop") {
      if (index !== events.length - 1) throw new Error("Early stop");
      if (running !== null) recording += t - running;
    } else if (kind === "down" || kind === "up") {
      if (paused) throw new Error("Keystroke recorded while paused");
      if (!Number.isSafeInteger(e.pair_id) || e.pair_id! <= 0)
        throw new Error("pair_id must be a positive safe integer");
      const entries = pairs.get(e.pair_id!) ?? [];
      entries.push({ e, segment: physical });
      pairs.set(e.pair_id!, entries);
    }
  }
  const valid = new Map<number, Omit<Stroke, "segment_id">>(),
    exclusions: Record<string, number> = {};
  for (const [pid, entries] of pairs) {
    const downs = entries.filter((x) => x.e.type === "down"),
      ups = entries.filter((x) => x.e.type === "up");
    let reason: string | undefined;
    if (downs.length > 1 || ups.length > 1) reason = "duplicate_pair_events";
    else if (!downs.length) reason = "missing_down";
    else if (!ups.length) reason = "missing_up";
    else {
      const { e: down, segment: ds } = downs[0],
        { e: up, segment: us } = ups[0];
      if (ds !== us) reason = "cross_boundary_pair";
      else if (up.t_ms < down.t_ms) reason = "negative_dwell";
      else if (
        !["typing", "separator", "correction"].includes(down.group!) ||
        up.group !== down.group
      )
        reason = "invalid_group";
      else if (
        typeof down.composing !== "boolean" ||
        up.composing !== down.composing
      )
        reason = "invalid_composition_flag";
      else
        valid.set(pid, {
          participant_id: data.metadata.participant_id,
          session_id: data.metadata.session_id,
          data_kind: data.data_kind,
          pair_id: pid,
          down_ms: down.t_ms,
          up_ms: up.t_ms,
          dwell_ms: up.t_ms - down.t_ms,
          group: down.group!,
          composing: down.composing,
          split,
        });
    }
    if (reason) exclusions[reason] = (exclusions[reason] ?? 0) + 1;
  }
  const ordered = [...pairs]
    .map(([pid, entries]) => ({
      pid,
      t: Math.min(...entries.map((x) => x.e.t_ms)),
      physical: entries[0].segment,
    }))
    .sort((a, b) => a.t - b.t || a.pid - b.pid);
  const strokes: Stroke[] = [];
  let segment = -1,
    lastPhysical: number | null = null,
    gap = true;
  for (const entry of ordered) {
    if (!valid.has(entry.pid)) {
      gap = true;
      continue;
    }
    if (gap || entry.physical !== lastPhysical) segment++;
    strokes.push({ ...valid.get(entry.pid)!, segment_id: segment } as Stroke);
    lastPhysical = entry.physical;
    gap = false;
  }
  const wall = events.at(-1)!.t_ms - events[0].t_ms;
  return {
    strokes,
    quality: {
      participant_id: data.metadata.participant_id,
      session_id: data.metadata.session_id,
      data_kind: data.data_kind,
      split,
      event_count: events.length,
      pair_count: pairs.size,
      valid_strokes: strokes.length,
      excluded_pairs: Object.values(exclusions).reduce((a, b) => a + b, 0),
      segment_count: new Set(strokes.map((s) => s.segment_id)).size,
      wall_seconds: wall / 1000,
      recording_seconds: recording / 1000,
      paused_seconds: (wall - recording) / 1000,
      interruptions: diagnostics.boundary ?? 0,
      repeats: diagnostics.repeat ?? 0,
      composition_strokes: strokes.filter((s) => s.composing).length,
      long_holds_over_2000ms: strokes.filter((s) => s.dwell_ms > 2000).length,
      exclusion_reasons: exclusions,
      diagnostics,
    },
  };
}
