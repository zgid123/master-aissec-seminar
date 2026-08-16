---
layout: default
hideInToc: true
transition: slide-left
---

<div class="slide-container">

<div class="slide-header">
  <h1 class="slide-title">TẠI SAO CẦN BẢO VỆ CƠ SỞ DỮ LIỆU?</h1>
  <p class="slide-subtitle">
    Một cơ sở dữ liệu không chỉ là nơi lưu trữ thông tin — đó là <b>hạ tầng dữ liệu cốt lõi</b> phục vụ toàn bộ hoạt động của tổ chức.
  </p>
</div>

<div class="db-explain">
  <div v-click>
    <b>1</b>
    <div>
      <strong>Không chỉ là một kho lưu trữ</strong>
      <small>Cơ sở dữ liệu phục vụ đồng thời nhiều người dùng và hệ thống, với các hoạt động đọc, ghi và cập nhật dữ liệu liên tục.</small>
    </div>
  </div>
  <div v-click>
    <b>2</b>
    <div>
      <strong>Chứa tài sản số quan trọng nhất</strong>
      <small>Thông tin khách hàng, giao dịch, hồ sơ, tài chính và nhiều dữ liệu vận hành khác đều tập trung trong cơ sở dữ liệu.</small>
    </div>
  </div>
  <div v-click>
    <b>3</b>
    <div>
      <strong>Sự cố ảnh hưởng trên diện rộng</strong>
      <small>Một lỗ hổng trong cơ sở dữ liệu có thể dẫn đến việc dữ liệu của hàng loạt người dùng bị rò rỉ hoặc truy cập trái phép cùng lúc.</small>
    </div>
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

.db-explain {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.4rem;
  margin-top: 2.5rem;
}

.db-explain > div {
  display: flex;
  gap: 1.1rem;
  padding: 1.65rem 1.35rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-top-width: 4px;
  border-top-color: #2efab0;
  border-radius: 0 0 0.85rem 0.85rem;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
}

.db-explain b {
  color: #2efab0;
  font-size: 2.3rem;
  line-height: 1;
  font-weight: 900;
}

.db-explain strong {
  display: block;
  font-size: 1.15rem;
  color: #ffffff;
  font-weight: 700;
  line-height: 1.45;
  margin-bottom: 0.6rem;
}

.db-explain small {
  display: block;
  color: #e2e8f0;
  font-size: 0.93rem;
  line-height: 1.65;
  opacity: 0.95;
  text-align: justify;
}
</style>
