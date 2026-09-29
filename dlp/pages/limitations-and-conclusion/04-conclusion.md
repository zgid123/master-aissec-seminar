---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Kết luận

<PipelineFlow focus="export" outcome="block" compact />

<div v-click="2" class="mt-2 grid grid-cols-3 gap-5 pl-5 [&_svg.absolute_path]:opacity-10">
  <VertCard step="01" title="Phát hiện" color="#b45309" card-bg="#fffbeb" :dots="false" class="h-[158px] w-full">
    <template #description>
      <VertCardContent class="!px-0 !text-[13.5px] !leading-[1.35] !text-slate-800 !opacity-100">
        <b>Rule - Fingerprint - AI/ML</b> nhận diện dữ liệu nhạy cảm, kể cả trên dữ liệu dẫn xuất.
      </VertCardContent>
    </template>
  </VertCard>

  <VertCard step="02" title="Chính sách" color="#0369a1" card-bg="#f0f9ff" :dots="false" class="h-[158px] w-full">
    <template #description>
      <VertCardContent class="!px-0 !text-[13.5px] !leading-[1.35] !text-slate-800 !opacity-100">
        Xét đủ <b>nhãn, người dùng, hành động, đích đến</b> rồi mới quyết định cho phép hay chặn.
      </VertCardContent>
    </template>
  </VertCard>

  <VertCard step="03" title="Thực thi" color="#be123c" card-bg="#fff1f2" :dots="false" class="h-[158px] w-full">
    <template #description>
      <VertCardContent class="!px-0 !text-[13.5px] !leading-[1.35] !text-slate-800 !opacity-100">
        Chỉ chặn được ở <b>egress path đã tích hợp DLP</b>; đường chưa tích hợp thì không tự động bị chặn.
      </VertCardContent>
    </template>
  </VertCard>
</div>

<div v-click="3" class="con-chips">
  <span class="con-chip">Bổ sung cho phân quyền và mã hóa, không thay thế</span>
  <span class="con-chip">Phân loại cả dữ liệu dẫn xuất</span>
  <span class="con-chip">Cần đo FP/FN - độ trễ - độ bao phủ</span>
  <span class="con-chip con-chip--scope">Prototype: 1 máy · dữ liệu tổng hợp · 1 điểm chặn</span>
</div>

<div v-click="4" class="con-punch">Quyền đọc hợp lệ ≠ quyền gửi đi bất cứ đâu.</div>


<style scoped>
:deep(h1) {
  margin-top: 0 !important;
  margin-bottom: 4px !important;
  font-size: 27px !important;
  line-height: 1.2 !important;
}
.con-chips { margin-top: 6px; display: flex; flex-wrap: wrap; justify-content: center; gap: 4px 6px; }
.con-chip { padding: 3px 11px; border: 1px solid #dbe5ee; border-radius: 999px; background: #f8fafc; color: #18334f; font-size: 11px; font-weight: 600; line-height: 1.3; }
.con-chip--scope { border-color: #f3d9a4; background: #fffbeb; color: #b45309; }
.con-punch { margin-top: 6px; color: #0e6175; font-size: 17px; font-weight: 700; line-height: 1.2; text-align: center; }

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
  margin-top: 16px !important;
}
</style>

<!--
Mục tiêu: quay lại tình huống mở đầu và chốt thông điệp chính của bài.

Xin quay lại tình huống ở đầu bài.
Một chuyên viên dữ liệu có quyền đọc hợp lệ, nhưng bảng customer_segments do pipeline tạo ra vẫn chứa mã khách hàng, email và số điện thoại.

[click:2]
Để xử lý tình huống đó, DLP làm ba việc.
Một, phát hiện bằng rule, fingerprint hoặc AI và học máy, kể cả trên dữ liệu dẫn xuất.
Hai, xét chính sách: đủ nhãn, người dùng, hành động và đích đến rồi mới quyết định.
Ba, thực thi: chỉ chặn được ở egress path đã tích hợp; đường chưa tích hợp thì không tự động bị chặn.

[click:3]
Ba ý chính: DLP bổ sung cho phân quyền và mã hóa, không thay thế; với Big Data phải phân loại cả dữ liệu dẫn xuất; và DLP giảm rủi ro chứ không loại bỏ, nên cần đo báo nhầm và bỏ sót, độ trễ, độ bao phủ.
Xin nhắc lại: prototype của nhóm em chạy trên một máy, với dữ liệu tổng hợp, và chỉ minh họa một điểm chặn. Đây chưa phải hệ thống DLP hoàn chỉnh.

[click:4]
Câu chốt của nhóm em: có quyền đọc hợp lệ không có nghĩa là được gửi dữ liệu đi bất cứ đâu.
Xin cảm ơn thầy cô và các bạn đã lắng nghe.
Slide tiếp theo là danh mục tài liệu tham khảo, và nhóm em sẵn sàng nhận câu hỏi.
-->
