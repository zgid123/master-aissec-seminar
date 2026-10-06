---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Triển khai DLP theo đặc trưng Big Data

<div class="five-v-table">
  <div class="five-v-head"><span>Đặc trưng</span><span>Ràng buộc dữ liệu</span><span>Ứng phó DLP · đánh đổi</span></div>
  <div class="five-v-row volume-row"><b>Volume</b><span>Email rải trong nhiều bảng và partition.</span><span>Quét phân tán/tăng dần để giảm tải; theo dõi phần chưa quét. Đổi lại: tốn tài nguyên.</span></div>
  <div class="five-v-row velocity-row"><b>Velocity</b><span>Dữ liệu đến nhanh hơn tốc độ kiểm tra.</span><span>Đệm/giảm tốc trước đích nhận; tránh phát hành sớm nhưng tăng độ trễ và tồn đọng.</span></div>
  <div class="five-v-row variety-row"><b>Variety</b><span>Email trong bảng, JSON, tài liệu scan.</span><span>Trích xuất/OCR rồi phát hiện; định dạng lỗi hoặc chưa hỗ trợ cần giữ để rà soát.</span></div>
  <div class="five-v-row veracity-row"><b>Veracity</b><span>Nhãn cũ; kết quả phát hiện có thể sai.</span><span>Đánh giá detector, cập nhật nhãn, rà soát ca chưa rõ; tốn công và vẫn có sai sót.</span></div>
  <div class="five-v-row value-row"><b>Value</b><span>Mức thiệt hại khi lộ báo cáo và hồ sơ khách khác nhau.</span><span>Ưu tiên quét/rà soát theo rủi ro; dữ liệu ưu tiên thấp vẫn cần được bảo vệ.</span></div>
</div>

<style scoped>
.five-v-table { display: grid; gap: 5px; color: #18334f; }
.five-v-head, .five-v-row { display: grid; grid-template-columns: 104px minmax(0, .9fr) minmax(0, 1.5fr); gap: 12px; align-items: center; }
.five-v-head { padding: 0 12px 1px; color: #60758b; font-size: 16px; font-weight: 800; }
.five-v-row { min-height: 58px; padding: 6px 12px; border: 1px solid var(--border); border-left: 4px solid var(--accent); border-radius: 8px; background: var(--surface); font-size: 17px; line-height: 1.2; }
.five-v-row b { color: var(--accent); font-size: 18px; }
.volume-row { --accent: #b45309; --border: #f2ca72; --surface: #fffcf1; }
.velocity-row { --accent: #0e7490; --border: #8bd9e4; --surface: #f1fdfe; }
.variety-row { --accent: #3977bf; --border: #a8c8f0; --surface: #f4f8fe; }
.veracity-row { --accent: #6d52ad; --border: #c7b9f3; --surface: #f8f6ff; }
.value-row { --accent: #147456; --border: #9addbd; --surface: #f1fcf6; }
@media (max-width: 850px) {
  .five-v-head, .five-v-row { grid-template-columns: 70px minmax(0, .9fr) minmax(0, 1.6fr); gap: 7px; }
  .five-v-row { font-size: 15px; }
}
</style>

<!--
Slide chọn Volume, Velocity, Variety, Veracity và Value như năm trục để suy nghĩ về chi phí và điểm kiểm soát DLP. Đây là khung phân tích được khai báo cho bài trình bày, không phải định nghĩa duy nhất về Big Data. NIST có tài liệu sử dụng Volume, Velocity, Variety và Variability; một số mô tả gọi Veracity thay cho một số khía cạnh liên quan chất lượng. Value được thêm ở đây làm trục ưu tiên nghiệp vụ.

### Volume — phạm vi inspection

**Bối cảnh và vấn đề.** Kho có nhiều partition của giao dịch qua nhiều kỳ cùng bảng email. Quét toàn bộ mỗi lần có thể tốn tài nguyên và tiến độ quét có thể lệch với dữ liệu mới.

**Điểm tích hợp, input và action.** Scanner phân tán đọc danh mục object/partition và nội dung được hỗ trợ, có quyền phù hợp; incremental scan có thể kiểm tra object mới/thay đổi. Inventory theo dõi phạm vi dự kiến, thành công, lỗi, không hỗ trợ và lịch rescan. Catalog/job lưu kết quả scan và khởi tạo classification review; owner hoặc policy-enforcement component áp dụng thay đổi quyền/label.

**Đánh đổi.** Lấy mẫu giảm lượng quét nhưng để lại phần chưa kiểm tra. Incremental scan cần change tracking tin cậy; khi detector, policy hoặc parser đổi, cần quyết định quét lại phần nào. Một mẫu finding từ vài partition không chứng minh toàn bộ lake sạch.

### Velocity — cân bằng kiểm tra và phát hành

**Bối cảnh và vấn đề.** Event giao dịch liên tục vào stream; kiểm tra sâu có thể chậm hơn tốc độ tiếp nhận.

**Điểm tích hợp, input và action.** Producer, consumer hoặc processor được hỗ trợ kiểm tra record/micro-batch và metadata ngay trước điểm output cần bảo vệ. Policy xác định kiểm tra cục bộ, buffering có giới hạn, backpressure hoặc bước review bất đồng bộ. Stream processor/router phải giữ, quarantine hoặc phát hành bản ghi tùy decision.

**Đánh đổi.** Giữ tới khi kiểm tra xong giảm nguy cơ release trước decision nhưng tăng latency và có thể tích tụ backlog. Asynchronous scan chỉ đủ cho preventive release nếu vùng đích vẫn hạn chế cho tới khi decision được áp dụng; nếu output mở trước, scan sau chỉ phát hiện chứ không ngăn lần lộ đó.

### Variety — độ phủ định dạng

**Bối cảnh và vấn đề.** Data lake có bảng có schema, JSON, log, văn bản tự do, tài liệu scan hoặc file mã hóa. Detector có thể không parse được nội dung ngoài định dạng hỗ trợ.

**Điểm tích hợp, input và action.** Parser/extractor đọc định dạng được hỗ trợ; OCR có thể chuyển ảnh tài liệu thành text, transcription có thể chuyển âm thanh thành text ở pipeline có thành phần phù hợp. Detector sau đó tìm mẫu, fingerprint hoặc ngữ cảnh. Inventory đánh dấu parser, nguồn, phiên bản nội dung và trạng thái scan; pipeline giữ hoặc chuyển tới review các item lỗi/không hỗ trợ theo policy.

**Đánh đổi.** OCR/transcription có thể bỏ sót hoặc trích sai chữ và không mặc định hiểu ngữ nghĩa ảnh/âm thanh. File mã hóa, corrupt hoặc format lạ tạo coverage gap, cần ghi nhận riêng thay vì tính là đã kiểm tra. Hỗ trợ parser không tự đảm bảo khả năng kiểm soát mọi đường export.

### Veracity — độ tin cậy của finding và metadata

**Bối cảnh và vấn đề.** Rule khớp nhầm email, detector bỏ sót cách viết khác, chủ sở hữu thay đổi schema hoặc label cũ không còn phản ánh nội dung.

**Điểm tích hợp, input và action.** Đánh giá detector trên bộ dữ liệu gán nhãn đại diện cho ngôn ngữ/format/mục đích; kiểm tra chất lượng finding; đồng bộ metadata và đánh dấu trạng thái uncertain. Detector tạo finding; data steward hoặc policy có thẩm quyền xác nhận classification/label. Enforcement component áp dụng policy từ label được chấp nhận, không từ metadata sai.

**Đánh đổi.** Review tốn công nhưng giảm phụ thuộc vào finding chưa được xác nhận. Phân loại theo mẫu hoặc AI/ML có thể báo nhầm/bỏ sót. DLP xét exposure theo policy, không xác minh giá trị nghiệp vụ là đúng hoặc đầy đủ.

### Value — ưu tiên theo hậu quả và mục đích

**Bối cảnh và vấn đề.** Bảng tổng hợp nội bộ và bản export có thông tin liên hệ tới người nhận công khai không có cùng hậu quả nếu bị lộ.

**Điểm tích hợp, input và action.** Chủ sở hữu ghi nhận mục đích dùng, sensitivity, audience, đường chia sẻ và hậu quả; nhóm vận hành dùng đánh giá đó để định thứ tự scan, tần suất review và nơi bắt buộc enforcement. Policy có thể ưu tiên export nhạy cảm và giảm quyền audience, còn thành phần tích hợp thực thi quyết định.

**Đánh đổi.** Ưu tiên dựa trên giả định và cần rà soát khi mục đích/audience thay đổi. DLP không tự tính business value, không thay thế phân quyền hoặc privacy assessment và không tự biện minh cho việc cấp access rộng.

### Chỉ số vận hành cần theo dõi

Theo dõi inspection coverage theo số object trong phạm vi đã khai báo, tách riêng object chưa quét, không hỗ trợ và lỗi đọc. Theo dõi scan freshness, thời gian từ lúc nhận đến finding hoặc isolate, throughput, backlog, và p95/p99 độ trễ tăng thêm. Đánh giá precision (TP / (TP + FP)) và recall (TP / (TP + FN)) trên tập có nhãn. False positive rate dùng mẫu số các trường hợp âm tính thực tế: FP / (FP + TN). Báo nhầm khác scanner/service failure vì failure không cho kết quả detector đáng tin. Theo dõi số lượng quarantine, thời gian tới xử lý, hoạt động hợp lệ bị gián đoạn, lỗi enforcement và bypass path đã biết. Các chỉ số này hỗ trợ lập baseline; slide không đưa target chưa được đo.

### Nguồn tham khảo

- [NIST Big Data Interoperability Framework, Volume 1: Definitions](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1500-1r2.pdf): định nghĩa và các đặc trưng Big Data, gồm Volume, Velocity, Variety và Variability.
- [NIST — The Real Challenge of Big Data](https://www.nist.gov/baldrige/real-challenge-big-data): mô tả một số cách dùng ba hoặc bốn V, gồm Veracity.
- [Apache Flink — Monitoring Back Pressure](https://nightlies.apache.org/flink/flink-docs-stable/docs/ops/monitoring/back_pressure/): quan hệ giữa tốc độ source và khả năng xử lý downstream.
- [NIST — Data Loss Prevention](https://csrc.nist.gov/glossary/term/data_loss_prevention): vai trò của nội dung và ngữ cảnh trong DLP.
-->
