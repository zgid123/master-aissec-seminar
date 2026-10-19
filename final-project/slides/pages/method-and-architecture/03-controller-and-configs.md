---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Bộ điều khiển phiên và các cấu hình

<div class="mt-5 flex items-center justify-between gap-2 text-[20px] text-center">
  <div class="w-[210px] rounded-lg border-2 border-emerald-500 bg-emerald-50 px-3 py-5"><b>Đang hoạt động</b><div class="text-[15px] text-slate-600">điểm rủi ro thấp</div></div>
  <div class="flex-1 text-[16px] text-amber-700">vượt mức 1 →<br><span class="text-emerald-700">← MFA đạt, điểm về 0</span></div>
  <div class="w-[210px] rounded-lg border-2 border-amber-500 bg-amber-50 px-3 py-5"><b>Hỏi MFA</b><div class="text-[15px] text-slate-600">chờ xác thực lại</div></div>
  <div class="flex-1 text-[16px] text-rose-700">MFA trượt →<br>hoặc vượt mức 2</div>
  <div class="w-[210px] rounded-lg border-2 border-rose-500 bg-rose-50 px-3 py-5"><b>Thu hồi phiên</b><div class="text-[15px] text-slate-600">đăng xuất ngay</div></div>
</div>

<div class="mt-8 grid grid-cols-4 gap-3 text-[18px] leading-snug">
  <div v-click class="rounded-lg border-t-4 border-slate-500 bg-slate-50 px-4 py-4"><b class="font-mono text-[19px]">B0</b><br>Xét riêng từng đoạn, ngưỡng chung.</div>
  <div v-click class="rounded-lg border-t-4 border-sky-500 bg-sky-50 px-4 py-4"><b class="font-mono text-[19px]">B1</b><br>Cộng dồn, ngưỡng chung.</div>
  <div v-click class="rounded-lg border-t-4 border-violet-500 bg-violet-50 px-4 py-4"><b class="font-mono text-[19px]">P1</b><br>Cộng dồn, <b>ngưỡng riêng</b> từng người.</div>
  <div v-click class="rounded-lg border-t-4 border-slate-300 bg-white px-3 py-3 text-slate-500"><b class="font-mono text-[19px]">P2</b><br>P1 và tự cập nhật hồ sơ. Chưa làm.</div>
</div>

<div v-click class="mt-6 rounded-lg bg-slate-800 px-5 py-3 text-[18px] text-white">
  Mọi tham số chọn trên tập <b>validation</b>; tập test chỉ mở một lần ở cuối.
</div>

<!--
Mục tiêu: 0:40

Bộ điều khiển có ba trạng thái. Điểm rủi ro thấp thì phiên chạy bình thường. Vượt mức một thì hỏi MFA; đạt thì điểm về 0, trượt hoặc vượt mức hai thì thu hồi phiên.

[CLICK] B0 là đường cơ sở: mỗi đoạn tự quyết, ngưỡng chung.

[CLICK] B1 thêm cộng dồn, vẫn ngưỡng chung.

[CLICK] P1 giữ B1 nhưng ngưỡng riêng cho từng người.

[CLICK] P2 chưa triển khai.

[CLICK] Mọi tham số chọn trên tập validation, không nhìn tập test.
-->