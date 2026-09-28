---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Ứng dụng, xu hướng và đề xuất của nhóm

<div class="app-body">
  <article v-click="2" class="app-card app-card--real">
    <div class="app-category">ĐÃ CÓ TRONG THỰC TẾ</div>
    <div class="app-item"><strong>Amazon Macie</strong><span>Khám phá dữ liệu nhạy cảm trong Amazon S3.</span></div>
    <div class="app-item"><strong>Purview DLP</strong><span>Policy tips (nhắc nhở người dùng), hạn chế truy cập - áp dụng cho Fabric / Power BI.</span></div>
    <div class="app-item"><strong>Sensitive Data Protection</strong><span>Kiểm tra và khử định danh (de-identify) dữ liệu - trên Google Cloud.</span></div>
  </article>

  <article v-click="3" class="app-card app-card--trend">
    <div class="app-category">XU HƯỚNG 2025-2026</div>
    <div class="app-item"><strong>DLP cho AI tạo sinh (GenAI)</strong><span>Purview DLP có thể chặn Copilot xử lý prompt chứa dữ liệu nhạy cảm (policy mặc định ở chế độ mô phỏng, chưa chặn).</span></div>
    <div class="app-item"><strong>Bảo vệ prompt và phản hồi AI</strong><span>Google Model Armor + Sensitive Data Protection lọc dữ liệu nhạy cảm trong prompt và phản hồi.</span></div>
    <div class="app-item"><strong>AI hỗ trợ phát hiện</strong><span>De Renzis (2024) - Qawara &amp; Alhindi (2026).</span></div>
  </article>

  <article v-click="4" class="app-card app-card--ours">
    <div class="app-category">ĐỀ XUẤT CỦA NHÓM</div>
    <div class="app-item"><strong>1. Quét + gắn nhãn</strong><span>Cả dữ liệu dẫn xuất (derived data) như <code>customer_segments</code>.</span></div>
    <div class="app-down">↓</div>
    <div class="app-item"><strong>2. Policy</strong><span>Nhãn - người dùng - hành động - đích đến.</span></div>
    <div class="app-down">↓</div>
    <div class="app-item app-item--block"><strong>3. Chặn + ghi log</strong><span>Tại điểm chặn, trước khi dữ liệu rời hệ thống.</span></div>
  </article>
</div>

<div v-click="4" class="app-note">Đề xuất đã được làm thành prototype chạy local trên dữ liệu tổng hợp (xem phần Demo); chưa kiểm chứng trên hệ thống thật.</div>

<div v-click="5" class="app-takeaway">Xu hướng: từ “quét tệp” sang bảo vệ luồng dữ liệu, kể cả prompt AI.</div>

<div class="absolute bottom-2.5 left-12 right-12 text-[11px] text-slate-400">
  Tài liệu sản phẩm kiểm tra ngày 2026-09-28; phạm vi và trạng thái tính năng có thể thay đổi.
</div>

<style scoped>
.app-body { margin-top: 12px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; align-items: stretch; }
.app-card { display: flex; flex-direction: column; gap: 8px; padding: 14px 16px 16px; border: 1px solid; border-radius: 13px; color: #18334f; }
.app-card--real { background: #fffbeb; border-color: #f3d9a4; }
.app-card--trend { background: #f6f3ff; border-color: #d8c9f5; }
.app-card--ours { background: #effbfc; border-color: #a7e3e8; }
.app-category { font-size: 11px; font-weight: 800; letter-spacing: .08em; line-height: 1.2; }
.app-card--real .app-category { color: #b45309; }
.app-card--trend .app-category { color: #7651a8; }
.app-card--ours .app-category { color: #0e7490; }
.app-item { padding: 8px 10px 9px; border: 1px solid #dbe5ee; border-radius: 9px; background: #f8fafc; }
.app-item strong { display: block; font-size: 14px; line-height: 1.2; color: #142d49; }
.app-item span { display: block; margin-top: 4px; font-size: 12px; line-height: 1.3; color: #53677c; }
.app-item code { padding: 0 3px; border-radius: 4px; background: #e0f2fe; color: #075985; font-size: 11px; }
.app-down { color: #8296aa; font-size: 16px; line-height: 1; text-align: center; }
.app-item--block { border-color: #fb7185; background: #fff5f5; }
.app-item--block strong { color: #9f1239; }
.app-note { margin-top: 12px; padding-left: 10px; border-left: 3px solid #f59e0b; color: #92400e; font-size: 12px; font-weight: 650; line-height: 1.3; }
.app-takeaway { margin-top: 10px; color: #0e6175; font-size: 16px; font-weight: 700; line-height: 1.2; text-align: center; }
</style>

<!--
Mục tiêu: điểm lại những gì đã có trong thực tế, xu hướng mới, rồi giới thiệu đề xuất của nhóm.

Thời lượng: khoảng 1 phút 10 giây.

[click:2]
Ba dịch vụ này nhóm em đã trình bày ở phần trước, nên chỉ nhắc nhanh.
Amazon Macie, Microsoft Purview và Google Sensitive Data Protection cho thấy DLP đã đi vào hạ tầng dữ liệu.
Tuy nhiên, mỗi dịch vụ chỉ có một phạm vi riêng.
Và phát hiện được dữ liệu nhạy cảm không có nghĩa là chặn được mọi đường dữ liệu đi ra.

[click:3]
Xu hướng mới là DLP cho AI tạo sinh.
Purview DLP có thể chặn Copilot xử lý những prompt chứa dữ liệu nhạy cảm. Nhưng policy mặc định hiện đang ở chế độ mô phỏng, nghĩa là chưa chặn thật.
Google thì kết hợp Model Armor với Sensitive Data Protection, để lọc dữ liệu nhạy cảm trong cả prompt lẫn phản hồi.
Về nghiên cứu, AI đang được dùng để hỗ trợ phát hiện. Nhưng kết quả cần được đánh giá lại trên dữ liệu tiếng Việt và Big Data.

[click:4]
Từ đó, nhóm em đề xuất ba bước.
Bước một: quét và gắn nhãn, cả với dữ liệu dẫn xuất, ví dụ bảng customer_segments.
Bước hai: xét policy, dựa trên nhãn, người dùng, hành động và đích đến.
Bước ba: chặn và ghi log, tại điểm chặn, trước khi dữ liệu rời hệ thống.
Nhóm em đã làm đề xuất này thành một prototype chạy trên một máy, với dữ liệu tổng hợp. Chưa kiểm chứng trên hệ thống thật. Phần Demo trước đó đã cho thấy prototype này.

[click:5]
Tóm lại, xu hướng là chuyển từ quét tệp sang bảo vệ cả luồng dữ liệu, kể cả prompt gửi cho AI.
Xin mời thầy cô và các bạn cùng đến phần tổng kết.

Kiểm tra lại trước khi trình bày (trạng thái tính năng có thể đổi; đã kiểm tra 2026-09-28):
- Microsoft Learn, policy mặc định cho Copilot: https://learn.microsoft.com/en-us/purview/dlp-microsoft365-copilot-location-default-policy
- Google Model Armor: https://docs.cloud.google.com/model-armor/overview
- De Renzis et al. (2024): https://research.unipd.it/handle/11577/3524608
- Qawara & Alhindi (2026): https://doi.org/10.3390/info17070663
-->
