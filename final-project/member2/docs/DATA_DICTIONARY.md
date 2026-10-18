# Từ điển dữ liệu và quy ước đặc trưng

## Cấu trúc JSON thô, phiên bản 1.0

| Trường | Kiểu dữ liệu | Ý nghĩa |
| --- | --- | --- |
| schema_version | Chuỗi | `1.0` |
| data_kind | Giá trị liệt kê | `synthetic` cho dữ liệu mô phỏng; `real` cho dữ liệu xuất từ công cụ thu |
| metadata.participant_id | Chuỗi | Mã hồ sơ nguồn ổn định; SIM01–SIM04 là các hồ sơ mô phỏng |
| metadata.session_id | Chuỗi | Mã phiên duy nhất |
| metadata.collection_mode | `pilot`, `formal`; tùy chọn với file cũ | Phân biệt phiên thử công cụ với phiên nghiên cứu chính thức |
| metadata.started_at / timezone | Chuỗi ISO-8601 / múi giờ IANA | Thời điểm bắt đầu và múi giờ dùng để kiểm tra ngày thu |
| metadata.goal_strokes | Số nguyên, collector mới | Mục tiêu lần gõ hoàn chỉnh: pilot 300, formal 1.000 |
| metadata.goal_recording_seconds | Số nguyên, collector mới | Mục tiêu ghi chủ động: pilot 300 giây, formal 480 giây |
| metadata.completed_strokes | Số nguyên, collector mới | Số cặp nhấn/nhả hoàn thành khi dừng thu |
| metadata.recording_seconds | Số, collector mới | Thời gian ghi chủ động; không gồm thời gian tạm dừng |
| metadata.stroke_goal_met / time_goal_met / goal_met | Luận lý, collector mới | Mức đạt mục tiêu tại trình duyệt; pipeline tính lại từ sự kiện hợp lệ khi xử lý |
| metadata.study_day | Số nguyên, chỉ có trong mô phỏng | Chỉ số ngày nghiên cứu 1/2/3, không phải ngày trên lịch |
| metadata.session_number | Số nguyên, chỉ có trong mô phỏng | Thứ tự phiên 1/2 trong ngày |
| metadata.seed | Chuỗi, chỉ có trong mô phỏng | Giá trị khởi tạo ngẫu nhiên 128 bit, biểu diễn bằng 32 ký tự thập lục phân |
| metadata.seed_encoding | Chuỗi, chỉ có trong mô phỏng | `sha256-first-128-bits-hex` |
| metadata.generator_version | Chuỗi, chỉ có trong mô phỏng | `2.0.0-xoshiro128ss-boxmuller` |
| metadata.simulation_settings | Đối tượng, chỉ có trong mô phỏng | Toàn bộ cấu hình tham số sinh dữ liệu |
| metadata.time_basis | Chuỗi, chỉ có trong mô phỏng | `simulated_relative_ms` |
| metadata.description | Chuỗi, chỉ có trong mô phỏng | Mô tả rõ nguồn gốc dữ liệu |
| events | Mảng | Các sự kiện thời gian được sắp theo thứ tự xảy ra |

Thông tin mô tả của công cụ thu còn ghi thời điểm bắt đầu và múi giờ thực tế, loại bàn phím, bộ gõ, ngữ cảnh, trình duyệt, nền tảng và sự đồng thuận. Các thông tin thực tế này không được giả lập cho dữ liệu mô phỏng. Xem quy ước trong README của công cụ thu.

| Trường sự kiện | Kiểu dữ liệu | Ý nghĩa |
| --- | --- | --- |
| type | Giá trị liệt kê | start, stop, down, up, boundary, resume, composition_start/end, repeat, shortcut, duplicate_down, unmatched_up, unidentified |
| t_ms | Số hữu hạn ≥ 0 | Số mili giây tính từ lúc bắt đầu phiên; không giảm theo thứ tự sự kiện |
| pair_id | Số nguyên dương trong down/up | Mã ghép cặp duy nhất trong phiên, không phải mã nhận diện phím |
| group | Giá trị liệt kê trong down/up | typing: gõ thông thường; separator: dấu phân cách (Space/Enter/Tab); correction: sửa lỗi (Backspace/Delete) |
| composing | Giá trị luận lý trong down/up | Trạng thái bộ gõ được ghi khi nhấn phím và sao chép sang sự kiện nhả |
| reason | Chuỗi trong boundary | Lý do ngắt; trình sinh dùng `simulated_break` |

Không sinh hoặc xuất `key`, `code`, nội dung văn bản đã gõ hay nội dung trung gian của bộ gõ. Khi thu thật, mốc thời gian tương đối phản ánh lúc trình duyệt nhận sự kiện; trong mô phỏng, đó là thời gian do chương trình sinh.

## Danh sách phiên và nguồn gốc dữ liệu

manifest.json chứa đường dẫn tương đối từ thư mục đầu vào, participant_id, session_id, data_kind, split và study_day. Với dữ liệu mô phỏng, ngày/tập phải khớp metadata. Với dữ liệu thật, study_day là ngày nghiên cứu 1/2/3 do người quản lý manifest gán; mỗi người cần hai phiên formal ngày 1 vào `train`, một phiên ngày 2 vào `validation` và một phiên ngày 3 vào `test`. Thời gian bắt đầu và múi giờ phải hợp lệ; khoảng nghỉ giữa hai phiên ngày 1 được tính từ lúc kết thúc phiên trước đến lúc bắt đầu phiên sau, dùng thời lượng tường đã kiểm tra từ sự kiện (gồm thời gian tạm dừng), và phải đạt ít nhất 30 phút; các ngày phải tăng theo thứ tự. Lịch không đủ hoặc sai được giữ trong bảng chất lượng nhưng loại khỏi đặc trưng. Phiên pilot và phiên cũ thiếu collection_mode cũng được giữ để chẩn đoán, nhưng không tham gia nghiên cứu. Phiên formal chỉ đủ điều kiện khi có ít nhất 1.000 lần gõ hợp lệ và 480 giây ghi chủ động; pipeline tính lại hai mục tiêu từ sự kiện. Có thể khai báo `supersedes_session_id` cho một phiên formal thu lại; phiên được thay phải tồn tại, cùng participant/day/split và chỉ có một replacement. Phiên cũ vẫn hiện trong bảng chất lượng với `superseded_session`, không tính vào lịch active và không vào đặc trưng. Link sai, trùng hoặc tạo vòng không thay thế phiên nào và khiến lịch bị đánh dấu lỗi. Lịch có nghỉ dưới 30 phút mang lý do `day1_rest_under_30m`; timestamp hoặc thời lượng phiên ngày 1 không hợp lệ mang lý do `invalid_day1_session_timing`. Nếu không có train windows cho một participant/kích thước, raw feature windows vẫn được giữ nhưng normalized windows bị bỏ với lý do `missing_eligible_training_windows`; pipeline không lấy validation/test thay train. Cặp mã phiên hoặc nội dung trùng và đường dẫn ngoài thư mục đầu vào bị từ chối. File lỗi cấu trúc nằm trong rejections.json; lần chạy có file bị từ chối trả mã thoát 2.

run.json ghi thời điểm chạy, không phải thời điểm thu; phiên bản Node.js và thư viện; SHA-256 đầu vào; mã băm của danh sách phiên, cấu hình, mã nguồn và đầu ra; trạng thái chạy và số liệu tổng hợp. Giá trị khởi tạo ngẫu nhiên và toàn bộ cấu hình sinh nằm trong JSON thô, được liên kết bằng session_id và mã băm đầu vào.

## Các bảng đã xử lý

| File | Đơn vị mỗi hàng | Nội dung |
| --- | --- | --- |
| sessions.csv | Một phiên hợp lệ về cấu trúc | Chẩn đoán chất lượng, ngày/tập đã gán, collection_mode, mục tiêu tính lại, participant_protocol_complete, research_eligible, eligibility_reasons, liên kết retake và lý do thiếu normalizer |
| strokes.csv | Một lần gõ hoàn chỉnh thuộc phiên đủ điều kiện | Chỉ các cặp của phiên nghiên cứu đủ điều kiện; mã, loại dữ liệu, tập, segment_id, pair_id và thời gian |
| windows.csv | Một cửa sổ đầy đủ | Các mã, loại dữ liệu, tập; segment_id, window_id, window_size, start_ms, end_ms, các trường chẩn đoán và 12 đặc trưng bên dưới |
| normalized_windows.csv | Một cửa sổ đầy đủ có train normalizer | Cùng các cột trên, thay giá trị đặc trưng bằng giá trị chuẩn hóa không có đơn vị; thêm claimed_profile. Cửa sổ không có hồ sơ train được bỏ ở đây nhưng vẫn ở windows.csv |
| normalization_exclusions.csv | Một participant × kích thước thiếu train normalizer | Số raw feature windows còn dùng được, số normalized (0) và lý do loại |
| window_tails.csv | Một đoạn × một kích thước cửa sổ | session_id, segment_id, window_size, dropped_tail_strokes |
| session_feature_summary.csv | Một phiên, W=50 | Trung vị của từng đặc trưng cửa sổ trong phiên, kèm mã và tập; dữ liệu hạn chế truy cập khi dùng người thật |
| profile_feature_summary.csv | Một hồ sơ, W=50 | Trung vị trên các trung vị phiên của những đặc trưng được chọn |
| session_drift_summary.csv | Một hồ sơ, W=50 | Trung vị tốc độ phiên theo tập; test_minus_train_percent = 100 × (test/train − 1); để trống nếu không đủ tập tương ứng |
| profile_summary.csv | Một hồ sơ | Tổng hợp độ bao phủ và chất lượng |
| window_size_summary.csv | Một kích thước cửa sổ × một tập | Số cửa sổ/phiên, trung vị thời gian giữ phím, khoảng tứ phân vị của các trung vị giữ phím và trung vị tốc độ |
| feature_distribution_summary.csv | Một split × kích thước × đặc trưng | Số phiên và median/IQR/min/max trên giá trị trung vị từng phiên; không coi cửa sổ là người tham gia độc lập |
| study_design_summary.json | Một lần chạy dữ liệu thật | Mức bao phủ so với protocol hiện chọn 20 người/80 phiên, số lịch hoàn chỉnh, số phiên đủ điều kiện và lý do loại tổng hợp; không có mã người tham gia. Đây là mục tiêu protocol của Member 2, không phải cỡ mẫu quy định trong phân công |

`research_eligible` chỉ áp dụng cho dữ liệu `real`: true nghĩa là phiên formal đạt mục tiêu và thuộc lịch đúng; false nghĩa là phiên bị loại và có `eligibility_reasons`. Trường này để trống với fixture `synthetic`, vì fixture chỉ dùng kiểm tra kỹ thuật chứ không phải dữ liệu nghiên cứu.

Thông tin chất lượng chi tiết giữ số lượng từng loại sự kiện và lý do loại cặp: missing_down/up, duplicate_pair_events, cross_boundary_pair, negative_dwell, invalid_group, invalid_composition_flag. Một cặp có thể mắc nhiều lỗi; chỉ đếm một lần theo lý do đầu tiên phù hợp. Lỗi cấu trúc làm từ chối toàn bộ file. Sự kiện unmatched_up không có pair_id được đếm là chẩn đoán sự kiện, không phải cặp bị loại. `duplicate_down` và `repeat` là chẩn đoán; bản ghi down/up thực sự bị trùng cùng pair_id sẽ làm loại cặp đó.

Đoạn mới bắt đầu sau gián đoạn hoặc cặp không hợp lệ. Các lần gõ được sắp theo lúc nhấn, không theo lúc nhả. Thời gian ghi gồm các khoảng start→boundary và resume→boundary/stop; loại thời gian không hoạt động khi tạm dừng. Lần giữ phím quá 2.000 ms được đánh dấu, không tự động loại. Cho phép thời gian giữ bằng 0 nếu hai mốc bằng nhau; từ chối cửa sổ có thời lượng bằng 0. Bản ghi của cặp không hợp lệ không được dùng tính đặc trưng thời gian.

## Đặc trưng

Với N lần gõ sắp theo lúc nhấn d_i và lúc nhả tương ứng u_i:

- Dãy thời gian giữ phím (dwell): u_i − d_i, gồm N giá trị.
- Dãy khoảng nhả–nhấn (flight): d_(i+1) − u_i, gồm N−1 giá trị. Giá trị âm biểu diễn các phím chồng lấp hợp lệ.
- Dãy khoảng nhấn–nhấn (down-down): d_(i+1) − d_i, gồm N−1 giá trị.
- Mỗi dãy có trung vị, khoảng tứ phân vị IQR = Q75−Q25 và độ lệch tuyệt đối trung vị MAD = median(abs(x−median(x))). Phân vị được nội suy tuyến tính tại chỉ số (N−1) × q trong dãy đã sắp. Đơn vị: ms.

Tên và thứ tự chính xác của các cột đầu vào mô hình:

```text
dwell_median_ms, dwell_iqr_ms, dwell_mad_ms
flight_median_ms, flight_iqr_ms, flight_mad_ms
down_down_median_ms, down_down_iqr_ms, down_down_mad_ms
strokes_per_minute, pause_proportion, correction_proportion
```

Tốc độ gõ = N × 60000 / (max(u_i)−d_1), với thời lượng tính bằng ms. Tỷ lệ nghỉ = count(DD > 2000 ms)/(N−1). Tỷ lệ sửa lỗi = count(group=correction)/N. Đơn vị quan sát là lần nhấn phím vật lý, không phải ký tự hoặc từ. Mọi nhóm phím hợp lệ đều tham gia dãy thời gian. Khoảng nghỉ trong lúc ghi được giữ trong đặc trưng tốc độ và khoảng thời gian.

Các kích thước 20/50/100 là những cách biểu diễn cùng một nguồn dữ liệu; không được nối thành các mẫu quan sát độc lập bổ sung. Mỗi cách dùng cửa sổ không chồng lấp trong từng đoạn; phần đuôi thiếu được bỏ và đếm. `composing_proportion` và `negative_flight_proportion` là chẩn đoán, không thuộc FEATURE_COLUMNS. Các mã, mốc thời gian, split và window_size cũng không thuộc ma trận đầu vào mô hình.

## Quy ước chuẩn hóa

normalizers.json dùng khóa dạng `claimed-profile:window-size`, chứa feature_columns theo đúng thứ tự, median, scale, mặt nạ active, mã phiên huấn luyện và số cửa sổ huấn luyện. Chỉ ước lượng tham số trên train. Scale = 1.4826 × MAD. Chỉ chiều có scale > 0 mới hoạt động. Chiều không hoạt động luôn xuất 0, kể cả trên validation/test; mô hình phía sau phải tuân theo mặt nạ và không thể phát hiện thay đổi ở những chiều này. Participant/kích thước không có eligible train windows sẽ không có entry trong normalizers.json; transform cho khóa đó báo lỗi và pipeline không tự dùng dữ liệu validation/test. Đây là giới hạn được ghi rõ; không thêm hằng số rất nhỏ tùy ý để khuếch đại sai lệch.

`transformWindows(windows, parameters, "SIM01")` giữ participant_id của nguồn nhưng áp dụng tham số đã ước lượng cho SIM01. Bỏ đối số claimedProfile sẽ chuẩn hóa từng hàng theo hồ sơ nguồn, chỉ phù hợp phân tích mô tả chính hồ sơ đó. Khi đánh giá mẫu từ người khác, phải chỉ định tài khoản đích. Thiếu hồ sơ huấn luyện hoặc đặc trưng không hữu hạn sẽ gây lỗi.

`schema_version` vẫn là 1.0. Giá trị khởi tạo ngẫu nhiên trong metadata phục vụ truy xuất nguồn gốc, không phải đặc trưng đầu vào mô hình.
