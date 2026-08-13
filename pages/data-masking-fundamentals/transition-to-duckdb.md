---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Vì sao nhóm chốt DuckDB cho phần triển khai?

<div class="why mt-6">
  <div v-click><b>1</b><span>Từ các hướng AI gợi ý ban đầu, nhóm chốt DuckDB vì dễ bám đúng mục tiêu seminar.</span></div>
  <div v-click><b>2</b><span>Có sẵn SQL primitives để thử nghiệm masking: <code>CASE</code>, <code>concat</code>, <code>regexp</code>, macro, view.</span></div>
  <div v-click><b>3</b><span>Quan trọng nhất, nó giúp mình nhìn rõ ranh giới giữa masking logic và lớp enforcement.</span></div>
</div>

<div v-click class="mt-6 rounded-lg border border-cyan-300/35 bg-cyan-500/8 p-4 text-center text-lg">
Từ phần khái niệm, giờ mình chuyển sang phần triển khai cụ thể với DuckDB.
</div>

<div v-click class="mt-4 text-center text-[#2efab0]">
Mời bạn tiếp theo trình bày section 3: <b>Dynamic Data Masking in DuckDB</b>.
</div>

<style scoped>
.why { display:grid; gap:.8rem; }
.why > div { display:grid; grid-template-columns:2rem 1fr; gap:.8rem; align-items:start; padding:.85rem 1rem; border-left:4px solid #88ffff; background:rgba(255,255,255,.045); }
.why b { color:#88ffff; font-size:1rem; line-height:1.4; }
.why span { font-size:.83rem; line-height:1.35; opacity:.82; }
</style>
