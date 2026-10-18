# TÓM TẮT BA TÀI LIỆU KHOA HỌC
Võ Công Minh - Nhóm 02 - MTH042
Ngày 18/10/2026
Mỗi tài liệu tóm tắt theo năm ý trong bản phân công: bài toán, phương pháp, dữ liệu và cách đánh giá, điểm kế thừa, hạn chế. Số liệu và vị trí trích dẫn đã được đối chiếu với bản PDF. Bản văn xuôi để ghép báo cáo nằm trong tài liệu Nghiên cứu liên quan và định hướng đánh giá.

## 1. KVC-onGoing: Keystroke Verification Challenge

Nguồn: G. Stragapede và cộng sự, Pattern Recognition, tập 161, bài 111287, 2025 (trực tuyến 20/12/2024). DOI: https://doi.org/10.1016/j.patcog.2024.111287.

Bài toán: xây dựng một khuôn khổ đánh giá chung cho xác minh người dùng bằng nhịp gõ trên máy tính và thiết bị di động, để các hệ thống được so sánh trên cùng dữ liệu và cùng cách tính chỉ số.

Phương pháp: tổ chức lại dữ liệu Aalto thành các phép so sánh giữa phiên đăng ký và phiên xác minh. Điểm của một phiên xác minh là trung bình điểm so với năm phiên đăng ký. Bài báo so sánh nhiều hệ thống dự thi, trong đó LSIA là hệ thống học biểu diễn bằng mạng nơ-ron [mục 3 và 4, tr. 3-4].

Dữ liệu và đánh giá: 15.000 người ở nhánh máy tính và 5.000 người ở nhánh di động trong tập đánh giá; mỗi người có năm phiên đăng ký và mười phiên xác minh; người tham gia gõ lại câu tiếng Anh cho trước. Chỉ số gồm EER toàn cục và theo từng người, cùng các chỉ số công bằng. LSIA đạt EER 3,33% trên máy tính và 3,61% trên di động [Bảng 4, tr. 9; Bảng 5 và 6, tr. 10-11].

Điểm kế thừa: tách rõ cách tính toàn cục và theo người; mô tả đầy đủ cách dựng phép so sánh; xem EER trên tập đánh giá là chỉ số mô tả, không phải ngưỡng vận hành. Đề tài áp dụng báo cáo theo tài khoản và trung bình macro.

Hạn chế: dữ liệu thu liên tiếp trên cùng thiết bị, không có khoảng nghỉ giữa phiên nên chưa phản ánh thay đổi qua nhiều ngày; văn bản gõ lại khác với gõ tự do; không đo độ trễ phát hiện tiếp quản hay tần suất yêu cầu xác thực lại [mục 3, tr. 3; mục 8, tr. 11].

## 2. CMBSA: kết hợp nhịp gõ và dáng đi theo ngữ cảnh

Nguồn: Ayeswarya S. và John Singh K., Scientific Reports, tập 15, bài 30627, 2025. DOI: https://doi.org/10.1038/s41598-025-14833-z.

Bài toán: xác thực liên tục trên thiết bị di động sao cho vừa an toàn vừa ít làm phiền, khi điều kiện sử dụng thay đổi giữa lúc gõ và lúc di chuyển.

Phương pháp: kết hợp điểm từ nhịp gõ (lọc wavelet) và dáng đi (bộ lọc tự tương quan); trọng số của hai nguồn thay đổi theo hoạt động hiện tại của người dùng [tr. 1, 5 và 7]. Không dùng Isolation Forest.

Dữ liệu và đánh giá: bộ BB-MAS 117 người; phần nhịp gõ dùng 100 người, mỗi người 6.000 lần gõ. Hệ thống kết hợp báo cáo độ chính xác 98,25% và EER 2,35% [tr. 5, 6, 12 và 15].

Điểm kế thừa: phân biệt thích ứng theo ngữ cảnh (đổi trọng số) với thích ứng theo thời gian (cập nhật hồ sơ); cách đặt đối chứng giữa cấu hình cố định và cấu hình thay đổi theo điều kiện.

Hạn chế: chưa rõ cách chia tập, chọn ngưỡng và chọn người trong từng thí nghiệm; chú thích AUC trên ba hình ROC (0,07, 0,04 và 0,01) không khớp giá trị nêu trong văn bản (0,97, 0,995 và 0,984) [Hình 4, tr. 13; Hình 9, tr. 17; Hình 12, tr. 19]. Kết quả dùng hai nguồn tín hiệu nên không so trực tiếp được với hệ thống chỉ dùng bàn phím.

## 3. Adaptive Security Model for Data Protection Using Behavioral User Authentication

Nguồn: S. A. S. Hussien, M. S. I. Alsumaidaie, N. H. M. Ali và A. Z. Al-Zouri, Journal of Al-Qadisiyah for Computer Science and Mathematics, tập 18, số 1, tr. Comp 389-402, 2026. DOI: https://doi.org/10.29304/jqcsm.2026.18.12651.

Bài toán: phát hiện hành vi bất thường trong phiên làm việc và giữ mô hình chính xác khi hành vi bình thường của người dùng thay đổi theo thời gian.

Phương pháp: kết hợp LSTM với mạng tự mã hóa trên nhịp gõ, chuyển động chuột và tương tác ứng dụng. Mẫu không vượt ngưỡng được đưa vào bộ đệm; khi phát hiện thay đổi phân phối thì cập nhật mô hình và tính lại ngưỡng [Thuật toán 1, tr. 7].

Dữ liệu và đánh giá: 42 người, ba phiên ở các ngày khác nhau, chia 70% huấn luyện, 15% xác nhận, 15% kiểm tra [mục 5, tr. 6-7]. Bảng 3 báo F1 0,91 và tỷ lệ dương tính giả 0,05; khi có thay đổi hành vi mô phỏng, tỷ lệ dương tính giả giảm từ 0,15 xuống 0,05 nhờ thích ứng [tr. 11-12].

Điểm kế thừa: bài báo cho thấy cần đánh giá cả lợi ích và rủi ro của việc cập nhật hồ sơ. Từ đó đề tài đặt nguyên tắc riêng cho hướng P2: chấm mẫu hiện tại bằng trạng thái trước cập nhật và chỉ dùng dữ liệu mới sau khi xác thực lại.

Hạn chế: chưa nêu rõ đơn vị chia tập và thứ tự thời gian; chưa có bước xác nhận độc lập trước khi đưa mẫu vào bộ đệm, nên mẫu người lạ bị bỏ lọt có thể làm lệch hồ sơ; Bảng 6 ghi F1 0,92 và tỷ lệ dương tính giả 0,04, khác Bảng 3 mà chưa giải thích [tr. 11-12]. Tỷ lệ dương tính giả ở đây không đồng nghĩa với FAR trong xác minh sinh trắc học.
