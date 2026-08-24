---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Chỉ phù hợp khi application kiểm soát access path

<div class="fit mt-8">
  <section class="good" v-click="1">
    <small>PHÙ HỢP</small>
    <h3>Trusted backend</h3>
    <ul>
      <li>File DuckDB chỉ nằm trên server.</li>
      <li>API chạy các query đã định nghĩa trước.</li>
      <li>Role được xác thực phía server.</li>
      <li>Người dùng chỉ nhận output.</li>
    </ul>
  </section>
  <section class="bad" v-click="2">
    <small>KHÔNG PHÙ HỢP NẾU DÙNG RIÊNG MASKING</small>
    <h3>Untrusted execution</h3>
    <ul>
      <li>Phát file <code>.duckdb</code> cho người dùng.</li>
      <li>Cho phép chạy SQL tùy ý trên cùng process.</li>
      <li>Cần isolation mạnh giữa nhiều tenant.</li>
      <li>Không kiểm soát được export và dữ liệu trung gian.</li>
    </ul>
  </section>
</div>

<div v-click="3" class="fit-rule mt-8">
Điều kiện quyết định không phải “macro có chạy không”, mà là <b>user có đường nào khác đến dữ liệu gốc hay không</b>.
</div>

<style scoped>
.fit { display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; }
.fit section { min-height:19rem; padding:1.35rem 1.45rem; border-top:4px solid #2efab0; background:rgba(255,255,255,.05); }
.fit .bad { border-color:#ff8b8b; }
.fit small { color:#2efab0; font-size:.76rem; font-weight:800; letter-spacing:.08em; }
.fit .bad small { color:#ff9f9f; }
.fit h3 { margin:1.1rem 0; color:#fff; font-size:1.3rem; }
.fit ul { margin:0; padding-left:1.15rem; }
.fit li { margin:.7rem 0; color:#cbd7e0; font-size:.9rem; line-height:1.42; }
.fit-rule { color:#dce7ed; font-size:1.02rem; line-height:1.5; text-align:center; }
.fit-rule b { color:#38edf6; }
</style>
