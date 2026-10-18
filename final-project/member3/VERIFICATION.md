# Kiểm tra phần 3

Kiểm tra ngày 16/10/2026, Node.js 24.16.0. Repo nguồn tại commit `7905176`; phần `member3` là thay đổi cục bộ chưa commit/chưa push.

Bản kiểm tra hiện hành là bản sau xử lý review, model schema 1.1, kết quả tại `artifacts/simulation-reviewed`. Lần chạy trong `artifacts/simulation` và receipt cũ được giữ để đối chiếu. Chi tiết thay đổi: [XU_LY_REVIEW.md](docs/XU_LY_REVIEW.md).

## Kết quả kỹ thuật

| Kiểm tra | Kết quả |
|---|---|
| TypeScript strict với compiler 5.9.3 | Đạt |
| Kiểm thử Node | 59/59 đạt |
| Hash dữ liệu thô và manifest đối chiếu receipt thành viên 2 | Đạt |
| Hash bốn file xử lý đối chiếu receipt thành viên 2 | Đạt |
| Tính lại normalizer chỉ từ train | Đạt |
| Tái tạo đặc trưng từ các lần gõ đã xử lý | 2.304/2.304 cửa sổ đạt |
| Sai số tương đối chuẩn hóa lớn nhất của phép đối chiếu đặc trưng | 0.00012728272491907577, khoảng 0.01273% |
| Chạy đầy đủ fit → evaluate | Đạt |
| Chạy lại hai lần độc lập | 17 file giống từng byte |
| Kết quả chính đối chiếu bản trước review | Mô hình, cấu hình, chính sách đã chọn và các chỉ số cũ giữ nguyên |
| Log sự kiện đối chiếu bản trước review | 108 timestamp SEGMENT_RESET chuyển sang thời điểm xử lý; còn giữ mốc nguồn riêng |

Phép đối chiếu đặc trưng dùng `abs(rebuilt-original)/max(1,abs(original))`, ngưỡng 0.002 để tính đến làm tròn timestamp/đặc trưng trong CSV của thành viên 2. Nó không xác minh lại toàn bộ quá trình thu nhận và ghép sự kiện thô.

## Nội dung kiểm thử

- Công thức median, IQR, MAD và hệ số hiệu chỉnh độ dài đường đi.
- Khoảng cách L1; Isolation Forest có seed; dữ liệu trùng; điểm cô lập; đầu vào lỗi.
- Chuẩn hóa theo tài khoản đích và loại chiều không hoạt động.
- Validation tách theo nguyên phiên; không tự random cửa sổ khi thiếu phiên.
- Thay giá trị đặc trưng hoặc thời gian gõ của test không đổi mô hình/chính sách do hàm fit trả về.
- Ví dụ CUSUM 2.5 → 4.75 → 6.775; lambda=1; điểm âm; ngưỡng bằng nhau.
- Cooldown chặn h1 nhưng không chặn h2; MFA thành công/thất bại; reset theo đoạn.
- Không sinh dự đoán sau thu hồi; ca thu hồi trước tiếp quản; kiểm duyệt TTD.
- Tính đúng thời gian recording khi phiên bị thu hồi sớm.
- Đặc trưng có flight âm và đối chiếu toàn bộ cửa sổ với bộ dữ liệu thành viên 2.
- FAR/FRR, EER với điểm trùng, bootstrap ghép cặp và Wilcoxon chính xác.
- FAR phiên tại L với ca không đủ theo dõi.
- A1 tạo lại từ lần gõ, có cửa sổ trộn và giữ đúng split nguồn.
- API tích hợp xử lý MFA_PENDING, sai kích thước cửa sổ và cửa sổ gửi lặp.
- Quan sát lỗi không đổi S/cooldown, trạng thái, segment, mốc thời gian hoặc danh sách cửa sổ; gửi lại bản đã sửa cùng ID được chấp nhận.
- Đặc trưng thiếu/null/chuỗi trắng/boolean không bị chuyển thành 0, kể cả ở chiều không hoạt động.
- Long hold: end nguồn 5000 → 995 nhưng quyết định 5000 → 5000; giữ nguyên đặc trưng và thứ tự cửa sổ.
- Runtime và replay thống nhất thời gian/điểm/hành động, kể cả khi có MFA thành công tức thời; từ chối đảo thứ tự bắt đầu.
- Cảnh báo từ genuine hoàn tất trễ được ghi riêng, giữ nguyên mẫu số của chỉ số toàn chính sách; phân biệt mixed/impostor, cảnh báo trước N, thu hồi trước N và kiểm duyệt.
- Validation toàn cục không đạt trong fixture có 2/4 người đạt riêng lẻ; bảng vẫn đếm đúng 2/4.
- Bundle schema cũ bị từ chối evaluate và yêu cầu fit lại.
- CLI yêu cầu đường dẫn đầu ra mới, từ chối thiếu tham số và cấm thay config lúc evaluate.

## Tái lập

```powershell
npm run typecheck
npm test
node src/cli.ts verify
node src/cli.ts reproduce --out artifacts/new-run
node scripts/verify-reproducibility.ts artifacts/new-repro-check
```

Thư mục mới phải chưa có nội dung. Bản ghi hiện hành đi kèm kết quả trong `artifacts/simulation-reviewed/fit/run.json` và `artifacts/simulation-reviewed/evaluation/run.json`. Biên nhận đối chiếu hai lần chạy được lưu tại `artifacts/reproducibility-reviewed.json`. Hai file run.json bị loại khỏi phép so byte vì chứa thời gian và metadata môi trường; 17 file nội dung còn lại đều giống nhau. Đã đối chiếu thêm 17 hash của lần chạy `simulation-reviewed` với receipt này, đều khớp.

Model SHA-256: `ae99e1f3314d068298060063c8f728af30e9d89b9ab77067c6f06f0343e11710`.

Đối chiếu trước/sau trên 11 bảng CSV: số hàng giữ nguyên (880 hàng kịch bản theo scorer, 3.520 lượt scenario-policy, 29.183 quyết định, 7.600 sự kiện). Mọi giá trị của các cột cũ giữ nguyên trừ 108 ô time_ms của SEGMENT_RESET. Có thêm các cột nguồn thời gian, nguồn cửa sổ cảnh báo và cờ validation. Không có thời gian quyết định/sự kiện đi lùi trong log mới; không có cảnh báo genuine trễ trong lần chạy mặc định.

## Kết quả mô hình không đồng nghĩa kết quả kiểm thử

Các cờ `validation_feasible` và `test_meets_constraints` của lần chạy mô phỏng hiện tại đều không đạt. EER test theo người của hai scorer khoảng 35.4% đến 49.3%. Các con số này là kết quả phát triển trên bốn hồ sơ mô phỏng, không phải số liệu người thật. Không kết luận đề tài thành công hoặc thất bại trên người thật từ bộ này.

Tỷ lệ phát hiện, TTD, FAR phiên tại L, MFA/giờ và số thu hồi oan đã được xuất đầy đủ, kể cả ca không thuận lợi. Không sửa dữ liệu mô phỏng để tăng độ tách biệt hoặc đổi tiêu chí sau khi xem kết quả nhằm tạo bảng đẹp hơn.

## Phần chưa được kiểm chứng

- Chưa thu và đánh giá dữ liệu người tham gia thật.
- Chưa chạy lại toàn bộ test/kiểm thử trình duyệt của thành viên 2; kiểm tra ở đây là phần giao tiếp và dữ liệu đã bàn giao.
- Chưa có mã evaluator của Minh để xác nhận adapter.
- Chưa nối hệ thống trực tiếp của Trâm hoặc đo latency xử lý thực.
- Chưa đối chiếu số điểm Isolation Forest với một thư viện độc lập.
- Chưa triển khai P2, One-Class SVM, ngưỡng theo ngữ cảnh/độ dài phiên và MFA có khoảng chờ.
- Chưa chứng minh H1, H2 hoặc H3; đặc biệt so sánh cùng một giới hạn chưa phải so sánh đúng cùng TTD/FAR.

Hướng dẫn chạy đã được tổ chức theo skill `beautiful-readme`; nội dung và lệnh bám mã thực tế. Tài liệu nội bộ không thay cho một thành viên khác review độc lập mã và kết quả.
