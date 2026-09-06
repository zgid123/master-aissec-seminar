---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# DDM trong DiD

<div class="layers mt-3">
  <ChevronCard
    v-click="1"
    class="transition-opacity duration-300 delay-[0ms]"
    :animation="false"
    :height="140"
    :chevron-width="62"
    :notch-depth="12"
    :border-radius="8"
    step="01"
    color="#3b82f6"
  >
    <ChevronCardHeading>Identity &amp; Access</ChevronCardHeading>
    <ChevronCardContent>
      <span>Quyết định quyền trên row và column.</span>
      <b class="techniques">MFA · RBAC · least privilege · RLS/CLS</b>
    </ChevronCardContent>
  </ChevronCard>

  <ChevronCard
    v-click="1"
    class="transition-opacity duration-300 delay-[120ms]"
    :animation="false"
    :height="140"
    :chevron-width="62"
    :notch-depth="12"
    :border-radius="8"
    step="02"
    color="#06b6d4"
  >
    <ChevronCardHeading>Application Path</ChevronCardHeading>
    <ChevronCardContent>
      <span>Chặn client chọn role, SQL hoặc đọc raw storage.</span>
      <b class="techniques">Fixed query · backend-only · file permission</b>
    </ChevronCardContent>
  </ChevronCard>

  <ChevronCard
    v-click="1"
    class="ddm transition-opacity duration-300 delay-[240ms]"
    :animation="false"
    :height="140"
    :chevron-width="62"
    :notch-depth="12"
    :border-radius="8"
    step="03"
    color="#10b981"
    card-bg="#e3f8f0"
  >
    <ChevronCardHeading>Query Output</ChevronCardHeading>
    <ChevronCardContent>
      <span>Giảm dữ liệu nhạy cảm trong UI, report và support.</span>
      <b class="techniques">DDM</b>
    </ChevronCardContent>
  </ChevronCard>

  <ChevronCard
    v-click="1"
    class="transition-opacity duration-300 delay-[360ms]"
    :animation="false"
    :height="140"
    :chevron-width="62"
    :notch-depth="12"
    :border-radius="8"
    step="04"
    color="#7c3aed"
  >
    <ChevronCardHeading>Encryption</ChevronCardHeading>
    <ChevronCardContent>
      <span>Bảo vệ dữ liệu khi truyền, lưu trữ và backup.</span>
      <b class="techniques">TLS · TDE · KMS</b>
    </ChevronCardContent>
  </ChevronCard>

  <ChevronCard
    v-click="1"
    class="transition-opacity duration-300 delay-[480ms]"
    :animation="false"
    :height="140"
    :chevron-width="62"
    :notch-depth="12"
    :border-radius="8"
    step="05"
    color="#f59e0b"
  >
    <ChevronCardHeading>Data Copies &amp; Sharing</ChevronCardHeading>
    <ChevronCardContent>
      <span>Không dùng dữ liệu thật cho test hoặc chia sẻ.</span>
      <b class="techniques">SDM · tokenization · synthetic data</b>
    </ChevronCardContent>
  </ChevronCard>

  <ChevronCard
    v-click="1"
    class="transition-opacity duration-300 delay-[600ms]"
    :animation="false"
    :height="140"
    :chevron-width="62"
    :notch-depth="12"
    :border-radius="8"
    step="06"
    color="#ef4444"
  >
    <ChevronCardHeading>Detection &amp; Response</ChevronCardHeading>
    <ChevronCardContent>
      <span>Phát hiện truy vấn lạ, export lớn và lạm quyền.</span>
      <b class="techniques">Audit · DAM · alert · DLP</b>
    </ChevronCardContent>
  </ChevronCard>
</div>

<div
  v-click="2"
  class="roles mt-2 transition-opacity duration-300"
>
  <span><b>Access Control</b> chặn hành động</span>
  <span><b>Encryption/TDE</b> bảo vệ bản lưu</span>
  <span><b>DDM</b> giảm phơi lộ</span>
  <span><b>Audit</b> phát hiện lạm dụng</span>
</div>

<style scoped>
.layers {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.45rem 0.6rem;
}

.layers :deep(.alpha-chevron-card) {
  height: 140px;
}

.layers :deep(.alpha-chevron-card-heading) {
  font-size: 18px !important;
}

.layers :deep(.alpha-chevron-card-content) {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.layers :deep(.techniques) {
  display: block;
  margin-top: auto;
  padding-top: 0.3rem;
  color: #334155;
  font-size: 0.68rem;
  line-height: 1.2;
}

.layers :deep(.alpha-chevron-card > div:last-child) {
  justify-content: flex-start;
  padding-top: 0.55rem;
  padding-right: 0.65rem;
  padding-bottom: 0.55rem;
}

.roles {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.55rem;
}

.roles span {
  padding: 0.55rem 0.6rem;
  background: rgba(255, 255, 255, 0.055);
  text-align: center;
  font-size: 20px;
  line-height: 1.2;
}

.roles b {
  display: block;
  margin-bottom: 0.08rem;
  color: #0b7658;
}
</style>

<!--
Ở phần tổng quan, chúng ta đã giới thiệu Defense-in-Depth, hay DiD. Slide này đặt DDM vào mô hình đó để đánh giá đúng phạm vi bảo vệ của nó.

[CLICK] Trong triển khai thực tế, sáu lớp xử lý sáu nhóm rủi ro khác nhau.

Identity và Access dùng MFA, RBAC, least privilege, RLS hoặc CLS để quyết định người dùng được thao tác trên dữ liệu nào.

Application Path giữ việc xác thực role, lựa chọn query và truy cập raw storage ở phía backend. Lớp này đặc biệt quan trọng với DuckDB vì database chạy embedded trong ứng dụng.

DDM nằm ở Query Output. Nó giảm dữ liệu nhạy cảm xuất hiện trong UI, report và support workflow, nhưng không tự ngăn truy cập vào dữ liệu gốc.

Encryption bảo vệ một phạm vi khác: TLS bảo vệ dữ liệu khi truyền; TDE hoặc storage encryption bảo vệ data file và backup khi lưu trữ; KMS quản lý vòng đời khóa.

Với Data Copies và Sharing, ưu tiên SDM, tokenization hoặc synthetic data để không đưa dữ liệu thật sang test, analytics hoặc đối tác khi không cần thiết.

Cuối cùng, Audit, Database Activity Monitoring, alert và DLP phát hiện query bất thường, export lớn và hành vi lạm dụng quyền.

[CLICK] Có thể ghi nhớ vai trò của các control bằng bốn ý: Access Control chặn hành động; Encryption và TDE bảo vệ dữ liệu khi truyền hoặc lưu trữ; DDM giảm phơi lộ ở output; Audit phát hiện lạm dụng.

Vì vậy, DDM là một lớp cần thiết trong DiD, nhưng không thay thế các lớp còn lại. Thiếu bất kỳ lớp nào cũng để lại một nhóm rủi ro chưa được xử lý.

[Sources]
- https://learn.microsoft.com/en-us/sql/relational-databases/security/dynamic-data-masking
- https://docs.oracle.com/en/database/oracle/oracle-database/26/dbred/admin-faq.html
- https://docs.oracle.com/en/database/oracle/oracle-database/26/dbred/oracle-data-redaction-and-other-oracle-products-faqs.html
[/Sources]
-->
