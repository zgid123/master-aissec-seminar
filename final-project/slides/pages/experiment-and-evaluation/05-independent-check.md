---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Đối chiếu độc lập kết quả

<div class="-mt-1 text-[15px] text-slate-600">Bộ đánh giá của mục 4 được viết riêng, không dùng chung mã với pipeline mô hình.</div>

<div class="mt-3 grid grid-cols-2 gap-5 text-[14px] leading-snug">
  <div class="rounded-lg border-t-4 border-sky-500 bg-white px-4 py-3 shadow-sm">
    <div class="font-bold text-sky-800">1. Chấm lại mức cửa sổ</div>
    <div class="mt-2 grid grid-cols-2 gap-2 text-center">
      <div class="rounded bg-sky-50 py-1.5"><div class="text-[22px] font-black text-sky-700">1.536</div>hàng điểm cửa sổ</div>
      <div class="rounded bg-sky-50 py-1.5"><div class="text-[22px] font-black text-sky-700">8/8</div>cặp scorer, tài khoản</div>
    </div>
    <div class="mt-2">FAR, FRR, EER khớp trong sai số 10<sup>−12</sup>, có receipt truy vết đầu vào và đầu ra.</div>
  </div>
  <div v-click class="rounded-lg border-t-4 border-emerald-500 bg-white px-4 py-3 shadow-sm">
    <div class="font-bold text-emerald-800">2. Replay lại chính sách</div>
    <div class="mt-2 grid grid-cols-3 gap-2 text-center">
      <div class="rounded bg-emerald-50 py-1.5"><div class="text-[20px] font-black text-emerald-700">29.183</div>quyết định</div>
      <div class="rounded bg-emerald-50 py-1.5"><div class="text-[20px] font-black text-emerald-700">7.600</div>sự kiện</div>
      <div class="rounded bg-emerald-50 py-1.5"><div class="text-[20px] font-black text-emerald-700">3.520</div>kết cục</div>
    </div>
    <div class="mt-2">B0, B1, P1, B1 λ=1 chạy lại từ điểm rủi ro trong log, <b>khớp hoàn toàn</b> cả phát hiện, TTD, MFA/giờ và thu hồi oan.</div>
  </div>
</div>

<div v-click class="mt-3 grid grid-cols-2 gap-5 text-[14px] leading-snug">
  <div class="border-l-4 border-violet-500 bg-violet-50 px-3 py-2">
    <b>Phát hiện nhờ đối chiếu:</b> bẫy mẫu số của tỷ lệ phát hiện, cách đếm kịch bản và prefix, định nghĩa MFA/giờ theo hai đồng hồ.
  </div>
  <div class="border-l-4 border-slate-500 bg-slate-50 px-3 py-2">
    <b>Chưa kiểm lại:</b> bước fit scorer, cách ghép sự kiện thô và thời lượng ghi dùng làm mẫu số MFA/giờ.
  </div>
</div>

<!--
Mục tiêu: 0:45

Một yêu cầu của nhóm là mỗi con số phải truy ngược được về file kết quả. Vì vậy phần đánh giá được viết thành một bộ công cụ riêng, không dùng chung mã với pipeline mô hình.

Bước một: chấm lại 1.536 hàng điểm cửa sổ cho 8 cặp scorer và tài khoản. FAR, FRR, EER khớp đến sai số 10 mũ trừ 12.

[CLICK] Bước hai: chạy lại toàn bộ bốn chính sách từ điểm rủi ro trong log. Kết quả khớp hoàn toàn: 29.183 quyết định, 7.600 sự kiện MFA và thu hồi, 3.520 kết cục kịch bản.

[CLICK] Chính quá trình đối chiếu này giúp tìm ra bẫy mẫu số và lỗi đếm kịch bản như prefix. Nhóm cũng nói rõ phạm vi: phép đối chiếu kiểm tra phần cài đặt chính sách, chưa kiểm lại bước fit scorer hay cách ghép dữ liệu thô.
-->
