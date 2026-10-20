---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Xác thực liên tục

<p class="sub">Định nghĩa và ứng dụng thực tế</p>

<div class="fig-card" style="height:250px">
  <img src="/img/H2_dinh_nghia.svg" alt="Từ dữ liệu đến quyết định" />
</div>

<div class="chips c3 mt-4 text-[16px]">
  <div class="rounded-lg border-l-4 border-sky-600 bg-sky-50/90 p-4 shadow-sm h-full flex flex-col justify-center">
    <b>Đánh giá liên tục</b> tín hiệu trong phiên &rarr; tiếp tục / hỏi MFA / thu hồi
  </div>

  <div class="rounded-lg border-l-4 border-emerald-600 bg-emerald-50/90 p-4 shadow-sm h-full flex flex-col justify-center">
    <b>Xác minh 1:1:</b> "đúng chủ không?", không phải "đây là ai"
  </div>

  <div v-click="1" class="rounded-lg border-l-4 border-amber-500 bg-amber-50/90 p-4 shadow-sm h-full flex flex-col justify-center">
    <b>TypingDNA ActiveLock:</b> theo dõi cách gõ, khóa máy hoặc cảnh báo
  </div>
</div>

<!--
Mục tiêu: 1:00

Xác thực liên tục là kiểm tra thêm tín hiệu ngay trong phiên, thay vì chỉ lúc đăng nhập. Đây là xác minh một-một, không nhận dạng người dùng. Ngoài thực tế đã có sản phẩm như ActiveLock (hãng nêu: kiểm tra ngắn ~50 ký tự, sâu 150–200 ký tự, không so trực tiếp với TTD của nhóm), nhưng đó là mô tả của nhà cung cấp, và hệ thống đó còn dùng thêm tín hiệu khác nên không tương đương hệ thống của nhóm.
-->
