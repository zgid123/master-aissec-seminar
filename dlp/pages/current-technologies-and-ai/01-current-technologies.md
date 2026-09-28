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
      <TableComparisonCell align="left"><strong>Phát hiện dữ liệu nhạy cảm</strong>; tạo kết quả phát hiện (findings).</TableComparisonCell>
      <TableComparisonCell align="left"><strong>Thông báo policy, cảnh báo</strong>; hạn chế truy cập (preview).</TableComparisonCell>
      <TableComparisonCell align="left"><strong>Kiểm tra dữ liệu nhạy cảm</strong>; khử định danh.</TableComparisonCell>
    </TableComparisonRow>
    <TableComparisonRow title="Ranh giới kiểm soát">
      <TableComparisonCell align="left">Findings cần gắn với quy trình xử lý hoặc biện pháp thực thi.</TableComparisonCell>
      <TableComparisonCell align="left">Hạn chế truy cập vào mục; không bao phủ mọi đường xuất.</TableComparisonCell>
      <TableComparisonCell align="left">Kiểm tra và khử định danh cần tích hợp vào luồng dữ liệu.</TableComparisonCell>
    </TableComparisonRow>
  </TableComparisonRows>
</TableComparison>

<p class="comparison-sources">Nguồn: <a href="https://docs.aws.amazon.com/macie/latest/user/data-classification.html">AWS</a> · <a href="https://learn.microsoft.com/en-us/purview/dlp-powerbi-get-started">Microsoft Learn</a> · <a href="https://docs.cloud.google.com/sensitive-data-protection/docs/sensitive-data-protection-overview">Google Cloud</a></p>
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
.comparison-sources { margin: 10px 0 0; color: #64788c; font-size: 11px; line-height: 1.25; text-align: center; }
.comparison-sources a { color: #42647f; text-decoration: underline; text-decoration-color: #b8c6d3; text-underline-offset: 2px; }
.comparison-takeaway { margin: 7px 0 0; color: #0e6175; font-size: 15px; font-weight: 700; line-height: 1.25; text-align: center; }
</style>

<!--
Bảng chọn các khả năng liên quan đến Big Data, không mô tả toàn bộ tính năng của từng sản phẩm. Amazon Macie hỗ trợ phát hiện dữ liệu nhạy cảm trong các đối tượng S3 được hỗ trợ và tạo findings để phục vụ xử lý tiếp. Findings có thể được tích hợp với quy trình phản ứng; bản thân việc phát hiện không đồng nghĩa với kiểm soát mọi lần xuất.

Microsoft Purview DLP trong Fabric và Power BI áp dụng các hành động theo policy trong phạm vi loại mục và dữ liệu được hỗ trợ. Hạn chế truy cập vào một mục khác với kiểm tra mọi đường xuất dữ liệu. Trạng thái phát hành và giới hạn cần được đối chiếu với tài liệu chính thức tại thời điểm sử dụng.

Google Cloud Sensitive Data Protection hỗ trợ kiểm tra và khử định danh dữ liệu trong các luồng được hỗ trợ. Kiểm tra và khử định danh là các thao tác riêng; không nên hiểu rằng mỗi lần quét đều tự động tạo bản đã khử định danh hoặc ngăn xuất. Việc lựa chọn giải pháp cần dựa trên nơi dữ liệu tồn tại, khả năng cần thiết và điểm tích hợp thực thi.

Nguồn chính thức, đối chiếu ngày 2026-09-28: [AWS Macie — khám phá dữ liệu](https://docs.aws.amazon.com/macie/latest/user/data-classification.html); [AWS Macie — loại findings](https://docs.aws.amazon.com/macie/latest/user/findings-types.html); [Microsoft Purview DLP cho Fabric và Power BI](https://learn.microsoft.com/en-us/purview/dlp-powerbi-get-started); [Google Cloud Sensitive Data Protection — tổng quan](https://docs.cloud.google.com/sensitive-data-protection/docs/sensitive-data-protection-overview); [Google Cloud — khử định danh dữ liệu nhạy cảm](https://docs.cloud.google.com/sensitive-data-protection/docs/deidentify-sensitive-data).
-->
