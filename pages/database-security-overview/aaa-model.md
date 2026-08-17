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
  gap: 1.25rem;
}

.principles > div {
  display: flex;
  flex-direction: column;
  padding: 1.15rem 1.1rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-top-width: 4px;
  border-top-color: #38edf6;
  border-radius: 0 0 0.75rem 0.75rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.principles b {
  color: #38edf6;
  font-size: 1.15rem;
  line-height: 1.3;
  font-weight: 700;
  margin-bottom: 0.35rem;
}

.principles strong {
  display: block;
  font-size: 0.98rem;
  color: #ffffff;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 0.4rem;
}

.principles small {
  display: block;
  color: #e2e8f0;
  font-size: 0.85rem;
  line-height: 1.55;
  opacity: 0.95;
  text-align: justify;
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
