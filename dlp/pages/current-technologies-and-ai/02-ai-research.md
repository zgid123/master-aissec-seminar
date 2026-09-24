---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# AI hỗ trợ DLP


<div class="grid grid-cols-[1fr_42px_1fr_42px_1fr] items-center gap-2 mt-3 text-center">
  <div class="rounded-xl border border-cyan-300 bg-cyan-50 p-3 text-[11px]">
    <b>Quy tắc</b>
    <br />
    email, số định danh dễ nhận dạng
  </div>
  <div class="text-2xl text-slate-400">+</div>
  <div class="rounded-xl border border-violet-300 bg-violet-50 p-3 text-[11px]">
    <b>Bộ phân loại AI</b>
    <br />
    văn bản khó nhận diện → nhãn / điểm nhạy cảm
  </div>
  <div class="text-2xl text-slate-400">→</div>
  <div class="rounded-xl border border-sky-300 bg-sky-50 p-3 text-[11px]">
    <b>Chính sách + thực thi</b>
    <br />
    nhãn / điểm + người / hành động / đích → cho phép / chặn
  </div>
</div>

<div class="grid grid-cols-2 gap-3 mt-4 text-[11px] leading-snug">
  <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
    <b>De Renzis, Dosso &amp; Testolin (2024)</b>
    <br />
    Mô hình ngôn ngữ lớn (LLM) tạo văn bản tổng hợp để huấn luyện bộ phân loại có giám sát. Nghiên
    cứu tiếng Ý, sáu nhóm dữ liệu; xét phân loại văn bản và nhận diện thực thể có tên (NER).
  </div>
  <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
    <b>Qawara &amp; Alhindi (2026)</b>
    <br />
    So sánh mô hình học máy và transformer cho văn bản nhạy cảm phụ thuộc ngữ cảnh; đánh giá hiệu
    quả lẫn hiệu suất tính toán.
  </div>
</div>

<div class="mt-3 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-3 text-[10px] leading-snug">
  <b>Giới hạn:</b>
  cần dữ liệu đại diện; khả năng chuyển miền / ngôn ngữ chưa chắc chắn; có dương tính giả, âm tính
  giả, lệch theo thời gian và chi phí tính toán. Kết quả tiếng Ý hoặc miền nghiên cứu không thể mặc
  định áp dụng cho dữ liệu khách hàng tiếng Việt.
</div>
<div class="mt-2 text-[10px] font-bold text-slate-600">
  AI hỗ trợ phát hiện, không bảo đảm chặn xuất; ví dụ của seminar không triển khai AI.
</div>
<div class="absolute bottom-4 left-12 right-12 text-[9px] leading-tight text-slate-400">
  De Renzis et al. (IRCDL 2024), hdl.handle.net/11577/3524608 · Qawara &amp; Alhindi, Information
  17(7), 663 (2026), doi:10.3390/info17070663.
</div>

<!--
Mục tiêu: 1:30

Quy tắc dễ nhận email hoặc mã định dạng rõ trong customer_segments. Nếu bản dẫn xuất có thêm văn bản tự do, bộ phân loại AI có thể xét ngữ cảnh và trả về nhãn hoặc điểm nhạy cảm. Đây chỉ là tín hiệu phát hiện. Chính sách còn phải xét người dùng, hành động và đích; điểm thực thi tích hợp mới quyết định cho phép hay chặn.

De Renzis và cộng sự dùng LLM tạo văn bản tổng hợp để huấn luyện bộ phát hiện có giám sát trên dữ liệu tiếng Ý. Qawara và Alhindi so sánh mô hình cho văn bản nhạy cảm phụ thuộc ngữ cảnh. Hai nghiên cứu gợi ý hướng phát hiện, không chứng minh hệ thống minh họa này chặn được dữ liệu.

Cần kiểm tra báo nhầm, bỏ sót, chuyển miền và chi phí trên dữ liệu phù hợp. Seminar không triển khai AI.

Chuyển ý: Áp dụng nguyên tắc phát hiện riêng, quyết định chính sách riêng vào hai lần xuất minh họa.
-->
