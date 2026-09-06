---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Kiểm chứng: mỗi role thấy dữ liệu khác nhau

Đăng nhập 4 vai trò và so sánh record <code>#0000001</code> trên danh sách.

<div class="role-grid mt-4" v-click="2">
  <div>
    <ChevronCard step="01" color="#0b7658" text-color="#475569" :chevron-width="100">
      <ChevronCardHeading>Manager <span class="technique">· Raw baseline</span></ChevronCardHeading>
      <ChevronCardContent>
        Email, điện thoại, địa chỉ và CCCD giữ nguyên.<br />
        <code>an.nguyen0000000@example.com</code>
      </ChevronCardContent>
    </ChevronCard>
  </div>
  <div>
    <ChevronCard step="02" color="#b7791f" text-color="#475569" :chevron-width="100">
      <ChevronCardHeading>Support <span class="technique">· Partial + full mask</span></ChevronCardHeading>
      <ChevronCardContent>
        Email chỉ lộ phần nhận diện; trường còn lại bị che.<br />
        <code>a***@example.com · ************</code>
      </ChevronCardContent>
    </ChevronCard>
  </div>
  <div>
    <ChevronCard step="03" color="#7c3aed" text-color="#475569" :chevron-width="100">
      <ChevronCardHeading>Tester <span class="technique">· Substitution</span></ChevronCardHeading>
      <ChevronCardContent>
        Dữ liệu giả đúng định dạng để ứng dụng vẫn hoạt động.<br />
        <code>tester+0000001@example.test</code>
      </ChevronCardContent>
    </ChevronCard>
  </div>
  <div>
    <ChevronCard step="04" color="#168793" text-color="#475569" :chevron-width="100">
      <ChevronCardHeading>BI <span class="technique">· Stable hash</span></ChevronCardHeading>
      <ChevronCardContent>
        Mỗi định danh thành hash 12 ký tự, vẫn đếm và join được.<br />
        <code>left(sha256(value), 12)</code>
      </ChevronCardContent>
    </ChevronCard>
  </div>
</div>

<div class="demo-contract mt-4" v-click="3">
  <b>Cùng record</b>
  <i>→</i>
  <span><code>viewer_role</code> thay đổi</span>
  <i>→</i>
  <strong>bốn output khác nhau</strong>
</div>

<style scoped>
.role-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  gap: 0.75rem;
}

.role-grid > div,
.role-grid :deep(.alpha-chevron-card) {
  height: 100%;
}

.technique {
  font-size: 14px;
}

.demo-contract {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-right: 8rem;
  padding: 0.68rem 0.9rem;
  border-left: 4px solid #38edf6;
  background: rgba(56, 237, 246, 0.08);
}

.demo-contract b {
  color: #475569;
}

.demo-contract i {
  color: #64748b;
  font-style: normal;
}

.demo-contract strong {
  color: #0b7658;
}
</style>

<!--
Demo command:
cd demo && pnpm dev

[CLICK] Ba bước triển khai đã hoàn tất: định nghĩa mức che, chọn policy và bind role đã xác thực. Bây giờ giữ nguyên record #0000001, chỉ thay đổi role đăng nhập để kiểm chứng dữ liệu trả về có thay đổi đúng policy hay không.

[CLICK] Hiện đồng thời bốn kết quả cần kiểm chứng. Manager là baseline với dữ liệu gốc. Support thấy email dạng a***@example.com và các trường còn lại bị che toàn bộ. Tester nhận dữ liệu giả đúng định dạng, như tester+0000001@example.test và 0900000000. BI nhận hash ổn định dài 12 ký tự để vẫn có thể đếm và join. Thực hiện lần lượt 4 lần đăng nhập trong ứng dụng và so sánh cùng record #0000001 trên danh sách.

[CLICK] Hiện contract và chốt: cùng một record trong bảng users, identity đã xác thực được bind vào viewer_role, rồi DuckDB trả bốn output khác nhau tại query time. Dữ liệu lưu trữ không bị sửa. Nếu còn thời gian, dùng export theo môi trường và mở trực tiếp file DuckDB để minh họa policy reuse cùng trust boundary.
-->
