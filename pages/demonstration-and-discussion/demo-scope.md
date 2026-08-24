---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Demo chứng minh behavior, chưa chứng minh security

<div class="scope mt-8">
  <section class="proved" v-click="1">
    <small>ĐÃ CHỨNG MINH</small>
    <h3>Cùng dữ liệu, khác output</h3>
    <ul>
      <li>Masking rule chạy được trong DuckDB.</li>
      <li>Output thay đổi theo access context.</li>
      <li>Dữ liệu gốc không bị sửa.</li>
    </ul>
  </section>
  <section class="not-proved" v-click="2">
    <small>CHƯA CHỨNG MINH</small>
    <h3>User không thể bypass policy</h3>
    <ul>
      <li>Role luôn đến từ nguồn đáng tin cậy.</li>
      <li>Raw table và raw file không thể truy cập.</li>
      <li>Untrusted SQL đã được cô lập.</li>
    </ul>
  </section>
</div>

<div v-click="3" class="question mt-8">
Câu hỏi bảo mật thật sự: <b>ai kiểm soát đường đi đến dữ liệu gốc?</b>
</div>

<style scoped>
.scope { display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; }
.scope section { min-height:19rem; padding:1.35rem 1.45rem; border-top:4px solid #2efab0; background:rgba(255,255,255,.05); }
.scope .not-proved { border-color:#ff8b8b; }
.scope small { color:#2efab0; font-size:.8rem; font-weight:800; letter-spacing:.09em; }
.scope .not-proved small { color:#ff9f9f; }
.scope h3 { margin:1.15rem 0; color:#fff; font-size:1.3rem; }
.scope ul { margin:0; padding-left:1.2rem; }
.scope li { margin:.75rem 0; color:#cbd7e0; font-size:.91rem; line-height:1.45; }
.question { color:#dce7ed; font-size:1.15rem; text-align:center; }
.question b { color:#38edf6; }
</style>
