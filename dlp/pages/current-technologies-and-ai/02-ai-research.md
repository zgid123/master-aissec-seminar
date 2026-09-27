---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# AI hỗ trợ DLP ở đâu?

<div class="ai-research-body">
  <div class="ai-research-cards">
    <article class="ai-research-card ai-research-card--training">
      <div class="ai-research-category">HỖ TRỢ HUẤN LUYỆN</div>
      <h2>Tạo dữ liệu tổng hợp</h2>
      <p>LLM tạo văn bản tiếng Ý để huấn luyện mô hình phát hiện dữ liệu nhạy cảm.</p>
      <div class="ai-research-sequence">LLM <span>→</span> Văn bản tổng hợp <span>→</span> Huấn luyện bộ phát hiện</div>
      <div class="ai-research-source">De Renzis, Dosso &amp; Testolin · 2024 <sup>[1]</sup></div>
    </article>
    <article class="ai-research-card ai-research-card--detection">
      <div class="ai-research-category">HỖ TRỢ PHÁT HIỆN</div>
      <h2>Nhận diện theo ngữ cảnh</h2>
      <p>Nhận diện thông tin nhạy cảm phụ thuộc ngữ cảnh trong văn bản phi cấu trúc.</p>
      <div class="ai-research-support">Trọng tâm: nội dung nhạy cảm trong ngữ cảnh sử dụng.</div>
      <div class="ai-research-source">Qawara &amp; Alhindi · 2026 <sup>[2]</sup></div>
    </article>
  </div>

  <div class="ai-integration">
    <div class="ai-integration-label">Minh họa tích hợp trong DLP</div>
    <div class="ai-integration-flow">
      <div class="ai-integration-stage"><strong>Bộ phát hiện</strong><small>Quy tắc / AI</small></div>
      <span class="ai-integration-arrow">→</span>
      <div class="ai-integration-stage"><strong>Kết quả phát hiện</strong><small>Nhãn, vị trí hoặc điểm số</small></div>
      <span class="ai-integration-arrow">→</span>
      <div class="ai-integration-stage"><strong>Xét policy</strong><small>Người thực hiện · hành động · đích</small></div>
      <span class="ai-integration-arrow">→</span>
      <div class="ai-integration-stage"><strong>Điểm thực thi</strong><small>Áp dụng quyết định</small></div>
    </div>
  </div>

  <div class="ai-evaluation">Cần đánh giá lại trên dữ liệu đích: báo nhầm, bỏ sót và độ trễ.</div>
</div>

<style scoped>
.ai-research-body { margin-top: 8px; color: #18334f; }
.ai-research-cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.ai-research-card { min-height: 207px; padding: 17px 19px 14px; border: 1px solid; border-radius: 13px; display: flex; flex-direction: column; }
.ai-research-card--training { background: #effbfc; border-color: #a7e3e8; }
.ai-research-card--detection { background: #f6f3ff; border-color: #d8c9f5; }
.ai-research-category { font-size: 11px; font-weight: 800; letter-spacing: .08em; line-height: 1.2; }
.ai-research-card--training .ai-research-category { color: #0e7490; }
.ai-research-card--detection .ai-research-category { color: #7651a8; }
.ai-research-card h2 { margin: 9px 0 7px; font-size: 22px; font-weight: 750; line-height: 1.14; color: #142d49; }
.ai-research-card p { margin: 0; font-size: 14px; line-height: 1.34; }
.ai-research-sequence, .ai-research-support { margin-top: 11px; font-size: 12px; font-weight: 650; line-height: 1.28; }
.ai-research-sequence span { padding: 0 3px; color: #0891b2; }
.ai-research-source { margin-top: auto; padding-top: 12px; font-size: 11px; color: #53677c; }
.ai-research-source sup { font-size: 10px; font-weight: 700; }
.ai-integration { margin-top: 16px; }
.ai-integration-label { margin-bottom: 8px; color: #415a72; font-size: 11px; font-weight: 800; letter-spacing: .045em; }
.ai-integration-flow { display: grid; grid-template-columns: 1fr 19px 1.13fr 19px 1.23fr 19px 1fr; align-items: center; gap: 4px; }
.ai-integration-stage { min-height: 62px; padding: 9px 8px; border: 1px solid #dbe5ee; border-radius: 9px; background: #f8fafc; text-align: center; }
.ai-integration-stage strong { display: block; font-size: 12px; line-height: 1.2; color: #18334f; }
.ai-integration-stage small { display: block; margin-top: 5px; font-size: 10px; line-height: 1.2; color: #53677c; }
.ai-integration-arrow { color: #8296aa; font-size: 20px; text-align: center; }
.ai-evaluation { margin-top: 15px; padding-left: 10px; border-left: 3px solid #0ea5e9; color: #1c5068; font-size: 12px; font-weight: 650; line-height: 1.3; }
</style>

<!--
- AI có thể hỗ trợ cả việc chuẩn bị dữ liệu huấn luyện và việc phát hiện nội dung nhạy cảm.
- De Renzis và cộng sự dùng LLM tạo văn bản tổng hợp tiếng Ý để huấn luyện bộ phát hiện; LLM tạo dữ liệu không đồng nghĩa với thành phần trực tiếp chặn xuất.
- Qawara và Alhindi nghiên cứu phát hiện dữ liệu nhạy cảm phụ thuộc ngữ cảnh trong văn bản phi cấu trúc.
- Hai nghiên cứu minh họa những đóng góp khác nhau; không phải hai bước của cùng một hệ thống đã được kiểm chứng.
- Luồng phía dưới là minh họa tích hợp: kết quả phát hiện được dùng khi xét policy, rồi quyết định được áp dụng tại điểm thực thi. Tùy bộ phát hiện, kết quả có thể là nhãn, vị trí hoặc điểm số.
- Khi chuyển sang dữ liệu tiếng Việt hoặc triển khai trong Big Data, cần đánh giá lại báo nhầm, bỏ sót, độ trễ và khả năng mở rộng.
- Không suy diễn kết quả phát hiện thành bằng chứng về hiệu quả chặn rò rỉ đầu cuối.

Nguồn:
[1] https://www.research.unipd.it/handle/11577/3524608
[2] https://www.mdpi.com/2078-2489/17/7/663
-->
