---
layout: default
hideInToc: true
transition: slide-left
---

<div class="slide-container">

<div class="slide-header">
  <h1 class="slide-title">MÔ HÌNH PHÒNG THỦ CHIỀU SÂU (DEFENSE-IN-DEPTH)</h1>
  <p class="slide-subtitle">
    Triển khai nhiều lớp kiểm soát tương ứng nhằm bao quát và vô hiệu hóa từng loại nguy cơ.
  </p>
</div>

<div class="defenses">
  <div v-click>
    <strong>Access Control & Least Privilege</strong>
    <small>Chỉ cấp đúng quyền tối thiểu cần thiết — chặn trực tiếp <em class="threat-tag">Privilege abuse</em> và giới hạn thiệt hại từ <em class="threat-tag">Insider threat</em>.</small>
  </div>
  <div v-click>
    <strong>Input Validation & Parameterization</strong>
    <small>Kiểm tra và khử khuẩn dữ liệu đầu vào trước khi thực thi truy vấn — triệt tiêu <em class="threat-tag">SQL Injection</em> ngay từ gốc.</small>
  </div>
  <div v-click>
    <strong>Auditing & Monitoring</strong>
    <small>Ghi log và giám sát hành vi bất thường theo thời gian thực — phát hiện sớm các dấu hiệu <em class="threat-tag">Insider threat</em>.</small>
  </div>
  <div v-click>
    <strong>Backup & Disaster Recovery</strong>
    <small>Sao lưu định kỳ và cô lập bản sao an toàn — đảm bảo khôi phục dữ liệu nguyên vẹn khi xảy ra <em class="threat-tag">Ransomware</em>.</small>
  </div>
</div>

<div v-click class="callout-box emerald">
  <div class="callout-icon emerald">
    <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  </div>
  <div class="callout-text">
    <strong class="text-emerald-300 font-bold">Nguyên tắc Defense-in-Depth:</strong> Không có một giải pháp đơn lẻ nào bảo vệ toàn diện hệ thống — <b class="text-white font-bold">CHỈ KHI PHỐI HỢP ĐA TẦNG</b> (phân quyền, mã hóa, giám sát, sao lưu), cơ sở dữ liệu mới được bảo vệ an toàn trước mọi rủi ro.
  </div>
</div>

</div>

<style scoped>
.slide-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0.5rem 0.25rem 0.5rem;
  justify-content: flex-start;
}

.slide-header {
  margin-bottom: 1.25rem;
}

.slide-title {
  font-size: 2.1rem;
  font-weight: 800;
  color: #38edf6;
  letter-spacing: 0.03em;
  line-height: 1.2;
  margin: 0;
  text-transform: uppercase;
}

.slide-subtitle {
  font-size: 1.05rem;
  line-height: 1.65;
  color: #c7f8ff;
  opacity: 0.95;
  margin-top: 0.85rem;
  margin-bottom: 0;
  text-align: justify;
}

.defenses {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.defenses > div {
  padding: 1.25rem 1.2rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-left-width: 5px;
  border-left-color: #2efab0;
  border-radius: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.defenses strong {
  display: block;
  font-size: 1.15rem;
  color: #2efab0;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 0.5rem;
}

.defenses small {
  display: block;
  color: #e2e8f0;
  font-size: 0.93rem;
  line-height: 1.65;
  opacity: 0.95;
  text-align: justify;
}

.threat-tag {
  color: #fca5a5;
  font-style: normal;
  font-weight: 600;
}

.callout-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.35rem;
  padding: 0.95rem 1.25rem;
  border-radius: 0.85rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(10px);
}

.callout-box.emerald {
  background: linear-gradient(90deg, rgba(16, 185, 129, 0.16) 0%, rgba(16, 185, 129, 0.06) 100%);
  border: 1.5px solid rgba(52, 211, 153, 0.45);
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.12);
}

.callout-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  border-radius: 0.6rem;
  flex-shrink: 0;
}

.callout-icon.emerald {
  background: rgba(16, 185, 129, 0.25);
  color: #34d399;
  border: 1px solid rgba(52, 211, 153, 0.5);
}

.callout-text {
  font-size: 0.95rem;
  color: #d1fae5;
  line-height: 1.65;
  text-align: justify;
}
</style>
