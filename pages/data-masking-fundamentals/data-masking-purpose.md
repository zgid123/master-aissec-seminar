---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Data Masking giúp ẩn phần không cần thiết

Masking thay thế dữ liệu nhạy cảm bằng một biểu diễn an toàn hơn cho đúng mục đích sử dụng.{.op-60}

<div class="mask-example mt-7">
  <div><small>Original</small><strong>john.doe@gmail.com</strong></div>
  <span>→</span>
  <div class="result"><small>Masked</small><strong>j***@gmail.com</strong></div>
</div>

<div class="mt-6 grid grid-cols-2 gap-8 text-sm info-grid">
  <div><b class="text-[#88ffff]">Dữ liệu thường được mask</b><br><span class="op-70">Email, phone, credit card, national ID, address, salary, medical và financial information.</span></div>
  <div><b class="text-[#2efab0]">Người dùng điển hình</b><br><span class="op-70">Developer, tester, analyst, customer support và đối tác chỉ cần một phần dữ liệu.</span></div>
</div>

<div class="mt-5 text-sm purpose-line">
  <b class="text-[#ffda58]">Mục tiêu</b> · Giảm phơi lộ dữ liệu · Bảo vệ PII · Hỗ trợ <b>least privilege</b> · Mở dữ liệu an toàn cho dev, analyst, support.
</div>

<style scoped>
.mask-example { display:flex; align-items:center; justify-content:center; gap:1.4rem; }
.mask-example > div { min-width:15rem; padding:1rem 1.2rem; border:1px solid rgba(136,255,255,.3); background:rgba(136,255,255,.055); }
.mask-example > span { opacity:.55; font-size:1.5rem; }
.mask-example small,.mask-example strong { display:block; }
.mask-example small { margin-bottom:.45rem; opacity:.58; }
.mask-example .result { border-color:rgba(46,250,176,.55); }
.mask-example .result strong { color:#2efab0; }
.info-grid > div { padding:.75rem .85rem; border-left:3px solid rgba(136,255,255,.45); background:rgba(255,255,255,.035); min-height:3.8rem; }
.purpose-line { padding:.6rem .85rem; border-left:3px solid rgba(255,218,88,.6); background:rgba(255,218,88,.05); line-height:1.5; }
</style>

<!--
[NOTE NHẮC BÀI — Slide 1/4: Data Masking là gì] (~50s)

LỜI THOẠI GỢI Ý (slide không có animation → nói một mạch, dùng tay chỉ vào ví dụ):
"Ở section 1, nhóm đã chỉ ra một vấn đề: user có thể đã authenticated, đã authorized, kết nối an toàn, và database cũng đã encrypted — nhưng dữ liệu nhạy cảm vẫn có thể bị lộ quá mức cần thiết.
Data Masking xử lý đúng điểm này: nó thay dữ liệu nhạy cảm bằng một biểu diễn an toàn hơn, nhưng vẫn đủ dùng cho công việc.
Ví dụ [chỉ tay vào slide]: email gốc john.doe@gmail.com sau khi mask còn j***@gmail.com — người dùng vẫn nhận ra domain và ngữ cảnh, nhưng không thấy được danh tính đầy đủ.
Các trường thường được mask là email, phone, credit card, national ID, địa chỉ, lương, thông tin y tế và tài chính.
Và mục tiêu cuối cùng là hỗ trợ least privilege: mở dữ liệu an toàn cho developer, analyst, support mà không phơi lộ thừa."

CHỐT (nhấn giọng): "Masking để GIẢM PHƠI LỘ, chứ không làm dữ liệu trở nên vô dụng."
-->
