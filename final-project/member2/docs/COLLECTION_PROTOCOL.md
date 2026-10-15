# Quy trình thu dữ liệu thật — dành cho giai đoạn tiếp theo

**Quy trình này chưa được thực hiện trong bộ kết quả hiện tại.** Các file SIM01–SIM04 là mô phỏng, không có người tham gia thật. Tài liệu này bàn giao quy trình để nhóm có thể thu dữ liệu thật sau này.

## Chuẩn bị và đồng thuận

1. Giải thích mục tiêu nghiên cứu, dữ liệu thời gian gõ/nhóm phím/thiết bị được thu, nơi lưu, người được truy cập và cách rút dữ liệu. Không thu mật khẩu hoặc nội dung nhạy cảm.
2. Người tham gia tự nguyện, có thể dừng bất kỳ lúc nào. Ô đánh dấu đồng thuận trong công cụ thu không thay thế việc cung cấp đầy đủ thông tin nghiên cứu.
3. Gán P01–P04; giữ ánh xạ danh tính trong kho riêng, không đưa vào Git, báo cáo hoặc dữ liệu bàn giao. Phiếu đồng thuận tách khỏi dữ liệu phân tích.
4. Nhóm nghiên cứu giới hạn quyền truy cập cho bốn thành viên; không đăng tải công khai dữ liệu thật. Mặc định xóa dữ liệu thật và ánh xạ danh tính 30 ngày sau khi hoàn tất chấm điểm, trừ khi người tham gia đồng ý rõ ràng với thời hạn khác.

## Thu thử trên thiết bị thật

Mỗi người kiểm tra tương thích trong 1–2 phút bằng trình duyệt, bàn phím và bộ gõ quen thuộc; sau đó chạy phiên thử ít nhất 5 phút và 300 lần gõ hoàn chỉnh. Kiểm tra file có cặp down/up hợp lệ, mốc thời gian hợp lý, không chứa nội dung hoặc danh tính phím. Kiểm tra Telex/VNI thực tế; sự kiện bộ gõ tự động không chứng minh chất lượng trên mọi bộ gõ. Ghi cấu hình hệ điều hành/trình duyệt/bộ gõ trong nhật ký riêng nếu thông tin mô tả hiện tại chưa đủ. Dữ liệu thu thử không nhập vào tập chính.

## Thu chính thức

- Sáu phiên/người trong ba ngày, hai phiên/ngày, nghỉ ít nhất 30 phút giữa hai phiên.
- Giữ bàn phím, trình duyệt và bộ gõ ổn định. Gõ tiếng Việt tự nhiên về chủ đề thông thường, không cố gắng bắt chước người khác.
- Mục tiêu phân tích: ít nhất 1.000 lần gõ hoàn chỉnh và tám phút ghi/phiên. Công cụ thu hiển thị cả mục tiêu thu thử 300 phím/5 phút và mục tiêu chính thức 1.000 phím/8 phút. Không dùng thời gian tạm dừng để đạt mục tiêu ghi.
- Mỗi lần rời vùng nhập làm tạm dừng; tiếp tục phiên sẽ mở một đoạn mới. Không dán hoặc kéo văn bản.
- Kết thúc, tải JSON, kiểm tra có file rồi gửi qua kênh riêng của nhóm. Không coi việc bấm tải xuống là chứng minh file đã được lưu thành công.
- Người phụ trách cập nhật danh sách phiên thu: mã phiên, người, ngày, trạng thái nhận/kiểm tra, lý do thu lại. Giữ file ngắn để kiểm tra chất lượng; thay thế khi thiếu cửa sổ, không xóa có chọn lọc vì kết quả mô hình kém.

## Lưu trữ, chia tập và rút dữ liệu

Lưu file thật tại member2/data/real hoặc kho riêng đã hạn chế quyền truy cập. Không đổi `real` thành `synthetic` hoặc ngược lại. Gán ngày 1/2/3 làm tập huấn luyện/kiểm định/kiểm tra (`train`/`validation`/`test`) nếu đủ dữ liệu; không chia ngẫu nhiên cửa sổ để bù thiếu ngày. Ước lượng tham số chuẩn hóa trên tập huấn luyện (`train`), giữ nguyên khi áp dụng cho tập kiểm định/kiểm tra (`validation`/`test`).

Người tham gia có thể yêu cầu rút bằng mã người hoặc mã phiên qua người phụ trách thu. Khi rút, xóa dữ liệu thô, dữ liệu đã xử lý, bản sao chia sẻ và các tham số đã ước lượng liên quan; chạy lại bảng/biểu đồ trên danh sách phiên đã cập nhật. Báo cáo chỉ công bố thống kê tổng hợp và giới hạn dữ liệu.
