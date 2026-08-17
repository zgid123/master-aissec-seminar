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
  gap: 1.25rem;
  align-items: center;
}

.exposure .card {
  padding: 1.15rem 1.35rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.06);
  border-radius: 0.75rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.exposure .arrow {
  color: #38edf6;
  font-size: 2.2rem;
}

.exposure .card-title {
  display: block;
  color: #38edf6;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.65rem;
}

.exposure p {
  display: flex;
  justify-content: space-between;
  margin: 0.45rem 0;
  font-size: 0.88rem;
  color: #e2e8f0;
  line-height: 1.5;
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
  gap: 0.85rem;
  padding: 0.75rem 1.15rem;
  border-radius: 0.75rem;
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
  padding: 0.5rem;
  border-radius: 0.5rem;
  flex-shrink: 0;
}

.callout-icon.cyan {
  background: rgba(6, 182, 212, 0.25);
  color: #38edf6;
  border: 1px solid rgba(56, 237, 246, 0.5);
}

.callout-text {
  color: #cffafe;
  line-height: 1.55;
  text-align: justify;
}
</style>
