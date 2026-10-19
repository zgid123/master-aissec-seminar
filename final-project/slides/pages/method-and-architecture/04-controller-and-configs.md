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
Mục tiêu: 0:50

Bộ điều khiển là máy ba trạng thái. Phiên ở ACTIVE khi S dưới h1. S vào khoảng h1 đến h2 thì chuyển sang chờ MFA. MFA đạt thì quay lại ACTIVE, S về 0 và tạm ngừng cảnh báo hai cửa sổ. MFA trượt, hoặc S vượt h2, thì thu hồi phiên.

[CLICK] B0 là đường cơ sở: mỗi cửa sổ tự quyết, ngưỡng chung cho mọi người.

[CLICK] B1 thêm CUSUM có hệ số quên, vẫn ngưỡng chung.

[CLICK] P1 giữ nguyên lambda và k của B1, chỉ cá nhân hóa ngưỡng h1 theo từng tài khoản. So B1 với P1 là trả lời RQ1.

[CLICK] B1 lambda bằng 1 là đối chứng để xem hệ số quên có tác dụng không.

[CLICK] P2 là hướng mở rộng, chưa triển khai.

[CLICK] Tất cả tham số được chọn trên tập validation bằng lưới cố định, không nhìn tập test.
-->
