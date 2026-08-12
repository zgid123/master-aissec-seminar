---
layout: two-cols-header
hideInToc: true
transition: slide-left
---

# Ngữ cảnh quyết định kết quả

::left::

```sql {1|3-6|all}
SET VARIABLE current_role = 'RESTRICTED';

SELECT name,
  CASE WHEN getvariable('current_role') = 'ADMIN'
    THEN email
    ELSE mask_email(email)
  END AS email
FROM customers;
```

::right::

<div class="trust-flow">
  <div v-click><b>1</b> Application xác thực người dùng</div>
  <div v-click><b>2</b> Host thiết lập access context</div>
  <div v-click><b>3</b> Query áp dụng masking policy</div>
  <div v-click><b>4</b> Privileged nhận original; restricted nhận masked</div>
</div>

<div v-click class="mt-5 rounded-lg border border-red-300/30 bg-red-500/8 p-3 text-sm">
Session variable chỉ mô phỏng context; nó không phải security boundary nếu người dùng được chạy SQL tùy ý.
</div>

<style scoped>
.trust-flow { display:grid; gap:.55rem; }
.trust-flow > div { padding:.65rem .8rem; border-left:3px solid rgba(46,250,176,.7); background:rgba(255,255,255,.045); }
.trust-flow b { color:#2efab0; margin-right:.55rem; }
</style>

<!--
[Sources]
- https://duckdb.org/docs/current/sql/statements/set_variable
[/Sources]
-->
