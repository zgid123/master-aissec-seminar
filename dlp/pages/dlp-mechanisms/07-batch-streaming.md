---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# DLP trong batch và streaming

<div class="process-screen">
  <TableComparison class="process-comparison" :animation="false" :dense="true" row-header-width="150px" :spacing="6">
    <TableComparisonCols corner-width="150px">
      <TableComparisonCol color="#e9f3fc" text-color="#245b8e">Batch · theo lô</TableComparisonCol>
      <TableComparisonCol color="#edf8f1" text-color="#24704f">Streaming · liên tục</TableComparisonCol>
    </TableComparisonCols>
    <TableComparisonRows>
      <TableComparisonRow title="Đơn vị kiểm tra" color="#dce9f6" text-color="#244b71">
        <TableComparisonCell align="left">File / partition P-18; có thể giữ cả partition.</TableComparisonCell>
        <TableComparisonCell align="left">Record hoặc micro-batch tại producer/processor đã tích hợp.</TableComparisonCell>
      </TableComparisonRow>
      <TableComparisonRow title="Điểm kiểm soát" color="#dce9f6" text-color="#244b71">
        <TableComparisonCell align="left">Quét output trong vùng chờ trước khi job công bố.</TableComparisonCell>
        <TableComparisonCell align="left">Kiểm tra trước sink khi dữ liệu đi qua stream processor.</TableComparisonCell>
      </TableComparisonRow>
      <TableComparisonRow title="Quyết định policy" color="#dce9f6" text-color="#244b71">
        <TableComparisonCell align="left">Orchestrator giữ lô có email/chi tiết khách; chỉ công bố bản sửa đã kiểm tra lại.</TableComparisonCell>
        <TableComparisonCell align="left">Router chỉ đưa output tổng hợp đã duyệt tới sink; tách bản vi phạm vào vùng cách ly.</TableComparisonCell>
      </TableComparisonRow>
      <TableComparisonRow title="Đánh đổi" color="#dce9f6" text-color="#244b71">
        <TableComparisonCell align="left">Chờ cả lô làm chậm lịch nhưng đơn vị giữ/retry rõ ràng.</TableComparisonCell>
        <TableComparisonCell align="left">Kiểm tra inline tăng latency/backlog; kiểm tra async có thể để event ra trước.</TableComparisonCell>
      </TableComparisonRow>
    </TableComparisonRows>
  </TableComparison>
  <p class="process-takeaway">Trong luồng này: vi phạm hoặc kiểm tra lỗi → giữ riêng; chỉ công bố sau khi kiểm tra lại đạt yêu cầu.</p>
</div>

<style scoped>
.process-screen { color: #18334f; }
.process-comparison :deep(.alpha-table-comparison-col) { font-size: 18px !important; line-height: 1.2; }
.process-comparison :deep(.alpha-table-comparison-row-title) { font-size: 15px !important; }
.process-comparison :deep(.alpha-table-comparison-cell) { font-size: 16px !important; line-height: 1.28; }
.process-takeaway { margin: 9px 0 0; color: #4a3976; font-size: 15px; line-height: 1.3; text-align: center; }
</style>

<!--
Batch xử lý một đơn vị đã nhận diện được như file, partition hoặc nhóm dữ liệu. Streaming kiểm tra record hoặc micro-batch khi dữ liệu đi qua một producer, consumer hay operator đã tích hợp. Đây là hai cách bố trí inspection giả định. Broker phân tán không tự cung cấp DLP nếu không có detector, policy và enforcement được nối vào đường dữ liệu.

Rule của ví dụ: báo cáo rộng không nhận email hoặc giao dịch gắn với từng khách hàng. Processor gộp dữ liệu; chỉ output đã kiểm tra đạt rule mới tới sink báo cáo. Event vi phạm, chưa rõ hoặc lỗi inspection được giữ riêng để xử lý. Pass rule này không chứng minh an toàn cho mục đích khác.

[click]
### Batch — kiểm tra đơn vị trước khi công bố

**Bối cảnh và vấn đề.** Job định kỳ tạo `P-18` từ giao dịch có customer_id, email, category và amount. Rule của hình cấm email và hồ sơ theo từng khách hàng trong báo cáo rộng.

**Điểm tích hợp và input.** Job tạo output trong storage hạn chế, sau đó DLP/detector đã tích hợp kiểm tra đúng file, partition hoặc batch, cùng metadata cần cho policy. Kiểm tra output sau transform giúp đánh giá phiên bản sắp publish, nhưng raw và output trung gian vẫn phải được giới hạn quyền.

**Policy và enforcement.** Detector tìm email trong output; policy xét các field còn lại và audience báo cáo. Orchestrator giữ `P-18` ở vùng hạn chế. Job có thể tạo bản đã giảm field/chi tiết; phiên bản mới cần được kiểm tra trước khi publication service cho phát hành. Trong hình, partition vi phạm rule nên chưa được publish.

**Lỗi và giới hạn.** False positive là detector đọc được dữ liệu nhưng nhận diện nhầm; có thể cần xác minh hoặc tinh chỉnh. Scanner timeout/lỗi dịch vụ là không có kết quả đáng tin, không phải bằng chứng dữ liệu an toàn. Khi kiểm tra chưa hoàn tất, mẫu này giữ partition ở vùng hạn chế và retry/review trước khi publish. Nếu job tạo output khác sau đó, phải đánh giá lại đúng phiên bản. Batch có thể làm chậm lịch và tăng lượng chờ.

### Streaming — quyết định theo record hoặc micro-batch

**Bối cảnh và vấn đề.** Event có customer_id, email, category và amount đi vào luồng liên tục. Nếu gửi thẳng tới reporting sink, email và lịch sử theo khách hàng vượt rule minh họa.

**Điểm tích hợp và input.** Producer, consumer hoặc stream-processing operator được hỗ trợ nhận record/micro-batch và kiểm tra nội dung cùng metadata transaction. Nếu policy cần nhận diện liên hệ giữa nhiều record, kiểm tra độc lập từng record có thể bỏ sót pattern; join/window/aggregate có thể cần giữ một đơn vị phụ thuộc lớn hơn.

**Policy và enforcement.** Processor kiểm tra nội dung và đích sau bước gộp. Router giữ event có email/khóa trong quarantine hạn chế; output tổng hợp chỉ tới reporting sink sau khi detector và policy xác nhận đúng phiên bản đạt rule. Chỉ có category và amount không tự chứng minh rằng output an toàn cho mọi mục đích hoặc audience.

**Lỗi, giới hạn và đánh đổi.** Inspection thêm xử lý có thể tạo backpressure khi operator downstream chậm hơn upstream, làm queue/backlog và latency tăng. Bounded buffering, retry, backpressure, phân luồng lỗi và giới hạn thời gian đều là quyết định thiết kế. Mất dịch vụ/timeout khác báo nhầm nội dung; chúng cần nhánh xử lý khác. Unaffected processing chỉ tiếp tục khi dependency và correctness cho phép. Fail-open giữ flow nhưng có thể release dữ liệu chưa kiểm tra; fail-closed giảm nguy cơ release nhưng có thể dừng luồng. Audit-only ghi nhận mà không ngăn giao dịch. Chọn giữa audit, quarantine và hard-block theo rủi ro và SLA; không có lựa chọn đúng cho mọi hệ thống.

Application-message inspection xem nội dung record mà ứng dụng gửi/nhận; network packet inspection xem gói/lưu lượng đi qua điểm mạng và có thể không đọc được payload mã hóa. Hai việc này không đồng nghĩa. Quarantine cần theo dõi, retry, điều tra và khôi phục để dữ liệu không bị bỏ quên hoặc mất âm thầm.

### Nguồn tham khảo

- [Apache Flink — Monitoring Back Pressure](https://nightlies.apache.org/flink/flink-docs-stable/docs/ops/monitoring/back_pressure/): giải thích operator phát sinh dữ liệu nhanh hơn downstream có thể tiêu thụ và cách áp lực truyền ngược trong job.
- [Apache Flink — End-to-End Latency Metrics](https://nightlies.apache.org/flink/flink-docs-release-1.16/docs/ops/metrics/): mô tả marker latency và giới hạn của phép đo trong một hệ thống streaming cụ thể.
- [Apache Flink — Tuning Checkpoints and Large State](https://nightlies.apache.org/flink/flink-docs-stable/docs/ops/state/large_state_tuning/): ghi nhận backpressure có thể làm tăng latency và ảnh hưởng xử lý state/checkpoint.
-->
