---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Demo 1: thu nhịp gõ trên trình duyệt

<DemoProgress :active="$clicks >= 1 ? 2 : 1" />

<div class="mt-4 grid grid-cols-[1fr_1fr] gap-6 text-[14.5px] leading-snug">
  <div>
    <div class="text-[12px] font-bold uppercase tracking-wide text-slate-500">Thao tác</div>
    <ol class="mt-2 list-decimal !pl-5 [&_li]:!my-1.5">
      <li>Mở collector, chọn chế độ <b>Pilot</b>, xác nhận đồng thuận.</li>
      <li>Gõ một đoạn ngắn, sửa bằng Backspace, thử dán văn bản.</li>
      <li>Nhấp ra ngoài vùng gõ rồi chọn <b>Tiếp tục gõ</b>.</li>
      <li>Kết thúc phiên và tải file JSON.</li>
    </ol>
    <div class="mt-3 rounded bg-slate-900 px-3 py-2 font-mono text-[12.5px] text-emerald-300">
      cd final-project/member2/collector<br>pnpm start<br><span class="text-slate-400"># mở http://localhost:4173</span>
    </div>
  </div>
  <div v-click>
    <div class="text-[12px] font-bold uppercase tracking-wide text-slate-500">Điều cần chỉ ra trong file JSON</div>
    <div class="mt-2 flex flex-col gap-2">
      <div class="border-l-4 border-emerald-500 bg-emerald-50 px-3 py-1.5">Mỗi phím chỉ còn nhóm <b>typing, separator, correction</b> và thời điểm nhấn, nhả.</div>
      <div class="border-l-4 border-emerald-500 bg-emerald-50 px-3 py-1.5">Không có ký tự, event.key hay nội dung câu đã gõ.</div>
      <div class="border-l-4 border-amber-500 bg-amber-50 px-3 py-1.5">Dán bị chặn; mất tiêu điểm tạo ranh giới, không ghép nhấn nhả xuyên gián đoạn.</div>
      <div class="border-l-4 border-slate-500 bg-slate-50 px-3 py-1.5">File demo để riêng, không đưa vào dữ liệu nghiên cứu.</div>
    </div>
  </div>
</div>

<!--
Mục tiêu: 1:15 (demo trực tiếp)

Chuẩn bị trước: chạy pnpm install --frozen-lockfile và pnpm start trong member2/collector, mở sẵn tab localhost:4173. Nếu máy có Make và WSL thì dùng make run trong member2.

Em mở công cụ thu, chọn chế độ Pilot, đọc và xác nhận đồng thuận rồi bắt đầu phiên. Em gõ một câu bình thường, sửa vài chỗ bằng Backspace, thử dán thì bị chặn. Nhấp ra ngoài rồi tiếp tục gõ. Kết thúc phiên và tải JSON.

[CLICK] Mở file JSON: chỉ có nhóm phím và thời điểm nhấn nhả, không có ký tự nào. Đây chính là nguyên tắc tối thiểu hóa dữ liệu đã nêu ở phần mô hình đe dọa.

Dự phòng nếu không mở được collector: chuyển ngay sang slide kế, giải thích bằng hình chụp và file JSON mẫu.
-->
