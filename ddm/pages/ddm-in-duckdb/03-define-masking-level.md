---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Bước 1 - Xác định mức che

Nhân viên hỗ trợ cần <mark>đủ thông tin để đối chiếu tài khoản</mark>, nhưng không cần đọc toàn bộ email.

<div class="workspace">
<div class="code">

```sql {1|4-6|all}
CREATE OR REPLACE MACRO mask_email(value) AS
  CASE
    WHEN value IS NULL THEN NULL
    ELSE concat(
      left(value, 1), '***@',
      split_part(value, '@', 2)
    )
  END;
```

</div>

<div class="result" v-click="2">
  <span class="label">QUY TẮC HIỂN THỊ</span>
  <code class="source">alice@gmail.com</code>
  <div class="arrow">↓</div>
  <code class="masked"><span>a</span><mark>***</mark><span>@gmail.com</span></code>
  <div class="exposure">
    <div><span class="label">GIỮ LẠI</span><b>Ký tự đầu + domain</b></div>
    <div><span class="label">CHE ĐI</span><b>Phần còn lại trước @</b></div>
  </div>
</div>
</div>

<div class="takeaway" v-click="3">
  <span class="label">NGUYÊN TẮC THIẾT KẾ</span>
  <strong>Chỉ giữ phần tối thiểu cần cho tác vụ - và coi mọi phần giữ lại là phơi lộ có chủ đích.</strong>
</div>

<style scoped>
.workspace {
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: 1.45rem;
  align-items: center;
  margin-top: 0.5rem;
}

.code :deep(pre) {
  line-height: 1.5;
}

.code :deep(.slidev-code .line) {
  transition: opacity 0.25s ease;
}

.result {
  padding: 1rem 1.2rem 1.05rem;
  border-left: 4px solid #2efab0;
  background: rgba(46, 250, 176, 0.055);
  font-size: 16px;
  text-align: center;
}

.result > .label {
  display: block;
  font-weight: 800;
  letter-spacing: 0.075em;
  opacity: 0.7;
}

.result code {
  display: block;
  font-size: inherit;
}

.source {
  margin-top: 0.75rem;
  opacity: 0.58;
}

.arrow {
  margin: 0.25rem 0;
  font-size: 16px;
}

.masked {
  font-size: 16px;
  font-weight: 700;
}

.masked mark {
  margin: 0 0.08rem;
  color: #9f2633;
  background: rgba(252, 165, 165, 0.2);
}

.exposure {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 0.6rem;
  margin-top: 0.9rem;
  text-align: left;
}

.exposure div {
  padding: 0.52rem 0.62rem;
  border-top: 2px solid #2efab0;
  background: rgba(255, 255, 255, 0.025);
}

.exposure div:last-child {
  border-color: #fca5a5;
}

.exposure .label,
.exposure b {
  display: block;
  font-size: 16px;
}

.exposure .label {
  font-weight: 800;
  letter-spacing: 0.06em;
  opacity: 0.62;
}

.exposure b {
  margin-top: 0.2rem;
  line-height: 1.35;
}

.takeaway {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.15rem;
  align-items: center;
  margin-top: 1.75rem;
  padding: 0.7rem 0.95rem;
  border-left: 4px solid #ffda58;
  background: rgba(255, 218, 88, 0.055);
  font-size: 16px;
}

.takeaway > .label {
  font-weight: 800;
  letter-spacing: 0.07em;
  opacity: 0.62;
  font-size: 14px;
  white-space: nowrap;
}

.takeaway > strong {
  color: #9a7510;
  font-size: inherit;
  font-weight: 800;
  text-align: left;
}
</style>

<!--
Ta bắt đầu từ nhu cầu sử dụng, không phải từ cú pháp. Nhân viên hỗ trợ cần đối chiếu tài khoản trong ngữ cảnh cuộc hội thoại, nhưng không cần thấy toàn bộ địa chỉ email.

[CLICK] Macro đóng gói quy tắc đó để tái sử dụng.

[CLICK] Với email hợp lệ, ta giữ ký tự đầu và domain, rồi thay phần còn lại trước dấu @ bằng dấu sao. alice@gmail.com trở thành a***@gmail.com.

[CLICK] NULL vẫn là NULL. Nguyên tắc thiết kế là chỉ giữ phần tối thiểu cần cho tác vụ. Trong ví dụ này, ký tự đầu và domain vẫn được trả về, nên đó là phần phơi lộ có chủ đích cần được đánh giá. Masking làm giảm mức phơi lộ; nó không biến dữ liệu thành vô danh.

[Sources]
- https://duckdb.org/docs/stable/sql/statements/create_macro
[/Sources]
-->
