---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# DLP trong ba trạng thái dữ liệu

<div class="state-grid">
  <section class="state-card state-rest">
    <header><span>01</span><div><strong>Data at rest</strong><small>Dữ liệu đang lưu</small></div></header>
    <div class="state-example"><small>DỮ LIỆU</small><code>contacts(id, email)</code></div>
    <div class="state-detail">
      <article class="state-item"><h3>Bài toán</h3><p>Nhóm báo cáo đọc email dù không cần.</p></article>
      <article class="state-item"><h3>DLP kiểm tra</h3><p>Scanner tìm email; tạo finding.</p></article>
      <article class="state-item"><h3>Hành động</h3><p>Chủ kho rà soát và thu hẹp quyền đọc.</p></article>
    </div>
    <div class="state-limit"><b>Giới hạn</b><p>Scan không chặn lượt đọc.</p></div>
  </section>

  <section class="state-card state-motion">
    <header><span>02</span><div><strong>Data in motion</strong><small>Dữ liệu đang truyền</small></div></header>
    <div class="state-example"><small>THAO TÁC</small><code>file khách → email cá nhân</code></div>
    <div class="state-detail">
      <article class="state-item"><h3>Bài toán</h3><p>Gửi file khách hàng tới email cá nhân.</p></article>
      <article class="state-item"><h3>DLP kiểm tra</h3><p>Gateway inline xét email và đích gửi.</p></article>
      <article class="state-item"><h3>Hành động</h3><p>Cấm đích cá nhân; gateway chặn gửi.</p></article>
    </div>
    <div class="state-limit"><b>Giới hạn</b><p>Chỉ luồng qua gateway.</p></div>
  </section>

  <section class="state-card state-use">
    <header><span>03</span><div><strong>Data in use</strong><small>Dữ liệu đang được thao tác</small></div></header>
    <div class="state-example"><small>THAO TÁC</small><code>id + giao dịch → chat</code></div>
    <div class="state-detail">
      <article class="state-item"><h3>Bài toán</h3><p>Paste giao dịch có ID vào chat cá nhân.</p></article>
      <article class="state-item"><h3>DLP kiểm tra</h3><p>Xét ID, app đích và policy khi paste.</p></article>
      <article class="state-item"><h3>Hành động</h3><p>Endpoint chặn paste vào app cá nhân.</p></article>
    </div>
    <div class="state-limit"><b>Giới hạn</b><p>Chỉ app/tác vụ tích hợp.</p></div>
  </section>
</div>

<style scoped>
.state-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); align-items: stretch; gap: 12px; margin: 10px 0 1rem; color: #18334f; }
.state-card { height: 330px; box-sizing: border-box; padding: 8px 12px; border: 1px solid var(--border); border-top: 5px solid var(--accent); border-radius: 12px; background: var(--surface); display: grid; grid-template-rows: 40px 54px minmax(0, 1fr) 42px; gap: 8px; }
.state-rest { --accent: #d69216; --border: #f2ca72; --surface: #fffcf1; }
.state-motion { --accent: #3977bf; --border: #a8c8f0; --surface: #f4f8fe; }
.state-use { --accent: #8762d3; --border: #c7b9f3; --surface: #f8f6ff; }
.state-card header { display: flex; align-items: center; gap: 10px; color: var(--accent); }
.state-card header > span { display: grid; place-items: center; flex: 0 0 32px; width: 32px; height: 32px; border-radius: 50%; background: var(--accent); color: #fff; font-size: 13px; line-height: 1.2; font-weight: 800; }
.state-card header strong { display: block; font-size: 20px; line-height: 1.15; }
.state-card header small { display: block; margin-top: 2px; color: #52677b; font-size: 12.5px; line-height: 1.2; }
.state-example { height: 54px; box-sizing: border-box; margin-top: 0; padding: 6px 8px; border: 1px solid var(--border); border-radius: 7px; background: #ffffffbd; }
.state-example small, .state-item h3 { display: block; margin: 0 0 3px; color: var(--accent); font-size: 13px; line-height: 1.2; font-weight: 800; }
.state-example code { display: block; color: #334b63; font-size: 14px; line-height: 1.2; white-space: normal; overflow-wrap: anywhere; }
.state-detail { display: flex; flex-direction: column; gap: 5px; margin-top: 0; }
.state-item p { margin: 0; color: #334155; font-size: 14px; line-height: 1.2; }
.state-limit { margin: 0; padding-top: 3px; color: #596e82; font-size: 14px; font-weight: 400; line-height: 1.2; }
.state-limit b { color: var(--accent); }
.state-limit p { margin: 3px 0 0; color: #596e82; font-size: 14px; font-weight: 400; line-height: 1.2; }
</style>

<!--
NIST mô tả DLP qua data at rest, data in use và data in motion, đồng thời xét ngữ cảnh giao dịch như người khởi tạo, đối tượng dữ liệu, phương tiện và đích. Đây là các trạng thái dữ liệu, không phải ba sản phẩm hay ba vị trí triển khai độc quyền. Một bản ghi giao dịch có thể được lưu trên kho, đọc trong query và truyền tới ứng dụng trong cùng một workflow.

### Data at rest — rà soát dữ liệu đang lưu

**Bối cảnh và vấn đề.** Kho phân tích lưu bảng `contacts(customer_id, email)`. Nhóm báo cáo rộng không cần email, nhưng quyền hiện tại cho phép nhóm đó đọc bảng.

**Điểm tích hợp và input.** Scanner kết nối với loại storage được hỗ trợ bằng quyền đọc phù hợp. Nó xem nội dung và metadata liên quan, chẳng hạn đường dẫn hoặc schema, rồi tạo finding. Phạm vi format và quyền truy cập giới hạn phần dữ liệu có thể kiểm tra.

**Policy, enforcement và kết quả.** Finding cho biết bảng có email; policy khởi tạo access review. Chủ kho được ủy quyền thu hẹp quyền đọc của nhóm báo cáo. Scanner phát hiện và tạo bằng chứng; nó không tự chặn lượt đọc trước khi quyền được sửa.

**Giới hạn.** Quét theo lịch có thể chạy sau khi dữ liệu đã được đọc; object mới, quyền thiếu, định dạng không hỗ trợ hoặc lỗi đọc để lại khoảng trống. Chỉ gọi đây là enforcement nếu tích hợp cụ thể có và áp dụng hành động tương ứng.

### Data in motion — kiểm soát một lần truyền

**Bối cảnh và vấn đề.** Chuyên viên export file có email khách hàng tới địa chỉ cá nhân chưa được duyệt.

**Điểm tích hợp và input.** Ứng dụng chia sẻ, gateway hoặc proxy được hỗ trợ kiểm tra payload có thể đọc, định danh người gửi, operation và destination. Policy có thể đối chiếu finding/classification với ngữ cảnh. Đây là vị trí tích hợp cụ thể, không phải mọi lưu lượng mạng đều tự có DLP.

**Policy, enforcement và kết quả.** Gateway inline đọc payload được hỗ trợ và kiểm tra người gửi, thao tác export cùng domain đích. Policy không cho gửi dữ liệu khách hàng tới đích cá nhân, nên gateway chặn lần truyền trước khi file được gửi. Giám sát thụ động chỉ ghi nhận và không chặn giao dịch này.

**Giới hạn.** Nội dung mã hóa không thể được detector kiểm tra trừ khi có cơ chế giải mã được hỗ trợ và được phép trong kiến trúc. Đường truyền không đi qua tích hợp hoặc thao tác ngoài phạm vi được hỗ trợ không chịu enforcement này.

### Data in use — kiểm soát hành động trên endpoint hoặc ứng dụng

**Bối cảnh và vấn đề.** Chuyên viên đang xem chi tiết giao dịch gắn với khách hàng rồi định paste nội dung vào app chat cá nhân.

**Điểm tích hợp và input.** Endpoint agent hoặc application control kiểm tra nội dung, label hoặc classification khả dụng, người dùng và thao tác paste mà integration hỗ trợ. Detector không mặc nhiên truy cập mọi phép tính hoặc toàn bộ process memory.

**Policy, enforcement và kết quả.** Endpoint agent đã tích hợp kiểm tra nội dung cùng người dùng, app đích và thao tác paste. Policy cấm app cá nhân nhận dữ liệu này, nên agent chặn lần paste và có thể ghi audit event. Đây là hành động trên endpoint, không phải DLP kiểm soát mọi phép tính nội bộ.

**Giới hạn.** Khả năng phụ thuộc endpoint được quản lý, hệ điều hành, app, định dạng và thao tác có hỗ trợ. Không suy rộng kiểm soát copy/print/paste sang mọi ứng dụng hoặc mọi phép tính nội bộ.

### Quan hệ giữa trạng thái và vị trí

Một bước trong lifecycle có thể đồng thời lưu trữ, xử lý và truyền dữ liệu. Endpoint, network và cloud là vị trí triển khai, không ánh xạ một-một tới ba trạng thái. Một lần query có thể thao tác trên dữ liệu đang lưu, xử lý dữ liệu trong ứng dụng và gửi kết quả qua mạng. Endpoint, network, cloud hay storage chỉ nói nơi kiểm soát được triển khai hoặc tích hợp; một vị trí có thể hỗ trợ nhiều trạng thái, và một trạng thái có thể cần nhiều vị trí. Phần này dùng các control point cụ thể để giải thích mẫu can thiệp, không gán độc quyền mỗi trạng thái cho một tầng.

### Nguồn tham khảo

- [NIST — Data Loss Prevention](https://csrc.nist.gov/glossary/term/data_loss_prevention).
- [Microsoft — Data Loss Prevention policy reference](https://learn.microsoft.com/en-us/purview/dlp-policy-reference): ví dụ các thao tác endpoint được hỗ trợ và các chế độ audit/block trong sản phẩm cụ thể.
- [Microsoft — Configure endpoint DLP settings](https://learn.microsoft.com/en-us/purview/dlp-configure-endpoint-settings): ví dụ về phạm vi app, thao tác và điều kiện file không hỗ trợ trong một tích hợp cụ thể.
-->
