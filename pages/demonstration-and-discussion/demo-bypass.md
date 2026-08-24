---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Ba đường bypass làm mất tác dụng của masking

<div class="intended mt-6" v-click="1">
<small>INTENDED PATH</small><code>Client → Node.js API → role-aware query → masked output</code>
</div>

<div class="bypasses mt-6">
  <div v-click="2">
    <b>01</b><strong>Raw table access</strong>
    <code>SELECT email FROM customers;</code>
    <span>Query bỏ qua macro hoặc view đã che.</span>
  </div>
  <div v-click="3">
    <b>02</b><strong>Raw file access</strong>
    <code>open users.duckdb</code>
    <span>Người dùng mở file bằng process khác.</span>
  </div>
  <div v-click="4">
    <b>03</b><strong>Arbitrary SQL</strong>
    <code>user controls query text</code>
    <span>Untrusted SQL có thể đọc file hoặc cột ngoài dự kiến.</span>
  </div>
</div>

<div v-click="5" class="danger mt-7">
Masking chỉ bảo vệ intended path; mọi đường truy cập song song phải bị loại bỏ hoặc sandbox.
</div>

<style scoped>
.intended { display:flex; align-items:center; gap:1.2rem; padding:1rem 1.15rem; border-left:4px solid #2efab0; background:rgba(46,250,176,.07); }
.intended small { color:#2efab0; font-size:.78rem; font-weight:800; letter-spacing:.08em; }
.intended code { color:#fff; font-size:.9rem; }
.bypasses { display:grid; grid-template-columns:repeat(3,1fr); gap:1.25rem; }
.bypasses > div { min-height:15.5rem; padding:1.2rem; border-top:4px solid #ff8b8b; background:rgba(255,255,255,.05); }
.bypasses b,.bypasses strong,.bypasses code,.bypasses span { display:block; }
.bypasses b { color:#ff9c9c; font-size:1.3rem; }
.bypasses strong { margin-top:.75rem; color:#fff; font-size:1.05rem; }
.bypasses code { margin-top:1.1rem; color:#ffb0b0; font-size:.78rem; }
.bypasses span { margin-top:1rem; color:#cbd7e0; font-size:.86rem; line-height:1.42; }
.danger { color:#f7c6c6; font-size:.98rem; text-align:center; }
</style>

<!--
[Sources]
- https://duckdb.org/docs/current/operations_manual/securing_duckdb/overview
[/Sources]
-->
