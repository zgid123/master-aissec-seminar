import { createHash } from 'node:crypto';

export function createFixture() {
  const users = ['FIX01', 'FIX02', 'FIX03', 'FIX04'];
  const sessions = users.flatMap(participant_id => ['train', 'validation', 'test'].map(split => ({
    session_id: `${participant_id}-${split}`, participant_id, split, data_kind: 'fixture',
    sha256: createHash('sha256').update(`fixture identity only: ${participant_id}-${split}`).digest('hex'),
  })));
  const windows = [];
  const episodes = [];
  for (const method_id of ['B1', 'P1']) {
    for (const [index, claimed_profile] of users.entries()) {
      const ownerSession = `${claimed_profile}-test`;
      const impostorSession = `${users[(index + 1) % users.length]}-test`;
      for (const [i, score] of [0.1, 0.2, 0.8, 0.9].entries()) {
        windows.push({
          method_id, claimed_profile, split: 'test', window_id: `w${i}`,
          source_session_ids: [i < 2 ? ownerSession : impostorSession],
          label: i < 2 ? 'genuine' : 'impostor', score, accepted: score < 0.5,
        });
      }
      const requestCount = method_id === 'B1' ? index + 2 : 1;
      const genuineEvents = Array.from({ length: requestCount }, (_, i) => [
        { event_id: `request-${i}`, type: 'mfa_request', t_ms: (i + 1) * 10000, attacker_keys: 0 },
        { event_id: `pass-${i}`, type: 'mfa_pass', t_ms: (i + 1) * 10000 + 100, attacker_keys: 0 },
      ]).flat();
      episodes.push({
        episode_id: 'G0', claimed_profile, method_id, split: 'test', source_session_ids: [ownerSession],
        takeover_ms: null, planned_end_ms: 3600000, end_ms: 3600000,
        genuine_wall_seconds: 3600, genuine_recording_seconds: 1800,
        observed_attacker_keys: 0, termination_reason: 'completed', events: genuineEvents,
      });
      const detected = index !== 3;
      const keys = method_id === 'B1' ? 100 : 50;
      episodes.push({
        episode_id: 'A1', claimed_profile, method_id, split: 'test',
        source_session_ids: [ownerSession, impostorSession], takeover_ms: 60000,
        planned_end_ms: 120000, end_ms: detected ? 60000 + keys * 200 : 120000,
        genuine_wall_seconds: 60, genuine_recording_seconds: 60,
        observed_attacker_keys: detected ? keys : 300,
        termination_reason: detected ? 'revoke' : 'completed',
        events: detected ? [
          { event_id: 'challenge', type: 'mfa_request', t_ms: 60000 + keys * 200, attacker_keys: keys },
          { event_id: 'fail', type: 'mfa_fail', t_ms: 60000 + keys * 200, attacker_keys: keys },
          { event_id: 'revoke', type: 'revoke', t_ms: 60000 + keys * 200, attacker_keys: keys },
        ] : [],
      });
    }
  }
  return {
    schema_version: '0.1', data_kind: 'fixture', score_direction: 'higher_is_more_anomalous',
    window_track: 'fixed_window_scores',
    provenance: 'Hand-designed formula fixture. FIX users, scores and episodes are NOT model or human observations. Hashes identify fixture labels, not raw files. B1/P1 names exercise the adapter only.',
    sessions, windows, episodes,
  };
}
