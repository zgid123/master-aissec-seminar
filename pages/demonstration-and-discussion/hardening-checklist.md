---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Production cần hardening ở ba lớp

<div class="hardening mt-7">
  <section v-click="1">
    <small>APPLICATION</small>
    <p><b>✓</b> Verify identity và map role phía server</p>
    <p><b>✓</b> Dùng prepared/fixed queries</p>
    <p><b>✓</b> Không cho user kiểm soát SQL text</p>
  </section>
  <section v-click="2">
    <small>DUCKDB RUNTIME</small>
    <p><b>✓</b> Giới hạn external file access</p>
    <p><b>✓</b> Tắt extension auto-install/auto-load không cần thiết</p>
    <p><b>✓</b> Khóa security configuration sau khi khởi tạo</p>
  </section>
  <section v-click="3">
    <small>OS &amp; STORAGE</small>
    <p><b>✓</b> File chỉ thuộc service account</p>
    <p><b>✓</b> Mã hóa database và bảo vệ khóa</p>
    <p><b>✓</b> Audit, backup và cô lập process</p>
  </section>
</div>

<div v-click="4" class="config mt-7">
<code>enable_external_access = false</code><span>·</span><code>lock_configuration = true</code><span>·</span><code>OS sandbox</code>
</div>

<style scoped>
.hardening { display:grid; grid-template-columns:repeat(3,1fr); gap:1.25rem; }
.hardening section { min-height:19rem; padding:1.3rem; border-top:4px solid #38edf6; background:rgba(255,255,255,.05); }
.hardening section:nth-child(2) { border-color:#2efab0; }
.hardening section:nth-child(3) { border-color:#ffda58; }
.hardening small { color:#38edf6; font-size:.78rem; font-weight:800; letter-spacing:.08em; }
.hardening section:nth-child(2) small { color:#2efab0; }
.hardening section:nth-child(3) small { color:#ffda58; }
.hardening p { margin:1rem 0; color:#cbd7e0; font-size:.88rem; line-height:1.45; }
.hardening p b { color:#2efab0; }
.config { display:flex; justify-content:center; gap:.8rem; color:#2efab0; }
.config code { color:#dff8ef; font-size:1rem; }
</style>

<!--
[Sources]
- https://duckdb.org/docs/current/operations_manual/securing_duckdb/overview
- https://duckdb.org/2025/11/19/encryption-in-duckdb
[/Sources]
-->
