---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Chọn approach theo deployment và trust boundary

<div class="choices mt-5">
  <section v-click="1">
    <small>CHỌN CUSTOM DUCKDB KHI</small>
    <h3>Application kiểm soát toàn bộ đường truy cập</h3>
    <p><b>✓</b> Trusted backend</p>
    <p><b>✓</b> File chỉ tồn tại phía server</p>
    <p><b>✓</b> Fixed/parameterized query</p>
    <p><b>✓</b> Embedded hoặc local analytics</p>
  </section>
  <section class="native" v-click="2">
    <small>CHỌN NATIVE DDM KHI</small>
    <h3>Database cần quản trị policy tập trung</h3>
    <p><b>✓</b> Nhiều database user hoặc client tool</p>
    <p><b>✓</b> Nhiều application cùng truy cập</p>
    <p><b>✓</b> Policy cần gắn với principal/context</p>
    <p><b>✓</b> Cần quản trị UNMASK/exempt privilege</p>
  </section>
</div>

<div class="controls mt-5" v-click="3">
  <b>Defense-in-Depth vẫn bắt buộc</b>
  <span>Authentication</span><span>Authorization</span><span>File permission</span><span>Auditing</span>
</div>

<div class="performance mt-4" v-click="4"><b>Với DDM:</b> lọc và giới hạn số hàng trước; kiểm soát filter trên cột nhạy cảm; đo bằng <code>EXPLAIN ANALYZE</code>.</div>

<style scoped>
.choices { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }.choices section { min-height:17rem; padding:1rem 1.2rem; border-top:4px solid #38edf6; background:rgba(255,255,255,.05); }.choices .native { border-color:#2efab0; }.choices small { font-weight:800; letter-spacing:.08em; }.choices h3 { min-height:2.8rem; margin:.6rem 0 .65rem; line-height:1.3; }.choices p { margin:.42rem 0; }.choices p b { color:#087f5b; margin-right:.4rem; }
.controls { display:grid; grid-template-columns:1.25fr repeat(4,1fr); gap:.55rem; align-items:center; padding:.75rem 1rem; border-left:4px solid #ffda58; background:rgba(255,218,88,.06); }.controls span { text-align:center; }.performance { padding:.75rem 1rem; background:rgba(255,255,255,.045); text-align:center; line-height:1.4; }
</style>

<!--
[Sources]
- https://duckdb.org/docs/current/operations_manual/securing_duckdb/overview
- https://learn.microsoft.com/en-us/sql/relational-databases/security/dynamic-data-masking
[/Sources]
-->
