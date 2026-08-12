---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Data Masking ≠ quyền

<div class="limits mt-5">
  <div v-click><b>Direct table access</b><span>View có thể bị bypass nếu raw table hoặc file vẫn đọc được.</span></div>
  <div v-click><b>Identity & role</b><span>Host application phải xác thực và gán context đáng tin cậy.</span></div>
  <div v-click><b>Arbitrary SQL</b><span>Macro và session variable không ngăn người dùng tự đổi query hoặc role.</span></div>
  <div v-click><b>Defense-in-depth</b><span>Masking không thay thế authorization, encryption, audit hay sandbox.</span></div>
</div>

<div v-click class="mt-6 rounded-lg border border-amber-300/35 bg-amber-500/8 p-4 text-center text-lg">
Security question thật sự: <b class="text-[#2efab0]">Who can query what—and who enforces the policy?</b>
</div>

<style scoped>
.limits { display:grid; grid-template-columns:1fr 1fr; gap:.9rem; }
.limits > div { padding:1rem; border-left:4px solid #88ffff; background:rgba(255,255,255,.045); }
.limits b,.limits span { display:block; }
.limits b { color:#88ffff; margin-bottom:.45rem; }
.limits span { opacity:.72; font-size:.75rem; line-height:1.35; }
</style>
