---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Giới hạn cần đọc kèm kết quả

<div class="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-[15px] leading-snug">
  <div class="border-l-4 border-rose-500 bg-rose-50 px-4 py-2.5">
    <div class="font-bold text-rose-800">Dữ liệu mô phỏng</div>
    4 hồ sơ, 24 phiên. Số liệu kiểm chứng quy trình, chưa nói được độ chính xác trên người dùng thật.
  </div>
  <div v-click class="border-l-4 border-rose-500 bg-rose-50 px-4 py-2.5">
    <div class="font-bold text-rose-800">Mới đo một kiểu tấn công</div>
    Chỉ đo A1 (người lạ gõ theo thói quen). Bắt chước nhịp gõ và phát lại gói chưa được đánh giá.
  </div>
  <div v-click class="border-l-4 border-amber-500 bg-amber-50 px-4 py-2.5">
    <div class="font-bold text-amber-800">MFA giả lập</div>
    Chủ thật luôn qua, người lạ luôn trượt. Chưa có MFA thật và chưa có P2.
  </div>
  <div v-click class="border-l-4 border-slate-500 bg-slate-50 px-4 py-2.5">
    <div class="font-bold text-slate-800">Chưa so sánh cùng mức hỏi MFA</div>
    Các cấu hình hỏi MFA với tần suất khác nhau, nên chưa đủ căn cứ chấp nhận hay bác bỏ H1, H2.
  </div>
</div>

<!--
Mục tiêu: 0:45

Thứ nhất, dữ liệu là dữ liệu mô phỏng của 4 hồ sơ, nên kết quả dùng để kiểm chứng quy trình, chưa phải độ chính xác trên người thật.

[CLICK] Thứ hai, mới đo kịch bản người lạ gõ theo thói quen.

[CLICK] Thứ ba, MFA được giả lập và P2 chưa cài.

[CLICK] Và các cấu hình hỏi MFA với tần suất khác nhau, nên nhóm chưa kết luận H1, H2.
-->
