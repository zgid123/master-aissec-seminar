# Kiểm tra phần 3

Kiểm tra hiện hành ngày 19/10/2026, Node.js 24.16.0. Đầu vào repo sau commit `df376c04bc110a2421a668d7bbf1eb48f7b69f94`; receipt của từng lần chạy ghi commit nền, trạng thái dirty và hash mã thực tế tại lúc chạy. Không sửa receipt để giả lập lần chạy từ một commit sạch.

Bản hiện hành dùng model schema 1.1, kết quả tại `artifacts/simulation-2026-10-19`. Hai lần chạy `simulation` và `simulation-reviewed` cùng receipt cũ được giữ để đối chiếu, không dùng với mã/receipt dữ liệu mới. Chi tiết: [CAP_NHAT_2026-10-19.md](docs/CAP_NHAT_2026-10-19.md); lịch sử sửa trước đó: [XU_LY_REVIEW.md](docs/XU_LY_REVIEW.md).

## Kết quả kỹ thuật

| Kiểm tra | Kết quả |
|---|---|
| TypeScript strict với compiler 5.9.3 | Đạt |
| Kiểm thử Node | 65/65 đạt |
| Hash dữ liệu thô và manifest đối chiếu receipt thành viên 2 | Đạt |
| Hash bốn file xử lý đối chiếu receipt thành viên 2 | Đạt |
| Tính lại normalizer chỉ từ train | Đạt |
| Tái tạo đặc trưng từ các lần gõ đã xử lý | 2.304/2.304 cửa sổ đạt |
| Sai số tương đối chuẩn hóa lớn nhất của phép đối chiếu đặc trưng | 0.00012728272491907577, khoảng 0.01273% |
| Chạy đầy đủ fit → evaluate | Đạt |
| Chạy lại hai lần độc lập | 17 file giống từng byte |
| Đối chiếu simulation-reviewed | Profiles, config, chính sách đã chọn giữ nguyên; các cột cũ của 4 bảng window/policy/macro/paired_statistics không đổi |
| Chân trời kiểm duyệt | 1.463 lượt dừng ở 275/276 phím; kiểm last_decision_ms của 3.520 lượt replay |
| Evaluator cửa sổ của Minh | 8/8 cặp scorer–tài khoản khớp FAR/FRR/EER, tolerance 1e-12; 1.536 hàng điểm và receipt khớp byte-exact |

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
- Chân trời thực tế không dùng suffix chưa xử lý; ca phát hiện sớm có exposure cắt đúng, ca thiếu theo dõi tại L giữ unknown.
- Đếm prefix duy nhất riêng khỏi kịch bản, không gộp khác tài khoản; thiếu nguồn prefix bị từ chối.
- Median của 125/175 vẫn bằng 150; không đổi ràng buộc theo bước cửa sổ.
- Số MFA, exposure và thu hồi không có MFA đi kèm được kiểm bằng ví dụ tính tay.

## Tái lập

```powershell
npm run typecheck
npm test
node src/cli.ts verify
node src/cli.ts reproduce --out artifacts/new-run
node scripts/verify-reproducibility.ts artifacts/new-repro-check
```

Thư mục mới phải chưa có nội dung. Bản ghi hiện hành đi kèm `artifacts/simulation-2026-10-19/fit/run.json` và `artifacts/simulation-2026-10-19/evaluation/run.json`. Receipt hai lần chạy: `artifacts/reproducibility-2026-10-19.json`. Hai file run.json bị loại khỏi phép so byte vì chứa thời gian và metadata môi trường; 17 file nội dung còn lại đều giống nhau. Đã đối chiếu thêm 17 hash của lần chạy hiện hành với receipt này, đều khớp.

Model SHA-256: `0da4585a6ca59bf5cb359502aa7717d10ae10ec3f0621a60af87f32910c1cf88`.

So với simulation-reviewed, số hàng vẫn là 880 kịch bản theo scorer, 3.520 lượt scenario-policy, 29.183 quyết định và 7.600 sự kiện. Mốc horizon của A1 và exposure A1 được cập nhật theo điểm dừng thực tế; thêm các cột truy nguyên horizon/prefix và số đếm G0. Đây không phải tuyên bố mọi ô trong 11 bảng đều giữ nguyên. Các chỉ số chính ở bốn bảng đã nêu không đổi; chưa có cảnh báo genuine trễ trong lần chạy mặc định.

Receipt đối chiếu độc lập: `artifacts/member4-fixed-2026-10-19/receipt.json`; bảng khớp: `reconciliation.json`. Adapter này chưa xác minh độc lập giá trị scorer, trích đặc trưng, fit hoặc replay có trạng thái.

## Kết quả mô hình không đồng nghĩa kết quả kiểm thử

Các cờ `validation_feasible` và `test_meets_constraints` của lần chạy mô phỏng hiện tại đều không đạt. EER test theo người của hai scorer khoảng 35.4% đến 49.3%. Các con số này là kết quả phát triển trên bốn hồ sơ mô phỏng, không phải số liệu người thật. Không kết luận đề tài thành công hoặc thất bại trên người thật từ bộ này.

Tỷ lệ phát hiện, TTD, FAR phiên tại L, MFA/giờ và số thu hồi oan đã được xuất đầy đủ, kể cả ca không thuận lợi. Không sửa dữ liệu mô phỏng để tăng độ tách biệt hoặc đổi tiêu chí sau khi xem kết quả nhằm tạo bảng đẹp hơn.

## Phần chưa được kiểm chứng

- Chưa thu và đánh giá dữ liệu người tham gia thật.
- Chưa chạy lại toàn bộ test/kiểm thử trình duyệt của thành viên 2; kiểm tra ở đây là phần giao tiếp và dữ liệu đã bàn giao.
- Chưa đối chiếu độc lập TTD/MFA replay bằng evaluator Minh; mới xác nhận chỉ số cửa sổ cố định.
- Chưa nối hệ thống trực tiếp của Trâm hoặc đo latency xử lý thực.
- Chưa đối chiếu số điểm Isolation Forest với một thư viện độc lập.
- Chưa triển khai P2, One-Class SVM, ngưỡng theo ngữ cảnh/độ dài phiên và MFA có khoảng chờ.
- Chưa chứng minh H1, H2 hoặc H3; đặc biệt so sánh cùng một giới hạn chưa phải so sánh đúng cùng TTD/FAR.

Trước dữ liệu thật còn phải chốt số phiên: thiết kế formal hiện 2 train + 1 validation + 1 test chưa đủ hai phiên validation mà phần 3 yêu cầu. Không bỏ kiểm phân hoạch để chạy qua. Tài liệu nội bộ không thay cho một thành viên khác review độc lập mã và kết quả.
