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
    <div class="app-item"><strong>DLP trong Zero Trust / SASE</strong><span>Policy theo danh tính + nội dung, thực thi ở edge: Purview + Entra Global Secure Access (preview); Cloudflare One Gateway. Nguồn: Microsoft Learn, Cloudflare Docs.</span></div>
  </article>

  <article v-click="3" class="app-card app-card--trend">
    <div class="app-category">XU HƯỚNG 2024-2026</div>
    <div class="app-item"><strong>DLP cho AI tạo sinh (GenAI)</strong><span>Purview DLP (preview) bảo vệ prompt gửi Microsoft 365 Copilot; policy mặc định chỉ ghi log ở chế độ mô phỏng, phải bật enforce mới chặn.</span></div>
    <div class="app-item"><strong>Bảo vệ prompt và phản hồi AI</strong><span>Google Model Armor + Sensitive Data Protection lọc dữ liệu nhạy cảm trong prompt và phản hồi; có chế độ chỉ ghi log hoặc chặn.</span></div>
    <div class="app-item"><strong>AI hỗ trợ phát hiện</strong><span>De Renzis (2024): LLM sinh dữ liệu tổng hợp huấn luyện bộ phát hiện (tiếng Ý; NER F1 &gt; 90% mức tài liệu, 50 tài liệu tổng hợp). Qawara &amp; Alhindi (2026): 3.083 tweet tiếng Anh; LR (accuracy 0,88) ngang DistilRoBERTa.</span></div>
  </article>
</div>

<div v-click="4" class="app-takeaway">Xu hướng: từ “quét file” sang bảo vệ luồng dữ liệu, kể cả prompt AI.</div>


<style scoped>
:deep(h1) {
  margin-top: 0 !important;
  margin-bottom: 6px !important;
  font-size: 27px !important;
  line-height: 1.2 !important;
}
.app-body { margin-top: 8px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; align-items: stretch; }
.app-card { display: flex; flex-direction: column; gap: 6px; padding: 10px 14px 12px; border: 1px solid; border-radius: 12px; color: #18334f; }
.app-card--real { background: #fffbeb; border-color: #f3d9a4; }
.app-card--trend { background: #f6f3ff; border-color: #d8c9f5; }
.app-category { font-size: 10.5px; font-weight: 800; letter-spacing: .08em; line-height: 1.2; }
.app-card--real .app-category { color: #b45309; }
.app-card--trend .app-category { color: #7651a8; }
.app-item { padding: 5.5px 9px 6.5px; border: 1px solid #dbe5ee; border-radius: 8px; background: #f8fafc; }
.app-item strong { display: block; font-size: 13px; line-height: 1.2; color: #142d49; }
.app-item span { display: block; margin-top: 2px; font-size: 11.2px; line-height: 1.28; color: #53677c; }
.app-takeaway { margin-top: 8px; color: #0e6175; font-size: 15px; font-weight: 700; line-height: 1.2; text-align: center; }
</style>

<!--
Mục tiêu: điểm nhanh những gì đã có trong thực tế và xu hướng mới. Nói sơ qua.

[click:2]
Ba dịch vụ đám mây này nhóm em đã trình bày ở phần trước nên chỉ nhắc nhanh: Macie, Purview DLP và Sensitive Data Protection cho thấy DLP đã đi vào hạ tầng dữ liệu.
Mỗi dịch vụ có phạm vi riêng, và phát hiện được chưa có nghĩa là chặn được mọi đường ra.
Ngoài ra, hướng đi mới là đưa DLP vào kiến trúc Zero Trust và SASE: policy xét cả danh tính lẫn nội dung, và thực thi ở edge. Ví dụ Microsoft Purview kết hợp Entra Global Secure Access, và Cloudflare One có Gateway DLP. Đây là tài liệu của vendor; nhóm em chưa thấy nghiên cứu học thuật riêng cho hướng này. Prototype của nhóm em chỉ có một điểm chặn, chưa phải kiến trúc Zero Trust hay SASE.

[click:3]
Xu hướng mới là DLP cho AI tạo sinh.
Theo tài liệu Microsoft Learn, Purview có thể kiểm tra prompt gửi Microsoft 365 Copilot, nhưng policy mặc định chỉ ghi log ở chế độ mô phỏng; muốn chặn thật phải bật enforce.
Google kết hợp Model Armor với Sensitive Data Protection để lọc prompt và phản hồi, với hai chế độ: chỉ kiểm tra, hoặc kiểm tra và chặn.

Về nghiên cứu, De Renzis năm 2024 dùng LLM sinh dữ liệu tổng hợp tiếng Ý để huấn luyện bộ phát hiện; mô hình NER đạt F1 trên 90% ở mức tài liệu, đo trên 50 tài liệu kiểm thử tổng hợp.
Qawara và Alhindi năm 2026 dùng 3.083 tweet tiếng Anh về chính trị và sắc tộc; hồi quy logistic đạt accuracy 0,88, ngang DistilRoBERTa và không khác biệt có ý nghĩa thống kê.
Cả hai chưa được kiểm chứng trên tiếng Việt hay Big Data.

[click:4]
Tóm lại, nhóm em nhận thấy xu hướng là chuyển từ quét file sang bảo vệ cả luồng dữ liệu, kể cả prompt gửi cho AI.
Xin mời thầy cô và các bạn đến phần kết luận.

(Nếu cần rút gọn: bỏ câu Google và câu Qawara; giữ Purview Copilot, De Renzis và câu "chưa được kiểm chứng trên tiếng Việt hay Big Data".)

Kiểm tra lại trước khi trình bày (đã kiểm tra 2026-09-29):
- Microsoft Learn, policy mặc định cho Copilot: https://learn.microsoft.com/en-us/purview/dlp-microsoft365-copilot-location-default-policy
- Microsoft Learn, DLP cho Fabric / Power BI: https://learn.microsoft.com/purview/dlp-powerbi-get-started
- Google Model Armor: https://docs.cloud.google.com/model-armor/overview
- AWS Macie: https://docs.aws.amazon.com/macie/latest/userguide/
- Microsoft Learn, Global Secure Access + Purview (preview hay GA, kiểm lại): https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-network-content-filtering
- Microsoft Learn, Purview Network Data Security: https://learn.microsoft.com/en-us/purview/dlp-network-data-security-learn
- Cloudflare One, DLP policies: https://developers.cloudflare.com/cloudflare-one/policies/data-loss-prevention/dlp-policies/
- Nếu hỏi về khung chính phủ (chưa mở PDF để xác nhận chữ "DLP"): CISA Zero Trust Maturity Model 2.0 https://www.cisa.gov/zero-trust-maturity-model ; NSA, Data Pillar https://media.defense.gov/2024/Apr/09/2003434442/-1/-1/0/CSI_DATA_PILLAR_ZT.PDF
- De Renzis et al. (2024): https://research.unipd.it/handle/11577/3524608
- Qawara & Alhindi (2026): https://doi.org/10.3390/info17070663
-->
