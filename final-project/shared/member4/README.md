# Mục 4: Thiết kế thực nghiệm, đánh giá và phản biện khoa học

Người phụ trách: Võ Công Minh. Cập nhật lần cuối: 18/10/2026.

Thư mục này là bản sao để cả nhóm đọc và dùng khi ghép báo cáo. Bản gốc và mã nguồn nằm ở `final-project/member4`. Khi bản gốc thay đổi, Minh sẽ chép lại vào đây.

## Phạm vi cần lưu ý

- Mọi kết quả số trong thư mục này lấy từ lần chạy mô phỏng lịch sử của member3 (`member3/artifacts/simulation-reviewed`). Dữ liệu là dữ liệu mô phỏng, không phải dữ liệu nhịp gõ của người thật.
- Nhóm đã quyết định không thu dữ liệu người thật vì không đủ thời gian. Báo cáo cần ghi rõ giới hạn này và không trình bày kết quả như bằng chứng trên người dùng thật.
- Các giả thuyết H1, H2, H3 chưa được kiểm chứng chính thức. Kết quả hiện có chỉ dùng để chẩn đoán thiết kế và chỉ ra điểm cần sửa.
- Receipt dữ liệu hiện tại của member2 không còn khớp với lần chạy lịch sử của member3, nên chưa ghép hai phần này thành một kết quả cuối.

## Tài liệu (documents)

- `QUY_TRINH_THUC_NGHIEM_VO_CONG_MINH.docx`: quy trình thực nghiệm, cách chia dữ liệu, chỉ số đánh giá và kiểm định thống kê.
- `DOI_CHIEU_MEMBER3_VO_CONG_MINH.docx`: đối chiếu kết quả của member3 với bộ đánh giá độc lập của mục 4 (khớp 8/8 hàng).
- `REVIEW_MA_MEMBER3_VO_CONG_MINH.docx`: nhận xét mã nguồn member3, gồm sáu điểm M1 đến M6 và các điểm nhỏ.
- `PHAN_TICH_CA_LOI_MO_PHONG_VO_CONG_MINH.docx`: phân tích các ca bỏ lọt, phát hiện muộn và thu hồi nhầm.

## Tài liệu khoa học (literature)

- `NGHIEN_CUU_LIEN_QUAN_VA_DINH_HUONG_DANH_GIA.docx`: phần nghiên cứu liên quan và định hướng đánh giá.
- `TOM_TAT_3_TAI_LIEU_VO_CONG_MINH.docx`: tóm tắt ba bài báo theo năm ý trong bảng phân công.

Ba bài báo đã dùng:

1. G. Stragapede và cộng sự (2025), KVC-onGoing, Pattern Recognition 161, 111287. https://doi.org/10.1016/j.patcog.2024.111287
2. Ayeswarya S. và John Singh K. (2025), Scientific Reports 15, 30627. https://doi.org/10.1038/s41598-025-14833-z
3. S. A. S. Hussien và cộng sự (2026), Journal of Al-Qadisiyah for Computer Science and Mathematics 18(1). https://doi.org/10.29304/jqcsm.2026.18.12651

## Kết quả (results)

- `fixed-window`: kết quả chấm cửa sổ cố định theo từng người dùng (`per-user.csv`), bảng tổng hợp (`macro-summary.csv`) và đường ROC (`roc.svg`).
- `failure-analysis`: các bảng CSV dùng cho tài liệu phân tích ca lỗi. `summary.json` ghi mã băm SHA256 của dữ liệu đầu vào để kiểm tra tái lập.

Cách chạy lại phân tích ca lỗi, từ thư mục `final-project/member4`:

```
node scripts/analyze-member3-failures.mjs --input ../member3/artifacts/simulation-reviewed/evaluation --output <thư mục trống>
```

## Phát hiện chính cần nhóm xem

- M1: kịch bản khai báo 300 phím người lạ nhưng thực tế chỉ chấm được tối đa 275 hoặc 276 phím, vì 25 phím cuối không đủ một cửa sổ.
- M2: thời gian phát hiện chỉ nhận các giá trị 25, 75, 125, 175, 225, 275 phím, nên ràng buộc 150 phím thực chất là 125 phím.
- M3: một lần thu hồi xảy ra trước khi người lạ tiếp quản bị đếm lặp 18 lần, làm số liệu tấn công bị lệch.
- M4: có 13 lượt thu hồi nhầm chính chủ, trong đó 4 lượt xảy ra khi chưa có bước MFA nào trước đó.
- M5: người lạ dùng để chọn ngưỡng trùng với người lạ trong tập kiểm tra, nên kết quả có thể lạc quan.
- M6: mỗi tài khoản chỉ có khoảng 7 đến 15 phút dữ liệu chính chủ khi kiểm tra, nên một lần MFA đã tương đương 4 đến 8 lượt mỗi giờ.

## Việc còn chờ nhóm thống nhất

- Số phiên validation: thiết kế của member2 có 1 phiên, trong khi cách chọn ngưỡng của member3 cần ít nhất 2.
- Định nghĩa thời gian phát hiện (TTD) và mẫu số khi tính số lần MFA mỗi giờ.
- Cách tính FAR theo chính sách cho câu hỏi nghiên cứu RQ2.
- Hướng P2 (cập nhật hồ sơ sau xác thực lại) chưa được triển khai.
