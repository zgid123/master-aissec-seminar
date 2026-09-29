---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Dữ liệu chuẩn bị gửi

<DemoProgress :active="2" />

<div class="mt-4 text-[14px] text-slate-600">Ba dòng trích từ <code>customer_segments</code></div>

<table class="mt-3 w-full table-fixed border-collapse text-[12px]">
  <thead><tr class="border-y border-slate-300 bg-slate-100 text-left"><th class="w-[17%] px-3 py-2">customer_id</th><th class="w-[23%] px-3 py-2">email</th><th class="w-[16%] px-3 py-2">phone</th><th class="w-[10%] px-3 py-2">region</th><th class="w-[16%] px-3 py-2">campaign_code</th><th class="w-[18%] px-3 py-2">support_note</th></tr></thead>
  <tbody>
    <tr class="border-b border-slate-200 bg-rose-50/70"><td class="px-3 py-3 font-mono">CUS-00000000</td><td class="px-3 py-3 font-mono text-rose-700">customer0@example.test</td><td class="px-3 py-3 font-mono text-rose-700">0900000000</td><td class="px-3 py-3">HCM</td><td class="px-3 py-3 font-mono text-amber-700">AURORA-2026</td><td class="px-3 py-3 font-semibold text-violet-800">Đang mang thai, cần giao hàng tại nhà.</td></tr>
    <tr class="border-b border-slate-200"><td class="px-3 py-3 font-mono">CUS-00000001</td><td class="px-3 py-3 font-mono text-rose-700">customer1@example.test</td><td class="px-3 py-3 font-mono text-rose-700">0900000001</td><td class="px-3 py-3">HN</td><td class="px-3 py-3 font-mono">PUBLIC-CAMPAIGN</td><td class="px-3 py-3 text-slate-600">Hỏi về chương trình tích điểm.</td></tr>
    <tr class="border-b border-slate-200"><td class="px-3 py-3 font-mono">CUS-00000002</td><td class="px-3 py-3 font-mono text-rose-700">customer2@example.test</td><td class="px-3 py-3 font-mono text-rose-700">0900000002</td><td class="px-3 py-3">DN</td><td class="px-3 py-3 font-mono">PUBLIC-CAMPAIGN</td><td class="px-3 py-3 text-slate-600">Hỏi về chương trình tích điểm.</td></tr>
  </tbody>
</table>

<div class="mt-5 grid grid-cols-3 gap-5 text-[14px]">
  <div v-click class="border-t-4 border-rose-500 bg-rose-50 px-4 py-3"><b class="text-rose-700">Thông tin cá nhân</b><br><span class="text-slate-600">Email, số điện thoại</span></div>
  <div v-click class="border-t-4 border-amber-500 bg-amber-50 px-4 py-3"><b class="text-amber-700">Thông tin nội bộ</b><br><span class="text-slate-600">Mã chiến dịch chưa công bố</span></div>
  <div v-click class="border-t-4 border-violet-500 bg-violet-50 px-4 py-3"><b class="text-violet-700">Thông tin sức khỏe</b><br><span class="text-slate-600">Nằm trong câu ghi chú tự do</span></div>
</div>

<!--
Mục tiêu: 0:40

Đây là ba dòng dữ liệu thật trong kịch bản demo.

[CLICK] Email và số điện thoại là thông tin cá nhân có cấu trúc, khá dễ nhận ra.

[CLICK] AURORA-2026 là mã chiến dịch nội bộ. Nhìn hình thức, nó chỉ giống một chuỗi văn bản bình thường.

[CLICK] Câu ghi chú về việc mang thai là thông tin sức khỏe, nhưng nó nằm trong văn bản tự do. Đây là chỗ quy tắc đơn giản có thể bỏ sót.
-->
