import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtempSync, writeFileSync, readFileSync, existsSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const script = join(root, 'scripts', 'analyze-member3-failures.mjs');
const input = join(root, '..', 'member3', 'artifacts', 'simulation-reviewed', 'evaluation');

test('failure analysis refuses a non-empty output directory', () => {
  const out = mkdtempSync(join(tmpdir(), 'm4-fa-'));
  try {
    writeFileSync(join(out, 'keep.txt'), 'x');
    const r = spawnSync(process.execPath, [script, '--input', input, '--output', out], {encoding: 'utf8'});
    assert.equal(r.status, 1);
    assert.match(r.stderr, /Output not empty/);
    assert.equal(readFileSync(join(out, 'keep.txt'), 'utf8'), 'x');
  } finally { rmSync(out, {recursive: true, force: true}); }
});

test('failure analysis on historical member3 run reports observed horizon below declared', {skip: !existsSync(join(input, 'failures.csv'))}, () => {
  const out = join(mkdtempSync(join(tmpdir(), 'm4-fa-')), 'run');
  try {
    const r = spawnSync(process.execPath, [script, '--input', input, '--output', out], {encoding: 'utf8'});
    assert.equal(r.status, 0, r.stderr);
    const s = JSON.parse(readFileSync(join(out, 'summary.json'), 'utf8'));
    assert.deepEqual(s.horizon_check.declared_horizon_keys_values, ['300']);
    assert.equal(s.horizon_check.unscored_trailing_attacker_keys, 25);
    assert.ok(Math.max(...s.horizon_check.censored_max_observed_impostor_keys_values) <= 276);
    const counts = readFileSync(join(out, 'failure_counts.csv'), 'utf8').trim().split('\n');
    assert.equal(counts.length, 9);
  } finally { rmSync(dirname(out), {recursive: true, force: true}); }
});
