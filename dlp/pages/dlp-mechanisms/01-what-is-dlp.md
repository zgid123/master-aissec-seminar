---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# DLP là gì?

Data Loss Prevention (DLP){.font-bold} nhận diện dữ liệu nhạy cảm và áp dụng policy để kiểm soát việc sử dụng, chia sẻ hoặc export dữ liệu.

<div v-click="2" class="mt-6 grid grid-cols-3 gap-5 pl-5 [&_svg.absolute_path]:opacity-10">
  <VertCard step="01" title="Vấn đề" color="#b45309" card-bg="#fffbeb" :dots="false" class="h-[220px] w-full">
    <template #description>
      <VertCardContent class="!px-0 !text-[16px] !leading-[1.35] !text-slate-800 !opacity-100">
        Có quyền đọc không có nghĩa được gửi dữ liệu tới mọi đích.
      </VertCardContent>
    </template>
  </VertCard>

  <VertCard step="02" title="DLP xử lý" color="#0369a1" card-bg="#f0f9ff" :dots="false" class="h-[220px] w-full">
    <template #description>
      <VertCardContent class="!px-0 !text-[16px] !leading-[1.35] !text-slate-800 !opacity-100">
        Xét nội dung nhạy cảm, người thực hiện, hành động và đích theo policy.
      </VertCardContent>
    </template>
  </VertCard>

  <VertCard step="03" title="Lợi ích" color="#047857" card-bg="#ecfdf5" :dots="false" class="h-[220px] w-full">
    <template #description>
      <VertCardContent class="!px-0 !text-[16px] !leading-[1.35] !text-slate-800 !opacity-100">
        Giảm chia sẻ sai đích tại đường đã tích hợp kiểm soát; ghi lại quyết định.
      </VertCardContent>
    </template>
  </VertCard>
</div>

<!--
Slide giới thiệu DLP qua vấn đề chia sẻ dữ liệu nhạy cảm, cách xét policy và lợi ích tại đường đã tích hợp kiểm soát.

[click]
### Khái niệm và ý nghĩa

Data Loss Prevention (DLP, phòng chống thất thoát dữ liệu) là nhóm biện pháp nhận diện dữ liệu nhạy cảm và kiểm soát việc sử dụng, chia sẻ hoặc truyền dữ liệu. Policy là tập quy tắc xét dữ liệu, người thực hiện, hành động và đích nhận để chọn cách xử lý. Detector là thành phần kiểm tra dữ liệu; finding là kết quả hoặc bằng chứng mà detector tạo ra. Classification là quá trình gán mức hoặc loại nhạy cảm cho dữ liệu, còn label là thông tin phân loại được gắn với dữ liệu. Finding, classification và label có liên hệ nhưng không đồng nghĩa: finding ghi điều detector quan sát được, classification đưa ra phân loại, còn label lưu phân loại đó để các bước sau sử dụng.

**So sánh mục đích chính.** Firewall kiểm soát lưu lượng mạng theo các quy tắc đã cấu hình. Antivirus/anti-malware phát hiện và xử lý phần mềm độc hại. DLP nhận diện nội dung nhạy cảm rồi kiểm soát cách sử dụng hoặc tiết lộ nội dung đó theo policy. Ví dụ giả định: người dùng gửi báo cáo khách hàng nhạy cảm qua một ứng dụng vốn được phép dùng. Hoạt động này không nhất thiết có malware, nhưng nội dung hoặc đích nhận có thể vi phạm policy chia sẻ dữ liệu. Các nhóm sản phẩm có thể có tính năng chồng lấn hoặc được tích hợp với nhau; phép so sánh trên chỉ nêu mục đích chính.

Enforcement là việc áp dụng quyết định tại một điểm kiểm soát đã tích hợp. Một finding có thể được dùng làm input cho policy, nhưng tự nó không chặn query hay lần export dữ liệu. Tên gọi Data Leakage Prevention cũng xuất hiện trong tài liệu nghiên cứu; cách phân biệt phạm vi giữa hai tên gọi không thống nhất giữa các nguồn. Bài trình bày dùng Data Loss Prevention và tập trung vào phòng chống rò rỉ dữ liệu.

[click]
### Vấn đề, cơ chế và lợi ích

Quyền đọc và quyền chia sẻ cần được xem xét riêng. Một người dùng có thể được phép đọc dữ liệu để phân tích nhưng không được phép gửi bản kết quả đến mọi nơi nhận. DLP bổ sung việc đánh giá nội dung cùng người thực hiện, hành động và đích theo policy.

Policy có thể quyết định cảnh báo, cho phép hoặc chặn tùy cấu hình. Enforcement phụ thuộc vào sản phẩm và các đường dữ liệu đã tích hợp; phát hiện dữ liệu nhạy cảm không đồng nghĩa với tự động chặn mọi lần export.

DLP tập trung kiểm soát việc sử dụng và tiết lộ dữ liệu nhạy cảm trái policy. Bảo vệ dữ liệu toàn diện còn cần backup và disaster recovery để khôi phục khi dữ liệu bị mất, hỏng hoặc mã hóa bởi ransomware. Trong một cuộc tấn công kết hợp đánh cắp và mã hóa dữ liệu, DLP có thể hỗ trợ hạn chế truyền dữ liệu trái phép trên các đường được kiểm soát, còn backup và recovery hỗ trợ khôi phục. Khôi phục được dữ liệu không đồng nghĩa với việc thu hồi được bản đã bị đánh cắp.

Nguồn tham khảo: [NIST — Data Loss Prevention](https://csrc.nist.gov/glossary/term/data_loss_prevention); [NIST — Firewall](https://csrc.nist.gov/glossary/term/firewall); [NIST SP 800-83 Rev. 1, Guide to Malware Incident Prevention and Handling for Desktops and Laptops](https://csrc.nist.gov/pubs/sp/800/83/r1/final); [Microsoft — Prepare for ransomware attacks with a backup and recovery plan](https://learn.microsoft.com/en-us/security/ransomware/protect-against-ransomware-phase1); [Alneyadi et al. (2016), “A survey on data leakage prevention systems”](https://doi.org/10.1016/j.jnca.2016.01.008).
-->
