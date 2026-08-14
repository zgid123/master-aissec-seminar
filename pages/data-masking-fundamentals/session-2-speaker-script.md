# Session 2 — Speaker Script & Presenter Guide (nguồn duy nhất)

> Data Masking Fundamentals · Người trình bày: **Võ Công Minh** (Member 2)
> Bàn giao cho: **Trần Huy Vũ** (Section 3 — Dynamic Data Masking in DuckDB)
> Đây là file kịch bản DUY NHẤT cho Session 2. Presenter note ngắn nằm trong từng
> slide (chế độ Presenter); file này chứa bản đầy đủ + fallback + checklist + Q&A.

---

## 1) Ngân sách thời gian (mục tiêu 2.5 – 3 phút)

| Slide | Nội dung | Thời lượng | Click |
|---|---|---|---|
| 1 | Data Masking là gì | ~50s (45–55s) | 0 |
| 2 | Static vs Dynamic | ~50s (45–55s) | 1 |
| 3 | Masking ≠ Encryption | ~35s (30–40s) | 1 |
| 4 | Chuyển sang DuckDB (handoff) | ~40s (35–45s) | 5 |

Tổng ≈ 2.9 phút. **Nếu quá giờ: rút gọn Slide 3 trước** (còn Goal + box tổng kết).

---

## 2) Kịch bản đầy đủ (bản chính, 2.5 – 3 phút)

### Slide 1 — Data Masking giúp ẩn phần không cần thiết

> Slide không có animation → nói liền mạch, dùng tay chỉ vào ví dụ Original → Masked.

"Ở section 1, nhóm đã chỉ ra một vấn đề rất thực tế: một user có thể đã
authenticated, đã authorized, kết nối an toàn, và database cũng đã được encrypted
— nhưng dữ liệu nhạy cảm vẫn có thể bị lộ quá mức cần thiết.

Data Masking xử lý đúng điểm này: nó thay dữ liệu nhạy cảm bằng một biểu diễn an
toàn hơn, nhưng vẫn đủ dùng cho công việc.

Ví dụ [chỉ tay vào slide]: email gốc john.doe@gmail.com sau khi mask chỉ còn
j***@gmail.com. Người dùng vẫn nhận ra domain và ngữ cảnh, nhưng không còn thấy
được danh tính đầy đủ.

Các trường thường được mask là email, phone, credit card, national ID, địa chỉ,
lương, và thông tin y tế / tài chính.

Và mục tiêu cuối cùng là hỗ trợ **least privilege**: mở dữ liệu an toàn cho
developer, analyst, support mà không phơi lộ những gì họ không cần thấy.

Ý chính của slide này: **masking để GIẢM PHƠI LỘ, chứ không làm dữ liệu vô dụng.**"

### Slide 2 — Static vs Dynamic Data Masking

> Hai cột hiện sẵn. **[CLICK]** để hiện câu tổng kết cuối.

"Có hai hướng masking phổ biến.

Thứ nhất — **Static Data Masking**: dữ liệu được che trước trên một bản copy, rồi
mới đưa sang môi trường development, testing hay training. Ưu điểm là an toàn cho
môi trường non-production, nhưng dữ liệu trong bản sao đã bị thay đổi cố định.

Thứ hai — **Dynamic Data Masking**: dữ liệu gốc không đổi. Việc che diễn ra ngay
tại query time, tùy theo role hoặc access context của người truy vấn."

**[CLICK]** → hiện câu tổng kết, nhấn giọng:

"Nói ngắn gọn: **Static bảo vệ bản sao; còn Dynamic kiểm soát khả năng nhìn thấy**
trong hệ thống đang chạy. Seminar của nhóm tập trung vào Dynamic — đây là nền
tảng cho phần DuckDB ở section 3."

### Slide 3 — Data Masking không thay thế Encryption

> Bảng hiện sẵn. **[CLICK]** để hiện box tổng kết.

"Masking và encryption thường đi cùng nhau, nhưng không thay thế cho nhau.

Encryption tập trung bảo vệ dữ liệu khi lưu trữ và truyền tải — kết quả là
ciphertext, phải có key mới giải mã được.

Masking thì tập trung bảo vệ phần hiển thị: kết quả vẫn đọc được nhưng đã được
che bớt, và thường không cần khôi phục lại."

**[CLICK]** → hiện box, nhấn giọng:

"Vì vậy hệ thống thực tế cần cả **masking + encryption + access control** — mỗi cơ
chế giải quyết một vấn đề khác nhau. Đó chính là defense in depth."

### Slide 4 — Chuyển sang DuckDB (handoff sang Section 3)

> Slide bản lề: 5 CLICK = 5 ý. Đừng bấm dồn — nói hết một ý rồi mới bấm tiếp.

**[Mở — khi tiêu đề hiện]**
"Về mặt khái niệm thì dynamic masking khá rõ. Câu hỏi tiếp theo là: triển khai thế
nào cho bối cảnh thực tế của nhóm?"

**[CLICK 1]**
"Nhóm chọn DuckDB vì nó là embedded, in-process analytical database — chạy ngay
trong application process, không cần dựng server riêng, nên rất nhanh để làm demo."

**[CLICK 2]**
"Lý do thứ hai: DuckDB có sẵn các SQL primitives để mình mô hình hóa masking — như
CASE, concat, regexp, rồi macro và view."

**[CLICK 3 — nhấn giọng]**
"Và quan trọng nhất: nó cho mình thấy rõ ranh giới giữa masking logic viết trong
SQL và lớp enforcement — tức ai thực sự được quyền thấy dữ liệu thật."

**[CLICK 4 — đọc chậm, tạo nhịp]**
"Vậy là xong phần khái niệm. Giờ mình chuyển sang phần triển khai cụ thể với DuckDB."

**[CLICK 5 — quay sang mời speaker kế tiếp, dứt khoát]**
"Mình xin mời bạn **Trần Huy Vũ** trình bày section 3 — Dynamic Data Masking in
DuckDB. Cảm ơn mọi người."

---

## 3) Bản rút gọn 90 giây (fallback khi hụt giờ)

**Slide 1:** "User đã authenticated, authorized, kết nối an toàn, DB đã encrypted —
nhưng dữ liệu nhạy cảm vẫn lộ quá mức. Data Masking che phần nhạy cảm nhưng giữ dữ
liệu đủ dùng, ví dụ john.doe@gmail.com → j***@gmail.com. Mục tiêu: giảm phơi lộ,
hỗ trợ least privilege."

**Slide 2:** "Static: che sẵn trên bản copy cho dev/test. Dynamic: dữ liệu gốc
không đổi, che tại query time theo access context. Static bảo vệ bản sao; Dynamic
kiểm soát khả năng nhìn thấy."

**Slide 3:** "Encryption bảo vệ dữ liệu khi lưu trữ và truyền tải; masking bảo vệ
phần hiển thị. Hệ thống thực tế cần cả masking + encryption + access control."

**Slide 4 (giữ nguyên câu bàn giao):** "Nhóm chọn DuckDB vì là embedded database,
dễ dựng demo, có đủ SQL primitives để thử nghiệm masking, và cho thấy rõ ranh giới
masking logic vs enforcement. Mình xin mời bạn Trần Huy Vũ trình bày section 3 —
Dynamic Data Masking in DuckDB."

---

## 4) Checklist trước khi trình bày

- Xác nhận thứ tự nói: Member 1 → Member 2 → Member 3 → Member 4.
- Xin Member 1 câu hỏi kết Section 1 (để câu mở của mình khớp mượt).
- Xin Trần Huy Vũ câu mở đầu Section 3 (để chỉnh tông câu bàn giao).
- Tập với timer 2 lần; kiểm tra slide chạy ở chế độ Presenter.
- Câu mở: "Từ vấn đề ở section 1, mình đi vào cách giảm lộ dữ liệu bằng Data Masking."
- Câu bàn giao: "Mình xin mời bạn Trần Huy Vũ trình bày section 3: Dynamic Data
  Masking in DuckDB."

---

## 5) Câu hỏi có thể gặp & trả lời ngắn

**Q1. Vì sao không chỉ dùng encryption?**
Encryption bảo vệ dữ liệu khi lưu trữ và truyền tải; masking kiểm soát những gì
user thực sự nhìn thấy trong kết quả truy vấn. Hai vấn đề khác nhau.

**Q2. Vì sao chọn dynamic thay vì static masking?**
Static hợp cho bản sao non-production; dynamic dùng để kiểm soát khả năng nhìn
thấy tại runtime trên dữ liệu gốc.

**Q3. Masking đã đủ để bảo mật chưa?**
Chưa. Phải kết hợp với access control, encryption và auditing.

**Q4. Vì sao chọn DuckDB?**
Embedded, in-process, dễ prototype ngay trong application, và có sẵn SQL primitives
để mô hình hóa hành vi masking một cách rõ ràng.

---

## 6) Delivery tips

- Tốc độ: 145 – 160 từ/phút.
- Giữ eye contact ở mỗi câu chuyển slide.
- Ngắt 1 giây trước câu bàn giao (Slide 4, CLICK 5).
- Kết dứt khoát bằng ánh mắt/cử chỉ mời người kế tiếp — không bỏ lửng câu.
