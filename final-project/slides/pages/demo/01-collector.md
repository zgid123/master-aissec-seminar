---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Demo 1 - Thu thập nhịp gõ

<DemoProgress :active="1" />

<div class="mt-4 grid grid-cols-[1.1fr_1.1fr] items-start gap-6 text-[17px] leading-snug">
  <div>
    <div class="text-[13px] font-bold uppercase tracking-wider text-slate-500 mb-2">Kịch bản thao tác</div>
    <ol class="list-decimal pl-5 space-y-3 text-slate-700">
      <li>Mở collector, chọn chế độ <b>Pilot</b>, xác nhận đồng thuận.</li>
      <li>Gõ một đoạn ngắn, thử sửa bằng Backspace, thử dán văn bản (Paste).</li>
      <li>Nhấp ra ngoài vùng gõ rồi chọn <b>Tiếp tục gõ</b>.</li>
      <li>Kết thúc phiên và tải về file JSON.</li>
    </ol>
  </div>
  <div class="text-center">
    <img src="/figures/collector_panel.png" class="max-h-[250px] w-auto mx-auto rounded-lg border border-slate-300 shadow-sm" alt="Giao diện collector thu nhịp gõ" />
  </div>
</div>

<div v-click="1" class="mt-5 grid grid-cols-3 gap-3.5 text-[15px] leading-snug">
  <div class="rounded-lg border-l-4 border-emerald-500 bg-emerald-50 p-3 text-slate-800">
    Chỉ lưu loại phím và thời điểm
  </div>
  <div class="rounded-lg border-l-4 border-emerald-500 bg-emerald-50 p-3 text-slate-800">
    Không lưu ký tự
  </div>
  <div class="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-3 text-slate-800">
    Chặn dán, ngắt đoạn khi mất tiêu điểm
  </div>
</div>

<!--
Mục tiêu: 0:45

Em mở công cụ thu ở chế độ pilot, gõ một câu, thử sửa bằng Backspace và dán. Khi kết thúc, file JSON chỉ chứa nhóm phím và thời điểm, không có ký tự nào.
-->
