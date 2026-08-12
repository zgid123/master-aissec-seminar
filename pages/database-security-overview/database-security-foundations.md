---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Hai nền tảng của bảo mật cơ sở dữ liệu

CIA xác định điều cần bảo vệ; AAA xác định cách kiểm soát và truy vết truy cập.{.op-60}

<div class="principles mt-6">
  <div v-click><b>C</b><span><strong>Confidentiality</strong><small>Chỉ đúng người mới xem được dữ liệu nhạy cảm.</small></span></div>
  <div v-click><b>I</b><span><strong>Integrity</strong><small>Dữ liệu không bị sửa đổi trái phép.</small></span></div>
  <div v-click><b>A</b><span><strong>Availability</strong><small>Hệ thống và dữ liệu luôn sẵn sàng khi cần.</small></span></div>
</div>

<div v-click class="mt-6 rounded-lg border border-cyan-300/30 bg-cyan-500/8 p-4 text-sm text-center">
  <b>Authentication</b> — Bạn là ai? &nbsp;·&nbsp; <b>Authorization</b> — Bạn được làm gì? &nbsp;·&nbsp; <b>Accounting / Auditing</b> — Điều gì đã xảy ra?
</div>

<style scoped>
.principles { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; }
.principles > div { display:flex; gap:.8rem; padding:1rem; border-top:3px solid rgba(46,250,176,.72); background:rgba(255,255,255,.045); }
.principles b { color:#2efab0; font-size:1.45rem; }
.principles strong,.principles small { display:block; }
.principles small { margin-top:.45rem; opacity:.64; font-size:.72rem; line-height:1.35; }
</style>
