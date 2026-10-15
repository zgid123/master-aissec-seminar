import { join } from "node:path";
import { readCsv, readJson, unique } from "../src/io.js";
import { FEATURE_COLUMNS, transformWindows } from "../src/index.js";
import type { Window, Normalizers } from "../src/types.js";
const directory = process.argv[2] ?? "../artifacts/processed",
  target = process.argv[3] ?? "SIM01";
const windows = await readCsv<Window>(join(directory, "windows.csv")),
  parameters = await readJson<Normalizers>(join(directory, "normalizers.json"));
const transformed = transformWindows(
  windows.filter((w) => w.split === "test" && w.window_size === 50),
  parameters,
  target,
);
const X = transformed.map((w) => FEATURE_COLUMNS.map((f) => Number(w[f])));
console.log(
  JSON.stringify(
    {
      shape: [X.length, FEATURE_COLUMNS.length],
      claimed_profile: target,
      feature_names: FEATURE_COLUMNS,
      data_kind: unique(transformed.map((w) => w.data_kind)),
    },
    null,
    2,
  ),
);
