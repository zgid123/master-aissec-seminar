---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Data Masking và Encryption khác nhau thế nào?

<ArcCompare :count="4" :height="400" vs-text="VS">
  <ArcCompareLeft color="#168793">
    <ArcCompareTitle>Encryption</ArcCompareTitle>
    <ArcCompareContents>
      <ArcCompareCallout>
        <ArcCompareBadge>01</ArcCompareBadge>
        <ArcCompareHeading>Mục tiêu</ArcCompareHeading>
        <ArcCompareContent>Làm dữ liệu không thể đọc nếu thiếu khóa.</ArcCompareContent>
      </ArcCompareCallout>
      <ArcCompareCallout>
        <ArcCompareBadge>02</ArcCompareBadge>
        <ArcCompareHeading>Hoạt động tại</ArcCompareHeading>
        <ArcCompareContent>Lưu trữ và truyền tải.</ArcCompareContent>
      </ArcCompareCallout>
      <ArcCompareCallout>
        <ArcCompareBadge>03</ArcCompareBadge>
        <ArcCompareHeading>Người dùng thấy</ArcCompareHeading>
        <ArcCompareContent>
          Plaintext sau khi hệ thống giải mã.<br />
          <code>alice@gmail.com → 8F A2 1C …</code>
        </ArcCompareContent>
      </ArcCompareCallout>
      <ArcCompareCallout>
        <ArcCompareBadge>04</ArcCompareBadge>
        <ArcCompareHeading>Không giải quyết</ArcCompareHeading>
        <ArcCompareContent>Người dùng hợp lệ nhìn thấy quá nhiều sau giải mã.</ArcCompareContent>
      </ArcCompareCallout>
    </ArcCompareContents>
  </ArcCompareLeft>

  <ArcCompareRight color="#0b7658">
    <ArcCompareTitle>Data<br />Masking</ArcCompareTitle>
    <ArcCompareContents>
      <ArcCompareCallout>
        <ArcCompareBadge>01</ArcCompareBadge>
        <ArcCompareHeading>Mục tiêu</ArcCompareHeading>
        <ArcCompareContent>Giảm dữ liệu nhạy cảm xuất hiện trong output.</ArcCompareContent>
      </ArcCompareCallout>
      <ArcCompareCallout>
        <ArcCompareBadge>02</ArcCompareBadge>
        <ArcCompareHeading>Hoạt động tại</ArcCompareHeading>
        <ArcCompareContent>Kết quả truy vấn hoặc màn hình hiển thị.</ArcCompareContent>
      </ArcCompareCallout>
      <ArcCompareCallout>
        <ArcCompareBadge>03</ArcCompareBadge>
        <ArcCompareHeading>Người dùng thấy</ArcCompareHeading>
        <ArcCompareContent>
          Giá trị đã che theo role hoặc context.<br />
          <code>alice@gmail.com → a***@gmail.com</code>
        </ArcCompareContent>
      </ArcCompareCallout>
      <ArcCompareCallout>
        <ArcCompareBadge>04</ArcCompareBadge>
        <ArcCompareHeading>Không giải quyết</ArcCompareHeading>
        <ArcCompareContent>Truy cập trực tiếp file hoặc bảng dữ liệu gốc.</ArcCompareContent>
      </ArcCompareCallout>
    </ArcCompareContents>
  </ArcCompareRight>
</ArcCompare>

<style scoped>
.alpha-arc-compare-content code {
  font-size: 12px;
  white-space: nowrap;
}

:deep(.alpha-arc-compare-content) {
  color: #475569 !important;
  opacity: 1;
}

:deep(.alpha-arc-compare__hub path) {
  fill: #eef2f7 !important;
}
</style>

<!--
Encryption và Data Masking đều bảo vệ tính bí mật của dữ liệu, nhưng chúng giải quyết hai rủi ro khác nhau.

[CLICK] Nhìn vào bốn tiêu chí trên sơ đồ.

Thứ nhất, về mục tiêu: Encryption biến dữ liệu thành ciphertext để người không có khóa không thể đọc được. Data Masking không mã hóa dữ liệu gốc; nó chỉ giới hạn phần thông tin nhạy cảm xuất hiện trong output.

Thứ hai, về vị trí hoạt động: Encryption chủ yếu bảo vệ dữ liệu khi lưu trữ hoặc truyền tải. Data Masking được áp dụng tại kết quả truy vấn hoặc màn hình hiển thị.

Thứ ba, về dữ liệu người dùng nhìn thấy: Sau khi ứng dụng giải mã, Encryption trả lại plaintext. Với cùng email alice@gmail.com, ciphertext có thể trông như chuỗi byte 8F A2 1C, còn Masking trả về a***@gmail.com theo role hoặc context.

Cuối cùng, Encryption không ngăn người dùng hợp lệ nhìn thấy quá nhiều sau khi dữ liệu đã được giải mã. Ngược lại, Masking không bảo vệ file hoặc bảng dữ liệu gốc nếu người dùng có quyền truy cập trực tiếp.

Vì vậy, hai cơ chế bổ sung cho nhau chứ không thay thế nhau. Trong demo DuckDB, nhóm chỉ triển khai query-time masking; encryption-at-rest là một control riêng và chưa được bật.

[Sources]
- https://duckdb.org/docs/stable/sql/statements/attach.html#database-encryption
[/Sources]
-->
