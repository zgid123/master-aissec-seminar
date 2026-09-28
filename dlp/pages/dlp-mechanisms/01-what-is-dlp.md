---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# DLP là gì?

Data Loss Prevention (DLP){.font-bold} nhận diện dữ liệu nhạy cảm và áp dụng policy để kiểm soát việc sử dụng, chia sẻ hoặc xuất dữ liệu.

<div v-click="2" class="mt-6 grid grid-cols-3 gap-5 pl-5 [&_svg.absolute_path]:opacity-10">
  <VertCard step="01" title="Vấn đề" color="#b45309" card-bg="#fffbeb" :dots="false" class="h-[220px] w-full">
    <template #description>
      <VertCardContent class="!px-0 !text-[16px] !leading-[1.35] !text-slate-800 !opacity-100">
        Quyền đọc hợp lệ không quyết định file có được gửi tới mọi đích hay không.
      </VertCardContent>
    </template>
  </VertCard>

  <VertCard step="02" title="DLP xử lý" color="#0369a1" card-bg="#f0f9ff" :dots="false" class="h-[220px] w-full">
    <template #description>
      <VertCardContent class="!px-0 !text-[16px] !leading-[1.35] !text-slate-800 !opacity-100">
        Nhận diện nội dung nhạy cảm và xét hành động, nơi nhận theo policy.
      </VertCardContent>
    </template>
  </VertCard>

  <VertCard step="03" title="Lợi ích" color="#047857" card-bg="#ecfdf5" :dots="false" class="h-[220px] w-full">
    <template #description>
      <VertCardContent class="!px-0 !text-[16px] !leading-[1.35] !text-slate-800 !opacity-100">
        Giảm nguy cơ gửi dữ liệu sai đích tại đường đã tích hợp kiểm soát; ghi lại quyết định.
      </VertCardContent>
    </template>
  </VertCard>
</div>

<!--
- DLP nhận diện dữ liệu nhạy cảm và dùng policy để kiểm soát việc sử dụng, chia sẻ hoặc xuất.

[click:2]
- Quyền đọc không đồng nghĩa với quyền gửi file tới mọi đích.
- DLP xét nội dung, hành động và nơi nhận theo policy; kết quả có thể là cho phép, cảnh báo hoặc chặn.
- Có thể nhắc ngắn tình huống mở đầu: một file được gửi tới dịch vụ bên ngoài chưa được duyệt.
-->
