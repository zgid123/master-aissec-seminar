---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# DuckDB là gì?

DuckDB là **embedded analytical database**: chạy ngay trong tiến trình Node.js và phù hợp với truy vấn phân tích trên dữ liệu dạng cột.{.op-60}

<div class="mt-6 grid grid-cols-3 gap-4 text-base">

<div v-click class="rounded-lg border border-cyan-300/25 bg-cyan-500/8 p-4">
  <div class="mb-2 text-lg text-[#2efab0]">Phân tích tại backend</div>
  Truy vấn trực tiếp dữ liệu khách hàng bằng <b>SQL</b>, không cần vận hành database server riêng.
</div>

<div v-click class="rounded-lg border border-cyan-300/25 bg-cyan-500/8 p-4">
  <div class="mb-2 text-lg text-[#2efab0]">Một tiến trình ứng dụng</div>
  Node.js nạp DuckDB như thư viện; query chạy với quyền của chính tiến trình backend.
</div>

<div v-click class="rounded-lg border border-cyan-300/25 bg-cyan-500/8 p-4">
  <div class="mb-2 text-lg text-[#2efab0]">Một nguồn dữ liệu</div>
  Giữ dữ liệu gốc trong file <b class="text-[#88ffff]">.duckdb</b>; masking chỉ thay đổi output theo <b class="text-[#88ffff]">role</b>.
</div>

</div>

<div v-click="5" class="mt-4 rounded-lg border border-cyan-300/30 bg-cyan-500/8 p-3 text-lg">
Kiến trúc này chỉ an toàn khi mọi truy cập dữ liệu đi qua backend; <b class="text-[#2efab0]">Node.js phải xác thực và truyền access context đáng tin cậy vào DuckDB</b>.
</div>

<!--
[Sources]
- https://duckdb.org/why_duckdb
- https://duckdb.org/docs/current/operations_manual/securing_duckdb/overview
[/Sources]
-->
