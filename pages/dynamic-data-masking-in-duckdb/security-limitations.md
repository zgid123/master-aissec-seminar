---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Vấn đề

<div v-click="1" class="text-xl">
Masking không bảo vệ dữ liệu gốc.
</div>

<div v-click="2" class="op-60">
Việc che dữ liệu chỉ được bảo đảm khi người dùng truy cập thông qua API Node.js.
</div>

<div v-click="2" class="queries mt-5">
<div>

### Đi qua Node.js API

```sql
-- $viewer_role = 'support'
SELECT email_for_role(
  email, $viewer_role
) FROM customers;
```

<strong>→ a***@gmail.com</strong>

</div>
<div class="danger">

### Mở trực tiếp file

```sql
SELECT email
FROM customers;
```

<strong>→ alice@gmail.com</strong>

</div>
</div>

<div class="conditions mt-5">
  <div v-click="3"><b>1</b><span>Backend giữ file <code>.duckdb</code></span></div>
  <div v-click="4"><b>2</b><span>Quyền của hệ điều hành chặn truy cập trực tiếp</span></div>
  <div v-click="5"><b>3</b><span>API không cho phép người dùng tự nhập câu lệnh SQL</span></div>
</div>

<style scoped>
.queries { display:grid; grid-template-columns:1fr 1fr; gap:1.3rem; }
.queries > div { padding:1rem; border-top:4px solid #2efab0; background:rgba(255,255,255,.045); }
.queries > .danger { border-color:#ff8080; }
.queries h3 { margin:0 0 .4rem; font-size:.82rem; }
.queries strong { display:block; margin-top:.55rem; color:#2efab0; text-align:center; }
.queries .danger strong { color:#ff9a9a; }
.conditions { display:grid; grid-template-columns:repeat(3,1fr); gap:.8rem; }
.conditions > div { display:grid; grid-template-columns:1.8rem 1fr; gap:.55rem; align-items:center; min-height:4.4rem; padding:.9rem; background:rgba(255,255,255,.045); font-size:.78rem; line-height:1.4; }
.conditions b { color:#2efab0; font-size:1.05rem; }
</style>

<!--
Giới thiệu vấn đề: cơ chế vừa triển khai vẫn có một giới hạn bảo mật quan trọng.

[click]
Masking chỉ thay đổi kết quả truy vấn; dữ liệu gốc trong file DuckDB không bị thay đổi.

[click]
Khi truy cập qua API Node.js, chính sách trả về email đã che. Nhưng nếu mở trực tiếp file và truy vấn bảng gốc, chúng ta vẫn đọc được email đầy đủ.

[click]
Điều kiện thứ nhất: file DuckDB phải nằm trên server và do backend quản lý. Không được gửi file cho người dùng.

[click]
Điều kiện thứ hai: quyền của hệ điều hành phải bảo đảm rằng chỉ tài khoản chạy backend mới được đọc file. Nếu người dùng mở được file, họ có thể bỏ qua masking.

[click]
Điều kiện thứ ba: API chỉ chạy các truy vấn đã được định nghĩa trước. Nếu cho phép người dùng tự nhập SQL, họ có thể truy vấn trực tiếp cột email để lấy dữ liệu gốc.

Kết luận: đây là application-enforced masking, không phải native authorization của DuckDB.

[Sources]
- https://duckdb.org/docs/current/operations_manual/securing_duckdb/overview
[/Sources]
-->
