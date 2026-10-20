# Mục 4: Thiết kế thực nghiệm, đánh giá và phản biện khoa học

Người phụ trách: Võ Công Minh. Cập nhật lần cuối: 19/10/2026.

Thư mục này là bản sao để cả nhóm đọc và dùng khi ghép báo cáo. Bản gốc và mã nguồn nằm ở `final-project/member4`. Khi bản gốc thay đổi, Minh sẽ chép lại vào đây.

## Phạm vi cần lưu ý

- Mọi kết quả số trong thư mục này lấy từ lần chạy ngày 19/10 của member3 (`member3/artifacts/simulation-2026-10-19`) trên dữ liệu mô phỏng mới của member2. Dữ liệu là dữ liệu mô phỏng, không phải dữ liệu nhịp gõ của người thật.
- Nhóm đã quyết định không thu dữ liệu người thật vì không đủ thời gian. Báo cáo cần ghi rõ giới hạn này và không trình bày kết quả như bằng chứng trên người dùng thật.
- Các giả thuyết H1, H2, H3 chưa được kiểm chứng chính thức. Kết quả hiện có chỉ dùng để chẩn đoán thiết kế và chỉ ra điểm cần sửa.
- Các bản xuất AI-PACED-P01..P04 trong thư mục QA của member2 là dữ liệu do AI tạo, chỉ dùng kiểm công cụ, không trình bày như dữ liệu người thật.

## Tài liệu (documents)

- `QUY_TRINH_THUC_NGHIEM_VO_CONG_MINH.docx`: quy trình thực nghiệm, cách chia dữ liệu, chỉ số đánh giá và kiểm định thống kê.
- `DOI_CHIEU_MEMBER3_VO_CONG_MINH.docx`: đối chiếu kết quả cửa sổ cố định (FAR/FRR/EER) của member3 với bộ đánh giá độc lập của mục 4 (khớp 8/8 hàng, đã chạy lại trên lần chạy 19/10).
- `Bao_cao_MTH042_Nhom02_updated_Minh.docx`: bản sao báo cáo tổng hợp của member1 đã sửa sẵn theo bốn góp ý dưới đây (mục 5.2 ý 5, Bảng 13 thêm hai cột, nhận xét sau Bảng 15, mục 5.5, mục 6.3, link trong tài liệu tham khảo). Ngày 19/10 sửa thêm tên giảng viên ở trang bìa thành "TS. Phạm Thị Bạch Huệ" (bản gốc ghi "Bích Huệ"). Bản gốc trong member1 giữ nguyên.
- `GOP_Y_BAO_CAO_TONG_HOP_VO_CONG_MINH.docx`: góp ý bốn chỗ cần chỉnh trong báo cáo tổng hợp (mục 5.5, tỷ lệ phát hiện ở Bảng 13, mẫu số MFA/giờ, link trong tài liệu tham khảo).
- `DOI_CHIEU_REPLAY_MEMBER3_VO_CONG_MINH.docx`: đối chiếu độc lập replay chính sách (TTD, MFA/giờ, thu hồi nhầm) và đề xuất chốt định nghĩa TTD, MFA/giờ.
- `REVIEW_MA_MEMBER3_VO_CONG_MINH.docx`: nhận xét mã nguồn member3, gồm sáu điểm M1 đến M6 và các điểm nhỏ.
- `PHAN_TICH_CA_LOI_MO_PHONG_VO_CONG_MINH.docx`: phân tích các ca bỏ lọt, phát hiện muộn và thu hồi nhầm.

## Slide thuyết trình

Deck Slidev nằm ở `final-project/slides` (template DLP, 31 trang, khoảng 20 phút gồm demo, ghi chú người nói có trong từng trang). Cách chạy: `cd final-project/slides`, `pnpm install --frozen-lockfile`, rồi `pnpm dev` và mở http://localhost:3030. Vào `/presenter/` để xem ghi chú người nói.

## Tài liệu khoa học (literature)

- `NGHIEN_CUU_LIEN_QUAN_VA_DINH_HUONG_DANH_GIA.docx`: phần nghiên cứu liên quan và định hướng đánh giá.
- `TOM_TAT_3_TAI_LIEU_VO_CONG_MINH.docx`: tóm tắt ba bài báo theo năm ý trong bảng phân công.

Ba bài báo đã dùng:

1. G. Stragapede và cộng sự (2025), KVC-onGoing, Pattern Recognition 161, 111287. https://doi.org/10.1016/j.patcog.2024.111287
2. Ayeswarya S. và John Singh K. (2025), Scientific Reports 15, 30627. https://doi.org/10.1038/s41598-025-14833-z
3. S. A. S. Hussien và cộng sự (2026), Journal of Al-Qadisiyah for Computer Science and Mathematics 18(1). https://doi.org/10.29304/jqcsm.2026.18.12651

## Kết quả (results)

- `fixed-window`: kết quả chấm cửa sổ cố định theo từng người dùng (`per-user.csv`), bảng tổng hợp (`macro-summary.csv`) và đường ROC (`roc.svg`).
- `replay`: kết quả chạy lại chính sách độc lập. `replay-reconciliation.json` ghi trạng thái khớp và mã băm SHA256 đầu vào; hai file CSV là chỉ số theo tài khoản và chỉ số trung bình tính lại.
- `failure-analysis`: các bảng CSV dùng cho tài liệu phân tích ca lỗi. `summary.json` ghi mã băm SHA256 của dữ liệu đầu vào để kiểm tra tái lập.

Cách chạy lại, từ thư mục `final-project/member4`:

```
node src/member3-replay.mjs --evaluation ../member3/artifacts/simulation-2026-10-19/evaluation --model ../member3/artifacts/simulation-2026-10-19/fit/model.json --output <thư mục trống>
node scripts/analyze-member3-failures.mjs --input ../member3/artifacts/simulation-2026-10-19/evaluation --output <thư mục trống>
```

## Kết quả đối chiếu ngày 19/10

- Replay chính sách khớp hoàn toàn với log của member3: 29.183 quyết định, 7.600 sự kiện, 3.520 kết cục kịch bản, 32 hàng theo tài khoản và 8 hàng trung bình. Bộ handoff của member3 cũng khớp.
- Không cấu hình nào đạt ràng buộc chọn trên validation, nên báo cáo trình bày như kết quả chẩn đoán, không chọn "cấu hình thắng".
- Trên test, P1 với isolation forest có tỷ lệ phát hiện cao nhất theo cách tính của member3 (75,5%) và trong 150 phím đầu (51,9%), nhưng 72/432 kịch bản bị thu hồi nhầm trước tiếp quản và bị loại khỏi mẫu số. Tính trên toàn bộ kịch bản, P1 chỉ còn 61,3%, thấp hơn B1 (62,7%). Xem mục 5 và 6 của tài liệu đối chiếu replay.

## Các điểm review mã member3 (M1 đến M6)

Member3 đã xử lý trong bản cập nhật 19/10: M1 (ghi horizon thực tế 275/276 phím), M2 (giải thích TTD rời rạc), M3 (thêm cột đếm số prefix riêng), M4 (thêm cột thu hồi khi chưa qua MFA), M6 (thêm bảng số yêu cầu MFA và thời lượng). M5 (người lạ dùng chung giữa validation và test) được ghi là giới hạn về khả năng khái quát.

## Việc còn chờ nhóm thống nhất

- Định nghĩa TTD và MFA/giờ: đã có đề xuất ở mục 6 của `DOI_CHIEU_REPLAY_MEMBER3_VO_CONG_MINH.docx`, nếu không ai góp ý khác thì dùng thống nhất.
- Cách tính FAR theo chính sách cho câu hỏi nghiên cứu RQ2.
- Hướng P2 (cập nhật hồ sơ sau xác thực lại) chưa được triển khai.

Số phiên validation đã thống nhất: member2 đổi thiết kế thu thật thành năm phiên mỗi người (hai train, hai validation, một test), khớp với cách chọn ngưỡng của member3.