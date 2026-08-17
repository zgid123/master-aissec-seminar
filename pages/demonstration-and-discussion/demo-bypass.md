---
layout: two-cols-header
hideInToc: true
transition: slide-left
---

# Khi policy bị bypass

::left::

### Intended path

```sql
SELECT *
FROM customers_for('restricted');
```

```text
Alice Smith
a***@gmail.com
******4567
**** **** **** 1234
********
```

::right::

### Unsafe direct access

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
Nếu user có thể query raw table, masking layer không còn là lớp bảo vệ.
</div>
