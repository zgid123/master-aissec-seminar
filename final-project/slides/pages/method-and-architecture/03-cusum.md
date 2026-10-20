---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Cộng dồn bằng chứng (CUSUM)

<div class="first flex items-stretch justify-between gap-2.5 text-center text-[14px] leading-tight">
  <div class="flex-[0.8] rounded-lg border border-slate-300 bg-slate-50 p-2.5 shadow-sm flex flex-col justify-center">
    <div class="font-bold text-slate-800 text-[15px]">Cửa sổ</div>
    <div class="text-[13px] text-slate-600 mt-1">50 phím</div>
  </div>
  <div class="text-slate-400 font-bold self-center">&rarr;</div>
  <div class="flex-[0.9] rounded-lg border border-sky-300 bg-sky-50 p-2.5 shadow-sm flex flex-col justify-center">
    <div class="font-bold text-sky-900 text-[15px]">Điểm lạ a<sub>t</sub></div>
    <div class="text-[13px] text-sky-700 mt-1">L1 hoặc IF</div>
  </div>
  <div class="text-slate-400 font-bold self-center">&rarr;</div>
  <div class="flex-[2] rounded-lg border border-violet-300 bg-violet-50 p-2.5 shadow-sm flex flex-col justify-center">
    <div class="font-bold text-violet-900 text-[15px]">Chuẩn hóa z<sub>t</sub></div>
    <div class="text-[13px] text-violet-800 mt-1 font-mono whitespace-nowrap">z<sub>t</sub> = (a<sub>t</sub> &minus; median) / (1,4826 &middot; MAD)</div>
  </div>
  <div class="text-slate-400 font-bold self-center">&rarr;</div>
  <div class="flex-[1.7] rounded-lg border border-rose-300 bg-rose-50 p-2.5 shadow-sm flex flex-col justify-center">
    <div class="font-bold text-rose-900 text-[15px]">Cộng dồn S<sub>t</sub></div>
    <div class="text-[13px] text-rose-800 mt-1 font-mono whitespace-nowrap">S<sub>t</sub> = max{0, &lambda;&middot;S<sub>t&minus;1</sub> + z<sub>t</sub> &minus; k}</div>
  </div>
</div>
<div class="text-[12.5px] text-slate-500 text-center mt-1.5">
  MAD (Median Absolute Deviation, độ lệch tuyệt đối trung vị); CUSUM (Cumulative Sum, tổng tích lũy).
</div>

<div class="fig-card mt-3" style="height:250px; width:100%">
  <img src="/img/cusum_charts.svg" class="w-full h-full object-contain mx-auto" alt="So sánh xét riêng từng cửa sổ vs cộng dồn CUSUM" />
</div>

<div class="mt-1.5 text-[12.5px] text-slate-500 italic text-center">
  * Ví dụ minh họa (&lambda; = 0,9; k = 0,5; ngưỡng 6), không phải kết quả thực nghiệm.
</div>

<!--
Mục tiêu: 0:50

Mỗi cửa sổ cho một điểm, chuẩn hóa theo từng người bằng median và MAD. Rồi CUSUM cộng dồn bằng chứng, hệ số quên làm bằng chứng cũ phai dần. Ví dụ: ba cửa sổ hơi lạ, mỗi cái dưới ngưỡng nên xét riêng không báo, nhưng cộng dồn thì cửa sổ thứ ba vượt ngưỡng.
-->
