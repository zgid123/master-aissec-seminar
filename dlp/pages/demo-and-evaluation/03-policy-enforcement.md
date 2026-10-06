---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Nơi nhận dữ liệu

<div style="clear: both; width: 100%;">
  <DemoProgress :active="4" />
</div>

<div v-click class="mt-3 grid grid-cols-[1fr_34px_0.92fr_34px_0.62fr] items-center gap-2 text-[13px]">
  <div class="bg-slate-100 px-4 py-2"><b class="text-slate-900">Nội dung:</b> PII + INTERNAL + HEALTH</div>
  <div class="text-center text-[21px] text-slate-400">+</div>
  <div class="bg-slate-100 px-4 py-2"><b class="text-slate-900">Ngữ cảnh:</b> Phong + export + nơi nhận</div>
  <div class="text-center text-[21px] text-slate-400">→</div>
  <div class="border-x-4 border-violet-500 bg-violet-50 px-4 py-2 text-center font-black text-violet-700">POLICY</div>
</div>

<div class="mt-3 grid grid-cols-2 gap-8">
  <div v-click class="border-t-4 border-emerald-500 bg-emerald-50/70 px-7 py-3"><div class="text-[12px] font-black tracking-[0.14em] text-emerald-700">TRƯỜNG HỢP A</div><div class="mt-2 text-[19px] font-bold text-slate-900">Kho phân tích nội bộ</div><div class="mt-1 text-[14px] text-slate-600">Nơi nhận đã được công ty phê duyệt</div><div class="mt-3 text-[29px] font-black text-emerald-700">CHO PHÉP</div><div class="mt-2 border-t border-emerald-200 pt-2 text-[14px] text-slate-700">Dữ liệu vẫn nằm trong phạm vi kiểm soát.</div></div>
  <div v-click class="border-t-4 border-rose-500 bg-rose-50/70 px-7 py-3"><div class="text-[12px] font-black tracking-[0.14em] text-rose-700">TRƯỜNG HỢP B</div><div class="mt-2 text-[19px] font-bold text-slate-900">Ổ đĩa của đối tác</div><div class="mt-1 text-[14px] text-slate-600">Nơi nhận nằm ngoài công ty</div><div class="mt-3 text-[29px] font-black text-rose-700">CHẶN</div><div class="mt-2 border-t border-rose-200 pt-2 text-[14px] text-slate-700">DLP dừng thao tác trước khi file được ghi.</div></div>
</div>

<div v-click class="mt-3 border-l-4 border-slate-800 px-5 py-1 text-[16px] font-semibold text-slate-800">Quyết định phụ thuộc vào nội dung file, người gửi, hành động và nơi nhận.</div>

<!--
Mục tiêu: 0:45

Đây là phép so sánh quan trọng nhất của demo: giữ nguyên người gửi và file, chỉ thay nơi nhận.

[CLICK] Policy nhận hai nhóm input: nhãn nội dung do detector tạo ra và ngữ cảnh của hành động xuất dữ liệu.

[CLICK] Khi Phong gửi file vào kho phân tích nội bộ đã được phê duyệt, policy cho phép vì dữ liệu vẫn nằm trong phạm vi kiểm soát.

[CLICK] Khi cùng file đó được gửi sang ổ đĩa của đối tác, policy chặn. Thao tác dừng trước khi file được ghi ra ngoài.

[CLICK] Vì vậy DLP là kiểm soát theo ngữ cảnh. Nội dung nhạy cảm là một input; người gửi, hành động và nơi nhận là các input còn lại.
-->
