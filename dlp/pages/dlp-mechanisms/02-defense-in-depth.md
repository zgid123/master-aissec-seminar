---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# DLP trong Defense-in-Depth (DiD)

<CircularPyramid
  class="did-pyramid"
  :count="5"
  :interactive="false"
>
  <CircularPyramidStack step="01" :active="false">
    <CircularPyramidStackTitle>
      <DiDTitleConnector :offset-y="-12" color="#3b82f6">
        <strong>Hạ tầng vật lý</strong>
        <small>Bảo vệ phòng máy</small>
      </DiDTitleConnector>
    </CircularPyramidStackTitle>
    <CircularPyramidStackContent />
  </CircularPyramidStack>
  <CircularPyramidStack step="02">
    <CircularPyramidStackTitle>
      <DiDTitleConnector :offset-y="-6" color="#6366f1">
        <strong>Mạng</strong>
        <small>Firewall, phân đoạn mạng</small>
      </DiDTitleConnector>
    </CircularPyramidStackTitle>
    <CircularPyramidStackContent>
      <strong>DLP tại gateway</strong>
      <br />
      <span>Kiểm tra nội dung và đích gửi.</span>
    </CircularPyramidStackContent>
  </CircularPyramidStack>
  <CircularPyramidStack step="03">
    <CircularPyramidStackTitle>
      <DiDTitleConnector :offset-y="0" color="#10b981">
        <strong>Máy chủ và endpoint</strong>
        <small>Cấu hình và cập nhật</small>
      </DiDTitleConnector>
    </CircularPyramidStackTitle>
    <CircularPyramidStackContent>
      <strong>DLP trên endpoint</strong>
      <span>Giám sát sao chép, in và upload theo policy.</span>
    </CircularPyramidStackContent>
  </CircularPyramidStack>
  <CircularPyramidStack step="04">
    <CircularPyramidStackTitle>
      <DiDTitleConnector :offset-y="4" color="#f59e0b">
        <strong>Ứng dụng và dịch vụ</strong>
        <small>Xác thực, phân quyền</small>
      </DiDTitleConnector>
    </CircularPyramidStackTitle>
    <CircularPyramidStackContent>
      <strong>DLP trong ứng dụng</strong>
      <br />
      <span>Kiểm tra dữ liệu khi chia sẻ hoặc xuất.</span>
    </CircularPyramidStackContent>
  </CircularPyramidStack>
  <CircularPyramidStack step="05">
    <CircularPyramidStackTitle>
      <DiDTitleConnector :offset-y="5" color="#ec4899">
        <strong>Dữ liệu</strong>
        <small>Phân quyền, mã hóa, DDM</small>
      </DiDTitleConnector>
    </CircularPyramidStackTitle>
    <CircularPyramidStackContent>
      <strong>DLP tại nơi lưu trữ</strong>
      <br />
      <span>Quét và phân loại dữ liệu nhạy cảm.</span>
    </CircularPyramidStackContent>
  </CircularPyramidStack>
</CircularPyramid>

<div class="did-takeaway">DLP bổ sung kiểm soát nội dung và cách chia sẻ dữ liệu tại nhiều lớp.</div>

<style scoped>
.did-pyramid {
  margin-top: -48px;
}

.did-pyramid :deep(.alpha-circular-pyramid-stack-title__pill) {
  position: relative;
  top: var(--did-title-offset, 0px);
  white-space: normal;
}

.did-pyramid :deep(.alpha-circular-pyramid-stack-title__connector) {
  position: relative;
}

.did-pyramid :deep(.alpha-circular-pyramid-stack-title__line) {
  visibility: hidden;
}

.did-pyramid :deep(.alpha-circular-pyramid-stack-title__pill > span),
.did-pyramid :deep(.alpha-circular-pyramid-stack-content > div) {
  font-size: 16px;
  line-height: 1.2;
}

.did-pyramid :deep(.alpha-circular-pyramid-stack-title__pill > span) {
  overflow: visible;
  text-overflow: clip;
  white-space: normal;
}

.did-pyramid :deep(.alpha-circular-pyramid-stack-title__pill small) {
  display: block;
  font-size: 14px;
}

.did-pyramid :deep(.alpha-circular-pyramid-stack-title__pill > div) {
  font-size: 16px;
}

.did-pyramid :deep(.alpha-circular-pyramid-stack:is(.alpha-circular-pyramid-stack--0, .alpha-circular-pyramid-stack--1, .alpha-circular-pyramid-stack--2) .alpha-circular-pyramid-stack-title__pill > div) {
  box-sizing: content-box;
  width: 22px;
  height: 22px;
  padding: 1px;
}

.did-pyramid :deep(.alpha-circular-pyramid-stack-content > div) {
  display: block;
  overflow: visible;
}

.did-pyramid :deep(.alpha-circular-pyramid-stack-content strong) {
  margin-right: 4px;
}

.did-pyramid :deep(.alpha-circular-pyramid-stack--0 .alpha-circular-pyramid-stack__right) {
  display: none;
}

.did-pyramid :deep(.alpha-circular-pyramid__layer--0),
.did-pyramid :deep(.alpha-circular-pyramid-stack--0 .alpha-circular-pyramid-stack__left) {
  pointer-events: none;
  cursor: default;
}

.did-takeaway {
  margin-top: -36px;
  color: #0e6175;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
}
</style>

<!--
- DiD kết hợp nhiều lớp bảo vệ để giảm phụ thuộc vào một biện pháp. Năm lớp trong hình là mô hình minh họa.
- Giải thích từ trên xuống: hạ tầng vật lý bảo vệ phòng máy và thiết bị; hình không gán chức năng DLP trực tiếp ở lớp này.
- Ở lớp mạng, DLP tại gateway có thể kiểm tra nội dung và đích gửi trên đường đã tích hợp.
- Trên endpoint, DLP có thể giám sát hoặc hạn chế các thao tác được sản phẩm hỗ trợ.
- Trong ứng dụng, DLP kiểm tra dữ liệu khi chia sẻ hoặc xuất qua điểm đã tích hợp.
- Tại nơi lưu trữ, DLP quét và phân loại dữ liệu nhạy cảm.
- Đây là thứ tự giải thích từ nền tảng đến dữ liệu, không phải thứ tự thực thi hay thước đo tầm quan trọng của từng lớp.
- Authentication, access control và encryption có thể xuất hiện ở nhiều lớp; DDM kiểm soát khả năng hiển thị dữ liệu trong kết quả truy vấn.
- Khả năng DLP phụ thuộc sản phẩm, cấu hình, hoạt động được hỗ trợ và điểm kiểm soát đã tích hợp. Quét và phân loại không đồng nghĩa với tự động chặn mọi đường xuất.

Tham khảo:
- NIST Defense-in-Depth: https://csrc.nist.gov/glossary/term/defense_in_depth
- Microsoft DLP overview: https://learn.microsoft.com/en-us/purview/dlp-learn-about-dlp
-->
