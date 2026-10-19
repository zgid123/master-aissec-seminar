---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Câu hỏi nghiên cứu

<div class="-mt-2 rounded-lg bg-slate-800 px-5 py-4 text-[20px] leading-snug text-white">
  Phát hiện sớm <b>người lạ</b> đang dùng phiên, mà <b>không làm phiền</b> chủ thật?
</div>

<div class="mt-6 grid grid-cols-[1fr_1.45fr_1.25fr] gap-x-5 gap-y-5 items-center text-[19px] leading-snug">
  <div class="font-bold text-slate-500">CÂU HỎI</div>
  <div class="font-bold text-slate-500">GIẢ THUYẾT</div>
  <div class="font-bold text-slate-500">KẾT QUẢ BƯỚC ĐẦU</div>
  <div v-click="1" class="contents">
    <div class="border-l-4 border-sky-500 bg-sky-50 px-3 py-3"><b>RQ1</b> Ngưỡng riêng từng người</div>
    <div>Ngưỡng riêng giúp chủ thật ít bị hỏi MFA hơn.</div>
    <div class="rounded bg-amber-100 px-3 py-2 text-amber-900"><b>Tùy mô hình</b><div class="text-[16px]">Đúng với L1, chưa đúng với IF.</div></div>
  </div>
  <div v-click="2" class="contents">
    <div class="border-l-4 border-violet-500 bg-violet-50 px-3 py-3"><b>RQ2</b> Cộng dồn bằng chứng</div>
    <div>Cộng dồn bắt kẻ lạ tốt hơn xét từng đoạn.</div>
    <div class="rounded bg-emerald-100 px-3 py-2 text-emerald-900"><b>Ủng hộ</b><div class="text-[16px]">Phát hiện tăng từ 0,36 lên 0,63.</div></div>
  </div>
  <div v-click="3" class="contents">
    <div class="border-l-4 border-slate-400 bg-slate-50 px-3 py-3"><b>RQ3</b> Cập nhật sau MFA</div>
    <div>Cập nhật hồ sơ sau MFA giảm từ chối nhầm.</div>
    <div class="rounded bg-slate-200 px-3 py-2 text-slate-700"><b>Đã thiết kế</b><div class="text-[16px]">Cần dữ liệu nhiều ngày để đo.</div></div>
  </div>
</div>

<!--
Mục tiêu: 0:50

Câu hỏi trung tâm có hai mục tiêu ngược nhau. Ngưỡng nhạy thì phát hiện nhanh nhưng làm phiền chủ thật. Ngưỡng chậm thì ít làm phiền nhưng cho kẻ lạ thêm thời gian. Em nêu luôn kết quả bước đầu để mọi người dễ theo dõi.

[CLICK] RQ1: ngưỡng riêng cho từng người. Với mô hình L1, ngưỡng riêng vừa bắt nhiều hơn vừa hỏi MFA ít hơn. Với Isolation Forest thì ngược lại, hỏi MFA nhiều hơn. Nên câu trả lời là tùy mô hình.

[CLICK] RQ2: cộng dồn bằng chứng. Với Isolation Forest, tỷ lệ phát hiện tăng từ 0,36 lên 0,63 trong khi số lần hỏi MFA chỉ tăng nhẹ. Đây là kết quả rõ nhất, dù chưa so ở đúng cùng một mức hỏi MFA nên nhóm gọi là bước đầu.

[CLICK] RQ3 về cập nhật hồ sơ sau MFA, tức cấu hình P2: đã thiết kế quy tắc an toàn, nhưng cần dữ liệu nhiều ngày mới đo được.
-->