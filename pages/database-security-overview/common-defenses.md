---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Mô hình phòng thủ chiều sâu (Defense-in-Depth)

Triển khai nhiều lớp kiểm soát tương ứng nhằm bao quát và vô hiệu hóa từng loại nguy cơ.{.op-60}

<div class="defenses mt-5">
  <div v-click="1">
    <strong>Access Control & Least Privilege</strong>
    <small>Chỉ cấp đúng quyền tối thiểu cần thiết — chặn trực tiếp <em class="threat-tag">Privilege abuse</em> và giới hạn thiệt hại từ <em class="threat-tag">Insider threat</em>.</small>
  </div>
  <div v-click="2">
    <strong>Input Validation & Parameterization</strong>
    <small>Kiểm tra và làm sạch dữ liệu đầu vào trước khi thực thi truy vấn — triệt tiêu <em class="threat-tag">SQL Injection</em> ngay từ gốc.</small>
  </div>
  <div v-click="3">
    <strong>Auditing & Monitoring</strong>
    <small>Ghi log và giám sát hành vi bất thường theo thời gian thực — phát hiện sớm các dấu hiệu <em class="threat-tag">Insider threat</em>.</small>
  </div>
  <div v-click="4">
    <strong>Backup & Disaster Recovery</strong>
    <small>Sao lưu định kỳ và cô lập bản sao an toàn — đảm bảo khôi phục dữ liệu nguyên vẹn khi xảy ra <em class="threat-tag">Ransomware</em>.</small>
  </div>
</div>

<div v-click="5" class="callout-box emerald mt-4">
  <div class="callout-icon emerald">
    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  </div>
  <div class="callout-text text-sm">
    <strong class="text-emerald-300 font-bold">Nguyên tắc Defense-in-Depth:</strong> Không có giải pháp đơn lẻ nào bảo vệ toàn diện — <b class="text-white font-bold">chỉ khi phối hợp đa tầng</b> (phân quyền, mã hóa, giám sát, sao lưu), CSDL mới được bảo vệ an toàn trước mọi rủi ro.
  </div>
</div>

<style scoped>
.defenses {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(0.45rem, 1.1vw, 0.75rem);
  margin-top: 0.55rem;
}

.defenses > div {
  padding: clamp(0.45rem, 1vh, 0.7rem) clamp(0.65rem, 1.2vw, 0.95rem);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-left-width: 3.5px;
  border-left-color: #2efab0;
  border-radius: 0.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.defenses strong {
  display: block;
  font-size: clamp(0.82rem, 1.1vw, 0.92rem);
  color: #2efab0;
  font-weight: 700;
  line-height: 1.25;
  margin-bottom: 0.2rem;
}

.defenses small {
  display: block;
  color: #e2e8f0;
  font-size: clamp(0.7rem, 0.92vw, 0.76rem);
  line-height: 1.36;
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
  gap: 0.7rem;
  padding: clamp(0.35rem, 0.8vh, 0.55rem) clamp(0.65rem, 1.2vw, 0.95rem);
  border-radius: 0.65rem;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  margin-top: 0.55rem !important;
}

.callout-box.emerald {
  background: linear-gradient(90deg, rgba(16, 185, 129, 0.16) 0%, rgba(16, 185, 129, 0.06) 100%);
  border: 1.5px solid rgba(52, 211, 153, 0.45);
  box-shadow: 0 0 16px rgba(16, 185, 129, 0.1);
}

.callout-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem;
  border-radius: 0.45rem;
  flex-shrink: 0;
}

.callout-icon.emerald {
  background: rgba(16, 185, 129, 0.25);
  color: #34d399;
  border: 1px solid rgba(52, 211, 153, 0.5);
}

.callout-text {
  color: #d1fae5;
  font-size: clamp(0.72rem, 1vw, 0.78rem);
  line-height: 1.38;
  text-align: justify;
}
</style>
