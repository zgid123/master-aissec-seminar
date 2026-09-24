---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Hai lần xuất, hai kết quả theo chính sách


<PipelineFlow focus="export" outcome="block" compact />

<div class="grid grid-cols-2 gap-4 mt-3 text-[11px] leading-snug">
  <div class="rounded-xl border border-emerald-300 bg-emerald-50 p-4">
    <div class="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">
      Trường hợp A · đích đã duyệt
    </div>
    <div class="mt-1 text-[16px] font-bold">customer_segments</div>
    <div class="mt-2 rounded bg-white/70 p-2 font-mono">
      customer_id · email · segment · spend
      <br />
      đích = kho phân tích nội bộ đã duyệt
    </div>
    <div class="mt-2 font-mono">
      NẾU có định danh VÀ đích chưa duyệt → CHẶN
      <br />
      NGƯỢC LẠI → CHO PHÉP + GHI
    </div>
    <div class="mt-2 text-[17px] font-black text-emerald-700">CHO PHÉP + GHI NHẬT KÝ</div>
    <div>Lý do: cùng dữ liệu nhạy cảm; đích được duyệt.</div>
  </div>
  <div class="rounded-xl border border-rose-300 bg-rose-50 p-4">
    <div class="text-[10px] font-bold uppercase tracking-[0.12em] text-rose-700">
      Trường hợp B · đích chưa duyệt
    </div>
    <div class="mt-1 text-[16px] font-bold">customer_segments</div>
    <div class="mt-2 rounded bg-white/70 p-2 font-mono">
      customer_id · email · segment · spend
      <br />
      đích = dịch vụ ngoài chưa duyệt
    </div>
    <div class="mt-2 font-mono">NẾU có định danh VÀ đích chưa duyệt → CHẶN</div>
    <div class="mt-2 text-[17px] font-black text-rose-700">CHẶN + GHI NHẬT KÝ</div>
    <div>Lý do: cùng dữ liệu nhạy cảm; chỉ đổi đích gửi.</div>
  </div>
</div>

<div
  class="mt-3 rounded-lg border border-slate-300 bg-slate-50 p-2 text-center text-[10px] text-slate-600"
>
  Đây là <b>minh họa logic chính sách</b>, không phải demo chạy thật. Ví dụ dùng dữ liệu tổng hợp, không chứa thông tin cá nhân thật.
</div>

<!--
Mục tiêu: 2:00

Đây là minh họa logic chính sách, không phải demo trực tiếp hay hệ thống đang chạy. Dữ liệu trong ví dụ là dữ liệu tổng hợp.

Quy tắc được viết rõ: nếu bản xuất có định danh khách hàng và đích không nằm trong danh sách được duyệt thì chặn; các trường hợp còn lại được cho phép theo chính sách mẫu và đều ghi sự kiện. Hai trường hợp giữ nguyên tập dữ liệu có customer_id và email; chỉ thay đổi đích gửi để cô lập một yếu tố.

Trường hợp A gửi cùng tập customer_segments nhạy cảm tới kho phân tích nội bộ đã duyệt, nên cho phép và ghi nhật ký.

Trường hợp B gửi đúng tập dữ liệu đó tới dịch vụ ngoài chưa duyệt. Chỉ đích thay đổi; điểm xuất phải từ chối trước khi ghi byte và lưu sự kiện.

Vì đây chỉ là walkthrough tĩnh, nó minh họa quyết định mong muốn nhưng không chứng minh rằng byte thật sự bị chặn. Cần thử nghiệm với một điểm xuất có tích hợp thực.

Chuyển ý: Với thiết kế chưa có triển khai chạy được, ta sẽ đánh giá theo kế hoạch nào?
-->
