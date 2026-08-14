---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Vì sao chọn DuckDB cho phần triển khai?

<div class="why mt-6">
  <div v-click="1"><b>1</b><span>DuckDB là <b>embedded / in-process analytical database</b> — chạy ngay trong application process, không cần server riêng nên dựng demo nhanh.</span></div>
  <div v-click="2"><b>2</b><span>Có sẵn SQL primitives để mô hình hóa masking: <code>CASE</code>, <code>concat</code>, <code>regexp</code>, macro, view.</span></div>
  <div v-click="3"><b>3</b><span>Quan trọng nhất, nó cho thấy rõ ranh giới giữa <b>masking logic</b> (trong SQL) và <b>lớp enforcement</b> (ai được thấy dữ liệu thật).</span></div>
</div>

<div v-click="4" class="mt-6 rounded-lg border border-cyan-300/35 bg-cyan-500/8 p-4 text-center text-lg transition-box">
Từ phần khái niệm, giờ mình chuyển sang phần triển khai cụ thể với DuckDB.
</div>

<div v-click="5" class="mt-4 text-center text-[#2efab0] handoff-box">
Mời bạn <b>Trần Huy Vũ</b> trình bày section 3: <b>Dynamic Data Masking in DuckDB</b>.
</div>

<style scoped>
.why { display:grid; gap:.8rem; grid-auto-rows:min-content; align-content:start; min-height:9.6rem; }
.why > div { display:grid; grid-template-columns:2rem 1fr; gap:.8rem; align-items:start; padding:.85rem 1rem; border-left:4px solid #88ffff; background:rgba(255,255,255,.045); }
.why b { color:#88ffff; font-size:1rem; line-height:1.4; }
.why span { font-size:.83rem; line-height:1.35; opacity:.82; }
.transition-box { min-height:3.4rem; }
.handoff-box { min-height:1.9rem; }
</style>

<!--
[NOTE NHẮC BÀI — Slide 4/4: Chuyển sang DuckDB] (~40s) — đọc ở chế độ Presenter

Slide bản lề: chốt phần khái niệm của mình + bàn giao cho section 3. Có 5 CLICK = 5 ý, đừng bấm dồn.

[MỞ — khi tiêu đề hiện]
"Về mặt khái niệm thì dynamic masking khá rõ. Câu hỏi tiếp theo là: triển khai thế nào cho bối cảnh thực tế của nhóm?"

[CLICK 1] "Nhóm chọn DuckDB vì nó là embedded, in-process analytical database — chạy ngay trong application process, không cần dựng server riêng, nên rất nhanh để làm demo."

[CLICK 2] "Lý do thứ hai: DuckDB có sẵn các SQL primitives để mình mô hình hóa masking — như CASE, concat, regexp, rồi macro và view."

[CLICK 3 — nhấn giọng] "Và quan trọng nhất: nó cho mình thấy rõ ranh giới giữa masking logic viết trong SQL và lớp enforcement — tức ai thực sự được quyền thấy dữ liệu thật."

[CLICK 4 — đọc chậm, tạo nhịp] "Vậy là xong phần khái niệm. Giờ mình chuyển sang phần triển khai cụ thể với DuckDB."

[CLICK 5 — quay sang mời speaker kế tiếp, dứt khoát] "Mình xin mời bạn Trần Huy Vũ trình bày section 3 — Dynamic Data Masking in DuckDB. Cảm ơn mọi người."

NHẮC:
- Đừng thêm nội dung kỹ thuật MỚI ở slide này — chỉ chốt + mở đường.
- Nếu hụt giờ: chỉ nói ý 1 + ý 3 rồi qua thẳng câu bàn giao (CLICK 5).
- Kết bằng ánh mắt/cử chỉ mời người kế tiếp, KHÔNG bỏ lửng câu.
-->

