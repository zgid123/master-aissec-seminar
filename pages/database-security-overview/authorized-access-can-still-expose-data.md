---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Truy cập hợp lệ vẫn có thể làm lộ dữ liệu

Kịch bản người dùng hợp lệ nhận được nhiều thông tin hơn phạm vi công việc cần thiết.{.op-60}

<div class="exposure mt-5">
  <div class="card" v-click="1">
    <small class="card-title">Customer Support (User A)</small>
    <p><span>✓</span> Authenticated</p>
    <p><span>✓</span> Authorized</p>
    <p><span>✓</span> Secure connection</p>
    <p><span>✓</span> Database encrypted</p>
  </div>
  <b class="arrow" v-click="2">→</b>
  <div class="card record" v-click="2">
    <small class="card-title">Customer Record (Bảng dữ liệu)</small>
    <p>Tên khách hàng <span>✓ Hợp lệ</span></p>
    <p>Trạng thái đơn hàng <span>✓ Hợp lệ</span></p>
    <p>Email / Số điện thoại <span class="warn">? Nhạy cảm</span></p>
    <p>Số thẻ tín dụng / Lương <span class="danger">✕ Không được xem</span></p>
  </div>
</div>

<div v-click="3" class="callout-box cyan mt-4">
  <div class="callout-icon cyan">
    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  </div>
  <div class="callout-text text-sm">
    <strong class="text-[#38edf6] font-bold">Câu hỏi cốt lõi:</strong> Làm thế nào để cho phép truy cập dữ liệu phục vụ công việc mà <b class="text-white font-bold">không làm lộ thông tin nhạy cảm</b> không liên quan?
  </div>
</div>

<style scoped>
.exposure {
  display: grid;
  grid-template-columns: 1fr auto 1.15fr;
  gap: clamp(0.6rem, 1.3vw, 1rem);
  align-items: center;
  margin-top: 0.6rem;
}

.exposure .card {
  padding: clamp(0.6rem, 1.2vh, 0.85rem) clamp(0.75rem, 1.3vw, 1.1rem);
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.06);
  border-radius: 0.65rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.exposure .arrow {
  color: #38edf6;
  font-size: clamp(1.4rem, 2vw, 1.8rem);
}

.exposure .card-title {
  display: block;
  color: #38edf6;
  font-size: clamp(0.82rem, 1.1vw, 0.92rem);
  font-weight: 700;
  margin-bottom: 0.35rem;
}

.exposure p {
  display: flex;
  justify-content: space-between;
  margin: 0.25rem 0;
  font-size: clamp(0.72rem, 0.98vw, 0.8rem);
  color: #e2e8f0;
  line-height: 1.4;
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
  gap: 0.7rem;
  padding: clamp(0.35rem, 0.8vh, 0.55rem) clamp(0.65rem, 1.2vw, 0.95rem);
  border-radius: 0.65rem;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  margin-top: 0.55rem !important;
}

.callout-box.cyan {
  background: linear-gradient(90deg, rgba(6, 182, 212, 0.16) 0%, rgba(6, 182, 212, 0.06) 100%);
  border: 1.5px solid rgba(56, 237, 246, 0.45);
  box-shadow: 0 0 16px rgba(6, 182, 212, 0.1);
}

.callout-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem;
  border-radius: 0.45rem;
  flex-shrink: 0;
}

.callout-icon.cyan {
  background: rgba(6, 182, 212, 0.25);
  color: #38edf6;
  border: 1px solid rgba(56, 237, 246, 0.5);
}

.callout-text {
  color: #cffafe;
  font-size: clamp(0.72rem, 1vw, 0.78rem);
  line-height: 1.4;
  text-align: justify;
}
</style>
