---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Kết luận và hướng phát triển

<div class="mt-5 grid grid-cols-[1.1fr_1fr] gap-6 text-[14.5px] leading-snug">
  <div class="flex flex-col gap-2.5">
    <div class="text-[12px] font-bold uppercase tracking-wide text-slate-500">Điều rút ra</div>
    <div class="border-l-4 border-sky-500 bg-sky-50 px-4 py-2">Cộng dồn bằng CUSUM giúp phát hiện nhiều hơn chấm từng cửa sổ: với Isolation Forest, từ 0,361 lên 0,627.</div>
    <div v-click class="border-l-4 border-rose-500 bg-rose-50 px-4 py-2">Nhưng <b>0/4 tài khoản</b> đạt cùng lúc ràng buộc phát hiện, độ trễ và số lần hỏi MFA. Hệ thống chưa sẵn sàng triển khai.</div>
    <div v-click class="border-l-4 border-emerald-500 bg-emerald-50 px-4 py-2">Đóng góp chính là <b>quy trình đánh giá kiểm chứng được</b>: đo theo số phím và MFA mỗi giờ, tránh bẫy mẫu số, replay độc lập khớp hoàn toàn.</div>
  </div>
  <div v-click>
    <div class="text-[12px] font-bold uppercase tracking-wide text-slate-500">Bước tiếp theo</div>
    <ol class="mt-2 list-decimal !pl-5 [&_li]:!my-2">
      <li>Dùng collector có sẵn thu dữ liệu nhịp gõ thật của người tình nguyện, chạy lại đúng quy trình này.</li>
      <li>Thử thêm đặc trưng và chỉnh ngưỡng để tìm cấu hình đạt ràng buộc.</li>
      <li>Cài P2: cập nhật hồ sơ sau khi qua MFA.</li>
    </ol>
  </div>
</div>

<!--
Mục tiêu: 0:45

Tóm lại, cộng dồn bằng CUSUM giúp phát hiện nhiều hơn so với chấm từng cửa sổ: với Isolation Forest từ 0,361 lên 0,627.

[CLICK] Nhưng chưa tài khoản nào đạt cùng lúc các ràng buộc, nên nhóm không khẳng định hệ thống dùng được ngay.

[CLICK] Đóng góp chính là quy trình đánh giá kiểm lại được, đo đúng thứ người vận hành quan tâm.

[CLICK] Bước tiếp theo khá rõ: thu dữ liệu thật bằng collector đã có và chạy lại quy trình; thử thêm đặc trưng, chỉnh ngưỡng; và cài P2.

Em xin cảm ơn thầy cô và các bạn đã lắng nghe.
-->
