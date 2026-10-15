#!/usr/bin/env node
import { parseArgs } from "node:util";
import { join } from "node:path";
import { readJson, saveJson, requireEmpty } from "./io.js";
import { generateDataset } from "./generate.js";
import { processDataset } from "./pipeline.js";
import type { Config } from "./types.js";
try {
  const [command, ...args] = process.argv.slice(2);
  const { values } = parseArgs({
    args,
    options: {
      config: { type: "string", default: "config.json" },
      output: { type: "string" },
      input: { type: "string" },
      manifest: { type: "string" },
      help: { type: "boolean" },
    },
  });
  if (values.help) {
    console.log(
      "keystroke-pipeline reproduce --config config.json --output DIR\nkeystroke-pipeline process --config config.json --input DIR --manifest FILE --output DIR",
    );
  } else {
    if (!["reproduce", "process"].includes(command) || !values.output)
      throw new Error("Expected reproduce|process and --output; use --help");
    const config = await readJson<Config>(values.config!);
    let run;
    if (command === "reproduce") {
      const target = await requireEmpty(values.output);
      await saveJson(join(target, "config.json"), config);
      await generateDataset(config, target);
      run = await processDataset(
        target,
        join(target, "manifest.json"),
        config,
        join(target, "processed"),
      );
    } else {
      if (!values.input || !values.manifest)
        throw new Error("process requires --input and --manifest");
      run = await processDataset(
        values.input,
        values.manifest,
        config,
        values.output,
      );
    }
    console.log(
      JSON.stringify(
        { status: run.status, data_kind: run.data_kind, ...run.summary },
        null,
        2,
      ),
    );
    process.exitCode = run.rejected_files ? 2 : 0;
  }
} catch (error) {
  console.error(
    `Pipeline failed: ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exitCode = 1;
}
