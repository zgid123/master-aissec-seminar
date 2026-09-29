---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Hạn chế: giảm rủi ro, không loại bỏ rủi ro

<div class="lim-body">
  <div class="lim-main">
  <TableComparison class="lim-table" :animation="false" :dense="true" row-header-width="114px" :spacing="2.5">
    <TableComparisonCols corner-width="114px">
      <TableComparisonCol color="#fff1f2" text-color="#9f1239">Vì sao xảy ra</TableComparisonCol>
      <TableComparisonCol color="#ecfdf5" text-color="#047857">Cách giảm thiểu</TableComparisonCol>
    </TableComparisonCols>
    <TableComparisonRows>
      <TableComparisonRow title="1 - Báo nhầm / bỏ sót (FP/FN)">
        <TableComparisonCell align="left">Rule, fingerprint, AI đều có <strong>sai số</strong>; dữ liệu <strong>mã hóa hoặc cố tình biến dạng</strong> khó phát hiện (Liu 2015).</TableComparisonCell>
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
      <p>Tổng quan 42 nghiên cứu (2011-2022) coi rò rỉ do <b>người có quyền hợp lệ</b>, cố ý hoặc vô ý, là mối quan tâm chính; ~40% nghiên cứu quan tâm đáng kể đến insider. DLP <b>giảm chứ không loại bỏ</b> rủi ro này và phụ thuộc nhiều vào chất lượng policy.</p>
      <div class="lim-source">Herrera Montano et al., 2022</div>
    </div>
    <div class="lim-legend">
      <i></i><span>Giới hạn cốt lõi của đề xuất</span>
    </div>
  </div>
</div>

<div class="lim-takeaway">
  Cần đo: <strong>FP/FN</strong> — <strong>Độ trễ</strong> — <strong>Độ bao phủ</strong>
  <span class="lim-scope">Prototype: 1 máy · dữ liệu tổng hợp · 1 điểm chặn</span>
</div>

<style scoped>
:deep(h1) {
  margin-top: 0 !important;
  margin-bottom: 6px !important;
  font-size: 26px !important;
  line-height: 1.2 !important;
}
.lim-body {
  margin-top: 4px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 270px;
  gap: 14px;
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
  padding: 4.5px 8px;
  text-align: left !important;
  text-transform: none;
  letter-spacing: normal;
  font-size: 12px !important;
  font-weight: 700;
  border: 1px solid #dce5ee !important;
}
:deep(.lim-table .alpha-table-comparison-row-title) {
  padding: 4px 8px;
  background: #e8eef5 !important;
  color: #18334f !important;
  text-align: left !important;
  text-transform: none;
  letter-spacing: normal;
  font-size: 11px !important;
  font-weight: 700;
  line-height: 1.25;
  border: 1px solid #dce5ee !important;
}
:deep(.lim-table .alpha-table-comparison-cell) {
  padding: 4.5px 8px;
  background: #f8fafc !important;
  color: #243c54 !important;
  text-align: left !important;
  font-size: 11.2px !important;
  font-weight: 400;
  line-height: 1.32;
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
  gap: 8px;
}
.lim-card {
  padding: 10px 12px;
  border: 1px solid;
  border-radius: 11px;
  color: #18334f;
}
.lim-card--risk {
  background: #fff5f5;
  border-color: #fb7185;
  border-left-width: 4px;
}
.lim-tag {
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: .06em;
  line-height: 1.2;
  color: #9f1239;
}
.lim-card p {
  margin: 5px 0 0;
  font-size: 11.2px;
  line-height: 1.35;
}
.lim-source {
  margin-top: 6px;
  color: #53677c;
  font-size: 10.5px;
}
.lim-legend {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #fff5f5;
  border: 1px dashed #fb7185;
  border-radius: 7px;
  color: #9f1239;
  font-size: 11px;
  line-height: 1.25;
}
.lim-legend i {
  width: 8px;
  height: 8px;
  border: 1px solid #fb7185;
  border-radius: 2px;
  background: #ffe4e6;
  flex-shrink: 0;
}
.lim-takeaway {
  margin: 7px auto 0;
  max-width: 660px;
  padding: 4px 20px;
  border-radius: 7px;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  color: #0369a1;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.25;
  text-align: center;
}
.lim-scope {
  display: block;
  margin-top: 1px;
  font-size: 10.5px;
  font-weight: 500;
  color: #53677c;
}
.lim-takeaway strong {
  font-weight: 800;
  color: #0c4a6e;
}
</style>

<!--
Mục tiêu: nói rõ DLP giảm rủi ro chứ không loại bỏ được rủi ro.

Thưa thầy cô và các bạn, DLP giúp giảm rủi ro, nhưng không loại bỏ được rủi ro.
Bảng có năm hạn chế. Nhóm em nói kỹ ba hạn chế đầu, hai hạn chế cuối nói lướt.

Hạn chế thứ nhất là báo nhầm và bỏ sót.
Rule, fingerprint hay AI đều có sai số, và dữ liệu mã hóa hoặc cố tình biến dạng thì càng khó phát hiện; chính nhóm Liu cũng nói hệ thống của họ nhắm vào rò rỉ vô tình, không nhắm vào việc cố ý đánh cắp bằng mã hóa.
Vì vậy nên chạy chế độ mô phỏng trước, rồi mới chặn thật.
(Tùy chọn:) Ngay trong demo, fingerprint chỉ so khớp chính xác giá trị AURORA-2026 sau khi cắt khoảng trắng; đổi một ký tự là không khớp. Theo tổng quan của Herrera Montano, hash toàn tài liệu cũng đổi hoàn toàn chỉ vì một chỉnh sửa nhỏ.

Hạn chế thứ hai, cũng là giới hạn cốt lõi của đề xuất: egress path chưa được kiểm soát, tức mọi đường để dữ liệu rời hệ thống, như upload qua trình duyệt, đọc thẳng từ storage, hoặc script đi vòng.
Prototype của nhóm em chỉ chặn ở một đường, là cổng xuất dữ liệu, và chỉ ghi file khi policy trả về ALLOW. Đường nào không đi qua cổng đó thì không tự động bị chặn.
Vì vậy phải kiểm soát từng egress path, và quét lại dữ liệu dẫn xuất, tức dữ liệu mới tạo ra từ dữ liệu gốc, vì nhãn cũ có thể đã lỗi thời.
Trong demo, nhóm em quét trực tiếp bảng dẫn xuất customer_segments tại cổng xuất, chứ không dựa vào nhãn của dữ liệu gốc.

Hạn chế thứ ba là phạm vi hỗ trợ của sản phẩm.
Ví dụ Google Model Armor bỏ qua nội dung lớn hơn 4 MB và không quét audio, video.
Cần lập bảng độ bao phủ và kết hợp nhiều lớp phòng thủ.

Hai hàng cuối nói lướt: chi phí vận hành thì triển khai theo pha, ghi log, cảnh báo rồi mới chặn; độ trễ thì cần đo thời gian quét và thời gian ra quyết định.
(Tùy chọn, chỉ nói nếu muốn trích Schwab:) Nhóm Schwab năm 2021 đo riêng độ trễ của việc phân loại truy vấn SQL qua proxy JDBC: vài mili giây với siêu dữ liệu quan hệ, 137 mili giây với đồ thị, và giảm còn 0,35 mili giây ở 87% trường hợp sau tối ưu. Đó là bài toán truy vấn SQL, không phải quét nội dung tệp.

Khung bên phải là insider. Herrera Montano và cộng sự năm 2022 tổng quan 42 nghiên cứu từ 2011 đến 2022; khoảng 40% thể hiện quan tâm đáng kể đến mối đe dọa nội bộ, tức người có quyền hợp lệ, cố ý hoặc vô ý.
Tổng quan này cũng ghi nhận DLP phụ thuộc gần như hoàn toàn vào chất lượng policy, và chưa khắc phục được sơ suất của người dùng. Vì vậy DLP giảm chứ không loại bỏ rủi ro này.

Cuối cùng, cần đo ba thứ: báo nhầm và bỏ sót, độ trễ, và độ bao phủ.
Prototype của nhóm em đã dựng sẵn đường đo, nhưng số liệu chỉ lấy từ dữ liệu tổng hợp trên một máy, nên nhóm em không dùng chúng để kết luận về độ chính xác hay khả năng mở rộng.
(Tùy chọn, hoặc dùng khi bị hỏi:) Ví dụ, thử trên tập 12 dòng chỉ để kiểm tra đường đo, ba rule regex cho 6 đúng, 1 báo nhầm và 1 bỏ sót. Báo nhầm là một chuỗi 12 chữ số bất kỳ khớp rule số định danh; bỏ sót là một số điện thoại 9 chữ số.

Vậy xu hướng hiện nay là gì? Mời thầy cô và các bạn xem slide tiếp theo.

(Nếu cần rút gọn: bỏ câu "Trong demo, nhóm em quét trực tiếp bảng dẫn xuất..." và câu về nhóm Liu ở hạn chế thứ nhất, rồi rút khung insider còn một câu: "Khoảng 40% nghiên cứu quan tâm đáng kể đến người có quyền hợp lệ; DLP giảm chứ không loại bỏ rủi ro này.")

Tham khảo (không đọc):
- Liu et al. (2015): https://vtechworks.lib.vt.edu/items/2652b4c0-305d-4b03-b463-e16d1cd8ad4e
- Herrera Montano et al. (2022): https://doi.org/10.1007/s10586-022-03668-2
- Schwab et al. (2021): https://doi.org/10.1007/s13222-021-00385-9
- Google Model Armor: https://docs.cloud.google.com/model-armor/overview
-->
