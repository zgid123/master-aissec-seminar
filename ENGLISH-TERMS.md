# Thuật ngữ tiếng Anh trong seminar

File này là danh sách chuẩn hóa các từ và cụm từ tiếng Anh **được hiển thị trên slide**. Đây là nguồn thuật ngữ dùng để tạo câu hỏi, vì vậy câu hỏi và đáp án chỉ được dùng kiến thức xuất hiện trực tiếp trên slide.

Phạm vi rà soát:

- Chỉ tính nội dung người xem nhìn thấy trên slide: tiêu đề, đoạn văn, bảng, sơ đồ, nhãn và các đoạn SQL/TypeScript được trình chiếu.
- Không lấy thuật ngữ hoặc kiến thức từ speaker notes, speaker script, comment ẩn, mã nguồn/giao diện demo, README hay tài liệu tham khảo bên ngoài.
- Không tính frontmatter, HTML, CSS, URL, tên file, tên class và dữ liệu mẫu như email.
- Nếu một chi tiết chỉ có trong phần bị loại trừ ở trên thì không dùng chi tiết đó để tạo câu hỏi hoặc đáp án, kể cả khi nó đúng về mặt kỹ thuật.

## 1. Tên riêng và chữ viết tắt

| Thuật ngữ | Nghĩa hoặc cách dùng trong seminar |
| --- | --- |
| AAA | Authentication, Authorization, Accounting |
| API | Xuất hiện trong cụm `Node.js API` |
| ART | Xuất hiện trong cụm `ART index scan` |
| CIA | Confidentiality, Integrity, Availability |
| CPU | Chi phí xử lý tăng thêm khi dùng biểu thức masking |
| DBMS | Hệ quản trị cơ sở dữ liệu |
| DDM | Dynamic Data Masking |
| DuckDB | Tên hệ quản trị cơ sở dữ liệu dùng trong demo |
| MFA | Một ví dụ về cơ chế xác thực người dùng trên slide |
| Node.js | Runtime của backend trong demo |
| Oracle | Tên hệ quản trị cơ sở dữ liệu |
| PostgreSQL | Tên hệ quản trị cơ sở dữ liệu |
| RLS | Cơ chế được nêu trên slide để giảm rủi ro bypass ở DBMS phổ biến |
| SDM | Static Data Masking |
| SQL | Ngôn ngữ truy vấn được dùng trong các ví dụ trên slide |
| SQL Server | Tên hệ quản trị cơ sở dữ liệu của Microsoft |
| Zone Map / ZONEMAP | Giúp giảm số hàng cần đọc trong query path trên slide |

## 2. Thuật ngữ xuất hiện trên slide

Các biến thể số ít, số nhiều hoặc khác cách viết hoa được gộp vào cùng một mục.

| Thuật ngữ | Cách hiểu trong bài |
| --- | --- |
| Access | Truy cập |
| Access Context | Ngữ cảnh truy cập |
| Access Control | Kiểm soát truy cập |
| Accounting | Ghi nhận hoạt động |
| Analytical / Analytics | Phân tích dữ liệu |
| App | Cách viết ngắn của application |
| Application | Ứng dụng |
| Application process | Tiến trình ứng dụng |
| At-Rest | Trạng thái dữ liệu đang lưu trữ |
| Audit / Auditing | Kiểm toán, ghi nhận hoạt động |
| Authentication / Authenticated | Xác thực / đã xác thực |
| Authorization / Authorized | Phân quyền / đã được cấp quyền |
| Availability | Tính sẵn sàng |
| Backend | Lớp xử lý phía server |
| Backup | Sao lưu |
| Bearer token | Token xác thực được gửi theo cơ chế Bearer |
| Behavior | Hành vi |
| Bind / Binding | Gắn một giá trị vào parameter |
| Bypass | Đi vòng qua cơ chế kiểm soát |
| Ciphertext | Dữ liệu sau khi mã hóa |
| Client | Phía gửi request đến server |
| Client-server | Kiến trúc máy khách - máy chủ |
| Confidentiality | Tính bí mật |
| Concept | Khái niệm |
| Conclusion | Kết luận |
| Context | Ngữ cảnh |
| Credit card | Thẻ tín dụng |
| Customer | Khách hàng |
| Data | Dữ liệu |
| Data Masking | Che dữ liệu |
| Data Redaction | Cơ chế được nêu cho Oracle trên slide so sánh |
| Dataset | Tập dữ liệu |
| Database | Cơ sở dữ liệu |
| Database layer | Lớp cơ sở dữ liệu |
| Database-native | Được cơ sở dữ liệu hỗ trợ trực tiếp |
| Database server | Tiến trình server quản lý cơ sở dữ liệu |
| Defense-in-Depth | Phòng thủ chiều sâu |
| Demo | Bản minh họa |
| Deployment | Triển khai hệ thống |
| Direct table access | Truy cập trực tiếp bảng gốc |
| Disaster Recovery | Khôi phục sau thảm họa |
| Dynamic | Thay đổi theo ngữ cảnh tại thời điểm xử lý |
| Dynamic Data Masking | Che dữ liệu động |
| Embedded | Nhúng trực tiếp vào tiến trình ứng dụng |
| Embedded analytical database | Cơ sở dữ liệu phân tích dạng nhúng |
| Embedded database | Cơ sở dữ liệu dạng nhúng |
| Encryption / Encrypted | Mã hóa / đã được mã hóa |
| Endpoint | Điểm truy cập API |
| Enforcement | Việc thực thi bắt buộc policy |
| Enforce | Thực thi bắt buộc |
| Filter | Điều kiện lọc |
| Fixed query | Truy vấn cố định, không cho client tự thay cấu trúc |
| GRANT | Lệnh SQL cấp quyền |
| Hash / Hashing | Băm dữ liệu |
| Email | Địa chỉ thư điện tử |
| Identity | Danh tính đã xác minh |
| Index / Indexing | Chỉ mục / lập chỉ mục |
| Input | Dữ liệu đầu vào |
| Input Validation | Kiểm tra dữ liệu đầu vào |
| Insider Threat / Insider Threats | Mối đe dọa từ người nội bộ |
| In-Transit | Trạng thái dữ liệu đang truyền tải |
| Integrity | Tính toàn vẹn |
| Least Privilege | Đặc quyền tối thiểu |
| Layer | Lớp kiến trúc |
| Log | Nhật ký hệ thống |
| Macro | Cấu trúc SQL tái sử dụng biểu thức hoặc truy vấn |
| Manager | Role quản lý, được xem dữ liệu gốc trong demo |
| Mask / Masked | Che / đã được che |
| Masking | Cơ chế che dữ liệu |
| Masking behavior | Hành vi che dữ liệu |
| Masking layer | Lớp che dữ liệu |
| Masking logic | Logic tạo ra giá trị đã che |
| Monitoring | Giám sát |
| Multi-user | Nhiều người dùng |
| Native | Được công nghệ hỗ trợ trực tiếp |
| Output | Dữ liệu đầu ra |
| Parameter / Parameterization | Tham số / tham số hóa |
| Partial redaction | Che một phần dữ liệu |
| Permission | Quyền truy cập |
| Phone | Số điện thoại |
| Policy | Chính sách |
| Process | Tiến trình |
| Privilege / Privileges | Đặc quyền |
| Privilege Abuse | Lạm dụng đặc quyền |
| Primitives | Các thành phần cơ bản dùng để xây cơ chế lớn hơn |
| Production | Môi trường vận hành thật |
| Query | Truy vấn |
| Query path | Đường đi của truy vấn |
| Query plan | Kế hoạch thực thi truy vấn |
| Query time | Thời điểm truy vấn |
| Ransomware | Mã độc tống tiền |
| Raw | Dữ liệu hoặc tài nguyên gốc, chưa che |
| Record | Bản ghi |
| Recovery | Khôi phục |
| Redact / Redaction | Che hoặc biên tập dữ liệu trả về |
| Request | Yêu cầu gửi đến server |
| Response | Phản hồi từ server |
| Risk | Rủi ro |
| Role | Vai trò của người dùng |
| Row | Hàng dữ liệu |
| Sandbox | Môi trường thực thi bị giới hạn |
| Salary | Lương |
| Scalar macro | Đóng gói thao tác che email để tái sử dụng trong truy vấn |
| Schema | Lược đồ cơ sở dữ liệu |
| Secure | An toàn |
| Security | Bảo mật |
| Security boundary | Ranh giới bảo mật |
| Server | Máy chủ hoặc tiến trình phục vụ |
| Session | Phiên đăng nhập |
| Static | Được tạo cố định trước khi sử dụng |
| Static Data Masking | Che dữ liệu tĩnh |
| Substitution | Thay thế bằng dữ liệu khác |
| Support | Role hỗ trợ, nhận dữ liệu đã che trong demo |
| Table | Bảng dữ liệu |
| Token | Mã đại diện cho phiên hoặc dữ liệu |
| Tokenization | Mã hóa token |
| Takeaways | Các ý chính cần ghi nhớ |
| User | Người dùng |
| Validation | Kiểm tra tính hợp lệ |
| View | Giao diện truy vấn ổn định trên dữ liệu |

## 3. Cụm từ và nhãn tiếng Anh đang hiển thị

- `Access Control & Least Privilege`
- `Access Context`
- `Accounting / Auditing`
- `ART index scan`
- `Auditing & Monitoring`
- `Backup & Disaster Recovery`
- `Bind by name`
- `Bypass risk`
- `Customer Record`
- `Customer Support`
- `Dataset demo`
- `Database encrypted`
- `Database-native security boundary`
- `Defense-in-Depth`
- `Direct table access`
- `DuckDB Parameter`
- `Dynamic Data Masking`
- `Embedded analytical database`
- `Embedded database`
- `Excessive Privileges`
- `Fixed query`
- `Input Validation & Parameterization`
- `Insider Threats`
- `Masking behavior`
- `Masking layer`
- `Masking logic`
- `Masked output`
- `Native DDM policy`
- `Native masking`
- `Node.js API`
- `Node.js Value`
- `Original record`
- `Policy macro`
- `Privilege Abuse`
- `Query Output`
- `Query path`
- `Query plan`
- `Query time`
- `Raw file`
- `Raw SQL`
- `Raw table`
- `Secure connection`
- `Secure deployment`
- `SQL Injection`
- `Static Data Masking`

## 4. Giá trị role và môi trường xuất hiện trên slide

- `manager`
- `support`
- `production`

## 5. SQL keywords và hàm xuất hiện trong slide

### Keywords

- `ANALYZE`
- `AS`
- `CASE`
- `CREATE MACRO`
- `CREATE OR REPLACE MACRO`
- `ELSE`
- `END`
- `EXPLAIN ANALYZE`
- `FROM`
- `GRANT`
- `LIMIT`
- `NULL`
- `SELECT`
- `TABLE`
- `THEN`
- `WHEN`
- `WHERE`

### Hàm, macro, parameter và identifier

- `concat(...)`
- `left(...)`
- `split_part(...)`
- `customers_for(...)`
- `email_for_role(...)`
- `mask_email(...)`
- `mask_salary(...)`
- `email_value`
- `viewer_role`
- `$viewer_role`
- `$email`
- `$id`
- `$page_size`

## 6. TypeScript, Node.js và HTTP identifiers xuất hiện trong slide

- `async`
- `await`
- `Authorization`
- `Bearer`
- `connection.runAndReadAll(...)`
- `const`
- `identity.role`
- `identity.username`
- `next`
- `req`
- `req.body.role`
- `req.header(...)`
- `req.user`
- `req.user.role`
- `requireAuth(...)`
- `res`
- `res.sendStatus(...)`
- `Response`
- `Role`
- `username`

## 7. Quy ước nên dùng thống nhất

- Giữ nguyên tên công nghệ, chữ viết tắt, SQL keywords, API/HTTP identifiers và tên role.
- Khi đã dùng thuật ngữ tiếng Anh trên slide, không đổi sang một từ tiếng Anh đồng nghĩa ở slide khác. Ví dụ: dùng thống nhất `masking`, không xen kẽ `redaction` nếu không nói về một cơ chế khác.
- Với thuật ngữ có bản dịch ngay trên slide, lần đầu nên viết theo dạng `tiếng Việt (English)`, sau đó có thể dùng một dạng thống nhất.
- Không dùng English cho từ phổ thông nếu bản dịch tiếng Việt ngắn và rõ. Ví dụ: ưu tiên “kết quả” thay cho `result`, “truy vấn” thay cho `query` trong câu văn; giữ `query` khi nó là một phần của code hoặc cụm kỹ thuật đã thống nhất như `query time`.

## 8. Các mục cần rà soát khi nội dung thay đổi

- Thêm thuật ngữ mới vào file này khi thêm hoặc sửa nội dung hiển thị trên slide.
- Không bổ sung thuật ngữ chỉ vì nó xuất hiện trong speaker notes, source code của demo hoặc tài liệu tham khảo.
- Kiểm tra cách viết hoa: `Node.js`, `DuckDB`, `PostgreSQL`, `SQL Server`, `Dynamic Data Masking`.
- Kiểm tra dấu gạch nối: `database-native`, `server-side`, `multi-user`.
- Kiểm tra cách viết môi trường: dùng thống nhất `production`.
- Kiểm tra role: dùng thống nhất `manager` và `support`.
