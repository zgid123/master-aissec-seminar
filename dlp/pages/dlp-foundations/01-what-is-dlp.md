---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# DLP: phát hiện và thực thi


<div class="max-w-[900px] text-[17px] leading-snug">
  Trong seminar này,
  <b>Data Leakage Prevention (DLP)</b>
  là cách nhận diện dữ liệu nhạy cảm và kiểm soát hành động có thể làm lộ dữ liệu đó.
</div>

<div class="mt-5 grid grid-cols-5 gap-2 text-center text-[11px] font-bold leading-snug">
  <div class="rounded-lg border border-amber-300 bg-amber-50 p-3 text-amber-800">
    <span class="block text-[9px]">01</span>
    Phát hiện
  </div>
  <div class="rounded-lg border border-amber-300 bg-amber-50 p-3 text-amber-800">
    <span class="block text-[9px]">02</span>
    Phân loại
  </div>
  <div class="rounded-lg border border-sky-300 bg-sky-50 p-3 text-sky-800">
    <span class="block text-[9px]">03</span>
    Quyết định chính sách
  </div>
  <div class="rounded-lg border border-rose-300 bg-rose-50 p-3 text-rose-800">
    <span class="block text-[9px]">04</span>
    Thực thi: cho phép / cảnh báo / chặn
  </div>
  <div class="rounded-lg border border-emerald-300 bg-emerald-50 p-3 text-emerald-800">
    <span class="block text-[9px]">05</span>
    Ghi nhận
  </div>
</div>

<div class="grid grid-cols-[1.15fr_.85fr] gap-5 mt-6">
  <div class="rounded-r-lg border-l-4 border-rose-500 bg-slate-100 p-4 font-mono text-[13px]">
    NẾU bản xuất có mã/email khách hàng
    <br />
    VÀ đích chưa được phê duyệt
    <br />
    <b class="text-rose-700">THÌ chặn và ghi nhật ký</b>
  </div>
  <div class="rounded-xl border border-slate-200 bg-slate-50 p-4 text-[12px] leading-snug">
    <b class="text-amber-700">Phát hiện:</b>
    bản dữ liệu chứa gì?
    <br />
    <b class="text-rose-700">Ngăn ngừa:</b>
    hành động xuất có được tiếp tục không?
    <br />
    <br />
    Phát hiện đơn thuần chưa chặn được luồng dữ liệu.
  </div>
</div>

<div class="absolute bottom-4 left-12 right-12 text-[9px] leading-tight text-slate-400">
  Tổng quan khái niệm và kỹ thuật DLP: Alneyadi et al., JNCA 62 (2016), 137–152.
  doi:10.1016/j.jnca.2016.01.008.
</div>

<!--
Mục tiêu: 1:00

Trong seminar này, DLP là Data Leakage Prevention: nhận diện dữ liệu nhạy cảm và kiểm soát hành động có thể làm lộ dữ liệu. Một số hãng mở rộng chữ viết tắt thành Data Loss Prevention; chúng tôi tập trung vào tiết lộ trái phép, không phải sao lưu hay khôi phục dữ liệu đã xóa.

Luồng gồm phát hiện, phân loại, quyết định chính sách, cho phép/cảnh báo/chặn và ghi nhận. Nếu bản xuất có mã khách hàng hoặc email mà đích chưa duyệt, hệ thống chặn và ghi nhật ký.

Cần tách phát hiện khỏi ngăn ngừa: bộ quét tìm thấy email; chỉ điểm thực thi trên luồng xuất mới có thể chặn lần gửi.

Chuyển ý: DLP phối hợp với các lớp bảo mật khác; ta hãy đặt nó đúng vị trí và giới hạn phạm vi.
-->
