---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Kế hoạch đánh giá DLP


<div class="grid grid-cols-[1.1fr_.9fr] gap-5 mt-2">
  <div class="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 text-[11px]">
    <div class="bg-slate-200 px-3 py-2 font-bold">KẾ HOẠCH ĐÁNH GIÁ</div>
    <div class="grid grid-cols-[130px_1fr] gap-2 border-t px-3 py-2">
      <b>Phát hiện</b>
      <span>phát hiện đúng · bỏ sót · báo động giả</span>
    </div>
    <div class="grid grid-cols-[130px_1fr] gap-2 border-t px-3 py-2">
      <b>Hiệu năng</b>
      <span>thời gian quét theo kích thước dữ liệu · độ trễ quyết định</span>
    </div>
    <div class="grid grid-cols-[130px_1fr] gap-2 border-t px-3 py-2">
      <b>Thực thi</b>
      <span>cho phép đúng báo cáo tổng hợp · chặn đúng bản nhạy cảm</span>
    </div>
    <div class="grid grid-cols-[130px_1fr] gap-2 border-t px-3 py-2">
      <b>Độ bao phủ</b>
      <span>thử mọi đường xuất và đường vòng có liên quan</span>
    </div>
  </div>
  <div>
    <div class="rounded-xl border border-sky-200 bg-sky-50 p-4 text-[13px] leading-relaxed">
      <b class="text-sky-800">Thử quyết định tại điểm xuất</b>
      <br />
      Yêu cầu xuất → kiểm tra nhãn, người và đích → cho phép hoặc chặn trước khi ghi dữ liệu.
    </div>
    <div class="mt-3 rounded-xl border-l-4 border-rose-500 bg-rose-50 p-4 text-[12px] leading-snug">
      <b class="text-rose-700">Giới hạn:</b>
      đường truyền bỏ qua điểm xuất được giám sát sẽ không bị chặn bởi thiết kế này.
    </div>
  </div>
</div>
<div class="mt-3 text-[10px] text-slate-500">
  Chưa có số liệu thực nghiệm vì chưa có triển khai chạy được. Schwab et al. (2021) là nghiên cứu
  liên quan về độ trễ phân loại truy vấn theo chính sách, không phải benchmark cho thiết kế này.
</div>

<!--
Mục tiêu: 1:00

Đây là kế hoạch, không phải kết quả đo vì chưa có triển khai chạy được. Chất lượng phát hiện đo bằng phát hiện đúng, bỏ sót và báo động giả; hiệu năng đo thời gian quét khi dữ liệu tăng và độ trễ quyết định.

Đánh giá riêng tính đúng của quyết định cho phép/chặn và độ bao phủ: báo cáo hợp lệ phải đi qua, bản nhạy cảm phải bị chặn trước khi ghi; sau đó thử các đường vòng.

Schwab và cộng sự cho thấy việc đánh giá kiểm tra chính sách truy vấn cần xem xét hiệu năng; đó là nghiên cứu liên quan, không phải số liệu của đề xuất này.

Giới hạn cốt lõi: đường truyền vòng qua điểm xuất được giám sát sẽ không bị chặn.

Chuyển ý: Cuối cùng, quay lại đúng bản sao khách hàng từ tình huống mở đầu.
-->
