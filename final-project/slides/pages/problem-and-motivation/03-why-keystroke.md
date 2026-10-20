---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Vì sao chọn nhịp gõ

<p class="sub">So sánh với các biện pháp kiểm soát phiên</p>

<div class="mt-4 grid grid-cols-[1.35fr_1fr] gap-5 items-stretch">
  <div class="rounded-lg border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-center">
    <table class="w-full text-[17px] leading-snug text-left">
      <thead>
        <tr class="bg-slate-100 text-slate-800 font-bold border-b border-slate-200 text-[15px]">
          <th class="p-3.5">Biện pháp</th>
          <th class="p-3.5 text-emerald-800 bg-emerald-50/60">Ưu điểm</th>
          <th class="p-3.5 text-rose-800 bg-rose-50/60">Giới hạn</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">
        <tr class="hover:bg-slate-50">
          <td class="p-3.5 font-medium text-slate-800">Timeout phiên</td>
          <td class="p-3.5 text-slate-600">Giới hạn thời gian phiên</td>
          <td class="p-3.5 text-slate-600">Kẻ lạ tiếp tục thao tác vẫn giữ phiên</td>
        </tr>
        <tr class="hover:bg-slate-50">
          <td class="p-3.5 font-medium text-slate-800">Xác thực lại định kỳ</td>
          <td class="p-3.5 text-slate-600">Điểm kiểm tra rõ</td>
          <td class="p-3.5 text-slate-600">Gây gián đoạn; còn khoảng hở giữa 2 lần</td>
        </tr>
        <tr class="hover:bg-slate-50">
          <td class="p-3.5 font-medium text-slate-800">IP, thiết bị</td>
          <td class="p-3.5 text-slate-600">Thêm tín hiệu rủi ro</td>
          <td class="p-3.5 text-slate-600">Dùng máy đang mở: tín hiệu không đổi</td>
        </tr>
        <tr class="bg-sky-50/80 font-semibold border-t-2 border-sky-400">
          <td class="p-3.5 text-sky-900">Nhịp gõ phím</td>
          <td class="p-3.5 text-emerald-800">Thu thụ động bằng bàn phím sẵn có</td>
          <td class="p-3.5 text-rose-800">Cần đủ phím; không gõ thì không có chứng cứ</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="flex flex-col justify-between h-full gap-3 text-[16px] leading-snug">
    <div class="flex-1 border-l-4 border-sky-500 bg-sky-50 p-3.5 rounded-r flex flex-col justify-center">
      <b>Mỗi người gõ một kiểu</b>
      <span class="text-slate-600 text-[14px] mt-1">(136 triệu lần nhấn phím của 168.000 người, Dhakal 2018).</span>
    </div>
    <div v-click="1" class="flex-1 border-l-4 border-emerald-500 bg-emerald-50 p-3.5 rounded-r flex flex-col justify-center">
      <b class="text-emerald-900">Ưu điểm lớn nhất:</b>
      <span class="text-slate-700 mt-1">Thu thụ động, không cần thêm phần cứng, có bằng chứng ngay khi thao tác gõ.</span>
    </div>
    <div v-click="1" class="flex-1 border-l-4 border-rose-500 bg-rose-50 p-3.5 rounded-r flex flex-col justify-center">
      <b class="text-rose-900">Nhược điểm lớn nhất:</b>
      <span class="text-slate-700 mt-1">Không gõ thì không có bằng chứng &rarr; là <b>lớp bổ sung</b>, không thay thế MFA.</span>
    </div>
  </div>
</div>

<!--
Mục tiêu: 0:45

Mỗi biện pháp đều có chỗ hở, nhịp gõ không phải ngoại lệ. Chúng em chọn nhịp gõ vì thu được thụ động bằng bàn phím sẵn có, và mỗi người gõ một kiểu. Điểm yếu lớn nhất là cần đủ lượng phím. Vì vậy nhịp gõ bổ sung cho các biện pháp khác.
-->
