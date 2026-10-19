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
duration: 20min
---

# Xác thực liên tục thích ứng dựa trên nhịp gõ phím

<span class="text-[24px] text-cyan-300">Phát hiện người lạ tiếp quản phiên sau khi đã qua MFA</span>

<Speaker
  :team="[
    'Nhóm 02',
    '25C12011 - Nguyễn Bảo Trâm',
    '25C11012 - Võ Công Minh',
    '25C12016 - Trần Huy Vũ',
    '25C12031 - Dương Tấn Huỳnh Phong',
  ]"
  :date="'2026-10-20'"
/>

<Speaker
  :team="[
    'Giảng viên hướng dẫn:',
    'PGS.TS. Đặng Trần Khánh',
    'TS. Phạm Thị Bạch Huệ',
    'ThS. Lương Vĩ Minh',
  ]"
  :date="'2026-10-20'"
  class="!left-[30px] !right-auto !bottom-[64px] [&_.alpha-date]:hidden"
/>

<style>
.alpha-academic-cover {
  background-color: #606060;
  background-blend-mode: multiply;
}
.alpha-academic-cover h1 {
  font-size: 2.7rem !important;
  line-height: 1.2 !important;
}
.alpha-academic-cover__content > h1,
.alpha-academic-cover__content > p {
  transform: translateY(-70px);
}
</style>

<!--
Mục tiêu: 0:20

Kính chào thầy cô và các bạn. Em là Võ Công Minh, đại diện nhóm 02 trình bày đồ án cuối kỳ môn An toàn và bảo mật trong hệ thống thông tin.

Đề tài của nhóm là xác thực liên tục thích ứng dựa trên nhịp gõ phím. Câu hỏi nhóm theo đuổi khá đơn giản: sau khi người dùng đã đăng nhập và qua MFA, làm sao biết người đang gõ vẫn là chủ tài khoản?
-->

---
layout: arc-toc
hideInToc: true
transition: slide-left
indexed: true
---

# Mục lục

<!--
Mục tiêu: 0:15

Bài trình bày gồm sáu phần: bối cảnh và bài toán, mô hình đe dọa, phương pháp và kiến trúc, thực nghiệm, demo, cuối cùng là giới hạn và kết luận.
-->

---
src: ./pages/problem-and-motivation/main.md
---

---
src: ./pages/threat-model/main.md
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
layout: thanks
hideInToc: true
---
