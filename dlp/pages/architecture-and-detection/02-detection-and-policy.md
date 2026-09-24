---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Ba cách tìm nội dung nhạy cảm


<div class="grid grid-cols-3 gap-4">
  <div class="h-[168px] rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-[12px] leading-snug">
    <span class="text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-700">
      01 · Quy tắc định dạng
    </span>
    <div class="mt-3 text-slate-600">
      <b>Ví dụ:</b>
      mẫu địa chỉ email hoặc checksum mã định danh.
      <br />
      <br />
      <b>Giới hạn:</b>
      biến dạng gây bỏ sót; mẫu trùng gây báo giả.
    </div>
  </div>
  <div
    class="h-[168px] rounded-xl border border-amber-200 bg-amber-50 p-4 text-[12px] leading-snug"
  >
    <span class="text-[10px] font-bold uppercase tracking-[0.12em] text-amber-700">
      02 · Fingerprinting
    </span>
    <div class="mt-3 text-slate-600">
      <b>Ví dụ:</b>
      khớp một phần nội dung từ tệp khách hàng đã biết.
      <br />
      <br />
      <b>Giới hạn:</b>
      chỉnh sửa hoặc dữ liệu mới làm giảm khả năng khớp.
    </div>
  </div>
  <div
    class="h-[168px] rounded-xl border border-violet-200 bg-violet-50 p-4 text-[12px] leading-snug"
  >
    <span class="text-[10px] font-bold uppercase tracking-[0.12em] text-violet-700">
      03 · Phân loại theo nội dung
    </span>
    <div class="mt-3 text-slate-600">
      <b>Ví dụ:</b>
      xác định câu mô tả tình trạng sức khỏe theo ngữ cảnh.
      <br />
      <br />
      <b>Giới hạn:</b>
      cần dữ liệu gán nhãn; có thể nhầm hoặc bỏ sót.
    </div>
  </div>
</div>

<div class="mt-5 grid grid-cols-[.9fr_60px_1.35fr_60px_.75fr] items-center gap-1 text-center">
  <div class="rounded-xl border border-slate-200 bg-slate-50 py-3">
    <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500">Phát hiện</span>
    <br />
    <b class="text-[14px] text-amber-600">có định danh</b>
  </div>
  <div class="text-3xl text-sky-500">→</div>
  <div class="rounded-xl border border-slate-200 bg-slate-50 py-3">
    <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500">
      Quyết định chính sách
    </span>
    <br />
    <b class="text-[14px]">nội dung + người / hành động + đích</b>
  </div>
  <div class="text-3xl text-sky-500">→</div>
  <div class="rounded-xl border border-slate-200 bg-slate-50 py-3">
    <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500">Thực thi</span>
    <br />
    <b class="text-[14px] text-rose-600">CHẶN</b>
  </div>
</div>

<div class="mt-4 rounded-r-lg border-l-4 border-amber-400 bg-slate-100 p-3 font-mono text-[12px]">
  Có định danh + chuyên viên / xuất + đích chưa duyệt → chặn; nếu không → cho phép và ghi nhận
</div>

<div class="absolute bottom-4 left-12 right-12 text-[9px] leading-tight text-slate-400">
  Fingerprinting: Shapira et al., arXiv:1302.2028 (2013) · Phân loại văn bản ngữ cảnh: Ahmed et al.,
  Internet of Things 16, 100444 (2021).
</div>

<!--
Mục tiêu: 1:30

Không có bộ dò nào hợp với mọi định dạng. Quy tắc nhận ra cấu trúc email hay mã có checksum; dễ giải thích nhưng dễ bị biến dạng né tránh và có thể khớp nhầm.

Fingerprinting so khớp nội dung đã biết, như một phần của tệp khách hàng. Chỉnh sửa có thể làm mất khớp; đối sánh rộng có thể báo giả. Shapira và cộng sự nghiên cứu cách mở rộng kỹ thuật này.

Phân loại nội dung xét ngữ cảnh, hữu ích khi cùng một cụm từ nhạy cảm trong tình huống này nhưng bình thường ở tình huống khác. Ahmed và cộng sự nghiên cứu học sâu cho văn bản phi cấu trúc; mô hình vẫn cần dữ liệu phù hợp và đánh giá sai số.

Điểm mấu chốt: bộ dò chỉ trả về phát hiện. Chính sách kết hợp nội dung với người dùng, hành động và đích đến; điểm thực thi biến quyết định thành cho phép hoặc chặn.

Slide tiếp theo xem các công nghệ hiện nay đặt ở đâu trong pipeline.
-->
