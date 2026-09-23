---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Phòng thủ nhiều lớp (Defense-in-depth - DiD)

Nhiều lớp bảo vệ độc lập cùng <b>ngăn chặn</b>, <b>giới hạn</b>, <b>phát hiện</b> và <b>phục hồi</b> khi có sự cố.

<div class="mt-2 grid h-fit grid-cols-2 grid-rows-2 content-start gap-x-[0.9rem] gap-y-2">
  <ChevronCard
    v-click="2"
    :animation="false"
    class="transition-opacity duration-300 delay-[0ms]"
    step="01"
    color="#3b82f6"
  >
    <ChevronCardHeading>Danh tính &amp; truy cập</ChevronCardHeading>
    <ChevronCardContent>
      Xác minh danh tính và giới hạn dữ liệu, thao tác được phép.
      <b class="mt-[0.35rem] block text-[0.875rem]">Authentication · MFA · Authorization · RBAC · RLS</b>
    </ChevronCardContent>
  </ChevronCard>
  <ChevronCard
    v-click="2"
    :animation="false"
    class="transition-opacity duration-300 delay-[160ms]"
    step="02"
    color="#06b6d4"
  >
    <ChevronCardHeading>Mã hóa &amp; che dữ liệu</ChevronCardHeading>
    <ChevronCardContent>
      Bảo vệ dữ liệu khi lưu, truyền và hiển thị.
      <b class="mt-[0.35rem] block text-[0.875rem]">Encryption · TDE · TLS · Data Masking · Redaction</b>
    </ChevronCardContent>
  </ChevronCard>
  <ChevronCard
    v-click="2"
    :animation="false"
    class="transition-opacity duration-300 delay-[320ms]"
    step="03"
    color="#f97316"
  >
    <ChevronCardHeading>Giám sát</ChevronCardHeading>
    <ChevronCardContent>
      Phát hiện và truy vết hành vi bất thường.
      <b class="mt-[0.35rem] block text-[0.875rem]">Auditing · Logging · DLP</b>
    </ChevronCardContent>
  </ChevronCard>
  <ChevronCard
    v-click="2"
    :animation="false"
    class="transition-opacity duration-300 delay-[480ms]"
    step="04"
    color="#ef4444"
  >
    <ChevronCardHeading>Phục hồi</ChevronCardHeading>
    <ChevronCardContent>
      Khôi phục dữ liệu và dịch vụ sau sự cố.
      <b class="mt-[0.35rem] block text-[0.875rem]">Backup · Disaster Recovery</b>
    </ChevronCardContent>
  </ChevronCard>
</div>

<!--
[click] Nguyên tắc này không đặt toàn bộ niềm tin vào một cơ chế bảo mật duy nhất. Nếu một lớp bị vượt qua hoặc cấu hình sai, các lớp còn lại vẫn giúp ngăn chặn, giới hạn thiệt hại, phát hiện và phục hồi sau sự cố.

[click] Sáu lớp được nhóm thành bốn khối.
**Danh tính và truy cập** xác minh người dùng rồi giới hạn dữ liệu và thao tác được phép.

**Mã hóa và che dữ liệu** bảo vệ dữ liệu khi lưu trữ, truyền tải và hiển thị.

**Giám sát** phát hiện, ghi nhận và truy vết hành vi bất thường.

**Phục hồi** khôi phục dữ liệu và dịch vụ sau sự cố.
-->
