---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Mỗi giới hạn cần một lớp kiểm soát tương ứng

<div class="control-map mt-7">
  <div class="head"><b>GIỚI HẠN</b><b>RỦI RO</b><b>KIỂM SOÁT CẦN CÓ</b></div>
  <div v-click="1"><span>Role do client gửi</span><em>Privilege escalation</em><strong>Verify token/session và whitelist role</strong></div>
  <div v-click="2"><span>Truy cập raw table/file</span><em>Bypass masking</em><strong>Backend-only access, OS permission, encryption</strong></div>
  <div v-click="3"><span>User tự nhập SQL</span><em>Đọc dữ liệu hoặc file ngoài dự kiến</em><strong>Fixed query, sandbox và giới hạn external access</strong></div>
  <div v-click="4"><span>Masking không tạo audit trail</span><em>Khó phát hiện lạm dụng</em><strong>Logging, monitoring và review quyền</strong></div>
</div>

<div v-click="5" class="takeaway-strip mt-6 p-4 text-center">
Masking giảm phơi lộ; Access Control, Encryption và Auditing mới hoàn thiện ranh giới bảo mật.
</div>

<style scoped>
.control-map { display:grid; gap:.45rem; }
.control-map > div { display:grid; grid-template-columns:1fr 1.05fr 1.6fr; gap:1rem; align-items:center; min-height:4rem; padding:.7rem 1rem; border-left:4px solid #38edf6; background:rgba(255,255,255,.05); }
.control-map > .head { min-height:2rem; padding:.2rem 1rem; border:0; background:transparent; color:#38edf6; font-size:.74rem; letter-spacing:.08em; }
.control-map span { color:#fff; font-size:.89rem; font-weight:650; }
.control-map em { color:#ffaaa9; font-size:.86rem; font-style:normal; }
.control-map strong { color:#98f6d4; font-size:.86rem; line-height:1.4; }
</style>
