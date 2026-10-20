# THIẾT KẾ THỰC NGHIỆM VÀ ĐÁNH GIÁ
Võ Công Minh - Nhóm 02 - MTH042
Bản nháp 0.6 - cập nhật ngày 19/10/2026
Tài liệu trao đổi trong nhóm; chưa có kết quả đánh giá trên người thật.

Các anh chị xem giúp em mục 9 trước nhé, em gom ở đó những điểm cần trao đổi để các phần khớp nhau; mục 10 là các thông tin mình sẽ thống nhất thêm trước khi chạy thực nghiệm chính thức.

## 1. Mục đích và sản phẩm

Phần này bám nội dung phân công của Thành viên 4: thiết kế thực nghiệm, kiểm soát rò rỉ dữ liệu, tính chỉ số, phân tích thống kê, phân tích lỗi và chuẩn bị phản biện. Bản nháp tập trung vào phương pháp đánh giá; cách chạy mã và cấu trúc dữ liệu được tách sang README.md.

Em viết phần này dựa trên bản thiết kế của chị Trâm và phần dữ liệu của anh Phong để sau đó nối với mô hình của anh Vũ. Những chỗ cần trao đổi thêm được gom ở mục 9; các anh chị xem giúp em để các phần khớp nhau nhé.

Mục tiêu là kiểm tra khả năng phát hiện người khác tiếp quản một phiên đã đăng nhập, đồng thời đo mức làm phiền chính chủ. Nhịp gõ là tín hiệu để yêu cầu xác thực lại, không thay thế mật khẩu/xác thực đa yếu tố (Multi-Factor Authentication, MFA) và không phải nhận dạng người dùng 1:N.

Phát biểu bài toán: với tài khoản đã đăng ký u và chuỗi cửa sổ đặc trưng nhịp gõ x1, x2, ... có sẵn theo thời gian, hệ thống tạo điểm bất thường rồi chọn tiếp tục, yêu cầu MFA hoặc thu hồi phiên. Mỗi quyết định chỉ dùng cửa sổ đã khả dụng và trạng thái quá khứ; không biết danh tính thật của người đang gõ hay thời điểm đổi người. Nhãn và thời điểm đổi người chỉ dành cho bộ đánh giá sau đó.

Mục tiêu thực nghiệm là giảm số yêu cầu MFA trên mỗi giờ quan sát chính chủ, dưới các ràng buộc về khả năng phát hiện, độ trễ, bỏ lọt và thu hồi oan. Các mức ràng buộc và cách ghép mức so sánh còn cần thống nhất; đây là bài toán đo đánh đổi, không phải bảo đảm mọi kẻ tiếp quản đều bị phát hiện.

Sơ đồ hai luồng: bản ghi phím -> kiểm chất lượng/chia phiên -> đặc trưng -> chuẩn hóa theo tài khoản đích -> scorer -> điểm cửa sổ cố định -> FAR/FRR/ROC/EER.
Luồng vận hành: điểm theo thứ tự khả dụng -> chính sách B0/B1/P1 và trạng thái -> sự kiện MFA/thu hồi -> TTD, tỷ lệ phát hiện, MFA/giờ và thu hồi oan. Tại đây phải replay thật với từng cấu hình; không suy log chính sách mới chỉ bằng cách đổi ngưỡng trên log đã dừng.

Cách đọc ngắn: genuine là chính chủ; impostor là người khác đang được chấm cho tài khoản đích; mixed là cửa sổ chứa phím của cả hai. Scorer là bộ tạo điểm; policy là chính sách biến điểm và trạng thái thành hành động. N là vị trí phím đầu của người lạ, t0 là thời gian keydown tương ứng, L là số phím theo dõi đã định trước.

Các chữ viết tắt dùng trong phần đánh giá: FAR (False Acceptance Rate) là tỷ lệ chấp nhận nhầm; FRR (False Rejection Rate) là tỷ lệ từ chối nhầm; EER (Equal Error Rate) là mức lỗi tại giao điểm hai tỷ lệ; ROC (Receiver Operating Characteristic) là đường đặc tính phân loại theo ngưỡng; TTD (Time To Detect) là độ trễ đến cảnh báo; IQR (Interquartile Range) là khoảng tứ phân vị; CI (Confidence Interval) là khoảng tin cậy. CUSUM (Cumulative Sum) là tích lũy tổng; MAD (Median Absolute Deviation) là trung vị độ lệch tuyệt đối; RQ (Research Question) là câu hỏi nghiên cứu; H là giả thuyết tương ứng. NA là không có giá trị xác định, phải kèm lý do, không phải số 0.

Phần đã chuẩn bị gồm tài liệu này, bộ tính chỉ số có kiểm thử, dữ liệu kiểm thử nhỏ (fixture) và mẫu đầu vào/đầu ra. Phần thực nghiệm sau khi ghép mô hình sẽ bổ sung bảng theo người, kết quả tổng hợp, biểu đồ, phân tích sai số và kết luận. Bảng fixture chỉ kiểm tra công thức và luồng đánh giá, không phải kết quả nghiên cứu.

Cập nhật 18/10: đã nhận bản reviewed của phần mô hình và đối chiếu độc lập chỉ số cửa sổ cố định trên dữ liệu mô phỏng. Chi tiết nằm trong DOI_CHIEU_MEMBER3_VO_CONG_MINH.docx.

Cập nhật 19/10: đã đối chiếu độc lập replay có trạng thái của lần chạy simulation-2026-10-19. Toàn bộ quyết định, sự kiện, TTD, MFA/giờ và thu hồi nhầm khớp; chi tiết và định nghĩa TTD, MFA/giờ đề xuất chốt nằm trong DOI_CHIEU_REPLAY_MEMBER3_VO_CONG_MINH.docx. Các giả thuyết vẫn chưa được kiểm chứng vì dữ liệu là mô phỏng và không cấu hình nào đạt ràng buộc đặt trước.

## 2. Câu hỏi nghiên cứu và đối chứng

Bám mục 2.3 của bản nháp Bao_cao_MTH042_Nhom02_draft.docx (lưu trong thư mục member1):
RQ1: Ngưỡng theo người có giảm MFA/giờ so với ngưỡng cố định ở mức TTD tương đương?
RQ2: Tích lũy CUSUM làm thay đổi TTD thế nào so với quyết định từng cửa sổ ở mức FAR tương đương?
RQ3: Cập nhật sau MFA có giảm FRR khi hành vi thay đổi qua ngày mà không tăng FAR? Đây là phân tích thăm dò nếu thiếu dữ liệu hoặc chưa có P2.

Phân biệt bộ tạo điểm với chính sách quyết định. Theo bản nháp: B0 là ngưỡng từng cửa sổ; B1 là CUSUM có quên và ngưỡng cố định; P1 là B1 với ngưỡng theo người; P2 là P1 với cập nhật sau MFA.

Đối chứng dự kiến gồm khoảng cách/robust z-score ngưỡng cố định và Isolation Forest + B0. So sánh B0/B1/P1 trên cùng bộ tạo điểm để tách tác động của chính sách. Cách gọi tên sẽ được đối chiếu với phần mô hình của anh Vũ; B0/B1 là hai cách ra quyết định, không phải hai bộ tạo điểm học máy khác nhau.

Tham số và điều kiện ghép mức FAR/TTD được chọn trên validation. Chốt trước mức mục tiêu, sai số cho phép, tỷ lệ phát hiện tối thiểu và chân trời theo dõi. Test chỉ dùng một cấu hình đã khóa; không chỉnh ngưỡng trên test để ép hai kết quả bằng nhau.

Việc chọn cấu hình gồm hai bước: lọc các cấu hình đạt ràng buộc trên validation, rồi chọn theo chỉ số mục tiêu và quy tắc phá hòa đã ghi trước. Nếu không có cấu hình phù hợp, báo rõ điều kiện chưa đạt thay vì nới tiêu chí sau khi xem test. Trên test, báo cả mức FAR/TTD thực tế và độ lệch so với mục tiêu; không mặc nhiên gọi hai phương pháp là tương đương.

## 3. Dữ liệu và chia tập

Đã thấy bộ mô phỏng SIM01-SIM04 trong member2. Chưa xác nhận tình trạng thu thật ngoài repo. Bộ này phục vụ kiểm thử tích hợp, không chứng minh hiệu quả trên người thật. Dữ liệu kiểm thử trình duyệt cũng không được coi là người tham gia chỉ vì có nhãn real.

Phân biệt nguồn bằng cách tạo dữ liệu, không bằng số lượng file hoặc thời gian chạy: (1) fixture là ví dụ thiết kế để kiểm công thức; (2) synthetic là dữ liệu sinh theo mô hình, kể cả AI mô phỏng bốn vai; (3) browser QA là gõ tự động để kiểm công cụ; (4) dữ liệu người thật là sự kiện từ người tham gia tự gõ, có đồng thuận và hồ sơ phiên kiểm chứng được. QA là kiểm tra chất lượng chức năng, không phải một người tham gia. Không trộn ba loại đầu vào bảng kết quả người thật hoặc đổi nhãn để làm đủ mẫu.

Một người gõ bốn vai vẫn chỉ là một người; bốn hồ sơ AI không tạo ra bốn người độc lập. Thời gian chạy hai tiếng hoặc việc gán ngày tổng hợp không chứng minh có biến thiên qua ba ngày thật. Bộ mô phỏng mới cần mô tả bộ sinh, seed, phân phối/tham số và vai trò kiểm thử; không chọn bộ sinh theo kết quả test để tạo lợi thế cho phương pháp. Nếu toàn bộ đánh giá chỉ dùng mô phỏng, phạm vi kết luận phải giữ ở kiểm thử tích hợp và độ nhạy trong giả định bộ sinh.

Cập nhật member2 tại commit f0fb15c (đã được thay bằng thiết kế năm phiên ở đoạn dưới): kế hoạch thu thật mới đặt mục tiêu 20 người, bốn phiên chính thức/người qua ít nhất ba ngày: ngày 1 hai train, ngày 2 một validation, ngày 3 một test. Hai phiên train cách nhau ít nhất 30 phút từ kết thúc phiên trước đến bắt đầu phiên sau; mỗi phiên chính thức cần ít nhất 1.000 lần gõ hợp lệ và 480 giây ghi chủ động. Pilot cần 300 lần gõ và 300 giây, tách khỏi nghiên cứu chính. Đây là mục tiêu thiết kế, không phải số người/phiên đã thu được.

Cập nhật 19/10: phần dữ liệu đã đổi thiết kế thu thật thành năm phiên mỗi người (hai train ngày 1, hai validation ngày 2, một test ngày 3), đồng bộ protocol, validator và kiểm thử. Thiết kế này khớp yêu cầu hai phiên validation của phần mô hình: phiên validation đầu dùng hiệu chỉnh điểm, phiên sau dùng chọn ngưỡng và chính sách. Bộ dữ liệu hiện có vẫn là mô phỏng; thiết kế năm phiên áp dụng cho lần thu người thật nếu có. Không chia cửa sổ của một phiên để giả làm hai phiên độc lập, không dùng test để bù validation.

Bốn file AI-PACED-P01-P04 mới là pilot QA do AI vận hành; hồ sơ kiểm thử ghi 0 người tham gia thật. Đã kiểm lại 1.321 lần gõ hợp lệ, tổng 1.248,125 giây ghi chủ động; các mục tiêu pilot đạt nhưng không trở thành dữ liệu nghiên cứu người thật. Manifest phân tích vẫn chứa 24 phiên synthetic SIM01-SIM04. Quy mô thực tế chỉ ghi theo nguồn thu được và điều kiện đã xác minh.

Cùng một người có thể xuất hiện trong train và test vì đây là xác minh tài khoản đã đăng ký qua các phiên mới. Điều này khác với thử khả năng khái quát cho người dùng chưa từng đăng ký. Nếu chưa có nhóm người lạ độc lập, kết luận về tiếp quản chỉ áp dụng cho các người nguồn có trong bộ đánh giá.

Mỗi phiên nguồn chỉ thuộc một tập. Mọi cửa sổ, đoạn ghép hoặc biến thể nhiễu từ phiên đó kế thừa tập này. Kiểm tra mã phiên và SHA-256 trùng giữa các tập. Bộ đánh giá hiện kiểm manifest khai báo; khi tích hợp phải đối chiếu hash với file thô thật, không chỉ tin manifest.

Normalizer và chiều active fit bằng train của tài khoản đích. Mẫu người B được chấm cho tài khoản A phải dùng chuẩn hóa A. Không sử dụng normalized_windows.csv đã chuẩn hóa theo nguồn để đánh giá B giả làm A.

W=50 là mặc định bàn giao; W=20/100 là phân tích độ nhạy riêng. Không gộp các kích thước thành mẫu độc lập vì dùng chung phím nguồn. Không dùng ID người, ID phiên, split hoặc nhãn thật làm đặc trưng.

Quy tắc chất lượng phải khóa trước: cặp nhấn/nhả hợp lệ, không nối qua đoạn gián đoạn, kiểm tra thời lượng, cửa sổ đủ phím. Giữ khoảng flight âm hợp lệ do gõ chồng. Không loại phiên chỉ vì mô hình đoán kém. Các phiên bị loại cần lý do và số lượng.

Dữ liệu thật chỉ được dùng khi người tham gia đã đồng ý với mục đích nghiên cứu. Giữ mã người thay cho tên; không đưa nội dung gõ, bảng nối mã với danh tính hoặc dữ liệu thô riêng tư vào báo cáo/kho công khai. File trao đổi dùng số liệu tổng hợp hoặc nguồn đã được phép chia sẻ. Khi có yêu cầu rút dữ liệu, cập nhật manifest và chạy lại phần kết quả liên quan theo quy trình dữ liệu chung.

## 4. Ma trận kịch bản

G0 - Chính chủ bình thường: chạy trọn phiên hợp lệ; đo FRR, MFA/giờ, thu hồi oan và thời lượng quan sát.
A1 - Tiếp quản đột ngột: nối đoạn chính chủ A với đoạn người B khác A trong cùng split; đo TTD, tỷ lệ phát hiện và ca không phát hiện.
G1 - Chính chủ thay đổi tốc độ: ưu tiên thu phiên nhanh/chậm thật có nhãn điều kiện. Nếu chỉ co giãn timestamp, gọi là thử độ nhạy nhân tạo và không suy ra hành vi người thật.
G2 - Ít dữ liệu: tách thiếu dữ liệu đăng ký và phiên quan sát ngắn. Giảm train theo quy tắc cố định, giữ test không đổi; normalizer, chiều active và mô hình phải được fit lại chỉ từ phần train còn lại để tránh giữ thông tin của hồ sơ đầy đủ. Phiên quá ngắn được báo thiếu quan sát, không coi là được xác thực an toàn.
G3 - Nhiễu/khoảng nghỉ: mô tả phép biến đổi, seed và chính sách reset. Thực hiện trong bản sao dữ liệu, giữ nguồn gốc và split.
G4 - Đổi bàn phím: chỉ làm nếu có dữ liệu cùng người khác bàn phím, không suy diễn từ đổi tốc độ.

A2 (cùng nội dung) chỉ làm khi kiểm soát được nội dung; A3 (luyện bắt chước) là tùy chọn. A4 (phát lại gói cũ) thuộc kiểm thử tích hợp của chị Trâm, không gộp vào FAR/FRR sinh trắc. Không mở rộng phạm vi sang tấn công endpoint hoặc tự sinh sự kiện.

Mỗi kịch bản giữ cùng phiên nguồn và điều kiện thử qua các phương pháp. G1/G3 nhân tạo cần ghi rõ mức biến đổi và seed trước khi tính điểm; các mức này hiện chưa được chọn. Kết quả G0, A1 và từng điều kiện G1-G4 được trình bày riêng để không che khác biệt giữa các tình huống. G4/A2/A3 chỉ được đưa vào kết luận khi có dữ liệu tương ứng.

## 5. Quy tắc tiếp quản và thời gian

Lưu scenario_id, tài khoản đích, các phiên/đoạn nguồn, khoảng phím nguồn, điểm ghép, seed, offset thời gian, phiên bản thuật toán ghép và chân trời theo dõi.

Dự kiến chọn cặp có thứ tự A -> B, với A khác B, từ các phiên đủ điều kiện trong cùng split. Số đoạn/cặp, số phím chính chủ trước N, số phím theo dõi sau N và cách lấy đoạn sẽ được cố định trong cấu hình trước khi chạy. Chọn đoạn theo quy tắc thời gian hoặc seed, không dựa vào điểm mô hình. Một danh sách kịch bản được dùng chung cho tất cả phương pháp; các đoạn từ cùng người/phiên vẫn giữ liên kết nguồn và không được coi là người độc lập.

Ưu tiên cân bằng số ca theo tài khoản đích và người nguồn; nếu không đủ dữ liệu để cân bằng, báo số ca từng cặp cùng cách tính trọng số. Khác biệt số ca và thời lượng là thông tin cần giữ trong bảng, không chỉ báo một tỷ lệ tổng.

N là phím đầu tiên của người lạ; t0 là keydown của phím đó. Ghép ở mức phím/sự kiện rồi trích đặc trưng bằng pipeline của anh Phong, không nối dữ liệu đã chuẩn hóa theo nguồn. Giữ dwell/flight nội bộ và chốt khoảng nghỉ tại điểm ghép để không tạo tín hiệu tiếp quản giả.

Detector không nhận N hoặc nhãn người lạ và không được reset bí mật tại N. Cửa sổ trộn hai người vẫn xử lý nhân quả nhưng không tính FAR/FRR. Các mốc dùng cho TTD là thời điểm có quyết định, không phải thời điểm bắt đầu cửa sổ.

Cảnh báo trước N là báo nhầm. Nếu phiên đã thu hồi trước N, đánh dấu tiếp quản chưa diễn ra, không ghi TTD=0. Một MFA_PENDING kéo dài chỉ là một yêu cầu MFA. Thống nhất cooldown, reset S, xử lý gián đoạn và điều kiện REVOKE với chị Trâm/anh Vũ.

Một trường hợp cần làm rõ khi nối hệ thống là MFA đã được yêu cầu trước N nhưng chưa hoàn tất tại N. Lần thu hồi do yêu cầu cũ thất bại không tự động chứng minh bộ phát hiện đã nhận ra người lạ. Bộ đánh giá hiện dừng và nêu rõ ca này để tránh tính nhầm TTD, kể cả khi yêu cầu cũ hoàn tất sau N; không tự ghi là phát hiện, kiểm duyệt hay bỏ ca khỏi mẫu số. Khi nối log, mình sẽ thống nhất thêm thứ tự sự kiện, cách liên kết yêu cầu với kết quả/nguyên nhân thu hồi và việc phiên có cho tiếp tục gõ trong lúc chờ MFA hay không. Chi tiết kiểm tra kỹ thuật nằm trong README.md.

Đề xuất TTD_keys là số lần gõ hợp lệ của người lạ đã quan sát đến cảnh báo, bao gồm phím N. Cần phân biệt số lần gõ hợp lệ với tổng phím vật lý; báo số bị loại. TTD_ms là thời gian quyết định trừ t0. Replay này không đo latency xử lý thực của máy.

Không cảnh báo trước khi hết quan sát: ghi kiểm duyệt phải cùng độ dài theo dõi, không điền TTD=0 hoặc gán độ dài phiên thành TTD đã phát hiện.

## 6. Chỉ số và hai luồng đánh giá

Luồng 1 - Cửa sổ cố định: cùng cửa sổ cho các phương pháp, điểm liên tục và quyết định chấp nhận/từ chối. Dùng cho FAR, FRR, ROC và EER của scorer/ngưỡng cửa sổ. Không dùng log bị cắt sau REVOKE để giả làm tập cửa sổ cố định.

Luồng 2 - Replay phiên có trạng thái: log các sự kiện yêu cầu MFA, MFA đạt/trượt, reset và REVOKE. Dùng cho TTD, phát hiện, MFA/giờ, thu hồi oan và thời lượng. Không tạo dự đoán giả sau REVOKE.

FAR = cửa sổ người lạ được chấp nhận / tổng cửa sổ người lạ hợp lệ.
FRR = cửa sổ chính chủ bị từ chối / tổng cửa sổ chính chủ hợp lệ.
Cửa sổ mixed/unknown bị loại khỏi hai mẫu số nhưng có báo số lượng. Không có mẫu số: NA và lý do, không trả 0.

EER là giao điểm nội suy tuyến tính FAR/FRR của ROC thực nghiệm có xử lý điểm trùng. Quy ước điểm càng cao càng bất thường; từ chối khi score >= threshold. Với lớp dương là người lạ, ROC FPR = FRR và FNR = FAR. EER test chỉ là mô tả; không lấy ngưỡng EER test làm ngưỡng vận hành rồi đánh giá lại trên test.

TTD báo theo phím và mili giây; median/IQR trên ca đã phát hiện phải ghi rõ tính có điều kiện. Luôn báo số kiểm duyệt và tỷ lệ phát hiện. Bộ đánh giá bản 0.1 chưa ước lượng Kaplan-Meier hoặc median toàn bộ có kiểm duyệt; không được diễn giải median có điều kiện thành median toàn bộ.

Tỷ lệ phát hiện tại L = số phát hiện trước hoặc tại L / số ca biết được kết cục tại L. Ca phát hiện sớm được biết kết cục; ca chưa phát hiện và theo dõi ngắn hơn L phải báo riêng. Nếu có ca thiếu theo dõi, tỷ lệ complete-case chỉ mô tả các ca có kết cục, không phải ước lượng không thiên lệch cho tất cả ca.

MFA/giờ = số sự kiện yêu cầu MFA ở chính chủ / thời gian chính chủ quan sát, đổi sang giờ. Báo cả thời gian phiên và thời gian recording (loại tạm dừng). recording_seconds không đồng nghĩa chỉ thời gian thực sự gõ phím. Thiếu mẫu số hoặc thời lượng bằng 0: NA. Ghi riêng thu hồi oan để tránh việc kết thúc phiên sớm làm đẹp chỉ số MFA.

Ví dụ cách đọc công thức, không phải kết quả nghiên cứu: 1/4 cửa sổ người lạ được chấp nhận cho FAR=25%; 1/5 cửa sổ chính chủ bị từ chối cho FRR=20%. Hai yêu cầu MFA trong nửa giờ chính chủ đã quan sát cho 4 yêu cầu/giờ, không phải 4 người hoặc 4 phiên. Ví dụ này chỉ minh họa tử số, mẫu số và đơn vị.

Đề xuất cho bảng vận hành chính là dùng phiên G0 để đo gánh nặng MFA và báo riêng đoạn chính chủ trước N của A1. Phần 3 hiện dùng G0; evaluator member4 hiện cộng cả các đoạn chính chủ nếu nhập chung G0/A1. Chưa hợp nhất hai phép đo hoặc lấy số của hai bên so trực tiếp; adapter hiện chỉ nối cửa sổ cố định nên TTD/MFA là NA. TTD cảnh báo toàn chính sách cũng cần báo riêng cửa sổ genuine hoàn tất trễ sau N, không quy thành năng lực phân biệt thuần của scorer.

FAR của chính sách CUSUM có reset/cooldown chưa được định nghĩa bằng luồng 1. Phần này cần được thống nhất với cách phát lại phiên trong hệ thống trước khi dùng làm ràng buộc RQ2. Không quét h trên một log CUSUM sẵn có và coi đó là các lần replay tương đương.

## 7. Thống kê và kết luận

Đơn vị phân tích chính là người dùng. Tính chỉ số theo người rồi tổng hợp macro, không biến hàng trăm cửa sổ thành hàng trăm người độc lập. Báo n người, n phiên, n kịch bản, mẫu số và số loại/kiểm duyệt.

Median, Q1, Q3 và IQR dùng nội suy tuyến tính tại (n-1)*q. Bootstrap ghép cặp resample người dùng, giữ hai phương pháp cùng người; đề xuất 2.000 lần, seed khóa. Báo CI 95% percentile của trung bình hiệu số theo người. Không gọi CI của trung bình là CI của median.

Nguồn và cách triển khai: quy tắc phân vị tương ứng type 7 của R [S2]; paired bootstrap/percentile tham khảo tài liệu phương pháp [S3]. Với d_u = chỉ số(P1,u) - chỉ số(B1,u), mỗi lần bootstrap lấy lại n hiệu số theo người có hoàn lại, tính trung bình, rồi lấy phân vị 2,5% và 97,5%. Mã member4 tự hiện thực bằng Node; không gọi R hoặc SciPy, không dùng mặc định BCa của thư viện để mô tả nhầm CI percentile đang có.

Wilcoxon signed-rank hai phía dùng hiệu số cùng người; bỏ hiệu số bằng 0, dùng hạng trung bình khi bằng nhau. Cần xem giả định đối xứng của hiệu số và độc lập giữa người trước khi diễn giải p-value. Cách tính và giới hạn của mã được ghi trong README.md; số người thực sự đưa vào phép so sánh sẽ được báo cùng lý do loại nếu có.

Đối chiếu giả định và quy ước zero/ties với [S4]. Bộ mã tính phân phối đổi dấu có điều kiện trên các hạng quan sát; không khẳng định giống chế độ exact mặc định của mọi thư viện khi có ties/zeros. Với n hiệu số khác 0, mã xét xác suất trên 2^n cấu hình dấu bằng quy hoạch động; hiện hỗ trợ tối đa 50 cặp, dưới hai cặp trả p là NA và lý do. Đây là giới hạn triển khai, không phải số mẫu tối thiểu đủ cho suy luận khoa học.

Effect size gồm trung bình/median hiệu số có đơn vị và rank-biserial r=(W+ - W-)/(W+ + W-). Hiệu số mặc định P1-B1: âm là tốt hơn khi chỉ số MFA/giờ. Tất cả hiệu số bằng 0: r theo hạng NA; không chia 0.

W+ và W- lần lượt là tổng hạng của hiệu số d_u dương và âm sau bỏ zero. Công thức matched-pairs rank-biserial tham khảo [S5]; không thay bằng r=Z/sqrt(n) rồi coi là cùng chỉ số. Bộ hiện tại không xuất CI cho rank-biserial; CI bootstrap nói trên là cho trung bình hiệu số có đơn vị.

Nếu chỉ có 4 người thật, p hai phía nhỏ nhất với 4 hiệu số khác 0 là 0,125. Kết quả chỉ nên trình bày thăm dò, không tuyên bố có ý nghĩa p<0,05. CI với mẫu nhỏ không tạo ra bằng chứng mạnh. CI chứa 0 nghĩa là chưa đủ bằng chứng khác biệt, không chứng minh tương đương.

Khi các người cùng làm nguồn tấn công cho nhau, có phụ thuộc chéo. Bootstrap theo tài khoản đích chỉ cho kết luận có điều kiện trên nhóm nguồn hiện tại. Không dùng Wilcoxon trên TTD kiểm duyệt như số đo đầy đủ hoặc chỉ giữ các ca phát hiện thuận lợi.

So sánh chính dự kiến là hiệu số MFA/giờ của P1 và B1 cho RQ1, trên cùng điều kiện phiên và sau khi kiểm tra yêu cầu TTD/tỷ lệ phát hiện. Các kiểm định phụ cần ghi thăm dò hoặc hiệu chỉnh đa kiểm định theo cách đã chọn trước. Chưa có kết quả người thật và chưa thể kết luận H1-H3.

## 8. Bảng, biểu đồ và phân tích lỗi

Bảng dữ liệu: nguồn real/synthetic/fixture, số người/phiên/phím/cửa sổ theo split, số loại và nguyên nhân.
Bảng cấu hình: scorer, policy, W, tham số, seed và tiêu chí chọn validation.
Bảng kết quả: từng người và tổng hợp, FAR/FRR/EER, TTD có điều kiện, phát hiện, kiểm duyệt, MFA/giờ và thu hồi oan.
Bảng ablation: bỏ CUSUM, lambda=1, ngưỡng cố định, bỏ ngữ cảnh nếu có.
Bảng lỗi: mã ca, dự đoán/nhãn, dấu vết thời gian/điểm, nguyên nhân khả dĩ, kiểm tra bổ sung và giới hạn.

Biểu đồ ưu tiên: ROC scorer; cặp MFA/giờ theo người; TTD với ca không phát hiện; chuỗi a/z/S/h có đánh dấu N và cảnh báo khi có log TV3. Không đưa chart fixture vào phần kết quả thật.

Mỗi bảng/hình phải có dòng nguồn fixture/synthetic/người thật, đơn vị quan sát, số tài khoản thực sự, định nghĩa chỉ số, tập đánh giá và cấu hình đã khóa. Nếu dùng dữ liệu AI sinh bốn hồ sơ, ghi “4 hồ sơ mô phỏng”, không ghi “4 người tham gia” hoặc dùng các tên thành viên làm bằng chứng danh tính. Tách ba mức kết luận: test đạt chứng minh các ca kỹ thuật đã kiểm; kết quả mô phỏng mô tả bộ sinh hiện tại; kết quả người thật chỉ được bàn khi có phiên thu thật đủ điều kiện.

Khi đối chiếu paper, phân loại fixed-text/free-text, desktop/mobile, bộ tạo điểm học thống kê/học máy/học biểu diễn và chính sách tuần tự. Ghi khác biệt người/phiên/ngày, split, nguồn dữ liệu, chỉ số cửa sổ hay theo thời gian; không xếp hạng bằng EER từ những điều kiện khác nhau. Đã đối chiếu có mục tiêu ba PDF [S7]-[S9]; tóm tắt, trang/bảng bằng chứng và giới hạn nằm trong TOM_TAT_3_TAI_LIEU_VO_CONG_MINH.docx. Chưa tái lập thực nghiệm của tác giả, không gọi đây là bằng chứng hiệu quả của nhóm hoặc bộ tài liệu “mới nhất”.

Phân biệt đánh giá tĩnh với đánh giá tuần tự có cập nhật: chấm mẫu hiện tại bằng trạng thái trước cập nhật, sau đó chỉ dùng thông tin đã có và đủ điều kiện để cập nhật cho tương lai. Quy tắc và tham số cập nhật phải khóa trước; không dùng nhãn tương lai, cập nhật rồi chấm lại cùng mẫu hoặc dùng test để chọn cấu hình. Với P2, phải lưu thời điểm MFA hoàn tất và nguồn xác nhận; cơ chế tự chấp nhận của paper khác không tự thay cho MFA trong thiết kế nhóm.

Các nhóm lỗi cần đọc: người lạ có nhịp gần chủ; chính chủ đổi tốc độ; ít dữ liệu; khoảng nghỉ; cửa sổ trộn; thu hồi trước N; thời gian xử lý hoặc timestamp không hợp lệ. Không suy ra nguyên nhân chắc chắn chỉ từ một biểu đồ.

Danh sách ca lỗi được xuất từ toàn bộ kết quả theo các loại trên. Khi chọn ví dụ để trình bày, ghi tiêu chí chọn (chẳng hạn TTD dài nhất hoặc lấy mẫu có seed trong từng loại), kèm số ca của cả loại để tránh chỉ chọn ví dụ thuận lợi. Mọi số liệu/hình dùng trong báo cáo cần truy về run_id, cấu hình và dòng dữ liệu nguồn.

## 9. Một vài điểm trao đổi để các phần khớp nhau

Với phần của chị Trâm: em đang bám A1 làm kịch bản chính. Chị xem giúp em cách tính TTD và xử lý cảnh báo/MFA/reset như trên đã khớp với luồng hệ thống chưa nhé. Phần mô hình đe dọa vẫn giữ giả định bộ thu chưa bị sửa; kết quả A1 không đại diện cho mọi hình thức chiếm cookie hoặc giả mạo dữ liệu trình duyệt.

Với phần dữ liệu của anh Phong: em đang thấy bản nháp mô tả 10 nhóm phím, còn bộ bàn giao dùng 3 nhóm. Mình đối chiếu lại để phần mô tả và dữ liệu sử dụng cùng một quy ước. Điều kiện độ phân giải đồng hồ <=1 ms cũng cần xem metadata và phép đo thực tế trước khi ghi là đã kiểm tra.

Về số phiên validation: anh Phong đã cập nhật thiết kế thu thật thành năm phiên mỗi người (có hai phiên validation), khớp với mô hình của anh Vũ. Bốn lượt AI pilot hiện chỉ dùng kiểm công cụ, không tính thành bốn người tham gia.

Với phần mô hình của anh Vũ: em đã đối chiếu độc lập cả điểm cửa sổ cố định và replay có trạng thái của lần chạy 19/10, tất cả đều khớp. Định nghĩa TTD và MFA/giờ em đề xuất chốt ở mục 6 của DOI_CHIEU_REPLAY_MEMBER3_VO_CONG_MINH.docx; mọi người không có ý kiến khác thì em dùng thống nhất trong báo cáo.

Sau cập nhật member2, sessions.csv và receipt xử lý đã đổi nội dung; lần đối chiếu cũ vẫn là lịch sử, không phải xác nhận cho checkout mới. Cần tạo run fit/evaluate mới với đúng đầu vào và receipt hiện hành trước lần tích hợp tiếp theo, không bỏ kiểm hash để dùng lại model cũ.

Có hai lựa chọn chung còn mở: cách ghép mức TTD/FAR để so sánh công bằng, và quy tắc MFA. Bản nháp có cả MFA xác định (chủ qua, người lạ trượt) lẫn MFA theo xác suất; em nghiêng về bản xác định cho phép so sánh chính, còn xác suất để thử độ nhạy riêng. Nếu dùng P2, mình ghi rõ thành phần cập nhật và chỉ lấy lịch sử đã đủ điều kiện, không dùng nhãn tương lai.

Các mốc EER <=15% và TTD <=150 phím trong bản nháp là tiêu chí dự kiến, không phải kết quả. Nếu đổi hướng dựa trên test đã xem thì cần test mới hoặc công khai phân tích hậu nghiệm.

## 10. Tái lập và hợp đồng bàn giao

Mỗi run lưu input nguyên bản, SHA-256 input/mã evaluator, phiên bản Node, Git commit và trạng thái dirty, split, seed, cấu hình và output hashes. Chạy lại cùng input/options phải cho cùng report/CSV/SVG; timestamp và metadata chạy được phép khác và phải tách riêng.

Định dạng đầu vào 0.1 của member4 là bản dự kiến để nối dữ liệu. Có thể bổ sung bước chuyển đổi từ CSV/JSON thực tế, giữ nguyên module của các thành viên. Đầu vào tách danh sách phiên nguồn, bảng cửa sổ cố định và sự kiện theo phiên. Chi tiết trường, đơn vị và lệnh trong README.md.

Kiểm tra leakage hiện chỉ kiểm hợp đồng/manifest đầu vào, chưa chứng minh cách fit mô hình không dùng test. Khi ghép phần mô hình, em sẽ cùng anh Vũ đối chiếu cấu hình và bước fit/transform để kiểm tra thêm điểm này.

Các thông tin cần điền trước lần chạy chính thức:

- Dữ liệu: nguồn và sự đồng ý sử dụng, số người/phiên/ngày, split, quy tắc chất lượng và xử lý mẫu thiếu.
- Kịch bản: W, cách chọn cặp/đoạn, số phím trước N, chân trời L, khoảng nghỉ tại điểm ghép và các mức biến đổi G1-G3.
- Mô hình: danh sách scorer/policy, phạm vi tìm tham số, điều kiện cập nhật hồ sơ, reset/cooldown và xử lý MFA qua thời điểm tiếp quản.
- Đánh giá: chỉ số/ràng buộc cho từng RQ, giá trị mục tiêu và sai số cho phép, quy tắc chọn cấu hình/phá hòa, cách xử lý thiếu theo dõi và kiểm định phụ.

Những giá trị chưa có được ghi là chưa thống nhất, không lấy mặc định trong mã thử làm quyết định nghiên cứu. Trình tự thực hiện là kiểm dữ liệu và điều kiện thử, đối chiếu ví dụ nhỏ với kết quả tính tay, chọn cấu hình bằng validation, lưu cấu hình đã khóa rồi mới đánh giá test. Khi đổi thiết kế sau khi xem test, ghi rõ thay đổi và giới hạn thay vì báo như một phép thử đã xác định từ đầu.

## 11. Câu hỏi bảo vệ và giới hạn

Vì sao không random cửa sổ? Vì cùng phiên/phím nguồn phụ thuộc nhau và gây leakage.
Vì sao EER chưa đủ? Vì không đo tốc độ phát hiện và phiền do MFA theo thời gian.
Không phát hiện có TTD bao nhiêu? Chưa quan sát được, ghi kiểm duyệt và độ dài theo dõi.
Ít MFA có luôn tốt? Không, có thể bỏ lọt hoặc thu hồi oan sớm; phải đọc các chỉ số cùng nhau.
Vì sao dùng hồ sơ đích để chuẩn hóa? Vì khi xác minh chỉ biết tài khoản được khai báo, không biết danh tính thật của người gõ.
Ghép offline chứng minh gì? Hiệu quả trong kịch bản từ bản ghi có kiểm soát, chưa phải tấn công trực tiếp.
Có chống malware hay tự sinh sự kiện không? Không thuộc phạm vi và không được kết luận từ A1.
Với bốn người có suy rộng được không? Chỉ thăm dò với giới hạn mẫu và phụ thuộc, không bằng chứng quần thể.

Vì sao dùng nhịp gõ thay vì chỉ hết hạn phiên/xác thực lại định kỳ? Nó có thể bổ sung bằng chứng về người đang nhập liệu giữa hai lần xác thực. Đổi lại phải tích lũy đủ phím, có báo nhầm, biến thiên hành vi và rủi ro riêng tư; không gõ thì không có tín hiệu nhịp gõ mới. Đây là phân tích phạm vi, không phải kết quả benchmark ưu thế so với các biện pháp khác; các biện pháp quản lý phiên vẫn bổ sung cho nhau [S6].
Cookie chứa gì và A1 chứng minh được gì? NIST mô tả cookie phiên nên mang giá trị opaque để gắn với phiên; không mặc định chứa mật khẩu, mẫu nhịp gõ hoặc danh tính dạng rõ [S6]. Nội dung cookie thực tế do phần tích hợp xác nhận, không đưa giá trị bí mật thật lên báo cáo. A1 kiểm đổi người ở luồng gõ, không chứng minh chống lấy cắp/phát lại cookie.
Các con số W=50, L=150 hay 2.000 bootstrap lấy ở đâu? Đó là lựa chọn thiết kế/triển khai cần ghi cấu hình, không phải định luật hoặc số tối ưu được paper bảo đảm; nguồn công thức và nguồn giá trị cụ thể được tách ở mục 12.
Bốn vai AI có thay bốn người được không? Không. Chúng là hồ sơ mô phỏng để thử pipeline; tăng số lượt hoặc chạy lâu không thêm người thật và không chứng minh biến thiên qua ngày.

Giới hạn hiện tại: đã nối điểm cửa sổ TV3 và đối chiếu độc lập cả FAR/FRR/EER lẫn replay TTD/MFA trên mô phỏng; thời lượng ghi dùng làm mẫu số MFA/giờ mới được kiểm tính nhất quán, chưa tính lại từ dữ liệu thô. TV3 đã có ghép A1 từ strokes và ablation lambda=1, nhưng member4 chưa tái dựng/đánh giá độc lập các phần đó; chưa có kết quả người thật hoặc phân tích thời gian đến phát hiện đầy đủ khi có kiểm duyệt. Đã có kiểm thử và chặn tính nhầm khi MFA chờ xuyên qua N, nhưng cách phân loại đầy đủ các ca này còn cần thống nhất khi nối log. MFA mô phỏng không chứng minh yếu tố MFA thực tế an toàn.

Bản nháp đã có phần phương pháp và câu hỏi phản biện, nhưng phần kết quả, kiểm định trên dữ liệu thật và phân tích sai số vẫn cần thực nghiệm. Tài liệu này không thay cho kết quả chạy mô hình, phần đọc tài liệu khoa học hoặc review mã độc lập theo phân công.

## 12. Nguồn và phạm vi xác minh

Nguồn chính (đường dẫn tính từ final-project): PHAN_CONG_CONG_VIEC_NHOM.md; member1/Bao_cao_MTH042_Nhom02_draft.docx (mục 2.3-2.5, 3-5); member2/README.md; member2/docs/HANDOFF.md, DATA_DICTIONARY.md, COLLECTION_PROTOCOL.md.

Nguồn phương pháp đã đối chiếu để viết phần đánh giá; tài liệu hướng dẫn/thư viện không thay thế ba bài nghiên cứu cần đọc:

[S1] Killourhy & Maxion (2009), Comparing Anomaly-Detection Algorithms for Keystroke Dynamics: trang phương pháp và benchmark CMU, https://www.cs.cmu.edu/~keystroke/ . Tham chiếu đánh giá xác minh theo tài khoản; đây là mật khẩu cố định, không phải bằng chứng TTD cho free-text. FAR/FRR ở mục 6 là tỷ lệ sự kiện sai với mẫu số được định nghĩa rõ; cách xử lý ties/nội suy EER là quy ước evaluator đã kiểm thử, không tuyên bố sao nguyên toàn bộ giao thức CMU.

[S2] R Core Team, Sample Quantiles, mục Types/type 7, https://stat.ethz.ch/R-manual/R-devel/library/stats/html/quantile.html . Căn cứ quy tắc phân vị tuyến tính; tài liệu dẫn Hyndman & Fan (1996). Chưa dùng đây làm một paper mới đã đọc.

[S3] SciPy, scipy.stats.bootstrap, https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.bootstrap.html . Căn cứ resample có hoàn lại, giữ ghép cặp và phân biệt percentile/basic/BCa. Bản member4 dùng percentile, không gọi SciPy; số lần lặp/seed là cấu hình nhóm.

[S4] SciPy, scipy.stats.wilcoxon, mục giả định, zero_method và Notes, https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.wilcoxon.html . Căn cứ giải thích signed-rank, bỏ zero và lưu ý ties thay đổi phân phối null; mã member4 dùng đổi dấu có điều kiện trên midrank, không lấy mặc định thư viện làm cam kết tương đương.

[S5] easystats/effectsize, rank_biserial, mục matched-pairs và ties, https://easystats.github.io/effectsize/reference/rank_biserial.html . Căn cứ cách diễn giải hiệu số tỷ trọng hạng; công thức, dấu và quy tắc zero đã ghi ở mục 7. Không kế thừa CI xấp xỉ của thư viện vì mã chưa triển khai phần này.

[S6] NIST SP 800-63B-4, Session Management/Browser Cookies và Session Monitoring, https://pages.nist.gov/800-63-4/sp800-63b/session/ . Căn cứ phân biệt bí mật phiên, xác thực lại và giám sát phiên; không cung cấp ngưỡng FAR/TTD hay bảo đảm cho mô hình nhóm. Đối chiếu trực tiếp các nguồn [S2]-[S6] ngày 18/10/2026; [S1] mới đối chiếu trang phương pháp, chưa đọc trọn paper trong lượt này.

[S7] Stragapede và cộng sự, KVC-onGoing: Keystroke Verification Challenge, Pattern Recognition 161 (2025), 111287, online 20/12/2024, https://doi.org/10.1016/j.patcog.2024.111287 . PDF mục 3-5 trang 3-4, mục 6.1 trang 4, Bảng 4 trang 9, mục 8 trang 11: căn cứ phân biệt development/evaluation tách người, enrollment/verification, global/mean per-subject EER và giới hạn thu liên tiếp. Không dùng làm nguồn ANK/TTD, CUSUM hoặc bảo đảm L1/Isolation Forest của nhóm.

[S8] Ayeswarya S.; John Singh K., Enhancing security and usability with context aware multi-biometric fusion for continuous user authentication, Scientific Reports 15 (2025), 30627, https://doi.org/10.1038/s41598-025-14833-z . PDF trang 1, 5-6, 8-10, 15-16, 20-22: ví dụ fusion keystroke/gait có trọng số theo ngữ cảnh, không phải Isolation Forest. EER 2,35% là số tác giả báo cáo cho đa kênh; giao thức chia tập và khác biệt số liệu giữa các bảng chưa đủ rõ để dùng làm chuẩn so sánh định lượng với nhóm.

[S9] Hussien và cộng sự, Adaptive Security Model for Data Protection Using Behavioral User Authentication, Journal of Al-Qadisiyah for Computer Science and Mathematics 18(1) (2026), Comp 389-402, online 30/03/2026, https://doi.org/10.29304/jqcsm.2026.18.12651 . PDF trang 6-7, 9-12: ví dụ LSTM/Autoencoder, replay buffer, KL/moving average và đối chứng thích ứng. Split 70/15/15 chưa đủ rõ đơn vị/thứ tự; Bảng 3 và 6 có kết quả hybrid khác nhau chưa giải thích đầy đủ. Chỉ tham khảo cơ chế/nhu cầu đánh giá, không coi đã chứng minh không leakage, cập nhật an toàn, CUSUM hoặc P2 sau MFA.

Nguồn mô hình: member3/docs/NGUON_THAM_KHAO.md và BAO_CAO_PHAN_3.md tách nguồn Isolation Forest, CUSUM truyền thống, MAD và phần nhóm tự hiện thực. Công thức mô hình giữ ở phần anh Vũ, không chép lại thành một phương pháp mới của member4; biến thể quên/reset/MFA phải được kiểm bằng replay, không mượn bảo đảm của CUSUM cổ điển.

Sổ tham số của lần mô phỏng hiện có, đối chiếu member3/artifacts/simulation-reviewed/fit/model.json và evaluation/config.json: W=50; A1 prefix/suffix=225/300 phím, down-down chỗ nối=250 ms; L=150 phím; h2=2*h1; cooldown=2 cửa sổ. Đây là hằng số thiết kế của nhóm. Lưới lambda={0,9;1}, k={0,25;0,5;1}, h1={0,5;1;2;3;5;8;12} chọn bằng validation; P1 giữ lambda/k của B1 và chọn h theo người. Không coi lưới hoặc các giá trị đã chọn là tối ưu phổ quát.

Ngưỡng cửa sổ có lưới riêng {0;0,5;1;2;3;5;8;12}; các mức maxWindowFar=0,15, maxMedianTtdKeys=150, minDetectionRate=0,8, maxPolicyFar=0,15 là tiêu chí mô phỏng, không phải kết quả hoặc yêu cầu NIST. Các cấu hình hiện không đạt ràng buộc đã được ghi ở file đối chiếu; không dùng EER <=15% trong bản nháp như đồng nghĩa maxWindowFar=0,15.

Phần thống kê member4 dùng 2.000 bootstrap, CI 95%, seed mặc định 20261016 và mức p=0,05 để giải thích giới hạn mẫu; đây là lựa chọn triển khai/diễn giải, không phải bằng chứng đủ lực kiểm định. Mỗi run giữ seed/options thực tế. L=150 mặc định CLI cũng chỉ để chạy thử khi chưa có thiết kế duyệt; không được nâng thành quyết định nhóm một cách ngầm định.

Danh sách đọc tiếp: Killourhy & Maxion (2009), Comparing Anomaly-Detection Algorithms for Keystroke Dynamics, https://www.cs.cmu.edu/~keystroke/ ; Shadman và cộng sự, Keystroke Dynamics: Concepts, Techniques, and Applications, https://arxiv.org/abs/2303.04605 ; Ayotte và cộng sự, Fast Free-text Authentication via Instance-based Keystroke Dynamics, https://arxiv.org/abs/2006.09337 .

Danh sách đọc tiếp trên là hướng bổ sung, không thay ba PDF [S7]-[S9] đã đối chiếu có mục tiêu. Bản đọc chi tiết và tái lập vẫn chưa hoàn tất. Chưa xác minh toàn bộ trích dẫn pháp luật, ISO, hình và công thức Word của bản nháp. Không lấy số liệu của tác giả hoặc fixture làm số liệu của nhóm.
