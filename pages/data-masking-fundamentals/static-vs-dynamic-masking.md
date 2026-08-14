---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Static / Dynamic Data Masking

<div class="compare mt-6">
  <div>
    <h3>Static Data Masking</h3>
    <p><b>Dữ liệu gốc</b> → Che → <b>Bản sao đã che</b></p>
    <p>Dữ liệu được che sẵn trên một bản sao, rồi mới đưa sang môi trường phát triển, kiểm thử hoặc huấn luyện.</p>
  </div>
  <div>
    <h3>Dynamic Data Masking</h3>
    <p><b>Dữ liệu gốc</b> → Truy vấn + Quy tắc → <b>Kết quả theo quyền</b></p>
    <p>Dữ liệu gốc không đổi; kết quả chỉ được che ngay lúc truy vấn, tùy theo quyền của người truy vấn.</p>
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
[NOTE NHẮC BÀI — Slide 2/4: Static vs Dynamic] (~50s)

LỜI THOẠI GỢI Ý (hai cột hiện sẵn):
"Có hai hướng che dữ liệu phổ biến.
Thứ nhất — Static Data Masking: dữ liệu được che SẴN trên một bản sao, rồi mới đưa sang môi trường phát triển, kiểm thử hay huấn luyện. Ưu điểm là an toàn cho các môi trường không phải dữ liệu thật, nhưng dữ liệu trong bản sao đã bị thay đổi cố định.
Thứ hai — Dynamic Data Masking: dữ liệu gốc KHÔNG đổi. Việc che chỉ diễn ra ngay lúc truy vấn, tùy theo vai trò hoặc quyền của người truy vấn."

[CLICK] → hiện câu tổng kết, nhấn giọng:
"Static bảo vệ BẢN SAO; còn Dynamic kiểm soát KHẢ NĂNG NHÌN THẤY trong hệ thống đang chạy."

NHẮC: seminar của nhóm tập trung vào DYNAMIC — đây là nền tảng cho phần DuckDB ở section 3.
-->
