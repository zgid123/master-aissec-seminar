# Speaker Notes — Section 4

## Timing

Target: 7–7.5 minutes, gồm limitations, hardening và conclusion.

## Slide 1 — Giới hạn và kết luận

> Section 3 đã xây dựng được đường đi từ verified role đến masked output. Phần này kiểm tra kết quả, sau đó đánh giá điều demo đã chứng minh và điều nó chưa thể bảo đảm.

## Slide 2 — Demo chứng minh behavior, chưa chứng minh security

> Demo chứng minh masking rule hoạt động, output thay đổi theo role và dữ liệu gốc không bị sửa. Nó chưa chứng minh role luôn đáng tin, raw data không thể truy cập hay untrusted SQL đã được cô lập.

## Slide 3 — Trust boundary

> Ranh giới bảo mật trải từ identity, Node.js API, DuckDB đến file và hệ điều hành. DuckDB thực thi SQL bằng quyền của process, vì vậy macro hoặc view không tự ngăn được một đường truy cập khác.

## Slide 4 — Ba đường bypass

> Raw table bỏ qua macro; raw file cho phép mở database bằng process khác; arbitrary SQL có thể đọc dữ liệu hoặc file ngoài dự kiến. Masking chỉ bảo vệ intended path, nên các đường song song phải bị loại bỏ hoặc sandbox.

## Slide 5 — Inference attack và performance overhead

> Masking salary ở output vẫn có thể bị suy diễn nếu role restricted được thử các điều kiện WHERE trên salary. Đồng thời masking chạy ở query time nên chi phí tăng theo số hàng và độ phức tạp của hàm. Policy phải hạn chế phép toán trên cột nhạy cảm; query phải lọc và giới hạn trước rồi kiểm tra bằng EXPLAIN ANALYZE.

## Slide 6 — Limitation và control

> Mỗi giới hạn cần một lớp kiểm soát tương ứng: verified identity cho role giả mạo, OS permission và encryption cho raw file, fixed query hoặc sandbox cho arbitrary SQL, logging và monitoring cho hành vi lạm dụng.

## Slide 7 — Application phải kiểm soát access path

> Cách tiếp cận này phù hợp khi backend đáng tin cậy kiểm soát file, query và role. Nó không đủ nếu phát file cho user, cho chạy SQL tùy ý hoặc cần isolation mạnh giữa nhiều tenant.

## Slide 8 — Production hardening

> Hardening phải diễn ra ở ba lớp. Application xác thực và dùng prepared query; DuckDB runtime giới hạn external access và extension; OS bảo vệ file, khóa mã hóa, audit và cô lập process.

## Slide 9 — Kết luận

> DuckDB có thể tạo Dynamic Data Masking behavior bằng SQL, macro và verified access context. Tuy nhiên application mới là nơi enforce ai được xem gì. Câu chốt: masking logic trả lời “che như thế nào”; Access Control trả lời “ai được xem gì”.

## Backup Q&A

- **Macro hoặc view có phải security boundary không?** Không nếu user còn raw table, raw file hoặc arbitrary SQL.
- **Prepared statement có bảo vệ khi user tự gửi cả query không?** Không. Prepared statement chỉ bảo vệ value khi application kiểm soát query structure.
- **DuckDB có thể harden external access không?** Có các setting giới hạn file system, extension và configuration; nhưng tài liệu vẫn khuyến nghị sandbox cho untrusted SQL.
- **Masking có thay encryption không?** Không. Encryption bảo vệ dữ liệu lưu trữ; masking kiểm soát output sau khi dữ liệu được đọc.

[Sources]
- https://duckdb.org/docs/current/operations_manual/securing_duckdb/overview
- https://duckdb.org/2025/11/19/encryption-in-duckdb
[/Sources]
