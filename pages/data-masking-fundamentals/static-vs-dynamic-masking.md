---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Static / Dynamic Data Masking

Hai hướng che dữ liệu, khác nhau ở thời điểm che.{.op-90}

<div class="compare mt-6">
  <div v-click="1">
    <h3>Static Data Masking</h3>
    <div class="pipe">
      <span>Dữ liệu gốc</span><b>→</b><span>Che sẵn</span><b>→</b><span class="hi">Bản sao đã che</span>
    </div>
    <p>Bản sao đã che được dùng cho phát triển, kiểm thử hoặc huấn luyện.</p>
    <p class="trade">Bản sao cố định, phải làm mới khi dữ liệu gốc thay đổi.</p>
  </div>
  <div v-click="2">
    <h3>Dynamic Data Masking</h3>
    <div class="pipe">
      <span>Dữ liệu gốc</span><b>→</b><span>Truy vấn + quyền</span><b>→</b><span class="hi">Kết quả theo quyền</span>
    </div>
    <p>Dữ liệu gốc giữ nguyên, kết quả thay đổi tại thời điểm truy vấn tùy quyền của người dùng.</p>
    <p class="trade">Mỗi truy vấn phát sinh thêm phần xử lý để tạo giá trị đã che.</p>
  </div>
</div>

<div class="note mt-5" v-click="3">
Hai hướng phục vụ hai bài toán khác nhau. Nhóm chọn <b class="text-[#2efab0]">Dynamic Data Masking</b> vì dữ liệu cần luôn được cập nhật, trong khi các quyền khác nhau phải nhìn thấy mức thông tin khác nhau.
</div>

<style scoped>
.compare { display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:1.25rem; align-items:stretch; }
.compare > div { box-sizing:border-box; width:100%; height:100%; min-height:12.6rem; padding:1.1rem; border-left:4px solid #88ffff; background:rgba(255,255,255,.05); }
.compare > div:last-child { border-color:#2efab0; }
.compare h3 { margin:0 0 .8rem; color:#88ffff; font-size:1.05rem; }
.compare > div:last-child h3 { color:#2efab0; }
.pipe { display:flex; flex-wrap:wrap; align-items:center; gap:.4rem; margin-bottom:.7rem; }
.pipe span { padding:.28rem .5rem; background:rgba(255,255,255,.07); font-size:.88rem; }
.pipe .hi { color:#2efab0; }
.compare > div:first-child .pipe .hi { color:#88ffff; }
.pipe b { color:#2efab0; font-size:.95rem; }
.compare p { margin:.55rem 0 0; font-size:.96rem; line-height:1.45; opacity:.92; }
.compare .trade { margin-top:.7rem; padding-top:.55rem; border-top:1px dashed rgba(255,255,255,.25); font-size:.92rem; opacity:.88; }
.note { padding:.7rem 1rem; border-left:4px solid #ffda58; background:rgba(255,218,88,.06); font-size:.95rem; line-height:1.45; }
</style>

<!--Việc che có thể làm trước, mà cũng có thể làm ngay lúc truy vấn. Đó chính là chỗ khác nhau giữa hai hướng trên slide này.

[CLICK] Static Data Masking che sẵn trên một bản sao, rồi bản sao đó mới được đưa sang môi trường phát triển, kiểm thử hoặc huấn luyện. Những môi trường đó không cần dữ liệu thật, nên cách làm này rất phù hợp. Đổi lại, bản sao đã cố định, nên mỗi lần dữ liệu gốc thay đổi thì phải làm mới lại.

[CLICK] Dynamic Data Masking thì giữ nguyên dữ liệu gốc. Việc che chỉ áp lên kết quả trả về tại thời điểm truy vấn, tùy theo quyền của người dùng. Cùng một bảng, người quản lý thấy giá trị thật, còn nhân viên hỗ trợ thấy giá trị đã che. Cách này phù hợp khi dữ liệu phải luôn được cập nhật mà các quyền khác nhau lại phải nhìn thấy mức thông tin khác nhau. Đánh đổi là mỗi truy vấn phải xử lý thêm một chút để tạo ra giá trị đã che.

[CLICK] Nên đây không phải chuyện hướng nào tốt hơn. Hai hướng phục vụ hai bài toán khác nhau. Nếu môi trường đích không cần dữ liệu thật thì Static hợp lý hơn. Còn với một hệ thống đang chạy, nhiều quyền cùng đọc một bảng, thì cần Dynamic.-->
