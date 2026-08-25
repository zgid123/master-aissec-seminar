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

<!--
Trước khi đánh giá giới hạn, nhóm em muốn xác định thật rõ phạm vi của demo. Ở đây cần phân biệt giữa hai khái niệm: hệ thống tạo ra đúng behavior và hệ thống thực sự bảo đảm security. Hai điều này có liên quan với nhau nhưng không giống nhau.

[click]
Phần bên trái là những điều demo đã chứng minh được. Thứ nhất, masking rule có thể được triển khai và thực thi trong DuckDB. Thứ hai, với cùng một record, kết quả trả về có thể thay đổi theo access context, ví dụ role quản trị thấy dữ liệu đầy đủ còn role support chỉ thấy dữ liệu đã che. Thứ ba, dữ liệu gốc trong bảng không bị sửa. Đây chính là đặc điểm của Dynamic Data Masking: chỉ thay đổi cách dữ liệu được hiển thị ở thời điểm query, chứ không biến đổi dữ liệu đang lưu trữ.

[click]
Tuy nhiên, phần bên phải là những điều demo chưa thể chứng minh. Demo chưa bảo đảm role gửi vào luôn đến từ một nguồn đáng tin cậy. Demo cũng chưa chứng minh người dùng không thể truy cập trực tiếp bảng gốc hoặc file DuckDB. Cuối cùng, nếu hệ thống cho phép người dùng tự nhập SQL, họ có thể tạo một câu query nằm ngoài luồng mà nhóm em đã thiết kế. Nói cách khác, việc macro chạy đúng không đồng nghĩa policy không thể bị bypass.

[click]
Vì vậy, câu hỏi bảo mật quan trọng nhất không phải là “hàm masking có chạy đúng hay không”, mà là “ai đang kiểm soát toàn bộ đường đi đến dữ liệu gốc”. Nếu mọi truy cập đều bắt buộc đi qua backend và backend thực thi policy đáng tin cậy, masking mới có ý nghĩa. Slide tiếp theo sẽ chỉ rõ ranh giới kiểm soát đó nằm ở những lớp nào.
-->
