import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
  groupBy,
  median,
  quantile,
  sum,
  unique,
  values,
  writeCsv,
  packageRoot,
  readJson,
} from "./io.js";
import { FEATURE_COLUMNS } from "./features.js";
import { markdownTable, renderHtml } from "./report.js";
import { histogram, renderFigures } from "./charts.js";
import type { Figure, Series } from "./charts.js";
import type { Stroke, Window, Row, Normalizers, Summary } from "./types.js";
export async function analyze(
  strokes: Stroke[],
  windows: Window[],
  normalized: Window[],
  quality: Row[],
  tails: Row[],
  output: string,
  parameters: Normalizers,
): Promise<Summary> {
  const ids = unique(strokes.map((s) => s.participant_id)).sort(),
    splits = ["train", "validation", "test"];
  const flights: Row[] = [];
  for (const group of groupBy(strokes, ["session_id", "segment_id"])) {
    group.sort((a, b) => a.down_ms - b.down_ms);
    group.slice(1).forEach((s, i) =>
      flights.push({
        participant_id: s.participant_id,
        flight_ms: s.down_ms - group[i].up_ms,
      }),
    );
  }
  const sessionSummary: Row[] = groupBy(
    windows.filter((w) => w.window_size === 50),
    ["participant_id", "session_id", "split"],
  ).map((g) => ({
    participant_id: g[0].participant_id,
    session_id: g[0].session_id,
    split: g[0].split,
    ...Object.fromEntries(
      FEATURE_COLUMNS.map((f) => [f, median(values(g, f))]),
    ),
  }));
  const descriptions = [
    "dwell_median_ms",
    "flight_median_ms",
    "strokes_per_minute",
    "pause_proportion",
    "correction_proportion",
  ];
  const profileFeatures: Row[] = groupBy(sessionSummary, [
    "participant_id",
  ]).map((g) => ({
    participant_id: g[0].participant_id,
    ...Object.fromEntries(descriptions.map((f) => [f, median(values(g, f))])),
  }));
  const rateDrift: Row[] = groupBy(sessionSummary, ["participant_id"]).map(
    (g) => {
      const splitRate = (split: string): number | "" => {
        const xs = values(
          g.filter((r) => r.split === split),
          "strokes_per_minute",
        );
        return xs.length ? median(xs) : "";
      };
      const train = splitRate("train"),
        test = splitRate("test");
      return {
        participant_id: g[0].participant_id,
        test,
        train,
        validation: splitRate("validation"),
        test_minus_train_percent:
          typeof test === "number" && typeof train === "number" && train !== 0
            ? 100 * (test / train - 1)
            : "",
      };
    },
  );
  const windowSummary: Row[] = groupBy(windows, ["window_size", "split"]).map(
    (g) => ({
      window_size: g[0].window_size,
      split: g[0].split,
      windows: g.length,
      sessions: unique(g.map((r) => r.session_id)).length,
      median_dwell_ms: median(values(g, "dwell_median_ms")),
      dwell_median_iqr_ms:
        quantile(values(g, "dwell_median_ms"), 0.75) -
        quantile(values(g, "dwell_median_ms"), 0.25),
      median_rate: median(values(g, "strokes_per_minute")),
    }),
  );
  const profileSummary: Row[] = groupBy(quality, ["participant_id"]).map(
    (g) => ({
      participant_id: g[0].participant_id,
      sessions: g.length,
      valid_strokes: sum(values(g, "valid_strokes")),
      excluded_pairs: sum(values(g, "excluded_pairs")),
      recording_minutes: sum(values(g, "recording_seconds")) / 60,
      interruptions: sum(values(g, "interruptions")),
      repeats: sum(values(g, "repeats")),
    }),
  );
  for (const [name, rows] of [
    ["session_feature_summary", sessionSummary],
    ["profile_feature_summary", profileFeatures],
    ["session_drift_summary", rateDrift],
    ["window_size_summary", windowSummary],
    ["profile_summary", profileSummary],
  ] as const)
    await writeCsv(join(output, `${name}.csv`), rows);
  const series = (
    name: string,
    data: Series["data"],
    type: Series["type"] = "line",
  ): Series => ({ name, type, data });
  const figures: Figure[] = [
    {
      name: "01_timing_distributions",
      title: `Timing distributions (${strokes.length.toLocaleString("en-US")} complete strokes)`,
      panels: [
        {
          x: "Dwell (ms)",
          y: "Density",
          series: ids.map((id) => {
            const v = strokes
              .filter((s) => s.participant_id === id)
              .map((s) => s.dwell_ms);
            return {
              ...series(
                id,
                histogram(v, Math.min(...v), Math.max(...v), 45, true),
              ),
              step: "middle",
            };
          }),
        },
        {
          x: "Flight (ms); display restricted to −200…1,000",
          y: "Interval count",
          min: -200,
          max: 1000,
          series: ids.map((id) => ({
            ...series(
              id,
              histogram(
                values(
                  flights.filter((r) => r.participant_id === id),
                  "flight_ms",
                ),
                -200,
                1000,
                74,
              ),
            ),
            step: "middle",
          })),
        },
      ],
    },
    {
      name: "02_session_variation",
      title: `Between-profile and within-profile variation (${sessionSummary.length} sessions; W=50)`,
      panels: [
        {
          x: "Simulated profile",
          y: "Session median of window dwell medians (ms)",
          categories: ids,
          series: ids.map((id, i) =>
            series(
              id,
              sessionSummary
                .filter((r) => r.participant_id === id)
                .map((r) => [i, Number(r.dwell_median_ms)]),
              "scatter",
            ),
          ),
        },
        {
          x: "Synthetic session order",
          y: "Session median typing rate (strokes/min)",
          series: ids.map((id) => ({
            ...series(
              id,
              sessionSummary
                .filter((r) => r.participant_id === id)
                .map((r, i) => [i + 1, Number(r.strokes_per_minute)]),
            ),
            showSymbol: true,
          })),
        },
      ],
    },
    {
      name: "03_window_sizes",
      title: "Window size: counts and descriptive variability",
      panels: [
        {
          x: "Window size (strokes)",
          y: "Usable non-overlapping windows",
          series: splits.map((s) => ({
            ...series(
              s,
              windowSummary
                .filter((r) => r.split === s)
                .map((r) => [Number(r.window_size), Number(r.windows)]),
            ),
            showSymbol: true,
          })),
        },
        {
          x: "Window size (strokes)",
          y: "IQR of window dwell medians (ms)",
          series: splits.map((s) => ({
            ...series(
              s,
              windowSummary
                .filter((r) => r.split === s)
                .map((r) => [
                  Number(r.window_size),
                  Number(r.dwell_median_iqr_ms),
                ]),
            ),
            showSymbol: true,
          })),
        },
      ],
    },
    {
      name: "04_normalized_features",
      title: "Training-fitted normalization; W=50",
      panels: ["dwell_median_ms", "strokes_per_minute"].map((f) => ({
        x: `Normalized ${f} (dimensionless)`,
        y: "Empirical cumulative proportion",
        series: splits.map((s) => {
          const v = values(
            normalized.filter((w) => w.window_size === 50 && w.split === s),
            f,
          ).sort((a, b) => a - b);
          return series(
            s,
            v.map((x, i) => [x, (i + 1) / v.length]),
          );
        }),
      })) as Figure["panels"],
    },
    {
      name: "05_quality",
      title: "Coverage and quality diagnostics",
      panels: [
        {
          x: "Simulated profile",
          y: "Complete strokes",
          categories: ids,
          series: [
            series(
              "Complete strokes",
              values(profileSummary, "valid_strokes"),
              "bar",
            ),
          ],
        },
        {
          x: "Simulated profile",
          y: "Event/pair count",
          categories: ids,
          series: ["excluded_pairs", "interruptions", "repeats"].map((f) =>
            series(f, values(profileSummary, f), "bar"),
          ),
        },
      ],
    },
  ];
  await renderFigures(figures, join(output, "figures"));
  const inactive = Object.values(parameters.profiles)
      .flatMap((p) => p.active)
      .filter((v) => !v).length,
    negative = flights.filter((f) => Number(f.flight_ms) < 0).length;
  const format = (n: number) => n.toLocaleString("en-US");
  const runConfig = await readJson<{ generator_version: string }>(
    join(output, "config.json"),
  );
  const replacements: Record<string, string> = {
    generator_version: runConfig.generator_version,
    profile_ids: ids.join(", "),
    inactive: String(inactive),
    sessions: String(quality.length),
    strokes_formatted: format(strokes.length),
    excluded_pairs: String(sum(values(quality, "excluded_pairs"))),
    recording_minutes: (sum(values(quality, "recording_seconds")) / 60).toFixed(
      2,
    ),
    paused_minutes: (sum(values(quality, "paused_seconds")) / 60).toFixed(2),
    adjacent_intervals_formatted: format(flights.length),
    negative_flight_formatted: format(negative),
    negative_flight_percent: (flights.length
      ? (negative / flights.length) * 100
      : 0
    ).toFixed(2),
    profile_summary_table: markdownTable(profileSummary),
    profile_features_table: markdownTable(profileFeatures),
    rate_drift_table: markdownTable(rateDrift),
    window_summary_table: markdownTable(windowSummary),
    dropped_tail_strokes: String(sum(values(tails, "dropped_tail_strokes"))),
  };
  const template = await readFile(
    join(packageRoot, "templates/report.md"),
    "utf8",
  );
  const report = template.replace(/\{([^}]+)\}/g, (_match, key: string) => {
    if (!(key in replacements))
      throw new Error(`Unknown report placeholder ${key}`);
    return replacements[key];
  });
  await writeFile(join(output, "report.md"), report);
  await writeFile(
    join(output, "report.vi.html"),
    await renderHtml(report, output),
  );
  return {
    sessions: quality.length,
    valid_strokes: strokes.length,
    excluded_pairs: sum(values(quality, "excluded_pairs")),
    windows_by_size: Object.fromEntries(
      groupBy(windows, ["window_size"]).map((g) => [
        String(g[0].window_size),
        g.length,
      ]),
    ),
    negative_flight_count: negative,
    adjacent_intervals: flights.length,
    inactive_normalizer_dimensions: inactive,
  };
}
