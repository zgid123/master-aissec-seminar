---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Khoảng hở sau MFA

<p class="sub">MFA (Multi-Factor Authentication, xác thực đa yếu tố) chỉ kiểm tra lúc đăng nhập</p>

<div class="fig-card" style="height:220px">
  <img src="/img/H1_timeline.svg" alt="Khoảng hở sau MFA" />
</div>

<div class="chips c3 mt-4 text-[16px]">
  <div v-click="1" class="rounded-lg border-l-4 border-amber-500 bg-amber-50/90 shadow-sm p-4 flex flex-col justify-between h-full">
    <div>
      <div class="font-bold text-amber-900 text-[17px]">Cookie phiên</div>
      <div class="mt-1.5 text-slate-700">Mã định danh ngẫu nhiên, không chứa nhịp gõ.</div>
    </div>
    <div class="mt-2 pt-1.5 border-t border-amber-200 text-[13px] text-amber-900 font-medium bg-white/70 px-2 py-1 rounded">
      Trình duyệt &rarr; session_id &rarr; Máy chủ: hợp lệ &check;<br><span class="text-rose-700 font-bold">(không biết ai gõ)</span>
    </div>
  </div>

  <div v-click="2" class="rounded-lg border-l-4 border-sky-500 bg-sky-50/90 shadow-sm p-4 flex flex-col justify-between h-full">
    <div>
      <div class="font-bold text-sky-900 text-[17px]">NIST SP 800-63B-4</div>
      <div class="mt-1.5 text-slate-700">
        Giám sát phiên: <b>tùy chọn</b>.<br>
        Xác thực lại định kỳ: <b>bắt buộc</b>.
      </div>
    </div>
  </div>

  <div v-click="2" class="rounded-lg border-l-4 border-rose-500 bg-rose-50/90 shadow-sm p-4 flex flex-col justify-between h-full">
    <div>
      <div class="font-bold text-rose-900 text-[17px]">Khi nghi vấn</div>
      <div class="mt-1.5 text-slate-700">
        <b>Hỏi lại MFA:</b> khi mức rủi ro vừa.<br>
        <b>Thu hồi phiên:</b> khi mức rủi ro cao.
      </div>
    </div>
  </div>
</div>

<!--
Mục tiêu: 1:00

9 giờ người dùng đăng nhập và qua MFA. 13 giờ 20 người khác ngồi vào máy đang mở. Máy chủ chỉ kiểm tra cookie, mà cookie là mã ngẫu nhiên, nên nó không biết ai đang gõ. NIST coi giám sát phiên là biện pháp tùy chọn, còn xác thực lại định kỳ mới bắt buộc. Khoảng hở này là điều đề tài muốn rút ngắn.
-->
