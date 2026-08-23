---
layout: two-cols-header
layoutClass: query-time-policy-demo
hideInToc: true
transition: slide-left
---

# Query-time policy bằng SQL

::left::

### Masking macros

```sql {all|1-4|6-9|all}
CREATE MACRO mask_email(value) AS
  left(value, 1) || '***@'
  || split_part(value, '@', 2);

CREATE MACRO mask_salary(value) AS
  '********';
```

<div v-click class="mt-4 text-sm opacity-75 leading-6">
Macro giúp tái sử dụng logic masking cho nhiều query hoặc view.
</div>

::right::

### Kết quả theo role

```sql {all|4-8|9-13|all}
CREATE MACRO customers_for(role) AS TABLE
SELECT
  name,
  CASE WHEN role = 'manager'
       THEN email
       WHEN role = 'support'
       THEN mask_email(email)
       ELSE NULL
  END AS email,
  CASE WHEN role = 'manager'
       THEN salary
       WHEN role = 'support'
       THEN mask_salary(salary)
       ELSE NULL
  END AS salary
FROM customers;
```

<div v-click class="mt-4 rounded-lg border border-[#2efab0]/35 bg-[#2efab0]/8 p-3 text-sm leading-6">
Trong demo, <b>role</b> là access context do Node.js xác thực; client không được tự gửi giá trị này.
</div>

<style>
.query-time-policy-demo {
  column-gap: 1.5rem;
}
</style>
