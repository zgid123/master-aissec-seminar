---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Bước 4 - Xác thực người dùng

Authentication middleware kiểm tra token và tạo <code>req.user</code> đáng tin cậy.{.op-60}

<div class="cols mt-5">
<div>

```ts {all|8-9|11-15}
type Role = 'manager' | 'support'

async function requireAuth(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  const token: string = readBearerToken(req)
  const claims: JwtClaims = await verifyToken(token)

  req.user = {
    id: claims.sub,
    role: parseRole(claims.role),
  }
  next()
}
```

</div>
<div class="sources">
  <div class="bad" v-click="2"><small>KHÔNG TIN CẬY</small><code>req.body.role</code><span>Client có thể tự sửa thành <b>manager</b></span></div>
  <div class="good" v-click="2"><small>TIN CẬY SAU KHI XÁC MINH</small><code>req.user.role</code><span>Được đọc từ token/session hợp lệ</span></div>
</div>
</div>

<div v-click="3" class="mt-6 rounded-lg border border-cyan-300/30 bg-cyan-500/8 p-4 text-center text-base">
Sau bước này, Node.js mới có access context: <code>{ userId, role }</code>.
</div>

<style scoped>
.cols { display:grid; grid-template-columns:1.08fr .92fr; gap:1.4rem; }
.sources { display:grid; gap:1rem; align-content:center; }
.sources > div { padding:1rem; border-left:4px solid #ff8080; background:rgba(255,255,255,.045); }
.sources > .good { border-color:#2efab0; }
.sources small,.sources code,.sources span { display:block; }
.sources small { color:#ff9a9a; font-size:.57rem; }
.sources .good small { color:#2efab0; }
.sources code { margin:.45rem 0; }
.sources span { opacity:.68; font-size:.66rem; }
</style>
