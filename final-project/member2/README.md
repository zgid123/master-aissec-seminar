# Thành viên 2 — Dữ liệu và đặc trưng nhịp gõ

Phần bàn giao cho đề tài **Xác thực liên tục thích ứng dựa trên nhịp gõ phím**: công cụ thu, dữ liệu, tiền xử lý, đặc trưng, chuẩn hóa và phân tích mô tả. Toàn bộ mã nguồn dùng TypeScript/TSX và chạy trên Node.js.

**Bộ dữ liệu hiện tại hoàn toàn mô phỏng.** SIM01–SIM04 không phải người tham gia thật. Không dùng kết quả này để khẳng định hiệu quả xác thực trên người thật.

## Sản phẩm cần dùng

| Sản phẩm | Vị trí |
| --- | --- |
| Công cụ thu sự kiện bàn phím | [Công cụ thu](collector/README.md) |
| 24 phiên thô, danh sách phiên và cấu hình | artifacts/raw/, artifacts/manifest.json, artifacts/config.json |
| Đặc trưng, chuẩn hóa và chất lượng | artifacts/processed/; xem [từ điển dữ liệu](docs/DATA_DICTIONARY.md) |
| Báo cáo | [Markdown](artifacts/processed/report.md), [HTML độc lập](artifacts/processed/report.vi.html), [PDF](artifacts/processed/report.vi.pdf) |
| Năm hình mô tả | artifacts/processed/figures/; PNG để xem và SVG để chỉnh sửa/chèn báo cáo |
| Quy trình thu thật | [COLLECTION_PROTOCOL.md](docs/COLLECTION_PROTOCOL.md) |
| Mô hình mô phỏng và giá trị khởi tạo ngẫu nhiên | [SIMULATION.md](docs/SIMULATION.md) |
| Tích hợp cho TV1/TV3 | [HANDOFF.md](docs/HANDOFF.md) |
| Ba tóm tắt tài liệu khoa học | [LITERATURE_REVIEW.md](docs/LITERATURE_REVIEW.md) |
| Kết quả kiểm tra hiện tại | [VERIFICATION.md](VERIFICATION.md) |

Chỉ có một bộ dữ liệu chính thức trong `artifacts/`: **24 phiên, 28.800 lần gõ hoàn chỉnh**, 48 cặp thiếu nhả cố ý sinh bị loại; 1.440/576/288 cửa sổ W=20/50/100. Ba ngày tổng hợp tương ứng tập huấn luyện/kiểm định/kiểm tra (`train`/`validation`/`test`), tám phiên mỗi tập. W=50 là mặc định bàn giao, không được chọn bằng tập kiểm tra.

## Cài, kiểm tra và tái lập

Để chuẩn bị và chạy demo trực tiếp, xem [hướng dẫn demo](docs/LIVE_DEMO.md). Từ thư mục `member2`, chạy:

```bash
make setup
make run
```

Cần GNU Make, Node.js **22.6 trở lên** và pnpm 12.11.2 (hoặc Corepack). `make setup` cài thư viện/Chromium và biên dịch hai gói; `make run` gọi script TypeScript để chạy toàn bộ kiểm tra rồi giữ công cụ thu mở. Dùng `make check` để kiểm tra rồi tự tắt, `make all` để làm cả cài đặt và chạy demo trong một lệnh. Đổi cổng bằng `PORT=4180`; xem các lệnh bằng `make help`. Linux thiếu thư viện Chromium dùng `make setup-linux`.

Yêu cầu Node.js 22 trở lên và pnpm 12.11.2 (được khóa trong packageManager). Nếu chưa có pnpm, chạy `corepack enable pnpm`. Từ `member2/pipeline`:

```bash
pnpm install --frozen-lockfile
pnpm run build
pnpm exec playwright install chromium
pnpm test
pnpm run handoff
pnpm run verify:reproducibility
```

Trên Linux tối giản, dùng `pnpm exec playwright install --with-deps chromium` nếu thiếu thư viện hệ thống. Chromium dùng để xuất PNG và PDF báo cáo; xử lý dữ liệu thật chỉ tạo bảng/JSON.

Sinh lại vào thư mục mới, không ghi đè bộ chính thức:

```bash
pnpm run reproduce --config config.json --output ../artifacts-reproduced
pnpm run export:pdf ../artifacts-reproduced/processed/report.vi.html ../artifacts-reproduced/processed/report.vi.pdf
```

Xử lý dữ liệu thô hiện có:

```bash
pnpm run process --config config.json --input ../artifacts \
  --manifest ../artifacts/manifest.json --output ../processed-again
```

Thư mục đầu ra phải chưa tồn tại hoặc rỗng. Mã thoát: 0 hoàn tất; 2 có file bị từ chối nhưng vẫn xuất phần hợp lệ; 1 lỗi không thể hoàn tất. Kiểm tra rejections.json và run.json. Không trộn dữ liệu thật (`real`) với dữ liệu mô phỏng (`synthetic`); dữ liệu thật nằm trong `data/real/` hoặc `private/`, ngoài Git.

Ví dụ bàn giao nhận tài khoản đích tùy chọn: `pnpm run handoff ../artifacts/processed SIM04`. Giữ participant_id và claimed_profile riêng, chỉ dùng các chiều đang hoạt động trong FEATURE_COLUMNS cho mô hình.

## Chạy công cụ thu và kiểm tra trình duyệt

Từ `member2/collector`:

```bash
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm test
pnpm start
```

Trong terminal khác, cùng thư mục:

```bash
pnpm run test:browser
pnpm run test:four-profiles
```

Lệnh cuối in đường dẫn `.artifacts/four-profiles-<timestamp>/`. Từ thư mục pipeline, đưa đúng đường dẫn đó vào `pnpm run verify:browser ../collector/.artifacts/four-profiles-<timestamp>`. Có thể đặt PORT cho máy chủ và BASE_URL cho các kiểm thử trình duyệt.

P01–P04 là dữ liệu kiểm tra tự động, không phải người tham gia thật. Nhãn `real` mặc định của công cụ thu chỉ là giá trị trong cấu trúc dữ liệu. Không thêm dữ liệu thô tự động vào danh sách phiên nghiên cứu; chỉ giữ bản tóm tắt kiểm tra trong docs/evidence/.

## Đóng gói và giới hạn

Từ thư mục pipeline, `pnpm run package:release` tạo `final-project/member2-final-simulation.zip` và `.sha256`. File ZIP gồm mã nguồn, kiểm thử, tài liệu và bộ dữ liệu duy nhất trong artifacts/; không chứa thư viện đã cài, đầu ra biên dịch, dữ liệu thô kiểm tra tự động hoặc dữ liệu riêng tư.

Công thức, giá trị khởi tạo ngẫu nhiên, file khóa phiên bản thư viện và thông tin nguồn gốc cho phép chạy lại. Thời điểm chạy và thông tin mô tả bên trong PDF có thể khác. Chưa có thu người thật, thử nghiệm sơ bộ trên thiết bị/bộ gõ thực hoặc đánh giá độc lập của TV3. Mô hình phát hiện, CUSUM, ngưỡng thích ứng và FAR/FRR/EER/TTD thuộc các thành viên khác.
