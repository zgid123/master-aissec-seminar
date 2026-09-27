---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Big Data: Luồng dữ liệu & Nguy cơ rò rỉ

<div class="-mt-3 text-[15px] text-slate-600 leading-snug">
  Đặc thù khối lượng lớn, tốc độ cao và đa dạng (3V) — dữ liệu luân chuyển liên tục qua nhiều tầng xử lý để tạo ra các bảng tổng hợp phục vụ phân tích.
</div>

<div class="mt-1">
  <PipelineFlow focus="none" outcome="neutral" prominent :derived-tag="''" />
</div>

<div class="grid grid-cols-2 gap-3 mt-3 text-[15px] leading-snug">
  <div v-click="2" class="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5">
    <b class="text-slate-900">1. Quyền truy cập (Access Control)</b>
    <div class="text-[13px] text-slate-600 mt-1">Xác thực người dùng và phân quyền đọc/ghi trên các cụm dữ liệu phân tán.</div>
  </div>
  <div v-click="2" class="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5">
    <b class="text-slate-900">2. Tính toàn vẹn (Integrity)</b>
    <div class="text-[13px] text-slate-600 mt-1">Đảm bảo dữ liệu không bị sửa đổi trái phép trong quá trình truyền tải và tính toán.</div>
  </div>
  <div v-click="2" class="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5">
    <b class="text-slate-900">3. Tính sẵn sàng (Availability)</b>
    <div class="text-[13px] text-slate-600 mt-1">Duy trì hạ tầng lưu trữ và dịch vụ phân tích luôn sẵn sàng phục vụ người dùng.</div>
  </div>
  <div v-click="3" class="rounded-lg border-2 border-rose-500 bg-rose-50 px-4 py-2.5 shadow-sm">
    <b class="text-rose-800">4. Rò rỉ dữ liệu (Data Leakage) — Trọng tâm</b>
    <div class="text-[13px] text-rose-900 mt-1">Dữ liệu nhạy cảm sau xử lý bị gửi nhầm nơi nhận hoặc thất thoát ra bên ngoài.</div>
  </div>
</div>

<div class="absolute bottom-2.5 left-12 right-12 text-[11px] text-slate-400">
  Khung tham chiếu an toàn Big Data: NIST SP 1500-4r1 (NIST Special Publication).
</div>

<!--
[Click 1 - Bối cảnh & Luồng xử lý]:
- Big Data có đặc trưng 3V (lớn, nhanh, đa dạng), dữ liệu xử lý phân tán qua nhiều công đoạn.
- Dữ liệu không chỉ nằm yên trong kho gốc mà liên tục sinh ra các bảng tổng hợp và chia sẻ ra ngoài.

[Click 2 - Ba trụ cột an ninh nền tảng]:
- Quản trị an toàn Big Data gồm: Quyền truy cập, Tính toàn vẹn và Tính sẵn sàng (theo NIST SP 1500-4r1).

[Click 3 - Nguy cơ rò rỉ dữ liệu]:
- Điểm mù thường gặp: Dữ liệu nhạy cảm sau phân tích bị gửi nhầm nơi nhận hoặc lọt ra kênh không an toàn.
- Chuyển ý: Xem một tình huống thực tế tại sao người dùng có quyền đọc hợp lệ nhưng vẫn làm rò rỉ dữ liệu.
-->
