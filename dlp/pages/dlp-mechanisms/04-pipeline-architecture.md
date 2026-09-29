---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# DLP trong pipeline Big Data

<PipelineWithCallouts />

<!--
Pipeline mô tả dữ liệu đi từ nguồn qua lưu trữ và xử lý đến dữ liệu dẫn xuất rồi được chia sẻ hoặc xuất. A, B và C là ba điểm kiểm soát đại diện, không phải cấu trúc bắt buộc cho mọi hệ thống. Chi phí và rủi ro thay đổi theo khối lượng dữ liệu, phép biến đổi và số đường mà dữ liệu có thể đi qua.

[click] Tại A, detector đọc tệp hoặc bảng và tạo finding, tức bằng chứng có thể gồm loại thông tin, cột hoặc vị trí, giá trị khớp và đôi khi điểm số. Finding mô tả điều detector quan sát được; classification là bước gán loại hoặc mức nhạy cảm; label là metadata hoặc thuộc tính lưu classification gắn với dữ liệu. Ba khái niệm này không thay thế nhau. Tùy kiến trúc, classification có thể được liên kết bằng label ở mức tập dữ liệu, cột, trường hoặc đối tượng. Nghiên cứu của Liu và cộng sự khảo sát quét nội dung nhạy cảm bằng MapReduce, nhưng không xác nhận toàn bộ quy trình A/B/C này.

[click] Tại B, một phép biến đổi có thể giữ nguyên, loại bỏ hoặc làm lộ thêm thông tin nhạy cảm. Chẳng hạn, tổng hợp số liệu có thể giảm khả năng nhận diện, trong khi ghép bảng hoặc giữ một định danh gián tiếp có thể làm tăng khả năng liên kết với cá nhân. Lineage là quan hệ nguồn gốc và các phép biến đổi giữa những tập dữ liệu; lineage cùng cơ chế lan truyền label hỗ trợ truy vết nguồn và xác định đầu ra nào cần rà soát. Tuy nhiên, lineage chỉ ghi nhận quan hệ đã được thu thập hoặc cấu hình, không chứng minh classification đúng, không xác định chắc chắn mức nhạy cảm hiện tại và không tự phát hiện tác động ngữ nghĩa của mọi phép biến đổi. Tùy rủi ro và chi phí, nhóm vận hành có thể rà soát lại classification hoặc quét dữ liệu dẫn xuất.

[click] Tại C, policy xét label liên quan cùng người thực hiện, hành động và đích nhận để chọn quyết định như allow, cảnh báo hoặc block. Enforcement là việc áp dụng quyết định tại điểm kiểm soát đã tích hợp; policy decision và enforcement là hai bước riêng. Một label không tự chặn truy vấn hay export. Trong demo, `Finding` lưu tên detector, cột, phương pháp, label, số lần khớp và bằng chứng; `ExportGateway` xét policy trước khi ghi tệp và chỉ ghi khi quyết định là `ALLOW`. Chặn chỉ áp dụng trên những đường đã tích hợp điểm enforcement.

Chi phí quét và xử lý finding tăng theo lượng dữ liệu, số định dạng và tần suất cập nhật. Pipeline có nhiều bước biến đổi, tập dữ liệu dẫn xuất và đường export độc lập cũng làm tăng phần cần rà soát và tích hợp; bảo vệ một đường không bao phủ các bản sao đi qua đường khác. Demo xử lý một triệu dòng tổng hợp trên môi trường cục bộ với Spark; con số này không phải benchmark và không chứng minh khả năng mở rộng trên cụm phân tán.

Nguồn: [Liu et al. (2015), “Privacy-Preserving Scanning of Big Content for Sensitive Data Exposure with MapReduce”](https://vtechworks.lib.vt.edu/items/2652b4c0-305d-4b03-b463-e16d1cd8ad4e); [Apache Atlas — classification propagation](https://atlas.apache.org/1.2.0/ClassificationPropagation.html). Tài liệu Atlas mô tả lan truyền label theo lineage đã cấu hình; điều đó không bảo đảm label luôn phản ánh nội dung sau biến đổi.
-->
