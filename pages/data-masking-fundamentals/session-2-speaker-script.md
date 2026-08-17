# Session 2 — Speaker Script & Presenter Guide (nguồn duy nhất)

> Data Masking Fundamentals · Người trình bày: **Võ Công Minh** (Member 2)
> Nhận bài từ: **Nguyễn Bảo Trâm** (Section 1 — Database Security Overview)
> Bàn giao cho: **Trần Huy Vũ** (Section 3 — Dynamic Data Masking in DuckDB)
> Đây là file kịch bản DUY NHẤT cho Session 2. Presenter note ngắn nằm trong từng
> slide (chế độ Presenter); file này chứa bản đầy đủ + giải thích thuật ngữ.

---

## 1) Ngân sách thời gian (mục tiêu 2.5 – 3 phút)

| Slide | Nội dung | Thời lượng | Click |
|---|---|---|---|
| 1 | Data Masking là gì (+ các kỹ thuật masking) | ~50s (45–55s) | 3 |
| 2 | Static vs Dynamic | ~45s (40–50s) | 3 |
| 3 | Masking ≠ Encryption (+ giới hạn của masking) | ~45s (40–50s) | 1 |
| 4 | Từ khái niệm sang triển khai (handoff) | ~35s (30–40s) | 4 |

Tổng ≈ 2.9 phút, **11 click** cho cả section.
Nhịp click: **Slide 1 = 3 · Slide 2 = 3 · Slide 3 = 1 · Slide 4 = 4.**

> Slide 1 và 2 hiện nội dung theo từng ý (không đổ hết ra ngay từ đầu) để khớp
> nhịp nói và đồng bộ với cách làm của Section 1, 3, 4. Slide 3 cố tình giữ
> **đúng 1 click** vì bảng cần đọc liền mạch.

**Nếu quá giờ:** cắt phần đọc bảng ở Slide 3 trước (giữ box tổng kết), sau đó cắt
đoạn liệt kê kỹ thuật masking ở Slide 1.
**Tuyệt đối không cắt:** câu tổng kết Slide 2, box tổng kết Slide 3, và câu bàn giao Slide 4.

**Hai câu "ăn điểm" của cả section:**
1. "Static không để **dữ liệu thật** rời khỏi production; Dynamic không để **dữ liệu thật** hiện ra sai người." (Slide 2)
2. "Masking chỉ chi phối **kết quả truy vấn** — nó không phải một ranh giới bảo mật." (Slide 3)

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
- **Các kỹ thuật masking phổ biến** (slide 1 có liệt kê — cần hiểu để trả lời hỏi):
  - *Che một phần (partial redaction):* giữ vài ký tự, còn lại thay bằng `*`. Ví dụ `j***@gmail.com`.
  - *Thay thế (substitution):* thay bằng dữ liệu giả nhưng trông thật (tên giả, địa chỉ giả).
  - *Làm rỗng (nulling / blanking):* trả về `NULL` hoặc chuỗi trống.
  - *Xáo trộn (shuffling):* giữ nguyên tập giá trị nhưng đảo giữa các dòng → thống kê còn đúng, cá nhân thì sai.
  - *Hash:* băm một chiều; cùng input luôn ra cùng output → vẫn join / đếm được, nhưng không đọc lại được.
  - *Tokenization:* thay bằng một token, giá trị thật giữ ở một kho riêng (token vault).
  - *Giữ nguyên định dạng (format-preserving):* kết quả vẫn đúng định dạng gốc để hệ thống phía sau không lỗi validate.
- **Static Data Masking:** che SẴN dữ liệu trên một bản sao, rồi mới đưa bản sao đó
  cho môi trường không phải dữ liệu thật (phát triển, kiểm thử, huấn luyện).
- **Dynamic Data Masking:** dữ liệu lưu trong database KHÔNG đổi; hệ thống chỉ che
  KẾT QUẢ TRẢ VỀ ngay lúc người dùng truy vấn, tùy theo họ là ai và có quyền gì.
- **Query time (lúc truy vấn):** thời điểm người dùng chạy câu lệnh lấy dữ liệu.
- **Role / access context (vai trò / ngữ cảnh truy cập):** người đang xem là ai và
  đang có quyền gì — dựa vào đó hệ thống quyết định che hay không.
- **Encryption (mã hóa):** biến dữ liệu thành chuỗi vô nghĩa, phải có khóa mới đọc
  lại được. Bảo vệ dữ liệu khi lưu trữ và khi truyền qua mạng.
- **Ciphertext:** kết quả sau khi mã hóa — chuỗi vô nghĩa, không đọc được nếu không có khóa.
- **Encryption at rest / in transit:** mã hóa dữ liệu khi LƯU trên đĩa (at rest) và
  khi TRUYỀN qua mạng (in transit).
- **Key management (quản lý khóa):** việc lưu, phân quyền, xoay vòng khóa giải mã.
  Ý quan trọng: mã hóa KHÔNG xóa rủi ro, nó **dịch chuyển** rủi ro từ dữ liệu sang khóa.
- **Access control (kiểm soát truy cập):** quy định ai được phép truy cập tài nguyên/dữ liệu nào.
- **Security boundary (ranh giới bảo mật):** lớp mà kẻ tấn công KHÔNG thể đi vòng qua.
  Masking trong `SELECT` **không phải** một ranh giới như vậy.
- **Defense in depth (phòng thủ nhiều lớp):** kết hợp nhiều biện pháp bảo mật; một
  lớp bị vượt qua thì vẫn còn lớp khác đỡ.
- **Masking logic vs enforcement:**
  - *masking logic* = phần LÀM RA giá trị đã che (viết bằng SQL).
  - *enforcement (lớp thực thi quyền)* = phần QUYẾT ĐỊNH ai thực sự được thấy dữ
    liệu thật. Ý chính: SQL làm tốt phần logic, nhưng phần enforcement thường
    cần thêm một lớp ở tầng ứng dụng.
- **DuckDB — embedded / in-process database:** cơ sở dữ liệu chạy ngay BÊN TRONG
  ứng dụng, không cần dựng một máy chủ database riêng. (Chỉ cần biết ở mức này —
  chi tiết kiến trúc là phần của Section 3, đừng nói trước.)

---

## 3) Kịch bản đầy đủ (bản chính, 2.5 – 3 phút)

**Cách đọc file này:**

- Phần trong ngoặc kép `" "` là **lời nói ra miệng**, đã viết sẵn theo văn nói — đọc
  được nguyên văn, không cần biên tập lại.
- Phần trong ngoặc vuông `[ ]` là **hành động / cử chỉ / thao tác bấm**, không đọc.
- `(…s)` là **thời lượng ước tính** của đoạn đó — dùng để canh giờ khi tập.
- **CHỮ IN HOA** trong lời thoại = từ cần **nhấn giọng**.
- `//` = **ngắt nhịp** khoảng 1 giây (hít một hơi ngắn rồi nói tiếp).

---

### Slide 1 — Data Masking giúp ẩn phần không cần thiết

**Mục tiêu slide:** người nghe hiểu Data Masking là gì qua một ví dụ cụ thể, và hiểu
nó sinh ra để giải quyết đúng cái vấn đề mà Section 1 vừa nêu.
**Trạng thái slide:** ban đầu chỉ có tiêu đề + câu định nghĩa. Ba click lần lượt hiện:
(1) ví dụ gốc → đã che, (2) ba cột thông tin, (3) dòng "Mục tiêu" màu vàng.
**Tổng: ~50 giây · 3 click.**

#### Đoạn 1 — Nối từ Section 1 (~12s)

[Nhìn về phía khán giả, chưa nhìn slide. Nói bình thường, không vội.]

> "Cảm ơn Trâm. // Ở phần một, nhóm đã chỉ ra một vấn đề rất thực tế: một người dùng
> có thể đã đăng nhập đúng, đã được cấp quyền, kết nối đã an toàn, và cơ sở dữ
> liệu cũng đã được mã hóa // NHƯNG dữ liệu nhạy cảm VẪN có thể bị lộ nhiều hơn mức
> cần thiết."

[Nếu Section 1 kết bằng đúng câu hỏi "How can users access what they need without
seeing sensitive information they do not need?", thì thêm một câu ngắn:]

> "Câu hỏi Trâm vừa đặt ra ở cuối phần một chính là câu mà phần hai sẽ trả lời."

#### Đoạn 2 — Định nghĩa (~8s)

[Bắt đầu quay về phía slide.]

> "Data Masking — hay che dữ liệu — xử lý đúng điểm này. Nó thay dữ liệu nhạy cảm
> bằng một dạng hiển thị an toàn hơn, // nhưng VẪN ĐỦ DÙNG cho công việc."

#### Đoạn 3 — [CLICK 1] Ví dụ cụ thể (~10s)

[BẤM CLICK 1 → hiện khối ví dụ. Đợi nó hiện xong rồi mới nói.]

[Chỉ tay vào ô bên trái trước, rồi kéo tay sang ô bên phải theo mũi tên. Đây là
đoạn dễ nhớ nhất của slide, nên nói chậm và để khán giả kịp nhìn.]

> "Ví dụ như trên slide: email gốc là john.doe@gmail.com, // sau khi che thì chỉ còn
> j–ba dấu sao–@gmail.com. Người xem VẪN biết đây là một email, vẫn biết nó thuộc
> nhà cung cấp nào, // nhưng KHÔNG còn thấy được danh tính đầy đủ của khách hàng."

#### Đoạn 4 — [CLICK 2] Che cái gì, cho ai (~10s)

[BẤM CLICK 2 → hiện cả ba cột cùng lúc.]

[Chỉ lướt tay qua hai cột đầu, không dừng lâu ở từng cột.]

> "Những trường thường được che là email, số điện thoại, thẻ tín dụng, số định
> danh, địa chỉ, lương, và thông tin y tế hay tài chính. // Những người thường
> làm việc trên dữ liệu đã che là lập trình viên, kiểm thử viên, nhân viên phân
> tích và hỗ trợ — tức những người chỉ cần MỘT PHẦN dữ liệu để làm việc."

#### Đoạn 5 — Các kỹ thuật masking (~10s)

[Chỉ vào cột thứ ba màu vàng. Đoạn này là liệt kê — nói đều, không cần giải thích
từng cái, vì phần giải thích đã có sẵn ở mục 2 nếu bị hỏi.]

> "Về mặt kỹ thuật thì không chỉ có một cách che. Bốn cách hay dùng nhất là: che một
> phần — partial redaction, đúng như ví dụ vừa rồi; // thay thế bằng dữ liệu giả —
> substitution; // hash; // và tokenization. Ngoài ra còn một số biến thể khác."

[ĐÃ RÚT TỪ 7 TÊN XUỐNG CÒN 4 — đừng đọc thêm tên nào nữa. Danh sách đầy đủ (nulling,
shuffling, format-preserving) nằm trong note nhắc bài của slide 1 để dành cho hỏi đáp.]

[NẾU ĐANG CHẬM GIỜ: bỏ nguyên đoạn 5 này, nhảy thẳng xuống click. Cột vẫn nằm
trên slide cho người nghe tự đọc.]

#### Đoạn 6 — [CLICK 3] Mục tiêu + chốt slide (~10s)

[BẤM CLICK 3. Đợi dòng vàng hiện xong rồi mới nói — đừng nói đè lên animation.]

> "Và mục tiêu cuối cùng của tất cả những thứ này là QUYỀN TỐI THIỂU: cho nhân viên
> dùng được dữ liệu để làm việc, mà không thấy phần nhạy cảm họ không cần thấy."

[Ngừng 1 nhịp, hạ giọng, nhìn thẳng khán giả — đây là câu chốt slide:]

> "Nói cách khác: mục đích của masking là GIẢM RỦI RO LỘ DỮ LIỆU, // chứ không phải
> làm cho dữ liệu trở nên vô dụng."

**Câu chuyển sang Slide 2:**

> "Vậy thì việc che này được làm VÀO LÚC NÀO?"

[Chuyển slide.]

---

### Slide 2 — Static / Dynamic Data Masking

**Mục tiêu slide:** phân biệt rõ hai hướng, và chốt rằng seminar đi theo Dynamic.
Đây là slide **bắt buộc** vì tên đề tài của nhóm là Dynamic Data Masking.
**Trạng thái slide:** ban đầu chỉ có tiêu đề. Ba click lần lượt hiện: (1) cột Static
(kèm dòng Đánh đổi), (2) cột Dynamic (kèm dòng Đánh đổi), (3) câu tổng kết + dòng
lý do chọn Dynamic. Hai cột đã được đặt chiều cao bằng nhau nên khi
cột phải hiện ra, layout KHÔNG bị nhảy.
**Tổng: ~45 giây · 3 click.**

#### Đoạn 1 — Mở (~5s)

> "Có hai hướng che dữ liệu phổ biến, và hai hướng này khác nhau ở đúng một điểm:
> việc che diễn ra LÚC NÀO."

#### Đoạn 2 — [CLICK 1] Static (~15s)

[BẤM CLICK 1 → hiện cột trái. Chỉ tay vào cột trái, giữ tay ở đó suốt đoạn này
để khán giả biết đang nói cột nào.]

> "Thứ nhất là **Static Data Masking**. Ở đây, dữ liệu được che SẴN trên một BẢN SAO,
> // rồi bản sao đó mới được đưa sang môi trường phát triển, kiểm thử, hoặc huấn
> luyện. Nghĩa là lập trình viên làm việc trên dữ liệu đã bị thay đổi sẵn từ trước.
> // Ưu điểm là rất an toàn cho các môi trường không phải dữ liệu thật — vì ở đó
> đơn giản là KHÔNG CÓ dữ liệu thật để mà lộ. Nhược điểm là dữ liệu trong bản sao
> đã bị thay đổi cố định, không lấy lại được bản gốc, // và phải làm mới định kỳ
> mỗi khi dữ liệu gốc đổi."

[Dòng "Đánh đổi" ở cuối cột trái đã viết sẵn ý này — không cần đọc lại nguyên văn.]

#### Đoạn 3 — [CLICK 2] Dynamic (~15s)

[BẤM CLICK 2 → hiện cột phải. Chuyển tay sang cột phải. Nhấn mạnh hơn đoạn trước,
vì đây mới là hướng nhóm chọn.]

> "Thứ hai là **Dynamic Data Masking** — và đây mới là hướng mà seminar của nhóm tập
> trung vào. // Ở đây, dữ liệu lưu trong database KHÔNG HỀ ĐỔI. Việc che chỉ áp lên
> KẾT QUẢ TRẢ VỀ, ngay tại thời điểm người dùng chạy câu truy vấn. // Và che hay
> không che là tùy vào người đang truy vấn là AI và có QUYỀN GÌ. Cùng một bảng dữ
> liệu đó, người đủ quyền thì thấy giá trị thật, người không đủ quyền thì chỉ
> thấy bản đã che."

[Chỉ vào dòng "Đánh đổi" ở cuối cột phải — đây là câu bắt cầu sang slide 3, đừng bỏ:]

> "Đánh đổi của Dynamic là: nó giữ được MỘT nguồn dữ liệu duy nhất và linh hoạt theo
> role, // nhưng đổi lại nó phụ thuộc vào việc hệ thống xác định ĐÚNG danh tính và
> quyền của người truy vấn — xác định sai là che sai."

#### Đoạn 4 — [CLICK 3] Câu tổng kết (~10s)

[BẤM CLICK 3. Đợi câu hiện xong. Đây là một trong hai câu ăn điểm của cả section —
nói chậm, tách rõ hai vế, nhìn khán giả chứ đừng nhìn slide.]

> "Nói ngắn gọn: // **Static không để DỮ LIỆU THẬT rời khỏi production**; // còn
> **Dynamic không để DỮ LIỆU THẬT hiện ra SAI NGƯỜI**."

[Hai vế cùng nói về DỮ LIỆU THẬT, chỉ khác chỗ chặn: Static chặn ở khâu SAO CHÉP,
Dynamic chặn ở khâu TRUY VẤN. Nếu bị hỏi "sao không nói bảo vệ bản sao?" — trả lời:
bản sao không phải thứ cần bảo vệ; Static làm SẠCH bản sao để dữ liệu thật không bị
đem ra khỏi production.]

[Cùng CLICK 3 còn hiện thêm một dòng nhỏ bên dưới — lý do nhóm chọn Dynamic. Nói luôn,
đừng bỏ, vì đây là câu bảo vệ lựa chọn đề tài của nhóm:]

> "Và nhóm chọn Dynamic vì bài toán ở đây là dữ liệu production: chỉ có MỘT nguồn
> dữ liệu duy nhất, // nhưng có NHIỀU ROLE khác nhau cùng truy vấn nó — nên không
> thể giải quyết bằng cách tạo sẵn một bản sao đã che."

**Câu chuyển sang Slide 3:**

> "Đến đây có một câu hỏi rất hay thường được đặt ra: nếu đã có mã hóa rồi, thì
> còn cần che dữ liệu làm gì nữa?"

[Chuyển slide.]

---

### Slide 3 — Data Masking ≠ Encryption

**Mục tiêu slide:** khẳng định masking và encryption giải quyết hai vấn đề khác nhau,
và nêu thẳng giới hạn của masking để mở đường cho Section 4.
**Trạng thái slide:** bảng 3 dòng hiện sẵn. Box tổng kết cần bấm — **chỉ MỘT click**,
sau đó nói liền 3 nhịp trên cùng box đó, không bấm thêm.
**Tổng: ~45 giây · 1 click.**

#### Đoạn 1 — Khẳng định mở (~5s)

> "Masking và encryption thường đi cùng nhau trong một hệ thống, // nhưng chúng
> KHÔNG thay thế cho nhau."

#### Đoạn 2 — Đọc bảng (~15s)

[Chỉ vào cột Encryption trước, rồi cột Data Masking. **Không đọc từng ô** — chỉ nói
theo 3 dòng: Mục tiêu, Kết quả, Dùng để.]

> "Encryption, tức mã hóa, tập trung bảo vệ dữ liệu khi LƯU TRỮ và khi TRUYỀN TẢI.
> Kết quả của nó là ciphertext — dữ liệu bị biến thành một chuỗi vô nghĩa, phải
> có KHÓA mới đọc lại được. // Còn masking, tức che dữ liệu, thì tập trung bảo vệ
> phần HIỂN THỊ: kết quả vẫn đọc được bình thường, chỉ là đã được che bớt, và
> thường cũng không cần khôi phục lại. // Tóm lại: mã hóa bảo vệ dữ liệu KHỎI
> người không có quyền; còn che dữ liệu kiểm soát xem người ĐÃ CÓ QUYỀN thì được
> nhìn thấy tới đâu."

[NẾU ĐANG CHẬM GIỜ: bỏ nguyên đoạn 2 này, bấm click luôn. Bảng để khán giả tự đọc.]

#### Đoạn 3 — [CLICK] Box tổng kết (~25s, chia 3 nhịp)

[BẤM CLICK MỘT LẦN. Đây là phần nặng nhất và đáng giá nhất của cả section — hạ tốc
độ xuống rõ rệt so với các slide trước. Ba nhịp dưới đây nói liền mạch, không bấm
thêm click nào.]

**Nhịp 1 — giới hạn của masking:**

> "Nhưng ở đây cần nói rõ một giới hạn quan trọng của masking. // Việc che này được
> thực hiện ngay TRONG CÂU LỆNH SELECT — nghĩa là nó chỉ chi phối KẾT QUẢ TRUY VẤN
> trả về. // Nó KHÔNG PHẢI một ranh giới bảo mật. Nếu một người cầm được chính
> file cơ sở dữ liệu, hoặc có connection string với đủ quyền để truy vấn THẲNG vào
> bảng gốc, // thì lớp che này bị bỏ qua HOÀN TOÀN."

**Nhịp 2 — vấn đề khóa:**

> "Encryption đóng đ��ợc đúng cái lỗ đó — vì lúc đó cầm file cũng không đọc được
> gì. // Nhưng nó không XÓA được rủi ro, mà DỊCH CHUYỂN rủi ro sang chỗ khác: sang
> cái khóa. Khóa giải mã được lưu ở đâu, ai được giữ, và xoay vòng thế nào. // Nếu
> khóa lại nằm ngay cạnh file dữ liệu thì coi như chưa bảo vệ được gì."

**Nhịp 3 — chốt:**

[Hạ giọng, nhìn thẳng khán giả.]

> "Cho nên một hệ thống thực tế luôn cần CẢ BA: che dữ liệu, mã hóa, và kiểm soát
> truy cập — vì mỗi cơ chế giải quyết một vấn đề khác nhau. Đây chính là nguyên tắc
> phòng thủ nhiều lớp — defense in depth — mà phần một đã nhắc tới."

> ⚠️ **Giới hạn phạm vi:** đừng đi sâu vào chuyện bypass view hay direct table access
> ở đây. Section 4 có hẳn một slide riêng cho việc đó ("Data Masking ≠ quyền").
> Việc của mình ở Session 2 là **NÊU vấn đề**, để Section 4 phân tích và chốt lại.
> Nếu có người hỏi sâu ngay tại đây, trả lời một câu rồi chuyển tiếp: *"Dạ đúng
> ạ, và phần bốn của nhóm sẽ phân tích kỹ đúng tình huống này."*

**Câu chuyển sang Slide 4:**

> "Vậy là phần khái niệm đã tương đối rõ. Câu hỏi còn lại là triển khai."

[Chuyển slide.]

---

### Slide 4 — Từ khái niệm sang triển khai (handoff sang Section 3)

**Mục tiêu slide:** chốt lại phần khái niệm và đặt đúng câu hỏi mà Section 3 sẽ trả
lời, rồi mời người kế tiếp.
**Trạng thái slide:** chỉ có tiêu đề hiện sẵn. 4 CLICK = 4 ý.
**Tổng: ~35 giây · 4 click.**

> 🚩 **Nguyên tắc quan trọng nhất của slide này:** KHÔNG nói trước nội dung kỹ thuật
> của Section 3 — cụ thể là kiến trúc in-process của DuckDB, và danh sách
> `CASE` / `concat` / `regexp` / macro / view. Đó là slide mở bài của Trần Huy Vũ;
> nói trước là giẫm chân bạn ấy và khán giả phải nghe lặp hai lần.
> Việc của mình chỉ là **đặt câu hỏi**, không phải trả lời nó.

#### Đoạn 1 — Mở, khi tiêu đề hiện (~5s)

> "Về mặt khái niệm thì dynamic masking khá rõ rồi. // Câu hỏi còn lại là: AI THỰC
> THI nó?"

#### Đoạn 2 — [CLICK 1] DBMS truyền thống (~8s)

[BẤM CLICK 1. Đợi ý hiện rồi nói.]

> "Trong một hệ quản trị cơ sở dữ liệu truyền thống, việc che dữ liệu dựa trên
> user, role và lệnh GRANT — // và chính DATABASE SERVER là nơi thực thi cái policy
> đó. Người dùng không tự đi vòng qua được."

#### Đoạn 3 — [CLICK 2] Embedded database (~12s)

[BẤM CLICK 2. **Đây là ý mạnh nhất của riêng bạn trong cả section** — nói chậm,
nhấn rõ hai vế "làm ra" và "quyết định".]

> "Nhưng với một embedded database thì không còn một server tách biệt đứng ra gác
> cửa nữa. // Lúc đó, ranh giới giữa hai thứ sẽ lộ ra rất rõ. Một bên là MASKING
> LOGIC — tức phần LÀM RA giá trị đã che, cái này viết bằng SQL. // Một bên là LỚP
> ENFORCEMENT — tức phần QUYẾT ĐỊNH ai thực sự được thấy dữ liệu thật. // Hai phần
> này KHÁC NHAU, và không phải lúc nào cũng nằm cùng một chỗ."

#### Đoạn 4 — [CLICK 3] Câu hỏi chuyển section (~7s)

[BẤM CLICK 3. Đọc chậm, rõ từng chữ — đây là câu bàn giao nội dung.]

> "Nên câu hỏi đặt ra là: Dynamic Data Masking nghe khá đơn giản trong một DBMS
> truyền thống, // nhưng trong một embedded analytical database như DuckDB thì nó
> được triển khai ra sao, // và AI là người THỰC THI policy?"

#### Đoạn 5 — [CLICK 4] Bàn giao (~5s)

[Ngừng ĐÚNG 1 GIÂY trước khi nói câu này. BẤM CLICK 4, đồng thời quay người và
hướng ánh mắt sang Trần Huy Vũ. Nói dứt khoát, KHÔNG bỏ lửng cuối câu.]

> "Phần trả lời xin được nhường lại cho phần ba. // Mình xin mời bạn **Trần Huy Vũ**
> trình bày — Dynamic Data Masking in DuckDB. Cảm ơn mọi người."

[Đứng yên một nhịp cho người kế tiếp bước lên, rồi mới rời vị trí.]
