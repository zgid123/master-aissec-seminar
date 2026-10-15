import type { ServerAssets } from "./types.ts";
import { Hono } from "hono";

export function createApp({ html, assets }: ServerAssets) {
  const app = new Hono();
  app.use("*", async (c, next) => {
    await next();
    c.header("X-Content-Type-Options", "nosniff");
    c.header("Referrer-Policy", "no-referrer");
    // React's progress bar uses a style attribute; scripts remain same-origin only.
    c.header(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'none'; img-src 'self' data:; object-src 'none'; base-uri 'none'; form-action 'none'",
    );
  });
  app.get("/", (c) => {
    c.header("Cache-Control", "no-store");
    return c.html(html);
  });
  app.get("/assets/:filename", (c) => {
    const asset = assets[c.req.path];
    if (!asset) return c.notFound();
    c.header("Content-Type", asset.contentType);
    c.header("Cache-Control", "public, max-age=31536000, immutable");
    return c.body(asset.body);
  });
  app.get("/api/health", (c) => {
    c.header("Cache-Control", "no-store");
    return c.json({
      status: "ok",
      app: "aissec-keystroke-collector",
      schema_version: "1.0",
    });
  });
  app.notFound((c) => c.json({ error: "not_found" }, 404));
  return app;
}
