import { serve } from "@hono/node-server";
import type { CollectorServer } from "../src/server/types.ts";
const { default: worker } = (await import(
  new URL("../dist/server/index.js", import.meta.url).href
)) as { default: CollectorServer };

const port = Number(process.env.PORT ?? 4173);
const server = serve({ fetch: worker.fetch, hostname: "0.0.0.0", port }, () =>
  console.log(`Local: http://localhost:${port}`),
);
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => server.close(() => process.exit(0)));
