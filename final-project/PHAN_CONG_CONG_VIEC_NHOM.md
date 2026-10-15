# PHÂN CÔNG CÔNG VIỆC NHÓM

## Đề tài

**Xác thực liên tục thích ứng dựa trên nhịp gõ phím**

## 1. Nguyên tắc làm việc

Nhóm có bốn thành viên và thời gian thực hiện còn khoảng hơn một tuần. Vì vậy, công việc được tổ chức thành các luồng chạy song song, không làm theo kiểu người trước hoàn thành toàn bộ rồi người sau mới bắt đầu.

Trong giai đoạn đầu, mỗi người có thể dùng dữ liệu giả, kết quả giả lập hoặc module tạm để xây dựng phần việc của mình. Khi các module thật hoàn thành, nhóm thay dần đầu vào giả bằng đầu vào thật và ghép thành hệ thống hoàn chỉnh.

Mỗi đầu việc phải có sản phẩm kiểm tra được, chẳng hạn như mã nguồn, bộ dữ liệu, bảng kết quả, biểu đồ, sơ đồ hoặc nội dung báo cáo. Hạn chế giao việc chung chung như “nghiên cứu thêm”, “hỗ trợ code” hoặc “làm slide”.

## 2. Phân công theo thành viên

### Thành viên 1 — Thiết kế nghiên cứu và tích hợp hệ thống

#### Công việc chính

- Viết phát biểu bài toán và xác định phạm vi nghiên cứu.
- Xây dựng mô hình đe dọa, bao gồm:
  - Đối tượng cần bảo vệ.
  - Năng lực của kẻ tấn công.
  - Tình huống kẻ tấn công tiếp quản một phiên đã đăng nhập.
  - Các giả định và giới hạn của hệ thống.
- Hoàn thiện câu hỏi nghiên cứu và giả thuyết cần kiểm chứng.
- Thiết kế kiến trúc tổng thể gồm:
  - Bộ thu nhận sự kiện bàn phím.
  - Bộ trích xuất đặc trưng.
  - Bộ tính điểm bất thường.
  - Bộ tích lũy rủi ro theo thời gian.
  - Thành phần yêu cầu xác thực lại.
- Thống nhất định dạng dữ liệu trao đổi giữa các module.
- Xây dựng bộ khung chương trình để các module có thể ghép với nhau.
- Trong thời gian chờ module thật, tạo dữ liệu hoặc kết quả giả để kiểm tra luồng hệ thống.
- Tích hợp module của thành viên 2 và thành viên 3.
- Ghi log điểm bất thường, điểm rủi ro và thời điểm phát cảnh báo.
- Xây dựng giao diện demo hoặc màn hình hiển thị kết quả đơn giản.
- Viết kiểm thử cho luồng tích hợp.
- Quản lý cấu trúc thư mục, phiên bản mã nguồn và cấu hình chạy thử.
- Viết các phần sau trong báo cáo:
  - Bối cảnh và lý do chọn đề tài.
  - Phát biểu bài toán.
  - Mô hình đe dọa.
  - Kiến trúc hệ thống.
  - Phạm vi và giới hạn nghiên cứu.
- Chuẩn bị sơ đồ kiến trúc và sơ đồ luồng xử lý cho slide.
- Tổng hợp tiến độ và kiểm tra tính thống nhất của sản phẩm cuối.

#### Sản phẩm phải bàn giao

- Tài liệu mô tả bài toán và mô hình đe dọa.
- Sơ đồ kiến trúc hệ thống.
- Định dạng dữ liệu chung giữa các module.
- Mã nguồn tích hợp và giao diện demo.
- Nhật ký chạy hệ thống.
- Phần báo cáo thuộc phạm vi phụ trách.

---

### Thành viên 2 — Thu thập dữ liệu và trích xuất đặc trưng

#### Công việc chính

- Nghiên cứu cách biểu diễn hành vi nhịp gõ phím.
- Xây dựng chương trình thu nhận:
  - Thời điểm nhấn phím.
  - Thời điểm thả phím.
  - Mã phiên.
  - Mã người tham gia.
  - Thời gian và ngữ cảnh thu thập.
- Không lưu nội dung nhạy cảm mà người dùng nhập.
- Kiểm tra độ chính xác và tính nhất quán của timestamp.
- Soạn hướng dẫn và quy trình thu thập dữ liệu thống nhất.
- Tổ chức dữ liệu theo người dùng, phiên và ngày thu thập.
- Phát hiện dữ liệu thiếu, dữ liệu lỗi, lần gõ bất thường và phiên quá ngắn.
- Xây dựng các đặc trưng:
  - Dwell time.
  - Flight time.
  - Tốc độ gõ.
  - Khoảng nghỉ giữa các lần gõ.
  - Tỷ lệ sử dụng phím sửa lỗi.
  - Mức biến động của hành vi trong một cửa sổ.
- Kiểm tra nhiều kích thước cửa sổ, ví dụ 20, 50 và 100 lần gõ.
- Chuẩn hóa đặc trưng bằng median và MAD.
- Phân tích dữ liệu khám phá:
  - Phân phối của từng đặc trưng.
  - Sự khác biệt giữa các người dùng.
  - Mức thay đổi giữa các phiên.
  - Ảnh hưởng của kích thước cửa sổ.
- Xây dựng data dictionary.
- Đóng gói pipeline tiền xử lý để có thể chạy lại từ dữ liệu thô.
- Viết kiểm thử cho các công thức trích xuất đặc trưng.
- Viết các phần sau trong báo cáo:
  - Quy trình thu thập dữ liệu.
  - Cấu trúc bộ dữ liệu.
  - Phương pháp tiền xử lý.
  - Các đặc trưng nhịp gõ được sử dụng.
  - Biện pháp bảo vệ dữ liệu người tham gia.

#### Sản phẩm phải bàn giao

- Công cụ thu nhận sự kiện bàn phím.
- Bộ dữ liệu thô và bộ dữ liệu đã xử lý.
- Mã nguồn trích xuất và chuẩn hóa đặc trưng.
- Data dictionary.
- Bảng thống kê mô tả dữ liệu.
- Biểu đồ phân phối một số đặc trưng quan trọng.
- Phần báo cáo thuộc phạm vi phụ trách.

---

### Thành viên 3 — Mô hình phát hiện và phương pháp toán học

#### Công việc chính

- Tổng hợp các phương pháp phát hiện bất thường phù hợp với bài toán.
- Xây dựng ít nhất hai phương pháp đối chứng, gồm:
  - Ngưỡng khoảng cách hoặc z-score cố định.
  - Isolation Forest.
  - Có thể bổ sung One-Class SVM nếu còn thời gian.
- Xây dựng hồ sơ hành vi cho từng người dùng.
- Tạo điểm bất thường cho từng cửa sổ quan sát.
- Cài đặt robust z-score:

  $$
  z_t = \frac{a_t-\operatorname{median}(a_u)}
  {1.4826\operatorname{MAD}(a_u)}
  $$

- Cài đặt CUSUM có hệ số quên:

  $$
  S_t = \max\left\{0,\lambda S_{t-1}+z_t-k\right\}
  $$

- Xây dựng điều kiện yêu cầu xác thực lại khi điểm tích lũy vượt ngưỡng.
- Xây dựng ngưỡng thích ứng dựa trên:
  - Người dùng.
  - Ngữ cảnh sử dụng.
  - Số lượng dữ liệu đăng ký.
  - Mức biến động trong lịch sử.
- Xây dựng cơ chế khởi tạo cho người dùng có ít dữ liệu.
- Xác định cách cập nhật hồ sơ hành vi và điều kiện chấp nhận mẫu mới.
- Phân tích nguy cơ hồ sơ bị cập nhật bằng dữ liệu của kẻ tấn công.
- Tìm tham số trên tập validation, không sử dụng tập test để chọn tham số.
- Lập bảng phạm vi tìm kiếm cho các tham số \(\lambda\), \(k\) và \(h\).
- Thực hiện ablation study:
  - Bỏ CUSUM.
  - Bỏ hệ số quên.
  - Dùng ngưỡng cố định thay cho ngưỡng thích ứng.
  - Bỏ các thông tin ngữ cảnh.
- Phân tích độ phức tạp tính toán và khả năng xử lý theo thời gian thực.
- Chuẩn bị một ví dụ tính toán cụ thể để minh họa cách điểm rủi ro thay đổi.
- Viết các phần sau trong báo cáo:
  - Mô hình toán học.
  - Các phương pháp đối chứng.
  - Thuật toán đề xuất.
  - Cách lựa chọn tham số.
  - Phân tích độ phức tạp.

#### Sản phẩm phải bàn giao

- Mã nguồn của các phương pháp đối chứng.
- Mã nguồn tính robust z-score và CUSUM.
- Mã nguồn của ngưỡng thích ứng.
- Bảng tham số và cấu hình mô hình.
- Kết quả ablation study.
- Ví dụ tính toán minh họa.
- Phần báo cáo thuộc phạm vi phụ trách.

---

### Thành viên 4 — Thiết kế thực nghiệm, đánh giá và phản biện khoa học

#### Công việc chính

- Viết quy trình thực nghiệm trước khi chạy mô hình chính thức.
- Quy định cách chia tập train, validation và test theo phiên.
- Kiểm tra và ngăn hiện tượng rò rỉ dữ liệu giữa các tập.
- Thiết kế các kịch bản đánh giá:
  - Chính chủ sử dụng bình thường.
  - Người khác tiếp quản phiên đột ngột.
  - Chính chủ thay đổi tốc độ gõ.
  - Phiên có ít dữ liệu.
  - Dữ liệu có nhiễu hoặc nhiều khoảng nghỉ.
  - Thay đổi bàn phím nếu nhóm có đủ điều kiện thử nghiệm.
- Xác định cách tạo và ghi nhận thời điểm tiếp quản phiên.
- Viết mã tính các chỉ số:
  - FAR.
  - FRR.
  - EER.
  - Thời gian phát hiện TTD.
  - Số lần yêu cầu MFA trong một khoảng thời gian.
  - Tỷ lệ phát hiện thành công các lần tiếp quản.
- Tạo ROC curve hoặc DET curve khi phù hợp.
- Báo cáo median và IQR cho các đại lượng có phân phối lệch.
- Tính khoảng tin cậy bằng bootstrap nếu số lượng dữ liệu cho phép.
- Thực hiện kiểm định Wilcoxon để so sánh mô hình đề xuất với phương pháp đối chứng.
- Tính effect size, không chỉ báo cáo p-value.
- Phân tích false acceptance, false rejection và các trường hợp phát hiện chậm.
- Lập bảng kết quả theo từng người dùng và kết quả tổng hợp.
- Quản lý random seed, cấu hình và mã phiên bản của từng lần chạy.
- Kiểm tra khả năng chạy lại thí nghiệm từ dữ liệu đầu vào.
- Quản lý tài liệu tham khảo và kiểm tra nguồn cho các nhận định quan trọng.
- Viết các phần sau trong báo cáo:
  - Thiết kế thực nghiệm.
  - Các chỉ số đánh giá.
  - Phương pháp kiểm định thống kê.
  - Kết quả thực nghiệm.
  - Phân tích sai số.
  - Các nguy cơ ảnh hưởng đến độ tin cậy của kết quả.
- Tổng hợp danh sách câu hỏi giảng viên có thể phản biện.

#### Sản phẩm phải bàn giao

- Tài liệu mô tả quy trình thực nghiệm.
- Mã nguồn tính các chỉ số đánh giá.
- Bảng kết quả và biểu đồ so sánh.
- Kết quả kiểm định thống kê.
- Phân tích các trường hợp mô hình dự đoán sai.
- Danh sách câu hỏi phản biện và phương án trả lời.
- Phần báo cáo thuộc phạm vi phụ trách.

## 3. Công việc chung của cả nhóm

- Thống nhất phạm vi, thuật ngữ và ký hiệu toán học ngay từ đầu.
- Mỗi người tìm và đọc ít nhất ba tài liệu khoa học liên quan trực tiếp đến đề tài.
- Mỗi tài liệu cần có bản tóm tắt ngắn về:
  - Bài toán mà nghiên cứu giải quyết.
  - Phương pháp được sử dụng.
  - Bộ dữ liệu và cách đánh giá.
  - Điểm có thể kế thừa.
  - Hạn chế của nghiên cứu.
- Cả bốn thành viên cùng tham gia tạo dữ liệu nhịp gõ.
- Cùng duyệt mô hình đe dọa và quy trình thực nghiệm trước khi chạy chính thức.
- Mỗi người review mã nguồn của ít nhất một thành viên khác.
- Cùng phân tích những trường hợp hệ thống đưa ra kết quả sai.
- Cùng kiểm tra sự thống nhất giữa mã nguồn, bảng kết quả, báo cáo và slide.
- Tổ chức ít nhất hai buổi bảo vệ thử.
- Mỗi thành viên phải giải thích được:
  - Bài toán xác thực liên tục.
  - Dwell time và flight time.
  - Robust z-score.
  - CUSUM.
  - Ngưỡng thích ứng.
  - FAR, FRR và EER.
  - Thời gian phát hiện TTD.
  - Data leakage.
  - Lý do chọn các phương pháp đối chứng.

## 4. Cách tổ chức trong quỹ thời gian còn lại

### Chặng 1 — Chốt thiết kế ban đầu

Thời gian thực hiện ngắn, chỉ cần đủ để cả nhóm thống nhất:

- Phát biểu bài toán.
- Mô hình đe dọa.
- Định dạng dữ liệu.
- Đặc trưng tối thiểu cần có.
- Mô hình đối chứng.
- Mô hình đề xuất.
- Cách chia dữ liệu.
- Các chỉ số đánh giá.

Kết thúc chặng này, mỗi thành viên bắt đầu ngay luồng công việc riêng. Không chờ tài liệu thiết kế trở nên hoàn hảo mới triển khai.

### Chặng 2 — Phát triển song song

Bốn luồng được thực hiện đồng thời:

1. Thành viên 1 dựng bộ khung hệ thống và luồng demo bằng dữ liệu giả.
2. Thành viên 2 xây công cụ thu thập, pipeline đặc trưng và tổ chức thu dữ liệu.
3. Thành viên 3 xây baseline, CUSUM và ngưỡng thích ứng bằng dữ liệu mô phỏng hoặc dữ liệu thử.
4. Thành viên 4 xây pipeline đánh giá, kịch bản tiếp quản và mẫu bảng kết quả.

Trong chặng này, nhóm cần ghép thử mỗi ngày hoặc sau mỗi thay đổi lớn để phát hiện sớm sự không tương thích giữa các module.

### Chặng 3 — Ghép hệ thống và chạy thực nghiệm

- Thay dữ liệu mô phỏng bằng dữ liệu thật.
- Ghép pipeline đặc trưng với mô hình phát hiện.
- Ghép đầu ra mô hình vào thành phần tích lũy rủi ro và xác thực lại.
- Chạy cùng một tập dữ liệu cho các phương pháp đối chứng và phương pháp đề xuất.
- Chạy ablation study.
- Lưu đầy đủ tham số, seed, log và kết quả trung gian.
- Kiểm tra lại việc chia dữ liệu để loại trừ data leakage.
- Phân tích các trường hợp dự đoán sai trước khi kết luận.

### Chặng 4 — Hoàn thiện sản phẩm và tập phản biện

- Chạy lại toàn bộ pipeline từ đầu để kiểm tra khả năng tái lập.
- Chốt bảng và biểu đồ kết quả.
- Hoàn thiện báo cáo.
- Cập nhật slide bằng kết quả thực nghiệm thật.
- Chuẩn bị demo trực tiếp và video demo dự phòng.
- Kiểm tra tất cả công thức, con số và trích dẫn.
- Tập bảo vệ và đặt câu hỏi chéo giữa các thành viên.
- Chỉ sửa lỗi hoặc điểm chưa rõ ở giai đoạn cuối, không bổ sung thêm chức năng lớn nếu chưa hoàn thành phần cốt lõi.

## 5. Quan hệ phụ thuộc giữa các phần việc

Các thành viên không phải chờ nhau hoàn thành toàn bộ. Chỉ có một số phụ thuộc ở thời điểm ghép bản cuối:

- Thành viên 3 cần dữ liệu thật của thành viên 2 để chạy kết quả cuối, nhưng có thể phát triển thuật toán bằng dữ liệu mô phỏng trước.
- Thành viên 4 cần đầu ra của thành viên 3 để lập bảng cuối, nhưng có thể xây bộ đánh giá bằng kết quả giả trước.
- Thành viên 1 cần module của thành viên 2 và 3 để tích hợp bản cuối, nhưng có thể dựng kiến trúc và giao diện bằng module tạm.
- Báo cáo và slide cần kết quả thực nghiệm cuối, nhưng cấu trúc và phần phương pháp có thể hoàn thiện trước.

Luồng công việc tổng quát:

```text
                 Chốt thiết kế ban đầu
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
 Kiến trúc và API    Dữ liệu/đặc trưng    Mô hình phát hiện
     (TV1)                (TV2)                (TV3)
        │                  │                  │
        └──────────────┬───┴──────────────┬───┘
                       │                  │
                       ▼                  ▼
                 Ghép hệ thống      Đánh giá thống kê
                       │                (TV4)
                       └─────────┬────────┘
                                 ▼
                      Báo cáo, slide và demo
```

Thành viên 4 bắt đầu xây bộ đánh giá ngay từ đầu và làm việc song song với ba luồng còn lại; sơ đồ chỉ thể hiện thời điểm cần đầu ra thật để tạo kết quả cuối.

## 6. Cơ chế kiểm tra chéo

| Người thực hiện | Người kiểm tra | Nội dung kiểm tra |
|---|---|---|
| Thành viên 1 | Thành viên 4 | Phát biểu bài toán, mô hình đe dọa và các tuyên bố về tính mới |
| Thành viên 2 | Thành viên 3 | Công thức đặc trưng, dữ liệu thiếu và cách chuẩn hóa |
| Thành viên 3 | Thành viên 4 | Cách chọn tham số, baseline và tính đúng của đánh giá |
| Thành viên 4 | Thành viên 1 | Kịch bản thực nghiệm, kết luận và sự thống nhất với phạm vi đề tài |

Mỗi lần kiểm tra chéo phải ghi lại vấn đề phát hiện được và cách xử lý. Không nên chỉ xác nhận bằng miệng rằng phần việc đã hoàn thành.

## 7. Mức độ ưu tiên khi thời gian ngắn

### Bắt buộc phải hoàn thành

- Thu thập được dữ liệu theo nhiều phiên.
- Trích xuất được dwell time và flight time.
- Có ít nhất hai phương pháp đối chứng.
- Có robust z-score, CUSUM và ngưỡng xác thực lại.
- Chia train, validation và test theo phiên.
- Đánh giá FAR, FRR, EER và TTD.
- Có một kịch bản tiếp quản phiên rõ ràng.
- Có bảng so sánh mô hình đề xuất với baseline.
- Có phân tích trường hợp dự đoán sai.
- Có demo chạy được từ đầu vào đến cảnh báo.
- Báo cáo được giới hạn của nghiên cứu, không đưa ra kết luận vượt quá dữ liệu.

### Chỉ thực hiện khi phần bắt buộc đã ổn định

- One-Class SVM.
- Thử nghiệm trên nhiều loại bàn phím.
- Nhiều dạng ngữ cảnh sử dụng.
- Cơ chế cập nhật hồ sơ trực tuyến hoàn chỉnh.
- Dashboard có nhiều chức năng.
- Các phép kiểm định hoặc biểu đồ bổ sung.

## 8. Tiêu chí xác nhận một đầu việc đã hoàn thành

Một nhiệm vụ chỉ được xem là hoàn thành khi đáp ứng đủ các điều kiện sau:

1. Có sản phẩm cụ thể và lưu đúng thư mục chung.
2. Có hướng dẫn để thành viên khác chạy lại hoặc kiểm tra.
3. Có dữ liệu hoặc ví dụ chứng minh sản phẩm hoạt động.
4. Có người khác trong nhóm review.
5. Kết quả không mâu thuẫn với báo cáo và slide.
6. Các hạn chế hoặc lỗi chưa xử lý được đã được ghi rõ.

## 9. Theo dõi mức độ đóng góp

| Hạng mục | Tỷ trọng tham khảo |
|---|---:|
| Mã nguồn và module cá nhân | 30% |
| Thực nghiệm và bằng chứng kết quả | 25% |
| Phần báo cáo phụ trách | 20% |
| Review chéo và sửa lỗi chung | 10% |
| Thu thập dữ liệu | 5% |
| Thuyết trình và phản biện | 10% |

Tỷ trọng này dùng để theo dõi nội bộ, tránh tình trạng một người chỉ làm phần trình bày hoặc chỉ tổng hợp tài liệu nhưng không tham gia vào nội dung chuyên môn.

## 10. Yêu cầu trước khi bảo vệ

- Mỗi con số trên slide phải truy ngược được về file kết quả.
- Mỗi biểu đồ phải có tên trục, đơn vị và chú thích rõ ràng.
- Mọi tham số quan trọng phải có lý do lựa chọn.
- Không chọn tham số dựa trên tập test.
- Không trộn các cửa sổ của cùng một phiên vào cả tập train và test.
- Không khẳng định hệ thống “an toàn tuyệt đối” hoặc “nhận diện chính xác người dùng”.
- Phải phân biệt rõ xác thực liên tục với nhận dạng người dùng.
- Phải giải thích được vì sao cần CUSUM thay vì chỉ xét từng cửa sổ độc lập.
- Phải trình bày được sự đánh đổi giữa phát hiện nhanh, báo động sai và số lần yêu cầu MFA.
- Cả bốn thành viên đều phải nắm được luồng hoạt động tổng thể và các công thức cốt lõi.
