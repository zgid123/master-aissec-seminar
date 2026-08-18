---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Same data, different output

<div class="roles mt-6">
  <div v-click>
    <small>PRIVILEGED</small>
    <p>Alice Smith</p><p>alice@gmail.com</p><p>0901234567</p><p>4111 1111 1111 1234</p><p>50,000,000</p>
  </div>
  <div class="context"><span>Same original data</span><b>Access Context</b><span>Query-time policy</span></div>
  <div v-click class="restricted">
    <small>RESTRICTED</small>
    <p>Alice Smith</p><p>a***@gmail.com</p><p>******4567</p><p>**** **** **** 1234</p><p>********</p>
  </div>
</div>

<div v-click="4" class="mt-6 text-center text-lg">
“Dynamic” nghĩa là <b class="text-[#2efab0]">output thay đổi tại query time</b>, còn <b class="text-[#88ffff]">original data không đổi</b>.
</div>

<style scoped>
.roles { display:grid; grid-template-columns:1fr .8fr 1fr; gap:1rem; align-items:stretch; }
.roles > div:not(.context) { padding:1rem; border:1px solid rgba(136,255,255,.3); background:rgba(255,255,255,.045); }
.roles .restricted { border-color:rgba(46,250,176,.55); }
.roles small { display:block; color:#88ffff; margin-bottom:.6rem; }
.roles .restricted small { color:#2efab0; }
.roles p { margin:.3rem 0; font-size:.75rem; }
.context { display:flex; flex-direction:column; justify-content:center; text-align:center; gap:.55rem; }
.context b { color:#2efab0; }
.context span { opacity:.55; font-size:.67rem; }
</style>
