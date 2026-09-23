---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# DDM trong các DBMS

Policy được khai báo và thực thi ngay trong database engine khi truy vấn chạy.

<div class="mt-5 grid grid-cols-2 gap-8 h-72 w-full">
  <div v-click="[1, 2]" class="entry col-start-1 row-start-1 min-w-0">
    <h2>SQL Server · Azure SQL</h2>
    <p class="feature">DDM</p>
    <ul class="points">
      <li>DBA gắn <code>MASKED WITH</code> vào cột nhạy cảm.</li>
      <li>Mỗi <code>SELECT</code> được đánh giá theo database principal.</li>
      <li>Khi <code>SELECT</code>:
        <ul class="subpoints">
          <li>Có quyền <code>UNMASK</code>: giá trị gốc.</li>
          <li>Không có quyền <code>UNMASK</code>: giá trị đã che.</li>
        </ul>
      </li>
    </ul>
  </div>

  <div v-click="[1, 2]" class="entry col-start-2 row-start-1 min-w-0">
    <h2>Oracle Database</h2>
    <p class="feature">Data Redaction</p>
    <ul class="points">
      <li>DBA tạo policy bằng <code>DBMS_REDACT</code>.</li>
      <li>Điều kiện policy có thể đọc session qua <code>SYS_CONTEXT</code>.</li>
      <li>Khi <code>SELECT</code>:
        <ul class="subpoints">
          <li>Điều kiện đúng: giá trị đã che.</li>
          <li>Điều kiện sai: giá trị gốc.</li>
        </ul>
      </li>
    </ul>
  </div>

  <div v-click="2" class="entry col-start-1 row-start-1 min-w-0">
    <h2>Snowflake</h2>
    <p class="feature">DDM</p>
    <ul class="points">
      <li>DBA viết masking policy bằng SQL và gắn vào column.</li>
      <li>Policy đọc role và execution context khi query chạy.</li>
      <li>Khi query:
        <ul class="subpoints">
          <li>Role/context được phép: giá trị gốc.</li>
          <li>Role/context hạn chế: giá trị che một phần hoặc toàn bộ.</li>
        </ul>
      </li>
    </ul>
  </div>

  <div v-click="2" class="entry col-start-2 row-start-1 min-w-0">
    <h2>BigQuery</h2>
    <p class="feature">DDM</p>
    <ul class="points">
      <li>DBA tạo data policy chứa masking rule.</li>
      <li>Policy được gắn trực tiếp vào column hoặc qua policy tag.</li>
      <li>Khi query:
        <ul class="subpoints">
          <li>Có quyền xem dữ liệu gốc: giá trị gốc.</li>
          <li>Có quyền truy cập masked: giá trị đã che.</li>
          <li>Không có quyền phù hợp: từ chối truy cập.</li>
        </ul>
      </li>
    </ul>
  </div>
</div>

<ul class="definition">
  <li><b>DBA (Database Administrator):</b> người quản trị cơ sở dữ liệu, chịu trách nhiệm cấu hình policy và phân quyền liên quan.</li>
</ul>

<style scoped>
.definition {
  margin: 0;
  padding: 0;
  list-style: none;
  color: #475569;
  font-size: 0.92rem;
}

.definition li::before {
  content: "-";
  margin-right: 0.5rem;
  color: #0b7658;
  font-weight: 700;
}

.entry h2 {
  font-size: 1.25rem;
  font-weight: 700;
}

.feature {
  margin: 0.1rem 0 0.7rem;
  color: #0b7658;
  font-weight: 700;
}

.points {
  margin: 0;
  padding: 0;
  list-style: none;
}

.points li {
  margin: 0.45rem 0;
  line-height: 1.3;
}

.points > li::before {
  content: "-";
  margin-right: 0.5rem;
  color: #0b7658;
  font-weight: 700;
}

.subpoints {
  margin: 0.25rem 0 0 1.3rem;
  padding: 0;
  list-style: none;
}

.subpoints li {
  margin: 0.2rem 0;
}

.subpoints li::before {
  content: "+";
  margin-right: 0.5rem;
  color: #0b7658;
  font-weight: 700;
}

</style>

<!--
Native DDM nghĩa là database engine cung cấp sẵn policy layer và áp dụng policy khi truy vấn chạy; dữ liệu lưu trữ không bị thay đổi.

[CLICK] SQL Server và Azure SQL gọi tính năng này là DDM: mask được gắn với column và quyền UNMASK quyết định ai có thể thấy dữ liệu gốc. Oracle Database dùng tên Data Redaction: policy được đánh giá tại runtime và có thể dựa trên session context.
[CLICK] Snowflake dùng masking policy để chọn giá trị trả về theo role và execution context. BigQuery dùng data policy kết hợp policy tag và IAM principal để quyết định cách che dữ liệu ở query runtime.

[Sources]
- https://learn.microsoft.com/en-us/sql/relational-databases/security/dynamic-data-masking
- https://docs.oracle.com/en/database/oracle/oracle-database/26/dbred/DBMS_REDACT.html
- https://docs.snowflake.com/en/user-guide/security-column-ddm-intro
- https://docs.cloud.google.com/bigquery/docs/column-data-masking-intro
[/Sources]
-->
