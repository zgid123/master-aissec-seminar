---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Trust boundary trải dài từ application đến hệ điều hành

Masking chỉ được bảo đảm khi mọi đường truy cập đều đi qua các lớp kiểm soát này.{.op-60}

<div class="boundary-chain mt-8">
  <div v-click="1"><small>IDENTITY</small><strong>Token / session</strong><span>Xác định user và role</span></div>
  <b>→</b>
  <div class="enforcer" v-click="2"><small>POLICY ENFORCER</small><strong>Node.js API</strong><span>Chọn query và bind role</span></div>
  <b>→</b>
  <div v-click="3"><small>QUERY ENGINE</small><strong>DuckDB</strong><span>Thực thi masking logic</span></div>
  <b>→</b>
  <div class="storage" v-click="4"><small>STORAGE</small><strong>.duckdb file</strong><span>Được OS và encryption bảo vệ</span></div>
</div>

<div v-click="5" class="boundary-note mt-9">
DuckDB thực thi SQL với quyền của process đang chạy; macro hoặc view tự thân không ngăn được một đường truy cập khác.
</div>

<style scoped>
.boundary-chain { display:grid; grid-template-columns:1fr auto 1fr auto 1fr auto 1fr; gap:.75rem; align-items:center; }
.boundary-chain > div { min-height:11.5rem; padding:1.1rem; border-top:4px solid #38edf6; background:rgba(255,255,255,.05); }
.boundary-chain > .enforcer { border-color:#2efab0; background:rgba(46,250,176,.07); }
.boundary-chain > .storage { border-color:#ffda58; }
.boundary-chain small,.boundary-chain strong,.boundary-chain span { display:block; }
.boundary-chain small { color:#38edf6; font-size:.69rem; font-weight:800; letter-spacing:.07em; }
.boundary-chain .enforcer small { color:#2efab0; }
.boundary-chain .storage small { color:#ffda58; }
.boundary-chain strong { margin-top:1rem; color:#fff; font-size:1rem; }
.boundary-chain span { margin-top:.8rem; color:#b9c8d2; font-size:.82rem; line-height:1.4; }
.boundary-chain > b { color:#2efab0; font-size:1.4rem; }
.boundary-note { padding:1rem 1.15rem; border-left:4px solid #ffda58; background:rgba(255,218,88,.07); color:#f5edc5; font-size:.95rem; line-height:1.48; text-align:center; }
</style>

<!--
[Sources]
- https://duckdb.org/docs/current/operations_manual/securing_duckdb/overview
[/Sources]
-->
