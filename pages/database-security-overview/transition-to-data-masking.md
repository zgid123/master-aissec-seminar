---
layout: default
hideInToc: true
transition: slide-left
---

<div class="slide-container">

<div class="slide-header">
  <h1 class="slide-title">GIẢI PHÁP: KIỂM SOÁT DỮ LIỆU ĐƯỢC HIỂN THỊ</h1>
  <p class="slide-subtitle">
    Chuyển dịch trọng tâm bảo mật: Từ kiểm soát quyền truy cập sang kiểm soát mức độ hiển thị dữ liệu.
  </p>
</div>

<div class="transition-grid">

  <!-- Cột 1: Khoảng trống bảo mật truyền thống -->
  <div v-click class="t-card problem">
    <div class="t-badge problem">
      <svg class="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
      KIỂM SOÁT TRUY CẬP TRUYỀN THỐNG
    </div>
    <div class="t-question">"Có cho phép truy cập hay không?"</div>
    <ul class="t-list">
      <li>Xác thực danh tính và phân quyền truy cập bảng.</li>
      <li>Mã hóa lưu trữ (At-Rest) và đường truyền (In-Transit).</li>
      <li class="danger-point">
        <b class="text-rose-300">HẠN CHẾ:</b> Người dùng hợp lệ vẫn nhìn thấy toàn bộ thông tin nhạy cảm (SĐT, Thẻ tín dụng, Lương...).
      </li>
    </ul>
  </div>

  <!-- Cột 2: Hướng giải quyết mới -->
  <div v-click class="t-card solution">
    <div class="t-badge solution">
      <svg class="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
      KIỂM SOÁT HIỂN THỊ: DATA MASKING
    </div>
    <div class="t-question solution-color">"Người dùng được phép nhìn thấy những gì?"</div>
    <ul class="t-list">
      <li>Tự động che giấu / làm mờ dữ liệu nhạy cảm theo vai trò.</li>
      <li>Giữ nguyên định dạng gốc giúp ứng dụng vận hành bình thường.</li>
      <li class="success-point">
        <b class="text-emerald-300">HIỆU QUẢ:</b> Triệt tiêu nguy cơ lộ lọt dữ liệu mà không làm thay đổi cấu trúc hay dữ liệu gốc.
      </li>
    </ul>
  </div>

</div>

<!-- Banner chuyển tiếp sang Section 2 -->
<div v-click class="callout-box next-section">
  <div class="callout-icon next-icon">
    <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 16 16 12 12 8"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  </div>
  <div class="callout-text">
    <span class="text-emerald-300 font-bold uppercase tracking-wider text-xs block mb-0.5">BƯỚC TIẾP THEO — PHẦN 02</span>
    Tìm hiểu chi tiết các cơ chế <b class="text-white font-bold">Static Data Masking (SDM)</b> và <b class="text-white font-bold">Dynamic Data Masking (DDM)</b> trong cơ sở dữ liệu.
  </div>
</div>

</div>

<style scoped>
.slide-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0.5rem 0.25rem 0.5rem;
  justify-content: flex-start;
}

.slide-header {
  margin-bottom: 1rem;
}

.slide-title {
  font-size: 2.1rem;
  font-weight: 800;
  color: #38edf6;
  letter-spacing: 0.03em;
  line-height: 1.2;
  margin: 0;
  text-transform: uppercase;
}

.slide-subtitle {
  font-size: 1.05rem;
  line-height: 1.65;
  color: #c7f8ff;
  opacity: 0.95;
  margin-top: 0.85rem;
  margin-bottom: 0;
  text-align: justify;
}

.transition-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.35rem;
  margin-top: 0.5rem;
}

.t-card {
  padding: 1.25rem 1.35rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.t-card.problem {
  border-top: 4px solid #f87171;
}

.t-card.solution {
  border-top: 4px solid #2efab0;
}

.t-badge {
  display: inline-flex;
  align-items: center;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  margin-bottom: 0.65rem;
}

.t-badge.problem {
  background: rgba(248, 113, 113, 0.18);
  color: #fca5a5;
  border: 1px solid rgba(248, 113, 113, 0.35);
}

.t-badge.solution {
  background: rgba(46, 250, 176, 0.18);
  color: #2efab0;
  border: 1px solid rgba(46, 250, 176, 0.35);
}

.t-question {
  font-size: 1.05rem;
  font-weight: 700;
  color: #fca5a5;
  margin-bottom: 0.65rem;
}

.t-question.solution-color {
  color: #2efab0;
}

.t-list {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

.t-list li {
  position: relative;
  padding-left: 1.2rem;
  margin-bottom: 0.45rem;
  font-size: 0.92rem;
  line-height: 1.65;
  color: #e2e8f0;
  text-align: justify;
}

.t-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #38edf6;
  font-weight: bold;
}

.t-list li.danger-point::before {
  content: "✕";
  color: #f87171;
}

.t-list li.success-point::before {
  content: "✓";
  color: #2efab0;
}

.callout-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.25rem;
  padding: 0.85rem 1.25rem;
  border-radius: 0.85rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(10px);
}

.callout-box.next-section {
  background: linear-gradient(90deg, rgba(16, 185, 129, 0.16) 0%, rgba(6, 182, 212, 0.08) 100%);
  border: 1.5px solid rgba(52, 211, 153, 0.45);
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.12);
}

.callout-icon.next-icon {
  background: rgba(16, 185, 129, 0.25);
  color: #34d399;
  border: 1px solid rgba(52, 211, 153, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  border-radius: 0.6rem;
  flex-shrink: 0;
}

.callout-text {
  font-size: 0.95rem;
  color: #d1fae5;
  line-height: 1.65;
  text-align: justify;
}
</style>
