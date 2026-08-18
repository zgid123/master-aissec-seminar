---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Data Masking giúp ẩn phần không cần thiết

Masking thay dữ liệu nhạy cảm bằng một dạng hiển thị an toàn hơn nhưng vẫn đủ dùng cho công việc.{.op-60}

<div v-click="1" class="mask-example mt-7">
  <div><small>Dữ liệu gốc</small><strong>john.doe@gmail.com</strong></div>
  <span>→</span>
  <div class="result"><small>Sau khi che</small><strong>j***@gmail.com</strong></div>
</div>

<div class="mt-6 grid grid-cols-3 gap-5 text-sm info-grid">
  <div v-click="2"><b class="text-[#88ffff]">Dữ liệu thường được che</b><br><span class="op-70">Email, số điện thoại, thẻ tín dụng, số định danh, địa chỉ, lương, thông tin y tế và tài chính...</span></div>
  <div v-click="3"><b class="text-[#2efab0]">Người dùng điển hình</b><br><span class="op-70">Lập trình viên, kiểm thử viên, chuyên viên phân tích và nhân viên hỗ trợ - những người chỉ cần một phần dữ liệu.</span></div>
  <div v-click="4"><b class="text-[#ffda58]">Kỹ thuật phổ biến</b><br><span class="op-70">Che một phần (partial redaction), thay thế (substitution), băm (hashing), mã hóa token (tokenization)...</span></div>
</div>

<div v-click="5" class="mt-6 text-sm purpose-line">
  <b class="text-[#ffda58]">Mục tiêu:</b> Giảm rủi ro lộ dữ liệu · Bảo vệ thông tin cá nhân · Chỉ cấp quyền ở mức tối thiểu cần thiết · Cho nhân viên dùng dữ liệu mà không thấy phần nhạy cảm.
</div>

<style scoped>
.alpha-shifting-intro h1 {
  width: 1041px;
}

.mask-example { display:flex; align-items:center; justify-content:center; gap:1.4rem; }
.mask-example > div { min-width:15rem; padding:1rem 1.2rem; border:1px solid rgba(136,255,255,.3); background:rgba(136,255,255,.055); }
.mask-example > span { opacity:.55; font-size:1.5rem; }
.mask-example small,.mask-example strong { display:block; }
.mask-example small { margin-bottom:.45rem; opacity:.58; }
.mask-example .result { border-color:rgba(46,250,176,.55); }
.mask-example .result strong { color:#2efab0; }
.info-grid { font-size:.78rem; }
.info-grid > div { padding:.75rem .85rem; border-left:3px solid rgba(136,255,255,.45); background:rgba(255,255,255,.035); min-height:5.2rem; }
.purpose-line { padding:.6rem .85rem; border-left:3px solid rgba(255,218,88,.6); background:rgba(255,218,88,.05); line-height:1.5; min-height:3.1rem; }
</style>

<!--
Đăng nhập đúng, có quyền, kết nối an toàn, CSDL đã mã hóa - **nhưng vẫn lộ quá mức cần thiết**.
Định nghĩa: thay dữ liệu nhạy cảm bằng dạng an toàn hơn **nhưng vẫn đủ dùng**.

[CLICK] Ví dụ - chỉ ô trái → kéo sang ô phải: `john.doe@gmail.com` → `j***@gmail.com`.
Vẫn biết là email, **không còn danh tính đầy đủ**.

[click] Trường thường che: email · SĐT · thẻ tín dụng · số định danh · địa chỉ · lương · y tế/tài chính.

[click] Ai dùng: lập trình · kiểm thử · phân tích · hỗ trợ - **chỉ cần một phần dữ liệu**.

[click] 4 kỹ thuật: partial redaction (như ví dụ) · substitution · hash · tokenization.
→ Nói đều, **đừng đọc thêm tên nào**. Chậm giờ thì bỏ cả đoạn này.

[click] Mục tiêu = **quyền tối thiểu**.
CHỐT (hạ giọng): "mục đích là **GIẢM RỦI RO LỘ DỮ LIỆU**, chứ không làm dữ liệu vô dụng."
→ Chuyển: "Vậy việc che này được làm VÀO LÚC NÀO?"

Hỏi sâu - 3 kỹ thuật còn lại: nulling (mất join) · shuffling (thống kê đúng, cá nhân sai) · format-preserving.
Khôi phục được: chỉ **tokenization** (có vault). Hash một chiều nhưng vẫn join/đếm được.
-->
