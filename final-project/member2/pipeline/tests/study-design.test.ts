import test from "node:test";
import assert from "node:assert/strict";
import {
  auditReplacements,
  auditStudyDesign,
  type StudySession,
} from "../src/study-design.js";
import type { ManifestRow, Session } from "../src/types.js";

function formalStudy(): StudySession[] {
  const schedule = [
    { day: 1, split: "train", start: "2026-01-10T08:00:00.000Z" },
    { day: 1, split: "train", start: "2026-01-10T09:00:00.000Z" },
    { day: 2, split: "validation", start: "2026-01-11T09:00:00.000Z" },
    { day: 3, split: "test", start: "2026-01-12T09:00:00.000Z" },
  ] as const;
  return schedule.map(({ day, split, start }, index) => ({
    row: {
      file: `P01-${index}.json`,
      participant_id: "P01",
      session_id: `P01-${index}`,
      data_kind: "real",
      split,
      study_day: day,
    } satisfies ManifestRow,
    metadata: {
      participant_id: "P01",
      session_id: `P01-${index}`,
      collection_mode: "formal",
      started_at: start,
      timezone: "UTC",
    } as Session["metadata"],
    wallDurationMs: 8 * 60 * 1000,
  }));
}

test("accepts the four-session schedule with explicit days and sufficient spacing", () => {
  const audit = auditStudyDesign(formalStudy());
  assert.equal(audit.participantProtocolComplete.get("P01"), true);
  assert.ok([...audit.sessionReasons.values()].every((reasons) => !reasons.length));
});

test("marks all formal sessions when participant coverage is incomplete", () => {
  const audit = auditStudyDesign(formalStudy().slice(0, 3));
  assert.equal(audit.participantProtocolComplete.get("P01"), false);
  assert.ok(
    [...audit.sessionReasons.values()].every((reasons) =>
      reasons.includes("incomplete_participant_protocol"),
    ),
  );
});

test("requires a 30-minute end-to-start rest between day-one sessions", () => {
  const sessions = formalStudy();
  sessions[1].metadata.started_at = "2026-01-10T08:30:00.000Z";
  const audit = auditStudyDesign(sessions);
  assert.equal(audit.participantProtocolComplete.get("P01"), false);
  assert.ok(
    [...audit.sessionReasons.values()].every((reasons) =>
      reasons.includes("day1_rest_under_30m"),
    ),
  );
});

test("rejects a study-day/split mismatch", () => {
  const sessions = formalStudy();
  sessions[1].row.split = "validation";
  const audit = auditStudyDesign(sessions);
  assert.equal(audit.participantProtocolComplete.get("P01"), false);
  assert.ok(audit.sessionReasons.get("P01-1")?.includes("study_day_split_mismatch"));
});

test("accepts exactly 30 minutes of end-to-start rest", () => {
  const sessions = formalStudy();
  sessions[1].metadata.started_at = "2026-01-10T08:38:00.000Z";
  const audit = auditStudyDesign(sessions);
  assert.equal(audit.participantProtocolComplete.get("P01"), true);
});

test("rejects a rest gap one millisecond short and accepts longer gaps", () => {
  const short = formalStudy();
  short[1].metadata.started_at = "2026-01-10T08:37:59.999Z";
  const shortAudit = auditStudyDesign(short);
  assert.ok(
    [...shortAudit.sessionReasons.values()].every((reasons) =>
      reasons.includes("day1_rest_under_30m"),
    ),
  );

  const long = formalStudy();
  long[1].metadata.started_at = "2026-01-10T09:00:00.000Z";
  assert.equal(auditStudyDesign(long).participantProtocolComplete.get("P01"), true);
});

test("orders day-one sessions by start time regardless of manifest order", () => {
  const sessions = formalStudy().reverse();
  assert.equal(auditStudyDesign(sessions).participantProtocolComplete.get("P01"), true);
});

test("rejects overlapping day-one sessions and counts pauses in the earlier wall duration", () => {
  const overlapping = formalStudy();
  overlapping[0].wallDurationMs = 70 * 60 * 1000;
  const overlapAudit = auditStudyDesign(overlapping);
  assert.ok(
    [...overlapAudit.sessionReasons.values()].every((reasons) =>
      reasons.includes("day1_rest_under_30m"),
    ),
  );

  const includesPause = formalStudy();
  includesPause[0].wallDurationMs = 20 * 60 * 1000;
  includesPause[1].metadata.started_at = "2026-01-10T08:49:59.999Z";
  const pauseAudit = auditStudyDesign(includesPause);
  assert.ok(
    [...pauseAudit.sessionReasons.values()].every((reasons) =>
      reasons.includes("day1_rest_under_30m"),
    ),
  );
});

test("rejects invalid timestamps, timezones, and dates that do not follow study-day order", () => {
  const sessions = formalStudy();
  sessions[2].metadata.timezone = "Not/A_Timezone";
  sessions[3].metadata.started_at = "2026-01-09T09:00:00.000Z";
  const audit = auditStudyDesign(sessions);
  assert.equal(audit.participantProtocolComplete.get("P01"), false);
  assert.ok(audit.sessionReasons.get("P01-2")?.includes("invalid_started_at_or_timezone"));
  assert.ok(
    [...audit.sessionReasons.values()].every((reasons) =>
      reasons.includes("participant_protocol_dates_invalid"),
    ),
  );
});

test("pilot sessions do not count toward or invalidate the formal study schedule", () => {
  const sessions = formalStudy();
  sessions.push({
    ...sessions[0],
    row: {
      ...sessions[0].row,
      file: "P01-pilot.json",
      session_id: "P01-pilot",
    },
    metadata: {
      ...sessions[0].metadata,
      session_id: "P01-pilot",
      collection_mode: "pilot",
    },
  });
  const audit = auditStudyDesign(sessions);
  assert.equal(audit.participantProtocolComplete.get("P01"), true);
  assert.deepEqual(audit.sessionReasons.get("P01-pilot"), []);
});

test("valid retake replaces the failed formal slot without breaking the schedule", () => {
  const sessions = formalStudy();
  sessions.push({
    ...sessions[2],
    row: {
      ...sessions[2].row,
      session_id: "P01-2-R1",
      supersedes_session_id: sessions[2].row.session_id,
    },
    metadata: {
      ...sessions[2].metadata,
      session_id: "P01-2-R1",
      started_at: "2026-01-11T11:00:00.000Z",
    },
  });
  const replacement = auditReplacements(sessions),
    active = sessions.filter(
      ({ row }) => !replacement.supersededBy.has(row.session_id),
    ),
    audit = auditStudyDesign(active);
  assert.equal(replacement.supersededBy.get("P01-2"), "P01-2-R1");
  assert.deepEqual(replacement.invalidReplacementReasons, new Map());
  assert.equal(audit.participantProtocolComplete.get("P01"), true);
});

test("a superseded day-one session does not affect the active session rest gap", () => {
  const sessions = formalStudy();
  sessions[0].metadata.started_at = "2026-01-10T08:00:00.000Z";
  sessions[0].wallDurationMs = 40 * 60 * 1000;
  sessions.push({
    ...sessions[0],
    row: {
      ...sessions[0].row,
      session_id: "P01-D1-R1",
      supersedes_session_id: sessions[0].row.session_id,
    },
    metadata: {
      ...sessions[0].metadata,
      session_id: "P01-D1-R1",
      started_at: "2026-01-10T08:05:00.000Z",
    },
    wallDurationMs: 8 * 60 * 1000,
  });
  const replacement = auditReplacements(sessions);
  const active = sessions.filter(
    ({ row }) => !replacement.supersededBy.has(row.session_id),
  );
  assert.equal(auditStudyDesign(active).participantProtocolComplete.get("P01"), true);
});

test("invalid, duplicate and cyclic retake links cannot silently replace sessions", () => {
  const base = formalStudy(),
    extra = (id: string, target: string) => ({
      ...base[2],
      row: {
        ...base[2].row,
        session_id: id,
        supersedes_session_id: target,
      },
      metadata: { ...base[2].metadata, session_id: id },
    }),
    duplicate = auditReplacements([
      ...base,
      extra("P01-2-R1", "P01-2"),
      extra("P01-2-R2", "P01-2"),
    ]);
  assert.equal(duplicate.supersededBy.has("P01-2"), false);
  assert.match(
    duplicate.invalidReplacementReasons.get("P01-2-R1")?.join(";") ?? "",
    /multiple_replacements_for_session/,
  );
  const cycleRows = base.map((s) => ({ ...s, row: { ...s.row } }));
  cycleRows[0]!.row.supersedes_session_id = cycleRows[1]!.row.session_id;
  cycleRows[1]!.row.supersedes_session_id = cycleRows[0]!.row.session_id;
  const cycle = auditReplacements(cycleRows);
  assert.match(cycle.invalidReplacementReasons.get("P01-0")?.join(";") ?? "", /supersedes_cycle/);
  assert.equal(cycle.supersededBy.size, 0);
  const invalid = auditReplacements([
    ...base,
    extra("P01-2-R3", "NO-SUCH-SESSION"),
  ]);
  assert.match(
    invalid.invalidReplacementReasons.get("P01-2-R3")?.join(";") ?? "",
    /invalid_supersedes_reference/,
  );
});
