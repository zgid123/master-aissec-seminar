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
  const strokes: Stroke[] = [],
    qualities: QualityDetails[] = [],
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
      strokes.push(...validated.strokes);
      qualities.push(validated.quality);
    } catch (error) {
      rejected.push({
        manifest_row: index,
        file: raw && typeof raw === "object" ? (raw.file ?? null) : null,
        reason: error instanceof Error ? error.message : String(error),
      });
    }
  }
  await saveJson(join(output, "rejections.json"), rejected);
  await saveJson(join(output, "quality_details.json"), qualities);
  if (!qualities.length)
    throw new Error("No valid input sessions; inspect rejections.json");
  if (kinds.size !== 1)
    throw new Error("Do not mix real and synthetic sessions in one run");
  const quality: Row[] = qualities.map(
    ({ diagnostics: _, exclusion_reasons: __, ...q }) => q,
  );
  const { windows, tails } = extractWindows(
    strokes,
    config.window_sizes,
    config.pause_threshold_ms,
  );
  if (!windows.length) throw new Error("No usable windows");
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
  const parameters = fitNormalizers(windows),
    normalized = transformWindows(windows, parameters);
  await writeCsv(join(output, "normalized_windows.csv"), normalized, [
    ...WINDOW_METADATA,
    ...FEATURE_COLUMNS,
    "claimed_profile",
  ]);
  await saveJson(join(output, "normalizers.json"), parameters);
  const kind = [...kinds][0];
  const summary: Summary =
    kind === "synthetic"
      ? await analyze(
          strokes,
          windows,
          normalized,
          quality,
          tails,
          output,
          parameters,
        )
      : {
          sessions: quality.length,
          valid_strokes: strokes.length,
          windows: windows.length,
          note: "Real inputs: simulation report generation disabled",
        };
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
