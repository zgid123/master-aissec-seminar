---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Từ khái niệm sang triển khai

<div class="why mt-6">
  <div v-click="1"><b>1</b><span>Trong <b>DBMS truyền thống</b>, masking dựa trên user / role / <code>GRANT</code> — và chính <b>database server</b> là nơi thực thi policy đó.</span></div>
  <div v-click="2"><b>2</b><span>Với một <b>embedded database</b> thì không còn server tách biệt, nên ranh giới giữa <b>masking logic</b> (viết trong SQL) và <b>lớp thực thi quyền</b> (ai thực sự được thấy dữ liệu thật) lộ ra rất rõ.</span></div>
</div>

<div v-click="3" class="mt-5 premise-box">
Dynamic Data Masking nghe khá đơn giản trong một <b>DBMS truyền thống</b>.
</div>

<div v-click="4" class="mt-3 rounded-lg border border-cyan-300/35 bg-cyan-500/8 p-4 text-lg transition-box">
Nhưng trong một <b class="text-[#88ffff]">embedded analytical database như DuckDB</b> thì triển khai ra sao, và <b class="text-[#88ffff]">ai thực thi policy?</b>
</div>

<style scoped>
.why { display:grid; gap:.8rem; grid-auto-rows:min-content; align-content:start; min-height:7.4rem; }
.why > div { display:grid; grid-template-columns:2rem 1fr; gap:.8rem; align-items:start; padding:.85rem 1rem; border-left:4px solid #88ffff; background:rgba(255,255,255,.045); }
.why b { color:#88ffff; font-size:1rem; line-height:1.4; }
.why span { font-size:.83rem; line-height:1.35; opacity:.82; }
.premise-box { min-height:1.6rem; font-size:.85rem; opacity:.7; }
.transition-box { min-height:3.6rem; line-height:1.45; }
.handoff-box { min-height:1.9rem; font-size:.9rem; opacity:.85; letter-spacing:.02em; }
</style>

<!--
Mở: "khái niệm thì rõ rồi — câu hỏi còn lại là **AI THỰC THI** nó?"

[click] **DBMS truyền thống**: user / role / `GRANT`, và **database server** thực thi policy.
Nói "**không dễ** đi vòng qua", ĐỪNG nói "không thể" — DBA/superuser vẫn có đường khác, Section 4 sẽ mổ chỗ đó.

[click] **Embedded database — ý mạnh nhất của mình.** Không còn server gác cửa → lộ ra ranh giới giữa:
**masking logic** = phần LÀM RA giá trị đã che (SQL) · **lớp thực thi quyền** = phần QUYẾT ĐỊNH ai thấy dữ liệu thật.
Hai phần khác nhau, không phải lúc nào cũng cùng một chỗ.

[click] Dòng tiền đề mờ: "nghe khá đơn giản trong DBMS truyền thống…"

[click] Ô câu hỏi — đọc chậm: "…nhưng trong embedded analytical database như DuckDB thì triển khai ra sao, và **ai thực thi policy**?"

**Bàn giao (không click):** ngừng **1 giây**, quay người sang Trần Huy Vũ:
"Phần trả lời xin nhường lại cho phần ba. Mình xin mời bạn **Trần Huy Vũ** — Dynamic Data Masking in DuckDB. Cảm ơn mọi người."
Đứng yên một nhịp cho bạn ấy bước lên. **Không bỏ lửng cuối câu.**
-->
