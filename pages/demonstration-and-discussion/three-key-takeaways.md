---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Conclusion

<div class="takeaways mt-6">
  <div v-click><b>01</b><span>Database security cần nhiều lớp: authentication, authorization, encryption, masking, auditing và secure deployment.</span></div>
  <div v-click><b>02</b><span>Data Masking giảm phơi lộ dữ liệu nhạy cảm khi user vẫn cần làm việc với dữ liệu.</span></div>
  <div v-click><b>03</b><span>Dynamic Data Masking thay đổi output theo access context mà không sửa dữ liệu gốc.</span></div>
  <div v-click><b>04</b><span>DuckDB minh họa tốt concept bằng SQL primitives, nhưng security thực tế cần access-control layer đáng tin cậy.</span></div>
</div>

<div v-click="6" class="mt-6 text-lg">
<b class="text-[#88ffff]">Masking</b> trả lời “data nên hiển thị như thế nào”; <b class="text-[#2efab0]">Access Control</b> trả lời “ai được phép xem gì”.
</div>

<style scoped>
.takeaways { display:grid; gap:1rem; }
.takeaways > div { display:grid; grid-template-columns:3rem 1fr; align-items:center; gap:1rem; padding:1rem 1.2rem; border-left:4px solid #2efab0; background:rgba(255,255,255,.045); }
.takeaways b { color:#2efab0; font-size:1.2rem; }
.takeaways span { font-size:.9rem; line-height:1.35; }
</style>
