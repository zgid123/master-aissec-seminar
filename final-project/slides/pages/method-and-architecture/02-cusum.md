---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Cộng dồn bằng chứng bằng CUSUM

<div class="mt-1 grid grid-cols-3 gap-4 text-[17px] leading-snug">
  <div class="flex gap-3 items-start rounded-lg bg-sky-50 border border-sky-200 px-4 py-3">
    <div class="i-carbon-keyboard text-3xl text-sky-700 shrink-0" />
    <div><b>Chấm từng đoạn</b><br/>Càng khác thói quen của chủ, điểm càng cao.</div>
  </div>
  <div class="flex gap-3 items-start rounded-lg bg-violet-50 border border-violet-200 px-4 py-3">
    <div class="i-carbon-chart-line-data text-3xl text-violet-700 shrink-0" />
    <div><b>Cộng dồn</b><br/>Bỏ qua lệch nhỏ, điểm cũ giảm dần.</div>
  </div>
  <div class="flex gap-3 items-start rounded-lg bg-rose-50 border border-rose-200 px-4 py-3">
    <div class="i-carbon-warning-alt text-3xl text-rose-700 shrink-0" />
    <div><b>Hai mức</b><br/>Mức 1 hỏi MFA, mức 2 thu hồi phiên.</div>
  </div>
</div>

<div v-click="2" class="mt-3 grid grid-cols-2 gap-6">
  <div class="rounded-lg border border-slate-200 px-3 pt-2">
    <div class="text-[16px] font-bold text-slate-700">Xét riêng từng đoạn</div>
    <svg viewBox="0 0 400 190" class="w-full h-[165px]">
      <line x1="40" x2="390" y1="170" y2="170" stroke="#94a3b8" />
      <line x1="40" x2="390" y1="65" y2="65" stroke="#e11d48" stroke-dasharray="6 4" />
      <text x="44" y="57" text-anchor="start" fill="#be123c" style="font-size: 17px">ngưỡng</text>
      <rect x="80" y="117.5" width="60" height="52.5" rx="3" fill="#a78bfa" />
      <rect x="180" y="117.5" width="60" height="52.5" rx="3" fill="#a78bfa" />
      <rect x="280" y="117.5" width="60" height="52.5" rx="3" fill="#a78bfa" />
      <text x="110" y="110" text-anchor="middle" fill="#475569" style="font-size: 17px">hơi lạ</text>
      <text x="210" y="110" text-anchor="middle" fill="#475569" style="font-size: 17px">hơi lạ</text>
      <text x="310" y="110" text-anchor="middle" fill="#475569" style="font-size: 17px">hơi lạ</text>
      <text x="110" y="187" text-anchor="middle" fill="#64748b" style="font-size: 16px">đoạn 1</text>
      <text x="210" y="187" text-anchor="middle" fill="#64748b" style="font-size: 16px">đoạn 2</text>
      <text x="310" y="187" text-anchor="middle" fill="#64748b" style="font-size: 16px">đoạn 3</text>
    </svg>
    <div class="pb-2 text-center text-[16px] text-slate-600">Không đoạn nào vượt → <b>bỏ lọt</b></div>
  </div>
  <div class="rounded-lg border border-rose-200 px-3 pt-2">
    <div class="text-[16px] font-bold text-rose-700">Cộng dồn bằng CUSUM</div>
    <svg viewBox="0 0 400 190" class="w-full h-[165px]">
      <line x1="40" x2="390" y1="170" y2="170" stroke="#94a3b8" />
      <line x1="40" x2="390" y1="65" y2="65" stroke="#e11d48" stroke-dasharray="6 4" />
      <text x="44" y="57" text-anchor="start" fill="#be123c" style="font-size: 17px">ngưỡng</text>
      <rect x="80" y="126" width="60" height="44" rx="3" fill="#fda4af" />
      <rect x="180" y="87" width="60" height="83" rx="3" fill="#fb7185" />
      <rect x="280" y="51" width="60" height="119" rx="3" fill="#e11d48" />
      <polyline points="110,126 210,87 310,51" fill="none" stroke="#9f1239" stroke-width="2" />
      <text x="310" y="42" text-anchor="middle" fill="#9f1239" style="font-size: 17px; font-weight: 700">hỏi MFA</text>
      <text x="110" y="187" text-anchor="middle" fill="#64748b" style="font-size: 16px">đoạn 1</text>
      <text x="210" y="187" text-anchor="middle" fill="#64748b" style="font-size: 16px">đoạn 2</text>
      <text x="310" y="187" text-anchor="middle" fill="#64748b" style="font-size: 16px">đoạn 3</text>
    </svg>
    <div class="pb-2 text-center text-[16px] text-slate-600"><b>Lạ liên tục</b> → bắt được ở đoạn 3</div>
  </div>
</div>

<!--
Mục tiêu: 0:50

Ý tưởng rất đơn giản. Cứ mỗi 50 phím, hệ thống chấm xem nhịp gõ khác thói quen của chính chủ bao nhiêu. Thay vì quyết định riêng từng đoạn, nhóm cộng dồn điểm này bằng CUSUM, một kỹ thuật kinh điển trong kiểm soát chất lượng. Lệch nhỏ thì bỏ qua, bằng chứng cũ phai dần. Chạm mức một thì hỏi MFA, chạm mức hai thì thu hồi phiên.

[CLICK] Ví dụ: kẻ lạ gõ "hơi lạ" ba đoạn liền. Xét riêng từng đoạn thì không đoạn nào vượt ngưỡng, nên bỏ lọt. Cộng dồn thì điểm tăng dần và vượt ngưỡng ở đoạn thứ ba. Tức là hơi lạ nhưng lạ liên tục thì hệ thống vẫn bắt được.
-->
