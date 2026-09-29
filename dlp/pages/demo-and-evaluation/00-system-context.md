---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Bối cảnh và mục tiêu

<DemoProgress :active="1" />

<div class="mt-5 grid grid-cols-[1fr_58px_1fr_58px_1fr] items-center gap-3">
  <div class="border-t-4 border-sky-500 bg-sky-50 px-5 py-5">
    <div class="text-[12px] font-black tracking-[0.14em] text-sky-700">DỮ LIỆU CỦA CÔNG TY</div>
    <div class="mt-3 text-[20px] font-bold text-slate-900">Data Lake và Spark</div>
    <div class="mt-3 text-[15px] leading-relaxed text-slate-600">Một triệu hồ sơ khách hàng, gồm thông tin liên hệ, giao dịch và ghi chú hỗ trợ.</div>
  </div>

  <div class="text-center text-[28px] text-slate-400">→</div>

  <div v-click class="border-t-4 border-slate-500 bg-slate-100 px-5 py-5">
    <div class="text-[12px] font-black tracking-[0.14em] text-slate-600">NGƯỜI THỰC HIỆN</div>
    <div class="mt-3 text-[20px] font-bold text-slate-900">Phong, chuyên viên dữ liệu</div>
    <div class="mt-3 text-[15px] leading-relaxed text-slate-600">Phong có quyền đọc dữ liệu và chạy Spark để chuẩn bị báo cáo.</div>
  </div>

  <div class="text-center text-[28px] text-slate-400">→</div>

  <div v-click class="border-t-4 border-emerald-500 bg-emerald-50 px-5 py-5">
    <div class="text-[12px] font-black tracking-[0.14em] text-emerald-700">NHU CẦU TỪ ĐỐI TÁC</div>
    <div class="mt-3 text-[20px] font-bold text-slate-900">Báo cáo phân khúc</div>
    <div class="mt-3 text-[15px] leading-relaxed text-slate-600">Đối tác chỉ cần số khách hàng theo vùng và phân khúc.</div>
  </div>
</div>

<div v-click class="mt-5 grid grid-cols-[1.15fr_0.85fr] gap-8">
  <div class="border-l-4 border-rose-500 pl-5">
    <div class="text-[12px] font-black tracking-[0.14em] text-rose-700">VẤN ĐỀ HIỆN TẠI</div>
    <div class="mt-2 text-[17px] font-semibold leading-relaxed text-slate-800">Phong có thể xuất một file chứa toàn bộ dữ liệu khách hàng, dù đối tác chỉ cần số liệu tổng hợp.</div>
  </div>
  <div class="border-l-4 border-violet-500 pl-5">
    <div class="text-[12px] font-black tracking-[0.14em] text-violet-700">MỤC TIÊU DEMO</div>
    <div class="mt-2 text-[17px] font-semibold leading-relaxed text-slate-800">DLP kiểm tra file trước khi dữ liệu rời khỏi công ty và vẫn cho phép gửi báo cáo phù hợp.</div>
  </div>
</div>

<!--
Mục tiêu: 0:45

Công ty lưu một triệu hồ sơ khách hàng trong Data Lake và dùng Spark để xử lý dữ liệu.

[CLICK] Phong là chuyên viên dữ liệu. Phong đã được cấp quyền đọc dữ liệu và chạy Spark để chuẩn bị báo cáo.

[CLICK] Đối tác marketing chỉ yêu cầu số khách hàng theo vùng và phân khúc. Họ không cần biết từng khách hàng là ai.

[CLICK] Quy trình hiện tại vẫn cho phép Phong tạo một file chi tiết rồi xuất ra ngoài. Demo sẽ cho thấy DLP kiểm tra file trước khi dữ liệu rời khỏi công ty, chặn file chứa dữ liệu dư và cho phép gửi bản tổng hợp phù hợp.
-->
