---
layout: default
hideInToc: true
transition: slide-left
---

<div class="slide-container">

<div class="slide-header">
  <h1 class="slide-title">TRUY CẬP HỢP LỆ VẪN CÓ THỂ LÀM LỘ DỮ LIỆU</h1>
  <p class="slide-subtitle">
    Kịch bản người dùng hợp lệ nhận được nhiều thông tin hơn phạm vi công việc cần thiết.
  </p>
</div>

<div class="exposure">
  <div class="card">
    <small class="card-title">Customer Support (User A)</small>
    <p><span>✓</span> Authenticated</p>
    <p><span>✓</span> Authorized</p>
    <p><span>✓</span> Secure connection</p>
    <p><span>✓</span> Database encrypted</p>
  </div>
  <b class="arrow">→</b>
  <div class="card record">
    <small class="card-title">Customer Record (Bảng dữ liệu)</small>
    <p>Tên khách hàng <span>✓ Hợp lệ</span></p>
    <p>Trạng thái đơn hàng <span>✓ Hợp lệ</span></p>
    <p>Email / Số điện thoại <span class="warn">? Nhạy cảm</span></p>
    <p>Số thẻ tín dụng / Lương <span class="danger">✕ Không được xem</span></p>
  </div>
</div>

<div v-click class="callout-box cyan">
  <div class="callout-icon cyan">
    <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  </div>
  <div class="callout-text">
    <strong class="text-[#38edf6] font-bold">Câu hỏi cốt lõi:</strong> Làm thế nào để cho phép người dùng truy cập dữ liệu phục vụ công việc mà <b class="text-white font-bold">KHÔNG LÀM LỘ CÁC THÔNG TIN NHẠY CẢM</b> không liên quan?
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
  margin-bottom: 1.25rem;
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

.exposure {
  display: grid;
  grid-template-columns: 1fr auto 1.15fr;
  gap: 1.5rem;
  align-items: center;
  margin-top: 0.5rem;
}

.exposure .card {
  padding: 1.35rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.08);
  border-radius: 0.75rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.exposure .arrow {
  color: #38edf6;
  font-size: 2.5rem;
}

.exposure .card-title {
  display: block;
  color: #38edf6;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.exposure p {
  display: flex;
  justify-content: space-between;
  margin: 0.55rem 0;
  font-size: 0.95rem;
  color: #e2e8f0;
  line-height: 1.65;
}

.exposure span {
  color: #2efab0;
  font-weight: 700;
}

.exposure span.warn {
  color: #fde047;
}

.exposure span.danger {
  color: #fca5a5;
}

.callout-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.35rem;
  padding: 0.95rem 1.25rem;
  border-radius: 0.85rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(10px);
}

.callout-box.cyan {
  background: linear-gradient(90deg, rgba(6, 182, 212, 0.16) 0%, rgba(6, 182, 212, 0.06) 100%);
  border: 1.5px solid rgba(56, 237, 246, 0.45);
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.12);
}

.callout-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  border-radius: 0.6rem;
  flex-shrink: 0;
}

.callout-icon.cyan {
  background: rgba(6, 182, 212, 0.25);
  color: #38edf6;
  border: 1px solid rgba(56, 237, 246, 0.5);
}

.callout-text {
  font-size: 0.98rem;
  color: #cffafe;
  line-height: 1.65;
  text-align: justify;
}
</style>
