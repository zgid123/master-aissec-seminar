import { groupBy, median, quantile } from "./io.js";
import type { Stroke, Window, Row } from "./types.js";
export const FEATURE_COLUMNS = ["dwell", "flight", "down_down"]
  .flatMap((n) => ["median", "iqr", "mad"].map((s) => `${n}_${s}_ms`))
  .concat(["strokes_per_minute", "pause_proportion", "correction_proportion"]);
export const WINDOW_METADATA = [
  "participant_id",
  "session_id",
  "data_kind",
  "segment_id",
  "window_id",
  "window_size",
  "split",
  "start_ms",
  "end_ms",
  "composing_proportion",
  "negative_flight_proportion",
];
export function timingSummary(xs: number[], prefix: string): Row {
  const m = median(xs);
  return {
    [`${prefix}_median_ms`]: m,
    [`${prefix}_iqr_ms`]: quantile(xs, 0.75) - quantile(xs, 0.25),
    [`${prefix}_mad_ms`]: median(xs.map((x) => Math.abs(x - m))),
  };
}
export function extractWindows(
  strokes: Stroke[],
  sizes = [20, 50, 100],
  pauseThreshold = 2000,
) {
  if (
    sizes.some((w) => !Number.isSafeInteger(w) || w < 2) ||
    new Set(sizes).size !== sizes.length
  )
    throw new Error("Window sizes must be unique integers >= 2");
  const windows: Window[] = [],
    tails: Row[] = [];
  for (const group of groupBy(strokes, ["session_id", "segment_id"])) {
    group.sort((a, b) => a.down_ms - b.down_ms || a.pair_id - b.pair_id);
    for (const size of sizes) {
      const first = group[0];
      tails.push({
        session_id: first.session_id,
        segment_id: first.segment_id,
        window_size: size,
        dropped_tail_strokes: group.length % size,
      });
      for (let offset = 0; offset + size <= group.length; offset += size) {
        const w = group.slice(offset, offset + size),
          down = w.map((s) => s.down_ms),
          up = w.map((s) => s.up_ms),
          end = Math.max(...up),
          duration = end - down[0];
        if (duration <= 0) throw new Error("Window duration must be positive");
        const flight = down.slice(1).map((x, i) => x - up[i]),
          dd = down.slice(1).map((x, i) => x - down[i]);
        windows.push({
          participant_id: first.participant_id,
          session_id: first.session_id,
          data_kind: first.data_kind,
          split: first.split,
          segment_id: first.segment_id,
          window_size: size,
          window_id: `${first.session_id}_G${first.segment_id}_W${size}_${String(offset / size).padStart(4, "0")}`,
          start_ms: down[0],
          end_ms: end,
          composing_proportion: w.filter((s) => s.composing).length / size,
          negative_flight_proportion:
            flight.filter((x) => x < 0).length / flight.length,
          strokes_per_minute: (size * 60000) / duration,
          pause_proportion:
            dd.filter((x) => x > pauseThreshold).length / dd.length,
          correction_proportion:
            w.filter((s) => s.group === "correction").length / size,
          ...timingSummary(
            up.map((x, i) => x - down[i]),
            "dwell",
          ),
          ...timingSummary(flight, "flight"),
          ...timingSummary(dd, "down_down"),
        });
      }
    }
  }
  return { windows, tails };
}
