---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

<script setup>
import PatternIcon from '~icons/carbon/character-patterns'
import FingerprintIcon from '~icons/carbon/fingerprint-recognition'
import MachineLearningIcon from '~icons/carbon/machine-learning-model'
</script>

# Ba cách tìm nội dung nhạy cảm

<GearTriad
  class="detection-gear"
  :height="390"
  :clicks="Math.min(3, Math.max(0, $clicks - 1))"
  @click="$clicks = Math.min($clicks + 1, 5)"
>
  <GearTriadCallout
    title="Quy tắc định dạng"
    description="Nhận diện theo mẫu"
    :icon="PatternIcon"
    color="#06b6d4"
    depth-color="#0e7490"
    title-color="#0e7490"
  >
    <GearTriadHeading>Quy tắc định dạng</GearTriadHeading>
    <GearTriadDescription>Nhận diện theo mẫu</GearTriadDescription>
  </GearTriadCallout>
  <GearTriadCallout
    title="Fingerprinting"
    description="So khớp nội dung đã biết"
    :icon="FingerprintIcon"
    color="#f59e0b"
    depth-color="#b45309"
    title-color="#b45309"
  >
    <GearTriadHeading>Fingerprinting</GearTriadHeading>
    <GearTriadDescription>So khớp nội dung đã biết</GearTriadDescription>
  </GearTriadCallout>
  <GearTriadCallout
    title="Ngữ cảnh (AI/ML)"
    description="Phân loại theo ngữ cảnh"
    :icon="MachineLearningIcon"
    color="#8b5cf6"
    depth-color="#6d28d9"
    title-color="#6d28d9"
  >
    <GearTriadHeading>Ngữ cảnh (AI/ML)</GearTriadHeading>
    <GearTriadDescription>Phân loại theo ngữ cảnh</GearTriadDescription>
  </GearTriadCallout>

  <GearTriadContents option="1" class="method-detail method-detail--cyan">
    <GearTriadContent><strong>Cơ chế:</strong>&nbsp;Tìm chuỗi khớp mẫu định sẵn.</GearTriadContent>
    <GearTriadContent><strong>Ví dụ:</strong>&nbsp;Địa chỉ email theo mẫu ký tự.</GearTriadContent>
    <GearTriadContent><strong>Giới hạn:</strong>&nbsp;Có thể báo nhầm hoặc bỏ sót khi mẫu không phù hợp.</GearTriadContent>
  </GearTriadContents>
  <GearTriadContents option="2" class="method-detail method-detail--amber">
    <GearTriadContent><strong>Cơ chế:</strong>&nbsp;So khớp dấu vân tay với nội dung tham chiếu.</GearTriadContent>
    <GearTriadContent><strong>Ví dụ:</strong>&nbsp;Đoạn trích từ tài liệu nhạy cảm đã đăng ký.</GearTriadContent>
    <GearTriadContent><strong>Giới hạn:</strong>&nbsp;Phụ thuộc nội dung tham chiếu và mức độ chỉnh sửa.</GearTriadContent>
  </GearTriadContents>
  <GearTriadContents option="3" class="method-detail method-detail--violet">
    <GearTriadContent><strong>Cơ chế:</strong>&nbsp;Dùng mô hình để đánh giá nội dung trong ngữ cảnh.</GearTriadContent>
    <GearTriadContent><strong>Ví dụ:</strong>&nbsp;Câu tiết lộ thông tin sức khỏe.</GearTriadContent>
    <GearTriadContent><strong>Giới hạn:</strong>&nbsp;Có thể báo nhầm hoặc bỏ sót; cần đánh giá trên dữ liệu thực tế.</GearTriadContent>
  </GearTriadContents>
</GearTriad>

<div v-click="5" class="detection-takeaway">Phát hiện cung cấp đầu vào cho policy; chặn cần điểm thực thi.</div>

<span v-click="2" class="hidden" />
<span v-click="3" class="hidden" />
<span v-click="4" class="hidden" />

<style scoped>
.method-detail :deep(.alpha-gear-triad-contents__title),
.method-detail :deep(.alpha-gear-triad-content strong) {
  color: var(--method-color);
}

.method-detail :deep(.alpha-gear-triad-content__step) {
  display: none;
}

.method-detail :deep(.alpha-gear-triad-content) {
  gap: 0;
}

.method-detail :deep(.alpha-gear-triad-content__body) {
  font-size: 16px;
}

.method-detail--cyan { --method-color: #0e7490; }
.method-detail--amber { --method-color: #b45309; }
.method-detail--violet { --method-color: #6d28d9; }

.detection-takeaway {
  margin-top: -16px;
  color: #0e6175;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
}
</style>

<!--
- Ba cách phát hiện bổ sung cho nhau, không biểu diễn một chuỗi xử lý bắt buộc.
- Quy tắc tìm chuỗi khớp mẫu định sẵn; email là ví dụ, nhưng mẫu không phù hợp có thể gây báo nhầm hoặc bỏ sót.
- Fingerprinting so khớp với nội dung tham chiếu đã đăng ký; khả năng khớp phụ thuộc nội dung tham chiếu và mức độ chỉnh sửa.
- AI/ML đánh giá nội dung trong ngữ cảnh; cần kiểm tra sai sót trên dữ liệu thực tế.
- Phát hiện cung cấp đầu vào cho policy. Chặn một hành động xuất đòi hỏi điểm thực thi trên đường xuất tương ứng.
-->
