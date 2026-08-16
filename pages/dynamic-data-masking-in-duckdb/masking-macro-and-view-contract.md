---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Bước 2 — Tạo hàm che dữ liệu

Trong ví dụ này, Scalar Macro đóng gói phép che email để sử dụng lại trong các query.{.op-60}

<div class="cols mt-6">
<div>

```sql {1|2-3|4-6|all}
CREATE MACRO mask_email(email_value) AS
  CASE
    WHEN email_value IS NULL THEN NULL
    ELSE concat(
      left(email_value, 1), '***@',
      split_part(email_value, '@', 2))
  END;
```

</div>
<div class="transform">
  <div v-click="2"><small>INPUT</small><code>alice@gmail.com</code></div>
  <strong v-click="3">↓ <code>SELECT mask_email('alice@gmail.com')</code></strong>
  <div v-click="4" class="masked"><small>OUTPUT</small><code>a***@gmail.com</code></div>
</div>
</div>

<div class="mt-7 rounded-lg border border-amber-300/30 bg-amber-500/8 p-4 text-center text-base">
Hàm này chỉ biến đổi dữ liệu; nó chưa biết user nào đang query.
</div>

<style scoped>
.cols { display:grid; grid-template-columns:1.1fr .9fr; gap:1.5rem; align-items:center; }
.transform { display:grid; gap:.6rem; text-align:center; }
.transform > div { padding:1rem; border-left:4px solid #88ffff; background:rgba(255,255,255,.045); }
.transform > .masked { border-color:#2efab0; }
.transform small,.transform code { display:block; }
.transform small { color:#88ffff; margin-bottom:.4rem; font-size:.58rem; }
.transform .masked small,.transform > strong { color:#2efab0; }
.transform > strong { font-size:.64rem; }
</style>

<!--
Gợi ý trình bày: Bước 2 tạo transformation có thể tái sử dụng. Policy theo role được bổ sung ở bước tiếp theo.

[Sources]
- https://duckdb.org/docs/current/sql/statements/create_macro
[/Sources]
-->
