// Independent reconciliation of member3 stateful replay (TTD, detection, MFA/hour).
// Re-executes the policy from logged z scores and recomputes outcomes and per-user
// metrics without importing member3 code. Only reads member3 artifacts.
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { summarize } from './statistics.mjs';

export const TOLERANCE = 1e-9;
const KEY_SEP = '|';

export function parseCsv(text, name = 'csv') {
  if (text.includes('"')) throw new Error(`${name}: quoted CSV is not supported.`);
  const lines = text.replace(/\r\n/g, '\n').split('\n').filter(line => line.length);
  const header = lines[0].split(',');
  return lines.slice(1).map((line, index) => {
    const cells = line.split(',');
    if (cells.length !== header.length) throw new Error(`${name}: row ${index + 2} has ${cells.length} cells, expected ${header.length}.`);
    return Object.fromEntries(header.map((key, i) => [key, cells[i]]));
  });
}

const num = value => (value === '' || value === undefined ? null : Number(value));
const bool = value => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  throw new Error(`Expected boolean, got ${value}`);
};
const scenarioKey = row => [row.scorer, row.target, row.policy_id, row.scenario_id].join(KEY_SEP);
const userKey = row => [row.scorer, row.target, row.policy_id].join(KEY_SEP);

function g0Segment(windowId) {
  const match = /_G(\d+)_W\d+_\d+$/.exec(windowId);
  if (!match) throw new Error(`Cannot read G0 segment from window ${windowId}`);
  return match[1];
}

function close(a, b, tolerance = TOLERANCE) {
  if (a === null || b === null) return a === b;
  return Math.abs(a - b) <= tolerance * Math.max(1, Math.abs(a), Math.abs(b));
}

/**
 * Replays one scenario from its decision rows. Returns recomputed outcome, expected
 * event sequence and any step-level mismatches against the logged columns.
 */
export function replayScenario({ rows, policy, kind, t0, segmentOf }) {
  const issues = [];
  const events = [];
  let s = 0;
  let cooldown = 0;
  let previousSegment = null;
  let previousStart = -Infinity;
  let previousDecision = -Infinity;
  let stopped = false;
  const out = {
    detected: false, detection_evidence: null, ttd_keys: null, ttd_ms: null,
    pre_takeover_revoke: false, mfa_requests: 0, wrongful_revokes: 0,
    horizon_keys: 0, last_decision_ms: null, stop_reason: 'end_of_scored_windows',
  };
  let lastImpostorKeys = -Infinity;
  for (const [i, row] of rows.entries()) {
    const where = `${row.window_id}`;
    if (stopped) { issues.push(`${where}: decision logged after session stop`); break; }
    const z = num(row.z);
    const start = num(row.start_ms);
    const end = num(row.source_end_ms);
    const time = num(row.time_ms);
    if (![z, start, end, time].every(Number.isFinite)) { issues.push(`${where}: nonfinite value`); continue; }
    if (start < previousStart || end < start) issues.push(`${where}: window order/time invalid`);
    const expectedTime = Math.max(end, previousDecision);
    if (!close(time, expectedTime)) issues.push(`${where}: time_ms ${time} != max(end, previous decision) ${expectedTime}`);
    previousStart = start;
    previousDecision = time;
    if (kind === 'G0') {
      const segment = segmentOf(row.window_id);
      if (previousSegment !== null && segment !== previousSegment) {
        s = 0; cooldown = 0;
        events.push({ time_ms: time, source_start_ms: start, event: 'SEGMENT_RESET', cause: 'source_segment_boundary' });
      }
      previousSegment = segment;
    }
    if (num(row.h1) !== policy.h1 || num(row.h2) !== policy.h2) issues.push(`${where}: h1/h2 differ from model`);
    if (!close(num(row.s_previous), s)) issues.push(`${where}: s_previous ${row.s_previous} != ${s}`);
    if (num(row.cooldown_before) !== cooldown) issues.push(`${where}: cooldown_before ${row.cooldown_before} != ${cooldown}`);
    const next = policy.name === 'B0' ? z : Math.max(0, policy.lambda * s + z - policy.k);
    if (!close(num(row.s), next)) issues.push(`${where}: s ${row.s} != ${next}`);
    const action = next >= policy.h2 ? 'REVOKE' : next >= policy.h1 && cooldown === 0 ? 'MFA_CHALLENGE' : 'CONTINUE';
    if (row.action !== action) issues.push(`${where}: action ${row.action} != ${action}`);
    s = next;
    cooldown = Math.max(0, cooldown - 1);

    const afterTakeover = t0 !== null && time >= t0;
    if (bool(row.after_takeover) !== afterTakeover) issues.push(`${where}: after_takeover mismatch`);
    const impostorKeys = num(row.observed_impostor_keys);
    if (impostorKeys < lastImpostorKeys) issues.push(`${where}: observed_impostor_keys decreased`);
    lastImpostorKeys = impostorKeys;
    if (!afterTakeover && impostorKeys !== 0) issues.push(`${where}: impostor keys before takeover`);
    const delayed = afterTakeover && row.true_label === 'genuine' && action !== 'CONTINUE';
    if (bool(row.delayed_genuine_alert) !== delayed) issues.push(`${where}: delayed_genuine_alert mismatch`);
    out.last_decision_ms = time;
    if (afterTakeover) out.horizon_keys = impostorKeys;
    if (!out.detected && afterTakeover && action !== 'CONTINUE') {
      out.detected = true;
      out.ttd_keys = impostorKeys;
      out.ttd_ms = time - t0;
      out.detection_evidence = delayed ? 'delayed_genuine_window' : 'post_takeover_window';
    }
    let revoke = action === 'REVOKE';
    if (action === 'MFA_CHALLENGE') {
      out.mfa_requests += 1;
      events.push({ time_ms: time, event: 'MFA_REQUEST', cause: 'risk_h1' });
      // Simulated oracle: genuine user passes, impostor fails, decided at the request.
      const pass = !afterTakeover;
      events.push({ time_ms: time, event: pass ? 'MFA_PASS' : 'MFA_FAIL', cause: 'simulated_oracle' });
      if (pass) { s = 0; cooldown = policy.cooldownWindows; } else revoke = true;
    }
    if (revoke) {
      out.stop_reason = 'revoke';
      if (!afterTakeover) {
        out.wrongful_revokes += 1;
        if (kind === 'A1') out.pre_takeover_revoke = true;
      }
      events.push({ time_ms: time, event: 'REVOKE', cause: action === 'REVOKE' ? 'risk_h2' : 'mfa_fail' });
      stopped = true;
      if (i < rows.length - 1) issues.push(`${where}: ${rows.length - 1 - i} decisions after revoke`);
    }
  }
  out.censored = kind === 'A1' && !out.detected && !out.pre_takeover_revoke;
  return { outcome: out, events, issues };
}

function compareEvents(expected, logged) {
  const issues = [];
  if (expected.length !== logged.length) issues.push(`event count ${logged.length} != ${expected.length}`);
  for (let i = 0; i < Math.min(expected.length, logged.length); i += 1) {
    const e = expected[i];
    const l = logged[i];
    if (num(l.event_order) !== i) issues.push(`event ${i}: event_order ${l.event_order}`);
    if (l.event !== e.event || l.cause !== e.cause || !close(num(l.time_ms), e.time_ms)) {
      issues.push(`event ${i}: logged ${l.event}/${l.cause}@${l.time_ms}, expected ${e.event}/${e.cause}@${e.time_ms}`);
    }
  }
  return issues;
}

const OUTCOME_FIELDS = [
  ['detected', 'bool'], ['detection_evidence', 'text'], ['ttd_keys', 'num'], ['ttd_ms', 'num'],
  ['censored', 'bool'], ['pre_takeover_revoke', 'bool'], ['horizon_keys', 'num'],
  ['last_decision_ms', 'num'], ['stop_reason', 'text'], ['mfa_requests', 'num'], ['wrongful_revokes', 'num'],
];

function compareOutcome(mine, logged) {
  const issues = [];
  for (const [field, type] of OUTCOME_FIELDS) {
    const theirs = type === 'bool' ? bool(logged[field]) : type === 'num' ? num(logged[field]) : (logged[field] || null);
    const ok = type === 'num' ? close(mine[field], theirs) : mine[field] === theirs;
    if (!ok) issues.push(`${field}: logged ${logged[field]}, recomputed ${mine[field]}`);
  }
  return issues;
}

/** Per-user policy metrics from recomputed outcomes. Exposure seconds come from member3. */
export function userMetrics(results, horizonKeys) {
  const g0 = results.filter(r => r.kind === 'G0');
  const a1 = results.filter(r => r.kind === 'A1');
  const eligible = a1.filter(r => !r.pre_takeover_revoke);
  const detected = eligible.filter(r => r.detected);
  const known = eligible.filter(r => (r.ttd_keys !== null && r.ttd_keys <= horizonKeys) || r.horizon_keys >= horizonKeys);
  const detectedAtL = known.filter(r => r.ttd_keys !== null && r.ttd_keys <= horizonKeys).length;
  const requests = g0.reduce((sum, r) => sum + r.mfa_requests, 0);
  const recording = g0.reduce((sum, r) => sum + r.observed_recording_seconds, 0);
  const wall = g0.reduce((sum, r) => sum + r.observed_wall_seconds, 0);
  const prefixes = rows => new Set(rows.map(r => r.genuine_prefix_id)).size;
  const keys = summarize(detected.map(r => r.ttd_keys));
  const ms = summarize(detected.map(r => r.ttd_ms));
  return {
    genuine_sessions: g0.length, attack_scenarios: a1.length, eligible_attacks: eligible.length,
    pre_takeover_revokes: a1.length - eligible.length, detected: detected.length,
    censored: eligible.filter(r => r.censored).length,
    attack_genuine_prefixes: prefixes(a1), pre_takeover_revoked_prefixes: prefixes(a1.filter(r => r.pre_takeover_revoke)),
    delayed_genuine_alert_detections: detected.filter(r => r.detection_evidence === 'delayed_genuine_window').length,
    detection_rate: eligible.length ? detected.length / eligible.length : null,
    known_at_L: known.length, unknown_at_L: eligible.length - known.length,
    detection_rate_at_L: known.length ? detectedAtL / known.length : null,
    far_session_at_L: known.length ? 1 - detectedAtL / known.length : null,
    median_ttd_keys_detected_only: keys.median, median_ttd_ms_detected_only: ms.median,
    q1_ttd_keys_detected_only: keys.q1, q3_ttd_keys_detected_only: keys.q3,
    mfa_requests: requests, recording_seconds: recording, wall_seconds: wall,
    mfa_per_recording_hour: recording > 0 ? requests * 3600 / recording : null,
    mfa_per_wall_hour: wall > 0 ? requests * 3600 / wall : null,
    wrongful_revokes: g0.reduce((sum, r) => sum + r.wrongful_revokes, 0),
    genuine_revokes_without_prior_mfa: g0.filter(r => r.wrongful_revokes > 0 && r.mfa_requests === 0).length,
  };
}

const MACRO_MEAN = ['detection_rate', 'far_session_at_L', 'median_ttd_keys_detected_only', 'mfa_per_recording_hour', 'mfa_per_wall_hour'];
const MACRO_SUM = [
  ['pre_takeover_revokes', 'pre_takeover_revokes'], ['attack_genuine_prefixes', 'attack_genuine_prefixes'],
  ['pre_takeover_revoked_prefixes', 'pre_takeover_revoked_prefixes'], ['mfa_requests_total', 'mfa_requests'],
  ['recording_seconds_total', 'recording_seconds'], ['wrongful_revokes', 'wrongful_revokes'],
  ['genuine_revokes_without_prior_mfa', 'genuine_revokes_without_prior_mfa'],
  ['delayed_genuine_alert_detections', 'delayed_genuine_alert_detections'],
];

function compareRow(mine, theirs, fields, label) {
  const issues = [];
  for (const field of fields) {
    if (!(field in theirs)) { issues.push(`${label}: column ${field} missing in member3 output`); continue; }
    if (!close(mine[field] ?? null, num(theirs[field]))) issues.push(`${label}: ${field} logged ${theirs[field]}, recomputed ${mine[field]}`);
  }
  return issues;
}

export function reconcileReplay({ decisions, events, scenarioResults, scenarios, policyMetrics, macroMetrics, model, horizonKeys }) {
  const dataKinds = new Set([...decisions, ...scenarioResults].map(r => r.data_kind));
  const scenarioInfo = new Map(scenarios.map(r => [`${r.scorer}${KEY_SEP}${r.scenario_id}`, r]));
  const group = (rows, keyOf) => {
    const map = new Map();
    for (const row of rows) {
      const key = keyOf(row);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(row);
    }
    return map;
  };
  const decisionsBy = group(decisions, scenarioKey);
  const eventsBy = group(events, scenarioKey);
  const issues = { step: [], events: [], outcome: [], exposure: [], user: [], macro: [] };
  const recomputed = [];
  const seen = new Set();
  for (const logged of scenarioResults) {
    const key = scenarioKey(logged);
    if (seen.has(key)) { issues.outcome.push(`${key}: duplicate scenario result`); continue; }
    seen.add(key);
    const info = scenarioInfo.get(`${logged.scorer}${KEY_SEP}${logged.scenario_id}`);
    if (!info) { issues.outcome.push(`${key}: scenario definition missing`); continue; }
    if (info.kind !== logged.kind || info.target !== logged.target) issues.outcome.push(`${key}: kind/target differs from scenarios.csv`);
    const selection = model.selections?.[`${logged.scorer}/${logged.target}`]?.[logged.policy_id];
    if (!selection) { issues.outcome.push(`${key}: policy missing in model`); continue; }
    const rows = decisionsBy.get(key) ?? [];
    if (!rows.length) { issues.outcome.push(`${key}: no decisions logged`); continue; }
    const t0 = logged.kind === 'A1' ? num(info.t0_ms) : null;
    if (logged.kind === 'A1' && !Number.isFinite(t0)) { issues.outcome.push(`${key}: missing t0`); continue; }
    const { outcome, events: expected, issues: stepIssues } = replayScenario({
      rows, policy: selection.policy, kind: logged.kind, t0, segmentOf: g0Segment,
    });
    issues.step.push(...stepIssues.map(m => `${key}: ${m}`));
    issues.events.push(...compareEvents(expected, eventsBy.get(key) ?? []).map(m => `${key}: ${m}`));
    issues.outcome.push(...compareOutcome(outcome, logged).map(m => `${key}: ${m}`));
    if (logged.kind === 'A1' && logged.genuine_prefix_id !== info.genuine_prefix_id) issues.outcome.push(`${key}: genuine_prefix_id mismatch`);
    recomputed.push({
      ...outcome, key, scorer: logged.scorer, target: logged.target, policy_id: logged.policy_id,
      scenario_id: logged.scenario_id, kind: logged.kind, genuine_prefix_id: logged.genuine_prefix_id || null,
      observed_recording_seconds: num(logged.observed_recording_seconds),
      observed_wall_seconds: num(logged.observed_wall_seconds),
    });
  }
  for (const key of decisionsBy.keys()) if (!seen.has(key)) issues.outcome.push(`${key}: decisions without scenario result`);
  for (const key of eventsBy.keys()) if (!seen.has(key)) issues.events.push(`${key}: events without scenario result`);

  // Exposure is taken from member3; check only internal consistency.
  const g0Full = new Map();
  for (const r of recomputed.filter(x => x.kind === 'G0' && x.stop_reason !== 'revoke')) {
    const k = `${r.scorer}${KEY_SEP}${r.scenario_id}`;
    const prior = g0Full.get(k);
    if (prior && !close(prior.observed_recording_seconds, r.observed_recording_seconds)) issues.exposure.push(`${k}: recording seconds differ between unrevoked policies`);
    if (!prior) g0Full.set(k, r);
  }
  for (const r of recomputed.filter(x => x.kind === 'G0' && x.stop_reason === 'revoke')) {
    const full = g0Full.get(`${r.scorer}${KEY_SEP}${r.scenario_id}`);
    if (full && r.observed_recording_seconds > full.observed_recording_seconds + TOLERANCE) issues.exposure.push(`${r.key}: revoked exposure exceeds full session`);
  }

  const userRows = [];
  const byUser = group(recomputed, userKey);
  const loggedUsers = new Map(policyMetrics.map(r => [userKey(r), r]));
  const userFields = [
    'genuine_sessions', 'attack_scenarios', 'eligible_attacks', 'pre_takeover_revokes', 'detected', 'censored',
    'attack_genuine_prefixes', 'pre_takeover_revoked_prefixes', 'delayed_genuine_alert_detections', 'detection_rate',
    'known_at_L', 'unknown_at_L', 'detection_rate_at_L', 'far_session_at_L', 'median_ttd_keys_detected_only',
    'median_ttd_ms_detected_only', 'q1_ttd_keys_detected_only', 'q3_ttd_keys_detected_only', 'mfa_requests',
    'recording_seconds', 'wall_seconds', 'mfa_per_recording_hour', 'mfa_per_wall_hour', 'wrongful_revokes',
    'genuine_revokes_without_prior_mfa',
  ];
  for (const [key, results] of byUser) {
    const [scorer, target, policy_id] = key.split(KEY_SEP);
    const mine = { scorer, target, policy_id, ...userMetrics(results, horizonKeys) };
    userRows.push(mine);
    const theirs = loggedUsers.get(key);
    if (!theirs) { issues.user.push(`${key}: missing in policy_metrics.csv`); continue; }
    if (num(theirs.policy_horizon_keys) !== horizonKeys) issues.user.push(`${key}: policy_horizon_keys ${theirs.policy_horizon_keys} != ${horizonKeys}`);
    issues.user.push(...compareRow(mine, theirs, userFields, key));
  }
  for (const key of loggedUsers.keys()) if (!byUser.has(key)) issues.user.push(`${key}: policy_metrics row without scenarios`);

  const macroRows = [];
  for (const [key, rows] of group(userRows, r => `${r.scorer}${KEY_SEP}${r.policy_id}`)) {
    const [scorer, policy_id] = key.split(KEY_SEP);
    const mine = { scorer, policy_id, users: rows.length, users_with_observed_ttd: rows.filter(r => r.median_ttd_keys_detected_only !== null).length };
    for (const field of MACRO_MEAN) {
      const values = rows.map(r => r[field]).filter(v => v !== null);
      mine[field] = values.length ? values.reduce((a, b) => a + b, 0) / values.length : null;
    }
    for (const [out, field] of MACRO_SUM) mine[out] = rows.reduce((sum, r) => sum + r[field], 0);
    macroRows.push(mine);
    const theirs = macroMetrics.find(r => r.scorer === scorer && r.policy_id === policy_id);
    if (!theirs) { issues.macro.push(`${key}: missing in macro_policy_metrics.csv`); continue; }
    issues.macro.push(...compareRow(mine, theirs, ['users', 'users_with_observed_ttd', ...MACRO_MEAN, ...MACRO_SUM.map(([o]) => o)], key));
  }

  const counts = Object.fromEntries(Object.entries(issues).map(([k, v]) => [k, v.length]));
  return {
    status: Object.values(counts).every(c => c === 0) ? 'match' : 'mismatch',
    data_kind: [...dataKinds].sort(),
    tolerance_relative: TOLERANCE,
    policy_horizon_keys: horizonKeys,
    checked: {
      decisions: decisions.length, events: events.length, scenario_results: scenarioResults.length,
      user_policy_rows: userRows.length, macro_rows: macroRows.length,
    },
    issue_counts: counts,
    issues: Object.fromEntries(Object.entries(issues).map(([k, v]) => [k, v.slice(0, 50)])),
    recomputed,
    userRows,
    macroRows,
  };
}

function toCsv(rows, columns) {
  const cell = value => (value === null || value === undefined ? '' : String(value));
  return `${columns.join(',')}\n${rows.map(r => columns.map(c => cell(r[c])).join(',')).join('\n')}\n`;
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 2) {
    if (!argv[i].startsWith('--') || argv[i + 1] === undefined) throw new Error(`Bad argument ${argv[i]}`);
    args[argv[i].slice(2)] = argv[i + 1];
  }
  for (const required of ['evaluation', 'model', 'output']) if (!args[required]) throw new Error(`Missing --${required}`);
  return args;
}

export function runCli(argv) {
  const args = parseArgs(argv);
  const evaluation = resolve(args.evaluation);
  const output = resolve(args.output);
  if (existsSync(output) && readdirSync(output).length) throw new Error(`Output not empty: ${output}`);
  const files = ['decisions.csv', 'events.csv', 'scenario_results.csv', 'scenarios.csv', 'policy_metrics.csv', 'macro_policy_metrics.csv', 'config.json'];
  const bytes = Object.fromEntries(files.map(f => [f, readFileSync(join(evaluation, f))]));
  const modelBytes = readFileSync(resolve(args.model));
  const config = JSON.parse(bytes['config.json'].toString('utf8'));
  const read = f => parseCsv(bytes[f].toString('utf8'), f);
  const result = reconcileReplay({
    decisions: read('decisions.csv'), events: read('events.csv'), scenarioResults: read('scenario_results.csv'),
    scenarios: read('scenarios.csv'), policyMetrics: read('policy_metrics.csv'), macroMetrics: read('macro_policy_metrics.csv'),
    model: JSON.parse(modelBytes.toString('utf8')), horizonKeys: config.constraints.policyHorizonKeys,
  });
  const sha = b => createHash('sha256').update(b).digest('hex');
  const rel = p => relative(process.cwd(), p).replace(/\\/g, '/');
  mkdirSync(output, { recursive: true });
  const { recomputed, userRows, macroRows, ...summary } = result;
  writeFileSync(join(output, 'replay-reconciliation.json'), `${JSON.stringify({
    ...summary,
    inputs: { evaluation: rel(evaluation), model: rel(resolve(args.model)) },
    input_sha256: { ...Object.fromEntries(files.map(f => [f, sha(bytes[f])])), 'model.json': sha(modelBytes) },
    exposure_note: 'recording/wall seconds are taken from member3 scenario_results and only checked for internal consistency.',
    node: process.version,
  }, null, 2)}\n`);
  const userColumns = Object.keys(userRows[0] ?? {});
  writeFileSync(join(output, 'recomputed-policy-metrics.csv'), toCsv(userRows, userColumns));
  writeFileSync(join(output, 'recomputed-macro-metrics.csv'), toCsv(macroRows, Object.keys(macroRows[0] ?? {})));
  return result;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  try {
    const result = runCli(process.argv.slice(2));
    console.log(JSON.stringify({ status: result.status, checked: result.checked, issue_counts: result.issue_counts }, null, 2));
    process.exitCode = result.status === 'match' ? 0 : 1;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 2;
  }
}
