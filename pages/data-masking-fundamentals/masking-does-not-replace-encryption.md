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
Masking nằm trong câu <code>SELECT</code> nên chỉ chi phối <b class="text-[#ffda58]">kết quả truy vấn</b>, không phải ranh giới bảo mật — ai có file database hoặc connection string thì vẫn thấy dữ liệu gốc. Encryption đóng lỗ đó, nhưng đẩy câu hỏi sang <b class="text-[#ffda58]">khóa giải mã lưu ở đâu</b>. Nên hệ thống thực tế cần cả ba: <b class="text-[#2efab0]">che dữ liệu, mã hóa và kiểm soát truy cập</b>.
</div>

<style scoped>
.summary-box { line-height:1.55; min-height:6.2rem; }
</style>

<!--
[NOTE NHẮC BÀI — Slide 3/4: Masking ≠ Encryption] (~45s)

LỜI THOẠI GỢI Ý (bảng hiện sẵn):
"Masking và encryption thường đi cùng nhau, nhưng KHÔNG thay thế cho nhau.
Encryption (mã hóa) tập trung bảo vệ dữ liệu khi LƯU TRỮ và TRUYỀN TẢI — kết quả là ciphertext, tức dữ liệu bị biến thành chuỗi vô nghĩa, phải có khóa mới đọc lại được.
Masking (che dữ liệu) thì tập trung bảo vệ phần HIỂN THỊ: kết quả vẫn đọc được nhưng đã được che bớt, và thường không cần khôi phục lại."
"Và còn một tiêu chí phân biệt rất rõ: encryption thì KHÔI PHỤC ĐƯỢC bằng khóa — đó chính là mục đích của nó; còn masking thì thường KHÔNG khôi phục được, vì giá trị gốc đã bị bỏ đi trong kết quả trả về."

(Không cần đọc hết bảng — chỉ nhấn 3 dòng: Mục tiêu, Kết quả, Dùng để. Riêng ý "khôi phục được hay không" thì NÓI MIỆNG, không có trên slide để tránh tràn.)

NẾU BỊ HỎI: "masking có khôi phục được không?" — trả lời: che một phần, thay thế, làm rỗng thì không; hash thì một chiều nên cũng không; riêng tokenization thì có, vì giá trị thật được giữ ở một token vault riêng — và khi đó vault ấy lại trở thành thứ phải bảo vệ, giống như vấn đề khóa giải mã.

[CLICK] → hiện box. ĐÂY LÀ PHẦN QUAN TRỌNG NHẤT SLIDE — nói chậm, chia làm 3 nhịp:

(1) Giới hạn: "Nhưng cần nói rõ một giới hạn: masking được thực hiện ngay trong câu lệnh SELECT, nên nó chỉ chi phối KẾT QUẢ TRUY VẤN — nó không phải một ranh giới bảo mật. Nếu ai đó cầm được file database, hoặc có connection string đủ quyền truy vấn thẳng bảng gốc, thì lớp che này bị bỏ qua hoàn toàn."

(2) Khóa: "Encryption đóng được lỗ đó — nhưng nó không xóa rủi ro, nó dịch chuyển rủi ro sang khóa: khóa giải mã lưu ở đâu, ai giữ, xoay vòng thế nào."

(3) Chốt (nhấn giọng): "Nên hệ thống thực tế cần cả ba: che dữ liệu, mã hóa và kiểm soát truy cập — mỗi cơ chế giải quyết một vấn đề khác nhau. Đây gọi là phòng thủ nhiều lớp (defense in depth)."

NHẮC: phần bypass view / direct table access sẽ được Section 4 phân tích sâu — mình chỉ nêu vấn đề, KHÔNG đi sâu ở đây.

NẾU HỤT GIỜ: bỏ phần đọc bảng, click luôn rồi nói nhịp (1) + nhịp (3).
-->
