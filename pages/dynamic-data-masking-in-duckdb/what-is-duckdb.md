---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# DuckDB là gì?

DuckDB là một **hệ quản trị cơ sở dữ liệu quan hệ mã nguồn mở, dạng nhúng và lưu trữ theo cột**, được thiết kế chuyên biệt cho xử lý phân tích hiệu năng cao (OLAP).{.op-60}

<div class="mt-6 grid grid-cols-3 gap-4 text-sm">

<div v-click class="rounded-lg border border-cyan-300/25 bg-cyan-500/8 p-4">
  <div class="mb-2 text-xl text-[#2efab0]">Phân tích dữ liệu</div>
  DuckDB được tối ưu cho các truy vấn đọc, tổng hợp và xử lý một lượng lớn dữ liệu bằng <b>SQL</b>.
</div>

<div v-click class="rounded-lg border border-cyan-300/25 bg-cyan-500/8 p-4">
  <div class="mb-2 text-xl text-[#2efab0]">Không cần máy chủ</div>
  Ứng dụng nạp DuckDB như một thư viện. Không cần cài đặt hay vận hành một database server riêng.
</div>

<div v-click class="rounded-lg border border-cyan-300/25 bg-cyan-500/8 p-4">
  <div class="mb-2 text-xl text-[#2efab0]">Làm việc trực tiếp</div>
  Có thể truy vấn file <b>CSV, JSON, Parquet</b>, DataFrame hoặc dữ liệu lưu trong file <code>.duckdb</code>.
</div>

</div>

<div v-click="5" class="mt-3 rounded-lg border border-cyan-300/30 bg-cyan-500/8 p-3 text-base">
DuckDB xử lý SQL ngay trong tiến trình của ứng dụng, vì vậy không có lớp máy chủ đứng giữa người dùng và dữ liệu. <b class="text-[#2efab0]">Ứng dụng phải quyết định ai được xem dữ liệu nào</b>.
</div>
