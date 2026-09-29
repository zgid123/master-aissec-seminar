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
      <p><strong>Cơ chế:</strong> Quét object S3 được hỗ trợ và tạo finding về dữ liệu nhạy cảm.</p>
      <p><strong>Lợi ích:</strong> Xác định object data lake cần rà soát.</p>
      <p class="solution-limit"><strong>Giới hạn:</strong> Bỏ qua storage class hoặc định dạng không hỗ trợ.</p>
    </article>
    <article class="solution-card solution-card--cyan">
      <h2>Microsoft Purview DLP</h2>
      <p><strong>Cơ chế:</strong> Kiểm tra label/nội dung và áp dụng policy trong workload hỗ trợ.</p>
      <p><strong>Lợi ích:</strong> Áp dụng policy bảo vệ dữ liệu trong Fabric/Power BI.</p>
      <p class="solution-limit"><strong>Giới hạn:</strong> Không kiểm soát mọi bản sao và đường export.</p>
    </article>
    <article class="solution-card solution-card--violet">
      <h2>Google Sensitive Data Protection</h2>
      <p><strong>Cơ chế:</strong> Kiểm tra nội dung và khử định danh theo cấu hình.</p>
      <p><strong>Lợi ích:</strong> Giảm dữ liệu định danh trong đầu ra của pipeline.</p>
      <p class="solution-limit"><strong>Giới hạn:</strong> Cần tích hợp policy và điểm chặn.</p>
    </article>
    <article class="solution-card solution-card--slate">
      <h2>Forcepoint DLP</h2>
      <p><strong>Cơ chế:</strong> Kiểm tra nội dung và áp dụng policy trên kênh tích hợp.</p>
      <p><strong>Lợi ích:</strong> Kiểm soát chia sẻ kết quả phân tích đi qua kênh đó.</p>
      <p class="solution-limit"><strong>Giới hạn:</strong> Độ phủ tùy triển khai và kênh.</p>
    </article>
  </div>
</div>

<div v-else-if="slideClicks >= 2" class="solutions-panel solutions-open-source">
  <div class="solutions-group-title">Các thành phần mã nguồn mở hỗ trợ DLP</div>
  <div class="solutions-open-grid">
    <article class="solution-card solution-card--cyan">
      <h2>Presidio</h2>
      <p><strong>Cơ chế:</strong> Recognizer phát hiện PII; operator biến đổi đoạn được chọn.</p>
      <p><strong>Lợi ích:</strong> Tích hợp phát hiện và khử định danh PII vào pipeline.</p>
      <p class="solution-limit"><strong>Giới hạn:</strong> Cần tích hợp điều phối, policy và điểm chặn.</p>
    </article>
    <article class="solution-card solution-card--amber">
      <h2>Apache Atlas</h2>
      <p><strong>Cơ chế:</strong> Quản lý metadata/lineage; lan truyền classification theo cấu hình.</p>
      <p><strong>Lợi ích:</strong> Theo dõi quan hệ giữa dữ liệu nguồn và dữ liệu sau xử lý.</p>
      <p class="solution-limit"><strong>Giới hạn:</strong> Không tự quét nội dung hoặc chặn export.</p>
    </article>
    <article class="solution-card solution-card--violet">
      <h2>Apache Ranger</h2>
      <p><strong>Cơ chế:</strong> Đánh giá policy; plugin áp dụng quyết định trên dịch vụ tích hợp.</p>
      <p><strong>Lợi ích:</strong> Áp dụng quyền nhất quán qua các dịch vụ đó.</p>
      <p class="solution-limit"><strong>Giới hạn:</strong> Đường ngoài tích hợp không được kiểm soát.</p>
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
Phần này đối chiếu sản phẩm DLP với dịch vụ phát hiện, thư viện biến đổi, catalog metadata và framework phân quyền. Mỗi công nghệ bảo vệ một phần của đường dữ liệu qua tích hợp cụ thể. Các cấu hình dưới đây chỉ là minh họa, không phải thí nghiệm đã thực hiện hoặc kết quả của demo seminar. Phạm vi thực tế phụ thuộc phiên bản, gói dịch vụ và cấu hình.

[click]
## Giải pháp thương mại và đám mây

### Amazon Macie

**A. Vai trò trong DLP.** Amazon Macie là dịch vụ AWS khám phá dữ liệu nhạy cảm trong object Amazon S3, giúp xác định tài sản data lake (hồ dữ liệu) cần rà soát. Macie cung cấp finding (bằng chứng phát hiện), không phải điểm chặn query hay export.

**B. Cách tích hợp và sử dụng — Vị trí tích hợp.** Tại kho S3, cấu hình sensitive data discovery job với bucket, phạm vi object, lịch chạy và quyền đọc/giải mã phù hợp. Chọn managed data identifiers (bộ nhận diện do AWS quản lý); custom data identifier dùng Regex, có thể thêm keyword gần mẫu hoặc ignore word để phù hợp mã nội bộ. Cấu hình riêng rule Amazon EventBridge và thành phần nhận event nếu cần phản ứng sau phát hiện.

**C. Cơ chế hoạt động.** Job nhận phạm vi và cấu hình, đọc object đủ điều kiện rồi đối chiếu nội dung với identifiers. Macie tạo finding mô tả tài nguyên và loại dữ liệu nhạy cảm khi phát hiện. EventBridge chuyển event khớp rule tới target đã cấu hình, chẳng hạn Lambda. Logic phản ứng ở Lambda hoặc nhóm vận hành quyết định bước tiếp theo; quyền truy cập chỉ thay đổi khi thành phần đó gọi cơ chế quản lý quyền phù hợp. Finding không tự biến thành lệnh chặn.

**D. Ví dụ trong Big Data — cấu hình minh họa.** Phân vùng `customer_segments` trên S3 lưu bằng Parquet, chứa mã tài khoản nội bộ. Job chọn phân vùng này và custom identifier cho mẫu mã kèm keyword `account`. Macie tạo finding khi có nội dung khớp. Rule EventBridge chuyển finding tới Lambda do tổ chức viết để mở yêu cầu rà soát; steward (người phụ trách quản trị dữ liệu) xác minh rồi quản trị viên sửa quyền S3 nếu cần. Lợi ích là khoanh vùng object cần xử lý; giới hạn là quét không giữ lần download đang diễn ra và chưa thu hồi bản sao đã tải.

**E. Khả năng thực thi và giới hạn.** Macie phát hiện trong S3 được hỗ trợ, gồm Parquet và Avro đủ điều kiện. Storage class, định dạng, quyền giải mã và phạm vi job ảnh hưởng độ phủ. Cần kiểm tra kết quả job, phần bị bỏ qua và tần suất quét. Enforcement thuộc dịch vụ kiểm soát quyền hoặc đường truyền tích hợp riêng; không mặc định Macie quét mọi nguồn hay đọc mọi object.

**F. Câu hỏi có thể được đặt ra.**

- **Macie nhận diện mã riêng thế nào?** Dùng custom identifier với Regex và điều kiện bổ trợ; đó là so mẫu theo cấu hình, không tự hiểu mọi mã nghiệp vụ.
- **Finding có chặn export ngay không?** Không. EventBridge định tuyến event; quy trình phản ứng và điểm enforcement phải được cấu hình riêng, có thể hoạt động sau lần truy cập.

**G. Nguồn.** [Storage và định dạng](https://docs.aws.amazon.com/macie/latest/user/discovery-supported-storage.html); [managed identifiers](https://docs.aws.amazon.com/macie/latest/user/managed-data-identifiers.html); [custom identifiers](https://docs.aws.amazon.com/macie/latest/user/custom-data-identifiers.html); [discovery jobs](https://docs.aws.amazon.com/macie/latest/user/discovery-jobs-manage.html); [findings qua EventBridge](https://docs.aws.amazon.com/macie/latest/user/findings-monitor-events-eventbridge.html).

### Microsoft Purview DLP

**A. Vai trò trong DLP.** Microsoft Purview DLP là giải pháp policy DLP cho các workload Microsoft được hỗ trợ. Ví dụ giới hạn vào Fabric Lakehouse: nhận diện điều kiện trên tài sản phân tích và áp dụng hành động cấu hình. Sensitivity label là nhãn quản trị gắn với tài sản; sensitive information type là bộ nhận diện nội dung. Hai điều kiện này không đồng nghĩa.

**B. Cách tích hợp và sử dụng — Vị trí tích hợp.** Trong Purview, tạo custom policy cho vị trí Fabric và Power BI, chọn workspace (không gian làm việc) nằm trên Fabric hoặc Premium capacity. Khai báo điều kiện label hoặc sensitive information type được workload hỗ trợ; chọn policy tip (thông báo cho người dùng), alert và hành động cần áp dụng. Restrict access hiện là **preview**. Xác định người nhận alert và triển khai policy theo chế độ đã chọn; không suy từ cấu hình này sang workload khác.

**C. Cơ chế hoạt động.** Khi dữ liệu Fabric item thay đổi, DLP đánh giá tài sản hỗ trợ trong phạm vi policy. Điều kiện khớp tạo policy match; hệ thống thực hiện các hành động đã bật. Purview ghi alert nếu được cấu hình, còn tích hợp Fabric áp dụng giới hạn truy cập tài sản khi rule có Restrict access. Chỉ bật alert không có nghĩa đã chặn. Chủ sở hữu xem tip để xử lý nội dung; quản trị viên điều tra alert trong Purview.

**D. Ví dụ trong Big Data — cấu hình minh họa.** Lakehouse trong workspace phân tích lưu `customer_segments` bằng bảng Delta, có cột chuỗi chứa số thẻ tín dụng. Custom policy chọn workspace đó, điều kiện Credit Card Number, bật tip/alert và Restrict access (preview) chỉ giữ quyền cho chủ sở hữu. Khi dữ liệu cập nhật và điều kiện khớp, DLP tạo match, Purview ghi alert và Fabric hạn chế quyền với item theo cấu hình. Chủ sở hữu rà soát, bỏ cột không cần thiết khỏi đầu ra và nhóm bảo mật xử lý alert. Lợi ích là phản ứng trong workload; giới hạn là không thu hồi bản đã export và không coi đây là kiểm tra đồng bộ từng query.

**E. Khả năng thực thi và giới hạn.** Workload này hỗ trợ các hành động trên nhưng không có mọi detector của Purview: EDM và trainable classifiers không được hỗ trợ cho Fabric. Dữ liệu Fabric quét phải nằm trong bảng Delta; một số kiểu dữ liệu và codec bị loại. Quyền, capacity, định dạng và workspace phải phù hợp. Bảo vệ tệp đã tải xuống cần endpoint hoặc đường chia sẻ tích hợp riêng.

**F. Câu hỏi có thể được đặt ra.**

- **Khi nào Lakehouse được đánh giá?** Khi dữ liệu item thay đổi; DLP xét điều kiện trong phạm vi hỗ trợ rồi thực hiện hành động cấu hình, không hứa chặn mọi query trước khi trả dữ liệu.
- **Match có luôn làm mất quyền không?** Không. Rule phải bật Restrict access; hành động này là preview và người còn quyền tùy cấu hình.

**G. Nguồn.** [Cơ chế, actions và giới hạn](https://learn.microsoft.com/en-us/purview/dlp-powerbi-get-started); [cấu hình policy](https://learn.microsoft.com/en-us/fabric/governance/data-loss-prevention-configure); [phản ứng của chủ sở hữu](https://learn.microsoft.com/en-us/fabric/governance/data-loss-prevention-respond); [xử lý alert](https://learn.microsoft.com/en-us/fabric/governance/data-loss-prevention-monitor).

### Google Sensitive Data Protection

**A. Vai trò trong DLP.** Sensitive Data Protection là dịch vụ Google Cloud hỗ trợ inspection (kiểm tra nội dung) và khử định danh (biến đổi để giảm khả năng định danh). InfoType là loại thông tin cần tìm bằng detector. Dịch vụ cung cấp finding hoặc dữ liệu biến đổi; ứng dụng tích hợp dùng kết quả để bảo vệ đường dữ liệu.

**B. Cách tích hợp và sử dụng — Vị trí tích hợp.** Có thể tạo inspection job cho kho Google Cloud hỗ trợ hoặc gọi `content.inspect`/`content.deidentify` từ pipeline. Với API, cấu hình quyền gọi, `InspectConfig` gồm infoTypes/ngưỡng likelihood (mức khả năng khớp), và `DeidentifyConfig` gồm phép biến đổi. `InfoTypeTransformations` xử lý nội dung khớp detector; `RecordTransformations` có thể xử lý trường trong bảng. Ứng dụng thiết kế bước đọc, chia lô và ghi đầu ra phù hợp giới hạn API.

**C. Cơ chế hoạt động.** `content.inspect` nhận nội dung/cấu hình, chạy detectors rồi trả finding với loại thông tin, vị trí và likelihood. `content.deidentify` nhận nội dung cùng cấu hình biến đổi và trả nội dung đã xử lý. Khử định danh có thể áp dụng cho nội dung khớp infoType hoặc cho các trường được chỉ định, tùy cấu hình. Một số phép biến đổi trực tiếp trên trường không cần bước inspection. Inspection tự nó không sửa dữ liệu nguồn; việc biến đổi cần được cấu hình hoặc gọi rõ ràng.

**D. Ví dụ trong Big Data — cấu hình minh họa.** Pipeline đọc các lô `support_note` từ BigQuery và gửi văn bản tới API với infoType `EMAIL_ADDRESS`. Inspection trả finding cho email trong ghi chú; bước `content.deidentify` cấu hình replacement để thay đoạn khớp bằng `[EMAIL]`. Job do tổ chức viết nhận văn bản mới và ghi vào bảng đầu ra riêng cho phân tích. Job chỉ công bố bảng sau khi biến đổi thành công theo policy nội bộ; API không tự đổi quyền BigQuery. Lợi ích là giảm email trực tiếp; giới hạn là tên hoặc thông tin ngữ cảnh ngoài detector vẫn có thể định danh người.

**E. Khả năng thực thi và giới hạn.** Inspection phát hiện; transformation sửa đầu ra theo cấu hình. Masking, replacement và tokenization có tác động khác nhau; một số tokenization có thể đảo ngược với khóa. Khử định danh không bảo đảm an toàn cho mọi mục đích. Ứng dụng quyết định nơi lưu, người sử dụng, kiểm tra rủi ro còn lại và phản ứng khi lỗi; enforcement chia sẻ hoặc export cần tích hợp riêng. Độ phủ, kích thước lô, ngưỡng và chi phí ảnh hưởng triển khai.

**F. Câu hỏi có thể được đặt ra.**

- **Luôn inspection trước mọi transformation?** Không. Biến đổi theo infoType cần nội dung khớp detector; biến đổi trực tiếp toàn trường có thể không cần inspection.
- **Ai lưu bản đã che?** Ứng dụng/job gọi API phải nhận và ghi output, quản lý quyền; không mặc định bảng nguồn đã được sửa.

**G. Nguồn.** [Inspection văn bản](https://docs.cloud.google.com/sensitive-data-protection/docs/inspecting-text); [infoTypes](https://docs.cloud.google.com/sensitive-data-protection/docs/concepts-infotypes); [de-identification/record transformations](https://docs.cloud.google.com/sensitive-data-protection/docs/deidentify-sensitive-data); [phép biến đổi](https://docs.cloud.google.com/sensitive-data-protection/docs/transformations-reference); [inspection kho](https://docs.cloud.google.com/sensitive-data-protection/docs/inspecting-storage).

### Forcepoint DLP

**A. Vai trò trong DLP.** Forcepoint DLP là giải pháp thương mại kiểm soát nội dung và hành động trên kênh đã triển khai. Ví dụ chọn **Endpoint removable media**, tức sao chép tới thiết bị tháo rời như USB trên máy chuyên viên được quản lý. Endpoint client là điểm enforcement của kênh này; không phải mọi batch job trong cluster đều đi qua nó.

**B. Cách tích hợp và sử dụng — Vị trí tích hợp.** Triển khai management server/endpoint client phù hợp, cấu hình endpoint profile (cấu hình hoạt động client), người dùng/thiết bị và destination channel removable media. Rule chọn classifier (bộ phân loại nội dung), điều kiện và action plan (tập hành động cho kênh), chẳng hạn Block. Deploy policy/profile để client nhận cấu hình. Cần subscription Endpoint và đối chiếu hệ điều hành, phiên bản, tệp và thiết bị hỗ trợ.

**C. Cơ chế hoạt động.** Client kết nối endpoint server để nhận policy/profile. Khi người dùng sao chép tệp trên kênh theo dõi, client kiểm tra nội dung theo classifier và xét rule/action plan. Policy quyết định hành động; client áp dụng Block khi điều kiện khớp và cấu hình yêu cầu chặn. Incident (bản ghi sự kiện cần xử lý) được gửi về endpoint server để quản trị viên rà soát. Incident không tự xác nhận vi phạm sau xác minh của con người.

**D. Ví dụ trong Big Data — cấu hình minh họa.** Analyst đã export dữ liệu khách hàng thành CSV trên laptop Windows được quản lý rồi sao chép tới USB. Rule removable media dùng classifier nhận diện số thẻ tín dụng, action plan Block, đã deploy tới client. Khi nội dung khớp, client ngăn sao chép và gửi incident về server. Nhóm bảo mật cùng chủ sở hữu rà soát, tạo bản chỉ giữ trường cần thiết và sử dụng đích được phê duyệt. Lợi ích là kiểm soát một đường đưa kết quả phân tích ra ngoài; giới hạn là CSV đã có trên laptop và đường service-to-service chưa tích hợp cần biện pháp khác.

**E. Khả năng thực thi và giới hạn.** Kênh này hỗ trợ giám sát và permit/block theo cấu hình. Monitoring không đồng nghĩa blocking; hành động email/cloud không tự áp dụng cho USB. Độ phủ phụ thuộc client, profile, kênh và nội dung đọc được. Gateway mạng chỉ quan sát lưu lượng đi qua nó; tích hợp cloud chỉ xử lý hoạt động dịch vụ hỗ trợ. Các môi trường cần cấu hình riêng, không tự biết lineage của dữ liệu.

**F. Câu hỏi có thể được đặt ra.**

- **Thành phần nào chặn USB?** Endpoint client áp dụng action plan đã nhận; management server quản lý cấu hình và nhận incident, không giữ trực tiếp mọi thao tác tệp.
- **Client trên máy analyst bảo vệ toàn data lake?** Không. Nó chỉ kiểm soát thao tác/kênh hỗ trợ trên máy đó; cluster, API và thiết bị ngoài quản lý cần tích hợp khác.

**G. Nguồn.** [Endpoint deployment và policy/incident](https://help.forcepoint.com/dlp/10/dlphelp/1F418E97-9F3D-4FE4-9F35-866C1526BB28.html); [destination channels](https://help.forcepoint.com/dlp/10/dlphelp/D4D53F72-6D36-4D3A-8219-8D8F761E6685.html); [actions theo kênh](https://help.forcepoint.com/dlp/10/dlphelp/4017A303-ACBE-4BE9-BE10-F7ACDAC07607.html); [action plan](https://help.forcepoint.com/dlp/10.3.0/dlphelp/2D84D145-DE22-4488-A252-4A334AD4DAE1.html). Ví dụ chỉ dùng Block, không suy rộng mọi hành động giữa hệ điều hành/phiên bản.

[click]
## Các thành phần mã nguồn mở hỗ trợ DLP

### Microsoft Presidio

**A. Vai trò trong DLP.** Microsoft Presidio là bộ thư viện mã nguồn mở để phát hiện và biến đổi PII (Personally Identifiable Information, thông tin định danh cá nhân). Analyzer phát hiện đoạn chứa entity (thực thể nhận diện); Anonymizer biến đổi đoạn được chọn. Đây là thành phần cho lập trình viên tích hợp, không phải sản phẩm enterprise DLP hoàn chỉnh.

**B. Cách tích hợp và sử dụng — Vị trí tích hợp.** Pipeline đọc văn bản rồi gọi `AnalyzerEngine` với ngôn ngữ, loại entity và ngưỡng score (điểm số). `RecognizerRegistry` quản lý recognizers (bộ nhận diện); có thể thêm `PatternRecognizer` cho Regex hoặc cấu hình mô hình NLP (xử lý ngôn ngữ tự nhiên) phù hợp. Gọi `AnonymizerEngine` với kết quả Analyzer và operators (phép biến đổi) theo entity type, chẳng hạn replace, redact hoặc mask. Lập trình viên thiết kế bước ghi dữ liệu mới/xử lý lỗi.

**C. Cơ chế hoạt động.** Analyzer nhận văn bản, chạy recognizers theo pattern, kiểm tra hợp lệ hoặc NLP/ngữ cảnh tùy recognizer. `RecognizerResult` mô tả entity type, vị trí bắt đầu/kết thúc và score. Anonymizer nhận các đoạn cùng operator rồi tạo văn bản biến đổi và thông tin xử lý. Score không phải bằng chứng chắc chắn về danh tính. Pipeline quyết định dùng kết quả nào và công bố output theo policy; thư viện không tự chặn chia sẻ.

**D. Ví dụ trong Big Data — cấu hình minh họa.** Job đọc trường `support_note` tiếng Anh từ các phân vùng trên object storage, gọi Analyzer cho `EMAIL_ADDRESS`, rồi Anonymizer với replace thành `[EMAIL]`. Với email được phát hiện, output giữ văn bản khác và thay đoạn email. Job ghi bản mới vào vùng phân tích, ghi trạng thái và giữ lô lỗi ngoài đầu ra được công bố theo policy nội bộ. Lợi ích là thêm bước giảm PII vào pipeline riêng; giới hạn là có thể bỏ sót biến thể email và không bảo đảm hết thông tin định danh.

**E. Khả năng thực thi và giới hạn.** Presidio phát hiện/biến đổi nội dung được đưa vào; nguồn không tự thay đổi, ứng dụng phải lưu output. Orchestration (điều phối công việc), chia lô, mở rộng phân tán, policy, audit và enforcement cần tích hợp riêng. Chất lượng phụ thuộc recognizer, model/ngôn ngữ; không mặc định hỗ trợ tốt tiếng Việt hoặc mọi định dạng nhị phân.

**F. Câu hỏi có thể được đặt ra.**

- **Analyzer khác Anonymizer thế nào?** Analyzer trả vị trí/type/score; Anonymizer dùng kết quả và operators tạo văn bản mới, không tự tìm mọi PII còn sót.
- **Đưa vào Spark là có DLP phân tán hoàn chỉnh?** Không. Nhóm phát triển phải thiết kế điều phối, xử lý lỗi, policy và điểm enforcement; thư viện không cung cấp toàn bộ luồng đó.

**G. Nguồn.** [Analyzer](https://presidio.dataprivacystack.org/analyzer/); [Anonymizer](https://presidio.dataprivacystack.org/anonymizer/); [Regex recognizer](https://presidio.dataprivacystack.org/tutorial/02_regex/); [FAQ/giới hạn](https://presidio.dataprivacystack.org/faq/). Tài liệu dự án hiện tại được duy trì tại Data Privacy Stack; tên Microsoft Presidio chỉ nguồn gốc công nghệ, không hàm ý dịch vụ Purview.

### Apache Atlas

**A. Vai trò trong DLP.** Apache Atlas là framework quản trị metadata và catalog tài sản dữ liệu. Entity biểu diễn tài sản/quy trình; classification gắn loại quản trị vào entity; lineage ghi quan hệ nguồn–xử lý–đầu ra đã thu thập. Atlas hỗ trợ tìm tài sản cần kiểm soát, không phải detector quét nội dung hay điểm enforcement query.

**B. Cách tích hợp và sử dụng — Vị trí tích hợp.** Nạp metadata qua bridge cho dữ liệu hiện có, hook (thành phần ghi nhận hoạt động ở dịch vụ) hoặc REST API. Với Hive, cấu hình Hive hook và kết nối thông báo tới Atlas để thu bảng, cột và quan hệ xử lý hỗ trợ. Steward định nghĩa classification, gắn vào entity và quản lý propagation (lan truyền classification) trên lineage. Ngoài phạm vi hook cần mô hình metadata và cập nhật riêng.

**C. Cơ chế hoạt động.** Atlas nhận metadata về entity/quan hệ, lưu trong catalog rồi xử lý thay đổi classification. Atlas có thể tự động gắn classification được lan truyền vào các thực thể liên quan theo lineage và cấu hình propagation. Đây là cập nhật metadata thực sự, có thể được hệ thống tích hợp sử dụng. Tuy nhiên, propagation không tự phân tích lại nội dung để xác nhận classification vẫn phù hợp sau biến đổi; tổ chức cần quản lý quy tắc propagation và rà soát khi cần.

**D. Ví dụ trong Big Data — cấu hình minh họa.** Hive có bảng giao dịch và bảng liên hệ; job join tạo `customer_segments`. Hive hook ghi metadata/lineage hỗ trợ, steward gắn classification `PII` vào nguồn có dữ liệu cá nhân và bật propagation trên quan hệ phù hợp. Atlas gắn classification được lan truyền vào entity đầu ra, giúp steward tìm và rà soát bảng sau join. Nếu cấu hình TagSync và Ranger plugin như dưới đây, classification có thể dùng trong policy truy cập; chính Hive với plugin mới áp dụng hạn chế. Lợi ích là theo dõi dữ liệu sau xử lý; giới hạn là đầu ra tổng hợp tiếp theo cần đánh giá nội dung, không mặc định propagation đúng với mọi biến đổi.

**E. Khả năng thực thi và giới hạn.** Atlas lưu, phân loại và lan truyền metadata; không độc lập chặn query/export. Classification do steward hoặc tích hợp cung cấp, không tự xác nhận bằng quét raw content. Ranger có thể tiêu thụ metadata thay đổi khi đã cấu hình đồng bộ, ánh xạ tài nguyên và policy/plugin. Lineage thiếu, metadata cũ hoặc propagation sai ảnh hưởng kiểm soát; label sản phẩm khác không tự tương đương Atlas classification.

**F. Câu hỏi có thể được đặt ra.**

- **Propagation chỉ gợi ý hay gắn classification thật?** Có gắn classification được lan truyền vào entity theo cấu hình; hệ tích hợp có thể dùng metadata đó.
- **Atlas biết dữ liệu tổng hợp đã hết nhạy cảm chưa?** Không qua propagation. Cần detector/rà soát nội dung, đồng thời quản lý propagation để metadata phù hợp biến đổi và policy.

**G. Nguồn.** [Overview](https://atlas.apache.org/2.0.0/index.html); [kiến trúc và integrations](https://atlas.apache.org/2.0.0/Architecture.html); [Hive hook/bridge](https://atlas.apache.org/2.0.0/Hook-Hive.html); [classification propagation](https://atlas.apache.org/2.0.0/ClassificationPropagation.html). Cơ chế theo tài liệu Atlas 2.0.0; không khẳng định mọi engine tự gửi lineage đầy đủ.

### Apache Ranger

**A. Vai trò trong DLP.** Apache Ranger là framework quản trị policy phân quyền và audit cho dịch vụ tích hợp. Nó hỗ trợ hạn chế truy cập bằng policy trên tài nguyên hoặc classification đã có; Ranger không tự quét raw content để phát hiện độ nhạy cảm.

**B. Cách tích hợp và sử dụng — Vị trí tích hợp.** Ranger Admin quản lý policy; dịch vụ cần plugin tương thích. Với Hive, cấu hình Ranger Hive plugin, địa chỉ Ranger Admin, service name, ánh xạ user/group và nơi nhận audit. Policy mô tả database/table/column, thao tác như SELECT và chủ thể; có thể thêm masking/row filtering được Hive hỗ trợ. Plugin tải và cập nhật policy cho đánh giá tại chỗ, không hỏi Ranger Admin qua mạng cho từng query.

**C. Cơ chế hoạt động.** Hive nhận query; plugin đưa user, resource và operation vào policy engine (thành phần xét policy). Quyết định allow/deny hoặc cấu hình masking/filter được trả cho tích hợp Hive; Hive và plugin áp dụng vào thực hiện query/kết quả. Plugin tạo access audit và gửi tới đích cấu hình. Quyết định policy có hiệu lực khi dịch vụ thực thi; Ranger Admin không trực tiếp trả hay biến đổi mọi dữ liệu.

**D. Ví dụ trong Big Data — cấu hình minh họa.** Bảng Hive `analytics.customer_segments` chứa email và khu vực. Policy cho nhóm analyst quyền SELECT, masking cột email bằng `MASK_NULL`, row filter `region = 'VN'`. Khi analyst query qua Hive tích hợp, plugin xét policy, Hive trả các hàng đã lọc với email là NULL và plugin ghi audit theo cấu hình. Lợi ích là giảm dữ liệu trong kết quả; giới hạn là không sửa bảng nguồn và không áp dụng cho bản đọc trực tiếp qua storage ngoài Hive. Đây là khả năng tích hợp Hive, không suy rộng cho mọi service definition.

**E. Khả năng thực thi và giới hạn.** Với tag-based policy, cấu hình `ranger-tagsync` nhận thay đổi entity/classification từ Atlas, chẳng hạn thông báo Kafka, rồi cập nhật tag store ở Ranger Admin. Cần ánh xạ entity Atlas sang tài nguyên/service Ranger, tạo tag service, liên kết service được bảo vệ và để plugin nhận tags/policy. Có độ trễ đồng bộ; kết nối catalog không tự tạo policy. Đọc tệp nguồn qua HDFS/S3 cần kiểm soát riêng để tránh đi ngoài Hive. Enforcement và audit phụ thuộc plugin/ứng dụng và đích audit cấu hình.

**F. Câu hỏi có thể được đặt ra.**

- **Ranger Admin xét từng query?** Trong mô hình embedded plugin (plugin chạy trong dịch vụ), plugin đánh giá tại chỗ bằng policy đã tải; Hive áp dụng quyết định. API quyết định từ xa là cách tích hợp khác, không phải đường query của ví dụ.
- **Classification Atlas tới Ranger bằng cách nào?** TagSync đồng bộ metadata/ánh xạ tài nguyên; tag policy cùng plugin mới dùng được. Ranger không tự đọc bảng kiểm chứng classification hay chặn đường storage ngoài tích hợp.

**G. Nguồn.** [Plugin, Hive masking/filter và enforcement/audit](https://ranger.apache.org/blogs/integrating_applications.html); [policy model](https://ranger.apache.org/blogs/policy_model.html); [TagSync configuration](https://cwiki.apache.org/confluence/spaces/RANGER/pages/61326068/Tag%2BSynchronizer%2BInstallation%2Band%2BConfiguration); [tag policies và liên kết service](https://cwiki.apache.org/confluence/spaces/RANGER/pages/61322361/Tag%2BBased%2BPolicies).

### DBMS và Big Data

DBMS (Database Management System, hệ quản trị cơ sở dữ liệu) là phần mềm dùng để quản lý cơ sở dữ liệu. Big Data mô tả đặc điểm và yêu cầu lưu trữ, xử lý dữ liệu; một hệ thống Big Data có thể gồm DBMS, object storage (lưu trữ đối tượng), xử lý phân tán và các dịch vụ khác. Kiểm soát trong DBMS có thể bảo vệ quyền truy cập vào nguồn và giới hạn dữ liệu trong kết quả query, tùy cơ chế được cấu hình. Sau query, dữ liệu có thể đi qua notebook, tệp, batch job, API hoặc dịch vụ chia sẻ; các đường đó cần kiểm soát phù hợp riêng.

Tài liệu tham khảo về DBMS: [Microsoft Learn — Database Engine permissions](https://learn.microsoft.com/en-us/sql/relational-databases/security/permissions-database-engine?view=sql-server-ver17); [Row-Level Security](https://learn.microsoft.com/en-us/sql/relational-databases/security/row-level-security?view=sql-server-ver17); [Dynamic Data Masking](https://learn.microsoft.com/en-us/sql/relational-databases/security/dynamic-data-masking?view=sql-server-ver17); [SQL Server Audit](https://learn.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-database-engine?view=sql-server-ver17).

Các công nghệ đảm nhiệm phát hiện, biến đổi, catalog và phân quyền ở những vị trí khác nhau. Bảo vệ Big Data cần nối kết phát hiện với policy và điểm enforcement trên đường dữ liệu thực tế; các thành phần không tự kết nối thành một stack.
-->
