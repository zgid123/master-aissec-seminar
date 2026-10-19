---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Demo 2: replay một kịch bản tiếp quản

<DemoProgress :active="2" />

<div class="mt-2 flex items-center justify-between text-[17px] text-slate-600">
  <span>Cùng một chủ tài khoản, ghép với hai người lạ khác nhau.</span>
  <span class="flex gap-4 text-[14px]">
    <span><span class="inline-block h-2.5 w-2.5 rounded-sm bg-sky-500"></span> chủ thật</span>
    <span><span class="inline-block h-2.5 w-2.5 rounded-sm bg-purple-500"></span> cửa sổ trộn</span>
    <span><span class="inline-block h-2.5 w-2.5 rounded-sm bg-rose-500"></span> người lạ</span>
  </span>
</div>

<div class="mt-2 grid grid-cols-2 gap-5">
  <div>
    <div class="text-[16px] font-bold text-slate-700">Người lạ thứ nhất: <span class="text-slate-500">bỏ sót</span></div>
    <CusumTrace :h1="1" :h2="2" :windows="[
      { s: 0, label: 'genuine', action: 'CONTINUE' },
      { s: 0.49, label: 'genuine', action: 'CONTINUE' },
      { s: 0, label: 'genuine', action: 'CONTINUE' },
      { s: 0, label: 'genuine', action: 'CONTINUE' },
      { s: 0, label: 'mixed', action: 'CONTINUE' },
      { s: 0.33, label: 'impostor', action: 'CONTINUE' },
      { s: 0.36, label: 'impostor', action: 'CONTINUE' },
      { s: 0, label: 'impostor', action: 'CONTINUE' },
      { s: 0, label: 'impostor', action: 'CONTINUE' },
      { s: 0, label: 'impostor', action: 'CONTINUE' },
    ]" />
    <div class="text-[15px] text-slate-600">Gõ giống chủ, hết 275 phím vẫn chưa hỏi MFA.</div>
  </div>
  <div v-click="2">
    <div class="text-[16px] font-bold text-slate-700">Người lạ thứ hai: <span class="text-rose-700">phát hiện ở 125 phím</span></div>
    <CusumTrace :h1="1" :h2="2" :windows="[
      { s: 0, label: 'genuine', action: 'CONTINUE' },
      { s: 0.49, label: 'genuine', action: 'CONTINUE' },
      { s: 0, label: 'genuine', action: 'CONTINUE' },
      { s: 0, label: 'genuine', action: 'CONTINUE' },
      { s: 0, label: 'mixed', action: 'CONTINUE' },
      { s: 0, label: 'impostor', action: 'CONTINUE' },
      { s: 1.08, label: 'impostor', action: 'MFA_CHALLENGE' },
    ]" />
    <div class="text-[15px] text-slate-600">W6 vượt mức 1, hệ thống hỏi MFA, kẻ lạ trả lời sai.</div>
  </div>
</div>


<div v-click="3" class="mt-2 border-l-4 border-violet-500 bg-violet-50 px-4 py-2 text-[16px]">
  Ngưỡng chung (B1) bỏ sót cả hai. Ngưỡng riêng (P1) bắt được ca hai nhưng dễ hỏi MFA oan hơn.
</div>

<!--
Mục tiêu: 1:00

Đây là log từ lần chạy ngày 19/10 của pipeline mô hình. Cả hai biểu đồ dùng cùng 225 phím đầu của chủ SIM01, ghép với hai phiên người lạ khác nhau. Em lấy theo thứ tự trong file, không chọn ca đẹp. Xanh là cửa sổ của chủ, tím là cửa sổ trộn, đỏ là người lạ.

Ca thứ nhất: người lạ gõ khá giống chủ, điểm rủi ro chỉ nhích lên rồi về 0. Hết 275 phím mà không cảnh báo, đây là ca bỏ sót.

[CLICK] Ca thứ hai: đến đoạn W6 nhịp gõ lạ rõ, điểm rủi ro vượt mức hỏi MFA. Hệ thống hỏi MFA, người lạ trượt và phiên bị thu hồi, TTD là 125 phím.

[CLICK] Nếu dùng B1 với ngưỡng chung thì cả hai ca đều bị bỏ sót. P1 hạ ngưỡng riêng cho SIM01 nên bắt được, nhưng chính ngưỡng thấp này cũng làm chủ thật dễ bị hỏi MFA oan. Đó là đánh đổi đã thấy ở bảng kết quả.

Ghi chú: script demo.ts của member3 kiểm hash dữ liệu nên báo lỗi trên bản checkout Windows có CRLF. Slide này dùng số lấy trực tiếp từ decisions.csv và events.csv, không cần chạy script.
-->
