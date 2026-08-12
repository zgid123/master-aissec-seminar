---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Các công cụ nền tảng cho Data Masking

<div class="primitives mt-6">
  <div v-click><b>SQL expressions</b><span>substring, regexp, replace, concat, hash và CASE biến đổi output.</span></div>
  <div v-click><b>Macros</b><span>Đóng gói logic như <code>mask_email()</code>, <code>mask_phone()</code>.</span></div>
  <div v-click><b>Views</b><span>Tạo abstraction layer ổn định giữa bảng gốc và application.</span></div>
  <div v-click><b>Host context</b><span>Ứng dụng xác thực user, quyết định role và giới hạn query path.</span></div>
</div>

<div v-click class="mt-6 text-center text-lg text-[#2efab0]">
Masking logic nằm trong SQL; enforcement boundary phải nằm ở nơi kiểm soát được truy cập.
</div>

<style scoped>
.primitives { display:grid; grid-template-columns:1fr 1fr; gap:.9rem; }
.primitives > div { padding:1rem; border-left:4px solid #88ffff; background:rgba(255,255,255,.045); }
.primitives b,.primitives span { display:block; }
.primitives b { color:#88ffff; margin-bottom:.45rem; }
.primitives span { opacity:.72; font-size:.76rem; line-height:1.35; }
</style>
