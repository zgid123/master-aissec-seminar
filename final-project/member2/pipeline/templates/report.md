# Báo cáo cuối kỳ — Thành viên 2

## 1. Phạm vi và nguồn dữ liệu

Đề tài: Xác thực liên tục thích ứng dựa trên nhịp gõ phím. Thành viên 2 thực hiện biểu diễn dữ liệu, tiền xử lý, trích xuất đặc trưng, chuẩn hóa và phân tích mô tả.

**Dữ liệu phân tích định lượng tại mục 2–5 là dữ liệu mô phỏng (`data_kind: synthetic`). Không có người tham gia thật, phiếu đồng thuận thật hay quan sát người tham gia thật.** Các mã {profile_ids} là hồ sơ sinh bởi chương trình. Ba ngày là mốc thời gian nghiên cứu tổng hợp, không phải ngày thu thập. Bộ dữ liệu dùng để kiểm tra quy trình xử lý và bàn giao giao diện cho thành viên khác.

## 2. Phương pháp tạo dữ liệu

Lần phân tích này chạy bằng TypeScript/Node.js. Phiên bản trình sinh trong cấu hình dữ liệu: {generator_version}. Giá trị khởi tạo ngẫu nhiên và cấu hình được lưu để tái lập kết quả.

Có {sessions} phiên và {strokes_formatted} lần gõ hoàn chỉnh. Số phiên, đoạn và tham số sinh được ghi trong config.json. Thời gian giữ phím (dwell) và khoảng nhấn–nhấn (down-down) được sinh từ phân phối log-chuẩn; tốc độ có trạng thái AR(1), nhiễu theo phiên và biến động theo ngày. Các hồ sơ có tham số gần nhau, phân phối chồng lấp. Nhóm phím gồm gõ thông thường (`typing`), phân cách (`separator`) và sửa lỗi (`correction`). Một số khoảng nghỉ dài được cộng vào khoảng nhấn–nhấn; sửa lỗi có xu hướng xuất hiện theo cụm.

Thời điểm nhả phím được tính từ thời điểm nhấn cộng thời gian giữ phím, cho phép nhiều phím chồng lấp. Mỗi ranh giới ngắt cố ý có một lần nhấn không có nhả để kiểm tra chất lượng. Sự kiện phím lặp (`repeat`) được ghi dưới dạng chẩn đoán, không trở thành lần gõ mới. Cấu hình số cụ thể và giá trị khởi tạo ngẫu nhiên nằm trong `config.json` và thông tin mô tả từng file. Các tham số chỉ là giả định minh họa; chưa được hiệu chỉnh hoặc kiểm chứng bằng người thật. Không mô phỏng hành vi bộ gõ như bằng chứng thực nghiệm.

## 3. Tiền xử lý và đặc trưng

Quy trình xử lý kiểm tra phiên bản cấu trúc dữ liệu, mã phiên/người, mốc thời gian hữu hạn không âm theo thứ tự và trạng thái start/boundary/resume/stop. Sự kiện được ghép theo pair_id. Cặp thiếu, trùng, sai nhóm hoặc đi qua ranh giới bị loại kèm lý do. Cặp không hợp lệ làm ngắt tính liên tiếp. Khoảng nhả–nhấn (flight) âm được giữ vì có thể xuất hiện khi phím kế tiếp nhấn trước khi phím trước nhả. Khoảng nghỉ dài được giữ trong dữ liệu.

Với lần gõ i: dwell_i = up_i − down_i; flight_i = down_(i+1) − up_i; DD_i = down_(i+1) − down_i. Cửa sổ không chồng lấp gồm 20, 50 hoặc 100 lần gõ và không qua ranh giới đoạn. Mỗi dãy thời gian có trung vị, khoảng tứ phân vị (IQR) và độ lệch tuyệt đối trung vị (MAD). Tốc độ = N × 60000 / (max(up) − min(down)), đơn vị lần gõ/phút. Tỷ lệ nghỉ = số DD > 2000 ms / (N−1). Tỷ lệ sửa = số nhóm correction / N, bao gồm Backspace và Delete. Đây là tốc độ phím vật lý, không phải từ/phút. Không có danh tính phím để xây dựng đặc trưng theo ký tự hoặc digraph.

Ngày tổng hợp 1/2/3 lần lượt là tập huấn luyện/kiểm định/kiểm tra (`train`/`validation`/`test`); toàn bộ cửa sổ của một phiên nằm cùng tập. Với từng hồ sơ và kích thước cửa sổ, ước lượng trung vị và scale = 1.4826 × MAD chỉ trên tập huấn luyện. Giá trị chuẩn hóa = (x−median)/scale. Nếu scale bằng 0, chiều đó được đánh dấu không hoạt động và xuất 0. Có {inactive} chiều không hoạt động trên tất cả cấu hình. Khi đánh giá mẫu của người khác, phải sử dụng bộ chuẩn hóa của tài khoản được nhận là chủ, không dùng hồ sơ của người cung cấp mẫu. Chuẩn hóa đặc trưng này khác với chuẩn hóa điểm bất thường của thành viên 3.

## 4. Kết quả thực chạy trên dữ liệu mô phỏng

Quy trình xử lý {sessions} phiên, {strokes_formatted} lần gõ hoàn chỉnh và loại {excluded_pairs} cặp. Tổng thời gian ghi mô phỏng là {recording_minutes} phút; thời gian tạm dừng là {paused_minutes} phút. Trong {adjacent_intervals_formatted} khoảng nhả–nhấn trong cùng đoạn, có {negative_flight_formatted} giá trị âm ({negative_flight_percent}%). Các con số được tính từ đầu ra hiện tại, không phải mục tiêu đặt trước.

{profile_summary_table}

Tóm tắt đặc trưng theo hồ sơ: tính trung vị từng phiên trước, sau đó trung vị trên các phiên. Không gộp các cửa sổ thành người tham gia độc lập.

{profile_features_table}

Biến động tốc độ giữa ngày tổng hợp 1 và 3, được mô tả sau khi cố định cấu hình:

{rate_drift_table}

Các giá trị test_minus_train_percent có thể âm hoặc dương do nhiễu theo phiên và theo ngày. Đây là biến động được sinh bởi giả định, không phải đo lường độ trôi của người thật. Những khác biệt giữa SIM01–SIM04 không được xem là bằng chứng hiệu quả của mô hình xác thực.

Số cửa sổ và thống kê theo tập:

{window_summary_table}

Thống kê session-level cho từng đặc trưng, kích thước cửa sổ và tập được xuất trong `feature_distribution_summary.csv` (số phiên, trung vị, IQR, cực tiểu và cực đại của giá trị trung vị phiên). Mỗi phiên có cùng trọng số trong các thống kê này; cửa sổ không được tính như người tham gia độc lập.

Số đuôi bị bỏ trong lần chạy hiện tại là {dropped_tail_strokes}. Khả năng xử lý đuôi ngắn được kiểm thử riêng, không suy ra từ cấu hình thuận lợi này. Các cửa sổ thuộc cùng một phiên hoặc hồ sơ không được xem là những người tham gia độc lập.

## 5. Hình và diễn giải

![Phân phối thời gian](figures/01_timing_distributions.png)

Hình 1: Phân phối thời gian giữ phím và khoảng nhả–nhấn của các hồ sơ mô phỏng. Trục khoảng nhả–nhấn chỉ hiển thị −200 đến 1000 ms; các khoảng nghỉ ngoài vùng này vẫn tồn tại trong CSV. Các khác biệt phản ánh tham số sinh và nhiễu được cài đặt, không chứng minh khả năng nhận diện người thật.

![Biến động phiên](figures/02_session_variation.png)

Hình 2: Mỗi điểm là tóm tắt một phiên với cửa sổ 50 phím; thể hiện biến động trong và giữa hồ sơ tổng hợp.

![Kích thước cửa sổ](figures/03_window_sizes.png)

Hình 3: Cửa sổ lớn tạo ít mẫu hơn. Độ biến động mô tả được xuất trong window_size_summary.csv; không chọn kích thước cửa sổ bằng kết quả trên tập kiểm tra. Mặc định bàn giao là 50 phím.

![Chuẩn hóa](figures/04_normalized_features.png)

Hình 4: Phân phối tích lũy của đặc trưng chuẩn hóa. Tập kiểm định/kiểm tra dùng nguyên tham số của tập huấn luyện; không ước lượng lại để ép các tập giống nhau.

![Chất lượng](figures/05_quality.png)

Hình 5: Độ bao phủ và chẩn đoán chất lượng. Các cặp thiếu nhả được cố ý sinh để kiểm tra xử lý lỗi.

## 6. Riêng tư, bàn giao và giới hạn

File sự kiện không chứa nội dung gõ hoặc mã phím vật lý. Nhãn `synthetic`, giá trị khởi tạo ngẫu nhiên và cấu hình được giữ xuyên suốt các bảng. Công cụ thu hiện có dành cho thu thật trong tương lai; dữ liệu thật phải có đồng thuận, được lưu riêng ngoài Git, tách bảng ánh xạ danh tính và cho phép rút dữ liệu theo mã phiên. Không trộn dữ liệu mô phỏng (`synthetic`) và dữ liệu thật (`real`) trong cùng một lần chạy.

Bàn giao cho thành viên 1/3: windows.csv, normalized_windows.csv, normalizers.json, manifest.json, từ điển dữ liệu và ví dụ biến đổi theo claimed_profile. Chỉ các cột FEATURE_COLUMNS là đầu vào mô hình; mã, tập dữ liệu, thời gian, nhóm mô phỏng và chẩn đoán không phải đặc trưng nhận diện.

Chưa có dữ liệu người thật, độ trôi thực qua ngày, biến động thiết bị hay bộ gõ thực tế. Nhóm phím, khoảng nghỉ và sửa lỗi chỉ gần đúng bằng giả định. Mô phỏng không sinh nội dung văn bản, không xác nhận tính tự nhiên của chuỗi ký tự và không thể tái hiện toàn bộ hành vi con người. Do đó không báo cáo FAR/FRR/EER/TTD hay khẳng định hiệu quả xác thực thực tế từ công việc này. Muốn đánh giá thực tế cần thu nhiều phiên người thật và kiểm thử độc lập. Đóng góp hoàn thành là quy trình dữ liệu có thể tái lập cùng bộ dữ liệu mô phỏng có nguồn gốc rõ ràng.

## 7. Tái lập và nguồn phương pháp

Chạy theo README của member2. run.json ghi mã băm đầu vào, cấu hình, mã nguồn quy trình xử lý và phiên bản thư viện. Mọi bảng và hình trong báo cáo được sinh tự động từ dữ liệu. Công thức thời gian giữ phím/khoảng nhả–nhấn theo tài liệu phân công và trang trình chiếu số 6 của đề tài; lựa chọn sinh dữ liệu là thiết kế của gói mô phỏng này, không được gán cho một công trình thực nghiệm khác. Dữ liệu kiểm thử được trích dẫn trong báo cáo nằm tại data/qa/.

Tài liệu tham khảo trực tiếp: Killourhy và Maxion (2009), Comparing Anomaly-Detection Algorithms for Keystroke Dynamics, https://www.cs.cmu.edu/~ksk/KillourhyMaxion2009.pdf; Ayotte và cộng sự (2020), Fast Free-text Authentication via Instance-based Keystroke Dynamics, https://arxiv.org/abs/2006.09337; Dillon và Arushi (2025), An Agent-Based Modeling Approach to Free-Text Keyboard Dynamics for Continuous Authentication, bản thảo arXiv, https://arxiv.org/abs/2505.05015. Ghi chú bài toán, phương pháp, dữ liệu/đánh giá, điểm kế thừa và giới hạn của từng tài liệu nằm trong docs/LITERATURE_REVIEW.md của gói bàn giao. Các công trình này cung cấp bối cảnh thời gian gõ, kích thước mẫu và mô phỏng; không xác nhận tham số sinh hoặc hiệu quả thực tế của bộ SIM01–SIM04.

### 7.1. Tổng hợp bằng chứng kiểm thử ngày 18/10/2026

Báo cáo sử dụng ba bộ bằng chứng đã lưu: data/qa/luna-agent-review, data/qa/sol-agent-review và data/qa/human-test. Kết quả dưới đây được tổng hợp từ results.json và các file audit tương ứng; đây là kết quả của các lượt đã ghi nhận, không phải tuyên bố chạy lại kiểm thử khi biên tập báo cáo. Các mục 8–10 trình bày ba bộ bằng chứng này.

| Nguồn bằng chứng | Phạm vi | Kết quả ghi nhận | Diễn giải |
| --- | --- | --- | --- |
| human test | human test, P01–P04 | 4/4 đạt ≥300 lần gõ và ≥300 giây chủ động; tổng 1.321 lần gõ, 1.248,125 giây | Đặt lại, nhập, dừng và tải JSON đạt các bước đã thử; P02–P04 mỗi phiên có một lần sửa |
| sol-agent-review | Build/typecheck, hồi quy và audit bốn export | Collector 9/9; pipeline 45/45; bốn SHA-256 khớp; 54 file tái lập khớp sau sửa SOL-01 | Lỗi provenance được xử lý bằng tái sinh artifact từ đầu vào không đổi |
| luna-agent-review | Review và xác minh phần mềm tiếp theo | Collector 9/9; pipeline 45/45; bốn SHA-256 khớp; 54 file tái lập khớp sau sửa LUNA-01 | Lỗi mã băm nguồn cũ sau sửa mẫu báo cáo được xử lý; không xác nhận lỗi collector mới |

Hai pha Sol/Luna kiểm tra lại cùng bốn file AI-PACED; không cộng các audit thành tám phiên mới hoặc cộng hai lượt suite thành số ca kiểm thử độc lập. Cả hai audit dùng manifest QA riêng, xác nhận bốn phiên bị loại với lý do pilot_mode và tạo 0 cửa sổ nghiên cứu. Manifest nghiên cứu vẫn chỉ chứa SIM01–SIM04; các bảng và hình tại mục 2–5 giữ nguyên phạm vi mô phỏng.

Các nhãn Sol/Luna là nhãn pha của cùng AI operator trong bản ghi, chưa xác minh danh tính mô hình độc lập. P01–P04 không đại diện bốn người thật. Không có quan sát hay đồng thuận người thật bổ sung, dù schema export ghi real/consent true. Trường sự kiện đã kiểm tra không chứa nội dung gõ hoặc danh tính phím; metadata thời gian và ngữ cảnh vẫn còn, nên kết quả này không chứng minh ẩn danh hoặc an toàn mạng/lưu trữ.

SOL-01 và LUNA-01 đều có lần kiểm tra tái lập ban đầu thất bại, sau đó đạt khi tái sinh đầu ra. Phạm vi tái lập gồm 54 file so sánh bằng SHA-256 cùng summary/input_hashes/source_hashes; loại trừ so sánh byte run.json và các PDF theo chính sách sẵn có. Các mã băm/PDF/số file ZIP trong bằng chứng lịch sử chỉ áp dụng cho bản artifact của từng pha, không tự động chứng nhận bản báo cáo biên tập sau đó.

Kết luận kiểm thử: phần mềm đạt các bước và ca đã thực hiện, chưa có lỗi collector mới được xác nhận. Chưa kiểm chứng bàn phím vật lý, giữ/chồng phím thường, IME tiếng Việt, mạng/lưu trữ có instrumentation, cài sạch hoặc chạy suite từ ZIP giải nén. Độ trễ điều khiển chi phối nhịp QA quanh 540 ms; không suy ra phân phối gõ tự nhiên, độ trôi người thật hoặc FAR/FRR/EER/TTD.

## 8. human test — P01–P04

Mục tiêu: xác minh luồng Pilot qua giao diện hiển thị, gồm đặt lại phiên, bắt đầu, nhập liệu có nhịp thay đổi, sửa lỗi, dừng và tải JSON. Bốn phiên P01–P04 được thực hiện ngày 18/10/2026 trong Safari 27.0.1 / macOS 27.0.1. Theo hồ sơ bằng chứng, người vận hành là AI agent OpenAI Codex; P01–P04 là mã ca kiểm thử. Sau cụm mở đầu 13 phím của P01, phần nhập còn lại dùng các thao tác pressKey riêng, tuần tự, xen kẽ đoạn chậm, nhóm hai phím nhanh hơn, khoảng dừng không đều và sửa lỗi. Không dùng test runner, DOM, developer console hoặc vòng lặp sinh sự kiện. Các khoảng dừng được chọn thủ công; không tuyên bố lấy mẫu ngẫu nhiên từ phân phối gõ của người thật.

| Hồ sơ QA | Lần gõ hoàn chỉnh | Thời gian ghi (giây) | Lần sửa | Trung vị down-down (ms) |
| --- | --- | --- | --- | --- |
| P01 | 310 | 313.065 | 0 | 543 |
| P02 | 366 | 308.025 | 1 | 544 |
| P03 | 316 | 312.944 | 1 | 542 |
| P04 | 329 | 314.091 | 1 | 547 |

| Bước xác minh | Kỳ vọng | Kết quả quan sát |
| --- | --- | --- |
| Đặt lại và bắt đầu | Mã phiên mới, ô nhập trống, bộ đếm 0, đồng hồ 00:00 | Đạt cho P01–P04 |
| Nhập liệu và sửa lỗi | Bộ đếm tăng; Backspace xóa ký tự đã nhập khi được thử | Đạt; P02–P04 mỗi phiên có một lần sửa |
| Mục tiêu Pilot | Ít nhất 300 lần gõ hoàn chỉnh và 300 giây chủ động | Đạt 4/4 phiên |
| Dừng | Xóa và khóa vùng nhập; không thiếu nhả phím | Đạt 4/4 phiên |
| Tải JSON | Tải thành công, mã phiên và số đếm khớp kết quả | Đạt 4/4 phiên; mã băm được audit lại ở mục 9–10 |

Cả bốn phiên mới đều đạt ít nhất 300 lần gõ và 5 phút ghi chủ động; giao diện hiển thị đạt mục tiêu, không thiếu nhả phím và xóa/khóa vùng nhập khi dừng. P02–P04 có sửa ký tự x bằng Backspace. Các file xuất mới giữ nguyên byte trong data/qa/human-test/exports, tách khỏi các lượt trước. Không đưa vào manifest nghiên cứu.

Các khoảng nhấn–nhấn có biến động trong từng phiên và lịch nhập khác nhau giữa các hồ sơ, nhưng trung vị cùng gần 540 ms do độ trễ công cụ điều khiển/quan sát. Không suy ra bốn người thật hoặc phân phối giữ/nhả phím tự nhiên. Schema real/consent true chỉ là trạng thái phần mềm, không phải đồng thuận người thật. Bằng chứng hành động, giới hạn, mã phiên, thống kê khoảng gõ và mã băm nằm trong data/qa/human-test/results.json. Chưa xác nhận lỗi collector. Các pha xác minh phần mềm Sol và Luna được trình bày tại mục 9–10.


## 9. Pha kiểm thử Sol AI Agent riêng — 18/10/2026

Pha này chạy lại kiểm thử tự động và review mã nguồn theo yêu cầu người dùng, tách khỏi các lượt giao diện P01–P04. Người vận hành là AI agent OpenAI Codex với nhãn Sol trong cùng cuộc hội thoại; không phải reviewer độc lập. Môi trường thực chạy: macOS 27.0.1, Node.js 26.0.0, pnpm CLI 11.1.2; package.json khai báo pnpm 12.11.2. Không cài lại dependency hoặc kiểm tra clean install trong pha này.

Collector typecheck/build và 9/9 kiểm thử đạt. Pipeline TypeScript build và 45/45 kiểm thử đạt. Các ca bao gồm ghép/chồng phím, composition không xuất nội dung, repeat/shortcut, tạm dừng và thời gian chủ động, reset, endpoint/header, đặc trưng tính tay, loại cặp sai, chuẩn hóa chỉ train và lịch/retake. Đây là kiểm thử phần mềm; không xác nhận hành vi bàn phím vật lý hay IME qua giao diện. Pipeline gọi headless Chromium nội bộ để render biểu đồ; không chạy browser-smoke, four-profiles hoặc tự động nhập liệu collector trong pha này.

Kiểm tra lại bốn file AI-PACED-P01–P04: mã SHA-256 khớp, parser chấp nhận 1.321 lần gõ, thời gian ghi khớp kết quả giao diện và cả bốn đạt mục tiêu Pilot. Trường sự kiện chỉ gồm type, t_ms, pair_id, group, composing và reason; không có nội dung gõ hoặc danh tính phím. Metadata vẫn có thời điểm và ngữ cảnh trình duyệt/nền tảng. Xử lý bằng manifest QA riêng ngoài artifacts cho kết quả cả bốn bị loại khỏi nghiên cứu vì pilot_mode, không có feature window nghiên cứu. Manifest nghiên cứu không đổi.

Phát hiện một lỗi đóng gói/provenance: kiểm tra tái lập ban đầu thất bại vì source_hashes trong run.json cũ hơn report.ts, report template và lockfile hiện tại. Đã tái sinh đầu ra mô phỏng từ nguồn hiện tại; kiểm tra lại đạt 54 file bằng SHA-256, kèm so sánh summary, input_hashes và source_hashes. PDF và byte run.json vẫn thuộc ngoại lệ đã công bố; PDF được kiểm tra riêng. Không xác nhận lỗi logic collector mới và không sửa mã collector trong pha này.

Kết quả và dữ liệu audit được lưu tại data/qa/sol-agent-review/results.json và qa-export-audit.json. Chưa thử lại giao diện, giữ/chồng phím vật lý, Vietnamese IME, instrumentation mạng/storage hoặc cài sạch. Pha Luna thực hiện sau lượt Sol này được trình bày tại mục 10.


## 10. Pha review Luna AI Agent — 18/10/2026

Đây là lượt review kỹ thuật mới theo yêu cầu của người dùng, mang nhãn Luna trong cuộc hội thoại này. Người vận hành thực tế vẫn là AI agent Codex; đây không phải reviewer độc lập hoặc con người. Môi trường: macOS 27.0.1, Node.js 26.0.0 và pnpm CLI 11.1.2; dự án khai báo pnpm 12.11.2. Không cài lại dependency trong lượt này.

Collector build/typecheck và 9/9 kiểm thử đạt. Pipeline build và 45/45 kiểm thử đạt. Đã review lại thu thập sự kiện, xóa/reset, tạm dừng và thời gian chủ động, ghép cặp sự kiện, loại Pilot khỏi nghiên cứu và băm nguồn. Không xác nhận lỗi collector mới. Pipeline tích hợp và tái lập mở Chromium headless qua Playwright để vẽ biểu đồ; không chạy browser smoke, bốn hồ sơ tự động hoặc tự động gõ vào giao diện collector trong lượt Luna.

Audit mới bốn file QA đã lưu: tất cả băm khớp, 1.321 lần gõ và 1.248,125 giây theo đúng bản ghi. Parser xác nhận 4/4 phiên Pilot đạt mục tiêu; xử lý bằng manifest riêng từ chối 4 phiên với lý do pilot_mode, tạo 0 cửa sổ nghiên cứu. Mỗi sự kiện chỉ có type, t_ms, pair_id, group, composing và reason. Metadata còn thời điểm, trình duyệt/nền tảng và ngữ cảnh. Không sửa file export gốc hoặc manifest nghiên cứu.

Lần kiểm tra tái lập đầu tiên thất bại với LUNA-01 do mã băm nguồn trong run.json chưa cập nhật sau khi thêm mục Luna vào mẫu báo cáo. Đã tái sinh artifact từ cùng đầu vào mô phỏng; lần kiểm tra lại đạt 54 file. Summary, input hash và source hash khớp; PDF và byte run.json tiếp tục là các ngoại lệ được nêu trong quy trình. Bản PDF tại thời điểm pha Luna có 10 trang, đã render và xem từng trang; số trang và mã băm đó chỉ mô tả bản lưu của pha này. Không chạy lại giao diện, thiết bị vật lý, IME, network/storage instrumentation, cài sạch hoặc test từ bản ZIP đã giải nén. Bằng chứng: data/qa/luna-agent-review/results.json và qa-export-audit.json. Pha Luna là nhãn của lượt kiểm thử này, không phải tuyên bố đã dùng một mô hình độc lập thứ hai.
