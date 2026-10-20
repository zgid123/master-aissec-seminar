---
title: "Xác thực liên tục thích ứng dựa trên nhịp gõ phím"
theme: "@alphacifer/slidev-academic-theme"
colorSchema: light
addons:
  - "@alphacifer/slidev-addon-theme"
background: ./assets/main.png
drawings:
  persist: false
transition: slide-left
mdc: true
comark: true
hideInToc: true
fonts:
  sans: Roboto
  serif: Roboto
  mono: Roboto Mono
duration: 15min
---

# Xác thực liên tục thích ứng<br>dựa trên nhịp gõ phím

<span class="text-[24px] text-cyan-300">Phát hiện tiếp quản phiên sau khi đã qua MFA</span>

<Speaker
  :team="[
    'Nhóm 02 (2026-10-20)',
    '25C12011 - Nguyễn Bảo Trâm',
    '25C11012 - Võ Công Minh',
    '25C12016 - Trần Huy Vũ',
    '25C12031 - Dương Tấn Huỳnh Phong',
  ]"
  :date="'2026-10-20'"
  class="!right-[44px] !bottom-[36px] [&_.alpha-date]:hidden"
/>

<Speaker
  :team="[
    'Giảng viên hướng dẫn:',
    'PGS.TS. Đặng Trần Khánh',
    'TS. Phạm Thị Bạch Huệ',
    'ThS. Lương Vĩ Minh',
  ]"
  :date="'2026-10-20'"
  class="!left-[44px] !right-auto !bottom-[36px] [&_.alpha-date]:hidden"
/>

<style>
.alpha-academic-cover {
  background-color: #606060;
  background-blend-mode: multiply;
}
.alpha-academic-cover h1 {
  font-size: 2.7rem !important;
  line-height: 1.2 !important;
  text-wrap: balance !important;
}
.alpha-academic-cover__content > h1,
.alpha-academic-cover__content > p {
  transform: translateY(-70px);
}

/* Headings: prevent truncation & overflow across all slides */
.alpha-transition-heading {
  white-space: normal !important;
  max-width: calc(100% - 6rem) !important;
  box-sizing: border-box !important;
}
</style>

<!--
Mục tiêu: 0:15

Chúng em trình bày đề tài xác thực liên tục dựa trên nhịp gõ phím. Phần kết quả hiện chạy trên dữ liệu mô phỏng và chúng em sẽ nói rõ điều đó ở từng chỗ.
-->

---
layout: arc-toc
hideInToc: true
transition: slide-left
indexed: true
---

# Mục lục

<!--
Mục tiêu: 0:05

Bài trình bày gồm năm phần chính: 1. Bối cảnh và bài toán · 2. Phương pháp và kiến trúc · 3. Thực nghiệm và kết quả · 4. Demo · 5. Giới hạn và kết luận.
-->

---
src: ./pages/problem-and-motivation/main.md
---

---
src: ./pages/method-and-architecture/main.md
---

---
src: ./pages/experiment-and-evaluation/main.md
---

---
src: ./pages/demo/main.md
---

---
src: ./pages/limitations-and-conclusion/main.md
---

---
src: ./pages/references/main.md
---

---
layout: default
hideInToc: true
class: "h-full flex flex-col items-center justify-center text-center relative"
---

<div class="flex flex-col items-center justify-center">
  <h1 class="!text-5xl !font-bold text-sky-600 !mb-2">Xin cảm ơn thầy cô và các bạn đã lắng nghe.</h1>
</div>

<div class="absolute bottom-8 left-0 right-0 text-center text-[15px] text-slate-500 font-medium">
  Mã nguồn và bộ dữ liệu mô phỏng: <a href="https://github.com/zgid123/master-aissec-seminar.git" target="_blank" class="text-sky-600 underline">https://github.com/zgid123/master-aissec-seminar.git</a>
</div>

<!--
Mục tiêu: 0:10

Chúng em xin chân thành cảm ơn thầy cô và các bạn đã lắng nghe. Nhóm sẵn sàng nhận câu hỏi và góp ý.
-->
