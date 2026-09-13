import fs from "node:fs/promises";
import lighthouse from "lighthouse";
import { chromium } from "playwright";
await fs.mkdir("artifacts/lighthouse", { recursive: true });
const results = [];
for (const [name, path] of [
  ["home", "/"],
  ["catalog", "/urunler?kategori=filtreler"],
  ["product", "/urun/clear-60"],
]) {
  const chrome = await chromium.launch({
    headless: true,
    args: ["--remote-debugging-port=9223"],
  });
  try {
    const report = await lighthouse(`http://localhost:3000${path}`, {
      port: 9223,
      output: ["json", "html"],
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    });
    await fs.writeFile(`artifacts/lighthouse/${name}.json`, report.report[0]);
    await fs.writeFile(`artifacts/lighthouse/${name}.html`, report.report[1]);
    const row = {
      page: path,
      version: report.lhr.lighthouseVersion,
      fetchTime: report.lhr.fetchTime,
      scores: Object.fromEntries(
        Object.entries(report.lhr.categories).map(([k, v]) => [
          k,
          Math.round(v.score * 100),
        ]),
      ),
      lcp: report.lhr.audits["largest-contentful-paint"].displayValue,
      cls: report.lhr.audits["cumulative-layout-shift"].displayValue,
      tbt: report.lhr.audits["total-blocking-time"].displayValue,
      settings: report.lhr.configSettings,
    };
    results.push(row);
    console.log(JSON.stringify(row));
  } finally {
    await chrome.close();
  }
}
await fs.writeFile(
  "artifacts/lighthouse/summary.json",
  JSON.stringify(results, null, 2),
);
