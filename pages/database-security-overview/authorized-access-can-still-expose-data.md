---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Quyền truy cập vẫn có thể làm lộ dữ liệu

<div class="exposure mt-5">
  <div>
    <small>Customer Support</small>
    <p><span>✓</span> Authenticated</p>
    <p><span>✓</span> Authorized</p>
    <p><span>✓</span> Secure connection</p>
    <p><span>✓</span> Database encrypted</p>
  </div>
  <b>→</b>
  <div class="record">
    <small>Customer record</small>
    <p>Name <span>✓</span></p>
    <p>Order status <span>✓</span></p>
    <p>Email / Phone <span>?</span></p>
    <p>Credit card / Salary <span>✕</span></p>
  </div>
</div>

<div v-click class="mt-6 text-center text-xl text-[#2efab0]">
How can users access what they need without seeing sensitive information they do not need?
</div>

<style scoped>
.exposure { display:grid; grid-template-columns:1fr auto 1fr; gap:1.25rem; align-items:center; }
.exposure > div { padding:1rem 1.2rem; border:1px solid rgba(136,255,255,.28); background:rgba(255,255,255,.045); }
.exposure > b { color:#2efab0; font-size:1.7rem; }
.exposure small { display:block; color:#88ffff; margin-bottom:.75rem; }
.exposure p { display:flex; justify-content:space-between; margin:.45rem 0; font-size:.78rem; }
.exposure span { color:#2efab0; }
.exposure .record p:last-child span { color:#ff9b9b; }
</style>
