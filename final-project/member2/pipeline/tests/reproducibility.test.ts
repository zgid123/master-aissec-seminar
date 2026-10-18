import test from "node:test";
import assert from "node:assert/strict";
import {
  compareArtifactHashes,
  REPRODUCIBILITY_EXCLUSIONS,
} from "../src/reproducibility.js";

test("a changed reproducible CSV fails the artifact comparison", () => {
  assert.throws(
    () =>
      compareArtifactHashes(
        { "processed/sessions.csv": "changed" },
        { "processed/sessions.csv": "canonical" },
      ),
    /processed\/sessions.csv/,
  );
});

test("PDF content is excluded explicitly while other artifact hashes are checked", () => {
  const compared = compareArtifactHashes(
    {
      "processed/sessions.csv": "same",
      "processed/report.vi.pdf": "changed PDF",
      "processed/run.json": "changed provenance timestamp",
    },
    {
      "processed/sessions.csv": "same",
      "processed/report.vi.pdf": "canonical PDF",
      "processed/run.json": "canonical provenance timestamp",
    },
  );
  assert.deepEqual(compared, ["processed/sessions.csv"]);
  assert.ok(REPRODUCIBILITY_EXCLUSIONS.some((item) => /PDF files entirely/.test(item)));
});

test("additional or missing comparable files fail the artifact comparison", () => {
  assert.throws(
    () => compareArtifactHashes({ "processed/sessions.csv": "same" }, {}),
    /file lists differ/,
  );
});
