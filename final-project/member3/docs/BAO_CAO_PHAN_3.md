# Phần phương pháp và hiện thực mô hình

Nội dung dưới đây mô tả mã đã chạy trong `member3`. Khi ghép vào báo cáo chung, cần đánh lại số mục/công thức và cập nhật bảng kết quả từ lần chạy được nhóm chốt. Các kết quả đi kèm hiện là mô phỏng.

Cập nhật ngày 18/10/2026: thêm bảng nguồn công thức và cấu hình đã dùng. Định nghĩa bài toán trong bản Trâm và quy trình đánh giá của Minh giữ nguyên vị trí. Các đoạn còn thiếu để ghép vào phần chung nằm trong [BO_SUNG_THEO_GOP_Y_GIAO_VIEN.md](BO_SUNG_THEO_GOP_Y_GIAO_VIEN.md); không chèn lại toàn bộ phần 3 nếu báo cáo chung đã có nội dung tương ứng.

## Xây dựng hồ sơ hành vi theo tài khoản

Mỗi tài khoản được gắn với một bộ chuẩn hóa và một mô hình phát hiện bất thường. Đầu vào là các cửa sổ nhịp gõ do bộ trích xuất đặc trưng cung cấp. Cấu hình mặc định sử dụng 50 lần gõ hợp lệ trên mỗi cửa sổ, gồm 12 đặc trưng mô tả thời gian giữ phím, khoảng nhả–nhấn, khoảng nhấn–nhấn, tốc độ gõ, tỷ lệ khoảng nghỉ và tỷ lệ sửa lỗi.

Các tham số chuẩn hóa được tính từ dữ liệu huấn luyện của tài khoản đích. Khi đánh giá một cửa sổ của người khác trên tài khoản đó, hệ thống vẫn dùng bộ chuẩn hóa của tài khoản được khai báo. Các đặc trưng có MAD bằng 0 trong train bị loại khỏi đầu vào mô hình theo mặt nạ của pipeline dữ liệu. Thông tin về mã người tham gia, phiên, tập dữ liệu và nhãn thật không được dùng làm đặc trưng.

## Hai cách tính điểm bất thường

Nhóm triển khai baseline khoảng cách L1 và Isolation Forest. Baseline L1 tính khoảng cách tuyệt đối trung bình từ vectơ đã chuẩn hóa đến tâm median của hồ sơ train. Ưu điểm của cách này là dễ giải thích, ít tham số và thuận tiện kiểm tra bằng tay.

Isolation Forest xây dựng các cây phân hoạch ngẫu nhiên trên mẫu train chính chủ. Những quan sát được cô lập qua ít bước phân hoạch nhận điểm bất thường lớn hơn. Mô hình dùng seed cố định, lưu toàn bộ cây và thông số lấy mẫu để có thể chạy lại. Hiện thực này dựa trên công trình của Liu và cộng sự [M1], không phải bản sao của một thư viện có sẵn và không được giả định cho kết quả số giống thư viện đó.

Hai bộ tạo điểm được đánh giá với cùng dữ liệu, cùng kịch bản và các chính sách quyết định giống nhau. Nhóm không xem việc thay scorer là bằng chứng riêng cho tác dụng của CUSUM.

## Chuẩn hóa điểm và cộng dồn bằng chứng

Điểm của các mô hình và hồ sơ khác nhau có thang đo khác nhau. Vì vậy, sau khi fit scorer, nhóm dùng một phiên validation chính chủ riêng để ước lượng trung vị và MAD của điểm:

$$
z_t=\frac{a_t-\operatorname{median}(a_u)}
{1.4826\operatorname{MAD}(a_u)}.
$$

Nếu MAD bằng 0, chương trình dừng thay vì tự thêm một hằng số nhỏ vào mẫu số. Phiên dùng chuẩn hóa điểm được tách khỏi phiên dùng chọn ngưỡng; các cửa sổ của cùng phiên không được chia ngẫu nhiên cho hai mục đích này.

Để tránh quyết định chỉ từ một cửa sổ bất thường, nhóm tích lũy điểm bằng truy hồi một phía:

$$
S_t=\max\{0,\lambda S_{t-1}+z_t-k\},\qquad S_0=0.
$$

Tham số k làm giảm ảnh hưởng của dao động nhỏ; lambda trong (0,1] điều khiển mức suy giảm của bằng chứng cũ. Khi lambda bằng 1, truy hồi không làm quên; khi nhỏ hơn 1, điểm tích lũy giảm dần nếu không có bằng chứng mới. Nhóm không coi hệ số quên là mặc nhiên tốt hơn mà so sánh thêm cấu hình lambda=1 đã được chọn lại k và ngưỡng trên validation.

Nền tảng CUSUM được tham khảo từ hướng dẫn kiểm soát quá trình của NIST [M3]. Các bảo đảm ARL của CUSUM truyền thống không được chuyển trực tiếp sang chuỗi nhịp gõ có phụ thuộc thời gian hoặc sang biến thể có quên.

### Nguồn công thức và phần nhóm hiện thực

| Thành phần | Căn cứ | Phần nhóm sử dụng hoặc điều chỉnh |
|---|---|---|
| Median/MAD và hệ số 1,4826 | Tài liệu MAD của R [M4] | Hệ số hiệu chỉnh dưới phân phối chuẩn; không khẳng định nhịp gõ phân phối chuẩn. Chia tập và xử lý MAD=0 theo hợp đồng triển khai |
| L1 trung bình đến tâm median | Baseline nhóm hiện thực; tham khảo cách đánh giá theo tài khoản ở [M2] | Không phải bản sao nguyên trạng scaled Manhattan trong nghiên cứu mật khẩu cố định |
| Điểm Isolation Forest | Liu, Ting và Zhou [M1] | Kế thừa độ dài đường đi và hệ số hiệu chỉnh; hiện thực độc lập, chưa đối chiếu từng điểm với thư viện |
| CUSUM một phía khi lambda=1 | NIST/SEMATECH [M3] | Áp dụng trên điểm đã hiệu chỉnh; không suy ra bảo đảm xác suất trên nhịp gõ thực |
| Hệ số quên lambda<1 | Biến thể nhóm đưa vào cấu hình so sánh | Đối chiếu với lambda=1 đã chọn lại k/h; chưa khẳng định tính mới của thuật toán |
| Hai ngưỡng và cooldown | Quy tắc điều khiển của bản triển khai | h1 gọi MFA, h2 thu hồi; tỷ lệ ngưỡng và cooldown là hằng số thiết kế, không do NIST ấn định |

Nguồn M1–M4 được ghi trong [NGUON_THAM_KHAO.md](NGUON_THAM_KHAO.md). Khi ghép, dùng lại nguồn đã tồn tại thay vì đánh số trùng.

## Chính sách quyết định và ngưỡng theo người

Hệ thống sử dụng hai ngưỡng h1 và h2. Khi điểm dưới h1, phiên tiếp tục. Khi điểm đạt h1 nhưng chưa đạt h2, hệ thống yêu cầu xác thực lại nếu không trong cooldown. Khi điểm đạt h2, hệ thống thu hồi ngay. Trong cấu hình mặc định, h2 bằng hai lần h1.

B0 sử dụng z của từng cửa sổ với ngưỡng chung. B1 sử dụng S với bộ lambda, k và ngưỡng chung. P1 giữ nguyên lambda và k của B1, nhưng chọn h1 theo từng tài khoản. Cách so sánh B1-P1 giúp tập trung vào tác động của cá nhân hóa ngưỡng. Bản triển khai hiện tại chưa dùng ngữ cảnh nhạy cảm hoặc độ dài phiên trong công thức ngưỡng, đồng thời chưa có cập nhật hồ sơ P2.

MFA trong thực nghiệm phát lại được giả lập tức thời: chủ thật vượt qua, người lạ thất bại. Khi MFA thành công, S trở về 0 và áp dụng cooldown hai cửa sổ cho cảnh báo h1; ngưỡng thu hồi h2 vẫn có hiệu lực. Khi thu hồi, phiên kết thúc và không sinh dự đoán tiếp theo.

## Chọn tham số và giới hạn bài toán tối ưu

Tham số được chọn trên validation để giảm số lần MFA/giờ của chính chủ, đồng thời kiểm tra TTD, tỷ lệ phát hiện và tỷ lệ bỏ lọt tại một chân trời L phím đã định trước. Việc kiểm ràng buộc được thực hiện riêng trên từng tài khoản. Các mức mặc định của bản mô phỏng là median TTD không quá 150 phím, tỷ lệ phát hiện ít nhất 80% và tỷ lệ chưa cảnh báo tại L=150 không quá 15%, kèm yêu cầu không thu hồi oan trong validation.

Các mức này là tiêu chí thiết kế, không phải kết quả thu được. Khi không tìm thấy cấu hình hợp lệ trong lưới, phần mềm đánh dấu không khả thi và chỉ lưu một cấu hình chẩn đoán theo mức vi phạm. Không coi cấu hình đó là nghiệm đạt yêu cầu và không điều chỉnh điều kiện dựa trên kết quả test.

FAR cửa sổ và tỷ lệ bỏ lọt của một chính sách có trạng thái được báo riêng. Cùng đạt một giới hạn FAR không đồng nghĩa hai phương pháp có cùng FAR. Vì vậy, kết quả hiện tại chưa đủ để khẳng định H2 ở cùng mức FAR như câu hỏi nghiên cứu ban đầu; quy tắc ghép mức cần được nhóm thống nhất trước đánh giá người thật.

### Cấu hình thực nghiệm và cách xác định giá trị

Các giá trị dưới đây đối chiếu với `config.json` và cấu hình đóng băng trong `artifacts/simulation-reviewed/fit/model.json`, mô tả lần chạy mô phỏng hiện có.

| Tham số | Giá trị hoặc tập ứng viên | Cách xác định |
|---|---|---|
| Kích thước cửa sổ W | 50 lần gõ | Cố định cho lần chạy chính; W=20/100 chưa được đánh giá đầy đủ ở phần 3 |
| Isolation Forest | 100 cây; tối đa 256 mẫu/cây | Cố định; mẫu/cây không vượt số cửa sổ train chính chủ |
| lambda của B1 | {0,9; 1} | Chọn bằng validation |
| k của B1 | {0,25; 0,5; 1} | Chọn bằng validation |
| h1 của B0/B1/P1 | {0,5; 1; 2; 3; 5; 8; 12} | Chọn bằng validation; B0/B1 dùng chung, P1 theo người và giữ lambda/k của B1 |
| Đối chứng lambda=1 | k/h1 cùng lưới trên | Chọn lại bằng validation, không chỉ thay lambda của cấu hình đã chọn |
| h2 | 2 × h1 | Quy tắc cố định |
| Cooldown sau MFA thành công | 2 cửa sổ | Quy tắc cố định |
| Ngưỡng chẩn đoán FAR/FRR cửa sổ | {0; 0,5; 1; 2; 3; 5; 8; 12} | Chọn riêng bằng validation; FAR cửa sổ mục tiêu ≤15% |
| A1: prefix/suffix | 225/300 lần gõ | Thiết kế cố định; prefix không chia hết cho W để có cửa sổ mixed |
| Down–down tại chỗ nối A1 | 250 ms | Hằng số mô phỏng, chưa phân tích độ nhạy |
| Chân trời L | 150 phím người lạ | Cố định khi đo tỷ lệ chưa cảnh báo tại L |
| Ràng buộc chính sách | Median TTD có điều kiện ≤150 phím; tỷ lệ cảnh báo ≥80%; tỷ lệ chưa cảnh báo tại L ≤15% | Tiêu chí mô phỏng, kiểm từng người; không thiếu kết cục tại L, không thu hồi oan hoặc trước N |
| Seed chung | 20261016 | Cố định để tái lập; seed từng thành phần được dẫn xuất trong mã |

Giá trị chọn bằng validation không chứng minh lưới hoặc các hằng số còn lại là tối ưu. Nếu chưa thử độ nhạy W, cooldown hoặc khoảng nối A1, giữ đây là giới hạn thiết kế. Không chỉnh theo test đã xem rồi trình bày như cấu hình chốt từ trước.

## Kịch bản và cách đo

Kịch bản chính gồm phiên chính chủ G0 và tiếp quản A1. A1 nối đoạn gõ của người B vào sau đoạn người A ở mức lần gõ, sau đó tính lại đặc trưng bằng cùng công thức. Mã giữ nguồn phiên và đoạn; chỉ ghép các nguồn trong cùng split. Điểm đổi người không được truyền vào scorer hay bộ quyết định và không làm reset CUSUM.

TTD được đo từ keydown đầu của người lạ đến lúc có quyết định cảnh báo, báo cả số phím đã quan sát và mili giây. Cửa sổ trộn hai người vẫn được xử lý theo thời gian nhưng bị loại khỏi FAR/FRR cửa sổ. Không phát hiện tới cuối quan sát được ghi là kiểm duyệt phải, không gán TTD bằng 0 hoặc độ dài phiên. Ca bị thu hồi trước khi người lạ bắt đầu được báo riêng.

Thời điểm quyết định là lúc cửa sổ khả dụng theo thứ tự xử lý, lấy giá trị lớn hơn giữa key-up cuối của cửa sổ và thời điểm quyết định trước đó. Quy tắc này xử lý trường hợp giữ phím lâu mà không đổi các đặc trưng đã tính từ thời gian nguồn.

Chỉ số detected/TTD hiện mô tả cảnh báo của toàn chính sách. Nếu cảnh báo sau thời điểm tiếp quản xuất phát từ cửa sổ thuần chính chủ hoàn tất trễ, phiên vẫn có thể bị chặn nhờ MFA giả lập. Nhóm xuất riêng nguồn cửa sổ gây cảnh báo và số ca này, giữ chúng trong mẫu số; không quy thành công đó cho khả năng phát hiện hành vi của scorer. Định nghĩa chỉ số chính cần đối chiếu với phần đánh giá trước thực nghiệm người thật.

Đánh giá scorer dùng toàn bộ cửa sổ cố định, độc lập với việc replay bị kết thúc sớm. Đánh giá vận hành dùng log các quyết định và sự kiện MFA/thu hồi. Thời gian quan sát của chính chủ được cắt tại thời điểm thu hồi khi cần, tránh dùng cả thời lượng dự kiến của phiên làm mẫu số thuận lợi cho MFA/giờ.

## Hiện trạng kết quả và phạm vi kết luận

Mã đã chạy với bộ dữ liệu mô phỏng SIM01-SIM04 do thành viên 2 bàn giao. Các bảng kết quả được xuất theo từng tài khoản, cùng bảng macro và các ca không phát hiện hoặc thu hồi oan. Nhiều cấu hình chưa đạt toàn bộ ràng buộc; phần kết quả phải giữ rõ trạng thái đó.

Lần chạy sau review nằm trong `artifacts/simulation-reviewed`. Mô hình và các tham số được chọn giữ nguyên so với lần trước; các chỉ số chính không đổi. Bản sửa bổ sung phân loại nguồn cảnh báo, tách cờ validation từng người khỏi cờ toàn lựa chọn và sửa timestamp sự kiện reset. Bộ kiểm thử có 59 ca đạt; hai lần chạy độc lập cho 17 file nội dung giống từng byte. Kết quả này xác nhận các sửa đổi kỹ thuật trong phạm vi đã kiểm tra, không bổ sung bằng chứng hiệu quả trên người thật.

Chạy được pipeline và vượt kiểm thử xác nhận tính nhất quán kỹ thuật ở các trường hợp đã kiểm tra, không chứng minh hiệu quả bảo mật trên người thật. Cấu hình mô phỏng đã được dùng trong phát triển phần mềm nên không được trình bày như nghiên cứu xác nhận trên một holdout chưa từng xem. Nhóm cần thu dữ liệu thật, khóa thiết kế và đối chiếu evaluator trước khi kết luận H1-H3.

Nguồn M1–M4 cho phương pháp và M5–M9 cho tổng quan/ứng dụng được liệt kê trong `NGUON_THAM_KHAO.md`. Khi ghép cần chuyển sang hệ thống số trích dẫn chung.
