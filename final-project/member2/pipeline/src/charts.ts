import * as echarts from "echarts";
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
export interface Series {
  name: string;
  type: "line" | "scatter" | "bar";
  data: (number | [number, number])[];
  step?: "middle";
  showSymbol?: boolean;
  symbolSize?: number;
}
export interface Panel {
  x: string;
  y: string;
  categories?: string[];
  min?: number;
  max?: number;
  series: Series[];
}
export interface Figure {
  name: string;
  title: string;
  panels: [Panel, Panel];
}
export function histogram(
  values: number[],
  min: number,
  max: number,
  bins: number,
  density = false,
): [number, number][] {
  if (min === max) {
    min -= 0.5;
    max += 0.5;
  }
  const width = (max - min) / bins,
    counts = Array<number>(bins).fill(0);
  for (const v of values)
    if (v >= min && v <= max)
      counts[Math.min(bins - 1, Math.floor((v - min) / width))]++;
  return counts.map((n, i) => [
    min + (i + 0.5) * width,
    density && values.length ? n / (values.length * width) : n,
  ]);
}
export async function renderFigures(figures: Figure[], output: string) {
  await mkdir(output, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    channel: "chromium",
  });
  try {
    const page = await browser.newPage({
      viewport: { width: 1100, height: 520 },
      deviceScaleFactor: 1.8,
    });
    for (const figure of figures) {
      const chart = echarts.init(null, undefined, {
        renderer: "svg",
        ssr: true,
        width: 1100,
        height: 520,
      });
      let svg: string;
      try {
        chart.setOption({
          animation: false,
          backgroundColor: "#fff",
          color: ["#126356", "#b65328", "#4275a3", "#966aa1"],
          title: {
            text: figure.title,
            subtext:
              "SIMULATED DATA — illustrative assumptions; no human observations",
            left: "center",
            top: 12,
            textStyle: { fontSize: 17 },
            subtextStyle: { fontSize: 12 },
          },
          legend: figure.panels.map((p, i) => ({
            data: p.series.map((s) => s.name),
            left: i === 0 ? "8%" : "57%",
            top: 76,
            textStyle: { fontSize: 11 },
          })),
          grid: [
            { left: 90, right: 610, top: 125, bottom: 85 },
            { left: 640, right: 35, top: 125, bottom: 85 },
          ],
          xAxis: figure.panels.map((p, i) => ({
            type: p.categories ? "category" : "value",
            data: p.categories,
            gridIndex: i,
            name: p.x,
            nameLocation: "middle",
            nameGap: 37,
            nameTextStyle: { fontSize: 11 },
            min: p.min,
            max: p.max,
            axisLabel: { fontSize: 10 },
          })),
          yAxis: figure.panels.map((p, i) => ({
            type: "value",
            gridIndex: i,
            name: p.y,
            nameLocation: "middle",
            nameGap: 55,
            nameTextStyle: { fontSize: 11 },
            axisLabel: { fontSize: 10 },
          })),
          series: figure.panels.flatMap((p, i) =>
            p.series.map((s) => ({
              ...s,
              xAxisIndex: i,
              yAxisIndex: i,
              showSymbol: s.showSymbol ?? false,
              lineStyle: { width: 1.8 },
              symbolSize: s.symbolSize ?? 5,
            })),
          ),
        } as echarts.EChartsOption);
        const ids = new Map<string, string>();
        svg = chart.renderToSVGString().replace(/zr\d+-[a-z]+-?\d+/g, (id) => {
          if (!ids.has(id)) ids.set(id, `figure-id-${ids.size}`);
          return ids.get(id)!;
        });
      } finally {
        chart.dispose();
      }
      await writeFile(join(output, `${figure.name}.svg`), svg);
      await page.setContent(
        `<html><head><style>@page{size:1100px 520px;margin:0}body{margin:0;width:1100px;height:520px}</style></head><body>${svg}</body></html>`,
        { waitUntil: "load" },
      );
      await page.screenshot({ path: join(output, `${figure.name}.png`) });
    }
  } finally {
    await browser.close();
  }
}
