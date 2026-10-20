# GÓP Ý BẢN BÁO CÁO TỔNG HỢP
Võ Công Minh - Nhóm 02 - MTH042
Đối chiếu với Bao_cao_MTH042_Nhom02_updated.docx, ngày 19/10/2026

Em đã đối chiếu mục 2.4 và chương 5 với kết quả chạy lại của phần đánh giá. Bảng 13 đến Bảng 16 khớp số liệu. Có bốn chỗ em đề nghị chỉnh, xếp theo mức quan trọng; phần chữ in sau dấu hai chấm là câu đề xuất, chị cứ sửa lời cho hợp văn của báo cáo.

## 1. Mục 5.5, đoạn thứ hai: thông tin đã cũ

Đoạn này ghi chưa đối chiếu độc lập TTD và MFA/giờ. Ngày 19/10 phần đánh giá đã chạy lại độc lập toàn bộ chính sách từ điểm z trong log và khớp hoàn toàn. Đề xuất thay đoạn thứ hai bằng: Phần đánh giá cũng đã chạy lại độc lập các chính sách B0, B1, P1 và B1 với lambda bằng 1 từ điểm rủi ro trong log của lần chạy hiện hành. Kết quả khớp hoàn toàn với log gốc ở 29.183 quyết định, 7.600 sự kiện MFA và thu hồi, 3.520 kết cục kịch bản, cũng như các chỉ số tỷ lệ phát hiện, TTD, MFA/giờ và thu hồi oan theo từng tài khoản và trung bình. Phép đối chiếu này kiểm tra tính nhất quán của phần cài đặt chính sách; nó không kiểm lại bước fit scorer, cách ghép sự kiện thô hay thời lượng ghi dùng làm mẫu số MFA/giờ, và không biến kết quả mô phỏng thành bằng chứng trên người thật.

## 2. Bảng 13 và đoạn nhận xét sau Bảng 15: tỷ lệ phát hiện đang bị đẩy cao

Tỷ lệ phát hiện trong Bảng 13 đã loại các kịch bản bị thu hồi trước N khỏi mẫu số. Chính sách càng thu hồi oan nhiều thì mẫu số càng nhỏ nên tỷ lệ càng cao. Nếu tính trên toàn bộ 432 kịch bản mỗi cấu hình (lấy được trực tiếp từ Bảng 16: 432 trừ số không phát hiện và số thu hồi trước N, rồi chia 432), kết quả như sau.

L1: B0 0,380; B1 0,500; P1 0,542; B1 với lambda bằng 1 0,505. Isolation Forest: B0 0,361; B1 0,627; P1 0,613; B1 với lambda bằng 1 0,627.

Như vậy Isolation Forest P1 không còn cao nhất: tính trên toàn bộ kịch bản, P1 (0,613) thấp hơn B1 (0,627). Đề xuất thêm một cột "Tỷ lệ phát hiện trên toàn bộ kịch bản" vào Bảng 13 và ghi chú cột hiện có là "đã loại kịch bản thu hồi trước N". Câu "P1 với Isolation Forest có tỷ lệ phát hiện cao nhất trong bảng" nên sửa thành: P1 với Isolation Forest có tỷ lệ phát hiện cao nhất khi loại các kịch bản bị thu hồi trước N, nhưng tính trên toàn bộ kịch bản thì thấp hơn B1 (0,613 so với 0,627), vì 72 kịch bản bị thu hồi oan trước khi người lạ bắt đầu.

## 3. Mục 2.4 và Bảng 13: MFA/giờ hứa hai mẫu số nhưng chỉ báo một

Bảng 5 ghi MFA/giờ báo theo hai mẫu số, nhưng Bảng 13 chỉ có MFA/giờ theo thời gian ghi. Có thể thêm cột MFA/giờ theo thời gian phiên (đồng hồ), trung bình bốn tài khoản. L1: B0 10,04; B1 17,11; P1 15,15; B1 với lambda bằng 1 17,11. Isolation Forest: B0 10,46; B1 11,90; P1 16,16; B1 với lambda bằng 1 11,90. Nếu bảng đã chật thì sửa Bảng 5 thành "báo theo thời gian ghi; số theo thời gian phiên nằm trong phụ lục".

## 4. Tài liệu tham khảo: đường dẫn và DOI bị hỏng

Một số dấu gạch nối trong URL và DOI đã bị đổi thành gạch ngang dài nên link không mở được. Cần đổi lại thành dấu gạch nối thường ở: [1] (cả DOI NIST.SP.800-63B-4 và URL pages.nist.gov/800-63-4/sp800-63b), [15] (ndss-symposium.org/wp-content), [17] (cross-origin-isolated-hr-timers), [22] (DOI s00521-024-10140-2), [24] (activelock-continuous-authentication), [26] (R-manual/R-devel). Tên tác giả và tiêu đề như Vera-Rodriguez, KVC-onGoing, Z.-H. Zhou cũng nên dùng gạch nối thường.
