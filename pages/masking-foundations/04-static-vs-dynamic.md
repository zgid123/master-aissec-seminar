---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Static và Dynamic khác nhau ở đâu?

<ArcCompare :count="4" :height="400" vs-text="VS">
  <ArcCompareLeft color="#168793">
    <ArcCompareTitle>Static Data<br />Masking</ArcCompareTitle>
    <ArcCompareContents>
      <ArcCompareCallout>
        <ArcCompareBadge>01</ArcCompareBadge>
        <ArcCompareHeading>Đầu ra</ArcCompareHeading>
        <ArcCompareContent>Bản sao đã masking.</ArcCompareContent>
      </ArcCompareCallout>
      <ArcCompareCallout>
        <ArcCompareBadge>02</ArcCompareBadge>
        <ArcCompareHeading>Độ mới</ArcCompareHeading>
        <ArcCompareContent>Theo lần chạy gần nhất.</ArcCompareContent>
      </ArcCompareCallout>
      <ArcCompareCallout>
        <ArcCompareBadge>03</ArcCompareBadge>
        <ArcCompareHeading>Mục đích</ArcCompareHeading>
        <ArcCompareContent>Chia sẻ bản sao ngoài production.</ArcCompareContent>
      </ArcCompareCallout>
      <ArcCompareCallout>
        <ArcCompareBadge>04</ArcCompareBadge>
        <ArcCompareHeading>Trust boundary</ArcCompareHeading>
        <ArcCompareContent>Quanh bản sao đã masking.</ArcCompareContent>
      </ArcCompareCallout>
    </ArcCompareContents>
  </ArcCompareLeft>

  <ArcCompareRight color="#0b7658">
    <ArcCompareTitle>Dynamic Data<br />Masking</ArcCompareTitle>
    <ArcCompareContents>
      <ArcCompareCallout>
        <ArcCompareBadge>01</ArcCompareBadge>
        <ArcCompareHeading>Đầu ra</ArcCompareHeading>
        <ArcCompareContent>Kết quả truy vấn đã masking.</ArcCompareContent>
      </ArcCompareCallout>
      <ArcCompareCallout>
        <ArcCompareBadge>02</ArcCompareBadge>
        <ArcCompareHeading>Độ mới</ArcCompareHeading>
        <ArcCompareContent>Theo dữ liệu hiện tại.</ArcCompareContent>
      </ArcCompareCallout>
      <ArcCompareCallout>
        <ArcCompareBadge>03</ArcCompareBadge>
        <ArcCompareHeading>Mục đích</ArcCompareHeading>
        <ArcCompareContent>Che kết quả truy vấn production.</ArcCompareContent>
      </ArcCompareCallout>
      <ArcCompareCallout>
        <ArcCompareBadge>04</ArcCompareBadge>
        <ArcCompareHeading>Trust boundary</ArcCompareHeading>
        <ArcCompareContent>Quanh lớp thực thi masking.</ArcCompareContent>
      </ArcCompareCallout>
    </ArcCompareContents>
  </ArcCompareRight>
</ArcCompare>

<style scoped>
:deep(.alpha-arc-compare-content) {
  color: #475569 !important;
  opacity: 1;
}

:deep(.alpha-arc-compare__hub path) {
  fill: #eef2f7 !important;
}
</style>

<!--
Static và Dynamic Data Masking khác nhau chủ yếu ở thời điểm biến đổi dữ liệu và loại đầu ra được tạo ra.

[CLICK] Về kiến trúc, Static Data Masking đi theo luồng: Production, qua một masking job, rồi tạo ra masked copy. Dynamic Data Masking đi theo luồng: User cùng context, qua query policy, rồi tạo ra masked output.

Nhìn vào bốn tiêu chí trên sơ đồ.

Thứ nhất, SDM tạo một bản sao đã masking, còn DDM tạo kết quả truy vấn đã masking tại runtime.

Thứ hai, độ mới của SDM phụ thuộc vào lần chạy masking gần nhất. DDM xử lý trên dữ liệu hiện tại nên output phản ánh trạng thái mới nhất của nguồn.

Thứ ba, SDM phù hợp khi cần chia sẻ dữ liệu cho môi trường ngoài production, chẳng hạn phát triển hoặc kiểm thử. DDM phù hợp khi cần che kết quả truy vấn ngay trên hệ thống production.

Cuối cùng là trust boundary. Với SDM, ranh giới tin cậy nằm quanh bản sao đã masking. Với DDM, ranh giới nằm quanh lớp thực thi masking; consumer phải đi qua lớp này và không được truy cập trực tiếp bảng hoặc file gốc.

Tóm lại: SDM tạo masked copy trước khi sử dụng; DDM tạo masked output tại thời điểm truy vấn.
-->
