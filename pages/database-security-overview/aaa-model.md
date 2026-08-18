---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Kiểm soát quyền truy cập: Mô hình AAA

CIA xác định **cần bảo vệ điều gì**; AAA xác định **ai được truy cập, được làm những gì và được ghi nhận ra sao**.{.op-60}

<div class="principles mt-5">
  <div v-click="1">
    <b>Authentication</b>
    <div>
      <strong>XÁC THỰC DANH TÍNH</strong>
      <small>Hệ thống xác minh người dùng là ai trước khi cho phép truy cập, chẳng hạn qua tài khoản, mật khẩu hoặc MFA.</small>
    </div>
  </div>
  <div v-click="2">
    <b>Authorization</b>
    <div>
      <strong>PHÂN QUYỀN TRUY CẬP</strong>
      <small>Sau xác thực, hệ thống phân định quyền hạn thao tác và dữ liệu được xem. Ví dụ: CSKH được xem đơn hàng nhưng không được xem lương.</small>
    </div>
  </div>
  <div v-click="3">
    <b>Accounting / Auditing</b>
    <div>
      <strong>GHI NHẬN & TRUY VẾT</strong>
      <small>Ghi log toàn bộ truy vết thao tác và thay đổi dữ liệu, hỗ trợ kiểm toán và xác minh trách nhiệm khi có sự cố.</small>
    </div>
  </div>
</div>

<div v-click="4" class="callout-box cyan mt-4">
  <div class="callout-icon cyan">
    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  </div>
  <div class="callout-text text-sm">
    <strong class="text-cyan-300">Điểm cần phân biệt rõ:</strong> <b class="text-white font-bold">Xác thực (Authentication)</b> thành công không đồng nghĩa được phép xem toàn bộ dữ liệu — quyền hạn cụ thể phụ thuộc hoàn toàn vào cơ chế <b class="text-white font-bold">Phân quyền (Authorization)</b>.
  </div>
</div>

<style scoped>
.principles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(0.5rem, 1.2vw, 0.85rem);
  margin-top: 0.6rem;
}

.principles > div {
  display: flex;
  flex-direction: column;
  padding: clamp(0.55rem, 1.2vh, 0.85rem) clamp(0.65rem, 1.2vw, 0.95rem);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-top-width: 3.5px;
  border-top-color: #38edf6;
  border-radius: 0 0 0.65rem 0.65rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.principles b {
  color: #38edf6;
  font-size: clamp(0.92rem, 1.2vw, 1.05rem);
  line-height: 1.25;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.principles strong {
  display: block;
  font-size: clamp(0.76rem, 1vw, 0.85rem);
  color: #ffffff;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 0.25rem;
}

.principles small {
  display: block;
  color: #e2e8f0;
  font-size: clamp(0.72rem, 0.95vw, 0.78rem);
  line-height: 1.4;
  opacity: 0.95;
  text-align: justify;
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
