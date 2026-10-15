export type KeyGroup = "typing" | "separator" | "correction";
export type EventType =
  | "start"
  | "stop"
  | "down"
  | "up"
  | "boundary"
  | "resume"
  | "composition_start"
  | "composition_end"
  | "repeat"
  | "shortcut"
  | "duplicate_down"
  | "unmatched_up"
  | "unidentified";
export interface KeyInput {
  code: string;
  key?: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  altKey?: boolean;
  repeat?: boolean;
  isComposing?: boolean;
  keyCode?: number;
}
export interface PairFields {
  pair_id: number;
  group: KeyGroup;
  composing: boolean;
}
export interface RecordedEvent extends Partial<PairFields> {
  type: EventType;
  t_ms: number;
  reason?: string;
}
export interface SessionMetadata {
  participant_id: string;
  session_id: string;
}
export interface CollectionMetadata extends SessionMetadata {
  started_at: string;
  timezone: string;
  keyboard: string;
  ime: string;
  context: string;
  browser: string;
  platform: string;
  consent: boolean;
}
export interface RecordedSession<M extends SessionMetadata = SessionMetadata> {
  schema_version: "1.0";
  data_kind: "real";
  metadata: M;
  events: RecordedEvent[];
}
