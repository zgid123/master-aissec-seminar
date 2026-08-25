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
.architecture > div { display:flex; min-width:0; min-height:9rem; flex-direction:column; justify-content:center; padding:1.1rem .85rem; border-top:4px solid #2efab0; background:rgba(255,255,255,.045); text-align:center; }
.architecture small,.architecture b,.architecture span { display:block; }
.architecture small { color:#88ffff; font-size:clamp(.72rem, .9vw, .8rem); }
.architecture b { margin-top:.55rem; color:#2efab0; font-size:clamp(.92rem, 1.15vw, 1.02rem); text-align:left; }
.architecture span { margin-top:.5rem; font-size:clamp(.8rem, 1vw, .9rem); line-height:1.4; opacity:.82; }
.architecture > strong { color:#2efab0; font-size:1.4rem; }
.boundary { display:grid; grid-template-columns:9.2rem 1fr; gap:1.15rem; align-items:center; min-height:5rem; margin-top:2rem !important; padding:1.1rem 1.3rem; border:1px solid rgba(136,255,255,.3); background:rgba(136,255,255,.05); }
.boundary b { color:#88ffff; font-size:clamp(.8rem, 1vw, .88rem); }
.boundary span { font-size:clamp(.86rem, 1.05vw, .94rem); line-height:1.45; }
</style>

<!--
[Sources]
- https://duckdb.org/docs/current/operations_manual/securing_duckdb/overview
- https://duckdb.org/docs/current/sql/query_syntax/prepared_statements
[/Sources]
-->
