---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Hạn chế: giảm rủi ro, không loại bỏ rủi ro

<div class="lim-body">
  <div>
  <TableComparison class="lim-table" :animation="false" :dense="true" row-header-width="128px" :spacing="5">
    <TableComparisonCols corner-width="128px">
      <TableComparisonCol color="#fff1f2" text-color="#9f1239">Vì sao xảy ra</TableComparisonCol>
      <TableComparisonCol color="#ecfdf5" text-color="#047857">Cách giảm thiểu</TableComparisonCol>
    </TableComparisonCols>
    <TableComparisonRows>
      <TableComparisonRow title="1 - Báo nhầm / bỏ sót (FP/FN)">
        <TableComparisonCell align="left">Rule, fingerprint, AI đều có <strong>sai số</strong>; dữ liệu <strong>mã hóa hoặc cố tình biến dạng</strong> khó phát hiện.</TableComparisonCell>
        <TableComparisonCell align="left">Chạy <strong>chế độ mô phỏng</strong> trước khi chặn thật; tinh chỉnh; đo FP/FN.</TableComparisonCell>
      </TableComparisonRow>
      <TableComparisonRow title="2 - Egress path chưa kiểm soát" class="lim-core">
        <TableComparisonCell align="left">Egress path là <strong>đường để dữ liệu rời hệ thống</strong>: upload qua trình duyệt, đọc thẳng storage, script đi vòng.</TableComparisonCell>
        <TableComparisonCell align="left">Kiểm soát <strong>từng egress path</strong>; quét lại dữ liệu dẫn xuất.</TableComparisonCell>
      </TableComparisonRow>
      <TableComparisonRow title="3 - Phạm vi hỗ trợ của sản phẩm">
        <TableComparisonCell align="left">Mỗi dịch vụ chỉ <strong>hỗ trợ một số loại dữ liệu, định dạng</strong>.</TableComparisonCell>
        <TableComparisonCell align="left">Lập <strong>bảng độ bao phủ</strong>; kết hợp nhiều lớp phòng thủ (defense in depth).</TableComparisonCell>
      </TableComparisonRow>
      <TableComparisonRow title="4 - Chi phí vận hành">
        <TableComparisonCell align="left">Soạn policy, đổi quy trình, <strong>đào tạo</strong> người dùng.</TableComparisonCell>
        <TableComparisonCell align="left">Triển khai theo pha: <strong>ghi log → cảnh báo → chặn</strong>.</TableComparisonCell>
      </TableComparisonRow>
      <TableComparisonRow title="5 - Độ trễ và quy mô">
        <TableComparisonCell align="left">Mỗi lần kiểm tra tốn thời gian; nhiều định dạng, nhiều <strong>egress path</strong>.</TableComparisonCell>
        <TableComparisonCell align="left">Đo <strong>thời gian quét</strong> và <strong>độ trễ ra quyết định</strong>.</TableComparisonCell>
      </TableComparisonRow>
    </TableComparisonRows>
  </TableComparison>
  <div class="lim-legend"><i></i>Giới hạn cốt lõi của đề xuất</div>
  </div>

  <div class="lim-side">
    <div v-click="2" class="lim-card lim-card--num">
      <div class="lim-tag">SCHWAB ET AL., 2021</div>
      <div class="lim-stat"><s>137 ms</s><span>→</span><strong>0,35 ms</strong></div>
      <p>Phân loại truy vấn SQL theo chính sách: cách dựa trên đồ thị (graph) mất trung bình 137 ms; sau tối ưu, <b>87% ca</b> chỉ còn 0,35 ms. Nghiên cứu liên quan, không phải số đo của nhóm.</p>
    </div>
    <div v-click="3" class="lim-card lim-card--risk">
      <div class="lim-tag">INSIDER - NGƯỜI CÓ QUYỀN HỢP LỆ</div>
      <p>Nguồn rò rỉ chính trong khảo sát là <b>người trong tổ chức có quyền</b> truy cập hợp lệ, cố ý hoặc vô ý. DLP <b>giảm chứ không loại bỏ</b> rủi ro này.</p>
      <div class="lim-source">Herrera Montano et al., 2022</div>
    </div>
  </div>
</div>

<div v-click="4" class="lim-takeaway">Cần đo: FP/FN - độ trễ - độ bao phủ</div>

<style scoped>
.lim-body { margin-top: 10px; display: grid; grid-template-columns: minmax(0, 1fr) 250px; gap: 16px; align-items: start; }
:deep(.lim-table.alpha-table-comparison) { margin: 0; }
:deep(.lim-table .alpha-table-comparison-col) { padding: 8px 12px; text-align: left !important; text-transform: none; letter-spacing: normal; font-size: 14px !important; border: 1px solid #dce5ee !important; }
:deep(.lim-table .alpha-table-comparison-row-title) { padding: 8px 9px; background: #e8eef5 !important; color: #18334f !important; text-align: left !important; text-transform: none; letter-spacing: normal; font-size: 12px !important; line-height: 1.25; border: 1px solid #dce5ee !important; }
:deep(.lim-table .alpha-table-comparison-cell) { padding: 8px 12px; background: #f8fafc !important; color: #243c54 !important; text-align: left !important; font-size: 12.5px !important; font-weight: 400; line-height: 1.35; border: 1px solid #e0e7ef !important; }
:deep(.lim-table .alpha-table-comparison-cell strong) { font-weight: 700; }
:deep(.lim-core .alpha-table-comparison-row-title) { background: #ffe4e6 !important; color: #9f1239 !important; border: 1px solid #fb7185 !important; }
:deep(.lim-core .alpha-table-comparison-cell) { background: #fff5f5 !important; border: 1px solid #fb7185 !important; }
.lim-legend { display: flex; align-items: center; gap: 6px; margin: 5px 0 0 133px; color: #9f1239; font-size: 11px; font-weight: 700; }
.lim-legend i { width: 10px; height: 10px; border: 1px solid #fb7185; border-radius: 3px; background: #ffe4e6; }
.lim-side { display: flex; flex-direction: column; gap: 12px; }
.lim-card { padding: 12px 14px 12px; border: 1px solid; border-radius: 12px; color: #18334f; }
.lim-card--num { background: #effbfc; border-color: #a7e3e8; }
.lim-card--risk { background: #fff5f5; border-color: #fb7185; border-left-width: 4px; }
.lim-tag { font-size: 11px; font-weight: 800; letter-spacing: .08em; line-height: 1.2; }
.lim-card--num .lim-tag { color: #0e7490; }
.lim-card--risk .lim-tag { color: #9f1239; }
.lim-stat { display: flex; align-items: baseline; gap: 8px; margin: 6px 0 4px; }
.lim-stat s { color: #8296aa; font-size: 16px; }
.lim-stat span { color: #0891b2; font-size: 16px; }
.lim-stat strong { color: #0e6175; font-size: 26px; font-weight: 750; line-height: 1.1; }
.lim-card p { margin: 6px 0 0; font-size: 12.5px; line-height: 1.35; }
.lim-card--num p { margin-top: 0; }
.lim-source { margin-top: 8px; color: #53677c; font-size: 11px; }
.lim-takeaway { margin-top: 14px; color: #0e6175; font-size: 16px; font-weight: 700; line-height: 1.2; text-align: center; }
</style>

<!--
Mục tiêu: nói rõ DLP giảm rủi ro chứ không loại bỏ được rủi ro.

Thời lượng: khoảng 1 phút 15 giây.

Thưa thầy cô và các bạn, DLP giúp giảm rủi ro, nhưng không loại bỏ được rủi ro.
Bảng này có năm hạn chế. Nhóm em xin nói kỹ ba hạn chế đầu, hai hạn chế còn lại sẽ nói lướt.

Hạn chế thứ nhất là báo nhầm và bỏ sót.
Rule, fingerprint hay AI đều có thể sai. Dữ liệu đã mã hóa, hoặc cố tình bị biến dạng, thì càng khó phát hiện.
Vì vậy, nên chạy ở chế độ mô phỏng trước, rồi mới bật chặn thật.

Hạn chế thứ hai, cũng là giới hạn cốt lõi của đề xuất, là egress path chưa được kiểm soát.
Egress path nói đơn giản là mọi đường để dữ liệu rời khỏi hệ thống.
Ví dụ: người dùng upload qua trình duyệt, đọc thẳng từ storage, hoặc viết script đi vòng qua điểm chặn.
DLP chỉ chặn được ở những đường đã được tích hợp.
Cho nên ta phải kiểm soát từng egress path. Ta cũng phải quét lại dữ liệu dẫn xuất, tức là dữ liệu mới tạo ra từ dữ liệu gốc, vì nhãn cũ có thể đã lỗi thời sau khi dữ liệu được biến đổi.

Hạn chế thứ ba là phạm vi hỗ trợ của sản phẩm.
Mỗi dịch vụ chỉ hỗ trợ một số loại dữ liệu và định dạng nhất định.
Vì vậy cần lập bảng độ bao phủ, và kết hợp nhiều lớp phòng thủ.

Hai hàng cuối, nhóm em xin nói lướt.
Về chi phí vận hành, nên triển khai theo pha: ghi log trước, rồi cảnh báo, cuối cùng mới chặn.
Về độ trễ, ta cần đo thời gian quét và thời gian ra quyết định.

[click:2]
Về độ trễ, có một nghiên cứu liên quan của Schwab và cộng sự năm 2021, về phân loại truy vấn SQL theo chính sách.
Cách dựa trên đồ thị mất trung bình 137 mili giây.
Sau khi tối ưu, 87 phần trăm trường hợp chỉ còn 0,35 mili giây.
Xin lưu ý: đây là nghiên cứu liên quan, không phải số đo của nhóm em.

[click:3]
Về người trong tổ chức, hay insider: theo khảo sát của Herrera Montano và cộng sự năm 2022, nguồn rò rỉ chính là những người có quyền truy cập hợp lệ, dù cố ý hay vô ý.
DLP giúp giảm, chứ không loại bỏ được rủi ro này.

[click:4]
Vì vậy, ta cần đo ba thứ: báo nhầm và bỏ sót, độ trễ, và độ bao phủ.
Prototype của nhóm em mới chỉ đo trên dữ liệu tổng hợp, chạy trên một máy.
Ví dụ, tập kiểm thử chỉ có 12 dòng, cho ra 1 báo nhầm và 1 bỏ sót.
Con số này chỉ minh họa cách đo, chưa đại diện cho hệ thống thật.
Vậy xu hướng hiện nay là gì? Mời thầy cô và các bạn xem slide tiếp theo.

Tham khảo (không đọc):
- Schwab et al. (2021): https://doi.org/10.1007/s13222-021-00385-9
- Herrera Montano et al. (2022): https://doi.org/10.1007/s10586-022-03668-2
-->
