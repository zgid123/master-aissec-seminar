---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# DLP đứng ở đâu trong các lớp bảo mật?


<div class="grid grid-cols-[1fr_1.1fr] gap-6 mt-2">
  <div class="space-y-1.5 text-[11px]">
    <div class="grid grid-cols-[150px_1fr] items-center gap-3">
      <b class="text-right">Xác thực</b>
      <div class="rounded bg-slate-300 p-1.5 font-bold">Ai đang truy cập?</div>
    </div>
    <div class="grid grid-cols-[150px_1fr] items-center gap-3">
      <b class="text-right">Ủy quyền</b>
      <div class="rounded bg-blue-200 p-1.5 font-bold">Vai trò này được phép làm gì?</div>
    </div>
    <div class="grid grid-cols-[150px_1fr] items-center gap-3">
      <b class="text-right">Kiểm soát truy cập</b>
      <div class="rounded bg-blue-300 p-1.5 font-bold">Thực thi quyền đọc / ghi tại tài nguyên</div>
    </div>
    <div class="grid grid-cols-[150px_1fr] items-center gap-3">
      <b class="text-right">Mã hóa</b>
      <div class="rounded bg-violet-300 p-1.5 font-bold">Bảo vệ khi lưu / truyền</div>
    </div>
    <div class="grid grid-cols-[150px_1fr] items-center gap-3">
      <b class="text-right">DDM</b>
      <div class="rounded bg-amber-300 p-1.5 font-bold">Che / biến đổi kết quả truy vấn</div>
    </div>
    <div class="grid grid-cols-[150px_1fr] items-center gap-3">
      <b class="text-right">DLP</b>
      <div class="rounded bg-cyan-300 p-1.5 font-bold">Phân loại bản sao + kiểm soát hành động</div>
    </div>
    <div class="grid grid-cols-[150px_1fr] items-center gap-3">
      <b class="text-right">Kiểm toán</b>
      <div class="rounded bg-emerald-300 p-1.5 font-bold">Lưu bằng chứng và sự kiện</div>
    </div>
  </div>
  <div class="rounded-xl border border-slate-200 bg-slate-50 p-4 text-[12px] leading-snug">
    <b>Nhắc nhanh về Dynamic Data Masking (DDM):</b>
    DDM biến đổi kết quả truy vấn theo vai trò; dữ liệu đã đọc cần được kiểm soát ở lớp khác.
    <br />
    <br />
    <b>DLP bổ sung:</b>
    nhận diện nội dung nhạy cảm và xét cách xử lý hoặc chia sẻ bản sao đó.
  </div>
</div>

<div class="mt-5 rounded-xl border-l-4 border-sky-500 bg-sky-50 p-4 text-[14px] leading-snug">
  <span class="text-[10px] font-bold uppercase tracking-[0.12em] text-sky-700">
    Phạm vi seminar
  </span>
  <br />
  <b>
    Phân loại thông tin nhạy cảm trong dữ liệu đã lưu và dữ liệu dẫn xuất; thực thi chính sách tại
    một đường xuất được kiểm soát.
  </b>
</div>

<!--
Mục tiêu: 0:45

Đây là phòng thủ nhiều lớp: xác thực xác định người dùng; ủy quyền xác định vai trò được phép làm gì; kiểm soát truy cập thực thi quyền tại tài nguyên. Mã hóa bảo vệ dữ liệu khi lưu/truyền, còn kiểm toán lưu bằng chứng. Dynamic Data Masking (DDM) có thể thay đổi kết quả truy vấn theo vai trò, nhưng không kiểm soát mọi hành động sau khi dữ liệu đã được đọc.

DLP bổ sung quyết định về nội dung nhạy cảm và cách xử lý bản sao hoặc hành động tiết lộ.

Phạm vi seminar: phân loại dữ liệu nhạy cảm trong bản gốc và bản dẫn xuất, thực thi ở một đường xuất được kiểm soát.

Chuyển ý: Phạm vi này hoạt động ở những điểm nào trong pipeline?
-->
