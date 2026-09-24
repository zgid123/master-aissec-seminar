---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Bảo vệ bản dữ liệu dẫn xuất


<PipelineFlow focus="export" outcome="block" compact />

<div class="grid grid-cols-2 gap-4 mt-5">
  <div class="rounded-xl border border-amber-300 bg-amber-50 p-4 text-[13px] leading-snug">
    <b class="text-amber-800">Phát hiện trong bản dẫn xuất</b>
    <br />
    Quét <code>customer_segments</code>, nhận diện các cột customer_id và email, rồi gắn nhãn nhạy cảm.
  </div>
  <div class="rounded-xl border border-rose-300 bg-rose-50 p-4 text-[13px] leading-snug">
    <b class="text-rose-800">Chặn hành động xuất</b>
    <br />
    Chặn lần gửi tập dữ liệu đó tới dịch vụ ngoài chưa được duyệt, tại đúng điểm xuất có kiểm soát.
  </div>
</div>
<div class="mt-3 flex gap-2 text-[10px]">
  <span class="rounded-full bg-amber-100 px-3 py-1">có thể báo nhầm / bỏ sót</span>
  <span class="rounded-full bg-amber-100 px-3 py-1">nhãn có thể lỗi thời sau biến đổi</span>
  <span class="rounded-full bg-rose-100 px-3 py-1">đường xuất không giám sát vẫn là giới hạn</span>
</div>
<div class="mt-5 text-center text-[17px] font-bold text-sky-800">
  Phân loại bản dẫn xuất; thực thi chính sách tại từng đường xuất được kiểm soát.
</div>

<!--
Mục tiêu: 1:00

Quay lại tình huống đầu: chuyên viên có quyền phân tích, nhưng customer_segments vẫn giữ mã khách hàng và email. Ta phải kiểm tra bản dẫn xuất, gắn nhãn nhạy cảm, rồi xét người, hành động và đích ở lần xuất. Trong minh họa, đích ngoài chưa duyệt dẫn tới quyết định chặn tại điểm xuất có kiểm soát.

Nguyên tắc mang về là: phân loại bản dẫn xuất và thực thi chính sách tại từng đường xuất được kiểm soát. Đường xuất không được giám sát vẫn có thể làm lộ dữ liệu; phát hiện cũng có thể nhầm hoặc bỏ sót. Đây là logic thiết kế, chưa phải kết quả của một hệ thống chạy thật.

Chuyển ý: Slide cuối là danh mục tài liệu và tài liệu sản phẩm chính thức để tra cứu thêm.
-->
