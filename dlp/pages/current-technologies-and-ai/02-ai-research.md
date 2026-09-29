---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# <span class="ai-page-title">Phát hiện dữ liệu nhạy cảm theo ngữ cảnh bằng AI</span>

<div class="ai-worked-example">
  <section class="ai-input-card">
    <div class="ai-kicker">Ví dụ giả định</div>
    <blockquote>“Nhà An ở số 12 đường X. Gia đình thường vắng nhà từ 8 giờ đến 17 giờ.”</blockquote>
    <div class="ai-context">
      <strong>Quan hệ ngữ cảnh:</strong> địa chỉ gắn với An và lịch vắng nhà có thể làm tăng rủi ro an toàn cá nhân.
    </div>
    <div class="ai-ambiguity"><strong>Ngữ cảnh khác nhau:</strong> cùng một địa chỉ có thể xuất hiện trong quảng cáo bất động sản.</div>
  </section>

  <section class="ai-model-card">
    <div class="ai-kicker">CƠ CHẾ</div>
    <h2>Phân loại toàn văn bản</h2>
    <p>Học từ văn bản đã gán nhãn; dự đoán nhãn cho toàn văn bản mới.</p>
    <div class="ai-output-label">Label có thể có</div>
    <div class="ai-output-options"><span>0 · Không nhạy cảm</span><span>1 · Nhạy cảm</span></div>
  </section>
</div>

<div class="ai-evaluation">
  <strong>Đánh giá:</strong>
  <span>Báo nhầm</span><b>·</b><span>Bỏ sót</span><b>·</b><span>Độ trễ</span>
</div>

<style scoped>
.ai-page-title { display: inline-block; max-width: 100%; font-size: 33px; line-height: 1.08; }
.ai-worked-example { display: grid; grid-template-columns: 1.15fr 1fr; gap: 16px; margin-top: 10px; color: #18334f; }
.ai-input-card, .ai-model-card { min-height: 306px; padding: 19px 21px 17px; border: 1px solid; border-radius: 13px; }
.ai-input-card { background: #effbfc; border-color: #a7e3e8; }
.ai-model-card { background: #f6f3ff; border-color: #d8c9f5; }
.ai-kicker { color: #526b82; font-size: 11px; font-weight: 800; letter-spacing: .055em; line-height: 1.25; }
.ai-input-card .ai-kicker { color: #0e7490; }
.ai-model-card .ai-kicker { color: #7651a8; }
.ai-input-card blockquote { margin: 18px 0 15px; padding: 0 0 0 14px; border-left: 3px solid #18a3b8; color: #142d49; font-size: 20px; font-weight: 650; line-height: 1.42; }
.ai-context { padding: 11px 12px; border-radius: 8px; background: #fff; color: #334b63; font-size: 14px; line-height: 1.38; }
.ai-context strong, .ai-ambiguity strong { color: #18334f; }
.ai-ambiguity { margin-top: 13px; color: #52677b; font-size: 13px; line-height: 1.35; }
.ai-model-card h2 { margin: 14px 0 9px; color: #142d49; font-size: 23px; font-weight: 750; line-height: 1.16; }
.ai-model-card p { margin: 0; color: #334b63; font-size: 15px; line-height: 1.4; }
.ai-output-label { margin-top: 17px; color: #52677b; font-size: 11px; font-weight: 800; letter-spacing: .045em; text-transform: uppercase; }
.ai-output-options { display: flex; gap: 8px; margin-top: 7px; }
.ai-output-options span { flex: 1; padding: 8px 7px; border: 1px solid #d8c9f5; border-radius: 7px; background: #fff; color: #5b3aa2; font-size: 12px; font-weight: 700; line-height: 1.25; text-align: center; }
.ai-study-scope { margin-top: 12px; color: #64788c; font-size: 12px; line-height: 1.3; }
.ai-evaluation { margin: 12px auto 0; padding: 10px 13px; border-left: 4px solid #0ea5e9; border-radius: 5px; background: #f0f9ff; color: #1c5068; font-size: 14px; line-height: 1.3; text-align: center; }
.ai-evaluation strong { margin-right: 8px; }
.ai-evaluation b { margin: 0 8px; color: #8296aa; }
.ai-source { margin-top: 8px; color: #64788c; font-size: 11px; line-height: 1.25; text-align: center; }
.ai-source a { color: inherit; text-decoration: underline; text-decoration-color: #9badbb; text-underline-offset: 2px; }
</style>

<!--
**Vì sao cần ngữ cảnh.** Một chuỗi hoặc danh mục đơn lẻ không phải lúc nào cũng cho biết mức độ nhạy cảm. Câu giả định “Nhà An ở số 12 đường X. Gia đình thường vắng nhà từ 8 giờ đến 17 giờ” liên hệ một địa chỉ với một cá nhân và lịch vắng nhà; công khai sự kết hợp này có thể tạo rủi ro riêng tư và an toàn. Đây là ví dụ hư cấu để minh họa rủi ro phụ thuộc ngữ cảnh. Ví dụ chưa được đánh giá bằng mô hình trong bài báo được trích dẫn và không phải kết quả thực nghiệm được chứng minh trong nghiên cứu. Không có label dự đoán hay điểm số nào được gán cho câu này.

**Cơ chế phân loại.** AI/ML (Artificial Intelligence/Machine Learning, trí tuệ nhân tạo/học máy) có thể học từ văn bản đã gán nhãn rồi dự đoán label cho toàn văn bản mới. Trong slide, “không nhạy cảm” và “nhạy cảm” chỉ là các nhóm label đầu ra có thể có; chúng không phải dự đoán cho ví dụ về An. Phân loại toàn văn bản cũng khác với việc xác định chính xác đoạn hoặc vị trí của thông tin nhạy cảm.

**Nghiên cứu được chọn.** Qawara và Alhindi (2026) nghiên cứu bài toán phân loại tweet tiếng Anh theo độ nhạy cảm phụ thuộc ngữ cảnh, tập trung vào chủ đề chính trị và sắc tộc/chủng tộc. Đây là miền nghiên cứu được mô tả trong bài báo, không phải thử nghiệm về địa chỉ nhà ở hoặc lịch sinh hoạt. Bài báo không đánh giá ví dụ hư cấu trên slide, nên không thể dùng làm bằng chứng thực nghiệm cho khả năng phát hiện rủi ro riêng tư liên quan nơi ở.

**Giới hạn và đánh giá.** Kết quả trên tweet chính trị và sắc tộc/chủng tộc không bảo đảm chuyển sang tiếng Việt, văn bản sức khỏe, tài liệu nội bộ hoặc pipeline Big Data khác. Ngữ cảnh mơ hồ có thể làm mô hình nhầm địa chỉ được nêu trong quảng cáo với địa chỉ gắn cùng một cá nhân và lịch vắng nhà; quảng cáo bất động sản không tự động đồng nghĩa với nội dung không nhạy cảm. Tương tự, câu phủ định về tình trạng sức khỏe vẫn có thể tiết lộ thông tin sức khỏe cá nhân. Trước khi dùng trong luồng kiểm soát, cần đánh giá báo nhầm, bỏ sót và độ trễ trên dữ liệu mục tiêu, với label được rà soát và tiêu chí phù hợp với hậu quả của từng lỗi.

**Phân biệt với demo.** Bài báo và demo seminar là hai nội dung riêng. Demo dùng một Multinomial Naive Bayes nhỏ trên các câu tiếng Việt tổng hợp về thông tin sức khỏe; mã nguồn cho thấy tập minh họa chỉ có mười câu. Đây là mô hình và tập dữ liệu khác với nghiên cứu trên tweet tiếng Anh. Demo chỉ minh họa vị trí của bộ phân loại trong luồng, không tái tạo nghiên cứu hoặc chứng minh chất lượng triển khai.

Một hướng nghiên cứu bổ trợ là tạo dữ liệu huấn luyện tổng hợp: De Renzis, Dosso và Testolin (2024) sử dụng LLM để sinh văn bản tiếng Ý cho huấn luyện detector dữ liệu nhạy cảm. Đây là công việc hỗ trợ dữ liệu huấn luyện, không phải phương pháp phát hiện được trình bày ở trên. Nguồn: [De Renzis et al. (2024), “Exploiting Large Language Models to Train Automatic Detectors of Sensitive Data”](https://www.research.unipd.it/handle/11577/3524608).

Nguồn kỹ thuật chính: Qawara, H. M., & Alhindi, H. (2026). “Detecting Context-Dependent Sensitive Data in Unstructured Text.” *Information, 17*(7), 663. https://doi.org/10.3390/info17070663.
-->
