---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Quy trình triển khai

Mục tiêu: cùng một bản ghi, nhưng kết quả thay đổi theo quyền đã được xác thực.{.op-60}

<div class="roadmap mt-6">
  <div v-click="2"><b>1</b><span>Xác định dữ liệu<br/>và kết quả mong muốn</span></div>
  <strong v-click="3">→</strong>
  <div v-click="3"><b>2</b><span>Tạo hàm<br/>che dữ liệu</span></div>
  <strong v-click="4">→</strong>
  <div v-click="4"><b>3</b><span>Tạo policy<br/>theo quyền</span></div>
  <strong v-click="5" class="down">↓</strong>
  <div v-click="5" class="step-4"><b>4</b><span>Node.js<br/>xác thực người dùng</span></div>
  <strong v-click="6" class="back-5">←</strong>
  <div v-click="6" class="step-5"><b>5</b><span>Truyền quyền<br/>vào DuckDB</span></div>
  <strong v-click="7" class="back-6">←</strong>
  <div v-click="7" class="step-6"><b>6</b><span>Kiểm tra kết quả</span></div>
</div>

<div v-click="8" class="mt-6 rounded-lg border border-cyan-300/30 bg-cyan-500/8 p-3 text-center text-base">
DuckDB thực thi masking logic; Node.js cung cấp <code>viewer_role</code> đáng tin cậy.
</div>

<style scoped>
.roadmap { display:grid; grid-template-columns:minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr); grid-template-rows:auto 1.4rem auto; gap:.6rem; align-items:center; }
.roadmap > div { display:flex; min-width:0; height:6.25rem; box-sizing:border-box; flex-direction:column; justify-content:center; padding:1rem .7rem; border-top:3px solid #2efab0; background:rgba(255,255,255,.045); text-align:center; }
.roadmap b,.roadmap span { display:block; }
.roadmap b,.roadmap > strong { color:#2efab0; }
.roadmap b { font-size:1.1rem; }
.roadmap span { margin-top:.4rem; font-size:.72rem; line-height:1.4; opacity:.75; }
.roadmap > .down { grid-column:5; grid-row:2; text-align:center; }
.roadmap > .step-4 { grid-column:5; grid-row:3; }
.roadmap > .back-5 { grid-column:4; grid-row:3; text-align:center; }
.roadmap > .step-5 { grid-column:3; grid-row:3; }
.roadmap > .back-6 { grid-column:2; grid-row:3; text-align:center; }
.roadmap > .step-6 { grid-column:1; grid-row:3; }
</style>
