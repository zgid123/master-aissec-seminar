# Kiểm tra bàn giao — Thành viên 2

Kiểm tra lại ngày 15/10/2026 bằng Node.js 22: **28 kiểm thử quy trình xử lý và 9 kiểm thử công cụ thu đạt**, kiểm tra trình duyệt và gói giải nén sạch đạt; **52 file tái lập giống từng byte**. Hai gói dùng pnpm 12.11.2 và cài bằng file khóa cố định. Toàn bộ mã nguồn dùng TypeScript/TSX; kiểm tra kiểu nghiêm ngặt của công cụ thu đã đạt. Toàn bộ quy trình chạy được từ mã nguồn trong gói; công cụ thu cục bộ không cần cấu hình lưu trữ trực tuyến.

## Các kiểm tra

- Quy trình xử lý: công thức trung vị/IQR/MAD, phím chồng lấp, ghép cặp, mốc thời gian, ranh giới đoạn, phím lặp, nghỉ dài, đuôi cửa sổ, ước lượng chỉ trên tập huấn luyện, claimed_profile, MAD=0, cấu trúc dữ liệu, danh sách phiên, đường dẫn, mã thoát và chống ghi đè.
- Các trường hợp bổ sung: mã dạng chuỗi giữ nguyên khi đọc CSV, biểu đồ tần suất thời gian không đổi vẫn hữu hạn, và mất toàn bộ phiên kiểm định do từ chối file vẫn xuất phần hợp lệ.
- Công cụ thu: kiểm tra kiểu cho giao diện TSX, bộ ghi, máy chủ, script biên dịch và kiểm thử; kiểm tra bộ ghi, riêng tư và định tuyến máy chủ; kiểm tra nhanh bằng trình duyệt và đưa 12 phiên tự động P01–P04 qua quy trình xử lý.
- Tái lập: sinh lại dữ liệu thô, bảng, JSON, báo cáo, SVG/PNG và đối chiếu byte; bỏ thời điểm chạy và thông tin mô tả bên trong PDF.
- Bàn giao: cả bốn tài khoản đích SIM01–SIM04 nhận 192 hàng kiểm tra × 12 cột trước khi loại chiều không hoạt động.
- Bản đóng gói: kiểm tra mã băm, nội dung ZIP và chạy cả công cụ thu lẫn quy trình xử lý từ thư mục giải nén sạch.
- Demo trực tiếp: script chạy chung kiểm tra toàn bộ luồng, ghi nhật ký, xử lý tham số/cổng bận và tự tắt máy chủ trong chế độ kiểm tra.
- Makefile: `make setup` và `make check` đạt; `make all` chạy từ ZIP giải nén sạch, giữ máy chủ mở sau kiểm tra và tắt bằng Ctrl+C.

Kết quả, số kiểm thử, số liệu tổng hợp và mã băm PDF nằm trong [bản tổng hợp kiểm tra](docs/evidence/verification.json). Bằng chứng chi tiết: [kiểm tra nhanh bằng trình duyệt](docs/evidence/browser-smoke.json), [tích hợp trình duyệt](docs/evidence/browser-integration.json), [tái lập](docs/evidence/reproducibility.json).

Kết quả kiểm tra script demo nằm trong [bằng chứng demo](docs/evidence/live-demo.json).

## Chạy lại

Chạy toàn bộ kiểm tra phục vụ demo từ thư mục `member2`:

```bash
make setup
make check
```

Makefile cần GNU Make và Node.js 22.6 trở lên; gọi script TypeScript để cài/biên dịch hai gói bằng pnpm, kiểm tra trình duyệt và tích hợp, tái lập, bàn giao bốn tài khoản và xuất PDF. `make run` giữ máy chủ mở để demo sau khi kiểm tra đạt. Xem [hướng dẫn demo trực tiếp](docs/LIVE_DEMO.md) để trình bày và đọc nhật ký từng bước.

Từ thư mục pipeline, sau khi chạy pnpm install --frozen-lockfile, pnpm run build và cài Chromium:

```bash
pnpm test
pnpm run verify:reproducibility
pnpm run handoff
pnpm run package:release
```

Quy trình chạy công cụ thu và kiểm tra trình duyệt nằm trong README.md. run.json ghi mã băm của mã nguồn, cấu hình, đầu vào và đầu ra. PDF báo cáo được xuất sau quy trình xử lý nên mã băm nằm trong verification.json.

Kiểm tra trình duyệt hoàn toàn tự động và được lưu tách khỏi artifacts/. Không suy ra kết quả thu người thật, đánh giá độc lập hoặc hiệu quả mô hình phát hiện từ các kiểm tra kỹ thuật này.
