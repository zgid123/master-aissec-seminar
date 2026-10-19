---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Đo cái gì và đo như thế nào

<div class="mt-1 grid grid-cols-2 gap-4 text-[14px] leading-snug">
  <div class="rounded-lg border-t-4 border-rose-500 bg-white px-4 py-2.5 shadow-sm">
    <div class="font-bold text-rose-800">Phát hiện người lạ</div>
    <ul class="mt-1 !pl-4 [&_li]:!my-1">
      <li><b>Chỉ số chính:</b> tỷ lệ phát hiện trong 150 phím đầu của người lạ.</li>
      <li><b>TTD:</b> số phím từ N đến khi hỏi MFA hoặc thu hồi. Chỉ là chỉ số phụ.</li>
      <li>Ca không phát hiện là <b>kiểm duyệt phải</b>, không gán TTD bằng độ dài phiên.</li>
    </ul>
  </div>
  <div class="rounded-lg border-t-4 border-sky-500 bg-white px-4 py-2.5 shadow-sm">
    <div class="font-bold text-sky-800">Làm phiền chủ thật</div>
    <ul class="mt-1 !pl-4 [&_li]:!my-1">
      <li><b>MFA/giờ</b> trên phiên chính chủ G0, báo theo thời gian ghi và theo đồng hồ.</li>
      <li><b>Thu hồi oan</b>: phiên chủ thật bị thu hồi.</li>
      <li>FAR, FRR, EER mức cửa sổ chỉ dùng để <b>chẩn đoán</b>.</li>
    </ul>
  </div>
</div>

<div v-click class="mt-3 rounded-lg border-2 border-violet-400 bg-violet-50 px-4 py-2.5 text-[14px] leading-snug">
  <div class="font-bold text-violet-900">Bẫy mẫu số: báo song song hai tỷ lệ phát hiện</div>
  <div class="mt-1.5 grid grid-cols-2 gap-4">
    <div><b>Loại thu hồi trước N</b>: chỉ chia cho kịch bản còn sống đến lúc người lạ gõ.</div>
    <div><b>Trên toàn bộ</b>: chia cho cả 432 kịch bản.</div>
  </div>
  <div class="mt-1.5 text-slate-700">Chính sách thu hồi oan càng nhiều thì mẫu số thứ nhất càng nhỏ, và tỷ lệ trông càng đẹp.</div>
</div>

<div v-click class="mt-3 text-[14px] text-slate-700">
  Ràng buộc đặt trước: median TTD ≤ 150 phím, phát hiện ≥ 80%, chưa cảnh báo tại 150 phím ≤ 15%, không thu hồi oan.
</div>

<!--
Mục tiêu: 0:50

Nhóm đo theo hai chiều ngược nhau. Bên trái là phát hiện người lạ: chỉ số chính là tỷ lệ phát hiện trong 150 phím đầu của người lạ; TTD chỉ là phụ. Bên phải là làm phiền chủ thật: số lần hỏi MFA mỗi giờ và số lần thu hồi oan.

[CLICK] Khi rà kết quả, em phát hiện một bẫy mẫu số: nếu loại các kịch bản bị thu hồi trước khi người lạ gõ, thì chính sách thu hồi oan càng nhiều lại có tỷ lệ phát hiện càng đẹp. Nên nhóm báo song song cả hai cách tính.

[CLICK] Một cấu hình chỉ được coi là đạt khi thỏa cả bốn ràng buộc này, đặt trước khi chạy.
-->
