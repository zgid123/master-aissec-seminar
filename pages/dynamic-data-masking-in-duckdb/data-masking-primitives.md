---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Bước 1 - Bài toán hỗ trợ khách hàng

Cùng một hồ sơ: quản lý xử lý khiếu nại cần email đầy đủ; nhân viên hỗ trợ chỉ cần đủ thông tin để nhận diện khách hàng.{.op-60}

<div class="results mt-8">
  <div>
    <small>NGƯỜI QUẢN LÝ</small>
    <span>Alice Smith</span>
    <strong>alice@gmail.com</strong>
    <p>Cần email đầy đủ để xử lý nghiệp vụ.</p>
  </div>
  <div class="restricted">
    <small>NHÂN VIÊN HỖ TRỢ</small>
    <span>Alice Smith</span>
    <strong>a***@gmail.com</strong>
    <p>Chỉ cần nhận biết khách hàng, không cần xem toàn bộ email.</p>
  </div>
</div>

<div v-click class="mt-4 text-center text-lg">
Một nguồn dữ liệu: <b class="text-[#88ffff]">manager thấy email gốc</b>, <b class="text-[#2efab0]">support thấy output đã che</b>.
</div>

<style scoped>
.results { display:grid; grid-template-columns:1fr 1fr; gap:1.4rem; }
.results > div { padding:1.2rem; border-left:4px solid #88ffff; background:rgba(255,255,255,.045); }
.results > .restricted { border-color:#2efab0; }
.results small,.results span,.results strong { display:block; }
.results small { color:#88ffff; margin-bottom:.7rem; }
.results .restricted small,.results .restricted strong { color:#2efab0; }
.results span { margin-bottom:.35rem; }
.results strong { font-size:1.1rem; }
.results p { margin:.8rem 0 0; opacity:.62; font-size:.9rem; }
</style>
