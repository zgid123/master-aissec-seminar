# Speaker Notes - Section 4

## Timing

Target: 4-4.5 minutes.

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

## Slide 7 - Giới hạn của DuckDB

> Phần này đặt DuckDB vào so sánh với các database phổ biến hơn. DuckDB là embedded database, chạy trong application process, nên nó rất phù hợp cho analytics, local workflow và demo này. Nhưng khác với SQL Server, Oracle hay PostgreSQL, DuckDB không có một database server trung tâm để enforce user, role, privilege và policy cho nhiều user cuối. SQL Server có Dynamic Data Masking ở database layer; Oracle có Data Redaction; PostgreSQL có Row Level Security để enforce policy theo row. Với DuckDB, macro và view giúp tạo masking behavior, nhưng access context và đường query an toàn phải do application kiểm soát. Vì vậy nếu user đọc được file `.duckdb` hoặc chạy raw SQL vào bảng gốc, masking có thể bị bypass.

## Slide 8 - Conclusion

> Để kết lại toàn seminar, có bốn ý chính. Một là database security cần defense-in-depth: authentication, authorization, encryption, masking, audit và deployment phải phối hợp với nhau. Hai là data masking hữu ích vì nó giảm phơi lộ dữ liệu nhạy cảm trong khi user vẫn có thể làm việc với hệ thống. Ba là điểm dynamic nằm ở chỗ cùng dữ liệu gốc nhưng output thay đổi theo access context. Bốn là DuckDB cho thấy ta có thể xây behavior này bằng SQL primitives, nhưng security thực tế vẫn cần một access-control layer đáng tin cậy. Câu chốt là: masking trả lời "data nên hiển thị như thế nào", còn access control trả lời "ai được phép xem gì".

## Backup Q&A

Q: DuckDB có native Dynamic Data Masking không?

> Không theo dạng built-in policy như một số enterprise DBMS. Seminar này demo cách xây behavior bằng macro, view và application context.

Q: View có đủ bảo mật không?

> Chỉ khi restricted user không có quyền truy cập raw table hoặc raw file. Nếu còn direct access, view bị bypass.

Q: Macro có phải security boundary không?

> Không. Macro là reusable SQL expression, không tự enforce quyền.

Q: Masking có thay encryption không?

> Không. Encryption bảo vệ dữ liệu khi lưu/truyền; masking kiểm soát dữ liệu được hiển thị khi query.
