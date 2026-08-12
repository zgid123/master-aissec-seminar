# Dynamic Data Masking in DuckDB

Slidev seminar deck for the Advanced Information System Security course. The
presentation introduces database security and Data Masking fundamentals, then
examines how DuckDB primitives can support Dynamic Data Masking and where an
application-level access-control layer is still required.

## Contents

1. Database Security Overview
2. Data Masking Fundamentals
3. Dynamic Data Masking in DuckDB
4. Demo and Discussion

## Run the Presentation

```bash
pnpm install
pnpm dev
```

Slidev opens the presentation at <http://localhost:3030>.

## Build and Export

```bash
pnpm build   # Build production site
pnpm export  # Export slides
pnpm ppt     # Export PowerPoint
```

## Project Structure

- `slides.md` — deck entry point and global presentation settings
- `pages/database-security-overview/` — database security overview
- `pages/data-masking-fundamentals/` — Data Masking fundamentals
- `pages/dynamic-data-masking-in-duckdb/` — DuckDB implementation approach
- `pages/demonstration-and-discussion/` — Demo, limitations, and takeaways
- `assets/` — local presentation images

Each section uses `main.md` as its section cover and imports individual slides
from English kebab-case filenames. Visible slide content is primarily Vietnamese,
while technical terms such as **Data Masking**, **Dynamic Data Masking**,
**Encryption**, and **Demo** remain in English.

The project uses the published `@alphacifer/slidev-addon-theme` package and does
not require a workspace or local addon repository.
