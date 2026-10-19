---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Vì sao chọn nhịp gõ phím?

<div class="mt-1 grid grid-cols-[1.25fr_1fr] gap-6 items-start [&_.alpha-table-comparison-col]:!text-[14px] [&_.alpha-table-comparison-col]:!py-2 [&_.alpha-table-comparison-row-title]:!text-[13px] [&_.alpha-table-comparison-cell]:!text-[13.5px] [&_.alpha-table-comparison-cell]:!leading-snug [&_.alpha-table-comparison-cell]:!py-2">
  <TableComparison :animation="false" :dense="true" row-header-width="118px" :spacing="5">
    <TableComparisonCols corner-width="118px">
      <TableComparisonCol color="#edf8f1" text-color="#24704f">Ưu điểm</TableComparisonCol>
      <TableComparisonCol color="#fdf0f0" text-color="#9f1f2f">Giới hạn trong kịch bản</TableComparisonCol>
    </TableComparisonCols>
    <TableComparisonRows>
      <TableComparisonRow title="Timeout phiên" color="#dce9f6" text-color="#244b71">
        <TableComparisonCell align="left">Giới hạn thời gian phiên.</TableComparisonCell>
        <TableComparisonCell align="left">Kẻ lạ cứ thao tác thì phiên vẫn sống.</TableComparisonCell>
      </TableComparisonRow>
      <TableComparisonRow title="Xác thực lại định kỳ" color="#dce9f6" text-color="#244b71">
        <TableComparisonCell align="left">Điểm kiểm tra rõ ràng.</TableComparisonCell>
        <TableComparisonCell align="left">Gây gián đoạn, vẫn còn khoảng giữa hai lần.</TableComparisonCell>
      </TableComparisonRow>
      <TableComparisonRow title="IP, thiết bị" color="#dce9f6" text-color="#244b71">
        <TableComparisonCell align="left">Thêm tín hiệu rủi ro.</TableComparisonCell>
        <TableComparisonCell align="left">Cùng máy đang mở thì gần như không đổi.</TableComparisonCell>
      </TableComparisonRow>
      <TableComparisonRow title="Nhịp gõ phím" color="#cfe3f5" text-color="#1d3d5c">
        <TableComparisonCell align="left">Thu thụ động, không cần phần cứng mới.</TableComparisonCell>
        <TableComparisonCell align="left">Cần đủ số phím; không gõ thì không có bằng chứng.</TableComparisonCell>
      </TableComparisonRow>
    </TableComparisonRows>
  </TableComparison>
  <div class="flex flex-col gap-3 text-[15px] leading-snug">
    <div v-click class="border-l-4 border-emerald-500 bg-emerald-50 px-4 py-3">
      <b>Tín hiệu có sẵn khi làm việc.</b> Thời gian giữ phím và khoảng nghỉ giữa hai phím khác nhau rõ giữa các cá nhân.
    </div>
    <div v-click class="border-l-4 border-amber-500 bg-amber-50 px-4 py-3">
      <b>Gõ chồng phím là phổ biến.</b> Dữ liệu 136 triệu lần nhấn cho thấy khoảng nghỉ có thể âm, nên phải chuẩn hóa theo từng người.
    </div>
    <div v-click class="border-l-4 border-slate-500 bg-slate-50 px-4 py-3">
      Nhịp gõ <b>bổ sung</b>, không thay thế timeout, xác thực lại hay MFA.
    </div>
  </div>
</div>

<!--
Mục tiêu: 0:50

Bảng bên trái so sánh định tính các biện pháp kiểm soát phiên trong đúng kịch bản của đề tài, không phải xếp hạng an toàn chung.

Timeout không xác minh ai đang gõ, và kẻ lạ cứ thao tác thì phiên vẫn còn sống. Xác thực lại định kỳ có điểm kiểm tra rõ nhưng gây gián đoạn. Tín hiệu IP hay thiết bị gần như không đổi khi người lạ dùng chính máy đang mở.

[CLICK] Nhịp gõ thu được thụ động ngay khi người dùng làm việc, không cần phần cứng ngoài bàn phím.

[CLICK] Nghiên cứu của Dhakal và cộng sự trên 136 triệu lần nhấn phím của 168 nghìn người cho thấy cách gõ rất đa dạng, và nhấn phím kế trước khi nhả phím trước là chuyện thường gặp. Vì vậy hệ thống giữ nguyên khoảng nghỉ âm và chuẩn hóa theo từng người.

[CLICK] Nhược điểm lớn nhất là phải tích lũy đủ phím. Nên nhóm xem nhịp gõ là lớp bổ sung, không thay thế các biện pháp khác.
-->
