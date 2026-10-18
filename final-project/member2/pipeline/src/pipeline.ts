import { join, relative } from "node:path";
import {
  readJson,
  saveJson,
  digest,
  requireEmpty,
  insideFile,
  writeCsv,
  filesUnder,
  packageRoot,
} from "./io.js";
import { validateSession, STROKE_COLUMNS } from "./preprocess.js";
import {
  extractWindows,
  FEATURE_COLUMNS,
  WINDOW_METADATA,
} from "./features.js";
import { fitNormalizers, transformWindows } from "./normalize.js";
import { analyze } from "./analysis.js";
import { auditReplacements, auditStudyDesign } from "./study-design.js";
import type {
  Config,
  ManifestRow,
  Session,
  Stroke,
  QualityDetails,
  Row,
  Run,
  Summary,
} from "./types.js";
export async function processDataset(
  inputDir: string,
  manifestPath: string,
  config: Config,
  destination: string,
): Promise<Run> {
  const output = await requireEmpty(destination),
    manifest = await readJson<unknown>(manifestPath);
  if (!Array.isArray(manifest) || !manifest.length)
    throw new Error("Manifest must be a nonempty list");
  await saveJson(join(output, "config.json"), config);
  const accepted: {
      row: ManifestRow;
      metadata: Session["metadata"];
      strokes: Stroke[];
      quality: QualityDetails;
    }[] = [],
    rejected: { manifest_row: number; file: unknown; reason: string }[] = [],
    seenIds = new Set<string>(),
    seenHashes = new Set<string>(),
    kinds = new Set<"real" | "synthetic">(),
    inputHashes: Record<string, string> = {};
  for (const [index, raw] of manifest.entries()) {
    try {
      if (!raw || typeof raw !== "object" || Array.isArray(raw))
        throw new Error("Manifest row must be an object");
      const row = raw as ManifestRow,
        path = await insideFile(inputDir, row.file),
        hash = await digest(path);
      inputHashes[row.file] = hash;
      const data = await readJson<Session>(path),
        meta = data?.metadata;
      for (const key of ["participant_id", "session_id"] as const)
        if (!meta || row[key] !== meta[key])
          throw new Error(`Manifest ${key} does not match file`);
      if (row.data_kind !== data.data_kind)
        throw new Error("Manifest data_kind mismatch");
      if (data.data_kind === "synthetic") {
        const day = meta.study_day;
        if (
          ![1, 2, 3].includes(day!) ||
          row.study_day !== day ||
          row.split !==
            ({ 1: "train", 2: "validation", 3: "test" } as const)[
              day as 1 | 2 | 3
            ]
        )
          throw new Error("Synthetic study day/split mismatch");
      }
      if (seenIds.has(meta.session_id) || seenHashes.has(hash))
        throw new Error("Duplicate session ID or file content");
      const validated = validateSession(data, row.split);
      seenIds.add(meta.session_id);
      seenHashes.add(hash);
      kinds.add(data.data_kind);
      accepted.push({
        row,
        metadata: meta,
        strokes: validated.strokes,
        quality: validated.quality,
      });
    } catch (error) {
      rejected.push({
        manifest_row: index,
        file: raw && typeof raw === "object" ? (raw.file ?? null) : null,
        reason: error instanceof Error ? error.message : String(error),
      });
    }
  }
  await saveJson(join(output, "rejections.json"), rejected);
  if (!accepted.length)
    throw new Error("No valid input sessions; inspect rejections.json");
  if (kinds.size !== 1)
    throw new Error("Do not mix real and synthetic sessions in one run");
  const kind = [...kinds][0];
  const realStudySessions = accepted.map(({ row, metadata, quality }) => ({
    row,
    metadata,
    wallDurationMs: quality.wall_seconds * 1000,
  }));
  const replacementAudit =
      kind === "real" ? auditReplacements(realStudySessions) : undefined,
    supersededIds = new Set(replacementAudit?.supersededBy.keys() ?? []),
    studyAudit =
      kind === "real"
        ? auditStudyDesign(
            realStudySessions.filter(
              ({ row }) => !supersededIds.has(row.session_id),
            ),
          )
        : undefined;
  const eligibleSessionIds = new Set<string>();
  for (const entry of accepted) {
    const { row, metadata, quality: q } = entry;
    q.study_day = Number.isInteger(row.study_day) ? row.study_day! : "";
    q.supersedes_session_id = row.supersedes_session_id ?? "";
    if (kind === "synthetic") {
      q.research_eligible = "";
      eligibleSessionIds.add(row.session_id);
      continue;
    }
    q.superseded_by_session_id =
      replacementAudit!.supersededBy.get(row.session_id) ?? "";
    const reasons = [...(studyAudit!.sessionReasons.get(row.session_id) ?? [])];
    reasons.push(
      ...(replacementAudit!.invalidReplacementReasons.get(row.session_id) ?? []),
    );
    if (q.superseded_by_session_id) reasons.push("superseded_session");
    if (q.superseded_by_session_id) {
      q.eligibility_reasons = [...new Set(reasons)].sort().join(";");
      q.research_eligible = false;
      continue;
    }
    if (metadata.collection_mode === "pilot") reasons.push("pilot_mode");
    else if (metadata.collection_mode !== "formal")
      reasons.push("collection_mode_unspecified");
    if (metadata.collection_mode === "formal") {
      if (q.stroke_target_met !== true) reasons.push("below_stroke_target");
      if (q.recording_target_met !== true) reasons.push("below_recording_target");
      q.participant_protocol_complete =
        studyAudit!.participantProtocolComplete.get(row.participant_id) ?? false;
    }
    q.eligibility_reasons = [...new Set(reasons)].sort().join(";");
    q.research_eligible = reasons.length === 0;
    if (q.research_eligible) eligibleSessionIds.add(row.session_id);
  }
  const qualities = accepted.map((entry) => entry.quality);
  const strokes: Stroke[] = accepted
    .filter((entry) => eligibleSessionIds.has(entry.row.session_id))
    .flatMap((entry) => entry.strokes);
  const { windows, tails } = extractWindows(
    strokes,
    config.window_sizes,
    config.pause_threshold_ms,
  );
  if (!windows.length && kind === "synthetic")
    throw new Error("No usable windows");
  const parameters = fitNormalizers(windows),
    availableProfiles = new Set(Object.keys(parameters.profiles)),
    normalizedSource = windows.filter((w) =>
      availableProfiles.has(`${w.participant_id}:${w.window_size}`),
    ),
    normalized = transformWindows(normalizedSource, parameters),
    windowsByProfile = new Map<string, number>();
  for (const w of windows) {
    const key = `${w.participant_id}:${w.window_size}`;
    windowsByProfile.set(key, (windowsByProfile.get(key) ?? 0) + 1);
  }
  const normalizationExclusions = [...windowsByProfile]
    .filter(([key]) => !availableProfiles.has(key))
    .map(([key, raw_feature_windows]) => {
      const [participant_id, size] = key.split(":");
      return {
        participant_id,
        window_size: Number(size),
        raw_feature_windows,
        normalized_feature_windows: 0,
        reason: "missing_eligible_training_windows",
      };
    });
  const normalizationReasonsByParticipant = new Map<string, string[]>();
  for (const row of normalizationExclusions) {
    const reasons = normalizationReasonsByParticipant.get(row.participant_id) ?? [];
    reasons.push(`missing_eligible_training_windows_W${row.window_size}`);
    normalizationReasonsByParticipant.set(row.participant_id, reasons);
  }
  for (const entry of accepted) {
    entry.quality.normalization_exclusion_reasons = (
      normalizationReasonsByParticipant.get(entry.row.participant_id) ?? []
    ).join(";");
  }
  await saveJson(join(output, "quality_details.json"), qualities);
  const quality: Row[] = qualities.map(
    ({ diagnostics: _, exclusion_reasons: __, ...q }) => q,
  );
  await writeCsv(join(output, "sessions.csv"), quality);
  await writeCsv(join(output, "strokes.csv"), strokes, STROKE_COLUMNS);
  await writeCsv(join(output, "windows.csv"), windows, [
    ...WINDOW_METADATA,
    ...FEATURE_COLUMNS,
  ]);
  await writeCsv(join(output, "window_tails.csv"), tails, [
    "session_id",
    "segment_id",
    "window_size",
    "dropped_tail_strokes",
  ]);
  await writeCsv(join(output, "normalized_windows.csv"), normalized, [
    ...WINDOW_METADATA,
    ...FEATURE_COLUMNS,
    "claimed_profile",
  ]);
  await writeCsv(
    join(output, "normalization_exclusions.csv"),
    normalizationExclusions,
    [
      "participant_id",
      "window_size",
      "raw_feature_windows",
      "normalized_feature_windows",
      "reason",
    ],
  );
  await saveJson(join(output, "normalizers.json"), parameters);
  const summary = await analyze(
    strokes,
    windows,
    normalized,
    quality,
    tails,
    output,
    parameters,
    kind,
  );
  if (summary.study_design)
    await saveJson(join(output, "study_design_summary.json"), summary.study_design);
  const pkg = await readJson<{ dependencies: Record<string, string> }>(
    join(packageRoot, "package.json"),
  );
  const sourceHashes: Record<string, string> = {};
  for (const path of [
    ...(await filesUnder(join(packageRoot, "src"))),
    ...(await filesUnder(join(packageRoot, "templates"))),
    join(packageRoot, "tsconfig.json"),
    join(packageRoot, "package.json"),
    join(packageRoot, "pnpm-lock.yaml"),
  ])
    sourceHashes[relative(packageRoot, path)] = await digest(path);
  const outputHashes: Record<string, string> = {};
  for (const path of await filesUnder(output))
    outputHashes[relative(output, path)] = await digest(path);
  const run: Run = {
    status: rejected.length ? "partial_failure" : "complete",
    data_kind: kind,
    generated_at_utc: new Date().toISOString(),
    node: process.version,
    generator_version: config.generator_version,
    dependencies: pkg.dependencies,
    input_hashes: inputHashes,
    manifest_sha256: await digest(manifestPath),
    config_sha256: await digest(join(output, "config.json")),
    source_hashes: sourceHashes,
    rejected_files: rejected.length,
    summary,
    output_hashes: outputHashes,
  };
  await saveJson(join(output, "run.json"), run);
  return run;
}
