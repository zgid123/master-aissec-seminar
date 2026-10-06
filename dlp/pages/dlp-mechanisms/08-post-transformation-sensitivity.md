---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Kiểm soát độ nhạy sau biến đổi dữ liệu

<script setup>
import { computed, unref } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $clicks: slideClicks } = useSlideContext()
const exampleIndex = computed(() => Math.min(Math.max(unref(slideClicks) - 1, 0), 2))
</script>

<div class="transform-screen">
  <section v-if="exampleIndex === 0" class="transform-scene transform-join">
    <h2>1 · Join nối danh tính với hành vi</h2>
    <div class="transform-flow">
      <article><small>BẢNG LIÊN HỆ</small><code>id=104 · email=lan@example.test</code></article>
      <span>+</span>
      <article><small>GIAO DỊCH</small><code>id=104 · category=health · amount=500</code></article>
      <span>→</span>
      <article class="transform-output"><small>OUTPUT SAU JOIN</small><code>email + lịch sử mua hàng của Lan</code></article>
    </div>
    <div class="transform-result">
      <p><strong>DLP kiểm tra:</strong> phát hiện email/ID trong output join; policy không cho báo cáo rộng nhận giao dịch từng khách.</p>
      <p><strong>Thực thi:</strong> orchestrator giữ output; job bỏ định danh, gộp giao dịch rồi kiểm tra lại trước khi công bố.</p>
    </div>
    <p class="transform-limit">Lineage giúp truy nguồn; output sau biến đổi vẫn phải được kiểm tra lại.</p>
  </section>

  <section v-else-if="exampleIndex === 1" class="transform-scene transform-mask">
    <h2>2 · Che email nhưng vẫn giữ khóa liên kết</h2>
    <div class="transform-flow transform-flow--mask">
      <article><small>OUTPUT TRƯỚC</small><code>id=104 · email=lan@example.test · health · 500</code></article>
      <span>→</span>
      <article class="transform-output"><small>SAU MASKING</small><code>id=104 · email=l***@example.test · health · 500</code></article>
    </div>
    <div class="transform-result">
      <p><strong>DLP kiểm tra:</strong> rule kiểm tra ID còn trong output; giao dịch từng khách vẫn vi phạm policy báo cáo rộng.</p>
      <p><strong>Thực thi:</strong> giữ quyền hạn chế; sửa output và rà soát rủi ro liên kết trước khi duyệt công bố.</p>
    </div>
    <p class="transform-limit">Che email chưa đủ: cần rà soát khả năng liên kết lại với khách hàng trước khi công bố.</p>
  </section>
  <section v-else class="transform-scene transform-approved">
    <h2>3 · Sửa output → kiểm tra lại → công bố</h2>
    <div class="transform-flow transform-flow--mask">
      <article><small>BẢN CHI TIẾT BỊ GIỮ</small><code>20 giao dịch × 500<br>email · id · category · amount</code></article>
      <span>→</span>
      <article class="transform-output"><small>BẢN TỔNG HỢP ĐÃ SỬA</small><code>category=health<br>count=20 · total=10000</code></article>
    </div>
    <div class="transform-result">
      <p><strong>DLP kiểm tra lại:</strong> không còn email/ID; chỉ còn các trường tổng hợp thuộc schema báo cáo đã duyệt.</p>
      <p><strong>Thực thi:</strong> orchestrator công bố đúng bản đã kiểm tra và được duyệt cho nhóm báo cáo.</p>
    </div>
    <p class="transform-limit">Đạt rule của ví dụ không đồng nghĩa dữ liệu ẩn danh trong mọi bối cảnh.</p>
  </section>
</div>
<span v-click="2" class="hidden" />
<span v-click="3" class="hidden" />

<style scoped>
.transform-screen { color: #18334f; }
.transform-scene { height: 360px; box-sizing: border-box; padding: 14px 18px; display: grid; grid-template-rows: 28px 112px minmax(0, 1fr) 34px; gap: 10px; border: 1px solid var(--scene-border); border-top: 5px solid var(--scene-accent); border-radius: 12px; background: var(--scene-bg); color: #18334f; }
.transform-join { --scene-border: #a8c8f0; --scene-accent: #3977bf; --scene-bg: #f4f8fe; }
.transform-approved { --scene-border: #9addbd; --scene-accent: #147456; --scene-bg: #f1fcf6; }
.transform-mask { --scene-border: #f2ca72; --scene-accent: #a6650c; --scene-bg: #fffcf1; }
.transform-scene h2 { margin: 0; color: var(--scene-accent); font-size: 24px; line-height: 1.15; }
.transform-flow { display: grid; grid-template-columns: minmax(0, 1fr) 26px minmax(0, 1fr) 26px minmax(0, 1.2fr); align-items: stretch; gap: 9px; }
.transform-flow--mask { grid-template-columns: minmax(0, 1fr) 30px minmax(0, 1fr); }
.transform-flow article { display: flex; flex-direction: column; justify-content: center; min-height: 0; box-sizing: border-box; padding: 10px 12px; border: 1px solid #d5dee9; border-radius: 9px; background: white; }
.transform-flow article small { margin-bottom: 8px; color: #60758b; font-size: 13px; line-height: 1.2; font-weight: 800; }
.transform-flow article code { color: #18334f; font-size: 17px; line-height: 1.35; white-space: normal; overflow-wrap: anywhere; }
.transform-flow > span { align-self: center; color: #71859a; font-size: 22px; text-align: center; }
.transform-output { border: 2px solid #18a3b8 !important; background: #f0fcfd !important; }
.transform-result { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 0; }
.transform-result p { margin: 0; padding: 8px 12px; border-radius: 8px; background: #fff; font-size: 17px; line-height: 1.35; }
.transform-result strong { color: var(--scene-accent); }
.transform-limit { margin: 0; align-self: center; line-height: 1.2; color: #52677b; font-size: 14px; text-align: center; }
</style>

<!--
Phép biến đổi có thể làm thay đổi độ nhạy và khả năng liên kết của output. Detection, classification, transformation và publication/access enforcement là các chức năng riêng: detector tạo finding; người hoặc policy có thẩm quyền quyết định classification; operator thực hiện phép biến đổi; pipeline, kho hoặc query control áp dụng quyền publish. Luồng hình minh họa là mẫu đề xuất, không giả định các thành phần tự động kết nối.

[click]
### Join và enrichment

**Bối cảnh và vấn đề.** Bảng giao dịch có mã khách hàng và lịch sử mua hàng; bảng liên hệ ánh xạ mã tới tên hoặc email. Job join hai bảng để tạo hồ sơ phân tích. Kết quả kết nối hành vi với danh tính, nên có thể nhạy cảm hơn từng output tưởng tượng ban đầu. Không giả định input nào đã vô hại.

**Điểm tích hợp và input.** Job đưa kết quả join vào restricted staging. Detector kiểm tra nội dung/field, policy xét intended audience, còn lineage ghi lại nguồn và phép biến đổi nếu metadata đó được thu thập. Finding là bằng chứng, không tự quyết định classification. Lineage cho biết nguồn và cạnh phụ thuộc nhưng không chứng minh nội dung sau join đã được phân loại đúng.

**Enforcement và kết quả minh họa.** Data owner hoặc policy có thẩm quyền đánh giá lại mức nhạy cảm; pipeline orchestrator hoặc access control của kho giữ output trong staging cho tới khi decision được áp dụng. Kết quả chỉ publish cho nhóm đã được duyệt. Nếu bản mới được tạo sau lần kiểm tra hoặc publish đi đường khác, cần kiểm tra phiên bản mới và bảo vệ đường đó.

[click]
### Tổng hợp, masking và tokenization

**Bối cảnh và vấn đề.** Nhóm dữ liệu tạo thống kê giao dịch theo nhóm khách hàng, che email hoặc thay mã bằng token. Những thay đổi có thể giảm exposure trực tiếp nhưng vẫn để lại nhóm nhỏ, khóa liên kết, bảng ánh xạ token hoặc thông tin phụ trợ giúp suy luận/đối chiếu.

**Phân biệt phép biến đổi.** Masking che hoặc thay giá trị được hiển thị trong một ngữ cảnh; nó có thể không đổi dữ liệu gốc hoặc người có quyền cao hơn vẫn xem được. Pseudonymization thay định danh bằng bí danh/token nhưng vẫn có thể nối lại qua bảng giữ riêng hoặc qua thuộc tính còn liên kết. Tokenization dùng token thay giá trị; mức đảo ngược tùy cơ chế lưu mapping và quyền tới mapping. Anonymization nhắm giảm khả năng gắn dữ liệu với cá nhân trong bối cảnh phát hành cụ thể; xóa tên không đủ để chứng minh điều đó.

**Policy và enforcement.** Đánh giá output theo release policy riêng, nội dung, audience và dữ liệu phụ trợ mà audience có thể biết. Nếu rủi ro còn cao, job giảm độ chi tiết hoặc bỏ biến liên kết, rồi đánh giá lại; hoặc access control giới hạn người nhận trong môi trường kiểm soát. Không có ngưỡng nhóm phổ quát an toàn cho mọi dữ liệu.

**Giới hạn.** Generic DLP có thể phát hiện finding/label nhưng không nhất thiết tính được nguy cơ re-identification hoặc mọi suy luận thống kê. Cần privacy assessment/output-release review bổ sung khi công bố dữ liệu nhạy cảm, nhất là khi kết hợp nguồn phụ trợ. NIST SP 800-188 khuyến nghị đánh giá mục tiêu, mô hình chia sẻ và nguy cơ tái nhận dạng theo mục đích phát hành; đây không phải chức năng mặc định của detector DLP.

[click]
### Sửa output và công bố đúng phiên bản

Đây là dữ liệu giả định: 20 giao dịch thuộc category health, mỗi giao dịch có amount 500, tạo tổng 10000. Bản chi tiết chứa email và ID nên bị giữ; job tạo bản tổng hợp bỏ các trường định danh. DLP kiểm tra nội dung và schema của phiên bản mới; policy kiểm tra đích nhận và quyết định duyệt. Chỉ phiên bản đó được orchestrator công bố.

Ví dụ giả định chủ dữ liệu đã duyệt schema tổng hợp và đánh giá rủi ro phát hành cho nhóm báo cáo. Số 20 không phải ngưỡng bảo đảm ẩn danh; nếu còn nguy cơ liên kết hoặc suy luận, output vẫn phải bị giữ để xử lý tiếp. Việc kiểm tra không có email/ID chỉ là một phần của quyết định, không chứng minh an toàn toàn diện.

### Nguồn tham khảo

- [NIST SP 800-188 — De-Identifying Government Datasets: Techniques and Governance](https://csrc.nist.gov/pubs/sp/800/188/final): kỹ thuật khử định danh, mô hình chia sẻ và đánh giá re-identification risk.
- [NIST — Re-identification risk](https://csrc.nist.gov/glossary/term/re_identification_risk): thuật ngữ và định nghĩa rủi ro tái nhận dạng.
- [Apache Atlas — Classification Propagation](https://atlas.apache.org/1.2.0/ClassificationPropagation.html): ví dụ propagation classification theo lineage đã cấu hình.
-->
