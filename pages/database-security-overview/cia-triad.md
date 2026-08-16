---
layout: default
hideInToc: true
transition: slide-left
---

<div class="slide-container">

<div class="slide-header">
  <h1 class="slide-title">NỀN TẢNG THỨ NHẤT: BẢO VỆ ĐIỀU GÌ? (CIA)</h1>
  <p class="slide-subtitle">
    CIA xác định <b>chúng ta cần bảo vệ điều gì</b>: giữ bí mật dữ liệu nhạy cảm, đảm bảo tính toàn vẹn và duy trì khả năng sẵn sàng của hệ thống.
  </p>
</div>

<div class="principles">
  <div v-click>
    <b>C</b>
    <div>
      <strong>Confidentiality</strong>
      <small>Chỉ đúng người mới xem được dữ liệu nhạy cảm — như thư niêm phong, chỉ người nhận mới mở được.</small>
    </div>
  </div>
  <div v-click>
    <b>I</b>
    <div>
      <strong>Integrity</strong>
      <small>Dữ liệu không bị sửa đổi trái phép hoặc do lỗi — như sổ cái kế toán, mọi thay đổi phải có dấu vết.</small>
    </div>
  </div>
  <div v-click>
    <b>A</b>
    <div>
      <strong>Availability</strong>
      <small>Hệ thống và dữ liệu luôn sẵn sàng khi cần — như máy ATM, không thể "nghỉ" giữa giờ cao điểm.</small>
    </div>
  </div>
</div>

<div v-click class="callout-box amber">
  <div class="callout-icon amber">
    <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
      <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    </svg>
  </div>
  <div class="callout-text">
    <strong class="text-amber-300">Nguyên tắc đánh đổi:</strong> Ba mục tiêu này đôi khi <b class="text-white font-bold">ĐÁNH ĐỔI LẪN NHAU</b> — thiết lập bảo mật càng nghiêm ngặt (<b class="text-white">Confidentiality</b>) thường làm tăng độ trễ và giảm hiệu năng truy xuất (<b class="text-white">Availability</b>).
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

.principles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.35rem;
  margin-top: 0.25rem;
}

.principles > div {
  display: flex;
  gap: 1rem;
  padding: 1.35rem 1.25rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-top-width: 4px;
  border-top-color: #2efab0;
  border-radius: 0 0 0.75rem 0.75rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.principles b {
  color: #2efab0;
  font-size: 2.2rem;
  line-height: 1;
  font-weight: 900;
}

.principles strong {
  display: block;
  font-size: 1.15rem;
  color: #ffffff;
  font-weight: 700;
  line-height: 1.45;
  margin-bottom: 0.5rem;
}

.principles small {
  display: block;
  color: #e2e8f0;
  font-size: 0.92rem;
  line-height: 1.65;
  opacity: 0.95;
  text-align: justify;
}

.callout-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.4rem;
  padding: 0.95rem 1.25rem;
  border-radius: 0.85rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(10px);
}

.callout-box.amber {
  background: linear-gradient(90deg, rgba(245, 158, 11, 0.16) 0%, rgba(245, 158, 11, 0.06) 100%);
  border: 1.5px solid rgba(251, 191, 36, 0.45);
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.12);
}

.callout-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  border-radius: 0.6rem;
  flex-shrink: 0;
}

.callout-icon.amber {
  background: rgba(245, 158, 11, 0.25);
  color: #fbbf24;
  border: 1px solid rgba(251, 191, 36, 0.5);
}

.callout-text {
  font-size: 0.95rem;
  color: #fef3c7;
  line-height: 1.65;
  text-align: justify;
}
</style>
