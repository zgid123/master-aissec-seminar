---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Dữ liệu được phép chia sẻ

<DemoProgress :active="5" />

<div class="mt-5 grid grid-cols-[0.85fr_76px_1.25fr] items-center gap-5">
  <div v-click class="border-t-4 border-rose-500 bg-rose-50 px-5 py-5"><div class="font-mono text-[17px] font-bold">customer_segments</div><div class="mt-3 text-[14px] leading-relaxed text-slate-700">1.000.000 dòng chi tiết<br>Email · SĐT · mã nội bộ · ghi chú</div><div class="mt-5 text-[20px] font-black text-rose-700">KHÔNG GỬI</div></div>
  <div v-click class="text-center"><div class="text-[28px] text-slate-400">→</div><div class="mt-2 text-[13px] font-bold text-sky-700">CHỈ GIỮ<br>PHẦN CẦN THIẾT</div></div>
  <div v-click><div class="flex items-end justify-between"><div><div class="font-mono text-[17px] font-bold">segment_summary</div><div class="text-[13px] text-slate-600">Bảng tổng hợp mới</div></div><div class="text-[22px] font-black text-emerald-700">CHO PHÉP</div></div><table class="mt-3 w-full border-collapse text-[13px]"><thead><tr class="border-y border-slate-300 bg-slate-100 text-left"><th class="px-3 py-2">region</th><th class="px-3 py-2">segment</th><th class="px-3 py-2 text-right">customer_count</th><th class="px-3 py-2 text-right">average_spend</th></tr></thead><tbody><tr class="border-b border-slate-200"><td class="px-3 py-2">DN</td><td class="px-3 py-2">gold</td><td class="px-3 py-2 text-right">333.333</td><td class="px-3 py-2 text-right">49.999,55</td></tr><tr class="border-b border-slate-200"><td class="px-3 py-2">HCM</td><td class="px-3 py-2">bronze</td><td class="px-3 py-2 text-right">333.334</td><td class="px-3 py-2 text-right">49.999,50</td></tr><tr class="border-b border-slate-200"><td class="px-3 py-2">HN</td><td class="px-3 py-2">silver</td><td class="px-3 py-2 text-right">333.333</td><td class="px-3 py-2 text-right">49.999,45</td></tr></tbody></table></div>
</div>

<div v-click class="mt-7 border-l-4 border-emerald-600 bg-emerald-50/60 px-5 py-4 text-[19px] font-semibold leading-relaxed text-slate-800">DLP cho phép gửi đúng phần dữ liệu mà đối tác cần.</div>

<!--
Mục tiêu: 0:45

Việc bị chặn không làm nhu cầu nghiệp vụ biến mất. DLP phải giúp người dùng tìm cách chia sẻ an toàn hơn.

[CLICK] File chi tiết không được gửi vì chứa nhiều dữ liệu hơn yêu cầu.

[CLICK] Nhóm dữ liệu quay lại nhu cầu ban đầu và chỉ giữ các column / field cần thiết.

[CLICK] Bảng segment_summary chỉ còn vùng, phân khúc, số lượng và mức chi tiêu trung bình. Không còn dữ liệu của từng khách hàng nên được phép gửi cho đối tác.

[CLICK] Đây là data minimization: chia sẻ đủ để hoàn thành công việc, nhưng không chia sẻ dư.
-->
