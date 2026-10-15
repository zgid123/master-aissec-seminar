import test from "node:test";
import assert from "node:assert/strict";
import type { CollectorServer } from "../src/server/types.ts";
const { default: worker } = (await import(
  new URL("../dist/server/index.js", import.meta.url).href
)) as { default: CollectorServer };

const request = (path: string, options?: RequestInit) =>
  worker.fetch(new Request(`https://collector.test${path}`, options));
test("Hono serves the React shell, hashed assets and a stable health contract", async () => {
  const home = await request("/");
  assert.equal(home.status, 200);
  assert.match(home.headers.get("Content-Type") ?? "", /text\/html/);
  assert.equal(home.headers.get("Cache-Control") ?? "", "no-store");
  const html = await home.text();
  assert.match(html, /<div id="root"><\/div>/);
  assert.match(html, /lang="vi"/);
  const paths = [...html.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g)].map(
    (m) => m[1],
  );
  assert.equal(paths.length, 2);
  for (const path of paths) {
    const asset = await request(path);
    assert.equal(asset.status, 200);
    assert.match(asset.headers.get("Cache-Control") ?? "", /immutable/);
    assert.match(
      asset.headers.get("Content-Type") ?? "",
      path.endsWith(".js") ? /javascript/ : /css/,
    );
    assert.ok((await asset.text()).length > 1000);
  }
  const health = await request("/api/health");
  assert.equal(health.status, 200);
  assert.deepEqual(await health.json(), {
    status: "ok",
    app: "aissec-keystroke-collector",
    schema_version: "1.0",
  });
});
test("No endpoint accepts collected data; unknown assets never fall back to the shell", async () => {
  for (const path of [
    "/",
    "/api/health",
    "/api/sessions",
    "/assets/app.fake.js",
  ]) {
    const result = await request(path, {
      method: "POST",
      body: "PRIVATE_TEXT",
    });
    assert.equal(result.status, 404);
    assert.doesNotMatch(await result.text(), /PRIVATE_TEXT/);
  }
  const missing = await request("/assets/not-found.js");
  assert.equal(missing.status, 404);
  assert.match(missing.headers.get("Content-Type") ?? "", /application\/json/);
});
test("Privacy headers cover both successful and unknown routes", async () => {
  for (const path of ["/", "/api/health", "/missing"]) {
    const result = await request(path);
    assert.equal(result.headers.get("X-Content-Type-Options") ?? "", "nosniff");
    assert.match(
      result.headers.get("Content-Security-Policy") ?? "",
      /connect-src 'none'/,
    );
    assert.match(
      result.headers.get("Content-Security-Policy") ?? "",
      /script-src 'self'/,
    );
    assert.equal(result.headers.get("Referrer-Policy") ?? "", "no-referrer");
  }
});
