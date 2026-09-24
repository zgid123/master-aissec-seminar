---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Giải pháp DLP hiện nay

<div class="rounded-lg border-l-4 border-sky-500 bg-sky-50 p-3 text-[11px] leading-snug">
  <b>DBMS hỗ trợ, tùy sản phẩm:</b>
  phân quyền, masking, audit. Với
  <code>customer_segments</code>
  trong data lake hoặc tệp xuất, DLP còn cần tìm nội dung → phân loại → quyết định chính sách → thực
  thi tại các đường xuất được kiểm soát.
</div>

<div class="grid grid-cols-3 gap-3 mt-3 text-[11px] leading-snug">
  <div class="rounded-xl border border-amber-300 bg-amber-50 p-4">
    <div class="text-[15px] font-bold">Amazon Macie</div>
    <div class="mt-1 text-[10px] font-bold uppercase text-amber-800">Data lake · Amazon S3</div>
    <div class="mt-3">
      <b>Phát hiện / báo cáo:</b>
      tự động khám phá hoặc chạy tác vụ để nhận diện dữ liệu nhạy cảm trong đối tượng S3 và ghi kết
      quả phát hiện.
    </div>
    <div class="mt-3 rounded bg-white/70 p-2">
      <b>Không phải:</b>
      bộ chặn mọi lần xuất khỏi S3.
    </div>
  </div>
  <div class="rounded-xl border border-cyan-300 bg-cyan-50 p-4">
    <div class="text-[15px] font-bold">Microsoft Purview DLP</div>
    <div class="mt-1 text-[10px] font-bold uppercase text-cyan-800">
      Mục được hỗ trợ trong Fabric
    </div>
    <div class="mt-3">
      <b>Chính sách trên mục dữ liệu:</b>
      như lakehouse và warehouse; có thể hiện gợi ý chính sách, gửi cảnh báo, và hạn chế truy cập
      theo cấu hình.
    </div>
    <div class="mt-3 rounded bg-white/70 p-2">
      <b>Phạm vi:</b>
      chỉ loại mục được hỗ trợ; hạn chế truy cập đang ở bản xem trước; không mặc định chặn mọi luồng
      xuất.
    </div>
  </div>
  <div class="rounded-xl border border-violet-300 bg-violet-50 p-4">
    <div class="text-[15px] font-bold">Google Cloud Sensitive Data Protection</div>
    <div class="mt-1 text-[10px] font-bold uppercase text-violet-800">BigQuery · Cloud Storage</div>
    <div class="mt-3">
      <b>Khám phá / kiểm tra:</b>
      lập hồ sơ và quét dữ liệu; có thể tạo bản đã loại định danh (de-identification).
    </div>
    <div class="mt-3 rounded bg-white/70 p-2">
      <b>Phân biệt:</b>
      biến đổi dữ liệu khác với chặn hành động xuất.
    </div>
  </div>
</div>

<div class="mt-3 text-[10px] text-slate-500">
  Khả năng DBMS và sản phẩm DLP phụ thuộc dịch vụ, cấu hình và loại dữ liệu được hỗ trợ; không mặc
  định bao phủ mọi tệp dẫn xuất hay đường xuất.
</div>
<div class="absolute bottom-4 left-12 right-12 text-[9px] leading-tight text-slate-400">
  Tài liệu chính thức: AWS Macie sensitive data discovery · Microsoft Purview DLP for Fabric ·
  Google Cloud Sensitive Data Protection inspection and de-identification.
</div>

<!--
Mục tiêu: 1:30

DBMS không đồng nghĩa với DLP toàn hệ thống. Tùy sản phẩm, phân quyền, masking và audit bảo vệ dữ liệu trong phạm vi DBMS. Nhưng customer_segments có thể thành tệp dẫn xuất trong data lake rồi đi qua đường xuất khác. Khi đó cần tìm và phân loại nội dung, kết hợp nhãn với người, hành động, đích, rồi thực thi tại từng đường được tích hợp.

Ba ví dụ giải quyết các phần khác nhau: Macie khám phá dữ liệu nhạy cảm trong S3; Purview DLP áp chính sách cho loại mục Fabric được hỗ trợ; Google Cloud Sensitive Data Protection kiểm tra hoặc khử định danh dữ liệu. Không nên suy ra một công cụ chặn mọi đường xuất.

Chuyển ý: AI có thể hỗ trợ bước phát hiện khi quy tắc đơn giản khó nhận ra nội dung.

Nguồn tra cứu, không đọc: SQL Server security overview https://learn.microsoft.com/en-us/sql/relational-databases/security/secure-sql-server ; tài liệu sản phẩm đầy đủ ở slide tham khảo.
-->
