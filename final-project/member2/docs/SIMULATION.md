# Đặc tả mô phỏng — TypeScript 2.0

Mọi cấu hình đều là giả định minh họa, không phải tham số được ước lượng từ người thật. Mục đích là kiểm tra tiền xử lý thời gian và tích hợp dưới các biến động có thể tái lập. Tính “giống người” chỉ nói đến một số hiện tượng thời gian được đưa vào; trình sinh chưa được kiểm chứng như mô hình hành vi con người.

## Thiết kế

Bốn hồ sơ có phân phối chồng lấp × ba ngày nghiên cứu tổng hợp × hai phiên/ngày. Mỗi phiên gồm ba đoạn, mỗi đoạn 400 lần gõ hoàn chỉnh; ngay trước mỗi ranh giới trong hai lần gián đoạn có thêm một lần gõ cố ý thiếu nhả. Không có nội dung văn bản, danh tính phím, bản đồng thuận thật, thiết bị thật hoặc ngày thu thực tế.

Giá trị khởi tạo ngẫu nhiên chung: 42. Mỗi phiên dùng 16 byte đầu của SHA-256 trên `master:profile:day:session`, biểu diễn thành chuỗi thập lục phân 32 ký tự. Bốn từ 32 bit theo thứ tự byte lớn trước khởi tạo xoshiro128**. Luồng riêng cho hiệu ứng ngày dùng session bằng 0. Thuật toán chính xác được mô tả bên dưới.

Cấu hình số chính thức nằm trong [config.json](../pipeline/config.json), được sao chép vào simulation_settings của từng file thô và thư mục gốc dữ liệu. Giá trị mặc định:

| Hồ sơ | Trung vị giữ phím cơ sở (ms) | Trung vị khoảng nhấn–nhấn cơ sở (ms) | Xác suất sửa lỗi |
| --- | --- | --- | --- |
| SIM01 | 105 | 240 | 0.035 |
| SIM02 | 115 | 255 | 0.045 |
| SIM03 | 98 | 225 | 0.040 |
| SIM04 | 110 | 245 | 0.050 |

## Công thức

Hiệu ứng phiên: `b = Normal(0, 0.07) + (day−1) × Normal_day(0, 0.025)`. Hiệu ứng ngày được lấy mẫu độc lập cho từng hồ sơ/ngày, không phải bước đi ngẫu nhiên; hai phiên cùng ngày dùng chung hiệu ứng này. Ngày 1 có hiệu ứng ngày bằng 0. Không điều kiện nào dùng nhãn train/validation/test để điều chỉnh độ khó sinh dữ liệu.

Trạng thái nhịp gõ: `p_i = 0.92 × p_(i−1) + Normal(0, 0.04)`, khởi tạo bằng 0 và duy trì xuyên suốt phiên.

Khoảng nhấn–nhấn DD: `baseline_DD × exp(b + p_(i−1) + Normal(0, 0.42))`. Thời gian giữ phím: `baseline_dwell × exp(0.3 × (b+p_i) + Normal(0, 0.28))`. Hai tham số của Normal lần lượt là trung bình và độ lệch chuẩn. Công thức log-chuẩn tạo thời lượng dương. Với xác suất 2,5%, cộng thêm khoảng nghỉ lấy đều trong 2.000–6.000 ms. DD chỉ được xác định giữa các lần gõ trong cùng đoạn.

Xác suất sửa lỗi được nhân 2 ngay sau một lần sửa. Xác suất nhóm phân cách là 0,17; phần còn lại thuộc nhóm gõ thông thường. Nhãn nhóm là loại phím vật lý tổng hợp, không phải từ do chương trình sinh. Với xác suất 0,005, chèn sự kiện chẩn đoán repeat ở giữa thời gian giữ phím, không tạo lần gõ mới. Lúc nhả = `keydown + dwell`; sắp sự kiện theo thời gian, cho phép giữ phím chồng lấp và khoảng nhả–nhấn âm.

Khi gián đoạn, đoạn chờ mọi lần giữ hoàn chỉnh kết thúc, phát một sự kiện down không có up, rồi boundary sau 100 ms. Khoảng không hoạt động lấy đều trong 20.000–90.000 ms xảy ra trước resume. Mẫu mất nhả này cố ý kiểm tra việc loại cặp lỗi; không phải tỷ lệ lỗi người dùng/trình duyệt được ước lượng.

## Giới hạn của mô phỏng

Không sinh văn bản có nghĩa, chuyển tiếp giữa các chữ cụ thể, cặp ký tự phụ thuộc ngôn ngữ, thời gian phần cứng, hành vi bộ gõ tiếng Việt, sự chú ý, cơ chế mệt mỏi, bắt chước của kẻ tấn công, xâm nhập thiết bị hoặc độ trôi hồ sơ thực tế. Cờ composing luôn là false trong file nghiên cứu; các trường hợp riêng của bộ gõ nằm trong kiểm thử. Không bảo đảm độ chính xác của mô hình phát hiện. Mức giống hoặc khác giữa bốn hồ sơ là hệ quả của các giả định đã chọn.

Kiểm tra lần chạy mặc định trước khi dùng lại: phiên thật không nhất thiết có đúng 400 lần gõ/đoạn hoặc chia hết thuận lợi cho mọi kích thước cửa sổ. Xử lý đuôi ngắn, sự kiện lỗi và gián đoạn được kiểm thử độc lập. Mọi nhận định thực nghiệm từ gói này phải nói rõ dữ liệu là “mô phỏng”.

## Trình sinh TypeScript 2.0

Phiên bản: `2.0.0-xoshiro128ss-boxmuller`. SHA-256 của chuỗi UTF-8 `master:profile:day:session` cung cấp 16 byte đầu, được đọc thành bốn từ 32 bit không dấu theo thứ tự byte lớn trước cho xoshiro128**. Trạng thái toàn 0 được thay bằng [1,0,0,0]. Mỗi giá trị ngẫu nhiên đều bằng đầu ra 32 bit không dấu chia cho 2^32, thuộc [0,1). Lấy mẫu chuẩn dùng sqrt(-2 ln(1-u1)) cos(2πu2), tiêu thụ hai giá trị ngẫu nhiên đều mỗi lần, không lưu giá trị chuẩn thứ hai. Luồng hiệu ứng ngày riêng dùng session bằng 0. Trường seed là chuỗi thập lục phân 32 ký tự, không mất độ chính xác do kiểu số JavaScript. Mốc thời gian sự kiện được làm tròn đến sáu chữ số thập phân.

Cấu hình giữ các thành phần AR(1), thời gian log-chuẩn, hiệu ứng phiên/ngày, sửa lỗi theo cụm, khoảng nghỉ, mất nhả và repeat. Bộ dữ liệu TypeScript trong `artifacts/` là bộ duy nhất đi kèm gói.

Báo cáo và năm hình được sinh lại từ dữ liệu hiện tại. Biểu đồ dùng [kết xuất SVG phía máy chủ của Apache ECharts](https://echarts.apache.org/handbook/en/how-to/cross-platform/server/) và Playwright Chromium để xuất PNG; toàn bộ báo cáo có thể xuất thêm PDF. run.json ghi phiên bản Node.js/thư viện, mã băm của mã nguồn, mẫu báo cáo, file khóa thư viện, đầu vào và đầu ra. Thời điểm chạy và thông tin mô tả bên trong PDF có thể khác giữa các lần chạy.
