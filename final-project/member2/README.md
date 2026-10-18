# Thành viên 2 — Demo và báo cáo

- Báo cáo: [PDF](artifacts/processed/report.vi.pdf), [HTML](artifacts/processed/report.vi.html), [Markdown](artifacts/processed/report.md).
- `collector/`: mã nguồn công cụ thu và kiểm thử.
- `pipeline/`: mã nguồn sinh dữ liệu, xử lý, tính đặc trưng, biểu đồ, mẫu báo cáo và kiểm thử.
- `artifacts/raw/`, `artifacts/manifest.json`, `artifacts/config.json`: dữ liệu mô phỏng đầu vào.
- `artifacts/processed/`: bảng kết quả, tham số chuẩn hóa, hình và báo cáo.
- `data/qa/`: bốn file xuất AI-PACED cùng kết quả và audit được trích dẫn trong các mục 7.1–10 của báo cáo; không nằm trong manifest nghiên cứu.
- `docs/`: từ điển dữ liệu, thiết kế mô phỏng, quy trình thu và tổng quan tài liệu dùng cho báo cáo.

**Bộ dữ liệu phân tích hoàn toàn mô phỏng.** Các lượt QA do AI vận hành, không phải dữ liệu hay đồng thuận của người tham gia thật.

## Tái lập báo cáo

Cần Node.js 22 trở lên và pnpm 12.11.2. Từ `pipeline/`:

```bash
pnpm install --frozen-lockfile
pnpm run build
pnpm exec playwright install chromium
pnpm run reproduce --config config.json --output ../artifacts-reproduced
pnpm run export:pdf ../artifacts-reproduced/processed/report.vi.html ../artifacts-reproduced/processed/report.vi.pdf
```

Thư mục đầu ra phải chưa tồn tại hoặc rỗng. Kiểm tra bộ hiện tại bằng `pnpm run verify:reproducibility ../artifacts`; lệnh này so sánh mọi file trừ PDF và byte `run.json`, đồng thời so sánh summary, mã băm đầu vào và mã băm nguồn riêng. Chạy kiểm thử pipeline bằng `pnpm test`.

Chạy công cụ thu từ `collector/`: `pnpm install --frozen-lockfile`, sau đó `pnpm start`. Xem [collector/README.md](collector/README.md).

## Demo

Xem [hướng dẫn demo](docs/LIVE_DEMO.md) và [hướng dẫn bàn giao dữ liệu](docs/HANDOFF.md). Từ thư mục `member2`:

```bash
make setup
make run
```

`make check` chạy toàn bộ kiểm tra rồi tắt máy chủ; `make run` giữ công cụ thu mở để demo. Dùng `make run PORT=4180` để đổi cổng, `make help` để xem lệnh và Ctrl+C để dừng. `make setup-linux` cài thêm thư viện hệ thống cho Chromium khi cần.
