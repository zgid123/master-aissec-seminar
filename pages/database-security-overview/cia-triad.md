---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Bảo vệ điều gì? Tam giác CIA

[CIA xác định]{.op-60} **chúng ta cần bảo vệ điều gì**: [giữ bí mật dữ liệu nhạy cảm, đảm bảo tính toàn vẹn và duy trì tính sẵn sàng của hệ thống.]{.op-60}

<div class="principles mt-5">
  <div v-click="1">
    <b>C</b>
    <div>
      <strong>Confidentiality</strong>
      <small>Chỉ đúng người mới xem được dữ liệu nhạy cảm - như thư niêm phong, chỉ người nhận mới mở được.</small>
    </div>
  </div>
  <div v-click="2">
    <b>I</b>
    <div>
      <strong>Integrity</strong>
      <small>Dữ liệu luôn chính xác và nguyên vẹn - như bản hợp đồng đã ký kết, không ai có thể tự ý chỉnh sửa hay tẩy xóa.</small>
    </div>
  </div>
  <div v-click="3">
    <b>A</b>
    <div>
      <strong>Availability</strong>
      <small>Hệ thống và dữ liệu luôn sẵn sàng khi cần - như máy ATM, không thể "nghỉ" giữa giờ cao điểm.</small>
    </div>
  </div>
</div>

<div v-click="4" class="callout-box amber mt-4">
  <div class="callout-icon amber">
    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
      <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    </svg>
  </div>
  <div class="callout-text text-sm">
    <strong class="text-amber-300">Nguyên tắc đánh đổi:</strong> Ba mục tiêu này đôi khi <b class="text-white font-bold">đòi hỏi sự đánh đổi</b> - tăng cường tính bí mật (<b class="text-white">Confidentiality</b>) có thể làm tăng độ trễ và ảnh hưởng đến tính sẵn sàng (<b class="text-white">Availability</b>).
  </div>
</div>

<style scoped>
.principles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(0.5rem, 1.2vw, 0.85rem);
  margin-top: 0.6rem;
}

.principles > div {
  display: flex;
  gap: 0.75rem;
  padding: clamp(0.55rem, 1.2vh, 0.85rem) clamp(0.65rem, 1.2vw, 0.95rem);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-top-width: 3.5px;
  border-top-color: #2efab0;
  border-radius: 0 0 0.65rem 0.65rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.principles b {
  color: #2efab0;
  font-size: clamp(1.4rem, 2vw, 1.8rem);
  line-height: 1;
  font-weight: 900;
}

.principles strong {
  display: block;
  font-size: clamp(0.82rem, 1.1vw, 0.92rem);
  color: #ffffff;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 0.25rem;
}

.principles small {
  display: block;
  color: #e2e8f0;
  font-size: clamp(0.72rem, 0.95vw, 0.78rem);
  line-height: 1.4;
  opacity: 0.95;
  text-align: justify;
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

.callout-box.amber {
  background: linear-gradient(90deg, rgba(245, 158, 11, 0.16) 0%, rgba(245, 158, 11, 0.06) 100%);
  border: 1.5px solid rgba(251, 191, 36, 0.45);
  box-shadow: 0 0 16px rgba(245, 158, 11, 0.1);
}

.callout-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem;
  border-radius: 0.45rem;
  flex-shrink: 0;
}

.callout-icon.amber {
  background: rgba(245, 158, 11, 0.25);
  color: #fbbf24;
  border: 1px solid rgba(251, 191, 36, 0.5);
}

.callout-text {
  color: #fef3c7;
  font-size: clamp(0.72rem, 1vw, 0.78rem);
  line-height: 1.4;
  text-align: justify;
}
</style>
