---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Bước 4 - Xác thực session

Backend tra cứu bearer token trong session phía server rồi tạo <code>req.user</code>; client không được tự khai báo <code>role</code>.{.op-60}

<div class="cols mt-5">
<div>

```ts {all|8-11|13-17}
type Role = 'manager' | 'support'

async function requireAuth(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  const identity = authenticate(
    req.header('Authorization')
  )
  if (!identity) return res.sendStatus(401)

  req.user = {
    username: identity.username,
    role: identity.role,
  }
  next()
}
```

</div>
<div class="sources">
  <div class="bad" v-click="2"><small>KHÔNG TIN CẬY</small><code>req.body.role</code><span>Client có thể tự sửa thành <b>manager</b></span></div>
  <div class="good" v-click="2"><small>TIN CẬY SAU KHI XÁC MINH</small><code>req.user.role</code><span>Được backend đọc từ session hợp lệ</span></div>
</div>
</div>

<style scoped>
.alpha-shifting-intro h1 { font-size:1.95rem; }
.cols { display:grid; grid-template-columns:1.08fr .92fr; gap:1.4rem; }
.sources { display:grid; gap:1.15rem; align-content:center; }
.sources > div { min-height:7.2rem; padding:1.15rem 1.2rem; border-left:4px solid #ff8080; background:rgba(255,255,255,.045); }
.sources > .good { border-color:#2efab0; }
.sources small,.sources code,.sources span { display:block; }
.sources small { color:#ff9a9a; font-size:clamp(.7rem, .9vw, .78rem); }
.sources .good small { color:#2efab0; }
.sources code { margin:.55rem 0; font-size:clamp(.96rem, 1.2vw, 1.08rem); }
.sources span { opacity:.78; font-size:clamp(.8rem, 1vw, .9rem); line-height:1.4; }
</style>

<!--
Demo dùng session token phía server; production có thể thay bằng JWT đã xác minh hoặc identity provider.
-->
