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

# Các kỹ thuật phát hiện dữ liệu nhạy cảm

<GearTriad
  class="detection-gear"
  :height="360"
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
    title="So khớp nội dung tham chiếu"
    description="Fingerprinting"
    :icon="FingerprintIcon"
    color="#f59e0b"
    depth-color="#b45309"
    title-color="#b45309"
  >
    <GearTriadHeading>So khớp nội dung tham chiếu</GearTriadHeading>
    <GearTriadDescription>Fingerprinting</GearTriadDescription>
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
    <GearTriadContent><strong>Cơ chế:</strong>&nbsp;Tạo biểu diễn từ nội dung để đối chiếu với dữ liệu đã đăng ký.</GearTriadContent>
    <GearTriadContent><strong>Ví dụ:</strong>&nbsp;Phát hiện đoạn văn sao chép từ tài liệu nội bộ bằng kỹ thuật so khớp từng phần.</GearTriadContent>
    <GearTriadContent><strong>Giới hạn:</strong>&nbsp;Cần dữ liệu tham chiếu; khả năng nhận ra nội dung đã sửa phụ thuộc kỹ thuật.</GearTriadContent>
  </GearTriadContents>
  <GearTriadContents :option="3" class="method-detail method-detail--violet">
    <GearTriadContent><strong>Cơ chế:</strong>&nbsp;Dùng mô hình để đánh giá nội dung trong ngữ cảnh.</GearTriadContent>
    <GearTriadContent><strong>Ví dụ:</strong>&nbsp;‘Lan đang điều trị bệnh X.’ → thông tin sức khỏe gắn với cá nhân.</GearTriadContent>
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
  font-size: 23px;
  line-height: 1.38;
}

.method-detail { width: 520px; }
.method-detail :deep(.alpha-gear-triad-contents__items) { gap: 0.6rem; }

.method-detail--cyan { --method-color: #0e7490; }
.method-detail--amber { --method-color: #b45309; }
.method-detail--violet { --method-color: #6d28d9; }
.method-detail--violet :deep(.alpha-gear-triad-contents__desc) { margin-bottom: 0.75rem; }
.method-detail--violet :deep(.alpha-gear-triad-contents__items) { gap: 0.5rem; }

.detection-takeaway {
  margin-top: 0;
  color: #0e6175;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
}
</style>

<!--
Các detector khác nhau vì chúng khai thác những bằng chứng khác nhau. Quy tắc phù hợp với chuỗi có cấu trúc rõ như email; fingerprinting (so khớp với biểu diễn nội dung tham chiếu đã đăng ký) tìm nội dung có cùng nguồn; AI/ML (Artificial Intelligence/Machine Learning, trí tuệ nhân tạo/học máy) có thể xét nghĩa và ngữ cảnh của văn bản. Không có một detector nào phù hợp với mọi loại dữ liệu, nên finding cần được diễn giải trước khi policy xử lý.

[click] Quy tắc định dạng dò chuỗi theo mẫu đã định nghĩa. Chẳng hạn, biểu thức chính quy có thể nhận diện `lan@example.com` là chuỗi trông giống email. Finding này chỉ cho biết mẫu đã khớp; nó chưa chứng minh policy chia sẻ bị vi phạm. Quy tắc nhanh và dễ kiểm tra nhưng có thể báo nhầm hoặc bỏ sót khi dữ liệu lệch khỏi mẫu, được che giấu hay dùng định dạng khác. Người thực hiện, hành động và đích nhận vẫn cần được xét ở bước policy.

[click] Fingerprinting tạo một representation (dạng biểu diễn) từ tài liệu hoặc giá trị đã đăng ký, rồi áp dụng cách xử lý tương thích cho nội dung ứng viên để tìm phần trùng. Finding khớp cho biết ứng viên có thể chứa nội dung bắt nguồn từ tài liệu tham chiếu; nó không phải label độ nhạy, không tự phân loại toàn bộ tài liệu và không mã hóa nội dung. Ví dụ, tổ chức đăng ký một quy trình nội bộ dài hai trang; nếu một đoạn của quy trình được sao chép vào email, fragment-based matching (so khớp dựa trên các mảnh nội dung) có thể chỉ ra đoạn trùng để policy xem xét người gửi và nơi nhận.

Hai cơ chế cần được phân biệt. Exact-value hashing (băm giá trị chính xác) so hash của cùng một đơn vị nội dung sau cùng bước tiền xử lý; nếu đơn vị hoặc bước preprocessing khác, giá trị hash không còn so sánh trực tiếp được. SHA-256 của toàn bộ tài liệu chỉ biểu diễn toàn tài liệu: thêm một đoạn, đổi một byte hoặc chèn nội dung khác làm hash thay đổi, nên hash toàn tài liệu không tìm được riêng một đoạn văn được chép sang tài liệu thứ hai. Fragment-based matching chia nội dung thành các đơn vị nhỏ hơn và so khớp những mảnh đó, nhờ vậy có thể tìm đoạn sao chép. Khả năng chịu chỉnh sửa phụ thuộc thuật toán, cách chia mảnh và ngưỡng của từng kỹ thuật; không phải mọi fingerprinting đều hỗ trợ so khớp mờ, càng không mặc nhiên hỗ trợ so khớp ngữ nghĩa.

[click] AI/ML dùng mô hình học từ văn bản đã gán nhãn để phân loại văn bản mới theo ngữ cảnh. Câu “Lan đang điều trị bệnh X” minh họa việc liên hệ một thông tin sức khỏe với cá nhân, chứ không phải dự đoán đã chạy qua mô hình. Một địa chỉ trong quảng cáo bất động sản hoặc câu phủ định về tình trạng sức khỏe cũng không tự động trở thành dữ liệu không nhạy cảm; cần xét người được nhắc đến, mục đích, nội dung xung quanh và hậu quả tiết lộ. Mô hình có thể báo nhầm hoặc bỏ sót khi ngôn ngữ, miền dữ liệu hay lối diễn đạt khác dữ liệu huấn luyện, vì vậy cần đánh giá false positive (báo nhầm), false negative (bỏ sót) và độ trễ trên dữ liệu mục tiêu.

Trong demo, `demo/src/dlp_demo/scanner.py` chỉ xét cột `campaign_code`, cắt khoảng trắng đầu/cuối của giá trị ứng viên, tính SHA-256 và so với hash đã đăng ký của `AURORA-2026`. Đây là exact-value hashing sau preprocessing, không phải fragment-based matching hoặc so khớp ngữ nghĩa. Bộ phân loại nhỏ trong `demo/src/dlp_demo/context_model.py` là thành phần minh họa riêng, được huấn luyện bằng một tập câu tiếng Việt tổng hợp nhỏ.

[click] Finding từ detector cung cấp bằng chứng cho policy; enforcement là việc áp dụng quyết định của policy tại điểm kiểm soát. Vì thế, phát hiện cung cấp đầu vào cho policy, còn chặn cần điểm enforcement đã tích hợp.

Nguồn nghiên cứu: [Shapira et al. (2013), “Content-based data leakage detection using extended fingerprinting”](https://arxiv.org/abs/1302.2028); [Ahmed et al. (2021), “Automated detection of unstructured context-dependent sensitive information using deep learning”](https://doi.org/10.1016/j.iot.2021.100444).
-->
