---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Bước 3 - Tạo policy theo quyền

Macro nhận biết vai trò để chọn dữ liệu gốc, dữ liệu đã che hoặc mặc định từ chối truy cập.{.op-60}

<div class="cols mt-5">
<div>

```sql {all|4-5|6-7|8}
CREATE MACRO email_for_role(
  email_value, viewer_role
) AS CASE
  WHEN viewer_role = 'manager'
    THEN email_value
  WHEN viewer_role = 'support'
    THEN mask_email(email_value)
  ELSE NULL
END;
```

</div>
<div class="roles">
  <div v-click="2"><b>manager</b><span>→ <code>alice@gmail.com</code></span></div>
  <div v-click="3"><b>support</b><span>→ <code>a***@gmail.com</code></span></div>
  <div v-click="4"><b>quyền khác</b><span>→ <code>NULL</code></span></div>
</div>
</div>

<div v-click="5" class="mt-6 rounded-lg border border-cyan-300/30 bg-cyan-500/8 p-4 text-center text-base">
DuckDB có policy, nhưng vẫn cần Node.js cung cấp <code>viewer_role</code> đã được xác thực.
</div>

<style scoped>
.cols { display:grid; grid-template-columns:1.12fr .88fr; gap:1.4rem; }
.roles { display:grid; gap:.75rem; align-content:center; }
.roles > div { padding:.85rem; border-left:3px solid #2efab0; background:rgba(255,255,255,.045); }
.roles b,.roles span { display:block; }
.roles b { color:#2efab0; font-size:.72rem; }
.roles span { margin-top:.3rem; font-size:.7rem; opacity:.75; }
</style>

<!--
Gợi ý trình bày: Bước 3 dùng vai trò để quyết định có áp dụng phép biến đổi hay không.

[Sources]
- https://duckdb.org/docs/current/sql/statements/create_macro
[/Sources]
-->
