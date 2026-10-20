---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Demo 3 - Đối chiếu kết quả

<DemoProgress :active="3" />

<div class="mt-3 grid grid-cols-[1.1fr_1.2fr] gap-4 items-stretch">
  <!-- Left: Reconcile Output Block -->
  <div class="rounded-xl bg-slate-900 border border-slate-700 p-4 font-mono text-[14px] text-slate-200 shadow-md flex flex-col justify-between">
    <div>
      <div class="text-[12px] text-slate-400 font-sans uppercase font-bold tracking-wider border-b border-slate-700 pb-2 mb-2.5 flex items-center justify-between">
        <span>Kết quả đối chiếu độc lập (Reconciliation Log)</span>
        <span class="text-emerald-400 font-bold lowercase">exit: 0</span>
      </div>
      <div class="text-slate-400">// Kiểm tra 6 nhóm toàn vẹn dữ liệu:</div>
      <div class="text-emerald-400 font-bold mt-1">"issue_counts": {</div>
      <div class="pl-4 text-emerald-300 leading-relaxed text-[14px]">
        "step": <span class="font-black text-white bg-emerald-700 px-1.5 py-0.5 rounded">0</span>, &nbsp;&nbsp;&nbsp;&nbsp;"events": <span class="font-black text-white bg-emerald-700 px-1.5 py-0.5 rounded">0</span>,<br>
        "outcome": <span class="font-black text-white bg-emerald-700 px-1.5 py-0.5 rounded">0</span>, &nbsp;"exposure": <span class="font-black text-white bg-emerald-700 px-1.5 py-0.5 rounded">0</span>,<br>
        "user": <span class="font-black text-white bg-emerald-700 px-1.5 py-0.5 rounded">0</span>, &nbsp;&nbsp;&nbsp;&nbsp;"macro": <span class="font-black text-white bg-emerald-700 px-1.5 py-0.5 rounded">0</span>
      </div>
      <div class="text-emerald-400 font-bold">}</div>
    </div>
    <div class="mt-3 text-[13px] text-emerald-400 border-t border-slate-700 pt-2 font-semibold">
      &check; Tất cả 6/6 bài kiểm tra khớp 100% (Zero discrepancies)
    </div>
  </div>

  <!-- Right: Verification Details -->
  <div class="flex flex-col justify-between gap-3 text-[15px]">
    <div class="rounded-xl border-l-4 border-sky-500 bg-sky-50 p-3.5 shadow-sm flex-1 flex flex-col justify-center">
      <b class="text-sky-900 text-[16px] mb-1">Bộ đối chiếu độc lập:</b>
      <span class="text-slate-700 leading-relaxed">Được viết riêng bởi thành viên khác trong nhóm, chạy kiểm toán độc lập trên toàn bộ log sinh ra từ mô hình.</span>
    </div>
    <div v-click="1" class="rounded-xl border-l-4 border-emerald-500 bg-emerald-50 p-3.5 shadow-sm flex-1 flex flex-col justify-center">
      <b class="text-emerald-900 text-[16px] mb-1">Khớp hoàn toàn 0 sai lệch:</b>
      <span class="text-slate-700 leading-relaxed">Mọi sự kiện phân loại, chuyển trạng thái và tính toán độ phơi nhiễm đều được thẩm tra chéo khớp tuyệt đối.</span>
    </div>
    <div v-click="2" class="rounded-xl border-l-4 border-slate-500 bg-slate-50 p-3 shadow-sm text-slate-700 leading-relaxed">
      Chỉ số chẩn đoán mức cửa sổ (FAR, FRR, EER) khớp toàn bộ <b class="text-slate-900">8/8 cặp</b> kịch bản thử nghiệm.
    </div>
  </div>
</div>

<!-- Bottom Stat Cards: using verified numbers from the reconcile log -->
<div v-click="1" class="mt-4 grid grid-cols-3 gap-4">
  <div class="rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm">
    <div class="text-[30px] font-black text-indigo-600 leading-none">29.183</div>
    <div class="mt-1 text-[15px] font-semibold text-slate-700">Quyết định đối chiếu</div>
  </div>
  <div class="rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm">
    <div class="text-[30px] font-black text-amber-600 leading-none">7.600</div>
    <div class="mt-1 text-[15px] font-semibold text-slate-700">Sự kiện MFA / Thu hồi</div>
  </div>
  <div class="rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm">
    <div class="text-[30px] font-black text-emerald-600 leading-none">3.520</div>
    <div class="mt-1 text-[15px] font-semibold text-slate-700">Kết cục phiên kiểm tra</div>
  </div>
</div>

<!--
Mục tiêu: 0:30

Để chắc các con số tính đúng, bộ đối chiếu do thành viên khác viết độc lập đã chấm lại log và khớp. Đây là kiểm tra tính nhất quán của phép tính, chưa nói gì về hiệu quả với người thật.
-->
