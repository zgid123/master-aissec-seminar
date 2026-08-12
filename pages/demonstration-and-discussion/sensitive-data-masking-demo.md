---
layout: two-cols-header
hideInToc: true
transition: slide-left
---

# Demo bốn kiểu dữ liệu nhạy cảm

::left::

### Bản ghi khách hàng gốc

```text
Alice Smith
alice@gmail.com
0901234567
4111 1111 1111 1234
50,000,000
```

::right::

### Kết quả sau Data Masking

```text
Alice Smith
a***@gmail.com
******4567
**** **** **** 1234
********
```

<div v-click class="mt-5 rounded-lg border border-cyan-300/30 bg-cyan-500/8 p-3 text-sm">
Email giữ domain, phone và credit card giữ bốn số cuối, salary bị ẩn hoàn toàn.
</div>
