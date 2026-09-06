---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# DuckDB là gì?

DuckDB là một <mark>hệ quản trị cơ sở dữ liệu phân tích nhúng</mark>: ứng dụng nạp DuckDB như một thư viện và truy vấn dữ liệu bằng SQL.

<div class="content mt-2">
  <div class="traits">
    <ChevronCard
      v-click="2"
      :animation="false"
      :height="82"
      :chevron-width="72"
      :notch-depth="14"
      :border-radius="8"
      class="transition-opacity duration-300 delay-[0ms]"
      step="01"
      color="#38edf6"
    >
      <ChevronCardHeading class="normal-case tracking-normal">Embedded</ChevronCardHeading>
      <ChevronCardContent>Chạy ngay trong tiến trình ứng dụng; không cần vận hành database server riêng.</ChevronCardContent>
    </ChevronCard>
    <ChevronCard
      v-click="2"
      :animation="false"
      :height="82"
      :chevron-width="72"
      :notch-depth="14"
      :border-radius="8"
      class="transition-opacity duration-300 delay-[160ms]"
      step="02"
      color="#2efab0"
    >
      <ChevronCardHeading class="normal-case tracking-normal">Analytical</ChevronCardHeading>
      <ChevronCardContent>Tối ưu cho scan, join và aggregate trên nhiều dữ liệu bằng xử lý dạng cột.</ChevronCardContent>
    </ChevronCard>
    <ChevronCard
      v-click="2"
      :animation="false"
      :height="82"
      :chevron-width="72"
      :notch-depth="14"
      class="transition-opacity duration-300 delay-[320ms]"
      step="03"
      color="#ffda58"
    >
      <ChevronCardHeading class="normal-case tracking-normal">Portable</ChevronCardHeading>
      <ChevronCardContent>Có thể chạy in-memory hoặc lưu toàn bộ database trong một file <code>.duckdb</code>.</ChevronCardContent>
    </ChevronCard>
  </div>

  <div class="model" v-click="3">
    <small>KIẾN TRÚC EMBEDDED</small>
    <div class="process">
      <span>Ứng dụng</span>
      <b>+</b>
      <span class="duck">DuckDB</span>
    </div>
    <div class="arrow">↕ SQL</div>
    <div class="file"><code>users.duckdb</code><small>DỮ LIỆU TRÊN ĐĨA</small></div>
  </div>
</div>

<style scoped>
.content {
  display: grid;
  grid-template-columns: 1.12fr 0.88fr;
  align-items: start;
  gap: 1.15rem;
}

.traits {
  display: grid;
  gap: 0.4rem;
}

.traits :deep(.alpha-chevron-card-badge > span) {
  font-size: 1.15rem;
}

.model {
  align-self: start;
  padding: 0.9rem 1rem;
  border: 1px solid rgba(46, 250, 176, 0.28);
  background: rgba(46, 250, 176, 0.045);
  text-align: center;
}

.model,
.model * {
  font-size: 16px !important;
}

.model > small {
  font-weight: 800;
  letter-spacing: 0.07em;
  opacity: 0.75;
}

.process {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  margin-top: 1.15rem;
  padding: 1rem 0.7rem;
  border: 1px dashed rgba(255, 255, 255, 0.3);
}

.process span {
  padding: 0.6rem 0.75rem;
  background: rgba(255, 255, 255, 0.07);
  font-weight: 700;
}

.process .duck {
  border: 1px solid rgba(46, 250, 176, 0.45);
  background: rgba(46, 250, 176, 0.12);
}

.arrow {
  margin-top: 0.3rem;
  margin-bottom: 1rem;
  font-weight: 700;
  opacity: 0.7;
}

.file {
  padding: 0.55rem;
  border: 1px solid rgba(255, 218, 88, 0.25);
  background: rgba(255, 218, 88, 0.09);
}

.file code,
.file small {
  display: block;
}

.file small {
  margin-top: 0.12rem;
  font-weight: 800;
  opacity: 0.55;
}
</style>

<!--
Trước khi nói về masking, chúng ta cần hình dung ngắn gọn về DuckDB.

DuckDB là một hệ quản trị cơ sở dữ liệu phân tích nhúng. Ta vẫn dùng SQL, bảng và file database như các hệ quản trị quen thuộc, nhưng cách triển khai khác.

[CLICK] DuckDB có ba đặc điểm chính

Embedded nghĩa là DuckDB chạy ngay bên trong ứng dụng, không cần một database server riêng.

Analytical nghĩa là engine được tối ưu cho các truy vấn đọc và phân tích nhiều dữ liệu như scan, join và aggregate bằng xử lý dạng cột.

Portable nghĩa là DuckDB có thể chạy hoàn toàn trong bộ nhớ hoặc lưu toàn bộ database vào một file duy nhất, giúp khởi động và sao chép môi trường đơn giản.

[CLICK] Sơ đồ bên phải minh họa kiến trúc embedded: ứng dụng và DuckDB chạy trong cùng một tiến trình. Ứng dụng gửi câu lệnh SQL trực tiếp đến DuckDB, còn dữ liệu có thể được lưu trong file `users.duckdb` trên đĩa. Đây là điểm khác biệt quan trọng so với mô hình client-server có database server hoạt động như một dịch vụ riêng.

[Sources]
- https://duckdb.org/why_duckdb
- https://duckdb.org/docs/current/clients/overview
- https://duckdb.org/docs/current/clients/node_neo/overview
[/Sources]
-->
