# Hướng dẫn kiểm tra và demo trực tiếp — Thành viên 2

Demo gồm công cụ thu nhịp gõ, xử lý dữ liệu, đặc trưng, chuẩn hóa, báo cáo và đầu vào bàn giao cho thành viên khác. Bộ dữ liệu `artifacts/` là mô phỏng; phần này chưa triển khai mô hình phát hiện, ngưỡng thích ứng hay FAR/FRR/EER/TTD.

## Chuẩn bị trước buổi trình bày

Cần Node.js 22.6 trở lên, GNU Make, pnpm 12.11.2 (hoặc Corepack để bật pnpm), trình duyệt và bàn phím vật lý. Khuyến nghị Node.js 22 LTS bản mới; dùng terminal Linux/macOS hoặc WSL trên Windows. Lần đầu cần mạng để tải thư viện và Chromium; chuẩn bị trước buổi trình bày. Nếu Linux chưa có Make, cài bằng trình quản lý gói hệ thống, ví dụ Debian/Ubuntu: `sudo apt-get install make`.

Mở terminal tại `final-project/member2`, chạy:

```bash
make setup
make check
```

`make setup` bật pnpm qua Corepack nếu chưa có, cài cả hai gói bằng file khóa, cài Chromium và biên dịch TypeScript. Lệnh này không mở máy chủ, không chạy kiểm thử và không cần cổng demo trống. `make check` chạy toàn bộ kiểm tra rồi tự tắt máy chủ.

Trên Linux tối giản, nếu Chromium thiếu thư viện hệ thống, thay `make setup` bằng lệnh sau (có thể cần quyền quản trị):

```bash
make setup-linux
```

Script dừng ngay khi một bước lỗi, trả mã thoát khác 0 và in đường dẫn nhật ký. Chỉ tiếp tục trình bày khi thấy **Tất cả kiểm tra đạt** và `result.json` có `result: "passed"`.

| Bước tự động | Điều cần đạt |
| --- | --- |
| Cài hai gói bằng pnpm | Dùng đúng file khóa; cài Chromium cho cả hai phiên bản Playwright |
| Kiểm thử quy trình xử lý | 28 kiểm thử đạt; biên dịch TypeScript đạt |
| Kiểm thử công cụ thu | 9 kiểm thử đạt; kiểm tra kiểu và biên dịch giao diện đạt |
| Mở máy chủ và kiểm tra sức khỏe | `/api/health` trả trạng thái `ok` |
| Kiểm tra trình duyệt | Thu phím, tạm dừng/tiếp tục, chặn dán, xuất JSON, riêng tư, giao diện di động |
| Thu tự động và xử lý | 4 hồ sơ × 3 phiên; 3.240 lần gõ hợp lệ; cửa sổ W=20/50/100: 156/48/24; loại 12 cặp thiếu nhả |
| Tái lập | 52 file trùng từng byte; đối chiếu nguồn và đầu vào; loại thời điểm chạy và thông tin mô tả PDF khỏi so sánh |
| Bàn giao | SIM01–SIM04 đều nhận ma trận 192 × 12 cho W=50 trước khi loại chiều không hoạt động |
| Xuất báo cáo | Tạo PDF mới từ báo cáo HTML, kiểm tra định dạng PDF |

Kết quả mỗi lần nằm trong `.artifacts/demo-<mã>/`: `result.json`, nhật ký từng bước, JSON kiểm tra trình duyệt/tái lập, bốn JSON bàn giao và PDF mới. Script in riêng đường dẫn 12 phiên QA trong `collector/.artifacts/`. Các thư mục này được bỏ qua trong Git và ZIP bàn giao; `artifacts/` chính thức được giữ nguyên.

## Chạy trong buổi demo

Sau khi bước chuẩn bị đã đạt trên cùng máy:

```bash
make run
```

Lệnh vẫn chạy đầy đủ kiểm tra nhưng bỏ tải thư viện và Chromium. Sau khi đạt, máy chủ tiếp tục chạy tại **http://localhost:4173**. Mở liên kết bằng trình duyệt trên máy này. Nhấn **Ctrl+C** ở terminal để tắt máy chủ.

Nếu cần cổng khác:

```bash
make run PORT=4180
```

Có thể cài đặt, kiểm tra và giữ máy chủ mở chỉ bằng `make all`. Dùng `make help` để xem các lệnh. `make check PORT=4180` cũng hỗ trợ đổi cổng. Các lệnh `run` và `check` yêu cầu đã chạy `setup` trên cùng máy.

Makefile gọi chung script TypeScript `collector/scripts/demo.ts`. Nếu muốn gọi script trực tiếp:

```bash
node --experimental-strip-types collector/scripts/demo.ts --setup-only
node --experimental-strip-types collector/scripts/demo.ts --skip-install
```

Các tùy chọn khác: `--check-only` để kiểm tra rồi tự tắt, `--with-deps` để cài thư viện hệ thống cho Chromium, `--port 4180` để đổi cổng, `--help` để xem cú pháp. Không kết hợp `--setup-only` với `--check-only`/`--skip-install`, hoặc `--with-deps` với `--skip-install`. Script tự xác định thư mục dự án; không cần thêm một script chạy riêng cho từng gói.

## Kịch bản trình bày khoảng 5–7 phút

1. **Giới thiệu phạm vi (30 giây):** mở `artifacts/processed/report.vi.html` bằng trình duyệt. Nêu rõ 24 phiên và 28.800 lần gõ là dữ liệu mô phỏng SIM01–SIM04; chỉ minh họa quy trình và đặc trưng.
2. **Thu một phiên ngắn (2 phút):** mở công cụ thu, chọn P01, bàn phím, bộ gõ và ngữ cảnh phù hợp; đọc và xác nhận đồng ý rồi chọn **Bắt đầu phiên**. Gõ câu thông thường, sửa bằng Backspace, thử dán, nhấp ra ngoài vùng gõ rồi chọn **Tiếp tục gõ**. Quan sát bộ đếm và trạng thái. Chọn **Kết thúc phiên**, xem cảnh báo phiên ngắn rồi **Tải file JSON**. Đây chỉ là minh họa thao tác, chưa đủ mục tiêu pilot 300 lần gõ và 5 phút.
3. **Kiểm tra file tải về (1 phút):** mở JSON cục bộ, chỉ ra metadata, sự kiện down/up, thời gian và mốc ngắt. Kiểm tra không có nội dung câu đã gõ hoặc tên phím; văn bản nhập được xóa khi kết thúc. File không tự gửi lên máy chủ. Giữ bản demo riêng, ngoài danh sách phiên nghiên cứu.
4. **Chứng minh xử lý xuyên suốt (1 phút):** mở `browser-integration.json` trong thư mục kết quả vừa in. Chỉ ra 12 phiên tự động, số lần gõ, cửa sổ, loại thiếu nhả và chuẩn hóa theo bốn tài khoản đích. Dữ liệu QA có nhãn cấu trúc `real` mặc định từ công cụ thu nhưng **không phải quan sát người tham gia**; không nhập vào `artifacts/manifest.json`.
5. **Báo cáo và bàn giao (1–2 phút):** xem các hình trong HTML, PDF mới và `handoff-SIM01.json`. Giải thích phân chia theo phiên/ngày, chỉ ước lượng chuẩn hóa trên tập huấn luyện và giữ riêng `participant_id` với `claimed_profile`. Mở `reproducibility.json` để xác nhận 52 file trùng nhau.

Nếu muốn đưa phiên tải bằng tay qua quy trình xử lý, làm theo [quy trình thu](COLLECTION_PROTOCOL.md), [từ điển dữ liệu](DATA_DICTIONARY.md) và [hướng dẫn bàn giao](HANDOFF.md): tạo thư mục riêng trong `data/real/` với danh sách phiên hợp lệ, rồi chạy `pnpm run process` từ `pipeline`. Script demo đã kiểm tra đường đi thu → xử lý bằng 12 phiên QA; không tự nhập file tải về của người trình bày.

## Khi gặp lỗi

| Hiện tượng | Cách xử lý |
| --- | --- |
| Không nhận `--experimental-strip-types` | Cập nhật Node.js lên 22.6 trở lên |
| Thiếu pnpm hoặc sai phiên bản | Chạy `corepack enable pnpm`; kiểm tra `pnpm --version` tại `collector` hoặc `pipeline` phải là 12.11.2 |
| Thiếu thư viện hoặc Chromium khi chạy | Chạy lại `make setup` |
| Chromium thiếu thư viện hệ thống trên Linux | Chạy `make setup-linux`; môi trường cần quyền cài gói hệ thống |
| Cổng đang bận | Dùng `make run PORT=4180` hoặc `make check PORT=4180`; script không tắt máy chủ khác |
| Kiểm thử trình duyệt quá thời gian | Xem nhật ký, đóng ứng dụng nặng rồi chạy lại; không bỏ qua bước lỗi để báo đạt |
| Tái lập không khớp | Xem nhật ký đối chiếu nguồn/đầu vào; dùng cùng bản mã nguồn và `artifacts/` đã bàn giao, không ghi đè dữ liệu để che lỗi |
| Không mở được liên kết báo cáo từ terminal | Mở file HTML trực tiếp trong trình duyệt hoặc mở PDF mới bằng trình đọc PDF |

Trước buổi trình bày, thử thêm bộ gõ thực trên máy dùng demo; kiểm thử tự động chỉ mô phỏng các sự kiện composition, chưa chứng minh hành vi của mọi bộ gõ/hệ điều hành. Không cần đóng gói ZIP hay thu người thật để chạy demo kỹ thuật này.
