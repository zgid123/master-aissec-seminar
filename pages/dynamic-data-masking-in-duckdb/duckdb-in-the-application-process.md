---
layout: two-cols-header
hideInToc: true
transition: slide-left
---

# DuckDB nằm trong tiến trình ứng dụng

::left::

### DBMS truyền thống

```text
Application
     │
   Network
     │
     ▼
Database Server
```

::right::

### DuckDB

```text
Application Process
┌──────────────────────┐
│ Application          │
│ DuckDB Engine        │
│ database.duckdb      │
└──────────────────────┘
```

<div v-click class="mt-5 rounded-lg border border-amber-300/35 bg-amber-500/8 p-3 text-sm">
DuckDB là embedded OLAP database: host application và quyền của tiến trình trở thành một phần của security boundary.
</div>

<!--
[Sources]
- https://duckdb.org/docs/current/operations_manual/securing_duckdb/overview
[/Sources]
-->
