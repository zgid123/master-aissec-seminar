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
  @click="$clicks = Math.min($clicks + 1, 5)"
>
  <GearTriadCallout
    title="Quy tắc định dạng (Regex)"
    description="Có khớp mẫu đã biết?"
    :icon="PatternIcon"
    color="#06b6d4"
    depth-color="#0e7490"
    title-color="#0e7490"
  >
    <GearTriadHeading>Quy tắc định dạng (Regex)</GearTriadHeading>
    <GearTriadDescription>Nhận diện theo mẫu</GearTriadDescription>
  </GearTriadCallout>
  <GearTriadCallout
    title="So khớp nội dung tham chiếu"
    description="Fingerprinting · Có khớp nội dung đã đăng ký?"
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
    description="Ngữ cảnh có gợi dữ liệu nhạy cảm?"
    :icon="MachineLearningIcon"
    color="#8b5cf6"
    depth-color="#6d28d9"
    title-color="#6d28d9"
  >
    <GearTriadHeading>Ngữ cảnh (AI/ML)</GearTriadHeading>
    <GearTriadDescription>Phân loại theo ngữ cảnh</GearTriadDescription>
  </GearTriadCallout>

  <GearTriadContents :option="1" class="method-detail method-detail--cyan">
    <GearTriadContent><strong>Cơ chế:</strong>&nbsp;Đối chiếu nội dung với mẫu định sẵn.</GearTriadContent>
    <GearTriadContent><strong>Ví dụ:</strong>&nbsp;lan@example.com → khớp mẫu email.</GearTriadContent>
    <GearTriadContent><strong>Giới hạn:</strong>&nbsp;Đổi định dạng có thể bị bỏ sót; mẫu rộng có thể báo nhầm.</GearTriadContent>
  </GearTriadContents>
  <GearTriadContents :option="2" class="method-detail method-detail--amber">
    <GearTriadContent><strong>Cơ chế:</strong>&nbsp;Tạo biểu diễn từ nội dung để đối chiếu với dữ liệu đã đăng ký.</GearTriadContent>
    <GearTriadContent><strong>Ví dụ:</strong>&nbsp;Email chứa đoạn từ quy trình nội bộ đã đăng ký.</GearTriadContent>
    <GearTriadContent><strong>Giới hạn:</strong>&nbsp;Cần dữ liệu tham chiếu; thay đổi có thể vượt khả năng so khớp.</GearTriadContent>
  </GearTriadContents>
  <GearTriadContents :option="3" class="method-detail method-detail--violet">
    <GearTriadContent><strong>Cơ chế:</strong>&nbsp;Dùng mô hình để đánh giá nội dung trong ngữ cảnh.</GearTriadContent>
    <GearTriadContent><strong>Ví dụ:</strong>&nbsp;‘Lan đang điều trị bệnh X.’ → thông tin sức khỏe gắn với cá nhân.</GearTriadContent>
    <GearTriadContent>
      <strong>Giới hạn:</strong>&nbsp;Lệch miền/ngôn ngữ hoặc ngữ cảnh mơ hồ có thể báo nhầm/bỏ sót.
    </GearTriadContent>
  </GearTriadContents>
</GearTriad>

<div v-click="5" class="detection-takeaway">Detector tạo finding → policy xét dữ liệu và ngữ cảnh → điểm thực thi áp dụng quyết định.</div>

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
**Bối cảnh và vấn đề.** Một detector (bộ phát hiện) tìm bằng chứng trong nội dung; từng kỹ thuật nhìn vào một dạng tín hiệu khác nhau. Finding là bằng chứng detector quan sát được, không đồng nghĩa với classification, label hay quyết định policy. Quy tắc kiểm tra mẫu có cấu trúc, fingerprinting đối chiếu nội dung với tài liệu tham chiếu, còn AI/ML có thể xét quan hệ ngữ cảnh.

[click]
### Tổng quan các kỹ thuật

Quy tắc nhìn vào mẫu có cấu trúc, fingerprinting đối chiếu dữ liệu tham chiếu, còn AI/ML xét tín hiệu ngữ cảnh. Các kỹ thuật bổ trợ nhau; output phát hiện vẫn cần policy và điểm enforcement.

[click]
### Quy tắc định dạng (Regex)

**Cơ chế.** Quy tắc so nội dung với mẫu đã định nghĩa, chẳng hạn Regex (biểu thức chính quy) mô tả cấu trúc thường thấy của địa chỉ email. Finding cho biết mẫu đã khớp; nó chưa xác nhận danh tính, mức độ nhạy cảm hoặc vi phạm policy chia sẻ.

**Ví dụ.** Mẫu email có thể khớp chuỗi `lan@example.com` trong một file văn bản. Nếu cùng giá trị bị chèn khoảng trắng, xuống dòng hoặc mã hóa theo định dạng mà detector không chuẩn hóa, mẫu có thể bỏ sót. Ngược lại, mẫu quá rộng có thể khớp chuỗi trông giống mã định danh nhưng không mang ý nghĩa đó.

**Giới hạn và đánh đổi.** Quy tắc dễ kiểm tra và phù hợp với định dạng ổn định, nhưng phải được điều chỉnh theo các biến thể dữ liệu. Sau finding, policy vẫn phải xét người thực hiện, hành động và đích nhận trước khi chọn cảnh báo, cho phép hay chặn.

[click]
### So khớp nội dung tham chiếu (Fingerprinting)

**Cơ chế.** Tổ chức đăng ký trước tài liệu hoặc giá trị tham chiếu. Hệ thống tính một representation (dạng biểu diễn) từ nội dung tham chiếu; khi kiểm tra ứng viên, nó áp dụng bước xử lý tương thích, tính representation theo cùng phương pháp rồi so sánh. Kết quả khớp tạo finding có thể dùng làm bằng chứng rằng ứng viên chứa nội dung trùng theo tiêu chí đã chọn. Finding này không phải label độ nhạy và tự nó không chứng minh việc chia sẻ vi phạm policy.

**Ví dụ.** Nếu một quy trình nội bộ được đăng ký, email chứa một đoạn sao chép có thể được nhận diện khi detector dùng fragment-based matching (so khớp dựa trên các mảnh nội dung). Điều đó cho nhóm policy một dấu hiệu để xét người gửi, người nhận và ngữ cảnh chia sẻ.

**Phân biệt kỹ thuật.** Exact-value hashing (băm giá trị chính xác) so hash của cùng một đơn vị nội dung sau preprocessing (tiền xử lý) tương thích. Nếu đơn vị hoặc nội dung thay đổi, hash thường thay đổi. SHA-256 của toàn tài liệu chỉ biểu diễn toàn bộ byte của tài liệu đó: thêm đoạn văn, đổi một ký tự hoặc chèn nội dung khác tạo hash khác. Vì vậy, so hash SHA-256 toàn tài liệu không tìm riêng được một đoạn được chép sang tài liệu khác. Fragment-based matching chia nội dung thành mảnh rồi đối chiếu từng mảnh; khả năng xử lý thay đổi phụ thuộc thuật toán, cách chia và ngưỡng. Không phải mọi fingerprinting hỗ trợ so khớp mờ, và không thể mặc định rằng nó so khớp ngữ nghĩa.

**Trường hợp thất bại.** Với exact-value hashing, chỉ cần sửa dấu câu hoặc một ký tự trong giá trị đã đăng ký cũng có thể làm ứng viên không khớp. Một phương pháp theo mảnh cũng có thể bỏ sót nếu đoạn sao chép bị sửa theo cách nằm ngoài khả năng chịu biến đổi của kỹ thuật đó.

**Exact Data Match (EDM).** EDM là cách đối chiếu giá trị trong nội dung với các giá trị đã đăng ký trong bảng dữ liệu tham chiếu; chẳng hạn, một detector có thể dò bản ghi khách hàng đã đăng ký bằng mã khách hàng cùng column / field hỗ trợ được cấu hình. Đây là so khớp dữ liệu bản ghi, khác với fingerprinting nội dung tài liệu hoặc mẫu tài liệu. Phạm vi tính năng riêng của từng nhà cung cấp cũng phụ thuộc cách triển khai; không xem những kỹ thuật này là các tên gọi thay thế cho nhau.

**Chi tiết demo.** Cài đặt đơn giản hóa trong demo kiểm tra cột `campaign_code`, bỏ khoảng trắng đầu/cuối của giá trị ứng viên, tính SHA-256 rồi so với hash đã đăng ký của `AURORA-2026`. Đây là so khớp giá trị chính xác sau tiền xử lý, không phải so khớp đoạn trong tài liệu hay một hệ thống EDM production dùng trong môi trường thực tế. Finding chỉ là một input để policy xét tiếp.

**Nguồn cho EDM.** [Microsoft Learn — “Learn about exact data match based sensitive information types”](https://learn.microsoft.com/en-us/purview/sit-learn-about-exact-data-match-based-sits); [Microsoft Learn — “Reduce false positives by using SITs and advanced classifiers”](https://learn.microsoft.com/en-us/purview/deploymentmodels/depmod-reduce-false-positives). Tài liệu Microsoft phân biệt EDM trên dữ liệu tham chiếu với document fingerprinting.

[click]
### Phân loại theo ngữ cảnh (AI/ML)

**Cơ chế.** AI/ML (trí tuệ nhân tạo/học máy) có thể học từ văn bản đã gán nhãn rồi dự đoán nhãn lớp cho văn bản mới. Câu “Lan đang điều trị bệnh X” minh họa quan hệ giữa thông tin sức khỏe và một cá nhân; đây là ví dụ giả định, không phải dự đoán của mô hình. Nhãn lớp dự đoán cho văn bản cũng khác label lưu kết quả classification cho một tài sản dữ liệu.

**Ví dụ và trường hợp thất bại.** Một mô hình học từ câu tiếng Việt về sức khỏe có thể gặp câu phủ định hoặc diễn đạt trong hồ sơ y tế khác tập huấn luyện; nó có thể bỏ sót thông tin hoặc gán nhầm. Mô hình học từ một ngôn ngữ hay miền dữ liệu khác cũng có thể hoạt động kém trên văn bản mục tiêu. Một địa chỉ trong quảng cáo bất động sản không tự động vô hại; phải đọc quan hệ và ngữ cảnh xung quanh.

**Giới hạn và đánh đổi.** Cần đo false positive (báo nhầm), false negative (bỏ sót), chất lượng và độ trễ trên dữ liệu đại diện cho nơi triển khai. Mô hình không tự gắn governance label (label quản trị) hoặc kích hoạt enforcement; hệ thống cần quy tắc thiết kế để chuyển dự đoán thành classification được chấp nhận, nếu có.

**Chi tiết demo.** Bộ phân loại nhỏ trong `demo/src/dlp_demo/context_model.py` là thành phần riêng, được huấn luyện bằng một tập câu tiếng Việt tổng hợp nhỏ. Đây là mô hình minh họa, không phải kết quả của nghiên cứu được trích dẫn và không tạo dự đoán cho ví dụ trên slide.

[click]
### Từ phát hiện đến enforcement

Finding từ detector chỉ cung cấp bằng chứng cho policy. Policy mới xét thêm label, người thực hiện, hành động và đích nhận để đưa ra quyết định; enforcement là việc áp dụng quyết định đó tại điểm tích hợp. Do vậy, phát hiện cung cấp input cho policy; chặn cần điểm thực thi.

**Nguồn nghiên cứu:** [Shapira et al. (2013), “Content-based data leakage detection using extended fingerprinting”](https://arxiv.org/abs/1302.2028); [Ahmed et al. (2021), “Automated detection of unstructured context-dependent sensitive information using deep learning”](https://doi.org/10.1016/j.iot.2021.100444).
-->
