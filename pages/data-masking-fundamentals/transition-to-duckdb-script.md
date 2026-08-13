# Script nói — Slide "Vì sao nhóm chốt DuckDB cho phần triển khai?"

> Slide bản lề: chốt phần Data Masking của mình và bàn giao cho section 3 (DuckDB).
> Thời lượng mục tiêu: **~45–60 giây**. Nói chậm, mỗi lần click là một ý.

---

## Lời thoại đầy đủ (đọc tự nhiên)

**[Mở đầu — khi tiêu đề slide hiện ra]**
"Trước khi qua phần triển khai, mình muốn giải thích nhanh vì sao nhóm chọn DuckDB."

**[CLICK 1 — hiện ý 1]**
"Ban đầu tụi mình có vài hướng do AI gợi ý, nhưng cuối cùng chốt DuckDB, vì nó giúp bám sát đúng mục tiêu của seminar hôm nay."

**[CLICK 2 — hiện ý 2]**
"Lý do thứ hai: DuckDB có sẵn các SQL primitives để mình thử nghiệm masking ngay — như `CASE`, `concat`, `regexp`, rồi macro và view."

**[CLICK 3 — hiện ý 3]**
"Và quan trọng nhất: nó giúp mình nhìn rõ được ranh giới giữa phần logic masking và lớp enforcement — tức là ai được quyền thấy dữ liệu thật."

**[CLICK 4 — hiện câu chuyển phần]**
"Vậy là xong phần khái niệm. Giờ mình chuyển sang phần triển khai cụ thể với DuckDB."

**[CLICK 5 — hiện câu bàn giao, quay sang người kế tiếp]**
"Mình xin mời [tên bạn kế tiếp] trình bày section 3 — Dynamic Data Masking in DuckDB. Cảm ơn mọi người."

---

## Bản rút gọn (nếu bị hụt thời gian ~20s)

"Nhóm chọn DuckDB vì nó bám đúng mục tiêu seminar và có sẵn SQL primitives để thử nghiệm masking. Quan trọng nhất, nó cho mình thấy rõ ranh giới giữa masking logic và lớp enforcement. Giờ mình xin mời [tên bạn] trình bày phần triển khai với DuckDB."

---

## Note nhắc bài (đọc ở chế độ Presenter)

- **Nhịp bấm:** 5 click = 5 ý. Đừng bấm dồn, nói hết ý rồi mới bấm tiếp.
- **Đừng thêm nội dung kỹ thuật mới** ở slide này — chỉ chốt lại + mở đường.
- **Câu quan trọng nhất là ý 3** (ranh giới masking vs enforcement) → nhấn giọng chỗ này.
- **Kết thúc dứt khoát:** quay người/ánh mắt sang speaker kế tiếp, KHÔNG bỏ lửng câu.
- **Nếu quên lời:** chỉ cần nói ý 1 + ý 3 rồi qua thẳng câu bàn giao.
- **Thay `[tên bạn kế tiếp]`** bằng tên thật của bạn trình bày section 3.
