---
hideInToc: true
transition: slide-left
---

<ComparisonTable dense :spacing="3" row-header-width="110px">
  <ComparisonTableCols>
    <ComparisonTableCol color="#354f82">Vòng đời chính sách</ComparisonTableCol>
    <ComparisonTableCol color="#5b8bb3">Ranh giới thực thi</ComparisonTableCol>
    <ComparisonTableCol color="#00a8a8">Chi phí khi query</ComparisonTableCol>
  </ComparisonTableCols>
  <ComparisonTableRows>
    <ComparisonTableRow color="#0284c7">
      <template #title>
        <div class="leading-tight">
          <div>DuckDB</div>
          <small class="font-normal opacity-80 normal-case">Tự triển khai</small>
        </div>
      </template>
      <ComparisonTableCell align="left">
        Macro/view theo app; team tự kiểm soát coverage.
      </ComparisonTableCell>
      <ComparisonTableCell align="left">
        App identity, API query path & quyền file OS.
      </ComparisonTableCell>
      <ComparisonTableCell align="left">
        SQL expression trong plan (đo bằng <code>EXPLAIN</code>).
      </ComparisonTableCell>
    </ComparisonTableRow>
    <ComparisonTableRow title="SQL Server">
      <ComparisonTableCell align="left">
        Gắn vào column; quản trị quyền <code>UNMASK</code>.
      </ComparisonTableCell>
      <ComparisonTableCell align="left">
        Database principal & role privilege.
      </ComparisonTableCell>
      <ComparisonTableCell align="left">
        Áp dụng ở query result; vẫn tốn CPU runtime.
      </ComparisonTableCell>
    </ComparisonTableRow>
    <ComparisonTableRow title="Oracle">
      <ComparisonTableCell align="left">
        <code>DBMS_REDACT</code>; quản lý policy tập trung.
      </ComparisonTableCell>
      <ComparisonTableCell align="left">
        Session context & quyền exempt.
      </ComparisonTableCell>
      <ComparisonTableCell align="left">
        Kernel tối ưu redaction trước khi trả result.
      </ComparisonTableCell>
    </ComparisonTableRow>
    <ComparisonTableRow title="Snowflake">
      <ComparisonTableCell align="left">
        Policy tái sử dụng; áp dụng ngay query kế tiếp.
      </ComparisonTableCell>
      <ComparisonTableCell align="left">
        Role & execution context trong database.
      </ComparisonTableCell>
      <ComparisonTableCell align="left">
        Rewrite query và mask tại query time.
      </ComparisonTableCell>
    </ComparisonTableRow>
    <ComparisonTableRow title="BigQuery">
      <ComparisonTableCell align="left">
        Data policy / routine; quản trị bằng Cloud IAM.
      </ComparisonTableCell>
      <ComparisonTableCell align="left">
        IAM principal & masked/raw access.
      </ComparisonTableCell>
      <ComparisonTableCell align="left">
        Query time; có thể mất BI Engine acceleration.
      </ComparisonTableCell>
    </ComparisonTableRow>
  </ComparisonTableRows>
</ComparisonTable>

<!--
Key takeaway: Mọi DDM đều có chi phí khi query. Native DDM chủ yếu cải thiện quản trị, thực thi và lan truyền thay đổi - không tự động nhanh hơn.

Slide này so sánh vòng đời chính sách, ranh giới thực thi và chi phí khi query. Điểm cần tránh là đồng nhất “native” với “không có chi phí”.

Với DuckDB, team sửa macro hoặc view và tự kiểm tra policy coverage. Identity, query path và raw file nằm trong boundary của application và hệ điều hành. Mask là SQL expression trong query plan.

SQL Server đưa mask vào metadata của column và dùng database principal cùng quyền `UNMASK`. Database vẫn thực hiện masking khi tạo query result; native không có nghĩa là không có runtime work.

Oracle quản lý Data Redaction bằng policy và session context. Redaction được áp dụng trước khi result trả về client. Oracle tích hợp cơ chế này trong database kernel và tối ưu overhead, nhưng policy phức tạp vẫn cần benchmark.

Snowflake quản lý masking policy như schema object, tái sử dụng trên nhiều column và đánh giá role/context tại query time.

BigQuery dùng data policy hoặc custom routine và IAM. Masking vẫn chạy tại query time; một số execution path không được BI Engine accelerate hoặc có thể tăng query cost.

Kết luận: native DDM chủ yếu thắng ở quản trị, thực thi chính sách và khả năng lan truyền thay đổi. Về hiệu năng, mọi cách tiếp cận đều phải được đánh giá trên workload thực tế.

[Sources]
- https://duckdb.org/docs/current/sql/statements/create_macro
- https://learn.microsoft.com/en-us/sql/relational-databases/security/dynamic-data-masking
- https://docs.oracle.com/en/database/oracle/oracle-database/26/dbred/altering-oracle-data-redaction-policy.html
- https://docs.oracle.com/en/database/oracle/oracle-database/26/dbred/admin-faq.html
- https://docs.snowflake.com/en/user-guide/security-column-ddm-intro
- https://docs.snowflake.com/en/sql-reference/sql/alter-masking-policy
- https://docs.cloud.google.com/bigquery/docs/column-data-masking
- https://docs.cloud.google.com/bigquery/docs/column-data-masking-intro
[/Sources]
-->
