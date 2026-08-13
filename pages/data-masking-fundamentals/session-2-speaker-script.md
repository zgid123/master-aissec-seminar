# Session 2 Speaker Script (2.5 - 3 minutes)

## Slide 1 - Data Masking giúp ẩn phần không cần thiết

"Trong section 1, team đã nêu một vấn đề rất thực tế: user có thể authenticated, authorized, kết nối an toàn, database cũng encrypted, nhưng dữ liệu nhạy cảm vẫn có thể bị lộ quá mức cần thiết.

Data masking xử lý đúng điểm này: che phần nhạy cảm, nhưng vẫn giữ dữ liệu đủ dùng cho công việc.

Ví dụ email gốc john.doe@gmail.com khi mask còn j***@gmail.com. Người dùng vẫn nhận diện được domain và ngữ cảnh, nhưng không thấy đầy đủ thông tin cá nhân.

Các trường thường mask là email, phone, credit card, national ID, địa chỉ, lương, medical và financial info.

Ý chính của slide này: masking nhằm giảm phơi lộ dữ liệu, chứ không làm dữ liệu vô dụng."

## Slide 2 - Static vs Dynamic Data Masking

"Có 2 hướng phổ biến.

Static masking: dữ liệu được che trước trên bản copy, rồi dùng cho dev, test, training. Ưu điểm là an toàn cho môi trường non-production, nhưng dữ liệu đã bị thay đổi sẵn.

Dynamic masking: dữ liệu gốc không đổi. Việc che diễn ra tại query time, tùy vào role hoặc access context.

Nói ngắn gọn: static bảo vệ bản sao, dynamic kiểm soát những gì mỗi người được nhìn thấy trong hệ thống đang chạy."

## Slide 3 - Data Masking không thay thế Encryption

"Masking và encryption thường đi cùng nhau, nhưng không thay thế nhau.

Encryption tập trung bảo vệ dữ liệu khi lưu trữ và truyền tải.
Masking tập trung bảo vệ phần hiển thị và giảm exposure trước mắt người dùng.

Vì vậy kiến trúc thực tế cần kết hợp masking + encryption + access control để tạo defense in depth."

## Slide 4 - Transition sang DuckDB (handoff sang Section 3)

"Về ý tưởng thì dynamic masking khá rõ. Câu hỏi tiếp theo là triển khai như thế nào cho bối cảnh thực tế nhóm mình làm.

Sau khi cân nhắc, nhóm chọn DuckDB vì nó là embedded database, dễ dựng demo trong application process, và có đủ SQL primitives như CASE, concat, macro, view để thử nghiệm masking logic.

Từ đây, mình xin mời bạn tiếp theo trình bày section 3: Dynamic Data Masking in DuckDB."

## Delivery tips

- Pace: 145 - 160 words/minute
- Keep eye contact at each transition sentence
- Pause 1 second before handoff line
- If time is short, compress Slide 3 into 2 sentences
