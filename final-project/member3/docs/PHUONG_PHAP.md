# Phương pháp của thành viên 3

Nguồn công thức và cách xác định từng tham số được bổ sung ngày 18/10/2026 trong [BAO_CAO_PHAN_3.md](BAO_CAO_PHAN_3.md). Các đoạn ghép theo góp ý giảng viên nằm trong [BO_SUNG_THEO_GOP_Y_GIAO_VIEN.md](BO_SUNG_THEO_GOP_Y_GIAO_VIEN.md); giữ định nghĩa bài toán của Trâm và quy trình đánh giá của Minh ở phần chung.

## 1. Phạm vi hiện thực

Bài toán là phát hiện sự thay đổi người thao tác trong tài khoản đã đăng ký. Mỗi tài khoản có một hồ sơ riêng. Hệ thống trả điểm bất thường rồi quyết định tiếp tục, yêu cầu xác thực lại hoặc thu hồi phiên; không dự đoán danh tính người đang gõ.

Bản này triển khai hai bộ tạo điểm và bốn cấu hình chính sách. Tách hai thành phần giúp tránh kết luận nhầm rằng cải thiện do CUSUM trong khi thực chất đã đổi cả mô hình chấm điểm.

| Cấu hình | Điểm dùng để quyết định | Ngưỡng | Tham số |
|---|---|---|---|
| B0 | Điểm chuẩn hóa z của cửa sổ hiện tại | Chung giữa các người | Chọn h bằng validation |
| B1 | Điểm tích lũy S | Chung giữa các người | Chọn lambda, k, h bằng validation |
| P1 | Điểm tích lũy S | Riêng từng người | Giữ lambda/k của B1, chọn h của từng người |
| B1_lambda1 | Điểm tích lũy S với lambda = 1 | Chung giữa các người | Chọn lại k/h bằng validation |

P1 trong mã là ngưỡng cá nhân hóa trực tiếp, chưa phải hàm đầy đủ theo ngữ cảnh và độ dài phiên trong proposal. Bản này chưa cập nhật hồ sơ sau MFA, nên chưa có P2 và chưa kiểm chứng RQ3. Các quyết định thiết kế trong file cấu hình là phương án triển khai cho bộ mô phỏng, cần thống nhất trước khi áp dụng vào nghiên cứu người thật.

## 2. Đầu vào và chuẩn hóa đặc trưng

Đầu vào là `windows.csv` và `normalizers.json` của thành viên 2. Dùng đúng 12 đặc trưng theo thứ tự của `FEATURE_COLUMNS`; không dùng ID, split, nhãn nguồn hoặc thời điểm làm đặc trưng. W = 50 trong cấu hình mặc định. W = 20/100 phải chạy thành các phân tích riêng.

Với tài khoản đích u và đặc trưng j:

$$
\widetilde{x}_{t,j}^{(u)}=
\frac{x_{t,j}-m_{u,j}}{1.4826\,\operatorname{MAD}_{u,j}}.
$$

Các tham số m và MAD được fit từ train của u. Nếu MAD bằng 0, chiều đó bị loại khỏi ma trận mô hình theo mặt nạ `active` của Phong. Không thay mẫu số bằng epsilon. Khi B giả làm A, dùng tham số A cho toàn bộ đặc trưng của B.

Chương trình kiểm lại median/MAD từ các hàng train đã bàn giao và đối chiếu danh sách phiên. Kiểm tra này xác nhận nguồn tham số chuẩn hóa, không thay thế review độc lập toàn bộ bộ thu và pipeline dữ liệu.

## 3. Hai bộ tạo điểm

### 3.1. Khoảng cách L1

Tâm hồ sơ được lấy bằng median từng chiều của các cửa sổ train đã chuẩn hóa:

$$
c_{u,j}=\operatorname{median}_{x\in T_u}\widetilde{x}_j,
\qquad
a_t=\frac{1}{d_u}\sum_{j=1}^{d_u}
\left|\widetilde{x}_{t,j}-c_{u,j}\right|.
$$

d_u là số chiều hoạt động của u. Điểm càng lớn càng khác hồ sơ. Đây là baseline dễ giải thích và có chi phí chấm điểm O(d_u), không phải bản sao nguyên trạng bộ scaled Manhattan của nghiên cứu mật khẩu cố định.

### 3.2. Isolation Forest

Mỗi tài khoản có một rừng riêng, huấn luyện chỉ bằng train chính chủ. Mỗi cây lấy mẫu không hoàn lại, chọn ngẫu nhiên chiều có biến thiên và điểm chia trong khoảng quan sát. Cây dừng khi đạt giới hạn độ sâu, chỉ còn một điểm hoặc toàn bộ giá trị trùng nhau.

Điểm dựa trên độ dài đường đi trung bình:

$$
a_t=2^{-\overline{\ell}(x_t)/c(\psi)},
\qquad
c(n)=2H_{n-1}-\frac{2(n-1)}{n}.
$$

Mã tính số điều hòa H bằng tổng hữu hạn, không dùng xấp xỉ logarithm. Lá có nhiều mẫu được cộng c(n) vào độ dài đường đi. Seed phụ thuộc seed chung, loại scorer và tài khoản đích. Cấu hình mặc định dùng 100 cây và tối đa 256 mẫu/cây; số mẫu thực tế bị chặn bởi kích thước train.

Đây là hiện thực tham chiếu độc lập theo ý tưởng của Liu và cộng sự, không phải bản chuyển mã của scikit-learn và không cam kết giống từng điểm với thư viện đó. Cách chọn chiều có biến thiên được nêu rõ để xử lý chiều hằng ở các nút con. Xây cây có chi phí xấp xỉ O(T psi d log psi) trong cách hiện thực hiện tại do phải tính khoảng theo chiều ở mỗi nút; chấm điểm thường O(T log psi), giới hạn độ sâu được đặt trước. Kiểm thử có ca dữ liệu trùng và điểm cô lập.

## 4. Hiệu chỉnh điểm khác với chuẩn hóa đặc trưng

Sau khi fit scorer, lấy điểm từ phiên chính chủ dành riêng cho hiệu chỉnh:

$$
\mu_{a,u}=\operatorname{median}(a),\qquad
\sigma_{a,u}=1.4826\operatorname{median}|a-\mu_{a,u}|,
$$

$$
z_t=\frac{a_t-\mu_{a,u}}{\sigma_{a,u}}.
$$

Không dùng điểm của chính tập huấn luyện làm tham chiếu này. Nếu MAD của điểm bằng 0, chương trình dừng và yêu cầu thêm dữ liệu hoặc xem lại scorer; không tự khuếch đại sai lệch bằng epsilon.

Validation được chia theo nguyên phiên của từng người: danh sách mã phiên được sắp từ điển, nửa đầu dùng hiệu chỉnh điểm, nửa sau dùng chọn chính sách. Với SIMxx_D2_S1/S2, đó lần lượt là S1 và S2. Quy tắc sắp mã không tự chứng minh thứ tự thời gian trên dữ liệu thật; nhóm phải đặt mã theo thứ tự đã thống nhất và kiểm tra `validation_partition.json` trước khi chạy. Cần ít nhất hai phiên validation mỗi người; không chia ngẫu nhiên các cửa sổ để bù thiếu phiên.

## 5. Tích lũy và quyết định

Với B1/P1:

$$
S_t=\max\{0,\lambda S_{t-1}+z_t-k\},\qquad S_0=0.
$$

lambda quyết định mức ghi nhớ; k làm giảm tích lũy từ dao động nhỏ. lambda = 1 cho truy hồi CUSUM một phía quen thuộc; lambda nhỏ hơn 1 là biến thể có quên đang được kiểm tra. Không mặc nhiên áp dụng các bảng ARL dưới giả định độc lập/phân phối chuẩn cho chuỗi nhịp gõ thực.

Ví dụ z = 3 ở ba cửa sổ liên tiếp, lambda = 0.9, k = 0.5:

$$
S_1=2.5,\quad S_2=4.75,\quad S_3=6.775.
$$

Hai mức hành động dùng h2 = 2 h1 trong cấu hình mặc định:

- S >= h2: thu hồi ngay, kể cả khi cooldown.
- h1 <= S < h2 và không cooldown: yêu cầu MFA.
- Các trường hợp còn lại: tiếp tục.

Khi MFA thành công, đặt S về 0 và bỏ cảnh báo mức h1 trong hai cửa sổ tiếp theo. Khi MFA thất bại, thu hồi phiên. B0 dùng z hiện tại thay cho S nhưng giữ cùng bộ điều khiển và cooldown để so sánh.

Đổi đoạn nguồn do gián đoạn làm reset S/cooldown. Trong A1, chỗ đổi người không được thông báo cho detector và không làm reset. Thu hồi là trạng thái kết thúc; không tạo các dự đoán phía sau rồi tính chúng như dữ liệu đã quan sát.

Ở replay, MFA trả kết quả ngay theo giả định chính chủ qua và người lạ trượt. Vì không có khoảng chờ, không có ca yêu cầu cũ còn treo khi tiếp quản. API tích hợp có trạng thái MFA_PENDING nhưng yêu cầu bên gọi dừng đưa cửa sổ mới cho đến khi giải quyết MFA. Muốn tiếp tục gõ và tích lũy trong khoảng chờ phải mở rộng bộ điều khiển và thống nhất lại với Minh trước.

## 6. Chọn tham số trên validation

Tìm trên lưới trong `config.json`. Thứ tự lựa chọn là:

1. Kiểm tra ràng buộc trên từng người đích, không lấy kết quả tốt của một người bù cho người khác.
2. Trong các cấu hình hợp lệ, chọn macro MFA/giờ ghi nhỏ nhất.
3. Nếu bằng nhau, ưu tiên TTD xấu nhất giữa các người nhỏ hơn.
4. Nếu vẫn bằng nhau, giữ thứ tự xuất hiện trong lưới.

Các ràng buộc gồm median TTD của ca phát hiện, tỷ lệ phát hiện toàn bộ chân trời, tỷ lệ bỏ lọt tại L phím và không thu hồi oan/thu hồi trước tiếp quản trong validation. Mức mặc định lần lượt là 150 phím, 80%, FAR phiên tại L=150 không quá 15%. Đây là tiêu chí đặt cho bản mô phỏng, không phải số liệu kết quả hay mức đã được cả nhóm phê duyệt cho dữ liệu thật.

$$
\min_\eta\frac{1}{U}\sum_u C_{\mathrm{MFA},u}(\eta)
$$

với các điều kiện trên phải đạt cho từng u. B1 chọn một bộ chung; P1 cố định lambda/k của B1 và chọn h của từng người bằng cùng tiêu chí. P1 có nhiều tham số hơn B1 nên dễ quá khớp khi validation ngắn; đánh giá ngày sau và ghi rõ hạn chế là cần thiết.

Nếu không có cấu hình hợp lệ, chương trình vẫn lưu lựa chọn chẩn đoán theo tổng mức vi phạm, rồi theo MFA và TTD. `feasible=false` phải được giữ trong mọi bảng. Không coi lựa chọn chẩn đoán là nghiệm của bài toán ràng buộc. Không nới ràng buộc sau khi xem test để biến nó thành cấu hình đạt.

## 7. Hai luồng đánh giá

### Cửa sổ cố định

Chấm mọi cửa sổ W=50 của test cho từng tài khoản đích. FAR là tỷ lệ cửa sổ người lạ được chấp nhận; FRR là tỷ lệ cửa sổ chính chủ bị từ chối. Ngưỡng chẩn đoán được chọn riêng từ validation: ưu tiên đạt FAR mục tiêu rồi giảm FRR; nếu không có ngưỡng đạt thì báo không khả thi. Lưới ngưỡng hiện hữu hạn nên kết quả chỉ áp dụng cho các ứng viên đã thử, không chứng minh mọi ngưỡng đều không thể đạt.

ROC/EER của test chỉ mô tả chất lượng scorer. Mã xử lý điểm trùng bằng một bước ngưỡng chung và nội suy giao điểm. Với người lạ là lớp dương, ROC FPR = FRR và FNR = FAR. Không lấy ngưỡng EER test quay lại làm ngưỡng vận hành.

### Replay có trạng thái

G0 chạy phiên chính chủ. A1 ghép prefix của A với suffix của B từ cùng split. Chọn mọi cặp đoạn có thứ tự đủ độ dài; không chọn theo điểm mô hình. Mặc định dùng 225 phím A và 300 phím B. Độ lệch 225 làm xuất hiện cửa sổ trộn để kiểm tra cách xử lý thực tế. Cửa sổ trộn vẫn đi qua detector nhưng không tham gia FAR/FRR cửa sổ.

N là lần gõ đầu của B. Mốc t0 là keydown của N. Khoảng down–down tại chỗ nối cố định 250 ms; dwell nội bộ được giữ. Đây là lựa chọn mô phỏng, có thể ảnh hưởng kết quả và cần thử độ nhạy. Mọi scorer/policy dùng cùng nguồn đoạn. Chuỗi được dựng lại từ `strokes.csv`; không nối các vectơ đã chuẩn hóa theo người nguồn.

TTD_ms = thời điểm ra quyết định - t0. TTD_keys là số keydown hợp lệ của người lạ đã xuất hiện tới thời điểm ra quyết định, có tính N và phím gõ chồng. Không dùng vị trí bắt đầu cửa sổ làm thời điểm cảnh báo. Thời gian replay không đo latency xử lý của máy.

Cửa sổ được xử lý theo thứ tự bắt đầu. Thời điểm khả dụng là `max(end nguồn của cửa sổ, thời điểm quyết định trước)`, dùng chung trong G0, A1 và RiskEngine. Long hold có thể làm end nguồn đi lùi giữa hai cửa sổ liên tiếp nhưng không làm thời gian quyết định đi lùi. Đặc trưng vẫn dùng end nguồn ban đầu. Khi đổi segment, sự kiện reset được ghi tại thời điểm xử lý, kèm mốc nguồn riêng.

Trong bản triển khai này, detected/TTD đo cảnh báo của **toàn chính sách** tại hoặc sau t0. Một cửa sổ thuần chính chủ hoàn tất trễ sau N vẫn có thể gây MFA rồi chặn người lạ nhờ oracle. Trường hợp đó mang `detection_evidence=delayed_genuine_window` và được đếm riêng trong `delayed_genuine_alert_detections`; không loại khỏi mẫu số. Cửa sổ mixed/impostor gây cảnh báo mang `post_takeover_window`, nhưng S có thể còn bằng chứng tích lũy trước N. Không gọi các chỉ số này là tỷ lệ phát hiện thuần của scorer. Nhãn và t0 chỉ được dùng ở lớp đánh giá. Định nghĩa TTD chính thức của nghiên cứu vẫn cần nhóm và Minh thống nhất trước dữ liệu người thật.

Không phát hiện tới hết quan sát là kiểm duyệt phải, TTD để trống. Thu hồi trước N là ca tiếp quản chưa diễn ra, không ghi TTD=0 và không coi là kiểm duyệt sau tiếp quản. Số ca đó luôn được báo riêng.

Theo dõi A1 kết thúc ở quyết định thực sự cuối cùng, không ở lần gõ cuối của nguồn. Với prefix 225, suffix 300 và W=50, chỉ có 10 cửa sổ đầy đủ, còn 25 phím không tạo cửa sổ mới. Trong bộ hiện tại, ca không phát hiện được theo dõi đến 275 hoặc 276 keydown người lạ tùy phím chồng, không phải 300. `scenario_results.csv` tách `horizon_keys/horizon_ms` thực tế, `planned_horizon_*` nếu chạy hết các cửa sổ và `source_suffix_keys/source_horizon_ms` của nguồn. Quy tắc này áp dụng cả khi thu hồi sớm; `stop_reason` và `last_decision_ms` ghi điểm dừng. Thời lượng recording của G0 không bị rút ngắn nếu phiên không bị thu hồi.

Một prefix được ghép với nhiều suffix. Vì vậy, báo cả số kịch bản bị thu hồi trước N và số prefix chính chủ duy nhất bị thu hồi, nhận diện theo tài khoản đích + phiên nguồn + segment. Không thay mẫu số kịch bản bằng số prefix khi tính detection rate/FAR. TTD có bước theo cửa sổ nhưng ràng buộc median ≤150 vẫn giữ nguyên: hai ca TTD 125 và 175 có median bằng 150, nên không thể đổi điều kiện thành ≤125.

Để có thước đo bỏ lọt cho chính sách có trạng thái, phần 3 đề xuất:

$$
\operatorname{FAR}_{\mathrm{session}}(L)=
\frac{\text{số ca không cảnh báo trước hoặc tại L phím người lạ}}
{\text{số ca biết kết cục tại L}}.
$$

Ca phát hiện sớm hoặc theo dõi ít nhất L có kết cục tại L. Ca không phát hiện và theo dõi ngắn hơn L được báo `unknown_at_L`. Không diễn giải tỷ lệ trên các ca đủ thông tin là ước lượng không thiên lệch khi vẫn còn ca thiếu theo dõi. Bộ chọn tham số yêu cầu không có ca thiếu theo dõi tại L.

Định nghĩa FAR phiên này cần Minh xác nhận để đưa vào quy trình chung. Nó khác FAR cửa sổ và không có nghĩa các cấu hình đạt đúng cùng FAR. RQ2 ở cùng mức FAR cần quy tắc ghép mức/sai số đã khóa; bản hiện tại chỉ báo so sánh dưới cùng giới hạn, chưa tuyên bố xác nhận H2.

MFA/giờ có hai mẫu số: thời gian recording và thời gian phiên. Nếu chính chủ bị thu hồi sớm, chỉ tính thời gian đến quyết định; recording được tính từ các khoảng start/resume tới boundary/stop trong dữ liệu thô. Thời gian recording không đồng nghĩa thời gian ngón tay đang gõ.

Bảng kết quả kèm số yêu cầu MFA, thời lượng recording, số thu hồi oan và số phiên G0 bị thu hồi khi chưa có MFA nào trước đó. MFA/giờ bằng 0 không có nghĩa ít gây gián đoạn nếu hệ thống đã thu hồi phiên ngay. Tỷ lệ macro là trung bình tỷ lệ từng tài khoản, không phải tỷ lệ gộp tổng số yêu cầu trên tổng thời lượng.

## 8. Thống kê và khả năng tái lập

Tổng hợp theo tài khoản đích trước khi lấy macro. TTD trung vị chỉ tính trên ca phát hiện, luôn đi với tỷ lệ phát hiện và số kiểm duyệt. Các người không có TTD được đếm riêng trong `users_with_observed_ttd`; không điền 0.

Từ model schema 1.1, kết quả validation của từng người tại cấu hình đã chọn được lưu riêng trong `validationByUser`. Cờ khả thi toàn lựa chọn vẫn kiểm tra mọi người thuộc phạm vi lựa chọn: nhiều người đối với B0/B1, một người đối với P1. Cột `validation_feasible_users` đếm cờ từng người, không nhân cờ toàn cục với số người. Việc tách cờ không đổi tiêu chí hoặc lưới chọn tham số.

So sánh P1-B1 về MFA/giờ ghi dùng bootstrap ghép cặp theo người, 2.000 lần và seed cố định; CI là của trung bình hiệu số. Wilcoxon dùng liệt kê dấu chính xác với hạng trung bình cho ties, bỏ hiệu số 0 và giới hạn tối đa 20 cặp trong hiện thực hiện tại. Báo thêm rank-biserial. Nếu chưa đạt ràng buộc vận hành, thống kê được gắn nhãn chẩn đoán.

Với bốn hiệu số khác 0, p hai phía nhỏ nhất là 0.125. Việc nhiều người cùng làm nguồn tấn công cho nhau tạo phụ thuộc chéo; kết quả chỉ có điều kiện trên nhóm nguồn hiện tại. Bốn hồ sơ mô phỏng không phải bốn người thật và không tạo bằng chứng suy rộng cho quần thể.

Danh tính người lạ ở validation và test trong bộ này cũng trùng nhau, dù khác phiên/ngày. Đây không phải bằng chứng rò rỉ nguyên phiên train sang test, nhưng giới hạn kết luận về người lạ chưa từng tham gia chọn ngưỡng.

Mỗi lần fit/evaluate lưu cấu hình, hash nguồn, hash đầu vào, hash đầu ra, Node, Git commit và trạng thái dirty. Nội dung CSV, model và báo cáo phải giống khi chạy lại; thời điểm và metadata trong `run.json` được phép khác. Không cho ghi đè thư mục đầu ra đã có nội dung. Bộ mô phỏng đã dùng trong phát triển phần mềm, nên kết quả này là đánh giá phát triển, không phải nghiên cứu xác nhận trên holdout chưa từng xem.
