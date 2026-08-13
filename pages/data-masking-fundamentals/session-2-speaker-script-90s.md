# Session 2 Speaker Script (90 seconds)

## Slide 1 - Data Masking giúp ẩn phần không cần thiết

"Ở section 1, team đã chỉ ra một vấn đề: user có thể đăng nhập đúng, có quyền đúng, kết nối an toàn, nhưng dữ liệu nhạy cảm vẫn có thể bị lộ quá mức cần thiết.

Data masking giải quyết đúng chỗ này: che phần nhạy cảm nhưng vẫn giữ dữ liệu đủ dùng. Ví dụ john.doe@gmail.com thành j***@gmail.com.

Ý chính: giảm phơi lộ dữ liệu, không làm dữ liệu vô dụng."

## Slide 2 - Static vs Dynamic

"Static masking là che sẵn trên bản copy để dùng cho dev và test.

Dynamic masking là dữ liệu gốc không đổi, nhưng kết quả trả về thay đổi theo access context lúc truy vấn.

Nói ngắn gọn: static bảo vệ bản sao, dynamic kiểm soát những gì từng người được nhìn thấy."

## Slide 3 - Masking không thay thế Encryption

"Encryption bảo vệ dữ liệu khi lưu trữ và truyền tải. Masking bảo vệ phần hiển thị trước mắt người dùng.

Vì vậy hệ thống thực tế cần cả masking + encryption + access control."

## Slide 4 - Handoff sang Section 3

"Vậy nếu đưa vào triển khai thực tế thì sao?

Nhóm chọn DuckDB vì dễ dựng demo và có đủ SQL building blocks để thử nghiệm masking logic.

Mình xin mời bạn tiếp theo trình bày section 3: Dynamic Data Masking in DuckDB."
