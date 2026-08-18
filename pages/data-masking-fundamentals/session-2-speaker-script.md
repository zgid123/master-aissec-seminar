# Session 2

## Slide 1 - Data Masking là gì · ~50s · 5 click

 "Cảm ơn Trâm. // Ở phần một, nhóm đã chỉ ra một vấn đề rất thực tế: một người dùng có
 thể đã đăng nhập đúng, đã được cấp quyền, kết nối đã an toàn, và cơ sở dữ liệu cũng đã
 được mã hóa // NHƯNG dữ liệu nhạy cảm VẪN có thể bị lộ nhiều hơn mức cần thiết."

 "Data Masking - hay che dữ liệu - xử lý đúng điểm này. Nó thay dữ liệu nhạy cảm bằng
 một dạng hiển thị an toàn hơn, // nhưng VẪN ĐỦ DÙNG cho công việc."

`[CLICK 1]`

 "Ví dụ như trên slide: email gốc là john.doe@gmail.com, // sau khi che thì chỉ còn
 j–ba dấu sao–@gmail.com. Người xem VẪN biết đây là một email, vẫn biết nó thuộc nhà
 cung cấp nào, // nhưng KHÔNG còn thấy được danh tính đầy đủ của khách hàng."

`[CLICK 2]`

 "Những trường thường được che là email, số điện thoại, thẻ tín dụng, số định danh,
 địa chỉ, lương, và thông tin y tế hay tài chính."

`[CLICK 3]`

 "Còn những người thường làm việc trên dữ liệu đã che là lập trình viên, kiểm thử viên,
 nhân viên phân tích và hỗ trợ - tức những người chỉ cần MỘT PHẦN dữ liệu để làm việc."

`[CLICK 4]`

 "Về mặt kỹ thuật thì không chỉ có một cách che. Bốn cách hay dùng nhất là: che một phần
 - partial redaction, đúng như ví dụ vừa rồi; // thay thế bằng dữ liệu giả -
 substitution; // hash; // và tokenization. Ngoài ra còn một số biến thể khác."

`[CLICK 5]`

 "Và mục tiêu cuối cùng của tất cả những thứ này là QUYỀN TỐI THIỂU: cho nhân viên dùng
 được dữ liệu để làm việc, mà không thấy phần nhạy cảm họ không cần thấy."

 "Nói cách khác: mục đích của masking là GIẢM RỦI RO LỘ DỮ LIỆU, // chứ không phải làm
 cho dữ liệu trở nên vô dụng."

 "Vậy thì việc che này được làm VÀO LÚC NÀO?"

---

## Slide 2 - Static / Dynamic · ~45s · 3 click

 "Có hai hướng che dữ liệu phổ biến, và hai hướng này khác nhau ở đúng một điểm: việc
 che diễn ra LÚC NÀO."

`[CLICK 1]`

 "Thứ nhất là Static Data Masking. Ở đây, dữ liệu được che SẴN trên một BẢN SAO, // rồi
 bản sao đó mới được đưa sang môi trường phát triển, kiểm thử, hoặc huấn luyện. Nghĩa là
 lập trình viên làm việc trên dữ liệu đã bị thay đổi sẵn từ trước. // Ưu điểm là rất an
 toàn cho các môi trường không phải dữ liệu thật - vì ở đó đơn giản là KHÔNG CÓ dữ liệu
 thật để mà lộ. Nhược điểm là bản sao đã bị thay đổi cố định, không lấy lại được bản
 gốc, // và phải làm mới định kỳ mỗi khi dữ liệu gốc đổi."

`[CLICK 2]`

 "Thứ hai là Dynamic Data Masking - và đây mới là hướng mà seminar của nhóm tập trung
 vào. // Ở đây, dữ liệu lưu trong database KHÔNG HỀ ĐỔI. Việc che chỉ áp lên KẾT QUẢ
 TRẢ VỀ, ngay tại thời điểm người dùng chạy câu truy vấn. // Và che hay không che là tùy
 vào người đang truy vấn là AI và có QUYỀN GÌ. Cùng một bảng dữ liệu đó, người đủ quyền
 thì thấy giá trị thật, người không đủ quyền thì chỉ thấy bản đã che."

 "Đánh đổi của Dynamic là: nó giữ được MỘT nguồn dữ liệu duy nhất và linh hoạt theo
 quyền, // nhưng đổi lại nó phụ thuộc vào việc hệ thống xác định ĐÚNG danh tính và quyền
 của người truy vấn - xác định sai là che sai."

`[CLICK 3]`

 "Nói ngắn gọn: // Static không để DỮ LIỆU THẬT rời khỏi production; // còn Dynamic
 không để DỮ LIỆU THẬT hiện ra SAI NGƯỜI."

 "Cái được của Dynamic là chỉ cần giữ MỘT nguồn dữ liệu duy nhất mà vẫn phục vụ được
 nhiều quyền khác nhau. // Không phải tạo và đồng bộ nhiều bản sao cho từng nhóm quyền -
 dữ liệu luôn mới, và quy tắc che nằm ở một chỗ duy nhất nên dễ kiểm soát hơn."

 "Đến đây có một câu hỏi thường được đặt ra: nếu đã có mã hóa rồi, thì còn cần che dữ
 liệu làm gì nữa?"

---

## Slide 3 - Masking ≠ Encryption · ~45s · 1 click

 "Masking và encryption thường đi cùng nhau trong một hệ thống, // nhưng chúng KHÔNG
 thay thế cho nhau."

 "Encryption, tức mã hóa, tập trung bảo vệ dữ liệu khi LƯU TRỮ và khi TRUYỀN TẢI. Kết
 quả của nó là ciphertext - dữ liệu bị biến thành một chuỗi vô nghĩa, phải có KHÓA mới
 đọc lại được. // Còn masking thì tập trung bảo vệ phần HIỂN THỊ: kết quả vẫn đọc được
 bình thường, chỉ là đã được che bớt, và thường cũng không cần khôi phục lại. // Tóm
 lại: mã hóa bảo vệ dữ liệu KHỎI người không có quyền; còn che dữ liệu kiểm soát xem
 người ĐÃ CÓ QUYỀN thì được nhìn thấy tới đâu."

`[CLICK]`

 "Nhưng masking có một giới hạn quan trọng: nó chỉ che ở KẾT QUẢ TRUY VẤN. // Lý do là
 việc che được thực hiện ngay trong câu lệnh SELECT - nên nó chỉ đổi kết quả trả về, còn
 dữ liệu nằm trong database thì VẪN LÀ DỮ LIỆU THẬT. // Nếu một người cầm được chính file
 cơ sở dữ liệu, hoặc có connection string với đủ quyền để truy vấn THẲNG vào bảng gốc,
 // thì lớp che này bị bỏ qua HOÀN TOÀN."

 "Encryption thì khác: nó che ở BẢN THÂN DỮ LIỆU, nên cầm được file cũng không đọc ra
 gì. // Nó đóng được đúng cái lỗ vừa nói, nhưng nó không XÓA được rủi ro - nó DỊCH
 CHUYỂN rủi ro sang cái khóa: khóa giải mã lưu ở đâu, ai được giữ, và xoay vòng thế nào.
 // Nếu khóa nằm ngay cạnh file dữ liệu thì coi như chưa bảo vệ được gì."

 "Cho nên mỗi cơ chế giải quyết một vấn đề khác nhau: // masking xử lý người ĐÃ vào hệ
 thống hợp lệ nhưng không nên thấy hết; // còn encryption chống người KHÔNG có quyền vào.
 Chúng bổ sung cho nhau, chứ không thay thế nhau."

 "Vậy là phần khái niệm đã tương đối rõ. Câu hỏi còn lại là triển khai."

---

## Slide 4 - Từ khái niệm sang triển khai · ~35s · 4 click

 "Về mặt khái niệm thì dynamic masking khá rõ rồi. // Câu hỏi còn lại là: AI THỰC THI nó?"

`[CLICK 1]`

 "Trong một hệ quản trị cơ sở dữ liệu truyền thống, việc che dữ liệu dựa trên user, role
 và lệnh GRANT - // và chính DATABASE SERVER là nơi thực thi cái policy đó. Người dùng
 thông thường không dễ đi vòng qua được."

`[CLICK 2]`

 "Nhưng với một embedded database thì không còn một server tách biệt đứng ra gác cửa nữa.
 // Lúc đó ranh giới giữa hai thứ lộ ra rất rõ. Một bên là MASKING LOGIC - phần LÀM RA
 giá trị đã che, cái này viết bằng SQL. // Một bên là LỚP THỰC THI QUYỀN - phần QUYẾT
 ĐỊNH ai thực sự được thấy dữ liệu thật. // Hai phần này KHÁC NHAU, và không phải lúc
 nào cũng nằm cùng một chỗ."

`[CLICK 3]` `[CLICK 4]`

 "Nên câu hỏi đặt ra là: Dynamic Data Masking nghe khá đơn giản trong một DBMS truyền
 thống, // nhưng trong một embedded analytical database như DuckDB thì nó được triển khai
 ra sao, // và AI là người THỰC THI policy?"

 "Phần trả lời xin được nhường lại cho phần ba. // Mình xin mời bạn Trần Huy Vũ trình
 bày - Dynamic Data Masking in DuckDB. Cảm ơn mọi người."
