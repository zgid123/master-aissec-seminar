---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Production cần hardening ở ba lớp

<div class="hardening mt-7">
  <section v-click="1">
    <small>APPLICATION</small>
    <p><b>✓</b> Verify identity và map role phía server</p>
    <p><b>✓</b> Dùng prepared/fixed queries</p>
    <p><b>✓</b> Không cho user kiểm soát SQL text</p>
  </section>
  <section v-click="2">
    <small>DUCKDB RUNTIME</small>
    <p><b>✓</b> Giới hạn external file access</p>
    <p><b>✓</b> Tắt extension auto-install/auto-load không cần thiết</p>
    <p><b>✓</b> Khóa security configuration sau khi khởi tạo</p>
  </section>
  <section v-click="3">
    <small>OS &amp; STORAGE</small>
    <p><b>✓</b> File chỉ thuộc service account</p>
    <p><b>✓</b> Mã hóa database và bảo vệ khóa</p>
    <p><b>✓</b> Audit, backup và cô lập process</p>
  </section>
</div>

<div v-click="4" class="config mt-7">
<code>enable_external_access = false</code><span>·</span><code>lock_configuration = true</code><span>·</span><code>OS sandbox</code>
</div>

<style scoped>
.hardening { display:grid; grid-template-columns:repeat(3,1fr); gap:1.25rem; }
.hardening section { min-height:19rem; padding:1.3rem; border-top:4px solid #38edf6; background:rgba(255,255,255,.05); }
.hardening section:nth-child(2) { border-color:#2efab0; }
.hardening section:nth-child(3) { border-color:#ffda58; }
.hardening small { color:#38edf6; font-size:.78rem; font-weight:800; letter-spacing:.08em; }
.hardening section:nth-child(2) small { color:#2efab0; }
.hardening section:nth-child(3) small { color:#ffda58; }
.hardening p { margin:1rem 0; color:#cbd7e0; font-size:.88rem; line-height:1.45; }
.hardening p b { color:#2efab0; }
.config { display:flex; justify-content:center; gap:.8rem; color:#2efab0; }
.config code { color:#dff8ef; font-size:1rem; }
</style>

<!--
Nếu đưa demo này gần hơn với production, nhóm em đề xuất hardening theo ba lớp. Lý do chia thành ba lớp là vì không có một setting duy nhất có thể bảo vệ cả identity, query engine và file dữ liệu. Nếu một lớp bị cấu hình sai, các lớp còn lại vẫn giúp giảm phạm vi ảnh hưởng.

[click]
Lớp thứ nhất là Application. Backend phải verify identity, sau đó map identity sang role ở phía server; tuyệt đối không tin role do client tự khai báo. Application nên sử dụng prepared hoặc fixed query để kiểm soát query structure và bind value an toàn. Đồng thời, endpoint dành cho người dùng thông thường không nên nhận toàn bộ SQL text. Cần phân biệt rõ: prepared statement giúp chống việc value làm thay đổi cấu trúc câu lệnh, nhưng không bảo vệ hệ thống nếu bản thân ứng dụng cho phép user gửi một câu SQL hoàn chỉnh.

[click]
Lớp thứ hai là DuckDB runtime. Nếu workload không cần đọc file bên ngoài, chúng ta nên tắt hoặc giới hạn external file access. Những extension không cần thiết cũng không nên được tự động cài đặt hoặc tự động load, vì mỗi capability bổ sung đều làm tăng bề mặt tấn công. Sau khi các security setting được cấu hình, có thể khóa configuration để phần còn lại của ứng dụng không thay đổi chúng trong lúc chạy. Các setting cụ thể vẫn phải được kiểm tra theo phiên bản DuckDB và nhu cầu của hệ thống.

[click]
Lớp thứ ba là OS và Storage. File database chỉ nên thuộc về service account chạy backend, với nguyên tắc least privilege. Khi dữ liệu nhạy cảm được lưu trữ, cần cân nhắc encryption và quản lý khóa tách biệt; nếu khóa nằm cùng chỗ và có cùng quyền với file thì lợi ích bảo vệ sẽ giảm. Ngoài ra cần có audit, backup an toàn và process isolation hoặc OS sandbox. Backup cũng phải được bảo vệ như database chính vì nó chứa cùng dữ liệu gốc.

[click]
Ba cụm ở cuối slide là ví dụ để ghi nhớ: tắt external access khi không cần, khóa security configuration sau khi khởi tạo và đặt process trong OS sandbox phù hợp. Đây không phải ba dòng cấu hình có thể áp dụng máy móc cho mọi hệ thống. Chúng đại diện cho ba nguyên tắc: giảm capability, ngăn cấu hình bị thay đổi và giới hạn thiệt hại nếu untrusted input lọt vào query engine.

Như vậy, production hardening không biến masking thành access control. Nó tạo ra nhiều lớp bảo vệ để bảo đảm người dùng chỉ có thể đi qua access path đã thiết kế. Từ đây, nhóm em xin chuyển sang kết luận chung của seminar.

[Sources]
- https://duckdb.org/docs/current/operations_manual/securing_duckdb/overview
- https://duckdb.org/2025/11/19/encryption-in-duckdb
[/Sources]
-->
