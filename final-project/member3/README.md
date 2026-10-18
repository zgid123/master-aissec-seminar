<div align="center">

# Thành viên 3 — Mô hình và tích lũy rủi ro

Xác thực liên tục dựa trên nhịp gõ phím · Nhóm 02 · MTH042

[Chạy thử](#chạy-thử) · [Phương pháp](docs/PHUONG_PHAP.md) · [Bàn giao](docs/HANDOFF.md) · [Kết quả mô phỏng](artifacts/simulation-reviewed/evaluation/report.md)

</div>

Phần này nhận đặc trưng từ thành viên 2, tính điểm bất thường và ra quyết định bằng B0/B1/P1. Mã dùng TypeScript và chạy trực tiếp bằng Node.js 24, không có thư viện chạy ngoài Node. TypeScript compiler và kiểu Node chỉ phục vụ kiểm tra lúc phát triển.

**Dữ liệu đi kèm là mô phỏng. Kết quả chạy hiện tại không chứng minh hiệu quả trên người thật và chưa xác nhận các giả thuyết của đề tài.**

Bản đã xử lý review dùng kết quả trong `artifacts/simulation-reviewed` và model schema 1.1. Xem [những gì đã sửa và kiểm tra](docs/XU_LY_REVIEW.md). `artifacts/simulation` giữ lần chạy trước để đối chiếu, không dùng bundle cũ để evaluate bằng mã mới.

## Những gì đã có

| Thành phần | Cách thực hiện |
|---|---|
| Bộ tạo điểm thứ nhất | Khoảng cách L1 trung bình tới tâm median của dữ liệu train đã chuẩn hóa |
| Bộ tạo điểm thứ hai | Isolation Forest có seed cố định, lưu được toàn bộ cây |
| Hiệu chỉnh điểm | Median/MAD từ phiên validation riêng, ngoài train |
| B0 | Xét từng cửa sổ, ngưỡng chung |
| B1 | CUSUM có hệ số quên, ngưỡng chung |
| P1 | Như B1, nhưng chọn ngưỡng theo người; giữ lambda/k của B1 |
| B1_lambda1 | Bỏ hệ số quên; chọn lại k/h trên validation |
| Thử nghiệm | G0 chính chủ; A1 ghép dữ liệu hai người ở mức lần gõ rồi tính lại đặc trưng |
| Đầu ra | Mô hình đã khóa, bảng tìm tham số, điểm từng cửa sổ, log trạng thái và kết quả đánh giá |
| Tích hợp | `RiskEngine` nhận cửa sổ thật; `observe()` và `resolveMfa()` không nhận nhãn người thật/người lạ |

P2, One-Class SVM và ngưỡng phụ thuộc ngữ cảnh/độ dài phiên chưa nằm trong bản này. Không mô tả những phần đó là đã triển khai trong báo cáo.

## Chạy thử

Mở terminal tại `final-project/member3`. Kiểm tra `node --version`: cần Node.js 24 trở lên.

```powershell
node --test tests/*.test.ts
node src/cli.ts verify
node src/cli.ts reproduce --out artifacts/my-first-run
```

Không cần cài thư viện để chạy ba lệnh trên. Thư mục đầu ra phải mới hoặc rỗng. Mặc định chương trình đọc `../member2/artifacts/processed`, dữ liệu thô và manifest trong `../member2/artifacts`.

Kiểm tra kiểu TypeScript:

```powershell
npm ci --ignore-scripts
npm run typecheck
```

Lệnh `reproduce` chạy hai bước độc lập: chọn cấu hình bằng train/validation, sau đó dùng mô hình đã khóa để đánh giá test. Có thể tách hai bước như sau:

```powershell
node src/cli.ts fit --out artifacts/my-fit
node src/cli.ts evaluate --model artifacts/my-fit/model.json --out artifacts/my-test
```

Khi dùng dữ liệu khác, truyền cùng bộ đường dẫn cho cả hai bước:

```powershell
node src/cli.ts fit --data ../member2/private/processed --raw-root ../member2/private --manifest ../member2/private/manifest.json --config config.json --out private/my-fit
node src/cli.ts evaluate --data ../member2/private/processed --raw-root ../member2/private --manifest ../member2/private/manifest.json --model private/my-fit/model.json --out private/my-test
```

Đầu vào phải có `run.json` do pipeline thành viên 2 tạo. Chương trình đối chiếu hash dữ liệu thô, manifest và bốn file xử lý với bản ghi này; kiểm tra lại normalizer từ train. Nếu đầu vào hoặc mã nguồn thay đổi sau fit, cần tạo lần fit mới. Chức năng kiểm tra không xác minh sự đồng thuận hay biến dữ liệu gắn nhãn `real` thành bằng chứng đã thu từ người thật.

## Đọc sản phẩm theo thứ tự

1. [PHUONG_PHAP.md](docs/PHUONG_PHAP.md): công thức, cách chọn tham số, giả định và phạm vi kết luận.
2. [HANDOFF.md](docs/HANDOFF.md): cách nối với phần dữ liệu, hệ thống và đánh giá.
3. [BAO_CAO_PHAN_3.md](docs/BAO_CAO_PHAN_3.md): bản thảo nội dung có thể ghép vào báo cáo chung.
4. [NGUON_THAM_KHAO.md](docs/NGUON_THAM_KHAO.md): nguồn cơ sở và mức kế thừa.
5. [report.md](artifacts/simulation-reviewed/evaluation/report.md): kết quả mô phỏng sau xử lý review.
6. [VERIFICATION.md](VERIFICATION.md): kiểm tra kỹ thuật và giới hạn kiểm chứng.

## Cấu trúc

```text
member3/
  src/                 Mô hình, chính sách, mô phỏng, đánh giá và CLI
  tests/               Kiểm thử công thức, rò rỉ dữ liệu và tích hợp
  docs/                Phương pháp, nội dung báo cáo và hợp đồng bàn giao
  artifacts/simulation-reviewed/
    fit/               model.json, bảng tìm tham số, phân hoạch validation
    evaluation/        Log, các bảng kết quả và report.md
  artifacts/simulation/  Lần chạy trước review, giữ để đối chiếu
  config.json          Thiết kế chạy mặc định cho bộ mô phỏng
  package-lock.json    Khóa phiên bản công cụ kiểm tra kiểu
```

Thay đổi của phần này nằm trong `member3`; bộ bàn giao của Phong được giữ nguyên. Trước thực nghiệm người thật, cả nhóm cần thống nhất những lựa chọn được ghi trong tài liệu bàn giao, đặc biệt FAR ở mức phiên, cách ghép A1 và cách giải quyết MFA.
