---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Ưu điểm của DLP

<p class="adv-intro">Access control trả lời “ai được đọc?”; DLP trả lời thêm “nội dung này được phép gửi đi đâu?”</p>

<div v-click="2" class="mt-3 grid grid-cols-4 gap-4 pl-4 [&_svg.absolute_path]:opacity-10">
  <VertCard step="01" title="Hiểu ngữ cảnh" color="#0369a1" card-bg="#f0f9ff" :dots="false" class="h-[164px] w-full">
    <template #description>
      <VertCardContent class="!px-0 !text-[13px] !leading-[1.35] !text-slate-800 !opacity-100">
        Xét <b>dữ liệu gì</b>, <b>ai gửi</b>, <b>gửi bằng cách nào</b>, <b>tới đâu</b>.
      </VertCardContent>
    </template>
  </VertCard>

  <VertCard step="02" title="3 trạng thái" color="#5b3aa2" card-bg="#f6f3ff" :dots="false" class="h-[164px] w-full">
    <template #description>
      <VertCardContent class="!px-0 !text-[13px] !leading-[1.35] !text-slate-800 !opacity-100">
        <b>In&nbsp;use - In&nbsp;motion - At&nbsp;rest</b>: máy người dùng, mạng, kho lưu trữ.
      </VertCardContent>
    </template>
  </VertCard>

  <VertCard step="03" title="Theo rủi ro" color="#b45309" card-bg="#fffbeb" :dots="false" class="h-[164px] w-full">
    <template #description>
      <VertCardContent class="!px-0 !text-[13px] !leading-[1.35] !text-slate-800 !opacity-100">
        Mức xử lý tăng dần: từ <b>ghi log</b> đến <b>chặn</b> hoặc <b>cách ly</b>.
      </VertCardContent>
    </template>
  </VertCard>

  <VertCard step="04" title="Kiểm toán" color="#047857" card-bg="#ecfdf5" :dots="false" class="h-[164px] w-full">
    <template #description>
      <VertCardContent class="!px-0 !text-[13px] !leading-[1.35] !text-slate-800 !opacity-100">
        Ghi lại mọi sự kiện (audit log) để <b>điều tra</b> và <b>chứng minh tuân thủ</b>.
      </VertCardContent>
    </template>
  </VertCard>
</div>

<div v-click="3" class="adv-scale">
  <div class="adv-scale-label">CÁC MỨC XỬ LÝ ĐIỂN HÌNH - VÍ DỤ MICROSOFT PURVIEW</div>
  <div class="adv-scale-flow">
    <div class="adv-scale-stage"><strong>Ghi log</strong><small>chỉ theo dõi</small></div>
    <span class="adv-scale-arrow">→</span>
    <div class="adv-scale-stage"><strong>Cảnh báo</strong><small>nhắc người dùng</small></div>
    <span class="adv-scale-arrow">→</span>
    <div class="adv-scale-stage"><strong>Chặn + override</strong><small>bỏ qua được, kèm lý do</small></div>
    <span class="adv-scale-arrow">→</span>
    <div class="adv-scale-stage"><strong>Chặn hẳn</strong><small>không cho bỏ qua</small></div>
    <span class="adv-scale-arrow">+</span>
    <div class="adv-scale-stage"><strong>Cách ly</strong><small>riêng cho dữ liệu đang lưu</small></div>
  </div>
</div>

<div v-click="4" class="adv-evidence">
  <b>Big Data:</b> quét rò rỉ phân tán là khả thi; prototype MapReduce/Hadoop đạt tối đa 225 Mbps trên 24 node EC2 (Liu et al., 2015) - mới là nghiên cứu, chưa phải sản phẩm.
</div>

<div v-click="5" class="adv-takeaway">DLP bổ sung cho phân quyền, mã hóa và masking, chứ không thay thế chúng.</div>

<style scoped>
:deep(h1) {
  margin-top: 0 !important;
  margin-bottom: 6px !important;
  font-size: 28px !important;
  line-height: 1.2 !important;
}
.adv-intro { margin: 4px 0 0; padding: 7px 12px; border-left: 3px solid #0ea5e9; border-radius: 5px; background: #f0f9ff; color: #18334f; font-size: 13px; line-height: 1.3; }
.adv-scale { margin-top: 8px; }
.adv-scale-label { margin-bottom: 4px; color: #415a72; font-size: 10.5px; font-weight: 800; letter-spacing: .045em; }
.adv-scale-flow { display: grid; grid-template-columns: 1fr 19px 1fr 19px 1.2fr 19px 1fr 19px 1fr; align-items: center; gap: 4px; }
.adv-scale-stage { min-height: 44px; padding: 5px 4px; border: 1px solid #dbe5ee; border-radius: 9px; background: #f8fafc; text-align: center; }
.adv-scale-stage strong { display: block; font-size: 11.5px; line-height: 1.2; color: #18334f; }
.adv-scale-stage small { display: block; margin-top: 2px; font-size: 9.5px; line-height: 1.2; color: #53677c; }
.adv-scale-arrow { color: #8296aa; font-size: 16px; text-align: center; }
.adv-evidence { margin-top: 6px; padding-left: 10px; border-left: 3px solid #0ea5e9; color: #1c5068; font-size: 11.5px; font-weight: 500; line-height: 1.32; }
.adv-evidence b { font-weight: 700; }
.adv-takeaway { margin-top: 6px; color: #0e6175; font-size: 15px; font-weight: 700; line-height: 1.2; text-align: center; }

:deep(.alpha-vert-card > div.absolute.z-10) {
  top: 16px !important;
}
:deep(.alpha-vert-card > div.relative) {
  padding-top: 16px !important;
  padding-bottom: 12px !important;
  justify-content: flex-start !important;
}
:deep(.alpha-vert-card .my-auto) {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  justify-content: flex-start !important;
}
:deep(.alpha-vert-card-title h3) {
  font-size: 16px !important;
  line-height: 1.25 !important;
}
:deep(.alpha-vert-card-title > div) {
  margin-top: 4px !important;
}
:deep(.alpha-vert-card-content) {
  margin-top: 18px !important;
}
</style>

<!--
Mục tiêu: cho thấy DLP trả lời thêm một câu hỏi mà phân quyền chưa trả lời được.

Thưa thầy cô và các bạn, trước hết xin phân biệt hai câu hỏi.
Phân quyền, hay access control, trả lời câu hỏi: ai được đọc dữ liệu?
Còn DLP trả lời thêm một câu hỏi nữa: nội dung này được phép gửi đi đâu?

[click:2]
Theo định nghĩa CNSSI 4009 trong bộ thuật ngữ của NIST, DLP xét cả nội dung lẫn ngữ cảnh: dữ liệu gì, ai gửi, gửi bằng cách nào, tới đâu.
DLP bao phủ ba trạng thái dữ liệu: đang dùng, đang truyền, đang lưu.
Mức xử lý tăng dần theo rủi ro, và mọi sự kiện được ghi lại để điều tra hoặc chứng minh tuân thủ.
(Tùy chọn, có trong repo demo nhưng không có trên slide demo:) Đây là mô tả khả năng của DLP nói chung. Prototype của nhóm em nhỏ hơn nhiều: chỉ có hai kết quả là cho phép hoặc chặn, và mỗi quyết định được ghi vào một file audit log dạng JSONL, chưa chống sửa đổi.

[click:3]
Microsoft Purview là ví dụ cụ thể: từ chỉ ghi log, đến cảnh báo, đến chặn nhưng cho bỏ qua nếu nêu lý do, rồi chặn hẳn.
Ngoài ra có hành động cách ly, riêng cho dữ liệu đang lưu.

[click:4]
Với Big Data, nhóm Liu năm 2015 cho thấy việc quét rò rỉ có thể chạy phân tán bằng MapReduce: prototype Hadoop trên 24 node đạt tối đa 225 megabit mỗi giây.
Đây mới là kết quả nghiên cứu, chưa phải sản phẩm, và bài toán của họ là đối chiếu nội dung với dữ liệu nhạy cảm đã biết, khác với quy trình A, B, C của nhóm em.

[click:5]
Điều cần nhớ: DLP bổ sung cho phân quyền, mã hóa và masking, tức là che dữ liệu, không thay thế chúng.
Nhưng DLP cũng không phải rào chắn tuyệt đối. Đó là nội dung của slide tiếp theo.

Nếu bị hỏi: 225 Mbps là đỉnh trên 24 node EC2 (cụm cục bộ 24 node đạt 215 Mbps); 225 Mbps ≈ 28 MB/s ≈ 2,4 TB/ngày (quy đổi thô, giả sử chạy liên tục) - đủ chứng minh tính khả thi, không phải con số cho hàng PB dữ liệu.

Tham khảo (không đọc):
- NIST CSRC Glossary: https://csrc.nist.gov/glossary/term/data_loss_prevention
- Microsoft Learn: https://learn.microsoft.com/purview/dlp-learn-about-dlp
- Liu et al. (2015): https://vtechworks.lib.vt.edu/items/2652b4c0-305d-4b03-b463-e16d1cd8ad4e
- Herrera Montano et al. (2022): https://doi.org/10.1007/s10586-022-03668-2
-->
