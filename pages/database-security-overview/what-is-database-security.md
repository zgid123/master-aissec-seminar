---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Tại sao cần bảo vệ cơ sở dữ liệu?

Một cơ sở dữ liệu không chỉ là nơi lưu trữ thông tin — đó là **hạ tầng dữ liệu cốt lõi** phục vụ toàn bộ hoạt động của tổ chức.{.op-60}

<div class="db-explain mt-6">
  <div v-click="1">
    <b>1</b>
    <div>
      <strong>Không chỉ là một kho lưu trữ</strong>
      <small>Cơ sở dữ liệu phục vụ đồng thời nhiều người dùng và hệ thống, với các hoạt động đọc, ghi và cập nhật dữ liệu liên tục.</small>
    </div>
  </div>
  <div v-click="2">
    <b>2</b>
    <div>
      <strong>Chứa tài sản số quan trọng nhất</strong>
      <small>Thông tin khách hàng, giao dịch, hồ sơ, tài chính và nhiều dữ liệu vận hành khác đều tập trung trong cơ sở dữ liệu.</small>
    </div>
  </div>
  <div v-click="3">
    <b>3</b>
    <div>
      <strong>Sự cố ảnh hưởng trên diện rộng</strong>
      <small>Một lỗ hổng trong cơ sở dữ liệu có thể dẫn đến việc dữ liệu của hàng loạt người dùng bị rò rỉ hoặc truy cập trái phép cùng lúc.</small>
    </div>
  </div>
</div>

<style scoped>
.db-explain {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.db-explain > div {
  display: flex;
  gap: 1rem;
  padding: 1.35rem 1.2rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-top-width: 4px;
  border-top-color: #2efab0;
  border-radius: 0 0 0.75rem 0.75rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.db-explain b {
  color: #2efab0;
  font-size: 2.2rem;
  line-height: 1;
  font-weight: 900;
}

.db-explain strong {
  display: block;
  font-size: 1.05rem;
  color: #ffffff;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 0.5rem;
}

.db-explain small {
  display: block;
  color: #e2e8f0;
  font-size: 0.88rem;
  line-height: 1.55;
  opacity: 0.95;
  text-align: justify;
}
</style>
