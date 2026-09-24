# Data Leakage Prevention (DLP) trong hệ thống Big Data

Slidev seminar deck with Vietnamese slide content and presenter notes. The presentation has a title (0:15), a six-entry table of contents (0:20), 11 content slides totaling 14:15, one untimed research references slide, and a Thank You slide (0:10), for a total speaking time of 15:00.

The six top-level sections are **Bài toán bảo mật Big Data**, **Nền tảng về DLP**, **DLP trong hệ thống Big Data**, **Giải pháp và xu hướng DLP**, **Demo và đánh giá**, and **Giới hạn và kết luận**. Slide sources are organized into six section directories. The root `slides.md` imports each section's `main.md`; each section entry imports its numbered article files in presentation order. The `arc-toc` slide reads the six section-entry titles. The section-title slides organize navigation; timed explanations are in the numbered article slides.

## Preview, build, and export

```bash
cd dlp
pnpm install
pnpm dev
pnpm build
pnpm export
```

Use Slidev presenter view to see the notes and target duration on each timed slide. `slides-export.pdf` is the exported deck.

The current export has 32 PDF pages for 21 numbered slides because reveal steps become separate pages. Rehearse against those actual page transitions for the 15-minute slot; some transitions reveal a heading before the slide content. The two export cases are a policy illustration, and the evaluation slide describes proposed measurements rather than experimental results.

## Demonstration status

The export example is an **illustrative policy walkthrough**, not a live demo. It uses synthetic data. There is no runnable DLP or AI implementation, and no measured benchmark results in this project.

## Scope and limitations

The proposed design classifies sensitive information in original and derived datasets, then enforces policy at one controlled export path. It does not claim to protect browser uploads, direct storage access, scripts, privileged routes, or transfers that bypass the monitored path. False positives, misses, classification changes after data transformations, product-specific coverage, and scan/decision latency require evaluation. Backup and recovery from deletion are outside this seminar's scope.
