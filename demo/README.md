# DuckDB Dynamic Data Masking Demo

A seminar-ready monorepo that shows how the same DuckDB rows produce different output according to the authenticated application role.

## Stack

- `apps/web`: React, TanStack Router, TanStack Query, and Vite
- `apps/api`: Hono on Node.js and the DuckDB Node Neo client
- `packages/shared`: shared API and role types
- pnpm workspaces

## Run the demo

Requirements: Node.js 20+ and pnpm 10+.

```bash
cd demo
pnpm install
pnpm db:seed
pnpm dev
```

Open <http://localhost:5173>.

The API starts on <http://localhost:3000>. The first API start also creates and seeds the database if `apps/api/data/users.duckdb` does not exist, so `pnpm db:seed` is optional.

## Demo identities

| Username | Password | Role | Result |
| --- | --- | --- | --- |
| `admin` | `admin` | `admin` | Original email, phone, address, and national ID |
| `user` | `user` | `user` | Those four fields are masked by DuckDB |

The login screen fills these credentials automatically when a persona is selected.

## Suggested seminar flow

1. Sign in as `admin` and point out the original protected values.
2. Log out, sign in as `user`, and compare the same first record ID.
3. Highlight the `viewer_role` banner and query time.
4. Open `apps/api/src/schema.sql` to show the reusable scalar macros and the `users_for_role` table macro.
5. Open `apps/api/src/database.ts` to show that the validated role is bound as `$viewer_role`; it is never concatenated into SQL.
6. Explain the boundary: this is application-enforced masking. Direct access to the `.duckdb` file can still read the source table.

## Seed data

`apps/api/src/seed.sql` creates exactly 1,000,000 deterministic records in one set-based DuckDB statement, then analyzes the table. Re-running the seed command is idempotent while the database contains rows.

To recreate the data from scratch, stop the API, remove `apps/api/data/users.duckdb`, and run `pnpm db:seed` again. The generated database and WAL are ignored by Git.

## Useful commands

```bash
pnpm dev        # run API and web app together
pnpm db:seed    # initialize and seed DuckDB
pnpm typecheck  # strict TypeScript checks for every workspace
pnpm build      # build the API and web app
```

## Security scope

This demo intentionally uses two hard-coded accounts and fixed bearer tokens so the seminar can focus on the Node.js-to-DuckDB role boundary. It is not production authentication. In a real system, use a trusted identity provider, keep the DuckDB file readable only by the backend OS account, and expose only fixed parameterized queries—never arbitrary user-supplied SQL.
