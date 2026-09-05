---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Tại sao cần bảo vệ cơ sở dữ liệu (CSDL)?

Một CSDL không chỉ là nơi lưu trữ thông tin - đó là <mark>hạ tầng dữ liệu cốt lõi</mark> phục vụ toàn bộ hoạt động của tổ chức.

<div class="mt-4 grid grid-cols-3 justify-between gap-3">
  <div v-click="2">
    <VertCard
      class="h-[18rem] w-full"
      variant="none"
      color="#0f9f8f"
      text-color="var(--alpha-academic-primary)"
      :dots="false"
    >
      <VertCardTitle>Hạ tầng dùng chung</VertCardTitle>
      <VertCardContent>
        CSDL phục vụ đồng thời nhiều người dùng và hệ thống, với các hoạt động đọc, ghi và cập nhật dữ liệu liên tục.
      </VertCardContent>
    </VertCard>
  </div>
  <div v-click="3">
    <VertCard
      class="h-[18rem] w-full"
      variant="none"
      color="#3b82f6"
      text-color="var(--alpha-academic-primary)"
      :dots="false"
    >
      <VertCardTitle>Tập trung dữ liệu giá trị</VertCardTitle>
      <VertCardContent>
        Thông tin khách hàng, giao dịch, hồ sơ, tài chính và nhiều dữ liệu vận hành khác đều tập trung trong CSDL.
      </VertCardContent>
    </VertCard>
  </div>
  <div v-click="4">
    <VertCard
      class="h-[18rem] w-full"
      variant="none"
      color="#e76832"
      text-color="var(--alpha-academic-primary)"
      :dots="false"
    >
      <VertCardTitle>Sự cố có thể lan rộng</VertCardTitle>
      <VertCardContent>
        Một lỗ hổng trong CSDL có thể dẫn đến việc dữ liệu của hàng loạt người dùng bị rò rỉ hoặc truy cập trái phép cùng lúc.
      </VertCardContent>
    </VertCard>
  </div>
</div>
