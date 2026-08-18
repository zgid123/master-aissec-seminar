---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Tại sao cần bảo vệ cơ sở dữ liệu?

[Một cơ sở dữ liệu không chỉ là nơi lưu trữ thông tin — đó là]{.op-60} **hạ tầng dữ liệu cốt lõi** [phục vụ toàn bộ hoạt động của tổ chức.]{.op-60}

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
  gap: clamp(0.6rem, 1.3vw, 1rem);
  margin-top: 0.8rem;
}

.db-explain > div {
  display: flex;
  gap: 0.85rem;
  padding: clamp(0.7rem, 1.5vh, 1.1rem) clamp(0.75rem, 1.3vw, 1.05rem);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-top-width: 3.5px;
  border-top-color: #2efab0;
  border-radius: 0 0 0.65rem 0.65rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.db-explain b {
  color: #2efab0;
  font-size: clamp(1.6rem, 2.2vw, 2rem);
  line-height: 1;
  font-weight: 900;
}

.db-explain strong {
  display: block;
  font-size: clamp(0.85rem, 1.15vw, 0.98rem);
  color: #ffffff;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 0.35rem;
}

.db-explain small {
  display: block;
  color: #e2e8f0;
  font-size: clamp(0.74rem, 1vw, 0.82rem);
  line-height: 1.45;
  opacity: 0.95;
  text-align: justify;
}
</style>
