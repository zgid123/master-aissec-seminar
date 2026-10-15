import { FEATURE_COLUMNS } from "./features.js";
import { groupBy, median, unique } from "./io.js";
import type { Window, Normalizers } from "./types.js";
function check(windows: Window[]) {
  if (
    windows.some((w) =>
      FEATURE_COLUMNS.some(
        (f) => typeof w[f] !== "number" || !Number.isFinite(w[f]),
      ),
    )
  )
    throw new Error("Features must be finite");
}
export function fitNormalizers(windows: Window[]): Normalizers {
  check(windows);
  const p: Normalizers = {
    version: "1.0",
    fit_split: "train",
    scale_factor: 1.4826,
    feature_columns: FEATURE_COLUMNS,
    profiles: {},
  };
  for (const rows of groupBy(
    windows.filter((w) => w.split === "train"),
    ["participant_id", "window_size"],
  )) {
    const center = FEATURE_COLUMNS.map((f) =>
      median(rows.map((w) => Number(w[f]))),
    );
    const scale = FEATURE_COLUMNS.map(
      (f, i) =>
        1.4826 * median(rows.map((w) => Math.abs(Number(w[f]) - center[i]))),
    );
    p.profiles[`${rows[0].participant_id}:${rows[0].window_size}`] = {
      median: center,
      scale,
      active: scale.map((x) => x > 0),
      training_windows: rows.length,
      training_sessions: unique(rows.map((w) => w.session_id)).sort(),
    };
  }
  const missing = unique(
    windows.map((w) => `${w.participant_id}:${w.window_size}`),
  ).filter((k) => !p.profiles[k]);
  if (missing.length)
    throw new Error(
      `Missing training windows for profiles: ${missing.sort().join(", ")}`,
    );
  return p;
}
export function transformWindows(
  windows: Window[],
  parameters: Normalizers,
  claimedProfile?: string,
): Window[] {
  if (
    JSON.stringify(parameters.feature_columns) !==
    JSON.stringify(FEATURE_COLUMNS)
  )
    throw new Error("Feature contract mismatch");
  check(windows);
  return windows.map((w) => {
    const profile = claimedProfile ?? w.participant_id,
      key = `${profile}:${w.window_size}`,
      fit = parameters.profiles[key];
    if (!fit) throw new Error(`No training normalizer for ${key}`);
    const result: Window = { ...w, claimed_profile: profile };
    FEATURE_COLUMNS.forEach((f, i) => {
      result[f] = fit.active[i]
        ? (Number(w[f]) - fit.median[i]) / fit.scale[i]
        : 0;
    });
    return result;
  });
}
