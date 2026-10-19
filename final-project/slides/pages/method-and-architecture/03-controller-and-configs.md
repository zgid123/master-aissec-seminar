---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Bộ điều khiển phiên và các cấu hình

<div class="mt-1 grid grid-cols-[1.15fr_1fr] gap-5 items-start">
  <div>
    <img src="/figures/hinh3_trang_thai.png" class="w-full" alt="Máy trạng thái phiên" />
    <div class="mt-1 text-[13px] text-slate-600 leading-snug">
      MFA đạt thì đặt S về 0 và tạm ngừng cảnh báo mức h₁ trong 2 cửa sổ (cooldown).
    </div>
  </div>
  <div class="flex flex-col gap-2 text-[14px] leading-snug">
    <div v-click class="border-l-4 border-slate-500 bg-slate-50 px-3 py-1.5"><b class="font-mono">B0</b> Quyết định từng cửa sổ, ngưỡng chung.</div>
    <div v-click class="border-l-4 border-sky-500 bg-sky-50 px-3 py-1.5"><b class="font-mono">B1</b> CUSUM có hệ số quên, ngưỡng chung. λ ∈ {0,9; 1}, k ∈ {0,25; 0,5; 1}.</div>
    <div v-click class="border-l-4 border-violet-500 bg-violet-50 px-3 py-1.5"><b class="font-mono">P1</b> Giữ λ, k của B1; <b>h₁ riêng từng tài khoản</b>.</div>
    <div v-click class="border-l-4 border-indigo-400 bg-indigo-50 px-3 py-1.5"><b class="font-mono">B1 λ=1</b> Đối chứng không quên, chọn lại k và ngưỡng.</div>
    <div v-click class="border-l-4 border-slate-300 bg-white px-3 py-1.5 text-slate-500"><b class="font-mono">P2</b> P1 cộng cập nhật hồ sơ sau MFA. Chưa triển khai.</div>
    <div v-click class="mt-1 rounded bg-slate-800 px-3 py-1.5 text-white">Mọi tham số chọn trên <b>validation</b>, lưới h₁ ∈ {0,5; 1; 2; 3; 5; 8; 12}.</div>
  </div>
</div>

<!--
Mục tiêu: 0:40

Bộ điều khiển có ba trạng thái. S dưới h1 thì phiên chạy bình thường. S vượt h1 thì hỏi MFA; đạt thì S về 0, trượt hoặc S vượt h2 thì thu hồi phiên.

[CLICK] B0 là đường cơ sở: mỗi cửa sổ tự quyết, ngưỡng chung.

[CLICK] B1 thêm CUSUM, vẫn ngưỡng chung.

[CLICK] P1 giữ B1 nhưng ngưỡng h1 riêng cho từng người.

[CLICK] B1 lambda bằng 1 là đối chứng không có hệ số quên.

[CLICK] P2 chưa triển khai.

[CLICK] Mọi tham số chọn trên tập validation, không nhìn tập test.
-->
