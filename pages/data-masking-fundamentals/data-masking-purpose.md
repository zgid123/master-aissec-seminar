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

<div class="mt-8 grid grid-cols-2 gap-8 text-sm info-grid">
  <div><b class="text-[#88ffff]">Dữ liệu thường được mask</b><br><span class="op-70">Email, phone, credit card, national ID, address, salary, medical và financial information.</span></div>
  <div><b class="text-[#2efab0]">Người dùng điển hình</b><br><span class="op-70">Developer, tester, analyst, customer support và đối tác chỉ cần một phần dữ liệu.</span></div>
</div>

<style scoped>
.mask-example { display:flex; align-items:center; justify-content:center; gap:1.4rem; }
.mask-example > div { min-width:15rem; padding:1rem 1.2rem; border:1px solid rgba(136,255,255,.3); background:rgba(136,255,255,.055); }
.mask-example > span { opacity:.55; font-size:1.5rem; }
.mask-example small,.mask-example strong { display:block; }
.mask-example small { margin-bottom:.45rem; opacity:.58; }
.mask-example .result { border-color:rgba(46,250,176,.55); }
.mask-example .result strong { color:#2efab0; }
.info-grid > div { padding:.75rem .85rem; border-left:3px solid rgba(136,255,255,.45); background:rgba(255,255,255,.035); min-height:4.4rem; }
</style>

<!--
[NOTE NHẮC BÀI — Slide 1/4: Data Masking là gì] (~40s)

- MỞ: nối từ section 1 → "user đã authenticated, DB đã encrypted, nhưng dữ liệu vẫn lộ quá mức". Masking xử lý đúng điểm này.
- Ý cốt lõi: masking = thay dữ liệu nhạy cảm bằng biểu diễn AN TOÀN nhưng VẪN ĐỦ DÙNG cho công việc.
- Chỉ vào ví dụ trên slide: john.doe@gmail.com → j***@gmail.com (vẫn thấy domain, không thấy danh tính).
- Điểm các trường hay mask: email, phone, credit card, national ID, lương, medical/financial.
- CHỐT: "masking để GIẢM PHƠI LỘ, không làm dữ liệu vô dụng".
- Slide này KHÔNG có animation → nói liền mạch, dùng tay chỉ vào ví dụ.
-->
