---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Rò rỉ từ bản dữ liệu dẫn xuất


<PipelineFlow focus="export" outcome="risk" />

<div class="grid grid-cols-2 gap-4 mt-3 text-[12px] leading-snug">
  <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
    <b>Người thực hiện:</b>
    chuyên viên phân tích có quyền đọc hợp lệ
    <br />
    <b>Dữ liệu:</b>
    hồ sơ khách hàng: mã khách hàng, email, lịch sử mua hàng
    <br />
    <b>Bản sao mới:</b> <code>customer_segments</code> do pipeline tạo, vẫn giữ mã và email<br />
    <b>Vì sao quyền truy cập chưa đủ?</b>
    Quyền đọc hợp lệ không xét đích gửi của bản xuất.
  </div>
  <div class="rounded-xl border border-rose-300 bg-rose-50 p-4">
    <b>Điểm thử xuất cụ thể:</b>
    gửi tập dữ liệu dẫn xuất tới đích bên ngoài chưa được phê duyệt
    <br />
    <b>Hệ quả:</b>
    xâm phạm quyền riêng tư, mất niềm tin, phát sinh điều tra và xử lý sự cố
  </div>
</div>

<div class="mt-3 text-[10px] text-slate-500">
  Động cơ pháp lý: Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15, ban hành 26/06/2025, hiệu lực
  01/01/2026. Luật không chỉ định một sản phẩm DLP cụ thể. Nguồn: Cổng văn bản Chính phủ.
</div>
<div class="mt-3 rounded-lg bg-cyan-50 px-4 py-2 text-center text-[15px] font-bold text-cyan-800">
  Làm sao nhận diện dữ liệu nhạy cảm trong bản gốc hoặc bản dẫn xuất, rồi ngăn xuất tới đích chưa
  được duyệt?
</div>

<!--
Mục tiêu: 1:00

Chuyên viên phân tích có quyền đọc dữ liệu khách hàng để chạy phân tích hợp lệ. Pipeline tạo bảng customer_segments nhưng vẫn giữ mã khách hàng và email. Kiểm soát truy cập cho phép thao tác đọc theo quyền; nó không tự đánh giá đích đến của một bản xuất hợp lệ về quyền.

Điểm rò rỉ là lúc bảng được xuất tới đích ngoài chưa duyệt. Rủi ro là lộ dữ liệu cá nhân, mất niềm tin và phát sinh ứng phó sự cố.

Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15 có hiệu lực từ 1/1/2026, là động cơ để xử lý dữ liệu cá nhân thận trọng; luật không chỉ định sản phẩm DLP.

Chuyển ý: Câu hỏi nghiên cứu dẫn đến khái niệm Data Leakage Prevention.
-->
