---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Data Masking giúp ẩn phần không cần thiết

Masking thay dữ liệu nhạy cảm bằng một dạng hiển thị an toàn hơn nhưng vẫn đủ dùng cho công việc.{.op-60}

<div class="mask-example mt-7">
  <div><small>Dữ liệu gốc</small><strong>john.doe@gmail.com</strong></div>
  <span>→</span>
  <div class="result"><small>Sau khi che</small><strong>j***@gmail.com</strong></div>
</div>

<div class="mt-6 grid grid-cols-3 gap-5 text-sm info-grid">
  <div><b class="text-[#88ffff]">Dữ liệu thường được che</b><br><span class="op-70">Email, số điện thoại, thẻ tín dụng, số định danh, địa chỉ, lương, thông tin y tế và tài chính.</span></div>
  <div><b class="text-[#2efab0]">Người dùng điển hình</b><br><span class="op-70">Lập trình viên, kiểm thử viên, nhân viên phân tích và hỗ trợ — những người chỉ cần một phần dữ liệu.</span></div>
  <div><b class="text-[#ffda58]">Kỹ thuật phổ biến</b><br><span class="op-70">Che một phần, thay thế, làm rỗng, xáo trộn, hash, tokenization, giữ nguyên định dạng.</span></div>
</div>

<div v-click class="mt-6 text-sm purpose-line">
  <b class="text-[#ffda58]">Mục tiêu</b> · Giảm rủi ro lộ dữ liệu · Bảo vệ thông tin cá nhân (PII) · Chỉ cấp quyền ở mức tối thiểu cần thiết · Cho nhân viên dùng dữ liệu mà không thấy phần nhạy cảm.
</div>

<style scoped>
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
[NOTE NHẮC BÀI — Slide 1/4: Data Masking là gì] (~50s)

LỜI THOẠI GỢI Ý (slide không có animation → nói một mạch, dùng tay chỉ vào ví dụ):
"Ở phần 1, nhóm đã chỉ ra một vấn đề: người dùng có thể đã đăng nhập đúng, đã được cấp quyền, kết nối an toàn, và cơ sở dữ liệu cũng đã được mã hóa — nhưng dữ liệu nhạy cảm vẫn có thể bị lộ nhiều hơn mức cần thiết.
Data Masking xử lý đúng điểm này: nó thay dữ liệu nhạy cảm bằng một dạng hiển thị an toàn hơn, nhưng vẫn đủ dùng cho công việc.
Ví dụ [chỉ tay vào slide]: email gốc john.doe@gmail.com sau khi che chỉ còn j***@gmail.com — người xem vẫn biết đây là email dạng nào, nhưng không còn thấy được danh tính đầy đủ.
Các trường thường được che là email, số điện thoại, thẻ tín dụng, số định danh, địa chỉ, lương, thông tin y tế và tài chính.
Về kỹ thuật thì có nhiều cách che: che một phần như ví dụ trên, thay thế bằng dữ liệu giả, làm rỗng, xáo trộn giữa các dòng, hash, tokenization, hoặc giữ nguyên định dạng để hệ thống phía sau vẫn xử lý được."

[CLICK] → hiện dòng Mục tiêu, nhấn giọng:
"Và mục tiêu cuối cùng là chỉ cấp quyền ở mức tối thiểu cần thiết: cho nhân viên (lập trình, kiểm thử, hỗ trợ) dùng được dữ liệu mà không thấy phần nhạy cảm."

CHỐT (nhấn giọng): "Mục đích là GIẢM RỦI RO LỘ DỮ LIỆU, chứ không làm dữ liệu trở nên vô dụng."

NẾU BỊ HỎI SÂU: che một phần / thay thế / làm rỗng là không khôi phục được; hash và tokenization thì nhất quán (cùng input ra cùng output) nên vẫn join hay đếm được; format-preserving giữ đúng định dạng để app phía sau không lỗi validate.
-->
