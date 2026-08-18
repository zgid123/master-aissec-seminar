# Speaker Notes - Section 4

## Timing

Target: 3.5-4 minutes.

## Slide 1 - Demo và thảo luận

> Sau khi section 3 đã nói DuckDB có thể dùng SQL expression, macro và view để mask dữ liệu, phần này sẽ cho thấy output thực tế. Em dùng một bảng khách hàng nhỏ để minh họa bốn trường nhạy cảm: email, phone, credit card và salary. Mục tiêu là chứng minh dynamic behavior, sau đó nói rõ giới hạn security.

## Slide 2 - Dataset demo

> Đây là bản ghi gốc. Tên được giữ nguyên vì thường vẫn cần cho nghiệp vụ. Email được giữ ký tự đầu và domain, phone và credit card giữ bốn số cuối, salary bị ẩn hoàn toàn. Như vậy dữ liệu vẫn có ích ở mức nhận diện hoặc đối soát, nhưng giảm phần nhạy cảm bị lộ.

## Slide 3 - Query-time policy

> Phần SQL bên trái là masking logic, đóng gói bằng macro để tái sử dụng. Phần bên phải là table macro nhận một access context là `role`. Nếu role là `privileged`, query trả dữ liệu gốc. Nếu không, query gọi các masking macro. Trong demo, role là tham số để minh họa; trong hệ thống thật, role phải đến từ application authentication và authorization.

## Slide 4 - Same data, different output

> Đây là điểm làm cho nó dynamic. Cùng database, cùng dữ liệu gốc, nhưng output thay đổi ở query time theo access context. Privileged user thấy raw values; restricted user thấy masked values. Original data không bị sửa, chỉ kết quả query thay đổi.

## Slide 5 - Data Masking không phải Access Control

> Đây là giới hạn quan trọng nhất. Macro chỉ trả lời dữ liệu được che như thế nào. View có thể làm abstraction layer tốt, nhưng nếu user vẫn truy cập trực tiếp raw table hoặc raw file, họ bypass được masking. Vì DuckDB thường chạy embedded trong application process, SQL chạy với quyền của process đó. Vì vậy untrusted SQL cần được kiểm soát bằng application policy, sandbox hoặc kiến trúc triển khai phù hợp.

## Slide 6 - Khi policy bị bypass

> Slide này cho thấy khác biệt giữa intended path và unsafe path. Intended path là restricted user chỉ query qua `customers_for('restricted')` hoặc view đã mask. Unsafe path là user query thẳng bảng `customers`, khi đó dữ liệu gốc lộ ra. Đây là lý do em không nói macro/view là security boundary hoàn chỉnh.

## Slide 7 - 3 điều cần nhớ

> Em chốt lại bằng ba ý. Một là database security cần nhiều lớp. Hai là Dynamic Data Masking giúp giảm phơi lộ dữ liệu nhạy cảm mà không thay đổi dữ liệu gốc. Ba là DuckDB có building blocks để làm masking, nhưng DDM theo quyền thật sự cần access-control layer đáng tin cậy. Câu chốt là: masking logic trả lời "che như thế nào", access control trả lời "ai được xem gì".

## Backup Q&A

Q: DuckDB có native Dynamic Data Masking không?

> Không theo dạng built-in policy như một số enterprise DBMS. Seminar này demo cách xây behavior bằng macro, view và application context.

Q: View có đủ bảo mật không?

> Chỉ khi restricted user không có quyền truy cập raw table hoặc raw file. Nếu còn direct access, view bị bypass.

Q: Macro có phải security boundary không?

> Không. Macro là reusable SQL expression, không tự enforce quyền.

Q: Masking có thay encryption không?

> Không. Encryption bảo vệ dữ liệu khi lưu/truyền; masking kiểm soát dữ liệu được hiển thị khi query.
