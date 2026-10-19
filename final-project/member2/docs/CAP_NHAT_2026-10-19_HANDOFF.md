# Bàn giao năm phiên — cập nhật 19/10/2026

Hợp đồng formal đã đồng bộ giữa protocol, validator, báo cáo và kiểm thử: 20 người, 100 phiên; mỗi người hai train ngày 1, hai validation ngày 2 và một test ngày 3. Đây là thiết kế cho lần thu thật tiếp theo; dữ liệu bàn giao hiện tại vẫn là mô phỏng SIM01–SIM04. Các thay đổi đã staged trước lần sửa này được giữ nguyên. Mọi thay đổi và đầu ra mới của lần bàn giao này chỉ nằm trong `member2/`; mã nguồn và tài liệu phần 3/4 được giữ nguyên.

## Lịch và điều kiện phân tích

Hai phiên validation không được chồng lấp. Validator sắp xếp theo timestamp bắt đầu, tính kết thúc bằng thời lượng tường từ sự kiện, gồm cả quãng tạm dừng. Phiên sau được bắt đầu đúng lúc phiên trước kết thúc; ngày 2 không có yêu cầu nghỉ 30 phút. Ngày 1 vẫn yêu cầu nghỉ ít nhất 30 phút từ kết thúc phiên trước tới bắt đầu phiên sau.

Lịch chồng lấp mang lý do `day2_validation_overlap`; thời gian kiểm tra ngày 2 không hợp lệ mang `invalid_day2_session_timing`. Toàn bộ phiên formal của participant bị đánh dấu không đủ điều kiện, vẫn giữ trong quality output nhưng không tạo strokes nghiên cứu, windows hoặc normalizer. Không đổi schema đầu vào hay chữ ký API. Thu lại dùng `supersedes_session_id` theo hợp đồng hiện có. Phần 3 giữ cách sắp session_id validation: phiên đầu hiệu chỉnh điểm, phiên sau chọn ngưỡng/chính sách.

## Bộ hiện hành và bằng chứng

| Thành phần | Đường dẫn từ `final-project/` | Kiểm tra |
|---|---|---|
| Dữ liệu phần 2 | `member2/artifacts-2026-10-19-handoff/` | 54 file khớp qua tái lập, so cả summary, input/source hashes; không so PDF và byte run.json |
| Receipt phần 2 | `member2/verification-2026-10-19-handoff.json` | SHA-256 các file được so |
| Fit và evaluate phần 3 | `member2/handoff-checks-2026-10-19/simulation-2026-10-19-handoff/` | Fit mới khóa đúng receipt phần 2 mới |
| Tái lập phần 3 | `member2/handoff-checks-2026-10-19/reproducibility-2026-10-19-handoff.json` | 17 file khớp từng byte giữa hai lần chạy Node.js 24.22.0; không so metadata hai run.json |
| Adapter phần 4 | `member2/handoff-checks-2026-10-19/member4-fixed-2026-10-19-handoff/` | 1.536 hàng điểm, 8/8 cặp scorer–tài khoản khớp; tolerance 1e-12, hash byte-exact |
| So với lịch sử | `member2/handoff-checks-2026-10-19/handoff-comparison-2026-10-19.json` | So dữ liệu, model, bảng chỉ số và decision logs |

Model mới SHA-256: `d63ad55406c7fc2a93a7b917597a29fabd03afd965027b8668a521fd1650592c`.

Tất cả 54 file phần 2 được so với bộ `member2/artifacts/` đều giống từng byte; mô phỏng vẫn có 24 phiên và 28.800 lần gõ hợp lệ. Chỉ receipt nguồn thay đổi. Model phần 3 chỉ đổi `inputHashes.processed/run.json`; profiles, tham số, ngưỡng, cấu hình và phân hoạch validation giữ nguyên. 15 file phần 3 khác model/run metadata giống từng byte với lần `simulation-2026-10-19`, gồm toàn bộ bảng chỉ số và báo cáo.

Riêng `decisions.csv` có 14 ô ở 6 hàng lệch tối đa 1.7763568394002505e-15, ở các cột số `a`, `z`, `s`, `s_previous`, giữa bản lịch sử Node.js 24.16.0 và lần mới Node.js 24.22.0. Chạy lại Node.js 24.16.0 trên máy hiện tại cho decisions.csv giống lần mới từng byte, nên chưa xác định nguyên nhân chính xác và không quy sai lệch riêng cho phiên bản Node. Mọi ô khác, hành động và bảng chỉ số giữ nguyên; receipt ghi từng sai lệch với tolerance so lịch sử 1e-12. Phép tái lập hai lần cùng runtime vẫn yêu cầu byte-exact, không nới kiểm hash.

## Kiểm thử đã chạy

- Pipeline: build và 50/50 test đạt. Ca mới bao gồm start trùng, overlap một millisecond, tiếp giáp, đảo thứ tự manifest, pause kéo dài, thời lượng lỗi và integration loại features nhưng giữ quality.
- Collector: build/typecheck và 9/9 test đạt; browser smoke đạt qua máy chủ cục bộ, gồm capture, pause/resume, JSON privacy và layout mobile. Dữ liệu browser QA tự động không phải dữ liệu nghiên cứu hay đồng thuận thật.
- Phần 3: typecheck và 65/65 test đạt bằng Node.js 24.22.0; 2.304 cửa sổ khớp tái tạo đặc trưng trong tolerance 0.002, sai số lớn nhất 0.00012728272491907577.
- Phần 4: 48/48 test đạt; adapter chạy với bộ mới và đối chiếu chỉ số cửa sổ cố định. Chưa đối chiếu độc lập replay có trạng thái TTD/MFA.

## Lệnh tái lập

Cần Node.js >=24 cho phần 3 và adapter; Node.js >=22 cho phần 2. Cài dependency bằng lockfile của từng package. Các đầu ra `my-*` phải mới hoặc rỗng; adapter yêu cầu thư mục đích chưa tồn tại. Lệnh không có `--data` của phần 3 vẫn đọc `member2/artifacts/` lịch sử. Kiểm reproducibility bộ lịch sử với nguồn phần 2 mới sẽ báo source hash khác; dùng bundle mới dưới đây để kiểm nguồn hiện hành.

Từ `final-project/member2/pipeline/`:

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm exec playwright install chromium
pnpm run verify:reproducibility ../artifacts-2026-10-19-handoff
pnpm run reproduce --config config.json --output ../artifacts-my-handoff
pnpm run export:pdf ../artifacts-my-handoff/processed/report.vi.html ../artifacts-my-handoff/processed/report.vi.pdf
```

Từ `final-project/member2/collector/`, chạy `pnpm test`. Để kiểm browser, chạy `pnpm run start:built` ở terminal riêng rồi `pnpm run test:browser`; dừng server sau khi kiểm.

Kiểm tra tích hợp tùy chọn từ `final-project/member2/`, với Node.js >=24 và dependency phần 3/4 đã có sẵn. Các lệnh chỉ đọc mã phần 3/4; đầu ra nằm trong `member2/`:

```bash
node ../member3/src/cli.ts verify --data artifacts-2026-10-19-handoff/processed
node ../member3/src/cli.ts reproduce --data artifacts-2026-10-19-handoff/processed --out handoff-checks-my-run/simulation
node ../member4/src/member3-adapter.mjs --evaluation handoff-checks-my-run/simulation/evaluation --model handoff-checks-my-run/simulation/fit/model.json --artifacts artifacts-2026-10-19-handoff --output handoff-checks-my-run/fixed-window
```

Bằng chứng kiểm tích hợp đã chạy được giữ tại `member2/handoff-checks-2026-10-19/`. Receipt ghi vị trí và trạng thái working tree tại thời điểm chạy trước khi gom đầu ra về phần 2; nội dung và hash đầu ra không thay đổi khi chuyển thư mục. Script reproducibility của phần 3 được giữ nguyên, không thêm cờ mới. Không trộn model cũ với receipt mới hoặc sửa hash để bỏ qua kiểm tra. Chưa có kết quả người tham gia thật và chưa xác nhận H1/H2/H3.
