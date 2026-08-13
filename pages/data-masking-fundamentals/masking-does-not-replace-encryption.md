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
[NOTE NHẮC BÀI — Slide 3/4: Masking ≠ Encryption] (~40s)

Bảng hiện sẵn, chỉ có 1 lần CLICK cho box xanh cuối:
- Thông điệp chính: masking và encryption ĐI CÙNG NHAU, KHÔNG thay thế nhau.
- Encryption: bảo vệ dữ liệu khi LƯU TRỮ + TRUYỀN TẢI (chống lộ dữ liệu ở tầng storage).
- Masking: kiểm soát phần HIỂN THỊ, giảm exposure trước mắt người dùng.
- Không cần đọc hết bảng → chỉ nhấn 2-3 dòng: Goal, Output, Main use.
- CLICK → hiện box: cần MASKING + ENCRYPTION + ACCESS CONTROL = defense in depth. Nhấn giọng.
- Nếu hụt giờ: rút gọn slide này còn 2 câu rồi qua slide transition.
-->
