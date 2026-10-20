---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Kiến trúc hệ thống

<p class="sub">Phần đã hiện thực và phần đề xuất</p>

<div class="mt-2 relative">
  <!-- 5 Blocks Row -->
  <div class="grid grid-cols-5 gap-3 text-center leading-snug">
    <div class="rounded-lg border-2 border-emerald-500 bg-emerald-50/70 p-3.5 flex flex-col items-center">
      <div class="w-7 h-7 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[12px] mb-1.5">1</div>
      <b class="text-slate-900 text-[16px]">Thu phím</b>
      <span class="text-slate-600 text-[14.5px] mt-1">Chỉ thời điểm nhấn/nhả, <b>không lưu ký tự</b></span>
    </div>
    <div class="rounded-lg border-2 border-emerald-500 bg-emerald-50/70 p-3.5 flex flex-col items-center">
      <div class="w-7 h-7 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[12px] mb-1.5">2</div>
      <b class="text-slate-900 text-[16px]">Cắt cửa sổ</b>
      <span class="text-slate-600 text-[14.5px] mt-1">Cửa sổ 50 phím, trích xuất 12 đặc trưng</span>
    </div>
    <div class="rounded-lg border-2 border-emerald-500 bg-emerald-50/70 p-3.5 flex flex-col items-center">
      <div class="w-7 h-7 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[12px] mb-1.5">3</div>
      <b class="text-slate-900 text-[16px]">Chấm điểm lạ</b>
      <span class="text-slate-600 text-[14.5px] mt-1">So với chủ thật (L1 hoặc IF)</span>
    </div>
    <div class="rounded-lg border-2 border-emerald-500 bg-emerald-50/70 p-3.5 flex flex-col items-center">
      <div class="w-7 h-7 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[12px] mb-1.5">4</div>
      <b class="text-slate-900 text-[16px]">Cộng dồn</b>
      <span class="text-slate-600 text-[14.5px] mt-1">CUSUM với hệ số suy giảm &lambda;</span>
    </div>
    <div class="rounded-lg border-2 border-emerald-500 bg-emerald-50/70 p-3.5 flex flex-col items-center">
      <div class="w-7 h-7 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[12px] mb-1.5">5</div>
      <b class="text-slate-900 text-[16px]">Quyết định</b>
      <span class="text-slate-600 text-[14.5px] mt-1">Tiếp tục phiên, hỏi MFA, thu hồi</span>
    </div>
  </div>

  <!-- Proposed dashed box between 1 and 2 -->
  <div class="mt-3 rounded-lg border border-dashed border-amber-500 bg-amber-50/80 px-4 py-2.5 text-center text-[14px] text-amber-900">
    <span class="font-bold">Lớp truyền &amp; kiểm tra gói:</span> Đề xuất chống phát lại (TLS, seq/nonce) &ndash; <i>thiết kế mục tiêu, chưa hiện thực trong pipeline mô phỏng</i>
  </div>
</div>

<div class="mt-5 grid grid-cols-2 gap-4 text-[15.5px] leading-snug">
  <div v-click="1" class="rounded-lg border-l-4 border-emerald-500 bg-emerald-50 p-4 shadow-sm">
    <div class="font-bold text-emerald-900 text-[17px] flex items-center gap-1.5">
      <div class="i-carbon-checkmark-filled text-emerald-600 text-lg"></div> Đã hiện thực
    </div>
    <div class="mt-1.5 text-slate-700">
      Collector &bull; 12 đặc trưng &bull; 2 bộ chấm điểm &bull; 4 cấu hình (B0, B1, P1, B1 &lambda;=1) &bull; bộ đối chiếu
    </div>
  </div>

  <div v-click="2" class="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 shadow-sm">
    <div class="font-bold text-amber-900 text-[17px] flex items-center gap-1.5">
      <div class="i-carbon-warning-filled text-amber-600 text-lg"></div> Chưa hiện thực
    </div>
    <div class="mt-1.5 text-slate-700">
      Lớp truyền chống phát lại &bull; MFA thời gian thực &bull; live end-to-end &bull; cập nhật sau MFA (P2)
    </div>
  </div>
</div>

<!--
Mục tiêu: 0:40

Hệ thống gồm năm khối. Các cấu hình so sánh dùng chung một đường xử lý nên so sánh công bằng. Thực nghiệm chạy ngoại tuyến theo kiểu replay trên dữ liệu mô phỏng. Lớp truyền chống phát lại và luồng live chưa làm, chúng em ghi rõ ở đây.
-->