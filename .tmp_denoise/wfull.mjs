// TEMP experiment: full gate with injected light-weight adjustment (no app changes).
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const W = Number(process.env.WT ?? 220);
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 890, height: 744 }, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/de-noise-harness', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.evaluate((wt) => {
    document.querySelectorAll('p').forEach((e) => {
      if (getComputedStyle(e).fontWeight === '300') e.style.fontWeight = String(wt);
    });
  }, W);
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(ROOT, '.tmp_denoise', `wfull-${W}.png`) });
} finally { await browser.close(); }
const a = PNG.sync.read(fs.readFileSync(path.join(ROOT, '.tmp_denoise', 'baseline.flat.png')));
const b = PNG.sync.read(fs.readFileSync(path.join(ROOT, '.tmp_denoise', `wfull-${W}.png`)));
const diff = new PNG({ width: a.width, height: a.height });
const n = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.1 });
fs.writeFileSync(path.join(ROOT, '.tmp_denoise', `wfull-${W}-diff.png`), PNG.sync.write(diff));
console.log(`weight ${W}: ${(100 * n / (a.width * a.height)).toFixed(3)}% (${n}px)`);
