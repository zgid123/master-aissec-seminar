---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Toàn cảnh lĩnh vực và xu hướng mới

<div class="mt-2 relative">
  <div class="absolute left-0 right-0 top-[22px] h-[3px] bg-sky-200"></div>
  <div class="grid grid-cols-5 gap-3 relative text-[15.5px] leading-snug">
    <div v-for="(e, i) in [
      { y: '2009', t: 'So sánh bộ phát hiện', d: 'Killourhy, Maxion: nhiều thuật toán, chung một bộ dữ liệu.' },
      { y: '2012', t: 'Xác thực liên tục', d: 'Bours: kẻ lạ gõ bao nhiêu phím thì bị phát hiện?' },
      { y: '2020', t: 'Điểm tin cậy hai ngưỡng', d: 'Kiyani: cộng dồn độ tin cậy rồi mới khóa.' },
      { y: '2021-24', t: 'Học sâu', d: 'TypeNet, TypeFormer học từ dữ liệu rất lớn.' },
      { y: '2025', t: 'Benchmark và chuẩn', d: 'KVC-onGoing: 20.000 người. NIST thêm giám sát phiên.' },
    ]" :key="e.y" class="flex flex-col items-center text-center">
      <div class="z-1 rounded-full bg-sky-700 text-white font-bold px-3 py-1 text-[15px]">{{ e.y }}</div>
      <div class="mt-2 font-bold text-slate-900 text-[16.5px]">{{ e.t }}</div>
      <div class="mt-1 text-slate-600">{{ e.d }}</div>
    </div>
  </div>
</div>

<div v-click class="mt-5 grid grid-cols-3 gap-4 text-[16.5px] leading-snug">
  <div class="rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3">
    <div class="flex items-center gap-2 font-bold text-emerald-800"><div class="i-carbon-data-share text-xl" />Kết hợp nhiều tín hiệu</div>
    <div class="mt-1 text-slate-700">Gõ phím cùng chuột, cảm ứng, dáng đi.</div>
  </div>
  <div class="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3">
    <div class="flex items-center gap-2 font-bold text-amber-800"><div class="i-carbon-renew text-xl" />Hồ sơ tự thích ứng</div>
    <div class="mt-1 text-slate-700">Học theo thói quen mới, nhưng dễ học nhầm kẻ lạ.</div>
  </div>
  <div class="rounded-lg border border-rose-300 bg-rose-50 px-4 py-3">
    <div class="flex items-center gap-2 font-bold text-rose-800"><div class="i-carbon-security text-xl" />Riêng tư và giả mạo</div>
    <div class="mt-1 text-slate-700">Không lưu nội dung gõ; chống bắt chước, giả lập.</div>
  </div>
</div>

<div v-click class="mt-5 flex items-center gap-3 rounded-lg bg-sky-700 text-white px-5 py-3 text-[18px]">
  <div class="i-carbon-location-filled text-2xl shrink-0" />
  <div><b>Đề tài:</b> hướng nhẹ, giải thích được; đo <b>bao lâu bắt được kẻ lạ</b> và <b>chủ thật bị hỏi MFA bao nhiêu lần</b>.</div>
</div>

<!--
Mục tiêu: 1:00

Trước khi vào bài, mình điểm nhanh lĩnh vực này đi tới đâu. Năm 2009 Killourhy và Maxion lần đầu so sánh công bằng nhiều thuật toán trên cùng dữ liệu. Năm 2012 Bours chuyển sang xác thực liên tục: câu hỏi không còn là đúng hay sai mà là kẻ lạ gõ được bao nhiêu phím trước khi bị phát hiện. Năm 2020 có các mô hình điểm tin cậy hai ngưỡng. Từ 2021 học sâu như TypeNet, TypeFormer chiếm ưu thế. Năm 2025 có benchmark KVC-onGoing với 20.000 người, và NIST đưa giám sát phiên vào hướng dẫn xác thực.

[CLICK] Ba hướng mới nhất: kết hợp nhiều tín hiệu sinh trắc hành vi theo ngữ cảnh, hồ sơ tự thích ứng khi thói quen thay đổi, và bài toán riêng tư cùng chống giả mạo.

[CLICK] Đề tài không chạy đua độ chính xác với học sâu. Nhóm chọn hướng nhẹ, giải thích được, và đo hai thứ mà hệ thống thực tế quan tâm: bao lâu thì phát hiện kẻ lạ, và chính chủ bị hỏi MFA bao nhiêu lần.
-->
