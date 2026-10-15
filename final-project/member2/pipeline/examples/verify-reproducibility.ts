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
  const paths = (await filesUnder(temporary)).filter(
    (p) => !p.endsWith(".pdf") && !p.endsWith("/run.json"),
  );
  const matched: Record<string, string> = {};
  for (const path of paths) {
    const rel = relative(temporary, path),
      hash = await digest(path);
    assert.equal(hash, await digest(join(canonical, rel)), rel);
    matched[rel] = hash;
  }
  const result = {
    result: "passed",
    generated_at_utc: fresh.generated_at_utc,
    files_compared: paths.length,
    exclusions: ["execution/provenance run.json timestamp", "PDF metadata"],
    summary: fresh.summary,
    matched_hashes: matched,
  };
  if (process.argv[3]) await saveJson(process.argv[3], result);
  console.log(
    JSON.stringify(
      {
        result: "passed",
        files_compared: paths.length,
        summary: fresh.summary,
      },
      null,
      2,
    ),
  );
} finally {
  await rm(temporary, { recursive: true, force: true });
}
