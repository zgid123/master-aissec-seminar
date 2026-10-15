import type { KeyInput } from "../src/shared/types.ts";
import test from "node:test";
import assert from "node:assert/strict";
import { Recorder } from "../src/shared/recorder.ts";

function fixture() {
  let time = 0;
  const recorder = new Recorder(() => time);
  recorder.start({ participant_id: "P01", session_id: "test" });
  return {
    recorder,
    at: (t: number) => {
      time = t;
    },
  };
}
const key = (code: string, extra: Partial<KeyInput> = {}) => ({
  code,
  key: "PRIVATE TEXT",
  ...extra,
});

test("pairs overlapping keys and never exports physical key identity or text", () => {
  const { recorder: r, at } = fixture();
  at(10);
  r.keydown(key("KeyA"));
  at(20);
  r.keydown(key("KeyB"));
  at(50);
  r.keyup(key("KeyA"));
  at(80);
  r.keyup(key("KeyB"));
  at(90);
  r.stop();
  const data = r.export();
  assert.equal(r.completed, 2);
  assert.deepEqual(
    data.events.filter((e) => e.type === "up").map((e) => e.pair_id),
    [1, 2],
  );
  assert.doesNotMatch(
    JSON.stringify(data),
    /PRIVATE TEXT|KeyA|KeyB|"code"|"key"/,
  );
});
test("retains physical strokes in IME composition without composition text", () => {
  const { recorder: r, at } = fixture();
  r.composition("composition_start");
  at(10);
  r.keydown(key("KeyA", { isComposing: true, keyCode: 229 }));
  r.composition("composition_end");
  at(70);
  r.keyup(key("KeyA"));
  r.stop();
  assert.equal(r.completed, 1);
  assert.ok(r.export().events.find((e) => e.type === "down")!.composing);
  assert.ok(r.export().events.find((e) => e.type === "up")!.composing);
});
test("repeat cannot replace a pending key and shortcuts are excluded", () => {
  const { recorder: r, at } = fixture();
  at(10);
  r.keydown(key("Backspace"));
  at(20);
  r.keydown(key("Backspace", { repeat: true }));
  at(30);
  r.keyup(key("Backspace"));
  at(40);
  r.keydown(key("KeyV", { ctrlKey: true }));
  r.keyup(key("KeyV"));
  r.stop();
  assert.equal(r.completed, 1);
  assert.equal(r.export().events.filter((e) => e.type === "down").length, 1);
  assert.equal(
    r.export().events.find((e) => e.type === "down")?.group,
    "correction",
  );
});
test("focus boundary clears pending keys and requires resume", () => {
  const { recorder: r, at } = fixture();
  at(10);
  r.keydown(key("KeyA"));
  at(20);
  r.interrupt("hidden");
  at(30);
  r.keyup(key("KeyA"));
  r.keydown(key("KeyB"));
  assert.equal(r.completed, 0);
  r.resume();
  at(40);
  r.keydown(key("KeyB"));
  at(50);
  r.keyup(key("KeyB"));
  r.stop();
  assert.equal(r.completed, 1);
  assert.equal(r.pending.size, 0);
});
test("export is a snapshot, session reset removes previous data", () => {
  const { recorder: r } = fixture();
  assert.throws(() => r.export(), /Stop/);
  r.stop();
  const data = r.export();
  data.events.push({ type: "stop", t_ms: 100 });
  assert.equal(r.events.length, 2);
  r.start({ participant_id: "P02", session_id: "next" });
  assert.equal(r.events.length, 1);
  assert.equal(r.completed, 0);
});

test("recording duration excludes pauses and freezes on stop, including stop while paused", () => {
  const { recorder: r, at } = fixture();
  at(1000);
  r.keydown(key("KeyA"));
  r.interrupt("blur");
  assert.equal(r.recordingMs, 1000);
  assert.equal(r.incomplete, 1);
  at(600000);
  assert.equal(r.recordingMs, 1000);
  r.resume();
  at(602000);
  assert.equal(r.recordingMs, 3000);
  r.stop();
  at(900000);
  assert.equal(r.recordingMs, 3000);
  assert.equal(r.interruptions, 1);
  r.start({ participant_id: "P02", session_id: "next" });
  assert.equal(r.recordingMs, 0);
  assert.equal(r.incomplete, 0);
  at(901000);
  r.interrupt();
  at(999000);
  r.stop();
  assert.equal(r.recordingMs, 1000);
});
