---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Giới hạn nghiên cứu

<div class="first grid grid-cols-2 gap-4 text-[16px] leading-relaxed">
  <div class="rounded-xl border-l-4 border-rose-500 bg-rose-50/80 p-4 min-h-[110px] shadow-sm flex flex-col justify-center">
    <div class="font-bold text-rose-900 text-[18px]">Dữ liệu mô phỏng</div>
    <div class="mt-1 text-slate-700">Cho thấy quy trình phân tích chạy đúng và chặt chẽ, nhưng chưa phản ánh đầy đủ độ biến động trên người dùng thật.</div>
  </div>

  <div v-click="1" class="rounded-xl border-l-4 border-rose-500 bg-rose-50/80 p-4 min-h-[110px] shadow-sm flex flex-col justify-center">
    <div class="font-bold text-rose-900 text-[18px]">Mới đo một kiểu tấn công (A1)</div>
    <div class="mt-1 text-slate-700">Kẻ tấn công được ghép offline từ phiên người khác; cơ chế kiểm tra chống phát lại mới ở mức thiết kế.</div>
  </div>

  <div v-click="2" class="rounded-xl border-l-4 border-amber-500 bg-amber-50/80 p-4 min-h-[110px] shadow-sm flex flex-col justify-center">
    <div class="font-bold text-amber-900 text-[18px]">MFA chưa phải hệ thống thật</div>
    <div class="mt-1 text-slate-700">Giả định lý tưởng: chủ tài khoản luôn vượt qua MFA thành công, kẻ lạ luôn xác thực thất bại.</div>
  </div>

  <div v-click="2" class="rounded-xl border-l-4 border-slate-500 bg-slate-50 p-4 min-h-[110px] shadow-sm flex flex-col justify-center">
    <div class="font-bold text-slate-800 text-[18px]">So sánh chưa hoàn toàn cân bằng</div>
    <div class="mt-1 text-slate-700">Các cấu hình hỏi MFA với tần suất khác nhau nên chưa so được ở cùng mức đánh đổi, kết luận dừng ở bước đầu.</div>
  </div>
</div>

<!-- Dải 4 chip Chưa triển khai -->
<div v-click="3" class="mt-5">
  <div class="text-[13px] font-bold uppercase tracking-wider text-rose-800 mb-2">CHƯA HIỆN THỰC (GIỚI HẠN PHẠM VI)</div>
  <div class="grid grid-cols-4 gap-3">
    <div class="rounded-lg border border-rose-200 bg-rose-50/90 p-3 text-[14.5px] font-medium text-rose-900 text-center shadow-sm">Hệ thống live end-to-end</div>
    <div class="rounded-lg border border-rose-200 bg-rose-50/90 p-3 text-[14.5px] font-medium text-rose-900 text-center shadow-sm">Chống phát lại trên mạng</div>
    <div class="rounded-lg border border-rose-200 bg-rose-50/90 p-3 text-[14.5px] font-medium text-rose-900 text-center shadow-sm">Cập nhật hồ sơ sau MFA (P2)</div>
    <div class="rounded-lg border border-rose-200 bg-rose-50/90 p-3 text-[14.5px] font-medium text-rose-900 text-center shadow-sm">Thuật toán One-Class SVM</div>
  </div>
</div>

<!--
Mục tiêu: 0:45

Giới hạn lớn nhất là dữ liệu và MFA đều mô phỏng, kẻ tấn công ghép offline, và các cấu hình hỏi MFA với tần suất khác nhau nên kết luận mới là bước đầu. Live, chống phát lại, P2 và One-Class SVM chưa làm.
-->
