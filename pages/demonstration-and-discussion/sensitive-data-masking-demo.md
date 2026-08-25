---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Demo áp dụng bốn kỹ thuật trên cùng một record

<div class="records mt-8">
  <section v-click="1">
    <small>ORIGINAL RECORD</small>
    <pre>An Nguyen #0000000
an.nguyen0000000@example.com
+84900000000
1 Nguyen Hue, Ho Chi Minh City
790000000000</pre>
  </section>
  <div class="mask-arrow" v-click="2">→<span>MASK</span></div>
  <section class="masked" v-click="2">
    <small>MASKED OUTPUT</small>
    <pre>An Nguyen #0000000
a***@example.com
************
123 Đường Mẫu, TP.HCM
19e95a0b92c6</pre>
  </section>
</div>

<div class="fields mt-7" v-click="3">
  <span><b>EMAIL</b><small>CHE MỘT PHẦN</small></span>
  <span><b>PHONE</b><small>CHE TOÀN BỘ</small></span>
  <span><b>ADDRESS</b><small>SUBSTITUTION</small></span>
  <span><b>CCCD</b><small>HASH</small></span>
</div>

<div v-click="4" class="takeaway-strip mt-6 p-4 text-center">
Mỗi trường dùng một kỹ thuật phù hợp với mục đích sử dụng dữ liệu.
</div>

<style scoped>
.records { display:grid; grid-template-columns:1fr auto 1fr; gap:1.4rem; align-items:center; }
.records section { min-height:17rem; padding:1.25rem 1.4rem; border-top:4px solid #38edf6; background:rgba(255,255,255,.05); }
.records section.masked { border-color:#2efab0; }
.records small { color:#38edf6; font-size:.8rem; font-weight:800; letter-spacing:.08em; }
.records .masked small { color:#2efab0; }
.records pre { margin-top:1.2rem; padding:0; background:transparent; color:#fff; font-size:.88rem; line-height:1.72; }
.records .masked pre { color:#b9f7de; }
.mask-arrow { display:flex; flex-direction:column; gap:.25rem; color:#2efab0; font-size:2rem; text-align:center; }
.mask-arrow span { color:#9eb5c3; font-size:.65rem; font-weight:800; letter-spacing:.08em; }
.fields { display:flex; justify-content:center; gap:1rem; margin-top:1rem !important; }
.fields span { min-width:8rem; padding:.5rem .7rem; border-bottom:2px solid #2efab0; color:#bdebdc; text-align:center; }
.fields b,.fields small { display:block; }
.fields b { font-size:.76rem; }
.fields small { margin-top:.2rem; color:#91a9a1; font-size:.62rem; font-weight:700; }
.takeaway-strip { margin-top:1rem !important; padding:.75rem 1rem !important; }
</style>

<!--
[Sources]
- https://duckdb.org/docs/stable/sql/functions/text
[/Sources]
-->
