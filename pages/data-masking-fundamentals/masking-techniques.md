---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Các kỹ thuật che dữ liệu

Chọn kỹ thuật theo việc mà người dùng cần làm với dữ liệu.{.op-90}

<div class="tech mt-5">
  <div v-click="1">
    <small>CHE MỘT PHẦN</small>
    <p>Giữ vài ký tự để nhận diện, phần còn lại thay bằng dấu <code>*</code>.</p>
    <code class="ex">0901234567 → ******4567</code>
    <p class="use">Hỗ trợ khách hàng, khi cần xác minh đúng hồ sơ.</p>
  </div>
  <div v-click="1">
    <small>CHE TOÀN BỘ</small>
    <p>Ẩn hết giá trị, hoặc trả về NULL khi công việc không cần trường đó.</p>
    <code class="ex">50,000,000 → ********</code>
    <p class="use">Cột lương hay số CCCD với quyền không cần xem.</p>
  </div>
  <div v-click="2">
    <small>SUBSTITUTION</small>
    <p>Thay giá trị thật bằng dữ liệu giả trông như thật.</p>
    <code class="ex">alice@gmail.com → mai.tran@example.com</code>
    <p class="use">Kiểm thử phần mềm, vì cần dữ liệu đúng định dạng.</p>
  </div>
  <div v-click="2">
    <small>HASH</small>
    <p>Băm một chiều, cùng giá trị vào luôn ra cùng kết quả.</p>
    <code class="ex">alice@gmail.com → 9f4b2c7e</code>
    <p class="use">Phân tích dữ liệu, khi cần đếm và join các bảng.</p>
  </div>
</div>

<div class="note mt-4" v-click="3">
Demo của nhóm dùng che một phần và che toàn bộ.
</div>

<style scoped>
.tech { display:grid; grid-template-columns:1fr 1fr; gap:.8rem 1.25rem; align-items:start; }
.tech > div { min-height:9.4rem; padding:.85rem 1rem; border-left:4px solid #88ffff; background:rgba(255,255,255,.05); }
.tech small { display:block; margin-bottom:.45rem; color:#88ffff; font-size:.85rem; font-weight:700; letter-spacing:.02em; }
.tech p { margin:0; font-size:.96rem; line-height:1.45; opacity:.92; }
.tech .ex { display:inline-block; margin-top:.5rem; color:#2efab0; font-size:.95rem; }
.tech .use { margin-top:.55rem; padding-top:.45rem; border-top:1px dashed rgba(255,255,255,.22); font-size:.95rem; opacity:.88; }
.note { padding:.7rem 1rem; border-left:4px solid #ffda58; background:rgba(255,218,88,.06); font-size:.95rem; line-height:1.45; }
</style>

<!--Có khá nhiều cách che dữ liệu, và cách chọn phụ thuộc vào việc mà người dùng cần làm với dữ liệu đó.

[CLICK] Hai cách gặp nhiều nhất là che một phần và che toàn bộ. Che một phần giữ lại vài ký tự, như số điện thoại ở đây chỉ còn hiện bốn số cuối. Kiểu này mình gặp hằng ngày, như khi tổng đài đọc bốn số cuối để xác minh xem có đúng hồ sơ của mình hay không. Nhân viên đủ thông tin để làm việc, mà người ngồi cạnh nhìn vào màn hình thì không lấy được số điện thoại đó. Còn che toàn bộ thì ẩn hết giá trị, hoặc trả về NULL. Cách này dùng cho những cột mà công việc không cần biết, ví dụ cột lương hay số căn cước, vì giữ lại một phần cũng không giúp gì cho công việc.

[CLICK] Hai cách còn lại là substitution và hash. Substitution thay giá trị thật bằng một giá trị giả nhưng vẫn trông như thật. Chỗ này hay dùng khi công ty cần giao dữ liệu cho đội kiểm thử. Đội đó cần dữ liệu đúng định dạng để phần mềm chạy bình thường, nên nếu che bằng dấu sao thì các kiểm tra định dạng sẽ báo lỗi, còn thay bằng một email giả như ở đây thì vẫn chạy được mà không ai tiếp xúc dữ liệu thật. Còn hash là băm một chiều. Cùng một email thì luôn ra cùng một chuỗi, nên đội phân tích vẫn đếm được số khách hàng duy nhất và vẫn join được các bảng theo email để làm báo cáo, nhưng không đọc lại được email gốc từ chuỗi đó.

[CLICK] Nhìn lại bốn cách này thì thấy không có cách nào tốt nhất, chỉ có cách phù hợp với từng công việc. Trong demo, nhóm mình dùng hai cách đầu, là che một phần và che toàn bộ. Vậy việc che này được làm vào lúc nào?-->
