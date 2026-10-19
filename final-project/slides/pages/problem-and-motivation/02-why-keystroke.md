---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Vì sao chọn nhịp gõ phím?

<div class="mt-1 grid grid-cols-[1.25fr_1fr] gap-6 items-start [&_.alpha-table-comparison-col]:!text-[15px] [&_.alpha-table-comparison-col]:!py-2 [&_.alpha-table-comparison-row-title]:!text-[14px] [&_.alpha-table-comparison-cell]:!text-[15.5px] [&_.alpha-table-comparison-cell]:!leading-snug [&_.alpha-table-comparison-cell]:!py-2">
  <TableComparison :animation="false" :dense="true" row-header-width="118px" :spacing="5">
    <TableComparisonCols corner-width="118px">
      <TableComparisonCol color="#edf8f1" text-color="#24704f">Ưu điểm</TableComparisonCol>
      <TableComparisonCol color="#fdf0f0" text-color="#9f1f2f">Hạn chế</TableComparisonCol>
    </TableComparisonCols>
    <TableComparisonRows>
      <TableComparisonRow title="Timeout phiên" color="#dce9f6" text-color="#244b71">
        <TableComparisonCell align="left">Hết giờ thì đóng.</TableComparisonCell>
        <TableComparisonCell align="left">Kẻ lạ còn thao tác thì phiên vẫn mở.</TableComparisonCell>
      </TableComparisonRow>
      <TableComparisonRow title="Xác thực lại định kỳ" color="#dce9f6" text-color="#244b71">
        <TableComparisonCell align="left">Dễ hiểu.</TableComparisonCell>
        <TableComparisonCell align="left">Gây phiền, vẫn hở giữa hai lần hỏi.</TableComparisonCell>
      </TableComparisonRow>
      <TableComparisonRow title="IP, thiết bị" color="#dce9f6" text-color="#244b71">
        <TableComparisonCell align="left">Có sẵn, dễ dùng.</TableComparisonCell>
        <TableComparisonCell align="left">Cùng máy thì không phân biệt được.</TableComparisonCell>
      </TableComparisonRow>
      <TableComparisonRow title="Nhịp gõ phím" color="#cfe3f5" text-color="#1d3d5c">
        <TableComparisonCell align="left">Chạy ngầm, không cần thiết bị mới.</TableComparisonCell>
        <TableComparisonCell align="left">Không gõ thì không có dữ liệu.</TableComparisonCell>
      </TableComparisonRow>
    </TableComparisonRows>
  </TableComparison>
  <div class="flex flex-col gap-5 text-[19px] leading-snug">
    <div v-click="2" class="border-l-4 border-emerald-500 bg-emerald-50 px-5 py-5">
      <b>Mỗi người gõ một kiểu:</b> giữ phím bao lâu, nghỉ bao lâu giữa hai phím.
    </div>
    <div v-click="3" class="border-l-4 border-amber-500 bg-amber-50 px-5 py-5">
      <b>So với chính người đó</b>, không so với chuẩn chung.
    </div>
    <div v-click="4" class="border-l-4 border-slate-500 bg-slate-50 px-5 py-5">
      Là lớp <b>bổ sung</b>, không thay MFA.
    </div>
  </div>
</div>

<!--
Mục tiêu: 0:45

Bảng bên trái so sánh các biện pháp kiểm soát phiên trong đúng kịch bản này. Timeout không biết ai đang gõ, kẻ lạ cứ thao tác thì phiên vẫn sống. Xác thực lại định kỳ thì gây gián đoạn. IP hay thiết bị gần như không đổi khi người lạ dùng chính máy đang mở.

[CLICK] Thời gian giữ phím và khoảng nghỉ giữa hai phím khác nhau rõ giữa các cá nhân.

[CLICK] Nhịp gõ mỗi người mỗi khác, nên hệ thống luôn so với chính chủ tài khoản.

[CLICK] Nhịp gõ là lớp bổ sung, không thay thế MFA.
-->
