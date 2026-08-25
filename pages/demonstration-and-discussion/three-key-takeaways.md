---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# DuckDB tạo masking; application enforce quyền

<div class="answer mt-5" v-click="1">
Dynamic Data Masking có thể được xây dựng bằng SQL expression, macro và verified access context mà không thay đổi dữ liệu gốc.
</div>

<div class="evidence mt-5">
  <div v-click="2"><b>01</b><span><strong>Behavior</strong>Cùng record tạo ra output khác nhau tại query time.</span></div>
  <div v-click="3"><b>02</b><span><strong>Boundary</strong>Macro và view không tự ngăn raw table, raw file hay arbitrary SQL.</span></div>
  <div v-click="4"><b>03</b><span><strong>Condition</strong>Application, DuckDB runtime và OS phải phối hợp theo Defense-in-Depth.</span></div>
</div>

<div v-click="5" class="final-line mt-5">
<b>Masking logic</b> trả lời “che như thế nào”; <strong>Access Control</strong> trả lời “ai được xem gì”.
</div>

<style scoped>
.answer { max-width:48rem; margin-left:auto; margin-right:auto; padding:1rem 1.3rem; border:1px solid rgba(46,250,176,.4); background:rgba(46,250,176,.08); color:#e9fff7; font-size:1.06rem; font-weight:600; line-height:1.45; text-align:center; }
.evidence { display:grid; gap:.5rem; }
.evidence > div { display:grid; grid-template-columns:3rem 1fr; gap:1rem; align-items:center; min-height:3.8rem; padding:.65rem 1rem; border-left:4px solid #2efab0; background:rgba(255,255,255,.05); }
.evidence b { color:#2efab0; font-size:1.05rem; }
.evidence span { color:#cbd7e0; font-size:.9rem; }
.evidence strong { display:inline-block; min-width:6rem; color:#fff; }
.final-line { color:#dce7ed; font-size:1rem; text-align:center; }
.final-line b { color:#38edf6; }
.final-line strong { color:#2efab0; }
</style>

<!--
Để kết thúc seminar, nhóm em xin quay lại câu hỏi chính: Dynamic Data Masking đóng vai trò gì trong bảo mật cơ sở dữ liệu, và DuckDB có thể hỗ trợ vai trò đó đến đâu?

[click]
Kết luận trực tiếp từ phần triển khai là chúng ta có thể xây dựng behavior của Dynamic Data Masking trong DuckDB bằng SQL expression, macro, view và access context đã được xác thực. Cùng một dữ liệu gốc, hệ thống có thể trả dữ liệu đầy đủ cho role có quyền và dữ liệu đã che cho role hạn chế, trong khi dữ liệu lưu trữ không bị thay đổi. Đây là giá trị chính của DDM: giảm việc dữ liệu nhạy cảm xuất hiện không cần thiết trong giao diện, báo cáo, môi trường hỗ trợ hoặc quá trình xử lý nghiệp vụ.

[click]
Bài học thứ nhất của toàn bộ seminar là về behavior. Masking được áp dụng ở query time nên cùng một record có thể tạo ra output khác nhau theo context. Điều này khác với static masking, nơi chúng ta tạo một bản dữ liệu đã được biến đổi từ trước. Dynamic masking phù hợp khi hệ thống vẫn cần dữ liệu gốc cho nghiệp vụ nhưng mỗi nhóm người dùng chỉ nên nhìn thấy phần thông tin cần thiết.

[click]
Bài học thứ hai là về boundary. Masking chỉ kiểm soát cách dữ liệu được hiển thị; nó không tự quyết định ai được kết nối, không tự bảo vệ file và không ngăn mọi query suy diễn dữ liệu gốc. Trong demo DuckDB, macro và view có thể bị bỏ qua nếu người dùng còn quyền đọc raw table, raw file hoặc chạy arbitrary SQL. Đây cũng là nguyên tắc chung khi đánh giá DDM trên những hệ quản trị khác: không nên xem masking là cơ chế duy nhất để chống lại một người dùng có ý định tấn công.

[click]
Bài học thứ ba là về Defense-in-Depth. Một hệ thống an toàn cần phối hợp nhiều lớp: Authentication xác định người dùng là ai; Authorization quyết định họ được làm gì; Encryption bảo vệ dữ liệu khi lưu trữ và truyền tải; Masking giảm phần dữ liệu nhạy cảm xuất hiện ở output; còn Auditing giúp phát hiện và điều tra hành vi bất thường. Với DuckDB, application, runtime và hệ điều hành phải phối hợp để giữ toàn bộ access path trong vùng tin cậy.

[click]
Vì vậy, câu chốt của nhóm em là: masking logic trả lời câu hỏi “dữ liệu nên được che như thế nào”, còn Access Control trả lời câu hỏi quan trọng hơn là “ai được phép xem hoặc thao tác trên dữ liệu nào”. Hai cơ chế bổ sung cho nhau nhưng không thay thế nhau.

Nhìn rộng ra toàn bộ seminar, thông điệp cuối cùng không phải là luôn luôn nên hoặc không nên dùng DuckDB. DuckDB là một công cụ phù hợp để minh họa và triển khai masking behavior trong một trusted application. Quyết định sử dụng trong thực tế phải dựa trên trust boundary, mô hình truy cập và yêu cầu isolation của hệ thống. Dù dùng DuckDB, SQL Server, Oracle hay PostgreSQL, nguyên tắc vẫn giữ nguyên: Data Masking chỉ phát huy giá trị khi được đặt trong một kiến trúc bảo mật nhiều lớp và khi đường truy cập đến dữ liệu gốc được kiểm soát rõ ràng.

Phần trình bày của nhóm em đến đây là kết thúc. Nhóm em xin cảm ơn thầy cô và các bạn đã lắng nghe, và nhóm em sẵn sàng trả lời câu hỏi.
-->
