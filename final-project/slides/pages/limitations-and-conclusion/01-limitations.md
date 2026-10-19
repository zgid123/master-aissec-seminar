---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Giới hạn cần đọc kèm kết quả

<div class="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-[14.5px] leading-snug">
  <div class="border-l-4 border-rose-500 bg-rose-50 px-4 py-2">
    <div class="font-bold text-rose-800">Dữ liệu mô phỏng</div>
    4 hồ sơ, 24 phiên. Số liệu chỉ kiểm chứng quy trình, chưa nói được độ chính xác trên người thật.
  </div>
  <div class="border-l-4 border-rose-500 bg-rose-50 px-4 py-2">
    <div class="font-bold text-rose-800">Tấn công ghép offline</div>
    Mới đo A1 (ghép phiên hai người). A2 chưa có dữ liệu, A3 (bắt chước) và A4 (phát lại gói) chưa được đánh giá.
  </div>
  <div v-click class="border-l-4 border-amber-500 bg-amber-50 px-4 py-2">
    <div class="font-bold text-amber-800">MFA là oracle</div>
    Chủ thật luôn qua, người lạ luôn trượt. Chưa tính MFA thất bại, mệt mỏi MFA hay chiếm luôn yếu tố thứ hai.
  </div>
  <div v-click class="border-l-4 border-amber-500 bg-amber-50 px-4 py-2">
    <div class="font-bold text-amber-800">Chưa có P2</div>
    Cập nhật hồ sơ sau MFA thành công chưa cài, nên chưa đánh giá được trôi hành vi và nguy cơ đầu độc hồ sơ.
  </div>
  <div v-click class="border-l-4 border-slate-500 bg-slate-50 px-4 py-2">
    <div class="font-bold text-slate-800">Thiết bị và đồng hồ</div>
    Chưa thử nhiều bàn phím, thiết bị, ngôn ngữ. Loại phiên có đồng hồ thô hơn 1 ms có thể làm lệch mẫu.
  </div>
  <div v-click class="border-l-4 border-slate-500 bg-slate-50 px-4 py-2">
    <div class="font-bold text-slate-800">So sánh chưa cùng điểm vận hành</div>
    Các cấu hình khác nhau về số lần hỏi MFA, nên chưa đủ căn cứ để chấp nhận hay bác bỏ H1, H2.
  </div>
</div>

<!--
Mục tiêu: 1:00

Trước khi kết luận, em nêu rõ những gì kết quả chưa nói được.

Thứ nhất, toàn bộ số liệu là dữ liệu mô phỏng 4 hồ sơ. Nó dùng để kiểm chứng quy trình, chưa phải độ chính xác trên người thật. Thứ hai, mới đo kịch bản ghép phiên hai người; bắt chước có luyện tập và phát lại gói chưa được đánh giá.

[CLICK] MFA được mô phỏng như một oracle: chủ luôn qua, người lạ luôn trượt. Thực tế MFA có thể thất bại hoặc bị chiếm.

[CLICK] Chính sách P2 cập nhật hồ sơ sau MFA chưa cài nên chưa đánh giá trôi hành vi.

[CLICK] Chưa thử nhiều thiết bị, và việc loại phiên có đồng hồ thô có thể làm lệch mẫu.

[CLICK] Và quan trọng nhất: các cấu hình hỏi MFA với tần suất khác nhau, nên so sánh tỉ lệ phát hiện chưa công bằng. Vì vậy nhóm chưa kết luận H1, H2.
-->
