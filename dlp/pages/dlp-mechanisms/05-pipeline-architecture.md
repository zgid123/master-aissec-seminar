---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# DLP trong pipeline Big Data

<PipelineWithCallouts />
<span v-click="1" class="hidden" />
<span v-click="2" class="hidden" />
<span v-click="3" class="hidden" />
<span v-click="4" class="hidden" />
<span v-click="5" class="hidden" />

<!--
Hình dùng một luồng tham chiếu để trả lời câu hỏi DLP can thiệp ở đâu. Năm giai đoạn có thể phân nhánh, lặp, trao đổi dữ liệu trung gian và tạo nhiều bản sao. Một điểm kiểm soát chỉ bao phủ hoạt động đi qua phần tích hợp đó. Các ví dụ dưới đây là mẫu triển khai giả định, không phải kết quả thử nghiệm.

[click]
### 1. Tiếp nhận

**Bối cảnh và vấn đề.** Hệ thống nạp bảng giao dịch cùng dữ liệu liên hệ của khách hàng vào một môi trường phân tích. Một tập phân tích chỉ cần mã khách hàng và thông tin giao dịch, nhưng nguồn còn có email. Giữ nguyên email trong mọi output làm tăng lượng thông tin cá nhân có thể bị lộ.

**Điểm tích hợp và input.** Job tiếp nhận hoặc thành phần tiền xử lý đọc bản ghi/lô input, schema, nội dung column / field và metadata nguồn. Một detector hoặc quy tắc trong job có thể tạo finding để policy xử lý. Đây là tích hợp được đề xuất; không giả định mọi connector tự có DLP.

**Policy và enforcement.** Policy quy định email có được đưa vào tập phân tích hay cần loại bỏ/biến đổi. Job tiếp nhận hoặc workflow orchestrator áp dụng quyết định trước khi công bố dữ liệu xuống bước sau. Bản raw cần giữ cho nghiệp vụ hợp lệ được quản lý riêng bằng quyền truy cập phù hợp, không bị ghi đè bởi output đã giảm column / field.

**Kết quả minh họa và giới hạn.** Job tạo một output phân tích không chứa email và để bản raw trong vùng được kiểm soát. Nếu detector lỗi, schema thay đổi hoặc một nhánh khác bỏ qua job, output vẫn có thể chứa column / field nhạy cảm. Vì vậy phải xác nhận đúng phiên bản đã kiểm tra mới được chuyển tiếp.

[click]
### 2. Lưu trữ

**Bối cảnh và vấn đề.** Bản raw và nhiều phiên bản dữ liệu sau xử lý có thể nằm trong các file, bảng, object và phân vùng khác nhau. Nhà quản trị chưa có danh mục đầy đủ về nơi chứa thông tin liên hệ.

**Điểm tích hợp và input.** Scanner có quyền đọc thích hợp kết nối vào kho lưu trữ được hỗ trợ. Nó kiểm tra nội dung cùng metadata như đường dẫn, schema hoặc chủ sở hữu rồi tạo finding. Phạm vi phụ thuộc định dạng, quyền và inventory đã khai báo.

**Policy và enforcement.** Finding có thể khởi tạo classification/access review. Catalog hoặc thành phần quản lý kho có thẩm quyền cập nhật label hay yêu cầu chủ dữ liệu sửa quyền/remediate; scanner chỉ áp dụng enforcement nếu tích hợp cụ thể hỗ trợ hành động đó.

**Kết quả minh họa và giới hạn.** Finding chỉ ra một bảng có email để chủ dữ liệu đánh giá label và quyền truy cập. Quét theo lịch có thể phát hiện sau khi dữ liệu đã được đọc hoặc chia sẻ; discovery tự nó không chặn một lần đọc. Định dạng không hỗ trợ, quyền thiếu và đối tượng mới chưa được inventory tạo lỗ hổng độ phủ.

[click]
### 3. Xử lý và làm sạch

**Bối cảnh và vấn đề.** Một job nối lịch sử giao dịch với bảng liên hệ, rồi chuẩn hóa và tạo bảng kết quả. Join có thể nối danh tính với hành vi; dữ liệu nhạy cảm cũng có thể xuất hiện ở intermediate output.

**Điểm tích hợp và input.** Job ghi kết quả vào restricted staging (vùng lưu tạm có quyền hạn chế). Detector, bước policy hoặc quy trình review kiểm tra nội dung phiên bản trung gian/cuối, schema và lineage đã thu thập. Việc theo dõi lineage ghi lại nguồn và phép biến đổi, nhưng không chứng minh độ nhạy của output đã chính xác.

**Policy và enforcement.** Policy đánh giá output theo nội dung và audience dự kiến. Pipeline orchestrator hoặc thành phần quản lý quyền trên kho giữ kết quả trong staging cho tới khi kiểm tra xong, rồi chỉ publish đúng phiên bản được duyệt. Finding một mình không ngăn tải output ra khỏi vùng tạm.

**Kết quả minh họa và giới hạn.** Job bỏ email và gộp giao dịch cho báo cáo rộng; orchestrator chỉ publish phiên bản mới sau khi kiểm tra lại. Bảng chi tiết sau join vẫn ở vùng hạn chế cho nhóm được duyệt. Nếu job ghi phiên bản khác sau lần kiểm tra hoặc đường publish bỏ qua orchestrator, quyết định không bao phủ phiên bản đó. [Apache Atlas — classification propagation](https://atlas.apache.org/1.2.0/ClassificationPropagation.html) mô tả propagation theo lineage được cấu hình; propagation hỗ trợ truy vết nhưng không đánh giá mọi kết quả join.

[click]
### 4. Phân tích và trực quan hóa

**Bối cảnh và vấn đề.** Chuyên viên chạy query trên giao dịch, xem dashboard, drill-down vào nhóm nhỏ hoặc tạo cache và extract. Một kết quả tổng quan có thể an toàn cho nhiều người, trong khi hàng chi tiết hoặc cột email không phù hợp với audience rộng.

**Điểm tích hợp và input.** Query engine hoặc ứng dụng phân tích được hỗ trợ xét kết quả query cùng classification/label, người dùng, hành động và đích. Detector có thể kiểm tra nội dung output; policy của query/app control hoặc access control xét thao tác và ngữ cảnh.

**Policy và enforcement.** Query layer hoặc ứng dụng có thể giới hạn hàng/cột, quyền xem, drill-down hoặc export theo policy. Phân quyền và masking là các kiểm soát bổ trợ; finding DLP không tự tạo quyền hay che cột nếu thành phần enforcement không thực hiện điều đó.

**Kết quả minh họa và giới hạn.** Dashboard rộng chỉ hiển thị tổng hợp, còn bảng chi tiết được giữ cho nhóm phân tích được cấp quyền. Cách làm này không bảo đảm ngăn mọi ảnh chụp màn hình, suy luận từ dữ liệu được phép xem, API scraping hoặc leo thang quyền. Phạm vi phải được xác nhận trên query engine và ứng dụng cụ thể.

[click]
### 5. Chia sẻ hoặc export

**Bối cảnh và vấn đề.** Người dùng chuẩn bị gửi file khách hàng hoặc kết quả query tới người nhận, thiết bị hay dịch vụ bên ngoài. Một đường truyền được phép về mặt kỹ thuật vẫn có thể sai đích theo policy.

**Điểm tích hợp và input.** Ứng dụng chia sẻ, gateway/proxy hoặc endpoint có tích hợp kiểm tra payload đọc được, người gửi, thao tác và đích. Policy xét finding hoặc label cùng bối cảnh giao dịch. Tích hợp network quan sát thụ động không tương đương enforcement inline.

**Policy và enforcement.** Chính ứng dụng, gateway/proxy hoặc endpoint đã tích hợp áp dụng kết quả, chẳng hạn cho phép, cảnh báo, giữ lại hoặc chặn. Không tự giả định các thành phần độc lập truyền finding cho nhau hay cùng hỗ trợ mọi hành động.

**Kết quả minh họa và giới hạn.** Nhân viên định gửi file có email khách hàng tới địa chỉ cá nhân; policy cấm đích này và gateway inline chặn lần gửi. Nếu payload được mã hóa và tích hợp không giải mã được, detector không đọc được nội dung. Đường gửi bỏ qua tích hợp hoặc thao tác không được hỗ trợ cũng nằm ngoài enforcement này.

### Nguồn tham khảo

- [NIST — Data Loss Prevention](https://csrc.nist.gov/glossary/term/data_loss_prevention): định nghĩa DLP theo data at rest, data in use, data in motion và ngữ cảnh giao dịch.
- [AWS — Learn Amazon Redshift concepts](https://docs.aws.amazon.com/redshift/latest/gsg/getting-started.html): ví dụ các lớp tiếp nhận, staging, xử lý và tiêu thụ trong một luồng kho dữ liệu.
- [Liu et al. (2015), Privacy-Preserving Scanning of Big Content for Sensitive Data Exposure with MapReduce](https://vtechworks.lib.vt.edu/items/2652b4c0-305d-4b03-b463-e16d1cd8ad4e): nghiên cứu quét nội dung quy mô lớn bằng MapReduce, không xác nhận mọi thiết kế pipeline ở đây.
-->
