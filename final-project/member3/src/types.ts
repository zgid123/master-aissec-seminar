export type Row = Record<string, string | number | boolean | null>;
export type Split = 'train' | 'validation' | 'test';
export interface WindowRow extends Row {
  participant_id: string; session_id: string; segment_id: number;
  window_id: string; window_size: number; split: Split;
  data_kind: string; start_ms: number; end_ms: number;
}
export interface Stroke extends Row {
  participant_id: string; session_id: string; segment_id: number;
  pair_id: number; split: Split; data_kind: string;
  down_ms: number; up_ms: number; group: string;
}
export interface Normalizer {
  median: number[]; scale: number[]; active: boolean[];
  training_windows: number; training_sessions: string[];
}
export interface Normalizers {
  feature_columns: string[]; fit_split: string; scale_factor: number;
  profiles: Record<string, Normalizer>;
}
export interface Config {
  version: string; seed: number; windowSize: number; scorers: ScorerName[];
  forest: {trees: number; sampleSize: number};
  thresholds: number[]; lambdas: number[]; ks: number[];
  h2Ratio: number; cooldownWindows: number;
  attack: {prefixKeys: number; suffixKeys: number; joinDownDownMs: number};
  constraints: {maxMedianTtdKeys: number; minDetectionRate: number; maxWindowFar: number; policyHorizonKeys:number; maxPolicyFar:number};
  windowThresholds: number[]; notes: string;
}
export type ScorerName = 'distance' | 'isolation_forest';
export interface Tree {size: number; feature?: number; cut?: number; left?: Tree; right?: Tree}
export interface Scorer {
  kind: ScorerName; dimensions: number; center?: number[];
  trees?: Tree[]; sampleSize?: number; seed?: number;
}
export interface Profile {
  target: string; windowSize: number; scorer: Scorer; normalizer: Normalizer;
  calibration: {median: number; scale: number; sessions: string[]; windows: number};
  trainingSessions: string[]; tuningSessions: string[];
}
export interface Policy {
  name: 'B0' | 'B1' | 'P1'; lambda: number; k: number;
  h1: number; h2: number; cooldownWindows: number;
}
export interface ScoredWindow {
  // endMs is the source's last key-up, not the scheduled decision time.
  windowId: string; startMs: number; endMs: number; a: number; z: number;
  label: 'genuine' | 'impostor' | 'mixed';
  observedImpostorKeys: number;
}
export interface Scenario {
  id: string; target: string; split: Split; kind: 'G0' | 'A1';
  sourceSessions: string[]; sourceSegments: string[];
  windows: ScoredWindow[]; t0: number | null; horizonKeys: number;
  availableHorizonMs: number | null; recordingSeconds: number; wallSeconds: number;
  recordingIntervals: [number,number][]; wallStartMs: number;
  prefixKeys: number; suffixKeys: number; joinDownDownMs: number | null;
}
export interface ReplayResult {
  scenarioId: string; target: string; kind: string;
  detection: boolean; ttdKeys: number | null; ttdMs: number | null;
  detectionEvidence: 'post_takeover_window' | 'delayed_genuine_window' | null;
  censored: boolean; preTakeoverRevoke: boolean;
  horizonKeys: number;
  mfaRequests: number; wrongfulRevokes: number;
  observedRecordingSeconds: number; observedWallSeconds: number;
  logs: Row[]; events: Row[];
}
export interface Selection {
  policy: Policy; feasible: boolean; metrics: Row;
  validationByUser: Record<string, {feasible:boolean; metrics:Row}>;
}
export interface Bundle {
  version: string; config: Config; featureColumns: string[]; dataKind: string;
  inputHashes: Record<string, string>; sourceHashes: Record<string, string>;
  profiles: Record<string, Profile>;
  selections: Record<string, Record<string, Selection>>;
  windowThresholds: Record<string, {threshold: number; feasible: boolean; far: number; frr: number}>;
  validationPartition: Record<string, {calibration: string[]; tuning: string[]}>;
}
