# Kết quả chạy phần 3

Nguồn dữ liệu: **synthetic**. Đây là dữ liệu mô phỏng, không phải bằng chứng hiệu quả trên người thật.

Cấu hình đã được khóa sau fit. Đánh giá test không chọn lại tham số. P1 chỉ cá nhân hóa h1/h2; lambda và k giữ nguyên B1. P2 và ngưỡng theo ngữ cảnh/độ dài phiên chưa triển khai.

## Kết quả chính

| Scorer | Chính sách | Đạt validation (người) | Đạt test (người) | Phát hiện macro | TTD phím có điều kiện, macro | MFA/giờ ghi, macro | Thu hồi oan |
|---|---|---:|---:|---:|---:|---:|---:|
| distance | B0 | 0/4 | 0/4 | 0.380 | 181.250 | 12.644 | 1 |
| distance | B1 | 0/4 | 0/4 | 0.612 | 150.000 | 21.442 | 2 |
| distance | P1 | 0/4 | 0/4 | 0.572 | 150.000 | 19.109 | 2 |
| distance | B1_lambda1 | 0/4 | 0/4 | 0.616 | 150.000 | 21.442 | 2 |
| isolation_forest | B0 | 0/4 | 0/4 | 0.361 | 162.500 | 13.556 | 0 |
| isolation_forest | B1 | 0/4 | 0/4 | 0.627 | 162.500 | 15.325 | 1 |
| isolation_forest | P1 | 0/4 | 0/4 | 0.755 | 137.500 | 20.276 | 4 |
| isolation_forest | B1_lambda1 | 0/4 | 0/4 | 0.627 | 162.500 | 15.325 | 1 |

## Cách đọc kết quả

- Nếu cấu hình không đạt ràng buộc validation, lựa chọn được lưu chỉ để chẩn đoán. Không coi đó là phương án đáp ứng bài toán tối ưu.
- Bộ mô phỏng này đã được chạy trong quá trình phát triển phần mềm. Dù các hàm fit không dùng test để tính tham số, lần chạy này là kiểm thử phát triển, không phải nghiên cứu xác nhận trên một holdout chưa từng xem.
- TTD chỉ tính median trên ca phát hiện. Phải đọc cùng tỷ lệ phát hiện, số kiểm duyệt và số thu hồi trước tiếp quản; không suy ra median của toàn bộ ca.
- FAR/FRR/EER nằm trong window_metrics.csv, đo trên tập cửa sổ cố định và ngưỡng chẩn đoán riêng đã chọn bằng validation. Chúng không phải FAR/FRR của máy trạng thái CUSUM.
- far_session_at_L là tỷ lệ tiếp quản chưa phát cảnh báo sau L phím, với L khóa trong config. Đây là định nghĩa vận hành được đề xuất trong phần 3, cần Minh đối chiếu trước nghiên cứu người thật. Báo riêng số ca không đủ theo dõi và thu hồi trước tiếp quản.
- RQ2 chưa được kiểm chứng ở cùng FAR chính sách. So sánh B0/B1 ở đây là mô tả dưới cùng ràng buộc TTD/tỷ lệ phát hiện; không gọi là FAR-matched.
- MFA được giả lập xác định và trả kết quả ngay: chính chủ qua, người lạ trượt. Không có trạng thái MFA_PENDING kéo dài; không đánh giá độ trễ MFA thực.
- Nếu h2 bị vượt, thu hồi ngay cả khi đang cooldown. Báo cả thu hồi oan để tránh đánh giá thuận lợi cho cấu hình kết thúc phiên sớm.
- Các cặp tấn công dùng lại phiên nguồn; không xem từng đoạn/cửa sổ là một người độc lập. Thống kê ghép cặp lấy người đích làm đơn vị, chỉ mang tính thăm dò với bốn hồ sơ mô phỏng.
- Mỗi A1 ghép prefix/suffix ở mức lần gõ và trích lại đặc trưng. Khoảng down–down tại chỗ nối được cố định trong config, cần thử độ nhạy trước khi kết luận.
- Các thông tin nguồn, thời điểm N và nhãn chỉ ở lớp mô phỏng/đánh giá. Bộ tạo điểm và step() không nhận các thông tin này.

## Các bảng bàn giao

- fixed_windows.csv
- window_metrics.csv
- roc.csv
- scenarios.csv
- decisions.csv
- events.csv
- scenario_results.csv
- policy_metrics.csv
- macro_policy_metrics.csv
- paired_statistics.csv
- failures.csv

## Giới hạn kết luận

Không tuyên bố xác nhận H1/H2/H3 từ lần chạy này. H1 chỉ có thể xem xét khi các ràng buộc vận hành đạt và độ lệch TTD được đánh giá; H2 còn thiếu định nghĩa FAR chính sách đã thống nhất; H3 chưa triển khai P2. Không dùng ngưỡng EER của test làm ngưỡng vận hành.
