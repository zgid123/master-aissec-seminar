---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Data Masking ≠ Encryption

| | Data Masking | Encryption |
|---|---|---|
| **Goal** | Giảm phơi lộ | Bảo vệ tính bí mật |
| **Output** | Đọc được nhưng đã ẩn / sửa | Ciphertext |
| **Original data** | Vẫn dùng được | Encoded |
| **Reversible** | Thường không cần | Giải mã bằng key |
| **Main use** | Kiểm soát visibility | Bảo vệ storage / transport |

<div v-click class="mt-5 rounded-lg border border-green-300/30 bg-green-500/8 p-4 text-center">
Thiết kế thực tế cần <b class="text-[#2efab0]">masking + encryption + access control</b> vì mỗi cơ chế giải quyết một vấn đề khác nhau.
</div>

<!--
[NOTE NHẮC BÀI — Slide 3/4: Masking ≠ Encryption] (~35s)

LỜI THOẠI GỢI Ý (bảng hiện sẵn, 1 lần CLICK cho box xanh cuối):
"Masking và encryption thường đi cùng nhau, nhưng KHÔNG thay thế cho nhau.
Encryption tập trung bảo vệ dữ liệu khi LƯU TRỮ và TRUYỀN TẢI — kết quả là ciphertext, phải có key mới giải mã được.
Masking thì tập trung bảo vệ phần HIỂN THỊ: kết quả vẫn đọc được nhưng đã được che bớt, và thường không cần khôi phục lại."
(Không cần đọc hết bảng — chỉ nhấn 3 dòng: Goal, Output, Main use.)

[CLICK] → hiện box, nhấn giọng:
"Hệ thống thực tế cần cả MASKING + ENCRYPTION + ACCESS CONTROL — mỗi cơ chế giải quyết một vấn đề khác nhau, đó chính là defense in depth."

NẾU HỤT GIỜ: rút slide này còn 2 câu (Goal + box tổng kết) rồi qua thẳng slide transition.
-->
