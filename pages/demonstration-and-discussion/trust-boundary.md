---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Trust boundary trải dài từ application đến hệ điều hành

Masking chỉ được bảo đảm khi mọi đường truy cập đều đi qua các lớp kiểm soát này.{.op-60}

<div class="boundary-chain mt-8">
  <div v-click="1"><small>IDENTITY</small><strong>Token / session</strong><span>Xác định user và role</span></div>
  <b v-click="2">→</b>
  <div class="enforcer" v-click="2"><small>POLICY ENFORCER</small><strong>Node.js API</strong><span>Chọn query và bind role</span></div>
  <b v-click="3">→</b>
  <div v-click="3"><small>QUERY ENGINE</small><strong>DuckDB</strong><span>Thực thi masking logic</span></div>
  <b v-click="4">→</b>
  <div class="storage" v-click="4"><small>STORAGE</small><strong>.duckdb file</strong><span>Được OS và encryption bảo vệ</span></div>
</div>

<div v-click="5" class="boundary-note mt-9">
DuckDB thực thi SQL với quyền của process đang chạy; macro hoặc view tự thân không ngăn được một đường truy cập khác.
</div>

<style scoped>
.boundary-chain { display:grid; grid-template-columns:1fr auto 1fr auto 1fr auto 1fr; gap:.75rem; align-items:center; }
.boundary-chain > div { min-height:11.5rem; padding:1.1rem; border-top:4px solid #38edf6; background:rgba(255,255,255,.05); }
.boundary-chain > .enforcer { border-color:#2efab0; background:rgba(46,250,176,.07); }
.boundary-chain > .storage { border-color:#ffda58; }
.boundary-chain small,.boundary-chain strong,.boundary-chain span { display:block; }
.boundary-chain small { color:#38edf6; font-size:.69rem; font-weight:800; letter-spacing:.07em; }
.boundary-chain .enforcer small { color:#2efab0; }
.boundary-chain .storage small { color:#ffda58; }
.boundary-chain strong { margin-top:1rem; color:#fff; font-size:1rem; }
.boundary-chain span { margin-top:.8rem; color:#b9c8d2; font-size:.82rem; line-height:1.4; }
.boundary-chain > b { color:#2efab0; font-size:1.4rem; }
.boundary-note { padding:1rem 1.15rem; border-left:4px solid #ffda58; background:rgba(255,218,88,.07); color:#f5edc5; font-size:.95rem; line-height:1.48; text-align:center; }
</style>

<!--
Để trả lời câu hỏi ai kiểm soát đường đi đến dữ liệu, chúng ta cần nhìn vào trust boundary, tức là ranh giới mà bên trong đó các thành phần được tin cậy để thực thi policy. Trong kiến trúc demo này, ranh giới đó không chỉ nằm trong DuckDB mà trải dài qua bốn lớp.

[click]
Lớp đầu tiên là Identity. Token hoặc session phải cho hệ thống biết người đang gửi request là ai và họ có role gì. Điểm quan trọng là role phải được suy ra từ thông tin đã được server xác thực. Nếu client có thể tự gửi một chuỗi như `admin` hoặc `support` và backend tin ngay chuỗi đó, người dùng có thể tự nâng quyền mà không cần tấn công DuckDB.

[click]
Lớp thứ hai là Node.js API, đóng vai trò policy enforcer. Backend quyết định endpoint nào được gọi, cấu trúc query nào được sử dụng và role nào được bind vào query. Đây là lớp thực sự enforce việc ai được xem dữ liệu gì. Prepared statement giúp bind giá trị an toàn, nhưng vẫn cần backend kiểm soát toàn bộ cấu trúc câu query.

[click]
Lớp thứ ba là DuckDB. DuckDB nhận query đã được backend xây dựng, sau đó thực thi macro, view hoặc SQL expression để tạo output đã che. DuckDB chịu trách nhiệm thực hiện masking logic, nhưng trong mô hình này DuckDB không tự xác thực end user và cũng không tự biết token của họ có đáng tin hay không.

[click]
Lớp cuối cùng là storage, cụ thể là file `.duckdb`. File này cần được bảo vệ bằng quyền của hệ điều hành, service account và encryption khi phù hợp. Nếu một người có thể sao chép hoặc mở trực tiếp file, họ không cần đi qua macro hay API nữa.

[click]
Điểm cần ghi nhớ là DuckDB thực thi SQL bằng quyền của process đang chạy. Vì vậy, macro và view là công cụ để tạo behavior, nhưng tự thân chúng không phải một security boundary hoàn chỉnh. Từ ranh giới này, slide tiếp theo sẽ chỉ ra ba đường bypass cụ thể nhất.

[Sources]
- https://duckdb.org/docs/current/operations_manual/securing_duckdb/overview
[/Sources]
-->
