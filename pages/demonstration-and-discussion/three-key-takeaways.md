---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# 3 điều cần nhớ

<div class="takeaways mt-6">
  <div v-click><b>01</b><span>Database security cần nhiều lớp bảo vệ phối hợp với nhau.</span></div>
  <div v-click><b>02</b><span>Dynamic Data Masking giảm phơi lộ mà không thay đổi dữ liệu gốc.</span></div>
  <div v-click><b>03</b><span>DuckDB có đủ building blocks để mask dữ liệu, nhưng DDM theo quyền cần một access-control layer phù hợp.</span></div>
</div>

<div v-click class="mt-6 text-center text-lg">
<b class="text-[#88ffff]">Masking logic</b> trả lời “che như thế nào”; <b class="text-[#2efab0]">Access Control</b> trả lời “ai được xem gì”.
</div>

<style scoped>
.takeaways { display:grid; gap:1rem; }
.takeaways > div { display:grid; grid-template-columns:3rem 1fr; align-items:center; gap:1rem; padding:1rem 1.2rem; border-left:4px solid #2efab0; background:rgba(255,255,255,.045); }
.takeaways b { color:#2efab0; font-size:1.2rem; }
.takeaways span { font-size:.9rem; line-height:1.35; }
</style>
