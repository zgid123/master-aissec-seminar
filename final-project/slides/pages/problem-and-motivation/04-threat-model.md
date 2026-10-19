---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Mô hình đe dọa

<div class="mt-1 grid grid-cols-[0.85fr_1.4fr] gap-6 items-start text-[17.5px] leading-snug">
  <div class="flex flex-col gap-2.5">
    <div class="text-[13px] font-bold uppercase tracking-wide text-slate-500">Tài sản cần bảo vệ</div>
    <div class="border-l-4 border-rose-500 bg-rose-50 px-3 py-2"><b>Phiên đã đăng nhập</b><br>Không để kẻ lạ dùng quyền của chủ.</div>
    <div class="border-l-4 border-amber-500 bg-amber-50 px-3 py-2"><b>Trải nghiệm chủ thật</b><br>Không hỏi MFA quá nhiều, không đăng xuất oan.</div>
    <div class="border-l-4 border-violet-500 bg-violet-50 px-3 py-2"><b>Hồ sơ nhịp gõ</b><br>Bị chèn dữ liệu xấu thì nhận nhầm người.</div>
    <div class="border-l-4 border-emerald-500 bg-emerald-50 px-3 py-2"><b>Riêng tư</b><br>Không lưu ký tự đã gõ.</div>
  </div>
  <div>
    <div class="text-[13px] font-bold uppercase tracking-wide text-slate-500">Kịch bản tấn công</div>
    <div class="mt-2 grid grid-cols-[48px_1fr_110px] gap-x-3 gap-y-4 items-center">
      <div v-click="1" class="contents">
        <div class="rounded bg-rose-600 py-1 text-center font-black text-white">A1</div>
        <div>Người lạ dùng máy đang đăng nhập, gõ theo thói quen của mình.</div>
        <div class="rounded bg-emerald-100 px-2 py-1 text-center font-bold text-emerald-800">Đã đo</div>
      </div>
      <div v-click="2" class="contents">
        <div class="rounded bg-rose-400 py-1 text-center font-black text-white">A2</div>
        <div>Biết nội dung cần gõ, nhưng không biết nhịp gõ của chủ.</div>
        <div class="rounded bg-slate-200 px-2 py-1 text-center font-bold text-slate-600">Chưa đo</div>
      </div>
      <div v-click="2" class="contents">
        <div class="rounded bg-rose-300 py-1 text-center font-black text-white">A3</div>
        <div>Luyện bắt chước nhịp gõ của chủ.</div>
        <div class="rounded bg-slate-200 px-2 py-1 text-center font-bold text-slate-600">Chưa đo</div>
      </div>
      <div v-click="2" class="contents">
        <div class="rounded bg-slate-500 py-1 text-center font-black text-white">A4</div>
        <div>Ghi lại dữ liệu nhịp gõ rồi gửi lại.</div>
        <div class="rounded bg-slate-200 px-2 py-1 text-center font-bold text-slate-600">Chưa đo</div>
      </div>
    </div>
    <div v-click="3" class="mt-4 rounded-lg bg-slate-800 px-4 py-2.5 text-[16px] text-white">
      <b>N</b> = phím đầu tiên của người lạ. Thời gian phát hiện (TTD) tính từ N.
    </div>
  </div>
</div>

<!--
Mục tiêu: 1:00

Bên trái là các tài sản cần bảo vệ. Hậu quả có hai chiều: kẻ lạ được chấp nhận thì phiên bị xâm nhập; còn chủ thật bị hỏi MFA quá nhiều hoặc bị thu hồi oan thì mất quyền dùng dịch vụ. Vì vậy nhóm đo cả hai chiều. Về riêng tư, hệ thống chỉ lưu nhóm phím và thời điểm, không lưu nội dung đã gõ.

[CLICK] Kịch bản chính là A1: người lạ ngồi vào máy đang mở và gõ theo thói quen của mình. Đây là kịch bản đã được đo.

[CLICK] A2, A3, A4 nằm trong mô hình nhưng chưa đo. Bot hay mã độc tự sinh phím thì nằm ngoài phạm vi.

[CLICK] Quy tắc khi đánh giá: N là phím đầu tiên của người lạ. Cảnh báo trước N là báo động nhầm với chủ thật, và thời gian phát hiện TTD luôn tính từ N.
-->
