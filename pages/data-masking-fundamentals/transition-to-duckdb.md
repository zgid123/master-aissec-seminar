---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Từ khái niệm sang triển khai

Quy tắc che dữ liệu được thực thi ở đâu?{.op-90}

<div class="cases mt-6">
  <div v-click="1">
    <small>DBMS TRUYỀN THỐNG</small>
    <p>Quy tắc che dữ liệu có thể được thực thi ngay tại lớp CSDL.</p>
  </div>
  <div v-click="2" class="duckdb">
    <small>DUCKDB</small>
    <p>Là CSDL nhúng: ứng dụng xác thực quyền, DuckDB thực hiện cơ chế che dữ liệu trên kết quả.</p>
  </div>
</div>

<div class="pipe mt-6" v-click="2">
  <span>Người dùng</span><b>→</b>
  <span>Ứng dụng</span><b>→</b>
  <span>DuckDB</span><b>→</b>
  <span class="hi">Kết quả</span>
</div>

<div class="question mt-6" v-click="3">
Quyền của người dùng được xác thực và truyền vào <b class="text-[#88ffff]">DuckDB</b> như thế nào để tạo ra <b class="text-[#88ffff]">kết quả phù hợp</b>?
</div>

<style scoped>
.cases { display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; align-items:start; }
.cases > div { min-height:6.4rem; padding:1.05rem; border-left:4px solid #88ffff; background:rgba(255,255,255,.05); }
.cases > .duckdb { border-color:#2efab0; }
.cases small { display:block; margin-bottom:.5rem; color:#88ffff; font-size:.85rem; font-weight:700; letter-spacing:.02em; }
.cases > .duckdb small { color:#2efab0; }
.cases p { margin:0; font-size:.98rem; line-height:1.45; opacity:.92; }
.pipe { display:flex; align-items:center; justify-content:center; gap:.6rem; padding:.9rem; background:rgba(46,250,176,.06); }
.pipe span { padding:.35rem .7rem; background:rgba(255,255,255,.07); font-size:.98rem; }
.pipe .hi { color:#2efab0; }
.pipe b { color:#2efab0; font-size:1.05rem; }
.question { padding:1rem 1.1rem; border:1px solid rgba(136,255,255,.4); background:rgba(136,255,255,.06); font-size:1.05rem; line-height:1.5; }
</style>

<!--Khái niệm tới đây đã rõ, nhưng còn một câu hỏi chưa trả lời. Quy tắc che dữ liệu đó được thực thi ở đâu?

[CLICK] Với một DBMS truyền thống, quy tắc che dữ liệu có thể được khai báo và thực thi ngay tại lớp CSDL, dựa trên người dùng và quyền đã được cấp trong hệ quản trị.

[CLICK] DuckDB thì khác. Đây là một CSDL nhúng, chạy ngay trong tiến trình của ứng dụng. Phần xác thực quyền thuộc về ứng dụng, còn DuckDB làm phần biến đổi để tạo ra kết quả tương ứng với quyền đó.

[CLICK] Nên câu hỏi tiếp theo là quyền của người dùng được xác thực và truyền vào DuckDB như thế nào để tạo ra kết quả phù hợp. Phần trả lời mình xin nhường lại cho phần ba. Mình xin mời bạn Trần Huy Vũ trình bày Dynamic Data Masking trong DuckDB. Cảm ơn mọi người.-->
