---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# AAA - Ba bước kiểm soát truy cập

<ArrowTriad :animation="false" :height="440">
  <ArrowTriadCallout v-click="1">
    <ArrowTriadHeading>Authentication</ArrowTriadHeading>
    <ArrowTriadContent>
      <strong>Người dùng là ai?</strong><br>
      <code>support@company</code> xác minh qua MFA.
    </ArrowTriadContent>
  </ArrowTriadCallout>
  <ArrowTriadCallout v-click="1">
    <ArrowTriadHeading>Authorization</ArrowTriadHeading>
    <ArrowTriadContent>
      <strong>Được phép làm gì?</strong><br>
      Role <code>support</code> được <code>SELECT</code> hồ sơ khách hàng.
    </ArrowTriadContent>
  </ArrowTriadCallout>
  <ArrowTriadCallout v-click="1">
    <ArrowTriadHeading>Accounting</ArrowTriadHeading>
    <ArrowTriadContent>
      <strong>Đã thực hiện điều gì?</strong><br>
      Truy vấn được ghi vào audit log để giám sát và truy vết.
    </ArrowTriadContent>
  </ArrowTriadCallout>
</ArrowTriad>

<div class="control-gap" v-click="2">
  <div class="gap-label">
    <span aria-hidden="true">!</span>
    <small>GIỚI HẠN CỦA AAA</small>
  </div>
  <div class="gap-message">
    <strong>AAA trả lời “có được truy cập?”<span>Chưa trả lời “được thấy bao nhiêu?”</span></strong>
  </div>
</div>

<style scoped>
.control-gap {
  position: absolute;
  top: 8rem;
  left: 30rem;
  z-index: 5;
  display: grid;
  grid-template-columns: 8.5rem 1fr;
  width: 26.5rem;
  min-height: 5.2rem;
  overflow: hidden;
  border: 1px solid rgba(217, 119, 6, 0.28);
  border-radius: 0.55rem;
  background: rgba(255, 255, 255, 0.62);
  box-shadow: 0 0.35rem 1.2rem rgba(15, 23, 42, 0.07);
}

.gap-label,
.gap-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.gap-label {
  align-items: center;
  gap: 0.35rem;
  box-sizing: border-box;
  padding-inline: 0.75rem;
  background: #d97706;
  color: #fff;
  text-align: center;
}

.gap-label span {
  display: grid;
  width: 1.75rem;
  height: 1.75rem;
  place-items: center;
  border: 2px solid rgba(255, 255, 255, 0.72);
  border-radius: 999px;
  font-weight: 900;
  line-height: 1;
}

.gap-label small {
  font-size: 16px;
  font-weight: 900;
  letter-spacing: 0.08em;
}

.gap-message {
  padding: 0.65rem 0.9rem;
}

.gap-message strong {
  font-size: 16px;
  line-height: 1.35;
}

.gap-message strong span {
  display: block;
  margin-top: 0.2rem;
  color: #d97706;
  font-size: 16px;
}
</style>

<!--
AAA mô tả ba bước kiểm soát một phiên truy cập. Chúng ta theo dõi ví dụ của một nhân viên hỗ trợ khách hàng.

[click] Ba thành phần xuất hiện cùng lúc. **Authentication** xác minh danh tính: tài khoản support đăng nhập và dùng MFA để chứng minh họ là người dùng hợp lệ. **Authorization** quyết định danh tính đó được phép làm gì: role support được đọc hồ sơ khách hàng. **Accounting** ghi lại hoạt động qua audit log để giám sát, điều tra và quy trách nhiệm.

[click] Tuy nhiên, được phép truy cập không đồng nghĩa được phép thấy toàn bộ dữ liệu. AAA có thể quyết định role support được SELECT hồ sơ, nhưng chưa quyết định email, số điện thoại hay định danh cá nhân phải được hiển thị đến mức nào. Khoảng trống này dẫn chúng ta tới Data Masking.
-->
