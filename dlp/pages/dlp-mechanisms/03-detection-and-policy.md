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
  @click="$clicks = Math.min($clicks + 1, 4)"
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

  <GearTriadContents :option="1" class="method-detail method-detail--cyan">
    <GearTriadContent><strong>Cơ chế:</strong>&nbsp;Tìm chuỗi khớp mẫu định sẵn.</GearTriadContent>
    <GearTriadContent><strong>Ví dụ:</strong>&nbsp;lan@example.com → khớp mẫu email.</GearTriadContent>
    <GearTriadContent><strong>Giới hạn:</strong>&nbsp;Có thể báo nhầm hoặc bỏ sót khi mẫu không phù hợp.</GearTriadContent>
  </GearTriadContents>
  <GearTriadContents :option="2" class="method-detail method-detail--amber">
    <GearTriadContent><strong>Cơ chế:</strong>&nbsp;So khớp dấu vân tay với nội dung tham chiếu.</GearTriadContent>
    <GearTriadContent><strong>Ví dụ:</strong>&nbsp;Một đoạn sao chép từ tài liệu nội bộ đã đăng ký.</GearTriadContent>
    <GearTriadContent><strong>Giới hạn:</strong>&nbsp;Phụ thuộc nội dung tham chiếu và mức độ chỉnh sửa.</GearTriadContent>
  </GearTriadContents>
  <GearTriadContents :option="3" class="method-detail method-detail--violet">
    <GearTriadContent><strong>Cơ chế:</strong>&nbsp;Dùng mô hình để đánh giá nội dung trong ngữ cảnh.</GearTriadContent>
    <GearTriadContent><strong>Ví dụ minh họa:</strong>&nbsp;‘Lan đang điều trị bệnh X.’ → thông tin sức khỏe gắn với cá nhân.</GearTriadContent>
    <GearTriadContent>
      <strong>Giới hạn:</strong>&nbsp;Có thể báo nhầm/bỏ sót; cần kiểm thử trên dữ liệu thực tế.
    </GearTriadContent>
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
  font-size: 19px;
  line-height: 1.45;
}

.method-detail { width: 520px; }
.method-detail :deep(.alpha-gear-triad-contents__items) { gap: 0.5rem; }

.method-detail--cyan { --method-color: #0e7490; }
.method-detail--amber { --method-color: #b45309; }
.method-detail--violet { --method-color: #6d28d9; }
.method-detail--violet :deep(.alpha-gear-triad-contents__desc) { margin-bottom: 0.75rem; }
.method-detail--violet :deep(.alpha-gear-triad-contents__items) { gap: 0.5rem; }

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
Ba cách phát hiện nội dung nhạy cảm gồm các tín hiệu khác nhau.

[click]

Ba nhóm kỹ thuật minh họa những tín hiệu khác nhau để nhận diện nội dung nhạy cảm và có thể được kết hợp.

[click]

Quy tắc định dạng tìm chuỗi phù hợp với mẫu, chẳng hạn cấu trúc địa chỉ email. Một địa chỉ khớp mẫu cung cấp tín hiệu phát hiện nhưng chưa tự quyết định dữ liệu có được chia sẻ hay không.

[click]

Fingerprinting sử dụng biểu diễn của nội dung tham chiếu để tìm sự trùng khớp hoặc tương đồng. Một ví dụ là phát hiện đoạn văn được sao chép từ tài liệu nội bộ đã đăng ký. Khả năng xử lý nội dung chỉnh sửa phụ thuộc kỹ thuật; không nên đồng nhất mọi phương pháp fingerprinting với việc so sánh hash của toàn bộ file.

[click]

Phân loại theo ngữ cảnh dùng mô hình để đánh giá ý nghĩa trong văn bản. Câu “Lan đang điều trị bệnh X” minh họa thông tin sức khỏe gắn với một cá nhân. Đây là ví dụ giải thích, không phải kết quả thực nghiệm của một mô hình cụ thể. Cả ba nhóm đều có thể báo nhầm hoặc bỏ sót. Kết quả phát hiện cần được đưa vào quá trình xét policy và thực thi tại điểm kiểm soát phù hợp.

Nguồn tham khảo: [Shapira et al. (2013), “Content-based data leakage detection using extended fingerprinting”](https://arxiv.org/abs/1302.2028); [Ahmed et al. (2021), “Automated detection of unstructured context-dependent sensitive information using deep learning”](https://doi.org/10.1016/j.iot.2021.100444).
-->
