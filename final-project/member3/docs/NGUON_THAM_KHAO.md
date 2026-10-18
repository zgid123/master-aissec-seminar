# Nguồn cơ sở cho phần 3

Các ghi chú dưới đây nêu phần đã đối chiếu để triển khai. Không dùng chúng để khẳng định đã đọc đủ ba bài báo theo phân công: M3 là hướng dẫn kỹ thuật, còn M2 được đối chiếu qua trang dữ liệu/phương pháp của tác giả.

## M1. Liu, Ting và Zhou — Isolation Forest, ICDM 2008

- Nguồn: [bản PDF trên trang tác giả](https://cs.nju.edu.cn/zhouzh/zhouzh.files/publication/icdm08b.pdf).
- Kế thừa: cây phân hoạch ngẫu nhiên, lấy mẫu con, giới hạn độ sâu và điểm dựa trên độ dài đường đi có hiệu chỉnh c(n).
- Hiện thực: dùng tổng điều hòa hữu hạn và chỉ chọn chiều có biến thiên tại nút. Lưu seed và toàn bộ cây.
- Giới hạn: phương pháp phát hiện bất thường tổng quát; không bảo đảm hiệu quả với nhịp gõ hay với bốn hồ sơ mô phỏng hiện tại. Mã phần 3 là hiện thực độc lập, chưa đối chiếu từng điểm với scikit-learn.

## M2. Killourhy và Maxion — Comparing Anomaly-Detection Algorithms for Keystroke Dynamics, DSN 2009

- Nguồn đã đối chiếu: [trang benchmark và phương pháp của tác giả tại CMU](https://www.cs.cmu.edu/~keystroke/).
- Kế thừa: tách huấn luyện/chấm điểm theo tài khoản, dùng người khác làm nguồn giả mạo và đánh giá scorer theo người trước khi tổng hợp.
- Khác biệt: tài liệu nguồn nghiên cứu mật khẩu cố định; phần 3 dùng thống kê cửa sổ gõ tự do và thêm replay có trạng thái. Không so trực tiếp EER ở hai điều kiện như cùng một thí nghiệm.
- Cách dùng: baseline khoảng cách dễ kiểm tra và quy trình đánh giá có thể chạy lại. Không ghi baseline L1 hiện tại là bản sao nguyên trạng scaled Manhattan của tác giả.

## M3. NIST/SEMATECH — CUSUM Control Charts

- Nguồn: [e-Handbook of Statistical Methods, mục CUSUM](https://itl.nist.gov/div898/handbook/pmc/section3/pmc323.htm).
- Kế thừa: cộng dồn sai lệch để phát hiện thay đổi nhỏ kéo dài; phân biệt giá trị tham chiếu và ngưỡng quyết định.
- Giới hạn: hướng dẫn không cung cấp bảo đảm cho biến thể có hệ số quên trên nhịp gõ. Không dùng bảng ARL truyền thống làm kết quả thực nghiệm của nhóm.

## M4. R Core Team — Median Absolute Deviation, tài liệu gói stats

- Nguồn: [tài liệu chính thức hàm mad](https://stat.ethz.ch/R-manual/R-devel/library/stats/html/mad.html), đối chiếu ngày 18/10/2026.
- Dùng để giải thích hệ số 1,4826: hiệu chỉnh MAD để có tính nhất quán với độ lệch chuẩn dưới phân phối chuẩn. Không suy ra dữ liệu nhịp gõ có phân phối chuẩn.
- Chuẩn hóa đặc trưng và hiệu chỉnh điểm là hai bước riêng, fit trên các tập khác nhau. Cách chia tập và xử lý MAD bằng 0 là quy tắc triển khai của nhóm.

## M5. Acien và cộng sự — TypeNet: Deep Learning Keystroke Biometrics

- Nguồn: [bản tác giả arXiv:2101.05570v3](https://arxiv.org/abs/2101.05570v3), ngày 13/09/2021; [nội dung bản tác giả](https://arxiv.org/html/2101.05570v3).
- Bảng bổ sung dùng nhãn “bản tác giả 2021”; nếu trích bản tạp chí, lấy lại metadata của bản chính thức, không đồng nhất năm bản thảo với năm số tạp chí.
- Đã đối chiếu mô tả LSTM, các chiến lược softmax/contrastive/triplet loss và phân hoạch người phát triển/đánh giá ở mục IV. Dùng để minh họa hướng học biểu diễn chuỗi.
- Khác đồ án: học biểu diễn từ nhiều người; phần 3 hiện fit scorer riêng bằng train chính chủ. Chưa tái hiện TypeNet; không so trực tiếp EER của tác giả với bộ synthetic hiện tại.

## M6. Stragapede và cộng sự — TypeFormer: transformers for mobile keystroke biometrics, 2024

- Nguồn: [bài chính thức, Neural Computing and Applications 36, 18531–18545](https://link.springer.com/article/10.1007/s00521-024-10140-2). DOI: 10.1007/s00521-024-10140-2. Công bố 30/07/2024.
- Đã đối chiếu mô tả phương pháp, mục 3 và thông tin công bố: kiến trúc mobile gồm các thành phần Transformer và LSTM; phân tích độ dài chuỗi và lượng mẫu đăng ký.
- Dùng để bổ sung nghiên cứu sau 2019 và phân biệt học biểu diễn với chính sách ra quyết định. Không dùng năm cập nhật bản thảo 2023 làm năm bài chính thức.
- Chưa tái hiện và không chuyển kết quả xác minh mobile thành bằng chứng phát hiện tiếp quản phiên desktop.

## M7. Stragapede và cộng sự — KVC-onGoing: Keystroke Verification Challenge, 2025

- Nguồn: [bản ghi công bố tại Universidad Autónoma de Madrid](https://portalcientifico.uam.es/es/ipublic/item/10428058); [bản tác giả, mục IV về giao thức](https://arxiv.org/html/2412.20530v1).
- Bản tạp chí: Pattern Recognition 161 (2025), bài 111287. DOI: 10.1016/j.patcog.2024.111287. Online từ tháng 12/2024; bảng dùng năm số tạp chí 2025.
- Đã đối chiếu giao thức xác minh theo phiên desktop/mobile, tách người phát triển/đánh giá, chuẩn hóa phép so sánh và xem xét công bằng nhân khẩu học.
- Dùng tham chiếu về giao thức; chưa tái hiện. KVC-onGoing không phải mô hình mới hoặc giao thức replay đổi người giữa phiên; các so sánh 1–1 không phải TTD.

## M8. NIST SP 800-63B-4 — Session Management và Session Monitoring, 2025

- Nguồn: [quản lý phiên](https://pages.nist.gov/800-63-4/sp800-63b/session/) và [giám sát phiên](https://pages.nist.gov/800-63-4/sp800-63b.html#session-monitoring).
- Trâm đã dẫn ở [1]. Khi ghép, dùng lại [1], không tạo số trích dẫn khác cho cùng tài liệu.
- Dùng đối chiếu xác thực lại, thời hạn phiên và các tín hiệu rủi ro. Bảng ưu/nhược điểm ở file bổ sung là phân tích theo kịch bản nhóm, không phải benchmark của NIST.
- Nguồn không ấn định W=50, h2=2h1, cooldown=2 hoặc ràng buộc mô phỏng của nhóm.

## M9. TypingDNA — ActiveLock, trang sản phẩm

- Nguồn: [Continuous Endpoint Authentication Using Typing Biometrics](https://www.typingdna.com/activelock-continuous-authentication), đối chiếu ngày 18/10/2026.
- Nhà cung cấp mô tả giám sát nhịp gõ và khóa máy/cảnh báo. Trang hiện còn mô tả kết hợp chuột và tùy chọn khuôn mặt; không trình bày ActiveLock là hệ thống chỉ dùng nhịp gõ như đồ án.
- Chỉ minh họa sản phẩm có thật. Không dùng quảng cáo tốc độ phát hiện hoặc logo khách hàng làm bằng chứng độc lập về hiệu quả hay triển khai tại tổ chức cụ thể.

## Cách dùng các nguồn bổ sung

M4 bổ sung căn cứ phương pháp; M5–M7 cho bảng nghiên cứu liên quan; M8 dùng lại nguồn đã có; M9 minh họa sản phẩm. Các ghi chú không đồng nghĩa đã tái hiện hoặc hoàn tất yêu cầu đọc paper độc lập theo phân công. Chưa rà soát hệ thống để khẳng định đây là các nghiên cứu mới nhất tính tới 2026.

## Tài liệu nội bộ

- `member2/docs/HANDOFF.md`, `DATA_DICTIONARY.md` và mã `features.ts`, `normalize.ts` là hợp đồng dữ liệu được phần 3 sử dụng.
- Bản nháp báo cáo của Trâm định nghĩa B0/B1/P1/P2 và kiến trúc hệ thống.
- Quy trình thực nghiệm bản 0.2 của Minh định nghĩa hai luồng đánh giá, cách xử lý TTD/kiểm duyệt và các điểm cần thống nhất khi nối log.

Các nhận định pháp luật, ISO và bảo mật trình duyệt trong báo cáo chung không được phần 3 xác minh lại ở lần triển khai này.
