---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Demo 3: kiểm lại toàn bộ kết quả

<DemoProgress :active="3" />

<div class="mt-4 grid grid-cols-[1.2fr_1fr] gap-6 text-[21px] leading-snug">
  <div>
    <div class="rounded bg-slate-900 px-4 py-4 font-mono text-[13px] leading-loose text-emerald-300 whitespace-nowrap overflow-hidden">
      cd final-project/member4<br>
      node src/member3-replay.mjs \<br>
      &nbsp;&nbsp;--evaluation ../member3/artifacts/simulation-2026-10-19/evaluation \<br>
      &nbsp;&nbsp;--model ../member3/artifacts/simulation-2026-10-19/fit/model.json \<br>
      &nbsp;&nbsp;--output &lt;thư mục trống&gt;
    </div>
    <div v-click="2" class="mt-5 rounded bg-slate-900 px-4 py-4 font-mono text-[17px] leading-relaxed text-slate-200">
      "issue_counts": {<br>
      &nbsp;&nbsp;"step": <span class="text-emerald-300">0</span>, "events": <span class="text-emerald-300">0</span>, "outcome": <span class="text-emerald-300">0</span>,<br>
      &nbsp;&nbsp;"exposure": <span class="text-emerald-300">0</span>, "user": <span class="text-emerald-300">0</span>, "macro": <span class="text-emerald-300">0</span><br>
      }
    </div>
  </div>
  <div class="flex flex-col gap-3">
    <div class="border-l-4 border-sky-500 bg-sky-50 px-4 py-4">Công cụ kiểm lại viết riêng, độc lập với mã mô hình.</div>
    <div v-click="3" class="border-l-4 border-emerald-500 bg-emerald-50 px-4 py-4">29.183 quyết định và 7.600 lần hỏi MFA hoặc thu hồi đều <b>khớp hoàn toàn</b>.</div>
    <div v-click="4" class="border-l-4 border-slate-500 bg-slate-50 px-4 py-3">FAR, FRR, EER khớp 8/8.</div>
  </div>
</div>

<!--
Mục tiêu: 0:45 (demo trực tiếp)

Bước cuối là chứng minh các con số trên slide kiểm lại được. Em chạy công cụ đối chiếu của mục 4 trên log của lần chạy mô hình. Công cụ này viết riêng, không dùng chung mã với pipeline.

[CLICK] Kết quả: sáu nhóm kiểm tra đều 0 sai lệch, tức là 29.183 quyết định, 7.600 sự kiện và 3.520 kết cục đều khớp. Chính lúc đối chiếu này nhóm phát hiện ra bẫy mẫu số đã nói ở phần kết quả.

[CLICK] Ở mức cửa sổ, FAR, FRR, EER cũng khớp cả 8 cặp.

Chuẩn bị: tạo sẵn một thư mục output trống, ví dụ results/replay-demo-2010. Nếu thư mục đã có file, công cụ sẽ từ chối ghi đè. Nếu không kịp thời gian thì chỉ cần nói kết quả trên slide, bỏ qua chạy lệnh.
-->
