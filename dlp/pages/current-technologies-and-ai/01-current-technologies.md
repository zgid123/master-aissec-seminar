---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Giải pháp DLP hiện nay

<div class="rounded-lg border-l-4 border-sky-500 bg-sky-50 p-3 text-[12px] leading-snug">
  DBMS thường có phân quyền, masking và audit; phạm vi DLP phụ thuộc sản phẩm và đường dữ liệu được tích hợp.
</div>

<div class="grid grid-cols-3 gap-3 mt-3 text-[11px] leading-snug">
  <div class="rounded-xl border border-amber-300 bg-amber-50 p-4">
    <div class="text-[15px] font-bold">Amazon Macie</div>
    <div class="mt-1 text-[10px] font-bold uppercase text-amber-800">Data lake · Amazon S3</div>
    <div class="mt-3 space-y-2">
      <div><b>Phạm vi:</b> Đối tượng S3 thuộc storage class và định dạng được hỗ trợ.</div>
      <div><b>Hỗ trợ:</b> Khám phá tự động hoặc quét theo job, rồi tạo finding cho đối tượng có dữ liệu nhạy cảm.</div>
      <div><b>Giới hạn:</b> Finding phục vụ điều tra; không tự động chặn mọi lần xuất.</div>
    </div>
  </div>
  <div class="rounded-xl border border-cyan-300 bg-cyan-50 p-4">
    <div class="text-[15px] font-bold">Microsoft Purview DLP</div>
    <div class="mt-1 text-[10px] font-bold uppercase text-cyan-800">
      Mục được hỗ trợ trong Fabric
    </div>
    <div class="mt-3 space-y-2">
      <div><b>Phạm vi:</b> Áp dụng cho các mục Fabric được hỗ trợ và dữ liệu trong bảng Delta.</div>
      <div><b>Hỗ trợ:</b> Policy tips và cảnh báo khi policy phát hiện nội dung phù hợp.</div>
      <div><b>Giới hạn:</b> Restrict access đang ở preview; chỉ áp dụng cho mục, định dạng được hỗ trợ và không chặn mọi đường xuất.</div>
    </div>
  </div>
  <div class="rounded-xl border border-violet-300 bg-violet-50 p-4">
    <div class="text-[15px] font-bold">Google Cloud Sensitive Data Protection</div>
    <div class="mt-1 text-[10px] font-bold uppercase text-violet-800">BigQuery · Cloud Storage</div>
    <div class="mt-3 space-y-2">
      <div><b>Phạm vi:</b> Quét Cloud Storage và BigQuery theo loại dữ liệu, định dạng được hỗ trợ.</div>
      <div><b>Hỗ trợ:</b> Kiểm tra dữ liệu nhạy cảm và tạo bản đã khử định danh.</div>
      <div><b>Giới hạn:</b> Kiểm tra hoặc khử định danh không đồng nghĩa chặn xuất.</div>
    </div>
  </div>
</div>

<div class="absolute bottom-4 left-12 right-12 text-[9px] leading-tight text-slate-400">
  Tài liệu chính thức: <a href="https://docs.aws.amazon.com/macie/latest/user/discovery-asdd-results-s3-findings.html">AWS Macie</a> ·
  <a href="https://learn.microsoft.com/en-us/purview/dlp-powerbi-get-started">Microsoft Purview</a> ·
  <a href="https://docs.cloud.google.com/sensitive-data-protection/docs">Google Cloud</a>.
</div>
<!--
- Macie tạo sensitive data finding cho từng đối tượng S3 có dữ liệu nhạy cảm được phát hiện.
- Purview Fabric DLP có policy tips và alerts; Restrict access được ghi là preview và áp dụng trong phạm vi mục dữ liệu được hỗ trợ.
- Google Cloud Sensitive Data Protection kiểm tra dữ liệu và có thể tạo bản khử định danh; đây là tác vụ dữ liệu, không phải chặn lần xuất.
- Tài liệu được kiểm tra: AWS Macie, Microsoft Learn về Fabric DLP, Google Cloud Sensitive Data Protection.

Chuyển ý: AI có thể hỗ trợ bước phát hiện khi quy tắc đơn giản khó nhận ra nội dung.
-->
