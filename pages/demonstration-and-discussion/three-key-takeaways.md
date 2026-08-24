---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# DuckDB tạo masking; application enforce quyền

<div class="answer mt-5" v-click="1">
Dynamic Data Masking có thể được xây dựng bằng SQL expression, macro và verified access context mà không thay đổi dữ liệu gốc.
</div>

<div class="evidence mt-5">
  <div v-click="2"><b>01</b><span><strong>Behavior</strong>Cùng record tạo ra output khác nhau tại query time.</span></div>
  <div v-click="3"><b>02</b><span><strong>Boundary</strong>Macro và view không tự ngăn raw table, raw file hay arbitrary SQL.</span></div>
  <div v-click="4"><b>03</b><span><strong>Condition</strong>Application, DuckDB runtime và OS phải phối hợp theo Defense-in-Depth.</span></div>
</div>

<div v-click="5" class="final-line mt-5">
<b>Masking logic</b> trả lời “che như thế nào”; <strong>Access Control</strong> trả lời “ai được xem gì”.
</div>

<style scoped>
.answer { max-width:48rem; margin-left:auto; margin-right:auto; padding:1rem 1.3rem; border:1px solid rgba(46,250,176,.4); background:rgba(46,250,176,.08); color:#e9fff7; font-size:1.06rem; font-weight:600; line-height:1.45; text-align:center; }
.evidence { display:grid; gap:.5rem; }
.evidence > div { display:grid; grid-template-columns:3rem 1fr; gap:1rem; align-items:center; min-height:3.8rem; padding:.65rem 1rem; border-left:4px solid #2efab0; background:rgba(255,255,255,.05); }
.evidence b { color:#2efab0; font-size:1.05rem; }
.evidence span { color:#cbd7e0; font-size:.9rem; }
.evidence strong { display:inline-block; min-width:6rem; color:#fff; }
.final-line { color:#dce7ed; font-size:1rem; text-align:center; }
.final-line b { color:#38edf6; }
.final-line strong { color:#2efab0; }
</style>
