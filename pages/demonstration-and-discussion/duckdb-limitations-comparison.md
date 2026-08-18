---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Giới hạn của DuckDB

<div class="comparison mt-5">
  <div class="head"><b>Khía cạnh</b><b>DuckDB</b><b>DBMS phổ biến</b></div>
  <div v-click><span>Kiến trúc</span><p>Embedded, chạy trong application process.</p><p>Client-server, database server đứng giữa app và data.</p></div>
  <div v-click><span>User / role</span><p>Không tập trung vào multi-user authorization.</p><p>Có user, role, privilege, policy ở database layer.</p></div>
  <div v-click><span>Native masking</span><p>Không có native DDM policy như SQL Server.</p><p>SQL Server có DDM; Oracle có Data Redaction; PostgreSQL thường dùng RLS/view/policy.</p></div>
  <div v-click><span>Enforcement</span><p>Application phải giữ context và kiểm soát query path.</p><p>Database server có thể enforce quyền tập trung hơn.</p></div>
  <div v-click><span>Bypass risk</span><p>Đọc được file hoặc chạy raw SQL thì có thể bỏ qua masking.</p><p>Permission, schema privilege, RLS và audit giúp giảm rủi ro bypass.</p></div>
</div>

<div v-click="7" class="mt-5 rounded-lg border border-amber-300/35 bg-amber-500/8 p-3 text-sm leading-6">
DuckDB phù hợp để xây <b class="text-[#2efab0]">masking behavior</b>, nhưng không nên xem macro/view là <b class="text-[#88ffff]">database-native security boundary</b>.
</div>

<style scoped>
.comparison { display:grid; gap:.45rem; }
.comparison .head,
.comparison > div:not(.head) { display:grid; grid-template-columns:.62fr 1fr 1.15fr; gap:.75rem; align-items:stretch; }
.comparison .head { color:#88ffff; font-size:.72rem; text-transform:uppercase; letter-spacing:0; opacity:.9; padding:0 .75rem; }
.comparison > div:not(.head) { padding:.65rem .75rem; background:rgba(255,255,255,.045); border-left:4px solid #2efab0; }
.comparison span { color:#2efab0; font-weight:700; font-size:.78rem; }
.comparison p { margin:0; font-size:.68rem; line-height:1.35; opacity:.76; }
</style>

<!--
Nói rõ đây là phần so sánh giới hạn theo kiến trúc, không phải chê DuckDB.

[click]
DuckDB là embedded database. Nó rất mạnh cho analytics trong app, notebook, local workflow, nhưng không có database server riêng đứng giữa mọi truy cập như SQL Server, Oracle hay PostgreSQL.

[click]
Vì không tối ưu cho mô hình multi-user server database, DuckDB không tự giải quyết đầy đủ identity, role và authorization của end user. Với seminar này, role đến từ Node.js API.

[click]
SQL Server có Dynamic Data Masking ở database layer. Oracle có Data Redaction để redact dữ liệu trả về từ query. PostgreSQL không phải native DDM theo cùng nghĩa, nhưng có Row Level Security và policy để enforce quyền theo row ở database layer.

[click]
Vì vậy, với DuckDB, enforcement chính nằm ở application: app phải xác thực user, bind role đáng tin cậy, chỉ expose fixed query, và giữ file database.

[click]
Nếu user đọc được file .duckdb hoặc chạy raw SQL trực tiếp vào bảng gốc, masking bằng macro/view bị bypass. Các DBMS server-side có nhiều cơ chế permission, schema privilege, RLS và audit hơn để giảm rủi ro này.

Kết luận slide: DuckDB có building blocks tốt để demo và triển khai application-enforced masking, nhưng không nên gọi macro/view là security boundary hoàn chỉnh.

[Sources]
- https://duckdb.org/docs/lts/operations_manual/securing_duckdb/overview.html
- https://learn.microsoft.com/en-us/sql/relational-databases/security/dynamic-data-masking
- https://docs.oracle.com/en/database/oracle/oracle-database/19/asoag/introduction-to-oracle-data-redaction.html
- https://www.postgresql.org/docs/current/ddl-rowsecurity.html
[/Sources]
-->
