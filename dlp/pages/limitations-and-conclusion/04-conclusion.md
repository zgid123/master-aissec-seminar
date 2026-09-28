---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Kết luận

<PipelineFlow focus="export" outcome="block" compact />

<div v-click="2" class="mt-3 grid grid-cols-3 gap-5 pl-5 [&_svg.absolute_path]:opacity-10">
  <VertCard step="01" title="Phát hiện" color="#b45309" card-bg="#fffbeb" :dots="false" class="h-[215px] w-full">
    <template #description>
      <VertCardContent class="!px-0 !text-[15px] !leading-[1.38] !text-slate-800 !opacity-100">
        <b>Rule - Fingerprint - AI/ML</b> nhận diện dữ liệu nhạy cảm, kể cả trên dữ liệu dẫn xuất.
      </VertCardContent>
    </template>
  </VertCard>

  <VertCard step="02" title="Chính sách" color="#0369a1" card-bg="#f0f9ff" :dots="false" class="h-[215px] w-full">
    <template #description>
      <VertCardContent class="!px-0 !text-[15px] !leading-[1.38] !text-slate-800 !opacity-100">
        Xét đủ <b>nhãn, người dùng, hành động, đích đến</b> rồi mới quyết định cho phép hay chặn.
      </VertCardContent>
    </template>
  </VertCard>

  <VertCard step="03" title="Thực thi" color="#be123c" card-bg="#fff1f2" :dots="false" class="h-[215px] w-full">
    <template #description>
      <VertCardContent class="!px-0 !text-[15px] !leading-[1.38] !text-slate-800 !opacity-100">
        Chỉ chặn được ở <b>egress path đã tích hợp DLP</b>; đường chưa tích hợp thì không tự động bị chặn.
      </VertCardContent>
    </template>
  </VertCard>
</div>

<div v-click="3" class="con-chips">
  <span class="con-chip">Bổ sung cho phân quyền và mã hóa, không thay thế</span>
  <span class="con-chip">Phân loại cả dữ liệu dẫn xuất</span>
  <span class="con-chip">Cần đo FP/FN - độ trễ - độ bao phủ</span>
</div>

<div v-click="4" class="con-punch">Quyền đọc hợp lệ ≠ quyền gửi đi bất cứ đâu.</div>

<div class="absolute bottom-2.5 left-12 right-12 text-[11px] text-slate-400">
  DLP = Data Loss Prevention (NIST, Microsoft, Google); tài liệu học thuật thường viết Data Leakage Prevention. Egress path = đường để dữ liệu rời khỏi hệ thống.
</div>

<style scoped>
.con-chips { margin-top: 10px; display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
.con-chip { padding: 4px 13px; border: 1px solid #dbe5ee; border-radius: 999px; background: #f8fafc; color: #18334f; font-size: 12px; font-weight: 600; }
.con-punch { margin-top: 8px; color: #0e6175; font-size: 20px; font-weight: 700; line-height: 1.2; text-align: center; }
</style>

<!--
Mục tiêu: quay lại tình huống mở đầu và chốt thông điệp chính của bài.

Thời lượng: khoảng 55 giây.

Thưa thầy cô và các bạn, xin quay lại tình huống ở đầu bài.
Một chuyên viên dữ liệu có quyền đọc hợp lệ. Nhưng bảng customer_segments do pipeline tạo ra vẫn chứa mã khách hàng và email.

[click:2]
Để xử lý tình huống đó, DLP làm ba việc.
Một là phát hiện dữ liệu nhạy cảm, bằng rule, fingerprint hoặc AI và học máy, kể cả trên dữ liệu dẫn xuất.
Hai là xét chính sách. Ta xét đủ nhãn, người dùng, hành động và đích đến, rồi mới quyết định cho phép hay chặn.
Ba là thực thi. Ở bước này cần lưu ý: DLP chỉ chặn được ở những egress path đã tích hợp. Đường nào chưa tích hợp thì không tự động bị chặn.

[click:3]
Nhóm em xin gửi lại ba ý chính.
Thứ nhất, DLP bổ sung cho phân quyền và mã hóa, chứ không thay thế chúng.
Thứ hai, với Big Data, ta phải phân loại cả dữ liệu dẫn xuất, không chỉ dữ liệu gốc.
Thứ ba, DLP giảm rủi ro chứ không loại bỏ rủi ro. Vì vậy cần đo báo nhầm và bỏ sót, độ trễ, và độ bao phủ.
Xin nhắc lại: prototype của nhóm em chạy trên một máy, với dữ liệu tổng hợp, và chỉ chứng minh một điểm chặn. Đây chưa phải một hệ thống DLP hoàn chỉnh.

[click:4]
Câu chốt của nhóm em là: có quyền đọc hợp lệ không có nghĩa là được gửi dữ liệu đi bất cứ đâu.
Xin cảm ơn thầy cô và các bạn đã lắng nghe.
Slide tiếp theo là danh mục tài liệu tham khảo. Nhóm em sẵn sàng nhận câu hỏi.
-->
