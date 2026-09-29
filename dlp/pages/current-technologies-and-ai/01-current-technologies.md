---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

<script setup>
import { useSlideContext } from '@slidev/client'

const { $clicks: slideClicks } = useSlideContext()
</script>

# Giải pháp và công nghệ hỗ trợ DLP

<div v-if="slideClicks >= 1 && slideClicks < 2" class="solutions-panel solutions-commercial">
  <div class="solutions-group-title">Giải pháp thương mại và đám mây</div>
  <div class="solutions-commercial-grid">
    <article class="solution-card solution-card--amber">
      <h2>Amazon Macie</h2>
      <p><strong>Vai trò:</strong> Khám phá dữ liệu nhạy cảm trong object Amazon S3.</p>
      <p><strong>Lợi ích:</strong> Giúp ưu tiên bucket và object cần rà soát.</p>
      <p class="solution-limit"><strong>Giới hạn:</strong> Chỉ xử lý storage class và định dạng được hỗ trợ.</p>
    </article>
    <article class="solution-card solution-card--cyan">
      <h2>Microsoft Purview DLP</h2>
      <p><strong>Vai trò:</strong> Policy DLP cho item Fabric/Power BI được hỗ trợ.</p>
      <p><strong>Lợi ích:</strong> Hiển thị gợi ý và cảnh báo trong workload đã chọn.</p>
      <p class="solution-limit"><strong>Giới hạn:</strong> Tùy phạm vi item; Fabric DLP áp dụng cho bảng Delta.</p>
    </article>
    <article class="solution-card solution-card--violet">
      <h2>Google Sensitive Data Protection</h2>
      <p><strong>Vai trò:</strong> Kiểm tra và khử định danh qua job/API.</p>
      <p><strong>Lợi ích:</strong> Hỗ trợ rà soát kho dữ liệu đã chọn theo lịch.</p>
      <p class="solution-limit"><strong>Giới hạn:</strong> Cần nối finding với policy và điểm enforcement.</p>
    </article>
    <article class="solution-card solution-card--slate">
      <h2>Forcepoint DLP</h2>
      <p><strong>Vai trò:</strong> DLP doanh nghiệp cho nhiều kênh.</p>
      <p><strong>Lợi ích:</strong> Giúp quản trị policy trên các kênh đã tích hợp.</p>
      <p class="solution-limit"><strong>Giới hạn:</strong> Độ phủ tùy gói, kênh và định dạng hỗ trợ.</p>
    </article>
  </div>
</div>

<div v-else-if="slideClicks >= 2" class="solutions-panel solutions-open-source">
  <div class="solutions-group-title">Các thành phần mã nguồn mở hỗ trợ DLP</div>
  <div class="solutions-open-grid">
    <article class="solution-card solution-card--cyan">
      <h2>Presidio</h2>
      <p><strong>Vai trò:</strong> Thư viện phát hiện và khử định danh PII trong văn bản.</p>
      <p><strong>Lợi ích:</strong> Tùy chỉnh nhận diện theo loại dữ liệu cần bảo vệ.</p>
      <p class="solution-limit"><strong>Giới hạn:</strong> Chất lượng tùy recognizer, ngôn ngữ và tích hợp policy/enforcement.</p>
    </article>
    <article class="solution-card solution-card--amber">
      <h2>Apache Atlas</h2>
      <p><strong>Vai trò:</strong> Danh mục metadata, label phân loại và lineage của tài sản dữ liệu.</p>
      <p><strong>Lợi ích:</strong> Theo dõi nguồn gốc và phân loại dữ liệu dẫn xuất.</p>
      <p class="solution-limit"><strong>Giới hạn:</strong> Metadata không quét nội dung hoặc chặn export.</p>
    </article>
    <article class="solution-card solution-card--violet">
      <h2>Apache Ranger</h2>
      <p><strong>Vai trò:</strong> Quản lý tập trung policy phân quyền và audit qua plugin dịch vụ.</p>
      <p><strong>Lợi ích:</strong> Quản lý nhất quán quyền truy cập trên các dịch vụ tích hợp.</p>
      <p class="solution-limit"><strong>Giới hạn:</strong> Cần plugin enforcement; dịch vụ ngoài tích hợp không được kiểm soát.</p>
    </article>
  </div>
</div>

<span v-click="1" class="hidden" />
<span v-click="2" class="hidden" />

<style scoped>
.solutions-panel { margin-top: 8px; color: #18334f; }
.solutions-group-title { margin-bottom: 11px; color: #415a72; font-size: 16px; font-weight: 800; line-height: 1.25; text-align: center; }
.solutions-commercial-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.solutions-open-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 13px; }
.solution-card { min-height: 150px; padding: 12px 14px 10px; border: 1px solid; border-radius: 12px; display: flex; flex-direction: column; }
.solutions-open-grid .solution-card { min-height: 275px; padding: 17px 17px 15px; }
.solution-card--amber { background: #fffbeb; border-color: #f2ca72; }
.solution-card--cyan { background: #effbfc; border-color: #a7e3e8; }
.solution-card--violet { background: #f6f3ff; border-color: #d8c9f5; }
.solution-card--slate { background: #f8fafc; border-color: #cbd5e1; }
.solution-card h2 { margin: 0 0 6px; color: #142d49; font-size: 20px; font-weight: 750; line-height: 1.15; }
.solution-card p { margin: 0 0 4px; font-size: 14px; line-height: 1.3; }
.solution-card p strong { color: #18334f; font-weight: 750; }
.solution-card .solution-limit { margin-top: auto; margin-bottom: 0; padding-top: 4px; color: #52677b; }
.solutions-open-grid .solution-card p { font-size: 15px; line-height: 1.36; margin-bottom: 11px; }
.solutions-open-grid .solution-card .solution-limit { margin-bottom: 0; }
</style>

<!--
Phần này giới thiệu bốn dịch vụ thương mại hoặc đám mây và ba thành phần mã nguồn mở. Chúng giải quyết những phần khác nhau của công việc DLP và cần được đánh giá theo phạm vi tích hợp, cấu hình và đường dữ liệu. Các tình huống có `customer_segments` bên dưới đều là ví dụ giả định, không phải tính năng đã chạy trong demo. Phạm vi sản phẩm và trạng thái nêu trong ghi chú được đối chiếu với tài liệu chính thức vào ngày 2026-09-28; chúng có thể thay đổi theo phiên bản, gói dịch vụ, khu vực và cấu hình.

[click]
## Giải pháp thương mại và đám mây

### Amazon Macie

**Khái quát.** Amazon Macie là dịch vụ khám phá và phân loại dữ liệu nhạy cảm được lưu trong object của Amazon S3. Nó giúp xác định vị trí cần điều tra trong phạm vi bucket và object được cấu hình.

**Cơ chế.** Macie nhận bucket/object trong phạm vi được chọn và phân tích nội dung theo data identifiers tích hợp sẵn hoặc tùy chỉnh. Kết quả có thể là sensitive-data finding mô tả loại thông tin và object liên quan.

**Ví dụ minh họa, giả định.** Nếu `customer_segments` được lưu thành Parquet trong bucket và định dạng đó được Macie hỗ trợ, dịch vụ có thể tạo finding cho object cần rà soát. Một quy trình phản ứng riêng có thể dùng finding để chuyển hồ sơ cho nhóm bảo mật.

**Lợi ích, giới hạn và tích hợp.** Finding giúp nhóm ưu tiên bucket/object cần rà soát thay vì duyệt thủ công toàn bộ kho. Macie chỉ xử lý storage class và định dạng được hỗ trợ, cần quyền đọc phù hợp, không phải bộ quét nằm bên trong mọi DBMS và không tự chặn mọi đường xuất.

**Tài liệu chính thức.** [Amazon Macie — supported storage classes and formats](https://docs.aws.amazon.com/macie/latest/user/discovery-supported-storage.html); [Macie finding types](https://docs.aws.amazon.com/macie/latest/user/findings-types.html).

### Microsoft Purview DLP

**Khái quát.** Microsoft Purview DLP là policy DLP được cấu hình cho các workload Microsoft được hỗ trợ. Phạm vi ví dụ ở đây là Fabric và Power BI; tính năng không bao phủ tự động mọi dữ liệu của tổ chức.

**Cơ chế.** Policy được gán cho workspace và item type tương thích. Tùy policy, dịch vụ kiểm tra sensitivity label hoặc một tập sensitive-information types được hỗ trợ, rồi tạo policy tip, alert hoặc hành động hạn chế truy cập.

**Ví dụ minh họa, giả định.** Một Lakehouse tương thích có bảng Delta chứa `customer_segments` có thể nằm trong phạm vi policy đã bật. Tùy điều kiện và hành động được cấu hình, dịch vụ có thể cảnh báo quản trị viên hoặc hạn chế truy cập tới item.

**Lợi ích, giới hạn và tích hợp.** Việc đặt policy trong workload được chọn giúp người dùng nhận gợi ý hoặc nhóm quản trị xem cảnh báo tại cùng môi trường làm việc. Phạm vi tùy workload, loại item, cấu hình và giấy phép; tài liệu Fabric hiện giới hạn DLP ở bảng Delta, còn thao tác restrict access được đánh dấu preview. Hạn chế quyền vào item không đồng nghĩa với kiểm soát mọi bản sao, tải xuống hoặc đường xuất.

**Tài liệu chính thức.** [Microsoft Learn — DLP for Fabric and Power BI](https://learn.microsoft.com/en-us/purview/dlp-powerbi-get-started); [Purview DLP policy reference — locations and scope](https://learn.microsoft.com/en-us/purview/dlp-policy-reference).

### Google Sensitive Data Protection

**Khái quát.** Google Sensitive Data Protection là dịch vụ Google Cloud để kiểm tra nội dung nhạy cảm, tạo finding/profile và khử định danh theo cấu hình. Khử định danh là biến đổi dữ liệu nhằm giảm khả năng nhận diện chủ thể.

**Cơ chế.** Một inspection job hoặc API nhận nội dung hoặc vị trí dữ liệu cùng cấu hình infoTypes cần dò tìm. Finding có thể ghi loại thông tin và vị trí phát hiện. Việc khử định danh dùng cấu hình biến đổi qua tác vụ/API riêng, tạo nội dung đã xử lý.

**Ví dụ minh họa, giả định.** Một job có thể kiểm tra bảng BigQuery chứa `customer_segments` rồi cung cấp finding cho bước phân loại. Một tác vụ khác có thể mask hoặc tokenize cột đã chọn trước khi xuất nếu pipeline được tích hợp như vậy.

**Lợi ích, giới hạn và tích hợp.** Detector tích hợp hoặc tùy chỉnh cùng khả năng lập lịch giúp nhóm rà soát các kho đã chọn. Inspection và khử định danh cần được cấu hình riêng; ứng dụng hoặc pipeline phải nối finding với classification, policy và điểm enforcement. Dịch vụ không tự kết nối vào mọi ứng dụng hay tự chặn mọi lần xuất.

**Tài liệu chính thức.** [Google Cloud — inspect storage and databases](https://docs.cloud.google.com/sensitive-data-protection/docs/inspecting-storage); [de-identify sensitive data](https://docs.cloud.google.com/sensitive-data-protection/docs/deidentify-sensitive-data); [Sensitive Data Protection with BigQuery](https://docs.cloud.google.com/sensitive-data-protection/docs/dlp-bigquery).

### Forcepoint DLP

**Khái quát.** Forcepoint DLP là một họ giải pháp thương mại gồm những thành phần có thể triển khai trên endpoint, mạng, cloud, web hoặc email tùy gói sản phẩm.

**Cơ chế.** Thành phần giám sát nhận nội dung hoặc hành động đi qua một kênh đã tích hợp, áp policy theo cấu hình rồi tạo cảnh báo hoặc hành động kiểm soát tương ứng. Nhóm quản trị có thể chia sẻ policy qua nhiều kênh nếu các thành phần triển khai hỗ trợ cấu hình đó.

**Ví dụ minh họa, giả định.** Agent endpoint hoặc kênh web/email đã cài đặt có thể kiểm tra tệp chứa `customer_segments` khi người dùng upload hoặc gửi. Hành động chỉ diễn ra nếu bộ phát hiện, policy, agent và kênh cụ thể hỗ trợ tình huống đó.

**Lợi ích, giới hạn và tích hợp.** Quản trị policy trên các kênh đã tích hợp có thể giúp nhóm bảo mật áp dụng cùng quy tắc ở nhiều điểm làm việc. Phạm vi thật phụ thuộc gói đã mua, phiên bản, hệ điều hành, kênh và loại nội dung được hỗ trợ. Sản phẩm không tự biết lineage của dữ liệu hoặc kiểm soát mọi batch job xuất trực tiếp từ data lake.

**Tài liệu chính thức.** [Forcepoint DLP datasheet — deployment and channel coverage](https://www.forcepoint.com/resources/datasheets/forcepoint-dlp-on-prem); [Forcepoint DLP brochure](https://www.forcepoint.com/resources/brochures/forcepoint-data-loss-prevention-dlp-brochure).

[click]
## Các thành phần mã nguồn mở hỗ trợ DLP

### Presidio

**Khái quát.** Presidio là bộ thư viện/framework mã nguồn mở để phân tích và khử định danh Personally Identifiable Information (PII, thông tin định danh cá nhân) trong văn bản. Nó hỗ trợ xử lý văn bản trong ứng dụng cần bảo vệ thông tin cá nhân.

**Cơ chế.** Analyzer nhận văn bản và chạy recognizer (thành phần nhận diện một loại thông tin) dùng regex, danh sách, checksum, quy tắc hoặc NLP/ML. Finding chỉ ra loại thực thể, vị trí trong văn bản và điểm số nếu recognizer cung cấp. Anonymizer có thể nhận finding đó cùng operator như redact, replace, hash hoặc encrypt để tạo văn bản đã biến đổi.

**Ví dụ minh họa, giả định.** Adapter của một ứng dụng có thể lấy `support_note` trong `customer_segments`, gọi Analyzer để tìm email hoặc số điện thoại rồi chuyển finding sang policy. Ứng dụng có thể gọi bước Anonymizer riêng để che email trước khi chia sẻ.

**Lợi ích, giới hạn và tích hợp.** Recognizer và operator có thể được cấu hình hoặc mở rộng theo loại dữ liệu cần bảo vệ. Chất lượng phụ thuộc recognizer, model, ngôn ngữ, ngưỡng và dữ liệu; đội triển khai phải tích hợp ứng dụng với policy và điểm enforcement. Presidio không tự quản trị luồng phân tán, quyết định quyền chia sẻ theo người gửi/đích hoặc chặn export nếu không có tích hợp tương ứng.

**Tài liệu chính thức.** [Presidio project transition and MIT license](https://github.com/data-privacy-stack/presidio/blob/main/docs/project_transition.md); [text anonymization](https://github.com/data-privacy-stack/presidio/blob/main/docs/text_anonymization.md); [installation and NLP engines](https://github.com/data-privacy-stack/presidio/blob/main/docs/installation.md).

### Apache Atlas

**Khái quát.** Apache Atlas là catalog và hệ thống quản trị metadata thuộc Apache Software Foundation, phát hành theo Apache License 2.0. Nó giúp tổ chức tìm và quản lý thông tin mô tả tài sản dữ liệu.

**Cơ chế.** Atlas nhận metadata về dataset, tiến trình, phân loại và quan hệ từ bridge, hook hoặc tích hợp. Catalog lưu entity, classification và lineage — quan hệ nguồn gốc, luồng và biến đổi dữ liệu. Các association được cấu hình có thể lan truyền classification tới tài sản dẫn xuất theo graph lineage đã nạp.

**Ví dụ minh họa, giả định.** Catalog có thể ghi nguồn khách hàng được biến đổi thành `customer_segments`, rồi tổng hợp thành `segment_summary`. Steward có thể xem quan hệ này để rà soát phân loại của từng đầu ra.

**Lợi ích, giới hạn và tích hợp.** Metadata tập trung hỗ trợ tìm tài sản, xem nguồn gốc và theo dõi classification giữa các thành phần đã tích hợp. Atlas quản lý metadata; nó không tự quét byte nội dung hay chặn export. Propagation phụ thuộc graph và cấu hình đã nạp, nên không chứng minh aggregate còn nhạy cảm hay đã được classification chính xác.

**Tài liệu chính thức.** [Apache Atlas overview, classification, lineage and license](https://atlas.apache.org/1.2.0/index.html); [classification propagation](https://atlas.apache.org/1.2.0/ClassificationPropagation.html); [type system and lineage](https://atlas.apache.org/1.2.0/TypeSystem.html).

### Apache Ranger

**Khái quát.** Apache Ranger là dự án Apache Software Foundation theo Apache License 2.0 để quản lý tập trung policy phân quyền và audit cho các ứng dụng đã tích hợp.

**Cơ chế.** Ứng dụng hoặc plugin gửi thông tin người dùng, tài nguyên, hành động và ngữ cảnh. Ranger trả quyết định allow/deny; với service definition hỗ trợ, policy cũng có thể trả biểu thức mask dữ liệu hoặc lọc hàng. Plugin hoặc ứng dụng tích hợp chịu trách nhiệm enforcement và ghi audit.

**Ví dụ minh họa, giả định.** Plugin Hive hoặc Trino có hỗ trợ có thể áp dụng policy giới hạn analyst xem hàng thuộc vùng được phân công, hoặc mask cột email khi chạy truy vấn.

**Lợi ích, giới hạn và tích hợp.** Policy và audit tập trung giúp quản trị quyền truy cập nhất quán trên các dịch vụ có plugin tương thích. Phạm vi phụ thuộc plugin, resource model, cấu hình và phiên bản; không phải mọi dịch vụ đều hỗ trợ masking hoặc row filter. Quyết định tại plugin không kiểm soát bản sao đã xuất qua một đường không tích hợp.

**Tài liệu chính thức.** [Apache Ranger — integrating applications and enforcement responsibilities](https://ranger.apache.org/blogs/integrating_applications.html); [policy model and row filters](https://ranger.apache.org/blogs/policy_model.html); [Apache Ranger source repository and license](https://github.com/apache/ranger).

Các công nghệ này không phải những sản phẩm tương đương hay một stack tự kết nối. Thành phần phát hiện và khử định danh, catalog metadata, quản lý policy và điểm enforcement xử lý những phần việc khác nhau. Một giải pháp cần chọn phạm vi cần bảo vệ và tích hợp từng thành phần vào đúng đường dữ liệu.
-->
