---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Demo 2 - Phát lại kịch bản tiếp quản

<DemoProgress :active="2" />

<div class="mt-2 flex items-center justify-between text-[14px] text-slate-600 bg-slate-50 px-3.5 py-1.5 rounded-lg border border-slate-200">
  <span class="font-medium"><b>Cấu hình:</b> Isolation Forest, SIM01, hai kịch bản A1 đầu tiên theo thứ tự trong file log</span>
  <span class="flex gap-3 text-[13px]">
    <span class="inline-flex items-center gap-1.5"><span class="inline-block h-2.5 w-2.5 rounded-sm bg-sky-500"></span> Chủ thật</span>
    <span class="inline-flex items-center gap-1.5"><span class="inline-block h-2.5 w-2.5 rounded-sm bg-purple-500"></span> Cửa sổ trộn</span>
    <span class="inline-flex items-center gap-1.5"><span class="inline-block h-2.5 w-2.5 rounded-sm bg-rose-500"></span> Người lạ</span>
  </span>
</div>

<div class="mt-3 grid grid-cols-2 gap-4">
  <div class="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
    <div class="text-[15px] font-bold text-slate-700 flex justify-between">
      <span>Ca 1: Ghép SIM02 (G0)</span>
      <span class="text-slate-500 font-normal">Bỏ sót cả 2 chính sách</span>
    </div>
    <CusumTrace :h1="1" :h2="2" :windows="[
      { s: 0, label: 'genuine', action: 'CONTINUE' },
      { s: 0.49, label: 'genuine', action: 'CONTINUE' },
      { s: 0, label: 'genuine', action: 'CONTINUE' },
      { s: 0, label: 'genuine', action: 'CONTINUE' },
      { s: 0, label: 'mixed', action: 'CONTINUE' },
      { s: 0.33, label: 'impostor', action: 'CONTINUE' },
      { s: 0.36, label: 'impostor', action: 'CONTINUE' },
      { s: 0, label: 'impostor', action: 'CONTINUE' },
      { s: 0, label: 'impostor', action: 'CONTINUE' },
      { s: 0, label: 'impostor', action: 'CONTINUE' },
    ]" />
    <div class="text-[14px] text-slate-500 text-center mt-1">Hết 275 phím vẫn chưa vượt h<sub>1</sub>.</div>
  </div>

  <div v-click="1" class="rounded-lg border border-rose-200 bg-white p-3 shadow-sm">
    <div class="text-[15px] font-bold text-rose-800 flex justify-between">
      <span>Ca 2: Ghép SIM02 (G1)</span>
      <span class="text-rose-700 font-semibold">P1 bắt ở 125 phím</span>
    </div>
    <CusumTrace :h1="1" :h2="2" :windows="[
      { s: 0, label: 'genuine', action: 'CONTINUE' },
      { s: 0.49, label: 'genuine', action: 'CONTINUE' },
      { s: 0, label: 'genuine', action: 'CONTINUE' },
      { s: 0, label: 'genuine', action: 'CONTINUE' },
      { s: 0, label: 'mixed', action: 'CONTINUE' },
      { s: 0, label: 'impostor', action: 'CONTINUE' },
      { s: 1.08, label: 'impostor', action: 'MFA_CHALLENGE' },
    ]" />
    <div class="text-[14px] text-slate-500 text-center mt-1">W6 vượt h<sub>1</sub> &rarr; hỏi MFA &rarr; người lạ trượt.</div>
  </div>
</div>

<div v-click="2" class="mt-3 rounded-lg bg-slate-900 px-4 py-2.5 text-[14px] text-white">
  <b>Đánh giá:</b> Ca 1: B1 và P1 đều bỏ sót. Ca 2: ngưỡng riêng (P1) phát hiện ở 125 phím, ngưỡng chung (B1) ở 225 phím, muộn hơn chân trời 150.
</div>

<!--
Mục tiêu: 0:50

Cùng 225 phím của chủ thật, ghép với hai phiên người lạ khác nhau. Ca đầu người lạ gõ khá giống chủ nên cả hai chính sách đều bỏ sót. Ca hai, ngưỡng riêng phát hiện ở 125 phím còn ngưỡng chung phải đến 225 phím, muộn hơn chân trời 150. Ngưỡng thấp này cũng làm chủ thật dễ bị hỏi MFA oan, đó là đánh đổi trong bảng.
-->
