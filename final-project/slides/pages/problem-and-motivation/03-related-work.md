---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Nghiên cứu liên quan và khoảng trống

<div class="mt-1 grid grid-cols-3 gap-4 text-[14px] leading-snug">
  <div class="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
    <div class="text-[12px] font-bold uppercase tracking-wide text-slate-500">Đánh giá cổ điển</div>
    <div class="mt-1.5"><b>Killourhy &amp; Maxion (2009)</b>: so 14 bộ phát hiện bất thường, chia dữ liệu theo phiên và theo ngày.</div>
    <div class="mt-1.5"><b>Bours (2012)</b>, <b>Kiyani (2020)</b>: xác thực liên tục, đã dùng hai ngưỡng cảnh báo và quyết định.</div>
  </div>
  <div class="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
    <div class="text-[12px] font-bold uppercase tracking-wide text-slate-500">Học sâu và benchmark</div>
    <div class="mt-1.5"><b>TypeNet (2021)</b>: LSTM học biểu diễn chuỗi gõ.</div>
    <div class="mt-1.5"><b>TypeFormer (2024)</b>: Transformer cho thiết bị di động.</div>
    <div class="mt-1.5"><b>KVC-onGoing (2025)</b>: benchmark xác minh có giao thức chung.</div>
  </div>
  <div class="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
    <div class="text-[12px] font-bold uppercase tracking-wide text-slate-500">Điểm chung</div>
    <div class="mt-1.5">Báo cáo chủ yếu bằng <b>FAR, FRR, EER</b> ở mức mẫu hoặc cửa sổ.</div>
    <div class="mt-1.5">Shadman và cộng sự nhận xét các chỉ số này <b>không cho biết cần bao nhiêu phím</b> để phát hiện kẻ giả mạo.</div>
  </div>
</div>

<div v-click class="mt-4 border-l-4 border-sky-500 bg-sky-50 px-5 py-3 text-[16px] leading-relaxed text-slate-800">
  <b>Đề tài đo theo góc vận hành:</b> bao nhiêu phím đến khi phát hiện người lạ (TTD) và chủ thật bị hỏi MFA bao nhiêu lần mỗi giờ.
  Đóng góp giới hạn ở <b>quy trình thực nghiệm có bằng chứng, truy vết được và có phân tích ca lỗi</b>, không khẳng định chưa ai làm.
</div>

<!--
Mục tiêu: 0:40

Nhóm khảo sát một số công trình tiêu biểu, chia làm ba nhóm.

Cột đầu là các công trình đánh giá cổ điển. Killourhy và Maxion đặt chuẩn cho cách so sánh bộ phát hiện, đặc biệt là tách dữ liệu theo phiên và theo ngày. Bours và Kiyani làm xác thực liên tục, và Kiyani đã dùng hai ngưỡng. Nên nhóm không coi hai ngưỡng là điểm mới.

Cột giữa là hướng học sâu: TypeNet, TypeFormer và benchmark KVC-onGoing. Các mô hình này có thể cung cấp điểm bất thường, nhưng KVC là benchmark xác minh, không đo thời gian phát hiện khi đổi người giữa phiên. Nhóm chưa tái hiện các mô hình này.

Cột phải: điểm chung là các bài chủ yếu báo FAR, FRR, EER. Khảo sát của Shadman nhận xét các chỉ số này không trả lời câu hỏi cần bao nhiêu phím để bắt được kẻ giả mạo.

[CLICK] Vì vậy đề tài đo theo góc vận hành: TTD tính bằng số phím, và số lần chủ thật bị hỏi MFA mỗi giờ. Nhóm chỉ khảo sát một số bài nên không khẳng định chưa ai làm; đóng góp nằm ở quy trình thực nghiệm có bằng chứng và phân tích ca lỗi.
-->
