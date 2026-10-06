---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Điểm kiểm soát DLP trong ETL và ELT

<div class="etl-screen">
  <TableComparison class="etl-comparison" :animation="false" :dense="true" row-header-width="142px" :spacing="6">
    <TableComparisonCols corner-width="142px">
      <TableComparisonCol color="#e9f3fc" text-color="#245b8e">ETL</TableComparisonCol>
      <TableComparisonCol color="#edf8f1" text-color="#24704f">ELT</TableComparisonCol>
    </TableComparisonCols>
    <TableComparisonRows>
      <TableComparisonRow title="Điểm DLP" color="#dce9f6" text-color="#244b71">
        <TableComparisonCell align="left">Detector kiểm tra input trong staging và output đã biến đổi trước khi load.</TableComparisonCell>
        <TableComparisonCell align="left">Detector kiểm tra raw và output trung gian/cuối trong vùng đích hạn chế.</TableComparisonCell>
      </TableComparisonRow>
      <TableComparisonRow title="Gate phát hành" color="#dce9f6" text-color="#244b71">
        <TableComparisonCell align="left">Orchestrator chỉ nạp bản đã duyệt: không email, không giao dịch từng khách.</TableComparisonCell>
        <TableComparisonCell align="left">Quản lý quyền giữ raw/trung gian hạn chế; chỉ mở bản đã duyệt theo cùng điều kiện.</TableComparisonCell>
      </TableComparisonRow>
      <TableComparisonRow title="Giới hạn" color="#dce9f6" text-color="#244b71">
        <TableComparisonCell align="left">Bản raw vẫn có thể còn ở nguồn/staging; job bỏ qua gate không chịu kiểm soát.</TableComparisonCell>
        <TableComparisonCell align="left">Raw đã ở kho đích; ai có quyền đọc vùng raw vẫn thấy dữ liệu trước khi biến đổi.</TableComparisonCell>
      </TableComparisonRow>
    </TableComparisonRows>
  </TableComparison>
  <p class="etl-takeaway">Trong kiến trúc này: ETL kiểm tra trước khi nạp output; ELT kiểm tra trước khi mở quyền báo cáo.</p>
</div>

<style scoped>
.etl-screen { color: #18334f; }
.etl-comparison :deep(.alpha-table-comparison-col) { font-size: 18px !important; line-height: 1.2; }
.etl-comparison :deep(.alpha-table-comparison-row-title) { font-size: 15px !important; }
.etl-comparison :deep(.alpha-table-comparison-cell) { font-size: 16px !important; line-height: 1.28; }
.etl-takeaway { margin: 9px 0 0; color: #3f5369; font-size: 15px; line-height: 1.3; text-align: center; }
</style>

<!--
Hai cột minh họa cùng policy: báo cáo rộng không nhận email hoặc giao dịch từng khách hàng; chỉ output đã đạt policy mới được mở cho audience đó. Đây là cách tích hợp tham khảo, không phải thuộc tính mặc định của ETL hay ELT; thời điểm kiểm tra phụ thuộc kiến trúc.

[click]
### ETL — inspection trước khi load

**Bối cảnh và vấn đề.** Job lấy column / field email cùng lịch sử giao dịch từ nguồn để tạo tập phân tích. Email không cần cho mục đích báo cáo và không nên đi vào output rộng hơn.

**Điểm tích hợp và input.** Job ETL đọc dữ liệu nguồn vào vùng staging được bảo vệ, rồi detector/quy tắc policy kiểm tra bản ghi và column / field trước khi output được load. Nội dung, schema và metadata nguồn là input; nếu cần quét file phức tạp, detector cần parser phù hợp.

**Policy và enforcement.** Policy minh họa không cho báo cáo rộng chứa email hoặc giao dịch theo từng khách hàng. Job tạo output phù hợp mục đích; detector kiểm tra phiên bản output, còn policy xét field và audience. Orchestrator chỉ load đúng phiên bản đạt yêu cầu; finding đơn thuần không giữ được output nếu job vẫn tiếp tục load. Bỏ email không tự chứng minh rằng output đạt policy.

**Kết quả minh họa và giới hạn.** Bảng giao dịch raw có thể vẫn tồn tại ở nguồn hoặc staging; ETL không bảo đảm xóa mọi bản raw. Chỉ bản output đúng phiên bản đã kiểm tra được phép publish. Nếu job tạo lại output sau inspection, phiên bản mới cần được đánh giá lại.

### ELT — bảo vệ raw và khóa quyền đọc

**Bối cảnh và vấn đề.** Raw chứa email và giao dịch đã ở vùng đích. Nếu quyền đọc mở trước khi kiểm tra, người ngoài audience có thể xem dữ liệu này.

**Điểm tích hợp và input.** Ingestion ghi raw vào khu vực đích hạn chế. Detector/policy tích hợp với engine xử lý hoặc workflow trong môi trường này kiểm tra nội dung raw và output sau biến đổi, cùng label và metadata có sẵn.

**Policy và enforcement.** Detector và policy đánh giá output trong vùng đích theo nội dung, phiên bản và audience báo cáo. Nếu còn email hoặc giao dịch theo từng khách hàng, access control giữ output trong vùng hạn chế; chỉ thành phần có thẩm quyền mới cấp quyền rộng sau khi đúng phiên bản đạt yêu cầu. Bỏ email một mình chưa đủ để chứng minh điều đó.

**Kết quả minh họa và giới hạn.** Job tạo output báo cáo đã bỏ email và gộp giao dịch; access control chỉ mở audience rộng khi đúng phiên bản đạt policy. Raw data tiếp tục ở vùng hạn chế. ELT không tự đồng nghĩa với quyền raw không kiểm soát; ETL cũng không tự đồng nghĩa DLP đồng bộ. Thời điểm inspection và thứ tự transform là hai lựa chọn riêng. Tích hợp sai phiên bản hoặc nhánh publish bỏ qua access control sẽ làm mất hiệu lực quyết định.

### Nguồn tham khảo

- [AWS — ETL and ELT in the Database Migration Guide](https://docs.aws.amazon.com/dms/latest/sbs/chap-oracle-postgresql.migration-process.script-conversion.html): mô tả thứ tự extract/transform/load và vị trí staging của raw data trong ELT.
- [AWS Glue — Concepts](https://docs.aws.amazon.com/glue/latest/dg/components-key-concepts.html): ví dụ job lấy dữ liệu, biến đổi rồi ghi vào đích.
- [AWS Glue — Evaluating data quality for ETL jobs](https://docs.aws.amazon.com/glue/latest/dg/tutorial-data-quality.html): ví dụ job có thể đánh giá dữ liệu và được cấu hình để dừng trước khi ghi target; đây là kiểm tra chất lượng của AWS Glue, không phải DLP.
-->
