---
layout: two-cols-header
hideInToc: true
transition: slide-left
---

# Dataset demo: khách hàng

::left::

### Original record

```text
Alice Smith
alice@gmail.com
0901234567
4111 1111 1111 1234
50,000,000
```

::right::

### Masked output

```text
Alice Smith
a***@gmail.com
******4567
**** **** **** 1234
********
```

<div v-click class="mt-5 rounded-lg border border-cyan-300/30 bg-cyan-500/8 p-3 text-sm leading-6">
Một bản ghi nhỏ nhưng đủ bốn nhóm nhạy cảm: email, phone, credit card và salary.
</div>

<div v-click class="mt-3 rounded-lg border border-[#2efab0]/35 bg-[#2efab0]/8 p-3 text-sm leading-6">
Mục tiêu: vẫn hỗ trợ nghiệp vụ, nhưng giảm phần dữ liệu nhạy cảm bị phơi lộ.
</div>
