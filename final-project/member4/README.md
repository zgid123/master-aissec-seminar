# Thành viên 4 — Bộ đánh giá và quy trình thực nghiệm

**Võ Công Minh · phần thực nghiệm và đánh giá.**

Bộ mã **không cài đặt mô hình phát hiện, CUSUM hoặc pipeline thu dữ liệu**. Cập nhật 18/10/2026: đã nối điểm cửa sổ cố định từ bản reviewed của anh Vũ và đối chiếu độc lập FAR/FRR/EER trên dữ liệu mô phỏng; chưa nối replay TTD/MFA hoặc dữ liệu người thật.

## Tài liệu gửi nhóm

- [Bản tổng hợp để ghép báo cáo](NGHIEN_CUU_LIEN_QUAN_VA_DINH_HUONG_DANH_GIA.docx), [nguồn Markdown](NGHIEN_CUU_LIEN_QUAN_VA_DINH_HUONG_DANH_GIA.md): nội dung tiếng Việt về ba nghiên cứu liên quan, cách vận dụng vào đánh giá và giới hạn kết luận. Đã biên tập từ phần đối chiếu, giữ trích dẫn; chưa gửi thay Minh hoặc chèn vào báo cáo chung.
- [Bản Word hiện tại để review](QUY_TRINH_THUC_NGHIEM_VO_CONG_MINH.docx): bản nháp 0.5, giữ tên không hậu tố. Bổ sung phát biểu bài toán, luồng đo, thuật ngữ, nguồn công thức/tham số, phân biệt mô phỏng/người thật, xung đột lịch validation và ba nguồn PDF đã đối chiếu có giới hạn. Trạng thái gửi tài liệu được ghi riêng trong note của Minh; file local mới không có nghĩa nhóm đã nhận bản mới.
- [Nguồn tài liệu](QUY_TRINH_THUC_NGHIEM_VO_CONG_MINH.md): chỉnh tại đây rồi xuất lại Word.
- [Tóm tắt ba tài liệu khoa học](TOM_TAT_3_TAI_LIEU_VO_CONG_MINH.docx), [nguồn Markdown](TOM_TAT_3_TAI_LIEU_VO_CONG_MINH.md): năm ý cho mỗi bài theo bảng phân công. PDF gốc không đưa lên Git; DOI có trong tài liệu.
- [Review mã member3](REVIEW_MA_MEMBER3_VO_CONG_MINH.docx) và [phân tích ca lỗi mô phỏng](PHAN_TICH_CA_LOI_MO_PHONG_VO_CONG_MINH.docx), kèm nguồn Markdown cùng tên.
- Bản gom để cả nhóm đọc nhanh: [`../shared/member4`](../shared/member4/README.md).

Chị Trâm review protocol/phạm vi; anh Phong xác nhận nguồn dữ liệu và split. Anh Vũ đã có model schema 1.1 và log; adapter hiện chỉ nhận `fixed_windows.csv`. Schema đánh giá hiện là **đề xuất 0.1**, chưa phải hợp đồng replay được cả nhóm duyệt.

### Đối chiếu bản member3 mới

- [Kết quả đối chiếu gửi nhóm](DOI_CHIEU_MEMBER3_VO_CONG_MINH.docx) và [nguồn Markdown](DOI_CHIEU_MEMBER3_VO_CONG_MINH.md).
- Sau cập nhật member2 `f0fb15c`, `sessions.csv` và receipt xử lý đổi nội dung; kết quả bên dưới là lịch sử trước cập nhật. Adapter hiện dừng ở receipt không khớp, kể cả `--allow-crlf`; cần run fit/evaluate mới và thống nhất lịch validation trước tích hợp tiếp. Chi tiết ở mục 7 bản đối chiếu.
- [Kết quả máy đọc](results/member3-fixed-reviewed/reconciliation.json), [biên nhận nguồn](results/member3-fixed-reviewed/receipt.json), [bảng từng người](results/member3-fixed-reviewed/evaluation/per-user.csv), [ROC](results/member3-fixed-reviewed/evaluation/roc.svg).
- 1.536 lượt chấm = 192 cửa sổ test W50 × 4 tài khoản đích × 2 scorer. Đây không phải 1.536 quan sát độc lập. Tám hàng scorer/tài khoản khớp chỉ số phần 3 trong sai số tuyệt đối 1e-12.
- Mọi ngưỡng cửa sổ được kiểm tra với model đã khóa; tất cả cờ `validation_window_feasible` của bản hiện tại là false. Kết quả chỉ để chẩn đoán/tích hợp, không chứng minh giả thuyết hoặc hiệu quả trên người thật.

Adapter riêng cần **Node.js >=24** và thư mục `member3` để dùng lại hàm đọc CSV TypeScript sẵn có; phần evaluator gốc vẫn không cần dependencies ngoài Node. Từ `member4`, chạy vào thư mục đầu ra mới:

```powershell
node .\src\member3-adapter.mjs --evaluation ..\member3\artifacts\simulation-reviewed\evaluation --model ..\member3\artifacts\simulation-reviewed\fit\model.json --artifacts ..\member2\artifacts --output .\results\member3-fixed-rerun
```

Mặc định hash phải khớp từng byte. Checkout Windows hiện dùng `core.autocrlf=true`, khiến hash file CRLF khác receipt LF. Nếu thông báo xác nhận `LF-only match=true`, có thể chạy lại lệnh trên kèm **`--allow-crlf`**. Tùy chọn này chỉ nhận file có hash khớp receipt sau thay CRLF bằng LF; sửa nội dung khác vẫn dừng. Mỗi file như vậy có cảnh báo stderr, lưu hash byte thực tế/hash kỳ vọng và loại đối chiếu trong `receipt.json`. Không sửa dữ liệu, receipt, cấu hình Git hoặc mã member2/member3. Đây là đối chiếu tương đương xuống dòng, **không phải khớp từng byte**.

Adapter kiểm hash của model, manifest, 24 nguồn thô, receipt và bốn file xử lý; kiểm danh tính nguồn, split, toàn bộ lưới cửa sổ theo scorer/đích, nhãn, ngưỡng và quyết định. Không tự fit lại, tính lại đặc trưng/score, hoặc xác nhận toàn bộ quy trình không leakage. CSV/parser dùng chung phần 3; **công thức metrics dùng mã member4 độc lập**, không gọi metrics của member3.

Xuất lại các tài liệu Word sau khi sửa nguồn Markdown:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\export-protocol.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\export-protocol.ps1 -SourceName DOI_CHIEU_MEMBER3_VO_CONG_MINH.md -OutputName DOI_CHIEU_MEMBER3_VO_CONG_MINH.docx
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\export-protocol.ps1 -SourceName TOM_TAT_3_TAI_LIEU_VO_CONG_MINH.md -OutputName TOM_TAT_3_TAI_LIEU_VO_CONG_MINH.docx
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\export-protocol.ps1 -SourceName NGHIEN_CUU_LIEN_QUAN_VA_DINH_HUONG_DANH_GIA.md -OutputName NGHIEN_CUU_LIEN_QUAN_VA_DINH_HUONG_DANH_GIA.docx
```

`-SourceName` và `-OutputName` chỉ nhận tên file trong member4, không nhận thư mục; đóng bản Word tương ứng nếu đang mở trước khi thay.

Đầu ra gồm `input.json`, `reconciliation.json`, `receipt.json` và thư mục `evaluation/` theo schema sẵn có. `episodes` rỗng: TTD/MFA có tỷ lệ NA, không coi là bằng 0 hoặc là kết quả replay. Mẫu số MFA của member3 chỉ dùng G0, trong khi evaluator hiện tính cả đoạn chính chủ của A1 nếu đưa A1 vào; cần thống nhất trước khi nối. `delayed_genuine_window`, thứ tự sự kiện trùng timestamp và cách đếm phím tại lúc dừng cũng phải giữ nguyên, không suy từ hàng quyết định cuối một cách tùy ý.

Kiểm tra ngày 18/10 bằng Node 24.19.0: **46/46 tests member4 đạt**. Lệnh `verify`/suite member3 tại checkout hiện tại bị chặn bởi hash CRLF. Đã tạo bản sao tạm chỉ đổi CRLF thành LF, kiểm hash nguồn mã/dữ liệu với receipt rồi chạy: verify đạt 2.304/2.304 cửa sổ, **59/59 tests member3 đạt trong bản sao LF**. Đã xóa bản sao; không sửa file gốc và không gọi đây là suite đã đạt trực tiếp trên checkout CRLF.

## Chạy nhanh

Cần **Node.js >=22**. Mã dùng JavaScript ESM và thư viện chuẩn Node để có thể chép sang máy khác mà không cài dependencies, không cần Python, pnpm, npm install hoặc build TypeScript. Đây là lựa chọn cho bộ đánh giá độc lập, không thay đổi stack của các thành viên.

PowerShell, từ thư mục gốc repository:

```powershell
Set-Location .\final-project\member4
node --test
node .\src\cli.mjs --demo --output .\results\demo
```

Thư mục đầu ra **phải chưa tồn tại**. Nếu đã có bản demo bàn giao, dùng tên khác:

```powershell
node .\src\cli.mjs --demo --output .\results\demo-rerun
```

Các script tương đương: `npm test`, `npm run demo`. Không chạy đồng thời hai lệnh trỏ cùng thư mục đầu ra.

Fixture gồm 4 hồ sơ FIX, 12 bản ghi manifest, 32 cửa sổ và 16 episode. Các điểm và sự kiện được thiết kế thủ công để kiểm tra công thức. **Tên B1/P1 trong fixture không có nghĩa mô hình B1/P1 đã được chạy.** Hash trong manifest fixture định danh nhãn fixture, không phải file thu phím.

### Đánh giá đầu vào khác

```powershell
node .\src\cli.mjs --input .\results\demo\input.json --output .\results\replay-01 --baseline B1 --candidate P1 --seed 20261016 --horizon 150 --iterations 2000
```

- `--split`: `test` mặc định hoặc `validation`; không có hàng thuộc tập đó thì báo lỗi.
- `--horizon`: số phím hợp lệ theo dõi tiếp quản, mặc định 150 chỉ để chạy thử; **không phải mục tiêu nghiên cứu đã được nhóm duyệt**.
- `--seed`: uint32, mặc định 20261016.
- `--iterations`: 100–100000, mặc định 2000.
- `--baseline` và `--candidate`: chọn cùng lúc hai phương pháp khác nhau để so sánh MFA/giờ. Demo mặc định B1/P1; đầu vào thông thường không tự chọn phương pháp.
- Mã thoát 0 là xuất thành công; mã thoát 1 là input/options/I/O lỗi. Lỗi in rõ ra stderr. Không ghi đè run cũ.

### Đầu ra

| File | Nội dung |
|---|---|
| `input.json` | Bản sao nguyên đầu vào; có thể dùng làm ví dụ schema |
| `report.json` | Chỉ số, tử số/mẫu số, lý do NA, ROC, TTD/censoring, thống kê ghép cặp |
| `per-user.csv` | Một hàng/người/phương pháp |
| `macro-summary.csv` | Tổng hợp người có trọng số bằng nhau; số người thiếu chỉ số |
| `takeover-outcomes.csv` | Từng ca tiếp quản, phát hiện/kiểm duyệt/chưa tiếp quản và kết cục tại L |
| `roc.svg` | ROC riêng từng người/phương pháp; ghi nguồn fixture/synthetic/real |
| `run.json` | Options, phiên bản Node, Git/dirty state, SHA-256 input/mã/đầu ra |

CSV dùng ô trống cho NA; xem lý do cụ thể trong JSON. CSV bảo vệ trường chuỗi có tiền tố công thức khi mở bảng tính. Không lấy ô trống thành số 0. SHA-256 của evaluator vẫn có khi chép gói ra ngoài Git; việc không có Git được ghi cảnh báo.

## Hợp đồng đầu vào 0.1

Xem `results/demo/input.json` sau khi chạy demo. Tên trường và đơn vị sau là bắt buộc.

### Cấp gốc

| Trường | Quy tắc |
|---|---|
| `schema_version` | `"0.1"` |
| `data_kind` | `fixture`, `synthetic` hoặc `real`; không trộn nguồn trong một run |
| `provenance` | Chuỗi mô tả nguồn, quy trình xuất và giới hạn |
| `score_direction` | `"higher_is_more_anomalous"`; đổi chiều score ở adapter nếu cần |
| `window_track` | `"fixed_window_scores"`; không nhận log bị dừng sau thu hồi làm bộ cửa sổ cố định |
| `sessions` | Danh sách phiên nguồn và split |
| `windows` | Danh sách điểm/nhãn/quyết định của cửa sổ cố định |
| `episodes` | Danh sách phiên replay có sự kiện |

`windows` hoặc `episodes` có thể rỗng, nhưng phải có ít nhất một hàng được đánh giá. Mỗi trường hợp thiếu loại dữ liệu được báo NA, không tạo kết quả thay thế.

### Phiên nguồn (`sessions`)

`session_id` duy nhất; `participant_id` là hồ sơ nguồn; `split` thuộc `train/validation/test`; `data_kind` khớp cấp gốc; `sha256` là 64 ký tự hex chữ thường.

Validator phát hiện mã phiên trùng, hash dùng chéo split và hàng tham chiếu phiên sai split. **Chỉ kiểm lời khai trong manifest**, chưa đọc file thô để xác nhận hash, chưa phát hiện mọi dạng cửa sổ chồng lấp/trích xuất lại, chưa kiểm cách mô hình fit. Khi nối member2 phải giữ manifest/run thật, đối chiếu file nguồn và review fit/transform.

### Cửa sổ (`windows`)

| Trường | Ý nghĩa |
|---|---|
| `method_id` | Tên scorer/ngưỡng cửa sổ đang đánh giá |
| `claimed_profile` | Tài khoản đích, tồn tại trong manifest |
| `split` | Tập của mọi phiên nguồn |
| `window_id` | Cùng cửa sổ dùng cùng ID qua các phương pháp, duy nhất trong phương pháp/đích/split |
| `source_session_ids` | Mảng phiên nguồn; cửa sổ trộn có cả nguồn chính chủ/người lạ |
| `label` | `genuine`, `impostor`, `mixed`, `unknown` |
| `score` | Số hữu hạn, lớn hơn là bất thường hơn |
| `accepted` | Boolean quyết định thực tế tại ngưỡng đã khóa; không suy ra từ EER test |

Validator đối chiếu nhãn với người nguồn khi nhãn xác định. Nếu các phương pháp dùng cùng ID cửa sổ nhưng nguồn/nhãn khác thì báo lỗi. Người gọi còn phải đảm bảo tập cửa sổ đầy đủ và công bằng qua các phương pháp; không lấy mẫu số khác nhau rồi tuyên bố tương đương.

Giá trị FAR/FRR dùng `accepted`, còn ROC/EER quét `score`. Vì vậy FAR/FRR vận hành không nhất thiết bằng EER. Các chỉ số này **không phải FAR của CUSUM có reset/cooldown**.

### Phiên replay (`episodes`)

| Trường | Ý nghĩa |
|---|---|
| `episode_id` | Kịch bản/đoạn thử, giữ cùng ID qua phương pháp |
| `method_id`, `claimed_profile`, `split`, `source_session_ids` | Như bảng cửa sổ |
| `takeover_ms` | Keydown đầu của người lạ, ms từ đầu replay; `null` nếu phiên chính chủ |
| `planned_end_ms` | Điểm cuối dự kiến của chuỗi thử, giữ nguyên qua phương pháp |
| `end_ms` | Điểm dừng quan sát thực tế, có thể sớm hơn do thu hồi/gián đoạn |
| `genuine_wall_seconds` | Tổng thời gian chính chủ được quan sát, trước takeover hoặc trước dừng phiên |
| `genuine_recording_seconds` | Phần thời gian chính chủ đang ghi, bỏ tạm dừng; không lớn hơn wall |
| `observed_attacker_keys` | Số lần gõ người lạ hợp lệ đã quan sát; 0 nếu chưa tới takeover |
| `termination_reason` | `completed`, `interrupted`, `revoke` |
| `events` | Danh sách sự kiện theo thứ tự |

Thời gian replay bắt đầu tại 0. Phải cung cấp exposure chính chủ chính xác từ log, không lấy tổng thời lượng gộp cả người lạ. Validator kiểm giới hạn số học, không thể tự chứng minh exposure đúng với dữ liệu thô.

Mỗi event có `event_id` duy nhất trong episode, `type`, `t_ms`, `attacker_keys`. `type` là `mfa_request`, `mfa_pass`, `mfa_fail`, `revoke`. Chỉ ghi sự kiện bắt đầu yêu cầu MFA, không ghi một yêu cầu mới cho từng cửa sổ pending.

- MFA result phải có request trước đó.
- MFA fail phải đi ngay trước revoke ở cùng timestamp.
- Revoke là sự kiện cuối, tại `end_ms`; không có sự kiện sau thu hồi.
- `attacker_keys` không giảm, không vượt số phím quan sát; trước takeover bằng 0, từ takeover ít nhất 1.
- Cảnh báo trước takeover không phải phát hiện. Thu hồi trước takeover làm kịch bản chưa đạt điểm tiếp quản.
- Bộ đánh giá không tái hiện cooldown/reset/CUSUM từ các event này: anh Vũ/chị Trâm xuất kết quả replay từ chính logic hệ thống.

## Các phép thống kê đã có

- FAR/FRR kèm tử số/mẫu số; EER nội suy tuyến tính, xử lý score ties.
- TTD theo ms/phím, kiểm duyệt phải, chưa tới takeover, tỷ lệ phát hiện complete-case tại chân trời chung.
- Đếm MFA/giờ theo wall/recording và thu hồi oan.
- Median/Q1/Q3/IQR nội suy tại `(n-1)*q`; macro theo người.
- Bootstrap percentile 95% của **trung bình hiệu số MFA/giờ theo người**, seed tái lập.
- Wilcoxon signed-rank hai phía: phân phối hoán vị dấu exact có điều kiện trên midrank quan sát, bỏ zero. Tối đa 50 hiệu số khác 0; dưới 2 hiệu số khác 0 trả NA.
- Effect size rank-biserial và hiệu số có đơn vị.

So sánh MFA cần cùng episode ID, nguồn, mốc takeover và thời lượng kế hoạch cho mỗi người; lệch kế hoạch thì báo lỗi. Thiếu người ở một phương pháp hoặc thiếu exposure được liệt kê riêng. Kiểm tra này **không** bảo đảm matched TTD/FAR hoặc độc lập giữa người.

Không có Kaplan-Meier, CI có xử lý phụ thuộc chéo người đích/nguồn, kiểm định TTD kiểm duyệt hoặc kết luận H1 tự động. Median TTD hiện chỉ có điều kiện đã phát hiện. Tỷ lệ complete-case có thể lệch nếu thiếu theo dõi; số ca thiếu được báo riêng.

**Chặn trường hợp MFA chờ xuyên qua takeover:** nếu episode đã tới takeover và có yêu cầu MFA trước đó chưa hoàn tất *strictly before* takeover, validator và hàm metrics dừng với lỗi `MFA_PENDING_AT_TAKEOVER`, ghi rõ method/profile/episode và request ID. CLI trả mã 1 trước khi tạo thư mục kết quả. Không gán thành phát hiện, không đổi sang kiểm duyệt và không âm thầm loại ca đó khỏi mẫu số.

Đây là hàng rào tạm cho giới hạn schema 0.1, không phải quy tắc xử lý phiên của hệ thống. Nó áp dụng cả khi yêu cầu cũ sau đó pass, fail, bị thu hồi trực tiếp hoặc còn pending. Kết quả MFA cũ đúng bằng timestamp takeover cũng bị chặn vì chưa có thứ tự sự kiện giữa hai luồng. Không xóa ca, sửa nhãn hoặc reset trạng thái để vượt kiểm tra.

MFA hoàn tất trước takeover, yêu cầu mới tại/sau takeover, và phiên dừng trước khi takeover diễn ra vẫn được xử lý như trước. Khi có log thật, cần thống nhất với phần tích hợp: phiên có cho tiếp tục gõ lúc MFA_PENDING không, thứ tự takeover/kết quả MFA và cách liên kết yêu cầu–kết quả/nguyên nhân thu hồi. Sau đó mới bổ sung phân loại cho các ca đang bị chặn. Fixture demo giữ nguyên; regression tests riêng bao phủ các tình huống này.

## Xuất lại Word

Windows PowerShell, từ thư mục `member4`:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\export-protocol.ps1
```

Không cần cài Word. Script xuất OOXML ZIP từ Markdown của protocol, hỗ trợ tiêu đề và đoạn văn mà tài liệu này đang dùng; không phải bộ chuyển Markdown tổng quát. Script thay bản Word sinh ra, không sửa báo cáo của chị Trâm. UTF-8 được đọc/ghi tường minh.

Đầu ra mặc định là `QUY_TRINH_THUC_NGHIEM_VO_CONG_MINH.docx`, theo tên Minh đã đổi. Nếu bản đích đang được mở và bị khóa, đóng bản đó hoặc truyền `-OutputName TEN_BAN_MOI.docx`; script báo lỗi thay vì ghi đè ngầm sang file khác.

## Trạng thái theo phân công

| Đầu việc mục 4 | Trạng thái |
|---|---|
| Quy trình, split, kịch bản, công thức, giới hạn | Có bản đề xuất Word/Markdown, chờ review nhóm |
| Mã chỉ số và thống kê | Có mã cùng fixture/tests; chạy lại ngày 18/10, 48/48 tests đạt (thêm test cho script phân tích ca lỗi) |
| Mẫu bảng/ROC và manifest tái lập | Có fixture và bảng/ROC đối chiếu điểm mô phỏng TV3 |
| Adapter log TV3 | Lần lịch sử khớp fixed_windows 8/8 hàng; receipt member2 mới không còn khớp model cũ, chưa nối replay TTD/MFA |
| Ghép raw thành A1 | TV3 đã có; member4 chưa tái dựng độc lập và chưa nhập vào evaluator |
| Bảng kết quả người thật, ablation, kiểm định thực nghiệm | Bỏ thu dữ liệu người thật (quyết định 18/10) vì không kịp; báo cáo chỉ trình bày phạm vi mô phỏng và ghi rõ giới hạn |
| Phân tích lỗi nghiên cứu | Có [PHAN_TICH_CA_LOI_MO_PHONG_VO_CONG_MINH](PHAN_TICH_CA_LOI_MO_PHONG_VO_CONG_MINH.md) và script `scripts/analyze-member3-failures.mjs` (kết quả trong `results/member3-failure-analysis`); chỉ trên mô phỏng lịch sử |
| Phần báo cáo thực nghiệm và phản biện | Có phương pháp, câu hỏi bảo vệ, đối chiếu mô phỏng và bản tổng hợp nghiên cứu; thiếu kết quả cuối cùng và phân tích sai số |
| Ba tài liệu khoa học | Có tổng hợp và [TOM_TAT_3_TAI_LIEU_VO_CONG_MINH](TOM_TAT_3_TAI_LIEU_VO_CONG_MINH.md) theo 5 ý; chờ Minh đọc duyệt, chưa tái lập thí nghiệm tác giả |
| Review mã thành viên khác | Có [REVIEW_MA_MEMBER3_VO_CONG_MINH](REVIEW_MA_MEMBER3_VO_CONG_MINH.md) (M1-M6, chỉ đọc, không sửa mã member3) |
| Hai buổi bảo vệ thử | Chưa có xác nhận thực hiện |
| Bàn giao cho nhóm | Bản protocol cũ đã gửi. Các bản mới đã chép vào `final-project/shared/member4` (bản sao, nguồn vẫn ở member4; sửa nguồn thì chép lại). Chưa gửi tin nhắn, chưa commit |

Không cần chờ nhóm để kiểm thử công thức. Tuy nhiên phải chốt các quyết định ảnh hưởng thực nghiệm trước khi chạy chính thức. Không dùng fixture hoặc tự gán `real` để lấp phần còn thiếu.

Rà soát ngày 18/10 lúc 23:01: ưu tiên tiếp theo là review có giới hạn phần mô hình theo chế độ chỉ đọc, ghi nhận xét trong member4; sau đó phân tích một số ca lỗi của lần mô phỏng lịch sử nếu còn phù hợp. Chưa tự sửa mã, tài liệu hoặc đầu ra của thành viên khác. Các vướng mắc validation, receipt và định nghĩa replay được ghi trong bản đối chiếu phần 3; không làm yếu kiểm tra để vượt qua. Bảng trạng thái này không phải lịch tiến độ.

## Lịch sử kiểm chứng ngày 16/10/2026

- Node v24.19.0: **30/30 tests đạt**, không skip; coverage dòng 98,07%, nhánh 94,08%. Đã tái hiện 5 regression thất bại trước khi thêm guard, sau đó tất cả đạt.
- Các tests mới kiểm tra MFA trước/sau/đúng mốc takeover, pass/fail/pending/revoke; API và CLI đều chặn log chưa đủ quy tắc phân loại, CLI không tạo báo cáo một phần.
- Đã đối chiếu mã guard mới với 5 output demo có sẵn (JSON/CSV/SVG): nội dung vẫn khớp từng byte. `results/demo/run.json` giữ nguyên hash mã tại thời điểm chạy cũ, không được diễn giải là hash của mã hiện tại.
- Kiểm thử CLI so sánh từng byte report/CSV/SVG giữa lần tạo fixture và lần đọc lại input; đối chiếu SHA-256 và xác nhận không ghi đè run cũ.
- Word bản 0.2 tại ngày 16/10: kiểm tra 5 phần XML hợp lệ và 12 heading; sau khi thêm lời nhắc đọc mục 9 có 106 đoạn và văn bản trích ngược khớp toàn bộ nguồn Markdown. Không còn lịch theo ngày hoặc lời giao việc cũ. Đã thử cả tạo mới và xuất đè bản 0.2 không bị khóa. Chưa kiểm tra phân trang trong Microsoft Word.
- SVG đã mở và kiểm tra trực quan nhãn nguồn, tiêu đề và trục.
- Các kiểm tra trên xác minh **bộ công cụ**, không xác minh hiệu quả xác thực hoặc mô hình của nhóm.

Ngày 18/10: đã xuất lại protocol (107 đoạn) và bản đối chiếu phần 3 (39 đoạn); XML hợp lệ, trích ngược khớp toàn bộ hai nguồn Markdown. Đã kiểm source/output hash của run mới và chạy lại vào thư mục tạm: tám file nội dung input/đối chiếu/bảng/JSON/SVG khớp từng byte, không so timestamp của receipt. Chưa kiểm phân trang Word trực quan. Các lần kiểm này không thay thế review độc lập toàn bộ mô hình.

Sau đó trong ngày 18/10: protocol nâng bản nháp 0.3 và tài liệu đối chiếu bổ sung quy tắc nhận bộ dữ liệu mới. Các số đoạn phía trên thuộc lần xuất trước. Thay đổi lần này chỉ ở tài liệu, không đổi mã, ngưỡng, số liệu hoặc cách tính metrics; chưa nhận bộ dữ liệu mới từ member2.

Xuất bản nháp 0.3: protocol 137 đoạn, bản đối chiếu 41 đoạn; XML hợp lệ, trích ngược khớp nguồn. Giữ nguyên số mục 1–12 để các lời nhắc mục 9/10 không sai. Các nguồn S1–S6 được phân biệt với paper mới cần đọc; tham số đã đối chiếu model reviewed. Hash mã evaluator và kết quả máy đọc giữ nguyên. Không chạy lại unit tests cho thay đổi chỉ tài liệu; chưa kiểm phân trang bằng Word.
