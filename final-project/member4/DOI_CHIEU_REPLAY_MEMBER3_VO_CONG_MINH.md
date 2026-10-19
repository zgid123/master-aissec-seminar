# ĐỐI CHIẾU REPLAY TTD VÀ MFA CỦA PHẦN MÔ HÌNH
Võ Công Minh - Nhóm 02 - MTH042
Ngày 19/10/2026
Phạm vi: lần chạy member3/artifacts/simulation-2026-10-19 (commit 715f0dd trên main) và bản kiểm tích hợp member2/handoff-checks-2026-10-19. Dữ liệu là mô phỏng SIM01-SIM04, không phải dữ liệu người thật.

## 1. Mục đích

Lần đối chiếu trước chỉ kiểm chỉ số cửa sổ cố định (FAR, FRR, EER). Các chỉ số vận hành của chính sách như tỷ lệ phát hiện, thời gian phát hiện (TTD), số lần hỏi MFA mỗi giờ và số lần thu hồi nhầm chưa được kiểm độc lập. Tài liệu này bổ sung phần đó theo đề nghị trong CAP_NHAT_2026-10-19 của phần mô hình.

## 2. Cách kiểm

Bộ kiểm nằm ở member4/src/member3-replay.mjs, viết riêng và không gọi mã của phần mô hình. Bộ kiểm chỉ đọc các file đầu ra, không sửa mã, dữ liệu hay kết quả của thành viên khác.

Bước 1, chạy lại chính sách từ điểm z trong decisions.csv. Với mỗi kịch bản, bộ kiểm tự tính điểm tích lũy theo công thức s mới bằng max(0, lambda nhân s cũ cộng z trừ k), riêng B0 dùng thẳng z. Tham số lambda, k, h1, h2 và thời gian chờ lấy từ model.json. Sau đó bộ kiểm tự quyết định hành động (tiếp tục, hỏi MFA hoặc thu hồi), tự xử lý thời gian chờ sau MFA, đặt lại điểm khi sang đoạn gõ mới của phiên chính chủ và dừng phiên khi thu hồi. Mỗi bước được so với các cột s_previous, s, cooldown_before, action, after_takeover và thời điểm quyết định trong log.

Bước 2, tự dựng lại chuỗi sự kiện (đặt lại đoạn, hỏi MFA, MFA đạt hoặc trượt, thu hồi) rồi so từng sự kiện với events.csv theo thứ tự, loại sự kiện, nguyên nhân và thời điểm.

Bước 3, tự tính kết cục của từng kịch bản: có phát hiện không, TTD theo phím và theo mili giây, ca kiểm duyệt, thu hồi trước tiếp quản, số yêu cầu MFA, số lần thu hồi nhầm, số phím người lạ đã theo dõi và lý do dừng. Kết quả được so với scenario_results.csv.

Bước 4, từ kết cục đã tự tính, tính lại toàn bộ chỉ số theo từng tài khoản và chính sách rồi so với policy_metrics.csv; sau đó tính trung bình theo người và so với macro_policy_metrics.csv. Trung vị và tứ phân vị TTD dùng hàm thống kê của phần đánh giá.

Sai số cho phép là 1e-9 theo tỷ lệ. Các con số đếm phải khớp tuyệt đối.

## 3. Kết quả đối chiếu

Toàn bộ khớp, không có sai lệch nào ở cả sáu nhóm kiểm tra.

Đã kiểm 29.183 quyết định, 7.600 sự kiện, 3.520 kết cục kịch bản (8 tổ hợp scorer và chính sách, mỗi tổ hợp 432 kịch bản tiếp quản và 8 phiên chính chủ), 32 hàng chỉ số theo tài khoản và 8 hàng trung bình.

Bản kiểm tích hợp của phần dữ liệu (simulation-2026-10-19-handoff) cũng khớp hoàn toàn với cùng số lượng.

Chỉ số cửa sổ cố định của lần chạy mới được đối chiếu lại bằng adapter cũ: 1.536 lượt chấm, 8/8 hàng scorer và tài khoản khớp FAR, FRR, EER. Trên máy Windows cần thêm tùy chọn --allow-crlf vì Git đổi kiểu xuống dòng khi checkout; adapter xác nhận nội dung khớp sau khi chuẩn hóa xuống dòng.

Để chắc bộ kiểm không "luôn báo khớp", em cố ý làm sai dữ liệu đầu vào theo bảy cách: đổi một điểm z, đổi một hành động, sửa TTD của một kịch bản, sửa MFA/giờ của một tài khoản, xóa một sự kiện MFA trượt, sửa trung vị TTD ở bảng trung bình và giấu một lần thu hồi nhầm. Cả bảy trường hợp đều bị phát hiện. Các phép thử này nằm trong test/member3-replay.test.mjs.

## 4. Giới hạn của phép đối chiếu

Thời lượng ghi (recording_seconds) và thời lượng tường (wall_seconds) của từng kịch bản được lấy từ scenario_results.csv, chưa tính lại từ dữ liệu thô. Bộ kiểm chỉ xác nhận tính nhất quán: cùng một phiên chính chủ không bị thu hồi phải có cùng thời lượng ở mọi chính sách, và phiên bị thu hồi không được dài hơn phiên đầy đủ. Vì vậy mẫu số của MFA/giờ mới được kiểm một phần.

Điểm z được nhận như trong log, không chấm lại từ đặc trưng. Phần chấm điểm đã được đối chiếu riêng ở mức cửa sổ cố định.

MFA được mô phỏng là kết quả tức thời: chính chủ luôn đạt, người lạ luôn trượt. Đây là giả định của thiết kế mô phỏng, bộ kiểm chỉ xác nhận mã làm đúng giả định đó.

## 5. Kết quả hiện hành để đưa vào báo cáo

Các số dưới đây là trung bình theo bốn tài khoản trên tập test mô phỏng. Trung vị TTD là trung bình các trung vị theo tài khoản và chỉ tính trên ca đã phát hiện.

Scorer distance. B0: phát hiện 38,0%, trung vị TTD 181,25 phím, 12,64 lần MFA mỗi giờ, 1 lần thu hồi nhầm. B1: phát hiện 61,2%, trung vị TTD 150 phím, 21,44 lần MFA mỗi giờ, 2 lần thu hồi nhầm (1 lần chưa qua MFA), 3 đoạn chính chủ bị thu hồi trước tiếp quản. P1: phát hiện 57,2%, trung vị TTD 150 phím, 19,11 lần MFA mỗi giờ, 2 lần thu hồi nhầm, 1 đoạn bị thu hồi trước tiếp quản. B1 với lambda bằng 1: phát hiện 61,6%, các chỉ số MFA và thu hồi giống B1.

Scorer isolation forest. B0: phát hiện 36,1%, trung vị TTD 162,5 phím, 13,56 lần MFA mỗi giờ, không thu hồi nhầm. B1: phát hiện 62,7%, trung vị TTD 162,5 phím, 15,33 lần MFA mỗi giờ, 1 lần thu hồi nhầm. P1: phát hiện 75,5%, trung vị TTD 137,5 phím, 20,28 lần MFA mỗi giờ, 4 lần thu hồi nhầm (2 lần chưa qua MFA), 4 đoạn bị thu hồi trước tiếp quản. B1 với lambda bằng 1 trùng hoàn toàn với B1 vì lựa chọn trên validation đã là lambda bằng 1.

Tỷ lệ phát hiện ở trên theo cách tính của phần mô hình, đã loại các kịch bản bị thu hồi trước tiếp quản khỏi mẫu số. Tính trên toàn bộ kịch bản, các tỷ lệ này là: distance B0 38,0%, B1 50,0%, P1 54,2%, B1 với lambda bằng 1 50,5%; isolation forest B0 36,1%, B1 62,7%, P1 61,3%. Tỷ lệ phát hiện trong 150 phím đầu lần lượt là 19,7%, 36,1%, 33,0%, 36,8% (distance) và 13,7%, 34,5%, 51,9% (isolation forest B0, B1, P1). Lý do dùng song song các cách tính nằm ở mục 6.

Không cấu hình nào đạt ràng buộc đã đặt trước (tỷ lệ phát hiện ít nhất 80%, FAR phiên tại 150 phím không quá 15%, không thu hồi nhầm). Vì vậy kết quả chỉ dùng để mô tả và chẩn đoán, không dùng để kết luận H1, H2 hoặc H3.

Khi trình bày cần ghi kèm số yêu cầu MFA và thời lượng: nếu không bị thu hồi, mỗi tài khoản chỉ có khoảng 13 đến 15 phút ghi chính chủ trong test, nên một yêu cầu MFA đã tương đương khoảng 4 lần mỗi giờ. Trường hợp bị thu hồi sớm nhất (isolation forest P1, SIM04) chỉ còn 2,5 phút và không có yêu cầu MFA nào, nên MFA/giờ bằng 0 ở đây không phải dấu hiệu tốt.

## 6. Định nghĩa TTD và MFA/giờ dùng trong báo cáo

Phần mô hình đề nghị phần đánh giá xác nhận định nghĩa TTD. Phần đánh giá đề xuất chốt như sau; nếu nhóm không có ý kiến khác thì dùng thống nhất trong báo cáo.

Phát hiện là quyết định đầu tiên sau thời điểm tiếp quản mà không phải "tiếp tục", tức là hỏi MFA hoặc thu hồi. Thời điểm dùng là lúc có quyết định, không phải lúc bắt đầu cửa sổ. Vì MFA trong mô phỏng là phép thử tức thời và người lạ luôn trượt, hỏi MFA sau tiếp quản tương đương chặn được phiên; giả định này cần ghi rõ trong báo cáo.

TTD là số phím hợp lệ của người lạ đã quan sát tính đến quyết định đó. Đơn vị chính là phím vì ràng buộc thiết kế đặt theo phím; TTD theo thời gian (ms) báo kèm làm thông tin phụ. Do cửa sổ trượt theo bước cố định, TTD chỉ nhận các bậc rời rạc.

Chỉ số chính cho tốc độ phát hiện là tỷ lệ phát hiện trong 150 phím đầu của người lạ. Chỉ số này đã tính đến cả ca không phát hiện, và trên bộ hiện tại mọi ca đều được theo dõi đủ 150 phím nên không có ca thiếu dữ liệu. Trung vị TTD chỉ tính trên ca đã phát hiện, nên chỉ là thông tin bổ sung: chính sách phát hiện ít ca hơn nhưng chỉ bắt được các ca dễ có thể có trung vị đẹp hơn. Không so sánh hai chính sách chỉ bằng trung vị TTD.

Ca bị thu hồi trước tiếp quản không có TTD và bị loại khỏi mẫu số tỷ lệ phát hiện của phần mô hình. Đây là thu hồi nhầm chính chủ, không phải phát hiện người lạ. Vì vậy báo cáo phải đặt cạnh tỷ lệ phát hiện số ca bị loại, đồng thời báo thêm tỷ lệ phát hiện tính trên toàn bộ kịch bản. Điều này làm thay đổi kết luận: với isolation forest, P1 có tỷ lệ phát hiện 75,5% theo cách tính của phần mô hình (loại 72 trên 432 kịch bản), nhưng chỉ còn 61,3% khi tính trên toàn bộ kịch bản, thấp hơn B1 (62,7%, không loại ca nào). Với distance, B1 giảm từ 61,2% xuống 50,0%. Do các kịch bản dùng chung đoạn chính chủ, cần báo kèm số đoạn chính chủ riêng bị thu hồi để người đọc thấy số kịch bản bị loại thực chất đến từ ít đoạn.

Phần mô hình có tách riêng trường hợp cảnh báo sau tiếp quản nhưng do một cửa sổ chính chủ hoàn tất trễ. Trên bộ hiện tại, số trường hợp này bằng 0 ở cả tám cấu hình, nên hai cách định nghĩa (cảnh báo của chính sách hay phát hiện hành vi người lạ) cho cùng kết quả. Báo cáo vẫn giữ cột này để kiểm lại khi có dữ liệu khác.

MFA/giờ là số yêu cầu MFA trong các phiên chính chủ (G0) chia cho thời gian gõ thực tế của chính chủ đã quan sát (thời gian ghi, không tính khoảng nghỉ), đổi sang giờ. Tính riêng cho từng tài khoản rồi lấy trung bình bốn tài khoản. Báo kèm MFA/giờ theo thời gian đồng hồ để người đọc thấy mức làm phiền trong một phiên làm việc thật, ví dụ distance B1 là 21,44 theo thời gian ghi và 17,11 theo thời gian đồng hồ. Không cộng yêu cầu MFA trong phần chính chủ của kịch bản tiếp quản, vì mỗi đoạn chính chủ được dùng lại cho nhiều kịch bản.

Phiên chính chủ bị thu hồi nhầm sẽ dừng sớm, nên cả số yêu cầu MFA lẫn thời gian quan sát đều bị cắt ngắn. Vì vậy MFA/giờ luôn đi kèm số lần thu hồi nhầm và số lần thu hồi khi chưa hỏi MFA, để một chính sách thu hồi sớm không trông như ít làm phiền người dùng.
## 7. Trạng thái các điểm review sau cập nhật

M1, mốc theo dõi: đã sửa. Ca không phát hiện giờ ghi đúng 275 hoặc 276 phím đã theo dõi thay vì 300.

M2, TTD rời rạc: đã bổ sung giải thích. Phần mô hình giữ ràng buộc trung vị không quá 150 phím và thêm ví dụ để người đọc hiểu TTD chỉ nhận các bậc rời rạc (trung vị của 125 và 175 phím là 150).

M3, đếm lặp thu hồi trước tiếp quản: đã bổ sung cột số đoạn chính chủ duy nhất. Ví dụ distance B1 có 54 kịch bản nhưng chỉ 3 đoạn.

M4, thu hồi khi chưa qua MFA: đã bổ sung cột riêng. Tổng 13 lần thu hồi nhầm trên tám cấu hình, 4 lần chưa có MFA trước đó. Quy tắc thu hồi vẫn giữ như thiết kế.

M5, người lạ dùng chung giữa validation và test: phần mô hình ghi nhận đây là giới hạn về khả năng khái quát cho người lạ chưa tham gia chọn ngưỡng, không phải rò rỉ dữ liệu cùng phiên. Em đồng ý với cách diễn giải này; báo cáo đưa vào phần giới hạn.

M6, độ phân giải MFA/giờ: đã bổ sung bảng số yêu cầu, số phút ghi và thu hồi nhầm.

Phân tích ca lỗi chạy lại trên lần chạy mới cho kết quả giống bản cũ ở mọi bảng; chỉ khác mốc theo dõi đã được sửa theo M1.

Số phiên validation: phần dữ liệu đã cập nhật thiết kế thu thật thành năm phiên mỗi người (hai train, hai validation, một test), khớp yêu cầu của phần mô hình. Đây là thiết kế cho lần thu sau; bộ dữ liệu hiện tại vẫn là mô phỏng.

## 8. Cách chạy lại

Chạy tại thư mục final-project/member4, Node.js 24 trở lên, thư mục đầu ra phải mới hoặc rỗng:

node src/member3-replay.mjs --evaluation ../member3/artifacts/simulation-2026-10-19/evaluation --model ../member3/artifacts/simulation-2026-10-19/fit/model.json --output results/my-replay-check

Kết quả gồm replay-reconciliation.json (trạng thái, số lượng đã kiểm, danh sách sai lệch nếu có và mã băm SHA256 của đầu vào), recomputed-policy-metrics.csv và recomputed-macro-metrics.csv. Lệnh trả mã 0 khi khớp, 1 khi có sai lệch.
