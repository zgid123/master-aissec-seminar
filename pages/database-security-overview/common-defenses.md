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
    <small>Kiểm tra và khử khuẩn dữ liệu đầu vào trước khi thực thi truy vấn — triệt tiêu <em class="threat-tag">SQL Injection</em> ngay từ gốc.</small>
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
  gap: 1.15rem;
}

.defenses > div {
  padding: 1.05rem 1.15rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-left-width: 4px;
  border-left-color: #2efab0;
  border-radius: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.defenses strong {
  display: block;
  font-size: 1.05rem;
  color: #2efab0;
  font-weight: 700;
  line-height: 1.35;
  margin-bottom: 0.35rem;
}

.defenses small {
  display: block;
  color: #e2e8f0;
  font-size: 0.86rem;
  line-height: 1.5;
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
  gap: 0.85rem;
  padding: 0.75rem 1.15rem;
  border-radius: 0.75rem;
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
  padding: 0.5rem;
  border-radius: 0.5rem;
  flex-shrink: 0;
}

.callout-icon.emerald {
  background: rgba(16, 185, 129, 0.25);
  color: #34d399;
  border: 1px solid rgba(52, 211, 153, 0.5);
}

.callout-text {
  color: #d1fae5;
  line-height: 1.55;
  text-align: justify;
}
</style>
