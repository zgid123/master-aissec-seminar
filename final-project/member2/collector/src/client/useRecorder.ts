import type { FormEvent } from "react";
import type { CollectionMetadata } from "../shared/types.ts";
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
  const [, refresh] = useReducer((value) => value + 1, 0);
  const [notice, setNotice] = useState({
    text: "Pilot: ít nhất 300 lần gõ và 5 phút. Thu chính thức: ít nhất 1.000 lần gõ và 8 phút. Bạn có thể dừng bất kỳ lúc nào.",
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
    if (areaRef.current) areaRef.current.value = "";
    const field = (name: string) => String(form.get(name) ?? "");
    recorder.start({
      participant_id: field("participant"),
      session_id: crypto.randomUUID(),
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
      text: "Đang ghi nhịp gõ. Mục tiêu pilot: 300 lần gõ và 5 phút; thu chính thức: 1.000 lần gõ và 8 phút.",
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
    const short = recorder.completed < 300 || recorder.recordingMs < 300000;
    setNotice({
      text: short
        ? "Phiên ngắn hơn mục tiêu. Vẫn tải file để kiểm tra chất lượng; thu thêm phiên nếu cần."
        : "Phiên đã hoàn tất. Tải file JSON và gửi cho nhóm trước khi bắt đầu phiên mới.",
      warning: short,
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
    notice,
    elapsedLabel,
    start,
    resume,
    stop,
    download,
  };
}
