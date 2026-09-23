---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Kết luận

DDM che dữ liệu ở query output để giảm phơi lộ - không thay thế các lớp bảo mật khác:

<v-clicks>

- **DDM là output control, không phải access control** - Dữ liệu gốc vẫn còn trong database; DDM chỉ thay giá trị ở kết quả truy vấn theo context của người dùng.

- **DuckDB có thể triển khai DDM qua macro và view** - Phù hợp khi một trusted application kiểm soát toàn bộ identity, query path và raw file, không cần native DDM.

- **Native DDM phù hợp hơn khi nhiều principal cùng truy cập** - Policy sống gần dữ liệu, được quản lý tập trung và lan truyền ngay khi thay đổi, không cần sửa application.

- **DDM có giới hạn cố hữu** - Inference qua predicate, quyền cao, raw file, backup và export vẫn có thể lộ dữ liệu gốc; mỗi đường cần control riêng.

- **DDM thuộc lớp Query Output trong Defense-in-Depth** - Bộ đầy đủ gồm: least privilege, DDM, TLS/TDE, audit và SDM/tokenization cho non-production.

</v-clicks>

<style scoped>
ul {
  list-style-type: disc;
  padding-left: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
</style>

<!--
Đây là slide kết luận của toàn bộ seminar. Mục tiêu là để khán giả ra về với năm điểm cốt lõi về DDM.

[CLICK] DDM hoạt động ở lớp query output, không phải lớp access control. Khi user submit query, engine áp dụng masking rule và trả về kết quả đã được che; dữ liệu gốc trong database không bị thay đổi. Vì vậy, DDM không thể thay thế việc kiểm soát quyền truy cập.

[CLICK] DuckDB không có native DDM nhưng macro và view đủ để triển khai. Điều kiện cần là một trusted application kiểm soát toàn bộ identity của user, câu query được chạy và file dữ liệu gốc. Khi ba yếu tố này đều nằm trong tay application, tự triển khai là đủ.

[CLICK] Khi môi trường có nhiều database user, BI tool hoặc service cùng truy cập, native DDM của SQL Server, Oracle, Snowflake hoặc BigQuery phù hợp hơn. Policy gắn trực tiếp vào column trong database, không phụ thuộc application và được lan truyền ngay khi thay đổi.

[CLICK] DDM có giới hạn cố hữu xuất phát từ cách nó hoạt động. Người dùng có thể suy diễn giá trị gốc qua predicate. Tài khoản quyền cao hoặc access path trực tiếp vào raw file hoặc backup đều bỏ qua masking hoàn toàn. Mỗi con đường này cần control riêng.

[CLICK] Nhìn lại toàn bộ: DDM là một lớp trong Defense-in-Depth, đúng ở vị trí Query Output. Bộ control đầy đủ cần có thêm least privilege, TLS và TDE cho encryption, audit log để phát hiện lạm dụng, và SDM hoặc tokenization cho môi trường non-production.
-->
