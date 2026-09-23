---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Giới hạn khi tự triển khai DDM

<QuadHub class="h-[380px] overflow-hidden" v-click="1">
  <QuadHubCallout color="#e9717a" icon="i-lucide-shield-off">
    <QuadHubHeading>Policy không chuyên biệt</QuadHubHeading>
    <QuadHubContent>Macro và view không có vòng đời, privilege hoặc catalog riêng cho DDM.</QuadHubContent>
  </QuadHubCallout>
  <QuadHubCallout color="#f29e4b" icon="i-lucide-user-cog">
    <QuadHubHeading>Identity ở application</QuadHubHeading>
    <QuadHubContent>Backend tự xác thực identity, ánh xạ role và bind context vào query.</QuadHubContent>
  </QuadHubCallout>
  <QuadHubCallout color="#a4cb81" icon="i-lucide-git-compare-arrows">
    <QuadHubHeading>Coverage thủ công</QuadHubHeading>
    <QuadHubContent>Đổi policy phải tự sửa, test và kiểm tra mọi query hoặc export path.</QuadHubContent>
  </QuadHubCallout>
  <QuadHubCallout color="#62b6a8" icon="i-lucide-route-off">
    <QuadHubHeading>Access path có thể bypass</QuadHubHeading>
    <QuadHubContent>Raw table, file DuckDB hoặc arbitrary SQL có thể bỏ qua policy.</QuadHubContent>
  </QuadHubCallout>
</QuadHub>

<!--
Phần trước đã chứng minh chúng ta có thể tự triển khai DDM trên DuckDB để tạo kết quả khác nhau theo vai trò. Vì vậy, việc DuckDB không có DDM tích hợp sẵn không phải là giới hạn về khả năng che dữ liệu. Các giới hạn trên slide này xuất hiện khi đội ngũ phải tự xây dựng, quản lý và bảo đảm thực thi policy DDM.

[CLICK] QuadHub cho thấy bốn giới hạn chính của việc tự triển khai DDM.

Thứ nhất, masking policy không phải một security object chuyên biệt. Macro và view là SQL object thông thường; team không có sẵn policy lifecycle, privilege kiểu `UNMASK` hoặc catalog DDM để kiểm kê toàn bộ cột đang được bảo vệ.

Thứ hai, end-user identity không được DuckDB tự ánh xạ thành masking privilege. Backend phải xác thực identity, lấy role từ nguồn đáng tin cậy và bind context đúng vào query. Một lỗi ở application có thể chọn sai policy.

Thứ ba, khi đổi format hiển thị, team tự sửa macro hoặc view, regression test mọi role và deploy migration. Việc này khá dễ nếu policy tập trung trong một macro, nhưng khó kiểm chứng nếu expression bị lặp trong API query, view hoặc export job.

Thứ tư, application và hệ điều hành phải giữ toàn bộ access path. Người có thể đọc raw table, mở file DuckDB hoặc chạy arbitrary SQL có thể bypass masking. Macro tự nó không tạo security boundary.

Kết luận triển khai: DDM tự xây dựng phù hợp khi một ứng dụng đáng tin cậy kiểm soát toàn bộ danh tính, truy vấn và tệp dữ liệu gốc. Khi nhiều người dùng, công cụ BI hoặc ứng dụng cùng truy cập, việc quản lý và bảo đảm thực thi trở nên khó hơn; policy DDM tích hợp sẵn trong hệ quản trị cơ sở dữ liệu thường phù hợp hơn.

[Sources]
- https://duckdb.org/docs/current/operations_manual/securing_duckdb/overview
[/Sources]
-->
