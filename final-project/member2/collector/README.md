# Công cụ thu nhịp gõ — Hono + React

Mã nguồn dùng TypeScript và TSX, được kiểm tra kiểu nghiêm ngặt. React quản lý biểu mẫu thu và trạng thái phiên. Hono phục vụ ứng dụng, tài nguyên đã đóng gói và `GET /api/health`. Công cụ chạy cục bộ trên Node.js.

## Chạy cục bộ

Yêu cầu Node.js 22 trở lên và pnpm 12.11.2. Nếu chưa có pnpm, chạy `corepack enable pnpm`.

```bash
cd master-aissec-seminar/final-project/member2/collector
pnpm install --frozen-lockfile
pnpm start
# Mở http://localhost:4173
```

File `pnpm-lock.yaml` khóa phiên bản thư viện; `pnpm-workspace.yaml` cấu hình [script cài đặt esbuild](https://pnpm.io/settings/build#allowbuilds) dùng cho biên dịch.

## Thu một phiên

1. Chọn loại phiên `Pilot` hoặc `Thu chính thức`, sau đó chọn mã người tham gia P01–P20, bàn phím, bộ gõ tiếng Việt và ngữ cảnh. Dùng nhất quán một mã giữa các phiên.
2. Đồng ý tham gia và bắt đầu. Gõ tiếng Việt tự do bằng bàn phím vật lý về chủ đề thông thường, không nhạy cảm.
3. Phiên pilot cần ít nhất 5 phút và 300 lần gõ hoàn chỉnh. Thu chính thức cần ít nhất 8 phút ghi và 1.000 lần gõ hoàn chỉnh mỗi phiên. Màn hình báo rõ từng mục tiêu chưa đạt; file vẫn tải được để kiểm tra chất lượng. Rời vùng nhập sẽ tạm dừng; bấm “Tiếp tục gõ” để mở đoạn mới.
4. Kết thúc và tải file JSON trước khi bắt đầu phiên tiếp theo. Gửi file cho nhóm qua kênh đã thống nhất.

Chạy pilot trên trình duyệt/bộ gõ thực tế trước khi thu chính thức. Kế hoạch là 20 người × bốn phiên trong ba ngày: hai phiên train ngày 1, một validation ngày 2, một test ngày 3; hai phiên ngày 1 cách nhau ít nhất 30 phút. Phiên pilot được đánh dấu trong metadata và phải để ngoài manifest nghiên cứu.

Nội dung văn bản chỉ nằm trong phần tử nhập của trang, ngoài trạng thái React và JSON xuất; nội dung được xóa khi kết thúc phiên. Danh tính phím vật lý chỉ tồn tại tạm thời để ghép nhấn–nhả. Thao tác dán/kéo văn bản bị chặn. Không có điểm nhận dữ liệu tải lên; bản ghi sự kiện nằm trong bộ nhớ trình duyệt đến khi được tải xuống.

## Định dạng xuất

Mỗi file JSON có bốn trường:

| Trường | Nội dung |
| --- | --- |
| `schema_version` | `1.0` |
| `data_kind` | `real` đối với phiên thu qua giao diện |
| `metadata` | Mã người/phiên, collection_mode, mục tiêu và trạng thái đạt, thời điểm bắt đầu, múi giờ, bàn phím, bộ gõ, ngữ cảnh, trình duyệt, nền tảng và sự đồng thuận |
| `events` | Thời gian tương đối bằng mili giây, loại sự kiện và các trường ghép cặp/nhóm/trạng thái bộ gõ nếu có |

Sự kiện `down` và `up` dùng chung `pair_id`, `group` (`typing`, `separator`, `correction`) và `composing`. Không xuất danh tính chữ hoặc nội dung đã nhập. Các sự kiện khác gồm bắt đầu/kết thúc phiên, ranh giới mất tiêu điểm/tiếp tục, bắt đầu/kết thúc trạng thái bộ gõ và chẩn đoán phím lặp, phím tắt hoặc cặp không hoàn chỉnh. Ranh giới xóa các phím đang chờ, ngăn ghép cặp xuyên gián đoạn.

Thời gian lấy từ đồng hồ đơn điệu của trình duyệt, không phải mốc phần cứng. Hành vi bộ gõ tiếng Việt khác nhau theo cấu hình; kiểm tra trạng thái bộ gõ tự động không thay thế phiên thử trên thiết bị thật. Lưu file người tham gia trong kho riêng và tách bảng ánh xạ danh tính sang mã người tham gia.

Bộ đếm thời gian ghi trên màn hình loại khoảng tạm dừng. Cuối phiên, phần tóm tắt hiện số lần gõ hoàn chỉnh, lần gõ thiếu bị xóa khi ngắt/dừng, số lần gián đoạn và thời lượng ghi. Cấu trúc xuất vẫn là phiên bản 1.0. Pipeline Thành viên 2 từ chối phiên pilot khỏi manifest nghiên cứu; dùng [quy trình ba ngày](../docs/COLLECTION_PROTOCOL.md) và [README của Thành viên 2](../README.md) khi xử lý phiên formal.

## Mã nguồn và biên dịch

```text
src/client/           Giao diện React và hàm quản lý phiên
src/shared/           Bộ ghi sự kiện bàn phím
src/server/           Định tuyến Hono và điểm vào xử lý yêu cầu
scripts/build.ts     Đóng gói giao diện, kiểu dáng và máy chủ
server/dev.ts        Bộ điều hợp Hono cho Node.js cục bộ
tests/                Kiểm thử bộ ghi, máy chủ và trình duyệt
```

`pnpm run typecheck` kiểm tra kiểu của mã nguồn, script và kiểm thử. `tsx` chạy các script TypeScript; esbuild biên dịch giao diện và máy chủ. `pnpm run build` kiểm tra kiểu rồi sinh `dist/server/index.js`. Mô-đun máy chủ nhúng mã React và CSS; địa chỉ tài nguyên có mã băm được lưu đệm, còn HTML và điểm kiểm tra hoạt động dùng `no-store`. Sửa `src/`, không sửa thư mục `dist/` được sinh tự động.

## Kiểm tra

```bash
pnpm test

# Kiểm tra nhanh bằng trình duyệt; giữ pnpm start chạy ở terminal khác.
pnpm exec playwright install --with-deps chromium
pnpm run test:browser
```

Kiểm tra trình duyệt gồm ghi sự kiện, cờ bộ gõ, tạm dừng/tiếp tục, tải JSON, riêng tư nội dung và bố cục trên điện thoại. Ảnh kiểm tra được sinh trong `.artifacts/browser-qa/` và không đưa vào Git. Gõ tự động chỉ phục vụ kiểm tra chức năng, không phải dữ liệu nghiên cứu của người tham gia.

`pnpm run test:four-profiles` tải mười hai phiên tự động P01–P04 vào thư mục mới `.artifacts/four-profiles-<timestamp>/`, không đưa vào Git. Từ pipeline, dùng `pnpm run verify:browser QA_DIRECTORY` để đưa các file này qua quy trình TypeScript, theo [README của Thành viên 2](../README.md). Công cụ giữ giá trị cấu trúc `data_kind: real`; QA_ONLY.txt và bản tóm tắt xác định mọi file là dữ liệu tự động, không có quan sát người thật. Không thêm các file đó vào danh sách phiên nghiên cứu.
