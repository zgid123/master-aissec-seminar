---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Hạn chế: giảm rủi ro, không loại bỏ rủi ro

<div class="lim-body">
  <div class="lim-main">
  <TableComparison class="lim-table" :animation="false" :dense="true" row-header-width="118px" :spacing="3.5">
    <TableComparisonCols corner-width="118px">
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
        <TableComparisonCell align="left">Mỗi dịch vụ chỉ <strong>hỗ trợ một số loại dữ liệu, định dạng</strong> (vd: Model Armor bỏ qua tệp &gt; 4 MB, không hỗ trợ audio/video).</TableComparisonCell>
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
  </div>

  <div class="lim-side">
    <div class="lim-card lim-card--risk">
      <div class="lim-tag">INSIDER - NGƯỜI CÓ QUYỀN HỢP LỆ</div>
      <p>Tổng quan 42 nghiên cứu (2011-2022) coi rò rỉ do <b>người có quyền hợp lệ</b>, cố ý hoặc vô ý, là mối quan tâm chính; ~40% nghiên cứu tập trung vào insider. DLP <b>giảm chứ không loại bỏ</b> rủi ro này và phụ thuộc nhiều vào chất lượng policy.</p>
      <div class="lim-source">Herrera Montano et al., 2022</div>
    </div>
    <div class="lim-legend">
      <i></i><span>Giới hạn cốt lõi của đề xuất</span>
    </div>
  </div>
</div>

<div class="lim-takeaway">
  Cần đo: <strong>FP/FN</strong> — <strong>Độ trễ</strong> — <strong>Độ bao phủ</strong>
</div>

<style scoped>
:deep(h1) {
  margin-top: 0 !important;
  margin-bottom: 8px !important;
  font-size: 27px !important;
  line-height: 1.2 !important;
}
.lim-body {
  margin-top: 6px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 275px;
  gap: 16px;
  align-items: start;
}
.lim-main {
  display: flex;
  flex-direction: column;
}
:deep(.lim-table.alpha-table-comparison) {
  margin: 0;
}
:deep(.lim-table .alpha-table-comparison-col) {
  padding: 7px 11px;
  text-align: left !important;
  text-transform: none;
  letter-spacing: normal;
  font-size: 13px !important;
  font-weight: 700;
  border: 1px solid #dce5ee !important;
}
:deep(.lim-table .alpha-table-comparison-row-title) {
  padding: 6.5px 9px;
  background: #e8eef5 !important;
  color: #18334f !important;
  text-align: left !important;
  text-transform: none;
  letter-spacing: normal;
  font-size: 11.5px !important;
  font-weight: 700;
  line-height: 1.3;
  border: 1px solid #dce5ee !important;
}
:deep(.lim-table .alpha-table-comparison-cell) {
  padding: 7px 11px;
  background: #f8fafc !important;
  color: #243c54 !important;
  text-align: left !important;
  font-size: 12px !important;
  font-weight: 400;
  line-height: 1.4;
  border: 1px solid #e0e7ef !important;
}
:deep(.lim-table .alpha-table-comparison-cell strong) {
  font-weight: 700;
}
:deep(.lim-core .alpha-table-comparison-row-title) {
  background: #ffe4e6 !important;
  color: #9f1239 !important;
  border: 1px solid #fb7185 !important;
}
:deep(.lim-core .alpha-table-comparison-cell) {
  background: #fff5f5 !important;
  border: 1px solid #fb7185 !important;
}
.lim-side {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.lim-card {
  padding: 13px 15px;
  border: 1px solid;
  border-radius: 12px;
  color: #18334f;
}
.lim-card--risk {
  background: #fff5f5;
  border-color: #fb7185;
  border-left-width: 4px;
}
.lim-tag {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .06em;
  line-height: 1.2;
  color: #9f1239;
}
.lim-card p {
  margin: 7px 0 0;
  font-size: 12.2px;
  line-height: 1.45;
}
.lim-source {
  margin-top: 9px;
  color: #53677c;
  font-size: 11px;
}
.lim-legend {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #fff5f5;
  border: 1px dashed #fb7185;
  border-radius: 8px;
  color: #9f1239;
  font-size: 11.5px;
  line-height: 1.3;
}
.lim-legend i {
  width: 9px;
  height: 9px;
  border: 1px solid #fb7185;
  border-radius: 2px;
  background: #ffe4e6;
  flex-shrink: 0;
}
.lim-takeaway {
  margin: 14px auto 0;
  max-width: 660px;
  padding: 8px 24px;
  border-radius: 8px;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  color: #0369a1;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
  text-align: center;
}
.lim-takeaway strong {
  font-weight: 800;
  color: #0c4a6e;
}
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
DLP chỉ chặn được ở những đường đã được tích hợp. Ví dụ, Google Model Armor chỉ trả về kết quả kiểm tra; nơi tích hợp mới là bên thực sự chặn.
Cho nên ta phải kiểm soát từng egress path. Ta cũng phải quét lại dữ liệu dẫn xuất, tức là dữ liệu mới tạo ra từ dữ liệu gốc, vì nhãn cũ có thể đã lỗi thời sau khi dữ liệu được biến đổi.

Hạn chế thứ ba là phạm vi hỗ trợ của sản phẩm.
Mỗi dịch vụ chỉ hỗ trợ một số loại dữ liệu và định dạng nhất định. Ví dụ, Model Armor bỏ qua tệp lớn hơn 4 MB và không hỗ trợ audio, video.
Vì vậy cần lập bảng độ bao phủ, và kết hợp nhiều lớp phòng thủ.

Hai hàng cuối, nhóm em xin nói lướt.
Về chi phí vận hành, nên triển khai theo pha: ghi log trước, rồi cảnh báo, cuối cùng mới chặn.
Về độ trễ, ta cần đo thời gian quét và thời gian ra quyết định.
Về người trong tổ chức, hay insider: Herrera Montano và cộng sự năm 2022 tổng quan 42 nghiên cứu và coi rò rỉ do người có quyền hợp lệ, dù cố ý hay vô ý, là mối quan tâm chính; khoảng 40 phần trăm nghiên cứu tập trung vào insider.
Chính tổng quan này cũng nêu: DLP khó khắc phục sơ suất của người dùng và phụ thuộc nhiều vào chất lượng policy. Vì vậy DLP giúp giảm, chứ không loại bỏ được rủi ro này.

Vì vậy, ta cần đo ba thứ: báo nhầm và bỏ sót, độ trễ, và độ bao phủ.
Prototype của nhóm em mới chỉ đo trên dữ liệu tổng hợp, chạy trên một máy.
Ví dụ, tập kiểm thử chỉ có 12 dòng, cho ra 1 báo nhầm và 1 bỏ sót. [XÁC MINH SỐ NÀY VỚI REPO DEMO TRƯỚC KHI NÓI - không thấy trên slide nào]
Con số này chỉ minh họa cách đo, chưa đại diện cho hệ thống thật.
Vậy xu hướng hiện nay là gì? Mời thầy cô và các bạn xem slide tiếp theo.

Tham khảo (không đọc):
- Herrera Montano et al. (2022): https://doi.org/10.1007/s10586-022-03668-2
- Google Model Armor: https://docs.cloud.google.com/model-armor/overview
-->
