# Kết quả xử lý review phần 3

Ngày thực hiện: 16/10/2026. Căn cứ: [bản review](../REVIEW_VA_HUONG_DAN_DIEU_CHINH.md). Thay đổi chỉ nằm trong phần 3; dữ liệu, tiêu chí và lưới tham số được giữ nguyên.

## 1. Các điểm đã xử lý

| Mục | Cách sửa | Kiểm tra |
|---|---|---|
| R1: cửa sổ lỗi làm thay đổi engine | Tính điểm/trạng thái kế tiếp bằng biến cục bộ, chỉ cập nhật engine sau khi mọi bước thành công | NaN bị từ chối, toàn bộ trạng thái giữ nguyên, gửi lại cùng ID được; kiểm tra cả đầu segment mới khi S/cooldown khác 0 |
| Đặc trưng thiếu bị hiểu thành 0 | Chặn null/undefined/chuỗi trắng/boolean trước chuyển số; vẫn nhận 0 và chuỗi số | Kiểm cả chiều active/inactive |
| R2: thời gian replay/runtime không thống nhất | Dùng chung `src/timing.ts`; xử lý theo thứ tự start, quyết định tại max(end nguồn, quyết định trước) | Long hold cho end nguồn 5000/995 nhưng quyết định 5000/5000; không đổi đặc trưng; từ chối đảo thứ tự |
| Timestamp reset | Ghi SEGMENT_RESET tại thời điểm xử lý, kèm source_start_ms | Test qua segment và kiểm toàn bộ log mới không đi lùi |
| R3: khó phân biệt tác dụng MFA với bằng chứng hành vi | Giữ detected/TTD của toàn chính sách, thêm nguồn cửa sổ cảnh báo và bộ đếm genuine trễ | Genuine trễ, mixed, impostor, cảnh báo trước N, thu hồi trước N và không phát hiện đều có test |
| R4: dùng cờ toàn cục để đếm người | Lưu validationByUser trong model schema 1.1, giữ cờ toàn lựa chọn riêng; fit/evaluate dùng cùng hàm kiểm ràng buộc | Fixture 2/4 người đạt nhưng lựa chọn chung không đạt vẫn báo 2/4 |

### Chi tiết API và log có thay đổi

- `RiskEngine.observe()` nhận cửa sổ theo `start_ms` không giảm. Nó vẫn chặn ID lặp. `end_ms` là end nguồn và có thể giảm khi giữ phím lâu; `time_ms` trả về luôn không giảm.
- Đầu vào bị từ chối không đổi state, status, segment, lastWindowStartMs, lastDecisionMs hoặc seenWindows. Có thể gửi lại cùng ID sau khi sửa.
- `source_start_ms`/`source_end_ms` trong kết quả runtime giữ thời gian nguồn. Trong decisions CSV, `start_ms` cũ vẫn được giữ và bổ sung `source_end_ms`.
- A1 đếm phím người lạ đã quan sát tại thời điểm quyết định khả dụng. Dwell/flight/tốc độ gõ vẫn tính từ timestamp nguồn; không bị kéo dài bởi thời gian chờ cửa sổ trước.
- Không reset theo N. Không đưa label/t0 vào scorer, step hoặc RiskEngine.
- `selection.feasible` giữ nghĩa khả thi trên toàn phạm vi lựa chọn. `selection.validationByUser[target]` chứa metrics và feasible của người đó ở cấu hình đã chọn.
- Trong policy CSV, `validation_feasible` là cờ từng người, `validation_selection_feasible` là cờ toàn lựa chọn. Macro thêm `validation_selection_feasible_all` và đếm đúng `validation_feasible_users`.
- Model schema 1.0 cần fit lại; không tự suy ra cờ từng người từ cờ toàn cục. CLI vẫn khóa hash mã/dữ liệu sau fit.

## 2. Cách xử lý R3 và phần còn cần nhóm chốt

Định nghĩa đang dùng cho bản mô phỏng được giữ: detected/TTD là **cảnh báo đầu tiên của toàn chính sách tại hoặc sau t0**, có thể yêu cầu MFA hoặc thu hồi trực tiếp. Không đổi tiêu chí chọn tham số sau khi xem test.

Nếu cửa sổ gây cảnh báo hoàn toàn là dữ liệu chính chủ nhưng hoàn tất trễ sau N, `detection_evidence` trong scenario_results mang giá trị `delayed_genuine_window`. Ca này vẫn thuộc tập tiếp quản đã diễn ra và vẫn được tính theo định nghĩa toàn chính sách; không loại khỏi mẫu số. Bảng policy/macro báo riêng `delayed_genuine_alert_detections`, còn decisions có `delayed_genuine_alert`.

Nếu cửa sổ gây cảnh báo là mixed hoặc impostor, trường trên mang `post_takeover_window`. Tên này chỉ nói nguồn của cửa sổ hiện tại; CUSUM có thể còn tích lũy từ trước N. Nếu không có detection, để null. Nguồn cửa sổ không được truyền ngược vào bộ quyết định.

Ví dụ genuine trễ ở t0=100, quyết định=110, z=7, B0 h1=6/h2=12: vẫn ghi detected=true, TTD=10 ms/1 phím, nhưng đánh dấu genuine trễ và báo riêng. MFA oracle thất bại ở 110 là lý do phiên bị chặn; không trình bày đây là bằng chứng scorer phân biệt được người lạ.

Phần kỹ thuật và diễn giải đã xử lý. Việc **chọn chỉ số nghiên cứu chính** giữa cảnh báo toàn chính sách và phát hiện hành vi sau N vẫn cần Minh/nhóm xác nhận trước nghiên cứu người thật. Tài liệu phương pháp, bàn giao và report đã ghi rõ trạng thái này, chưa coi đó là quyết định được nhóm phê duyệt. Nếu nhóm chọn định nghĩa khác, phải chốt cách xử lý phiên bị chặn bởi genuine trễ và chạy lại validation/test theo protocol đó.

## 3. Kết quả kiểm tra

- Trước sửa, 47 test cũ qua; 10 test mới đầu tiên thất bại và tái hiện các thiếu sót được nêu. Sau sửa và bổ sung hai ca kiểm tra MFA/schema: **59/59 test qua**.
- `npm run typecheck`: qua với TypeScript 5.9.3, Node 24.16.0.
- Đối chiếu đặc trưng với phần 2: 2.304 cửa sổ đạt, sai số lớn nhất 0.00012728272491907577 theo thước đo trong verify.
- Fit/evaluate đầy đủ vào thư mục mới: `artifacts/simulation-reviewed`.
- Chạy hai lần độc lập bằng `scripts/verify-reproducibility.ts`: 17 file nội dung giống từng byte, loại hai run.json có metadata thời gian.
- Đối chiếu thêm 17 file của lần chạy dùng bàn giao với receipt tái lập: tất cả hash khớp.

Receipt: [reproducibility-reviewed.json](../artifacts/reproducibility-reviewed.json).

Model SHA-256: `ae99e1f3314d068298060063c8f728af30e9d89b9ab77067c6f06f0343e11710`.

Lệnh đã chạy, tại thư mục `final-project/member3`:

```powershell
npm run typecheck
npm test
node src/cli.ts reproduce --out artifacts/simulation-reviewed
node scripts/verify-reproducibility.ts artifacts/repro-check-reviewed
```

Các thư mục output này đã tồn tại sau lần chạy. Muốn chạy lại phải chọn tên mới theo contract của CLI, không ghi đè.

## 4. So sánh trước và sau

Baseline giữ nguyên ở `artifacts/simulation`; bản hiện hành ở `artifacts/simulation-reviewed`.

Đã so cùng hash dữ liệu, cấu hình, toàn bộ profile và policy được chọn: không đổi. Bundle khác do schema 1.1, hash mã mới và các kết quả validation từng người được lưu thêm.

| Bảng CSV | Số hàng trước = sau | Giá trị ở cột cũ thay đổi |
|---|---:|---|
| fixed_windows | 1.536 | Không |
| window_metrics | 8 | Không |
| roc | 1.552 | Không |
| scenarios | 880 | Không |
| decisions | 29.183 | Không |
| events | 7.600 | 108 ô time_ms của SEGMENT_RESET |
| scenario_results | 3.520 | Không |
| policy_metrics | 32 | Không |
| macro_policy_metrics | 8 | Không |
| paired_statistics | 2 | Không |
| failures | 2.477 | Không |

Ngoài cột cũ, các bảng có thêm trường thời gian nguồn, loại cửa sổ gây cảnh báo và cờ validation như mô tả ở trên. 880 hàng scenarios là theo scorer; 3.520 hàng scenario_results là theo cả scorer và policy, không phải 3.520 nguồn người độc lập.

108 mốc reset trước đây ghi theo start của cửa sổ nguồn; bản mới ghi lúc thực hiện xử lý cửa sổ, vẫn giữ mốc nguồn riêng. Đây là thay đổi cách ghi thời gian sự kiện, không đổi điểm hoặc quyết định.

Log mới không có quyết định/sự kiện đi lùi; số cảnh báo genuine trễ trong lần chạy mặc định là 0. Vì những tình huống biên chưa xuất hiện trong các quyết định của baseline, sửa chúng không làm các chỉ số chính đổi ở bộ mô phỏng này. Lỗi được bảo vệ bằng các fixture riêng, không suy ra từ việc metric giữ nguyên.

## 5. Đọc và bàn giao bản hiện hành

- [Kết quả chạy](../artifacts/simulation-reviewed/evaluation/report.md).
- [Hợp đồng API/CSV và những điểm cần nhóm chốt](HANDOFF.md).
- [Phương pháp và công thức](PHUONG_PHAP.md).
- [Nội dung có thể ghép vào báo cáo](BAO_CAO_PHAN_3.md).
- [Bản ghi kiểm chứng](../VERIFICATION.md).

Các cấu hình vẫn chưa đạt ràng buộc validation/test. Các sửa đổi này giúp trạng thái, thời gian và diễn giải kết quả chính xác hơn; không làm xuất hiện bằng chứng mới rằng P1 tốt hơn B1. Giữ nguyên giới hạn về bốn hồ sơ synthetic, test đã được dùng trong phát triển, MFA oracle tức thời và chưa đối chiếu evaluator của Minh.

Không bổ sung mô hình, P2 hoặc cơ chế khác trong lần sửa này. Tại thời điểm xử lý review ngày 16/10, mã chưa commit/push; trạng thái đó là ghi nhận lịch sử của lần kiểm tra. ZIP cũ và kết quả cũ được giữ để đối chiếu.
