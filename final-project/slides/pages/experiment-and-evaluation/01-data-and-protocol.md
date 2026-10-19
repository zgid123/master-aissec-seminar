---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Dữ liệu và quy trình thực nghiệm

<div class="mt-1 grid grid-cols-3 gap-3 text-center text-[14px]">
  <div class="rounded-lg bg-sky-50 px-3 py-2"><div class="text-[26px] font-black text-sky-700">4</div>hồ sơ nhịp gõ SIM01 đến SIM04</div>
  <div class="rounded-lg bg-sky-50 px-3 py-2"><div class="text-[26px] font-black text-sky-700">24</div>phiên nguồn, 28.800 lần gõ hợp lệ</div>
  <div class="rounded-lg bg-sky-50 px-3 py-2"><div class="text-[26px] font-black text-sky-700">432</div>kịch bản A1 cho mỗi cấu hình</div>
</div>

<div class="mt-3 grid grid-cols-[1fr_1.15fr] gap-5 text-[14px] leading-snug">
  <div v-click>
    <div class="text-[12px] font-bold uppercase tracking-wide text-slate-500">Chia theo ngày, giữ nguyên phiên</div>
    <div class="mt-2 grid grid-cols-3 gap-2 text-center">
      <div class="rounded border-2 border-emerald-500 bg-emerald-50 py-2"><b>D1</b><br>train</div>
      <div class="rounded border-2 border-amber-500 bg-amber-50 py-2"><b>D2</b><br>validation<br><span class="text-[12px]">1 phiên hiệu chuẩn, 1 phiên chọn ngưỡng</span></div>
      <div class="rounded border-2 border-rose-500 bg-rose-50 py-2"><b>D3</b><br>test<br><span class="text-[12px]">mở sau khi khóa cấu hình</span></div>
    </div>
  </div>
  <div v-click>
    <div class="text-[12px] font-bold uppercase tracking-wide text-slate-500">Ghép kịch bản tiếp quản A1 offline</div>
    <div class="mt-2 flex h-[38px] overflow-hidden rounded text-[13px] font-bold text-white">
      <div class="flex w-[43%] items-center justify-center bg-sky-500">Chủ: 225 phím</div>
      <div class="flex w-[57%] items-center justify-center bg-rose-500">Người lạ: 300 phím</div>
    </div>
    <div class="mt-1 flex justify-between text-[12px] text-slate-600"><span>prefix không chia hết cho 50, có cửa sổ trộn</span><span>điểm nối N, cách 250 ms</span></div>
    <div class="mt-2">Nhãn N chỉ dùng ở lớp đánh giá để tính TTD, không đi vào scorer hay chính sách.</div>
  </div>
</div>

<!--
Mục tiêu: 0:50

Lần chạy chính dùng bốn hồ sơ SIM01 đến SIM04, tổng 24 phiên và 28.800 lần gõ hợp lệ. Mỗi cấu hình được thử trên 432 kịch bản tiếp quản.

[CLICK] Dữ liệu chia theo ngày: ngày 1 để train, ngày 2 để validation, ngày 3 là test và chỉ mở sau khi đã khóa cấu hình.

[CLICK] Kịch bản A1 ghép 225 phím của chủ với 300 phím của người lạ. Vì 225 không chia hết cho 50 nên luôn có một cửa sổ trộn giữa hai người. Điểm nối N chỉ dùng để tính TTD, mô hình không biết.
-->
