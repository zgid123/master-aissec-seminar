import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright";
import type { Row } from "./types.js";
export function markdownTable(rows: Row[]) {
  if (!rows.length) return "Không có dữ liệu.";
  const keys = Object.keys(rows[0]),
    cell = (v: unknown) =>
      typeof v === "number" && !Number.isInteger(v) ? v.toFixed(3) : String(v);
  return [
    `| ${keys.join(" | ")} |`,
    `| ${keys.map(() => "---").join(" | ")} |`,
    ...rows.map((r) => `| ${keys.map((k) => cell(r[k])).join(" | ")} |`),
  ].join("\n");
}
const escape = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const inline = (s: string) =>
  escape(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
export async function renderHtml(markdown: string, directory: string) {
  const lines = markdown.split("\n"),
    blocks: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const heading = /^(#{1,3}) (.*)$/.exec(line),
      image = /^!\[([^\]]*)\]\((figures\/[\w.-]+\.png)\)$/.exec(line);
    if (heading)
      blocks.push(
        `<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`,
      );
    else if (image)
      blocks.push(
        `<figure><img alt="${escape(image[1])}" src="data:image/png;base64,${(await readFile(join(directory, image[2]))).toString("base64")}"></figure>`,
      );
    else if (line.startsWith("| ")) {
      const table: string[][] = [];
      while (i < lines.length && lines[i].startsWith("| "))
        table.push(
          lines[i++]
            .replace(/^\||\|$/g, "")
            .split("|")
            .map((v) => v.trim()),
        );
      i--;
      blocks.push(
        `<div class="table-wrap"><table><thead><tr>${table[0].map((v) => `<th>${inline(v)}</th>`).join("")}</tr></thead><tbody>${table
          .slice(2)
          .map(
            (r) => `<tr>${r.map((v) => `<td>${inline(v)}</td>`).join("")}</tr>`,
          )
          .join("")}</tbody></table></div>`,
      );
    } else {
      const paragraph = [line];
      while (i + 1 < lines.length && lines[i + 1].trim())
        paragraph.push(lines[++i]);
      blocks.push(`<p>${inline(paragraph.join(" "))}</p>`);
    }
  }
  return `<!doctype html><html lang="vi"><head><meta charset="utf-8"><title>Thành viên 2 — Báo cáo dữ liệu mô phỏng</title><style>
    @page {size:A4;margin:17mm 15mm} body {font:11pt/1.6 Arial,sans-serif;color:#172b35;max-width:1050px;margin:30px auto;padding:0 20px}
    h1 {font-size:24pt;line-height:1.2;color:#126356} h2 {font-size:15pt;color:#126356;margin-top:25px;break-after:avoid}
    p {text-align:justify} code {font-size:.9em;background:#edf4f2;padding:1px 3px} figure {margin:18px 0 8px;break-inside:avoid} img {width:100%;height:auto}
    .table-wrap {overflow-x:auto} table {border-collapse:collapse;width:100%;font-size:8pt;line-height:1.4;margin:12px 0}
    th,td {border:1px solid #b8cbc5;padding:5px;text-align:left;overflow-wrap:anywhere} th {background:#e9f3ef} tr {break-inside:avoid}
    .provenance {padding:12px;background:#edf4f2;border-left:4px solid #126356;font-weight:bold}
    @media print {body {margin:0;padding:0;font-size:10pt}.table-wrap {overflow:visible}}
    </style></head><body><div class="provenance">DỮ LIỆU MÔ PHỎNG · Không có người tham gia thật</div>${blocks.join("\n")}</body></html>`;
}
export async function exportReport(input: string, output: string) {
  const browser = await chromium.launch({
    headless: true,
    channel: "chromium",
  });
  try {
    const page = await browser.newPage();
    await page.setContent(await readFile(input, "utf8"), { waitUntil: "load" });
    await page.emulateMedia({ media: "print" });
    await page.pdf({
      path: output,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: true,
      headerTemplate: "<span></span>",
      footerTemplate:
        '<div style="font-size:8px;width:100%;text-align:center;color:#49665d">Thành viên 2 · Dữ liệu mô phỏng · <span class="pageNumber"></span>/<span class="totalPages"></span></div>',
    });
  } finally {
    await browser.close();
  }
}
