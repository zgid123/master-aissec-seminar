import assert from "node:assert/strict";
import { readFile, writeFile, stat } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { zipSync, unzipSync } from "fflate";
import { createHash } from "node:crypto";
import { packageRoot, filesUnder, readJson } from "../src/io.js";
import type { ManifestRow } from "../src/types.js";
const root = resolve(packageRoot, "..");
const manifest = await readJson<ManifestRow[]>(
  join(root, "artifacts/manifest.json"),
);
assert.ok(
  manifest.length && manifest.every((r) => r.data_kind === "synthetic"),
);
const allowed = [
  ".gitignore",
  "Makefile",
  "README.md",
  "VERIFICATION.md",
  "docs",
  "artifacts",
  "pipeline/config.json",
  "pipeline/package.json",
  "pipeline/pnpm-lock.yaml",
  "pipeline/tsconfig.json",
  "pipeline/src",
  "pipeline/tests",
  "pipeline/examples",
  "pipeline/templates",
  "collector/.gitignore",
  "collector/README.md",
  "collector/package.json",
  "collector/pnpm-lock.yaml",
  "collector/pnpm-workspace.yaml",
  "collector/tsconfig.json",
  "collector/src",
  "collector/scripts",
  "collector/server",
  "collector/tests",
];
const input: Record<string, Uint8Array> = {};
for (const entry of allowed) {
  const path = join(root, entry),
    paths = (await stat(path)).isDirectory() ? await filesUnder(path) : [path];
  for (const file of paths) {
    const rel = relative(root, file);
    assert.ok(
      !rel
        .split("/")
        .some(
          (p) =>
            [
              "private",
              "node_modules",
              ".artifacts",
              ".venv",
              "__pycache__",
              ".pytest_cache",
              "dist",
            ].includes(p) ||
            p.endsWith(".egg-info") ||
            p === ".DS_Store",
        ),
    );
    assert.ok(!rel.startsWith("data/real/"));
    assert.ok(!/\.(py|pyc)$/.test(rel), `Unexpected Python file: ${rel}`);
    assert.ok(!/\.(js|jsx|mjs|cjs)$/.test(rel), `Expected TypeScript source: ${rel}`);
    input[`member2/${rel}`] = await readFile(file);
  }
}
const zipped = zipSync(input, { level: 6 }),
  check = unzipSync(zipped);
assert.deepEqual(Object.keys(check).sort(), Object.keys(input).sort());
for (const name of Object.keys(input))
  assert.ok(Buffer.from(check[name]).equals(input[name]), name);
const archive = resolve(root, "../member2-final-simulation.zip");
await writeFile(archive, zipped);
const sha256 = createHash("sha256").update(zipped).digest("hex");
await writeFile(
  archive.replace(/\.zip$/, ".sha256"),
  `${sha256}  member2-final-simulation.zip\n`,
);
console.log(
  JSON.stringify(
    { archive, files: Object.keys(input).length, bytes: zipped.length, sha256 },
    null,
    2,
  ),
);
