---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Kiến trúc thực thi policy

Node.js xác thực người dùng; DuckDB chỉ nhận <code>role</code> do backend xác định và biến đổi output.{.op-60}

<div class="architecture mt-7">
  <div v-click="2"><small>CLIENT</small><b>Bearer token</b><span>Không gửi <code>role</code></span></div>
  <strong v-click="3">→</strong>
  <div v-click="3"><small>NODE.JS</small><b>Xác thực token</b><span>Tạo <code>req.user.role</code></span></div>
  <strong v-click="4">→</strong>
  <div v-click="4"><small>FIXED QUERY</small><b>Bind theo tên</b><span><code>$viewer_role</code></span></div>
  <strong v-click="5">→</strong>
  <div v-click="5"><small>DUCKDB</small><b>Thực thi macro</b><span>Trả output theo policy</span></div>
</div>

<div v-click="6" class="boundary mt-7">
  <b>RANH GIỚI TIN CẬY</b>
  <span>Node.js giữ file <code>.duckdb</code>, chỉ chạy query định sẵn và không nhận <code>role</code> từ request body.</span>
</div>

<style scoped>
.architecture { display:grid; grid-template-columns:1fr auto 1.08fr auto 1fr auto 1.08fr; gap:.55rem; align-items:center; }
.architecture > div { display:flex; min-width:0; min-height:8rem; flex-direction:column; justify-content:center; padding:1rem .75rem; border-top:4px solid #2efab0; background:rgba(255,255,255,.045); text-align:center; }
.architecture small,.architecture b,.architecture span { display:block; }
.architecture small { color:#88ffff; font-size:.62rem; }
.architecture b { margin-top:.45rem; color:#2efab0; font-size:.82rem; }
.architecture span { margin-top:.4rem; font-size:.7rem; line-height:1.35; opacity:.75; }
.architecture > strong { color:#2efab0; font-size:1.1rem; }
.boundary { display:grid; grid-template-columns:7.6rem 1fr; gap:1rem; align-items:center; min-height:4.4rem; margin-top:2rem !important; padding:1rem 1.2rem; border:1px solid rgba(136,255,255,.3); background:rgba(136,255,255,.05); }
.boundary b { color:#88ffff; font-size:.72rem; }
.boundary span { font-size:.78rem; line-height:1.45; }
</style>

<!--
[Sources]
- https://duckdb.org/docs/current/operations_manual/securing_duckdb/overview
- https://duckdb.org/docs/current/sql/query_syntax/prepared_statements
[/Sources]
-->
