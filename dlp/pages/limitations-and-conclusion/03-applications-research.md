---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Ứng dụng và xu hướng

<div class="app-body">
  <article v-click="2" class="app-card app-card--real">
    <div class="app-category">ĐÃ CÓ TRONG THỰC TẾ</div>
    <div class="app-item"><strong>Amazon Macie</strong><span>Khám phá dữ liệu nhạy cảm trong Amazon S3, tạo findings.</span></div>
    <div class="app-item"><strong>Purview DLP</strong><span>Policy tips, cảnh báo; hạn chế truy cập (preview) - áp dụng cho Fabric / Power BI.</span></div>
    <div class="app-item"><strong>Sensitive Data Protection</strong><span>Kiểm tra và khử định danh (de-identify) dữ liệu - trên Google Cloud.</span></div>
  </article>

  <article v-click="3" class="app-card app-card--trend">
    <div class="app-category">XU HƯỚNG 2025-2026</div>
    <div class="app-item"><strong>DLP cho AI tạo sinh (GenAI)</strong><span>Purview DLP (preview) bảo vệ prompt gửi Microsoft 365 Copilot; policy mặc định chỉ ghi log ở chế độ mô phỏng, phải bật enforce mới chặn.</span></div>
    <div class="app-item"><strong>Bảo vệ prompt và phản hồi AI</strong><span>Google Model Armor + Sensitive Data Protection lọc dữ liệu nhạy cảm trong prompt và phản hồi; có chế độ chỉ ghi log hoặc chặn.</span></div>
    <div class="app-item"><strong>AI hỗ trợ phát hiện</strong><span>De Renzis (2024): LLM sinh dữ liệu tổng hợp để huấn luyện bộ phát hiện (tiếng Ý, F1 &gt; 90%). Qawara &amp; Alhindi (2026): 3.083 tweet tiếng Anh; mô hình đơn giản (LR) ngang DistilRoBERTa.</span></div>
  </article>
</div>

<div v-click="4" class="app-takeaway">Xu hướng: từ “quét tệp” sang bảo vệ luồng dữ liệu, kể cả prompt AI.</div>


<style scoped>
.app-body { margin-top: 12px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; align-items: stretch; }
.app-card { display: flex; flex-direction: column; gap: 8px; padding: 14px 16px 16px; border: 1px solid; border-radius: 13px; color: #18334f; }
.app-card--real { background: #fffbeb; border-color: #f3d9a4; }
.app-card--trend { background: #f6f3ff; border-color: #d8c9f5; }
.app-category { font-size: 11px; font-weight: 800; letter-spacing: .08em; line-height: 1.2; }
.app-card--real .app-category { color: #b45309; }
.app-card--trend .app-category { color: #7651a8; }
.app-item { padding: 8px 10px 9px; border: 1px solid #dbe5ee; border-radius: 9px; background: #f8fafc; }
.app-item strong { display: block; font-size: 14px; line-height: 1.2; color: #142d49; }
.app-item span { display: block; margin-top: 4px; font-size: 12px; line-height: 1.3; color: #53677c; }
.app-takeaway { margin-top: 12px; color: #0e6175; font-size: 16px; font-weight: 700; line-height: 1.2; text-align: center; }
</style>

<!--
Mục tiêu: điểm nhanh những gì đã có trong thực tế và xu hướng mới. Nói sơ qua, khoảng 40 giây.

[click:2]
Ba dịch vụ này nhóm em đã trình bày ở phần trước, nên chỉ nhắc nhanh.
Macie, Purview và Sensitive Data Protection cho thấy DLP đã đi vào hạ tầng dữ liệu.
Mỗi dịch vụ có một phạm vi riêng. Phát hiện được dữ liệu nhạy cảm chưa có nghĩa là chặn được mọi đường dữ liệu đi ra.

[click:3]
Xu hướng mới là DLP cho AI tạo sinh.
Purview có thể kiểm tra prompt gửi cho Copilot, nhưng policy mặc định hiện chỉ ghi log ở chế độ mô phỏng; muốn chặn thật phải bật chế độ enforce.
Google kết hợp Model Armor với Sensitive Data Protection để lọc dữ liệu nhạy cảm trong cả prompt lẫn phản hồi.
Về nghiên cứu, AI được dùng để hỗ trợ phát hiện. Nhưng thí nghiệm của Qawara và Alhindi chỉ dùng hơn 3 nghìn tweet tiếng Anh, và mô hình đơn giản vẫn ngang mô hình transformer. Cần đánh giá lại trên dữ liệu tiếng Việt và Big Data.

[click:4]
Tóm lại, xu hướng là chuyển từ quét tệp sang bảo vệ cả luồng dữ liệu, kể cả prompt gửi cho AI.
Xin mời thầy cô và các bạn cùng đến phần tổng kết.

Kiểm tra lại trước khi trình bày (đã kiểm tra 2026-09-29):
- Microsoft Learn, policy mặc định cho Copilot: https://learn.microsoft.com/en-us/purview/dlp-microsoft365-copilot-location-default-policy
- Microsoft Learn, DLP cho Fabric / Power BI: https://learn.microsoft.com/purview/dlp-powerbi-get-started
- Google Model Armor: https://docs.cloud.google.com/model-armor/overview
- AWS Macie: https://docs.aws.amazon.com/macie/latest/userguide/
- De Renzis et al. (2024): https://research.unipd.it/handle/11577/3524608
- Qawara & Alhindi (2026): https://doi.org/10.3390/info17070663
-->
