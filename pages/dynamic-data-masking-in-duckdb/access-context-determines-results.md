---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Bước 6 - Kiểm tra kết quả

<p class="results-summary">Cùng endpoint, cùng truy vấn và cùng dữ liệu gốc; chỉ xác minh quyền khác nhau.</p>

<div class="trace mt-6">
  <div v-click="2" class="header"><span>NGƯỜI DÙNG</span><span>req.user.role</span><span>$viewer_role</span><span>NHÁNH MACRO</span><span>KẾT QUẢ</span></div>
  <div v-click="2"><b>Mai</b><span><code>manager</code></span><span><code>'manager'</code></span><span><code>THEN email_value</code></span><strong>alice@gmail.com</strong></div>
  <div v-click="2" class="restricted"><b>Nam</b><span><code>support</code></span><span><code>'support'</code></span><span><code>THEN mask_email(...)</code></span><strong>a***@gmail.com</strong></div>
</div>

<div v-click="3" class="pipeline mt-7">
  <span>Token</span><b>→</b>
  <span>req.user.role</span><b>→</b>
  <span>$viewer_role</span><b>→</b>
  <span>email_for_role()</span><b>→</b>
  <span>Kết quả</span>
</div>

<div v-click="4" class="dynamic-note mt-6">
Đây là yếu tố “Dynamic”: cùng query và dữ liệu gốc, policy đổi output <b class="text-[#2efab0]">tại thời điểm truy vấn</b>.
</div>

<style scoped>
.slidev-layout h1 { font-size: 2rem; }
.results-summary { margin:.35rem 0 0; color:#dce5ea; font-size:clamp(1.05rem, 1.45vw, 1.2rem); line-height:1.45; opacity:.86; }
.trace { display:grid; gap:.5rem; }
.trace > div { display:grid; grid-template-columns:.65fr .9fr .9fr 1.35fr 1.15fr; gap:.55rem; align-items:center; min-height:3.9rem; padding:1rem; border-left:4px solid #88ffff; background:rgba(255,255,255,.045); font-size:clamp(.88rem, 1.08vw, .96rem); }
.trace > .header { min-height:auto; padding:.35rem 1rem; border:0; background:transparent; color:#88ffff; font-size:clamp(.72rem, .9vw, .8rem); }
.trace > .restricted { border-color:#2efab0; }
.trace b,.trace strong { color:#88ffff; }
.trace .restricted b,.trace .restricted strong { color:#2efab0; }
.pipeline { display:flex; justify-content:center; gap:.8rem; padding:1.15rem; background:rgba(46,250,176,.06); font-size:clamp(.9rem, 1.1vw, .98rem); }
.pipeline b { color:#2efab0; }
.dynamic-note { font-size:clamp(1.08rem, 1.4vw, 1.22rem); line-height:1.5; }
</style>
