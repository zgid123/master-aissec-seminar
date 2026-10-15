import { exportReport } from "../src/report.js";
const input =
    process.argv[2] ?? "../artifacts/processed/report.vi.html",
  output = process.argv[3] ?? "../artifacts/processed/report.vi.pdf";
await exportReport(input, output);
console.log(`Exported ${output}`);
