# Ba tài liệu khoa học — Thành viên 2

Ba tài liệu phục vụ biểu diễn thời gian gõ, lựa chọn cửa sổ và giới hạn mô phỏng. Không dùng số liệu của tác giả làm kết quả của nhóm.

## 1. Killourhy và Maxion (2009)

**Comparing Anomaly-Detection Algorithms for Keystroke Dynamics**, IEEE/IFIP DSN 2009. [Bản tác giả](https://www.cs.cmu.edu/~ksk/KillourhyMaxion2009.pdf).

- Bài toán: so sánh mô hình phát hiện khi các nghiên cứu trước dùng điều kiện khác nhau.
- Phương pháp: cùng dữ liệu và quy trình cho 14 mô hình phát hiện; đặc trưng thời gian giữ phím, khoảng nhấn–nhấn và nhả–nhấn.
- Dữ liệu/đánh giá: 51 người, 400 lần nhập mật khẩu/người, tám phiên; đánh giá bằng EER.
- Kế thừa: định nghĩa timing rõ ràng, kiểm tra timestamp, giữ điều kiện so sánh thống nhất.
- Giới hạn áp dụng: mật khẩu cố định trên thiết bị kiểm soát; không chứng minh hiệu quả với tiếng Việt tự do trong trình duyệt.

## 2. Ayotte, Banavar, Hou và Schuckers (2020)

**Fast Free-text Authentication via Instance-based Keystroke Dynamics**. [Bản tác giả đầy đủ](https://arxiv.org/html/2006.09337v1), [thông tin công bố](https://arxiv.org/abs/2006.09337).

- Bài toán: xác thực khi gõ văn bản tự do với ít lần gõ hơn.
- Phương pháp: ITAD dùng phân vị thực nghiệm; kết hợp điểm cho từng ký tự/cặp ký tự và nghiên cứu tầm quan trọng đặc trưng.
- Dữ liệu/đánh giá: Clarkson II và Buffalo; DET, EER, ảnh hưởng kích thước mẫu/hồ sơ và số hành động trước quyết định.
- Kế thừa: khảo sát nhiều kích thước cửa sổ; phân biệt thời gian giữ phím và các định nghĩa khoảng thời gian giữa phím; đánh giá sự đánh đổi số phím/thời gian quyết định.
- Giới hạn áp dụng: cần danh tính ký tự để lập đồ thị; công cụ thu của nhóm chỉ giữ nhóm phím. Không chuyển trực tiếp kết quả ITAD sang 12 đặc trưng tổng hợp của nhóm.

## 3. Dillon và Arushi (2025)

**An Agent-Based Modeling Approach to Free-Text Keyboard Dynamics for Continuous Authentication**, bản thảo arXiv v1. [Bản đầy đủ](https://arxiv.org/pdf/2505.05015), [metadata](https://arxiv.org/abs/2505.05015).

- Bài toán: tạo dữ liệu mô phỏng để khảo sát xác thực khi thiếu dữ liệu phù hợp.
- Phương pháp: năm tác tử, hai loại bàn phím; thời gian giữ phím, khoảng nhả–nhấn và sửa lỗi; cửa sổ năm giây, bước một giây; OC-SVM và Random Forest.
- Dữ liệu/đánh giá: dữ liệu tổng hợp; so sánh cùng/khác tác tử và bàn phím, phân phối đặc trưng và kết quả mô hình.
- Kế thừa: công khai tham số sinh, phân biệt bằng chứng mô phỏng với quan sát thật.
- Giới hạn áp dụng: các kết luận phụ thuộc giả định sinh; không phải xác nhận hành vi người thật. Nhóm dùng cửa sổ theo số phím và mô hình sinh riêng, không tái hiện bài này.

## Quyết định của gói Member 2

Giữ thời gian giữ phím (dwell), khoảng nhả–nhấn (UD-flight) và nhấn–nhấn (DD), thống kê trung vị/IQR/MAD, tốc độ phím vật lý, tỷ lệ nghỉ và sửa lỗi. Công thức và thứ tự cột nằm trong DATA_DICTIONARY.md. Trung vị/MAD, ngưỡng nghỉ 2.000 ms và mặc định 50 phím là lựa chọn theo phân công/cấu hình của nhóm; không gán cho ba bài trên hoặc tuyên bố đã được tối ưu thực nghiệm.

