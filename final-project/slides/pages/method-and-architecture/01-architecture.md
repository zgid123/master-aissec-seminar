---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Kiến trúc hệ thống

<div class="mt-6 flex items-stretch gap-1.5 text-[19px] leading-tight">
  <div class="arch done"><span class="num">1</span><b>Thu phím</b><span>chỉ thời điểm,<br>không ký tự</span></div>
  <div class="arrow">→</div>
  <div class="arch done"><span class="num">2</span><b>Cắt đoạn</b><span>50 phím,<br>12 đặc trưng</span></div>
  <div class="arrow">→</div>
  <div class="arch done"><span class="num">3</span><b>Chấm điểm lạ</b><span>L1 hoặc<br>Isolation Forest</span></div>
  <div class="arrow">→</div>
  <div class="arch done"><span class="num">4</span><b>Cộng dồn</b><span>CUSUM</span></div>
  <div class="arrow">→</div>
  <div class="arch done"><span class="num">5</span><b>Quyết định</b><span>tiếp tục, hỏi MFA,<br>thu hồi</span></div>
</div>

<div class="mt-10 grid grid-cols-2 gap-5 text-[19px] leading-snug">
  <div v-click="2" class="border-l-4 border-emerald-500 bg-emerald-50 px-5 py-4">
    <b>Đã làm</b><br>Công cụ thu phím, xử lý đặc trưng, hai bộ chấm điểm, các cấu hình và bộ kiểm lại kết quả.
  </div>
  <div v-click="3" class="border-l-4 border-amber-500 bg-amber-50 px-5 py-4">
    <b>Bước sau</b><br>Gắn vào hệ thống thật với MFA thật, chống gửi lại dữ liệu cũ.
  </div>
</div>
<style scoped>
.arch { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center; border-radius: 8px; border: 2px solid; padding: 30px 4px; }
.arch span:last-child { color: #475569; font-size: 16.5px; }
.arch.done { border-color: #10b981; background: #ecfdf5; }
.arch.todo { border-color: #f59e0b; border-style: dashed; background: #fffbeb; }
.num { display: inline-flex; width: 24px; height: 24px; align-items: center; justify-content: center; border-radius: 999px; background: #0f172a; color: white; font-size: 13px; font-weight: 700; }
.todo .num { background: #b45309; }
.arrow { align-self: center; color: #64748b; font-weight: 700; font-size: 20px; }
</style>

<!--
Mục tiêu: 0:45

Hệ thống gồm năm bước: thu phím trên trình duyệt, chỉ lấy thời điểm nhấn nhả; cắt thành đoạn 50 phím; chấm xem đoạn đó lạ cỡ nào so với chính chủ; cộng dồn bằng CUSUM; cuối cùng quyết định tiếp tục, hỏi MFA hay thu hồi phiên.

[CLICK] Phần đã làm được.

[CLICK] Phần còn ở mức thiết kế: chạy trực tiếp trên phiên thật và MFA thật. Mọi cấu hình dùng cùng pipeline và cùng dữ liệu nên so sánh công bằng.
-->