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
    <p class="trade"><b>Đánh đổi</b> · An toàn cho môi trường không dùng dữ liệu thật, nhưng bản sao đã đổi cố định và phải làm mới định kỳ.</p>
  </div>
  <div v-click="2">
    <h3>Dynamic Data Masking</h3>
    <p><b>Dữ liệu gốc</b> → Truy vấn + Quy tắc → <b>Kết quả theo quyền</b></p>
    <p>Dữ liệu lưu trong database <b>không hề đổi</b>; việc che chỉ áp lên <b>kết quả trả về</b> ngay lúc truy vấn, tùy theo quyền của người truy vấn.</p>
    <p class="trade"><b>Đánh đổi</b> · Giữ được một nguồn dữ liệu duy nhất và linh hoạt theo role, nhưng phụ thuộc vào việc xác định <b>đúng danh tính và quyền</b> của người truy vấn.</p>
  </div>
</div>

<div v-click="3" class="mt-7 text-center text-lg summary-box">
Static không để <b class="text-[#88ffff]">dữ liệu thật</b> rời khỏi production; Dynamic không để <b class="text-[#2efab0]">dữ liệu thật</b> hiện ra sai người.
</div>

<div v-click="3" class="mt-3 text-center why-dynamic">
Chỉ cần <b>một nguồn dữ liệu duy nhất</b> mà vẫn phục vụ được <b>nhiều role khác nhau</b> — không phải nhân bản và đồng bộ dữ liệu cho từng nhóm quyền.
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
[NOTE NHẮC BÀI — Slide 2/4: Static vs Dynamic] (~50s) — **3 CLICK**

[MỞ — chỉ có tiêu đề hiện sẵn]
"Có hai hướng che dữ liệu phổ biến, và chúng khác nhau ở đúng một điểm: việc che diễn ra LÚC NÀO."

[CLICK 1] → hiện cột Static (bên trái). Chỉ tay vào cột đó:
"Thứ nhất — Static Data Masking: dữ liệu được che SẴN trên một bản sao, rồi mới đưa sang môi trường phát triển, kiểm thử hay huấn luyện. Đánh đổi: rất an toàn cho các môi trường không dùng dữ liệu thật — vì ở đó đơn giản là KHÔNG CÓ dữ liệu thật để mà lộ — nhưng bản sao đã bị thay đổi cố định và phải làm mới định kỳ khi dữ liệu gốc đổi."

[CLICK 2] → hiện cột Dynamic (bên phải). Chuyển tay sang cột phải, nói mạnh hơn:
"Thứ hai — Dynamic Data Masking, và đây mới là hướng seminar tập trung vào: dữ liệu lưu trong database KHÔNG hề đổi. Việc che chỉ áp lên KẾT QUẢ TRẢ VỀ, ngay tại thời điểm truy vấn, tùy theo vai trò hoặc quyền của người truy vấn."

"Đánh đổi của Dynamic: giữ được MỘT nguồn dữ liệu duy nhất và linh hoạt theo role, nhưng đổi lại nó phụ thuộc vào việc hệ thống xác định ĐÚNG danh tính và quyền của người truy vấn — xác định sai là che sai."

(Chi tiết "che áp lên kết quả trả về" + "phụ thuộc danh tính người truy vấn" rất quan trọng — hai ý này dẫn thẳng sang giới hạn của masking ở slide 3.)

[CLICK 3] → hiện câu tổng kết + dòng lợi ích, nhấn giọng:
"Static KHÔNG ĐỂ DỮ LIỆU THẬT RỜI KHỎI PRODUCTION; còn Dynamic KHÔNG ĐỂ DỮ LIỆU THẬT HIỆN RA SAI NGƯỜI."
(Tách rõ hai vế, ngừng 1 giây ở dấu chấm phẩy. Hai vế cùng nói về DỮ LIỆU THẬT — khác nhau ở chỗ chặn ở khâu SAO CHÉP hay khâu TRUY VẤN.)

[Dòng nhỏ bên dưới — giải thích VÌ SAO cách đó tốt, rồi mới chốt lựa chọn:]
"Cái được của Dynamic là: chỉ cần giữ MỘT nguồn dữ liệu duy nhất mà vẫn phục vụ được nhiều role khác nhau. Không phải tạo và đồng bộ nhiều bản sao cho từng nhóm quyền — dữ liệu luôn mới, và quy tắc che nằm ở một chỗ duy nhất nên dễ kiểm soát hơn. Đó là lý do seminar đi theo hướng Dynamic."

NHẮC: seminar của nhóm tập trung vào DYNAMIC — đây là nền tảng cho phần DuckDB ở section 3.
-->
