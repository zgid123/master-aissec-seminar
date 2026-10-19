import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv, reconcileReplay, replayScenario } from '../src/member3-replay.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const run = join(root, '..', 'member3', 'artifacts', 'simulation-2026-10-19');
const hasRun = existsSync(join(run, 'evaluation', 'decisions.csv'));

const policy = { name: 'B1', lambda: 0.9, k: 0.5, h1: 1, h2: 2, cooldownWindows: 2 };
function row(over) {
  return {
    window_id: 'A1_W', z: '0', start_ms: '0', source_end_ms: '0', time_ms: '0', h1: '1', h2: '2',
    s_previous: '0', s: '0', cooldown_before: '0', action: 'CONTINUE', after_takeover: 'false',
    true_label: 'genuine', observed_impostor_keys: '0', delayed_genuine_alert: 'false', ...over,
  };
}

test('replay: genuine MFA passes and resets, impostor MFA fails and revokes with TTD', () => {
  const rows = [
    row({ window_id: 'w0', z: '1.6', start_ms: '0', source_end_ms: '10', time_ms: '10', s: '1.1', action: 'MFA_CHALLENGE' }),
    row({ window_id: 'w1', z: '0.4', start_ms: '5', source_end_ms: '20', time_ms: '20', s: '0', cooldown_before: '2' }),
    row({ window_id: 'w2', z: '1.6', start_ms: '15', source_end_ms: '30', time_ms: '30', s: '1.1', cooldown_before: '1',
      after_takeover: 'true', true_label: 'impostor', observed_impostor_keys: '25' }),
    row({ window_id: 'w3', z: '0.6', start_ms: '25', source_end_ms: '40', time_ms: '40', s_previous: '1.1', s: '1.09',
      action: 'MFA_CHALLENGE', after_takeover: 'true', true_label: 'impostor', observed_impostor_keys: '75' }),
  ];
  const { outcome, events, issues } = replayScenario({ rows, policy, kind: 'A1', t0: 25, segmentOf: () => '0' });
  assert.deepEqual(issues, []);
  assert.equal(outcome.detected, true);
  assert.equal(outcome.ttd_keys, 75);
  assert.equal(outcome.ttd_ms, 15);
  assert.equal(outcome.mfa_requests, 2);
  assert.equal(outcome.wrongful_revokes, 0);
  assert.equal(outcome.horizon_keys, 75);
  assert.deepEqual(events.map(e => e.event), ['MFA_REQUEST', 'MFA_PASS', 'MFA_REQUEST', 'MFA_FAIL', 'REVOKE']);
});

test('replay: revoke before takeover is wrongful, not TTD 0', () => {
  const rows = [row({ window_id: 'w0', z: '3', source_end_ms: '10', time_ms: '10', s: '2.5', action: 'REVOKE' })];
  const { outcome } = replayScenario({ rows, policy, kind: 'A1', t0: 100, segmentOf: () => '0' });
  assert.equal(outcome.pre_takeover_revoke, true);
  assert.equal(outcome.detected, false);
  assert.equal(outcome.ttd_keys, null);
  assert.equal(outcome.censored, false);
  assert.equal(outcome.wrongful_revokes, 1);
});

test('replay: flags logged action and score that do not follow the policy', () => {
  const rows = [row({ window_id: 'w0', z: '1.6', source_end_ms: '10', time_ms: '10', s: '1.2', action: 'CONTINUE' })];
  const { issues } = replayScenario({ rows, policy, kind: 'G0', t0: null, segmentOf: () => '0' });
  assert.ok(issues.some(m => m.includes('s 1.2')));
  assert.ok(issues.some(m => m.includes('action CONTINUE != MFA_CHALLENGE')));
});

function loadRun() {
  const read = f => parseCsv(readFileSync(join(run, 'evaluation', f), 'utf8'), f);
  return {
    decisions: read('decisions.csv'), events: read('events.csv'), scenarioResults: read('scenario_results.csv'),
    scenarios: read('scenarios.csv'), policyMetrics: read('policy_metrics.csv'), macroMetrics: read('macro_policy_metrics.csv'),
    model: JSON.parse(readFileSync(join(run, 'fit', 'model.json'), 'utf8')), horizonKeys: 150,
  };
}

test('member3 2026-10-19 replay reconciles and detects injected errors', { skip: !hasRun }, () => {
  const base = loadRun();
  const clean = reconcileReplay(base);
  assert.equal(clean.status, 'match', JSON.stringify(clean.issue_counts));
  assert.equal(clean.checked.scenario_results, 3520);

  const mutate = (name, fn) => {
    const input = structuredClone(base);
    fn(input);
    const result = reconcileReplay(input);
    assert.equal(result.status, 'mismatch', `${name} was not detected`);
    return result.issue_counts;
  };
  const firstIndex = (rows, pred) => rows.findIndex(pred);

  let counts = mutate('z changed', i => { i.decisions[3].z = String(Number(i.decisions[3].z) + 0.5); });
  assert.ok(counts.step > 0);
  counts = mutate('action changed', i => {
    const k = firstIndex(i.decisions, r => r.action === 'MFA_CHALLENGE');
    i.decisions[k].action = 'CONTINUE';
  });
  assert.ok(counts.step > 0);
  counts = mutate('ttd edited', i => {
    const k = firstIndex(i.scenarioResults, r => r.detected === 'true');
    i.scenarioResults[k].ttd_keys = String(Number(i.scenarioResults[k].ttd_keys) - 50);
  });
  assert.ok(counts.outcome > 0);
  counts = mutate('mfa per hour edited', i => { i.policyMetrics[0].mfa_per_recording_hour = '1'; });
  assert.ok(counts.user > 0);
  counts = mutate('event dropped', i => {
    const k = firstIndex(i.events, r => r.event === 'MFA_FAIL');
    i.events.splice(k, 1);
  });
  assert.ok(counts.events > 0);
  counts = mutate('macro edited', i => { i.macroMetrics[0].median_ttd_keys_detected_only = '100'; });
  assert.ok(counts.macro > 0);
  counts = mutate('wrongful revoke hidden', i => {
    const k = firstIndex(i.scenarioResults, r => r.kind === 'G0' && r.wrongful_revokes === '1');
    i.scenarioResults[k].wrongful_revokes = '0';
  });
  assert.ok(counts.outcome > 0);
});
