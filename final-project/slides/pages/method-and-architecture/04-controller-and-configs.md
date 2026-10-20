---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Bộ điều khiển phiên

<p class="sub">Trạng thái phiên và bốn cấu hình so sánh</p>

<div class="fig-card" style="height:210px">
  <img src="/img/H4_may_trang_thai.svg" alt="Máy trạng thái điều khiển phiên" />
</div>

<div class="chips c4 mt-4 text-[15px] leading-snug">
  <div v-click="1" class="rounded-lg border-t-4 border-slate-500 bg-slate-50 p-3 shadow-sm">
    <div class="font-mono font-bold text-[15px] text-slate-800">B0</div>
    <div class="mt-1 text-slate-700">Xét riêng từng cửa sổ, ngưỡng chung.</div>
  </div>

  <div v-click="2" class="rounded-lg border-t-4 border-sky-500 bg-sky-50 p-3 shadow-sm">
    <div class="font-mono font-bold text-[15px] text-sky-800">B1</div>
    <div class="mt-1 text-slate-700">Cộng dồn CUSUM, ngưỡng chung.</div>
  </div>

  <div v-click="3" class="rounded-lg border-t-4 border-violet-500 bg-violet-50 p-3 shadow-sm">
    <div class="font-mono font-bold text-[15px] text-violet-800">P1</div>
    <div class="mt-1 text-slate-700">Cộng dồn CUSUM, <b>ngưỡng riêng</b>.</div>
  </div>

  <div v-click="4" class="rounded-lg border-t-4 border-slate-300 bg-slate-100/70 p-3 shadow-sm opacity-80">
    <div class="font-mono font-bold text-[15px] text-slate-500">P2</div>
    <div class="mt-1 text-slate-500">P1 + cập nhật sau MFA. <span class="text-rose-600 font-bold block">(Chưa hiện thực)</span></div>
  </div>
</div>

<div class="mt-3 rounded bg-slate-800 px-4 py-2 text-[14px] text-white text-center">
  Tham số chọn trên <b>validation</b>; test chỉ chấm sau khi khóa cấu hình.
</div>

<!--
Mục tiêu: 0:30

Điểm rủi ro thấp thì phiên chạy bình thường. Vượt mức một thì hỏi MFA, vượt mức hai thì thu hồi ngay. B0, B1, P1 khác nhau ở cách cộng dồn và ngưỡng, P2 chưa làm.
-->
