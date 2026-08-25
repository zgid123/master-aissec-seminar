---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Từ khái niệm sang triển khai

Quy tắc che dữ liệu được thực thi ở đâu?{.op-90}

<div class="cases mt-5">
  <div v-click="1">
    <small>DBMS TRUYỀN THỐNG</small>
    <p>Mỗi người dùng có một tài khoản riêng trong hệ quản trị, nên quy tắc che dữ liệu được khai báo trực tiếp trên cột.</p>
    <p class="target">Hệ quản trị biết ai đang truy vấn nên tự áp quy tắc đó.</p>
  </div>
  <div v-click="2" class="duckdb">
    <small>DUCKDB</small>
    <p>Là CSDL nhúng, chạy trong tiến trình của ứng dụng và không quản lý tài khoản người dùng.</p>
    <p class="target">Ứng dụng xác thực quyền, DuckDB biến đổi kết quả theo quyền đó.</p>
  </div>
</div>

<div class="pipe mt-5" v-click="2">
  <span>Người dùng</span><b>→</b>
  <span>Ứng dụng</span><b>→</b>
  <span>DuckDB</span><b>→</b>
  <span class="hi">Kết quả</span>
</div>

<div class="question mt-5" v-click="3">
Quyền của người dùng được xác thực và truyền vào <b class="text-[#88ffff]">DuckDB</b> như thế nào để tạo ra <b class="text-[#88ffff]">kết quả phù hợp</b>?
</div>

<style scoped>
.cases { display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:1.25rem; align-items:stretch; }
.cases > div { box-sizing:border-box; width:100%; height:100%; min-height:9.2rem; padding:1.05rem; border-left:4px solid #88ffff; background:rgba(255,255,255,.05); }
.cases > .duckdb { border-color:#2efab0; }
.cases small { display:block; margin-bottom:.5rem; color:#88ffff; font-size:.85rem; font-weight:700; letter-spacing:.02em; }
.cases > .duckdb small { color:#2efab0; }
.cases p { margin:0; font-size:.98rem; line-height:1.45; opacity:.92; }
.cases .target { margin-top:.65rem; padding-top:.5rem; border-top:1px dashed rgba(255,255,255,.25); font-size:.95rem; opacity:.88; }
.pipe { display:flex; align-items:center; justify-content:center; gap:.6rem; padding:.9rem; background:rgba(46,250,176,.06); }
.pipe span { padding:.35rem .7rem; background:rgba(255,255,255,.07); font-size:.98rem; }
.pipe .hi { color:#2efab0; }
.pipe b { color:#2efab0; font-size:1.05rem; }
.question { padding:1rem 1.1rem; border:1px solid rgba(136,255,255,.4); background:rgba(136,255,255,.06); font-size:1.05rem; line-height:1.5; }
</style>

<!--Khái niệm tới đây đã rõ, nhưng còn một câu hỏi chưa trả lời. Quy tắc che dữ liệu đó được thực thi ở đâu?

[CLICK] Với các DBMS truyền thống như SQL Server hay Oracle, mỗi người dùng có một tài khoản riêng để đăng nhập vào hệ quản trị. Nghĩa là bản thân hệ quản trị biết chính xác ai đang gửi truy vấn. Nhử vậy, người quản trị chỉ cần khai báo một lần lên cột dữ liệu, ví dụ cột email hay cột lương, rằng những quyền nào sẽ thấy giá trị đã che. Sau đó mọi truy vấn đi vào đều được hệ quản trị tự động áp quy tắc, ứng dụng phía trên không phải làm gì thêm.

[CLICK] DuckDB thì khác ở chỗ đó. Nó là CSDL nhúng, chạy ngay trong tiến trình của ứng dụng và không quản lý tài khoản người dùng, nên nó không tự biết ai đang xem dữ liệu. Người dùng đăng nhập vào ứng dụng, ứng dụng xác thực quyền, rồi DuckDB dựa trên quyền đó để biến đổi kết quả trả về.

[CLICK] Nên câu hỏi tiếp theo là quyền của người dùng được xác thực và truyền vào DuckDB như thế nào để tạo ra kết quả phù hợp. Phần trả lời mình xin nhường lại cho phần ba. Mình xin mời bạn Trần Huy Vũ trình bày Dynamic Data Masking trong DuckDB. Cảm ơn mọi người.-->
