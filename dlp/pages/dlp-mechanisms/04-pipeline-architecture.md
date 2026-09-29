---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# DLP trong pipeline Big Data

<PipelineWithCallouts />

<!--
Slide mô tả dữ liệu trong pipeline Big Data và ba điểm kiểm soát đại diện: phát hiện, rà soát sau biến đổi, policy và enforcement.

[click]
### Cách diễn giải pipeline

**Bối cảnh và vấn đề.** Pipeline mô tả dữ liệu đi từ nguồn qua lưu trữ và xử lý đến dữ liệu sau xử lý rồi được chia sẻ hoặc export. A, B và C là các điểm kiểm soát đại diện, không phải ba trạng thái dữ liệu hay cấu trúc bắt buộc cho mọi hệ thống. Trong Big Data, dữ liệu thường nằm rải trên nhiều tệp, phân vùng, định dạng và dịch vụ. Query, notebook, batch job, API, upload, chia sẻ, truyền và export có thể xảy ra ở nhiều bước; đây là các hành động và đường dữ liệu riêng, không phải mọi hoạt động đều chờ tới giai đoạn cuối của hình.

**Ba trạng thái dữ liệu.** Data at rest là dữ liệu đang được lưu, chẳng hạn tệp, bảng, phân vùng và object. Data in use là dữ liệu đang được truy cập hoặc xử lý, chẳng hạn trong query hay analytical job. Data in motion là dữ liệu đang được truyền giữa hệ thống hoặc tới người nhận. Đây là các liên hệ tiêu biểu, không phải cách gán độc quyền từng trạng thái vào một giai đoạn của pipeline: dữ liệu cũng được truyền giữa các bước trung gian; dữ liệu sau xử lý có thể được lưu, xử lý tiếp hoặc truyền đi. Hình không khẳng định mọi trạng thái đều được bảo vệ đầy đủ bởi bất kỳ sản phẩm cụ thể nào.

**Thách thức chính.** Quy mô lớn, đa định dạng, dữ liệu biến đổi qua các bước và nhiều đường chia sẻ, truyền hoặc export làm tăng phần dữ liệu cần quét, rà soát và tích hợp kiểm soát.

[click]
### A — Phát hiện và classification

**Cơ chế.** Detector đọc nội dung trong phạm vi quét đã chọn—các tệp, phân vùng và định dạng được hỗ trợ—rồi tạo finding (bằng chứng phát hiện), chẳng hạn loại thông tin hoặc vị trí khớp. Finding hỗ trợ classification nhưng không tự trở thành label. Classification là bước gán loại hoặc mức nhạy cảm; label lưu kết quả classification để các bước sau dùng. Tùy kiến trúc, classification có thể gắn với tập dữ liệu, cột, trường hoặc đối tượng.

**Liên hệ Big Data.** Nhiều tệp, phân vùng và định dạng khiến việc xác định phạm vi quét trở thành một phần của bảo đảm phát hiện. Một finding nói lên điều detector quan sát trong phần dữ liệu đã quét; không có finding trong phần đó không chứng minh toàn bộ kho không có dữ liệu nhạy cảm. Nghiên cứu của Liu và cộng sự khảo sát quét nội dung nhạy cảm bằng MapReduce, nhưng không xác nhận mọi thiết kế pipeline A/B/C.

**Đánh đổi thiết kế.** Quét toàn bộ phạm vi giúp kiểm tra cả dữ liệu cũ nhưng tốn thêm tài nguyên xử lý. Quét tăng dần chỉ kiểm tra dữ liệu mới hoặc đã thay đổi, nên cần theo dõi thay đổi đáng tin cậy và xem xét quét lại khi detector hoặc policy thay đổi. Lấy mẫu giảm lượng cần xử lý nhưng để lại dữ liệu chưa được kiểm tra. Ở quy mô Big Data, độ phủ, khối lượng cần quét và tần suất cập nhật cùng ảnh hưởng tới chi phí; đây là các đánh đổi thiết kế, không phải khẳng định hiệu năng của sản phẩm hay demo.

**Nguồn tham khảo.** [NIST — Data Loss Prevention](https://csrc.nist.gov/glossary/term/data_loss_prevention) mô tả DLP trên data at rest, data in use và data in motion; [Liu et al. (2015), “Privacy-Preserving Scanning of Big Content for Sensitive Data Exposure with MapReduce”](https://vtechworks.lib.vt.edu/items/2652b4c0-305d-4b03-b463-e16d1cd8ad4e) khảo sát quét nội dung nhạy cảm bằng MapReduce, không xác nhận mọi thiết kế pipeline A/B/C.

[click]
### B — Rà soát sau biến đổi

**Cơ chế.** Dữ liệu sau xử lý (derived data) là dữ liệu được tạo qua phép xử lý như join hoặc tổng hợp. Xử lý có thể làm độ nhạy tăng, giảm hoặc giữ nguyên tùy nội dung và khả năng liên kết. Sao chép thuần túy tạo thêm một bản giữ nguyên nội dung nguồn; nó không phải phép xử lý làm thay đổi dữ liệu. Export là hành động đưa dữ liệu tới một đích, còn dữ liệu sau xử lý là kết quả của xử lý; kết quả đó có thể được lưu, xử lý tiếp hoặc export. Lineage ghi lại nguồn và các phép biến đổi đã được thu thập. Nó hỗ trợ truy vết nhưng không tự xác định độ nhạy của mọi kết quả hoặc chứng minh classification chính xác.

**Ví dụ cụ thể.** Bảng giao dịch có mã khách hàng và lịch sử mua hàng; bảng liên hệ ánh xạ mã đó tới tên hoặc email. Join hai bảng liên kết lịch sử giao dịch với danh tính, nên kết quả có thể nhạy cảm hơn. Mỗi bảng nguồn vẫn cần được xem xét theo nội dung và policy riêng; không giả định bảng nào mặc nhiên không nhạy cảm.

**Câu hỏi và giải thích:** “Vì sao kết quả sau join vẫn cần được rà soát classification?” Join có thể liên kết hành vi với danh tính, làm thay đổi thông tin có thể suy ra từ kết quả.

**Nguồn tham khảo.** [Apache Atlas — classification propagation](https://atlas.apache.org/2.0.0/ClassificationPropagation.html). Atlas mô tả propagation theo lineage đã cấu hình; đây là metadata hỗ trợ truy vết, không chứng minh classification phản ánh chính xác nội dung sau biến đổi.

[click]
### C — Policy và enforcement

**Cơ chế.** Policy xét classification hoặc label cùng người thực hiện, hành động và đích nhận để đưa ra quyết định như cho phép, cảnh báo hoặc chặn. Enforcement là trách nhiệm áp dụng quyết định tại điểm kiểm soát đã tích hợp; detector hoặc policy không tự chặn query hay export nếu đường dữ liệu thiếu tích hợp đó.

**Liên hệ Big Data.** Query tương tác, notebook, batch job, API, chia sẻ, upload, truyền và export có thể tạo nhiều đường dữ liệu độc lập, ở các bước khác nhau của pipeline. Một điểm thực thi chỉ kiểm soát hoạt động đi qua tích hợp tương ứng; một query không tự đồng nghĩa với export, còn các bản sao hoặc yêu cầu đi đường khác nằm ngoài phạm vi đó.

**Vị trí tích hợp.** Endpoint trên máy chuyên viên chỉ quan sát thao tác hỗ trợ ở thiết bị đó, không tự bao phủ cluster. Network DLP cần lưu lượng đi qua gateway và khả năng đọc nội dung; quan sát gói tin mã hóa không mặc định đọc được payload. Quét kho cloud có thể bất đồng bộ, nên finding chưa chắc có trước lần download. Giám sát và chặn là hai năng lực riêng; đường service-to-service ngoài tích hợp vẫn cần kiểm soát phù hợp.

**Chuyển sang vận hành.** Enforcement có thể chặn tức thời; cảnh báo sau đó cần được xác minh và khắc phục theo vòng đời xử lý cảnh báo ở cuối phần này.

**Giới hạn và đánh đổi.** Một minh họa cục bộ một triệu dòng cho thấy cách xử lý trên tập dữ liệu đó, không xác lập khả năng mở rộng trên hệ thống phân tán. Độ phủ, chi phí, độ trễ và đường đi ngoài tích hợp cần được đánh giá trên hệ thống đích; đây là cân nhắc thiết kế, không phải năng lực demo được khẳng định.
-->
