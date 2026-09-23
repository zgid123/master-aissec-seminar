---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Bước 2 - Chọn phép biến đổi theo role

Table macro nhận <code>viewer_role</code> và chọn cách hiển thị cho từng nhóm người dùng.

<div class="policy mt-5">
<div class="code">

```sql {all|4|5|6|7|8|all}
CREATE OR REPLACE MACRO users_for_role(viewer_role) AS TABLE
SELECT full_name,
  CASE
    WHEN viewer_role = 'manager' THEN email
    WHEN viewer_role = 'support' THEN mask_email(email)
    WHEN viewer_role = 'tester' THEN substitute_email(id, email)
    WHEN viewer_role = 'bi' THEN hash_value(email)
    ELSE NULL
  END AS email
FROM users;
```

</div>
<div class="matrix">
  <div class="head"><span>ROLE</span><span>EMAIL TRẢ VỀ</span></div>
  <div v-click="2"><b>manager</b><span>Dữ liệu gốc</span></div>
  <div v-click="3"><b>support</b><span>Che một phần</span></div>
  <div v-click="4"><b>tester</b><span>Dữ liệu thay thế</span></div>
  <div v-click="5"><b>bi</b><span>Giá trị hash</span></div>
  <div class="deny" v-click="6"><b>role khác</b><span><code>NULL</code> · default-deny</span></div>
</div>
</div>

<div class="contract mt-5" v-click="7"><b>Một query, cùng schema</b><span>-</span><strong>output thay đổi theo role</strong></div>

<style scoped>
.policy {
  display: grid;
  grid-template-columns: 1.16fr 0.84fr;
  gap: 1.25rem;
  align-items: center;
}

.code :deep(pre) {
  font-size: 0.73rem;
  line-height: 1.3;
}

.matrix {
  border-top: 3px solid #2efab0;
}

.matrix > div {
  display: grid;
  grid-template-columns: 0.72fr 1.28fr;
  gap: 0.7rem;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.matrix .head {
  padding: 0.45rem 0.75rem;
  background: rgba(46, 250, 176, 0.08);
  font-size: 0.64rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  opacity: 0.72;
}

.matrix b,
.matrix span {
  font-size: 0.76rem;
}

.matrix b {
  font-family: var(--slidev-code-font-family);
}

.matrix .deny {
  color: #9f2633;
  background: rgba(252, 165, 165, 0.055);
}

.contract {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  align-items: center;
  padding: 0.7rem 1rem;
  border-left: 4px solid #38edf6;
  background: rgba(56, 237, 246, 0.06);
  font-size: 0.9rem;
}

.contract strong {
  color: #087a59;
}
</style>

<!--
Bước 2 bổ sung policy cho cột email. Mục tiêu là giữ nguyên schema của query nhưng thay đổi giá trị trả về theo role của người xem.

[CLICK] Table macro nhận viewer_role làm đầu vào. Khối CASE ánh xạ từng role sang một phép biến đổi cụ thể, nên ứng dụng chỉ cần gọi cùng một interface.

[CLICK] Manager nhận email gốc vì đây là role có quyền cao nhất trong phạm vi demo.

[CLICK] Support chỉ cần nhận diện khách hàng, nên email được che một phần bằng hàm mask_email đã định nghĩa ở bước 1.

[CLICK] Tester nhận email thay thế ổn định theo id. Nhờ đó, nhóm kiểm thử vẫn kiểm tra được định dạng và quan hệ dữ liệu mà không sử dụng thông tin thật.

[CLICK] BI nhận giá trị hash để có thể nhóm hoặc đối chiếu các bản ghi mà không nhìn thấy email gốc.

[CLICK] Mọi role không nằm trong danh sách cho phép đều nhận NULL. Nhánh ELSE tạo hành vi default-deny thay vì vô tình trả dữ liệu gốc.

[CLICK] Kết quả là một query và một schema thống nhất, nhưng output thay đổi theo viewer_role. Tuy nhiên, policy này chỉ an toàn khi viewer_role đến từ một nguồn đáng tin cậy. Đó là nội dung của bước 3.

[Sources]
- https://duckdb.org/docs/current/sql/statements/create_macro
[/Sources]
-->
