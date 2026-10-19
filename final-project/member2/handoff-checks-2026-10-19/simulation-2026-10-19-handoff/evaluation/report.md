# Kết quả chạy phần 3

Nguồn dữ liệu: **synthetic**. Đây là dữ liệu mô phỏng, không phải bằng chứng hiệu quả trên người thật.

Cấu hình đã được khóa sau fit. Đánh giá test không chọn lại tham số. P1 chỉ cá nhân hóa h1/h2; lambda và k giữ nguyên B1. P2 và ngưỡng theo ngữ cảnh/độ dài phiên chưa triển khai.

## Kết quả chính

| Scorer | Chính sách | Đạt validation (người) | Đạt test (người) | Cảnh báo chính sách, macro | TTD phím có điều kiện, macro | MFA/giờ ghi, macro | Thu hồi oan | Cảnh báo từ genuine trễ |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| distance | B0 | 0/4 | 0/4 | 0.380 | 181.250 | 12.644 | 1 | 0 |
| distance | B1 | 0/4 | 0/4 | 0.612 | 150.000 | 21.442 | 2 | 0 |
| distance | P1 | 0/4 | 0/4 | 0.572 | 150.000 | 19.109 | 2 | 0 |
| distance | B1_lambda1 | 0/4 | 0/4 | 0.616 | 150.000 | 21.442 | 2 | 0 |
| isolation_forest | B0 | 0/4 | 0/4 | 0.361 | 162.500 | 13.556 | 0 | 0 |
| isolation_forest | B1 | 0/4 | 0/4 | 0.627 | 162.500 | 15.325 | 1 | 0 |
| isolation_forest | P1 | 0/4 | 0/4 | 0.755 | 137.500 | 20.276 | 4 | 0 |
| isolation_forest | B1_lambda1 | 0/4 | 0/4 | 0.627 | 162.500 | 15.325 | 1 | 0 |

## Thu hồi trước tiếp quản: kịch bản và đoạn nguồn

Một prefix chính chủ được ghép với nhiều đoạn người lạ. Các số dưới đây là hai đơn vị đếm khác nhau; số prefix không thay thế mẫu số tỷ lệ phát hiện theo kịch bản.

| Scorer | Chính sách | Kịch bản thu hồi trước N | Prefix bị thu hồi / tổng prefix |
|---|---|---:|---:|
| distance | B0 | 0 | 0/24 |
| distance | B1 | 54 | 3/24 |
| distance | P1 | 18 | 1/24 |
| distance | B1_lambda1 | 54 | 3/24 |
| isolation_forest | B0 | 0 | 0/24 |
| isolation_forest | B1 | 0 | 0/24 |
| isolation_forest | P1 | 72 | 4/24 |
| isolation_forest | B1_lambda1 | 0 | 0/24 |

## Số yêu cầu và thời lượng G0 để đọc so sánh B1/P1

MFA/giờ dưới đây dùng thời gian recording quan sát của từng tài khoản. Thời lượng có thể ngắn khi bị thu hồi sớm; không suy ra một giờ sử dụng thật từ vài phút mô phỏng. Bảng macro phía trên lấy trung bình tỷ lệ từng người, không lấy tổng số yêu cầu chia tổng thời lượng.

| Scorer | Tài khoản | Chính sách | Yêu cầu MFA | Phút recording | MFA/giờ | Thu hồi oan | Oan khi chưa có MFA |
|---|---|---|---:|---:|---:|---:|---:|
| distance | SIM01 | B1 | 5 | 10.455 | 28.694 | 1 | 0 |
| distance | SIM01 | P1 | 5 | 10.455 | 28.694 | 1 | 0 |
| distance | SIM02 | B1 | 2 | 7.604 | 15.782 | 1 | 1 |
| distance | SIM02 | P1 | 1 | 9.303 | 6.450 | 1 | 0 |
| distance | SIM03 | B1 | 6 | 12.703 | 28.339 | 0 | 0 |
| distance | SIM03 | P1 | 6 | 12.703 | 28.339 | 0 | 0 |
| distance | SIM04 | B1 | 3 | 13.897 | 12.953 | 0 | 0 |
| distance | SIM04 | P1 | 3 | 13.897 | 12.953 | 0 | 0 |
| isolation_forest | SIM01 | B1 | 3 | 14.626 | 12.307 | 0 | 0 |
| isolation_forest | SIM01 | P1 | 5 | 10.455 | 28.694 | 1 | 0 |
| isolation_forest | SIM02 | B1 | 2 | 10.332 | 11.614 | 1 | 0 |
| isolation_forest | SIM02 | P1 | 3 | 9.303 | 19.349 | 1 | 0 |
| isolation_forest | SIM03 | B1 | 7 | 12.703 | 33.062 | 0 | 0 |
| isolation_forest | SIM03 | P1 | 7 | 12.703 | 33.062 | 0 | 0 |
| isolation_forest | SIM04 | B1 | 1 | 13.897 | 4.318 | 0 | 0 |
| isolation_forest | SIM04 | P1 | 0 | 2.480 | 0.000 | 2 | 2 |

## Cách đọc kết quả

- horizon_keys/horizon_ms trong scenario_results là theo dõi thực sự đến quyết định cuối; planned_horizon_* là giới hạn lịch cửa sổ nếu chạy hết; source_suffix_keys/source_horizon_ms là độ dài nguồn. Không dùng đuôi chưa đủ cửa sổ làm mốc kiểm duyệt. Trước N, horizon_keys=0 và horizon_ms để trống.
- Với W=50, prefix=225, suffix=300, đuôi không đủ cửa sổ có 25 phím. Đếm keydown tại thời điểm khả dụng có thể gồm thêm phím chồng; không suy horizon chỉ từ số cửa sổ.
- TTD theo phím có bước do cửa sổ và vị trí tiếp quản. Không đổi điều kiện median TTD ≤150 thành ≤125: với hai ca 125 và 175 phím, median vẫn bằng 150. Điều kiện đã khóa trong config được giữ nguyên.
- Tài khoản người lạ trong validation và test là cùng nhóm danh tính, khác phiên/ngày. Kết quả chưa chứng minh khái quát cho người lạ chưa tham gia chọn ngưỡng; nguồn tấn công dùng chung còn tạo phụ thuộc giữa các ca.
- Nếu cấu hình không đạt ràng buộc validation, lựa chọn được lưu chỉ để chẩn đoán. Không coi đó là phương án đáp ứng bài toán tối ưu.
- validation_feasible là cờ của từng người ở cấu hình đã chọn; validation_selection_feasible là cờ của toàn lựa chọn (chung nhiều người với B0/B1). Số người đạt validation đếm cờ từng người.
- detected/TTD/detection_rate đo cảnh báo đầu tiên của toàn chính sách sau t0, có thể dẫn tới chặn phiên bằng MFA. Không coi đó là chỉ số phát hiện thuần của scorer. detection_evidence=delayed_genuine_window ghi riêng cảnh báo từ cửa sổ chính chủ hoàn tất trễ; vẫn giữ ca đó trong mẫu số và báo delayed_genuine_alert_detections. mixed/impostor được ghi post_takeover_window, không khẳng định toàn bộ bằng chứng CUSUM đến từ người lạ. Định nghĩa chính thức cho nghiên cứu người thật còn cần Minh thống nhất.
- time_ms là thời điểm quyết định khả dụng theo thứ tự cửa sổ: max(source_end_ms, thời điểm quyết định trước). start_ms/source_end_ms giữ thời gian nguồn; không dùng thời gian chờ để tính lại đặc trưng. SEGMENT_RESET được ghi tại thời điểm xử lý, source_start_ms giữ mốc nguồn.
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
