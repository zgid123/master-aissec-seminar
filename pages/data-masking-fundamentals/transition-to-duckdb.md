---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Vì sao nhóm chốt DuckDB cho phần triển khai?

<div class="why mt-6">
  <div v-click><b>1</b><span>Từ các hướng AI gợi ý ban đầu, nhóm chốt DuckDB vì dễ bám đúng mục tiêu seminar.</span></div>
  <div v-click><b>2</b><span>Có sẵn SQL primitives để thử nghiệm masking: <code>CASE</code>, <code>concat</code>, <code>regexp</code>, macro, view.</span></div>
  <div v-click><b>3</b><span>Quan trọng nhất, nó giúp mình nhìn rõ ranh giới giữa masking logic và lớp enforcement.</span></div>
</div>

<div v-click class="mt-6 rounded-lg border border-cyan-300/35 bg-cyan-500/8 p-4 text-center text-lg transition-box">
Từ phần khái niệm, giờ mình chuyển sang phần triển khai cụ thể với DuckDB.
</div>

<div v-click class="mt-4 text-center text-[#2efab0] handoff-box">
Mời bạn tiếp theo trình bày section 3: <b>Dynamic Data Masking in DuckDB</b>.
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
[NOTE NHẮC BÀI — đọc phần này ở chế độ Presenter]

Nhịp bấm (mỗi lần click là một ý, đừng bấm dồn):
1) Bấm 1 → nói lý do chọn DuckDB: bám đúng mục tiêu seminar.
2) Bấm 2 → nhấn "có sẵn SQL primitives": CASE, concat, regexp, macro, view.
3) Bấm 3 → điểm quan trọng nhất: thấy rõ ranh giới masking logic vs enforcement.
4) Bấm 4 → câu chuyển phần (đọc chậm, tạo nhịp).
5) Bấm 5 → câu bàn giao, quay sang mời speaker tiếp theo, rồi dừng.

Nhắc:
- Slide này là bản lề: chốt phần mình + mở đường cho DuckDB. Đừng thêm nội dung kỹ thuật mới.
- Nếu bị hụt thời gian: chỉ nói ý 1 + ý 3 rồi qua thẳng câu bàn giao.
- Kết thúc bằng ánh mắt/cử chỉ mời người kế tiếp, KHÔNG bỏ lửng.
-->

