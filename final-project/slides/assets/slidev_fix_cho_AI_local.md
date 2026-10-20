# Sửa Slidev (29 trang): hướng dẫn cho AI local

Quy tắc: **ít chữ, hình to, không tràn xuống số trang.** Số trang là "N / 29" ở góc phải dưới.

## 0. Nguyên nhân lỗi (3 loại)

| Lỗi | Biểu hiện | Cách sửa chung |
|---|---|---|
| Công thức `$…$` nằm trong thẻ HTML/chip/component nên không được KaTeX xử lý | Hiện nguyên `$h_1$`, `$\frac{…}$` (trang 13, 15, 18, 22) | **Không dùng `$…$` trong HTML.** Dùng `h<sub>1</sub>`, `S<sub>t</sub>`, `λ`. Nếu muốn KaTeX, đặt `$$…$$` trong markdown thường, ngoài mọi thẻ HTML |
| Chữ của SVG/biểu đồ vẽ inline kế thừa cỡ chữ của slide nên phình to, đè nhau | Trang 12, 13, 19 | **Thay bằng 4 file SVG đã chuẩn bị**, nhúng bằng `<img>` (không bị CSS của slide chi phối) |
| Hình PNG còn lề trắng và bị ép nhỏ trong thẻ | Trang 4, 5, 14 | **Dùng bản `_trim.png`** (đã cắt lề), cho hình chiếm chiều ngang lớn |

## 1. Tệp cần dùng (đặt vào `public/img/`)

| Tệp | Dùng ở trang |
|---|---|
| `H1_timeline_khoang_ho_trim.png` | 4 |
| `H2_dinh_nghia_tu_du_lieu_den_quyet_dinh_trim.png` | 5 |
| `H4_may_trang_thai_trim.png` | 14 |
| `feature_timeline.svg` | 12 |
| `cusum_charts.svg` | 13 |
| `takeover_bar.svg` | 17 |
| `tradeoff_scatter.svg` | 19 |

## 2. CSS chung (thêm vào `style.css`)

```css
/* Canvas Slidev mặc định 980×552. Chừa 64px dưới cho số trang → vùng nội dung tối đa 488px */
.slidev-layout { padding: 28px 44px 64px; }
.slidev-layout h1 { font-size: 34px; line-height: 1.15; margin: 0 0 10px; }
.fig { display: flex; align-items: center; justify-content: center; overflow: hidden; }
.fig img { width: 100%; height: 100%; object-fit: contain; }
.chips { display: grid; gap: 12px; font-size: 16px; line-height: 1.35; }
.chips.c3 { grid-template-columns: repeat(3, 1fr); }
.chips.c4 { grid-template-columns: repeat(4, 1fr); }
.chips > div { padding: 8px 12px; border-radius: 8px; }
sub { font-size: .7em; }
```

**Ngân sách chiều cao mỗi trang:** tiêu đề ~60 + hình ≤ 300 + chip ≤ 110 → tối đa 470px. Nếu vượt, giảm chữ trước, đừng thu nhỏ hình.

## 3. Hai mẫu bố cục

**Mẫu A: hình lớn trên, 3 chip dưới (trang 4, 5, 14)**
```md
# Tiêu đề

<div class="fig" style="height:280px"><img src="/img/XXX_trim.png"></div>

<div class="chips c3">
<div>Chip 1</div>
<div>Chip 2</div>
<div>Chip 3</div>
</div>
```

**Mẫu B: bảng trái, hình phải (trang 12, 19)**
```md
<div class="grid grid-cols-[58%_42%] gap-4">
<div> …bảng hoặc chữ… </div>
<div class="fig" style="height:320px"><img src="/img/YYY.svg"></div>
</div>
```

## 4. Sửa từng trang

| Trang | Việc | Chi tiết |
|---|---|---|
| 1, 2, 3 | Kiểm tra | Áp quy tắc chung; trang 2 mục lục chỉ 5 mục |
| **4** Cookie | **Sửa** | Mẫu A. Hình: `H1_trim`, cao 190px, căn giữa. 3 chip, mỗi chip ≤ 2 dòng: **Cookie phiên:** "Mã định danh ngẫu nhiên, không chứa nhịp gõ" + sơ đồ nhỏ 1 dòng "Trình duyệt → session_id → Máy chủ: hợp lệ ✓ (không biết ai gõ)". **NIST SP 800-63B-4:** "Giám sát phiên: tùy chọn. Xác thực lại định kỳ: bắt buộc." **Khi nghi vấn:** "Hỏi MFA (rủi ro vừa) · Thu hồi phiên (rủi ro cao)". **Xóa:** câu Secure/HttpOnly/SameSite, dòng in nghiêng cuối trang |
| **5** Xác thực liên tục | **Sửa nặng** | Mẫu A. Hình `H2_trim` cao 270px chiếm gần hết chiều ngang (đây là trọng tâm). Xóa chú thích dưới hình ("Dữ liệu thô → …"). 3 chip: "**Đánh giá liên tục** tín hiệu trong phiên → tiếp tục / hỏi MFA / thu hồi" · "**Xác minh 1:1:** 'đúng chủ không?', không phải 'đây là ai'" · "**TypingDNA ActiveLock:** theo dõi cách gõ, khóa máy hoặc cảnh báo." Chuyển câu "50 ký tự / 150–200 ký tự" vào presenter notes |
| 6 | Chỉnh nhẹ | Giữ nội dung. Tăng cỡ chữ bảng lên 20px để lấp khoảng trống phía dưới |
| **7** Hướng nghiên cứu | **Rút chữ** | Mỗi ô ≤ 10 từ. Hàng 1: "Thống kê/khoảng cách" · "Gunetti 2005; Killourhy 2009" · "Có quy trình so sánh; chưa có trục TTD". Hàng 2: "Xác thực liên tục" · "Bours 2012; Kiyani 2020" · "Gần bài toán nhất; nhóm thêm TTD, MFA/giờ". Hàng 3: "Học sâu" · "TypeNet 2021; TypeFormer 2024" · "Minh họa; khác miền; chưa tái hiện". Hàng 4: "Benchmark" · "KVC-onGoing 2025 (hơn 185.000 người)" · "Chuẩn xác minh; không đo đổi người giữa phiên". Banner: "Khoảng trống: FAR/FRR/EER không cho biết cần bao nhiêu phím → thêm TTD và MFA/giờ." |
| 8, 9 | Giữ | Không đổi |
| 10 | Giữ | Trang chia mục |
| **11** Kiến trúc | **Rút chữ** | Giữ 5 khối và khung nét đứt. Thẻ xanh "Đã làm": "Collector · 12 đặc trưng · 2 bộ chấm điểm · 4 cấu hình (B0, B1, P1, B1 λ=1) · bộ đối chiếu". Thẻ cam "Chưa làm": "Lớp truyền chống phát lại · MFA thời gian thực · live end-to-end · P2". Sửa lỗi cũ: "4 cấu hình" mà chỉ liệt kê 3 |
| **12** Đặc trưng | **Sửa nặng** | Mẫu B (trái 58%). Thay SVG hiện tại bằng `<img src="/img/feature_timeline.svg">`, cao 360px. Bên phải 3 chip ngắn: "Mỗi cửa sổ 50 phím → **12 đặc trưng** (giữ phím, khoảng nghỉ, tốc độ, sửa lỗi, độ biến động)" · "**Chuẩn hóa theo từng người** (median, MAD)" · "**Không ghi ký tự:** chỉ nhóm phím và thời điểm". Chuyển câu "Học sâu học trực tiếp…" vào notes |
| **13** CUSUM | **Sửa nặng** | Hàng chuỗi trên cùng (4 ô), không dùng `$`: ô 2 "Điểm lạ a<sub>t</sub>" / "L1 hoặc IF"; ô 3 "Chuẩn hóa z<sub>t</sub>" / "z<sub>t</sub> = (a<sub>t</sub> − median) / (1,4826 · MAD)"; ô 4 "Cộng dồn S<sub>t</sub>" / "S<sub>t</sub> = max{0, λ·S<sub>t−1</sub> + z<sub>t</sub> − k}". Dưới là **một** ảnh `cusum_charts.svg` rộng ≥ 90%, cao ~270px (thay hai biểu đồ cũ). Giữ chú thích MAD, CUSUM và dòng "Ví dụ minh họa (λ=0,9; k=0,5; ngưỡng 6), không phải kết quả thực nghiệm" |
| **14** Bộ điều khiển | **Sửa** | Mẫu A. Hình `H4_trim` cao 250px (hiện đang quá nhỏ). 4 chip trên một hàng (B0, B1, P1, P2 xám, "Chưa làm"), mỗi chip ≤ 2 dòng. Banner 1 dòng: "Tham số chọn trên validation; test chỉ chấm sau khi khóa cấu hình." |
| **15** Nguồn công thức | **Sửa** | Giữ bảng 5 hàng; ô cuối: "h<sub>2</sub> = 2h<sub>1</sub>, cooldown 2 cửa sổ sau MFA". Hai dải chip dưới, không `$`: "**CHỌN TRÊN VALIDATION:** λ ∈ {0,9; 1} · k ∈ {0,25; 0,5; 1} · h<sub>1</sub> ∈ {0,5 … 12}" và "**HẰNG SỐ THIẾT KẾ:** W = 50 · IF 100 cây · h<sub>2</sub> = 2h<sub>1</sub> · cooldown 2 cửa sổ · L = 150 · A1 = 225 + 300 phím" |
| 16 | Giữ | Trang chia mục |
| **17** Dữ liệu | **Sửa** | Hàng 3 số lớn giữ nguyên. Hàng dưới chia 2 cột: trái "Chia theo ngày" (3 ô nhỏ), phải **`takeover_bar.svg`** rộng toàn cột, cao ~150px (đã gồm vạch N và nhãn L = 150; xóa tiêu đề và nhãn HTML cũ đang chồng lên nhau). Giữ 1 dòng "Mô hình không biết N; N chỉ dùng để chấm kết quả." Giữ huy hiệu đỏ "DỮ LIỆU MÔ PHỎNG" |
| **18** Chỉ số | **Rút chữ** | Hai thẻ, mỗi thẻ 2–3 gạch ngắn: "Bắt người lạ: Tỷ lệ phát hiện · Median TTD (phím từ N) · Trong 150 phím (L = 150)"; "Không làm phiền chủ thật: MFA/giờ · Thu hồi oan". **Xóa** gạch "Báo động trước N". Hộp "Bẫy mẫu số" chỉ giữ: "IF, P1: **0,755** (bỏ 72 ca) → **0,613** (đủ 432)" và "Báo cả hai cách tính". Giữ dải 4 ràng buộc và chú thích FAR/FRR/EER. **Lỗi:** `$L = 150$` hiện nguyên → viết "L = 150" |
| **19** Kết quả | **Sửa nặng** | Mẫu B (bảng trái 58%, hình phải 42%). Thay biểu đồ phân tán cũ bằng **`tradeoff_scatter.svg`**, cao ~320px. Bảng chữ 15px, giữ 7 cột. Banner 2 dòng: "Cộng dồn tăng phát hiện nhưng MFA/giờ cũng tăng." / "0/4 hồ sơ đạt ràng buộc → chưa kết luận." Chuyển các con số chi tiết (IF 0,361→0,627…) vào notes |
| 20 | Giữ | Trang chia mục |
| 21 Demo 1 | Chỉnh nhẹ | Ảnh collector rộng ~48%, cao ≤ 250px. 3 chip rút còn 1 dòng mỗi chip: "Chỉ lưu loại phím và thời điểm" · "Không lưu ký tự" · "Chặn dán, ngắt đoạn khi mất tiêu điểm" |
| **22** Demo 2 | **Sửa lỗi chữ** | Hai chú thích dưới biểu đồ: thay `$h_1$` bằng `h<sub>1</sub>`. Rút còn 1 dòng: "Hết 275 phím vẫn chưa vượt h<sub>1</sub>." và "W6 vượt h<sub>1</sub> → hỏi MFA → người lạ trượt." Biểu đồ cột cao ~220px; dải "Đánh giá" 1–2 dòng |
| 23 Demo 3 | Giữ | Trước khi trình bày, xác nhận công cụ đối chiếu chạy được (xem ghi chú ở cuối) |
| 24 | Giữ | Trang chia mục |
| 25, 26 | Giữ | Chỉ kiểm tra không tràn |
| 27 | Giữ | Trang chia mục |
| 28 Tài liệu | Kiểm tra | Hai cột, chữ 13–14px; nếu thêm [24], [25], [26] mà tràn thì chuyển bớt xuống notes |
| 29 | Giữ | Cảm ơn |

## 5. Kiểm tra sau khi sửa (cho AI local)

1. Mở từng trang ở độ rộng 980px: không có thanh cuộn, không có phần tử nào chạm vùng số trang (đáy 64px trống).
2. Tìm trong toàn bộ `slides.md` ký tự `$`: chỉ được còn trong khối `$$…$$` nằm ngoài HTML; nếu còn `$` trong thẻ HTML thì thay bằng `<sub>` hoặc ký tự Unicode.
3. Mỗi hình chiếm ≥ 55% chiều ngang slide; chữ trong hình đọc được ở cỡ ≥ 14px khi đang trình chiếu.
4. Xuất PDF/PNG và mở lại để so với bản trình chiếu.

## 6. Prompt cho AI local (mỗi lần một trang)

> Sửa trang {N} của slides.md theo đúng mục "Sửa từng trang" trong tài liệu. Không thêm số liệu hay khẳng định mới. Không dùng `$…$` trong HTML; dùng `<sub>`. Dùng tệp hình đã có trong `public/img/`. Giữ nội dung trong 488px đầu của slide, chừa 64px cuối cho số trang. Chỉ trả về markdown của trang đó.

## 7. Một ghi chú ngoài kỹ thuật

Trang 23 nói công cụ đối chiếu độc lập đã chạy và khớp 100%. File `member3-replay.mjs` mà ghi chú cũ gọi **không có** trong `final-project_1.zip`; hỏi Minh trước buổi trình bày. Nếu không chạy được thì giữ trang này như ảnh kết quả đã chụp và không nói là chạy trực tiếp.
