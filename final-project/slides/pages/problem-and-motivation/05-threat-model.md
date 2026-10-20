---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Mô hình đe dọa

<div class="first rounded bg-amber-50 border border-amber-300 px-4 py-2.5 text-[15px] text-amber-900 leading-snug">
  <b>Giả định kẻ tấn công:</b> Đã có phiên hợp lệ (ngồi vào máy mở hoặc có cookie); không sửa được hồ sơ máy chủ, không bẻ được TLS.
</div>

<div class="mt-4 grid grid-cols-[0.8fr_1.4fr] gap-4 items-start text-[15.5px] leading-snug">
  <div class="flex flex-col gap-3">
    <div class="text-[13px] font-bold uppercase tracking-wider text-slate-500">Tài sản cần bảo vệ</div>
    <div class="border-l-4 border-rose-500 bg-rose-50/80 px-3.5 py-2 rounded-r">
      <b>Phiên đã đăng nhập:</b> Không để kẻ lạ dùng quyền hạn của chủ.
    </div>
    <div class="border-l-4 border-amber-500 bg-amber-50/80 px-3.5 py-2 rounded-r">
      <b>Trải nghiệm chủ thật:</b> Không hỏi MFA quá nhiều, không thu hồi oan.
    </div>
    <div class="border-l-4 border-violet-500 bg-violet-50/80 px-3.5 py-2 rounded-r">
      <b>Hồ sơ nhịp gõ:</b> Tránh bị chèn dữ liệu xấu làm sai lệch nhận dạng.
    </div>
    <div class="border-l-4 border-emerald-500 bg-emerald-50/80 px-3.5 py-2 rounded-r">
      <b>Riêng tư người dùng:</b> Không lưu ký tự, chỉ ghi nhận thời điểm.
    </div>
  </div>

  <div>
    <div class="text-[13px] font-bold uppercase tracking-wider text-slate-500">Kịch bản tấn công</div>
    <div class="mt-2 grid grid-cols-[42px_1fr_86px] gap-x-3 gap-y-2.5 items-center text-[15px]">
      <div v-click="1" class="contents">
        <div class="rounded bg-rose-600 py-1 text-center font-black text-white text-[13px]">A1</div>
        <div class="text-slate-800">Người lạ dùng máy đang mở, gõ theo thói quen của mình.</div>
        <div class="rounded bg-emerald-100 px-2 py-1 text-center font-bold text-emerald-800 text-[13px]">Đã đo</div>
      </div>
      <div v-click="2" class="contents">
        <div class="rounded bg-rose-400 py-1 text-center font-black text-white text-[13px]">A2</div>
        <div class="text-slate-600">Biết nội dung cần gõ, nhưng không biết nhịp gõ của chủ.</div>
        <div class="rounded bg-slate-200 px-2 py-1 text-center font-bold text-slate-600 text-[13px]">Chưa đo</div>
      </div>
      <div v-click="2" class="contents">
        <div class="rounded bg-rose-300 py-1 text-center font-black text-white text-[13px]">A3</div>
        <div class="text-slate-600">Luyện bắt chước nhịp gõ của chủ thật.</div>
        <div class="rounded bg-slate-200 px-2 py-1 text-center font-bold text-slate-600 text-[13px]">Chưa đo</div>
      </div>
      <div v-click="2" class="contents">
        <div class="rounded bg-slate-500 py-1 text-center font-black text-white text-[13px]">A4</div>
        <div class="text-slate-600">Ghi lại gói dữ liệu nhịp gõ rồi gửi phát lại (replay).</div>
        <div class="rounded bg-slate-200 px-2 py-1 text-center font-bold text-slate-600 text-[13px]">Chưa đo</div>
      </div>
    </div>
    <div v-click="3" class="mt-3.5 rounded-lg bg-slate-800 px-4 py-3 text-[15px] text-white">
      <b>N</b> = phím đầu tiên của người lạ. <b>TTD (Time To Detection, thời gian đến lúc phát hiện)</b> luôn tính từ N.
    </div>
  </div>
</div>

<!--
Mục tiêu: 0:30

Kẻ tấn công đã có phiên hợp lệ; kịch bản chính là A1: người lạ ngồi vào máy đang mở và gõ theo thói quen. Hậu quả có hai chiều: kẻ lạ lọt thì phiên bị chiếm, còn chủ thật bị phiền hoặc bị thu hồi oan thì mất quyền truy cập. N là phím đầu của người lạ và TTD tính từ N.
-->
