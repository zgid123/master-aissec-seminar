---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Các cơ chế bảo vệ dữ liệu trong DBMS

<div class="dbms-cards">
  <article class="dbms-card dbms-card--access">
    <div class="dbms-kicker">KIỂM SOÁT TRUY CẬP</div>
    <h2>Permissions, views và Row-Level Security</h2>
    <p>Quyền giới hạn thao tác; view và RLS giới hạn hàng hoặc cột hiển thị.</p>
    <div class="dbms-benefit">Ví dụ: analyst chỉ xem đơn hàng thuộc khu vực phụ trách.</div>
    <div class="dbms-limit">Cần cấu hình quyền và điều kiện lọc phù hợp.</div>
  </article>

  <article class="dbms-card dbms-card--mask">
    <div class="dbms-kicker">GIẢM LỘ TRONG KẾT QUẢ</div>
    <h2>Dynamic Data Masking</h2>
    <p>Masking che một phần giá trị trong kết quả; dữ liệu lưu không đổi.</p>
    <div class="dbms-benefit">Ví dụ: analyst chỉ thấy một phần địa chỉ email.</div>
    <div class="dbms-limit">Không thay thế phân quyền; truy vấn rộng vẫn có rủi ro suy luận.</div>
  </article>

  <article class="dbms-card dbms-card--audit">
    <div class="dbms-kicker">GHI NHẬN HOẠT ĐỘNG</div>
    <h2>SQL Server Audit</h2>
    <p>Ghi các sự kiện máy chủ hoặc cơ sở dữ liệu đã chọn.</p>
    <div class="dbms-benefit">Hỗ trợ tra cứu ai làm gì và vào thời điểm nào.</div>
    <div class="dbms-limit">Audit hỗ trợ điều tra; không tự chặn thao tác.</div>
  </article>
</div>

<div class="dbms-connection">Bảo vệ trong DBMS không bao phủ mọi đường chia sẻ sau khi truy vấn.</div>

<style scoped>
.dbms-intro { margin: 5px 0 13px; color: #415a72; font-size: 15px; font-weight: 700; line-height: 1.3; text-align: center; }
.dbms-cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 15px; }
.dbms-card { min-height: 306px; padding: 17px 16px 15px; border: 1px solid; border-radius: 13px; display: flex; flex-direction: column; color: #18334f; }
.dbms-card--access { background: #effbfc; border-color: #a7e3e8; }
.dbms-card--mask { background: #fffbeb; border-color: #f2ca72; }
.dbms-card--audit { background: #f6f3ff; border-color: #d8c9f5; }
.dbms-kicker { font-size: 11px; font-weight: 800; letter-spacing: .055em; line-height: 1.25; color: #526b82; }
.dbms-card--access .dbms-kicker { color: #0e7490; }
.dbms-card--mask .dbms-kicker { color: #a16207; }
.dbms-card--audit .dbms-kicker { color: #7651a8; }
.dbms-card h2 { margin: 12px 0 10px; color: #142d49; font-size: 20px; font-weight: 750; line-height: 1.16; }
.dbms-card p { margin: 0; font-size: 14px; line-height: 1.38; }
.dbms-benefit { margin-top: 12px; padding-top: 10px; border-top: 1px solid #d8e2eb; color: #334b63; font-size: 13px; line-height: 1.35; }
.dbms-limit { margin-top: auto; padding-top: 11px; color: #52677b; font-size: 12px; font-weight: 600; line-height: 1.35; }
.dbms-connection { width: calc(100% - 150px); margin: 14px auto 0; padding: 10px 13px; border-left: 4px solid #0ea5e9; border-radius: 5px; background: #f0f9ff; color: #1c5068; font-size: 13px; font-weight: 650; line-height: 1.3; text-align: center; }
</style>

<!--
DBMS (Database Management System, hệ quản trị cơ sở dữ liệu) trong slide này được minh họa bằng Microsoft SQL Server, là ví dụ triển khai được chọn cho seminar. Ba cơ chế giải quyết những vấn đề khác nhau trong phạm vi cơ sở dữ liệu: access control (kiểm soát truy cập) xác định ai được phép thực hiện thao tác nào trên đối tượng dữ liệu; masking giới hạn cách một số giá trị hiển thị trong kết quả; audit ghi sự kiện đã chọn để hỗ trợ điều tra và giám sát. Cùng có mặt trong một DBMS không khiến các cơ chế này trở thành một hệ thống DLP hoàn chỉnh.

**Access control.** Quyền đối tượng như `SELECT`, `INSERT`, `UPDATE` và `DELETE` giới hạn thao tác trên bảng hoặc view; SQL Server cũng hỗ trợ cấp một số quyền ở mức cột. View có thể giới hạn tập hàng hoặc cột được trình bày nếu người dùng chỉ được cấp quyền trên view thay vì bảng gốc. Row-Level Security (RLS, bảo mật mức hàng) là tính năng gốc của SQL Server từ phiên bản 2016. Predicate trong security policy xác định hàng nào người dùng có thể đọc; filter predicate cũng ảnh hưởng đến một số thao tác `UPDATE` và `DELETE`, còn block predicate có thể từ chối thao tác ghi vi phạm điều kiện. Ví dụ, predicate theo khu vực phụ trách lọc bảng đơn hàng để analyst chỉ thấy các đơn được gán. RLS áp dụng logic ở cơ sở dữ liệu cho truy vấn đi qua bảng được bảo vệ, nhưng cần kiểm thử policy, quyền sở hữu, tài khoản đặc quyền và ảnh hưởng hiệu năng. Phạm vi còn tùy quyền và predicate đã cấu hình.

**Dynamic Data Masking (DDM).** Đây là tính năng gốc của SQL Server từ phiên bản 2016. Quản trị viên gắn hàm masking lên cột, chẳng hạn email; người có quyền truy vấn nhưng không có `UNMASK` nhận giá trị đã mask trong kết quả, còn dữ liệu lưu bên dưới không đổi. Ví dụ, `an.nguyen@example.test` có thể hiện một phần tên hoặc miền theo hàm masking đã cấu hình. DDM giảm việc nhìn thấy toàn bộ giá trị trong một số truy vấn ứng dụng thông thường nhưng không thay thế access control: người có quyền đặc biệt có thể xem dữ liệu không mask, còn người chạy truy vấn tùy ý có thể suy luận giá trị. Vì vậy cần kết hợp masking với quyền tối thiểu và audit.

**SQL Server Audit.** Đây là khả năng có sẵn của Database Engine, cho phép cấu hình nhóm sự kiện hoặc thao tác ở mức máy chủ và database rồi ghi vào tệp audit hoặc Windows Event Log. Ví dụ, quản trị viên có thể chọn ghi hoạt động truy vấn bảng khách hàng cùng thay đổi quyền trên bảng; người phụ trách tra lại tài khoản, loại thao tác và thời điểm có trong sự kiện. Audit hỗ trợ giám sát và điều tra nhưng không chặn truy vấn, không chứng minh classification đúng và chỉ ghi sự kiện đã cấu hình. Cần giới hạn quyền sửa cấu hình và bảo vệ nơi lưu audit log; tài khoản đặc quyền có thể làm thay đổi cấu hình. Tài liệu SQL Server nêu audit cấp máy chủ được hỗ trợ ở mọi phiên bản; audit cấp database được hỗ trợ ở mọi edition từ SQL Server 2016 SP1.

Các tính năng được mô tả là tính năng gốc của SQL Server, không cần extension bên thứ ba; chúng vẫn cần được bật, cấu hình và kiểm thử trên các đường truy cập cần bảo vệ. Đây là các kiểm soát trong phạm vi DBMS, không phải một hệ DLP hoàn chỉnh. Sau khi dữ liệu được truy vấn, chia sẻ hoặc export qua ứng dụng khác, cần policy và điểm enforcement tương ứng; các tính năng database này không kiểm soát tự động mọi bản sao downstream. Ví dụ về bảng đơn hàng, khu vực và email là tình huống minh họa, không phải thay đổi trong demo.

Nguồn chính thức: [Microsoft Learn — permissions (Database Engine)](https://learn.microsoft.com/en-us/sql/relational-databases/security/permissions-database-engine?view=sql-server-ver17); [Row-Level Security](https://learn.microsoft.com/en-us/sql/relational-databases/security/row-level-security?view=sql-server-ver17); [Dynamic Data Masking](https://learn.microsoft.com/en-us/sql/relational-databases/security/dynamic-data-masking?view=sql-server-ver17); [SQL Server Audit (Database Engine)](https://learn.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-database-engine?view=sql-server-ver17).
-->
