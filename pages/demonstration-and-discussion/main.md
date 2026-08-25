---
layout: bg-center
transition: fade
background: ../../assets/heading.png
---

<div class="section-cover">
  <div class="section-number">04</div>
  <h1>Giới hạn và kết luận</h1>
  <p>Từ kết quả đúng đến một kiến trúc thực sự an toàn</p>
</div>

<style scoped>
.section-cover { width:100%; text-align:center; }
.section-number { color:#2efab0; font-size:1rem; font-weight:800; letter-spacing:.2em; }
.slidev-layout h1 { margin:.45rem 0 .7rem; color:#38edf6; font-size:2.7rem; font-weight:800; letter-spacing:-.025em !important; }
.section-cover p { text-align:center; color:#c5d5df; font-size:1rem; opacity:.78; }
</style>

<!--
Ở phần trước, nhóm em đã trình bày cách xây dựng Dynamic Data Masking trong DuckDB và minh họa rằng cùng một dữ liệu gốc có thể cho ra kết quả khác nhau tùy theo quyền của người đang truy cập.

Tuy nhiên, một câu query trả về đúng kết quả chưa có nghĩa là toàn bộ hệ thống đã an toàn. Masking chỉ là một phần trong kiến trúc bảo mật. Nếu người dùng vẫn có thể đi theo một đường khác để truy cập bảng gốc, mở trực tiếp file DuckDB hoặc tự chạy câu lệnh SQL, họ vẫn có thể bỏ qua cơ chế masking.

Vì vậy, trong phần cuối này, nhóm em sẽ không tập trung thêm vào cách viết hàm che dữ liệu. Thay vào đó, nhóm em sẽ trả lời ba câu hỏi: demo vừa rồi thực sự chứng minh được điều gì, những giới hạn và rủi ro nào vẫn còn tồn tại, và cần bổ sung các lớp kiểm soát nào nếu muốn đưa cách tiếp cận này vào một hệ thống thực tế.

Sau cùng, nhóm em sẽ tổng kết lại thông điệp chính của toàn bộ seminar: Data Masking có vai trò gì trong bảo mật cơ sở dữ liệu và vì sao nó phải được kết hợp với Access Control, Encryption và Auditing.
-->

---
src: ./demo-scope.md
---

---
src: ./trust-boundary.md
---

---
src: ./demo-bypass.md
---

---
src: ./inference-and-runtime-cost.md
---

---
src: ./masking-is-not-access-control.md
---

---
src: ./deployment-fit.md
---

---
src: ./hardening-checklist.md
---

---
src: ./three-key-takeaways.md
---
