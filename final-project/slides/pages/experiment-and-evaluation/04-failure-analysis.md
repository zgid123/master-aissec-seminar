---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Phân tích các ca phát hiện sai

<div class="mt-1 grid grid-cols-[1.1fr_1fr] gap-6 items-start">
  <table class="fa w-full text-center text-[13.5px]">
    <thead>
      <tr><th class="text-left">Cấu hình</th><th>Không<br>phát hiện</th><th>Phát hiện<br>muộn</th><th>Thu hồi<br>trước N</th><th>Thu hồi<br>oan G0</th></tr>
    </thead>
    <tbody>
      <tr><td class="text-left">L1, B0</td><td>268</td><td>79</td><td>0</td><td>1</td></tr>
      <tr><td class="text-left">L1, B1</td><td>162</td><td>98</td><td>54</td><td>2</td></tr>
      <tr><td class="text-left">L1, P1</td><td>180</td><td>102</td><td>18</td><td>2</td></tr>
      <tr class="sep"><td class="text-left">L1, B1 λ=1</td><td>160</td><td>97</td><td>54</td><td>2</td></tr>
      <tr><td class="text-left">IF, B0</td><td>276</td><td>97</td><td>0</td><td>0</td></tr>
      <tr><td class="text-left">IF, B1</td><td>161</td><td>122</td><td>0</td><td>1</td></tr>
      <tr><td class="text-left">IF, P1</td><td class="font-bold text-emerald-700">95</td><td>86</td><td class="font-bold text-rose-700">72</td><td class="font-bold text-rose-700">4</td></tr>
    </tbody>
  </table>
  <div class="flex flex-col gap-2.5 text-[14px] leading-snug">
    <div v-click class="border-l-4 border-slate-500 bg-slate-50 px-3 py-2">
      <b>Không phát hiện chiếm phần lớn.</b> Khi điểm người lạ gần điểm chủ, hạ ngưỡng chỉ làm tăng báo động giả.
    </div>
    <div v-click class="border-l-4 border-rose-500 bg-rose-50 px-3 py-2">
      <b>P1 đổi bỏ sót lấy thu hồi oan.</b> IF P1 giảm ca bỏ sót còn 95, nhưng 72 kịch bản bị thu hồi trước khi người lạ xuất hiện.
    </div>
    <div v-click class="border-l-4 border-amber-500 bg-amber-50 px-3 py-2">
      <b>Đếm đúng đơn vị.</b> 72 kịch bản chỉ đến từ <b>4/24 prefix</b> chính chủ; L1 B1 có 54 kịch bản từ 3/24 prefix.
    </div>
    <div v-click class="rounded bg-slate-800 px-3 py-2 text-white">
      Không chính sách nào thắng toàn diện. Phải đọc cùng lúc phát hiện, TTD, kiểm duyệt và thu hồi oan.
    </div>
  </div>
</div>

<style scoped>
.fa th { background: #f1f5f9; font-weight: 700; padding: 4px 6px; line-height: 1.15; }
.fa td { padding: 3px 6px; border-bottom: 1px solid #e2e8f0; }
.fa tr.sep td { border-bottom: 2px solid #94a3b8; }
</style>

<!--
Mục tiêu: 0:50

Bảng phân loại lỗi trong 432 kịch bản mỗi cấu hình. Không phát hiện là không có cảnh báo trong phần theo dõi; phát hiện muộn là sau hơn 150 phím. Các cột có đơn vị khác nhau nên không cộng lại.

[CLICK] Loại lỗi lớn nhất là không phát hiện. Khi điểm của người lạ gần điểm của chủ, hạ ngưỡng không giúp được mà chỉ tăng báo động giả.

[CLICK] P1 với Isolation Forest giảm số ca bỏ sót xuống 95, thấp nhất. Nhưng đổi lại 72 kịch bản bị thu hồi trước khi người lạ xuất hiện, và 4 lần thu hồi oan trên phiên chủ.

[CLICK] Cần đếm đúng đơn vị: 72 kịch bản này không phải 72 sự cố độc lập. Chúng chỉ đến từ 4 trong 24 đoạn prefix của chủ, vì mỗi prefix được ghép với nhiều người lạ.

[CLICK] Kết luận của phần phân tích: không có chính sách thắng toàn diện, và không được đọc riêng một con số.
-->
