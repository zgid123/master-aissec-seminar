---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Mỗi giới hạn cần một lớp kiểm soát tương ứng

<div class="control-map mt-7">
  <div class="head"><b>GIỚI HẠN</b><b>RỦI RO</b><b>KIỂM SOÁT CẦN CÓ</b></div>
  <div v-click="1"><span>Role do client gửi</span><em>Privilege escalation</em><strong>Verify token/session và whitelist role</strong></div>
  <div v-click="2"><span>Truy cập raw table/file</span><em>Bypass masking</em><strong>Backend-only access, OS permission, encryption</strong></div>
  <div v-click="3"><span>User tự nhập SQL</span><em>Đọc dữ liệu hoặc file ngoài dự kiến</em><strong>Fixed query, sandbox và giới hạn external access</strong></div>
  <div v-click="4"><span>Masking không tạo audit trail</span><em>Khó phát hiện lạm dụng</em><strong>Logging, monitoring và review quyền</strong></div>
</div>

<div v-click="5" class="takeaway-strip mt-6 p-4 text-center">
Masking giảm phơi lộ; Access Control, Encryption và Auditing mới hoàn thiện ranh giới bảo mật.
</div>

<style scoped>
.control-map { display:grid; gap:.45rem; }
.control-map > div { display:grid; grid-template-columns:1fr 1.05fr 1.6fr; gap:1rem; align-items:center; min-height:4rem; padding:.7rem 1rem; border-left:4px solid #38edf6; background:rgba(255,255,255,.05); }
.control-map > .head { min-height:2rem; padding:.2rem 1rem; border:0; background:transparent; color:#38edf6; font-size:.74rem; letter-spacing:.08em; }
.control-map span { color:#fff; font-size:.89rem; font-weight:650; }
.control-map em { color:#ffaaa9; font-size:.86rem; font-style:normal; }
.control-map strong { color:#98f6d4; font-size:.86rem; line-height:1.4; }
</style>

<!--
Sau khi liệt kê các rủi ro, nhóm em tổng hợp chúng thành một bảng gồm ba phần: giới hạn đang tồn tại, hậu quả bảo mật có thể xảy ra và lớp kiểm soát cần bổ sung. Mục tiêu của bảng này là cho thấy masking không phải một giải pháp đứng độc lập; mỗi điểm yếu phải được xử lý ở đúng lớp của nó.

[click]
Trường hợp đầu tiên là role do client gửi. Nếu backend tin trực tiếp giá trị role trong request, người dùng có thể đổi `support` thành `admin` và tạo ra privilege escalation. Cách xử lý là backend phải verify token hoặc session, lấy role từ nguồn dữ liệu đáng tin cậy và chỉ chấp nhận các role nằm trong whitelist. Client có thể yêu cầu một chức năng, nhưng client không được tự quyết định quyền của chính mình.

[click]
Trường hợp thứ hai là truy cập raw table hoặc raw file. Hậu quả là người dùng bỏ qua hoàn toàn masking rule. Kiểm soát phù hợp gồm ba lớp: chỉ backend được kết nối đến dữ liệu gốc, quyền của hệ điều hành giới hạn tài khoản được đọc file và encryption bảo vệ dữ liệu lưu trữ cũng như bản sao backup. Cần lưu ý encryption không thay thế masking; hai cơ chế bảo vệ ở hai thời điểm khác nhau.

[click]
Trường hợp thứ ba là người dùng tự nhập SQL. Rủi ro không chỉ là đọc cột email gốc mà còn có thể truy cập file hoặc chức năng ngoài dự kiến. Application nên dùng fixed query hoặc prepared query với cấu trúc đã kiểm soát. Nếu nghiệp vụ thực sự cần nhận untrusted SQL, query engine phải được sandbox và external access phải được giới hạn. Chỉ parameterize value là chưa đủ nếu người dùng vẫn kiểm soát toàn bộ câu lệnh.

[click]
Trường hợp cuối cùng là masking không tự tạo audit trail. Một query có thể trả dữ liệu đã che đúng policy nhưng hệ thống vẫn không biết ai đã query, query bao nhiêu lần và có dấu hiệu suy diễn hay không. Vì vậy cần logging, monitoring, cảnh báo hành vi bất thường và review quyền định kỳ. Audit giúp phát hiện và điều tra lạm dụng; nó không tự ngăn truy cập nên vẫn phải đi cùng access control.

[click]
Kết luận của bảng là masking giúp giảm mức độ phơi lộ ở output. Access Control quyết định ai được thực hiện hành động nào, Encryption bảo vệ dữ liệu khi lưu trữ hoặc truyền tải, còn Auditing cung cấp khả năng theo dõi. Khi phối hợp các lớp này theo Defense-in-Depth, chúng ta mới có một ranh giới bảo mật hoàn chỉnh hơn. Tiếp theo, nhóm em sẽ chỉ ra kiểu deployment nào phù hợp với cách triển khai trên DuckDB.
-->
