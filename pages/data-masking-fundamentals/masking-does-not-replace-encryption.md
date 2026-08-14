---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Data Masking ≠ Encryption

| | Data Masking | Encryption |
|---|---|---|
| **Mục tiêu** | Giảm rủi ro lộ dữ liệu | Bảo vệ tính bí mật |
| **Kết quả** | Vẫn đọc được nhưng đã che bớt | Ciphertext (dữ liệu đã mã hóa) |
| **Dữ liệu gốc** | Vẫn dùng được | Đã bị mã hóa |
| **Khôi phục lại** | Thường không cần | Giải mã bằng khóa |
| **Dùng để** | Kiểm soát ai được nhìn thấy gì | Bảo vệ khi lưu trữ / truyền tải |

<div v-click class="mt-5 rounded-lg border border-green-300/30 bg-green-500/8 p-4 text-center">
Hệ thống thực tế cần kết hợp cả ba: <b class="text-[#2efab0]">che dữ liệu, mã hóa và kiểm soát truy cập</b> — vì mỗi cơ chế giải quyết một vấn đề khác nhau.
</div>

<!--
[NOTE NHẮC BÀI — Slide 3/4: Masking ≠ Encryption] (~35s)

LỜI THOẠI GỢI Ý (bảng hiện sẵn):
"Masking và encryption thường đi cùng nhau, nhưng KHÔNG thay thế cho nhau.
Encryption (mã hóa) tập trung bảo vệ dữ liệu khi LƯU TRỮ và TRUYỀN TẢI — kết quả là ciphertext, tức dữ liệu bị biến thành chuỗi vô nghĩa, phải có khóa mới đọc lại được.
Masking (che dữ liệu) thì tập trung bảo vệ phần HIỂN THỊ: kết quả vẫn đọc được nhưng đã được che bớt, và thường không cần khôi phục lại."
(Không cần đọc hết bảng — chỉ nhấn 3 dòng: Mục tiêu, Kết quả, Dùng để.)

[CLICK] → hiện box, nhấn giọng:
"Hệ thống thực tế cần cả ba: che dữ liệu, mã hóa và kiểm soát truy cập — mỗi cơ chế giải quyết một vấn đề khác nhau. Đây gọi là phòng thủ nhiều lớp (defense in depth)."

NẾU HỤT GIỜ: rút slide này còn 2 câu (Mục tiêu + box tổng kết) rồi qua thẳng slide transition.
-->
