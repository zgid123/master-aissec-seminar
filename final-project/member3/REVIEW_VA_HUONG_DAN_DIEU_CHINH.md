# Review phần 3 và hướng dẫn điều chỉnh

> Cập nhật sau xử lý ngày 16/10/2026: R1, R2 và R4 đã sửa; R3 đã tách nguồn cảnh báo và ghi rõ định nghĩa toàn chính sách đang dùng, còn cần nhóm thống nhất chỉ số nghiên cứu chính. Đã qua 59 test, chạy lại fit/evaluate và kiểm tra tái lập. Xem [kết quả xử lý](docs/XU_LY_REVIEW.md). Các mục dưới giữ nội dung review ban đầu để đối chiếu.

Ngày review: 16/10/2026. Mục đích: bàn giao cho người hoặc AI agent sửa tiếp. Đây là bản review, **chưa sửa mã nguồn hay chạy lại thực nghiệm sau sửa**.

## 1. Kết luận trước

Phần 3 có nền tảng đủ dùng cho đồ án: có hai bộ tạo điểm, các chính sách so sánh, tách tập dữ liệu, kiểm tra nguồn dữ liệu, chạy tái lập và xuất kết quả. Không cần viết lại từ đầu hoặc thêm mô hình để làm cho có vẻ nhiều việc.

Tuy nhiên, chưa nên coi đây là bản hoàn tất để tích hợp và kết luận học thuật. Cần sửa lỗi cập nhật trạng thái khi đầu vào lỗi, thống nhất thời gian ra quyết định, và làm rõ một trường hợp tính phát hiện sau tiếp quản. Một nhãn thống kê validation cũng cần sửa để tránh diễn giải sai.

Kết quả hiện tại là kiểm thử trên dữ liệu tổng hợp, không phải bằng chứng rằng P1 tốt hơn B1 hoặc hệ thống đạt yêu cầu vận hành. Không sửa ngưỡng theo test để tạo kết quả đẹp.

## 2. Phạm vi và bối cảnh để agent tiếp theo không phải đoán

- Repository: `https://github.com/zgid123/master-aissec-seminar`.
- Bản local được review: `D:\Master\Bảo mật hệ thống thông tin\đồ án\master-aissec-seminar`.
- Git HEAD: `790517654158d223fd079c70c156a6e67f111fd9`.
- Phần được review nằm tại `final-project/member3`. Tại thời điểm review, cả thư mục này còn **untracked**; commit trên không chứa mã phần 3. Không chỉ checkout commit rồi tưởng đã có đúng bản cần sửa.
- Các đường dẫn mã bên dưới tương đối với `final-project/member3`; số dòng có thể thay đổi sau sửa.
- Nhóm có bốn người: Trâm phụ trách hệ thống/nghiên cứu; Phong phần 2 dữ liệu; Vũ (người yêu cầu) phần 3 mô hình/chính sách; Minh phần 4 đánh giá.
- Hai tài liệu nhóm cần đối chiếu khi chốt quy trình: `đồ án/Bao_cao_MTH042_Nhom02_draft.docx` và `đồ án/QUY_TRINH_THUC_NGHIEM_VO_CONG_MINH.docx`.
- Không xem phần 3 là đã tích hợp xong với hệ thống của Trâm hoặc bộ đánh giá độc lập của Minh. Bản repo đã đọc chưa cung cấp đủ mã hai phần đó để xác nhận tích hợp.

### Phần đang có

- Dữ liệu phần 2: bốn hồ sơ mô phỏng SIM01–SIM04, 24 phiên, 28.800 lần gõ, 2.304 cửa sổ tổng cộng ở W=20/50/100. Cấu hình chính phần 3 dùng W=50.
- Mỗi người có hai phiên train, hai validation, hai test. Validation được tách tiếp theo phiên để hiệu chỉnh điểm và chọn chính sách.
- 12 đặc trưng: median/IQR/MAD của dwell, flight, down–down; tốc độ gõ; tỷ lệ dừng; tỷ lệ sửa.
- Scorer: khoảng cách L1 trung bình đến tâm median và Isolation Forest tự triển khai.
- B0: quyết định theo điểm cửa sổ; B1: leaky CUSUM với ngưỡng chung; P1: ngưỡng riêng từng người, giữ lambda/k của B1; thêm B1 với lambda=1 để đối chiếu.
- G0 là phiên chính chủ. A1 ghép 225 lần gõ chính chủ và 300 lần gõ người khác ở mức stroke rồi trích lại đặc trưng; không chỉ nối các điểm đã tính.
- P2, thích nghi sau MFA, ngưỡng theo ngữ cảnh và mô phỏng độ trễ MFA thực **chưa triển khai**. Không tự mở rộng sang các phần này khi xử lý review.

## 3. Bằng chứng kiểm tra

Đã đọc các luồng dữ liệu, scorer, chọn tham số, runtime, replay và xuất chỉ số; chạy kiểm tra kiểu và bộ test; thử thêm các đầu vào biên bằng Node, không sửa mã sản phẩm.

| Kiểm tra | Kết quả / giới hạn |
|---|---|
| `npm run typecheck` | Qua |
| `npm test` | 47/47 test qua; chưa phủ các lỗi biên bên dưới |
| Đối chiếu đặc trưng với phần 2 | Kiểm tra 2.304 cửa sổ; sai số tương đối lớn nhất khoảng 0,00012728, dưới tolerance 0,002; đây là dựng lại từ processed strokes, không phải kiểm chứng độc lập toàn bộ raw parser |
| Tái lập | Có receipt đối chiếu 17 file deterministic từ lần kiểm tra trước; không coi receipt này là kiểm chứng bản mã sau các sửa đổi tương lai |
| Thời gian trong kết quả đã lưu | Đọc 29.183 dòng quyết định: không thấy thời gian quyết định đi lùi trong cùng scenario/policy/scorer/target |
| Cửa sổ thuần chính chủ hoàn tất sau tiếp quản trong log đã lưu | Không thấy trường hợp này trong 29.183 dòng trên |
| Kiểm thử bổ sung | Tái hiện được lỗi trạng thái khi đầu vào NaN; replay chấp nhận thời gian đi lùi; nhánh tính detection với cửa sổ genuine hoàn tất sau N |

Hai kiểm tra trên log chỉ nói về những quyết định thực sự được lưu, không chứng minh mọi cửa sổ chưa replay hoặc mọi dữ liệu tương lai đều an toàn.

## 4. Những điểm cần điều chỉnh

Mức ưu tiên ở đây: **cần sửa trước tích hợp**, **cần chốt trước diễn giải kết quả**, và **sửa nhỏ để tránh hiểu sai**. Không coi mọi nhận xét là yêu cầu làm thêm một hệ thống mới.

### R1 — Đầu vào bị từ chối nhưng đã làm thay đổi RiskEngine

**Cần sửa trước tích hợp.** Vị trí: `src/runtime.ts`, phương thức `observe()`, khoảng dòng 24–29.

Hiện tại code reset state theo segment, gán segment/time và thêm window ID vào `seenWindows` trước khi `normalize()`, `score()` và `step()` thành công. Nếu một đặc trưng là NaN, lời gọi ném lỗi nhưng window đã bị đánh dấu là xử lý rồi. Nếu đó là đầu segment mới, trạng thái cũ còn có thể bị reset dù chưa có quan sát hợp lệ.

Đã thử với profile distance/SIM01 và một cửa sổ thật W=50:

1. Tạo bản sao cửa sổ, gán `dwell_median_ms = NaN`.
2. `observe(bad)` báo `Nonfinite feature dwell_median_ms`.
3. Gửi lại cửa sổ hợp lệ cùng ID: báo `Invalid or repeated window order`.
4. Sau lần lỗi đầu, `seenWindows.size` đã là 1 và `lastDecisionMs` đã là 18658.3986.

**Sửa tối thiểu:** tính segment dự kiến, state dự kiến, điểm và quyết định bằng biến cục bộ. Chỉ commit toàn bộ trạng thái của engine khi các kiểm tra/tính toán đã thành công. Không cần framework transaction.

**Test nghiệm thu:**

- Đầu vào lỗi không thay đổi `state`, `status`, `segment`, `lastDecisionMs`, `seenWindows`.
- Gửi lại bản hợp lệ cùng ID sau lần lỗi vẫn xử lý được.
- Có test lỗi ở segment mới khi state cũ đang khác 0, để bắt trường hợp reset mất dữ liệu.
- Window hợp lệ xử lý hai lần vẫn bị chặn như trước.

**Kiểm tra liên quan nên làm cùng lần sửa:** `normalize()` trong `src/data.ts` dùng `Number(value)`, nên chuỗi rỗng hoặc null trở thành 0. CSV có thể giữ ô trống dưới dạng chuỗi rỗng. Đừng chấp nhận thiếu đặc trưng như một phép đo bằng 0. Chặn null/undefined/chuỗi trắng trước chuyển số; giữ tương thích với chuỗi số nếu đó là hợp đồng đầu vào. Không cần đưa thêm thư viện schema chỉ cho việc này.

### R2 — G0 chưa thống nhất thời điểm khả dụng của cửa sổ

**Cần sửa trước tích hợp.** Vị trí: `src/scenarios.ts`, `makeScenarios()` nhánh G0 khoảng dòng 29–34; đối chiếu nhánh A1 khoảng dòng 46–53 và kiểm tra thứ tự trong `src/runtime.ts`.

Các cửa sổ được xếp theo thứ tự gõ, nhưng `end_ms` là thời điểm key-up muộn nhất. Một phím giữ lâu có thể làm cửa sổ trước hoàn tất sau cửa sổ tiếp theo. A1 đã lấy max với thời điểm khả dụng trước đó; G0 chưa làm điều này. Replay cũng không từ chối chuỗi thời gian đi lùi, trong khi RiskEngine từ chối.

Ví dụ tái hiện:

- 100 strokes: stroke i có `down_ms = i*10`, `up_ms = i*10+5`.
- Riêng stroke đầu có `up_ms = 5000`.
- Chia thành hai cửa sổ 50 strokes: `featureWindow()` cho end lần lượt 5000 và 995.
- Đưa hai cửa sổ vào G0 replay theo thứ tự cửa sổ: log cho thời gian `[5000, 995]`.

Không nên bỏ qua chỉ vì dữ liệu mô phỏng hiện chưa gặp: phía dữ liệu có giữ các long hold như trường hợp cần chẩn đoán, không mặc định loại hết.

**Sửa tối thiểu:** chọn một quy tắc thời gian chung cho G0, A1 và đầu vào runtime. Với xử lý theo thứ tự cửa sổ hiện có, thời điểm quyết định khả dụng là `max(end của cửa sổ, thời điểm quyết định trước)`. Giữ riêng ý nghĩa thời điểm kết thúc đặc trưng và thời điểm ra quyết định; không tính lại tốc độ gõ bằng thời gian đợi xử lý.

Nếu runtime nhận thời điểm khả dụng qua adapter, ghi rõ hợp đồng và kiểm thử adapter; không chỉ chữa CSV ở bước xuất báo cáo. Không sắp lại cửa sổ theo key-up để chữa nhanh vì sẽ đổi chuỗi CUSUM.

**Test nghiệm thu:**

- Fixture long hold ở trên cho thời gian quyết định không giảm, ví dụ `[5000, 5000]`.
- Đặc trưng của hai cửa sổ giữ nguyên theo dữ liệu gõ ban đầu.
- Runtime và replay thống nhất quyết định khi dùng cùng chuỗi quan sát và cùng kết quả MFA giả lập.
- Kiểm tra thêm reset giữa segment: log không ghi sự kiện như đã xảy ra trước khi trạng thái trước đó hoàn tất xử lý, hoặc phải phân biệt rõ timestamp nguồn và timestamp xử lý.

### R3 — Cần phân biệt phát hiện bằng hành vi với chặn phiên nhờ MFA sau N

**Cần chốt trước diễn giải kết quả.** Vị trí: `src/policy.ts`, `replay()`, khoảng dòng 20–28.

Hiện tại, chỉ cần `w.endMs >= t0` và action khác CONTINUE là ghi nhận detection. Không kiểm tra nguồn bằng chứng của cửa sổ ở lớp đánh giá. Vì vậy một cửa sổ hoàn toàn của chính chủ nhưng hoàn tất trễ sau N vẫn có thể được tính là phát hiện người lạ.

Fixture đã tái hiện:

```text
scenario.kind = A1; t0 = 100
window: startMs=0, endMs=110, z=7,
        label=genuine, observedImpostorKeys=1
B0: h1=6, h2=12
```

Kết quả hiện tại: `detected=true`, `ttdKeys=1`; các sự kiện MFA_REQUEST, MFA_FAIL, REVOKE ở 110. Điều này hợp lý nếu đo khả năng chặn phiên nhờ một lần MFA phát sinh sau N, nhưng chưa đủ để gọi là bộ sinh trắc đã phát hiện sự thay đổi người gõ.

**Không kết luận đây là rò rỉ nhãn vào mô hình:** scorer và `step()` không nhận nhãn. Vấn đề nằm ở định nghĩa chỉ số trong wrapper đánh giá và cách diễn giải.

**Cách xử lý vừa đủ:**

1. Chốt với Minh: TTD đang đo cảnh báo/chặn phiên của toàn chính sách hay phát hiện thay đổi hành vi? Ghi một định nghĩa thống nhất trong tài liệu phương pháp và report.
2. Ghi riêng trường hợp cảnh báo sau N từ cửa sổ thuần genuine hoàn tất trễ. Có thể thêm cờ/loại sự kiện; không cần xây một bộ metric lớn mới.
3. Nếu giữ detection theo toàn chính sách, tên và diễn giải phải nói rõ có thể chặn nhờ MFA, không quy toàn bộ thành công cho scorer.
4. Nếu chọn detection dựa trên bằng chứng sau N, phải xử lý riêng phiên đã bị revoke bởi cảnh báo trễ; không âm thầm loại khỏi mẫu số hoặc gán thành ca không phát hiện bình thường.
5. Nhãn chỉ được dùng trong lớp đánh giá. Tuyệt đối không đưa label/t0/ID người thật vào quyết định runtime để chữa chỉ số.

**Test nghiệm thu:** fixture genuine trễ, mixed, impostor, cảnh báo trước N, không phát hiện, và revoke trước N đều có cách phân loại/mẫu số được giải thích. Sau sửa, người đọc có thể phân biệt hiệu quả scorer với hiệu quả MFA oracle. Chưa thấy fixture genuine trễ xuất hiện trong log thực nghiệm hiện tại; đây là lỗ hổng giao thức ở tình huống biên, không phải bằng chứng bảng hiện tại đã bị tăng điểm bởi nó.

### R4 — Nhãn “số người đạt validation” không đúng với cách lưu chính sách toàn cục

**Sửa nhỏ để tránh hiểu sai.** Vị trí: `src/fit.ts` khi chọn B0/B1/B1_lambda1; `src/evaluate.ts` khoảng dòng 29, 43 và bảng report.

Với chính sách toàn cục, `selection.feasible` là kết quả ràng buộc trên tất cả người dùng, sau đó cùng selection được gán vào từng profile. `evaluate()` lại đếm số hàng có cờ này và đặt tên `validation_feasible_users`. Vì vậy đếm có thể thành 0 hoặc 4, dù trong trường hợp tổng quát có 2/4 người đạt riêng lẻ.

Đã đối chiếu riêng người dùng ở cấu hình B0/B1 hiện tại: tất cả đều không đạt; vì vậy chưa thấy kết luận 0/4 của lần chạy hiện tại thay đổi bởi lỗi này. Nhưng ý nghĩa cột vẫn sai và có thể gây sai ở dữ liệu sau.

**Sửa tối thiểu, chọn một:**

- Đổi nhãn/cột thành tính khả thi của lựa chọn toàn cục và không trình bày như số người; hoặc
- Lưu riêng cờ đạt ràng buộc từng người ở cấu hình đã chọn rồi đếm đúng cờ đó. Giữ cờ toàn cục riêng nếu cần.

Không thay cách chọn tham số chỉ để sửa cách báo cáo. Test bằng dữ liệu giả có 2/4 người đạt riêng lẻ nhưng lựa chọn toàn cục không đạt.

## 5. Đánh giá tính học thuật và mức sẵn sàng của kết quả

### Những điểm nên giữ

- Chuẩn hóa theo người được fit từ train; dữ liệu người khác khi kiểm tra hồ sơ đích được biến đổi bằng normalizer của hồ sơ đích.
- Tách phiên để fit, hiệu chỉnh điểm, chọn chính sách và đánh giá; không chia ngẫu nhiên cửa sổ cùng phiên sang các tập.
- Cơ chế khóa cấu hình, hash nguồn/đầu vào và thư mục output không ghi đè giúp truy lại kết quả.
- Tách chỉ số fixed-window FAR/FRR/EER khỏi chỉ số chính sách có trạng thái.
- Báo ca không phát hiện, thu hồi trước tiếp quản, thu hồi oan; không chỉ chọn ca có TTD đẹp.
- Đơn vị thống kê ghép cặp là người đích, không coi hàng nghìn cửa sổ là hàng nghìn người độc lập.
- Tài liệu hiện có đã nói rõ synthetic, P2 chưa có, MFA oracle tức thời và chưa xác nhận H1/H2/H3. Giữ các giới hạn này khi viết lại.

### Những điều không được suy ra từ bảng hiện tại

Nguồn: `artifacts/simulation/evaluation/macro_policy_metrics.csv`.

| Scorer/chính sách | Tỷ lệ phát hiện macro | TTD phím có điều kiện, macro | MFA/giờ ghi, macro | Thu hồi trước N | Thu hồi oan |
|---|---:|---:|---:|---:|---:|
| Distance/B1 | 0,612 | 150 | 21,442 | 54 | 2 |
| Distance/P1 | 0,572 | 150 | 19,109 | 18 | 2 |
| IF/B1 | 0,627 | 162,5 | 15,325 | 0 | 1 |
| IF/P1 | 0,755 | 137,5 | 20,276 | 72 | 4 |

Các cột tỷ lệ/TTD/MFA là macro theo người; hai cột thu hồi là tổng số ca, không phải số người. TTD trong bảng là trung bình các median theo người trên ca phát hiện, không phải median gộp mọi ca. Tỷ lệ phát hiện cũng phải đọc cùng cách loại/báo riêng ca thu hồi trước N.

- Distance/P1 giảm MFA nhưng cũng giảm tỷ lệ phát hiện; chưa thể nói tốt hơn B1.
- IF/P1 có tỷ lệ phát hiện và TTD nhìn tốt hơn nhưng tăng MFA, có 72 ca thu hồi trước N và 4 thu hồi oan. Không lấy hai cột tốt nhất làm kết luận chung.
- Các lựa chọn được báo hiện chưa đạt ràng buộc validation/test. Đây là cấu hình chẩn đoán khi không tìm được nghiệm khả thi trong lưới đã thử; không phải lời giải đã thỏa bài toán tối ưu.
- Không có nghiệm trong lưới hiện tại không có nghĩa mọi cấu hình có thể có đều vô nghiệm.
- Dữ liệu mô phỏng đã được xem trong quá trình phát triển. Việc code không fit bằng test không biến lần chạy này thành nghiên cứu xác nhận trên holdout chưa từng xem.
- Chưa có so sánh B0/B1 ở cùng FAR chính sách. Nếu báo cáo giữ câu hỏi nghiên cứu này, cần một protocol chọn operating point bằng validation, khóa trước test. Nếu chưa làm trong phạm vi thời gian, ghi là chưa kiểm chứng; không đổi tên bảng thành FAR-matched.
- Tương tự, cùng giới hạn TTD không đồng nghĩa TTD thực tế ngang nhau. Muốn kết luận giảm MFA ở chất lượng phát hiện tương đương phải có tiêu chí tương đương được chốt trước, không chọn hậu nghiệm.
- Bốn người mô phỏng và các nguồn tấn công dùng lại chỉ đủ cho kiểm tra pipeline/thăm dò; bootstrap hoặc Wilcoxon không biến chúng thành bằng chứng trên người thật.

### Công thức cần trình bày rõ, không thêm cho đủ hình thức

Giữ mạch: đặc trưng → chuẩn hóa robust → điểm bất thường → hiệu chỉnh điểm → tích lũy rủi ro → ngưỡng/MFA → chỉ số đánh giá.

```text
x'_j = (x_j - median_train,j) / (1.4826 * MAD_train,j)
a_distance(x') = mean_j |x'_j - center_j|
z_t = (a_t - median_calibration) / scale_calibration
S_t = max(0, lambda*S_(t-1) + z_t - k)
```

Giải thích rõ chiều có MAD bằng 0 được loại theo contract, scale hiệu chỉnh dùng đúng quy tắc trong code, B0 không tích lũy, h1 gọi MFA và h2 thu hồi. Với Isolation Forest, dẫn nguồn và mô tả công thức độ dài đường đi, không gọi implementation riêng là bản thư viện chuẩn đã kiểm định. Mục tiêu giảm MFA chỉ được diễn giải cùng ràng buộc phát hiện/TTD/FAR chính sách và thu hồi oan.

Đối chiếu thêm mô tả nhóm phím: pipeline hiện dùng ba nhóm, tài liệu nhóm có chỗ nêu mười nhóm. Sửa mô tả cho khớp dữ liệu thực tế hoặc thống nhất thay đổi dữ liệu với phần 2; không tự mở rộng feature schema trong phần 3.

## 6. Thứ tự sửa đề nghị cho agent tiếp theo

1. Xác nhận đúng bản local và đọc `README.md`, `docs/PHUONG_PHAP.md`, `docs/HANDOFF.md`, config và các file được chỉ ra. Giữ nguyên thay đổi sẵn có của người dùng.
2. Thêm test hồi quy R1, xử lý đầu vào thiếu, sửa R1 bằng commit trạng thái sau kiểm tra thành công.
3. Chốt quy tắc timestamp rồi sửa R2; kiểm tra replay/runtime cùng contract. Không refactor toàn bộ project.
4. Trình bày lựa chọn R3 cho người phụ trách đánh giá; nếu chưa được chốt, ghi rõ còn mở, không tự đổi định nghĩa nghiên cứu rồi coi như đã được nhóm đồng ý.
5. Sửa R4 bằng cách báo cáo đơn giản, minh bạch.
6. Chạy kiểm tra kiểu và toàn bộ test, kể cả các test mới. Chạy lại fit/evaluate từ nguồn vào đã khóa trong thư mục output mới; không dùng model bundle cũ nếu hash mã đã đổi.
7. So sánh trước/sau: số scenarios, số decisions, các metric và số ca edge-case. Nếu khác, giải thích nguyên nhân; không mặc định mọi thay đổi chỉ số là cải thiện.
8. Chạy lại kiểm tra tái lập; cập nhật tài liệu và receipt theo bản mã mới. Chỉ đóng gói bàn giao mới sau khi kiểm tra xong, giữ bản cũ để đối chiếu.

Lệnh cơ bản, chạy từ thư mục `final-project/member3` bằng Node >=24:

```powershell
npm run typecheck
npm test
```

Các lệnh fit/evaluate/reproduce phải lấy đối số và đường dẫn từ README/CLI hiện hành; chọn output mới vì CLI chủ động từ chối thư mục đã có dữ liệu. Trước khi chạy `npm run verify:reproducibility`, kiểm tra các đường dẫn output trong script, không xóa thư mục cũ chỉ để lệnh chạy qua.

### Phạm vi không cần làm trong lần sửa này

- Không thêm deep learning, OCSVM, P2, dashboard, database hoặc framework điều phối.
- Không sửa dữ liệu synthetic để tạo khoảng cách giữa người dùng rồi trình bày như kết quả khách quan.
- Không chỉnh ngưỡng dựa trên test, loại ca thất bại khỏi báo cáo hoặc thay mẫu số mà không ghi rõ.
- Không viết lại toàn bộ Isolation Forest chỉ vì metrics thấp; trước hết sửa lỗi có bằng chứng và hoàn thiện giao thức đo.
- Không khẳng định toàn bộ hệ thống đã tích hợp chỉ vì demo module chạy được.
- Không tự commit/push hoặc ghi đè tài liệu/ZIP bàn giao cũ khi chưa có yêu cầu.

## 7. Tiêu chí hoàn tất

- R1 và R2 có test tái hiện trước sửa, qua sau sửa; đầu vào lỗi không để lại tác dụng phụ.
- R3 có định nghĩa được thống nhất hoặc được đánh dấu rõ là chưa chốt; tên chỉ số và cách đếm không vượt quá định nghĩa đó.
- R4 không còn dùng cờ toàn cục như số người đạt riêng lẻ.
- Bản kết quả sau sửa truy được về dữ liệu, cấu hình và mã; có kiểm tra tái lập mới.
- Báo cáo phân biệt được ba mức: phần mềm chạy đúng trong các ca đã thử, kết quả thăm dò trên mô phỏng, và bằng chứng nghiên cứu còn thiếu.
- Bàn giao ngắn gọn những gì đã sửa, test đã chạy, metric có đổi không và việc nào còn cần Minh/Trâm chốt. Không tuyên bố hoàn tất những phần chưa kiểm tra.

**Tóm lại:** giữ cấu trúc hiện có, sửa một số điểm hẹp nhưng quan trọng. Vấn đề lớn nhất không phải thiếu nhiều chức năng, mà là bảo đảm trạng thái/thời gian đúng và kết luận không mạnh hơn bằng chứng.
