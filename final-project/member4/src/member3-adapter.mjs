import { readFile, writeFile, mkdir, realpath } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, resolve, relative, isAbsolute, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { evaluate } from './evaluate.mjs';
import { validateInput } from './validate.mjs';
import { main as evaluateCli } from './cli.mjs';

const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const json = value => JSON.stringify(value, null, 2) + '\n';
const check = (condition, message) => { if (!condition) throw new Error(message); };

export function verifyReceipt(bytes, expected, name, allowCrlf = false) {
  check(typeof expected === 'string' && /^[a-f0-9]{64}$/.test(expected), `Missing/invalid receipt hash: ${name}`);
  const actual = hash(bytes);
  const lf = hash(bytes.toString('utf8').replaceAll('\r\n', '\n'));
  check(actual === expected || (allowCrlf && lf === expected),
    `Receipt mismatch: ${name}; actual=${actual}; expected=${expected}; LF-only match=${lf === expected}.` +
    ' Use --allow-crlf only to explicitly accept CRLF-to-LF equivalence, not other edits.');
  return { name, actual_sha256: actual, expected_sha256: expected,
    match: actual === expected ? 'byte_exact' : 'crlf_to_lf_only' };
}

function numeric(value, name) {
  check(typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value)),
    `Missing/invalid numeric field: ${name}`);
  return Number(value);
}

function boolean(value, name) {
  check(value === 'true' || value === 'false', `Invalid boolean: ${name}`);
  return value === 'true';
}

const identity = (...values) => JSON.stringify(values);

export function adaptFixedWindows({ manifest, rawSessions, sourceWindows, fixedWindows, model }) {
  check(model.version === '1.1', 'Member3 model must use reviewed schema 1.1');
  check(['synthetic', 'real'].includes(model.dataKind), 'Invalid model data kind');
  check(Number.isSafeInteger(model.config?.windowSize) && model.config.windowSize > 0, 'Invalid model window size');
  const scorers = model.config.scorers;
  check(Array.isArray(scorers) && scorers.length > 0 && new Set(scorers).size === scorers.length, 'Invalid scorer list');
  const targets = Object.keys(model.validationPartition).sort();
  check(targets.length > 0, 'No target profiles');
  const sessions = manifest.map(entry => {
    const raw = rawSessions.get(entry.session_id);
    check(raw && raw.metadata.session_id === entry.session_id &&
      raw.metadata.participant_id === entry.participant_id && raw.data_kind === entry.data_kind,
    `Manifest/raw identity mismatch: ${entry.session_id}`);
    return { session_id: entry.session_id, participant_id: entry.participant_id,
      split: entry.split, data_kind: entry.data_kind, sha256: raw.sha256 };
  });
  check(new Set(sessions.map(s => s.session_id)).size === sessions.length, 'Duplicate manifest session');
  const bySession = new Map(sessions.map(s => [s.session_id, s]));
  const selected = new Map();
  for (const row of sourceWindows) {
    const session = bySession.get(row.session_id);
    check(session && ['participant_id', 'split', 'data_kind'].every(key => row[key] === session[key]),
      `Source window/manifest mismatch: ${row.window_id}`);
    if (row.split !== 'test' || numeric(row.window_size, 'window_size') !== model.config.windowSize) continue;
    check(!selected.has(row.window_id), `Duplicate source window: ${row.window_id}`);
    selected.set(row.window_id, row);
  }
  check(selected.size > 0, 'No fixed test windows at model window size');
  const windows = [];
  const seen = new Set();
  for (const row of fixedWindows) {
    check(scorers.includes(row.scorer) && targets.includes(row.claimed_profile), 'Unknown scorer or target');
    const source = selected.get(row.window_id);
    check(source && ['session_id', 'participant_id', 'split', 'data_kind'].every(key => row[key] === source[key]) &&
      ['window_size', 'segment_id', 'start_ms', 'end_ms'].every(key =>
        numeric(row[key], key) === numeric(source[key], key)),
    `Fixed window/source mismatch: ${row.window_id}`);
    const threshold = model.windowThresholds[row.scorer]?.threshold;
    check(Number.isFinite(threshold) && numeric(row.window_threshold, 'window_threshold') === threshold,
      `Frozen threshold mismatch: ${row.scorer}`);
    const score = numeric(row.z, 'z');
    const rejected = boolean(row.rejected, 'rejected');
    check(rejected === (score >= threshold), `Decision/threshold mismatch: ${row.window_id}`);
    check(row.label === (row.participant_id === row.claimed_profile ? 'genuine' : 'impostor'),
      `Label/source mismatch: ${row.window_id}`);
    const key = identity(row.scorer, row.claimed_profile, row.window_id);
    check(!seen.has(key), `Duplicate scored window: ${key}`);
    seen.add(key);
    windows.push({ method_id: row.scorer, claimed_profile: row.claimed_profile, split: row.split,
      window_id: row.window_id, source_session_ids: [row.session_id],
      label: row.label, score, accepted: !rejected });
  }
  check(windows.length === selected.size * scorers.length * targets.length,
    'Incomplete fixed-window grid: every scorer/target must score every source window');
  const input = {
    schema_version: '0.1', data_kind: model.dataKind,
    provenance: 'Member3 reviewed schema 1.1 fixed_windows.csv; scores z and validation-locked window thresholds. ' +
      'Independent member4 metric calculation only; no stateful replay, model refitting or independent scoring audit. ' +
      'See the adapter receipt.json alongside input.json for actual hashes and any explicit CRLF equivalence.',
    score_direction: 'higher_is_more_anomalous', window_track: 'fixed_window_scores',
    sessions, windows, episodes: [],
  };
  validateInput(input);
  return input;
}

export function reconcileFixedMetrics(report, referenceRows, model) {
  const rows = [];
  const seen = new Set();
  for (const reference of referenceRows) {
    const key = identity(reference.scorer, reference.target);
    check(!seen.has(key), `Duplicate metric row: ${key}`);
    seen.add(key);
    const computed = report.by_user.find(r => r.method_id === reference.scorer && r.claimed_profile === reference.target);
    check(computed && reference.split === report.split, `Unexpected reference metric: ${key}`);
    const threshold = model.windowThresholds[reference.scorer];
    check(numeric(reference.threshold, 'threshold') === threshold.threshold &&
      boolean(reference.validation_window_feasible, 'validation_window_feasible') === threshold.feasible,
    `Reference threshold/validation mismatch: ${key}`);
    const metrics = {
      far: computed.windows.far.value, frr: computed.windows.frr.value,
      genuine: computed.windows.frr.denominator, impostor: computed.windows.far.denominator,
      eer_descriptive: computed.windows.roc.eer,
    };
    for (const [metric, actual] of Object.entries(metrics)) {
      const expected = reference[metric] === '' ? null : numeric(reference[metric], metric);
      check(actual === null ? expected === null : expected !== null && Math.abs(actual - expected) <= 1e-12,
        `Independent metric mismatch: ${key}/${metric}: ${actual} versus ${expected}`);
    }
    rows.push({ scorer: reference.scorer, target: reference.target, ...metrics,
      validation_window_feasible: threshold.feasible, matched: true });
  }
  check(rows.length === report.by_user.length, 'Incomplete reference metric grid');
  return { scope: 'fixed_window_metrics_only', tolerance: 1e-12, rows,
    warning: 'Agreement does not validate model correctness, research hypotheses or stateful TTD/MFA.' };
}

export async function main(args) {
  const { csvParse } = await import('../../member3/src/io.ts');
  const options = {};
  for (let i = 0; i < args.length; i++) {
    const key = args[i];
    check(['--evaluation', '--model', '--artifacts', '--output', '--allow-crlf'].includes(key), `Unknown option: ${key}`);
    check(!Object.hasOwn(options, key), `Duplicate option: ${key}`);
    if (key === '--allow-crlf') options[key] = true;
    else {
      check(args[i + 1] && !args[i + 1].startsWith('--'), `Missing value: ${key}`);
      options[key] = args[++i];
    }
  }
  for (const key of ['--evaluation', '--model', '--artifacts', '--output']) check(options[key], `Required: ${key}`);
  const evaluation = resolve(options['--evaluation']), artifacts = resolve(options['--artifacts']);
  const receipt = JSON.parse(await readFile(join(evaluation, 'run.json'), 'utf8'));
  const checks = [];
  async function readVerified(path, expected, name) {
    const bytes = await readFile(path);
    const result = verifyReceipt(bytes, expected, name, Boolean(options['--allow-crlf']));
    checks.push(result);
    if (result.match !== 'byte_exact') console.warn(`WARNING: CRLF-to-LF equivalence only: ${name}`);
    return bytes.toString('utf8');
  }
  const model = JSON.parse(await readVerified(resolve(options['--model']), receipt.inputHashes.model, 'model'));
  const manifest = JSON.parse(await readVerified(join(artifacts, 'manifest.json'), receipt.inputHashes.manifest, 'manifest'));
  const upstream = JSON.parse(await readVerified(join(artifacts, 'processed', 'run.json'),
    receipt.inputHashes['processed/run.json'], 'processed/run.json'));
  check(upstream.manifest_sha256 === receipt.inputHashes.manifest, 'Member2/member3 manifest receipts disagree');
  check(model.inputHashes.manifest === receipt.inputHashes.manifest &&
    model.inputHashes['processed/run.json'] === receipt.inputHashes['processed/run.json'],
  'Model/evaluation dataset receipts disagree');
  const rawSessions = new Map();
  const root = await realpath(artifacts);
  for (const entry of manifest) {
    const path = await realpath(resolve(artifacts, entry.file)), rel = relative(root, path);
    check(rel !== '..' && !rel.startsWith(`..\\`) && !rel.startsWith('../') && !isAbsolute(rel), 'Raw path outside artifacts');
    check(!rawSessions.has(entry.session_id), 'Duplicate manifest session');
    const expected = receipt.inputHashes[entry.file];
    check(expected === upstream.input_hashes[entry.file] && expected === model.inputHashes[entry.file],
      `Raw receipts disagree: ${entry.file}`);
    const text = await readVerified(path, expected, entry.file);
    rawSessions.set(entry.session_id, { ...JSON.parse(text), sha256: checks.at(-1).actual_sha256 });
  }
  let sourceWindows;
  for (const name of ['windows.csv', 'sessions.csv', 'strokes.csv', 'normalizers.json']) {
    const key = `processed/${name}`, expected = receipt.inputHashes[key];
    check(expected === upstream.output_hashes[name] && expected === model.inputHashes[key],
      `Processed receipts disagree: ${key}`);
    const text = await readVerified(join(artifacts, 'processed', name), expected, key);
    if (name === 'windows.csv') sourceWindows = csvParse(text);
  }
  const fixedWindows = csvParse(await readVerified(join(evaluation, 'fixed_windows.csv'),
    receipt.outputHashes['fixed_windows.csv'], 'fixed_windows.csv'));
  const reference = csvParse(await readVerified(join(evaluation, 'window_metrics.csv'),
    receipt.outputHashes['window_metrics.csv'], 'window_metrics.csv'));
  const input = adaptFixedWindows({ manifest, rawSessions, sourceWindows, fixedWindows, model });
  const reconciliation = reconcileFixedMetrics(evaluate(input), reference, model);
  const output = resolve(options['--output']);
  await mkdir(dirname(output), { recursive: true });
  await mkdir(output);
  await writeFile(join(output, 'input.json'), json(input));
  await writeFile(join(output, 'reconciliation.json'), json(reconciliation));
  await evaluateCli(['--input', join(output, 'input.json'), '--output', join(output, 'evaluation')]);
  const outputs = {};
  for (const name of ['input.json', 'reconciliation.json', join('evaluation', 'run.json')]) {
    outputs[name] = hash(await readFile(join(output, name)));
  }
  await writeFile(join(output, 'receipt.json'), json({
    mode: options['--allow-crlf'] ? 'explicit_allow_crlf' : 'byte_exact',
    member3_run_sha256: hash(await readFile(join(evaluation, 'run.json'))),
    member2_run_sha256: hash(await readFile(join(artifacts, 'processed', 'run.json'))),
    adapter_sha256: hash(await readFile(fileURLToPath(import.meta.url))),
    csv_parser_sha256: hash(await readFile(fileURLToPath(new URL('../../member3/src/io.ts', import.meta.url)))),
    checks, output_sha256: outputs,
    scope: 'Manifest/raw identities, hashes, full fixed-window grid and independent metric reconciliation. ' +
      'Does not independently verify feature extraction, normalization, scorer fit, score values or replay.',
  }));
  console.log(`Reconciled ${input.windows.length} scored windows / ${reconciliation.rows.length} scorer-target rows.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch(error => {
    console.error(`Member3 adapter failed: ${error.message}`);
    process.exitCode = 1;
  });
}
