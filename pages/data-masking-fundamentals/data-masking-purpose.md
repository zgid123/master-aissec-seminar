---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Data Masking giới hạn dữ liệu hiển thị

Giảm rủi ro lộ dữ liệu nhưng vẫn đủ dùng cho công việc.{.op-90}

<div class="flow mt-5">
  <div class="flow-head">
    <span>Dữ liệu gốc</span>
    <span></span>
    <span>Cách che</span>
    <span></span>
    <span>Kết quả</span>
  </div>
  <div class="flow-row" v-click="1">
    <code>alice@gmail.com</code>
    <b>→</b>
    <em>Che một phần</em>
    <b>→</b>
    <code class="out">a***@gmail.com</code>
  </div>
  <div class="flow-row" v-click="1">
    <code>50,000,000</code>
    <b>→</b>
    <em>Che toàn bộ</em>
    <b>→</b>
    <code class="out">********</code>
  </div>
</div>

<div class="viewers mt-5" v-click="2">
  <div><small>Người quản lý</small><span>Xem được email đầy đủ</span></div>
  <div class="restricted"><small>Nhân viên hỗ trợ</small><span>Chỉ thấy dữ liệu đã che</span></div>
</div>

<div class="note mt-5" v-click="3">
Dữ liệu gốc trong CSDL không bị thay đổi. Chỉ kết quả hiển thị được biến đổi.
</div>

<style scoped>
.alpha-shifting-intro h1 {
  width: auto;
  max-width: none;
  white-space: nowrap;
  overflow: visible;
  text-overflow: clip;
  font-size: 1.9rem;
  line-height: 1.1;
}

.flow { display:grid; gap:.6rem; }
.flow-head,
.flow-row { display:grid; grid-template-columns:1fr auto 1fr auto 1fr; gap:.8rem; align-items:center; }
.flow-head { padding:0 1rem; color:#88ffff; font-size:.82rem; }
.flow-head span { text-align:center; }
.flow-row { padding:.8rem 1rem; border-left:4px solid rgba(136,255,255,.55); background:rgba(255,255,255,.05); }
.flow-row code { font-size:1rem; text-align:center; }
.flow-row .out { color:#2efab0; }
.flow-row em { font-style:normal; font-size:.95rem; text-align:center; opacity:.9; }
.flow-row b { color:#2efab0; font-size:1.1rem; text-align:center; }
.viewers { display:grid; grid-template-columns:1fr 1fr; gap:1.2rem; }
.viewers > div { padding:.8rem 1rem; border-left:4px solid #88ffff; background:rgba(255,255,255,.045); }
.viewers > .restricted { border-color:#2efab0; }
.viewers small,
.viewers span { display:block; }
.viewers small { margin-bottom:.35rem; color:#88ffff; font-size:.85rem; font-weight:700; }
.viewers .restricted small { color:#2efab0; }
.viewers span { font-size:.95rem; line-height:1.4; opacity:.9; }
.note { padding:.75rem 1rem; border-left:4px solid #ffda58; background:rgba(255,218,88,.06); font-size:.98rem; line-height:1.45; }
</style>

<!--Cảm ơn Trâm. Ở phần một, mình vừa thấy một tình huống rất quen. Người dùng đăng nhập đúng, được cấp quyền đầy đủ, nhưng lại nhìn thấy nhiều dữ liệu hơn mức công việc của họ cần. Data Masking sinh ra để xử lý đúng chỗ đó, bằng cách giới hạn dữ liệu mà người dùng nhìn thấy. Nó không làm dữ liệu trở nên vô dụng, cũng không phải để tăng tốc truy vấn hay để sao lưu. Nó giúp giảm rủi ro lộ dữ liệu, trong khi người dùng vẫn đủ thông tin để làm việc.

[CLICK] Với email, mình giữ lại ký tự đầu và tên miền, phần giữa được che lại. Nhân viên hỗ trợ vẫn nhận ra đúng khách hàng mà không cần thấy địa chỉ đầy đủ. Còn với lương thì không cần nhìn một phần nào cả, nên mình che toàn bộ.

[CLICK] Cùng một hồ sơ khách hàng, người quản lý xem được email đầy đủ, còn nhân viên hỗ trợ chỉ thấy dữ liệu đã che. Tình huống này phần ba sẽ nói kỹ hơn.

[CLICK] Và điều quan trọng nhất ở đây là dữ liệu gốc trong CSDL không hề bị thay đổi. Chỉ có kết quả hiển thị ra là được biến đổi. Vậy có những cách che nào?-->
