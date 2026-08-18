---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Static / Dynamic Data Masking

<div class="compare mt-6">
  <div v-click="1">
    <h3>Static Data Masking</h3>
    <p><b>Dữ liệu gốc</b> → Che → <b>Bản sao đã che</b></p>
    <p>Dữ liệu được che sẵn trên một bản sao, rồi mới đưa sang môi trường phát triển, kiểm thử hoặc huấn luyện.</p>
    <p class="trade"><b>Đánh giá:</b> An toàn hơn vì môi trường đích không dùng dữ liệu thật, nhưng bản sao đã cố định và phải được làm mới định kỳ.</p>
  </div>
  <div v-click="2">
    <h3>Dynamic Data Masking</h3>
    <p><b>Dữ liệu gốc</b> → Truy vấn + Quy tắc → <b>Kết quả theo quyền</b></p>
    <p>Dữ liệu lưu trong CSDL <b>không hề đổi</b>; việc che chỉ áp dụng lên <b>kết quả trả về</b> ngay lúc truy vấn, tùy theo quyền của người truy vấn.</p>
    <p class="trade"><b>Đánh giá:</b> Giữ được một nguồn dữ liệu duy nhất và linh hoạt theo quyền, nhưng phụ thuộc vào việc xác định <b>đúng danh tính và quyền</b> của người truy vấn.</p>
  </div>
</div>

<div v-click="3" class="mt-7 text-lg summary-box">
Static không để <b class="text-[#88ffff]">dữ liệu thật</b> rời khỏi production; Dynamic không để <b class="text-[#2efab0]">dữ liệu thật</b> hiện ra sai người.
</div>

<div v-click="3" class="mt-3 why-dynamic">
Chỉ cần <b>một nguồn dữ liệu duy nhất</b> mà vẫn phục vụ được <b>nhiều quyền khác nhau.</b> Không phải nhân bản và đồng bộ dữ liệu cho từng nhóm quyền.
</div>

<style scoped>
.compare { display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; align-items:start; }
.compare > div { min-height:14.2rem; }
.compare > div { padding:1.2rem; border-left:4px solid #88ffff; background:rgba(255,255,255,.045); }
.compare > div:last-child { border-color:#2efab0; }
.compare h3 { margin:0 0 .8rem; color:#88ffff; }
.compare > div:last-child h3 { color:#2efab0; }
.compare p { margin:.65rem 0; font-size:.82rem; line-height:1.4; }
.compare .trade { margin-top:.7rem; padding-top:.55rem; border-top:1px dashed rgba(255,255,255,.2); font-size:.76rem; line-height:1.35; opacity:.75; }
.summary-box { min-height:2.2rem; }
.why-dynamic { font-size:.78rem; line-height:1.4; opacity:.72; min-height:1.6rem; }
</style>

<!--
Mở: hai hướng che, khác nhau ở đúng một điểm - **việc che diễn ra LÚC NÀO**.

[click] **Static** (chỉ tay cột trái, giữ tay ở đó): che sẵn trên **bản sao** → mới đưa sang dev/test/training.
Được: môi trường đó **không có dữ liệu thật để lộ**. Mất: bản sao đổi cố định, phải làm mới định kỳ.

[click] **Dynamic** (chuyển tay sang cột phải, nói mạnh hơn): dữ liệu trong CSDL **không đổi**,
chỉ che **kết quả trả về** lúc truy vấn, tùy **ai** và **quyền gì**. Cùng một bảng: đủ quyền thấy thật, không đủ thấy đã che.
Đánh đổi (dòng cuối cột - **bắt cầu sang Slide 3, đừng bỏ**): một nguồn duy nhất + linh hoạt,
nhưng phụ thuộc **xác định đúng danh tính và quyền** - xác định sai là che sai.

[click] "**Static không để DỮ LIỆU THẬT rời khỏi production**; **Dynamic không để DỮ LIỆU THẬT hiện ra SAI NGƯỜI**."
Dòng nhỏ bên dưới (nói luôn): một nguồn duy nhất phục vụ nhiều quyền → khỏi nhân bản và đồng bộ, quy tắc che nằm một chỗ.
→ Chuyển: "Đã có mã hóa rồi thì còn cần che dữ liệu làm gì?"
-->
