---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Giải pháp DLP cho Big Data

<p class="comparison-intro">Phân quyền, masking và audit là nền tảng; DLP bổ sung kiểm soát dữ liệu nhạy cảm.</p>

<TableComparison class="product-comparison" :animation="false" :dense="true" row-header-width="120px" :spacing="6">
  <TableComparisonCols corner-width="120px">
    <TableComparisonCol color="#fffbeb" text-color="#92400e">
      <span class="product-name">Amazon Macie</span>
      <small class="product-scope">Amazon S3</small>
    </TableComparisonCol>
    <TableComparisonCol color="#ecfeff" text-color="#0e6175">
      <span class="product-name">Microsoft Purview DLP</span>
      <small class="product-scope">Fabric / Power BI</small>
    </TableComparisonCol>
    <TableComparisonCol color="#f5f3ff" text-color="#5b3aa2">
      <span class="product-name">Sensitive Data Protection</span>
      <small class="product-scope">Google Cloud</small>
    </TableComparisonCol>
  </TableComparisonCols>
  <TableComparisonRows>
    <TableComparisonRow title="Phạm vi">
      <TableComparisonCell align="left">Đối tượng S3 được hỗ trợ.</TableComparisonCell>
      <TableComparisonCell align="left">Các loại mục và dữ liệu được hỗ trợ trong Fabric / Power BI.</TableComparisonCell>
      <TableComparisonCell align="left">BigQuery, Cloud Storage và dữ liệu gửi qua API.</TableComparisonCell>
    </TableComparisonRow>
    <TableComparisonRow title="Khả năng chính">
      <TableComparisonCell align="left"><strong>Khám phá dữ liệu nhạy cảm</strong>; tạo findings.</TableComparisonCell>
      <TableComparisonCell align="left"><strong>Policy tips, cảnh báo</strong>; hạn chế truy cập (preview).</TableComparisonCell>
      <TableComparisonCell align="left"><strong>Kiểm tra dữ liệu nhạy cảm</strong>; khử định danh.</TableComparisonCell>
    </TableComparisonRow>
    <TableComparisonRow title="Ranh giới kiểm soát">
      <TableComparisonCell align="left">Findings cần gắn với quy trình xử lý hoặc biện pháp thực thi.</TableComparisonCell>
      <TableComparisonCell align="left">Hạn chế truy cập vào mục; không bao phủ mọi đường xuất.</TableComparisonCell>
      <TableComparisonCell align="left">Kiểm tra và khử định danh cần tích hợp vào luồng dữ liệu.</TableComparisonCell>
    </TableComparisonRow>
  </TableComparisonRows>
</TableComparison>

<p class="comparison-takeaway">Phát hiện, khử định danh và hạn chế truy cập là các khả năng khác nhau.</p>

<style scoped>
.comparison-intro { margin: 5px 0 15px; padding: 9px 12px; border-left: 3px solid #0ea5e9; border-radius: 5px; background: #f0f9ff; color: #18334f; font-size: 14px; line-height: 1.3; }
:deep(.product-comparison.alpha-table-comparison) { margin: 0; }
:deep(.product-comparison .alpha-table-comparison-col) { padding: 11px 13px; text-align: left !important; text-transform: none; letter-spacing: normal; border: 1px solid #dce5ee !important; }
:deep(.product-comparison .product-name) { display: block; font-size: 15px; line-height: 1.15; }
:deep(.product-comparison .product-scope) { display: block; margin-top: 5px; font-size: 11px; font-weight: 600; line-height: 1.15; }
:deep(.product-comparison .alpha-table-comparison-row-title) { padding: 11px 9px; background: #e8eef5 !important; color: #18334f !important; text-align: left !important; text-transform: none; letter-spacing: normal; font-size: 12px !important; line-height: 1.25; border: 1px solid #dce5ee !important; }
:deep(.product-comparison .alpha-table-comparison-cell) { padding: 12px 13px; background: #f8fafc !important; color: #243c54 !important; text-align: left !important; font-size: 13px !important; font-weight: 400; line-height: 1.35; border: 1px solid #e0e7ef !important; }
:deep(.product-comparison .alpha-table-comparison-cell strong) { font-weight: 700; }
.comparison-takeaway { margin: 14px 0 0; color: #0e6175; font-size: 15px; font-weight: 700; line-height: 1.25; text-align: center; }
</style>

<!--
- Ba dịch vụ minh họa những khả năng khác nhau liên quan đến DLP trong Big Data; bảng chỉ chọn các khả năng liên quan đến seminar, không liệt kê đầy đủ sản phẩm. Đây là dịch vụ cloud, không phải tính năng có sẵn trong mọi DBMS.
- Macie tập trung khám phá dữ liệu nhạy cảm trong S3 và tạo findings để xử lý tiếp. Phạm vi quét phụ thuộc storage class, định dạng và quyền truy cập; findings có thể nối với quy trình khắc phục tự động, nhưng bản thân phát hiện không chặn mọi lần xuất.
- Purview DLP trong Fabric / Power BI áp dụng hành động theo policy, gồm policy tips, cảnh báo và hạn chế truy cập (preview) trong phạm vi mục được hỗ trợ. Hạn chế truy cập vào mục khác với kiểm tra hoặc chặn mọi đường xuất. Phạm vi còn phụ thuộc loại mục, bảng Delta, định dạng, cấu hình và giấy phép.
- Sensitive Data Protection hỗ trợ kiểm tra và khử định danh. Đây là hai thao tác riêng; cần cấu hình thao tác phù hợp trong luồng dữ liệu. Khử định danh không bảo đảm ẩn danh không thể đảo ngược.
- Phạm vi hỗ trợ của mỗi dịch vụ phụ thuộc loại dữ liệu, định dạng, cấu hình và giới hạn sản phẩm. Không nên đánh đồng phát hiện dữ liệu với chặn mọi đường xuất. Các kiểm soát DBMS và dịch vụ DLP cần phối hợp theo kiến trúc triển khai.

Tài liệu chính thức, kiểm tra ngày 2026-09-27:
- AWS Macie — khám phá dữ liệu: https://docs.aws.amazon.com/macie/latest/user/data-classification.html
- AWS Macie — loại findings: https://docs.aws.amazon.com/macie/latest/user/findings-types.html
- Microsoft Purview DLP trong Fabric / Power BI: https://learn.microsoft.com/en-us/purview/dlp-powerbi-get-started
- Google Cloud Sensitive Data Protection — tổng quan: https://docs.cloud.google.com/sensitive-data-protection/docs/sensitive-data-protection-overview
- Google Cloud Sensitive Data Protection — khử định danh: https://docs.cloud.google.com/sensitive-data-protection/docs/deidentify-sensitive-data

Chuyển ý: AI có thể hỗ trợ bước phát hiện khi quy tắc đơn giản khó nhận ra nội dung.
-->
