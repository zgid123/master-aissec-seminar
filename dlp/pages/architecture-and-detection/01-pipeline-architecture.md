---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# DLP trên pipeline


<PipelineFlow focus="derived" outcome="neutral" />

<div class="grid grid-cols-3 gap-3 mt-4 text-[11px] leading-snug">
  <div class="rounded-xl border border-amber-300 bg-amber-50 p-3">
    <b class="text-amber-800">① Dữ liệu đã lưu · phát hiện</b>
    <br />
    Quét tệp / bảng trong data lake; gắn nhãn như
    <b>PII</b>
    (thông tin nhận dạng cá nhân).
  </div>
  <div class="rounded-xl border border-cyan-300 bg-cyan-50 p-3">
    <b class="text-cyan-800">② Bản dẫn xuất · xác minh lại</b>
    <br />
    Quét đầu ra mới hoặc truyền nhãn theo lineage (quan hệ nguồn gốc); kiểm tra lại sau biến đổi.
  </div>
  <div class="rounded-xl border border-rose-300 bg-rose-50 p-3">
    <b class="text-rose-800">③ Lúc xuất · quyết định và thực thi</b>
    <br />
    Điểm xuất chặn trước khi ghi byte; kiểm tra nhãn + người / hành động + đích.
  </div>
</div>

<div class="mt-4 text-[11px] font-bold text-slate-700">
  Vì sao Big Data khó hơn? Cùng tình huống <code>customer_segments</code>:
</div>
<div class="grid grid-cols-5 gap-2 mt-2 text-[10px] leading-snug">
  <div class="rounded-lg bg-slate-100 p-2">
    <b>Khối lượng lớn</b>
    <br />
    Quét nhiều bản ghi tốn thời gian.
  </div>
  <div class="rounded-lg bg-slate-100 p-2">
    <b>Nhiều định dạng</b>
    <br />
    CSV gốc, bảng và tệp xuất.
  </div>
  <div class="rounded-lg bg-slate-100 p-2">
    <b>Bản dẫn xuất</b>
    <br />
    <code>customer_segments</code>
    vẫn giữ ID, email.
  </div>
  <div class="rounded-lg bg-slate-100 p-2">
    <b>Schema đổi</b>
    <br />
    Cột mới có thể chưa được gắn nhãn.
  </div>
  <div class="rounded-lg bg-slate-100 p-2">
    <b>Nhiều đường xuất</b>
    <br />
    Mỗi đường cần điểm kiểm soát.
  </div>
</div>
<div class="mt-3 rounded-lg bg-slate-100 p-2 text-[10px] leading-snug">
  <b>Ví dụ tích hợp:</b>
  Atlas hỗ trợ metadata / lineage; Ranger hỗ trợ policy / audit trong dịch vụ tích hợp. Ứng dụng
  phải thực thi quyết định tại đường xuất của mình.
</div>
<div class="absolute bottom-4 left-12 right-12 text-[9px] leading-tight text-slate-400">
  Liu, Shu, Yao & Butt, “Privacy-Preserving Scanning of Big Content for Sensitive Data Exposure with
  MapReduce,” CODASPY (2015). Virginia Tech repository.
</div>

<!--
Mục tiêu: 1:45

Sơ đồ cho thấy ba điểm: quét dữ liệu đã lưu, kiểm tra lại bản dẫn xuất, và quyết định ngay lúc xuất. Chỉ điểm thực thi tích hợp mới dừng được lần ghi bị chặn.

Với customer_segments, Big Data làm năm việc khó hơn. customer.csv lớn khiến quét toàn bộ tốn thời gian. Dữ liệu chuyển từ CSV sang bảng rồi có thể thành tệp xuất, nên bộ dò phải theo nhiều định dạng. Bảng dẫn xuất vẫn giữ customer_id và email dù là bản mới. Nếu pipeline thêm hoặc đổi cột, nhãn cũ có thể sai. Cuối cùng, cùng bảng có thể rời hệ thống qua nhiều API, job hoặc công cụ tải xuống; mỗi đường cần điểm kiểm soát riêng.

Atlas và Ranger hỗ trợ metadata, lineage, policy hoặc audit trong phạm vi tích hợp; ứng dụng xuất phải thực thi quyết định. Liu và cộng sự nghiên cứu quét nội dung lớn bằng MapReduce, tức phát hiện chứ không phải chặn xuất.

Chuyển ý: Các bộ phát hiện có thể tạo ra bằng chứng gì cho quyết định?
-->
