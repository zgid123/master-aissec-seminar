# Quy trình thu dữ liệu thật — dành cho giai đoạn tiếp theo

**Quy trình này chưa được thực hiện trong bộ kết quả hiện tại.** Các file SIM01–SIM04 là mô phỏng, không có người tham gia thật. Tài liệu này bàn giao quy trình để nhóm có thể thu dữ liệu thật sau này.

## Chuẩn bị và đồng thuận

1. Giải thích mục tiêu nghiên cứu, dữ liệu thời gian gõ/nhóm phím/thiết bị được thu, nơi lưu, người được truy cập và cách rút dữ liệu. Không thu mật khẩu hoặc nội dung nhạy cảm.
2. Người tham gia tự nguyện, có thể dừng bất kỳ lúc nào. Ô đánh dấu đồng thuận trong công cụ thu không thay thế việc cung cấp đầy đủ thông tin nghiên cứu.
3. Gán P01–P20; giữ ánh xạ danh tính trong kho riêng, không đưa vào Git, báo cáo hoặc dữ liệu bàn giao. Phiếu đồng thuận tách khỏi dữ liệu phân tích.
4. Nhóm nghiên cứu giới hạn quyền truy cập cho bốn thành viên; không đăng tải công khai dữ liệu thật. Mặc định xóa dữ liệu thật và ánh xạ danh tính 30 ngày sau khi hoàn tất chấm điểm, trừ khi người tham gia đồng ý rõ ràng với thời hạn khác.

## Pilot thiết bị và công cụ

Bốn thành viên nhóm kiểm tra trên bàn phím, trình duyệt và bộ gõ thực tế trước khi mời người tham gia. Chạy các phiên `pilot` có mục tiêu 300 lần gõ hoàn chỉnh và 5 phút ghi chủ động. Kiểm tra file có cặp down/up hợp lệ, mốc thời gian hợp lý, không chứa nội dung hoặc danh tính phím. Kiểm tra Telex/VNI thực tế; sự kiện bộ gõ tự động không chứng minh chất lượng trên mọi bộ gõ. Ghi lỗi và cấu hình thiết bị/trình duyệt/bộ gõ để sửa trước khi đóng băng bản thu chính thức. Giữ pilot ngoài manifest phân tích chính thức; nếu cần xử lý để kiểm tra chất lượng, dùng đầu ra riêng và xác nhận pipeline không tạo đặc trưng hay normalizer từ phiên pilot.

## Thu chính thức

- 20 người tham gia, năm phiên/người trong ít nhất ba ngày: hai phiên train ngày 1, hai phiên validation ngày 2 và một phiên test ngày 3. Mục tiêu là 100 phiên chính thức. Hai phiên validation ngày 2 không được chồng lấp: phiên sau có thể bắt đầu đúng lúc phiên trước kết thúc, tính theo thời lượng tường gồm cả quãng tạm dừng; không yêu cầu thêm 30 phút nghỉ ở ngày 2.
- Nghỉ ít nhất 30 phút sau khi kết thúc phiên thứ nhất và trước khi bắt đầu phiên thứ hai trong ngày 1. Thời lượng tính theo thời gian tường của phiên, gồm cả các quãng tạm dừng; không dùng khoảng cách giữa hai thời điểm bắt đầu. Không chia cửa sổ của cùng phiên sang các tập khác nhau.
- Giữ bàn phím, trình duyệt và bộ gõ ổn định. Gõ tiếng Việt tự nhiên về chủ đề thông thường, không cố gắng bắt chước người khác.
- Mỗi phiên chính thức cần ít nhất 1.000 lần gõ hoàn chỉnh và tám phút ghi chủ động. Công cụ ghi `collection_mode`, mục tiêu và mức đạt được trong metadata; thời gian tạm dừng không tính vào thời lượng ghi.
- Mỗi lần rời vùng nhập làm tạm dừng; tiếp tục phiên sẽ mở một đoạn mới. Không dán hoặc kéo văn bản.
- Kết thúc, tải JSON, kiểm tra có file rồi gửi qua kênh riêng của nhóm. Không coi việc bấm tải xuống là chứng minh file đã được lưu thành công.
- Người phụ trách cập nhật bảng theo dõi phiên riêng: mã phiên, người, ngày, tập, trạng thái nhận/kiểm tra, lý do thu lại và xác nhận đạt hai mục tiêu phiên. Giữ cả phiên không đạt để có dấu vết chất lượng; chỉ lên lịch thu lại vì lỗi kỹ thuật hoặc không đạt quy trình, không dựa trên kết quả mô hình.
- Khi thu lại một phiên formal, thêm hàng mới với `supersedes_session_id` trỏ đến đúng phiên cũ cùng participant, study day và split. Mỗi phiên cũ chỉ có một phiên thay thế. Không xóa phiên cũ khỏi đầu vào; pipeline giữ nó trong bảng chất lượng nhưng không tính vào lịch active. Link sai hoặc mơ hồ làm phiên thay thế không được chấp nhận và lịch participant bị đánh dấu lỗi.

## Lưu trữ, chia tập và rút dữ liệu

Lưu file thật tại member2/data/real hoặc kho riêng đã hạn chế quyền truy cập. Không đổi `real` thành `synthetic` hoặc ngược lại. Gán `study_day` 1/2/3 cùng split tường minh trong manifest: hai phiên ngày 1 vào `train`, hai phiên ngày 2 vào `validation`, một phiên ngày 3 vào `test`. Ghi pilot và phiên không đạt vào đầu vào kiểm tra chất lượng nếu cần; pipeline giữ chúng trong bảng chất lượng nhưng loại chúng khỏi đặc trưng. Mỗi người cần đủ năm phiên active theo lịch, hai phiên ngày 1 có ít nhất 30 phút nghỉ tính từ lúc kết thúc phiên trước đến lúc bắt đầu phiên sau (thời lượng phiên gồm cả quãng tạm dừng), và thời điểm địa phương phải tăng theo ba ngày nghiên cứu. Phiên formal phải có ít nhất 1.000 lần gõ hợp lệ và 480 giây ghi chủ động. Không chia ngẫu nhiên cửa sổ để bù thiếu ngày. Với phần 3, sắp xếp hai session_id validation theo thứ tự từ điển; phiên đầu dùng hiệu chỉnh điểm, phiên sau dùng chọn ngưỡng/chính sách, theo partition đã lưu trong model. Ước lượng tham số chuẩn hóa trên tập huấn luyện (`train`), giữ nguyên khi áp dụng cho tập kiểm định/kiểm tra (`validation`/`test`). Nếu participant/kích thước không có eligible train windows, giữ raw feature windows để kiểm tra mô tả nhưng không xuất normalized windows cho khóa đó; xem `normalization_exclusions.csv`. Báo cáo HTML/PDF được tổng hợp không chứa mã người tham gia; các CSV theo từng người là dữ liệu nghiên cứu hạn chế truy cập.

Người tham gia có thể yêu cầu rút bằng mã người hoặc mã phiên qua người phụ trách thu. Khi rút, xóa dữ liệu thô, dữ liệu đã xử lý, bản sao chia sẻ và các tham số đã ước lượng liên quan; chạy lại bảng/biểu đồ trên danh sách phiên đã cập nhật. Báo cáo chỉ công bố thống kê tổng hợp và giới hạn dữ liệu.
