---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# DLP trong pipeline Big Data

<PipelineWithCallouts />

<!--
Pipeline minh họa dữ liệu đi từ nguồn, qua lưu trữ và xử lý, đến dữ liệu dẫn xuất và chia sẻ. Ba điểm A, B và C là các vị trí kiểm soát đại diện, không phải danh sách đầy đủ của mọi kiến trúc DLP.

[click]

Tại A, hệ thống quét file hoặc bảng để nhận diện dữ liệu nhạy cảm và tạo nhãn phục vụ quản lý. Liu và cộng sự nghiên cứu kỹ thuật quét nội dung nhạy cảm có khả năng mở rộng trên MapReduce; công trình hỗ trợ phần quét quy mô lớn, không phải toàn bộ kiến trúc pipeline minh họa.

[click]

Tại B, nhãn cần được xác minh sau biến đổi vì đầu ra có thể giữ lại, loại bỏ hoặc kết hợp thông tin từ nhiều nguồn. Lineage thể hiện quan hệ nguồn gốc và quá trình biến đổi dữ liệu, hỗ trợ truy vết và cập nhật nhãn; riêng lineage không bảo đảm nhãn đầu ra luôn chính xác.

[click]

Tại C, policy xét kết quả phân loại cùng người thực hiện, hành động và đích để đưa ra quyết định. Quyết định chỉ có tác dụng khi được áp dụng tại điểm thực thi đã tích hợp. Quy mô lớn, nhiều định dạng, dữ liệu biến đổi và nhiều đường xuất làm tăng khó khăn trong việc duy trì kiểm soát.

Nguồn tham khảo: [Liu et al. (2015), “Privacy-Preserving Scanning of Big Content for Sensitive Data Exposure with MapReduce”](https://vtechworks.lib.vt.edu/items/2652b4c0-305d-4b03-b463-e16d1cd8ad4e).
-->
