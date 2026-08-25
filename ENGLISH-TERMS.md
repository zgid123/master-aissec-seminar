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
| OS | Hệ điều hành; một lớp bảo vệ file và process trong mô hình Defense-in-Depth |
| SDM | Static Data Masking |
| SQL | Ngôn ngữ truy vấn được dùng trong các ví dụ trên slide |
| Zone Map / ZONEMAP | Giúp giảm số hàng cần đọc trong query path trên slide |

## 2. Thuật ngữ xuất hiện trên slide

Các biến thể số ít, số nhiều hoặc khác cách viết hoa được gộp vào cùng một mục.

| Thuật ngữ | Cách hiểu trong bài |
| --- | --- |
| Access | Truy cập |
| Access path | Đường truy cập từ user đến dữ liệu |
| Access Context | Ngữ cảnh truy cập |
| Access Control | Kiểm soát truy cập |
| Accounting | Ghi nhận hoạt động |
| Address | Địa chỉ |
| Analytical / Analytics | Phân tích dữ liệu |
| Application | Ứng dụng |
| Arbitrary SQL | Câu lệnh SQL tùy ý do user kiểm soát |
| At-Rest | Trạng thái dữ liệu đang lưu trữ |
| Audit / Auditing | Kiểm toán, ghi nhận hoạt động |
| Audit trail | Dấu vết kiểm toán phục vụ phát hiện lạm dụng |
| Authentication / Authenticated | Xác thực / đã xác thực |
| Authorization / Authorized | Phân quyền / đã được cấp quyền |
| Auto-install / Auto-load | Cơ chế tự cài hoặc tự nạp extension của DuckDB |
| Availability | Tính sẵn sàng |
| Backend | Lớp xử lý phía server |
| Backend-only access | Chỉ cho phép backend truy cập dữ liệu gốc |
| Backup | Sao lưu |
| Bearer token | Token xác thực được gửi theo cơ chế Bearer |
| Behavior | Hành vi |
| Bind / Binding | Gắn một giá trị vào parameter |
| Boundary | Ranh giới kiểm soát hoặc tin cậy |
| Bypass | Đi vòng qua cơ chế kiểm soát |
| Client | Phía gửi request đến server |
| Confidentiality | Tính bí mật |
| Condition | Điều kiện để cơ chế bảo mật có hiệu lực |
| Configuration | Cấu hình của DuckDB runtime |
| Context | Ngữ cảnh |
| Credit card | Thẻ tín dụng |
| Customer | Khách hàng |
| Data | Dữ liệu |
| Data Masking | Che dữ liệu |
| Database | Cơ sở dữ liệu |
| Database server | Tiến trình server quản lý cơ sở dữ liệu |
| Defense-in-Depth | Phòng thủ chiều sâu |
| Demo | Bản minh họa |
| Disaster Recovery | Khôi phục sau thảm họa |
| Dynamic | Thay đổi theo ngữ cảnh tại thời điểm xử lý |
| Dynamic Data Masking | Che dữ liệu động |
| Embedded | Nhúng trực tiếp vào tiến trình ứng dụng |
| Embedded analytical database | Cơ sở dữ liệu phân tích dạng nhúng |
| Encryption / Encrypted | Mã hóa / đã được mã hóa |
| Endpoint | Điểm truy cập API |
| Enforce | Thực thi bắt buộc |
| Execution | Môi trường hoặc quá trình thực thi câu lệnh |
| Expression | Biểu thức SQL dùng để tạo giá trị đã che |
| Export | Xuất dữ liệu ra khỏi hệ thống |
| Extension | Phần mở rộng có thể được DuckDB nạp khi chạy |
| External access | Quyền truy cập file hoặc tài nguyên bên ngoài DuckDB |
| Filter | Điều kiện lọc |
| Fixed / Prepared query | Truy vấn cố định hoặc được tham số hóa, không cho user tự thay cấu trúc |
| Hash / Hashing | Băm dữ liệu |
| Hardening | Gia cố cấu hình và các lớp bảo vệ cho môi trường production |
| Email | Địa chỉ thư điện tử |
| Identity | Danh tính đã xác minh |
| Index / Indexing | Chỉ mục / lập chỉ mục |
| Input | Dữ liệu đầu vào |
| Input Validation | Kiểm tra dữ liệu đầu vào |
| Insider Threat / Insider Threats | Mối đe dọa từ người nội bộ |
| In-Transit | Trạng thái dữ liệu đang truyền tải |
| Intended path | Đường truy cập dự kiến đi qua đầy đủ lớp kiểm soát |
| Integrity | Tính toàn vẹn |
| Isolation | Cô lập tiến trình hoặc tenant |
| Join | Ghép các bảng theo giá trị chung |
| Least Privilege | Đặc quyền tối thiểu |
| Log / Logging | Nhật ký hệ thống / hoạt động ghi nhật ký |
| Macro | Cấu trúc SQL tái sử dụng biểu thức hoặc truy vấn |
| Manager | Role quản lý, được xem dữ liệu gốc trong demo |
| Mask / Masked | Che / đã được che |
| Masking | Cơ chế che dữ liệu |
| Masking behavior | Hành vi che dữ liệu |
| Masking logic | Logic tạo ra giá trị đã che |
| Masking rule | Quy tắc biến đổi dữ liệu hiển thị |
| Monitoring | Giám sát |
| Output | Dữ liệu đầu ra |
| Parameter / Parameterization | Tham số / tham số hóa |
| Permission | Quyền truy cập |
| Phone | Số điện thoại |
| Policy | Chính sách |
| Policy Enforcer | Lớp chọn query và bind role đã được xác minh |
| Process | Tiến trình |
| Privilege / Privileges | Đặc quyền |
| Privilege Abuse | Lạm dụng đặc quyền |
| Privilege escalation | Leo thang đặc quyền do role không đáng tin cậy |
| Production | Môi trường vận hành thật |
| Query | Truy vấn |
| Query Engine | Thành phần thực thi truy vấn; trên slide là DuckDB |
| Query path | Đường đi của truy vấn |
| Query plan | Kế hoạch thực thi truy vấn |
| Query time | Thời điểm truy vấn |
| Ransomware | Mã độc tống tiền |
| Raw | Dữ liệu hoặc tài nguyên gốc, chưa che |
| Record | Bản ghi |
| Recovery | Khôi phục |
| Request | Yêu cầu gửi đến server |
| Response | Phản hồi từ server |
| Review | Rà soát quyền truy cập |
| Role | Vai trò của người dùng |
| Role-aware query | Truy vấn thay đổi output theo role |
| Runtime | Môi trường thực thi DuckDB trong process ứng dụng |
| Sandbox | Môi trường thực thi bị giới hạn |
| Salary | Lương |
| Scalar macro | Đóng gói thao tác che email để tái sử dụng trong truy vấn |
| Secure | An toàn |
| Security | Bảo mật |
| Server | Máy chủ hoặc tiến trình phục vụ |
| Service account | Tài khoản hệ điều hành sở hữu file và chạy service |
| Session | Phiên đăng nhập |
| Static | Được tạo cố định trước khi sử dụng |
| Static Data Masking | Che dữ liệu tĩnh |
| Storage | Lớp lưu trữ file `.duckdb` |
| Substitution | Thay thế bằng dữ liệu khác |
| Support | Role hỗ trợ, nhận dữ liệu đã che trong demo |
| Table | Bảng dữ liệu |
| Tenant | Đối tượng thuê hoặc miền người dùng cần được cô lập |
| Token | Mã đại diện cho phiên hoặc dữ liệu |
| Trusted / Untrusted | Đáng tin cậy / không đáng tin cậy trong access path |
| User | Người dùng |
| Validation | Kiểm tra tính hợp lệ |
| Verified | Đã được xác minh |
| View | Giao diện truy vấn ổn định trên dữ liệu |
| Whitelist | Danh sách role được phép chấp nhận |

## 3. Cụm từ và nhãn tiếng Anh đang hiển thị

- `Access Control & Least Privilege`
- `Access Context`
- `Access path`
- `Accounting / Auditing`
- `Address`
- `Arbitrary SQL`
- `ART index scan`
- `Audit trail`
- `Auditing & Monitoring`
- `Backup & Disaster Recovery`
- `Backend-only access`
- `Bind by name`
- `Customer Record`
- `Customer Support`
- `Database encrypted`
- `Defense-in-Depth`
- `DuckDB Parameter`
- `DuckDB Runtime`
- `Dynamic Data Masking`
- `Embedded analytical database`
- `Excessive Privileges`
- `External file access`
- `Fixed query`
- `Input Validation & Parameterization`
- `Intended path`
- `Insider Threats`
- `Masking behavior`
- `Masking logic`
- `Masking rule`
- `Masked output`
- `Node.js API`
- `Node.js Value`
- `Original record`
- `OS & Storage`
- `OS permission`
- `OS sandbox`
- `Policy Enforcer`
- `Policy macro`
- `Prepared/fixed queries`
- `Privilege Abuse`
- `Privilege escalation`
- `Query Engine`
- `Query Output`
- `Query path`
- `Query plan`
- `Query time`
- `Raw file access`
- `Raw file`
- `Raw SQL`
- `Raw table access`
- `Raw table`
- `Role-aware query`
- `Secure connection`
- `Security configuration`
- `Service account`
- `SQL Injection`
- `SQL expression`
- `SQL text`
- `Static Data Masking`
- `Trusted backend`
- `Trust boundary`
- `Untrusted execution`
- `Untrusted SQL`
- `Verified access context`
- `Verify identity`
- `Verify token/session`
- `Whitelist role`

## 4. Giá trị role và môi trường xuất hiện trên slide

- `manager`
- `support`
- `privileged`
- `restricted`
- `production`

## 5. SQL keywords và hàm xuất hiện trong slide

### Keywords

- `AS`
- `CASE`
- `CREATE MACRO`
- `ELSE`
- `END`
- `EXPLAIN ANALYZE`
- `FROM`
- `IS`
- `LIMIT`
- `NULL`
- `SELECT`
- `THEN`
- `WHEN`
- `WHERE`

### Hàm, macro, parameter và identifier

- `concat(...)`
- `left(...)`
- `split_part(...)`
- `email_for_role(...)`
- `mask_email(...)`
- `customers`
- `email`
- `email_value`
- `id`
- `name`
- `viewer_role`
- `$viewer_role`
- `$email`
- `$id`
- `$page_size`

## 6. TypeScript, Node.js và HTTP identifiers xuất hiện trong slide

- `async`
- `authenticate(...)`
- `AuthenticatedRequest`
- `await`
- `Authorization`
- `Bearer`
- `connection.runAndReadAll(...)`
- `const`
- `CUSTOMER_QUERY`
- `function`
- `identity`
- `identity.role`
- `identity.username`
- `if`
- `next`
- `NextFunction`
- `Promise<void>`
- `reader`
- `req`
- `_res`
- `req.body.role`
- `req.header(...)`
- `req.user`
- `req.user.role`
- `requireAuth(...)`
- `return`
- `res`
- `res.sendStatus(...)`
- `Response`
- `Role`
- `role`
- `type`
- `username`
- `401`
- `403`

## 7. Quy ước nên dùng thống nhất

- Giữ nguyên tên công nghệ, chữ viết tắt, SQL keywords, API/HTTP identifiers và tên role.
- Khi đã dùng thuật ngữ tiếng Anh trên slide, không đổi sang một từ tiếng Anh đồng nghĩa ở slide khác. Ví dụ: dùng thống nhất `masking`, không xen kẽ `redaction` nếu không nói về một cơ chế khác.
- Với thuật ngữ có bản dịch ngay trên slide, lần đầu nên viết theo dạng `tiếng Việt (English)`, sau đó có thể dùng một dạng thống nhất.
- Không dùng English cho từ phổ thông nếu bản dịch tiếng Việt ngắn và rõ. Ví dụ: ưu tiên “kết quả” thay cho `result`, “truy vấn” thay cho `query` trong câu văn; giữ `query` khi nó là một phần của code hoặc cụm kỹ thuật đã thống nhất như `query time`.

## 8. Các mục cần rà soát khi nội dung thay đổi

- Thêm thuật ngữ mới vào file này khi thêm hoặc sửa nội dung hiển thị trên slide.
- Không bổ sung thuật ngữ chỉ vì nó xuất hiện trong speaker notes, source code của demo hoặc tài liệu tham khảo.
- Kiểm tra cách viết hoa: `Node.js`, `DuckDB`, `Dynamic Data Masking`, `Access Control`, `Defense-in-Depth`.
- Kiểm tra dấu gạch nối: `role-aware`, `backend-only`, `auto-install`, `auto-load`.
- Kiểm tra cách viết môi trường: dùng thống nhất `production`.
- Kiểm tra role: phần triển khai dùng `manager` / `support`; slide minh họa query-time dùng `privileged` / `restricted`.
