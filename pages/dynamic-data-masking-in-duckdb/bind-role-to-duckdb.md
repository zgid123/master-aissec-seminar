---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Bước 5 - Truyền quyền vào DuckDB

Node.js xác thực quyền rồi gán giá trị cho <code>$viewer_role</code>; không ghép quyền trực tiếp vào chuỗi SQL.{.op-60}

<div class="cols bind mt-4">
<div>

```ts {all|9-11|13-16|1-7}
const CUSTOMER_QUERY = `
  SELECT id, name,
    email_for_role(
      email, $viewer_role
    ) AS email
  FROM customers
`

const role: Role = req.user.role
if (role !== 'manager' && role !== 'support')
  return res.sendStatus(403)

const reader = await connection.runAndReadAll(
  CUSTOMER_QUERY,
  { viewer_role: role }
)
```

</div>
<div class="binding">
  <div v-click="2"><small>NODE.JS VALUE</small><code>role = 'support'</code></div>
  <strong v-click="3">↓ bind by name</strong>
  <div v-click="3"><small>DUCKDB PARAMETER</small><code>$viewer_role = 'support'</code></div>
  <strong v-click="4">↓ policy macro</strong>
  <div v-click="4" class="result"><small>QUERY OUTPUT</small><code>a***@gmail.com</code></div>
</div>
</div>

<style scoped>
.cols { display:grid; grid-template-columns:1.2fr .8fr; gap:1.2rem; }
.binding { display:grid; gap:.35rem; align-content:center; text-align:center; }
.binding > div { padding:.65rem; border-left:3px solid #88ffff; background:rgba(255,255,255,.045); }
.binding > .result { border-color:#2efab0; }
.binding small,.binding code { display:block; }
.binding small { color:#88ffff; font-size:.54rem; }
.binding .result small,.binding > strong { color:#2efab0; }
.binding code { margin-top:.25rem; font-size:.68rem; }
.binding > strong { font-size:.58rem; }
</style>

<!--
Gợi ý trình bày: đây là điểm vai trò thực sự đi qua ranh giới Node.js → DuckDB. Tham số được chuẩn bị sẵn giúp giữ nguyên cấu trúc truy vấn.

[Sources]
- https://duckdb.org/docs/current/clients/node_neo/overview
- https://duckdb.org/docs/current/sql/query_syntax/prepared_statements
[/Sources]
-->
