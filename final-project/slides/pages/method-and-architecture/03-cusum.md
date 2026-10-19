---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Cộng dồn bằng chứng bằng CUSUM

<div class="mt-1 grid grid-cols-[1fr_1.1fr] gap-6 items-start">
  <div>
    <div class="rounded-lg bg-slate-50 px-4 py-2">

$$S_t = \max\bigl(0,\ \lambda S_{t-1} + z_t - k\bigr)$$

</div>
    <ul class="mt-2 !pl-5 text-[15px] leading-snug [&_li]:!my-1">
      <li><b>k</b> bỏ qua dao động nhỏ.</li>
      <li><b>λ</b> là hệ số quên: λ = 1 là CUSUM chuẩn, λ &lt; 1 làm bằng chứng cũ phai dần.</li>
      <li>Hai ngưỡng: <b>h₁</b> hỏi MFA, <b>h₂ = 2h₁</b> thu hồi phiên.</li>
    </ul>
  </div>
  <div v-click class="text-[14px]">
    <div class="font-bold text-slate-600">Ví dụ minh họa: z = 3 ba cửa sổ liền, λ = 0,9, k = 0,5, ngưỡng 6</div>
    <table class="mt-2 w-full text-center">
      <thead><tr class="bg-slate-100"><th>Cửa sổ</th><th>z<sub>t</sub></th><th>S<sub>t</sub> (CUSUM)</th><th>Từng cửa sổ</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>3</td><td>2,5</td><td>3 &lt; 6</td></tr>
        <tr><td>2</td><td>3</td><td>4,75</td><td>3 &lt; 6</td></tr>
        <tr class="bg-rose-50 font-bold"><td>3</td><td>3</td><td class="text-rose-700">6,775 ≥ 6</td><td>3 &lt; 6</td></tr>
      </tbody>
    </table>
    <div v-click class="mt-3 border-l-4 border-violet-500 bg-violet-50 px-3 py-2 leading-snug">
      Từng cửa sổ chỉ <b>hơi lạ</b> nên quyết định riêng lẻ bỏ qua. CUSUM thấy chúng <b>lạ liên tục</b> và vượt ngưỡng ở cửa sổ thứ ba.
    </div>
  </div>
</div>

<!--
Mục tiêu: 1:00

Thay vì quyết định riêng từng cửa sổ, nhóm cộng dồn bằng chứng bằng CUSUM một phía. Mỗi cửa sổ trừ đi k để bỏ qua dao động nhỏ, và nhân điểm cũ với hệ số quên lambda. Lambda bằng 1 là CUSUM chuẩn theo NIST/SEMATECH; lambda nhỏ hơn 1 là biến thể của nhóm, giúp bằng chứng cũ phai dần. S vượt h1 thì hỏi MFA, vượt h2 bằng hai lần h1 thì thu hồi ngay.

[CLICK] Ví dụ minh họa, không phải kết quả thực nghiệm: ba cửa sổ liền có z bằng 3. S lần lượt là 2,5; 4,75; rồi 6,775, vượt ngưỡng 6 ở cửa sổ thứ ba.

[CLICK] Nếu quyết định riêng từng cửa sổ với ngưỡng 6 thì không bao giờ cảnh báo vì 3 nhỏ hơn 6. Đó là trực giác của giả thuyết H2.
-->
