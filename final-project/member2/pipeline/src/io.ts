import { createHash } from "node:crypto";
import {
  readFile,
  writeFile,
  mkdir,
  readdir,
  realpath,
} from "node:fs/promises";
import { dirname, resolve, relative, isAbsolute, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";
import type { Row } from "./types.js";
export const packageRoot = fileURLToPath(new URL("../../", import.meta.url));
export const readJson = async <T = unknown>(path: string): Promise<T> =>
  JSON.parse(await readFile(path, "utf8")) as T;
export async function saveJson(path: string, value: unknown) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(
    path,
    JSON.stringify(
      value,
      (_key, v: unknown) => {
        if (typeof v === "number" && !Number.isFinite(v))
          throw new Error("JSON values must be finite");
        return v;
      },
      2,
    ) + "\n",
  );
}
export const digest = async (path: string) =>
  createHash("sha256")
    .update(await readFile(path))
    .digest("hex");
export async function requireEmpty(path: string) {
  await mkdir(path, { recursive: true });
  if ((await readdir(path)).length)
    throw new Error(`Output must be empty; choose a new directory: ${path}`);
  return resolve(path);
}
export async function filesUnder(root: string): Promise<string[]> {
  const result: string[] = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const path = join(root, entry.name);
    if (entry.isDirectory()) result.push(...(await filesUnder(path)));
    else if (entry.isFile()) result.push(path);
    else throw new Error(`Unsupported symlink or special file: ${path}`);
  }
  return result.sort();
}
export async function insideFile(root: string, file: unknown) {
  if (typeof file !== "string")
    throw new Error("Manifest file must be a string");
  const path = await realpath(resolve(root, file));
  const rel = relative(await realpath(root), path);
  if (rel === ".." || rel.startsWith("../") || isAbsolute(rel))
    throw new Error("Input file must be inside input directory");
  return path;
}
export async function writeCsv(
  path: string,
  rows: Row[],
  columns = Object.keys(rows[0] ?? {}),
) {
  await writeFile(
    path,
    stringify(rows, {
      header: true,
      columns,
      cast: {
        number: (v) => {
          if (!Number.isFinite(v))
            throw new Error("CSV numbers must be finite");
          return Number(v.toPrecision(9)).toString();
        },
        boolean: (v) => (v ? "True" : "False"),
      },
    }),
  );
}
export async function readCsv<T extends Row = Row>(path: string): Promise<T[]> {
  return parse(await readFile(path, "utf8"), {
    columns: true,
    skip_empty_lines: true,
    cast: (
      value: string,
      context: { header: boolean; column: string | number },
    ) => {
      if (
        context.header ||
        [
          "participant_id",
          "session_id",
          "window_id",
          "claimed_profile",
          "data_kind",
          "group",
          "split",
        ].includes(String(context.column))
      )
        return value;
      if (value === "True" || value === "False") return value === "True";
      return value.trim() !== "" && Number.isFinite(Number(value))
        ? Number(value)
        : value;
    },
  }) as T[];
}
export function groupBy<T extends Row>(rows: T[], keys: string[]): T[][] {
  const groups = new Map<string, T[]>();
  for (const row of rows) {
    const key = JSON.stringify(keys.map((k) => row[k]));
    const g = groups.get(key) ?? [];
    g.push(row);
    groups.set(key, g);
  }
  return [...groups.values()].sort((a, b) => {
    for (const key of keys) {
      const x = a[0][key],
        y = b[0][key];
      if (x < y) return -1;
      if (x > y) return 1;
    }
    return 0;
  });
}
export const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
export const unique = <T>(xs: T[]) => [...new Set(xs)];
export function quantile(xs: number[], q: number) {
  if (!xs.length || xs.some((x) => !Number.isFinite(x)))
    throw new Error("Statistics require nonempty finite values");
  const sorted = [...xs].sort((a, b) => a - b),
    index = (sorted.length - 1) * q,
    lo = Math.floor(index),
    fraction = index - lo;
  return sorted[lo] + fraction * ((sorted[lo + 1] ?? sorted[lo]) - sorted[lo]);
}
export const median = (xs: number[]) => quantile(xs, 0.5);
export const values = (rows: Row[], key: string) =>
  rows.map((r) => Number(r[key]));
