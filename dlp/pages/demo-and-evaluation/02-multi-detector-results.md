---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# DLP phát hiện những gì trong file?

<table class="mt-4 w-full border-collapse text-[14px]">
  <thead>
    <tr class="border-y border-slate-300 bg-slate-100 text-left">
      <th class="px-4 py-2">Nội dung</th>
      <th class="px-4 py-2">Cách phát hiện</th>
      <th class="px-4 py-2">Kết quả quét</th>
      <th class="px-4 py-2">Nhãn</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-slate-200">
      <td class="px-4 py-2.5"><b>Email, SĐT và mã khách hàng</b></td>
      <td class="px-4 py-2.5">Tên cột và quy tắc định dạng</td>
      <td class="px-4 py-2.5"><b>1.000.000</b> dòng</td>
      <td class="px-4 py-2.5">PII</td>
    </tr>
    <tr class="border-b border-slate-200">
      <td class="px-4 py-2.5"><b>Mã AURORA-2026</b></td>
      <td class="px-4 py-2.5">So khớp fingerprint SHA-256 đã đăng ký</td>
      <td class="px-4 py-2.5"><b>5</b> dòng</td>
      <td class="px-4 py-2.5">Chiến dịch nội bộ</td>
    </tr>
    <tr class="border-b border-slate-200">
      <td class="px-4 py-2.5"><b>“Đang điều trị HIV…”</b></td>
      <td class="px-4 py-2.5">Mô hình phân loại theo ngữ cảnh</td>
      <td class="px-4 py-2.5"><b>5</b> dòng</td>
      <td class="px-4 py-2.5">Thông tin sức khỏe</td>
    </tr>
  </tbody>
</table>

<div class="mt-5 grid grid-cols-[1.25fr_1fr] gap-8">
  <div class="text-[16px] leading-relaxed text-slate-700">
    Quy tắc định dạng phù hợp với email và số điện thoại. Nó không hiểu ý nghĩa của một câu văn. Mô hình ngữ cảnh bổ sung phần còn thiếu đó.
  </div>
  <div class="border-l-4 border-violet-500 pl-4 text-[14px] leading-relaxed text-slate-600">
    Mô hình trong demo được huấn luyện bằng một tập câu tổng hợp nhỏ. Nó chỉ minh họa cách đưa AI vào bước phát hiện, chưa đủ để dùng trong hệ thống thật.
  </div>
</div>

<div class="mt-5 max-w-[760px] mx-auto rounded-lg bg-slate-900 px-5 py-2.5 text-center text-[15px] font-semibold text-white shadow-sm">
  Kết quả quét chỉ là đầu vào. Policy mới quyết định file có được gửi đi hay không.
</div>

<!--
Mục tiêu: 0:50

Ba bộ phát hiện xử lý ba loại tín hiệu khác nhau.

Tên cột và regex phát hiện dữ liệu có cấu trúc. Fingerprint tìm mã chiến dịch đã được đăng ký trước. Mô hình ngữ cảnh nhận ra câu tiết lộ tình trạng sức khỏe dù câu đó không có định dạng đặc biệt.

Mô hình dùng dữ liệu tổng hợp nhỏ, vì vậy không trình bày confidence hoặc coi kết quả này là accuracy production.
-->
