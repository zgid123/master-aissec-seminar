---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Dữ liệu và quy trình thực nghiệm

<div class="mt-3 grid grid-cols-3 gap-4 text-center text-[20px]">
  <div class="rounded-lg bg-sky-50 px-3 py-5"><div class="text-[52px] leading-none font-black text-sky-700">4</div>hồ sơ nhịp gõ</div>
  <div class="rounded-lg bg-sky-50 px-3 py-5"><div class="text-[52px] leading-none font-black text-sky-700">28.800</div>lần gõ, 24 phiên</div>
  <div class="rounded-lg bg-sky-50 px-3 py-5"><div class="text-[52px] leading-none font-black text-sky-700">432</div>kịch bản tấn công</div>
</div>

<div class="mt-8 grid grid-cols-[1fr_1.2fr] gap-8 text-[20px] leading-snug">
  <div v-click>
    <div class="font-bold text-slate-600">Chia theo ngày</div>
    <div class="mt-3 grid grid-cols-3 gap-2 text-center">
      <div class="rounded border-2 border-emerald-500 bg-emerald-50 py-7"><b>Ngày 1</b><br>train</div>
      <div class="rounded border-2 border-amber-500 bg-amber-50 py-7"><b>Ngày 2</b><br>validation</div>
      <div class="rounded border-2 border-rose-500 bg-rose-50 py-7"><b>Ngày 3</b><br>test</div>
    </div>
  </div>
  <div v-click>
    <div class="font-bold text-slate-600">Ghép một kịch bản tiếp quản</div>
    <div class="mt-3 flex h-[72px] overflow-hidden rounded text-[19px] font-bold text-white">
      <div class="flex w-[43%] items-center justify-center bg-sky-500">Chủ: 225 phím</div>
      <div class="flex w-[57%] items-center justify-center bg-rose-500">Người lạ: 300 phím</div>
    </div>
    <div class="mt-3 text-slate-700">Điểm nối <b>N</b> chỉ dùng để chấm kết quả, mô hình không biết.</div>
  </div>
</div>

<!--
Mục tiêu: 0:45

Lần chạy chính dùng bốn hồ sơ nhịp gõ, tổng 24 phiên và 28.800 lần gõ. Mỗi cấu hình được thử trên 432 kịch bản tiếp quản.

[CLICK] Dữ liệu chia theo ngày: ngày 1 để train, ngày 2 để chọn tham số, ngày 3 là test và chỉ mở sau khi đã khóa cấu hình.

[CLICK] Mỗi kịch bản ghép 225 phím của chủ với 300 phím của người lạ. Điểm nối N chỉ dùng để tính thời gian phát hiện, mô hình không biết.
-->