import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { summarize, bootstrapMeanDifference, signedRank } from '../src/statistics.mjs';
import { windowMetrics, rocEer, episodeMetrics } from '../src/metrics.mjs';
import { validateInput } from '../src/validate.mjs';
import { evaluate, userCsv, rocSvg } from '../src/evaluate.mjs';
import { createFixture } from '../src/fixture.mjs';

const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-10, `${actual} != ${expected}`);
const attack = () => structuredClone(createFixture().episodes.find(row => row.episode_id === 'A1'));

test('FAR=1/4 and FRR=1/5; mixed and unknown excluded', () => {
  const rows = [
    ...[true, false, false, false].map(accepted => ({ label: 'impostor', accepted, score: 0.7 })),
    ...[true, true, true, true, false].map(accepted => ({ label: 'genuine', accepted, score: 0.2 })),
    { label: 'mixed', accepted: false }, { label: 'unknown', accepted: true },
  ];
  const result = windowMetrics(rows);
  close(result.far.value, 0.25);
  close(result.frr.value, 0.2);
  assert.equal(result.excluded_mixed, 1);
  assert.equal(result.excluded_unknown, 1);
});

test('Missing classes and zero exposure produce explicit NA, not success-shaped zero', () => {
  assert.deepEqual(windowMetrics([]).far, {
    numerator: 0, denominator: 0, value: null, reason: 'no_impostor_windows',
  });
  assert.equal(rocEer([{ label: 'genuine', score: 0.2 }]).reason, 'requires_both_classes');
  assert.equal(episodeMetrics([], 150).mfa_per_wall_hour.reason, 'no_genuine_wall_exposure');
  assert.equal(summarize([]).median, null);
});

test('ROC perfect, inverted and all-tied scores have expected EER', () => {
  const rows = [{ label: 'genuine', score: 0 }, { label: 'impostor', score: 1 }];
  close(rocEer(rows).eer, 0);
  close(rocEer(rows.map(row => ({ ...row, score: 1 - row.score }))).eer, 1);
  const tied = rocEer(rows.map(row => ({ ...row, score: 1 })));
  close(tied.eer, 0.5);
  assert.equal(tied.points.length, 2);
  assert.equal(tied.points.at(-1).fpr, 1);
  assert.equal(tied.points.at(-1).tpr, 1);
});

test('TTD counts first attacker key; pre-takeover MFA is not detection', () => {
  const row = attack();
  row.end_ms = row.takeover_ms + 100;
  row.observed_attacker_keys = 1;
  row.events = [
    { event_id: 'before', type: 'mfa_request', t_ms: 10000, attacker_keys: 0 },
    { event_id: 'pass', type: 'mfa_pass', t_ms: 10001, attacker_keys: 0 },
    { event_id: 'after', type: 'revoke', t_ms: row.end_ms, attacker_keys: 1 },
  ];
  const result = episodeMetrics([row], 150);
  assert.equal(result.mfa_per_wall_hour.numerator, 1);
  assert.equal(result.outcomes[0].ttd_keys, 1);
  assert.equal(result.outcomes[0].ttd_ms, 100);
  assert.equal(result.detection_at_horizon_complete_case.value, 1);
});

function withMfaAcrossTakeover(outcome) {
  const input = createFixture();
  const row = input.episodes.find(episode => episode.episode_id === 'A1');
  const request = {
    event_id: 'pre-takeover-request', type: 'mfa_request',
    t_ms: row.takeover_ms - 1, attacker_keys: 0,
  };
  const event = (event_id, type) => ({
    event_id, type, t_ms: row.end_ms, attacker_keys: row.observed_attacker_keys,
  });
  row.events = [request];
  if (outcome === 'fail') {
    row.events.push(event('old-fail', 'mfa_fail'), event('old-revoke', 'revoke'));
  } else if (outcome === 'revoke') {
    row.events.push(event('risk-or-old-request-revoke', 'revoke'));
  } else {
    row.termination_reason = 'interrupted';
    if (outcome === 'pass') row.events.push(event('old-pass', 'mfa_pass'));
  }
  return { input, row };
}

for (const outcome of ['fail', 'revoke', 'pending', 'pass']) {
  test(`MFA spanning takeover (${outcome}) stops ambiguous TTD rather than silently counting/excluding`, () => {
    const { input, row } = withMfaAcrossTakeover(outcome);
    for (const run of [
      () => validateInput(input),
      () => episodeMetrics([row], 150),
      () => evaluate(input),
    ]) {
      assert.throws(run, error => {
        assert.match(error.message, /MFA_PENDING_AT_TAKEOVER/);
        assert.match(error.message, /B1.*FIX01.*A1/);
        assert.match(error.message, /pre-takeover-request/);
        return true;
      });
    }
  });
}

test('MFA completed strictly before takeover does not block a later request', () => {
  const { input, row } = withMfaAcrossTakeover('pass');
  row.events[1].t_ms = row.takeover_ms - 0.5;
  row.events[1].attacker_keys = 0;
  row.events.push({
    event_id: 'new-request', type: 'mfa_request', t_ms: row.end_ms,
    attacker_keys: row.observed_attacker_keys,
  });
  validateInput(input);
  const result = episodeMetrics([row], 150);
  assert.equal(result.n_detected, 1);
  assert.equal(result.outcomes[0].ttd_ms, row.end_ms - row.takeover_ms);
  assert.equal(result.mfa_per_wall_hour.numerator, 1);
});

test('Old MFA completed at exact takeover time remains ambiguous without cross-stream ordering', () => {
  const { input, row } = withMfaAcrossTakeover('pass');
  row.events[1].t_ms = row.takeover_ms;
  row.events[1].attacker_keys = 1;
  assert.throws(() => evaluate(input), /MFA_PENDING_AT_TAKEOVER/);
});

test('A new MFA request at takeover is still a detection at the first attacker key', () => {
  const input = createFixture();
  const row = input.episodes.find(episode => episode.episode_id === 'A1');
  row.events = [{
    event_id: 'new-request', type: 'mfa_request', t_ms: row.takeover_ms, attacker_keys: 1,
  }];
  row.termination_reason = 'interrupted';
  validateInput(input);
  const result = episodeMetrics([row], 150);
  assert.equal(result.outcomes[0].ttd_ms, 0);
  assert.equal(result.outcomes[0].ttd_keys, 1);
  assert.equal(result.mfa_per_wall_hour.numerator, 0);
});

test('Episode ending before takeover may retain pending MFA without inventing takeover', () => {
  const { input, row } = withMfaAcrossTakeover('pending');
  row.end_ms = row.takeover_ms - 0.25;
  row.observed_attacker_keys = 0;
  row.genuine_wall_seconds = row.end_ms / 1000;
  row.genuine_recording_seconds = row.end_ms / 1000;
  validateInput(input);
  const result = episodeMetrics([row], 150);
  assert.equal(result.n_takeovers_not_reached, 1);
  assert.equal(result.n_detected, 0);
});

test('Undetected and incomplete followup remain censored, not zero TTD', () => {
  const row = attack();
  row.events = [];
  row.termination_reason = 'interrupted';
  row.observed_attacker_keys = 20;
  const result = episodeMetrics([row], 150);
  assert.equal(result.n_right_censored, 1);
  assert.equal(result.n_incomplete_followup, 1);
  assert.equal(result.outcomes[0].ttd_keys, null);
  assert.equal(result.outcomes[0].censor_keys, 20);
  assert.equal(result.ttd_keys_detected_only.median, null);
  assert.equal(result.detection_at_horizon_complete_case.value, null);
});

test('Detection after the common horizon is not success at horizon', () => {
  const row = attack();
  const result = episodeMetrics([row], 50);
  assert.equal(result.n_detected, 1);
  assert.equal(result.detection_at_horizon_complete_case.value, 0);
});

test('Revocation before takeover is false revocation, not TTD zero or success', () => {
  const row = attack();
  row.end_ms = 30000;
  row.genuine_wall_seconds = 30;
  row.genuine_recording_seconds = 20;
  row.observed_attacker_keys = 0;
  row.events = [{ event_id: 'early', type: 'revoke', t_ms: 30000, attacker_keys: 0 }];
  const result = episodeMetrics([row], 150);
  assert.equal(result.n_takeovers_not_reached, 1);
  assert.equal(result.false_revocations, 1);
  assert.equal(result.n_takeovers_reached, 0);
  assert.equal(result.outcomes[0].ttd_keys, null);
});

test('MFA counts requests, not results; wall and recording exposures distinct', () => {
  const row = createFixture().episodes.find(item => item.episode_id === 'G0');
  const result = episodeMetrics([row], 150);
  close(result.mfa_per_wall_hour.value, 2);
  close(result.mfa_per_recording_hour.value, 4);
});

test('Quantiles match hand calculation', () => {
  assert.deepEqual(summarize([4, 1, 3, 2]), {
    n: 4, median: 2.5, q1: 1.75, q3: 3.25, iqr: 1.5, mean: 2.5, reason: null,
  });
  assert.throws(() => summarize([NaN]), /finite/);
});

test('Signed-rank n=4 all-positive exact p=.125 and rank effect=1', () => {
  const result = signedRank([1, 2, 3, 4]);
  close(result.p_two_sided, 0.125);
  close(result.rank_biserial, 1);
  assert.equal(result.w_plus, 10);
  close(signedRank([-1, -2, -3, -4]).rank_biserial, -1);
});

test('Exact signed-rank with ties agrees with independently enumerated signs', () => {
  const result = signedRank([1, -1, 2, 0]);
  const ranks = [1.5, 1.5, 3];
  const sums = Array.from({ length: 8 }, (_, mask) =>
    ranks.reduce((sum, rank, index) => sum + ((mask >> index) & 1 ? rank : 0), 0));
  const tail = Math.min(4.5, 1.5);
  const p = sums.filter(sum => sum <= tail || sum >= 6 - tail).length / sums.length;
  close(result.p_two_sided, p);
  close(result.rank_biserial, 0.5);
  assert.equal(result.ties, true);
  assert.equal(result.n_zero, 1);
});

test('Signed-rank zeros/single pair and exact-size limit are explicit', () => {
  assert.equal(signedRank([0, 0]).rank_biserial, null);
  assert.equal(signedRank([0, 1]).p_two_sided, null);
  assert.throws(() => signedRank(Array(51).fill(1)), /at most 50/);
});

test('Paired bootstrap is seeded, samples user differences and handles small n', () => {
  assert.deepEqual(bootstrapMeanDifference([1, 2, 4], 12), bootstrapMeanDifference([1, 2, 4], 12));
  const constant = bootstrapMeanDifference([2, 2, 2], 12);
  close(constant.low, 2);
  close(constant.high, 2);
  assert.equal(bootstrapMeanDifference([1], 12).reason, 'fewer_than_two_paired_users');
  assert.throws(() => bootstrapMeanDifference([1, 2], -1), /uint32/);
});

test('Fixture passes schema and maintains fixture warning in reports and charts', () => {
  const input = createFixture();
  validateInput(input);
  const report = evaluate(input, { baseline: 'B1', candidate: 'P1' });
  assert.equal(report.by_user.length, 8);
  assert.equal(report.comparison.pairs.length, 4);
  close(report.comparison.wilcoxon.p_two_sided, 0.125);
  assert.equal(report.by_user.find(row => row.claimed_profile === 'FIX04').episodes.n_right_censored, 1);
  assert.match(userCsv(report), /"fixture"/);
  assert.match(rocSvg(report), /FIXTURE - NOT HUMAN RESEARCH RESULTS/);
  assert.match(rocSvg(report), /FPR = FRR/);
});

test('Reject source hash leakage across splits', () => {
  const input = createFixture();
  input.sessions[1].sha256 = input.sessions[0].sha256;
  assert.throws(() => validateInput(input), /Data leakage/);
});

test('Reject source-session split mismatch and identity normalization confusion', () => {
  const input = createFixture();
  input.windows[0].source_session_ids = ['FIX01-train'];
  assert.throws(() => validateInput(input), /data leakage/);
  const second = createFixture();
  second.windows[0].claimed_profile = 'FIX02';
  assert.throws(() => validateInput(second), /contradicts sources/);
});

test('Reject mixed data kinds, invalid scores, duplicate windows and unknown profiles', () => {
  for (const [mutate, pattern] of [
    [input => { input.sessions[0].data_kind = 'real'; }, /Mixed provenance/],
    [input => { input.windows[0].score = Infinity; }, /finite number/],
    [input => { input.windows.push(input.windows[0]); }, /duplicate/],
    [input => { input.windows[0].claimed_profile = 'absent'; }, /absent from manifest/],
  ]) {
    const input = createFixture();
    mutate(input);
    assert.throws(() => validateInput(input), pattern);
  }
});

test('Reject repeated pending MFA, result without request, events after revoke', () => {
  const input = createFixture();
  input.episodes[0].events[1].type = 'mfa_request';
  assert.throws(() => validateInput(input), /MFA pending/);
  const second = createFixture();
  second.episodes[0].events[0].type = 'mfa_pass';
  assert.throws(() => validateInput(second), /without request/);
  const third = createFixture();
  third.episodes[1].events.push({ event_id: 'extra', type: 'mfa_request', t_ms: third.episodes[1].end_ms, attacker_keys: 100 });
  assert.throws(() => validateInput(third), /after revoke/);
});

test('Reject inconsistent exposure, attacker counts and missing revocation', () => {
  const input = createFixture();
  input.episodes[1].genuine_wall_seconds = 61;
  assert.throws(() => validateInput(input), /pre-takeover/);
  const second = createFixture();
  second.episodes[1].events[0].attacker_keys = 0;
  assert.throws(() => validateInput(second), /first key/);
  const third = createFixture();
  third.episodes[1].events.pop();
  assert.throws(() => validateInput(third), /immediately revoke/);
});

test('Reject unpaired scenario plans, invalid controls and no requested split', () => {
  const input = createFixture();
  input.episodes.find(row => row.method_id === 'P1').episode_id = 'different-scenario';
  assert.throws(() => evaluate(input, { baseline: 'B1', candidate: 'P1' }), /Unpaired/);
  assert.throws(() => evaluate(createFixture(), { split: 'validation' }), /No observations/);
  assert.throws(() => evaluate(createFixture(), { horizonKeys: 0 }), /Horizon/);
  assert.throws(() => evaluate(createFixture(), { iterations: NaN }), /iterations/);
  assert.throws(() => evaluate(createFixture(), { baseline: 'B1' }), /distinct/);
});

test('CSV guards formula injection; SVG escapes labels', () => {
  const input = createFixture();
  for (const row of [...input.windows, ...input.episodes]) row.method_id = '=x<&';
  // Keep only one original method to avoid duplicate records after renaming.
  input.windows = input.windows.slice(0, 16);
  input.episodes = input.episodes.slice(0, 8);
  const report = evaluate(input);
  assert.match(userCsv(report), /"'=x<&"/);
  assert.match(rocSvg(report), /=x&lt;&amp;/);
});

test('CLI writes portable results, hashes, no-overwrite guard and deterministic rerun', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'member4-evaluation-'));
  try {
    const cli = new URL('../src/cli.mjs', import.meta.url);
    const first = join(directory, 'first');
    const second = join(directory, 'second');
    const run = args => spawnSync(process.execPath, [fileURLToPath(cli), ...args], { encoding: 'utf8' });
    const a = run(['--demo', '--output', first]);
    assert.equal(a.status, 0, a.stderr);
    const b = run(['--input', join(first, 'input.json'), '--output', second, '--baseline', 'B1', '--candidate', 'P1']);
    assert.equal(b.status, 0, b.stderr);
    const manifest = JSON.parse(await readFile(join(first, 'run.json'), 'utf8'));
    for (const filename of await readdir(first)) {
      if (filename === 'run.json') continue;
      const bytes = await readFile(join(first, filename));
      assert.deepEqual(bytes, await readFile(join(second, filename)), filename);
      assert.equal(createHash('sha256').update(bytes).digest('hex'), manifest.output_sha256[filename]);
    }
    const overwrite = run(['--demo', '--output', first]);
    assert.notEqual(overwrite.status, 0);
    assert.match(overwrite.stderr, /EEXIST/);
    const invalid = run(['--demo', '--output', join(directory, 'bad'), '--seed', 'oops']);
    assert.notEqual(invalid.status, 0);
    assert.match(invalid.stderr, /uint32/);
    const ambiguousInput = join(directory, 'ambiguous.json');
    const ambiguousOutput = join(directory, 'ambiguous-output');
    await writeFile(ambiguousInput, JSON.stringify(withMfaAcrossTakeover('fail').input));
    const ambiguous = run(['--input', ambiguousInput, '--output', ambiguousOutput]);
    assert.equal(ambiguous.status, 1);
    assert.match(ambiguous.stderr, /MFA_PENDING_AT_TAKEOVER/);
    assert.match(ambiguous.stderr, /B1\/FIX01\/A1/);
    assert.equal((await readdir(directory)).includes('ambiguous-output'), false,
      'Ambiguous input must not create a success-shaped or partial report');
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
