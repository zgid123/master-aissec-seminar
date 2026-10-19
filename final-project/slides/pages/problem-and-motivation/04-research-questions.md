---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Câu hỏi nghiên cứu

<div class="-mt-2 rounded-lg bg-slate-800 px-5 py-2.5 text-[16px] leading-snug text-white">
  Làm sao phát hiện sớm người đang gõ <b>không còn là chủ tài khoản</b>, mà không liên tục làm phiền chủ thật bằng MFA?
</div>

<div class="mt-3 grid grid-cols-[0.9fr_1.5fr_0.75fr_1fr] gap-x-4 gap-y-2 items-center text-[14px] leading-snug">
  <div class="font-bold text-slate-500">CÂU HỎI</div>
  <div class="font-bold text-slate-500">GIẢ THUYẾT</div>
  <div class="font-bold text-slate-500">SO SÁNH</div>
  <div class="font-bold text-slate-500">TRẠNG THÁI</div>
  <div v-click="1" class="contents">
    <div class="border-l-4 border-sky-500 bg-sky-50 px-3 py-2"><b>RQ1</b> Ngưỡng riêng từng người</div>
    <div>H1. Cùng TTD, ngưỡng thích ứng giảm số lần MFA mỗi giờ so với ngưỡng cố định.</div>
    <div class="font-mono">B1 và P1</div>
    <div class="rounded bg-amber-100 px-2 py-1 text-center font-bold text-amber-800">Chưa kết luận</div>
  </div>
  <div v-click="2" class="contents">
    <div class="border-l-4 border-violet-500 bg-violet-50 px-3 py-2"><b>RQ2</b> Cộng dồn bằng chứng</div>
    <div>H2. CUSUM có hệ số quên phát hiện nhanh hơn quyết định từng cửa sổ ở cùng FAR.</div>
    <div class="font-mono">B0 và B1</div>
    <div class="rounded bg-amber-100 px-2 py-1 text-center font-bold text-amber-800">Chưa kết luận</div>
  </div>
  <div v-click="3" class="contents">
    <div class="border-l-4 border-slate-400 bg-slate-50 px-3 py-2"><b>RQ3</b> Cập nhật sau MFA</div>
    <div>H3. Cập nhật hồ sơ có kiểm soát giữ FRR thấp hơn hồ sơ tĩnh.</div>
    <div class="font-mono">P1 và P2</div>
    <div class="rounded bg-slate-200 px-2 py-1 text-center font-bold text-slate-600">Chưa triển khai P2</div>
  </div>
</div>

<div v-click="4" class="mt-3 text-[14px] text-slate-600">
  Điều kiện bác bỏ được đặt <b>trước</b> khi chạy: khoảng tin cậy bootstrap 95% của hiệu số theo từng người chứa 0 thì không chấp nhận giả thuyết.
</div>

<!--
Mục tiêu: 1:00

Câu hỏi trung tâm có hai mục tiêu mâu thuẫn. Ngưỡng nhạy thì phát hiện nhanh nhưng báo động giả nhiều. Ngưỡng chậm thì ít làm phiền nhưng cho kẻ lạ thêm thời gian.

[CLICK] RQ1 hỏi: nếu cá nhân hóa ngưỡng cho từng người, ở cùng thời gian phát hiện, chủ thật có bị hỏi MFA ít hơn không. So sánh B1 với P1.

[CLICK] RQ2 hỏi: cộng dồn bằng chứng qua nhiều cửa sổ bằng CUSUM có phát hiện nhanh hơn quyết định riêng từng cửa sổ không. So sánh B0 với B1.

[CLICK] RQ3 về cập nhật hồ sơ sau MFA thành công, tức cấu hình P2. P2 chưa được triển khai nên RQ3 chưa được kiểm chứng.

[CLICK] Nhóm đặt điều kiện bác bỏ trước khi chạy. Như sẽ thấy ở phần kết quả, hiện chưa có cấu hình nào đạt ràng buộc, nên RQ1 và RQ2 đều ở trạng thái chưa kết luận.
-->
