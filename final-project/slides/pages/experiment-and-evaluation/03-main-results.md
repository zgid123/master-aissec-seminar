---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Kết quả chính trên tập test

<table class="res mt-1 w-full text-center text-[13.5px]">
  <thead>
    <tr>
      <th class="text-left">Cấu hình</th>
      <th>Phát hiện<br><span>loại thu hồi trước N</span></th>
      <th class="bg-violet-100">Phát hiện<br><span>trên toàn bộ</span></th>
      <th>Trong<br><span>150 phím</span></th>
      <th>Median TTD<br><span>(phím)</span></th>
      <th>MFA/giờ<br><span>thời gian ghi</span></th>
      <th>Thu hồi<br><span>trước N</span></th>
      <th>Thu hồi<br><span>oan G0</span></th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="text-left">L1, B0</td><td>0,380</td><td class="bg-violet-50">0,380</td><td>0,197</td><td>181,25</td><td>12,6</td><td>0</td><td>1</td></tr>
    <tr><td class="text-left">L1, B1</td><td>0,612</td><td class="bg-violet-50">0,500</td><td>0,361</td><td>150,00</td><td>21,4</td><td>54</td><td>2</td></tr>
    <tr><td class="text-left">L1, P1</td><td>0,572</td><td class="bg-violet-50">0,542</td><td>0,330</td><td>150,00</td><td>19,1</td><td>18</td><td>2</td></tr>
    <tr class="sep"><td class="text-left">L1, B1 λ=1</td><td>0,616</td><td class="bg-violet-50">0,505</td><td>0,368</td><td>150,00</td><td>21,4</td><td>54</td><td>2</td></tr>
    <tr><td class="text-left">IF, B0</td><td>0,361</td><td class="bg-violet-50">0,361</td><td>0,137</td><td>162,50</td><td>13,6</td><td>0</td><td>0</td></tr>
    <tr><td class="text-left">IF, B1 (= λ=1)</td><td>0,627</td><td class="bg-violet-50 font-bold">0,627</td><td>0,345</td><td>162,50</td><td>15,3</td><td>0</td><td>1</td></tr>
    <tr v-mark.circle.red="2"><td class="text-left">IF, P1</td><td class="font-bold">0,755</td><td class="bg-violet-50">0,613</td><td>0,519</td><td>137,50</td><td>20,3</td><td class="text-rose-700 font-bold">72</td><td class="text-rose-700 font-bold">4</td></tr>
  </tbody>
</table>

<div class="mt-2 text-[12px] text-slate-500">Trung bình 4 hồ sơ; 432 kịch bản mỗi cấu hình. Nguồn: lần chạy 19/10/2026, đã replay độc lập và khớp hoàn toàn.</div>

<div v-click="1" class="mt-2 rounded-lg bg-slate-800 px-4 py-2 text-[15px] text-white">
  <b>0/4 tài khoản đạt ràng buộc</b> ở cả 8 tổ hợp, trên validation lẫn test. Đây là kết quả chẩn đoán, chưa có điểm vận hành hợp lệ.
</div>

<style scoped>
.res th { background: #f1f5f9; font-weight: 700; padding: 4px 6px; line-height: 1.15; }
.res th span { font-weight: 400; font-size: 11.5px; color: #64748b; }
.res td { padding: 3px 6px; border-bottom: 1px solid #e2e8f0; }
.res tr.sep td { border-bottom: 2px solid #94a3b8; }
</style>

<!--
Mục tiêu: 1:15

Đây là bảng kết quả chính trên tập test.

So B0 với B1: cộng dồn bằng CUSUM tăng tỷ lệ phát hiện rõ rệt, với Isolation Forest từ 0,361 lên 0,627. Cái giá là MFA mỗi giờ tăng.

[CLICK] Nhưng quan trọng nhất: không cấu hình nào đạt đủ ràng buộc, 0 trên 4 tài khoản. Nên đây là kết quả chẩn đoán, nhóm chưa kết luận H1 hay H2.

[CLICK] Dòng được khoanh là bẫy mẫu số. IF P1 đạt 0,755 nếu loại các kịch bản bị thu hồi sớm, trông như tốt nhất. Nhưng tính trên toàn bộ chỉ còn 0,613, thấp hơn B1, vì có 72 kịch bản bị thu hồi oan trước khi người lạ xuất hiện và 4 lần thu hồi oan trên phiên chủ. Phân tích ca lỗi cho thấy không có chính sách nào thắng toàn diện: ngưỡng thấp đổi bỏ sót lấy thu hồi oan.
-->
