---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Static / Dynamic Data Masking

<div class="compare mt-6">
  <div>
    <h3>Static Data Masking</h3>
    <p><b>Production data</b> → Mask → <b>Masked copy</b></p>
    <p>Dữ liệu trong bản sao bị thay đổi trước khi chuyển sang development, testing hoặc training.</p>
  </div>
  <div>
    <h3>Dynamic Data Masking</h3>
    <p><b>Original data</b> → Query + Policy → <b>Role-based result</b></p>
    <p>Dữ liệu gốc không đổi; kết quả được che tại query time theo access context.</p>
  </div>
</div>

<div v-click class="mt-7 text-center text-lg summary-box">
Static bảo vệ <b class="text-[#88ffff]">bản sao</b>; Dynamic kiểm soát <b class="text-[#2efab0]">khả năng nhìn thấy</b> trong hệ thống đang chạy.
</div>

<style scoped>
.compare { display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; }
.compare > div { padding:1.2rem; border-left:4px solid #88ffff; background:rgba(255,255,255,.045); }
.compare > div:last-child { border-color:#2efab0; }
.compare h3 { margin:0 0 .8rem; color:#88ffff; }
.compare > div:last-child h3 { color:#2efab0; }
.compare p { margin:.65rem 0; font-size:.82rem; line-height:1.4; }
.summary-box { min-height:2.2rem; }
</style>

<!--
[NOTE NHẮC BÀI — Slide 2/4: Static vs Dynamic] (~45s)

Hai cột hiện sẵn, chỉ có 1 lần CLICK cho câu tổng kết cuối:
- Cột trái — STATIC: che dữ liệu TRƯỚC trên bản copy → dùng cho dev/test/training. Dữ liệu đã bị đổi sẵn.
- Cột phải — DYNAMIC: dữ liệu gốc KHÔNG đổi; che tại QUERY TIME theo role / access context.
- CLICK → hiện câu tổng kết: "Static bảo vệ BẢN SAO; Dynamic kiểm soát KHẢ NĂNG NHÌN THẤY trong hệ thống đang chạy." → nhấn giọng câu này.
- Nhắc: seminar mình tập trung vào DYNAMIC (mở đường cho phần DuckDB sau).
-->
