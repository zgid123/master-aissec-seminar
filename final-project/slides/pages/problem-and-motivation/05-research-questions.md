---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Câu hỏi nghiên cứu

<div class="-mt-2 rounded-lg bg-slate-800 px-5 py-4 text-[20px] leading-snug text-white">
  Phát hiện sớm <b>người lạ</b> đang dùng phiên, mà <b>không làm phiền</b> chủ thật?
</div>

<div class="mt-6 grid grid-cols-[1fr_1.7fr_0.95fr] gap-x-5 gap-y-6 items-center text-[19px] leading-snug">
  <div class="font-bold text-slate-500">CÂU HỎI</div>
  <div class="font-bold text-slate-500">GIẢ THUYẾT</div>
  <div class="font-bold text-slate-500">TRẠNG THÁI</div>
  <div v-click="1" class="contents">
    <div class="border-l-4 border-sky-500 bg-sky-50 px-3 py-3"><b>RQ1</b> Ngưỡng riêng từng người</div>
    <div>Ngưỡng riêng giúp chủ thật ít bị hỏi MFA hơn.</div>
    <div class="rounded bg-amber-100 px-2 py-2 text-center font-bold text-amber-800">Chưa kết luận</div>
  </div>
  <div v-click="2" class="contents">
    <div class="border-l-4 border-violet-500 bg-violet-50 px-3 py-3"><b>RQ2</b> Cộng dồn bằng chứng</div>
    <div>Cộng dồn bắt kẻ lạ nhanh hơn xét từng đoạn.</div>
    <div class="rounded bg-amber-100 px-2 py-2 text-center font-bold text-amber-800">Chưa kết luận</div>
  </div>
  <div v-click="3" class="contents">
    <div class="border-l-4 border-slate-400 bg-slate-50 px-3 py-3"><b>RQ3</b> Cập nhật sau MFA</div>
    <div>Tự cập nhật hồ sơ sau MFA giảm từ chối nhầm.</div>
    <div class="rounded bg-slate-200 px-2 py-2 text-center font-bold text-slate-600">Chưa làm</div>
  </div>
</div>

<!--
Mục tiêu: 0:50

Câu hỏi trung tâm có hai mục tiêu ngược nhau. Ngưỡng nhạy thì phát hiện nhanh nhưng làm phiền chủ thật. Ngưỡng chậm thì ít làm phiền nhưng cho kẻ lạ thêm thời gian.

[CLICK] RQ1: cá nhân hóa ngưỡng cho từng người có giảm số lần hỏi MFA không. So B1 với P1.

[CLICK] RQ2: cộng dồn bằng chứng qua nhiều cửa sổ có phát hiện nhanh hơn không. So B0 với B1.

[CLICK] RQ3 về cập nhật hồ sơ sau MFA, tức cấu hình P2, chưa triển khai.
-->
