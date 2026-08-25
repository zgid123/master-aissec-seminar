---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Ba đường bypass làm mất tác dụng của masking

<div class="intended mt-6" v-click="1">
<small>INTENDED PATH</small><code>Client → Node.js API → role-aware query → masked output</code>
</div>

<div class="bypasses mt-6">
  <div v-click="2">
    <b>01</b><strong>Raw table access</strong>
    <code>SELECT email FROM customers;</code>
    <span>Query bỏ qua macro hoặc view đã che.</span>
  </div>
  <div v-click="3">
    <b>02</b><strong>Raw file access</strong>
    <code>open users.duckdb</code>
    <span>Người dùng mở file bằng process khác.</span>
  </div>
  <div v-click="4">
    <b>03</b><strong>Arbitrary SQL</strong>
    <code>user controls query text</code>
    <span>Untrusted SQL có thể đọc file hoặc cột ngoài dự kiến.</span>
  </div>
</div>

<div v-click="5" class="danger mt-7">
Masking chỉ bảo vệ intended path; mọi đường truy cập song song phải bị loại bỏ hoặc sandbox.
</div>

<style scoped>
.intended { display:flex; align-items:center; gap:1.2rem; padding:1rem 1.15rem; border-left:4px solid #2efab0; background:rgba(46,250,176,.07); }
.intended small { color:#2efab0; font-size:.78rem; font-weight:800; letter-spacing:.08em; }
.intended code { color:#fff; font-size:.9rem; }
.bypasses { display:grid; grid-template-columns:repeat(3,1fr); gap:1.25rem; }
.bypasses > div { min-height:15.5rem; padding:1.2rem; border-top:4px solid #ff8b8b; background:rgba(255,255,255,.05); }
.bypasses b,.bypasses strong,.bypasses code,.bypasses span { display:block; }
.bypasses b { color:#ff9c9c; font-size:1.3rem; }
.bypasses strong { margin-top:.75rem; color:#fff; font-size:1.05rem; }
.bypasses code { margin-top:1.1rem; color:#ffb0b0; font-size:.78rem; }
.bypasses span { margin-top:1rem; color:#cbd7e0; font-size:.86rem; line-height:1.42; }
.danger { color:#f7c6c6; font-size:.98rem; text-align:center; }
</style>

<!--
Slide này mô tả ba đường truy cập có thể làm cho masking mất tác dụng. Trước hết, nhóm em xin nhấn mạnh rằng bypass ở đây không nhất thiết là phá được hàm masking. Người dùng chỉ cần tìm được một đường đi không gọi hàm đó là đã có thể thấy dữ liệu gốc.

[click]
Đường màu xanh ở phía trên là intended path, tức là luồng mà hệ thống mong muốn: client gửi request đến Node.js API, API xác thực role, chạy role-aware query và chỉ trả masked output cho người dùng. Nếu mọi request đều đi đúng theo đường này thì policy hoạt động như thiết kế.

[click]
Đường bypass thứ nhất là raw table access. Ví dụ, macro hoặc view của chúng ta trả email đã che, nhưng người dùng lại có quyền chạy trực tiếp `SELECT email FROM customers`. Câu query này đọc thẳng cột gốc nên không hề đi qua masking rule. Điều đó cho thấy view chỉ bảo vệ khi quyền truy cập bắt buộc đi qua view; nó không tự động thu hồi quyền trên bảng gốc.

[click]
Đường bypass thứ hai là raw file access. DuckDB là embedded database và dữ liệu có thể nằm trong một file `.duckdb`. Nếu người dùng đọc được file đó, họ có thể mở nó bằng một process hoặc công cụ khác rồi query bảng gốc. Lúc này backend, token và role-aware query đều không còn nằm trên đường truy cập của họ. Vì vậy file phải được giữ ở server và chỉ service account cần thiết mới có quyền đọc.

[click]
Đường bypass thứ ba là arbitrary SQL, tức là cho người dùng kiểm soát toàn bộ query text. Đây là phạm vi rộng hơn SQL injection. Ngay cả khi chuỗi SQL không được chèn qua một lỗ hổng, việc cung cấp một SQL console không được sandbox cũng cho phép người dùng chọn cột khác, đọc file ngoài dự kiến hoặc gọi những chức năng mà API không định expose. Prepared statement không giải quyết trường hợp này, vì prepared statement chỉ bảo vệ các value khi application vẫn kiểm soát query structure.

[click]
Kết luận của slide là masking chỉ bảo vệ intended path. Muốn policy có giá trị bảo mật, mọi đường truy cập song song phải bị loại bỏ hoặc được đặt trong một sandbox đủ mạnh. Ngoài các đường bypass trực tiếp này, DDM còn có thể làm lộ thông tin theo cách gián tiếp qua chính điều kiện query; đó là nội dung của slide tiếp theo.

[Sources]
- https://duckdb.org/docs/current/operations_manual/securing_duckdb/overview
[/Sources]
-->
