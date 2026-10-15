import type {
  KeyInput,
  KeyGroup,
  PairFields,
  EventType,
  RecordedEvent,
  SessionMetadata,
  RecordedSession,
} from "./types.ts";
// Raw key identities exist only in pending. Exported records never contain them.
export class Recorder<M extends SessionMetadata = SessionMetadata> {
  clock: () => number;
  pending: Map<string, PairFields>;
  events: RecordedEvent[];
  metadata?: M;
  nextPair: number;
  completed: number;
  active: boolean;
  paused: boolean;
  composing: boolean;
  recordingElapsed: number;
  recordingSince: number;
  incomplete: number;
  interruptions: number;
  origin = 0;
  constructor(clock = () => performance.now()) {
    this.clock = clock;
    this.pending = new Map<string, PairFields>();
    this.events = [];
    this.nextPair = 0;
    this.completed = 0;
    this.active = false;
    this.paused = false;
    this.composing = false;
    this.recordingElapsed = 0;
    this.recordingSince = 0;
    this.incomplete = 0;
    this.interruptions = 0;
  }
  start(metadata: M) {
    if (this.active) throw new Error("A session is already active");
    this.metadata = structuredClone(metadata);
    this.events = [];
    this.pending.clear();
    this.nextPair = this.completed = 0;
    this.recordingElapsed =
      this.recordingSince =
      this.incomplete =
      this.interruptions =
        0;
    this.composing = false;
    this.origin = this.clock();
    this.active = true;
    this.paused = false;
    this.add("start");
  }
  add(type: EventType, extra: Partial<PairFields> & { reason?: string } = {}) {
    const t_ms = this.clock() - this.origin;
    this.events.push({ type, t_ms, ...extra });
    return t_ms;
  }
  get recordingMs() {
    return (
      this.recordingElapsed +
      (this.active && !this.paused
        ? this.clock() - this.origin - this.recordingSince
        : 0)
    );
  }
  group(code: string): KeyGroup | null {
    if (code === "Backspace" || code === "Delete") return "correction";
    if (code === "Space" || code === "Enter" || code === "Tab")
      return "separator";
    if (
      /^(Key[A-Z]|Digit[0-9]|Numpad[0-9]|Minus|Equal|BracketLeft|BracketRight|Backslash|Semicolon|Quote|Backquote|Comma|Period|Slash|IntlBackslash|IntlRo|IntlYen|NumpadDecimal|NumpadAdd|NumpadSubtract|NumpadMultiply|NumpadDivide)$/.test(
        code,
      )
    )
      return "typing";
    return null;
  }
  keydown(event: KeyInput) {
    if (!this.active || this.paused) return;
    const group = this.group(event.code);
    if (!group) {
      // Modifiers and navigation are outside the typing feature definition.
      if (!event.code || event.code === "Unidentified")
        this.add("unidentified");
      return;
    }
    if (event.ctrlKey || event.metaKey || event.altKey) {
      this.add("shortcut");
      return;
    }
    if (event.repeat) {
      this.add("repeat");
      return;
    }
    if (this.pending.has(event.code)) {
      this.add("duplicate_down");
      return;
    }
    const pair_id = ++this.nextPair;
    const composing = !!(
      event.isComposing ||
      event.keyCode === 229 ||
      this.composing
    );
    this.pending.set(event.code, { pair_id, group, composing });
    this.add("down", { pair_id, group, composing });
  }
  keyup(event: KeyInput) {
    if (!this.active || this.paused) return;
    const pending = this.pending.get(event.code);
    if (pending) {
      this.add("up", pending);
      this.pending.delete(event.code);
      this.completed++;
    } else if (this.group(event.code)) this.add("unmatched_up");
  }
  composition(type: "composition_start" | "composition_end") {
    if (!this.active || this.paused) return;
    this.composing = type === "composition_start";
    this.add(type);
  }
  interrupt(reason = "blur") {
    if (!this.active || this.paused) return;
    const boundary = this.add("boundary", { reason });
    this.recordingElapsed += boundary - this.recordingSince;
    this.incomplete += this.pending.size;
    this.interruptions++;
    this.pending.clear();
    this.composing = false;
    this.paused = true;
  }
  resume() {
    if (!this.active || !this.paused) return;
    this.recordingSince = this.add("resume");
    this.paused = false;
  }
  stop() {
    if (!this.active) return;
    const ended = this.add("stop");
    if (!this.paused) this.recordingElapsed += ended - this.recordingSince;
    this.incomplete += this.pending.size;
    this.pending.clear();
    this.composing = false;
    this.active = false;
  }
  export(): RecordedSession<M> {
    if (this.active) throw new Error("Stop before exporting");
    if (!this.metadata) throw new Error("Start a session before exporting");
    return structuredClone({
      schema_version: "1.0",
      data_kind: "real",
      metadata: this.metadata,
      events: this.events,
    });
  }
}
