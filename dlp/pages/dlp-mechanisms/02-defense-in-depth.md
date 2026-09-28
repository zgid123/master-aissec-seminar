---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# DLP trong Defense-in-Depth (DiD)

<SquarePyramid
  class="did-pyramid"
  :count="5"
  :uniform-layers="true"
  :slab-height="12"
  :interactive="false"
>
  <SquarePyramidStack>
    <SquarePyramidStackTitle>
      <DiDTitleConnector :offset-y="-28" color="#ec4899">
        <strong>Dữ liệu</strong>
        <small>Phân quyền, mã hóa, DDM</small>
      </DiDTitleConnector>
    </SquarePyramidStackTitle>
    <SquarePyramidStackContent>
      <strong>DLP tại nơi lưu trữ</strong>
      <span>Quét và phân loại dữ liệu nhạy cảm.</span>
    </SquarePyramidStackContent>
  </SquarePyramidStack>
  <SquarePyramidStack>
    <SquarePyramidStackTitle>
      <DiDTitleConnector :offset-y="-14" color="#8b5cf6">
        <strong>Ứng dụng và dịch vụ</strong>
        <small>Xác thực, phân quyền</small>
      </DiDTitleConnector>
    </SquarePyramidStackTitle>
    <SquarePyramidStackContent>
      <strong>DLP trong ứng dụng</strong>
      <span>Kiểm tra dữ liệu khi chia sẻ hoặc xuất.</span>
    </SquarePyramidStackContent>
  </SquarePyramidStack>
  <SquarePyramidStack>
    <SquarePyramidStackTitle>
      <DiDTitleConnector :offset-y="0" color="#3b82f6">
        <strong>Máy chủ và endpoint</strong>
        <small>Cấu hình và cập nhật</small>
      </DiDTitleConnector>
    </SquarePyramidStackTitle>
    <SquarePyramidStackContent>
      <strong>DLP trên endpoint</strong>
      <span>Giám sát sao chép, in và upload theo policy.</span>
    </SquarePyramidStackContent>
  </SquarePyramidStack>
  <SquarePyramidStack>
    <SquarePyramidStackTitle>
      <DiDTitleConnector :offset-y="14" color="#06b6d4">
        <strong>Mạng</strong>
        <small>Firewall, phân đoạn mạng</small>
      </DiDTitleConnector>
    </SquarePyramidStackTitle>
    <SquarePyramidStackContent>
      <strong>DLP tại gateway</strong>
      <span>Kiểm tra nội dung và đích gửi.</span>
    </SquarePyramidStackContent>
  </SquarePyramidStack>
  <SquarePyramidStack :active="false">
    <SquarePyramidStackTitle>
      <DiDTitleConnector :offset-y="28" color="#14b8a6">
        <strong>Hạ tầng vật lý</strong>
        <small>Bảo vệ phòng máy</small>
      </DiDTitleConnector>
    </SquarePyramidStackTitle>
    <SquarePyramidStackContent />
  </SquarePyramidStack>
</SquarePyramid>

<div class="did-supporting">Policy, đào tạo, Audit &amp; Monitoring hỗ trợ xuyên suốt.</div>
<div class="did-takeaway">DLP bổ sung kiểm soát nội dung và cách chia sẻ dữ liệu tại nhiều lớp.</div>

<style scoped>
.did-pyramid {
  margin-top: -48px;
}

.did-pyramid :deep(.alpha-square-pyramid-stack-title__pill),
.did-pyramid :deep(.alpha-square-pyramid-stack-content) {
  padding: 8px 10px;
}

.did-pyramid :deep(.alpha-square-pyramid-stack-title__pill) {
  position: relative;
  top: var(--did-title-offset, 0px);
  white-space: normal;
}

.did-pyramid :deep(.alpha-square-pyramid-stack-title__connector) {
  position: relative;
}

.did-pyramid :deep(.alpha-square-pyramid-stack-title__line) {
  visibility: hidden;
}

.did-pyramid :deep(.alpha-square-pyramid-stack-title__pill > span),
.did-pyramid :deep(.alpha-square-pyramid-stack-content > div) {
  font-size: 16px;
  line-height: 1.2;
}

.did-pyramid :deep(.alpha-square-pyramid-stack-title__pill > span) {
  padding-right: 0;
  overflow: visible;
  text-overflow: clip;
  white-space: normal;
}

.did-pyramid :deep(.alpha-square-pyramid-stack-title__pill small) {
  display: block;
  margin-top: 4px;
  font-size: 14px;
}

.did-pyramid :deep(.alpha-square-pyramid-stack-title__pill > div) {
  display: none;
}

.did-pyramid :deep(.alpha-square-pyramid-stack-content > div) {
  display: block;
  overflow: visible;
}

.did-pyramid :deep(.alpha-square-pyramid-stack-content strong) {
  display: block;
  margin-bottom: 4px;
}

.did-pyramid :deep(.alpha-square-pyramid-stack--4 .alpha-square-pyramid-stack__right) {
  display: none;
}

.did-pyramid :deep(.alpha-square-pyramid__layer--4),
.did-pyramid :deep(.alpha-square-pyramid-stack--4 .alpha-square-pyramid-stack__left) {
  pointer-events: none;
  cursor: default;
}

.did-takeaway {
  margin-top: 6px;
  color: #0e6175;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
}

.did-supporting {
  margin-top: -38px;
  color: #64788c;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.25;
  text-align: center;
}
</style>

<!--
Defense-in-Depth (DiD) kết hợp con người, công nghệ và hoạt động vận hành để tạo nhiều lớp bảo vệ, giảm phụ thuộc vào một biện pháp duy nhất. Năm phạm vi trong hình là mô hình minh họa, không phải hệ phân loại duy nhất hoặc chuỗi kiểm tra bắt buộc. Thứ tự từ trên xuống là dữ liệu, ứng dụng và dịch vụ, máy chủ và endpoint, mạng, rồi hạ tầng vật lý. Các khối có kích thước bằng nhau thể hiện những phạm vi bảo vệ bổ trợ; vị trí trên dưới không biểu thị mức độ quan trọng hoặc thứ tự thực thi.

DLP bổ sung kiểm soát nội dung và cách chia sẻ dữ liệu tại nhiều phạm vi. Ở nơi lưu trữ, việc quét giúp phát hiện và phân loại dữ liệu nhạy cảm. Trong ứng dụng và dịch vụ, DLP có thể kiểm tra hành động chia sẻ hoặc xuất tại điểm đã tích hợp. Trên máy chủ và endpoint, DLP có thể giám sát hoặc hạn chế sao chép, in và upload theo policy đối với những thao tác được sản phẩm hỗ trợ. Ở mạng, DLP tại gateway có thể kiểm tra nội dung và đích nhận trên lưu lượng đi qua điểm kiểm soát. Hạ tầng vật lý bảo vệ phòng máy và thiết bị; hình để trống phần DLP tương ứng vì không gán chức năng DLP trực tiếp tại đây.

Các kiểm soát khác vẫn cần thiết: xác thực và phân quyền kiểm soát truy cập; mã hóa bảo vệ dữ liệu; Dynamic Data Masking (DDM) giới hạn khả năng nhìn thấy dữ liệu nhạy cảm trong kết quả truy vấn theo quyền của người dùng. DDM không thay thế mã hóa hoặc kiểm soát quyền truy cập. Policy, đào tạo, audit và monitoring hỗ trợ xuyên suốt; một kiểm soát có thể xuất hiện ở nhiều phạm vi nên các vị trí trong hình không mang tính độc quyền. Khả năng DLP phụ thuộc sản phẩm, cấu hình và đường dữ liệu đã tích hợp. Quét và phân loại không đồng nghĩa với tự động chặn mọi lần xuất dữ liệu.

Nguồn tham khảo:
- NIST — Defense-in-Depth: https://csrc.nist.gov/glossary/term/defense_in_depth
- Microsoft — Learn about data loss prevention: https://learn.microsoft.com/en-us/purview/dlp-learn-about-dlp
- Microsoft — Dynamic data masking: https://learn.microsoft.com/en-us/sql/relational-databases/security/dynamic-data-masking?view=sql-server-ver17
-->
