---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Giới hạn của kết quả

<div class="mt-8 grid grid-cols-2 gap-x-6 gap-y-7 text-[21px] leading-snug">
  <div class="border-l-4 border-rose-500 bg-rose-50 px-5 py-6">
    <div class="mb-1 font-bold text-rose-800">Dữ liệu mô phỏng</div>
    Cho thấy quy trình chạy đúng, chưa phản ánh độ chính xác trên người dùng thật.
  </div>
  <div v-click="2" class="border-l-4 border-rose-500 bg-rose-50 px-5 py-6">
    <div class="mb-1 font-bold text-rose-800">Mới đo một kiểu tấn công</div>
    Chưa đo trường hợp kẻ lạ cố bắt chước nhịp gõ của chủ.
  </div>
  <div v-click="3" class="border-l-4 border-amber-500 bg-amber-50 px-5 py-6">
    <div class="mb-1 font-bold text-amber-800">MFA chưa phải hệ thống thật</div>
    Giả định chủ tài khoản luôn trả lời MFA đúng, kẻ lạ luôn trả lời sai.
  </div>
  <div v-click="4" class="border-l-4 border-slate-500 bg-slate-50 px-5 py-6">
    <div class="mb-1 font-bold text-slate-800">So sánh chưa hoàn toàn cân bằng</div>
    Các cấu hình hỏi MFA với tần suất khác nhau, nên kết luận mới là bước đầu.
  </div>
</div>
<!--
Mục tiêu: 0:45

Thứ nhất, dữ liệu là dữ liệu mô phỏng của 4 hồ sơ, nên kết quả dùng để kiểm chứng quy trình, chưa phải độ chính xác trên người thật.

[CLICK] Thứ hai, mới đo kịch bản người lạ gõ theo thói quen.

[CLICK] Thứ ba, MFA chưa nối với hệ thống thật: nhóm giả định chủ luôn trả lời đúng, kẻ lạ luôn sai. P2 chưa cài.

[CLICK] Và các cấu hình hỏi MFA với tần suất khác nhau, nên các kết luận ở RQ1, RQ2 mới là bước đầu, cần so lại ở cùng một mức hỏi MFA.
-->
