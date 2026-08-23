---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Role được áp dụng ngay tại query time

<div class="query-demo mt-7">
<div>

```sql {1|3-5|6-8|all}
SELECT name,
  CASE
    WHEN $viewer_role = 'privileged'
      THEN email
    ELSE mask_email(email)
  END AS email
FROM customers;
```

</div>
<div class="outputs">
  <div v-click="2"><small>ROLE = PRIVILEGED</small><strong>alice@gmail.com</strong></div>
  <div class="restricted" v-click="3"><small>ROLE = RESTRICTED</small><strong>a***@gmail.com</strong></div>
</div>
</div>

<div v-click="4" class="context mt-7">
Trong demo, role là access context; trong hệ thống thật, application phải xác thực và enforce context này.
</div>

<style scoped>
.query-demo { display:grid; grid-template-columns:1.08fr .92fr; gap:1.6rem; align-items:center; }
.query-demo :deep(pre) { font-size:.85rem; line-height:1.52; }
.outputs { display:grid; gap:1.15rem; }
.outputs > div { min-height:7.2rem; padding:1.15rem; border-left:4px solid #38edf6; background:rgba(255,255,255,.05); }
.outputs > .restricted { border-color:#2efab0; }
.outputs small,.outputs strong { display:block; }
.outputs small { color:#38edf6; font-size:.76rem; font-weight:800; letter-spacing:.07em; }
.outputs .restricted small { color:#2efab0; }
.outputs strong { margin-top:1.25rem; color:#fff; font-size:1.2rem; }
.outputs .restricted strong { color:#2efab0; }
.context { padding:1rem 1.15rem; border-left:4px solid #ffda58; background:rgba(255,218,88,.07); color:#f6edc3; font-size:.95rem; line-height:1.45; text-align:center; }
</style>
