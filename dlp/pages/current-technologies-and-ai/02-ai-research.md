---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# AI hỗ trợ DLP


<div class="grid grid-cols-[1fr_42px_1fr_42px_1fr] items-center gap-2 mt-3 text-center">
  <div class="rounded-xl border border-cyan-300 bg-cyan-50 p-3 text-[11px]">
    <b>Quy tắc + bộ phân loại AI</b>
  </div>
  <div class="text-2xl text-slate-400">→</div>
  <div class="rounded-xl border border-violet-300 bg-violet-50 p-3 text-[11px]">
    <b>Nhãn / điểm nhạy cảm</b>
  </div>
  <div class="text-2xl text-slate-400">→</div>
  <div class="rounded-xl border border-sky-300 bg-sky-50 p-3 text-[11px]">
    <b>Policy và điểm thực thi</b>
  </div>
</div>

<div class="grid grid-cols-2 gap-3 mt-4 text-[11px] leading-snug">
  <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
    <b>De Renzis, Dosso &amp; Testolin (2024)</b>
    <br />
    LLM tạo văn bản tổng hợp tiếng Ý để huấn luyện bộ phân loại dữ liệu nhạy cảm.
  </div>
  <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
    <b>Qawara &amp; Alhindi (2026)</b>
    <br />
    Nghiên cứu nhận diện dữ liệu nhạy cảm phụ thuộc ngữ cảnh trong văn bản phi cấu trúc.
  </div>
</div>

<div class="mt-3 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-3 text-[10px] leading-snug">
  Cần dữ liệu phù hợp; có thể báo nhầm/bỏ sót; kết quả chưa thể mặc định chuyển sang dữ liệu tiếng Việt hoặc pipeline Big Data.
</div>

<div class="absolute bottom-4 left-12 right-12 text-[9px] leading-tight text-slate-400">
  Nghiên cứu phát hiện: De Renzis et al. (2024) · Qawara &amp; Alhindi (2026).
</div>
<!--
- Quy tắc và bộ phân loại AI có thể cung cấp nhãn hoặc điểm nhạy cảm; policy và điểm thực thi quyết định cách xử lý.
- De Renzis và cộng sự dùng LLM để tạo dữ liệu huấn luyện tiếng Ý; Qawara và Alhindi nghiên cứu nhận diện theo ngữ cảnh.
- Hai bài báo chủ yếu đánh giá phát hiện, không phải triển khai hoàn chỉnh ngăn xuất dữ liệu.
- Cần kiểm tra báo nhầm, bỏ sót và khả năng chuyển miền trên dữ liệu thực tế.
-->
