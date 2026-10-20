---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Dữ liệu và quy trình

<div class="flex items-center justify-between">
  <p class="sub !mb-3">Dữ liệu mô phỏng và phân chia thực nghiệm</p>
  <span class="rounded bg-rose-600 px-2.5 py-1 text-[12px] font-bold text-white tracking-wide self-center -mt-2">DỮ LIỆU MÔ PHỎNG</span>
</div>

<div class="grid grid-cols-3 gap-3.5 text-center text-[16px]">
  <div class="rounded-lg bg-sky-50 border border-sky-200 px-3 py-2.5 shadow-sm">
    <div class="text-[34px] leading-none font-black text-sky-700">4</div>
    <div class="text-slate-700 font-medium mt-1">hồ sơ nhịp gõ</div>
  </div>
  <div class="rounded-lg bg-sky-50 border border-sky-200 px-3 py-2.5 shadow-sm">
    <div class="text-[34px] leading-none font-black text-sky-700">28.800</div>
    <div class="text-slate-700 font-medium mt-1">lần gõ (24 phiên)</div>
  </div>
  <div class="rounded-lg bg-sky-50 border border-sky-200 px-3 py-2.5 shadow-sm">
    <div class="text-[34px] leading-none font-black text-sky-700">432</div>
    <div class="text-slate-700 font-medium mt-1">kịch bản / cấu hình</div>
  </div>
</div>

<div class="mt-4 grid grid-cols-[1.1fr_1.3fr] gap-6 text-[15px] leading-snug items-start">
  <div v-click="1">
    <div class="font-bold text-slate-700 mb-2 text-[13px] uppercase tracking-wider">Chia dữ liệu theo ngày</div>
    <div class="flex flex-col gap-2.5">
      <div class="rounded-lg border-2 border-emerald-500 bg-emerald-50 px-4 py-3">
        <b class="text-emerald-900">Ngày 1</b> &mdash; Huấn luyện (Train)
      </div>
      <div class="rounded-lg border-2 border-amber-500 bg-amber-50 px-4 py-3">
        <b class="text-amber-900">Ngày 2</b> &mdash; Validation (chỉnh điểm &amp; ngưỡng)
      </div>
      <div class="rounded-lg border-2 border-rose-500 bg-rose-50 px-4 py-3">
        <b class="text-rose-900">Ngày 3</b> &mdash; Kiểm thử (Test khóa)
      </div>
    </div>
  </div>
  <div v-click="2" class="flex flex-col justify-between h-[190px]">
    <div class="fig-card h-[160px] w-full">
      <img src="/img/takeover_bar.svg" alt="Kịch bản tiếp quản A1: 525 phím" class="w-full h-full object-contain" />
    </div>
    <div class="mt-2 text-[13px] text-slate-600 italic text-center">
      * Mô hình không biết N; N chỉ dùng để chấm kết quả.
    </div>
  </div>
</div>

<!--
Mục tiêu: 0:35

Dữ liệu là bốn hồ sơ mô phỏng nên kết quả chỉ dùng kiểm tra quy trình. Chúng em chia theo phiên và theo ngày để tránh rò rỉ. Mỗi kịch bản nối 225 phím của chủ thật với 300 phím của người lạ và đo thời gian phát hiện từ điểm đổi người.
-->