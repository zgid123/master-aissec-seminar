---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Truy cập hợp lệ vẫn có thể làm lộ dữ liệu

<p class="exposure-summary">Kịch bản người dùng hợp lệ nhận được nhiều thông tin hơn phạm vi công việc cần thiết.</p>

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
    <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  </div>
  <div class="callout-text text-sm">
    <strong class="text-[#38edf6] font-bold">Câu hỏi cốt lõi:</strong> Làm thế nào để người dùng chỉ thấy đúng dữ liệu cần thiết phục vụ công việc mà <b class="text-white">không nhìn thấy các thông tin nhạy cảm</b> khác?
  </div>
</div>

<style scoped>
.alpha-shifting-intro h1 {
  width: auto;
  max-width: none;
  white-space: nowrap;
}

.exposure {
  display: grid;
  grid-template-columns: 1fr auto 1.15fr;
  gap: clamp(0.6rem, 1.3vw, 1rem);
  align-items: center;
  margin-top: 1.4rem !important;
}

.exposure-summary {
  margin: 0.35rem 0 0;
  color: #dce5ea;
  font-size: clamp(1.05rem, 1.55vw, 1.28rem);
  line-height: 1.45;
  opacity: 0.86;
}

.exposure .card {
  min-height: 11rem;
  padding: 1.25rem 1.35rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.06);
  border-radius: 0.65rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.exposure .arrow {
  color: #38edf6;
  font-size: clamp(1.9rem, 2.5vw, 2.3rem);
}

.exposure .card-title {
  display: block;
  color: #38edf6;
  font-size: clamp(1.02rem, 1.35vw, 1.16rem);
  font-weight: 700;
  margin-bottom: 0.6rem;
}

.exposure p {
  display: flex;
  justify-content: space-between;
  margin: 0.38rem 0;
  font-size: clamp(0.88rem, 1.12vw, 0.98rem);
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
  gap: 0.9rem;
  padding: clamp(0.7rem, 1.1vh, 0.9rem) clamp(0.9rem, 1.4vw, 1.2rem);
  border-radius: 0.65rem;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  min-height: 4.8rem;
  margin-top: 1.4rem !important;
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
  padding: 0.55rem;
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
  font-size: clamp(0.86rem, 1.1vw, 0.94rem);
  line-height: 1.48;
  text-align: left;
}
</style>
