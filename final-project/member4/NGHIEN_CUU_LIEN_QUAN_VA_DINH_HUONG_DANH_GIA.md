# NGHIÊN CỨU LIÊN QUAN VÀ ĐỊNH HƯỚNG ĐÁNH GIÁ
Đề tài: Xác thực liên tục thích ứng dựa trên nhịp gõ phím
Võ Công Minh, Nhóm 02, MTH042
Bản thảo ngày 18/10/2026

## 1. Các nghiên cứu liên quan

Xác thực bằng nhịp gõ phím dựa vào đặc điểm thời gian khi người dùng thao tác với bàn phím, chẳng hạn thời gian giữ phím và khoảng cách giữa các lần gõ. Tuy nhiên, phân biệt được hai người qua một đoạn gõ chưa đủ để kết luận hệ thống có thể phát hiện kịp thời khi người khác tiếp quản phiên đã đăng nhập. Bài toán thứ hai còn liên quan đến cách xử lý chuỗi quan sát, thời điểm cảnh báo và số lần chính chủ phải xác thực lại. Ba nghiên cứu dưới đây được xem xét để làm rõ sự khác biệt này và lựa chọn cách đánh giá phù hợp với đề tài.

KVC-onGoing: đánh giá xác minh nhịp gõ theo phiên

Stragapede và cộng sự xây dựng KVC-onGoing, một khuôn khổ đánh giá các hệ thống xác minh nhịp gõ trên máy tính và thiết bị di động [1]. Dữ liệu được tổ chức lại từ các bộ dữ liệu Aalto. Người tham gia đọc rồi gõ lại những câu tiếng Anh có nội dung thay đổi; vì vậy, đây không hoàn toàn là tình huống người dùng tự soạn văn bản. Tập đánh giá gồm 15.000 người ở nhánh máy tính và 5.000 người ở nhánh di động. Mỗi người có năm phiên đăng ký làm mẫu tham chiếu và mười phiên xác minh. Điểm của một phiên xác minh được lấy trung bình qua các lần đối sánh với năm phiên đăng ký [1, mục 3 và 4, tr. 3 và 4].

Nghiên cứu phân biệt cách gộp điểm của toàn bộ người dùng với cách tính chỉ số riêng cho từng người rồi lấy trung bình. Theo Bảng 4, hệ thống LSIA đạt tỷ lệ lỗi cân bằng, gọi tắt là EER, ở mức 3,33% trên máy tính và 3,61% trên thiết bị di động khi đánh giá toàn cục. EER là mức lỗi tại điểm cân bằng giữa chấp nhận nhầm người khác và từ chối nhầm chính chủ. Các kết quả trên thuộc một hệ thống học biểu diễn bằng mạng nơ-ron, không phải phương pháp khoảng cách tới trung vị hay Isolation Forest của đề tài [1, mục 6.1, tr. 4; Bảng 4, tr. 9].

Giá trị tham khảo chính của KVC-onGoing nằm ở cách mô tả dữ liệu, tổ chức phép so sánh và báo cáo kết quả theo người dùng. Việc tách người giữa tập phát triển và tập đánh giá của KVC không có nghĩa mọi bài toán xác minh đều phải dùng những người hoàn toàn khác nhau ở tập huấn luyện và tập kiểm tra. Trong đề tài này, mục tiêu là xác minh lại tài khoản đã có hồ sơ qua những phiên mới, nên cần tách phiên và kiểm soát quá trình chọn tham số. Mặt khác, ngưỡng EER tính từ điểm đánh giá chỉ có ý nghĩa mô tả, không thay thế ngưỡng vận hành được lựa chọn trước trên tập xác nhận.

Một giới hạn đáng chú ý là các câu của mỗi người được thu liên tiếp trên cùng thiết bị, không có yêu cầu về khoảng nghỉ tối thiểu. Kết quả do đó chưa cho biết hệ thống sẽ thay đổi thế nào sau nhiều ngày hoặc khi đổi bàn phím. Bài báo cũng không cung cấp phép đo độ trễ phát hiện tiếp quản hay tần suất yêu cầu xác thực lại để đối chiếu trực tiếp với mục tiêu của đề tài [1, mục 3, tr. 3; mục 5, tr. 4; mục 8, tr. 11].

Kết hợp nhịp gõ và dáng đi theo ngữ cảnh

Ayeswarya và John Singh đề xuất CMBSA, một phương pháp kết hợp điểm xác thực từ nhịp gõ và dáng đi [2]. Trọng số của hai nguồn tín hiệu thay đổi theo hoạt động và điều kiện sử dụng. Chẳng hạn, khi người dùng đang gõ, hệ thống có thể ưu tiên nhịp gõ; khi người dùng di chuyển, tín hiệu dáng đi được chú trọng hơn. Nhánh nhịp gõ sử dụng lọc wavelet, còn nhánh dáng đi sử dụng bộ lọc tự tương quan. Đây không phải nghiên cứu sử dụng Isolation Forest [2, tr. 1, 5 và 7].

Tác giả mô tả bộ dữ liệu BB-MAS gồm 117 người, đồng thời nêu riêng phần thực nghiệm nhịp gõ sử dụng 100 người, mỗi người đóng góp 6.000 lần gõ. Hệ thống kết hợp hai nguồn tín hiệu được báo cáo có độ chính xác 98,25% và EER 2,35% [2, tr. 5, 6, 12 và 15]. Những số liệu này không thể so trực tiếp với một hệ thống chỉ sử dụng nhịp gõ vì khác nhau về thông tin đầu vào và điều kiện đánh giá.

Bài báo còn một số điểm chưa rõ về cách chia tập dữ liệu, chọn ngưỡng và lựa chọn các nhóm người trong từng thí nghiệm. Đặc biệt, chú thích AUC trong ba hình ROC lần lượt là 0,07, 0,04 và 0,01, không khớp với các giá trị 0,97, 0,995 và 0,984 được nêu trong phần diễn giải. ROC là đường cong thể hiện sự đánh đổi giữa hai loại quyết định sai khi thay đổi ngưỡng; AUC là diện tích dưới đường cong đó. Các khác biệt giữa hình và văn bản khiến kết quả định lượng cần được sử dụng thận trọng [2, Hình 4, tr. 13; Hình 9, tr. 17; Hình 12, tr. 19].

Đối với đề tài, nghiên cứu này giúp phân biệt hai cách hiểu về tính thích ứng. Thay đổi trọng số giữa các nguồn tín hiệu không đồng nghĩa với cập nhật hồ sơ hành vi của một người qua thời gian. Vì chỉ sử dụng bàn phím, đề tài không kế thừa trực tiếp cơ chế kết hợp với dáng đi, mà tham khảo cách đặt đối chứng giữa cấu hình cố định và cấu hình thay đổi theo điều kiện sử dụng.

Cập nhật mô hình khi hành vi người dùng thay đổi

Hussien và cộng sự nghiên cứu mô hình kết hợp mạng LSTM với mạng tự mã hóa để phát hiện bất thường từ nhịp gõ, chuyển động chuột và tương tác ứng dụng [3]. Bài báo mô tả dữ liệu của 42 người, mỗi người có ba phiên trên các ngày khác nhau trong môi trường phần cứng được kiểm soát. Dữ liệu được chia theo tỷ lệ 70% huấn luyện, 15% xác nhận và 15% kiểm tra, nhưng chưa nêu đủ rõ đơn vị chia và thứ tự thời gian giữa các tập [3, mục 5, tr. 6 và 7; mục 8, tr. 10].

Trong thuật toán được trình bày, mỗi cửa sổ được chấm điểm bất thường rồi so với ngưỡng hiện hành. Mẫu không vượt ngưỡng được đưa vào bộ đệm để phục vụ cập nhật. Khi phát hiện thay đổi trong phân phối hành vi, mô hình được điều chỉnh và ngưỡng được tính lại. Cơ chế này khác với việc tích lũy điểm bằng CUSUM trong đề tài. Bài báo cũng chưa mô tả một bước xác nhận độc lập cho từng mẫu trước khi dùng mẫu đó để cập nhật hồ sơ [3, Thuật toán 1, tr. 7; mục 7, tr. 10].

Bảng 3 báo cáo mô hình kết hợp đạt F1 bằng 0,91 và tỷ lệ dương tính giả bằng 0,05. Trong thí nghiệm có thay đổi hành vi mô phỏng, Bảng 4 ghi tỷ lệ dương tính giả giảm từ 0,15 xuống 0,05 khi có thích ứng. Tuy nhiên, hàng mô hình đề xuất ở Bảng 6 lại có F1 bằng 0,92 và tỷ lệ dương tính giả bằng 0,04 mà chưa giải thích đầy đủ sự khác biệt về điều kiện đánh giá [3, tr. 11 và 12]. Tỷ lệ dương tính giả trong bài phản ánh việc báo bất thường đối với hành vi bình thường, không được mặc nhiên xem là tỷ lệ chấp nhận nhầm người lạ trong xác minh sinh trắc học.

Nghiên cứu cho thấy cần đánh giá cả lợi ích và nguy cơ của việc cập nhật hồ sơ. Một mẫu người lạ bị bỏ lọt có thể được đưa vào bộ đệm nếu hệ thống chỉ dựa vào quyết định của chính nó. Đây là nguy cơ cần kiểm tra, chưa phải kết quả chứng minh hồ sơ đã bị làm sai lệch trong thí nghiệm của tác giả. Đối với đề tài, nội dung này là cơ sở để đặt yêu cầu xác thực lại trước khi chấp nhận dữ liệu cập nhật, không phải bằng chứng rằng cơ chế cập nhật sau xác thực đa yếu tố đã được kiểm chứng.

## 2. Vận dụng vào thiết kế đánh giá

Từ ba nghiên cứu, đề tài tách việc đánh giá bộ tính điểm khỏi việc đánh giá chính sách cảnh báo. Bộ tính điểm trả lời một đoạn gõ giống hay khác hồ sơ tài khoản đến mức nào. Chính sách cảnh báo quyết định khi nào tiếp tục quan sát, yêu cầu xác thực lại hoặc thu hồi phiên. Một bộ tính điểm có EER thấp chưa chắc tạo ra chính sách ít làm phiền người dùng hoặc phát hiện tiếp quản nhanh.

Ở mức cửa sổ, các chỉ số gồm tỷ lệ chấp nhận nhầm người lạ (FAR), tỷ lệ từ chối nhầm chính chủ (FRR) và EER. Ngưỡng vận hành được chọn trên tập xác nhận rồi giữ nguyên khi đánh giá tập kiểm tra. EER trên tập kiểm tra chỉ dùng để mô tả khả năng phân biệt của bộ tính điểm. Bảng kết quả cần thể hiện từng tài khoản và giá trị trung bình theo tài khoản, tránh để số cửa sổ nhiều hơn của một người lấn át kết quả chung.

Ở mức phiên, kịch bản chính gồm một đoạn chính chủ nối với đoạn của người khác tại thời điểm tiếp quản đã biết đối với bộ đánh giá. Các chính sách B0, B1 và P1 được so sánh trên cùng nguồn dữ liệu và cùng điều kiện quan sát. B0 quyết định theo từng cửa sổ; B1 tích lũy điểm bằng CUSUM có hệ số quên và ngưỡng chung; P1 sử dụng ngưỡng theo tài khoản. Khả năng cải thiện của B1 hoặc P1 so với B0 là giả thuyết cần kiểm tra, không phải kết luận được suy ra từ các tài liệu trên.

Các chỉ số theo phiên gồm độ trễ phát hiện tính bằng số phím và thời gian, tỷ lệ phát hiện trong khoảng theo dõi đã định trước, tần suất yêu cầu xác thực lại và số trường hợp thu hồi nhầm phiên chính chủ. Trường hợp không phát hiện trong khoảng theo dõi phải được báo riêng, không gán độ trễ bằng không. Nếu chỉ báo trung vị độ trễ của những trường hợp đã phát hiện, bảng cần ghi rõ phạm vi này và kèm số trường hợp chưa phát hiện.

Để kiểm soát rò rỉ dữ liệu, mọi cửa sổ được trích từ cùng một phiên phải thuộc cùng tập. Hồ sơ tài khoản và tham số chuẩn hóa được xây dựng từ dữ liệu huấn luyện của tài khoản đó. Khi dữ liệu của người B được dùng để kiểm tra tài khoản A, phải áp dụng chuẩn hóa của A. Việc hiệu chuẩn điểm và chọn ngưỡng cần có các phiên xác nhận độc lập phù hợp với quy trình mô hình; không chia một phiên thành nhiều phần rồi coi đó là các phiên độc lập.

Nếu bổ sung thử nghiệm cập nhật hồ sơ, mẫu hiện tại phải được đánh giá bằng trạng thái trước cập nhật. Chỉ sau khi đáp ứng điều kiện xác nhận đã quy định, dữ liệu mới được dùng để thay đổi hồ sơ cho những quan sát tiếp theo. Trong thiết kế của đề tài, P2 là hướng cập nhật sau xác thực đa yếu tố (MFA), chưa được triển khai hoặc đánh giá. Vì vậy, báo cáo không trình bày kết quả của P2 như một phần đã hoàn thành.

## 3. Phạm vi kết luận

Ba nghiên cứu được sử dụng để lựa chọn câu hỏi đánh giá và nhận diện những điểm cần kiểm soát, không để thay thế kết quả thực nghiệm của nhóm. Khác biệt về loại văn bản, thiết bị, số người, cách chia dữ liệu và nguồn tín hiệu không cho phép xếp hạng trực tiếp các hệ thống chỉ từ EER hoặc độ chính xác được công bố.

Tại thời điểm biên soạn, kết quả đối chiếu của nhóm vẫn dựa trên dữ liệu mô phỏng; các lượt kiểm công cụ do AI vận hành không được tính là người tham gia thật. Kết quả này có thể dùng để kiểm công thức và khả năng kết nối các thành phần, nhưng chưa đủ để kết luận về hiệu quả xác thực trên người thật, tính ổn định qua nhiều ngày hoặc mức độ làm phiền trong sử dụng thực tế. Những kết luận đó chỉ được bổ sung khi có dữ liệu và phép đo tương ứng.

## Tài liệu tham khảo

[1] G. Stragapede và cộng sự (2025), “KVC-onGoing: Keystroke Verification Challenge”, Pattern Recognition, tập 161, bài 111287. Công bố trực tuyến ngày 20/12/2024. DOI: https://doi.org/10.1016/j.patcog.2024.111287.

[2] Ayeswarya S. và John Singh K. (2025), “Enhancing security and usability with context aware multi-biometric fusion for continuous user authentication”, Scientific Reports, tập 15, bài 30627. DOI: https://doi.org/10.1038/s41598-025-14833-z.

[3] S. A. S. Hussien, M. S. I. Alsumaidaie, N. H. M. Ali và A. Z. Al-Zouri (2026), “Adaptive Security Model for Data Protection Using Behavioral User Authentication”, Journal of Al-Qadisiyah for Computer Science and Mathematics, tập 18, số 1, tr. Comp 389-402. DOI: https://doi.org/10.29304/jqcsm.2026.18.12651.
