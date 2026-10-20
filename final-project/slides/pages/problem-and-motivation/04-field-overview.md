---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Nghiên cứu liên quan

<p class="sub">Phân loại, đặc trưng và đánh giá</p>

<div class="mt-2 flex items-center justify-between bg-slate-100 rounded-full px-4 py-2 text-[14px] font-medium text-slate-700 border border-slate-200">
  <span><span class="text-sky-800 font-bold">2005</span> Gunetti</span>
  <span class="text-slate-400">&bull;</span>
  <span><span class="text-sky-800 font-bold">2009</span> Killourhy</span>
  <span class="text-slate-400">&bull;</span>
  <span><span class="text-sky-800 font-bold">2012</span> Bours</span>
  <span class="text-slate-400">&bull;</span>
  <span><span class="text-sky-800 font-bold">2020</span> Kiyani</span>
  <span class="text-slate-400">&bull;</span>
  <span><span class="text-sky-800 font-bold">2021–24</span> TypeNet, TypeFormer</span>
  <span class="text-slate-400">&bull;</span>
  <span><span class="text-sky-800 font-bold">2025</span> KVC-onGoing</span>
</div>

<div class="mt-4 rounded-lg border border-slate-200 overflow-hidden shadow-sm">
  <table class="w-full text-[16px] leading-snug text-left border-collapse">
    <thead>
      <tr class="bg-slate-100 font-bold text-slate-800 border-b border-slate-200 text-[14px]">
        <th class="p-3 w-[26%]">Hướng và đặc trưng</th>
        <th class="p-3 w-[36%]">Đại diện</th>
        <th class="p-3 w-[38%]">Đánh giá với tiếp quản phiên</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-100">
      <tr v-click="1">
        <td class="p-3 font-medium text-slate-800">Thống kê/khoảng cách</td>
        <td class="p-3 text-slate-700">Gunetti 2005; Killourhy 2009</td>
        <td class="p-3 text-slate-600">Có quy trình so sánh; chưa có trục TTD</td>
      </tr>
      <tr v-click="2">
        <td class="p-3 font-medium text-sky-900 bg-sky-50/50">Xác thực liên tục</td>
        <td class="p-3 text-slate-700 bg-sky-50/50">Bours 2012; Kiyani 2020</td>
        <td class="p-3 text-emerald-800 bg-sky-50/50 font-semibold">Gần bài toán nhất; nhóm thêm TTD, MFA/giờ</td>
      </tr>
      <tr v-click="3">
        <td class="p-3 font-medium text-slate-800">Học sâu</td>
        <td class="p-3 text-slate-700">TypeNet 2021; TypeFormer 2024</td>
        <td class="p-3 text-slate-600">Minh họa; khác miền; chưa tái hiện</td>
      </tr>
      <tr v-click="4">
        <td class="p-3 font-medium text-slate-800">Benchmark</td>
        <td class="p-3 text-slate-700">KVC-onGoing 2025 (hơn 185.000 người)</td>
        <td class="p-3 text-slate-600">Chuẩn xác minh; không đo đổi người giữa phiên</td>
      </tr>
    </tbody>
  </table>
</div>

<div v-click="4" class="mt-4 rounded-lg bg-slate-900 px-4 py-3 text-[16px] text-white flex items-center justify-between">
  <div><b>Khoảng trống:</b> FAR/FRR/EER không cho biết cần bao nhiêu phím &rarr; thêm <b>TTD</b> và <b>MFA/giờ</b>.</div>
</div>

<!--
Mục tiêu: 1:10

Nghiên cứu có thể chia theo loại văn bản và theo phương pháp. Hướng thống kê dùng thời gian giữ phím và khoảng nghỉ; hướng học sâu như TypeNet, TypeFormer học trực tiếp từ chuỗi phím, nhưng khác miền thiết bị và chỉ đo xác minh. KVC-onGoing là benchmark xác minh với hơn 185.000 người. Phần lớn công trình báo cáo FAR, FRR, EER, mà các chỉ số này không cho biết cần bao nhiêu phím để phát hiện. Vì vậy chúng em đo thêm thời gian phát hiện và số lần xác thực lại.
-->
