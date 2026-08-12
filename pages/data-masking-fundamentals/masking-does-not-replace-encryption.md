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
