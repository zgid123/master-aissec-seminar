---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Rủi ro từ truy cập hợp lệ

<ArcArrowProcess>
  <ArcArrowProcessCallout>
    <ArcArrowProcessHeading>1 · TRUY CẬP HỢP LỆ</ArcArrowProcessHeading>
    <ArcArrowProcessContent>
      CSKH được phép mở hồ sơ để tra cứu đơn hàng và đối chiếu <b>4 số cuối</b> điện thoại.
    </ArcArrowProcessContent>
  </ArcArrowProcessCallout>
  <ArcArrowProcessCallout>
    <ArcArrowProcessHeading>2 · DỮ LIỆU DƯ THỪA</ArcArrowProcessHeading>
    <ArcArrowProcessContent>
      Màn hình vẫn trả về đầy đủ email, số điện thoại, CCCD và số thẻ.
    </ArcArrowProcessContent>
  </ArcArrowProcessCallout>
  <ArcArrowProcessCallout>
    <ArcArrowProcessHeading>3 · RỦI RO</ArcArrowProcessHeading>
    <ArcArrowProcessContent>
      Dữ liệu nhạy cảm có thể lộ qua màn hình, báo cáo, file xuất hoặc log.
    </ArcArrowProcessContent>
  </ArcArrowProcessCallout>
</ArcArrowProcess>

<!--
Ở các slide trước, chúng ta đã có xác thực và phân quyền: hệ thống biết người dùng là ai và họ được phép mở hồ sơ nào. Nhưng như vậy vẫn chưa trả lời được một câu hỏi quan trọng: trong hồ sơ đó, họ thực sự cần nhìn thấy bao nhiêu dữ liệu?

[click] Hãy xét một luồng hoàn toàn hợp lệ. Nhân viên chăm sóc khách hàng được phép mở hồ sơ để tra cứu đơn hàng. Nghiệp vụ chỉ yêu cầu đối chiếu bốn số cuối điện thoại, nhưng màn hình lại trả về toàn bộ email, số điện thoại, CCCD và số thẻ.

Vấn đề ở đây không phải truy cập trái phép, mà là dữ liệu được hiển thị vượt quá nhu cầu công việc. Phần dữ liệu dư thừa này có thể tiếp tục xuất hiện trong ảnh chụp màn hình, báo cáo, file xuất hoặc log, từ đó làm tăng phạm vi và hậu quả của một sự cố rò rỉ.

Vì vậy, bên cạnh việc kiểm soát ai được truy cập, chúng ta còn cần kiểm soát dữ liệu được hiển thị ở mức nào. Đây chính là bài toán dẫn sang Dynamic Data Masking.
-->
