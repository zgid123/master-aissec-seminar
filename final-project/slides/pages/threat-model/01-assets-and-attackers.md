---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Tài sản và kẻ tấn công

<div class="mt-1 grid grid-cols-[0.85fr_1.4fr] gap-6 items-start text-[14px] leading-snug">
  <div class="flex flex-col gap-2">
    <div class="text-[12px] font-bold uppercase tracking-wide text-slate-500">Tài sản cần bảo vệ</div>
    <div class="border-l-4 border-rose-500 bg-rose-50 px-3 py-2"><b>Phiên đã đăng nhập</b><br>Bị xâm nhập: kẻ lạ thao tác bằng quyền chủ.</div>
    <div class="border-l-4 border-amber-500 bg-amber-50 px-3 py-2"><b>Quyền dùng dịch vụ của chủ thật</b><br>Bị từ chối: hỏi MFA quá nhiều hoặc thu hồi oan.</div>
    <div class="border-l-4 border-violet-500 bg-violet-50 px-3 py-2"><b>Hồ sơ nhịp gõ</b><br>Bị đầu độc thì mọi quyết định sau đều sai.</div>
    <div class="border-l-4 border-slate-500 bg-slate-50 px-3 py-2"><b>Dữ liệu nhịp gõ thô</b><br>Là dữ liệu hành vi cá nhân.</div>
  </div>
  <div>
    <div class="text-[12px] font-bold uppercase tracking-wide text-slate-500">Kịch bản tấn công</div>
    <div class="mt-2 grid grid-cols-[48px_1fr_110px] gap-x-3 gap-y-2 items-center">
      <div v-click="1" class="contents">
        <div class="rounded bg-rose-600 py-1 text-center font-black text-white">A1</div>
        <div>Người lạ ngồi vào phiên đang mở, gõ theo thói quen của mình (zero-effort).</div>
        <div class="rounded bg-emerald-100 px-2 py-1 text-center font-bold text-emerald-800">Đã đo</div>
      </div>
      <div v-click="2" class="contents">
        <div class="rounded bg-rose-400 py-1 text-center font-black text-white">A2</div>
        <div>Như A1, biết nội dung cần nhập nhưng không biết nhịp gõ của chủ.</div>
        <div class="rounded bg-slate-200 px-2 py-1 text-center font-bold text-slate-600">Chưa đo</div>
      </div>
      <div v-click="2" class="contents">
        <div class="rounded bg-rose-300 py-1 text-center font-black text-white">A3</div>
        <div>Có mẫu nhịp gõ của chủ và luyện bắt chước. Tey và cộng sự: FAR có thể lên 0,99 với mật khẩu cố định.</div>
        <div class="rounded bg-slate-200 px-2 py-1 text-center font-bold text-slate-600">Giới hạn</div>
      </div>
      <div v-click="2" class="contents">
        <div class="rounded bg-slate-500 py-1 text-center font-black text-white">A4</div>
        <div>Ghi lại gói sự kiện rồi gửi lại. Đề xuất TLS kèm seq và nonce.</div>
        <div class="rounded bg-slate-200 px-2 py-1 text-center font-bold text-slate-600">Thiết kế</div>
      </div>
    </div>
    <div v-click="3" class="mt-3 rounded-lg bg-slate-800 px-4 py-2 text-[14px] text-white">
      Thời điểm tiếp quản <b>N</b> là phím đầu tiên của người lạ. Cảnh báo trước N là báo động nhầm; TTD đo từ N.
    </div>
  </div>
</div>

<!--
Mục tiêu: 1:00

Bên trái là bốn tài sản. Hậu quả có hai chiều: xâm nhập, khi kẻ lạ được chấp nhận; và từ chối dịch vụ, khi chủ thật bị làm phiền hoặc bị thu hồi oan. Đó là lý do nhóm đo cả phát hiện lẫn số lần MFA mỗi giờ. Hồ sơ nhịp gõ là tài sản quan trọng nhất vì mọi quyết định dựa vào nó.

[CLICK] Kẻ tấn công đã có quyền thao tác trong phiên hợp lệ; điều nhóm quan tâm là anh ta gõ như thế nào. A1 là kịch bản chính: người lạ ngồi vào máy và gõ theo thói quen. Đây là kịch bản duy nhất đã được đo.

[CLICK] A2 cần giữ nội dung gõ giống nhau, chưa có dữ liệu. A3 là bắt chước có luyện tập: nghiên cứu của Tey và cộng sự trên mật khẩu 8 ký tự cho thấy kẻ giỏi nhất đạt FAR 0,99, nên nhóm xem A3 là giới hạn. A4 là phát lại gói, mới dừng ở mức thiết kế.

[CLICK] Quy tắc quan trọng khi đánh giá: N là phím đầu tiên do người lạ gõ. Cảnh báo trước N là báo động nhầm với chủ thật, không phải phát hiện sớm. TTD luôn tính từ N.
-->
