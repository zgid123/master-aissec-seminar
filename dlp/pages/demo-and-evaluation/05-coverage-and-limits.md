---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Demo đã làm đến đâu?

<table class="mt-3 w-full border-collapse text-[13px]">
  <thead>
    <tr class="border-y border-slate-300 bg-slate-100 text-left">
      <th class="w-[22%] px-4 py-2">Mức độ</th>
      <th class="px-4 py-2">Nội dung</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-slate-200">
      <td class="px-4 py-3 font-bold text-emerald-700">Đã chạy thật</td>
      <td class="px-4 py-3">Spark đọc một triệu dòng Parquet, ba cách phát hiện, policy tại cổng xuất, ghi file và nhật ký JSONL.</td>
    </tr>
    <tr class="border-b border-slate-200">
      <td class="px-4 py-3 font-bold text-amber-700">Chỉ minh họa</td>
      <td class="px-4 py-3">Luồng dữ liệu từ nguồn đến bảng dẫn xuất, vị trí của DLP trong Defense-in-Depth và cách AI cung cấp nhãn cho policy.</td>
    </tr>
    <tr class="border-b border-slate-200">
      <td class="px-4 py-3 font-bold text-rose-700">Chưa triển khai</td>
      <td class="px-4 py-3">Kho metadata và lineage tự động, endpoint/network DLP, chặn đường vòng, audit chống sửa đổi và mô hình AI đủ điều kiện triển khai thực tế.</td>
    </tr>
  </tbody>
</table>

<div class="mt-5 grid grid-cols-[1fr_1.25fr] gap-12">
  <div>
    <div class="text-[16px] font-bold text-slate-900">Kết quả kiểm tra</div>
    <div class="mt-2 text-[14px] leading-relaxed text-slate-700">9 test tự động đã chạy qua. Trường hợp bị chặn giải phóng 0 byte.</div>
  </div>
  <div class="border-l-4 border-slate-400 pl-5">
    <div class="text-[16px] font-bold text-slate-900">Cách hiểu đúng kết quả</div>
    <div class="mt-2 text-[14px] leading-relaxed text-slate-600">Demo chạy local trên dữ liệu tổng hợp. Kết quả không đại diện cho độ chính xác hoặc hiệu năng của một hệ thống DLP thực tế.</div>
  </div>
</div>

<div class="mt-5 bg-slate-900 px-5 py-2.5 text-center text-[14px] font-semibold text-white">
  Demo chứng minh một điểm kiểm soát tại đường xuất. Access control, mã hóa và các lớp bảo vệ khác vẫn cần thiết.
</div>

<!--
Mục tiêu: 0:45

Slide cuối phân biệt rõ ba mức độ để tránh nói quá phạm vi của demo.

Phần chạy thật gồm Spark, detector, policy, gateway, file output và audit JSONL. Data flow, Defense-in-Depth và vai trò AI là phần minh họa kiến trúc.

Prototype chưa theo dõi lineage tự động, chưa giám sát endpoint hoặc network, và không chặn được đường truyền đi vòng qua gateway. Audit JSONL cũng chưa chống sửa đổi.
-->
