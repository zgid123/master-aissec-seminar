---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Bước 7 - Hiệu năng

<p class="performance-summary">Thu hẹp số hàng trước khi masking; không cho support thử filter tùy ý trên dữ liệu nhạy cảm vì có thể suy luận giá trị gốc.</p>

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
.performance-summary { margin:.35rem 0 0; color:#dce5ea; font-size:clamp(1.05rem, 1.45vw, 1.2rem); line-height:1.45; opacity:.86; }
.query-path > div { box-sizing:border-box; width:100%; height:7.2rem; padding:.85rem; border-top:3px solid #2efab0; background:rgba(255,255,255,.045); text-align:left; }
.query-path small,.query-path b,.query-path span { display:block; }
.query-path small { color:#88ffff; font-size:clamp(.7rem, .85vw, .76rem); }
.query-path b { margin-top:.3rem; color:#2efab0; font-size:clamp(.84rem, 1vw, .92rem); text-align:left; }
.query-path span { margin-top:.4rem; font-size:clamp(.74rem, .9vw, .82rem); line-height:1.4; opacity:.8; }
.query-path > strong { color:#2efab0; font-size:1.3rem; }
.examples { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
.examples > div { min-height:7.3rem; padding:1rem 1.1rem; border-left:4px solid #2efab0; background:rgba(46,250,176,.055); }
.examples > .avoid { border-color:#ff8080; background:rgba(255,128,128,.05); }
.examples small { display:block; color:#2efab0; font-size:clamp(.7rem, .85vw, .76rem); font-weight:700; }
.examples .avoid small { color:#ff9a9a; }
.examples code { display:block; margin:.45rem 0; font-size:clamp(.82rem, 1vw, .9rem); }
.examples p { margin:0; font-size:clamp(.76rem, .95vw, .84rem); line-height:1.45; opacity:.82; }
</style>

<!--
Gợi ý trình bày: không khẳng định optimizer luôn thực thi đúng thứ tự hình vẽ; đây là nguyên tắc thiết kế query để giảm số hàng phải masking. Dùng EXPLAIN ANALYZE trên dữ liệu thật để xác nhận plan.

[Sources]
- https://duckdb.org/docs/current/guides/performance/indexing
- https://duckdb.org/docs/current/sql/statements/explain
[/Sources]
-->
