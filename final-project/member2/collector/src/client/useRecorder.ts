import type { FormEvent } from "react";
import {
  COLLECTION_TARGETS,
  type CollectionMetadata,
  type CollectionMode,
} from "../shared/types.ts";
import {
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Recorder } from "../shared/recorder.ts";

export function useRecorder() {
  const recorderRef = useRef<Recorder<CollectionMetadata> | null>(null);
  if (!recorderRef.current)
    recorderRef.current = new Recorder<CollectionMetadata>();
  const recorder = recorderRef.current;
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const exportedRef = useRef(true);
  const [finished, setFinished] = useState(false);
  const [exported, setExported] = useState(true);
  const [collectionMode, setCollectionMode] =
    useState<CollectionMode>("formal");
  const [, refresh] = useReducer((value) => value + 1, 0);
  const [notice, setNotice] = useState({
    text: "Chọn phiên pilot hoặc phiên chính thức. Bạn có thể dừng bất kỳ lúc nào.",
    warning: false,
  });

  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;
    const pause = (reason: string) => {
      if (!recorder.active || recorder.paused) return;
      recorder.interrupt(reason);
      setNotice({
        text: "Phiên đã tạm dừng do rời vùng nhập. Bấm “Tiếp tục gõ” để mở đoạn thu mới.",
        warning: true,
      });
      refresh();
    };
    const down = (event: KeyboardEvent) => {
      recorder.keydown(event);
      refresh();
    };
    const up = (event: KeyboardEvent) => {
      recorder.keyup(event);
      refresh();
    };
    // Native events preserve the browser's physical-key and IME fields.
    const compositionStart = () => recorder.composition("composition_start");
    const compositionEnd = () => recorder.composition("composition_end");
    const blur = () => pause("blur");
    const visibility = () => {
      if (document.hidden) pause("hidden");
    };
    const blockTransfer = (event: Event) => {
      event.preventDefault();
      setNotice({
        text: "Hãy nhập bằng bàn phím; thao tác dán hoặc kéo văn bản không được dùng trong phiên thu.",
        warning: true,
      });
    };
    const beforeInput = (event: InputEvent) => {
      if (["insertFromPaste", "insertFromDrop"].includes(event.inputType))
        event.preventDefault();
    };
    const unload = (event: BeforeUnloadEvent) => {
      if (!exportedRef.current) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    const removeListeners: (() => void)[] = [];
    function listen<K extends keyof HTMLElementEventMap>(
      type: K,
      handler: (event: HTMLElementEventMap[K]) => void,
    ) {
      area!.addEventListener(type, handler);
      removeListeners.push(() => area!.removeEventListener(type, handler));
    }
    listen("keydown", down);
    listen("keyup", up);
    listen("compositionstart", compositionStart);
    listen("compositionend", compositionEnd);
    listen("blur", blur);
    listen("paste", blockTransfer);
    listen("drop", blockTransfer);
    listen("beforeinput", beforeInput);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("beforeunload", unload);
    const timer = setInterval(() => {
      if (recorder.active) refresh();
    }, 500);
    return () => {
      for (const remove of removeListeners) remove();
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("beforeunload", unload);
      clearInterval(timer);
    };
  }, [recorder]);

  useLayoutEffect(() => {
    if (recorder.active && !recorder.paused) areaRef.current?.focus();
  }, [recorder.active, recorder.paused]);

  function start(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (recorder.active || !exportedRef.current) return;
    const form = new FormData(event.currentTarget);
    const mode = String(form.get("collection_mode")) as CollectionMode;
    const goal = COLLECTION_TARGETS[mode];
    if (!goal) return;
    if (areaRef.current) areaRef.current.value = "";
    const field = (name: string) => String(form.get(name) ?? "");
    recorder.start({
      participant_id: field("participant"),
      session_id: crypto.randomUUID(),
      collection_mode: mode,
      goal_strokes: goal.strokes,
      goal_recording_seconds: goal.recordingSeconds,
      started_at: new Date().toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      keyboard: field("keyboard"),
      ime: field("ime"),
      context: field("context"),
      browser: navigator.userAgent,
      platform: navigator.platform,
      consent: form.get("consent") === "on",
    });
    exportedRef.current = false;
    setExported(false);
    setFinished(false);
    setNotice({
      text:
        mode === "pilot"
          ? "Đang ghi phiên pilot. Mục tiêu: 300 lần gõ hoàn chỉnh và 5 phút ghi chủ động."
          : "Đang ghi phiên chính thức. Mục tiêu: 1.000 lần gõ hoàn chỉnh và 8 phút ghi chủ động.",
      warning: false,
    });
    refresh();
  }
  function resume() {
    recorder.resume();
    setNotice({
      text: "Đã tiếp tục. Khoảng rời vùng nhập được tách khỏi các cửa sổ đặc trưng.",
      warning: false,
    });
    refresh();
  }
  function stop() {
    if (!recorder.active) return;
    recorder.stop();
    if (areaRef.current) areaRef.current.value = "";
    setFinished(true);
    const goal = COLLECTION_TARGETS[collectionMode];
    const recordingSeconds = recorder.recordingMs / 1000;
    const strokeGoalMet = recorder.completed >= goal.strokes;
    const timeGoalMet = recordingSeconds >= goal.recordingSeconds;
    if (recorder.metadata) {
      recorder.metadata.completed_strokes = recorder.completed;
      recorder.metadata.recording_seconds = recordingSeconds;
      recorder.metadata.stroke_goal_met = strokeGoalMet;
      recorder.metadata.time_goal_met = timeGoalMet;
      recorder.metadata.goal_met = strokeGoalMet && timeGoalMet;
    }
    setNotice({
      text:
        strokeGoalMet && timeGoalMet
          ? "Phiên đã đạt mục tiêu. Tải file JSON, kiểm tra file rồi gửi cho nhóm."
          : `Chưa đạt mục tiêu ${collectionMode === "pilot" ? "pilot" : "chính thức"}: cần ${goal.strokes} lần gõ và ${Math.round(goal.recordingSeconds / 60)} phút. Vẫn tải file để nhóm kiểm tra hoặc lên lịch thu lại.`,
      warning: !(strokeGoalMet && timeGoalMet),
    });
    refresh();
  }
  function download() {
    if (!finished || recorder.active) return;
    const data = recorder.export();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${data.metadata.participant_id}_${data.metadata.started_at.slice(0, 10)}_${data.metadata.session_id}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    exportedRef.current = true;
    setExported(true);
    setNotice({
      text: "Đã tạo file tải xuống. Kiểm tra file trong thư mục tải về rồi gửi cho nhóm.",
      warning: false,
    });
  }
  const elapsed = recorder.recordingMs / 1000;
  const elapsedLabel = `${String(Math.floor(elapsed / 60)).padStart(2, "0")}:${String(Math.floor(elapsed % 60)).padStart(2, "0")}`;
  return {
    recorder,
    areaRef,
    finished,
    exported,
    collectionMode,
    setCollectionMode,
    targets: COLLECTION_TARGETS[collectionMode],
    notice,
    elapsedLabel,
    start,
    resume,
    stop,
    download,
  };
}
