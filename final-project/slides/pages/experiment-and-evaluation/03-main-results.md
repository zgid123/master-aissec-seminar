---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Kết quả chẩn đoán

<p class="sub">Tập test, dữ liệu mô phỏng</p>

<div class="cols-58-42">
  <div class="rounded-lg border border-slate-200 overflow-hidden shadow-sm bg-white">
    <table class="w-full text-center text-[15px] leading-tight border-collapse">
      <thead>
        <tr class="bg-slate-100 font-bold text-slate-800 border-b border-slate-200">
          <th class="p-2 text-left text-[14px]">Cấu hình</th>
          <th class="p-2 bg-violet-50 text-violet-900 text-[14px]">Phát hiện<br><span class="text-[12px] font-normal text-slate-500">(432 ca)</span></th>
          <th class="p-2 text-[14px]">Trong<br><span class="text-[12px] font-normal text-slate-500">150 phím</span></th>
          <th class="p-2 text-[14px]">Median<br><span class="text-[12px] font-normal text-slate-500">TTD</span></th>
          <th class="p-2 text-[14px]">MFA<br><span class="text-[12px] font-normal text-slate-500">/giờ</span></th>
          <th class="p-2 text-[14px]">Thu hồi<br><span class="text-[12px] font-normal text-slate-500">trước N</span></th>
          <th class="p-2 text-[14px]">Thu hồi<br><span class="text-[12px] font-normal text-slate-500">oan</span></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">
        <tr>
          <td class="p-2 text-left font-semibold text-slate-700">L1, B0</td>
          <td class="p-2 bg-violet-50/50">0,380</td>
          <td class="p-2">0,197</td>
          <td class="p-2">181,25</td>
          <td class="p-2">12,6</td>
          <td class="p-2">0</td>
          <td class="p-2">1</td>
        </tr>
        <tr>
          <td class="p-2 text-left font-semibold text-slate-700">L1, B1</td>
          <td class="p-2 bg-violet-50/50">0,500</td>
          <td class="p-2">0,361</td>
          <td class="p-2">150</td>
          <td class="p-2">21,4</td>
          <td class="p-2">54</td>
          <td class="p-2">2</td>
        </tr>
        <tr class="border-b-2 border-slate-300">
          <td class="p-2 text-left font-semibold text-slate-700">L1, P1</td>
          <td class="p-2 bg-violet-50/50">0,542</td>
          <td class="p-2">0,330</td>
          <td class="p-2">150</td>
          <td class="p-2">19,1</td>
          <td class="p-2">18</td>
          <td class="p-2">2</td>
        </tr>
        <tr>
          <td class="p-2 text-left font-semibold text-amber-900">IF, B0</td>
          <td class="p-2 bg-violet-50/50">0,361</td>
          <td class="p-2">0,137</td>
          <td class="p-2">162,5</td>
          <td class="p-2">13,6</td>
          <td class="p-2">0</td>
          <td class="p-2">0</td>
        </tr>
        <tr>
          <td class="p-2 text-left font-semibold text-amber-900">IF, B1</td>
          <td class="p-2 bg-violet-50/50 font-bold text-sky-900">0,627</td>
          <td class="p-2">0,345</td>
          <td class="p-2">162,5</td>
          <td class="p-2">15,3</td>
          <td class="p-2">0</td>
          <td class="p-2">1</td>
        </tr>
        <tr v-click="1" class="bg-rose-50/80 font-bold">
          <td class="p-2 text-left text-rose-900">IF, P1</td>
          <td class="p-2 bg-violet-100 text-rose-900">0,613</td>
          <td class="p-2">0,519</td>
          <td class="p-2 text-emerald-800">137,5</td>
          <td class="p-2 text-amber-900">20,3</td>
          <td class="p-2 text-rose-700 font-black">72</td>
          <td class="p-2 text-rose-700 font-black">4</td>
        </tr>
      </tbody>
    </table>
    <div class="px-2.5 py-1.5 bg-slate-50 text-[12px] text-slate-500 flex justify-between">
      <span>* Trung bình 4 hồ sơ mô phỏng (432 ca / cấu hình)</span>
      <span>L1: Baseline &bull; IF: Isolation Forest</span>
    </div>
  </div>

  <div class="fig-card" style="height:285px">
    <img src="/img/tradeoff_scatter.svg" alt="Đánh đổi: Phát hiện vs. MFA/giờ" />
  </div>
</div>

<div v-click="2" class="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-[15px] text-white leading-snug">
  <div>Cộng dồn tăng phát hiện nhưng MFA/giờ cũng tăng.</div>
  <div><span class="text-amber-300 font-bold">0/4 hồ sơ đạt ràng buộc &rarr; chưa kết luận.</span></div>
</div>

<!--
Mục tiêu: 1:15

Đây là kết quả chẩn đoán trên dữ liệu mô phỏng. Cộng dồn tăng phát hiện (IF 0,361 → 0,627; L1 0,380 → 0,500) nhưng MFA/giờ cũng tăng (IF 13,6 → 15,3; L1 12,6 → 21,4). P1 với Isolation Forest có TTD thấp nhất nhưng thu hồi nhầm 72 kịch bản trước khi người lạ gõ và 4 lần thu hồi oan trên phiên chủ thật. Không cấu hình nào đạt ràng buộc trên validation, nên chúng em không kết luận chính sách nào tốt hơn. Kết quả cho thấy sự đánh đổi, chưa chứng minh hiệu quả.
-->