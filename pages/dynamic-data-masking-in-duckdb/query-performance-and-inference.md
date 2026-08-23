---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Bước 7 - Hiệu năng

Thu hẹp số hàng trước khi masking; không cho support thử filter tùy ý trên dữ liệu nhạy cảm vì có thể suy luận giá trị gốc.{.op-60}

<div class="query-path mt-5">
  <div v-click="2"><small>1</small><b>WHERE</b><span>Lọc trên cột gốc được phép</span></div><strong v-click="3">→</strong>
  <div v-click="3"><small>2</small><b>INDEX / ZONEMAP</b><span>Giảm số hàng cần đọc</span></div><strong v-click="4">→</strong>
  <div v-click="4"><small>3</small><b>LIMIT</b><span>Chỉ lấy số hàng cần trả</span></div><strong v-click="5">→</strong>
  <div v-click="5"><small>4</small><b>SELECT mask_email(...)</b><span>Che dữ liệu trước khi output</span></div>
</div>

<div class="examples mt-5">
  <div v-click="6">
    <small>NÊN</small>
    <code>WHERE id = $id<br/>LIMIT $page_size</code>
    <p>Giữ điều kiện trên cột gốc; dùng <b>EXPLAIN ANALYZE</b> để kiểm tra query plan.</p>
  </div>
  <div v-click="7" class="avoid">
    <small>TRÁNH</small>
    <code>WHERE mask_email(email) = $email</code>
    <p>Biểu thức masking làm thêm CPU và không đủ điều kiện dùng ART index scan trên cột email.</p>
  </div>
</div>

<style scoped>
.query-path { display:grid; grid-template-columns:repeat(3,minmax(0,1fr) auto) minmax(0,1fr); gap:.45rem; align-items:center; }
.query-path > div { box-sizing:border-box; width:100%; height:6.4rem; padding:.7rem; border-top:3px solid #2efab0; background:rgba(255,255,255,.045); text-align:center; }
.query-path small,.query-path b,.query-path span { display:block; }
.query-path small { color:#88ffff; font-size:.62rem; }
.query-path b { margin-top:.2rem; color:#2efab0; font-size:.75rem; }
.query-path span { margin-top:.3rem; font-size:.65rem; line-height:1.35; opacity:.72; }
.query-path > strong { color:#2efab0; }
.examples { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
.examples > div { padding:.8rem 1rem; border-left:4px solid #2efab0; background:rgba(46,250,176,.055); }
.examples > .avoid { border-color:#ff8080; background:rgba(255,128,128,.05); }
.examples small { display:block; color:#2efab0; font-size:.62rem; font-weight:700; }
.examples .avoid small { color:#ff9a9a; }
.examples code { display:block; margin:.35rem 0; font-size:.72rem; }
.examples p { margin:0; font-size:.68rem; line-height:1.4; opacity:.74; }
</style>

<!--
Gợi ý trình bày: không khẳng định optimizer luôn thực thi đúng thứ tự hình vẽ; đây là nguyên tắc thiết kế query để giảm số hàng phải masking. Dùng EXPLAIN ANALYZE trên dữ liệu thật để xác nhận plan.

[Sources]
- https://duckdb.org/docs/current/guides/performance/indexing
- https://duckdb.org/docs/current/sql/statements/explain
[/Sources]
-->
