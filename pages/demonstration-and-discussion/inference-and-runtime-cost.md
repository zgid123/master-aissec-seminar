---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Hai giới hạn của DDM: suy diễn và chi phí runtime

<div class="limits mt-3">
  <section class="inference" v-click="1">
    <small>01 · INFERENCE ATTACK</small>
    <h3>Predicate có thể tiết lộ giá trị bị che</h3>
    <pre><code>SELECT employee_id, mask_salary(salary)
FROM employees
WHERE salary &gt; 50000000;</code></pre>
    <p>Salary bị che, nhưng record xuất hiện vẫn tiết lộ người đó có lương trên 50 triệu.</p>
    <div v-click="2"><b>CONTROL</b><span>Giới hạn filter, <code>JOIN</code>, <code>ORDER BY</code>, aggregate; không cấp ad hoc query.</span></div>
  </section>

  <section class="performance" v-click="3">
    <small>02 · PERFORMANCE OVERHEAD</small>
    <h3>Masking chạy lại ở query time</h3>
    <div class="cost"><strong>1M rows</strong><i>×</i><strong>masking function</strong><i>→</i><strong>CPU + latency</strong></div>
    <p>Chi phí tăng theo số hàng và độ phức tạp; expression trên cột có thể khiến index scan không còn đủ điều kiện.</p>
    <div v-click="4"><b>CONTROL</b><span>Lọc và giới hạn trước; tránh mask trong <code>WHERE/JOIN</code>; đo bằng <code>EXPLAIN ANALYZE</code>.</span></div>
  </section>
</div>

<div v-click="5" class="takeaway-strip mt-4 p-3 text-center">
DDM giảm lộ qua <code>SELECT</code>; policy phải kiểm soát cả <b>cách dữ liệu được truy vấn</b>.
</div>

<style scoped>
.limits { display:grid; grid-template-columns:1fr 1fr; gap:1.35rem; }
.limits section { min-height:18rem; padding:1.1rem 1.2rem; border-top:4px solid #ff8b8b; background:rgba(255,255,255,.05); }
.limits .performance { border-color:#ffda58; }
.limits small { color:#ff9f9f; font-size:.74rem; font-weight:800; letter-spacing:.08em; }
.limits .performance small { color:#ffda58; }
.limits h3 { margin:.65rem 0 .8rem; color:#fff; font-size:1.08rem; line-height:1.3; }
.limits pre { margin:0; padding:.75rem .85rem; background:rgba(0,0,0,.28); }
.limits pre code { font-size:.7rem; line-height:1.5; }
.limits p { margin:.8rem 0; color:#cbd7e0; font-size:.82rem; line-height:1.45; }
.limits section > div:last-child { display:grid; grid-template-columns:auto 1fr; gap:.65rem; align-items:start; margin-top:.75rem; padding-top:.75rem; border-top:1px solid rgba(255,255,255,.13); }
.limits section > div:last-child b { color:#2efab0; font-size:.7rem; letter-spacing:.06em; }
.limits section > div:last-child span { color:#dce7ed; font-size:.76rem; line-height:1.4; }
.cost { display:grid; grid-template-columns:1fr auto 1.35fr auto 1fr; gap:.45rem; align-items:center; min-height:5.15rem; padding:.8rem; background:rgba(255,218,88,.06); text-align:center; }
.cost strong { color:#fff; font-size:.78rem; line-height:1.3; }
.cost i { color:#ffda58; font-size:1rem; font-style:normal; }
.takeaway-strip { font-size:.95rem; }
.takeaway-strip code,.takeaway-strip b { color:#2efab0; }
</style>

<!--
Ngoài việc bypass bằng cách đọc dữ liệu gốc, Dynamic Data Masking còn có hai giới hạn tinh vi hơn. Giới hạn thứ nhất liên quan đến việc suy diễn thông tin từ kết quả query. Giới hạn thứ hai là chi phí thực thi vì masking được tính ở query time.

[click]
Trước hết là inference attack, hay tấn công suy diễn. Trong ví dụ này, cột salary đã được che bằng hàm `mask_salary`, nên người dùng không nhìn thấy con số lương thật trong output. Tuy nhiên, câu lệnh vẫn lọc trên giá trị gốc bằng điều kiện `salary lớn hơn 50 triệu`. Nếu một nhân viên xuất hiện trong kết quả, người dùng lập tức biết lương của người đó vượt ngưỡng 50 triệu, dù ô salary đang bị che. Nếu được thử nhiều ngưỡng khác nhau, chẳng hạn 40 triệu, 45 triệu rồi 48 triệu, họ có thể tiếp tục thu hẹp khoảng giá trị. Như vậy, dữ liệu bị lộ thông qua việc record có xuất hiện hay không, chứ không phải qua cột được hiển thị.

[click]
Biện pháp kiểm soát là policy không chỉ áp dụng cho danh sách cột sau `SELECT`. Với role hạn chế, application cũng phải kiểm soát việc dùng cột nhạy cảm trong `WHERE`, `JOIN`, `ORDER BY` và các hàm aggregate. Cách thực tế nhất trong kiến trúc demo là chỉ cung cấp các query đã định nghĩa trước, giới hạn tham số được phép và không cấp khả năng chạy ad hoc query trên dữ liệu nhạy cảm. Auditing cũng cần thiết để phát hiện một người liên tục thử nhiều ngưỡng bất thường.

[click]
Giới hạn thứ hai là performance overhead. Dynamic masking không tạo sẵn một bản dữ liệu đã che; hàm masking được tính lại khi query chạy. Nếu query trả một triệu dòng, hàm có thể phải được áp dụng một triệu lần. Chi phí thực tế phụ thuộc vào số hàng, độ phức tạp của hàm và query plan, vì vậy nhóm em không khẳng định một con số slowdown cố định. Tuy nhiên, nguyên tắc chung là càng nhiều dòng phải xử lý và biểu thức càng phức tạp thì CPU và latency càng có khả năng tăng. Trong DuckDB, ART index scan chỉ đủ điều kiện khi index nằm trên một cột đơn và không có expression, nên đặt hàm lên cột trong điều kiện lọc có thể làm mất cơ hội dùng index scan.

[click]
Vì vậy, query nên giảm lượng dữ liệu cần xử lý càng sớm càng tốt: lọc bằng điều kiện được phép trên cột gốc, phân trang hoặc dùng `LIMIT`, rồi mới tạo masked output. Chúng ta nên tránh đặt masking function trong `WHERE` hoặc `JOIN` nếu không thật sự cần thiết. Cuối cùng, không nên chỉ suy đoán hiệu năng; cần dùng `EXPLAIN ANALYZE` và benchmark với dữ liệu có quy mô gần production để xác nhận query plan và thời gian thực tế.

[click]
Thông điệp của slide là DDM chủ yếu kiểm soát cách giá trị xuất hiện trong output. Một policy đầy đủ còn phải kiểm soát những phép toán nào người dùng được thực hiện trên dữ liệu nhạy cảm và phải được thiết kế sao cho chi phí runtime chấp nhận được. Sau khi đã nhận diện các giới hạn, slide tiếp theo sẽ ánh xạ từng giới hạn với lớp kiểm soát tương ứng.

[Sources]
- User-provided reference image: codex-clipboard-9836828b-b7eb-429b-b3f6-e4033fdb665c.png
- https://learn.microsoft.com/en-us/sql/relational-databases/security/dynamic-data-masking
- https://duckdb.org/docs/current/guides/performance/indexing
- https://duckdb.org/docs/current/sql/statements/explain
[/Sources]
-->
