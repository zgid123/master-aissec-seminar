export type Split = "train" | "validation" | "test";
export type DataKind = "real" | "synthetic";
export type KeyGroup = "typing" | "separator" | "correction";
export interface TimingEvent {
  type: string;
  t_ms: number;
  pair_id?: number;
  group?: KeyGroup;
  composing?: boolean;
  reason?: string;
}
export interface Session {
  schema_version: "1.0";
  data_kind: DataKind;
  metadata: {
    participant_id: string;
    session_id: string;
    study_day?: number;
    [key: string]: unknown;
  };
  events: TimingEvent[];
}
export interface Profile {
  participant_id: string;
  dwell_median_ms: number;
  interval_median_ms: number;
  correction_probability: number;
}
export interface Config {
  generator_version: string;
  master_seed: number;
  days: number;
  sessions_per_day: number;
  strokes_per_session: number;
  segments_per_session: number;
  window_sizes: number[];
  pause_threshold_ms: number;
  dwell_log_sigma: number;
  interval_log_sigma: number;
  session_log_sigma: number;
  day_drift_log_sigma: number;
  pace_ar_coefficient: number;
  pace_innovation_sigma: number;
  correction_cluster_multiplier: number;
  separator_probability: number;
  pause_probability: number;
  pause_extra_ms_range: [number, number];
  boundary_pause_ms_range: [number, number];
  repeat_probability: number;
  profiles: Profile[];
}
export interface ManifestRow {
  file: string;
  participant_id: string;
  session_id: string;
  data_kind: DataKind;
  split: Split;
  study_day?: number;
}
export type Cell = string | number | boolean;
export type Row = Record<string, Cell>;
export interface Stroke extends Row {
  participant_id: string;
  session_id: string;
  data_kind: DataKind;
  segment_id: number;
  pair_id: number;
  down_ms: number;
  up_ms: number;
  dwell_ms: number;
  group: KeyGroup;
  composing: boolean;
  split: Split;
}
export interface Window extends Row {
  participant_id: string;
  session_id: string;
  data_kind: DataKind;
  segment_id: number;
  window_id: string;
  window_size: number;
  split: Split;
  start_ms: number;
  end_ms: number;
}
export interface Quality extends Row {
  participant_id: string;
  session_id: string;
  data_kind: DataKind;
  split: Split;
}
export interface QualityDetails {
  participant_id: string;
  session_id: string;
  data_kind: DataKind;
  split: Split;
  event_count: number;
  pair_count: number;
  valid_strokes: number;
  excluded_pairs: number;
  segment_count: number;
  wall_seconds: number;
  recording_seconds: number;
  paused_seconds: number;
  interruptions: number;
  repeats: number;
  composition_strokes: number;
  long_holds_over_2000ms: number;
  exclusion_reasons: Record<string, number>;
  diagnostics: Record<string, number>;
}
export interface FittedProfile {
  median: number[];
  scale: number[];
  active: boolean[];
  training_windows: number;
  training_sessions: string[];
}
export interface Normalizers {
  version: string;
  fit_split: "train";
  scale_factor: number;
  feature_columns: string[];
  profiles: Record<string, FittedProfile>;
}
export interface Summary {
  sessions: number;
  valid_strokes: number;
  [key: string]: unknown;
}
export interface Run {
  status: "complete" | "partial_failure";
  data_kind: DataKind;
  generated_at_utc: string;
  node: string;
  generator_version: string;
  dependencies: Record<string, string>;
  input_hashes: Record<string, string>;
  manifest_sha256: string;
  config_sha256: string;
  source_hashes: Record<string, string>;
  rejected_files: number;
  summary: Summary;
  output_hashes: Record<string, string>;
}
