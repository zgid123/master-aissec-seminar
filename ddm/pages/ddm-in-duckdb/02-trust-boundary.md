---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Trust boundary nằm ở đâu?

<mark>Trust boundary nằm tại Application/API</mark>: nơi request từ client được chuyển thành identity, role và query đã được hệ thống xác minh.

<div class="trust-flow mt-2">
  <div v-click="2">
    <VertCard
      class="flow-card"
      variant="none"
      color="#9f2633"
      :dots="false"
      text-color="var(--alpha-academic-primary)"
      :has-divider="false"
    >
      <VertCardTitle>
        <span class="text-[14px]">01 · KHÔNG TIN CẬY</span>
        <br />
        Request từ client
      </VertCardTitle>
      <VertCardContent>Không tin token, input, role hoặc câu SQL do client tự cung cấp.</VertCardContent>
    </VertCard>
  </div>
  <strong class="flow-arrow" v-click="2">→</strong>
  <div v-click="2">
    <VertCard
      class="flow-card"
      variant="none"
      color="#20c997"
      text-color="var(--alpha-academic-primary)"
      :dots="false"
      :has-divider="false"
    >
      <VertCardTitle>
        <span class="text-[14px]">02 · TRUST BOUNDARY</span>
        <br />
        Application / API
      </VertCardTitle>
      <VertCardContent>Xác thực identity, ánh xạ role phía server, kiểm tra input và chọn query tham số hóa.</VertCardContent>
    </VertCard>
  </div>
  <strong class="flow-arrow" v-click="2">→</strong>
  <div v-click="2">
    <VertCard
      class="flow-card"
      variant="none"
      color="#38bfc8"
      text-color="var(--alpha-academic-primary)"
      :dots="false"
      :has-divider="false"
    >
      <VertCardTitle>
        <span class="text-[14px]">03 · ĐƯỢC KIỂM SOÁT</span>
        <br />
        DuckDB + storage
      </VertCardTitle>
      <VertCardContent>Chỉ nhận context đã xác minh; file <code>.duckdb</code> chỉ service account được đọc.</VertCardContent>
    </VertCard>
  </div>
</div>

<ChevronCard
  v-click="3"
  class="bypass mt-3"
  :animation="false"
  :height="62"
  :chevron-width="66"
  :notch-depth="12"
  :border-radius="8"
  step="!"
  color="#d94b59"
>
  <ChevronCardHeading class="normal-case tracking-normal">Đường bypass</ChevronCardHeading>
  <ChevronCardContent>Raw SQL hoặc mở trực tiếp file <code>.duckdb</code> sẽ bỏ qua application policy và có thể trả dữ liệu gốc.</ChevronCardContent>
</ChevronCard>

<style scoped>
.trust-flow {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1.08fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 0.55rem;
}

.flow-card :deep(.relative.z-10) {
  padding: 1.1rem 1rem;
}


.flow-arrow {
  color: #64748b;
  font-size: 1.4rem;
}

</style>

<!--
Slide trước cho thấy DuckDB chạy bên trong ứng dụng. Vì vậy, câu hỏi tiếp theo là: ranh giới tin cậy thực sự nằm ở đâu?

[CLICK] Trust boundary không nằm trong macro của DuckDB. Nó nằm tại điểm request đi vào Application hoặc API, nơi dữ liệu do client kiểm soát được chuyển thành identity, role và query do hệ thống xác minh.

[CLICK] Sơ đồ có ba vùng. Bên trái là client không tin cậy: token có thể không hợp lệ, input có thể chứa payload nguy hiểm và client có thể tự khai báo role hoặc SQL. Ở giữa, Application hoặc API xác thực identity, ánh xạ role phía server, kiểm tra input và chọn query tham số hóa. Bên phải, DuckDB chỉ nhận context đã xác minh để tạo masked output; file `.duckdb` phải được hệ điều hành giới hạn cho service account của backend.

[CLICK] Nếu người dùng có thể gửi raw SQL hoặc mở trực tiếp file database, họ đã đi vòng qua application policy và có thể đọc dữ liệu gốc. Vì vậy Application phải kiểm soát identity và query, còn hệ điều hành phải kiểm soát file. Macro chỉ biến đổi output; tự nó không tạo ra trust boundary.

[Sources]
- https://duckdb.org/docs/current/operations_manual/securing_duckdb/overview
- https://duckdb.org/docs/current/operations_manual/securing_duckdb/embedding_duckdb
[/Sources]
-->
