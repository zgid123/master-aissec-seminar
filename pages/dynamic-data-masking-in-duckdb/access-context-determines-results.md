---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Bước 6 — Kiểm tra kết quả động

Cùng endpoint, cùng query và cùng dữ liệu gốc; chỉ verified role khác nhau.{.op-60}

<div class="trace mt-6">
  <div v-click="2" class="header"><span>USER</span><span>req.user.role</span><span>$viewer_role</span><span>MACRO BRANCH</span><span>OUTPUT</span></div>
  <div v-click="2"><b>Mai</b><span><code>manager</code></span><span><code>'manager'</code></span><span><code>THEN email_value</code></span><strong>alice@gmail.com</strong></div>
  <div v-click="2" class="restricted"><b>Nam</b><span><code>support</code></span><span><code>'support'</code></span><span><code>THEN mask_email(...)</code></span><strong>a***@gmail.com</strong></div>
</div>

<div v-click="3" class="pipeline mt-7">
  <span>Token</span><b>→</b>
  <span>req.user.role</span><b>→</b>
  <span>$viewer_role</span><b>→</b>
  <span>email_for_role()</span><b>→</b>
  <span>Output</span>
</div>

<div v-click="4" class="mt-6 text-center text-lg">
Đây là yếu tố “Dynamic”: policy được áp dụng <b class="text-[#2efab0]">tại thời điểm query</b>.
</div>

<style scoped>
.trace { display:grid; gap:.5rem; }
.trace > div { display:grid; grid-template-columns:.65fr .9fr .9fr 1.35fr 1.15fr; gap:.5rem; align-items:center; padding:.85rem; border-left:4px solid #88ffff; background:rgba(255,255,255,.045); font-size:.66rem; }
.trace > .header { padding:.3rem .85rem; border:0; background:transparent; color:#88ffff; font-size:.54rem; }
.trace > .restricted { border-color:#2efab0; }
.trace b,.trace strong { color:#88ffff; }
.trace .restricted b,.trace .restricted strong { color:#2efab0; }
.pipeline { display:flex; justify-content:center; gap:.7rem; padding:1rem; background:rgba(46,250,176,.06); font-size:.66rem; }
.pipeline b { color:#2efab0; }
</style>
