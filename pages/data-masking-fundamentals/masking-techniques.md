---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Các kỹ thuật che dữ liệu

Chọn kỹ thuật theo việc mà người dùng cần làm với dữ liệu.{.op-90}

<div class="tech mt-6">
  <div v-click="1">
    <small>CHE MỘT PHẦN</small>
    <p>Giữ vài ký tự để nhận diện, phần còn lại thay bằng dấu <code>*</code>.</p>
    <code class="ex">0901234567 → ******4567</code>
  </div>
  <div v-click="1">
    <small>CHE TOÀN BỘ</small>
    <p>Ẩn hết giá trị, hoặc trả về NULL khi công việc không cần trường đó.</p>
    <code class="ex">50,000,000 → ********</code>
  </div>
  <div v-click="2">
    <small>SUBSTITUTION</small>
    <p>Thay giá trị thật bằng dữ liệu giả trông như thật, dùng khi giao dữ liệu cho đội kiểm thử.</p>
    <code class="ex">alice@gmail.com → mai.tran@example.com</code>
  </div>
  <div v-click="2">
    <small>HASH</small>
    <p>Băm một chiều, cùng giá trị vào luôn ra cùng kết quả, nên vẫn đếm và join được.</p>
    <code class="ex">alice@gmail.com → 9f4b2c7e</code>
  </div>
</div>

<div class="note mt-5" v-click="3">
Demo của nhóm dùng che một phần và che toàn bộ.
</div>

<style scoped>
.tech { display:grid; grid-template-columns:1fr 1fr; gap:.9rem 1.25rem; align-items:start; }
.tech > div { min-height:7.6rem; padding:.9rem 1rem; border-left:4px solid #88ffff; background:rgba(255,255,255,.05); }
.tech small { display:block; margin-bottom:.45rem; color:#88ffff; font-size:.85rem; font-weight:700; letter-spacing:.02em; }
.tech p { margin:0; font-size:.96rem; line-height:1.45; opacity:.92; }
.tech .ex { display:inline-block; margin-top:.55rem; color:#2efab0; font-size:.95rem; }
.note { padding:.7rem 1rem; border-left:4px solid #ffda58; background:rgba(255,218,88,.06); font-size:.95rem; line-height:1.45; }
</style>

<!--Có khá nhiều cách che dữ liệu, và mỗi cách phục vụ một nhu cầu khác nhau.

[CLICK] Hai cách gặp nhiều nhất là che một phần và che toàn bộ. Che một phần giữ lại vài ký tự để người dùng còn nhận ra hồ sơ, như số điện thoại ở đây chỉ còn hiện bốn số cuối. Còn che toàn bộ thì ẩn hết giá trị, hoặc trả về NULL, dùng khi công việc không cần đọc trường đó.

[CLICK] Hai cách còn lại hay được nhắc tới là substitution và hash. Substitution thay giá trị thật bằng một giá trị giả nhưng vẫn trông như thật. Như ở ví dụ này, một email thật được thay bằng một email khác vẫn đúng định dạng, nên đội kiểm thử vẫn làm việc được mà không phải tiếp xúc dữ liệu thật. Còn hash là băm một chiều. Cùng một email thì luôn ra cùng một chuỗi, nên đội phân tích vẫn đếm được số khách hàng duy nhất và vẫn join được các bảng theo email, nhưng không đọc lại được email gốc từ chuỗi đó.

[CLICK] Trong demo, nhóm mình dùng hai cách đầu, là che một phần và che toàn bộ. Vậy việc che này được làm vào lúc nào?-->
