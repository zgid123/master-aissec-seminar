---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Giới hạn chung của DDM

<QuadHub class="h-[380px] overflow-hidden" v-click="1">
  <QuadHubCallout color="#f29e4b" icon="i-lucide-search">
    <QuadHubHeading>Vẫn có thể suy diễn</QuadHubHeading>
    <QuadHubContent>Predicate, filter, join hoặc nhiều query có thể tiết lộ giá trị gốc dù output đã bị che.</QuadHubContent>
  </QuadHubCallout>
  <QuadHubCallout color="#e9717a" icon="i-lucide-shield-off">
    <QuadHubHeading>Không chặn quyền cao</QuadHubHeading>
    <QuadHubContent>DBA, quyền <code>UNMASK</code>/exempt hoặc access path đọc raw data vẫn thấy dữ liệu thật.</QuadHubContent>
  </QuadHubCallout>
  <QuadHubCallout color="#62b6a8" icon="i-lucide-copy-x">
    <QuadHubHeading>Không bảo vệ mọi bản sao</QuadHubHeading>
    <QuadHubContent>Storage, backup, log, cache, export và dữ liệu đã lấy ra cần lớp bảo vệ riêng.</QuadHubContent>
  </QuadHubCallout>
  <QuadHubCallout color="#a4cb81" icon="i-lucide-fingerprint">
    <QuadHubHeading>Không phải anonymization</QuadHubHeading>
    <QuadHubContent>Dữ liệu gốc vẫn tồn tại và có thể liên kết lại; DDM không tự tạo audit hay giới hạn số row.</QuadHubContent>
  </QuadHubCallout>
</QuadHub>

<!--
Các giới hạn trên slide này không riêng DuckDB. Chúng xuất phát từ bản chất của DDM: engine giữ nguyên dữ liệu gốc và chỉ thay giá trị ở query result. Nói cách khác, DDM chỉ kiểm soát query output; các đường lộ dữ liệu khác vẫn tồn tại.

[CLICK] QuadHub tóm tắt bốn giới hạn chung của DDM.

Thứ nhất là inference. Người dùng có quyền chạy ad hoc query có thể thay đổi điều kiện WHERE nhiều lần để thu hẹp khoảng giá trị. Dù output luôn là dấu sao hoặc số 0, sự xuất hiện của row vẫn tiết lộ thông tin.

Thứ hai, DDM không chống lại principal có quyền cao, quyền unmask/exempt hoặc một access path được phép đọc raw data. Đây là lý do DDM không thay thế least privilege.

Thứ ba, DDM không tự mã hóa database file, backup, log, cache hoặc dữ liệu đã export. Mỗi bản sao và mỗi trạng thái của dữ liệu phải có control riêng.

Thứ tư, DDM không phải anonymization. Dữ liệu gốc vẫn tồn tại và có thể liên kết lại. Nó cũng không tự tạo audit trail hoặc giới hạn số row mà một user có thể truy vấn.

Cuối cùng là runtime overhead. Native và custom DDM đều tính mask khi query chạy; chi phí phụ thuộc số row, độ phức tạp, optimizer và workload. Native DDM của Oracle, SQL Server, Snowflake và BigQuery cũng áp dụng transformation khi query chạy. Oracle tích hợp redaction trong database kernel và tối ưu overhead; DuckDB expand macro thành SQL expression. Không thể kết luận bên nào nhanh hơn nếu chưa xét mask, số row, optimizer và workload cụ thể.

[Sources]
- https://learn.microsoft.com/en-us/sql/relational-databases/security/dynamic-data-masking
- https://docs.oracle.com/en/database/oracle/oracle-database/26/dbred/oracle-data-redaction-and-other-oracle-products-faqs.html
- https://docs.oracle.com/en/database/oracle/oracle-database/26/dbred/admin-faq.html
- https://duckdb.org/docs/current/sql/statements/create_macro
- https://duckdb.org/docs/current/guides/meta/explain_analyze
- https://docs.cloud.google.com/bigquery/docs/column-data-masking-intro
[/Sources]
-->
