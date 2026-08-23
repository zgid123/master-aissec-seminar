---
layout: two-cols-header
layoutClass: demo-bypass
hideInToc: true
transition: slide-left
---

# Khi policy bị bypass

::left::

### Đường truy cập dự kiến

```sql
SELECT *
FROM customers_for('support');
```

```text
Alice Smith
a***@gmail.com
******4567
**** **** **** 1234
********
```

::right::

### Truy cập trực tiếp không an toàn

```sql
SELECT *
FROM customers;
```

```text
Alice Smith
alice@gmail.com
0901234567
4111 1111 1111 1234
50,000,000
```

<div v-click class="mt-5 rounded-lg border border-amber-300/35 bg-amber-500/8 p-3 text-sm leading-6">
Nếu người dùng có thể query bảng gốc, masking layer không còn là lớp bảo vệ.
</div>

<style>
.demo-bypass {
  column-gap: 1.5rem;
}
</style>
