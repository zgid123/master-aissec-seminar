import { useRecorder } from "./useRecorder.ts";

type RecorderSession = ReturnType<typeof useRecorder>;

function Setup({ session }: { session: RecorderSession }) {
  const { recorder: r, finished, exported, start } = session;
  return (
    <section className="setup card" aria-labelledby="setup-title">
      <div className="section-label">
        <span>01</span> CHUẨN BỊ
      </div>
      <h2 id="setup-title">Thông tin phiên</h2>
      <p className="muted">Dùng cùng mã người tham gia qua các phiên.</p>
      <form id="setup" onSubmit={start}>
        <label htmlFor="participant">Mã người tham gia</label>
        <select
          id="participant"
          name="participant"
          required
          defaultValue=""
          disabled={r.active}
        >
          <option value="">Chọn mã của bạn</option>
          <option>P01</option>
          <option>P02</option>
          <option>P03</option>
          <option>P04</option>
        </select>
        <label htmlFor="keyboard">Bàn phím</label>
        <select
          id="keyboard"
          name="keyboard"
          defaultValue="laptop"
          disabled={r.active}
        >
          <option value="laptop">Bàn phím laptop</option>
          <option value="external">Bàn phím rời</option>
        </select>
        <label htmlFor="ime">Bộ gõ tiếng Việt</label>
        <select id="ime" name="ime" defaultValue="telex" disabled={r.active}>
          <option value="telex">Telex</option>
          <option value="vni">VNI</option>
          <option value="other">Khác</option>
          <option value="none">Không dùng</option>
        </select>
        <label htmlFor="context">Ngữ cảnh</label>
        <select
          id="context"
          name="context"
          defaultValue="normal"
          disabled={r.active}
        >
          <option value="normal">Gõ bình thường</option>
          <option value="slow">Chủ động gõ chậm</option>
          <option value="fast">Chủ động gõ nhanh</option>
          <option value="pauses">Gõ có khoảng nghỉ</option>
        </select>
        <label className="consent">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            required
            disabled={r.active}
          />
          <span>
            Tôi đồng ý đóng góp dữ liệu thời gian gõ cho nghiên cứu của nhóm.
          </span>
        </label>
        <button
          className="primary"
          type="submit"
          id="start"
          disabled={r.active || !exported}
        >
          {finished ? "Bắt đầu phiên mới" : "Bắt đầu phiên"}{" "}
          <span aria-hidden="true">↗</span>
        </button>
      </form>
      <div className="session-meta">
        <span>Mã phiên</span>
        <code id="session-id">
          {r.metadata?.session_id ?? "Tạo khi bắt đầu"}
        </code>
      </div>
    </section>
  );
}

function Typing({ session }: { session: RecorderSession }) {
  const {
    recorder: r,
    areaRef,
    finished,
    notice,
    elapsedLabel,
    resume,
    stop,
    download,
  } = session;
  const status = r.active
    ? r.paused
      ? "Tạm dừng"
      : "Đang ghi nhận"
    : finished
      ? "Đã kết thúc"
      : "Chưa bắt đầu";
  return (
    <section className="typing card" aria-labelledby="typing-title">
      <div className="typing-top">
        <div className="section-label">
          <span>02</span> THU THẬP
        </div>
        <div
          id="status"
          className={`status${r.active && !r.paused ? " recording" : ""}`}
          role="status"
        >
          {status}
        </div>
      </div>
      <h2 id="typing-title">Gõ một cách tự nhiên</h2>
      <p className="muted">
        Kể về một ngày của bạn, một cuốn sách hoặc một ý tưởng. Dùng bàn phím
        vật lý và bộ gõ quen thuộc.
      </p>
      <div className="stats">
        <div>
          <span className="stat-label">THỜI GIAN GHI</span>
          <strong id="elapsed">{elapsedLabel}</strong>
        </div>
        <div>
          <span className="stat-label">LẦN GÕ HỢP LỆ</span>
          <strong id="count">{r.completed}</strong>
        </div>
        <div>
          <span className="stat-label">MỤC TIÊU PILOT</span>
          <strong>
            300<span className="stat-unit"> lần gõ</span>
          </strong>
        </div>
      </div>
      <label className="sr-only" htmlFor="typing-area">
        Vùng gõ thử nghiệm
      </label>
      {/* Keep the text out of React state and preserve the native IME editing session. */}
      <textarea
        id="typing-area"
        ref={areaRef}
        disabled={!r.active}
        readOnly={r.paused}
        spellCheck={false}
        autoCorrect="off"
        autoComplete="off"
        autoCapitalize="off"
        placeholder="Vùng nhập của bạn sẽ mở khi bắt đầu phiên…"
      />
      <div className="progress-row">
        <div
          className="progress"
          role="progressbar"
          aria-label="Tiến độ 300 lần gõ"
          aria-valuemin={0}
          aria-valuemax={300}
          aria-valuenow={Math.min(300, r.completed)}
        >
          <div
            id="progress-fill"
            style={{ width: `${Math.min(100, r.completed / 3)}%` }}
          />
        </div>
        <span id="progress-label">{r.completed} / 300</span>
      </div>
      <p
        id="notice"
        className={`notice${notice.warning ? " warning" : ""}`}
        role="status"
      >
        {notice.text}
      </p>
      {finished && (
        <p id="quality-summary" className="muted">
          {r.completed} lần gõ hoàn chỉnh · {r.incomplete} lần gõ thiếu nhả ·{" "}
          {r.interruptions} lần ngắt · {elapsedLabel} thời gian ghi
        </p>
      )}
      <div className="actions">
        <button
          id="resume"
          className="secondary"
          disabled={!(r.active && r.paused)}
          onClick={resume}
        >
          Tiếp tục gõ
        </button>
        <button
          id="stop"
          className="secondary"
          disabled={!r.active}
          onClick={stop}
        >
          Kết thúc phiên
        </button>
        <button
          id="download"
          className="primary"
          disabled={!finished}
          onClick={download}
        >
          Tải file JSON <span aria-hidden="true">↓</span>
        </button>
      </div>
    </section>
  );
}

export function App() {
  const session = useRecorder();
  return (
    <>
      <header>
        <a className="brand" href="./">
          <span className="brand-icon">≋</span> nhịp gõ
          <span className="brand-dot">.</span>
        </a>
        <span className="project-tag">AISSEC / NGHIÊN CỨU 03</span>
      </header>
      <main>
        <div className="intro">
          <div>
            <p className="eyebrow">BỘ THU THẬP DỮ LIỆU · PHIÊN BẢN 1.0</p>
            <h1>
              Mỗi nhịp gõ,
              <br />
              một dấu ấn riêng.
            </h1>
            <p className="lead">
              Cùng xây dựng bộ dữ liệu cho nghiên cứu
              <br className="desktop" /> xác thực liên tục dựa trên hành vi gõ
              phím.
            </p>
          </div>
          <div className="rhythm" aria-hidden="true">
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} />
            ))}
            <small>KEYSTROKE DYNAMICS</small>
          </div>
        </div>
        <div className="privacy">
          <span className="privacy-symbol" aria-hidden="true">
            ◎
          </span>
          <div>
            <strong>Chỉ ghi nhịp gõ. Nội dung của bạn không được lưu.</strong>
            <p>
              Dữ liệu thời gian ở trong trình duyệt cho đến khi bạn tải file.
              Hãy gõ về chủ đề thông thường, tránh mật khẩu và thông tin cá
              nhân.
            </p>
          </div>
          <span className="local-tag">XỬ LÝ TẠI MÁY</span>
        </div>
        <div className="workspace">
          <Setup session={session} />
          <Typing session={session} />
        </div>
        <section className="instructions" aria-label="Quy trình">
          <article>
            <span>01 /</span>
            <h3>Giữ cấu hình ổn định</h3>
            <p>Dùng cùng bàn phím và bộ gõ. Không dán văn bản vào vùng nhập.</p>
          </article>
          <article>
            <span>02 /</span>
            <h3>Thu qua nhiều phiên</h3>
            <p>
              Pilot: 300 lần gõ và 5 phút. Thu chính thức: 6 phiên trong 3 ngày,
              mỗi phiên ít nhất 1.000 lần gõ và 8 phút; nghỉ ít nhất 30 phút
              giữa các phiên.
            </p>
          </article>
          <article>
            <span>03 /</span>
            <h3>Tải file và gửi cho nhóm</h3>
            <p>
              Kết thúc phiên, tải JSON rồi gửi qua kênh chung đã thống nhất.
            </p>
          </article>
        </section>
      </main>
      <footer>
        <span>AISSEC · Xác thực liên tục thích ứng</span>
        <span>Thiết bị có bàn phím vật lý · Dữ liệu không tự động tải lên</span>
      </footer>
    </>
  );
}
