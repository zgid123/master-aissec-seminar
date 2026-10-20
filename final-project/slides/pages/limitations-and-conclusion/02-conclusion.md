---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Kết luận và hướng phát triển

<div class="first grid grid-cols-[1.1fr_1fr] gap-6 items-stretch">
  <!-- Left column: Điều rút ra -->
  <div class="flex flex-col h-[340px]">
    <div class="font-bold text-slate-700 text-[13px] uppercase tracking-wider flex items-center gap-2 mb-3">
      <div class="i-carbon-idea text-sky-600 text-lg"></div> Điều rút ra
    </div>
    <div class="flex flex-col gap-3 flex-1 justify-between text-[15.5px]">
      <div class="rounded-xl border-l-4 border-sky-500 bg-sky-50 p-4 shadow-sm flex-1 flex flex-col justify-center">
        <b class="text-sky-900 text-[17px] mb-1">1. Khoảng hở sau MFA là có thật</b>
        <span class="text-slate-700 leading-relaxed">Nhịp gõ là tín hiệu bổ sung thụ động, không làm gián đoạn trải nghiệm người dùng.</span>
      </div>
      <div v-click="1" class="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-4 shadow-sm flex-1 flex flex-col justify-center">
        <b class="text-amber-900 text-[17px] mb-1">2. Trong mô phỏng, cộng dồn tăng phát hiện</b>
        <span class="text-slate-700 leading-relaxed">Nhưng kèm nhiều lần hỏi MFA hơn: một đánh đổi tất yếu, chưa phải kết luận tối ưu.</span>
      </div>
      <div v-click="2" class="rounded-xl border-l-4 border-emerald-500 bg-emerald-50 p-4 shadow-sm flex-1 flex flex-col justify-center">
        <b class="text-emerald-900 text-[17px] mb-1">3. Đóng góp chính là quy trình đánh giá</b>
        <span class="text-slate-700 leading-relaxed">Kiểm lại được độc lập (TTD, MFA/giờ, đối chiếu), sẵn sàng chạy trên dữ liệu thật.</span>
      </div>
    </div>
  </div>

  <!-- Right column: Bước tiếp theo -->
  <div v-click="3" class="flex flex-col h-[340px]">
    <div class="font-bold text-slate-700 text-[13px] uppercase tracking-wider flex items-center gap-2 mb-3">
      <div class="i-carbon-direction-straight-right text-emerald-600 text-lg"></div> Bước tiếp theo
    </div>
    <div class="flex flex-col gap-3 flex-1 justify-between text-[15.5px]">
      <div class="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm flex-1 flex items-start gap-3.5">
        <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-[14px]">1</div>
        <div class="flex flex-col justify-center">
          <b class="text-slate-900 text-[17px] mb-0.5">Thu dữ liệu thật</b>
          <span class="text-slate-700 leading-relaxed">20 người &times; 5 phiên (2 train, 2 validation, 1 test) bằng công cụ collector đã kiểm thử.</span>
        </div>
      </div>
      <div class="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm flex-1 flex items-start gap-3.5">
        <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-[14px]">2</div>
        <div class="flex flex-col justify-center">
          <b class="text-slate-900 text-[17px] mb-0.5">Gắn hệ thống live</b>
          <span class="text-slate-700 leading-relaxed">Ghép collector với bộ điều khiển phiên, bổ sung lớp truyền chống phát lại.</span>
        </div>
      </div>
      <div class="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm flex-1 flex items-start gap-3.5">
        <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-[14px]">3</div>
        <div class="flex flex-col justify-center">
          <b class="text-slate-900 text-[17px] mb-0.5">Triển khai P2</b>
          <span class="text-slate-700 leading-relaxed">Tự cập nhật hồ sơ sau MFA, thử nghiệm thêm đặc trưng và tinh chỉnh ngưỡng tối ưu.</span>
        </div>
      </div>
    </div>
  </div>
</div>

<!--
Mục tiêu: 0:45

Tóm lại, nhịp gõ bổ sung cho MFA chứ không thay thế. Kết quả mô phỏng cho thấy cộng dồn tăng phát hiện nhưng kéo theo nhiều lần xác thực lại. Đóng góp chính là quy trình đánh giá kiểm lại được. Bước tiếp theo là thu dữ liệu thật của 20 người.
-->
