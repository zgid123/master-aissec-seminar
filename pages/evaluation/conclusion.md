---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# DDM giảm phơi lộ - không thay thế kiểm soát truy cập

<div class="answer mt-6" v-click="1">
Dynamic Data Masking nằm tại <b>query-result layer</b>: dữ liệu gốc vẫn phục vụ nghiệp vụ, còn output được điều chỉnh theo quyền hoặc context.
</div>

<div class="takeaways mt-6">
  <div v-click="2"><b>01</b><span><strong>Vị trí</strong>DDM kiểm soát giá trị cột được hiển thị, không quyết định toàn bộ quyền truy cập.</span></div>
  <div v-click="3"><b>02</b><span><strong>Hai approach</strong>DuckDB tự ghép behavior; SQL Server và Oracle cung cấp native database policy.</span></div>
  <div v-click="4"><b>03</b><span><strong>Điều kiện</strong>Hiệu quả bảo mật phụ thuộc trust boundary và các lớp defense-in-depth.</span></div>
</div>

<div class="final mt-7" v-click="5">
  <span><b>Masking</b> quyết định dữ liệu được trình bày như thế nào.</span>
  <span><b>Access Control</b> quyết định ai được phép tiếp cận dữ liệu đó.</span>
</div>

<style scoped>
.answer { max-width:50rem; margin-left:auto; margin-right:auto; padding:1rem 1.2rem; border:1px solid rgba(46,250,176,.35); background:rgba(46,250,176,.075); text-align:center; line-height:1.5; }.takeaways { display:grid; gap:.6rem; }.takeaways > div { display:grid; grid-template-columns:3rem 1fr; gap:.8rem; align-items:center; min-height:4rem; padding:.65rem 1rem; border-left:4px solid #2efab0; background:rgba(255,255,255,.05); }.takeaways strong { display:inline-block; min-width:7rem; }
.final { display:grid; grid-template-columns:1fr 1fr; gap:.8rem; }.final span { padding:.9rem 1rem; border-top:3px solid #38edf6; background:rgba(56,237,246,.06); text-align:center; }.final span:last-child { border-color:#ffda58; background:rgba(255,218,88,.06); }
</style>

<!-- Câu hỏi đánh giá cuối: Ai enforce policy và còn đường bypass nào? -->
