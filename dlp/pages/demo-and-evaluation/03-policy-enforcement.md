---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Nơi nhận quyết định cách xử lý file

<div class="mt-3 text-[16px] leading-relaxed text-slate-700">
  Policy xét người gửi, hành động, nhãn dữ liệu và nơi nhận. Ba lần chạy dưới đây dùng cùng một export gateway.
</div>

<table class="mt-5 w-full border-collapse text-[14px]">
  <thead>
    <tr class="border-y border-slate-300 bg-slate-100 text-left">
      <th class="px-4 py-3">File gửi đi</th>
      <th class="px-4 py-3">Nơi nhận</th>
      <th class="px-4 py-3">Kết quả</th>
      <th class="px-4 py-3">Bằng chứng tại nơi nhận</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-slate-200">
      <td class="px-4 py-4"><code>customer_segments</code><br><span class="text-slate-500">Có PII và dữ liệu nhạy cảm</span></td>
      <td class="px-4 py-4">Kho phân tích nội bộ<br><span class="text-slate-500">Đã được duyệt</span></td>
      <td class="px-4 py-4 text-[18px] font-black text-emerald-700">CHO PHÉP</td>
      <td class="px-4 py-4">18 tệp · 19.589.777 byte</td>
    </tr>
    <tr class="border-b border-slate-200 bg-rose-50">
      <td class="px-4 py-4"><code>customer_segments</code><br><span class="text-slate-500">Giữ nguyên nội dung</span></td>
      <td class="px-4 py-4">Ổ đĩa của đối tác<br><span class="text-slate-500">Chưa được duyệt</span></td>
      <td class="px-4 py-4 text-[18px] font-black text-rose-700">CHẶN</td>
      <td class="px-4 py-4 font-bold text-rose-700">0 tệp · 0 byte</td>
    </tr>
    <tr class="border-b border-slate-200 bg-emerald-50">
      <td class="px-4 py-4"><code>segment_summary</code><br><span class="text-slate-500">Chỉ còn số liệu tổng hợp</span></td>
      <td class="px-4 py-4">Ổ đĩa của đối tác</td>
      <td class="px-4 py-4 text-[18px] font-black text-emerald-700">CHO PHÉP</td>
      <td class="px-4 py-4">4 tệp · 1.384 byte</td>
    </tr>
  </tbody>
</table>

<div class="mt-5 grid grid-cols-[1.25fr_1fr] gap-10">
  <div class="text-[16px] leading-relaxed text-slate-700">
    Đối tác chỉ cần số khách theo vùng và phân khúc. Sau khi file chi tiết bị chặn, nhóm dữ liệu tạo một bảng tổng hợp rồi gửi lại.
  </div>
  <div class="border-l-4 border-sky-500 pl-5 text-[14px] leading-relaxed text-slate-600">
    Mỗi lần xử lý đều ghi lại người gửi, nơi nhận, policy khớp và số byte đã được ghi.
  </div>
</div>

<!--
Mục tiêu: 1:00

Policy không chặn mọi file có dữ liệu nhạy cảm. File chi tiết vẫn được phép dùng trong kho nội bộ đã duyệt.

Khi cùng file đó được gửi sang ổ đĩa ngoài, gateway chặn trước lệnh ghi nên nơi nhận có 0 tệp và 0 byte.

Đối tác không cần dữ liệu của từng khách hàng. Nhóm dữ liệu tạo segment_summary chỉ còn vùng, phân khúc, số lượng và mức chi tiêu trung bình. DLP quét lại và cho phép gửi bản tổng hợp.
-->
