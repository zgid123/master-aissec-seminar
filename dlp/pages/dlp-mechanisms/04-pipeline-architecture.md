---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# DLP trong pipeline Big Data

<PipelineWithCallouts />

<!--
[click]
- Đây là pipeline tổng quát: dữ liệu đi từ nguồn, qua lưu trữ và xử lý, đến đầu ra và chia sẻ. A, B, C là các điểm kiểm soát tiêu biểu, không phải toàn bộ kiến trúc triển khai.
[click]
- Đầu tiên, nhận diện và gắn nhãn dữ liệu nhạy cảm tại nơi lưu trữ. Phát hiện và phân loại không tự động chặn hoạt động xuất.
[click]
- Sau biến đổi, cần xác minh nhãn còn phù hợp. Lineage hỗ trợ truy vết và cập nhật nhãn; quét lại khi cần. Chỉ lineage không chứng minh nhãn nhạy cảm của đầu ra vẫn đúng.
[click]
- Khi chia sẻ hoặc xuất, policy xét nhãn, người thực hiện, hành động và đích. Khả năng chặn chỉ có hiệu lực tại đường đã tích hợp kiểm soát; các đường khác không tự động bị chặn.
- Quy mô lớn, nhiều định dạng, dữ liệu biến đổi và nhiều đường xuất làm việc kiểm soát khó hơn.
- Atlas hỗ trợ metadata/lineage, Ranger hỗ trợ policy/audit trong dịch vụ tích hợp; ứng dụng vẫn phải thực thi kiểm soát ở đường xuất của mình.
- Liu et al. (2015) nghiên cứu quét dữ liệu nhạy cảm quy mô lớn bằng MapReduce, không phải toàn bộ kiến trúc minh họa.
-->
