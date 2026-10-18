# ĐỐI CHIẾU ĐẦU RA PHẦN MÔ HÌNH VÀ BỘ ĐÁNH GIÁ
Võ Công Minh - Nhóm 02 - MTH042
Ngày 18/10/2026 - bản trao đổi trong nhóm
Nguồn: dữ liệu mô phỏng SIM01-SIM04; không phải kết quả trên người thật.

Cập nhật sau member2 f0fb15c: mục 1-6 ghi lần đối chiếu lịch sử trước cập nhật. Không coi receipt cũ là khớp checkout mới; xem mục 7 về nguồn QA, lịch validation và kiểm tra lại.

## 1. Tóm tắt

Em đã nhận bản reviewed của phần anh Vũ, viết adapter cửa sổ cố định và dùng công thức của member4 tính lại FAR, FRR, EER. Kết quả khớp cả tám tổ hợp scorer/tài khoản với bảng phần 3, trong sai số tuyệt đối 1e-12. Có thể dùng bước này để kiểm tương thích và tái lập bảng/ROC; chưa dùng để xác nhận H1/H2/H3.

Phần TTD/MFA của replay chưa được nhập vào evaluator member4. Các điểm cần khớp định nghĩa được ghi ở mục 5; anh chị xem giúp em để lần nối tiếp theo giữ đúng cách đo nhé.

## 2. Đầu vào đã có và phạm vi đối chiếu

Bản chính dùng member3/artifacts/simulation-reviewed, model schema 1.1. Không dùng artifacts/simulation cũ. Hai scorer hiện có là khoảng cách L1 tới median train và Isolation Forest. B0/B1/P1 là các chính sách; B1_lambda1 là ablation không quên. P1 chỉ cá nhân hóa ngưỡng theo người, chưa phụ thuộc ngữ cảnh/độ dài phiên. P2 chưa triển khai.

Adapter đọc fixed_windows.csv, dùng z làm điểm bất thường và accepted = không rejected. Kiểm tra rejected tương đương z >= ngưỡng đã khóa, kể cả tại dấu bằng. Không lấy ngưỡng EER test làm ngưỡng vận hành.

Có 24 phiên nguồn mô phỏng trong manifest. Tập cố định test W50 gồm 192 cửa sổ nguồn, chấm cho bốn tài khoản bằng hai scorer, thành 1.536 lượt chấm và tám hàng kết quả. Mỗi hàng có 48 genuine và 144 impostor. Không coi các lượt chấm hoặc các cửa sổ chung phiên là các người độc lập.

Đã kiểm hash model, manifest, receipt xử lý, bốn file xử lý và nguồn JSON thô; đối chiếu danh tính/nhãn/split, lưới cửa sổ đủ cho mọi scorer/đích. Đây không phải kiểm toán độc lập toàn bộ fit, cách ghép sự kiện thô hoặc cách tính score. Công thức metrics do member4 tính độc lập; hàm đọc CSV dùng lại phần 3.

## 3. Kết quả cửa sổ cố định

Các giá trị dưới đây là tỷ lệ, không phải phần trăm; làm tròn sáu chữ số để đọc. File reconciliation.json giữ độ chính xác đầy đủ. Tất cả dùng ngưỡng cửa sổ z = 0 từ bản model hiện có; cờ validation_window_feasible đều false. Vì vậy đây là cấu hình chẩn đoán, không phải cấu hình đã đạt yêu cầu vận hành.

distance / SIM01: FAR 0.409722; FRR 0.583333; EER 0.486111.
distance / SIM02: FAR 0.166667; FRR 0.583333; EER 0.354167.
distance / SIM03: FAR 0.520833; FRR 0.479167; EER 0.493056.
distance / SIM04: FAR 0.486111; FRR 0.375000; EER 0.437500.
isolation_forest / SIM01: FAR 0.402778; FRR 0.541667; EER 0.486111.
isolation_forest / SIM02: FAR 0.256944; FRR 0.520833; EER 0.375000.
isolation_forest / SIM03: FAR 0.402778; FRR 0.520833; EER 0.458333.
isolation_forest / SIM04: FAR 0.381944; FRR 0.500000; EER 0.458333.

Trung bình macro theo bốn tài khoản: distance có FAR 0.395833, FRR 0.505208, EER 0.442708; isolation_forest có FAR 0.361111, FRR 0.520833, EER 0.444444. Không dùng khác biệt nhỏ này để xếp hạng mô hình trên người thật. FAR/FRR/EER cửa sổ không thay cho FAR của chính sách CUSUM có trạng thái.

Đầu ra trong member4/results/member3-fixed-reviewed: reconciliation.json, receipt.json và evaluation/ gồm report.json, per-user.csv, macro-summary.csv, roc.svg. Trường episode rỗng có chủ đích: không xuất một TTD hoặc tỷ lệ MFA giả định thay thế.

## 4. Kiểm tra kỹ thuật và lưu ý Windows

Node 24.19.0: 46/46 tests member4 đạt, gồm 30 test cũ và 16 test adapter/đối chiếu. Có test dấu bằng ngưỡng, thiếu/nhân đôi cửa sổ, sai nhãn/nguồn/split, số trống, quyết định sai, cờ validation, sai số metrics, hash bị sửa và không ghi đè đầu ra.

Lệnh verify của phần 3 tại checkout hiện tại dừng với “Raw source differs from member2 processing receipt”; suite phần 3 cũng bị chặn ở khâu đọc dữ liệu, nên chưa thể xác nhận lại 59/59 trên máy Minh. Kiểm tra Git cho thấy core.autocrlf=true, file trong index là LF, file làm việc là CRLF.

Để tách lỗi xuống dòng khỏi lỗi mô hình, đã chạy thêm trên bản sao tạm chỉ đổi CRLF thành LF và kiểm hash mã/dữ liệu với receipt. Kết quả trong bản sao LF: verify đạt 2.304/2.304 cửa sổ, sai số đặc trưng lớn nhất khoảng 0.01273%; 59/59 tests phần 3 đạt. Đã xóa bản sao sau kiểm tra. Đây không phải khẳng định suite đạt trực tiếp trên checkout CRLF, không phải đánh giá trên người thật.

Với 33 file mà adapter đối chiếu, hash byte thực tế khác receipt, nhưng hash sau khi chỉ thay CRLF thành LF khớp. Adapter mặc định vẫn yêu cầu khớp từng byte; lần đối chiếu này bật rõ --allow-crlf, cảnh báo từng file và lưu cả hash thực tế, hash kỳ vọng, loại đối chiếu trong receipt.json. Không sửa dữ liệu/mã/receipt hoặc cấu hình Git của các thành viên. Đây là tương đương xuống dòng, không được ghi thành “hash khớp từng byte”. Nếu có sửa nội dung khác, kể cả bật tùy chọn này cũng dừng.

Cách chạy và lệnh xuất Word nằm trong README của member4. Cần thư mục đầu ra mới; giữ nguyên lần chạy mẫu để truy vết.

## 5. Những điểm cần khớp trước khi nối replay

Thứ nhất, mẫu số MFA/giờ: phần 3 hiện chỉ dùng các phiên G0; evaluator member4 hiện tính cả đoạn chính chủ trước tiếp quản nếu nhập A1 cùng G0. Hai phép đo trả lời khác nhau. Em nghiêng về dùng G0 làm chỉ số làm phiền chính và báo riêng đoạn trước N của A1, nhưng đây là phương án để nhóm xem, chưa tự đổi công thức hoặc chốt thay nhóm.

Thứ hai, TTD: bản phần 3 đo cảnh báo toàn chính sách sau N, có thể do cửa sổ genuine hoàn tất trễ. Em nghĩ nên giữ chỉ số toàn chính sách và báo riêng delayed_genuine_window, không gán thành khả năng phân biệt thuần của scorer; cần thống nhất trước thực nghiệm người thật. Giữ thứ tự event_order và request_id; không tự sắp lại các sự kiện trùng thời gian.

Thứ ba, dữ liệu replay cần đủ để tái dựng exposure và censoring: điểm kết thúc dự kiến/thực tế, lý do dừng, số keydown người lạ đã quan sát tại lúc cảnh báo/kết thúc và các khoảng recording. Không suy số phím chỉ bằng số cửa sổ đã xử lý, vì rollover và phần cửa sổ cuối có thể làm sai số đếm. Có thể lấy từ replay object hoặc dựng lại từ nguồn; chưa nên điền mặc định khi CSV thiếu.

MFA bản phần 3 trả kết quả tức thời và xác định; không có pending kéo dài. Guard MFA_PENDING_AT_TAKEOVER của member4 vẫn cần cho log hệ thống thật có độ trễ, không bỏ vì demo hiện tại không gặp.

## 6. Diễn giải kết quả và phần có thể làm tiếp

Bảng mô phỏng phần 3 hiện có cờ ràng buộc validation/test không đạt; không đổi tiêu chí sau khi xem test để làm đẹp kết quả. So sánh dưới cùng một giới hạn không có nghĩa đã ghép đúng cùng TTD/FAR. RQ2 còn cần định nghĩa FAR chính sách và cách matching; RQ3 chưa có P2.

Đã có thể dùng bảng/ROC đối chiếu này làm bằng chứng kiểm công thức, chuẩn bị adapter replay sau khi khớp ba điểm ở mục 5, và chuẩn bị phân tích lỗi dựa trên failures.csv của phần 3. Kết quả TTD/MFA có sẵn của phần 3 vẫn là kết quả của evaluator phần 3, chưa được gọi là đã kiểm lại độc lập bằng member4.

Khi nhận một bộ dữ liệu mới, kiểm cách tạo thay vì suy từ mã P01-P04 hoặc nhãn real: bốn vai AI/gõ tự động vẫn là mô phỏng hoặc QA, không phải bốn người. Cần nhận manifest, phiên nguồn, công cụ/bộ sinh và seed, ngày thật hay ngày tổng hợp, cấu hình xử lý và receipt. Dữ liệu người thật cần hồ sơ đồng thuận và điều kiện thu; không gửi danh tính hoặc dữ liệu thô ra kênh công khai.

Mỗi bộ dữ liệu mới dùng thư mục run riêng, không ghi đè lần đối chiếu này. Nếu model/input khác hash, cần chạy lại fit bằng train/validation, khóa cấu hình rồi đánh giá test; không ghép model cũ với dữ liệu mới. Nếu bộ mới chỉ mô phỏng, giữ phạm vi chẩn đoán/tích hợp. Thời gian chạy dài hơn không tự tạo bằng chứng về người thật hoặc độ ổn định qua nhiều ngày.

Thực nghiệm xác nhận và kết luận trên người thật vẫn chưa có. Phần review mã mô hình và phân tích ca lỗi của lần mô phỏng này được trình bày ở hai tài liệu riêng cùng thư mục (REVIEW_MA_MEMBER3_VO_CONG_MINH và PHAN_TICH_CA_LOI_MO_PHONG_VO_CONG_MINH). Lần này không sửa mã hoặc dữ liệu của anh Phong/anh Vũ, không thực hiện thu người tham gia.

## 7. Đối chiếu bản cập nhật member2

Phạm vi: commit f0fb15c, được merge tại d26599c. Kiểm nguồn dữ liệu, điều kiện thu, tương thích với member3 và các test liên quan; không phải kiểm toán toàn bộ pipeline hoặc xác nhận thực nghiệm trên người thật.

Bản mới bổ sung pilot/formal, mục tiêu số lần gõ và thời lượng, kiểm lịch theo ngày, khoảng nghỉ train, phiên thu lại thay phiên cũ và lý do loại khỏi nghiên cứu/chuẩn hóa. Đây là cải tiến khả năng truy vết và tránh đưa pilot thiếu điều kiện vào kết quả chính thức.

Nguồn dữ liệu: results.json ghi actual_operator là OpenAI Codex AI agent, human_participants bằng 0. Bốn export AI-PACED-P01-P04 mang data_kind=real trong schema công cụ nhưng đều là pilot QA tự động; nhãn này không chứng minh có người tham gia hoặc có đồng thuận của người thật. Kiểm lại bằng validateSession: lần lượt 310, 366, 316, 329 lần gõ hợp lệ; 313,065; 308,025; 312,944; 314,091 giây ghi chủ động. Tổng 1.321 lần gõ và 1.248,125 giây. Hash bốn export khớp hồ sơ QA sau khi chỉ đổi CRLF thành LF. Hồ sơ xử lý QA riêng báo pilot_mode cho cả bốn và không tạo cửa sổ nghiên cứu.

Manifest phân tích chính vẫn gồm 24 phiên synthetic của SIM01-SIM04, tổng 28.800 lần gõ hợp lệ. Hash manifest, 24 nguồn raw, windows.csv, strokes.csv và normalizers.json giữ nguyên so với receipt member3 cũ khi chỉ đổi CRLF thành LF. sessions.csv và processed/run.json đã đổi nội dung thật, không phải chỉ khác xuống dòng. Kiểm 29 file nguồn/đầu ra với receipt member2 hiện hành đều khớp theo LF; không ghi là khớp byte tại checkout CRLF.

Điểm cần thống nhất trước khi thu: kế hoạch mới đặt mục tiêu 20 người, bốn phiên/người qua ít nhất ba ngày: hai train ngày 1, một validation ngày 2, một test ngày 3. partitionValidation của member3 yêu cầu ít nhất hai phiên validation độc lập/người để tách hiệu chuẩn và chọn ngưỡng. Đã tái hiện bằng lịch tối thiểu: auditStudyDesign chấp nhận, partitionValidation từ chối. Nhờ anh Phong và anh Vũ cùng xem phương án bổ sung validation hoặc điều chỉnh thiết kế hiệu chuẩn/chọn ngưỡng; nếu thêm phiên phải sửa cả kiểm lịch member2, không chỉ thu thêm rồi đưa vào manifest. Không dùng test hoặc chia cửa sổ để thay phiên độc lập.

Đã thử adapter member4 với --allow-crlf: dừng đúng ở processed/run.json vì LF-only match=false, không tạo đầu ra mới. Giữ nguyên results/member3-fixed-reviewed như kết quả lịch sử. Trước lần nối tiếp, chạy lại fit/evaluate và receipt trong thư mục run mới với bộ đầu vào hiện hành; không thay hash trong receipt cũ hoặc nới kiểm tra để ép dùng model cũ. Đặc trưng chưa đổi không có nghĩa toàn bộ chuỗi truy vết còn khớp.

Kiểm thử trực tiếp trên Node 24.19.0: 22/22 ca tập trung đạt, gồm collector core 6, study-design 13 và reproducibility 3. Công cụ test VS Code không phát hiện suite này; chạy Node test runner với resolve hook giới hạn trong pipeline để ánh xạ import .js sang nguồn .ts khi chưa build. Không sửa mã nguồn/không cài thêm phụ thuộc. Chưa chạy toàn bộ collector 9 test, pipeline 45 test, build hoặc tái sinh 54 artifact; số liệu tương ứng trong hồ sơ upstream không phải kết quả đã chạy lại ở lượt này.

Bản cập nhật này chưa mở khóa đánh giá trên người thật hoặc kết luận TTD/MFA. Phần đánh giá tiếp tục giữ phân loại QA/synthetic và chỉ diễn giải kết quả trong phạm vi dữ liệu mô phỏng.
