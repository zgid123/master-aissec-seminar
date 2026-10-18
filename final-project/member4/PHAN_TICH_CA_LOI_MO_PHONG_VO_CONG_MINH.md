# PHÂN TÍCH CA LỖI TRÊN LẦN CHẠY MÔ PHỎNG
Võ Công Minh - Nhóm 02 - MTH042
Ngày 18/10/2026 - bản trao đổi trong nhóm
Nguồn: member3/artifacts/simulation-reviewed/evaluation, dữ liệu mô phỏng SIM01-SIM04. Đây là phân tích chẩn đoán, không phải kết quả nghiên cứu trên người thật.

## 1. Mục đích và phạm vi

Phân tích lỗi nhằm trả lời câu hỏi hệ thống sai ở đâu và vì sao, thay vì chỉ đọc các chỉ số trung bình. Bản này dùng đầu ra replay có sẵn của phần 3, phân loại các ca không phát hiện, phát hiện muộn và thu hồi sai, rồi truy ngược về điểm rủi ro của từng cửa sổ.

Mọi con số đến từ một lần chạy mô phỏng lịch sử với bốn hồ sơ tổng hợp. Lần chạy này gắn với receipt member2 cũ, hiện không còn khớp dữ liệu mới. Vì vậy kết quả chỉ dùng để hiểu cách hệ thống và cách đo vận hành, không dùng để kết luận H1, H2 hoặc H3.

Mỗi tổ hợp scorer và chính sách có 432 kịch bản tiếp quản A1 (4 tài khoản, mỗi tài khoản 108 cặp đoạn) và 8 phiên chính chủ G0. Các kịch bản dùng lại cùng phiên nguồn nên không phải 432 quan sát độc lập.

## 2. Tổng quan các loại lỗi

Không phát hiện là ca tiếp quản không có cảnh báo nào trong phần được chấm. Phát hiện muộn là ca có cảnh báo nhưng sau hơn 150 phím người lạ. Thu hồi trước tiếp quản là phiên bị đóng khi người gõ vẫn là chính chủ. Thu hồi oan là phiên G0 bị đóng.

distance B0: 268 không phát hiện, 79 phát hiện muộn, 0 thu hồi trước tiếp quản, 1 thu hồi oan.
distance B1: 162 không phát hiện, 98 phát hiện muộn, 54 thu hồi trước tiếp quản, 2 thu hồi oan.
distance P1: 180 không phát hiện, 102 phát hiện muộn, 18 thu hồi trước tiếp quản, 2 thu hồi oan.
isolation_forest B0: 276 không phát hiện, 97 phát hiện muộn, 0 thu hồi trước tiếp quản, 0 thu hồi oan.
isolation_forest B1: 161 không phát hiện, 122 phát hiện muộn, 0 thu hồi trước tiếp quản, 1 thu hồi oan.
isolation_forest P1: 95 không phát hiện, 86 phát hiện muộn, 72 thu hồi trước tiếp quản, 4 thu hồi oan.

B1_lambda1 gần như trùng B1 nên không liệt kê riêng; số liệu đầy đủ ở failure_counts.csv.

So với B0, chính sách tích lũy B1 giảm số ca không phát hiện khoảng 40%, nhưng với distance lại phát sinh thu hồi trước tiếp quản. P1 của Isolation Forest có ít ca bỏ lọt nhất nhưng nhiều thu hồi sai nhất. Đây là đánh đổi quen thuộc giữa bắt kẻ lạ nhanh và làm phiền chính chủ, không phải bằng chứng chính sách nào tốt hơn trên người thật.

## 3. Ca không phát hiện: thiếu ngưỡng hay thiếu khả năng phân biệt

Với mỗi ca không phát hiện, em lấy điểm tích lũy lớn nhất sau tiếp quản và so với ngưỡng h1. Nếu điểm đạt từ 80% h1 trở lên thì xem là suýt phát hiện; dưới 50% h1 thì xem là bỏ lọt xa.

Với distance B1, 130 trên 162 ca là bỏ lọt xa và chỉ 11 ca suýt phát hiện. Nghĩa là hạ ngưỡng một chút không cứu được phần lớn ca, vấn đề nằm ở chỗ điểm của người lạ không cao hơn điểm chính chủ.

Với Isolation Forest B0, 96 trên 276 ca là suýt phát hiện và 85 ca bỏ lọt xa. Nhóm này nhạy với ngưỡng hơn, nên thay đổi ngưỡng sẽ đổi kết quả đáng kể và phải đi kèm kiểm soát làm phiền chính chủ.

Bảng tách biệt trên tập cửa sổ cố định củng cố nhận định này. Với các cửa sổ từ vị trí thứ tư trở đi của mỗi đoạn, trung vị z của chính chủ khoảng 0,05 đến 0,09, của người lạ khoảng 0,41 đến 0,42. Tỷ lệ cửa sổ có z từ 2 trở lên là 7% đến 8% với chính chủ và 14% đến 16% với người lạ. Hai phân phối chồng lấn rất nhiều, phù hợp với EER cửa sổ khoảng 0,44 đã đối chiếu trước đó.

## 4. Lỗi phụ thuộc mạnh vào cặp tài khoản và người lạ

Khi tách theo cặp, tỷ lệ không phát hiện của distance B1 dao động từ 0% đến 97%. Ví dụ tài khoản SIM01 bị SIM03 chiếm thì không bỏ lọt ca nào, còn SIM03 bị SIM04 chiếm thì bỏ lọt 35 trên 36 ca. Isolation Forest B1 dao động từ 0% đến 67%.

Như vậy một vài cặp có nhịp gõ mô phỏng gần nhau chiếm phần lớn ca bỏ lọt. Trung bình macro theo bốn tài khoản che mất điều này. Khi trình bày, nên kèm bảng theo cặp hoặc ít nhất nêu khoảng dao động.

Người lạ trong test cũng chính là người lạ đã dùng khi chọn ngưỡng, nên kết quả phản ánh nhóm người lạ đã biết. Với người lạ chưa gặp, mức bỏ lọt có thể khác.

## 5. Phát hiện muộn và độ phân giải của TTD

Vị trí tiếp quản ở phím thứ 225 nằm giữa cửa sổ thứ năm. Sau tiếp quản, quyết định chỉ xảy ra khi có 25, 75, 125, 175, 225 hoặc 275 phím người lạ. Mọi ca phát hiện muộn có TTD từ 175 phím trở lên, trung vị 175 đến 225 phím tùy tổ hợp.

Do đó ngưỡng 150 phím thực chất yêu cầu phát hiện trong ba quyết định đầu. Khi báo cáo TTD, cần ghi rõ bước 50 phím này để người đọc không hiểu nhầm độ chính xác của số liệu.

Từ 15% đến 26% ca được phát hiện có cảnh báo đầu tiên ở cửa sổ hỗn hợp, tức cửa sổ chứa 25 phím chính chủ và 25 phím người lạ. Không ca nào được phát hiện nhờ cửa sổ thuần chính chủ hoàn tất trễ.

Ca không phát hiện được ghi mốc theo dõi 300 phím, nhưng thực tế chỉ khoảng 275 phím người lạ được chấm vì 25 phím cuối không đủ một cửa sổ. Khi dùng mốc kiểm duyệt cho phân tích TTD cần dùng số phím thực sự quan sát.

## 6. Thu hồi trước tiếp quản

54 ca của distance B1 chỉ đến từ 3 đoạn chính chủ, mỗi đoạn bị lặp 18 lần vì được ghép với 18 đoạn người lạ khác nhau. Tương tự, 72 ca của Isolation Forest P1 đến từ 4 đoạn và 18 ca của distance P1 đến từ 1 đoạn.

Các lần thu hồi xảy ra ở cửa sổ đầu hoặc thứ hai của đoạn, một ca ở cửa sổ thứ tư. Em đã kiểm xem cửa sổ đầu đoạn có điểm cao bất thường không; trên dữ liệu mô phỏng thì không, nên nguyên nhân có vẻ là một số đoạn chính chủ cụ thể có nhịp gõ lệch so với hồ sơ.

Khi báo cáo nên đếm theo đoạn chính chủ khác nhau. Gộp thành 54 sự kiện sẽ làm lỗi trông nghiêm trọng hơn thực tế, và việc loại cả 18 kịch bản khỏi mẫu số cũng làm đổi tỷ lệ phát hiện.

## 7. Thu hồi oan phiên chính chủ

Có 13 lượt thu hồi phiên G0 cộng dồn qua các tổ hợp, chủ yếu trên SIM02_D3_S1 và SIM01_D3_S2. Tất cả do điểm vượt h2. Bốn lượt xảy ra khi chưa có yêu cầu MFA nào trước đó, nghĩa là chính chủ bị đăng xuất mà không có cơ hội xác minh lại. Hai trong số đó thuộc P1 của Isolation Forest với ngưỡng h1=0,5 được chọn riêng cho SIM04.

Trường hợp này cho thấy ngưỡng cá nhân hóa chọn trên ít dữ liệu validation có thể quá thấp. Với chỉ hai phiên test mỗi tài khoản, mỗi lượt thu hồi oan là một sự kiện lớn, không nên quy thành tỷ lệ.

## 8. Hàm ý cho báo cáo và thực nghiệm

Kết quả mô phỏng cho thấy giới hạn chính nằm ở khả năng phân biệt của đặc trưng và scorer, không chỉ ở việc chọn ngưỡng. Phần báo cáo nên trình bày điều này như một kết quả chẩn đoán trung thực thay vì chỉ nêu chỉ số trung bình.

Khi trình bày, nên báo theo cặp tài khoản và người lạ, đếm thu hồi trước tiếp quản theo đoạn chính chủ, ghi rõ độ phân giải TTD và tách riêng thu hồi không qua MFA.

Nếu nhóm có lần chạy mới, có thể chạy lại cùng script để so sánh. Nếu không có dữ liệu người thật, phần kết luận chỉ giới hạn ở mức chẩn đoán phương pháp đo trên dữ liệu mô phỏng.

## 9. Giới hạn

Bốn hồ sơ mô phỏng, hai phiên test mỗi tài khoản và người lạ dùng chung giữa các tài khoản. Các phân loại suýt phát hiện hoặc bỏ lọt xa dùng mốc 50% và 80% h1 do em đặt để mô tả, không phải tiêu chuẩn có sẵn. Nguyên nhân nêu ở từng mục là giải thích hợp lý nhất từ dữ liệu, chưa được kiểm bằng thí nghiệm can thiệp.

## 10. Cách tái lập

Chạy từ thư mục member4:

node scripts/analyze-member3-failures.mjs --input ../member3/artifacts/simulation-reviewed/evaluation --output results/member3-failure-analysis-NEW

Script chỉ đọc đầu vào, từ chối ghi vào thư mục đã có file và lưu hash SHA-256 của mọi file đầu vào trong summary.json. Các bảng chi tiết: failure_counts.csv, miss_margin_cases.csv, miss_margin_bands.csv, miss_rate_by_target_attacker.csv, fixed_window_separability.csv, detection_window_label.csv, revoke_traces.csv và late_detection_summary.csv.
