---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Khoảng hở sau MFA

<div class="-mt-2 text-[15px] text-slate-600 leading-snug">
  MFA chỉ xác nhận người dùng tại thời điểm đăng nhập. Sau đó máy chủ chỉ kiểm tra bí mật phiên.
</div>

<img src="/figures/hinh1_timeline.png" class="mx-auto mt-2 h-[190px]" alt="Kịch bản chiếm phiên sau khi đăng nhập" />

<div class="mt-2 grid grid-cols-2 gap-4 text-[14.5px] leading-snug">
  <div v-click class="border-l-4 border-sky-500 bg-sky-50 px-4 py-2.5">
    <b>NIST SP 800-63B-4, mục 5.3</b><br>
    Giám sát phiên (session monitoring) là biện pháp tùy chọn: đánh giá liên tục đặc tính phiên, trong đó có sinh trắc hành vi như nhịp gõ.
  </div>
  <div v-click class="border-l-4 border-rose-500 bg-rose-50 px-4 py-2.5">
    <b>Khi phát hiện nghi vấn</b><br>
    Bên phụ thuộc nên xác thực lại hoặc kết thúc phiên. Đề tài hiện thực hai hành động: <b>yêu cầu MFA</b> và <b>thu hồi phiên</b>.
  </div>
</div>

<!--
Mục tiêu: 0:50

MFA chỉ trả lời câu hỏi "ai đang đăng nhập lúc này". Sau đó phiên được duy trì bằng cookie hoặc token, ai giữ được thì dùng được phiên.

Hình minh họa: 9 giờ người dùng đăng nhập và qua MFA. 13 giờ 20 có người khác ngồi vào máy đang mở. Máy chủ vẫn thấy một phiên hợp lệ. Mục tiêu của đề tài là rút ngắn khoảng màu đỏ này.

[CLICK] NIST SP 800-63B-4 năm 2025 có mục giám sát phiên, và nêu nhịp gõ như một ví dụ của sinh trắc hành vi.

[CLICK] Khi thấy nghi vấn, chuẩn khuyến nghị xác thực lại hoặc kết thúc phiên. Nhóm hiện thực đúng hai hành động đó.
-->
