---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# <span class="research-title">Phát hiện dữ liệu nhạy cảm theo ngữ cảnh</span>

<div v-click="1" class="research-method">
  <div class="research-attribution">Nghiên cứu Qawara &amp; Alhindi (2026)</div>
  <div class="research-problem"><strong>Bài toán:</strong> Classification toàn văn bản trên tweet tiếng Anh về chính trị và sắc tộc/chủng tộc.</div>
  <div class="method-row training-row">
    <strong class="method-label">Huấn luyện</strong><span>Văn bản + nhãn train</span><b>→</b><span>Tiền xử lý<br />và biểu diễn</span><b>→</b><span>Huấn luyện / fine-tune</span>
  </div>
  <div class="model-families"><strong>Mô hình:</strong> Logistic Regression (LR), DistilRoBERTa, ALBERT</div>
  <div class="method-row evaluation-row">
    <strong class="method-label">Đánh giá</strong><span>Văn bản test</span><b>→</b><span>Xử lý bằng<br />mô hình đã học</span><b>→</b><span>Dự đoán lớp;<br />đối chiếu nhãn test</span>
  </div>
</div>

<div v-click="2" class="research-findings">
  <div class="research-result"><strong>Accuracy tác giả báo cáo: khoảng 88% cho LR và DistilRoBERTa</strong><span>Trong so sánh train/test ban đầu.</span></div>
  <div class="research-limit"><strong>Liên hệ DLP:</strong> Classification cung cấp tín hiệu cho policy.<br />Kết quả phụ thuộc tập dữ liệu và thiết lập đánh giá.</div>
  <div class="research-lesson">Đánh giá cả báo nhầm, bỏ sót và chi phí trên dữ liệu mục tiêu.</div>
</div>

<style scoped>
.research-title { display: inline-block; font-size: 31px; line-height: 1.08; }
.research-method { margin-top: 5px; color: #18334f; }
.research-attribution { color: #6d28d9; font-size: 14px; font-weight: 750; }
.research-problem { margin-top: 6px; font-size: 15px; line-height: 1.35; }
.research-problem > span { color: #52677b; font-size: 13px; }
.method-row { display: grid; grid-template-columns: 110px 1fr 20px 1fr 20px 1.1fr; align-items: center; gap: 8px; margin-top: 9px; padding: 9px 12px; border: 1px solid; border-radius: 9px; font-size: 14px; line-height: 1.25; }
.training-row { background: #f6f3ff; border-color: #d8c9f5; }
.evaluation-row { background: #effbfc; border-color: #a7e3e8; }
.method-label { font-size: 14px; }
.method-row > span, .method-row > b { text-align: center; }
.method-row small { font-size: 11px; }
.model-families { margin: 6px 0 0 130px; font-size: 13px; line-height: 1.35; }
.research-findings { margin-top: 11px; color: #18334f; }
.research-result { padding: 8px 12px; border-left: 4px solid #0e7490; border-radius: 5px; background: #f0f9ff; }
.research-result strong { display: block; font-size: 15px; line-height: 1.2; }
.research-result span { display: block; margin-top: 3px; color: #52677b; font-size: 12px; }
.research-lesson { margin-top: 7px; color: #0e6175; font-size: 14px; font-weight: 700; line-height: 1.3; }
.research-limit { margin-top: 6px; color: #52677b; font-size: 13px; line-height: 1.35; }
</style>

<!--
### Bối cảnh và vấn đề

Qawara và Alhindi nghiên cứu classification toàn văn bản để nhận diện dữ liệu nhạy cảm phụ thuộc ngữ cảnh trong văn bản phi cấu trúc. Một từ liên quan chính trị hoặc sắc tộc không đủ để quyết định độ nhạy cảm: nội dung báo chí trung tính, phát biểu mang định kiến và đe dọa ngầm có thể chứa từ tương tự nhưng mang ý nghĩa khác. Đây là bài toán phân loại tweet theo quy ước nghiên cứu, không phải bộ nhận diện mọi thông tin cá nhân hay detector xác định vị trí từng đoạn nhạy cảm.

[click]

Nghiên cứu so sánh mô hình học máy truyền thống với hai transformer trên tweet tiếng Anh. Cách hiểu “nhạy cảm” gắn với miền và tiêu chí gán nhãn của tác giả.

### Bài toán và dữ liệu

Mục 3.1–3.3 mô tả tweet tiếng Anh ngắn, tối đa 300 ký tự, lấy từ nguồn về chính trị và phân biệt đối xử. Tác giả chọn tweet phù hợp theo miền/ngữ cảnh, có lọc bằng bộ từ khóa. Tập ban đầu gồm 3.083 tweet; Bảng 3 báo cáo 1.549 nhạy cảm và 1.534 không nhạy cảm. Hai người gán nhãn đánh giá ngữ cảnh trong tweet và trao đổi để giải quyết bất đồng. Phạm vi ở Bảng 1 gồm phát biểu phê phán/định kiến hướng đến nhóm sắc tộc/chủng tộc và thông tin chính trị mà ngữ cảnh có thể gây xung đột hoặc ảnh hưởng an ninh xã hội. Không đồng nhất tiêu chí này với một định nghĩa pháp lý phổ quát hoặc policy DLP của mọi tổ chức. Việc lọc theo từ khóa cũng ảnh hưởng tính đại diện của tập dữ liệu.

### Cơ chế

**Đầu vào và tiền xử lý.** Mỗi đầu vào là một tweet; lớp đích là nhạy cảm hoặc không nhạy cảm. Mục 3.4 mô tả chuyển chữ thường, loại một số dấu câu, ký hiệu, số, stop words, hashtag, mention và đường dẫn, mở rộng từ viết tắt, tokenization cùng stemming/lemmatization; văn bản song ngữ bị loại. Tokenization tách văn bản thành đơn vị đầu vào; stemming/lemmatization chuẩn hóa dạng từ. Những lựa chọn này có thể làm mất tín hiệu cần cho miền khác, nên không tự áp dụng nguyên xi cho dữ liệu DLP mục tiêu.

**Huấn luyện.** Mục 3.5.1 dùng bag-of-words qua CountVectorizer (đếm từ) cho Logistic Regression (LR), Naive Bayes, Decision Tree và Support Vector Machine. GridSearchCV được mô tả với cross-validation năm fold để chọn siêu tham số. LR là baseline được chọn theo kết quả. Mục 3.5.2 fine-tune DistilRoBERTa và ALBERT từ mô hình pretrained, dùng tokenizer tương ứng và biểu diễn ngữ cảnh. Fine-tune là tiếp tục huấn luyện mô hình đã học trước trên ví dụ gán nhãn của bài toán đích, không huấn luyện transformer từ đầu. ALBERT là “A Lite BERT for Self-supervised Learning of Language Representations”; BERT là “Bidirectional Encoder Representations from Transformers”.

**Dự đoán và đánh giá.** Sơ đồ phân biệt đường train với đường test: ví dụ có nhãn trong train dùng để học; mô hình đã học nhận văn bản test chưa dùng để huấn luyện và dự đoán lớp cho toàn tweet. Nhãn test chỉ dùng để đối chiếu tính metric. Tham số tiền xử lý/biểu diễn học từ train phải được giữ khi xử lý test; không fit lại trên test. Đây là nguyên tắc đọc sơ đồ, không phải khẳng định đã kiểm toán mã nguồn thí nghiệm của tác giả. Mô tả thí nghiệm ban đầu dùng chia train/test 80:20; transformer còn có validation để chọn checkpoint. Tác giả bổ sung đánh giá DistilRoBERTa bằng phép chia stratified (giữ tỷ lệ lớp) và cross-validation năm fold, khởi tạo lại pretrained weights ở mỗi fold. Các phép đánh giá này có thiết lập riêng và không được gộp thành cùng một kết quả.

[click]
### Kết quả và ý nghĩa

**So sánh ban đầu.** Bảng 5, 6 và 10 báo cáo accuracy của LR là 0,88/88% và DistilRoBERTa là 88%; ALBERT là 86%. Accuracy là tỷ lệ dự đoán đúng trên toàn bộ mẫu đánh giá. Bảng 10 báo cáo precision/recall/F1 của LR là 88%/88%/88%, DistilRoBERTa là 79%/91%/84%, ALBERT là 92%/86%/89%. Precision đo tỷ lệ mẫu thực sự nhạy cảm trong các mẫu dự đoán nhạy cảm; recall đo tỷ lệ mẫu nhạy cảm được phát hiện; F1 cân bằng precision và recall. Cùng accuracy làm tròn không chứng minh các mô hình có cùng kiểu lỗi hoặc hiệu quả theo mọi metric. Bài báo chưa mô tả thật rõ cách averaging của mọi metric giữa các bảng, nên các giá trị trên là số tác giả báo cáo, không phải kết quả được tính lại.

**Các đánh giá bổ sung.** Bảng 7 báo cáo accuracy 90,99% cho DistilRoBERTa với phép chia stratified; Bảng 8 báo cáo accuracy trung bình 0,9366 ± 0,0128 và macro F1 0,9357 ± 0,0131 qua năm fold. Các số này không thay thế accuracy 88% trong so sánh ban đầu và không tạo một so sánh mới với LR trên cùng thiết lập. Macro F1 là trung bình F1 giữa các lớp; độ lệch chuẩn giữa fold thể hiện dao động qua những lần chia trong tập này, không bảo đảm chất lượng ở miền khác.

**Báo nhầm, bỏ sót và chi phí.** Mục 4.3/Bảng 9 mô tả báo nhầm khi từ khóa chính trị xuất hiện trong tin trung tính, và bỏ sót với đe dọa ngầm hoặc ngôn ngữ mã hóa. Báo nhầm có thể ngắt công việc hợp lệ hoặc tăng rà soát; bỏ sót để lọt dữ liệu nhạy cảm. Bảng 6 ghi thời gian đánh giá DistilRoBERTa thấp hơn ALBERT trong thí nghiệm; không suy thành throughput production, không suy rằng LR có cùng chi phí với transformer và không dùng tham số ít hơn để kết luận luôn nhanh hơn. Bài học là đo chất lượng cùng chi phí tính toán trên workload đích, thay vì mặc định mô hình phức tạp hơn luôn phù hợp.

### Giới hạn và đánh đổi

Nguồn đầy đủ đã đọc là PDF từ publisher. Tuy nhiên, số mẫu đánh giá chưa nhất quán: tập ban đầu là 3.083 tweet, phần thảo luận McNemar nêu 276 mẫu là 20% corpus, còn phần đánh giá bổ sung nêu test 297 mẫu sau loại trùng. Không đủ căn cứ để xác định chính xác tập sau tiền xử lý và quan hệ giữa mọi partition; không tái dựng số mẫu train/test hay khẳng định tất cả bảng dùng cùng partition. Bảng 5 và 10 cũng không nhất quán về recall/F1 của Support Vector Machine. Vì vậy không đưa số đó vào so sánh trên slide. Mô tả “giữ nguyên siêu tham số” cho đánh giá bổ sung và batch size được ghi ở các phần cũng chưa hoàn toàn rõ; không trình bày cấu hình tái lập hoặc kết luận thống kê tương đương giữa LR và DistilRoBERTa.

### Liên hệ Big Data

Kết quả bị giới hạn bởi tweet tiếng Anh, chủ đề, cách chọn/gán nhãn và thiết lập thử nghiệm. Bài báo không chứng minh hiệu quả trên tiếng Việt, tài liệu doanh nghiệp dài hoặc workload Big Data phân tán. Triển khai cần dữ liệu đại diện, đo lỗi theo miền/ngôn ngữ và chi phí/độ trễ với tải thật; không ngoại suy runtime thí nghiệm thành năng lực cluster.

Trong kiến trúc DLP, detector classification có thể được gọi trong pipeline, dịch vụ hoặc tại điểm tích hợp phù hợp. Dự đoán lớp là tín hiệu cho policy. Muốn ghi thành label quản trị cần ánh xạ được thiết kế, xử lý bất định và rà soát khi cần. Policy xét thêm người thực hiện, hành động và đích; enforcement do điểm thực thi áp dụng. Classification không tự chặn chia sẻ hoặc export. Đây là AI hỗ trợ phát hiện của Phần 3; DLP bảo vệ prompt/response GenAI là chủ đề khác ở Phần 5.

### Ví dụ

Ví dụ hư cấu của seminar: “Nhà An ở số 12 đường X. Gia đình thường vắng nhà từ 8 giờ đến 17 giờ.” Địa chỉ gắn với cá nhân và lịch vắng nhà có thể tăng rủi ro riêng tư/an toàn. Đây không phải mẫu đã đánh giá, lớp dự đoán hay kết quả từ bài báo. Ví dụ không đặt ra quy tắc rằng địa chỉ trong quảng cáo bất động sản luôn vô hại.

Demo seminar dùng Multinomial Naive Bayes nhỏ với mười câu tiếng Việt tổng hợp, năm câu nhạy cảm về sức khỏe và năm câu còn lại, theo `demo/src/dlp_demo/context_model.py`. Nó minh họa bộ phân loại trong luồng DLP, không tái tạo nghiên cứu trên tweet tiếng Anh hoặc chứng minh chất lượng triển khai. Không có dự đoán demo nào được gán cho câu “Nhà An…” ở đây.

### Nguồn tham khảo

Qawara, H. M., & Alhindi, H. (2026). “Detecting Context-Dependent Sensitive Data in Unstructured Text.” *Information, 17*(7), 663. [DOI](https://doi.org/10.3390/info17070663); [publisher](https://www.mdpi.com/2078-2489/17/7/663); [full-text PDF](https://mdpi-res.com/d_attachment/information/information-17-00663/article_deploy/information-17-00663.pdf). Phạm vi dữ liệu/phương pháp: mục 3.1–3.6; kết quả: Bảng 5–10; giới hạn đánh giá: mục 4.2, phần thảo luận và Bảng 11. Sơ đồ trên slide là diễn giải phương pháp để phân biệt huấn luyện và đánh giá, không sao chép hình nghiên cứu.
-->
