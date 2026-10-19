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
const TARGET_PARTICIPANTS = 20;
const TARGET_FORMAL_SESSIONS = TARGET_PARTICIPANTS * 5;
export async function analyze(
  strokes: Stroke[],
  windows: Window[],
  normalized: Window[],
  quality: Row[],
  tails: Row[],
  output: string,
  parameters: Normalizers,
  dataKind: "real" | "synthetic",
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
  const windowSessionFeatures = groupBy(windows, [
    "participant_id",
    "session_id",
    "split",
    "window_size",
  ]).flatMap((g) =>
    FEATURE_COLUMNS.map((feature) => ({
      split: g[0].split,
      window_size: g[0].window_size,
      feature,
      value: median(values(g, feature)),
    })),
  );
  const featureDistributionSummary: Row[] = groupBy(windowSessionFeatures, [
    "split",
    "window_size",
    "feature",
  ]).map((g) => {
    const xs = values(g, "value").sort((a, b) => a - b);
    return {
      split: g[0].split,
      window_size: g[0].window_size,
      feature: g[0].feature,
      sessions: xs.length,
      median_session_value: median(xs),
      iqr_session_value: quantile(xs, 0.75) - quantile(xs, 0.25),
      minimum_session_value: xs[0],
      maximum_session_value: xs.at(-1)!,
    };
  });
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
  const splitSummary: Row[] = splits.map((split) => {
    const sessions = quality.filter((r) => r.split === split),
      splitStrokes = strokes.filter((r) => r.split === split),
      splitWindows = windows.filter((r) => r.split === split);
    return {
      split,
      participants: unique(sessions.map((r) => r.participant_id)).length,
      sessions: sessions.length,
      eligible_research_sessions: sessions.filter(
        (r) => r.research_eligible === true,
      ).length,
      excluded_sessions: sessions.filter((r) => r.research_eligible === false)
        .length,
      complete_strokes: splitStrokes.length,
      feature_sessions: unique(splitWindows.map((r) => r.session_id)).length,
      normalized_feature_windows: normalized.filter((r) => r.split === split)
        .length,
      windows_without_train_normalizer: splitWindows.filter((w) =>
        !parameters.profiles[`${w.participant_id}:${w.window_size}`],
      ).length,
      windows_w50: splitWindows.filter((r) => r.window_size === 50).length,
      recording_minutes: sum(values(sessions, "recording_seconds")) / 60,
      excluded_pairs: sum(values(sessions, "excluded_pairs")),
      formal_sessions_below_target: sessions.filter(
        (r) => r.collection_mode === "formal" && r.session_target_met === false,
      ).length,
      sessions_with_unspecified_mode: sessions.filter(
        (r) => r.collection_mode === "unspecified",
      ).length,
    };
  });
  const activeFormalSessions = quality.filter(
    (r) => r.collection_mode === "formal" && !r.superseded_by_session_id,
  ),
    participants = unique(activeFormalSessions.map((r) => String(r.participant_id))),
    protocolComplete = new Set(
      activeFormalSessions
        .filter(
          (r) => r.participant_protocol_complete === true,
        )
        .map((r) => String(r.participant_id)),
    ),
    exclusionReasons: Record<string, number> = {};
  for (const row of quality) {
    for (const reason of String(row.eligibility_reasons ?? "")
      .split(";")
      .filter(Boolean))
      exclusionReasons[reason] = (exclusionReasons[reason] ?? 0) + 1;
  }
  const studyDesign =
    dataKind === "real"
      ? {
          target_participants: TARGET_PARTICIPANTS,
          participants: participants.length,
          participants_missing_target: Math.max(
            0,
            TARGET_PARTICIPANTS - participants.length,
          ),
          protocol_complete_participants: protocolComplete.size,
          protocol_incomplete_participants:
            participants.length - protocolComplete.size,
          target_formal_sessions: TARGET_FORMAL_SESSIONS,
          formal_sessions: activeFormalSessions.length,
          formal_sessions_missing_target: Math.max(
            0,
            TARGET_FORMAL_SESSIONS -
              activeFormalSessions.length,
          ),
          eligible_sessions: quality.filter((r) => r.research_eligible === true)
            .length,
          excluded_sessions: quality.filter((r) => r.research_eligible === false)
            .length,
          study_complete:
            participants.length === TARGET_PARTICIPANTS &&
            protocolComplete.size === TARGET_PARTICIPANTS &&
            activeFormalSessions.length ===
              TARGET_FORMAL_SESSIONS &&
            quality.filter((r) => r.research_eligible === true).length ===
              TARGET_FORMAL_SESSIONS,
          exclusion_reasons: exclusionReasons,
        }
      : undefined;
  const publicFeatureSummary: Row[] = splits.flatMap((split) => {
    const rows = sessionSummary.filter((r) => r.split === split);
    return FEATURE_COLUMNS.map((feature) => {
      const xs = values(rows, feature);
      return {
        split,
        feature,
        session_median: xs.length ? median(xs) : "",
        session_iqr: xs.length
          ? quantile(xs, 0.75) - quantile(xs, 0.25)
          : "",
        sessions: xs.length,
      };
    });
  });
  for (const [name, rows, emptyColumns] of [
    [
      "session_feature_summary",
      sessionSummary,
      ["participant_id", "session_id", "split", ...FEATURE_COLUMNS],
    ],
    [
      "profile_feature_summary",
      profileFeatures,
      ["participant_id", ...descriptions],
    ],
    [
      "session_drift_summary",
      rateDrift,
      ["participant_id", "test", "train", "validation", "test_minus_train_percent"],
    ],
    [
      "window_size_summary",
      windowSummary,
      [
        "window_size",
        "split",
        "windows",
        "sessions",
        "median_dwell_ms",
        "dwell_median_iqr_ms",
        "median_rate",
      ],
    ],
    [
      "profile_summary",
      profileSummary,
      [
        "participant_id",
        "sessions",
        "valid_strokes",
        "excluded_pairs",
        "recording_minutes",
        "interruptions",
        "repeats",
      ],
    ],
    [
      "feature_distribution_summary",
      featureDistributionSummary,
      [
        "split",
        "window_size",
        "feature",
        "sessions",
        "median_session_value",
        "iqr_session_value",
        "minimum_session_value",
        "maximum_session_value",
      ],
    ],
  ] as const)
    await writeCsv(
      join(output, `${name}.csv`),
      rows,
      rows.length ? Object.keys(rows[0]) : [...emptyColumns],
    );
  if (dataKind === "real" && windows.length === 0) {
    const exclusions = Object.entries(exclusionReasons)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([reason, sessions]) => ({ reason, sessions }));
    const report = [
      "# Báo cáo chất lượng dữ liệu người tham gia — Thành viên 2",
      "",
      "**Dữ liệu người tham gia thật. Không có phiên đủ điều kiện tạo cửa sổ đặc trưng; báo cáo này chỉ trình bày chất lượng và mức bao phủ tổng hợp.** Lưu trữ và chia sẻ theo quy trình đồng thuận của nhóm.",
      "",
      "## Mức bao phủ theo tập",
      "",
      markdownTable(splitSummary),
      "",
      `Có ${studyDesign!.participants}/${studyDesign!.target_participants} người tham gia mục tiêu và ${studyDesign!.formal_sessions}/${studyDesign!.target_formal_sessions} phiên formal mục tiêu. ${studyDesign!.protocol_complete_participants} người hoàn tất lịch năm phiên; ${studyDesign!.protocol_incomplete_participants} người có lịch chưa đủ hoặc sai. Hiện có ${studyDesign!.eligible_sessions} phiên đủ điều kiện phân tích và ${studyDesign!.excluded_sessions} phiên bị loại.`,
      "",
      "## Lý do loại theo phiên",
      "",
      markdownTable(exclusions),
      "",
      "Không có bảng đặc trưng hoặc hình phân phối vì không có cửa sổ đủ điều kiện. Kiểm tra pilot trên thiết bị/bộ gõ thực tế trước khi bắt đầu thu chính thức.",
      "",
      "Không suy ra hiệu quả xác thực hoặc chỉ số FAR/FRR/EER/TTD từ báo cáo chất lượng này.",
    ].join("\n");
    await writeFile(join(output, "report.md"), report);
    await writeFile(
      join(output, "report.vi.html"),
      await renderHtml(report, output, dataKind),
    );
    return {
      sessions: quality.length,
      valid_strokes: strokes.length,
      study_design: studyDesign,
      excluded_pairs: sum(values(quality, "excluded_pairs")),
      windows_by_size: {},
      negative_flight_count: 0,
      adjacent_intervals: 0,
      inactive_normalizer_dimensions: 0,
      split_summary: splitSummary,
    };
  }
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
  const realFigures: Figure[] = [
    {
      name: "01_timing_distributions",
      title: `Overall timing distributions (${strokes.length.toLocaleString("en-US")} complete strokes)`,
      panels: [
        {
          x: "Dwell (ms)",
          y: "Density",
          series: [
            {
              ...series(
                "All sessions",
                histogram(
                  strokes.map((s) => s.dwell_ms),
                  Math.min(...strokes.map((s) => s.dwell_ms)),
                  Math.max(...strokes.map((s) => s.dwell_ms)),
                  45,
                  true,
                ),
              ),
              step: "middle",
            },
          ],
        },
        {
          x: "Flight (ms); display restricted to −200…1,000",
          y: "Interval count",
          min: -200,
          max: 1000,
          series: [
            {
              ...series(
                "All sessions",
                histogram(
                  values(flights, "flight_ms"),
                  -200,
                  1000,
                  74,
                ),
              ),
              step: "middle",
            },
          ],
        },
      ],
    },
    {
      name: "02_session_variation",
      title: `Session variation by split (${sessionSummary.length} sessions; W=50)`,
      panels: [
        {
          x: "Split order (train, validation, test)",
          y: "Session median dwell (ms)",
          series: [
            series(
              "Sessions",
              sessionSummary.map((r) => [
                splits.indexOf(String(r.split)) + 1,
                Number(r.dwell_median_ms),
              ]),
              "scatter",
            ),
          ],
        },
        {
          x: "Split order (train, validation, test)",
          y: "Median typing rate (strokes/min)",
          series: [
            series(
              "Session median",
              splitSummary
                .filter((r) =>
                  sessionSummary.some((s) => s.split === r.split),
                )
                .map((r) => [
                  splits.indexOf(String(r.split)) + 1,
                  median(
                    values(
                      sessionSummary.filter((s) => s.split === r.split),
                      "strokes_per_minute",
                    ),
                  ),
                ]),
            ),
          ],
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
                .map((r) => [Number(r.window_size), Number(r.dwell_median_iqr_ms)]),
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
          return series(s, v.map((x, i) => [x, (i + 1) / v.length]));
        }),
      })) as Figure["panels"],
    },
    {
      name: "05_quality",
      title: "Coverage and quality by split",
      panels: [
        {
          x: "Split",
          y: "Complete strokes",
          categories: splits,
          series: [
            series(
              "Complete strokes",
              splitSummary.map((r) => Number(r.complete_strokes)),
              "bar",
            ),
          ],
        },
        {
          x: "Split",
          y: "Session/pair count",
          categories: splits,
          series: ["sessions", "excluded_pairs"].map((feature) =>
            series(feature, splitSummary.map((r) => Number(r[feature])), "bar"),
          ),
        },
      ],
    },
  ];
  await renderFigures(
    dataKind === "real" ? realFigures : figures,
    join(output, "figures"),
    dataKind === "real"
      ? "REAL PARTICIPANT DATA — aggregate descriptive summaries"
      : undefined,
  );
  const inactive = Object.values(parameters.profiles)
      .flatMap((p) => p.active)
      .filter((v) => !v).length,
    negative = flights.filter((f) => Number(f.flight_ms) < 0).length;
  const format = (n: number) => n.toLocaleString("en-US");
  let report: string;
  if (dataKind === "synthetic") {
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
    report = template.replace(/\{([^}]+)\}/g, (_match, key: string) => {
      if (!(key in replacements))
        throw new Error(`Unknown report placeholder ${key}`);
      return replacements[key];
    });
  } else {
    report = [
      "# Báo cáo dữ liệu người tham gia — Thành viên 2",
      "",
      "**Dữ liệu người tham gia thật. Báo cáo này chỉ trình bày thống kê mô tả tổng hợp; không chứa mã người tham gia và không đánh giá hiệu quả xác thực.** Lưu trữ và chia sẻ theo quy trình đồng thuận của nhóm.",
      "",
      "## Phạm vi dữ liệu",
      "",
      `Có ${format(strokes.length)} lần gõ hoàn chỉnh, ${format(flights.length)} khoảng giữa lần gõ và ${quality.length} phiên từ ${ids.length} người tham gia. Mọi bảng và hình được tổng hợp theo tập hoặc trên toàn bộ phiên; dữ liệu theo từng người trong các file CSV là dữ liệu nghiên cứu hạn chế truy cập.`,
      "",
      "## Chất lượng và mức bao phủ theo tập",
      "",
      markdownTable(splitSummary),
      "",
      `Có ${studyDesign!.participants}/${studyDesign!.target_participants} người tham gia mục tiêu và ${studyDesign!.formal_sessions}/${studyDesign!.target_formal_sessions} phiên formal mục tiêu. ${studyDesign!.protocol_complete_participants} người hoàn tất lịch năm phiên; ${studyDesign!.protocol_incomplete_participants} người có lịch chưa đủ hoặc sai. Hiện có ${studyDesign!.eligible_sessions} phiên đủ điều kiện phân tích và ${studyDesign!.excluded_sessions} phiên bị loại khỏi đặc trưng và chuẩn hóa. Mục tiêu mỗi phiên được tính lại từ cặp phím hợp lệ và thời gian ghi chủ động.`,
      "",
      "Lý do loại được đếm theo phiên:",
      "",
      markdownTable(
        Object.entries(exclusionReasons)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([reason, sessions]) => ({ reason, sessions })),
      ),
      "",
      "Lịch chính thức cần năm phiên mỗi người: hai phiên train ngày 1, hai phiên validation ngày 2 và một phiên test ngày 3. Hai phiên train ngày 1 cách nhau ít nhất 30 phút tính từ lúc phiên trước kết thúc đến lúc phiên sau bắt đầu (thời lượng gồm cả quãng tạm dừng). Hai phiên validation ngày 2 không được chồng lấp: phiên sau có thể bắt đầu đúng lúc phiên trước kết thúc, tính theo thời lượng tường gồm cả quãng tạm dừng; không yêu cầu thêm 30 phút nghỉ ở ngày 2. Ngày được gán tường minh trong manifest và kiểm tra theo thời gian bắt đầu tại múi giờ đã ghi. Pilot và phiên thiếu collection_mode được giữ trong tệp chất lượng nhưng không tham gia đặc trưng.",
      "",
      "## Đặc trưng theo phiên",
      "",
      "Bảng dưới đây tổng hợp trung vị và IQR giữa các phiên của trung vị cửa sổ W=50. Đơn vị thời gian là ms; tốc độ tính bằng lần nhấn vật lý mỗi phút.",
      "",
      markdownTable(publicFeatureSummary),
      "",
      "## Kích thước cửa sổ",
      "",
      markdownTable(windowSummary),
      "",
      "## Phương pháp và giới hạn",
      "",
      `Các cửa sổ không chồng lấp có kích thước 20, 50 và 100 lần gõ. Bộ chuẩn hóa median/MAD chỉ được khớp trên tập train; ${inactive} chiều không hoạt động có scale bằng 0 và được giữ ở giá trị 0. Các hình phân phối chuẩn hóa dùng điểm chuẩn hóa theo hồ sơ nguồn nhằm mô tả dữ liệu. Khi chấm điểm một tài khoản đích, phải áp dụng normalizer của tài khoản đó như hướng dẫn bàn giao.`,
      "",
      "Thống kê này không chứng minh khả năng phân biệt người dùng, hiệu quả mô hình, FAR/FRR/EER hay thời gian phát hiện. Thành viên 3/4 cần đánh giá các kết quả đó theo quy trình thực nghiệm chung; thành viên khác cần review độc lập công thức và xử lý chất lượng.",
      "",
      `Tổng số khoảng thời gian âm do chồng lấp phím: ${format(negative)} / ${format(flights.length)} (${flights.length ? ((negative / flights.length) * 100).toFixed(2) : "0.00"}%). Tổng số lần gõ ở phần đuôi cửa sổ bị bỏ: ${format(sum(values(tails, "dropped_tail_strokes")))}.`,
    ].join("\n");
  }
  await writeFile(join(output, "report.md"), report);
  await writeFile(
    join(output, "report.vi.html"),
    await renderHtml(report, output, dataKind),
  );
  return {
    sessions: quality.length,
    valid_strokes: strokes.length,
    ...(studyDesign ? { study_design: studyDesign } : {}),
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
    split_summary: splitSummary,
  };
}
