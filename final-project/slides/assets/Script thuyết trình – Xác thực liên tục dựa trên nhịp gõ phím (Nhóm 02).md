# Script thuyết trình: Xác thực liên tục thích ứng dựa trên nhịp gõ phím

## Script

### Slide 1 · Mở đầu

Kính chào các thầy cô và các bạn. Nhóm 02 xin trình bày đề tài xác thực liên tục thích ứng dựa trên nhịp gõ phím, nhằm phát hiện việc ai đó tiếp quản phiên sau khi người dùng đã qua xác thực đa yếu tố, gọi tắt là MFA.&#32;

### Slide 2 · Mục lục&#32;

Bài trình bày gồm năm phần.&#32;

## Phần 1 · Bối cảnh và bài toán

### Slide 4 · Khoảng hở sau MFA

Chúng ta bắt đầu từ một khoảng hở. MFA chỉ kiểm tra người dùng đúng một lần, lúc đăng nhập.

Ví dụ: 9 giờ sáng người dùng đăng nhập và qua MFA; 13 giờ 20, một người khác ngồi vào máy đang mở, hoặc lấy được cookie phiên. Máy chủ vẫn thấy một phiên hợp lệ, vì ở mỗi yêu cầu nó chỉ kiểm tra cookie.

Vậy cookie phiên chứa gì? Chỉ là một mã định danh phiên, ngẫu nhiên và khó đoán. Nó không chứa nhịp gõ, và không cho máy chủ biết ai đang gõ. Các thuộc tính như Secure hay HttpOnly chỉ là cấu hình cách gửi cookie, không phải dữ liệu bên trong. Vì vậy ai nắm giữ cookie thì dùng được phiên.

▸ Theo NIST, tức Viện Tiêu chuẩn và Công nghệ Hoa Kỳ, giám sát phiên chỉ là biện pháp tùy chọn; chỉ xác thực lại định kỳ là bắt buộc. Nên giữa hai lần xác thực lại vẫn còn khoảng hở. Khi nghi vấn, hệ thống nên hỏi lại MFA hoặc thu hồi phiên. Đề tài nhắm vào đúng khoảng hở này.

### Slide 5 · Xác thực liên tục: định nghĩa bài toán và ứng dụng thực tế&#32;

Giải pháp là xác thực liên tục: đánh giá thêm tín hiệu ngay trong lúc phiên diễn ra. Chúng em định nghĩa bài toán như sau. Đầu vào là dòng sự kiện nhấn và nhả phím của phiên; hệ thống không lưu ký tự. Cứ mỗi 50 phím, hệ thống chấm một điểm bất thường so với hồ sơ của chủ tài khoản, cộng dồn bằng chứng, rồi chọn một trong ba hành động: tiếp tục, hỏi lại MFA, hoặc thu hồi phiên.

Mục tiêu gồm hai vế mâu thuẫn nhau. Một là phát hiện người lạ sớm, đo bằng TTD, tức thời gian đến lúc phát hiện, tính theo số phím kể từ lúc đổi người. Hai là ít làm phiền chủ thật, đo bằng số lần hỏi MFA mỗi giờ. Đây là xác minh một-một: trả lời câu hỏi “có đúng chủ không”, chứ không phải “đây là ai”.

Ngoài thực tế đã có sản phẩm thương mại như TypingDNA ActiveLock, theo dõi cách gõ để khóa máy hoặc cảnh báo. Tuy vậy, đó là mô tả của nhà cung cấp, và sản phẩm còn dùng thêm tín hiệu khác, nên không tương đương hệ thống của nhóm.

### Slide 6 · Vì sao chọn nhịp gõ&#32;

Vì sao chọn nhịp gõ? Nếu không dùng nhịp gõ, người ta thường dùng ba biện pháp, và mỗi biện pháp đều có chỗ hở. Hết hạn phiên: giới hạn thời gian, nhưng kẻ lạ cứ thao tác thì vẫn giữ được phiên. Xác thực lại định kỳ: có điểm kiểm tra rõ ràng, nhưng gây gián đoạn và vẫn còn khoảng hở giữa hai lần. Giám sát IP, thiết bị: thêm tín hiệu rủi ro, nhưng nếu kẻ lạ dùng chính máy đang mở thì các tín hiệu này không đổi.

Nhịp gõ lấp đúng chỗ đó, vì mỗi người gõ một kiểu: dữ liệu 136 triệu lần nhấn phím của 168 nghìn người cho thấy sự đa dạng này. Ưu điểm lớn nhất là thu thụ động bằng bàn phím sẵn có, có bằng chứng ngay khi người ta gõ. Nhược điểm lớn nhất là không gõ thì không có bằng chứng. Vì vậy nhịp gõ là lớp bổ sung, không thay thế MFA.

### Slide 7 · Nghiên cứu liên quan

Về các công trình liên quan, chúng em xếp theo bốn hướng, và đã bổ sung các công trình đến năm 2025. Xét theo dữ liệu đầu vào, có văn bản cố định, bán cố định và văn bản tự do; văn bản tự do cho phép xác thực liên tục ngay lúc người dùng gõ.

Hướng thứ nhất là thống kê và khoảng cách, như Gunetti 2005, Killourhy và Maxion 2009. Hướng này dùng đặc trưng thời gian như giữ phím và khoảng nghỉ; đơn giản, dễ giải thích, chỉ cần mẫu của chính chủ, nhưng ngưỡng mỗi người một khác. Chúng em chọn hướng này làm bộ chấm điểm: khoảng cách L1 và Isolation Forest.

▸ Hướng thứ hai là xác thực liên tục, như Bours 2012, Kiyani 2020: ra quyết định theo thời gian. Đây là hướng gần bài toán nhất, và chúng em lấy CUSUM làm chính sách.

▸ Hướng thứ ba là học sâu, như TypeNet 2021 và TypeFormer 2024: học trực tiếp từ chuỗi phím, nhưng cần nhiều dữ liệu, khó giải thích, khác miền thiết bị và chỉ đo xác minh. Nên chúng em chưa tái hiện, và có thể thay vào làm bộ chấm điểm về sau.

▸ Hướng cuối là benchmark KVC-onGoing 2025, hơn 185 nghìn người, nhưng cũng chỉ đo xác minh, không đo việc đổi người giữa phiên.

Khoảng trống chung: các công trình thường báo cáo tỷ lệ chấp nhận sai, tỷ lệ từ chối sai và tỷ lệ lỗi cân bằng, gọi tắt là FAR, FRR, EER. Các chỉ số này không cho biết cần bao nhiêu phím để phát hiện. Vì vậy chúng em đo thêm TTD và số lần hỏi MFA mỗi giờ.

### Slide 8 · Mô hình đe dọa

Về mô hình đe dọa: kẻ tấn công đã có phiên hợp lệ, do ngồi vào máy đang mở hoặc có cookie. Chúng em xét bốn kịch bản và mới đo kịch bản A1, tức người lạ gõ theo thói quen của mình. Biết nội dung cần gõ, luyện bắt chước nhịp gõ, hay ghi lại rồi phát lại gói dữ liệu thì chưa đo. Hậu quả có hai chiều: kẻ lạ lọt qua, hoặc chủ thật bị làm phiền và bị thu hồi oan. N là phím đầu tiên của người lạ, và TTD luôn tính từ N.

### Slide 9 · Câu hỏi nghiên cứu

Từ đó chúng em đặt ba câu hỏi.&#32;

Một: ngưỡng riêng từng người có giúp chủ thật ít bị hỏi MFA hơn không.&#32;

Hai: cộng dồn bằng chứng có bắt người lạ tốt hơn xét từng đoạn riêng không.&#32;

Ba: cập nhật hồ sơ sau MFA có giảm từ chối nhầm không.

▸ Kết quả mới ở mức bước đầu. Câu một chưa kết luận, vì hai bộ chấm điểm cho chiều ngược nhau.&#32;

Câu hai có gợi ý: với Isolation Forest, phát hiện tăng từ 0,36 lên 0,63, nhưng chưa ghép cùng mức MFA.&#32;

Câu ba chưa thực hiện.

## Phần 2 · Phương pháp và kiến trúc

### Slide 11 · Kiến trúc hệ thống

Hệ thống gồm năm khối: thu phím, cắt cửa sổ 50 phím và trích 12 đặc trưng, chấm điểm lạ, cộng dồn bằng CUSUM, rồi quyết định. Mọi cấu hình dùng chung một đường xử lý nên so sánh công bằng. Chúng em đã làm bộ thu thập, đặc trưng, hai bộ chấm điểm, bốn cấu hình và bộ đối chiếu.

▸ Chưa làm: lớp truyền chống phát lại, gồm TLS là giao thức mã hóa kênh truyền, cùng số thứ tự và nonce tức mã dùng một lần; MFA thời gian thực; và chạy trực tiếp từ đầu đến cuối. Thực nghiệm hiện chạy ngoại tuyến, phát lại dữ liệu đã lưu.

### Slide 12 · Đặc trưng nhịp gõ

Mỗi phím cho hai thời điểm: nhấn và nhả. Từ đó có thời gian giữ phím, là nhả trừ nhấn của cùng một phím; và khoảng nghỉ, là nhấn phím kế trừ nhả phím trước. Khoảng nghỉ có thể âm khi người dùng gõ chồng phím, và chúng em giữ nguyên giá trị âm. Mỗi 50 phím tạo một cửa sổ với 12 đặc trưng về giữ phím, khoảng nghỉ, tốc độ, sửa lỗi và độ biến động, chuẩn hóa theo từng người bằng trung vị và MAD, tức độ lệch tuyệt đối trung vị. Hệ thống chỉ ghi nhóm phím và thời điểm, không bao giờ ghi ký tự.

### Slide 13 · Cộng dồn bằng chứng, CUSUM

Mỗi cửa sổ cho một điểm lạ, được đổi thành điểm z theo từng người. Rồi CUSUM, nghĩa là tổng tích lũy, cộng dồn bằng chứng: S mới bằng λ nhân S cũ, cộng z, trừ k, và không để âm. Hệ số λ nhỏ hơn 1 làm bằng chứng cũ phai dần.

Xin xem ví dụ minh họa, không phải kết quả thực nghiệm. Ba cửa sổ liên tiếp đều có z bằng 3, ngưỡng là 6. Xét riêng từng cửa sổ thì không cửa sổ nào vượt ngưỡng, nên bỏ lọt. Nhưng cộng dồn thì S lần lượt là 2,5; 4,75; rồi 6,775, vượt ngưỡng ở cửa sổ thứ ba, và hệ thống hỏi MFA.

### Slide 14 · Bộ điều khiển phiên

Bộ điều khiển phiên có ba trạng thái. S dưới ngưỡng h1 thì phiên tiếp tục. Từ h1 đến h2 thì hỏi MFA: đạt thì quay lại và đặt S về 0, trượt thì thu hồi. Từ h2 trở lên thì thu hồi ngay.

▸ Bốn cấu hình so sánh: B0 xét từng cửa sổ; B1 cộng dồn với ngưỡng chung; P1 cộng dồn với ngưỡng riêng từng người; P2 thêm cập nhật hồ sơ sau MFA, nhưng chưa làm. Tham số chọn trên tập validation; tập test chỉ chấm sau khi khóa cấu hình.

### Slide 15 · Nguồn công thức và tham số

Về nguồn công thức và tham số, chúng em tách rõ phần lấy từ công trình có sẵn và phần nhóm tự thiết kế. Trung vị và MAD với hệ số 1,4826 lấy từ tài liệu của R Core Team. CUSUM chuẩn, ứng với λ bằng 1, lấy từ sổ tay NIST/SEMATECH. Isolation Forest theo Liu, Ting và Zhou 2008, nhóm tự cài đặt theo đặc tả. Baseline L1 theo quy trình của Killourhy và Maxion 2009. Ý tưởng hai ngưỡng lấy từ Kiyani 2020.

Phần nhóm tự đề xuất gồm: hệ số quên λ nhỏ hơn 1; h2 bằng hai lần h1; cooldown, tức khoảng tạm ngừng cảnh báo hai cửa sổ sau khi MFA thành công; cùng cửa sổ 50 phím và các hằng số của kịch bản. Chỉ λ, k và h được chọn trên validation; còn lại là hằng số thiết kế, không thuộc bài báo nào.

## Phần 3 · Thực nghiệm và kết quả

### Slide 17 · Dữ liệu và quy trình

Dữ liệu là bốn hồ sơ mô phỏng, gồm 24 phiên và 28.800 lần gõ, nên kết quả chỉ dùng để kiểm tra quy trình. Chúng em chia theo ngày để tránh rò rỉ: ngày một huấn luyện, ngày hai chọn tham số và ngưỡng, ngày ba kiểm thử.

▸ Mỗi kịch bản nối 225 phím của chủ thật với 300 phím của người lạ; mỗi cấu hình chạy 432 kịch bản. Mô hình không biết điểm đổi người N; N chỉ dùng để chấm.

### Slide 18 · Chỉ số đánh giá

Chúng em đo hai chiều ngược nhau. Bắt người lạ: tỷ lệ phát hiện, median tức trung vị của TTD, và tỷ lệ phát hiện trong 150 phím. Không làm phiền chủ thật: số lần MFA mỗi giờ và số lần thu hồi oan. Có một bẫy về mẫu số: nếu loại các ca đã bị thu hồi trước khi người lạ gõ, tỷ lệ phát hiện của Isolation Forest với P1 là 0,755; tính đủ 432 kịch bản thì chỉ còn 0,613. Vì vậy chúng em luôn báo cả hai cách tính.

▸ Cấu hình chỉ đạt khi thỏa cả bốn ràng buộc, đặt trước khi chạy: phát hiện từ 80% trở lên, median TTD không quá 150 phím, chưa cảnh báo tại 150 phím không quá 15%, và không thu hồi oan. Còn FAR, FRR, EER ở đây chỉ là chỉ số chẩn đoán ở mức cửa sổ.

### Slide 19 · Kết quả chẩn đoán

Đây là kết quả chẩn đoán trên tập test, dữ liệu mô phỏng. Từ xét từng cửa sổ B0 sang cộng dồn B1, tỷ lệ phát hiện tăng: Isolation Forest từ 0,361 lên 0,627, L1 từ 0,380 lên 0,500. Nhưng số lần hỏi MFA mỗi giờ cũng tăng: Isolation Forest từ 13,6 lên 15,3; L1 từ 12,6 lên 21,4. P1 với Isolation Forest có TTD thấp nhất, 137,5 phím, nhưng thu hồi nhầm 72 kịch bản trước khi người lạ gõ, và 4 lần thu hồi oan trên phiên chủ thật.

▸ Không cấu hình nào đạt ràng buộc trên validation, nên chúng em không kết luận chính sách nào tốt hơn. Kết quả cho thấy sự đánh đổi, chưa chứng minh hiệu quả.

## Phần 4 · Demo

### Slide 21 · Thu thập nhịp gõ (≈0:25)

Demo một: công cụ thu thập. Chúng em mở ở chế độ pilot, gõ một đoạn ngắn, thử sửa bằng Backspace và thử dán. Thao tác dán bị chặn, và khi nhấp ra ngoài vùng gõ thì phiên ngắt đoạn. File JSON xuất ra chỉ chứa loại phím và thời điểm, không có ký tự nào.

### Slide 22 · Phát lại kịch bản tiếp quản (≈0:40)

Demo hai: phát lại kịch bản tiếp quản, dùng Isolation Forest và hồ sơ SIM01. Cùng 225 phím của chủ thật, ghép với hai người lạ khác nhau. Ca một: người lạ gõ khá giống chủ, nên cả hai chính sách đều bỏ sót, hết 275 phím vẫn chưa vượt h1. Ca hai: ngưỡng riêng P1 phát hiện ở 125 phím, hỏi MFA và người lạ trượt; ngưỡng chung B1 phải đến 225 phím, muộn hơn chân trời 150.

▸ Nhưng ngưỡng thấp cũng làm chủ thật dễ bị hỏi MFA oan. Đó chính là đánh đổi trong bảng kết quả.

### Slide 23 · Đối chiếu kết quả (≈0:20)

Demo ba: để chắc các con số tính đúng, bộ đối chiếu do một thành viên khác viết độc lập đã chấm lại toàn bộ log. Sáu trên sáu nhóm kiểm tra đều khớp, gồm 29.183 quyết định, 7.600 sự kiện MFA và thu hồi, và 3.520 kết cục; ▸ cùng 8 trên 8 cặp chỉ số FAR, FRR, EER. Đây là kiểm tra tính nhất quán của phép tính, chưa nói gì về hiệu quả với người thật.

## Phần 5 · Giới hạn và kết luận

### Slide 25 · Giới hạn (≈0:35)

Về giới hạn. Một: dữ liệu là mô phỏng, chưa phản ánh độ biến động của người thật; và chúng em mới đo một kiểu tấn công là A1, với kẻ tấn công ghép offline.

▸ Hai: MFA là mô phỏng lý tưởng, chủ luôn qua, kẻ lạ luôn trượt. Ba: các cấu hình hỏi MFA với tần suất khác nhau nên chưa so được ở cùng mức đánh đổi; kết luận mới dừng ở bước đầu.

▸ Chưa làm: hệ thống chạy trực tiếp, chống phát lại trên mạng, P2 và One-Class SVM, tức SVM một lớp.

### Slide 26 · Kết luận và hướng phát triển (≈0:35)

Tóm lại có ba điều. Một: khoảng hở sau MFA là có thật, và nhịp gõ là tín hiệu bổ sung thụ động, không thay thế MFA. Hai: trong mô phỏng, cộng dồn tăng phát hiện nhưng kèm nhiều lần hỏi MFA hơn; đây là một đánh đổi, chưa phải kết luận tối ưu.

▸ Ba: đóng góp chính là quy trình đánh giá có thể kiểm lại độc lập, sẵn sàng chạy trên dữ liệu thật.

▸ Bước tiếp theo: thu dữ liệu thật của 20 người, mỗi người 5 phiên; ghép hệ thống chạy trực tiếp với lớp chống phát lại; và triển khai P2.

### Slide 29 · Kết (≈0:10)

Chúng em xin cảm ơn thầy cô và các bạn đã lắng nghe. Nhóm xin sẵn sàng nhận câu hỏi và góp ý.

## Câu hỏi dự kiến, trả lời ngắn

**1. Có hệ thống thực tế nào đang dùng phương pháp này không?** Có sản phẩm thương mại, ví dụ TypingDNA ActiveLock. Chúng em chỉ dẫn mô tả của nhà cung cấp, chưa có đánh giá độc lập, và sản phẩm còn dùng thêm tín hiệu khác. Nhóm chưa khảo sát đầy đủ các sản phẩm khác.

**2. Nếu kẻ tấn công lấy được cookie thì sao?** Cookie chỉ là mã phiên, nên ai có cookie thì dùng được phiên. Nhưng kẻ đó vẫn phải gõ, và nhịp gõ độc lập với cookie; đó là lớp phát hiện của đề tài. Nếu kẻ đó không gõ thì hệ thống không có bằng chứng. Đây là nhược điểm lớn nhất, nên cần kết hợp hết hạn phiên và xác thực lại định kỳ.

**3. Vì sao không dùng học sâu?** Học sâu cần nhiều dữ liệu và khó giải thích, trong khi thiết kế của nhóm chỉ có khoảng 5 phiên mỗi người. Các công trình học sâu đo xác minh, chưa đo TTD khi đổi người giữa phiên. Bộ chấm điểm tách khỏi chính sách nên sau này thay được; nhóm không kết luận L1 hay Isolation Forest tốt hơn học sâu.

**4. Hệ số quên λ nhỏ hơn 1 có phải điểm mới không?** Chúng em không khẳng định là mới; đây là biến thể cấu hình, so với λ bằng 1 có chọn lại k và ngưỡng trên validation. Trong mô phỏng, B1 và B1 với λ bằng 1 gần như trùng nhau: Isolation Forest giống hệt, L1 phát hiện 0,500 so với 0,505. Nên chưa thấy lợi ích rõ.

**5. Dữ liệu mô phỏng thì kết quả có ý nghĩa gì?** Nó kiểm tra quy trình đo, không chứng minh hiệu quả. Ràng buộc được đặt trước, 0 trên 4 hồ sơ đạt, nên chúng em không kết luận. Bước kế tiếp là thu dữ liệu thật của 20 người, mỗi người 5 phiên.

**6. Kẻ tấn công luyện bắt chước nhịp gõ thì sao?** Kịch bản A3 chưa đo. Nghiên cứu của Tey và cộng sự trên mật khẩu cố định cho thấy FAR tăng từ khoảng 0,2 lên 0,4 đến 0,6 sau khi kẻ tấn công luyện tập và biết một phần mẫu, và lên 0,99 với nhóm giỏi nhất khi biết đầy đủ mẫu. Nhóm chưa có căn cứ cho văn bản tự do nên nêu đây là giới hạn.
