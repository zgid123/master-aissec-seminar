---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# <span class="alert-title">Xử lý cảnh báo và vi phạm DLP</span>

<div v-click="1" class="alert-lifecycle">
  <ol class="alert-process">
    <li><span>1</span><div><strong>Ghi nhận cảnh báo</strong><p>Bằng chứng khớp, người thực hiện, hành động, đích nhận</p></div></li>
    <li><span>2</span><div><strong>Xác minh</strong><p>Báo nhầm, ngoại lệ hợp lệ hay vi phạm</p></div></li>
    <li><span>3</span><div><strong>Khắc phục</strong><p>Sửa quyền chia sẻ, loại bỏ trường không cần thiết hoặc xử lý sự cố</p></div></li>
    <li><span>4</span><div><strong>Đóng cảnh báo và cải tiến</strong><p>Lưu kết quả, điều chỉnh policy khi cần</p></div></li>
  </ol>
  <div class="alert-enforcement">Chặn tức thời có thể diễn ra trước bước xác minh.</div>
</div>

<style scoped>
.alert-title { display: inline-block; font-size: 34px; line-height: 1.1; }
.alert-lifecycle { margin: 10px auto 0; max-width: 760px; color: #18334f; }
.alert-process { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; }
.alert-process li { display: flex; align-items: center; gap: 15px; margin: 0; padding: 10px 16px; border: 1px solid #a7e3e8; border-radius: 10px; background: #effbfc; }
.alert-process li > span { display: grid; place-items: center; flex: 0 0 36px; height: 36px; border-radius: 50%; background: #0e7490; color: white; font-size: 19px; font-weight: 700; }
.alert-process strong { font-size: 19px; line-height: 1.2; }
.alert-process p { margin: 3px 0 0; font-size: 15px; line-height: 1.3; }
.alert-enforcement { margin-top: 13px; padding: 10px 14px; border-left: 4px solid #b45309; border-radius: 5px; background: #fffbeb; color: #92400e; font-size: 16px; font-weight: 700; text-align: center; }
</style>

<!--
### Bối cảnh và vấn đề

Finding là kết quả hoặc bằng chứng mà detector tạo ra. Alert (cảnh báo) là tín hiệu được gửi tới luồng giám sát theo điều kiện cấu hình; có thể tổng hợp nhiều event. Vi phạm được xác nhận là kết luận sau khi đối chiếu bằng chứng, ngữ cảnh và policy áp dụng. Một finding hay alert chưa tự chứng minh có vi phạm; phạm vi tổ chức quyết định trách nhiệm và tiêu chí xác minh.

[click]

Vòng đời vận hành nối kết bằng chứng với trách nhiệm rà soát, khắc phục và cải tiến. Enforcement tức thời có thể đã diễn ra trước khi người phụ trách nhận hoặc xác minh cảnh báo.

### Cơ chế

**1. Ghi nhận cảnh báo.** Thu thập bằng chứng khớp, thời điểm, người thực hiện, hành động, tài sản và đích nhận, quy tắc/policy áp dụng, cùng kết quả enforcement. Nếu có, bổ sung classification, label, phiên bản detector và lineage liên quan để biết dữ liệu đến từ đâu. Bằng chứng cần đủ để điều tra nhưng chỉ người có quyền phù hợp được xem nội dung nhạy cảm.

**2. Xác minh.** Người được phân công, chẳng hạn nhóm bảo mật phối hợp chủ sở hữu dữ liệu, kiểm tra nội dung và mục đích nghiệp vụ. Phân biệt detector báo nhầm, ngoại lệ đã được phê duyệt và vi phạm policy. Ngoại lệ cần có lý do, phạm vi và trách nhiệm được ghi nhận; kết quả khớp đúng về nội dung vẫn có thể là hành động hợp lệ theo ngoại lệ. Ưu tiên rà soát theo mức độ nhạy cảm và khả năng đã tiết lộ, thay vì coi tất cả alert có mức rủi ro như nhau.

**3. Khắc phục.** Sau khi hệ thống tạo cảnh báo, người phụ trách kiểm tra bằng chứng và ngữ cảnh rồi chọn biện pháp phù hợp: giảm dữ liệu trong đầu ra, sửa hoặc thu hồi quyền chia sẻ không phù hợp, hay chuyển sang đích được phê duyệt. Trường hợp dữ liệu đã bị tiết lộ hoặc nghi ngờ có tiết lộ cần chuyển sang quy trình ứng phó sự cố của tổ chức để xác định phạm vi và hạn chế hậu quả. Chặn một lần truyền không giải quyết các bản sao trước đó hoặc mọi hậu quả của sự cố. Đây là trách nhiệm vận hành; không phải năng lực tự động có trong mọi sản phẩm.

Loại bỏ trường khỏi đầu ra chỉ giảm dữ liệu cho những lần chia sẻ tiếp theo, không khắc phục việc tiết lộ đã xảy ra.

**4. Đóng cảnh báo và cải tiến.** Lưu kết luận, hành động, người chịu trách nhiệm và bằng chứng theo quy định lưu giữ. Đóng alert không có nghĩa xóa audit trail. Tuning cần giải quyết nguyên nhân lỗi, chẳng hạn mẫu khớp quá rộng hay phạm vi policy sai, và kiểm tra ảnh hưởng của thay đổi. Không tùy tiện bỏ detector hoặc mở rộng ngoại lệ chỉ để giảm số cảnh báo.

### Ví dụ

Giả định hệ thống chặn upload một tệp dữ liệu sau xử lý đến đích cá nhân và tạo alert. Nhóm bảo mật cùng chủ sở hữu xác minh tệp còn chứa trường định danh không cần thiết. Nhóm giảm trường đầu ra, chọn đích được phê duyệt và ghi lại kết quả xử lý; nếu có dấu hiệu bản khác đã được gửi trước đó thì chuyển sang ứng phó sự cố. Đây là ví dụ vận hành giả định. Demo seminar minh họa phát hiện và quyết định policy tại gateway, không triển khai đầy đủ vòng đời này.

### Liên hệ Big Data

Nhiều job và người dùng có thể tạo các alert liên quan tới cùng tập dữ liệu. Metadata tài sản, lineage đã thu thập và kết quả enforcement giúp nối bằng chứng, tránh xem mỗi alert như một sự cố độc lập. Việc tổng hợp không được làm mất dấu đường dữ liệu hoặc bản sao cần điều tra.

### Nguồn tham khảo

- [Microsoft — Investigating DLP alerts: trigger, triage, investigation, remediation and tuning](https://learn.microsoft.com/en-us/purview/dlp-alert-investigation-learn).
- [Microsoft — DLP alerts: configuration, event context, permissions and audit retention](https://learn.microsoft.com/en-us/purview/dlp-alerts-get-started).
-->
