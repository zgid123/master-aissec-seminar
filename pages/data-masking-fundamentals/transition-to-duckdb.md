---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Từ khái niệm sang triển khai

<div class="why mt-6">
  <div v-click="1"><b>1</b><span>Trong <b>DBMS truyền thống</b>, masking dựa trên user / role / <code>GRANT</code> — và chính <b>database server</b> là nơi thực thi policy đó.</span></div>
  <div v-click="2"><b>2</b><span>Với một <b>embedded database</b> thì không còn server tách biệt, nên ranh giới giữa <b>masking logic</b> (viết trong SQL) và <b>lớp enforcement</b> (ai thực sự được thấy dữ liệu thật) lộ ra rất rõ.</span></div>
</div>

<div v-click="3" class="mt-6 rounded-lg border border-cyan-300/35 bg-cyan-500/8 p-4 text-center text-lg transition-box">
Dynamic Data Masking nghe khá đơn giản trong một DBMS truyền thống. Nhưng trong một <b class="text-[#88ffff]">embedded analytical database như DuckDB</b> thì triển khai ra sao — và <b class="text-[#88ffff]">ai thực thi policy?</b>
</div>

<style scoped>
.why { display:grid; gap:.8rem; grid-auto-rows:min-content; align-content:start; min-height:7.4rem; }
.why > div { display:grid; grid-template-columns:2rem 1fr; gap:.8rem; align-items:start; padding:.85rem 1rem; border-left:4px solid #88ffff; background:rgba(255,255,255,.045); }
.why b { color:#88ffff; font-size:1rem; line-height:1.4; }
.why span { font-size:.83rem; line-height:1.35; opacity:.82; }
.transition-box { min-height:5.4rem; line-height:1.45; }
.handoff-box { min-height:1.9rem; }
</style>

<!--
[NOTE NHẮC BÀI — Slide 4/4: Chuyển sang DuckDB] (~35s) — đọc ở chế độ Presenter

Slide bản lề: chốt phần khái niệm của mình + đặt câu hỏi mở cho section 3. Có 4 CLICK = 4 ý, đừng bấm dồn.
QUAN TRỌNG: KHÔNG nói trước nội dung kỹ thuật của section 3 (kiến trúc in-process, CASE/concat/regexp, macro, view).
Đó là slide mở bài của Trần Huy Vũ — nói trước là giẫm chân bạn ấy và khán giả nghe lặp 2 lần.

[MỞ — khi tiêu đề hiện]
"Về mặt khái niệm thì dynamic masking khá rõ. Câu hỏi còn lại là: ai thực thi nó?"

[CLICK 1] "Trong một DBMS truyền thống, việc che dữ liệu dựa trên user, role và GRANT — và chính database server là nơi thực thi policy đó. Người dùng không đi vòng qua được."

[CLICK 2 — nhấn giọng, ĐÂY LÀ Ý MẠNH NHẤT CỦA MÌNH] "Nhưng với một embedded database thì không còn một server tách biệt đứng ra gác cửa nữa. Lúc đó ranh giới giữa masking logic — tức phần LÀM RA giá trị đã che, viết bằng SQL — và lớp enforcement — tức phần QUYẾT ĐỊNH ai được thấy dữ liệu thật — lộ ra rất rõ."

[CLICK 3 — đọc chậm, đây là câu chuyển section] "Nên câu hỏi đặt ra là: Dynamic Data Masking nghe khá đơn giản trong một DBMS truyền thống, nhưng trong một embedded analytical database như DuckDB thì triển khai ra sao, và ai thực thi policy?"

"Phần trả lời xin nhường lại cho section 3. Mình xin mời bạn Trần Huy Vũ trình bày — Dynamic Data Masking in DuckDB. Cảm ơn mọi người."

NHẮC:
- Đừng thêm nội dung kỹ thuật MỚI ở slide này — chỉ chốt + mở đường.
- Nếu hụt giờ: chỉ nói ý 2 rồi qua thẳng câu hỏi (CLICK 3) và câu bàn giao (CLICK 4).
- Kết bằng ánh mắt/cử chỉ mời người kế tiếp, KHÔNG bỏ lửng câu.
-->
