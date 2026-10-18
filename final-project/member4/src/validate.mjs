const splits = ['train', 'validation', 'test'];
const kinds = ['fixture', 'synthetic', 'real'];

function check(condition, message) {
  if (!condition) throw new Error(message);
}

function object(value, path) {
  check(value !== null && typeof value === 'object' && !Array.isArray(value), `${path}: expected object`);
}

function string(value, path) {
  check(typeof value === 'string' && value.trim().length > 0, `${path}: expected nonempty string`);
}

function number(value, path, min = -Infinity, integer = false) {
  check(Number.isFinite(value) && value >= min && (!integer || Number.isSafeInteger(value)),
    `${path}: expected ${integer ? 'integer' : 'finite number'} >= ${min}`);
}

function array(value, path) {
  check(Array.isArray(value), `${path}: expected array`);
}

function unique(set, key, path) {
  check(!set.has(key), `${path}: duplicate ${key}`);
  set.add(key);
}

export function validateInput(input) {
  object(input, 'input');
  check(input.schema_version === '0.1', 'schema_version must be 0.1');
  check(kinds.includes(input.data_kind), 'data_kind must be fixture, synthetic or real');
  check(input.score_direction === 'higher_is_more_anomalous', 'Normalize score direction before evaluation');
  check(input.window_track === 'fixed_window_scores', 'window_track must be fixed_window_scores, not stopped policy logs');
  string(input.provenance, 'provenance');
  for (const key of ['sessions', 'windows', 'episodes']) array(input[key], key);
  check(input.windows.length + input.episodes.length > 0, 'At least one window or episode is required');
  const sessions = new Map();
  const hashSplit = new Map();
  for (const session of input.sessions) {
    object(session, 'session');
    string(session.session_id, 'session_id');
    string(session.participant_id, 'participant_id');
    check(!sessions.has(session.session_id), `Duplicate session: ${session.session_id}`);
    check(splits.includes(session.split), `Invalid split: ${session.session_id}`);
    check(session.data_kind === input.data_kind, `Mixed provenance: ${session.session_id}`);
    check(typeof session.sha256 === 'string' && /^[a-f0-9]{64}$/.test(session.sha256),
      `Invalid SHA-256: ${session.session_id}`);
    check(!hashSplit.has(session.sha256) || hashSplit.get(session.sha256) === session.split,
      `Data leakage: source hash appears in different splits: ${session.session_id}`);
    hashSplit.set(session.sha256, session.split);
    sessions.set(session.session_id, session);
  }
  const participants = new Set([...sessions.values()].map(session => session.participant_id));
  function sources(row, path) {
    string(row.claimed_profile, `${path}.claimed_profile`);
    check(participants.has(row.claimed_profile), `${path}: claimed_profile absent from manifest`);
    string(row.method_id, `${path}.method_id`);
    check(splits.includes(row.split), `${path}: invalid split`);
    array(row.source_session_ids, `${path}.source_session_ids`);
    check(row.source_session_ids.length > 0, `${path}: no source sessions`);
    check(new Set(row.source_session_ids).size === row.source_session_ids.length, `${path}: duplicate source session`);
    return row.source_session_ids.map(id => {
      const session = sessions.get(id);
      check(Boolean(session), `${path}: unknown session ${id}`);
      check(session.split === row.split, `${path}: data leakage, source split does not match`);
      return session.participant_id;
    });
  }
  const windowIds = new Set();
  const windowDefinitions = new Map();
  for (const row of input.windows) {
    object(row, 'window');
    string(row.window_id, 'window_id');
    const path = `window ${row.window_id}`;
    const owners = sources(row, path);
    number(row.score, `${path}.score`);
    check(typeof row.accepted === 'boolean', `${path}: accepted must be boolean`);
    check(['genuine', 'impostor', 'mixed', 'unknown'].includes(row.label), `${path}: invalid label`);
    if (row.label === 'genuine') check(owners.every(id => id === row.claimed_profile), `${path}: genuine label contradicts sources`);
    if (row.label === 'impostor') check(owners.every(id => id !== row.claimed_profile), `${path}: impostor label contradicts sources`);
    if (row.label === 'mixed') check(owners.includes(row.claimed_profile) && owners.some(id => id !== row.claimed_profile),
      `${path}: mixed label requires both genuine and impostor sources`);
    const identity = JSON.stringify([row.claimed_profile, row.split, row.window_id]);
    const definition = JSON.stringify([row.source_session_ids, row.label]);
    check(!windowDefinitions.has(identity) || windowDefinitions.get(identity) === definition,
      `${path}: methods disagree on window sources/label`);
    windowDefinitions.set(identity, definition);
    unique(windowIds, JSON.stringify([row.method_id, row.claimed_profile, row.split, row.window_id]), path);
  }
  const episodeIds = new Set();
  for (const episode of input.episodes) {
    object(episode, 'episode');
    string(episode.episode_id, 'episode_id');
    const path = `episode ${episode.episode_id}`;
    const owners = sources(episode, path);
    unique(episodeIds, JSON.stringify([episode.method_id, episode.claimed_profile, episode.split, episode.episode_id]), path);
    number(episode.end_ms, `${path}.end_ms`, 0);
    number(episode.planned_end_ms, `${path}.planned_end_ms`, episode.end_ms);
    number(episode.genuine_wall_seconds, `${path}.genuine_wall_seconds`, 0);
    number(episode.genuine_recording_seconds, `${path}.genuine_recording_seconds`, 0);
    check(episode.genuine_recording_seconds <= episode.genuine_wall_seconds, `${path}: recording exposure exceeds wall exposure`);
    number(episode.observed_attacker_keys, `${path}.observed_attacker_keys`, 0, true);
    check(['completed', 'revoke', 'interrupted'].includes(episode.termination_reason), `${path}: invalid termination_reason`);
    if (episode.termination_reason === 'completed') check(episode.end_ms === episode.planned_end_ms, `${path}: completed before planned end`);
    if (episode.takeover_ms === null) {
      check(owners.every(id => id === episode.claimed_profile), `${path}: genuine episode has impostor source`);
      check(episode.observed_attacker_keys === 0, `${path}: genuine episode has attacker keys`);
    } else {
      number(episode.takeover_ms, `${path}.takeover_ms`, 0);
      check(episode.takeover_ms <= episode.planned_end_ms, `${path}: takeover after planned end`);
      check(owners.includes(episode.claimed_profile) && owners.some(id => id !== episode.claimed_profile),
        `${path}: takeover needs owner and impostor sources`);
      check(episode.end_ms >= episode.takeover_ms || episode.observed_attacker_keys === 0,
        `${path}: attacker keys before takeover`);
      if (episode.end_ms >= episode.takeover_ms) check(episode.observed_attacker_keys >= 1, `${path}: first attacker key not counted`);
    }
    const genuineEnd = episode.takeover_ms === null ? episode.end_ms : Math.min(episode.takeover_ms, episode.end_ms);
    check(episode.genuine_wall_seconds <= genuineEnd / 1000 + 1e-9, `${path}: genuine exposure exceeds pre-takeover interval`);
    array(episode.events, `${path}.events`);
    let lastTime = -1;
    let lastKeys = 0;
    let pending = false;
    let revoked = false;
    const eventIds = new Set();
    for (const event of episode.events) {
      object(event, `${path}.event`);
      string(event.event_id, `${path}.event_id`);
      unique(eventIds, event.event_id, path);
      number(event.t_ms, `${path}.event.t_ms`, 0);
      check(event.t_ms >= lastTime && event.t_ms <= episode.end_ms, `${path}: events out of order or beyond end`);
      check(!revoked, `${path}: event after revoke`);
      number(event.attacker_keys, `${path}.event.attacker_keys`, 0, true);
      check(event.attacker_keys >= lastKeys && event.attacker_keys <= episode.observed_attacker_keys,
        `${path}: inconsistent attacker key counts`);
      if (episode.takeover_ms === null || event.t_ms < episode.takeover_ms) {
        check(event.attacker_keys === 0, `${path}: attacker keys before takeover`);
      } else check(event.attacker_keys >= 1, `${path}: attacker count must include first key`);
      check(['mfa_request', 'mfa_pass', 'mfa_fail', 'revoke'].includes(event.type), `${path}: invalid event type`);
      if (event.type === 'mfa_request') {
        check(!pending, `${path}: repeated request while MFA pending`);
        pending = true;
      } else if (event.type === 'mfa_pass' || event.type === 'mfa_fail') {
        check(pending, `${path}: MFA result without request`);
        pending = false;
        if (event.type === 'mfa_fail') {
          const next = episode.events[episode.events.indexOf(event) + 1];
          check(next?.type === 'revoke' && next.t_ms === event.t_ms, `${path}: MFA failure must immediately revoke`);
        }
      } else {
        revoked = true;
        check(event.t_ms === episode.end_ms && episode.termination_reason === 'revoke',
          `${path}: revoke must terminate episode`);
      }
      lastTime = event.t_ms;
      lastKeys = event.attacker_keys;
    }
    check(revoked === (episode.termination_reason === 'revoke'), `${path}: termination reason disagrees with events`);
    assertNoMfaPendingAtTakeover(episode);
  }
  return input;
}

export function assertNoMfaPendingAtTakeover(episode) {
  if (episode.takeover_ms === null || episode.end_ms < episode.takeover_ms) return;
  let pendingRequest = null;
  for (const event of episode.events) {
    if (event.t_ms >= episode.takeover_ms) break;
    if (event.type === 'mfa_request') pendingRequest = event;
    else if (event.type === 'mfa_pass' || event.type === 'mfa_fail') pendingRequest = null;
  }
  // Schema 0.1 cannot attribute an outstanding challenge across the takeover boundary.
  if (pendingRequest) {
    throw new Error(
      `MFA_PENDING_AT_TAKEOVER: ${episode.method_id}/${episode.claimed_profile}/${episode.episode_id}: `
      + `request ${pendingRequest.event_id} began before takeover and was not resolved strictly before it. `
      + 'Evaluation stopped: agree on event attribution and MFA/takeover ordering before scoring this log; '
      + 'do not remove the episode or reset state to bypass this check.',
    );
  }
}
