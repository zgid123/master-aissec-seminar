# Bàn giao phần 3 cho nhóm

Cập nhật hiện hành ngày 19/10/2026: dùng `artifacts/simulation-2026-10-19`, không lấy lại bảng của lần chạy cũ. Đọc [CAP_NHAT_2026-10-19.md](CAP_NHAT_2026-10-19.md) để biết phần đã sửa và phần còn cần phối hợp.

Cập nhật ngày 18/10/2026: xem [BO_SUNG_THEO_GOP_Y_GIAO_VIEN.md](BO_SUNG_THEO_GOP_Y_GIAO_VIEN.md) để ghép đúng những đoạn còn thiếu. Bảng nguồn/cấu hình nằm trong BAO_CAO_PHAN_3.md; không chèn lại các mục bài toán/chỉ số đã có ở phần Trâm/Minh. Chưa sửa trực tiếp hai bản Word của các thành viên.

## Phong — dữ liệu đầu vào

Phần 3 đọc trực tiếp bốn file trong `member2/artifacts/processed`: `windows.csv`, `strokes.csv`, `sessions.csv`, `normalizers.json`; đồng thời cần `run.json`, manifest và JSON thô để xác minh nguồn và tính thời gian quan sát.

Đã bám quy ước 3 nhóm phím, 12 đặc trưng và chuẩn hóa theo tài khoản đích. Không đổi mã hoặc file dữ liệu của Phong. `verify` tái tạo toàn bộ 2.304 cửa sổ từ `strokes.csv` rồi so đặc trưng với `windows.csv`. Sai số cho phép 0.2% theo thước đo chuẩn hóa trong mã để tính đến CSV 9 chữ số có nghĩa; sai số lớn nhất đo được trong bộ hiện tại khoảng 0.01273%. Đây là kiểm tra tương thích từ các lần gõ đã xử lý, không phải review độc lập cách ghép cặp sự kiện thô.

Khi chuyển sang dữ liệu thật, cần ít nhất hai phiên validation hợp lệ mỗi người để tách hiệu chỉnh điểm và chọn ngưỡng. Train/test cũng phải có đủ phiên và các đoạn đủ dài cho A1. Nếu một phiên bị chia thành nhiều đoạn quá ngắn, có thể không tạo được A1 theo cấu hình; chương trình báo thiếu dữ liệu, không tự đổi prefix/suffix cho từng mô hình.

Thiết kế formal mới trong `member2/pipeline/src/study-design.ts` hiện kiểm đúng 4 phiên/người: 2 train, 1 validation, 1 test. Thiết kế này chưa đủ cho phần 3. Phương án đề nghị là 5 phiên/người: 2 train ngày 1, 2 validation ngày 2, 1 test ngày 3. Phong cần thống nhất và cập nhật cả validator/protocol trước khi thu; chỉ thêm phiên thứ 5 sẽ bị quy tắc đúng 4 phiên từ chối. Đây chưa phải thay đổi đã áp dụng. Không chia ngẫu nhiên cửa sổ của một phiên để né lỗi và không dùng test hiệu chỉnh điểm.

## Trâm — API tính điểm và quyết định

Nhập từ `member3/src/index.ts`, chạy bằng Node.js 24. Ví dụ từ một file TypeScript nằm ngay trong thư mục `member3`:

```typescript
import {readFile} from 'node:fs/promises';
import {RiskEngine} from './src/index.ts';
import type {Bundle, WindowRow} from './src/index.ts';

const bundle: Bundle = JSON.parse(
  await readFile('artifacts/simulation-2026-10-19/fit/model.json', 'utf8')
);
const key = 'isolation_forest/SIM01';
const profile = bundle.profiles[key];
const selection = bundle.selections[key].P1;
// feasible=false: chỉ chạy demo/chẩn đoán, không gọi là cấu hình đạt yêu cầu.
const engine = new RiskEngine(profile, selection.policy);

function handleWindow(window: WindowRow) {
  // Dùng cửa sổ thô từ bộ trích đặc trưng, chưa chuẩn hóa.
  const result = engine.observe(window);
  if (result.status === 'MFA_PENDING') {
    // Tạm dừng đưa cửa sổ mới vào engine; bộ điều khiển thực hiện MFA.
    // Sau đó gọi engine.resolveMfa(passed).
  }
  return result;
}
```

`observe` nhận đúng kích thước cửa sổ của mô hình, theo thứ tự `start_ms` không giảm. Cùng `window_id` chỉ được xử lý một lần. `session_id`/`segment_id` dùng nhận biết ranh giới reset, không là đặc trưng của scorer. Khởi tạo engine mới cho một phiên mới. Kết quả trả a, z, S, h1, h2, hành động và trạng thái. Quan sát bị từ chối không làm thay đổi trạng thái; có thể sửa dữ liệu rồi gửi lại cùng ID. Đặc trưng thiếu, chuỗi trắng, boolean hoặc số không hữu hạn bị từ chối; 0 và chuỗi số hợp lệ vẫn được nhận.

`end_ms` của đầu vào giữ nguyên thời điểm key-up cuối của cửa sổ. Khi giữ phím lâu, giá trị này có thể lớn hơn end của cửa sổ kế tiếp. Engine không đảo thứ tự cửa sổ: `time_ms = max(end_ms, time_ms trước)`. Kết quả giữ thêm `source_start_ms`/`source_end_ms` để phân biệt thời gian nguồn và thời điểm quyết định khả dụng. Không dùng thời gian đợi để tính lại tốc độ gõ. Đây là lịch khả dụng theo dữ liệu, chưa phải thời điểm xử lý thực hay độ trễ máy/MFA.

API không nhận nhãn người thật/người lạ, N hoặc t0. Sau REVOKED không nhận thêm cửa sổ. Sau MFA_PENDING phải giải quyết MFA trước khi đưa cửa sổ tiếp theo; bản này chưa hỗ trợ người dùng tiếp tục gõ trong khoảng chờ. Replay trong CLI sử dụng MFA tức thời nên không có yêu cầu cũ treo qua N. Nếu hệ thống chính dùng MFA có độ trễ, cần bổ sung và kiểm thử luồng đó, không lấy kết quả replay hiện tại thay thế.

Khi cắt cửa sổ trực tuyến, chỉ phát cửa sổ sau khi đã nhận đủ lần nhả; nếu cửa sổ sau hoàn tất sớm, giữ lại đến lượt thay vì gửi trước. Chỗ nối A1 không phải gián đoạn hợp lệ; không reset theo nhãn tiếp quản.

## Minh — định dạng log và đánh giá

Đã chạy adapter `member4/src/member3-adapter.mjs` trên lần chạy ngày 19/10: khớp 8/8 cặp scorer–tài khoản cho FAR/FRR/EER cửa sổ, tolerance 1e-12; 1.536 hàng điểm được đối chiếu nguồn và hash byte-exact. Kết quả nằm ở `artifacts/member4-fixed-2026-10-19`. Phạm vi này không xác nhận scorer, trích đặc trưng hoặc replay có trạng thái. TTD/MFA vẫn cần adapter riêng theo các quy ước dưới đây; chưa gọi là đối chiếu xong toàn bộ evaluator.

Khóa chung nên dùng `(scorer, target, policy_id, scenario_id)`, cộng `window_id` hoặc `event_order` khi cần. `scenario_id` lặp có chủ đích giữa các scorer/policy vì đó là cùng nguồn thử.

| File | Đơn vị hàng | Trường cần dùng |
|---|---|---|
| `fixed_windows.csv` | Một cửa sổ nguồn được chấm cho một tài khoản đích | scorer, claimed_profile, participant_id, session_id, window_id, split, a, z, label, window_threshold, rejected |
| `window_metrics.csv` | Một scorer × một tài khoản | far, frr, eer_descriptive, genuine, impostor, threshold |
| `scenarios.csv` | Một kịch bản của một scorer | scenario_id, source_sessions, source_segments, t0_ms, horizon_keys, horizon_ms, prefix_keys, suffix_keys, join_down_down_ms, mixed_windows |
| `decisions.csv` | Một quyết định thực sự đã xảy ra trong replay | window_id, time_ms, start_ms, source_end_ms, a, z, s_previous, s, h1, h2, cooldown_before, action, true_label, after_takeover, delayed_genuine_alert |
| `events.csv` | Một sự kiện điều khiển | time_ms, event_order, event, cause, request_id nếu có |
| `scenario_results.csv` | Một lượt chạy của một chính sách trên kịch bản | detected, detection_evidence, ttd_keys, ttd_ms, censored, pre_takeover_revoke, horizon, thời gian quan sát |
| `policy_metrics.csv` | Một scorer × tài khoản × chính sách | tỷ lệ phát hiện, FAR phiên tại L, TTD có điều kiện, MFA/giờ, thu hồi oan, cờ đạt ràng buộc |
| `paired_statistics.csv` | Một so sánh P1-B1 theo scorer | CI trung bình hiệu số, Wilcoxon, effect size và nhãn chẩn đoán |
| `failures.csv` | Một ca không phát hiện, phát hiện chậm hoặc thu hồi oan | Khóa ca, loại lỗi và các chỉ số liên quan |

Quy ước:

- Điểm lớn hơn là bất thường hơn; từ chối cửa sổ khi z >= ngưỡng chẩn đoán.
- `label` trong cửa sổ cố định là genuine/impostor; `true_label` của replay có thêm mixed.
- Null được ghi thành ô CSV trống. Không đổi thành 0.
- Từ lần chạy 19/10, `scenario_results.horizon_keys/horizon_ms` là theo dõi thực tế đến quyết định cuối (A1), không phải suffix nguồn. `planned_horizon_keys/planned_horizon_ms` lấy lịch cửa sổ nếu không dừng sớm; `source_suffix_keys/source_horizon_ms` giữ độ dài nguồn; `unscored_tail_keys` là số phím không tham gia cửa sổ đầy đủ. `last_decision_ms` và `stop_reason` dùng kiểm điểm dừng. G0 có horizon_keys=0, horizon_ms trống; ca thu hồi trước N cũng vậy. Không dùng planned/source làm mốc kiểm duyệt thực tế.
- `genuine_prefix_id` nhận diện phiên + segment của prefix A1. Đếm duy nhất theo `(target,genuine_prefix_id)` trong từng scorer/policy. `pre_takeover_revokes` vẫn là số kịch bản; `pre_takeover_revoked_prefixes/attack_genuine_prefixes` là số prefix bị thu hồi/tổng prefix. Không bỏ kịch bản lặp prefix hoặc đổi mẫu số detection rate.
- MFA/giờ của phần 3 chỉ lấy G0: tử số `mfa_requests`, mẫu số `recording_seconds` hoặc `wall_seconds`. Các yêu cầu A1 vẫn có trong log nhưng không cộng vào chi phí chính chủ. Báo thêm `wrongful_revokes` và `genuine_revokes_without_prior_mfa`. Macro lấy trung bình các tỷ lệ theo tài khoản, không tính tỷ lệ gộp.
- MFA_REQUEST, MFA_PASS/MFA_FAIL và REVOKE có thể cùng timestamp. `event_order` giữ thứ tự trong một scenario; `request_id` liên kết yêu cầu và kết quả.
- Thời gian là ms; tỷ lệ ở khoảng [0,1], không phải phần trăm.
- TTD lấy cảnh báo đầu tiên của toàn chính sách tại hoặc sau t0. Ca thu hồi trước N được báo riêng; ca không phát hiện là kiểm duyệt phải.
- `detection_evidence=delayed_genuine_window`: cửa sổ gây cảnh báo chỉ có dữ liệu chính chủ nhưng quyết định khả dụng sau N. Ca này vẫn có thể chặn phiên nhờ MFA và vẫn nằm trong mẫu số; báo riêng bằng `delayed_genuine_alert_detections`. `post_takeover_window` là mixed/impostor tại cửa sổ cảnh báo, không chứng minh toàn bộ S tích lũy chỉ từ người lạ. Không diễn giải detection/TTD là chất lượng thuần của scorer.
- `time_ms` dùng cùng quy tắc khả dụng như runtime. `start_ms`/`source_end_ms` giữ thời gian nguồn. SEGMENT_RESET ghi lúc xử lý; `source_start_ms` giữ mốc bắt đầu cửa sổ nguồn.
- Model schema 1.1 lưu `selection.validationByUser[target]` gồm metrics và feasible trên validation của người đó. `selection.feasible` vẫn là cờ của toàn lựa chọn. Trong CSV, `validation_feasible` là cờ từng người; `validation_selection_feasible` là cờ toàn lựa chọn; macro đếm đúng từng người và báo thêm `validation_selection_feasible_all`. Bundle cũ cần fit lại.
- Đơn vị phân tích thống kê là tài khoản đích. Các đoạn tấn công dùng chung phiên nguồn nên không độc lập.
- FAR phiên tại L trong phần 3 là tỷ lệ chưa phát cảnh báo sau L phím. Cần đối chiếu và chốt tên/định nghĩa với quy trình chung trước khi dùng làm chỉ số chính.

## Những điểm cần nhóm thống nhất

1. Đồng bộ báo cáo từ 10 nhóm phím sang 3 nhóm đang có trong mã dữ liệu, hoặc đổi bộ thu và chạy lại toàn bộ pipeline.
2. Xác nhận quy tắc phân hoạch validation theo phiên. Mặc định hiện tại cần hai phiên validation mỗi người.
3. Chốt G0/A1 là thí nghiệm chính; các điều kiện khác phải có dữ liệu và cấu hình riêng.
4. Chốt prefix 225, suffix 300, join down–down 250 ms và chân trời L=150, hoặc chọn lại trước dữ liệu test nghiên cứu chính.
5. Chốt MFA tức thời/xác định cho so sánh chính, hay triển khai khoảng chờ và đánh giá lại.
6. Chốt FAR mức phiên và quy tắc ghép cùng mức FAR/TTD cho từng RQ. Đạt cùng một giới hạn không có nghĩa đạt cùng một giá trị.
7. Sửa mô tả P1 theo hiện thực: ngưỡng riêng từng người; chưa điều chỉnh bằng ngữ cảnh/độ dài phiên.
8. Giữ P2/RQ3 ở phần mở rộng cho đến khi có mã và dữ liệu phù hợp.
9. Xác nhận TTD chính của nghiên cứu là cảnh báo toàn chính sách như bản triển khai hiện tại, hay phát hiện hành vi sau N. Bản hiện tại đã tách nguồn cửa sổ gây cảnh báo để hỗ trợ đối chiếu; chưa ghi nhận đây là định nghĩa đã được Minh/nhóm phê duyệt.

Các CSV và mô hình mô phỏng được phép dùng để ghép hệ thống, kiểm công thức và tập demo. Không chuyển nhãn synthetic thành real để trình bày kết quả nghiên cứu.
