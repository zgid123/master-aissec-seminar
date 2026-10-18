import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { evaluate, userCsv, outcomesCsv, macroCsv, rocSvg } from './evaluate.mjs';
import { createFixture } from './fixture.mjs';

const hash = data => createHash('sha256').update(data).digest('hex');
const json = value => JSON.stringify(value, null, 2) + '\n';

function parse(args) {
  const options = {};
  for (let i = 0; i < args.length; i++) {
    const key = args[i];
    if (!['--demo', '--input', '--output', '--split', '--seed', '--horizon', '--iterations', '--baseline', '--candidate'].includes(key)) {
      throw new Error(`Unknown option: ${key}`);
    }
    if (Object.hasOwn(options, key)) throw new Error(`Duplicate option: ${key}`);
    if (key === '--demo') options[key] = true;
    else {
      if (!args[i + 1] || args[i + 1].startsWith('--')) throw new Error(`Missing value: ${key}`);
      options[key] = args[++i];
    }
  }
  if (!options['--output'] || Boolean(options['--demo']) === Boolean(options['--input'])) {
    throw new Error('Usage: node src/cli.mjs (--demo | --input input.json) --output NEW_DIRECTORY [--split test|validation] [--seed N] [--horizon KEYS] [--iterations N] [--baseline ID --candidate ID]');
  }
  return options;
}

export async function main(args) {
  const argsMap = parse(args);
  const inputBytes = argsMap['--demo'] ? Buffer.from(json(createFixture()))
    : await readFile(resolve(argsMap['--input']));
  const input = JSON.parse(inputBytes.toString('utf8'));
  const options = {
    split: argsMap['--split'] ?? 'test',
    seed: argsMap['--seed'] === undefined ? 20261016 : Number(argsMap['--seed']),
    horizonKeys: argsMap['--horizon'] === undefined ? 150 : Number(argsMap['--horizon']),
    iterations: argsMap['--iterations'] === undefined ? 2000 : Number(argsMap['--iterations']),
    baseline: argsMap['--baseline'] ?? (argsMap['--demo'] ? 'B1' : undefined),
    candidate: argsMap['--candidate'] ?? (argsMap['--demo'] ? 'P1' : undefined),
  };
  const report = evaluate(input, options);
  const files = {
    'input.json': inputBytes,
    'report.json': json(report),
    'per-user.csv': userCsv(report),
    'macro-summary.csv': macroCsv(report),
    'takeover-outcomes.csv': outcomesCsv(report),
    'roc.svg': rocSvg(report),
  };
  const sourceDir = dirname(fileURLToPath(import.meta.url));
  const sourceHashes = {};
  for (const filename of (await readdir(sourceDir)).filter(name => name.endsWith('.mjs')).sort()) {
    sourceHashes[filename] = hash(await readFile(join(sourceDir, filename)));
  }
  const git = spawnSync('git', ['--no-pager', 'rev-parse', 'HEAD'], { cwd: sourceDir, encoding: 'utf8' });
  const status = spawnSync('git', ['--no-pager', 'status', '--porcelain'], { cwd: sourceDir, encoding: 'utf8' });
  const manifest = {
    schema_version: '0.1', evaluator_version: '0.1.0', data_kind: input.data_kind,
    created_at: new Date().toISOString(), node_version: process.version, options,
    git_commit: git.status === 0 ? git.stdout.trim() : null,
    git_status: status.status === 0 ? status.stdout.trim() : null,
    git_warning: git.status !== 0 || status.status !== 0 ? 'Git metadata unavailable; use source hashes.' : null,
    input_sha256: hash(inputBytes), source_sha256: sourceHashes,
    output_sha256: Object.fromEntries(Object.entries(files).map(([name, content]) => [name, hash(content)])),
    source_validation: 'Declared manifest only; raw data files and fitting pipeline are not verified.',
  };
  const output = resolve(argsMap['--output']);
  await mkdir(dirname(output), { recursive: true });
  await mkdir(output);
  for (const [filename, contents] of Object.entries(files)) await writeFile(join(output, filename), contents);
  await writeFile(join(output, 'run.json'), json(manifest));
  console.log(`Created ${output}`);
  console.log(`Data kind: ${report.data_kind}; ${report.by_user.length} user-method rows.`);
  for (const warning of report.warnings) console.warn(`WARNING: ${warning}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch(error => {
    console.error(`Evaluation failed: ${error.message}`);
    process.exitCode = 1;
  });
}
