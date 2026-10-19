---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Kiến trúc hệ thống

<div class="mt-2 flex items-stretch gap-1.5 text-[13px] leading-tight">
  <div class="arch done"><span class="num">1</span><b>Thu nhận sự kiện</b><span>keydown, keyup<br>nhóm phím</span></div>
  <div class="arrow">→</div>
  <div class="arch todo"><span class="num">+</span><b>Kiểm tra gói</b><span>TLS, seq, nonce<br>chống phát lại</span></div>
  <div class="arrow">→</div>
  <div class="arch done"><span class="num">2</span><b>Trích đặc trưng</b><span>cửa sổ 50 phím<br>12 đặc trưng</span></div>
  <div class="arrow">→</div>
  <div class="arch done"><span class="num">3</span><b>Điểm bất thường</b><span>L1 hoặc<br>Isolation Forest</span></div>
  <div class="arrow">→</div>
  <div class="arch done"><span class="num">4</span><b>Tích lũy rủi ro</b><span>robust z<br>CUSUM, h₁, h₂</span></div>
  <div class="arrow">→</div>
  <div class="arch done"><span class="num">5</span><b>Điều khiển phiên</b><span>CONTINUE<br>MFA, REVOKE</span></div>
</div>

<div class="mt-2 grid grid-cols-[1fr_1fr] gap-3 text-[13px]">
  <div class="rounded border border-dashed border-slate-400 bg-slate-50 px-3 py-1.5 text-center text-slate-700"><b>Kho hồ sơ người dùng</b>: chuẩn hóa, mô hình, median và MAD theo từng tài khoản</div>
  <div class="rounded border border-dashed border-slate-400 bg-slate-50 px-3 py-1.5 text-center text-slate-700"><b>Nhật ký</b>: decisions.csv, events.csv, scenario_results.csv, run.json</div>
</div>

<div class="mt-3 grid grid-cols-3 gap-4 text-[14px] leading-snug">
  <div v-click class="border-l-4 border-emerald-500 bg-emerald-50 px-3 py-2">
    <b>Đã hiện thực</b><br>Collector trên trình duyệt, pipeline đặc trưng, hai scorer, chính sách B0, B1, P1 và bộ đánh giá replay.
  </div>
  <div v-click class="border-l-4 border-amber-500 bg-amber-50 px-3 py-2">
    <b>Còn là thiết kế</b><br>Lớp truyền TLS kèm seq và nonce, endpoint live, MFA thật. Collector chưa nối trực tiếp vào bộ điều khiển phiên.
  </div>
  <div v-click class="border-l-4 border-sky-500 bg-sky-50 px-3 py-2">
    <b>Một pipeline, khác cấu hình</b><br>Mọi chính sách chạy cùng dữ liệu và cùng chuỗi tiếp quản. Nhãn thật không đi vào bước chấm điểm.
  </div>
</div>

<style scoped>
.arch { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; text-align: center; border-radius: 8px; border: 2px solid; padding: 8px 4px; }
.arch span:last-child { color: #475569; font-size: 12px; }
.arch.done { border-color: #10b981; background: #ecfdf5; }
.arch.todo { border-color: #f59e0b; border-style: dashed; background: #fffbeb; }
.num { display: inline-flex; width: 20px; height: 20px; align-items: center; justify-content: center; border-radius: 999px; background: #0f172a; color: white; font-size: 11px; font-weight: 700; }
.todo .num { background: #b45309; }
.arrow { align-self: center; color: #64748b; font-weight: 700; }
</style>

<!--
Mục tiêu: 0:50

Hệ thống gồm năm bước: collector trên trình duyệt chỉ ghi nhóm phím và thời điểm; cắt cửa sổ 50 phím, tính 12 đặc trưng; chấm điểm bất thường bằng khoảng cách L1 hoặc Isolation Forest; chuẩn hóa theo từng người và cộng dồn bằng CUSUM; cuối cùng bộ điều khiển chọn tiếp tục, hỏi MFA hoặc thu hồi phiên.

[CLICK] Màu xanh là phần đã hiện thực.

[CLICK] Khối viền vàng là phần còn ở mức thiết kế: lớp truyền chống phát lại, luồng chạy trực tiếp và MFA thật.

[CLICK] Mọi chính sách dùng cùng pipeline và cùng dữ liệu, nên so sánh công bằng.
-->
