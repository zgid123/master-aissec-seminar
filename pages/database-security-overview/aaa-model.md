---
layout: default
hideInToc: true
transition: slide-left
---

<div class="slide-container">

<div class="slide-header">
  <h1 class="slide-title">NỀN TẢNG THỨ NHẤT: KIỂM SOÁT QUYỀN TRUY CẬP (AAA)</h1>
  <p class="slide-subtitle">
    CIA xác định <b>chúng ta cần bảo vệ điều gì</b>; AAA xác định <b>ai được truy cập, được phép thực hiện những gì và được ghi nhận ra sao</b>.
  </p>
</div>

<div class="principles">
  <div v-click>
    <b>Authentication</b>
    <div>
      <strong>XÁC THỰC DANH TÍNH</strong>
      <small>Hệ thống xác minh người dùng là ai trước khi cho phép truy cập, chẳng hạn thông qua tài khoản, mật khẩu hoặc cơ chế MFA.</small>
    </div>
  </div>
  <div v-click>
    <b>Authorization</b>
    <div>
      <strong>PHÂN QUYỀN TRUY CẬP</strong>
      <small>Sau khi xác thực, hệ thống phân định quyền hạn thao tác và dữ liệu được xem. Ví dụ: CSKH được xem thông tin đơn hàng nhưng không được xem lương.</small>
    </div>
  </div>
  <div v-click>
    <b>Accounting / Auditing</b>
    <div>
      <strong>GHI NHẬN VÀ TRUY VẾT</strong>
      <small>Hệ thống ghi log toàn bộ truy vết thao tác và thay đổi dữ liệu, hỗ trợ kiểm toán và xác minh trách nhiệm khi có sự cố.</small>
    </div>
  </div>
</div>

<div v-click class="callout-box cyan">
  <div class="callout-icon cyan">
    <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  </div>
  <div class="callout-text">
    <strong class="text-cyan-300">Điểm cần phân biệt rõ:</strong> <b class="text-white font-bold">XÁC THỰC (Authentication)</b> thành công không đồng nghĩa với việc được phép xem toàn bộ dữ liệu — quyền hạn cụ thể phụ thuộc hoàn toàn vào cơ chế <b class="text-white font-bold">PHÂN QUYỀN (Authorization)</b>.
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

.principles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.35rem;
  margin-top: 0.25rem;
}

.principles > div {
  display: flex;
  flex-direction: column;
  padding: 1.35rem 1.25rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-top-width: 4px;
  border-top-color: #38edf6;
  border-radius: 0 0 0.75rem 0.75rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.principles b {
  color: #38edf6;
  font-size: 1.25rem;
  line-height: 1.3;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.principles strong {
  display: block;
  font-size: 1.05rem;
  color: #ffffff;
  font-weight: 700;
  line-height: 1.45;
  margin-bottom: 0.5rem;
}

.principles small {
  display: block;
  color: #e2e8f0;
  font-size: 0.9rem;
  line-height: 1.65;
  opacity: 0.95;
  text-align: justify;
}

.callout-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.4rem;
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
  font-size: 0.95rem;
  color: #cffafe;
  line-height: 1.65;
  text-align: justify;
}
</style>
