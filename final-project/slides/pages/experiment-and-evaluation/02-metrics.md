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
Mục tiêu: 1:00

Phần này là đóng góp chính của mục đánh giá. Nhóm đo theo hai chiều đối nghịch.

Chiều thứ nhất là phát hiện người lạ. Chỉ số chính là tỷ lệ phát hiện trong 150 phím đầu tiên của người lạ. TTD chỉ là phụ, vì median TTD chỉ tính trên những ca đã phát hiện, nên một chính sách bỏ sót nhiều vẫn có thể có median đẹp. Ca không phát hiện được xử lý là kiểm duyệt phải.

Chiều thứ hai là làm phiền chủ thật: số lần MFA mỗi giờ trên phiên chính chủ và số lần thu hồi oan. FAR, FRR, EER mức cửa sổ chỉ để chẩn đoán scorer, không phải hiệu năng của chính sách tuần tự.

[CLICK] Khi rà kết quả, em phát hiện một bẫy mẫu số. Cách tính ban đầu loại các kịch bản bị thu hồi trước N ra khỏi mẫu số. Nghĩa là chính sách thu hồi oan nhiều thì mẫu số nhỏ lại và tỷ lệ phát hiện trông cao hơn. Vì vậy nhóm báo song song cả hai cách tính.

[CLICK] Các ràng buộc được đặt trước khi chạy. Một cấu hình chỉ được coi là đạt khi thỏa cả bốn điều kiện trên từng tài khoản.
-->
