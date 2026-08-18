---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Các mối đe dọa cơ sở dữ liệu phổ biến

Các hình thức tấn công và sơ suất bảo mật thường gặp đe dọa an toàn dữ liệu của tổ chức.{.op-60}

<div class="threats mt-6">
  <div v-click="1">
    <strong>SQL Injection</strong>
    <small>Kẻ tấn công chèn mã độc vào truy vấn qua ô nhập liệu — có thể vượt qua bước kiểm tra đăng nhập hoặc trích xuất toàn bộ dữ liệu mà không cần tài khoản.</small>
  </div>
  <div v-click="2">
    <strong>Insider Threats</strong>
    <small>Người bên trong tổ chức lạm dụng quyền hạn hợp pháp có sẵn. Rất khó phát hiện vì các hành vi truy vấn có vỏ bọc hoàn toàn hợp lệ.</small>
  </div>
  <div v-click="3">
    <strong>Privilege Abuse</strong>
    <small>Cấp quyền vượt quá phạm vi công việc cần thiết (Excessive Privileges), dẫn đến rủi ro lộ dữ liệu do vô tình sơ suất hoặc bị đánh cắp tài khoản.</small>
  </div>
  <div v-click="4">
    <strong>Ransomware</strong>
    <small>Mã hóa toàn bộ tệp tin cơ sở dữ liệu và yêu cầu tiền chuộc — trực tiếp phá hủy tính <span class="text-[#00e5ff]">sẵn sàng (Availability)</span> của hệ thống vận hành.</small>
  </div>
</div>

<style scoped>
.threats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(0.55rem, 1.2vw, 0.9rem);
  margin-top: 0.7rem;
}

.threats > div {
  padding: clamp(0.6rem, 1.3vh, 0.95rem) clamp(0.75rem, 1.3vw, 1.1rem);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-left-width: 3.5px;
  border-left-color: #fca5a5;
  border-radius: 0.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.threats strong {
  display: block;
  font-size: clamp(0.86rem, 1.15vw, 0.98rem);
  color: #fca5a5;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 0.25rem;
}

.threats small {
  display: block;
  color: #e2e8f0;
  font-size: clamp(0.72rem, 0.98vw, 0.8rem);
  line-height: 1.45;
  opacity: 0.95;
  text-align: justify;
}
</style>
