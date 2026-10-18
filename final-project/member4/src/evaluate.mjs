import { validateInput } from './validate.mjs';
import { windowMetrics, episodeMetrics } from './metrics.mjs';
import { summarize, bootstrapMeanDifference, signedRank } from './statistics.mjs';

function selectValue(row, key) {
  if (key === 'far' || key === 'frr') return row.windows[key].value;
  if (key === 'eer') return row.windows.roc.eer;
  return row.episodes[key].value;
}

const summaryKeys = ['far', 'frr', 'eer', 'mfa_per_wall_hour', 'mfa_per_recording_hour',
  'detection_at_horizon_complete_case'];

export function evaluate(input, options = {}) {
  validateInput(input);
  const split = options.split ?? 'test';
  const seed = options.seed ?? 20261016;
  const horizonKeys = options.horizonKeys ?? 150;
  const iterations = options.iterations ?? 2000;
  if (!['validation', 'test'].includes(split)) throw new Error('Evaluation split must be validation or test.');
  if (!Number.isSafeInteger(horizonKeys) || horizonKeys < 1) throw new Error('Horizon must be a positive safe integer.');
  if (!Number.isInteger(seed) || seed < 0 || seed > 0xffffffff) throw new Error('Seed must be a uint32.');
  if (!Number.isInteger(iterations) || iterations < 100 || iterations > 100000) throw new Error('Bootstrap iterations must be 100..100000.');
  const windows = input.windows.filter(row => row.split === split);
  const episodes = input.episodes.filter(row => row.split === split);
  if (!windows.length && !episodes.length) throw new Error(`No observations in ${split}.`);
  const methods = [...new Set([...windows, ...episodes].map(row => row.method_id))].sort();
  const byUser = [];
  for (const method of methods) {
    const users = [...new Set([...windows, ...episodes].filter(row => row.method_id === method)
      .map(row => row.claimed_profile))].sort();
    for (const user of users) {
      byUser.push({
        method_id: method, claimed_profile: user,
        windows: windowMetrics(windows.filter(row => row.method_id === method && row.claimed_profile === user)),
        episodes: episodeMetrics(episodes.filter(row => row.method_id === method && row.claimed_profile === user), horizonKeys),
      });
    }
  }
  const summary = methods.map(method => {
    const rows = byUser.filter(row => row.method_id === method);
    return {
      method_id: method, n_users: rows.length,
      metrics: Object.fromEntries(summaryKeys.map(key => {
        const values = rows.map(row => selectValue(row, key)).filter(value => value !== null);
        return [key, { ...summarize(values), n_missing_users: rows.length - values.length }];
      })),
    };
  });
  const comparison = options.baseline || options.candidate
    ? compareMfa(byUser, episodes, options.baseline, options.candidate, seed, iterations) : null;
  return {
    schema_version: '0.1', data_kind: input.data_kind, provenance: input.provenance,
    split, seed, horizon_keys: horizonKeys, bootstrap_iterations: iterations,
    warnings: [
      ...(input.data_kind !== 'real' ? [`${input.data_kind.toUpperCase()}: NOT HUMAN RESEARCH RESULTS`] : []),
      'Source hashes/splits are checked as declared; raw files and model fitting have not been audited.',
      'FAR/FRR/EER refer to fixed-window scores, not stopped CUSUM policy replay.',
      'TTD summaries are conditional on detection; censored trials remain in counts.',
      'Horizon rate excludes incomplete followup and is not an unconditional survival estimate.',
      'Statistical inference requires independent users; shared impostor sources can violate this.',
    ],
    by_user: byUser, macro_summary: summary, comparison,
  };
}

function compareMfa(rows, episodes, baseline, candidate, seed, iterations) {
  if (!baseline || !candidate || baseline === candidate) throw new Error('Choose two distinct methods for comparison.');
  for (const method of [baseline, candidate]) {
    if (!rows.some(row => row.method_id === method)) throw new Error(`Comparison method not found: ${method}`);
  }
  const users = [...new Set(rows.filter(row => [baseline, candidate].includes(row.method_id))
    .map(row => row.claimed_profile))].sort();
  const pairs = [];
  const excluded = [];
  for (const user of users) {
    const baselineRow = rows.find(row => row.method_id === baseline && row.claimed_profile === user);
    const candidateRow = rows.find(row => row.method_id === candidate && row.claimed_profile === user);
    if (!baselineRow || !candidateRow) {
      excluded.push({ user, reason: 'missing_method_for_user' });
      continue;
    }
    const plans = method => episodes.filter(row => row.method_id === method && row.claimed_profile === user)
      .map(row => JSON.stringify([row.episode_id, row.source_session_ids, row.takeover_ms, row.planned_end_ms]))
      .sort();
    if (JSON.stringify(plans(baseline)) !== JSON.stringify(plans(candidate))) {
      throw new Error(`Unpaired episode plans for ${user}: cannot compare MFA fairly.`);
    }
    const b = baselineRow.episodes.mfa_per_wall_hour.value;
    const c = candidateRow.episodes.mfa_per_wall_hour.value;
    if (b === null || c === null) {
      excluded.push({ user, reason: 'missing_genuine_exposure' });
      continue;
    }
    pairs.push({ user, baseline: b, candidate: c, difference: c - b });
  }
  const differences = pairs.map(pair => pair.difference);
  return {
    baseline, candidate, metric: 'mfa_per_wall_hour', difference: 'candidate_minus_baseline',
    pairs, excluded_users: excluded, descriptive_difference: summarize(differences),
    bootstrap_mean_difference: bootstrapMeanDifference(differences, seed, iterations),
    wilcoxon: signedRank(differences),
    warning: 'This test alone does not establish matched TTD/FAR, absence of false revocations, or H1.',
  };
}

function csvCell(value) {
  const text = value === null || value === undefined ? '' : String(value);
  const safe = /^[=+\-@\t\r]/.test(text) && typeof value === 'string' ? `'${text}` : text;
  return `"${safe.replaceAll('"', '""')}"`;
}

function csv(headers, rows) {
  return [headers, ...rows].map(row => row.map(csvCell).join(',')).join('\n') + '\n';
}

export function userCsv(report) {
  const headers = ['data_kind', 'method_id', 'claimed_profile', 'n_windows', 'far', 'far_numerator',
    'far_denominator', 'frr', 'frr_numerator', 'frr_denominator', 'eer',
    'ttd_keys_median_detected_only', 'ttd_keys_iqr_detected_only',
    'n_detected', 'n_right_censored', 'n_takeovers_not_reached',
    'horizon_keys', 'detection_at_horizon_complete_case', 'n_incomplete_followup',
    'mfa_per_wall_hour', 'mfa_requests', 'genuine_wall_hours', 'mfa_per_recording_hour', 'false_revocations'];
  return csv(headers, report.by_user.map(row => [
    report.data_kind, row.method_id, row.claimed_profile, row.windows.n_windows,
    row.windows.far.value, row.windows.far.numerator, row.windows.far.denominator,
    row.windows.frr.value, row.windows.frr.numerator, row.windows.frr.denominator,
    row.windows.roc.eer, row.episodes.ttd_keys_detected_only.median, row.episodes.ttd_keys_detected_only.iqr,
    row.episodes.n_detected, row.episodes.n_right_censored, row.episodes.n_takeovers_not_reached,
    row.episodes.horizon_keys, row.episodes.detection_at_horizon_complete_case.value, row.episodes.n_incomplete_followup,
    row.episodes.mfa_per_wall_hour.value, row.episodes.mfa_per_wall_hour.numerator,
    row.episodes.mfa_per_wall_hour.denominator, row.episodes.mfa_per_recording_hour.value,
    row.episodes.false_revocations,
  ]));
}

export function outcomesCsv(report) {
  const headers = ['data_kind', 'method_id', 'claimed_profile', 'episode_id', 'status',
    'ttd_keys', 'ttd_ms', 'censor_keys', 'censor_ms', 'horizon_outcome'];
  return csv(headers, report.by_user.flatMap(row => row.episodes.outcomes.map(outcome => [
    report.data_kind, row.method_id, row.claimed_profile, outcome.episode_id, outcome.status,
    outcome.ttd_keys, outcome.ttd_ms, outcome.censor_keys, outcome.censor_ms, outcome.horizon_outcome,
  ])));
}

export function macroCsv(report) {
  return csv(['data_kind', 'method_id', 'metric', 'n_users_valid', 'n_users_missing', 'mean', 'median', 'q1', 'q3', 'iqr'],
    report.macro_summary.flatMap(row => Object.entries(row.metrics).map(([key, value]) => [
      report.data_kind, row.method_id, key, value.n, value.n_missing_users,
      value.mean, value.median, value.q1, value.q3, value.iqr,
    ])));
}

export function rocSvg(report) {
  const escape = text => String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
  const panels = report.by_user;
  const height = 80 + Math.ceil(panels.length / 3) * 270;
  const body = panels.map((row, index) => {
    const x = index % 3 * 320 + 55;
    const y = Math.floor(index / 3) * 270 + 105;
    const points = row.windows.roc.points.map(point =>
      `${x + point.fpr * 200},${y + (1 - point.tpr) * 160}`).join(' ');
    return `<text x="${x}" y="${y - 18}" font-size="12">${escape(row.method_id)} / ${escape(row.claimed_profile)}</text>
<path d="M${x},${y} v160 h200" fill="none" stroke="#333"/>
<path d="M${x},${y + 160} l200,-160" stroke="#aaa" stroke-dasharray="4" fill="none"/>
<text x="${x}" y="${y + 178}" font-size="11">0</text><text x="${x + 195}" y="${y + 178}" font-size="11">1</text>
<text x="${x - 18}" y="${y + 164}" font-size="11">0</text><text x="${x - 18}" y="${y + 4}" font-size="11">1</text>
<text x="${x + 60}" y="${y + 198}" font-size="11">FPR = FRR</text>
<text transform="translate(${x - 28},${y + 125}) rotate(-90)" font-size="11">TPR = 1 - FAR</text>
${points ? `<polyline points="${points}" fill="none" stroke="#1765a0" stroke-width="2"/>`
    : `<text x="${x + 8}" y="${y + 80}" font-size="12">NA: requires both classes</text>`}`;
  }).join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="${height}" viewBox="0 0 960 ${height}" role="img">
<title>Fixed-window ROC - ${escape(report.data_kind)}</title>
<rect width="100%" height="100%" fill="white"/>
<g font-family="Arial, sans-serif" fill="#222">
<text x="24" y="30" font-size="18">Fixed-window ROC (positive = impostor)</text>
<text x="24" y="55" font-size="14">${escape(report.data_kind === 'real' ? 'REAL - validate provenance before interpretation'
    : `${report.data_kind.toUpperCase()} - NOT HUMAN RESEARCH RESULTS`)}</text>
${body}</g></svg>\n`;
}
