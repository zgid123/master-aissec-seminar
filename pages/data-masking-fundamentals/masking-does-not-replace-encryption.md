---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Data Masking ≠ Mã hóa

Hai cơ chế làm việc ở hai vị trí khác nhau.{.op-90}

<div class="layers mt-6">
  <div v-click="1">
    <small>LƯU TRỮ VÀ TRUYỀN TẢI</small>
    <h3>Mã hóa</h3>
    <p>Biến dữ liệu thành dạng không đọc được nếu không có khóa giải mã.</p>
    <p class="target">Rủi ro không mất đi mà dịch chuyển sang việc quản lý khóa giải mã.</p>
  </div>
  <div v-click="2" class="masking">
    <small>KẾT QUẢ TRUY VẤN</small>
    <h3>Data Masking</h3>
    <p>Kiểm soát dữ liệu được hiển thị trong kết quả truy vấn.</p>
    <p class="target">Giảm phần dữ liệu nhạy cảm mà người dùng nhìn thấy khi làm việc.</p>
  </div>
</div>

<div class="conclude mt-5" v-click="3">
<p>Hai cơ chế giải quyết hai vấn đề khác nhau, bổ sung cho nhau và không thay thế nhau.</p>
<p class="scope">Người dùng đã truy cập hợp lệ vẫn có thể nhìn thấy nhiều hơn mức cần thiết, và đó là phần mà Data Masking xử lý.</p>
</div>

<style scoped>
.layers { display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; align-items:start; }
.layers > div { min-height:11.4rem; padding:1.1rem; border-top:4px solid #88ffff; background:rgba(255,255,255,.05); }
.layers > .masking { border-top-color:#2efab0; }
.layers small { display:block; color:#88ffff; font-size:.85rem; font-weight:700; letter-spacing:.02em; }
.layers > .masking small { color:#2efab0; }
.layers h3 { margin:.5rem 0 .7rem; color:#88ffff; font-size:1.05rem; }
.layers > .masking h3 { color:#2efab0; }
.layers p { margin:.5rem 0 0; font-size:.98rem; line-height:1.45; opacity:.92; }
.layers .target { margin-top:.7rem; padding-top:.55rem; border-top:1px dashed rgba(255,255,255,.25); font-size:.93rem; opacity:.88; }
.conclude { padding:.85rem 1rem; border-left:4px solid #ffda58; background:rgba(255,218,88,.06); }
.conclude p { margin:0; font-size:1rem; line-height:1.5; }
.conclude .scope { margin-top:.5rem; font-size:.95rem; opacity:.9; }
</style>

<!--Nghe tới đây chắc có bạn sẽ hỏi, đã mã hóa dữ liệu rồi thì có cần che nữa không. Câu này hay gặp nên mình tách riêng một slide để nói cho rõ.

[CLICK] Mã hóa bảo vệ dữ liệu ở phần lưu trữ và truyền tải. Dữ liệu được biến thành dạng không đọc được nếu không có khóa giải mã, nên nó giúp giảm rủi ro khi file CSDL bị lấy đi hoặc đường truyền bị nghe. Nhưng nói mã hóa xong là hết rủi ro thì không đúng. Rủi ro không mất đi, nó dịch chuyển sang việc quản lý khóa giải mã, vì ai giữ được khóa thì đọc được dữ liệu.

[CLICK] Data Masking thì làm việc ở một vị trí khác. Nó quyết định dữ liệu nào được hiển thị trong kết quả truy vấn. Người dùng vẫn đọc được kết quả để làm việc, chỉ là phần nhạy cảm đã được che lại.

[CLICK] Hai cơ chế này giải quyết hai vấn đề khác nhau và bổ sung cho nhau. Mã hóa không có cách nào giải mã một nửa, nên khi nhiều quyền cùng đọc một bảng thì vẫn cần Data Masking. Ngược lại, Data Masking cũng không giúp gì nếu người khác đọc được trực tiếp bảng gốc, và phần bốn sẽ nói thêm về giới hạn này. Trường hợp mình quan tâm ở đây là người dùng đã truy cập hợp lệ nhưng không nên nhìn thấy toàn bộ dữ liệu nhạy cảm. Phần khái niệm tới đây là tương đối đủ, còn lại là chuyện triển khai.-->
