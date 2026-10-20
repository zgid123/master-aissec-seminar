---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Chỉ số đánh giá

<p class="sub">Bắt người lạ, không làm phiền chủ thật</p>

<div class="grid grid-cols-2 gap-4 text-[16px] leading-snug items-stretch">
  <div class="rounded-lg border-t-4 border-rose-500 bg-white p-4 shadow-sm flex flex-col justify-between">
    <div class="flex items-center gap-1.5 font-bold text-rose-800 text-[17px]">
      <div class="i-carbon-user-filled text-lg"></div> Bắt người lạ (An ninh)
    </div>
    <ul class="mt-2 pl-4 list-disc space-y-2 text-slate-700">
      <li><b>Tỷ lệ phát hiện:</b> tỷ lệ kịch bản có cảnh báo sau N.</li>
      <li><b>Median TTD:</b> số phím từ N đến khi phát hiện.</li>
      <li><b>Trong 150 phím:</b> tỷ lệ phát hiện trong chân trời (L = 150).</li>
    </ul>
  </div>

  <div class="rounded-lg border-t-4 border-sky-500 bg-white p-4 shadow-sm flex flex-col justify-between">
    <div class="flex items-center gap-1.5 font-bold text-sky-800 text-[17px]">
      <div class="i-carbon-user-favorite text-lg"></div> Không làm phiền chủ thật (Khả dụng)
    </div>
    <ul class="mt-2 pl-4 list-disc space-y-2 text-slate-700">
      <li><b>MFA/giờ:</b> tần suất hỏi xác thực lại trên phiên chủ thật.</li>
      <li><b>Thu hồi oan:</b> số lần hệ thống đóng phiên nhầm của chủ.</li>
    </ul>
  </div>
</div>

<!-- Bẫy mẫu số -->
<div v-click="1" class="mt-3.5 rounded-lg border-2 border-violet-400 bg-violet-50/80 p-3.5 flex items-center justify-between text-[15px]">
  <div class="max-w-[55%]">
    <div class="font-bold text-violet-900 text-[16px]">Lưu ý về mẫu số</div>
    <div class="text-slate-700 mt-1">
      Đề tài luôn <b>báo cả hai cách tính</b> để đảm bảo tính khách quan và minh bạch.
    </div>
  </div>
  <div class="text-right bg-white/90 px-3 py-2 rounded-lg border border-violet-200">
    <div class="text-[12.5px] text-slate-500">IF, P1:</div>
    <div class="text-[22px] font-black text-rose-700 leading-tight">
      0,755 <span class="text-[13px] font-normal text-slate-500">(bỏ 72 ca)</span> &rarr; 0,613 <span class="text-[13px] font-bold text-slate-800">(đủ 432)</span>
    </div>
  </div>
</div>

<!-- Đạt khi -->
<div v-click="2" class="mt-3.5">
  <div class="text-[13px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Ràng buộc đạt (đặt trước)</div>
  <div class="grid grid-cols-4 gap-2.5 text-[14px] text-white">
    <div class="rounded-lg bg-slate-800 p-2.5 text-center">Phát hiện &ge; 80%</div>
    <div class="rounded-lg bg-slate-800 p-2.5 text-center">Median TTD &le; 150 phím</div>
    <div class="rounded-lg bg-slate-800 p-2.5 text-center">Chưa cảnh báo tại 150 phím &le; 15%</div>
    <div class="rounded-lg bg-slate-800 p-2.5 text-center">Không thu hồi oan (0 ca)</div>
  </div>
</div>

<div class="mt-2 text-[12px] text-slate-400 italic text-right">
  * FAR (False Acceptance Rate), FRR (False Rejection Rate), EER (Equal Error Rate): chỉ số chẩn đoán ở mức cửa sổ.
</div>

<!--
Mục tiêu: 0:45

Chúng em đo hai chiều ngược nhau: bắt người lạ và không làm phiền chủ thật. Có một bẫy mẫu số: nếu loại các ca đã bị thu hồi trước khi người lạ gõ, cấu hình thu hồi oan nhiều lại có tỷ lệ phát hiện đẹp hơn, nên chúng em báo cả hai cách tính. Cấu hình chỉ đạt khi thỏa cả bốn ràng buộc, đặt trước khi chạy.
-->