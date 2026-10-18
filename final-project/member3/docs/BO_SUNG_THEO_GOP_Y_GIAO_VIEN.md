# Bổ sung từ phần 3 theo góp ý của giảng viên

Cập nhật: 18/10/2026. Tài liệu này chỉ chứa phần còn thiếu và hướng ghép vào báo cáo chung. Nội dung phương pháp đã có ở [BAO_CAO_PHAN_3.md](BAO_CAO_PHAN_3.md); danh mục nguồn và phạm vi đối chiếu ở [NGUON_THAM_KHAO.md](NGUON_THAM_KHAO.md).

## 1. Phạm vi đã đối chiếu để tránh trùng

Đã đọc lại hai bản local: `đồ án/Bao_cao_MTH042_Nhom02_draft.docx` của Trâm và `đồ án/QUY_TRINH_THUC_NGHIEM_VO_CONG_MINH.docx` của Minh. Cả hai có thời gian sửa file ngày 16/10/2026; chưa kiểm chứng bản khác của thành viên ở ngoài hai file này.

| Nội dung góp ý | Bản nhóm đã có | Phần bổ sung từ thành viên 3 |
|---|---|---|
| Bài toán lý thuyết, lý do chọn nhịp gõ | Trâm mục 1.1–1.3, 2.1–2.2 | Giữ nội dung hiện có; thêm ví dụ sản phẩm và so sánh biện pháp ngắn ở mục 2 bên dưới |
| Nghiên cứu mới, phân loại hướng | Trâm đã dẫn Kiyani 2020 và khảo sát Shadman 2025; Bảng 1 còn ít ví dụ phương pháp mới | Thêm ba hàng vào chính Bảng 1 và một đoạn phân loại ở mục 3 |
| Cookies chứa gì | Trâm đã nêu vai trò bí mật phiên | Cần phần hệ thống xác nhận cookie thực tế. Phần 3 không đoán tên, trường hoặc giá trị |
| Nguồn công thức/tham số | Trâm đã có công thức và nguồn IF/CUSUM | Thêm hai bảng nguồn/cấu hình trong BAO_CAO_PHAN_3.md; không chép lại công thức |
| Từ viết tắt | Có nhiều thuật ngữ rải ở hai bản | Bổ sung ngắn tại lần xuất hiện đầu trong đoạn ghép; không lập thêm chương thuật ngữ trùng |
| Chỉ số, chia tập và thống kê | Minh mục 3, 5–7 và Trâm mục 2.4 | Dùng phần Minh; chỉ đối chiếu hợp đồng đầu ra và giới hạn hiện thực |

## 2. Đoạn bổ sung sau mục 1.3 của Trâm

### Ứng dụng thực tế và phạm vi sử dụng

TypingDNA giới thiệu ActiveLock là sản phẩm giám sát hành vi trong phiên sử dụng máy tính, có khả năng khóa máy hoặc cảnh báo khi người thao tác không phù hợp với hồ sơ. Trang sản phẩm mô tả nhịp gõ cùng các tín hiệu bổ sung như chuột và tùy chọn khuôn mặt. Đây là ví dụ ứng dụng thực tế, không phải hệ thống chỉ dùng nhịp gõ giống thiết lập của đồ án. Thông tin nhà cung cấp được dùng để minh họa chức năng, không thay thế đánh giá độc lập về độ chính xác hoặc khả năng chống tấn công. [Nguồn M9 — ActiveLock](https://www.typingdna.com/activelock-continuous-authentication).

Trong phạm vi đồ án, lợi ích chính của nhịp gõ là cung cấp bằng chứng về người thao tác trong lúc nhập liệu bằng bàn phím thông thường. Hạn chế trực tiếp là cần tích lũy đủ thao tác trước khi đánh giá; khi không gõ, hệ thống không có bằng chứng nhịp gõ mới. Vì vậy, tín hiệu này bổ sung cho quản lý phiên và xác thực lại. Nó không tự xác minh được mọi hành động trong phiên.

Bảng dưới là phân tích theo tình huống người lạ dùng máy đang mở, không phải kết quả benchmark của các biện pháp. NIST mô tả thời hạn phiên, xác thực lại và giám sát đặc tính phiên trong cùng hệ thống kiểm soát. [Nguồn M8 — NIST](https://pages.nist.gov/800-63-4/sp800-63b.html#session-monitoring).

| Biện pháp | Điểm mạnh | Hạn chế trong kịch bản nhóm |
|---|---|---|
| Hết hạn phiên hoặc hết hạn do không hoạt động | Giới hạn thời gian phiên hoặc khoảng không hoạt động | Người lạ tiếp tục thao tác có thể chưa kích hoạt thời hạn không hoạt động; thời hạn tổng vẫn có hiệu lực |
| Xác thực lại định kỳ hoặc trước thao tác nhạy cảm | Kiểm tra lại tại các thời điểm xác định | Có gián đoạn và khoảng thời gian giữa các lần kiểm tra |
| Giám sát IP, thiết bị, trình duyệt hoặc vị trí | Thêm tín hiệu rủi ro ngoài nhịp gõ | Nếu dùng ngay thiết bị đang mở, một số tín hiệu có thể không đổi |
| Giám sát nhịp gõ | Bổ sung tín hiệu người đang nhập liệu | Cần đủ dữ liệu gõ; phải cân bằng cảnh báo nhầm với độ trễ |

Không diễn giải bảng thành xếp hạng an toàn chung hoặc khẳng định các phương pháp loại trừ nhau.

## 3. Ba hàng bổ sung vào Bảng 1 của Trâm

| Công trình | Hướng tiếp cận | Liên hệ và giới hạn đối chiếu với đồ án |
|---|---|---|
| Acien và cộng sự — TypeNet, bản tác giả 2021 [M5] | Mạng LSTM (Long Short-Term Memory) học biểu diễn chuỗi; khảo sát softmax và học khoảng cách với contrastive/triplet loss | Minh họa hướng học từ chuỗi. Đồ án dùng đặc trưng thống kê, scorer theo tài khoản và khảo sát thêm chính sách. Khác cách huấn luyện, chưa tái hiện hoặc so trực tiếp EER |
| Stragapede và cộng sự — TypeFormer, 2024 [M6] | Kiến trúc kết hợp các thành phần Transformer và LSTM cho xác minh nhịp gõ mobile; xem xét độ dài chuỗi và số mẫu đăng ký | Là ví dụ phương pháp mới sau 2019. Khác miền thiết bị; kết quả xác minh mobile chưa chứng minh TTD của tiếp quản phiên desktop |
| Stragapede và cộng sự — KVC-onGoing, 2025 [M7] | Benchmark xác minh với giao thức thống nhất cho desktop/mobile, tách người phát triển và đánh giá; xem xét công bằng nhân khẩu học | Tham khảo cách mô tả giao thức. Đây là benchmark, không phải một mô hình; phép xác minh theo phiên chưa thay cho replay đổi người giữa phiên |

Nguồn tương ứng: [TypeNet — bản v3 năm 2021](https://arxiv.org/abs/2101.05570v3), [TypeFormer — bài chính thức năm 2024](https://link.springer.com/article/10.1007/s00521-024-10140-2), [KVC-onGoing — bản ghi tạp chí năm 2025 tại UAM](https://portalcientifico.uam.es/es/ipublic/item/10428058). Chưa thực hiện khảo sát hệ thống để gọi đây là các nghiên cứu mới nhất tính tới năm 2026.

Đoạn nhận xét đặt sau bảng:

Các hướng tiếp cận có thể được phân loại theo dữ liệu đầu vào và cách xây dựng bộ xác minh. Dữ liệu gồm văn bản cố định, bán cố định và văn bản thay đổi; phương pháp gồm thống kê/khoảng cách, học máy và học sâu. Khảo sát Shadman đã dẫn ở [3] của báo cáo cung cấp cách phân loại các nhóm dữ liệu và thuật toán này. [Nguồn khảo sát](https://arxiv.org/abs/2303.04605).

Về cách vận hành của đồ án, cần phân biệt bộ tạo điểm với chính sách ra quyết định. L1 và Isolation Forest tạo điểm bất thường, còn CUSUM tích lũy điểm qua các cửa sổ trước khi so ngưỡng. Hai lớp có thể kết hợp; mô hình học sâu cũng có thể cung cấp điểm cho một chính sách tuần tự. Đồ án giữ scorer khi so B0/B1/P1 để kiểm tra tác động của cách ra quyết định. Chưa có căn cứ gọi CUSUM có quên hoặc việc dùng hai ngưỡng là phát minh mới của nhóm.

## 4. Phần phương pháp chỉ ghép hai bảng còn thiếu

Trong [BAO_CAO_PHAN_3.md](BAO_CAO_PHAN_3.md), lấy hai mục mới:

1. **Nguồn công thức và phần nhóm hiện thực**: ghép gần công thức ở mục 2.2 của Trâm. Dùng lại số trích dẫn IF/CUSUM đã có; chỉ bổ sung nguồn MAD [M4] khi danh mục chưa có nguồn tương ứng.
2. **Cấu hình thực nghiệm và cách xác định giá trị**: ghép ở phần hiện thực/thực nghiệm. Phân biệt tham số được chọn từ validation với hằng số thiết kế trong config; không viết rằng mọi con số đều lấy từ bài báo.

Không chép lại các mục định nghĩa bài toán, FAR/FRR/EER, kiểm duyệt, bootstrap hay Wilcoxon nếu báo cáo chung đã dùng phần Trâm/Minh. Không gộp bảng ngưỡng chẩn đoán cửa sổ với ngưỡng của chính sách CUSUM.

## 5. Chỗ báo cáo chung cần đồng bộ khi ghép

Các file của Trâm/Minh chưa bị sửa bởi lần cập nhật này. Người ghép báo cáo kiểm tra các vị trí sau:

| Vị trí trong bản Trâm | Điều chỉnh theo phần 3 đã chạy |
|---|---|
| Mục 2.2 và thành phần tính điểm ở 4.2 | Hiện có L1 và Isolation Forest; One-Class SVM chưa triển khai |
| Công thức ngưỡng theo người/ngữ cảnh/độ dài phiên | Có thể giữ như định hướng, nhưng hiện P1 chỉ chọn ngưỡng theo người và giữ lambda/k của B1 |
| Mục 2.3, 5.2 mô tả P2 | Phần 3 chưa có P2, kể cả mô phỏng cập nhật offline; không ghi là đã chạy hoặc đã kiểm chứng RQ3 |
| Mục 1.4 và RQ1/RQ2 | Giữ câu hỏi nghiên cứu; phần kết quả phải nói chưa ghép operating point để bảo đảm cùng TTD/FAR thực tế |
| Câu đầu 1.1 “MFA chỉ xác nhận ... tại thời điểm đăng nhập” | Dùng “MFA ở bước đăng nhập chỉ xác nhận tại thời điểm đó”, vì còn có thể yêu cầu MFA lại trong phiên |
| Mô phỏng độ lệch điểm +0,10 đến +0,25 và ARL ở 2.2 | Cần script/cấu hình/kết quả của người đã tính. Không gán cho lần chạy member3; chưa được phần 3 xác minh |

Phần kết quả của nhóm có thể dùng câu sau:

> Bộ mô phỏng đã chạy toàn bộ quy trình nhưng chưa tìm được cấu hình đạt các ràng buộc đặt ra trong lưới tham số hiện tại. Kết quả được dùng để kiểm tra quy trình và phân tích đánh đổi, chưa xác nhận P1 tốt hơn B1 hoặc hiệu quả bảo mật trên người thật.

TTD hiện đo cảnh báo của toàn chính sách, như mô tả bàn giao sau review; không gọi là chất lượng phát hiện thuần của scorer. Định nghĩa nghiên cứu chính vẫn cần thống nhất với Minh.

## 6. Thuật ngữ dùng trong phần bổ sung

Khi ghép, giải thích ở lần xuất hiện đầu nếu báo cáo chưa giải thích: bộ tạo điểm (scorer), tập chọn tham số (validation), đường cơ sở (baseline), hệ số quên (lambda), khoảng tạm ngừng cảnh báo sau MFA thành công (cooldown), thời gian trung bình đến báo động (ARL, Average Run Length). Từ viết tắt MFA, MAD, CUSUM, FAR, FRR, EER và TTD dùng lại phần giải thích chung, không chèn lại danh sách ở mỗi mục.

## 7. Trạng thái sau chuyển ổ

Chat di dời `01a14d84-73fd-7180-81ec-4bde404dd7dd` đã xác nhận D mới được kiểm chứng và C gộp xong; các lượt sau xử lý danh sách project trên giao diện. Đã đọc được mã/tài liệu trên đường dẫn D hiện tại và đối chiếu model SHA-256 với bản sau review: `ae99e1f3314d068298060063c8f728af30e9d89b9ab77067c6f06f0343e11710`, khớp.

Lần cập nhật này chỉ thay tài liệu Markdown phần 3, không thay cấu hình, mã hoặc dữ liệu thực nghiệm. Kết quả chuẩn vẫn ở `artifacts/simulation-reviewed`. Gói bàn giao `Topic03_Member3_Delivery_2026-10-18.zip` chứa các tài liệu bổ sung này; các ZIP ngày 16/10 được giữ làm bản cũ và chưa chứa nội dung mới.

Kiểm tra ngày 18/10/2026 sau cập nhật: `npm test` đạt 59/59; `npm run typecheck` đạt; hash mã/config khớp bundle đã khóa và 17 file kết quả khớp receipt `artifacts/reproducibility-reviewed.json`. Đã kiểm UTF-8 và các liên kết file trong năm tài liệu Markdown được cập nhật. Không chạy lại fit hoặc chọn lại tham số vì lần này không thay mã, dữ liệu hay thiết kế thực nghiệm.
