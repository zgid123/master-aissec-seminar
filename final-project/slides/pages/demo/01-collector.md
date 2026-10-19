---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Demo 1: thu nhịp gõ trên trình duyệt

<DemoProgress :active="1" />

<div class="mt-3 grid grid-cols-[1fr_1.2fr] items-center gap-6 text-[18px] leading-snug">
  <div>
    <div class="text-[13px] font-bold uppercase tracking-wide text-slate-500">Thao tác</div>
    <ol class="mt-2 list-decimal !pl-5 [&_li]:!my-2">
      <li>Mở collector, chọn chế độ <b>Pilot</b>, xác nhận đồng thuận.</li>
      <li>Gõ một đoạn ngắn, sửa bằng Backspace, thử dán văn bản.</li>
      <li>Nhấp ra ngoài vùng gõ rồi chọn <b>Tiếp tục gõ</b>.</li>
      <li>Kết thúc phiên và tải file JSON.</li>
    </ol>
  </div>
  <img src="/figures/collector_panel.png" class="w-full rounded-lg border border-slate-300 shadow-md" alt="Giao diện collector thu nhịp gõ" />
</div>

<div v-click class="mt-4 grid grid-cols-3 gap-4 text-[17px] leading-snug">
  <div class="border-l-4 border-emerald-500 bg-emerald-50 px-3 py-2">Chỉ lưu <b>loại phím</b> và thời điểm.</div>
  <div class="border-l-4 border-emerald-500 bg-emerald-50 px-3 py-2"><b>Không</b> lưu ký tự đã gõ.</div>
  <div class="border-l-4 border-amber-500 bg-amber-50 px-3 py-2">Chặn dán, tách đoạn khi rời ô gõ.</div>
</div>
<!--
Mục tiêu: 1:15 (demo trực tiếp)

Chuẩn bị trước: chạy pnpm install --frozen-lockfile và pnpm start trong member2/collector, mở sẵn tab localhost:4173. Nếu máy có Make và WSL thì dùng make run trong member2.

Ở trang này em CHUYỂN SANG TAB TRÌNH DUYỆT để demo trực tiếp. Em mở công cụ thu, chọn chế độ Pilot, xác nhận đồng thuận rồi bắt đầu phiên. Em gõ một câu, sửa vài chỗ bằng Backspace, thử dán thì bị chặn. Nhấp ra ngoài rồi tiếp tục gõ. Kết thúc phiên và tải JSON.

[CLICK] Quay lại slide và mở file JSON: chỉ có nhóm phím và thời điểm nhấn nhả, không có ký tự nào. Đây là nguyên tắc riêng tư đã nêu ở mô hình đe dọa.

Dự phòng nếu không mở được collector: chuyển ngay sang slide kế, giải thích bằng hình chụp và file JSON mẫu.
-->
