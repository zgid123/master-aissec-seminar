---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Tình huống: gửi dữ liệu phân khúc cho đối tác

<div class="mt-2 text-[17px] leading-relaxed text-slate-700">
  Phong là chuyên viên dữ liệu của một công ty bán lẻ. Phong được phép đọc dữ liệu khách hàng và chạy Spark để tạo bảng phân khúc cho một chiến dịch marketing.
</div>

<div class="mt-5 grid grid-cols-[1fr_40px_1fr_40px_1fr_40px_1fr] items-center text-center">
  <div class="border-b-4 border-sky-500 py-4">
    <div class="text-[16px] font-bold">Dữ liệu khách hàng</div>
    <div class="mt-1 text-[13px] text-slate-600">Email, SĐT, giao dịch</div>
  </div>
  <div class="text-[26px] text-slate-400">+</div>
  <div class="border-b-4 border-violet-500 py-4">
    <div class="text-[16px] font-bold">Ghi chú hỗ trợ</div>
    <div class="mt-1 text-[13px] text-slate-600">Văn bản tự do</div>
  </div>
  <div class="text-[26px] text-slate-400">+</div>
  <div class="border-b-4 border-amber-500 py-4">
    <div class="text-[16px] font-bold">Dữ liệu chiến dịch</div>
    <div class="mt-1 text-[13px] text-slate-600">Mã nội bộ</div>
  </div>
  <div class="text-[26px] text-slate-400">→</div>
  <div class="border-b-4 border-rose-500 bg-rose-50 py-4">
    <div class="text-[16px] font-bold">customer_segments</div>
    <div class="mt-1 text-[13px] text-slate-600">1 triệu dòng Parquet</div>
  </div>
</div>

<table class="mt-6 w-full border-collapse text-[12px]">
  <thead>
    <tr class="border-y border-slate-300 bg-slate-100 text-left">
      <th class="px-3 py-2">customer_id</th>
      <th class="px-3 py-2">email</th>
      <th class="px-3 py-2">phone</th>
      <th class="px-3 py-2">campaign_code</th>
      <th class="px-3 py-2">support_note</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-slate-200 bg-rose-50">
      <td class="px-3 py-3 font-mono text-rose-700">CUS-00000000</td>
      <td class="px-3 py-3 font-mono text-rose-700">customer0@example.test</td>
      <td class="px-3 py-3 font-mono text-rose-700">0900000000</td>
      <td class="px-3 py-3 font-mono text-amber-700">AURORA-2026</td>
      <td class="px-3 py-3 text-violet-800">Đang điều trị HIV…</td>
    </tr>
  </tbody>
</table>

<div class="mt-6 grid grid-cols-[1fr_1.1fr] gap-10 text-[16px] leading-relaxed">
  <div>
    <b>Kiểm soát hiện có:</b> Phong đăng nhập đúng tài khoản và có quyền đọc Data Lake.
  </div>
  <div class="border-l-4 border-rose-500 pl-5">
    <b class="text-rose-700">Vấn đề:</b> quyền đọc không cho biết file này có được gửi sang ổ đĩa của đối tác hay không.
  </div>
</div>

<!--
Mục tiêu: 0:45

Phong có quyền đọc dữ liệu và chạy Spark, nên access control không phát hiện điều gì bất thường.

Spark job ghép dữ liệu khách hàng với ghi chú hỗ trợ và dữ liệu chiến dịch. Bảng customer_segments phục vụ phân tích nhưng vẫn giữ email, số điện thoại, mã chiến dịch nội bộ và một số ghi chú sức khỏe.

Đây là điểm bắt đầu của DLP: kiểm tra nội dung file trước khi nó rời hệ thống.
-->
