import { summarize } from './statistics.mjs';
import { assertNoMfaPendingAtTakeover } from './validate.mjs';

export function rate(numerator, denominator, emptyReason) {
  return {
    numerator, denominator, value: denominator > 0 ? numerator / denominator : null,
    reason: denominator > 0 ? null : emptyReason,
  };
}

export function windowMetrics(rows) {
  const genuine = rows.filter(row => row.label === 'genuine');
  const impostor = rows.filter(row => row.label === 'impostor');
  return {
    n_windows: rows.length,
    excluded_mixed: rows.filter(row => row.label === 'mixed').length,
    excluded_unknown: rows.filter(row => row.label === 'unknown').length,
    far: rate(impostor.filter(row => row.accepted).length, impostor.length, 'no_impostor_windows'),
    frr: rate(genuine.filter(row => !row.accepted).length, genuine.length, 'no_genuine_windows'),
    roc: rocEer(rows),
  };
}

export function rocEer(rows) {
  const samples = rows.filter(row => ['genuine', 'impostor'].includes(row.label));
  const genuine = samples.filter(row => row.label === 'genuine').length;
  const impostor = samples.length - genuine;
  if (!genuine || !impostor) {
    return { eer: null, points: [], reason: 'requires_both_classes' };
  }
  samples.sort((a, b) => b.score - a.score);
  const points = [{
    threshold: null, threshold_kind: 'above_max', far: 1, frr: 0, fpr: 0, tpr: 0,
  }];
  let rejectedGenuine = 0;
  let rejectedImpostor = 0;
  for (let i = 0; i < samples.length;) {
    const threshold = samples[i].score;
    while (i < samples.length && samples[i].score === threshold) {
      if (samples[i].label === 'genuine') rejectedGenuine++;
      else rejectedImpostor++;
      i++;
    }
    const far = (impostor - rejectedImpostor) / impostor;
    const frr = rejectedGenuine / genuine;
    points.push({ threshold, threshold_kind: 'finite', far, frr, fpr: frr, tpr: 1 - far });
  }
  for (let i = 1; i < points.length; i++) {
    const left = points[i - 1];
    const right = points[i];
    if (right.far <= right.frr) {
      const dLeft = left.far - left.frr;
      const dRight = right.far - right.frr;
      const fraction = dLeft / (dLeft - dRight);
      return {
        eer: left.far + fraction * (right.far - left.far), points, reason: null,
        interpolation: 'linear_between_operating_points_not_a_deployment_threshold',
      };
    }
  }
  throw new Error('ROC did not cross FAR=FRR.');
}

export function episodeMetrics(episodes, horizonKeys) {
  let mfa = 0;
  let falseRevocations = 0;
  let wallSeconds = 0;
  let recordingSeconds = 0;
  const outcomes = [];
  for (const episode of episodes) {
    assertNoMfaPendingAtTakeover(episode);
    wallSeconds += episode.genuine_wall_seconds;
    recordingSeconds += episode.genuine_recording_seconds;
    const genuineEvents = episode.events.filter(event =>
      episode.takeover_ms === null || event.t_ms < episode.takeover_ms);
    mfa += genuineEvents.filter(event => event.type === 'mfa_request').length;
    falseRevocations += genuineEvents.filter(event => event.type === 'revoke').length;
    if (episode.takeover_ms === null) continue;
    if (episode.end_ms < episode.takeover_ms) {
      outcomes.push({
        episode_id: episode.episode_id, status: 'takeover_not_reached',
        detected: false, ttd_keys: null, ttd_ms: null, censor_keys: null, censor_ms: null,
        horizon_outcome: 'not_applicable',
      });
      continue;
    }
    const detection = episode.events.find(event =>
      event.t_ms >= episode.takeover_ms && ['mfa_request', 'revoke'].includes(event.type));
    const knownAtHorizon = Boolean(detection && detection.attacker_keys <= horizonKeys)
      || episode.observed_attacker_keys >= horizonKeys;
    outcomes.push({
      episode_id: episode.episode_id,
      status: detection ? 'detected' : 'right_censored',
      detected: Boolean(detection),
      ttd_keys: detection ? detection.attacker_keys : null,
      ttd_ms: detection ? detection.t_ms - episode.takeover_ms : null,
      censor_keys: detection ? null : episode.observed_attacker_keys,
      censor_ms: detection ? null : episode.end_ms - episode.takeover_ms,
      horizon_outcome: !knownAtHorizon ? 'incomplete_followup'
        : detection && detection.attacker_keys <= horizonKeys ? 'detected' : 'not_detected',
    });
  }
  const atRisk = outcomes.filter(row => row.status !== 'takeover_not_reached');
  const known = atRisk.filter(row => row.horizon_outcome !== 'incomplete_followup');
  return {
    n_episodes: episodes.length, n_planned_takeovers: outcomes.length,
    n_takeovers_reached: atRisk.length, n_takeovers_not_reached: outcomes.length - atRisk.length,
    n_detected: atRisk.filter(row => row.detected).length,
    n_right_censored: atRisk.filter(row => !row.detected).length,
    horizon_keys: horizonKeys, n_incomplete_followup: atRisk.length - known.length,
    detection_at_horizon_complete_case: rate(
      known.filter(row => row.horizon_outcome === 'detected').length,
      known.length, 'no_known_horizon_outcomes'),
    ttd_keys_detected_only: summarize(atRisk.filter(row => row.detected).map(row => row.ttd_keys)),
    ttd_ms_detected_only: summarize(atRisk.filter(row => row.detected).map(row => row.ttd_ms)),
    false_revocations: falseRevocations,
    mfa_per_wall_hour: rate(mfa, wallSeconds / 3600, 'no_genuine_wall_exposure'),
    mfa_per_recording_hour: rate(mfa, recordingSeconds / 3600, 'no_genuine_recording_exposure'),
    outcomes,
  };
}
