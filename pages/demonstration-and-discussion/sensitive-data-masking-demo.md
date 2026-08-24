---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Demo dùng cùng một record với hai mức hiển thị

<div class="records mt-8">
  <section v-click="1">
    <small>ORIGINAL RECORD</small>
    <pre>Alice Smith
alice@gmail.com
0901234567
4111 1111 1111 1234
50,000,000</pre>
  </section>
  <div class="mask-arrow" v-click="2">→<span>MASK</span></div>
  <section class="masked" v-click="2">
    <small>MASKED OUTPUT</small>
    <pre>Alice Smith
a***@gmail.com
******4567
**** **** **** 1234
********</pre>
  </section>
</div>

<div class="fields mt-7" v-click="3">
  <span>EMAIL</span><span>PHONE</span><span>CREDIT CARD</span><span>SALARY</span>
</div>

<div v-click="4" class="takeaway-strip mt-6 p-4 text-center">
Tên vẫn phục vụ nghiệp vụ; bốn trường nhạy cảm chỉ hiển thị ở mức cần thiết.
</div>

<style scoped>
.records { display:grid; grid-template-columns:1fr auto 1fr; gap:1.4rem; align-items:center; }
.records section { min-height:17rem; padding:1.25rem 1.4rem; border-top:4px solid #38edf6; background:rgba(255,255,255,.05); }
.records section.masked { border-color:#2efab0; }
.records small { color:#38edf6; font-size:.8rem; font-weight:800; letter-spacing:.08em; }
.records .masked small { color:#2efab0; }
.records pre { margin-top:1.2rem; padding:0; background:transparent; color:#fff; font-size:1rem; line-height:1.72; }
.records .masked pre { color:#b9f7de; }
.mask-arrow { display:flex; flex-direction:column; gap:.25rem; color:#2efab0; font-size:2rem; text-align:center; }
.mask-arrow span { color:#9eb5c3; font-size:.65rem; font-weight:800; letter-spacing:.08em; }
.fields { display:flex; justify-content:center; gap:1rem; }
.fields span { min-width:8rem; padding:.55rem .8rem; border-bottom:2px solid #2efab0; color:#bdebdc; font-size:.78rem; font-weight:700; text-align:center; }
</style>
