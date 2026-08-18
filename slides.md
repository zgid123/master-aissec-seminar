---
title: "Dynamic Data Masking trong DuckDB"
theme: seriph
addons:
  - '@alphacifer/slidev-addon-theme'
background: ./assets/main.png
drawings:
  persist: false
transition: slide-left
mdc: true
comark: true
hideInToc: true
fonts:
  sans: Roboto Mono
  serif: Roboto Mono
  mono: Roboto Mono
duration: 10min
---

# Dynamic Data Masking trong DuckDB

<style scoped>
.slidev-page-1 > .slidev-layout h1 {
  font-size: 2rem;
  /* color: #88ffff; */
  /* color: #2b90b6; */
  color: #2efab0;
  /* color: #ffda58; */
}
</style>

<Speaker
  :team="[
    '25C12011 - Nguyễn Bảo Trâm',
    '25C11012 - Võ Công Minh',
    '25C12016 - Trần Huy Vũ',
    '25C12031 - Dương Tấn Huỳnh Phong',
  ]"
  :date="'2026-08-18'"
/>

<!-- <Speaker :date="'2026-08-18'" /> -->

---
layout: default
hideInToc: true
transition: slide-left
---

<div class="toc-container">

<div class="toc-header">
  <h1 class="toc-title">NỘI DUNG CHÍNH</h1>
  <div class="toc-glow-line">
    <span class="glow-dot"></span>
    <span class="glow-bar"></span>
  </div>
</div>

<div class="toc-grid">
  <div class="toc-card" v-click>
    <div class="sec-num">01</div>
    <div class="card-divider">
      <span class="divider-line left"></span>
      <span class="divider-dot"></span>
      <span class="divider-line right"></span>
    </div>
    <div class="card-icon">
      <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <ellipse cx="12" cy="10" rx="3.5" ry="1.2"/>
        <path d="M8.5 10v2.5c0 .66 1.57 1.2 3.5 1.2s3.5-.54 3.5-1.2V10"/>
        <path d="M8.5 12.5V15c0 .66 1.57 1.2 3.5 1.2s3.5-.54 3.5-1.2v-2.5"/>
      </svg>
    </div>
    <div class="card-title">TỔNG QUAN<br/>BẢO MẬT CƠ SỞ DỮ LIỆU</div>
    <div class="card-desc">Những kiến thức nền tảng về bảo mật cơ sở dữ liệu</div>
  </div>

  <div class="toc-card" v-click>
    <div class="sec-num">02</div>
    <div class="card-divider">
      <span class="divider-line left"></span>
      <span class="divider-dot"></span>
      <span class="divider-line right"></span>
    </div>
    <div class="card-icon">
      <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <rect x="3" y="10" width="11" height="11" rx="2"/>
        <path d="M6 10V6a3 3 0 0 1 6 0v4"/>
        <circle cx="8.5" cy="15.5" r="1.2"/>
        <path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        <path d="M21 21v-1.5a3.5 3.5 0 0 0-5-3.1"/>
      </svg>
    </div>
    <div class="card-title">NỀN TẢNG<br/>VỀ DATA MASKING</div>
    <div class="card-desc">Khái niệm, vai trò và nguyên tắc của Data Masking</div>
  </div>

  <div class="toc-card" v-click>
    <div class="sec-num">03</div>
    <div class="card-divider">
      <span class="divider-line left"></span>
      <span class="divider-dot"></span>
      <span class="divider-line right"></span>
    </div>
    <div class="card-icon">
      <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <ellipse cx="12" cy="5" rx="6.5" ry="2"/>
        <path d="M5.5 5v5c0 1.1 2.9 2 6.5 2s6.5-.9 6.5-2V5"/>
        <path d="M5.5 10v3.5c0 .8 1.5 1.5 3.5 1.8"/>
        <path d="M18.5 10v3.5c0 .8-1.5 1.5-3.5 1.8"/>
        <path d="M8.5 17.5a2.2 2.2 0 1 0 0-3.6 2.2 2.2 0 0 0 0 3.6z"/>
        <path d="M15.5 17.5a2.2 2.2 0 1 0 0-3.6 2.2 2.2 0 0 0 0 3.6z"/>
        <path d="M10.7 15.7h2.6"/>
      </svg>
    </div>
    <div class="card-title">DYNAMIC DATA MASKING<br/>TRONG DUCKDB</div>
    <div class="card-desc">Cơ chế hoạt động và triển khai trong DuckDB</div>
  </div>

  <div class="toc-card" v-click>
    <div class="sec-num">04</div>
    <div class="card-divider">
      <span class="divider-line left"></span>
      <span class="divider-dot"></span>
      <span class="divider-line right"></span>
    </div>
    <div class="card-icon">
      <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <rect x="3" y="3.5" width="18" height="12" rx="1.5"/>
        <polygon points="10 6.5 15 9.5 10 12.5 10 6.5" fill="currentColor"/>
        <line x1="12" y1="15.5" x2="12" y2="20"/>
        <line x1="8" y1="20" x2="16" y2="20"/>
      </svg>
    </div>
    <div class="card-title">DEMO<br/>VÀ THẢO LUẬN</div>
    <div class="card-desc">Minh họa thực tế và thảo luận cùng Q&A</div>
  </div>
</div>

</div>

<style scoped>
.toc-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0.5rem 0.25rem 0.5rem;
  justify-content: flex-start;
}

.toc-header {
  margin-bottom: 1.25rem;
}

.toc-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #00e5ff;
  letter-spacing: 0.04em;
  line-height: 1.2;
  margin: 0;
  text-transform: uppercase;
}

.toc-glow-line {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.4rem;
}

.glow-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background-color: #00e5ff;
  box-shadow: 0 0 10px #00e5ff, 0 0 20px #00e5ff;
}

.glow-bar {
  height: 2px;
  width: 14rem;
  background: linear-gradient(90deg, #00e5ff 0%, rgba(0, 229, 255, 0.4) 60%, transparent 100%);
  box-shadow: 0 0 8px rgba(0, 229, 255, 0.5);
}

.toc-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.1rem;
  flex: 1;
  max-height: 23.5rem;
}

.toc-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.25rem 1rem 1.1rem;
  border-radius: 1.1rem;
  background: radial-gradient(circle at 50% 0%, rgba(0, 229, 255, 0.06), rgba(6, 18, 28, 0.85));
  border: 1.5px solid rgba(0, 229, 255, 0.38);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45), inset 0 0 15px rgba(0, 229, 255, 0.04);
  transition: all 0.3s ease;
}

.sec-num {
  font-size: 3.2rem;
  font-weight: 900;
  color: #00e5ff;
  line-height: 1;
  letter-spacing: -0.02em;
  text-shadow: 0 0 20px rgba(0, 229, 255, 0.35);
  margin-top: 0.2rem;
}

.card-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0.75rem 0 0.85rem;
}

.divider-line {
  flex: 1;
  height: 1.5px;
}

.divider-line.left {
  background: linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.7));
}

.divider-line.right {
  background: linear-gradient(90deg, rgba(0, 229, 255, 0.7), transparent);
}

.divider-dot {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 9999px;
  background-color: #00e5ff;
  margin: 0 0.35rem;
  box-shadow: 0 0 8px #00e5ff;
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.85rem;
}

.icon-svg {
  width: 3.6rem;
  height: 3.6rem;
  color: #00e5ff;
  filter: drop-shadow(0 0 10px rgba(0, 229, 255, 0.35));
}

.card-title {
  font-size: 0.95rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.35;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  margin-bottom: 0.65rem;
  min-height: 2.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-desc {
  font-size: 0.78rem;
  color: #94a3b8;
  line-height: 1.45;
  margin-top: auto;
}
</style>

---
src: ./pages/database-security-overview/main.md
---

---
src: ./pages/data-masking-fundamentals/main.md
---

---
src: ./pages/dynamic-data-masking-in-duckdb/main.md
---

---
src: ./pages/demonstration-and-discussion/main.md
---

---
layout: thanks
preload: false
transition: fade
---
