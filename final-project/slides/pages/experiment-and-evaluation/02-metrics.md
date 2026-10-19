---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Đo cái gì và đo như thế nào

<div class="mt-2 grid grid-cols-2 gap-5 text-[20px] leading-snug">
  <div class="rounded-lg border-t-4 border-rose-500 bg-white px-5 py-5 shadow-sm">
    <div class="flex items-center gap-2 font-bold text-rose-800"><div class="i-carbon-user-filled text-2xl" />Bắt người lạ</div>
    <ul class="mt-2 !pl-5 [&_li]:!my-2.5">
      <li>Tỷ lệ phát hiện trong <b>150 phím</b> đầu</li>
      <li>Số phím đến khi cảnh báo (TTD)</li>
    </ul>
  </div>
  <div class="rounded-lg border-t-4 border-sky-500 bg-white px-5 py-5 shadow-sm">
    <div class="flex items-center gap-2 font-bold text-sky-800"><div class="i-carbon-user-favorite text-2xl" />Không làm phiền chủ thật</div>
    <ul class="mt-2 !pl-5 [&_li]:!my-2.5">
      <li>Số lần hỏi <b>MFA mỗi giờ</b></li>
      <li>Số lần <b>thu hồi oan</b></li>
    </ul>
  </div>
</div>

<div v-click class="mt-6 rounded-lg border-2 border-violet-400 bg-violet-50 px-5 py-4 text-[20px] leading-snug">
  <div class="font-bold text-violet-900">Bẫy mẫu số</div>
  <div class="mt-1">Nếu bỏ các kịch bản đã bị thu hồi oan từ trước, cấu hình càng thu hồi oan nhiều thì tỷ lệ phát hiện <b>trông càng đẹp</b>. Nên nhóm báo cả hai cách tính.</div>
</div>

<div v-click class="mt-6 flex items-center gap-3 rounded-lg bg-slate-100 px-5 py-4 text-[20px] text-slate-700"><div class="i-carbon-rule text-2xl text-slate-600 shrink-0" />Đạt khi: phát hiện ≥ 80%, TTD ≤ 150 phím, không thu hồi oan.</div>

<!--
Mục tiêu: 0:45

Nhóm đo theo hai chiều ngược nhau. Bên trái là bắt người lạ: chỉ số chính là tỷ lệ phát hiện trong 150 phím đầu. Bên phải là làm phiền chủ thật: số lần hỏi MFA mỗi giờ và số lần thu hồi oan.

[CLICK] Khi rà kết quả, em phát hiện một bẫy mẫu số: nếu loại các kịch bản bị thu hồi trước khi người lạ gõ, thì cấu hình thu hồi oan càng nhiều lại có tỷ lệ phát hiện càng đẹp. Nên nhóm báo song song cả hai cách tính.

[CLICK] Một cấu hình chỉ được coi là đạt khi thỏa các ràng buộc này, đặt trước khi chạy. Báo cáo còn thêm một ràng buộc về tỷ lệ chưa cảnh báo tại 150 phím.
-->