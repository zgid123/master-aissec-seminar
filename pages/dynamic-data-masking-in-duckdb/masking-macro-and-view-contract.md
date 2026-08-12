---
layout: two-cols-header
hideInToc: true
transition: slide-left
---

# Macro che dữ liệu, View công bố kết quả

::left::

```sql {1|2-6|8-10|all}
CREATE OR REPLACE MACRO mask_email(e) AS
  CASE
    WHEN e IS NULL THEN NULL
    ELSE concat(
      left(e, 1), '***@',
      split_part(e, '@', 2))
  END;

CREATE OR REPLACE VIEW masked_customers AS
SELECT id, name, mask_email(email) AS email
FROM customers;
```

::right::

### Một logic, nhiều nơi dùng

| Original | Masked |
|---|---|
| `alice@gmail.com` | `a***@gmail.com` |
| `bob@company.vn` | `b***@company.vn` |
| `NULL` | `NULL` |

<div class="mt-6 rounded-lg border border-cyan-300/30 bg-cyan-500/8 p-4 text-sm">
Macro giảm lặp; View giữ raw table ở phía sau một interface dành cho application.
</div>

<!--
[Sources]
- https://duckdb.org/docs/current/sql/statements/create_macro
[/Sources]
-->
