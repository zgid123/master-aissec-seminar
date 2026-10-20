---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Nguồn công thức và tham số

<div class="first rounded-lg border border-slate-200 overflow-hidden shadow-sm">
  <table class="w-full text-[15px] leading-snug text-left border-collapse">
    <thead>
      <tr class="bg-slate-100 font-bold text-slate-800 border-b border-slate-200 text-[14px]">
        <th class="p-2.5 w-[28%]">Thành phần</th>
        <th class="p-2.5 w-[36%] bg-sky-100/70 text-sky-900">Nguồn tham khảo</th>
        <th class="p-2.5 w-[36%] bg-amber-100/70 text-amber-900">Nhóm tự đề xuất / thiết kế</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-100">
      <tr>
        <td class="p-2.5 font-medium text-slate-800">Median/MAD (hệ số 1,4826)</td>
        <td class="p-2.5 bg-sky-50/40 text-slate-700">R Core Team [12]</td>
        <td class="p-2.5 bg-amber-50/40 text-slate-700">Quy tắc chia tập, kỹ thuật xử lý khi MAD = 0</td>
      </tr>
      <tr>
        <td class="p-2.5 font-medium text-slate-800">CUSUM (&lambda; = 1)</td>
        <td class="p-2.5 bg-sky-50/40 text-slate-700">NIST/SEMATECH [7]</td>
        <td class="p-2.5 bg-amber-50/40 text-amber-900 font-semibold">Hệ số quên &lambda; &lt; 1 (làm bằng chứng cũ phai dần)</td>
      </tr>
      <tr>
        <td class="p-2.5 font-medium text-slate-800">Isolation Forest</td>
        <td class="p-2.5 bg-sky-50/40 text-slate-700">Liu, Ting, Zhou 2008 [8]</td>
        <td class="p-2.5 bg-amber-50/40 text-slate-700">Hiện thực độc lập theo đặc tả, cấu hình 100 cây</td>
      </tr>
      <tr>
        <td class="p-2.5 font-medium text-slate-800">Baseline L1</td>
        <td class="p-2.5 bg-sky-50/40 text-slate-700">Killourhy &amp; Maxion 2009 [4]</td>
        <td class="p-2.5 bg-amber-50/40 text-slate-700">Quy trình baseline do nhóm tự hiện thực</td>
      </tr>
      <tr>
        <td class="p-2.5 font-medium text-slate-800">Bộ điều khiển hai ngưỡng</td>
        <td class="p-2.5 bg-sky-50/40 text-slate-700">Kiyani 2020 [6] (ý tưởng 2 ngưỡng)</td>
        <td class="p-2.5 bg-amber-50/40 text-amber-900 font-semibold">h<sub>2</sub> = 2h<sub>1</sub>, cooldown 2 cửa sổ sau MFA</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="mt-4 flex flex-col gap-2 text-[14px]">
  <div class="rounded-lg bg-sky-50 border border-sky-200 px-3.5 py-2 text-sky-900 flex items-center gap-2.5">
    <span class="font-bold bg-sky-200 px-2 py-0.5 rounded text-[12.5px] uppercase">CHỌN TRÊN VALIDATION:</span>
    <span>&lambda; &isin; {0,9; 1} &bull; k &isin; {0,25; 0,5; 1} &bull; h<sub>1</sub> &isin; {0,5 &hellip; 12}</span>
  </div>

  <div class="rounded-lg bg-slate-100 border border-slate-300 px-3.5 py-2 text-slate-800 flex items-center gap-2.5">
    <span class="font-bold bg-slate-200 px-2 py-0.5 rounded text-[12.5px] uppercase">HẰNG SỐ THIẾT KẾ:</span>
    <span>W = 50 &bull; IF 100 cây &bull; h<sub>2</sub> = 2h<sub>1</sub> &bull; cooldown 2 cửa sổ &bull; L = 150 &bull; A1 = 225 + 300 phím</span>
  </div>
</div>

<!--
Mục tiêu: 0:35

Công thức nền lấy từ các nguồn này. Hệ số quên, tỷ lệ hai ngưỡng và cooldown là lựa chọn thiết kế của nhóm, không phải của bài báo nào. Tham số lambda, k, h1 chọn trên validation, còn lại là hằng số thiết kế.
-->
