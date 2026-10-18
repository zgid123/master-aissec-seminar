# REVIEW MÃ PHẦN MÔ HÌNH VÀ CHÍNH SÁCH (MEMBER3)
Võ Công Minh - Nhóm 02 - MTH042
Ngày 18/10/2026 - bản trao đổi trong nhóm
Phạm vi: đọc mã member3/src tại commit f16e274 (checkout d26599c) và đầu ra artifacts/simulation-reviewed. Dữ liệu là mô phỏng SIM01-SIM04, không phải người thật.

## 1. Tóm tắt

Em review phần mã của anh Vũ theo đúng phân công review chéo, chỉ đọc mã và đầu ra, không sửa mã, dữ liệu hay kết quả của anh. Các điểm R1 đến R4 trong REVIEW_VA_HUONG_DAN_DIEU_CHINH đã được xử lý theo docs/XU_LY_REVIEW.md nên bản này không nhắc lại.

Nhìn chung mã có truy vết tốt và kiểm soát rò rỉ dữ liệu cẩn thận. Em không thấy lỗi làm sai FAR, FRR hoặc EER cửa sổ cố định; các chỉ số này đã được tính lại độc lập và khớp 8/8 hàng. Các điểm dưới đây chủ yếu ảnh hưởng đến cách đếm và diễn giải TTD, ca không phát hiện, thu hồi trước tiếp quản và khả năng khái quát của kết quả.

Mỗi điểm có ghi bằng chứng từ mã hoặc từ đầu ra để anh kiểm lại. Mức ảnh hưởng là đánh giá của em, anh có thể thấy khác khi xét ý đồ thiết kế.

## 2. Phạm vi đã đọc

Đã đọc toàn bộ data.ts, fit.ts, scorers.ts, scenarios.ts, policy.ts, metrics.ts, evaluate.ts, runtime.ts, timing.ts, math.ts, cli.ts và types.ts; đối chiếu với README, REVIEW_VA_HUONG_DAN_DIEU_CHINH.md và docs/XU_LY_REVIEW.md.

Bằng chứng định lượng lấy từ evaluation/scenarios.csv, decisions.csv, events.csv, scenario_results.csv, failures.csv và fixed_windows.csv của lần chạy mô phỏng lịch sử. Script tính lại nằm tại member4/scripts/analyze-member3-failures.mjs, chỉ đọc các file này và ghi kết quả sang member4.

Chưa làm: kiểm Isolation Forest với một thư viện tham chiếu, đọc sâu io.ts và bộ test, chạy lại fit/evaluate. Lượt trước đã chạy 59/59 test phần 3 trên bản sao đổi CRLF sang LF; lượt này không chạy lại.

## 3. Những điểm nên giữ

Normalizer được tính lại từ tập train và so với file của member2 trước khi dùng, nên không thể vô tình dùng thống kê của validation hoặc test.

partitionValidation từ chối khi thiếu phiên validation độc lập thay vì chia cửa sổ để bù. Phiên calibration không được dùng lại để dựng kịch bản chọn ngưỡng.

Hàm step() chỉ nhận điểm rủi ro và trạng thái, không thấy nhãn, nguồn hay thời điểm tiếp quản. Nhãn chỉ xuất hiện ở lớp replay để đánh giá.

Kiểm hash đầu vào, mã nguồn và model ở cả fit lẫn evaluate, nên không ghép được model cũ với dữ liệu mới. Report tự ghi rõ các giới hạn, không tuyên bố xác nhận giả thuyết.

## 4. Các phát hiện

## M1. Mốc kiểm duyệt khai báo 300 phím nhưng chỉ khoảng 275 phím người lạ được chấm

Mức ảnh hưởng: trung bình.

Trong makeScenarios, chuỗi ghép có 225 phím chính chủ và 300 phím người lạ, tổng 525 phím. Vòng lặp chỉ tạo cửa sổ khi đủ 50 phím, nên có 10 cửa sổ phủ 500 phím đầu và 25 phím cuối của người lạ không bao giờ được chấm. Trong khi đó horizonKeys được gán bằng suffix.length, tức 300.

Đầu ra xác nhận điều này: mọi kịch bản A1 trong scenarios.csv có horizon_keys=300 và window_count=10. Trong 1.463 lượt không phát hiện (cộng dồn 8 tổ hợp scorer và chính sách), số phím người lạ quan sát được tại quyết định cuối chỉ là 275 hoặc 276.

Với L=150 trong config, far_session_at_L không bị ảnh hưởng. Tuy nhiên nếu dùng horizon_keys làm thời điểm kiểm duyệt cho phân tích TTD, hoặc viết rằng hệ thống đã theo dõi 300 phím mà không phát hiện, thì con số bị nói quá khoảng 25 phím.

Gợi ý: ghi thêm số phím người lạ thực sự quan sát tại quyết định cuối và dùng giá trị đó làm mốc kiểm duyệt; hoặc chọn độ dài đoạn ghép là bội số của kích thước cửa sổ. Phía bộ đánh giá member4 sẽ dùng giá trị quan sát được khi nối replay.

## M2. TTD chỉ nhận vài giá trị rời rạc nên ngưỡng 150 phím thực chất là 125 phím

Mức ảnh hưởng: trung bình, chủ yếu về diễn giải.

Vì 225 không chia hết cho 50, cửa sổ đầu tiên sau tiếp quản chứa 25 phím người lạ. Sau đó mỗi quyết định cách nhau 50 phím. Trong decisions.csv, số phím người lạ tại các quyết định sau tiếp quản chỉ là 25, 75, 125, 175, 225 và 275 (thêm một phím khi có phím chồng lấn thời gian).

Do đó ràng buộc trung vị TTD không quá 150 phím tương đương với trung vị không quá 125 phím, tức phát hiện trong ba quyết định đầu. Trung vị trên số ca chẵn có thể ra giá trị trung gian như 50,5 hoặc 150 dù không quyết định nào xảy ra ở mốc đó.

Gợi ý: ghi rõ độ phân giải TTD là 50 phím trong report, và nếu có thời gian thì thử vài vị trí tiếp quản khác nhau trong cửa sổ (ví dụ 200, 225, 240 phím) để TTD không phụ thuộc vào một vị trí cố định.

## M3. Một lần thu hồi trước tiếp quản bị đếm lặp lại theo số đoạn người lạ

Mức ảnh hưởng: trung bình.

makeScenarios ghép mọi đoạn chính chủ với mọi đoạn người lạ. Phần trước tiếp quản của các kịch bản cùng đoạn chính chủ là giống hệt nhau, nên một lần thu hồi trước tiếp quản lặp lại ở mọi kịch bản dùng đoạn đó.

Trong đầu ra, 54 ca pre_takeover_revoke của distance B1 thực chất chỉ đến từ 3 đoạn chính chủ, mỗi đoạn lặp 18 lần. Isolation Forest P1 có 72 ca đến từ 4 đoạn. Các lần thu hồi xảy ra ở cửa sổ 0 hoặc 1 của đoạn, một ca ở cửa sổ 3.

Hệ quả: số ca thất bại trong failures.csv bị phóng đại, và cả 18 kịch bản đều bị loại khỏi mẫu số tỷ lệ phát hiện, làm thay đổi tỷ trọng giữa các cặp người.

Gợi ý: báo thêm số đoạn chính chủ khác nhau bị thu hồi trước tiếp quản và xem đây là lỗi phía chính chủ; tránh cộng 54 ca như 54 sự kiện độc lập.

## M4. Phiên chính chủ có thể bị thu hồi thẳng mà chưa qua MFA

Mức ảnh hưởng: thấp đến trung bình, là lựa chọn thiết kế cần nhóm thống nhất.

Trong step(), khi điểm tích lũy vượt h2 thì thu hồi ngay, kể cả khi đang cooldown; h2 bằng 2 lần h1. Một cửa sổ có z đủ lớn có thể nhảy thẳng qua vùng MFA.

Trong revoke_traces.csv có 13 lượt thu hồi phiên G0 (cộng dồn các tổ hợp scorer và chính sách, khớp cột wrongful_revoke của failures.csv). Bốn lượt thu hồi khi chưa có yêu cầu MFA nào trước đó: distance B1 và B1_lambda1 trên phiên SIM02_D3_S1 ở cửa sổ thứ hai với z khoảng 2,6, và Isolation Forest P1 trên hai phiên SIM04 với h1=0,5 (ở cửa sổ thứ hai và thứ bảy).

Report hiện đã ghi rõ quy tắc này. Em chỉ đề nghị báo riêng số lần thu hồi chính chủ không có MFA trước đó, vì đây là lỗi gây khó chịu nhất cho người dùng thật. Nhóm có thể cân nhắc thêm một ablation về h2Ratio hoặc quy tắc chỉ thu hồi sau khi MFA thất bại.

## M5. Kẻ tấn công dùng để chọn ngưỡng cũng là kẻ tấn công trong test

Mức ảnh hưởng: trung bình, về khả năng khái quát.

Với bốn hồ sơ, mỗi tài khoản có đúng ba người lạ. Kịch bản validation lấy đoạn người lạ từ phiên tuning của ba người đó, kịch bản test lấy từ phiên test của chính ba người đó. Ngưỡng cửa sổ cũng được chọn trên các cửa sổ tuning của cùng nhóm người lạ.

Đây là thiết kế người lạ đã biết. Kết quả cho thấy mức khó rất khác nhau theo cặp: với distance B1, tỷ lệ không phát hiện từ 0% (SIM01 bị SIM03 chiếm) đến 97% (SIM03 bị SIM04 chiếm, 35/36 ca). Trung bình macro che mất sự khác biệt này.

Gợi ý: báo kết quả theo cặp tài khoản và người lạ; nếu có thời gian, thử chọn ngưỡng khi bỏ một người lạ ra rồi test trên chính người đó. Nếu không kịp thì ghi rõ trong phần giới hạn.

## M6. MFA/giờ dựa trên thời lượng rất ngắn

Mức ảnh hưởng: thấp, về diễn giải.

Mỗi tài khoản có hai phiên G0 trong test, tổng 7,6 đến 14,6 phút ghi chủ động. Một yêu cầu MFA tương đương 4,1 đến 7,9 lượt mỗi giờ. Thời lượng còn khác nhau giữa hai scorer trên cùng tài khoản vì phiên bị thu hồi sớm thì bị cắt thời lượng.

Gợi ý: khi so sánh P1 với B1, trình bày kèm số yêu cầu và thời lượng; chênh lệch vài lượt mỗi giờ có thể chỉ là một yêu cầu.

## Điểm nhỏ

Hàm windowsForProfile trong data.ts hiện không được gọi ở đâu.

Thời lượng phiên G0 lấy theo recording_seconds của cả phiên, gồm cả phần phím cuối không đủ một cửa sổ, nên MFA/giờ hơi thấp hơn so với thời gian thực sự được chấm. Mức chênh nhỏ.

Hàm wilcoxon dừng ở 20 cặp khác 0, còn evaluator member4 cho phép 50. Không ảnh hưởng với bốn tài khoản.

## 5. Điểm đã kiểm nhưng không thành phát hiện

Em đã kiểm giả thuyết cửa sổ đầu mỗi đoạn gõ có điểm bất thường cao hơn, vì các lần thu hồi trước tiếp quản đều nằm ở đầu đoạn và đoạn người lạ luôn được lấy từ đầu đoạn. Trên fixed_windows.csv, trung vị z của cửa sổ thứ nhất không cao hơn các cửa sổ sau, ở cả chính chủ và người lạ, với cả hai scorer. Vì vậy giả thuyết này không được dữ liệu mô phỏng ủng hộ. Với dữ liệu người thật vẫn nên kiểm lại vì người gõ thật thường có giai đoạn khởi động.

## 6. Thứ tự gợi ý

Đây là gợi ý để anh cân nhắc, không phải yêu cầu bắt buộc.

1. M1 và M3 vì ảnh hưởng trực tiếp đến con số trong report.
2. M2 và M6 chỉ cần thêm câu diễn giải.
3. M4 cần nhóm thống nhất quy tắc thu hồi.
4. M5 làm phân tích độ nhạy nếu kịp, nếu không thì đưa vào phần giới hạn.

Các điểm đang mở từ trước vẫn giữ nguyên: số phiên validation giữa member2 và member3, định nghĩa TTD và mẫu số MFA, FAR chính sách cho RQ2 và P2 chưa triển khai. Chi tiết ở tài liệu đối chiếu member3.

## 7. Giới hạn của review

Review chỉ đọc mã và đầu ra lịch sử, không chạy lại mô hình. Mọi con số đến từ dữ liệu mô phỏng nên chỉ dùng để chẩn đoán cách đo, không dùng để đánh giá hiệu quả trên người thật. Receipt member2 hiện tại không còn khớp với model cũ, nên khi có lần chạy mới cần kiểm lại các điểm trên.
