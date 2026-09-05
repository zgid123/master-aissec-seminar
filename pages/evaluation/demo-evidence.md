---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Demo chứng minh behavior - chưa chứng minh security

<div class="scope mt-7">
  <section class="proved" v-click="1">
    <small>ĐÃ CHỨNG MINH</small>
    <h3>Masking hoạt động</h3>
    <ul>
      <li>Cùng record tạo output khác nhau theo role.</li>
      <li>Role đến từ token/session đã được backend kiểm tra.</li>
      <li>Dữ liệu lưu trữ không bị thay đổi.</li>
    </ul>
  </section>
  <section class="not-proved" v-click="2">
    <small>CHƯA CHỨNG MINH</small>
    <h3>Mọi access path đều an toàn</h3>
    <ul>
      <li>User không thể đọc raw table hoặc raw file.</li>
      <li>Arbitrary SQL đã được sandbox hoàn toàn.</li>
      <li>Không thể suy diễn dữ liệu qua filter hoặc aggregate.</li>
    </ul>
  </section>
</div>

<div class="score mt-7">
  <div v-click="3"><small>FUNCTIONAL MASKING</small><b>ĐẠT</b></div>
  <div v-click="4"><small>ROLE-AWARE OUTPUT</small><b>ĐẠT CÓ ĐIỀU KIỆN</b></div>
  <div class="weak" v-click="5"><small>NATIVE ENFORCEMENT</small><b>KHÔNG CÓ</b></div>
  <div class="weak" v-click="6"><small>CENTRAL GOVERNANCE</small><b>HẠN CHẾ</b></div>
</div>

<style scoped>
.scope { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }.scope section { min-height:18rem; padding:1.15rem 1.3rem; border-top:4px solid #2efab0; background:rgba(255,255,255,.05); }.scope .not-proved { border-color:#fca5a5; }.scope small { font-weight:800; letter-spacing:.08em; }.scope h3 { margin:.75rem 0 1rem; }.scope ul { padding-left:1rem; }.scope li { margin:.7rem 0; line-height:1.42; }
.score { display:grid; grid-template-columns:repeat(4,1fr); gap:.6rem; }.score div { padding:.7rem .75rem; border-left:3px solid #2efab0; background:rgba(255,255,255,.045); }.score .weak { border-color:#ffda58; }.score small,.score b { display:block; }.score small { font-weight:800; }.score b { margin-top:.25rem; }
</style>

<!-- Kết luận: DuckDB xây được masking behavior, nhưng macro/view không phải database-native security boundary. -->
