import assert from "node:assert/strict";
import { join, relative, resolve } from "node:path";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import {
  packageRoot,
  readJson,
  saveJson,
  filesUnder,
  digest,
} from "../src/io.js";
import { generateDataset, processDataset } from "../src/index.js";
import {
  compareArtifactHashes,
  REPRODUCIBILITY_EXCLUSIONS,
} from "../src/reproducibility.js";
import type { Config, Run } from "../src/types.js";
const canonical = resolve(process.argv[2] ?? "../artifacts"),
  temporary = await mkdtemp(join(tmpdir(), "member2-repro-"));
try {
  const config = await readJson<Config>(join(canonical, "config.json"));
  await saveJson(join(temporary, "config.json"), config);
  await generateDataset(config, temporary);
  const fresh = await processDataset(
    temporary,
    join(temporary, "manifest.json"),
    config,
    join(temporary, "processed"),
  );
  const original = await readJson<Run>(join(canonical, "processed/run.json"));
  assert.deepEqual(fresh.summary, original.summary);
  assert.deepEqual(fresh.input_hashes, original.input_hashes);
  assert.deepEqual(fresh.source_hashes, original.source_hashes);
  const hashes = async (directory: string) => {
    const result: Record<string, string> = {};
    for (const path of await filesUnder(directory))
      result[relative(directory, path)] = await digest(path);
    return result;
  };
  const [generatedHashes, referenceHashes] = await Promise.all([
    hashes(temporary),
    hashes(canonical),
  ]);
  const paths = compareArtifactHashes(generatedHashes, referenceHashes);
  const matched = Object.fromEntries(
    paths.map((path) => [path, generatedHashes[path]]),
  );
  const result = {
    result: "passed",
    generated_at_utc: fresh.generated_at_utc,
    files_compared: paths.length,
    exclusions: REPRODUCIBILITY_EXCLUSIONS,
    compared_scope: "All files except run.json and PDF files, by SHA-256",
    summary: fresh.summary,
    matched_hashes: matched,
  };
  if (process.argv[3]) await saveJson(process.argv[3], result);
  console.log(
    JSON.stringify(
      {
        result: "passed",
        files_compared: paths.length,
        exclusions: REPRODUCIBILITY_EXCLUSIONS,
        summary: fresh.summary,
      },
      null,
      2,
    ),
  );
} finally {
  await rm(temporary, { recursive: true, force: true });
}
