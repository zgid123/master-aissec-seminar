---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# DLP kiểm tra dữ liệu

<DemoProgress :active="3" />

<div class="mt-5 grid grid-cols-[1.05fr_0.9fr_0.72fr] gap-x-5 gap-y-3 items-center text-[14px]">
  <div class="font-bold text-slate-500">DỮ LIỆU NHÌN THẤY</div><div class="font-bold text-slate-500">CÁCH KIỂM TRA</div><div class="font-bold text-slate-500">KẾT QUẢ</div>
  <div v-click class="contents"><div class="border-l-4 border-rose-500 bg-rose-50 px-4 py-4"><code>customer0@example.test</code><br><code>0900000000</code></div><div class="text-[16px]"><b>Quy tắc định dạng</b><br><span class="text-slate-500">Nhận ra email và số điện thoại</span></div><div class="rounded-lg bg-rose-100 px-4 py-3 text-center font-black text-rose-700">THÔNG TIN CÁ NHÂN</div></div>
  <div v-click class="contents"><div class="border-l-4 border-amber-500 bg-amber-50 px-4 py-4"><code>AURORA-2026</code></div><div class="text-[16px]"><b>Fingerprint</b><br><span class="text-slate-500">So với mẫu nội bộ đã đăng ký</span></div><div class="rounded-lg bg-amber-100 px-4 py-3 text-center font-black text-amber-700">THÔNG TIN NỘI BỘ</div></div>
  <div v-click class="contents"><div class="border-l-4 border-violet-500 bg-violet-50 px-4 py-4 font-semibold text-violet-800">“Đang mang thai, cần giao hàng tại nhà.”</div><div class="text-[16px]"><b>AI đọc ngữ cảnh</b><br><span class="text-slate-500">Nhận ra ý nghĩa của câu tự do</span></div><div class="rounded-lg bg-violet-100 px-4 py-3 text-center font-black text-violet-700">THÔNG TIN SỨC KHỎE</div></div>
</div>

<div v-click class="mt-5 border-l-4 border-violet-500 bg-violet-50/70 px-5 py-3 text-[17px] leading-relaxed text-slate-800">
  <b>AI chỉ bổ sung tín hiệu còn thiếu.</b> Quyết định cho phép hay chặn vẫn do policy của tổ chức đưa ra.
</div>

<!--
Mục tiêu: 0:50

Giống demo DDM dùng nhiều phép biến đổi cho những mục đích khác nhau, DLP cũng không dựa vào một bộ dò duy nhất.

[CLICK] Email và số điện thoại có định dạng ổn định nên quy tắc nhận ra được.

[CLICK] Mã AURORA-2026 được nhận ra vì hệ thống đã lưu fingerprint của chuỗi nội bộ cần bảo vệ.

[CLICK] Câu ghi chú không có định dạng cố định. Mô hình AI đọc ngữ cảnh và gắn nhãn thông tin sức khỏe.

[CLICK] AI không tự quyết định chặn. Nó chỉ tạo thêm tín hiệu để policy sử dụng cùng với người gửi, hành động và nơi nhận.
-->
