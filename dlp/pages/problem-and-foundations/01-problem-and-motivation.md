---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Tổng quan và bài toán bảo mật Big Data

<div class="mt-2 text-center text-[12px] font-bold tracking-wide text-slate-500">
  VÒNG ĐỜI DỮ LIỆU TRONG BIG DATA
</div>
<div class="mt-2"><PipelineFlow focus="none" outcome="neutral" /></div>

<div class="grid grid-cols-4 gap-3 mt-5 text-[12px] leading-snug">
  <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
    <b>Quyền quá rộng</b>
    <br />
    <span class="text-slate-600">
      Tài khoản phân tích được đọc cả vùng dữ liệu không cần thiết.
    </span>
  </div>
  <div class="rounded-xl border border-rose-300 bg-rose-50 p-3 ring-2 ring-rose-300">
    <b class="text-rose-700">Rò rỉ dữ liệu</b>
    <br />
    <span class="text-slate-600">Tệp nhạy cảm bị công khai hoặc xuất tới sai nơi.</span>
  </div>
  <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
    <b>Sửa đổi đầu vào</b>
    <br />
    <span class="text-slate-600">Bản ghi bị làm sai khiến mô hình cho kết quả lệch.</span>
  </div>
  <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
    <b>Gián đoạn dịch vụ</b>
    <br />
    <span class="text-slate-600">Cụm xử lý ngừng chạy, báo cáo không sẵn sàng.</span>
  </div>
</div>

<div class="mt-4 rounded-lg bg-slate-100 px-4 py-2 text-center text-[12px] text-slate-700">
  Quy mô lớn · nhiều định dạng · xử lý phân tán · nhiều bản sao dẫn xuất → khó theo dõi dữ liệu sau
  mỗi bước.
</div>

<!--
Mục tiêu: 1:15

Trong hệ thống Big Data, dữ liệu đi từ thu thập qua lưu trữ phân tán, xử lý, phân tích rồi chia sẻ. Mỗi bước có thể tạo bảng, tệp, cache hoặc báo cáo mới.

Bốn ví dụ: quyền truy cập quá rộng cho phép đọc thừa; một tệp bị chia sẻ công khai; đầu vào bị sửa làm sai kết quả phân tích; hoặc sự cố cụm khiến pipeline ngừng phục vụ. Chúng ta chọn rò rỉ dữ liệu: thông tin nhạy cảm tới sai người hoặc sai đích.

Khối lượng lớn, nhiều định dạng, xử lý phân tán và bản sao dẫn xuất khiến khó theo dấu dữ liệu. DLP chỉ xử lý nguy cơ tiết lộ, không giải quyết mọi rủi ro bảo mật dữ liệu lớn.

Chuyển ý: Một tình huống phân tích hợp lệ có thể tạo ra nguy cơ rò rỉ như thế nào?
-->
