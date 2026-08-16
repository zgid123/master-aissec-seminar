---
layout: default
hideInToc: true
transition: slide-left
---

<div class="slide-container">

<div class="slide-header">
  <h1 class="slide-title">CÁC MỐI ĐE DỌA CƠ SỞ DỮ LIỆU PHỔ BIẾN</h1>
  <p class="slide-subtitle">
    Các hình thức tấn công và sơ suất bảo mật phổ biến đe dọa an toàn dữ liệu tổ chức.
  </p>
</div>

<div class="threats">
  <div v-click>
    <strong>SQL Injection</strong>
    <small>Kẻ tấn công chèn mã độc vào câu truy vấn thông qua ô nhập liệu — có thể vượt qua bước kiểm tra đăng nhập hoặc trích xuất toàn bộ dữ liệu mà không cần tài khoản.</small>
  </div>
  <div v-click>
    <strong>Insider Threats</strong>
    <small>Người bên trong tổ chức lạm dụng quyền hạn hợp pháp có sẵn. Rất khó phát hiện vì các hành vi truy vấn có vỏ bọc hoàn toàn hợp lệ.</small>
  </div>
  <div v-click>
    <strong>Privilege Abuse</strong>
    <small>Cấp quyền vượt quá phạm vi công việc cần thiết (Excessive Privileges), dẫn đến rủi ro lộ lọt dữ liệu do vô tình sơ suất hoặc bị đánh cắp tài khoản.</small>
  </div>
  <div v-click>
    <strong>Ransomware</strong>
    <small>Mã hóa toàn bộ tệp tin cơ sở dữ liệu và yêu cầu tiền chuộc — trực tiếp phá hủy tính Sẵn sàng (Availability) của hệ thống vận hành.</small>
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

.threats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.35rem;
  margin-top: 0.5rem;
}

.threats > div {
  padding: 1.45rem 1.35rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-left-width: 5px;
  border-left-color: #fca5a5;
  border-radius: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.threats strong {
  display: block;
  font-size: 1.2rem;
  color: #fca5a5;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 0.5rem;
}

.threats small {
  display: block;
  color: #e2e8f0;
  font-size: 0.93rem;
  line-height: 1.65;
  opacity: 0.95;
  text-align: justify;
}
</style>
