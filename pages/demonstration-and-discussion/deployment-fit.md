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
.fit-rule { color:#dce7ed; font-size:clamp(1.12rem, 1.35vw, 1.24rem); line-height:1.5; text-align:left; }
.fit-rule b { color:#38edf6; }
</style>

<!--
Từ các giới hạn vừa phân tích, chúng ta có thể xác định phạm vi deployment phù hợp. Nhóm em không kết luận DuckDB là không an toàn; điều quan trọng là kiến trúc sử dụng DuckDB có giữ được quyền kiểm soát trên toàn bộ access path hay không.

[click]
Mô hình phù hợp là trusted backend. Trong mô hình này, file DuckDB chỉ tồn tại trên server và chỉ service account của backend có quyền truy cập. Người dùng không kết nối trực tiếp đến database mà chỉ gọi API. API xác thực identity và role ở phía server, sau đó chạy những query đã được định nghĩa trước. Kết quả cuối cùng mà người dùng nhận được chỉ là output đã qua policy. Ví dụ phù hợp có thể là một internal analytics service, một backend báo cáo hoặc một ứng dụng local mà toàn bộ process được quản trị bởi cùng một chủ thể tin cậy.

Điểm quan trọng của phía “phù hợp” không phải là ứng dụng dùng Node.js hay một framework cụ thể. Điều kiện cốt lõi là backend phải đáng tin cậy và phải là con đường duy nhất dẫn đến dữ liệu gốc.

[click]
Ngược lại, chỉ dùng masking sẽ không phù hợp trong môi trường untrusted execution. Ví dụ đầu tiên là gửi file `.duckdb` cho người dùng; khi đó họ sở hữu dữ liệu và có thể mở bảng gốc. Ví dụ thứ hai là cho phép chạy SQL tùy ý trong cùng process mà không có sandbox. Trường hợp thứ ba là hệ thống multi-tenant cần isolation mạnh nhưng tất cả tenant lại chia sẻ cùng quyền process và file. Cuối cùng, nếu ứng dụng không kiểm soát được việc export, cache hoặc tạo dữ liệu trung gian, dữ liệu gốc vẫn có thể bị sao chép ra ngoài luồng masking.

[click]
Vì vậy, tiêu chí quyết định không phải chỉ là macro có chạy đúng hay không. Câu hỏi cần đặt ra là người dùng còn đường nào khác đến dữ liệu gốc hay không. Nếu câu trả lời là có, masking phải được bổ sung bằng authorization, isolation và các biện pháp bảo vệ storage; hoặc cần chọn một kiến trúc database server phù hợp hơn. Nếu câu trả lời là không và backend thực sự kiểm soát được file, query và role, DuckDB có thể là lựa chọn hợp lý cho application-enforced masking. Slide tiếp theo sẽ chuyển các điều kiện này thành checklist hardening cụ thể.
-->
