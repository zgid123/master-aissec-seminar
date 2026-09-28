---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Đọc đúng quyền, nhưng gửi sai đích?

<div class="-mt-3 text-[15px] text-slate-600 leading-snug">
  Tình huống thực tế: Người dùng thực hiện thao tác nghiệp vụ hợp lệ nhưng vẫn tạo ra nguy cơ rò rỉ dữ liệu.
</div>

<div class="mt-1">
  <PipelineFlow focus="export" outcome="risk" prominent derived-tag="Chứa PII" />
</div>

<div class="grid grid-cols-2 gap-3.5 mt-3 text-[15px] leading-snug">
  <div v-click="2" class="rounded-lg border border-slate-200 bg-slate-50 p-3.5">
    <div class="font-bold text-slate-900 text-[16px] flex items-center gap-2">
      <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
      1. Thao tác nghiệp vụ hợp lệ
    </div>
    <div class="mt-2 text-slate-700">Chuyên viên dữ liệu được cấp quyền đọc thông tin khách hàng từ Data Lake.</div>
    <div class="mt-1.5 text-slate-700">Chạy truy vấn tạo bảng tổng hợp <code>customer_segments</code> để phục vụ công việc.</div>
    <div class="mt-2 text-[13px] text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
      ⚠️ Bảng kết quả sau xử lý vô tình vẫn còn thông tin định danh cá nhân: <b>Mã KH, Email, SĐT (PII)</b>.
    </div>
  </div>

  <div v-click="3" class="rounded-lg border-2 border-rose-500 bg-rose-50 p-3.5">
    <div class="font-bold text-rose-800 text-[16px] flex items-center gap-2">
      <span class="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
      2. Nguy cơ khi chia sẻ ra ngoài
    </div>
    <div class="mt-2 text-slate-700">Tệp dữ liệu này được xuất và gửi sang <b>kênh bên ngoài chưa được kiểm duyệt</b> (đám mây cá nhân, đối tác).</div>
    <div class="mt-2 text-[13px] text-rose-900 bg-rose-100/70 p-2 rounded border border-rose-300 font-semibold">
      Điểm mù bảo mật: Hệ thống chỉ kiểm soát quyền lúc đọc vào, nhưng bỏ ngỏ nội dung tệp khi xuất ra ngoài!
    </div>
  </div>
</div>

<div v-click="4" class="mt-3 px-4 py-2 rounded-lg bg-sky-50 border border-sky-300 text-center text-sky-900 font-medium text-[15px]">
  Làm sao tự động nhận diện PII trong tệp gửi đi để ngăn chặn kịp thời? → Đó là vai trò của <b>DLP</b>.
</div>

<!--
Đọc đúng quyền, nhưng gửi sai đích? Nghe có vẻ nghịch lý, nhưng đây lại là kịch bản rò rỉ dữ liệu xảy ra thường xuyên nhất.

[CLICK] Cùng xem một quy trình nghiệp vụ điển hình trên pipeline:

[CLICK] Thao tác nghiệp vụ hợp lệ: Chuyên viên dữ liệu có quyền đọc hợp lệ trong Data Lake, trích xuất bảng customer_segments. Tuy nhiên bảng tổng hợp sau xử lý này vô tình vẫn còn giữ nguyên PII (Mã KH, Email, SĐT).

[CLICK] Nguy cơ khi chia sẻ: Tệp dữ liệu này được xuất và gửi ra kênh ngoài chưa kiểm duyệt (cloud cá nhân, đối tác). Điểm mù bảo mật: Access Control chỉ kiểm soát cổng vào lúc đọc, hoàn toàn bỏ ngỏ nội dung tệp ở cổng ra!

[CLICK] Chốt vấn đề: Cần giải pháp tự động soi nội dung PII ngay tại cổng xuất và chủ động ngăn chặn luồng gửi ra ngoài -> Đó là vai trò của DLP.
Bàn giao: "Sau đây xin mời anh Phong trình bày tiếp về cơ chế nền tảng của DLP."
-->
