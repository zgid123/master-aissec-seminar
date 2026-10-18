import type { ManifestRow, Session } from "./types.js";

export interface StudySession {
  row: ManifestRow;
  metadata: Session["metadata"];
  /** Wall-clock duration calculated from the validated event stream. */
  wallDurationMs: number;
}

export interface StudyDesignAudit {
  sessionReasons: Map<string, string[]>;
  participantProtocolComplete: Map<string, boolean>;
}

export interface ReplacementAudit {
  supersededBy: Map<string, string>;
  invalidReplacementReasons: Map<string, string[]>;
}

/** Validate explicit retake links and identify the sessions replaced by them. */
export function auditReplacements(sessions: StudySession[]): ReplacementAudit {
  const byId = new Map(sessions.map((session) => [session.row.session_id, session])),
    invalidReplacementReasons = new Map<string, string[]>(),
    supersededBy = new Map<string, string>(),
    replacementsByTarget = new Map<string, string[]>();
  const invalidate = (id: string, reason: string) => {
    const reasons = invalidReplacementReasons.get(id) ?? [];
    reasons.push(reason);
    invalidReplacementReasons.set(id, reasons);
  };
  for (const session of sessions) {
    const targetId = session.row.supersedes_session_id;
    if (targetId === undefined || targetId === "") continue;
    if (typeof targetId !== "string" || targetId === session.row.session_id) {
      invalidate(session.row.session_id, "invalid_supersedes_reference");
      continue;
    }
    const target = byId.get(targetId);
    if (
      !target ||
      session.metadata.collection_mode !== "formal" ||
      target.metadata.collection_mode !== "formal" ||
      session.row.participant_id !== target.row.participant_id ||
      session.row.study_day !== target.row.study_day ||
      session.row.split !== target.row.split
    ) {
      invalidate(session.row.session_id, "invalid_supersedes_reference");
      continue;
    }
    const replacements = replacementsByTarget.get(targetId) ?? [];
    replacements.push(session.row.session_id);
    replacementsByTarget.set(targetId, replacements);
  }
  for (const replacements of replacementsByTarget.values()) {
    if (replacements.length > 1)
      for (const id of replacements)
        invalidate(id, "multiple_replacements_for_session");
  }
  const candidate = new Map<string, string>();
  for (const session of sessions) {
    const target = session.row.supersedes_session_id;
    if (
      typeof target === "string" &&
      target !== "" &&
      byId.has(target) &&
      !invalidReplacementReasons.has(session.row.session_id)
    )
      candidate.set(session.row.session_id, target);
  }
  const done = new Set<string>();
  for (const start of candidate.keys()) {
    const path: string[] = [],
      position = new Map<string, number>();
    let current: string | undefined = start;
    while (current && candidate.has(current) && !done.has(current)) {
      const seenAt = position.get(current);
      if (seenAt !== undefined) {
        for (const id of path.slice(seenAt))
          invalidate(id, "supersedes_cycle");
        break;
      }
      position.set(current, path.length);
      path.push(current);
      current = candidate.get(current);
    }
    path.forEach((id) => done.add(id));
  }
  for (const [replacement, target] of candidate)
    if (!invalidReplacementReasons.has(replacement))
      supersededBy.set(target, replacement);
  return { supersededBy, invalidReplacementReasons };
}

const expectedSplit = {
  1: "train",
  2: "validation",
  3: "test",
} as const;

function localDate(metadata: Session["metadata"]): string | undefined {
  const startedAt = metadata.started_at;
  const timezone = metadata.timezone;
  if (
    typeof startedAt !== "string" ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/i.test(
      startedAt,
    ) ||
    typeof timezone !== "string"
  )
    return;
  const timestamp = Date.parse(startedAt);
  if (!Number.isFinite(timestamp)) return;
  try {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(timestamp);
    const part = (type: string) => parts.find((item) => item.type === type)?.value;
    const year = part("year"),
      month = part("month"),
      day = part("day");
    return year && month && day ? `${year}-${month}-${day}` : undefined;
  } catch {
    return;
  }
}

/** Audit the real-study schedule without changing researcher-assigned splits. */
export function auditStudyDesign(sessions: StudySession[]): StudyDesignAudit {
  const sessionReasons = new Map<string, string[]>(),
    participantProtocolComplete = new Map<string, boolean>(),
    formalByParticipant = new Map<string, StudySession[]>();

  for (const session of sessions) {
    const id = session.row.session_id;
    sessionReasons.set(id, []);
    if (session.metadata.collection_mode !== "formal") continue;
    const rows = formalByParticipant.get(session.row.participant_id) ?? [];
    rows.push(session);
    formalByParticipant.set(session.row.participant_id, rows);
  }

  for (const [participant, rows] of formalByParticipant) {
    const groupReasons = new Set<string>(),
      days = new Map<number, StudySession[]>();

    for (const session of rows) {
      const { row, metadata } = session,
        day = row.study_day,
        reasons = sessionReasons.get(row.session_id)!;
      if (!Number.isInteger(day) || ![1, 2, 3].includes(day!)) {
        reasons.push("invalid_study_day");
        groupReasons.add("participant_protocol_dates_invalid");
      } else {
        const dayRows = days.get(day!) ?? [];
        dayRows.push(session);
        days.set(day!, dayRows);
        if (row.split !== expectedSplit[day as 1 | 2 | 3]) {
          reasons.push("study_day_split_mismatch");
          groupReasons.add("participant_protocol_assignment_invalid");
        }
      }
      if (!localDate(metadata)) {
        reasons.push("invalid_started_at_or_timezone");
        groupReasons.add("participant_protocol_dates_invalid");
      }
    }

    const expectedCounts = new Map([
      [1, 2],
      [2, 1],
      [3, 1],
    ]);
    if (
      rows.length !== 4 ||
      [...expectedCounts].some(([day, count]) => (days.get(day)?.length ?? 0) !== count)
    )
      groupReasons.add("incomplete_participant_protocol");

    const dateByDay = new Map<number, string>();
    for (const [day, dayRows] of days) {
      const dates = dayRows
        .map((session) => localDate(session.metadata))
        .filter((date): date is string => !!date);
      if (dates.length && new Set(dates).size !== 1)
        groupReasons.add("participant_protocol_dates_invalid");
      if (dates.length) dateByDay.set(day, dates[0]);
    }
    const date1 = dateByDay.get(1),
      date2 = dateByDay.get(2),
      date3 = dateByDay.get(3);
    if (
      !date1 ||
      !date2 ||
      !date3 ||
      !(date1 < date2 && date2 < date3)
    )
      groupReasons.add("participant_protocol_dates_invalid");

    const dayOne = days.get(1) ?? [];
    if (dayOne.length === 2) {
      const ordered = [...dayOne].sort(
        (a, b) =>
          Date.parse(String(a.metadata.started_at)) -
          Date.parse(String(b.metadata.started_at)),
      );
      const earlierStart = Date.parse(String(ordered[0].metadata.started_at));
      const laterStart = Date.parse(String(ordered[1].metadata.started_at));
      const earlierDuration = ordered[0].wallDurationMs;
      if (
        !Number.isFinite(earlierStart) ||
        !Number.isFinite(laterStart) ||
        !Number.isFinite(earlierDuration) ||
        earlierDuration < 0
      ) {
        groupReasons.add("invalid_day1_session_timing");
      } else if (laterStart - (earlierStart + earlierDuration) < 30 * 60 * 1000) {
        groupReasons.add("day1_rest_under_30m");
      }
    }

    const complete = groupReasons.size === 0;
    participantProtocolComplete.set(participant, complete);
    if (!complete) {
      for (const session of rows) {
        const reasons = sessionReasons.get(session.row.session_id)!;
        reasons.push("participant_protocol_incomplete", ...groupReasons);
      }
    }
  }

  return { sessionReasons, participantProtocolComplete };
}
