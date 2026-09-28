---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Big Data: Luồng dữ liệu & Nguy cơ rò rỉ

<div class="-mt-3 text-[15px] text-slate-600 leading-snug">
  Đặc thù khối lượng lớn, tốc độ cao và đa dạng (3V) - dữ liệu luân chuyển liên tục qua nhiều tầng xử lý để tạo ra các bảng tổng hợp phục vụ phân tích.
</div>

<div class="mt-1">
  <PipelineFlow focus="none" outcome="neutral" prominent :derived-tag="''" />
</div>

<div class="grid grid-cols-2 gap-3 mt-3 text-[15px] leading-snug">
  <div v-click="2" class="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5">
    <b class="text-slate-900">1. Quyền truy cập (Access Control)</b>
    <div class="text-[13px] text-slate-600 mt-1">Cụm phân tán nhiều người dùng, khó kiểm soát chi tiết và dễ bị cấp dư quyền.</div>
  </div>
  <div v-click="2" class="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5">
    <b class="text-slate-900">2. Tính toàn vẹn (Integrity)</b>
    <div class="text-[13px] text-slate-600 mt-1">Nguồn dữ liệu đa dạng, dễ bị sai lệch hoặc can thiệp trong các tầng xử lý.</div>
  </div>
  <div v-click="2" class="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5">
    <b class="text-slate-900">3. Tính sẵn sàng (Availability)</b>
    <div class="text-[13px] text-slate-600 mt-1">Hạ tầng phân tán quy mô lớn dễ gặp sự cố quá tải hoặc nghẽn dịch vụ.</div>
  </div>
  <div v-click="3" class="rounded-lg border-2 border-rose-500 bg-rose-50 px-4 py-2.5 shadow-sm">
    <b class="text-rose-800">4. Rò rỉ dữ liệu (Data Leakage) - Trọng tâm</b>
    <div class="text-[13px] text-rose-900 mt-1">Bản sao sau xử lý bị trích xuất và gửi ra kênh ngoài chưa kiểm duyệt.</div>
  </div>
</div>

<!--
Khi nhắc đến Big Data, dữ liệu không bao giờ nằm yên một chỗ trong kho lưu trữ mà liên tục luân chuyển qua nhiều tầng xử lý.

[CLICK] Với đặc thù 3V (khối lượng lớn, tốc độ cao, đa dạng), dữ liệu từ Data Lake liên tục đi qua các tầng xử lý để tạo ra các bảng tổng hợp phục vụ phân tích. Dữ liệu liên tục được nhân bản, trích xuất và luân chuyển qua nhiều kênh.

[CLICK] Các vấn đề an toàn thông tin đặc thù trong Big Data:
- Quyền truy cập (Access Control): Môi trường cụm phân tán nhiều người dùng, khó phân quyền chi tiết, tài khoản dễ bị cấp dư quyền đọc.
- Tính toàn vẹn (Integrity): Dữ liệu từ nhiều nguồn ngoài, qua nhiều tầng tính toán dễ bị sai lệch hoặc can thiệp làm sai kết quả.
- Tính sẵn sàng (Availability): Cụm máy chủ phân tán quy mô lớn luôn đối mặt nguy cơ nghẽn hoặc gián đoạn dịch vụ.

[CLICK] Trọng tâm hôm nay là Rò rỉ dữ liệu (Data Leakage): Các bản sao sau xử lý chứa thông tin nhạy cảm bị trích xuất và gửi ra kênh ngoài chưa kiểm duyệt.
Chuyển tiếp: Hãy cùng theo dõi một tình huống thực tế tại sao người dùng đọc đúng quyền nhưng vẫn gây rò rỉ dữ liệu.
-->

