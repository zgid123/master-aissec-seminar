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

### Dynamic result

```sql {all|4-7|8-11|all}
CREATE MACRO customers_for(role) AS TABLE
SELECT
  name,
  CASE WHEN role = 'privileged'
       THEN email
       ELSE mask_email(email)
  END AS email,
  CASE WHEN role = 'privileged'
       THEN salary
       ELSE mask_salary(salary)
  END AS salary
FROM customers;
```

<div v-click class="mt-4 rounded-lg border border-[#2efab0]/35 bg-[#2efab0]/8 p-3 text-sm leading-6">
Trong demo, <b>role</b> là access context. Trong hệ thống thật, context này phải do application xác thực và enforce.
</div>

<style>
.query-time-policy-demo {
  column-gap: 1.5rem;
}
</style>
