---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Bối cảnh và mục tiêu

<DemoProgress :active="1" />

<div class="mt-3 grid grid-cols-[1.55fr_42px_0.72fr] items-stretch gap-3"><div class="relative border-2 border-slate-300 bg-slate-50/60 px-4 pb-3 pt-6"><div class="absolute -top-3 left-4 bg-white px-3 text-[11px] font-black tracking-[0.14em] text-slate-600">PHẠM VI NỘI BỘ CÔNG TY</div><div class="grid grid-cols-[0.85fr_34px_1fr_34px_0.8fr] items-center gap-2"><div><div class="text-[11px] font-black tracking-[0.12em] text-sky-700">DATA LAKE</div><div class="mt-1 text-[18px] font-bold text-slate-900">1 triệu hồ sơ</div><div class="mt-1 text-[12px] leading-relaxed text-slate-600">Liên hệ, giao dịch và ghi chú hỗ trợ.</div></div><div class="text-center text-[24px] text-slate-400">→</div><div v-click><div class="text-[11px] font-black tracking-[0.12em] text-slate-600">PHONG + SPARK</div><div class="mt-1 text-[18px] font-bold text-slate-900">Chuẩn bị báo cáo</div><div class="mt-1 text-[12px] leading-relaxed text-slate-600">Có quyền đọc dữ liệu và chạy Spark.</div></div><div class="text-center text-[24px] text-slate-400">→</div><div v-click class="border-x-4 border-violet-500 bg-violet-50 px-3 py-3 text-center"><div class="text-[11px] font-black tracking-[0.12em] text-violet-700">CỔNG XUẤT</div><div class="mt-1 text-[18px] font-black text-slate-900">DLP Gateway</div><div class="mt-1 text-[12px] leading-relaxed text-slate-600">Kiểm tra trước khi ghi dữ liệu.</div></div></div><div v-click class="mt-3 border-t border-slate-300 pt-2 text-[12px] text-slate-700"><b>Đích nội bộ đã duyệt:</b> kho phân tích của công ty</div></div><div class="flex items-center justify-center text-[24px] text-slate-400">→</div><div v-click class="relative border-2 border-dashed border-rose-300 bg-rose-50/60 px-4 pb-3 pt-6"><div class="absolute -top-3 left-4 bg-white px-3 text-[11px] font-black tracking-[0.14em] text-rose-700">BÊN NGOÀI CÔNG TY</div><div class="text-[11px] font-black tracking-[0.12em] text-rose-700">ĐỐI TÁC MARKETING</div><div class="mt-2 text-[18px] font-bold leading-snug text-slate-900">Cần số khách hàng theo vùng và phân khúc</div><div class="mt-2 text-[12px] leading-relaxed text-slate-600">Không cần dữ liệu của từng khách hàng.</div><div class="mt-3 border-t border-rose-200 pt-2 text-[12px] text-slate-700"><b>Đích bên ngoài:</b> ổ đĩa của đối tác</div></div></div>

<div v-click class="mt-3 grid grid-cols-[1.05fr_0.95fr] gap-6"><div class="border-l-4 border-rose-500 pl-4 text-[13px] font-semibold leading-relaxed text-slate-800"><b class="text-rose-700">Vấn đề:</b> file Phong chuẩn bị có thể chi tiết hơn mức đối tác cần.</div><div class="border-l-4 border-violet-500 pl-4 text-[13px] font-semibold leading-relaxed text-slate-800"><b class="text-violet-700">Mục tiêu:</b> mọi lần xuất dữ liệu đều đi qua DLP Gateway.</div></div>

<!--
Mục tiêu: 0:50

Công ty lưu một triệu hồ sơ khách hàng trong Data Lake.

[CLICK] Phong là chuyên viên dữ liệu. Phong có quyền đọc dữ liệu và chạy Spark để chuẩn bị báo cáo.

[CLICK] DLP Gateway nằm tại cổng xuất. File phải được kiểm tra trước khi hệ thống ghi dữ liệu tới nơi nhận.

[CLICK] Gateway cũng kiểm soát lần xuất tới kho phân tích nội bộ đã được duyệt.

[CLICK] Bên ngoài công ty, đối tác marketing chỉ cần số khách hàng theo vùng và phân khúc. Họ không cần biết từng khách hàng là ai.

[CLICK] Vấn đề xuất hiện khi file Phong chuẩn bị chứa nhiều dữ liệu hơn yêu cầu. Mục tiêu của demo là cho thấy mọi lần xuất đều đi qua DLP Gateway trước khi dữ liệu rời khỏi hệ thống.
-->
