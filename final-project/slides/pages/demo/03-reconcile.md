---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Demo 3: đối chiếu lại toàn bộ chính sách

<DemoProgress :active="4" />

<div class="mt-4 grid grid-cols-[1.2fr_1fr] gap-6 text-[14px] leading-snug">
  <div>
    <div class="rounded bg-slate-900 px-3 py-2 font-mono text-[11.5px] leading-relaxed text-emerald-300 whitespace-nowrap overflow-hidden">
      cd final-project/member4<br>
      node src/member3-replay.mjs \<br>
      &nbsp;&nbsp;--evaluation ../member3/artifacts/simulation-2026-10-19/evaluation \<br>
      &nbsp;&nbsp;--model ../member3/artifacts/simulation-2026-10-19/fit/model.json \<br>
      &nbsp;&nbsp;--output &lt;thư mục trống&gt;
    </div>
    <div v-click class="mt-3 rounded bg-slate-900 px-3 py-2 font-mono text-[12px] leading-relaxed text-slate-200">
      "issue_counts": {<br>
      &nbsp;&nbsp;"step": <span class="text-emerald-300">0</span>, "events": <span class="text-emerald-300">0</span>, "outcome": <span class="text-emerald-300">0</span>,<br>
      &nbsp;&nbsp;"exposure": <span class="text-emerald-300">0</span>, "user": <span class="text-emerald-300">0</span>, "macro": <span class="text-emerald-300">0</span><br>
      }
    </div>
  </div>
  <div class="flex flex-col gap-2">
    <div class="border-l-4 border-sky-500 bg-sky-50 px-3 py-2">Chạy dưới 1 giây, chỉ cần Node.js, không cài thêm thư viện.</div>
    <div v-click class="border-l-4 border-emerald-500 bg-emerald-50 px-3 py-2">Sáu nhóm kiểm tra đều <b>0 sai lệch</b>: từng bước quyết định, sự kiện MFA, kết cục kịch bản, thời lượng, chỉ số theo người và trung bình.</div>
    <div v-click class="border-l-4 border-slate-500 bg-slate-50 px-3 py-2">Bộ test của mục 4: 52/52 đạt với <code>node --test</code>.</div>
  </div>
</div>

<!--
Mục tiêu: 0:45 (demo trực tiếp)

Bước cuối của demo là chứng minh các con số trên slide có thể kiểm lại. Em chạy công cụ đối chiếu của mục 4 trên log của lần chạy mô hình.

[CLICK] Kết quả in ra sáu nhóm kiểm tra, tất cả đều 0 sai lệch.

[CLICK] Công cụ chỉ dùng thư viện chuẩn của Node.js nên chép sang máy khác là chạy được.

[CLICK] Bộ test của phần đánh giá có 52 ca, đều đạt.

Chuẩn bị: tạo sẵn một thư mục output trống, ví dụ results/replay-demo-2010. Nếu thư mục đã có file, công cụ sẽ từ chối ghi đè.
-->
