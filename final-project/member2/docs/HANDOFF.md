# Bàn giao cho Thành viên 1 và 3

## Đầu vào và đầu ra

Đầu vào mặc định là `artifacts/processed/windows.csv` và `normalizers.json`. Đây là bộ dữ liệu chính thức duy nhất, được sinh bằng TypeScript 2.0. Mỗi hàng là một cửa sổ đầy đủ trong một phiên/đoạn đã kiểm tra. Lọc `window_size === 50`; các kích thước khác nhau dùng chung nguồn lần gõ nên không được gộp thành những mẫu độc lập.

Dùng cách chia tập đã gán theo phiên. Danh sách mặc định có tám phiên mỗi tập; không chia ngẫu nhiên các cửa sổ sang nhiều tập. Thành viên 4 phụ trách quy trình đánh giá cuối cùng trên người tham gia thật.

`normalized_windows.csv` dùng bộ chuẩn hóa huấn luyện của chính hồ sơ nguồn để phân tích mô tả. Khi chấm điểm cho một tài khoản đích, áp dụng bộ chuẩn hóa của tài khoản được khai báo cho mọi mẫu ứng viên:

```typescript
import {FEATURE_COLUMNS, transformWindows} from './dist/src/index.js';
import {readCsv, readJson} from './dist/src/io.js';
import type {Window, Normalizers} from './dist/src/types.js';

const windows = await readCsv<Window>('../artifacts/processed/windows.csv');
const parameters = await readJson<Normalizers>('../artifacts/processed/normalizers.json');
const target = 'SIM01';
const train = windows.filter(w => w.participant_id === target && w.split === 'train' && w.window_size === 50);
const candidates = windows.filter(w => w.split === 'test' && w.window_size === 50);
const active = parameters.profiles[`${target}:50`].active;
const inputs = FEATURE_COLUMNS.filter((_f, i) => active[i]);
const trainingRows = transformWindows(train, parameters, target);
const scoringRows = transformWindows(candidates, parameters, target);
const X_train = trainingRows.map(w => inputs.map(f => Number(w[f])));
const X_test = scoringRows.map(w => inputs.map(f => Number(w[f])));
// Giữ mã và mốc thời gian của scoringRows bên cạnh dự đoán của mô hình.
```

Sau khi biên dịch, chạy `pnpm run handoff ../artifacts/processed SIM04` từ pipeline. Tài khoản đích mặc định là SIM01. Với bộ mặc định, mỗi tài khoản đích nhận 192 hàng kiểm tra × 12 cột trước khi loại chiều không hoạt động. Kết quả kiểm tra được tóm tắt trong `VERIFICATION.md`. Ví dụ này không cài đặt mô hình phát hiện bất thường hoặc đánh giá hiệu quả xác thực.

## Giao diện lập trình TypeScript

Sau `pnpm run build`, nhập từ `pipeline/dist/src/index.js`; các khai báo kiểu được sinh cùng JavaScript.

- `validateSession(data: unknown, split: Split): {strokes: Stroke[]; quality: QualityDetails}` kiểm tra cấu trúc phiên bản 1.0, báo Error khi cấu trúc sai và loại cặp không hợp lệ kèm số lượng theo lý do.
- `extractWindows(strokes, sizes = [20, 50, 100], pauseThreshold = 2000): {windows: Window[]; tails: Row[]}` tạo cửa sổ không chồng lấp; các kích thước phải là số nguyên khác nhau và ít nhất bằng 2.
- `fitNormalizers(windows): Normalizers` chỉ ước lượng trên train, riêng cho từng hồ sơ nguồn và kích thước; thiếu hồ sơ huấn luyện sẽ báo Error.
- `transformWindows(windows, parameters, claimedProfile?): Window[]` trả bản sao các hàng với đặc trưng đã chuẩn hóa và cột `claimed_profile`. Tài khoản đích không tồn tại hoặc danh sách đặc trưng không khớp sẽ báo Error.
- `FEATURE_COLUMNS` xác định đúng 12 đặc trưng và thứ tự. `processDataset(inputDir, manifestPath, config, output): Promise<Run>` cung cấp quy trình xử lý ngoại tuyến.

File thu thật giữ nguyên cấu trúc của công cụ thu. Phải gán tập rõ ràng trong danh sách phiên; chương trình không suy ra tập từ ngày tháng. Xử lý dữ liệu thật và mô phỏng riêng. Không tạo báo cáo mô phỏng cho dữ liệu thật.

## Thứ tự thời gian, riêng tư và nguồn gốc

Đây là bản tham chiếu xử lý ngoại tuyến. Các hàng được sắp theo phiên, đoạn đã kiểm tra và thứ tự nhấn phím. Cửa sổ cần đủ mọi lần nhả; end_ms là lần nhả muộn nhất. Bộ đệm trực tuyến, tích lũy rủi ro và đặt lại trạng thái khi gián đoạn thuộc Thành viên 1/3; khi tích hợp phải giữ nguyên ranh giới đoạn và công thức.

Giữ manifest.json, config.json, normalizers.json, run.json và quality_details.json cùng kết quả. participant_id chỉ nguồn của mẫu ứng viên; claimed_profile chỉ tài khoản đích. Các mã, tập, ngày tổng hợp, mốc thời gian và trường chẩn đoán không phải đầu vào mô hình. Giữ nhãn synthetic trong các báo cáo phía sau.

File trình duyệt P01–P04 là dữ liệu kiểm tra tự động được lưu tách biệt, dù công cụ xuất data_kind=real. Không trộn chúng với dữ liệu nghiên cứu hoặc dữ liệu người tham gia.

Bản bàn giao chứng minh tính tương thích. Việc đánh giá độc lập vẫn cần một thành viên thật đọc mã và xác nhận.
