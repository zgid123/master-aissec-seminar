# Session 2 — Speaker Script & Presenter Guide (nguồn duy nhất)

> Data Masking Fundamentals · Người trình bày: **Võ Công Minh** (Member 2)
> Bàn giao cho: **Trần Huy Vũ** (Section 3 — Dynamic Data Masking in DuckDB)
> Đây là file kịch bản DUY NHẤT cho Session 2. Presenter note ngắn nằm trong từng
> slide (chế độ Presenter); file này chứa bản đầy đủ + giải thích thuật ngữ +
> fallback + checklist + Q&A.

---

## 1) Ngân sách thời gian (mục tiêu 2.5 – 3 phút)

| Slide | Nội dung | Thời lượng | Click |
|---|---|---|---|
| 1 | Data Masking là gì | ~50s (45–55s) | 0 |
| 2 | Static vs Dynamic | ~50s (45–55s) | 1 |
| 3 | Masking ≠ Encryption | ~35s (30–40s) | 1 |
| 4 | Chuyển sang DuckDB (handoff) | ~40s (35–45s) | 5 |

Tổng ≈ 2.9 phút. **Nếu quá giờ: rút gọn Slide 3 trước** (còn Mục tiêu + box tổng kết).

---

## 2) Giải thích thuật ngữ (đọc để HIỂU mình đang nói gì)

Đọc phần này trước khi thuyết trình. Trên slide vẫn giữ một số từ tiếng Anh vì đó
là tên khái niệm chuẩn; nhưng bạn phải hiểu rõ nghĩa để nói tự tin và trả lời hỏi.

- **Data Masking (che dữ liệu):** thay dữ liệu nhạy cảm bằng một dạng hiển thị an
  toàn hơn nhưng vẫn đủ dùng. Ví dụ `john.doe@gmail.com` → `j***@gmail.com`.
- **Sensitive data / PII:** PII = *Personally Identifiable Information* = thông tin
  định danh cá nhân — dữ liệu có thể dùng để nhận ra một người cụ thể (tên, email,
  số điện thoại, số định danh, số thẻ...).
- **Least privilege (quyền tối thiểu):** chỉ cấp cho mỗi người đúng mức quyền họ
  CẦN để làm việc, không cấp dư. → nói dễ hiểu: "ai cần thấy gì thì thấy đúng cái đó".
- **Static Data Masking:** che SẴN dữ liệu trên một bản sao, rồi mới đưa bản sao đó
  cho môi trường không phải dữ liệu thật (phát triển, kiểm thử, huấn luyện).
- **Dynamic Data Masking:** dữ liệu gốc KHÔNG đổi; hệ thống chỉ che kết quả NGAY
  LÚC người dùng truy vấn, tùy theo họ là ai và có quyền gì.
- **Query time (lúc truy vấn):** thời điểm người dùng chạy câu lệnh lấy dữ liệu.
- **Role / access context (vai trò / ngữ cảnh truy cập):** người đang xem là ai và
  đang có quyền gì — dựa vào đó hệ thống quyết định che hay không.
- **Encryption (mã hóa):** biến dữ liệu thành chuỗi vô nghĩa, phải có khóa mới đọc
  lại được. Bảo vệ dữ liệu khi lưu trữ và khi truyền qua mạng.
- **Ciphertext:** kết quả sau khi mã hóa — chuỗi vô nghĩa, không đọc được nếu không
  có khóa.
- **Access control (kiểm soát truy cập):** quy định ai được phép truy cập tài
  nguyên/dữ liệu nào.
- **Defense in depth (phòng thủ nhiều lớp):** kết hợp nhiều biện pháp bảo mật; một
  lớp bị vượt qua thì vẫn còn lớp khác đỡ.
- **DuckDB — embedded / in-process database:** cơ sở dữ liệu chạy ngay BÊN TRONG
  ứng dụng, không cần dựng một máy chủ database riêng.
- **SQL primitives:** các thành phần SQL cơ bản dùng để dựng logic che dữ liệu:
  - `CASE`: rẽ nhánh "nếu... thì..." (ví dụ: nếu không đủ quyền thì trả về bản che).
  - `concat`: nối chuỗi lại với nhau.
  - `regexp`: so khớp / thay thế theo mẫu (dùng để che một phần chuỗi).
  - `view`: một "bảng ảo" tạo từ một câu truy vấn có sẵn.
  - `macro`: một đoạn SQL tái sử dụng được như một hàm.
- **Masking logic vs enforcement:**
  - *masking logic* = phần LÀM RA giá trị đã che (viết bằng SQL).
  - *enforcement (lớp thực thi quyền)* = phần QUYẾT ĐỊNH ai thực sự được thấy dữ
    liệu thật. Ý chính: DuckDB làm tốt phần logic, nhưng phần enforcement thường
    cần thêm một lớp ở tầng ứng dụng.

---

## 3) Kịch bản đầy đủ (bản chính, 2.5 – 3 phút)

### Slide 1 — Data Masking giúp ẩn phần không cần thiết

> Slide không có animation → nói liền mạch, dùng tay chỉ vào ví dụ gốc → đã che.

"Ở phần 1, nhóm đã chỉ ra một vấn đề rất thực tế: một người dùng có thể đã đăng
nhập đúng, đã được cấp quyền, kết nối an toàn, và cơ sở dữ liệu cũng đã được mã hóa
— nhưng dữ liệu nhạy cảm vẫn có thể bị lộ nhiều hơn mức cần thiết.

Data Masking xử lý đúng điểm này: nó thay dữ liệu nhạy cảm bằng một dạng hiển thị
an toàn hơn, nhưng vẫn đủ dùng cho công việc.

Ví dụ [chỉ tay vào slide]: email gốc john.doe@gmail.com sau khi che chỉ còn
j***@gmail.com. Người xem vẫn biết đây là một email, nhưng không còn thấy được
danh tính đầy đủ.

Các trường thường được che là email, số điện thoại, thẻ tín dụng, số định danh,
địa chỉ, lương, và thông tin y tế / tài chính.

Và mục tiêu cuối cùng là **chỉ cấp quyền ở mức tối thiểu cần thiết**: cho nhân viên
(lập trình, kiểm thử, hỗ trợ) dùng được dữ liệu mà không thấy phần nhạy cảm.

Ý chính của slide này: **mục đích là GIẢM RỦI RO LỘ DỮ LIỆU, chứ không làm dữ liệu
trở nên vô dụng.**"

### Slide 2 — Static vs Dynamic Data Masking

> Hai cột hiện sẵn. **[CLICK]** để hiện câu tổng kết cuối.

"Có hai hướng che dữ liệu phổ biến.

Thứ nhất — **Static Data Masking**: dữ liệu được che sẵn trên một bản sao, rồi mới
đưa sang môi trường phát triển, kiểm thử hay huấn luyện. Ưu điểm là an toàn cho các
môi trường không phải dữ liệu thật, nhưng dữ liệu trong bản sao đã bị thay đổi cố định.

Thứ hai — **Dynamic Data Masking**: dữ liệu gốc không đổi. Việc che chỉ diễn ra
ngay lúc truy vấn, tùy theo vai trò hoặc quyền của người truy vấn."

**[CLICK]** → hiện câu tổng kết, nhấn giọng:

"Nói ngắn gọn: **Static bảo vệ bản sao; còn Dynamic kiểm soát khả năng nhìn thấy**
trong hệ thống đang chạy. Seminar của nhóm tập trung vào Dynamic — đây là nền tảng
cho phần DuckDB ở section 3."

### Slide 3 — Data Masking không thay thế Encryption

> Bảng hiện sẵn. **[CLICK]** để hiện box tổng kết.

"Masking và encryption thường đi cùng nhau, nhưng không thay thế cho nhau.

Encryption, tức mã hóa, tập trung bảo vệ dữ liệu khi lưu trữ và truyền tải — kết
quả là ciphertext, tức dữ liệu bị biến thành chuỗi vô nghĩa, phải có khóa mới đọc
lại được.

Còn masking, tức che dữ liệu, tập trung bảo vệ phần hiển thị: kết quả vẫn đọc được
nhưng đã được che bớt, và thường không cần khôi phục lại."

**[CLICK]** → hiện box, nhấn giọng:

"Vì vậy hệ thống thực tế cần cả ba: **che dữ liệu, mã hóa và kiểm soát truy cập** —
mỗi cơ chế giải quyết một vấn đề khác nhau. Đây gọi là phòng thủ nhiều lớp."

### Slide 4 — Chuyển sang DuckDB (handoff sang Section 3)

> Slide bản lề: 5 CLICK = 5 ý. Đừng bấm dồn — nói hết một ý rồi mới bấm tiếp.

**[Mở — khi tiêu đề hiện]**
"Về mặt khái niệm thì dynamic masking khá rõ. Câu hỏi tiếp theo là: triển khai thế
nào cho bối cảnh thực tế của nhóm?"

**[CLICK 1]**
"Nhóm chọn DuckDB vì nó là cơ sở dữ liệu chạy ngay bên trong ứng dụng, không cần
dựng máy chủ riêng, nên rất nhanh để làm demo."

**[CLICK 2]**
"Lý do thứ hai: DuckDB có sẵn các thành phần SQL cơ bản để mình dựng logic che dữ
liệu — như CASE, concat, regexp, rồi macro và view."

**[CLICK 3 — nhấn giọng]**
"Và quan trọng nhất: nó cho mình thấy rõ ranh giới giữa phần logic che dữ liệu viết
trong SQL và lớp thực thi quyền — tức phần quyết định ai thực sự được thấy dữ liệu thật."

**[CLICK 4 — đọc chậm, tạo nhịp]**
"Vậy là xong phần khái niệm. Giờ mình chuyển sang phần triển khai cụ thể với DuckDB."

**[CLICK 5 — quay sang mời speaker kế tiếp, dứt khoát]**
"Mình xin mời bạn **Trần Huy Vũ** trình bày section 3 — Dynamic Data Masking in
DuckDB. Cảm ơn mọi người."

---

## 4) Bản rút gọn 90 giây (fallback khi hụt giờ)

**Slide 1:** "Người dùng đã đăng nhập đúng, được cấp quyền, kết nối an toàn, cơ sở
dữ liệu đã mã hóa — nhưng dữ liệu nhạy cảm vẫn lộ quá mức. Data Masking che phần
nhạy cảm nhưng giữ dữ liệu đủ dùng, ví dụ john.doe@gmail.com → j***@gmail.com. Mục
tiêu: giảm rủi ro lộ dữ liệu, chỉ cấp quyền tối thiểu."

**Slide 2:** "Static: che sẵn trên bản sao cho phát triển/kiểm thử. Dynamic: dữ
liệu gốc không đổi, che ngay lúc truy vấn tùy quyền người xem. Static bảo vệ bản
sao; Dynamic kiểm soát khả năng nhìn thấy."

**Slide 3:** "Mã hóa bảo vệ dữ liệu khi lưu trữ và truyền tải; che dữ liệu bảo vệ
phần hiển thị. Hệ thống thực tế cần cả ba: che dữ liệu, mã hóa và kiểm soát truy cập."

**Slide 4 (giữ nguyên câu bàn giao):** "Nhóm chọn DuckDB vì nó chạy ngay bên trong
ứng dụng, dễ làm demo, có đủ thành phần SQL để thử nghiệm việc che dữ liệu, và cho
thấy rõ ranh giới giữa logic che và lớp thực thi quyền. Mình xin mời bạn Trần Huy
Vũ trình bày section 3 — Dynamic Data Masking in DuckDB."

---

## 5) Checklist trước khi trình bày

- Xác nhận thứ tự nói: Member 1 → Member 2 → Member 3 → Member 4.
- Xin Member 1 câu hỏi kết Section 1 (để câu mở của mình khớp mượt).
- Xin Trần Huy Vũ câu mở đầu Section 3 (để chỉnh tông câu bàn giao).
- Tập với timer 2 lần; kiểm tra slide chạy ở chế độ Presenter.
- Câu mở: "Từ vấn đề ở section 1, mình đi vào cách giảm lộ dữ liệu bằng Data Masking."
- Câu bàn giao: "Mình xin mời bạn Trần Huy Vũ trình bày section 3: Dynamic Data
  Masking in DuckDB."

---

## 6) Câu hỏi có thể gặp & trả lời ngắn

**Q1. Vì sao không chỉ dùng mã hóa (encryption)?**
Mã hóa bảo vệ dữ liệu khi lưu trữ và truyền tải; che dữ liệu kiểm soát những gì
người dùng thực sự nhìn thấy trong kết quả truy vấn. Hai vấn đề khác nhau.

**Q2. Vì sao chọn dynamic thay vì static masking?**
Static hợp cho bản sao không phải dữ liệu thật; dynamic dùng để kiểm soát khả năng
nhìn thấy ngay khi hệ thống đang chạy, trên dữ liệu gốc.

**Q3. Che dữ liệu đã đủ để bảo mật chưa?**
Chưa. Phải kết hợp với kiểm soát truy cập, mã hóa và ghi log kiểm toán.

**Q4. Vì sao chọn DuckDB?**
Nó chạy ngay bên trong ứng dụng, dễ dựng thử nhanh, và có sẵn các thành phần SQL để
mô hình hóa hành vi che dữ liệu một cách rõ ràng.

---

## 7) Delivery tips

- Tốc độ: 145 – 160 từ/phút.
- Giữ eye contact ở mỗi câu chuyển slide.
- Ngắt 1 giây trước câu bàn giao (Slide 4, CLICK 5).
- Kết dứt khoát bằng ánh mắt/cử chỉ mời người kế tiếp — không bỏ lửng câu.
