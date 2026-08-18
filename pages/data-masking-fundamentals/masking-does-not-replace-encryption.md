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
| **Dùng để** | Kiểm soát ai được nhìn thấy gì | Bảo vệ khi lưu trữ / truyền tải |

<div v-click class="mt-5 rounded-lg border border-green-300/30 bg-green-500/8 p-3 text-sm summary-box">
<p class="m-0">Masking chỉ che <b class="text-[#ffda58]">kết quả truy vấn</b> → nếu mở trực tiếp file CSDL, cơ chế này không còn tác dụng.</p>
<p class="m-0 mt-2">Encryption bảo vệ <b class="text-[#ffda58]">bản thân dữ liệu</b> → nhưng đặt ra câu hỏi mới: <b class="text-[#2efab0]">khóa được lưu ở đâu?</b></p>
</div>

<style scoped>
.summary-box { line-height:1.55; min-height:6.2rem; }
</style>

<!--
Mở: masking và encryption đi cùng nhau nhưng **không thay thế nhau**.
Đọc bảng - **không đọc từng ô**, chỉ 3 dòng: Mục tiêu · Kết quả · Dùng để.
Encryption bảo vệ lúc **lưu trữ / truyền tải** → ciphertext, phải có khóa. Masking bảo vệ phần **hiển thị** → vẫn đọc được, đã che bớt.
Tóm: mã hóa chặn **người không có quyền**; masking kiểm soát **người đã có quyền** được thấy tới đâu.
(Chậm giờ thì bỏ đoạn đọc bảng, click luôn.)

[click] **Phần đáng giá nhất - hạ tốc độ. 3 nhịp, KHÔNG bấm thêm.**

**Nhịp 1 - dòng 1 (giới hạn của masking):** masking nằm trong `SELECT` → chỉ đổi **kết quả trả về**,
dữ liệu trong database **vẫn là dữ liệu thật**. Cầm được file CSDL, hoặc connection string đủ quyền
truy vấn thẳng bảng gốc → lớp che bị **bỏ qua hoàn toàn**.

**Nhịp 2 - dòng 2 (vấn đề khóa):** encryption che ở **bản thân dữ liệu** (nhấn cụm này để đối lại "kết quả truy vấn").
Đóng được lỗ đó, nhưng **không xóa** rủi ro - **dịch chuyển** sang khóa: lưu ở đâu, ai giữ, xoay vòng thế nào.
Khóa nằm cạnh file dữ liệu = chưa bảo vệ được gì.

**Nhịp 3 - chốt (nói miệng, không có trên slide):** masking xử lý người **ĐÃ vào hợp lệ** nhưng không nên thấy hết;
encryption chống người **KHÔNG có quyền vào**. **Bổ sung cho nhau, không thay thế nhau.**
→ ĐỪNG nói "hệ thống thực tế cần cả ba" (dễ bị vặn). Muốn nói thì theo điều kiện: masking cần khi có **nhiều mức quyền xem** trên cùng dữ liệu.

⚠️ Bypass view / direct table access là của **Section 4** - chỉ nêu vấn đề.
Ai hỏi sâu: "Dạ đúng ạ, phần bốn của nhóm sẽ phân tích kỹ tình huống này."

Hỏi "masking khôi phục được không?" → partial/substitution/nulling: không · hash: một chiều, không · tokenization: **có**, nhưng vault lại thành thứ phải bảo vệ (giống vấn đề khóa).
Hỏi "có encryption rồi cần masking làm gì?" → (a) không phải hệ thống nào cũng cần · (b) encryption không có chế độ "giải mã một nửa" nên vô dụng khi nhiều role xem một bảng · (c) masking không cứu được khi mất file. **Hai cái thất bại ở hai chỗ khác nhau.**
-->
