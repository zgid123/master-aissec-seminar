---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Phạm vi, giả định và riêng tư

<div class="mt-1 grid grid-cols-3 gap-4 text-[14px] leading-snug">
  <div class="rounded-lg border-t-4 border-sky-500 bg-sky-50 px-4 py-3">
    <div class="font-bold text-sky-900">Giả định</div>
    <ul class="mt-1.5 !pl-4 [&_li]:!my-1">
      <li>Chủ đã qua MFA và gõ đủ lâu trước khi bị tiếp quản.</li>
      <li>Máy chủ và kho hồ sơ chưa bị chiếm.</li>
      <li>Đồng hồ trình duyệt mịn hơn 1 ms.</li>
      <li>MFA mô phỏng: chủ qua, người lạ trượt.</li>
    </ul>
  </div>
  <div v-click class="rounded-lg border-t-4 border-rose-500 bg-rose-50 px-4 py-3">
    <div class="font-bold text-rose-900">Ngoài phạm vi</div>
    <ul class="mt-1.5 !pl-4 [&_li]:!my-1">
      <li>Bot hoặc mã độc tự sinh sự kiện phím.</li>
      <li>Tấn công trung gian kênh truyền.</li>
      <li>Bị ép buộc hoặc gõ hộ có đồng ý.</li>
      <li>Công cụ trợ năng, nhập bằng giọng nói.</li>
    </ul>
  </div>
  <div v-click class="rounded-lg border-t-4 border-emerald-500 bg-emerald-50 px-4 py-3">
    <div class="font-bold text-emerald-900">Riêng tư</div>
    <ul class="mt-1.5 !pl-4 [&_li]:!my-1">
      <li>Chỉ lưu <b>nhóm phím</b> và thời điểm nhấn, nhả; không lưu ký tự.</li>
      <li>Nghị định 356/2025: dữ liệu theo dõi hành vi là dữ liệu nhạy cảm.</li>
      <li>Phiếu đồng thuận lưu riêng, có quyền rút lui.</li>
    </ul>
  </div>
</div>

<div v-click class="mt-4 border-l-4 border-slate-500 bg-slate-50 px-5 py-2.5 text-[15px] text-slate-800">
  <b>Không tuyên bố:</b> nhịp gõ không thay thế mật khẩu hay MFA. Đây là xác minh 1:1, chỉ quyết định <b>khi nào</b> cần xác thực lại.
</div>

<!--
Mục tiêu: 0:40

Cột đầu là các giả định. Quan trọng nhất là MFA trong thực nghiệm được mô phỏng: chủ thật luôn qua, người lạ luôn trượt. Đồng hồ trình duyệt phải đủ mịn; Firefox mặc định làm tròn khoảng 2 mili giây nên không đạt.

[CLICK] Ngoài phạm vi: khi kẻ tấn công kiểm soát được thiết bị và tự sinh sự kiện phím, mọi tín hiệu hành vi mất ý nghĩa. Tương tự với người bị ép gõ hộ.

[CLICK] Về riêng tư, collector chỉ ghi ba nhóm phím: gõ chữ, phân cách và sửa lỗi, cùng thời điểm nhấn nhả. Nghị định 356 năm 2025 xếp dữ liệu theo dõi hành vi trên không gian mạng vào dữ liệu nhạy cảm, nên nhóm xử lý nhịp gõ theo hướng thận trọng đó.

[CLICK] Nhóm không tuyên bố nhịp gõ thay thế MFA. Hệ thống chỉ quyết định thời điểm cần hỏi lại.
-->
