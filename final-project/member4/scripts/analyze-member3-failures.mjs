#!/usr/bin/env node
// Read-only diagnostic analysis of member3 evaluation outputs (historical synthetic run).
// Usage: node scripts/analyze-member3-failures.mjs --input DIR --output NEW_DIR
import {readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {join, resolve, relative} from 'node:path';

const args = process.argv.slice(2);
const flag = name => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : undefined; };
const input = resolve(flag('input') ?? '');
const output = resolve(flag('output') ?? '');
if (!flag('input') || !flag('output')) { console.error('Usage: --input EVAL_DIR --output NEW_DIR'); process.exit(1); }
if (existsSync(output) && readdirSync(output).length) { console.error(`Output not empty: ${output}`); process.exit(1); }

const FILES = ['failures.csv', 'scenario_results.csv', 'decisions.csv', 'events.csv', 'fixed_windows.csv', 'policy_metrics.csv', 'window_metrics.csv', 'scenarios.csv', 'config.json', 'run.json'];
const hashes = {};
function read(name) {
  const bytes = readFileSync(join(input, name));
  hashes[name] = createHash('sha256').update(bytes).digest('hex');
  return bytes.toString('utf8');
}
function csv(name) {
  const lines = read(name).replace(/\r/g, '').split('\n').filter(Boolean);
  const head = lines[0].split(',');
  return lines.slice(1).map(l => {
    const v = l.split(',');
    if (v.length !== head.length) throw new Error(`Unexpected column count in ${name}; quoted CSV not supported`);
    return Object.fromEntries(head.map((h, i) => [h, v[i]]));
  });
}
const num = x => (x === '' || x === undefined ? null : Number(x));
const quantile = (xs, q) => { const a = [...xs].sort((x, y) => x - y); if (!a.length) return null; const p = (a.length - 1) * q, i = Math.floor(p); return a[i] + (p - i) * ((a[i + 1] ?? a[i]) - a[i]); };
const participantOf = session => session.split('_')[0];
function writeCsv(name, rows) {
  if (!rows.length) { writeFileSync(join(output, name), ''); return; }
  const head = Object.keys(rows[0]);
  const fmt = v => (v === null || v === undefined ? '' : typeof v === 'number' && !Number.isInteger(v) ? Number(v.toPrecision(6)) : v);
  writeFileSync(join(output, name), [head.join(','), ...rows.map(r => head.map(h => fmt(r[h])).join(','))].join('\n') + '\n');
}

const config = JSON.parse(read('config.json'));
read('run.json');
const failures = csv('failures.csv');
const results = csv('scenario_results.csv');
const decisions = csv('decisions.csv');
const events = csv('events.csv');
const fixed = csv('fixed_windows.csv');
const policyMetrics = csv('policy_metrics.csv');
const windowMetrics = csv('window_metrics.csv');
const scenarios = csv('scenarios.csv');
mkdirSync(output, {recursive: true});

const key = (...p) => p.join('|');
const scenarioAttacker = id => participantOf(id.split('->')[1]);
const policies = [...new Set(results.map(r => r.policy_id))];
const scorers = [...new Set(results.map(r => r.scorer))];

// 1. Failure counts with denominators.
const failureCounts = [];
for (const scorer of scorers) for (const policy of policies) {
  const res = results.filter(r => r.scorer === scorer && r.policy_id === policy);
  const a1 = res.filter(r => r.kind === 'A1'), g0 = res.filter(r => r.kind === 'G0');
  const f = failures.filter(r => r.scorer === scorer && r.policy_id === policy);
  const count = t => f.filter(r => r.failure_type === t).length;
  failureCounts.push({scorer, policy_id: policy, a1_scenarios: a1.length, g0_sessions: g0.length,
    not_detected: count('not_detected'), late_detection: count('late_detection'), pre_takeover_revoke: count('pre_takeover_revoke'), wrongful_revoke_g0: count('wrongful_revoke'),
    not_detected_rate: count('not_detected') / a1.length, late_detection_rate: count('late_detection') / a1.length});
}
writeCsv('failure_counts.csv', failureCounts);

// 2. Horizon check: declared horizon vs attacker keys actually observable in scored windows.
const a1Decisions = decisions.filter(d => d.scenario_id.startsWith('A1:'));
const maxObserved = new Map();
for (const d of a1Decisions) {
  const k = key(d.scorer, d.policy_id, d.scenario_id), v = Number(d.observed_impostor_keys);
  if (!maxObserved.has(k) || v > maxObserved.get(k)) maxObserved.set(k, v);
}
const notDetected = results.filter(r => r.kind === 'A1' && r.censored === 'true');
const censoredObserved = notDetected.map(r => maxObserved.get(key(r.scorer, r.policy_id, r.scenario_id)));
const a1Scen = scenarios.filter(s => s.kind === 'A1');
const horizon = {
  config_window_size: config.windowSize, prefix_keys: config.attack.prefixKeys, suffix_keys: config.attack.suffixKeys,
  declared_horizon_keys_values: [...new Set(a1Scen.map(s => s.horizon_keys))],
  window_count_values: [...new Set(a1Scen.map(s => s.window_count))],
  joined_keys: config.attack.prefixKeys + config.attack.suffixKeys,
  keys_covered_by_full_windows: Math.floor((config.attack.prefixKeys + config.attack.suffixKeys) / config.windowSize) * config.windowSize,
  censored_cases: notDetected.length,
  censored_max_observed_impostor_keys_values: [...new Set(censoredObserved)].sort((a, b) => a - b),
};
horizon.unscored_trailing_attacker_keys = horizon.joined_keys - horizon.keys_covered_by_full_windows;

// 3. Miss margin: how close undetected attacks came to h1 after takeover.
const byScenario = new Map();
for (const d of a1Decisions) {
  const k = key(d.scorer, d.policy_id, d.scenario_id);
  if (!byScenario.has(k)) byScenario.set(k, []);
  byScenario.get(k).push(d);
}
const missMargins = notDetected.map(r => {
  const rows = byScenario.get(key(r.scorer, r.policy_id, r.scenario_id)).filter(d => d.after_takeover === 'true');
  const h1 = Number(rows[0].h1), maxS = Math.max(...rows.map(d => Number(d.s)));
  const imp = rows.filter(d => d.true_label === 'impostor').map(d => Number(d.z));
  return {scorer: r.scorer, policy_id: r.policy_id, target: r.target, attacker: scenarioAttacker(r.scenario_id), scenario_id: r.scenario_id,
    h1, max_s_after_takeover: maxS, ratio_max_s_to_h1: maxS / h1, impostor_windows: imp.length, median_impostor_z: quantile(imp, 0.5),
    band: maxS / h1 >= 0.8 ? 'near_miss_>=0.8h1' : maxS / h1 >= 0.5 ? 'partial_0.5-0.8h1' : 'far_miss_<0.5h1'};
});
writeCsv('miss_margin_cases.csv', missMargins);
const missBands = [];
for (const scorer of scorers) for (const policy of policies) {
  const m = missMargins.filter(r => r.scorer === scorer && r.policy_id === policy);
  for (const band of ['near_miss_>=0.8h1', 'partial_0.5-0.8h1', 'far_miss_<0.5h1'])
    missBands.push({scorer, policy_id: policy, band, cases: m.filter(r => r.band === band).length, of_not_detected: m.length});
}
writeCsv('miss_margin_bands.csv', missBands);

// 4. Miss rate by target x attacker (closed-set impostor dependence).
const pairRates = [];
for (const scorer of scorers) for (const policy of policies) {
  const a1 = results.filter(r => r.scorer === scorer && r.policy_id === policy && r.kind === 'A1' && r.pre_takeover_revoke === 'false');
  const groups = new Map();
  for (const r of a1) { const k = key(r.target, scenarioAttacker(r.scenario_id)); if (!groups.has(k)) groups.set(k, []); groups.get(k).push(r); }
  for (const [k, rs] of [...groups].sort()) {
    const [target, attacker] = k.split('|'), ttd = rs.filter(r => r.detected === 'true').map(r => Number(r.ttd_keys));
    pairRates.push({scorer, policy_id: policy, target, attacker, eligible: rs.length, not_detected: rs.filter(r => r.censored === 'true').length,
      not_detected_rate: rs.filter(r => r.censored === 'true').length / rs.length, median_ttd_keys_detected_only: quantile(ttd, 0.5)});
  }
}
writeCsv('miss_rate_by_target_attacker.csv', pairRates);

// 5. Fixed-window separability per claimed profile x source participant (test windows, independent of policy).
const sep = [];
const thresholds = Object.fromEntries(windowMetrics.map(w => [key(w.scorer, w.target), Number(w.threshold)]));
const fgroups = new Map();
for (const r of fixed) { const k = key(r.scorer, r.claimed_profile, r.participant_id); if (!fgroups.has(k)) fgroups.set(k, []); fgroups.get(k).push(Number(r.z)); }
for (const [k, zs] of [...fgroups].sort()) {
  const [scorer, target, source] = k.split('|'), t = thresholds[key(scorer, target)];
  sep.push({scorer, claimed_profile: target, source_participant: source, label: source === target ? 'genuine' : 'impostor', windows: zs.length, window_threshold: t,
    median_z: quantile(zs, 0.5), q1_z: quantile(zs, 0.25), q3_z: quantile(zs, 0.75), rejected_rate: zs.filter(z => z >= t).length / zs.length});
}
writeCsv('fixed_window_separability.csv', sep);

// 6. Where detection happens: mixed (straddling takeover) vs pure impostor windows.
const detectWindow = [];
for (const scorer of scorers) for (const policy of policies) {
  const det = results.filter(r => r.scorer === scorer && r.policy_id === policy && r.kind === 'A1' && r.detected === 'true');
  const tally = {mixed: 0, impostor: 0, genuine: 0};
  for (const r of det) {
    const first = byScenario.get(key(scorer, policy, r.scenario_id)).find(d => d.after_takeover === 'true' && d.action !== 'CONTINUE');
    tally[first.true_label]++;
  }
  detectWindow.push({scorer, policy_id: policy, detected: det.length, first_alert_on_mixed: tally.mixed, first_alert_on_impostor: tally.impostor, first_alert_on_genuine: tally.genuine,
    mixed_share: det.length ? tally.mixed / det.length : null});
}
writeCsv('detection_window_label.csv', detectWindow);

// 7. Trace of every revoke before takeover or on genuine sessions.
const revokeTraces = [];
for (const r of results.filter(r => r.wrongful_revokes !== '0' || r.pre_takeover_revoke === 'true')) {
  const rows = (r.kind === 'A1' ? byScenario.get(key(r.scorer, r.policy_id, r.scenario_id)) : decisions.filter(d => d.scorer === r.scorer && d.policy_id === r.policy_id && d.scenario_id === r.scenario_id));
  const last = rows.at(-1), ev = events.filter(e => e.scorer === r.scorer && e.policy_id === r.policy_id && e.scenario_id === r.scenario_id && e.event === 'REVOKE');
  revokeTraces.push({scorer: r.scorer, policy_id: r.policy_id, target: r.target, kind: r.kind, scenario_id: r.scenario_id, windows_processed: rows.length,
    revoke_window: last.window_id, revoke_time_ms: Number(last.time_ms), z: Number(last.z), s: Number(last.s), h1: Number(last.h1), h2: Number(last.h2), action: last.action,
    revoke_cause: ev[0]?.cause ?? '', mfa_requests_before: Number(r.mfa_requests), true_label: last.true_label});
}
writeCsv('revoke_traces.csv', revokeTraces);

// 8. Late detections: distribution of TTD among detected cases beyond the constraint.
const lateRows = [];
for (const scorer of scorers) for (const policy of policies) {
  const late = failures.filter(r => r.scorer === scorer && r.policy_id === policy && r.failure_type === 'late_detection').map(r => Number(r.ttd_keys));
  lateRows.push({scorer, policy_id: policy, late_cases: late.length, min_ttd_keys: late.length ? Math.min(...late) : null, median_ttd_keys: quantile(late, 0.5), max_ttd_keys: late.length ? Math.max(...late) : null, constraint_keys: config.constraints.maxMedianTtdKeys});
}
writeCsv('late_detection_summary.csv', lateRows);

const summary = {
  generated_at_utc: new Date().toISOString(), node: process.version,
  status: 'diagnostic_historical_synthetic_run', data_kind: [...new Set(results.map(r => r.data_kind))],
  note: 'Phan tich chan doan lan chay mo phong lich su cua member3. Khong phai ket qua nghien cuu, khong gan voi receipt member2 hien tai.',
  input_dir: relative(process.cwd(), input).replace(/\\/g, '/'), input_sha256: hashes, horizon_check: horizon,
  validation_feasible_users: policyMetrics.filter(r => r.validation_feasible === 'true').length, policy_rows: policyMetrics.length,
};
writeFileSync(join(output, 'summary.json'), JSON.stringify(summary, null, 2) + '\n');
console.log(JSON.stringify({output: relative(process.cwd(), output), horizon_check: horizon, failure_counts: failureCounts.length}, null, 2));
