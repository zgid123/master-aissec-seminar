---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

<script setup>
import { useSlideContext } from '@slidev/client'

const { $clicks: slideClicks } = useSlideContext()
</script>

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
      <span>Kiểm tra dữ liệu khi chia sẻ hoặc export.</span>
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

<div class="did-takeaway" :class="{ 'did-takeaway--ready': slideClicks > 0 }">DLP bổ sung kiểm soát nội dung và cách chia sẻ dữ liệu tại nhiều lớp.</div>

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
  margin-top: -30px;
  color: #0e6175;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  opacity: 0;
  visibility: hidden;
}

.did-takeaway--ready {
  /* 500ms heading shift + 2360ms for the final pyramid title to finish. */
  animation: did-takeaway-reveal 200ms ease 2860ms both;
}

@keyframes did-takeaway-reveal {
  from {
    opacity: 0;
    visibility: hidden;
  }
  to {
    opacity: 1;
    visibility: visible;
  }
}
</style>

<!--
### Khái niệm và ý nghĩa

Defense-in-Depth (DiD, phòng thủ nhiều lớp) kết hợp con người, công nghệ và vận hành để giảm phụ thuộc vào một biện pháp duy nhất. Hình minh họa các phạm vi bảo vệ bổ trợ và vị trí tích hợp DLP.

[click]
### Cách diễn giải hình

Năm phạm vi trong hình là mô hình minh họa, không phải hệ phân loại duy nhất hoặc chuỗi kiểm tra bắt buộc. Endpoint là thiết bị đầu cuối nơi người dùng thao tác; gateway là cổng kiểm soát mà lưu lượng đi qua. Thứ tự từ trên xuống là dữ liệu, ứng dụng và dịch vụ, máy chủ và endpoint, mạng, rồi hạ tầng vật lý. Các khối có kích thước bằng nhau thể hiện những phạm vi bảo vệ bổ trợ; vị trí trên dưới không biểu thị mức độ quan trọng hoặc thứ tự enforcement.

DLP bổ sung kiểm soát nội dung và cách chia sẻ dữ liệu tại nhiều phạm vi. Ở nơi lưu trữ, việc quét giúp phát hiện và phân loại dữ liệu nhạy cảm. Trong ứng dụng và dịch vụ, DLP có thể kiểm tra hành động chia sẻ hoặc export tại điểm đã tích hợp. Trên máy chủ và endpoint, DLP có thể giám sát hoặc hạn chế sao chép, in và upload theo policy đối với những thao tác được sản phẩm hỗ trợ. Ở mạng, DLP tại gateway có thể kiểm tra nội dung và đích nhận trên lưu lượng đi qua điểm kiểm soát. Hạ tầng vật lý bảo vệ phòng máy và thiết bị; hình để trống phần DLP tương ứng vì không gán chức năng DLP trực tiếp tại đây.

Trạng thái dữ liệu mô tả dữ liệu đang được lưu trữ, sử dụng hay truyền đi. Endpoint, network và cloud mô tả môi trường hoặc vị trí triển khai kiểm soát. Hai cách nhìn bổ trợ nhau, không có quan hệ một-một. Một kiểm soát trên endpoint được quản lý có thể hỗ trợ các hoạt động được sản phẩm tích hợp, gồm quét tệp lưu trữ và những thao tác như sao chép, in hoặc upload; phạm vi endpoint không chỉ là dữ liệu đang được sử dụng. Network control point có thể kiểm tra lưu lượng đi qua nó. Tích hợp cloud có thể xử lý nội dung và hoạt động mà dịch vụ hỗ trợ. Những vị trí này không loại trừ lẫn nhau và không tạo thành kiến trúc đầy đủ; phạm vi thực tế tùy sản phẩm, cấu hình và đường dữ liệu tích hợp.

Các kiểm soát khác vẫn cần thiết: xác thực và phân quyền kiểm soát truy cập; mã hóa bảo vệ dữ liệu; masking là nhóm kỹ thuật che hoặc biến đổi dữ liệu, với tác động tùy cơ chế. Trong SQL Server, Dynamic Data Masking (DDM) che giá trị trong kết quả query đối với người dùng không có quyền xem dữ liệu đầy đủ, trong khi dữ liệu lưu trữ vẫn giữ nguyên. DDM không thay thế mã hóa hoặc kiểm soát quyền truy cập. Audit là ghi nhận event để hỗ trợ giám sát và điều tra. Policy, đào tạo, audit và giám sát hỗ trợ xuyên suốt. Kiểm soát truy cập không phải lúc nào cũng chỉ xác minh quyền đọc: một số mô hình còn giới hạn luồng thông tin giữa các đối tượng hoặc đích. Quyền đọc không tự cho phép chia sẻ tới mọi đích; người được đọc dữ liệu để phân tích vẫn phải tuân theo policy khi chia sẻ. Một kiểm soát có thể xuất hiện ở nhiều phạm vi nên các vị trí trong hình không mang tính độc quyền. Khả năng DLP phụ thuộc sản phẩm, cấu hình và đường dữ liệu đã tích hợp. Quét và classification không đồng nghĩa với enforcement trên mọi lần export dữ liệu.

Nguồn tham khảo:
- NIST — Defense-in-Depth: https://csrc.nist.gov/glossary/term/defense_in_depth
- NIST — Access Control AC-4, Information Flow Enforcement: https://csrc.nist.gov/projects/risk-management/about-rmf/assess-step/assessment-cases-download-page
- Microsoft — Learn about data loss prevention: https://learn.microsoft.com/en-us/purview/dlp-learn-about-dlp
- Microsoft — Dynamic data masking: https://learn.microsoft.com/en-us/sql/relational-databases/security/dynamic-data-masking?view=sql-server-ver17
-->
