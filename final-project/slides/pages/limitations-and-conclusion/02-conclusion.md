---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Kết luận và hướng phát triển

<div class="mt-5 grid grid-cols-[1.1fr_1fr] gap-6 text-[14.5px] leading-snug">
  <div class="flex flex-col gap-2.5">
    <div class="text-[12px] font-bold uppercase tracking-wide text-slate-500">Điều rút ra</div>
    <div class="border-l-4 border-sky-500 bg-sky-50 px-4 py-2">Cộng dồn bằng CUSUM giúp phát hiện nhiều hơn chấm từng cửa sổ: IF từ 0,361 lên 0,627 (B1) và 0,755 (P1).</div>
    <div v-click class="border-l-4 border-rose-500 bg-rose-50 px-4 py-2">Nhưng <b>0/4 tài khoản</b> đạt cùng lúc ràng buộc phát hiện, độ trễ và số lần hỏi MFA. Hệ thống chưa sẵn sàng triển khai.</div>
    <div v-click class="border-l-4 border-emerald-500 bg-emerald-50 px-4 py-2">Đóng góp chính là <b>quy trình đánh giá kiểm chứng được</b>: tách prefix bị thu hồi khỏi mẫu số, đếm MFA theo giờ, replay độc lập khớp hoàn toàn.</div>
  </div>
  <div v-click>
    <div class="text-[12px] font-bold uppercase tracking-wide text-slate-500">Bước tiếp theo</div>
    <ol class="mt-2 list-decimal !pl-5 [&_li]:!my-2">
      <li>Thu dữ liệu thật: 20 người × 5 phiên, có đồng thuận.</li>
      <li>So sánh ở cùng điểm vận hành, kiểm định Wilcoxon và bootstrap.</li>
      <li>Cài P2 và đo trôi hành vi, đầu độc hồ sơ.</li>
      <li>Đánh giá A2 đến A4 và tích hợp collector với bộ điều khiển phiên để chạy trực tiếp.</li>
    </ol>
  </div>
</div>

<!--
Mục tiêu: 1:00

Tóm lại, cộng dồn bằng CUSUM đúng là giúp phát hiện nhiều hơn so với chấm từng cửa sổ độc lập: với Isolation Forest, từ 0,361 lên 0,627 và 0,755.

[CLICK] Nhưng không tài khoản nào đạt đồng thời cả ba ràng buộc. Nên nhóm không khẳng định hệ thống dùng được trong thực tế.

[CLICK] Đóng góp thật sự của đồ án là một quy trình đánh giá có thể kiểm lại: không để các phiên bị thu hồi oan làm đẹp tỉ lệ phát hiện, đếm MFA theo giờ, và có công cụ replay độc lập khớp hoàn toàn với log mô hình.

[CLICK] Bước tiếp theo là thu dữ liệu thật 20 người, mỗi người 5 phiên; so sánh các cấu hình ở cùng mức hỏi MFA với kiểm định thống kê; cài P2; và đánh giá các kiểu tấn công còn lại.
-->
