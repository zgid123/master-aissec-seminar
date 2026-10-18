import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, writeFile, readFile, rm, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { adaptFixedWindows, reconcileFixedMetrics, verifyReceipt } from '../src/member3-adapter.mjs';
import { evaluate } from '../src/evaluate.mjs';

const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const json = value => JSON.stringify(value, null, 2) + '\n';

function fixture() {
  const manifest = ['A', 'B'].map(user => ({
    file: `raw/${user}.json`, participant_id: user, session_id: `${user}_test`,
    split: 'test', data_kind: 'synthetic',
  }));
  const rawSessions = new Map(manifest.map(entry => [entry.session_id, {
    metadata: { session_id: entry.session_id, participant_id: entry.participant_id },
    data_kind: 'synthetic', sha256: hash(entry.session_id),
  }]));
  const sourceWindows = manifest.map(entry => ({
    session_id: entry.session_id, participant_id: entry.participant_id,
    window_id: `${entry.session_id}:W0`, split: entry.split, data_kind: entry.data_kind,
    window_size: '50', segment_id: '0', start_ms: '0', end_ms: '1000',
  }));
  const fixedWindows = ['A', 'B'].flatMap(target => sourceWindows.map(source => ({
    ...source, scorer: 'distance', claimed_profile: target,
    label: source.participant_id === target ? 'genuine' : 'impostor',
    z: source.participant_id === target ? '0' : '1',
    rejected: source.participant_id === target ? 'false' : 'true', window_threshold: '1',
  })));
  const model = { version: '1.1', dataKind: 'synthetic',
    config: { windowSize: 50, scorers: ['distance'] }, validationPartition: { A: {}, B: {} },
    windowThresholds: { distance: { threshold: 1, feasible: false } } };
  const reference = ['A', 'B'].map(target => ({
    scorer: 'distance', target, split: 'test', threshold: '1', validation_window_feasible: 'false',
    far: '0', frr: '0', genuine: '1', impostor: '1', eer_descriptive: '0',
  }));
  return { manifest, rawSessions, sourceWindows, fixedWindows, model, reference };
}

test('Adapter keeps target/source distinct, z direction, threshold equality and synthetic label', () => {
  const data = fixture(), input = adaptFixedWindows(data);
  assert.equal(input.windows.length, 4);
  assert.equal(input.data_kind, 'synthetic');
  assert.deepEqual(input.episodes, []);
  const impostor = input.windows.find(w => w.claimed_profile === 'A' && w.label === 'impostor');
  assert.deepEqual(impostor.source_session_ids, ['B_test']);
  assert.equal(impostor.score, 1);
  assert.equal(impostor.accepted, false);
  const report = evaluate(input);
  assert.equal(report.by_user[0].windows.roc.eer, 0);
  assert.equal(report.by_user[0].episodes.mfa_per_wall_hour.value, null);
  assert.equal(reconcileFixedMetrics(report, data.reference, data.model).rows.length, 2);
});

for (const [name, change, message] of [
  ['empty score', d => { d.fixedWindows[0].z = ''; }, /numeric/],
  ['bad boolean', d => { d.fixedWindows[0].rejected = '0'; }, /boolean/],
  ['wrong target normalization label', d => { d.fixedWindows[1].label = 'genuine'; }, /Label/],
  ['altered decision', d => { d.fixedWindows[1].rejected = 'false'; }, /Decision/],
  ['test-selected threshold', d => { d.fixedWindows[0].window_threshold = '0'; }, /threshold/],
  ['duplicate', d => { d.fixedWindows.push(d.fixedWindows[0]); }, /Duplicate/],
  ['missing score', d => { d.fixedWindows.pop(); }, /Incomplete/],
  ['wrong source split', d => { d.fixedWindows[0].split = 'validation'; }, /source mismatch/],
  ['wrong source participant', d => { d.sourceWindows[0].participant_id = 'B'; }, /manifest mismatch/],
  ['raw identity mismatch', d => { d.rawSessions.get('A_test').metadata.participant_id = 'B'; }, /identity/],
  ['mixed provenance', d => { d.model.dataKind = 'real'; }, /Mixed provenance/],
  ['old model', d => { d.model.version = '1.0'; }, /schema/],
]) {
  test(`Adapter rejects ${name}`, () => {
    const data = fixture();
    change(data);
    assert.throws(() => adaptFixedWindows(data), message);
  });
}

test('Reconciliation fails on changed rates, counts, missing/duplicate rows and feasibility flags', () => {
  for (const mutate of [
    rows => { rows[0].far = '0.5'; }, rows => { rows[0].genuine = '2'; },
    rows => { rows[0].eer_descriptive = ''; }, rows => { rows.pop(); },
    rows => { rows.push(rows[0]); }, rows => { rows[0].validation_window_feasible = 'true'; },
  ]) {
    const data = fixture(), report = evaluate(adaptFixedWindows(data));
    mutate(data.reference);
    assert.throws(() => reconcileFixedMetrics(report, data.reference, data.model), /mismatch|Incomplete|Duplicate/);
  }
});

test('Receipt strict by default; explicit CRLF equivalence never accepts content edits', () => {
  const lf = Buffer.from('{\n  "value": 1\n}\n'), crlf = Buffer.from(lf.toString().replaceAll('\n', '\r\n'));
  assert.equal(verifyReceipt(lf, hash(lf), 'raw').match, 'byte_exact');
  assert.throws(() => verifyReceipt(crlf, hash(lf), 'raw'), /Receipt mismatch/);
  assert.equal(verifyReceipt(crlf, hash(lf), 'raw', true).match, 'crlf_to_lf_only');
  assert.throws(() => verifyReceipt(Buffer.from(crlf.toString().replace('1', '2')), hash(lf), 'raw', true), /Receipt mismatch/);
  assert.throws(() => verifyReceipt(lf, undefined, 'raw', true), /Missing\/invalid/);
});

test('Adapter CLI checks receipts before output, exports metrics and refuses overwrite',
  { skip: Number(process.versions.node.split('.')[0]) < 24 ? 'Member3 TypeScript CSV reader requires Node 24' : false },
  async () => {
    const dir = await mkdtemp(join(tmpdir(), 'minh-member3-'));
    try {
      const data = fixture(), artifacts = join(dir, 'artifacts'), evaluation = join(dir, 'upstream');
      await mkdir(join(artifacts, 'raw'), { recursive: true });
      await mkdir(join(artifacts, 'processed'));
      await mkdir(evaluation);
      const inputs = {}, outputs = {};
      async function source(name, contents) {
        await writeFile(join(artifacts, name), contents.replaceAll('\n', '\r\n'));
        inputs[name] = hash(contents);
      }
      const csv = rows => {
        const headers = Object.keys(rows[0]);
        return [headers.join(','), ...rows.map(row => headers.map(k => row[k]).join(','))].join('\n') + '\n';
      };
      for (const entry of data.manifest) {
        const { sha256, ...raw } = data.rawSessions.get(entry.session_id);
        await source(entry.file, json(raw));
      }
      await source('manifest.json', json(data.manifest));
      await source('processed/windows.csv', csv(data.sourceWindows));
      for (const name of ['sessions.csv', 'strokes.csv', 'normalizers.json']) await source(`processed/${name}`, '{}\n');
      const upstream = {
        manifest_sha256: inputs['manifest.json'],
        input_hashes: Object.fromEntries(data.manifest.map(m => [m.file, inputs[m.file]])),
        output_hashes: Object.fromEntries(['windows.csv', 'sessions.csv', 'strokes.csv', 'normalizers.json']
          .map(name => [name, inputs[`processed/${name}`]])),
      };
      await source('processed/run.json', json(upstream));
      const model = { ...data.model, inputHashes: { ...inputs, manifest: inputs['manifest.json'] } };
      await writeFile(join(dir, 'model.json'), json(model));
      for (const [name, contents] of Object.entries({
        'fixed_windows.csv': csv(data.fixedWindows), 'window_metrics.csv': csv(data.reference),
      })) {
        await writeFile(join(evaluation, name), contents);
        outputs[name] = hash(contents);
      }
      await writeFile(join(evaluation, 'run.json'), json({
        inputHashes: { ...inputs, manifest: inputs['manifest.json'], model: hash(json(model)) }, outputHashes: outputs,
      }));
      const output = join(dir, 'result'), cli = fileURLToPath(new URL('../src/member3-adapter.mjs', import.meta.url));
      const args = [cli, '--evaluation', evaluation, '--artifacts', artifacts, '--model', join(dir, 'model.json'), '--output', output];
      const run = extra => spawnSync(process.execPath, [...args, ...extra], { encoding: 'utf8' });
      let result = run([]);
      assert.equal(result.status, 1);
      assert.match(result.stderr, /Receipt mismatch/);
      await assert.rejects(access(output), { code: 'ENOENT' });
      result = run(['--allow-crlf']);
      assert.equal(result.status, 0, result.stderr);
      assert.match(result.stderr, /WARNING: CRLF/);
      const saved = JSON.parse(await readFile(join(output, 'evaluation', 'report.json'), 'utf8'));
      assert.equal(saved.data_kind, 'synthetic');
      assert.equal(saved.by_user.length, 2);
      const receipt = JSON.parse(await readFile(join(output, 'receipt.json'), 'utf8'));
      assert.ok(receipt.checks.some(c => c.match === 'crlf_to_lf_only'));
      for (const [name, expected] of Object.entries(receipt.output_sha256)) {
        assert.equal(hash(await readFile(join(output, name))), expected);
      }
      assert.equal(run(['--allow-crlf']).status, 1);
      await writeFile(join(artifacts, 'raw', 'A.json'), '{"tampered":true}');
      result = run(['--allow-crlf']);
      assert.equal(result.status, 1);
      assert.match(result.stderr, /Receipt mismatch/);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
