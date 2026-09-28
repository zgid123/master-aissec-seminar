# Data Loss Prevention (DLP) trong hệ thống Big Data

Slidev seminar deck with Vietnamese slide content and presenter notes. The demo section uses four slides and can be presented without opening the live application.

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

The export creates a PDF page for each reveal step, so one numbered slide can span several PDF pages. Rehearse against those page transitions for the 15-minute slot; some transitions reveal a heading before the slide content. The two export cases are a policy illustration, and the evaluation slide describes proposed measurements rather than experimental results.

## Runnable demonstration

`demo/` implements a fictional retail-company scenario as a runnable PySpark and Streamlit application using deterministic synthetic data. It scans a derived Parquet dataset with schema/pattern rules, a registered fingerprint and a contextual ML classifier; applies policy using actor, action, labels and destination; writes only after an `ALLOW` decision; and records every decision in an audit log.

The verified scenarios are:

- the same dataset to an unapproved external destination: `BLOCK`, zero files, zero bytes;
- sensitive `customer_segments` to approved internal analytics: `ALLOW` and write;
- non-sensitive `segment_summary` to the external destination: `ALLOW`.

See [`demo/README.md`](demo/README.md) for setup, tests, benchmark commands, and the seminar flow.

## Scope and limitations

Seminar tập trung vào phòng chống rò rỉ dữ liệu nhạy cảm, đặc biệt tại các đường chia sẻ hoặc xuất đã tích hợp kiểm soát. Đây là mô tả trọng tâm của seminar; bằng chứng và giải thích về lựa chọn thuật ngữ nằm trong presenter notes của slide “DLP là gì?”.

The proposed design classifies sensitive information in original and derived datasets, then enforces policy at one controlled export path. It does not claim to protect browser uploads, direct storage access, scripts, privileged routes, or transfers that bypass the monitored path. False positives, misses, classification changes after data transformations, product-specific coverage, and scan/decision latency require evaluation. Backup and recovery from deletion are outside this seminar's scope.
