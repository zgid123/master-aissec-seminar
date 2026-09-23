---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Bước 3 - Bind role đã xác thực

Policy chỉ đáng tin khi <code>viewer_role</code> đến từ identity đã xác thực phía server.

<div class="policy mt-3">
<div class="code">

```ts {all|1-4|6-8|10-15|6|all}
const identity = await authenticate(
  c.req.header('Authorization'),
)
if (!identity) return unauthorized()

const { page, pageSize, search } = validatedInput
const role = identity.role
await listUsers({ role, page, pageSize, search })

connection.run(`
  SELECT *
  FROM users_for_role($viewer_role)
`, {
  viewer_role: role,
})
```

</div>
<div class="matrix">
  <div class="head"><span>CONTROL</span><span>ĐẢM BẢO</span></div>
  <div v-click="2"><b>Authenticate</b><span>Token tạo identity phía server</span></div>
  <div v-click="3"><b>Server role</b><span>Role lấy từ <code>identity.role</code></span></div>
  <div v-click="4"><b>Bind parameter</b><span>Role gắn vào <code>$viewer_role</code></span></div>
  <div class="deny" v-click="5"><b>Client boundary</b><span>Không nhận role hoặc SQL query</span></div>
</div>
</div>

<div class="contract mt-3" v-click="6"><b>Identity</b><span>→</span><b>server role</b><span>→</span><b>bind parameter</b><span>→</span><strong>masking policy</strong></div>

<style scoped>
.policy {
  display: grid;
  grid-template-columns: 1.16fr 0.84fr;
  gap: 1.25rem;
  align-items: center;
}

.code :deep(pre) {
  font-size: 0.68rem;
  line-height: 1.2;
}

.matrix {
  border-top: 3px solid #2efab0;
}

.matrix > div {
  display: grid;
  grid-template-columns: 0.72fr 1.28fr;
  gap: 0.7rem;
  align-items: center;
  padding: 0.48rem 0.75rem;
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
  margin-right: 9rem;
  padding: 0.55rem 1rem;
  border-left: 4px solid #38edf6;
  background: rgba(56, 237, 246, 0.06);
  font-size: 0.84rem;
}

.contract strong {
  color: #087a59;
}
</style>

<!--
Bước 3 thiết lập nguồn tin cậy cho `viewer_role`. Role phải được suy ra từ identity đã xác thực phía server, không được lấy từ dữ liệu client tự khai báo.

[CLICK] Đây là toàn bộ luồng từ request của client đến masking policy. Code bên trái thực hiện luồng xử lý; bảng bên phải lần lượt chỉ ra các control bảo vệ trust boundary.

[CLICK] Control đầu tiên là Authenticate. Ứng dụng lấy Bearer token từ header Authorization và xác thực token. Nếu không tạo được identity hợp lệ, request bị từ chối trước khi truy vấn dữ liệu.

[CLICK] Control thứ hai là Server role. Sau khi xác thực, server lấy role từ `identity.role` rồi truyền role đó vào `listUsers`. Client không thể tự nâng quyền bằng cách gửi một role khác trong body hoặc query string.

[CLICK] Control thứ ba là Bind parameter. Database layer gắn role vào named parameter `$viewer_role`, thay vì ghép role trực tiếp vào chuỗi SQL. Table macro dùng parameter này để chọn policy đã định nghĩa ở bước 2.

[CLICK] Control cuối cùng là Client boundary. Client chỉ được gửi token và các input nghiệp vụ đã kiểm tra trong `validatedInput`, như `search`, `page` và `pageSize`. Client không được quyết định role hoặc gửi SQL query.

[CLICK] Chuỗi tin cậy hoàn chỉnh là: xác thực identity, lấy role phía server, bind role thành parameter, rồi áp dụng masking policy. Nếu consumer có thể bỏ qua một mắt xích hoặc truy cập trực tiếp dữ liệu gốc, DDM có thể bị bypass.

[Sources]
- https://duckdb.org/docs/current/clients/node_neo/overview
- https://duckdb.org/docs/current/operations_manual/securing_duckdb/overview
[/Sources]
-->
