---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Từ phím gõ đến điểm bất thường

<div class="mt-1 grid grid-cols-3 gap-4 text-[14px] leading-snug">
  <div class="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
    <div class="text-[12px] font-bold uppercase tracking-wide text-sky-700">1. Sự kiện phím</div>
    <div class="mt-2">Mỗi phím: nhóm phím, thời điểm nhấn t↓ và nhả t↑ (ms).</div>
    <div class="mt-2 rounded bg-slate-50 px-2 py-1.5 text-[13px]">
      Thời gian giữ: d<sub>i</sub> = t<sub>i</sub>↑ − t<sub>i</sub>↓<br>
      Khoảng nghỉ: f<sub>i</sub> = t<sub>i+1</sub>↓ − t<sub>i</sub>↑ <span class="text-slate-500">(có thể âm)</span>
    </div>
  </div>
  <div v-click class="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
    <div class="text-[12px] font-bold uppercase tracking-wide text-violet-700">2. Cửa sổ 50 phím</div>
    <div class="mt-2">12 đặc trưng: thống kê thời gian giữ, khoảng nghỉ, tốc độ gõ, tỷ lệ phím sửa lỗi, độ biến động.</div>
    <div class="mt-2">Scorer cho điểm a<sub>t</sub>: <b>khoảng cách L1</b> đến tâm median, hoặc <b>Isolation Forest</b> 100 cây.</div>
  </div>
  <div v-click class="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
    <div class="text-[12px] font-bold uppercase tracking-wide text-rose-700">3. Chuẩn hóa theo người</div>
    <div class="mt-2">Dùng median và MAD của chính chủ tài khoản:</div>
    <div class="mt-1 text-center">

$$z_t = \frac{a_t - \mathrm{median}}{1{,}4826 \cdot \mathrm{MAD}}$$

</div>
    <div class="text-[13px] text-slate-500">Ít nhạy với ngoại lai hơn trung bình và độ lệch chuẩn.</div>
  </div>
</div>

<div v-click class="mt-4 border-l-4 border-sky-500 bg-sky-50 px-5 py-2.5 text-[15px] text-slate-800">
  Median và MAD lấy từ <b>một phiên validation</b>, tách khỏi phiên dùng chọn ngưỡng. Tập test chỉ mở sau khi cấu hình đã khóa.
</div>

<!--
Mục tiêu: 0:50

Mỗi phím cho hai số đo cơ bản: thời gian giữ phím và khoảng nghỉ đến phím kế. Khoảng nghỉ có thể âm khi gõ chồng phím, và nhóm giữ nguyên giá trị âm.

[CLICK] Cứ đủ 50 phím hợp lệ thì tạo một cửa sổ với 12 đặc trưng. Scorer cho ra điểm bất thường: hoặc khoảng cách L1 đến tâm median của chủ, hoặc Isolation Forest 100 cây. Điểm càng lớn càng bất thường.

[CLICK] Điểm thô của mỗi người có thang khác nhau, nên được chuẩn hóa bằng median và MAD của chính người đó. Hằng số 1,4826 chỉ để MAD xấp xỉ độ lệch chuẩn khi phân phối chuẩn, không có nghĩa dữ liệu nhịp gõ có phân phối chuẩn.

[CLICK] Điểm quan trọng về chống rò rỉ dữ liệu: median và MAD lấy từ một phiên validation riêng, tách khỏi phiên chọn ngưỡng; tập test chỉ được mở khi cấu hình đã khóa.
-->
