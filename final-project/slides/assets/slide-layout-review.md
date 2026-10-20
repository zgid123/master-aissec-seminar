# Rà soát bố cục slide — Nhóm 02 (Xác thực liên tục dựa trên nhịp gõ phím)

Nguồn rà soát: `slides-export.pdf` (69 trang PDF = 29 slide + các bước click; mỗi slide được xét ở **trạng thái sau click cuối**) và mã nguồn trong `style_css.zip` (`style.css`, `slides.md`, `pages/*`, `assets/*`).

Quy ước: toàn bộ số đo dưới đây tính theo **canvas Slidev 980×552 px**, đo từ ảnh xuất PDF (1456×820 px, hệ số 1,486). Số đo là ước lượng ±3 px, nên sau khi sửa hãy đo lại (xem Phụ lục A).

---

## 0. Tóm tắt vấn đề

| # | Vấn đề | Mức độ | Số liệu |
|---|---|---|---|
| 1 | **Chữ quá nhỏ.** Trong 143 khai báo cỡ chữ `text-[Npx]` của các trang, **101 khai báo < 14 px**; nhỏ nhất 10,5 px (bảng ở trang 19). Chữ trong ảnh raster/SVG còn nhỏ hơn (~7–10 px sau khi co về canvas). | Cao | 20 trang nguồn |
| 2 | **Nội dung dồn lên trên, đáy trống.** 12/20 trang nội dung còn trống > 90 px phía trên vùng số trang. Tệ nhất: trang 25 (182 px), 23 (156), 26 (136), 11 (133), 8 (127), 17 (123). | Cao | Bảng mục 1 |
| 3 | **Đè/dính nhau ở đầu trang.** Trang 8 (banner đè lên tiêu đề), trang 17 (phụ đề dính chân chữ tiêu đề), trang 13, 15, 25, 26 (khối đầu tiên cách tiêu đề ≈ 3–5 px). | Cao | 7 trang |
| 4 | **Tràn vùng số trang.** Trang 14 (đáy 491 px, banner đè lên "14 / 29"), trang 19 (banner dính ngay trên số trang). | Cao | 2 trang |
| 5 | **Grid tràn lề phải.** Trang 12 và 19: cột phải vượt lề ~14 px vì dùng `grid-cols-[58%_42%]` cộng thêm `gap`. | Trung bình | 2 trang |
| 6 | **Hình nền trắng lạc trên nền xám**, hình thu nhỏ (chỉ 60–83% bề ngang), nhãn trong hình đè nhau (trang 14). | Trung bình | 4, 5, 12, 14, 17, 19 |
| 7 | **Khung/thẻ giãn cách chưa đều.** Thẻ không cao bằng nhau (4, 6, 18), chữ chạm viền (17), khoảng cách khối–khối chỉ 8–12 px. | Trung bình | nhiều trang |
| 8 | `h1` bị khai báo ở 2 nơi mâu thuẫn (`style.css`: 34 px/1,15; `slides.md`: 2,05 rem ≈ 32,8 px/1,25). | Nhẹ | toàn deck |

Nguyên nhân gốc: file `assets/slidev_fix_cho_AI_local.md` đặt quy tắc "ít chữ, hình to, chip ≤ 110 px" nên các trang được **rút chữ nhưng không tăng cỡ chữ và khoảng cách tương ứng**, và `style.css` đã có `.chips { font-size: 16px }` nhưng các trang đều ghi đè xuống `text-[13px]`/`text-[13.5px]`. Giờ chữ đã ít, ta có thể phóng chữ lên 15–17 px mà không tràn.

### Bảng đo khoảng trống (trạng thái sau click cuối)

Vùng nội dung hợp lệ: từ đáy phụ đề (~108 px, hoặc ~96 px nếu không có phụ đề) tới **488 px**. Phần 488–552 dành cho số trang.

| Trang | Đáy nội dung (px) | Trống (px) | Ghi chú |
|---|---|---|---|
| 4 | 431 | 57 | |
| 5 | 444 | 44 | |
| 6 | 429 | 59 | |
| 7 | 396 | 92 | |
| 8 | 361 | **127** | banner đè tiêu đề |
| 9 | 370 | **118** | |
| 11 | 355 | **133** | |
| 12 | 415 | 73 | hổng 58 px dưới phụ đề; tràn lề phải |
| 13 | 458 | 30 | đầu trang dính tiêu đề |
| 14 | 491 | **−3 (tràn)** | banner đè số trang |
| 15 | 372 | **116** | |
| 17 | 365 | **123** | phụ đề dính tiêu đề |
| 18 | 379 | **109** | |
| 19 | 487 | ≈0 (chạm) | banner dính số trang; tràn lề phải |
| 21 | 382 | **106** | |
| 22 | 427 | 61 | |
| 23 | 332 | **156** | |
| 25 | 306 | **182** | |
| 26 | 352 | **136** | |
| 28 | 408 | 80 | tiêu đề lệch vị trí so với các trang khác |

Mục tiêu sau sửa: đáy nội dung nằm trong **[450 – 480] px**, trống ≤ 40 px, không phần tử nào chạm vùng số trang.

---

## 1. Sửa chung (làm TRƯỚC khi sửa từng trang)

Sửa phần này một lần sẽ cải thiện ~50% số trang.

### G1. Thang cỡ chữ (canvas 980 px)

| Vai trò | Cỡ chữ | Ghi chú |
|---|---|---|
| Tiêu đề h1 | 34 px | giữ một khai báo duy nhất (xem G8) |
| Phụ đề | 16 px | thay `text-[13px]` |
| Nội dung chính (thẻ, bảng, list) | 16 px (tối thiểu 15) | |
| Tiêu đề thẻ | 17 px, đậm | |
| Đầu cột bảng, nhãn viết hoa | 13–14 px | |
| Chú thích/footnote | 12,5–13 px | **sàn tuyệt đối 12 px** |
| Chữ trong hình (SVG/PNG) | ≥ 13 px **sau khi co về kích thước hiển thị** | xem G5 |

Tìm và thay trong `pages/**/*.md`: `text-[10.5px]`, `text-[11px]`, `text-[11.5px]`, `text-[12px]`, `text-[12.5px]`, `text-[13px]`, `text-[13.5px]` — chỉ giữ lại cho footnote.

### G2. Đầu trang: tách tiêu đề – phụ đề – nội dung

Hiện phụ đề dùng `-mt-1.5 mb-2` (kéo ngược lên 6 px) nên dính vào tiêu đề; các trang không phụ đề (8, 13, 15, 25, 26) có khối đầu tiên chỉ `mt-1`/`mt-2`, trang 8 còn `-mt-2` nên đè lên tiêu đề.

Thêm vào `style.css`:

```css
/* Phụ đề dưới tiêu đề */
.sub {
  font-size: 16px;
  line-height: 1.3;
  color: #64748b;
  margin: 4px 0 14px !important;
}

/* Khối đầu tiên của trang KHÔNG có phụ đề */
.first {
  margin-top: 16px !important;
}
```

Áp dụng:
- Thay mọi `<p class="text-[13px] text-slate-500 font-normal -mt-1.5 mb-2">…</p>` bằng `<p class="sub">…</p>`.
- Trang không phụ đề: thêm `class="first"` vào khối đầu tiên và **xóa mọi `-mt-*`** ở khối đó (đặc biệt trang 8 và trang 9, đang dùng `-mt-2` kéo banner lên sát/đè tiêu đề).
- Tiêu đề thụt ~5 px so với lề nội dung (x ≈ 72 so với 65 ở ảnh 1456 px); nếu muốn thẳng hàng, thêm `margin-left: -5px` cho h1 của layout `shifting-intro`.

### G3. Lấp khoảng trống phía dưới

Không kéo giãn bằng `space-between` (sẽ tạo khoảng hở lạ). Cách làm: **tăng cỡ chữ (G1) + padding thẻ + gap**, rồi nếu còn trống thì thêm chiều cao tối thiểu cho thẻ chính.

Thang giãn cách thống nhất:

| Vị trí | Giá trị |
|---|---|
| Khoảng cách giữa các khối lớn | 16 px (`mt-4` / `gap-4`) |
| Giữa các thẻ cùng hàng | 14–16 px |
| Padding trong thẻ | 14–16 px (`p-3.5`/`p-4`) |
| Giữa tiêu đề thẻ và nội dung | 6–8 px |
| Giữa các dòng list | 8–10 px |

Class hỗ trợ (tùy chọn):

```css
/* Ép các thẻ trong cùng hàng cao bằng nhau */
.equal { display: grid; align-items: stretch; }

/* Chiều cao tối thiểu cho thẻ chính để không bị "xẹp" */
.card-min { min-height: 112px; }
```

### G4. Chips đồng đều

`style.css` đã có `.chips { font-size: 16px }`, nhưng các trang 4, 5, 14 ghi đè `text-[13.5px]`/`text-[13px]`. Xóa các ghi đè đó và cập nhật:

```css
.chips { font-size: 16px; line-height: 1.35; gap: 14px; }
.chips > div { padding: 12px 16px; border-radius: 10px; }
```

### G5. Hình: khung, kích thước, chữ trong hình

Hiện các hình có nền trắng nên hiện thành khung trắng "lạc" trên nền xám nhạt (trang 4, 5, 12, 17, 19) và chỉ rộng 60–83% (4: 66%, 5: 83%, 14: 61%).

```css
.fig-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 1px 2px rgba(15, 23, 42, .06);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.fig-card img { width: 100%; height: 100%; object-fit: contain; }
```

Dùng `.fig-card` thay `.fig` cho mọi hình nền trắng (có viền, bo góc cùng ngôn ngữ với các thẻ).

**Chữ trong hình là nguyên nhân chính của chữ nhỏ**: các PNG/SVG được vẽ ở khổ lớn rồi co lại. Ước lượng sau khi co: trang 5 ≈ 7,5–9 px, trang 14 ≈ 7–8 px, trang 4 ≈ 10–12 px, trang 12 ≈ 9–10 px, trang 19 (tick/nhãn) ≈ 9–11 px. Khi xuất lại hình, thiết kế **ngay ở kích thước hiển thị** (ví dụ `viewBox="0 0 892 220"` cho hình rộng 892 px × cao 220 px) và đặt `font-size ≥ 13` trong SVG. Với PNG, cắt sát lề và thêm nền trong suốt, hoặc chuyển sang SVG.

### G6. Grid không tràn lề

`grid-cols-[58%_42%] gap-4` làm tổng > 100% → cột phải tràn ~gap. Thay bằng đơn vị `fr`:

```css
.cols-58-42 {
  display: grid;
  grid-template-columns: minmax(0, 1.38fr) minmax(0, 1fr);
  column-gap: 20px;
  align-items: start;      /* KHÔNG dùng items-center: sinh khoảng hổng đầu/cuối */
}
```

Áp dụng cho trang 12 và 19. Cả hai trang đang dùng `items-center`, khiến hình/bảng bị dồn xuống giữa và tạo khoảng hổng ~58 px dưới phụ đề.

### G7. Vùng an toàn số trang

Không phần tử nào có đáy > **480 px**. Banner tối ở đáy các trang 14, 19 đang chạm/đè số trang. Nếu vượt: giảm chiều cao hình trước, không giảm chữ.

### G8. Trùng khai báo h1

`style.css`: `h1 { font-size: 34px; line-height: 1.15; margin: 0 0 10px }` và `slides.md` (khối `<style>` đầu file): `h1 { font-size: 2.05rem; line-height: 1.25 }`. Xóa một nơi. Khuyến nghị giữ ở `style.css`: 34 px, `line-height: 1.15`, `margin: 0 0 6px`.

---

## 2. Sửa từng trang (theo thứ tự trang)

Ký hiệu mức độ: **[CAO]** nhìn thấy ngay (đè/tràn/trống lớn) · **[TB]** chữ nhỏ/giãn cách chưa tốt · **[NHẸ]** tinh chỉnh.

Ngân sách chiều cao (canvas): tiêu đề + phụ đề kết thúc ≈ 108 px; nội dung tối đa tới 480 px → **khoảng 370 px** cho thân trang (≈ 385 px khi không có phụ đề). Các số "ngân sách" bên dưới là ước lượng để kiểm tra nhanh.

---

### Trang 1 — Bìa · `slides.md` · [NHẸ]

Hiện trạng: tiêu đề xuống dòng bỏ **chữ "phím" mồ côi** ở dòng 2; hai khối thông tin cuối trang không thẳng hàng đáy (khối giảng viên kết thúc cao hơn khối nhóm ~45 px); dòng "Date" sát đáy (94% chiều cao); dòng tên dài nhất của khối nhóm chạm lề phải (~97% chiều rộng).

Sửa:
- Cân dòng tiêu đề: thêm `text-wrap: balance` cho `.alpha-academic-cover h1`, hoặc ngắt tay: `Xác thực liên tục thích ứng<br>dựa trên nhịp gõ phím`.
- Căn đáy hai khối: cho khối giảng viên cùng `bottom` với khối nhóm (hoặc chuyển dòng "Date" lên nhóm trên, bỏ dòng ngày riêng).
- Chừa lề phải ≥ 44 px cho khối nhóm.

Kiểm tra: tiêu đề 2 dòng cân; hai khối thẳng đáy.

---

### Trang 2 — Mục lục · [OK]

Giữ nguyên.

---

### Trang 3, 10, 16, 20, 24, 27 — Trang chia mục · [NHẸ]

Bố cục ổn. Ghi chú ngoài bố cục: ảnh nền `heading.png` (và `main.png` ở trang bìa) có **ngôi sao 4 cánh ở góc phải dưới** (vị trí ≈ (1335, 690) trên ảnh 1456×820) — trông như watermark của công cụ tạo ảnh. Nên cắt/che hoặc tạo lại ảnh.

---

### Trang 4 — Khoảng hở sau MFA · `problem-and-motivation/01-post-mfa-gap.md` · [TB]

Hiện trạng: đáy 431 (trống 57). Hình `H1_trim.png` có **nền trắng thành khung lạc**, rộng 66%; nhãn trong hình ≈ 10–12 px; ba chip cách hình chỉ ~8 px; chip 1 có dải flow 11 px nên cao hơn, "(không biết ai gõ)" bị rớt dòng; chip 2, 3 còn trống phía dưới.

Sửa:
1. Phụ đề → `class="sub"` (G2).
2. Hình trong `.fig-card`, cao **220 px** (hiện 190), chiều ngang 100% vùng nội dung; xuất lại hình theo G5 để nhãn ≥ 13 px.
3. Chips: bỏ `text-[13.5px]`; chữ 16 px, tiêu đề chip 17 px; `p-4`; `mt-4` giữa hình và chip.
4. Chip 1: dải sơ đồ nhỏ nâng lên 13 px, cho phép 2 dòng; chip 2, 3 giữ nội dung ngắn nhưng **cao bằng chip 1** (grid mặc định stretch; thêm `h-full` cho thẻ con).
5. `v-click` giữ nguyên.

Ngân sách: 108 + hình 220 + 16 + chips ≈ 120 → ~**464**.

---

### Trang 5 — Xác thực liên tục · `problem-and-motivation/02-continuous-auth.md` · [TB]

Hiện trạng: đáy 444 (trống 44). Hình `H2_trim.png` rộng 83% và **chữ trong hình ≈ 7,5–9 px** (nhãn "Nhóm phím + thời điểm nhấn / nhả", "Giới hạn: khi người dùng không gõ…", hộp đỏ "Bằng chứng yếu…"); nền trắng; chip chữ 13,5 px.

Sửa:
1. Xuất lại `H2` với **ít phần tử hơn**: bỏ hộp xám "Giới hạn…" và hộp đỏ "Bằng chứng yếu…" (đã có ở ghi chú/trang 26), bỏ dòng phụ "Xác minh 1:1…" dưới tiêu đề trong ảnh. Nhãn còn lại ≥ 13 px sau khi co.
2. Hình trong `.fig-card`, cao 250 px, rộng 100%.
3. Ba chip theo G4 (16 px, `p-4`), cao đều nhau.
4. Nhất quán thuật ngữ khi xuất lại ảnh: trang này ghi **"Thu nhận / Trích đặc trưng / Chấm điểm / Tích lũy / Quyết định"** nhưng trang 11 và 13 ghi **"Thu phím / Cắt cửa sổ / Chấm điểm lạ / Cộng dồn / Quyết định"**. Chọn một bộ tên.

Ngân sách: 108 + 250 + 16 + ~100 = ~**474**.

---

### Trang 6 — Vì sao chọn nhịp gõ · `problem-and-motivation/03-why-keystroke.md` · [TB]

Hiện trạng: đáy 429 (trống 59). Bảng 17 px đọc tốt nhưng **cột phải kết thúc cao hơn bảng ~57 px**, ba thẻ cao không đều; dòng trích Dhakal 13,5 px.

Sửa:
1. Grid `items-stretch`; cột phải `flex flex-col justify-between h-full`, mỗi thẻ `flex-1`.
2. Bảng: hàng `p-3.5` (từ `p-2.5`), giữ 17 px; đầu cột 15 px.
3. Thẻ phải: chữ 16 px; trích Dhakal 14 px.

Ngân sách: bảng ~ 44 + 4 × 66 = 308 → đáy ≈ **430 + 30 = 460**.

---

### Trang 7 — Nghiên cứu liên quan · `problem-and-motivation/04-field-overview.md` · [TB]

Hiện trạng: đáy 396 (trống 92). Bảng 13,5 px, dải timeline 12,5 px, banner 13 px.

Sửa:
1. Bảng: `text-[16px]`, đầu cột 14 px, hàng `p-3`.
2. Dải timeline: 14 px, `py-2.5`; nếu tràn ngang, bỏ chấm `•` hoặc rút "Gunetti & Picardi" → "Gunetti".
3. Banner "Khoảng trống": 16 px, `py-3`; `mt-4`.
4. Hàng "Xác thực liên tục" đã tô sáng, giữ.

Ngân sách: 108 + strip 40 + 14 + bảng (40 + 4 × 50 = 240) + 14 + banner 44 = ~**460**.

---

### Trang 8 — Mô hình đe dọa · `problem-and-motivation/05-threat-model.md` · [CAO]

Hiện trạng: đáy 361 (trống **127**). **Banner vàng đè lên tiêu đề** (`-mt-2`, cạnh trên cắt qua chân chữ "Mô hình đe dọa"). Chữ 12–14 px.

Sửa:
1. Xóa `-mt-2`, thêm `class="first"` (G2) → banner cách tiêu đề ≥ 16 px; chữ banner 15 px.
2. Nhãn "TÀI SẢN CẦN BẢO VỆ"/"KỊCH BẢN TẤN CÔNG": 13 px.
3. Thẻ tài sản: 15,5 px, `p-3`, `gap-3`.
4. Hàng kịch bản A1–A4: 15 px, `py-2.5`; huy hiệu A1–A4 13 px; nhãn "Đã đo/Chưa đo" 13 px.
5. Cột: đổi `grid-cols-[0.85fr_1.35fr]` → `grid-cols-[0.8fr_1.4fr]` để hàng kịch bản ít rớt dòng.
6. Hộp tối "N = phím đầu tiên…": 15 px, `p-3`.

Ngân sách ước lượng: cột trái 4 thẻ × 66 + 3 × 12 = 300 → đáy ≈ 96 + 56 + 300 = **~470**. Nếu cột phải tràn do rớt dòng, giảm xuống 15 px.

---

### Trang 9 — Câu hỏi nghiên cứu · `problem-and-motivation/06-research-questions.md` · [TB]

Hiện trạng: đáy 370 (trống **118**). Chữ 12–14 px; khoảng giữa các hàng 10 px.

Sửa:
1. Banner câu hỏi: 17 px, `py-3`.
2. Tiêu đề cột: 13 px; RQ1–RQ3: nhãn 17 px, mô tả 14 px.
3. Cột giả thuyết: 16 px.
4. Ô kết quả: tiêu đề 16 px, dòng phụ 14 px, `p-3`.
5. `gap-y-2.5` → `gap-y-4`; thêm `min-h-[84px]` cho mỗi hàng để ba hàng dàn đều.

Ngân sách: mỗi hàng cao tối thiểu 76 px (`min-h-[76px]`) với `gap-y-3`: 108 + banner 48 + 14 + nhãn cột 20 + (3 × 76 + 2 × 12) = **~442**. Hàng cao hơn 96 px sẽ tràn, nên đo lại sau khi sửa.

---

### Trang 11 — Kiến trúc hệ thống · `method-and-architecture/01-architecture.md` · [CAO — trống]

Hiện trạng: đáy 355 (trống **133**). Chữ khối 13 px, tiêu đề khối 14 px; hai thẻ dưới 14 px.

Sửa:
1. Năm khối: tiêu đề 16 px, mô tả 14,5 px, `p-4`; huy hiệu số `w-7 h-7`, 12 px.
2. Thêm mũi tên `→` giữa các khối (kiểu như trang 13) nếu còn chỗ; nếu không, giữ `gap-3`.
3. Dải nét đứt "Lớp truyền & kiểm tra gói": 14 px, `py-2.5`, `mt-3`; bỏ dấu "—" đầu dòng.
4. Hai thẻ "Đã hiện thực/Chưa hiện thực": tiêu đề 17 px, nội dung 16 px, `p-4`; `mt-5`.
5. Chú ý "Chưa hiện thực: … P2" đang rớt chữ "P2" xuống dòng đơn → rút chữ hoặc `text-[15px]`.

Ngân sách: 108 + khối ~140 + 12 + dải 44 + 20 + thẻ ~110 = **~434**; thêm `mt-6`/`min-h` nếu muốn tới 460.

---

### Trang 12 — Đặc trưng nhịp gõ · `method-and-architecture/02-keystroke-features.md` · [CAO]

Hiện trạng: đáy 415 (trống 73). `items-center` + hình cao 360 → **hổng 58 px dưới phụ đề**; **cột phải tràn lề ~15 px**; hình nền trắng; chữ trong SVG ≈ 9–10 px; ba chip chữ 14,5 px và không thẳng đầu với hình.

Sửa:
1. Grid theo G6 (`.cols-58-42`, `align-items: start`).
2. `feature_timeline.svg` trong `.fig-card`, cao **340 px**; **xuất lại SVG phóng chữ ×1,3** (nhãn d, f, "nhấn A", "nhả B" ≥ 13 px).
3. Ba chip: 16 px, `p-4`, `gap-4`; cột chip `flex flex-col justify-between` và **cao bằng hình** (cạnh trên/dưới thẳng với hình).
4. Chú ý chip 1 đang dài (3 dòng): giữ.

Ngân sách: 112 + 340 = **~452**.

---

### Trang 13 — Cộng dồn bằng chứng (CUSUM) · `method-and-architecture/03-cusum.md` · [CAO — dính tiêu đề]

Hiện trạng: đáy 458 (trống 30, ổn). Hàng 4 ô **dính tiêu đề** (khoảng cách ≈ 5 px); **ô 3 cao hơn các ô khác** vì công thức rớt dòng "(1,4826 · / MAD)"; công thức 11,5 px, chú thích MAD 11 px, footnote 11,5 px; biểu đồ chiếm ~72% bề ngang.

Sửa:
1. Hàng 4 ô: `class="first"` (G2); `items-stretch` để 4 ô cao bằng nhau.
2. Chia độ rộng: ô 1 `flex-[0.8]`, ô 2 `flex-[0.9]`, ô 3 `flex-[2]`, ô 4 `flex-[1.7]` để công thức một dòng; công thức 13 px.
3. Chú thích MAD/CUSUM: 12,5 px. Footnote ví dụ: 12,5 px.
4. Biểu đồ `cusum_charts.svg`: cao 250 px (từ 270) để bù 16 px đầu trang; xuất lại SVG sao cho khung rộng 100% (hiện chừa lề trắng trong SVG).

Ngân sách: giữ đáy ≈ **460**.

---

### Trang 14 — Bộ điều khiển phiên · `method-and-architecture/04-controller-and-configs.md` · [CAO]

Hiện trạng: **đáy 491 > 488, banner đè số trang "14 / 29"**. Hình `H4` chỉ rộng 61%, **chữ trong hình ≈ 7–8 px**; nhãn cạnh "h₁ ≤ Sₜ < h₂" dính sát mép ACTIVE, nhãn "MFA đạt: đặt lại Sₜ = 0" bị mũi tên đè; chip cách hình ~8 px; chip 13 px.

Sửa:
1. **Vẽ lại máy trạng thái** bằng SVG theo G5: `viewBox="0 0 892 210"`, tên trạng thái 15 px, nhãn cạnh ≥ 12 px và **dời nhãn ra khỏi đường mũi tên** (đặt phía trên/dưới cung, không chồng lên đường).
2. Hình trong `.fig-card`, cao **210 px** (từ 250).
3. Bốn chip: 15 px, `p-3`, `mt-4`; "P2 (Chưa hiện thực)" giữ màu xám.
4. Banner: một dòng 14 px, `py-2`, `mt-3`.

Ngân sách: 108 + 210 + 14 + chip ~88 + 12 + banner 36 = **~468** (≤ 480 ✓, không chạm số trang).

---

### Trang 15 — Nguồn công thức và tham số · `method-and-architecture/05-formula-sources.md` · [CAO — trống/dính]

Hiện trạng: đáy 372 (trống **116**). Bảng **dính ngay dưới tiêu đề** (~3 px; `mt-2` + không phụ đề); chữ bảng 13 px, dải dưới 12,5/11 px.

Sửa:
1. Bảng: `class="first"` (G2); chữ 15 px, hàng `p-2.5`, đầu cột 14 px.
2. Hai dải dưới: chữ 14 px, `py-2`, nhãn badge 12,5 px; `mt-4`, `gap-2`.
3. Cột bảng: giữ 28/36/36.

Ngân sách: 96 + 240 (bảng) + 14 + 88 (2 dải) = **~438**.

Ghi chú nội dung: cột "Nguồn tham khảo" đang ghi **[26], [12], [13], [7], [11]** nhưng trang 28 liệt kê tài liệu **không đánh số** → người nghe không tra được. Hoặc đánh số lại trang 28 theo báo cáo, hoặc bỏ số trên trang 15 (đã có tên tác giả/năm).

---

### Trang 17 — Dữ liệu và quy trình · `experiment-and-evaluation/01-data-and-protocol.md` · [CAO]

Hiện trạng: đáy 365 (trống **123**). **Phụ đề "Dữ liệu mô phỏng" dính vào chân chữ tiêu đề** (dấu của "ệ" chạm chữ "p"); huy hiệu đỏ nổi lơ lửng ở bên phải; ba ô ngày nhỏ, chữ "Validation (chỉnh điểm & ngưỡng)" **chạm viền** ô; dưới ô ngày là khoảng trống.

Sửa:
1. Hàng đầu: bỏ `-mt-1.5`; phụ đề `class="sub"`; huy hiệu đỏ đặt cùng hàng, `self-center`, cỡ 12 px.
2. Ba ô số: nhãn 16 px.
3. Hàng dưới 2 cột (`gap-6`):
   - Trái: nhãn "CHIA DỮ LIỆU THEO NGÀY" 13 px; **xếp ba ô ngày theo chiều dọc**, mỗi ô một dòng: "**Ngày 1** — Huấn luyện (Train)", "**Ngày 2** — Validation (chỉnh điểm & ngưỡng)", "**Ngày 3** — Kiểm thử (Test khóa)", chữ 15 px, `py-3`.
   - Phải: `takeover_bar.svg` trong `.fig-card`, cao **190 px** (từ 150); xuất lại SVG chữ ≥ 13 px; footnote "Mô hình không biết N…" 13 px.
4. Cột phải và trái có cùng chiều cao ~190 px.

Ngân sách: 108 + ô số 120 + 16 + 22 + 190 + 10 (footnote) = **~466**.

---

### Trang 18 — Chỉ số đánh giá · `experiment-and-evaluation/02-metrics.md` · [TB]

Hiện trạng: đáy 379 (trống **109**). Chữ 14 px; thẻ phải thấp hơn thẻ trái (còn trống bên dưới); dải "Ràng buộc đạt" 12,5 px chạy một dòng sát hai mép; footnote 11 px.

Sửa:
1. Hai thẻ: `items-stretch`; chữ 16 px, tiêu đề 17 px, `p-4`, `space-y-2`.
2. Hộp "Lưu ý về mẫu số": 15 px, `p-3.5`; số "0,755 → 0,613" tăng 22 px đậm.
3. **Dải ràng buộc**: bỏ chạy một dòng; nhãn "RÀNG BUỘC ĐẠT (ĐẶT TRƯỚC)" 13 px ở trên, dưới là 4 chip `grid-cols-4` (14 px, `p-2.5`, tự rớt 2 dòng): "Phát hiện ≥ 80%" · "Median TTD ≤ 150 phím" · "Chưa cảnh báo tại 150 phím ≤ 15%" · "Không thu hồi oan (0 ca)".
4. Footnote FAR/FRR/EER: 12 px.

Ngân sách: 108 + thẻ ~130 + 14 + hộp 76 + 14 + dải ~76 + footnote 18 = **~436**.

---

### Trang 19 — Kết quả chẩn đoán · `experiment-and-evaluation/03-main-results.md` · [CAO]

Hiện trạng: đáy 487 — **banner chạm số trang**; `items-center` đẩy bảng/hình xuống giữa (hổng ~58 px dưới phụ đề, ~44 px giữa bảng và banner); **hình tràn lề phải ~13 px**; bảng 13,5 px, đầu cột phụ 10,5 px, footer bảng 10,5 px; chữ tick trong scatter ≈ 9–11 px; nền trắng của scatter.

Sửa:
1. Grid theo G6 (`.cols-58-42`, `items-start`).
2. Bảng: chữ 15 px, đầu cột phụ ("432 ca", "150 phím", "TTD"…) 12 px, hàng `p-2`; footer bảng 12 px (có thể chuyển "* Trung bình 4 hồ sơ…" vào ghi chú).
3. `tradeoff_scatter.svg` trong `.fig-card`, cao ~300 px; **xuất lại**: tick 13 px, nhãn điểm (L1 B0, IF P1…) 14 px đậm, tiêu đề trục 13 px.
4. Banner 2 dòng: `mt-4`, 15 px, `py-2`; **đáy ≤ 480**.

Ngân sách: 108 + 300 + 16 + 56 = **~480** (sát giới hạn; nếu chạm thì giảm hình xuống 280).

---

### Trang 21 — Demo 1 · Thu thập · `demo/01-collector.md` · [TB]

Hiện trạng: đáy 382 (trống **106**). Các bước 14 px; ba chip 13 px, sát ngay dưới ảnh; ảnh chụp giao diện thu nhỏ nên chữ trong ảnh không đọc được (chấp nhận được cho ảnh chụp, nhưng nên cắt vùng chính).

Sửa:
1. Các bước: 17 px, `space-y-3`.
2. Ảnh collector: cắt chỉ giữ **vùng gõ + thanh trạng thái** để chữ đọc được; `max-h-[250px]`.
3. Ba chip: 15 px, `p-3`, `mt-5`.
4. Hàng 2 cột `items-start` (hiện `items-center` làm cột chữ lệch so với ảnh).

Ngân sách: nội dung bắt đầu ~128 (có DemoProgress) + 250 + 20 + 48 = **~446**.

---

### Trang 22 — Demo 2 · Phát lại · `demo/02-replay-trace.md` · [TB]

Hiện trạng: đáy 427 (trống 61). Thanh cấu hình 13 px, chú giải màu 12 px, chú thích dưới biểu đồ 12 px, nhãn trục W0…W9 ≈ 10–11 px, banner 12,5 px.

Sửa:
1. Thanh cấu hình: 14 px; chú giải: 13 px.
2. Tiêu đề ca: 15 px; chú thích dưới biểu đồ: 14 px.
3. Component `CusumTrace`: tăng cỡ nhãn trục/ngưỡng lên 12–13 px; tăng chiều cao vùng vẽ ~+20 px.
4. Banner "Đánh giá": 14 px, `py-2.5`; `mt-3`.

Ngân sách: 427 + 20 + 10 + 12 = **~470**.

---

### Trang 23 — Demo 3 · Đối chiếu · `demo/03-reconcile.md` · [CAO — trống]

Hiện trạng: đáy 332 (trống **156**). Log (terminal) 12,5 px / 11 px, thẻ phải 13,5 px; hai cột không bằng nhau.

Sửa (chọn 1):
- **Phương án A (khuyến nghị):** phóng chữ log lên 15 px (`leading-relaxed`, `p-5`), thẻ phải 16 px/`p-4`, hai cột `items-stretch`; **thêm một hàng 3 ô số lớn** bên dưới, dùng chính các số đã có: `29.183 quyết định` · `7.600 sự kiện MFA/thu hồi` · `3.520 kết cục` (kiểu ô số của trang 17, số 32 px). Bỏ các số này khỏi thẻ xanh, thẻ xanh chỉ còn câu "Khớp hoàn toàn 0 sai lệch". Không thêm số liệu mới.
- **Phương án B:** chỉ phóng chữ lên 16–17 px, `py-4`, `gap-4`; chấp nhận còn trống ~70 px.

Ngân sách A: 128 + 190 + 16 + 100 = **~434**; thêm `mt-6` để tới ~450.

Lưu ý nội dung (từ ghi chú cũ `slidev_fix_cho_AI_local.md` §7): xác nhận công cụ đối chiếu chạy được trước buổi trình bày.

---

### Trang 25 — Giới hạn nghiên cứu · `limitations-and-conclusion/01-limitations.md` · [CAO — trống nhiều nhất]

Hiện trạng: đáy 306 (trống **182**). Thẻ dính tiêu đề (~3 px); chữ thẻ 13,5/14,5 px; dải "Chưa hiện thực" 12,5 px.

Sửa:
1. Lưới thẻ: `class="first"`; `grid-cols-2 gap-4`, mỗi thẻ `p-4 min-h-[112px]`; tiêu đề thẻ 18 px; nội dung 16 px, `leading-relaxed`.
2. Dải "Chưa hiện thực": đổi thành **nhãn + 4 chip** `grid-cols-4` (14–15 px, `p-3`): "Hệ thống live end-to-end" · "Chống phát lại trên mạng" · "Cập nhật hồ sơ sau MFA (P2)" · "Thuật toán One-Class SVM"; nhãn "CHƯA HIỆN THỰC" 13 px ở trên.
3. `mt-5` giữa lưới và dải.

Ngân sách: 96 + 16 + 2 × 124 + 16 + 20 + 16 + 64 = **~476**. Nếu tràn, `min-h` còn 104.

---

### Trang 26 — Kết luận và hướng phát triển · `limitations-and-conclusion/02-conclusion.md` · [CAO]

Hiện trạng: đáy 352 (trống **136**). Nhãn "ĐIỀU RÚT RA"/"BƯỚC TIẾP THEO" **dính tiêu đề**; chữ 14 px; số thứ tự của danh sách phải nằm **ngoài** thẻ; ba thẻ trái và ba thẻ phải không cao bằng nhau.

Sửa:
1. Nhãn cột: `class="first"`, 13 px, `mb-3`.
2. Cột trái: ba thẻ `p-4`, chữ 16 px (tiêu đề 17 px), `gap-4`.
3. Cột phải: bỏ `list-decimal`; thay bằng ba thẻ có **huy hiệu số tròn** `w-7 h-7` bên trong (giống huy hiệu trang 11), `p-4`, 16 px.
4. Hai cột có cùng chiều cao tổng (đặt `h-[340px]`, mỗi thẻ `flex-1`) để ba cặp thẻ thẳng hàng.
5. `v-click` giữ nguyên thứ tự.

Ngân sách: 96 + 16 + 24 + 340 = **~476**.

---

### Trang 28 — Tài liệu tham khảo · `references/01-references.md` · [TB]

Hiện trạng: đáy 408 (trống 80). Dùng `layout: default` nên **tiêu đề lệch vị trí** so với các trang `shifting-intro` (y ≈ 30–60 so với 42–74; x = 65 so với 70); chữ 13 px; cột trái 7 mục, cột phải 5 mục (lệch).

Sửa:
1. Đổi sang `layout: shifting-intro` (hoặc thêm cùng padding) để tiêu đề trùng vị trí các trang khác.
2. Chuyển mục "NIST/SEMATECH" sang cột phải → **6 / 6**.
3. Chữ 14,5 px; khoảng giữa các mục `gap-y-3`.
4. Dòng 2 của các mục dài (Bours, Kiyani) tự rớt; giữ.
5. Cân nhắc **đánh số [1]–[12]** (hoặc theo số trong báo cáo) để khớp trang 15.

---

### Trang 29 — Cảm ơn · `slides.md` · [OK]

Giữ nguyên. Nhỏ: đường link GitHub cách số trang ~10 px; nếu muốn, nâng `bottom-6` → `bottom-8`.

---

## 3. Thứ tự sửa đề xuất

| Đợt | Việc | Trang |
|---|---|---|
| 0 | Thêm class và sửa `style.css` (G1–G8), xóa trùng khai báo h1 | toàn bộ |
| 1 | Lỗi đè/tràn nhìn thấy ngay | 8, 17, 14, 19, 12, 13 |
| 2 | Trống nhiều (> 100 px) | 25, 23, 26, 11, 15, 9, 18, 21 |
| 3 | Tinh chỉnh chữ/giãn cách | 7, 4, 5, 6, 22, 28, 1 |
| 4 | Xuất lại hình (làm song song) | H1 (4), H2 (5), H4 (14), `feature_timeline.svg` (12), `cusum_charts.svg` (13), `takeover_bar.svg` (17), `tradeoff_scatter.svg` (19) |

## 4. Kiểm tra sau mỗi trang

1. Đáy nội dung nằm trong **[450 – 480] px**; không phần tử nào chạm vùng số trang.
2. Không chữ nào < 12 px; nội dung chính ≥ 15 px; chữ trong hình ≥ 13 px sau khi co.
3. Các thẻ cùng hàng cao bằng nhau; không chữ chạm viền thẻ (đệm ≥ 12 px).
4. Không đè lên tiêu đề; khoảng tiêu đề/phụ đề → nội dung ≥ 14 px.
5. Cột phải không vượt lề phải (x ≤ 1390 trên ảnh 1456 px).
6. Xuất PDF lại, chạy script Phụ lục A, so với bảng đo mục 0.

## 5. Prompt cho AI local (mỗi lần một trang)

> Sửa trang {N} theo mục "Sửa từng trang" của `slide-layout-review.md` và các class ở mục "Sửa chung". Không thêm số liệu hay khẳng định mới. Không dùng `$…$` trong HTML; dùng `<sub>`. Không dùng cỡ chữ < 12 px; nội dung chính ≥ 15 px. Giữ đáy nội dung trong 450–480 px của canvas 980×552. Giữ nguyên thứ tự `v-click`. Chỉ trả về markdown của trang đó và danh sách class đã đổi.

---

## Phụ lục A — Script đo khoảng trống

```python
# python3 measure.py slides-export.pdf   (cần poppler-utils, pillow, numpy)
import re, subprocess, sys
import numpy as np
from PIL import Image

pdf = sys.argv[1]
n = int(re.search(r'Pages:\s+(\d+)', subprocess.run(['pdfinfo', pdf], capture_output=True, text=True).stdout).group(1))
last = {}
for p in range(1, n + 1):
    t = subprocess.run(['pdftotext', '-f', str(p), '-l', str(p), '-layout', pdf, '-'],
                       capture_output=True, text=True).stdout
    m = re.findall(r'(\d+)\s*/\s*29', t)
    if m:
        last[int(m[-1])] = p          # trang PDF cuối của mỗi slide = sau click cuối

SC = 1456 / 980
for s, p in sorted(last.items()):
    subprocess.run(['pdftoppm', '-f', str(p), '-l', str(p), '-r', '150', '-png',
                    '-scale-to-x', '1456', '-scale-to-y', '820', pdf, f'/tmp/s{s:02d}'], check=True)
    f = [x for x in __import__('glob').glob(f'/tmp/s{s:02d}-*.png')][0]
    im = np.array(Image.open(f).convert('RGB')).astype(int)
    bg = im[10, 10]
    mask = np.abs(im - bg).sum(axis=2) > 30
    mask[690:, 1250:] = False          # bỏ vùng số trang
    rows = np.where(mask.any(axis=1))[0]
    bottom = rows.max() / SC
    print(f'slide {s:2d}: đáy {bottom:5.0f}px  trống {488 - bottom:5.0f}px')
```

Lưu ý: slide chia mục và bìa có nền ảnh nên số đo của chúng không có nghĩa.

## Phụ lục B — Những chỗ KHÔNG cần sửa

- Trang 2 (mục lục), 29 (cảm ơn), các trang chia mục: bố cục ổn.
- Trang 13: đáy 458 đã gần mục tiêu; chỉ cần sửa đầu trang và công thức.
- Trang 22: biểu đồ cột đã dễ đọc; chỉ cần tăng cỡ chữ phụ.
- Bảng trang 6 (17 px) và danh sách tài liệu trang 28 có cỡ chữ gần đạt chuẩn.
