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
| AAA | Authentication, Authorization, Accounting (ba bước kiểm soát truy cập) |
| API | Application Programming Interface; xuất hiện trong cụm `Application / API` |
| Azure SQL | Dịch vụ CSDL đám mây của Microsoft có tính năng Dynamic Data Masking |
| BigQuery | Dịch vụ CSDL đám mây của Google hỗ trợ DDM qua data policy |
| BI | Business Intelligence; tên một role phân tích dữ liệu trên slide |
| CIA | Confidentiality, Integrity, Availability (ba mục tiêu an toàn thông tin) |
| C / I / A | Ký hiệu viết tắt phân loại tác động lên Confidentiality, Integrity, Availability trên slide mối đe dọa |
| DBA | Database Administrator; người quản trị cơ sở dữ liệu |
| DBMS | Database Management System; hệ quản trị cơ sở dữ liệu |
| DBMS_REDACT | Gói PL/SQL quản trị Data Redaction trong Oracle Database |
| DDM | Dynamic Data Masking; che dữ liệu động |
| DiD | Defense-in-Depth; mô hình phòng thủ nhiều lớp |
| DLP | Data Loss Prevention; giải pháp chống thất thoát dữ liệu |
| DuckDB | Hệ quản trị cơ sở dữ liệu phân tích dạng nhúng dùng trong demo |
| MFA | Multi-Factor Authentication; cơ chế xác thực đa yếu tố |
| Oracle / Oracle Database | Hệ quản trị cơ sở dữ liệu có tính năng Data Redaction |
| RBAC | Role-Based Access Control; kiểm soát truy cập dựa trên vai trò |
| RLS | Row-Level Security; bảo mật dữ liệu ở cấp độ dòng |
| Snowflake | Nền tảng cơ sở dữ liệu đám mây có tính năng Dynamic Data Masking |
| SQL | Structured Query Language; ngôn ngữ truy vấn dùng trong các ví dụ trên slide |
| SQL Server | Hệ quản trị cơ sở dữ liệu của Microsoft có tính năng Dynamic Data Masking |
| SYS_CONTEXT | Hàm đọc ngữ cảnh session dùng trong masking policy của Oracle |
| TDE | Transparent Data Encryption; mã hóa dữ liệu trong suốt ở tầng lưu trữ |
| TLS | Transport Layer Security; giao thức bảo mật dữ liệu khi truyền tải |

## 2. Thuật ngữ xuất hiện trên slide

Các biến thể số ít, số nhiều hoặc khác cách viết hoa được gộp vào cùng một mục.

| Thuật ngữ | Cách hiểu trong bài |
| --- | --- |
| Access | Truy cập |
| Access Control | Kiểm soát truy cập |
| Access path | Đường truy cập từ client/user đến dữ liệu |
| Accounting | Ghi nhận hoạt động truy vấn (chữ A thứ ba trong mô hình AAA) |
| Aggregate | Gom nhóm và tính toán tổng hợp trên dữ liệu dạng cột |
| Analytical | Xử lý phân tích dữ liệu |
| Application | Ứng dụng |
| Application policy | Chính sách kiểm soát do tầng ứng dụng thực thi |
| Approach | Hướng tiếp cận giải pháp (custom DuckDB vs native DDM) |
| Arbitrary SQL | Câu lệnh SQL tùy ý do người dùng đưa vào |
| Audit log | Nhật ký kiểm toán ghi nhận các truy vấn |
| Auditing | Kiểm toán và giám sát truy vết hoạt động |
| Authentication | Xác thực danh tính người dùng (chữ A đầu tiên trong mô hình AAA) |
| Authorization | Phân quyền thao tác và dữ liệu (chữ A thứ hai trong mô hình AAA) |
| Availability | Tính sẵn sàng của dữ liệu và dịch vụ (chữ A trong mô hình CIA) |
| Backend | Lớp xử lý phía máy chủ (`trusted backend`) |
| Backup | Sao lưu dữ liệu |
| Baseline | Điểm mốc đối chiếu (`raw baseline`) |
| Behavior | Hành vi xử lý hoặc che dữ liệu của hệ thống |
| Bind / Binding | Gắn giá trị tham số vào truy vấn (`bind parameter`) |
| Boundary | Ranh giới kiểm soát hoặc tin cậy (`trust boundary`, `client boundary`) |
| Bypass | Đi vòng qua cơ chế kiểm soát |
| Central governance | Quản trị chính sách bảo mật tập trung |
| Client | Phía gửi yêu cầu đến server |
| Client boundary | Ranh giới ngăn client can thiệp trực tiếp vào role hoặc câu lệnh SQL |
| Column | Cột trong bảng dữ liệu |
| Confidentiality | Tính bí mật của dữ liệu (chữ C trong mô hình CIA) |
| Consumer | Phía tiếp nhận hoặc tiêu thụ dữ liệu đầu ra |
| Context | Ngữ cảnh truy cập hoặc thực thi |
| Database | Cơ sở dữ liệu |
| Database principal | Thực thể người dùng hoặc role trong CSDL được phân quyền |
| Database server | Tiến trình máy chủ quản lý cơ sở dữ liệu độc lập |
| Data Masking | Che dữ liệu nhạy cảm |
| Data policy | Chính sách dữ liệu (cơ chế cấu hình DDM trong BigQuery) |
| Data Redaction | Tên tính năng che dữ liệu động trong Oracle Database |
| Default-deny | Mặc định từ chối (trả NULL cho mọi role không hợp lệ) |
| Defense-in-depth | Phòng thủ nhiều lớp |
| Demo | Bản minh họa hoạt động |
| Deployment | Mô hình triển khai hệ thống |
| Disaster Recovery | Khôi phục sau thảm họa |
| Domain | Phần tên miền trong địa chỉ email |
| Dynamic | Động; thay đổi theo vai trò hoặc ngữ cảnh khi truy vấn |
| Dynamic Data Masking | Che dữ liệu động tại thời điểm truy vấn |
| Embedded | Nhúng trực tiếp vào tiến trình ứng dụng |
| Encryption | Mã hóa dữ liệu |
| Enforcement | Thực thi bắt buộc chính sách (`native enforcement`) |
| Exempt privilege | Quyền miễn trừ áp dụng masking để xem dữ liệu gốc |
| Execution context | Ngữ cảnh thực thi khi câu truy vấn chạy |
| File | Tệp tin cơ sở dữ liệu (`.duckdb`) |
| File permission | Quyền truy cập tệp tin ở tầng hệ điều hành |
| Filter | Điều kiện lọc dữ liệu |
| Fixed / Parameterized query | Truy vấn cố định hoặc được tham số hóa |
| Full Masking | Che toàn bộ giá trị dữ liệu |
| Functional masking | Khả năng che dữ liệu về mặt chức năng |
| Hash / Hashing | Băm dữ liệu thành chuỗi cố định một chiều |
| Identity | Danh tính người dùng đã được xác thực |
| In-memory | Chạy hoàn toàn trên bộ nhớ RAM |
| Input | Dữ liệu đầu vào do client gửi lên |
| Insider Threat | Mối đe dọa từ người dùng nội bộ |
| Integrity | Tính toàn vẹn của dữ liệu (chữ I trong mô hình CIA) |
| Join | Ghép nối các bảng dữ liệu theo khóa |
| Local analytics | Phân tích dữ liệu cục bộ |
| Log / Logging | Nhật ký hệ thống / hoạt động ghi nhật ký |
| Macro | Cấu trúc hàm SQL đóng gói biểu thức (`scalar macro`) hoặc bảng (`table macro`) trong DuckDB |
| Manager | Role quản lý trong demo, xem dữ liệu gốc (`raw baseline`) |
| Mask / Masked | Che / đã được che |
| Masked value | Giá trị dữ liệu sau khi áp dụng quy tắc che |
| Masking | Kỹ thuật hoặc cơ chế che dữ liệu |
| Masking policy | Chính sách quy định quy tắc che dữ liệu |
| Masking rule | Quy tắc biến đổi giá trị dữ liệu hiển thị |
| Native | Tích hợp sẵn trong engine cơ sở dữ liệu |
| Native DDM | Cơ chế DDM có sẵn do chính DBMS cung cấp |
| Nullification | Làm rỗng; thay giá trị hiển thị bằng `NULL` |
| Output | Dữ liệu đầu ra trả về cho người dùng hoặc ứng dụng |
| Parameter | Tham số truyền vào truy vấn (`$viewer_role`) |
| Partial Masking | Che một phần dữ liệu (giữ lại phần nhận diện) |
| Plaintext | Dữ liệu dạng văn bản rõ chưa mã hóa hoặc sau khi giải mã |
| Policy | Chính sách bảo mật hoặc che dữ liệu |
| Policy tag | Nhãn chính sách dùng để gắn data policy trong BigQuery |
| Portable | Khả năng di động, dễ chạy và sao chép của CSDL |
| Principal | Thực thể danh tính được phân quyền |
| Privilege | Đặc quyền truy cập |
| Privilege Abuse | Lạm dụng đặc quyền được cấp |
| Production | Môi trường vận hành thật |
| Pseudonymization | Giả danh hóa; thay định danh thật bằng bí danh |
| Query | Truy vấn cơ sở dữ liệu |
| Query-result layer | Tầng kết quả truy vấn (nơi DDM can thiệp) |
| Ransomware | Mã độc tống tiền (mã hóa phá hoại dữ liệu) |
| Raw | Dữ liệu hoặc tài nguyên gốc chưa che (`raw baseline`, `raw table`, `raw file`, `raw SQL`) |
| Record | Bản ghi dữ liệu |
| Redaction | Biên tập/che dữ liệu (`Data Redaction`) |
| Role | Vai trò của người dùng trong hệ thống |
| Role-aware | Nhận biết và thay đổi theo vai trò |
| Role-aware output | Kết quả đầu ra biến đổi linh hoạt theo vai trò |
| Rule | Quy tắc |
| Sandbox | Môi trường thực thi cô lập hoặc bị giới hạn |
| Scan | Quét đọc dữ liệu trong bảng dạng cột |
| Schema | Cấu trúc lược đồ bảng hoặc kết quả truy vấn |
| Security | An toàn, bảo mật |
| Server | Máy chủ hoặc tiến trình phục vụ |
| Service account | Tài khoản hệ điều hành chạy tiến trình backend |
| Session | Phiên làm việc của người dùng |
| SQL Injection | Tấn công chèn mã SQL trái phép |
| Stable hash | Giá trị băm ổn định dùng để đối chiếu/join mà không lộ dữ liệu gốc |
| Static | Tĩnh; thực hiện theo đợt trước khi sử dụng |
| Static Data Masking | Che dữ liệu tĩnh; tạo bản sao ngoài production |
| Storage | Tầng lưu trữ tệp tin CSDL |
| Substitution | Thay thế dữ liệu thật bằng dữ liệu giả hợp lệ |
| Support | Role hỗ trợ khách hàng trong demo, nhận dữ liệu che một phần |
| Table | Bảng dữ liệu |
| Tester | Role kiểm thử trong demo, nhận dữ liệu thay thế (`substitution`) |
| Token | Mã đại diện xác thực trong request |
| Trust boundary | Ranh giới tin cậy giữa các thành phần hệ thống |
| Trusted | Đáng tin cậy (`trusted backend`, `trusted policy`, `trusted context`) |
| User | Người dùng |

## 3. Cụm từ và nhãn tiếng Anh đang hiển thị

- `Access Control`
- `Accounting`
- `Application / API`
- `Audit log`
- `Auditing · Logging · DLP`
- `Authentication`
- `Authentication · MFA · Authorization · RBAC · RLS`
- `Authorization`
- `Availability`
- `Backup · Disaster Recovery`
- `BI · Stable hash`
- `Bind parameter`
- `Central governance`
- `Client boundary`
- `Confidentiality`
- `Data Masking`
- `Data Redaction`
- `Database principal`
- `DBA (Database Administrator)`
- `default-deny`
- `Defense-in-depth - DiD`
- `DuckDB + storage`
- `Dynamic Data Masking`
- `Encryption · TDE · TLS · Data Masking · Redaction`
- `EXPLAIN ANALYZE`
- `Fixed/parameterized query`
- `Full Masking`
- `Functional masking`
- `Identity → server role → bind parameter → masking policy`
- `Insider Threat`
- `Integrity`
- `Manager · Raw baseline`
- `MASKED VALUE`
- `MASKING RULE`
- `Native DDM`
- `Native enforcement`
- `Nullification`
- `Partial Masking`
- `Privilege Abuse`
- `Pseudonymization`
- `query-result layer`
- `Ransomware`
- `Raw baseline`
- `Raw SQL`
- `Role-aware output`
- `Server role`
- `SQL Injection`
- `SQL Server · Azure SQL`
- `Static Data Masking`
- `Support · Partial + full mask`
- `Tester · Substitution`
- `Trust boundary`
- `Trusted backend`

## 4. Giá trị role và ngữ cảnh môi trường xuất hiện trên slide

- `manager`: Role quản lý, baseline xem dữ liệu gốc
- `support`: Role hỗ trợ khách hàng, xem email che một phần và các trường khác bị che
- `tester`: Role kiểm thử, xem dữ liệu giả thay thế (`substitution`)
- `bi`: Role phân tích nghiệp vụ, xem giá trị băm ổn định (`stable hash`)
- `role khác` / `default-deny`: Bất kỳ role nào ngoài 4 role trên đều nhận `NULL`
- `production`: Môi trường vận hành thực tế (phân biệt với môi trường chia sẻ bản sao SDM)

## 5. SQL keywords, hàm và định danh xuất hiện trong slide

### Keywords

- `AS`
- `CASE`
- `CREATE OR REPLACE MACRO`
- `ELSE`
- `END`
- `EXPLAIN ANALYZE`
- `FROM`
- `IS`
- `MASKED WITH`
- `NULL`
- `SELECT`
- `TABLE`
- `THEN`
- `UNMASK`
- `WHEN`

### Hàm, macro, parameter và identifier

- `concat(...)`
- `hash_value(...)`
- `left(...)`
- `mask_email(...)`
- `sha256(...)`
- `split_part(...)`
- `substitute_email(...)`
- `users_for_role(...)`
- `DBMS_REDACT`
- `SYS_CONTEXT`
- `email`
- `full_name`
- `id`
- `users`
- `value`
- `viewer_role`
- `$viewer_role`

## 6. TypeScript, Node.js và HTTP identifiers xuất hiện trong slide

- `authenticate(...)`
- `'Authorization'` (HTTP header)
- `await`
- `c.req.header(...)`
- `connection.run(...)`
- `const`
- `identity`
- `identity.role`
- `if`
- `listUsers(...)`
- `page`
- `pageSize`
- `return`
- `role`
- `search`
- `unauthorized()`
- `validatedInput`
- `viewer_role`

## 7. Quy ước nên dùng thống nhất

- Giữ nguyên tên công nghệ, chữ viết tắt, SQL keywords, API/HTTP identifiers và tên role.
- Khi đã dùng thuật ngữ tiếng Anh trên slide, không đổi sang một từ tiếng Anh đồng nghĩa ở slide khác. Ví dụ: dùng thống nhất `masking`, không xen kẽ `redaction` (ngoại trừ tên tính năng `Data Redaction` của Oracle Database).
- Với thuật ngữ có bản dịch ngay trên slide, ưu tiên định dạng chuẩn: `tiếng Việt (English)`. Ví dụ: `Phòng thủ nhiều lớp (Defense-in-depth - DiD)`, `Che toàn bộ (Full Masking)`, `Che một phần (Partial Masking)`, `Làm rỗng (Nullification)`, `Giả danh hóa (Pseudonymization)`, `DBA (Database Administrator)`.
- Không dùng English cho từ phổ thông nếu bản dịch tiếng Việt ngắn và rõ (ví dụ: dùng “kết quả” thay cho `result`, “truy vấn” thay cho `query` trong văn xuôi; giữ `query` khi là từ khóa hoặc cụm kỹ thuật như `query time`, `query-result layer`, `Fixed/parameterized query`).

## 8. Các mục cần rà soát khi nội dung thay đổi

- Thêm thuật ngữ mới vào file này khi thêm hoặc sửa nội dung hiển thị trên slide.
- Không bổ sung thuật ngữ chỉ vì nó xuất hiện trong speaker notes, source code của demo hoặc tài liệu tham khảo bên ngoài.
- Rà soát các bộ chữ viết tắt: `CIA` (C/I/A), `AAA`, `DiD`, `RBAC`, `RLS`, `TDE`, `TLS`, `DLP`, `DBA`, `DDM`.
- Rà soát tên các DBMS: `DuckDB`, `SQL Server`, `Azure SQL`, `Oracle Database`, `Snowflake`, `BigQuery`.
- Rà soát danh sách 4 role trong demo: `manager`, `support`, `tester`, `bi` cùng cơ chế mặc định từ chối `default-deny` (`NULL`).
- Rà soát các định danh trong code DuckDB SQL: `mask_email`, `users_for_role`, `substitute_email`, `hash_value`, `sha256`, `users`, `full_name`, `$viewer_role`.
- Rà soát các định danh trong code backend: `authenticate`, `'Authorization'`, `unauthorized`, `validatedInput`, `listUsers`, `connection.run`.
