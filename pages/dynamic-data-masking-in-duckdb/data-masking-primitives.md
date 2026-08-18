---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Bước 1 — Xác định output mong muốn

Dữ liệu của Alice được lưu một lần, nhưng mỗi vai trò nhìn thấy một kết quả khác nhau.{.op-60}

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

<div v-click class="mt-8 text-center text-xl">
<b class="text-[#88ffff]">Dữ liệu gốc không đổi</b>; chỉ có <b class="text-[#2efab0]">kết quả truy vấn thay đổi</b>.
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
.results p { margin:.8rem 0 0; opacity:.62; font-size:.73rem; }
</style>
