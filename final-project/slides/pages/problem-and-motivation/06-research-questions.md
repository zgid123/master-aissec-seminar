---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Câu hỏi nghiên cứu

<p class="sub">Kết quả bước đầu, chưa kết luận</p>

<div class="rounded bg-slate-800 px-4 py-3 text-[17px] font-medium text-white text-center leading-snug">
  Phát hiện sớm <b>người lạ</b> đang dùng phiên, mà <b>không làm phiền</b> chủ thật?
</div>

<div class="mt-4 grid grid-cols-[1fr_1.35fr_1.2fr] gap-x-4 gap-y-4 items-center text-[15px] leading-snug">
  <div class="font-bold text-slate-500 text-[13px] uppercase tracking-wider">CÂU HỎI</div>
  <div class="font-bold text-slate-500 text-[13px] uppercase tracking-wider">GIẢ THUYẾT</div>
  <div class="font-bold text-slate-500 text-[13px] uppercase tracking-wider">KẾT QUẢ BƯỚC ĐẦU</div>

  <div v-click="1" class="contents">
    <div class="border-l-4 border-sky-500 bg-sky-50 px-3.5 py-3 rounded-r min-h-[76px] flex flex-col justify-center">
      <b class="text-[17px] text-sky-950">RQ1</b>
      <span class="text-[14px] text-slate-600 mt-0.5">Ngưỡng riêng từng người</span>
    </div>
    <div class="text-slate-700 text-[16px] min-h-[76px] flex items-center">Ngưỡng riêng giúp chủ thật ít bị hỏi MFA hơn.</div>
    <div class="rounded bg-amber-100/90 border border-amber-300 p-3 text-amber-900 min-h-[76px] flex flex-col justify-center">
      <b class="text-[16px]">Chưa kết luận</b>
      <div class="text-[14px] text-amber-800 mt-0.5">L1 và IF cho chiều ngược nhau.</div>
    </div>
  </div>

  <div v-click="2" class="contents">
    <div class="border-l-4 border-violet-500 bg-violet-50 px-3.5 py-3 rounded-r min-h-[76px] flex flex-col justify-center">
      <b class="text-[17px] text-violet-950">RQ2</b>
      <span class="text-[14px] text-slate-600 mt-0.5">Cộng dồn bằng chứng</span>
    </div>
    <div class="text-slate-700 text-[16px] min-h-[76px] flex items-center">Cộng dồn bắt kẻ lạ tốt hơn xét từng đoạn riêng.</div>
    <div class="rounded bg-amber-50 border border-amber-300 p-3 text-amber-900 min-h-[76px] flex flex-col justify-center">
      <b class="text-[16px]">Gợi ý ban đầu</b>
      <div class="text-[14px] text-amber-800 mt-0.5">Phát hiện tăng 0,36 &rarr; 0,63 (IF), nhưng chưa ghép cùng mức MFA.</div>
    </div>
  </div>

  <div v-click="3" class="contents">
    <div class="border-l-4 border-slate-400 bg-slate-50 px-3.5 py-3 rounded-r min-h-[76px] flex flex-col justify-center">
      <b class="text-[17px] text-slate-900">RQ3</b>
      <span class="text-[14px] text-slate-600 mt-0.5">Cập nhật sau MFA</span>
    </div>
    <div class="text-slate-700 text-[16px] min-h-[76px] flex items-center">Cập nhật hồ sơ sau MFA giảm từ chối nhầm.</div>
    <div class="rounded bg-slate-100 border border-slate-300 p-3 text-slate-700 min-h-[76px] flex flex-col justify-center">
      <b class="text-[16px]">Chưa thực hiện</b>
      <div class="text-[14px] text-slate-500 mt-0.5">P2 chưa triển khai.</div>
    </div>
  </div>
</div>

<!--
Mục tiêu: 0:30

Chúng em nêu ba câu hỏi, nhưng kết quả hiện mới ở mức gợi ý. Cộng dồn tăng tỷ lệ phát hiện, nhưng chưa so được ở cùng mức MFA. Câu hỏi thứ ba cần dữ liệu nhiều ngày.
-->
