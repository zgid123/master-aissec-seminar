---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Kết luận và hướng phát triển

<div class="mt-7 grid grid-cols-[1.1fr_1fr] gap-8 text-[21px] leading-snug">
  <div class="flex flex-col gap-4">
    <div class="font-bold text-slate-600">Điều rút ra</div>
    <div class="border-l-4 border-sky-500 bg-sky-50 px-4 py-4"><b>Cộng dồn</b> bắt người lạ tốt hơn xét từng đoạn.</div>
    <div v-click="2" class="border-l-4 border-rose-500 bg-rose-50 px-4 py-4">Chỉ rõ <b>đánh đổi</b>: ngưỡng càng nhạy, chủ thật càng bị hỏi MFA nhiều.</div>
    <div v-click="3" class="border-l-4 border-emerald-500 bg-emerald-50 px-4 py-4">Có <b>quy trình đánh giá</b> kiểm lại được, dùng ngay cho dữ liệu mới.</div>
  </div>
  <div v-click="4">
    <div class="font-bold text-slate-600">Bước tiếp theo</div>
    <ol class="mt-3 list-decimal !pl-6 [&_li]:!my-5">
      <li>Thu dữ liệu thật từ người tình nguyện bằng công cụ đã có, rồi chạy lại.</li>
      <li>Thử thêm đặc trưng và chỉnh lại ngưỡng.</li>
      <li>Làm P2: cập nhật hồ sơ sau MFA.</li>
    </ol>
  </div>
</div>
<!--
Mục tiêu: 0:45

Tóm lại, cộng dồn bằng CUSUM giúp phát hiện nhiều hơn so với chấm từng cửa sổ: với Isolation Forest từ 0,361 lên 0,627.

[CLICK] Kết quả cũng cho thấy rõ đánh đổi: ngưỡng càng nhạy thì chủ thật càng bị hỏi MFA nhiều. Với ngưỡng nhóm đặt khá chặt, cần thêm dữ liệu thật để chỉnh.

[CLICK] Đóng góp chính là quy trình đánh giá kiểm lại được, đo đúng thứ người vận hành quan tâm.

[CLICK] Bước tiếp theo khá rõ: thu dữ liệu thật bằng collector đã có và chạy lại quy trình; thử thêm đặc trưng, chỉnh ngưỡng; và cài P2.

Em xin cảm ơn thầy cô và các bạn đã lắng nghe.
-->
