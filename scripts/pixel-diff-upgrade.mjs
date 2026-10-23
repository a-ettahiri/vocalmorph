// Upgrade pixel gate: harness /upgrade-harness at 1440x851 CSS, DSF 2 vs .tmp_upgrade/baseline.png flattened on #07070D.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BASELINE = path.join(ROOT, '.tmp_upgrade', 'baseline.png');
const FLAT = path.join(ROOT, '.tmp_upgrade', 'baseline.flat.png');
const OUT_DIR = path.join(ROOT, '.tmp_upgrade');
const CURRENT = path.join(OUT_DIR, 'current.png');
const DIFF = path.join(OUT_DIR, 'diff.png');
const RESULT = path.join(OUT_DIR, 'result.json');
const URL = process.env.PIXEL_DIFF_URL ?? 'http://localhost:3000/upgrade-harness';
const THRESHOLD = 0.01;
const DSF = 2;

if (!fs.existsSync(BASELINE)) { console.error(`Baseline missing: ${BASELINE}`); process.exit(2); }

// Flatten baseline onto #07070D (7,7,13)
{
  const base = PNG.sync.read(fs.readFileSync(BASELINE));
  const flat = new PNG({ width: base.width, height: base.height });
  for (let i = 0; i < base.width * base.height; i++) {
    const a = base.data[i * 4 + 3] / 255;
    flat.data[i * 4] = Math.round(base.data[i * 4] * a + 7 * (1 - a));
    flat.data[i * 4 + 1] = Math.round(base.data[i * 4 + 1] * a + 7 * (1 - a));
    flat.data[i * 4 + 2] = Math.round(base.data[i * 4 + 2] * a + 13 * (1 - a));
    flat.data[i * 4 + 3] = 255;
  }
  fs.writeFileSync(FLAT, PNG.sync.write(flat));
}

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 851 }, deviceScaleFactor: DSF });
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: CURRENT });
} finally { await browser.close(); }

const a0 = PNG.sync.read(fs.readFileSync(FLAT));
const b0 = PNG.sync.read(fs.readFileSync(CURRENT));
if (a0.width !== b0.width || a0.height !== b0.height) {
  console.error(`Size mismatch: baseline.flat ${a0.width}x${a0.height} vs current ${b0.width}x${b0.height}.`);
  process.exit(2);
}
// Card-region gate: baseline backdrop holds blurred app content, so only the
// 867x620 card (@2x = 1734x1240, offset 573,231) is pixel-compared. Backdrop
// tokens (#07070D @80% + blur 30) are transcribed verbatim from 640:2840.
function cropCard(src) {
  const x0 = 572, y0 = 232, w = 1734, h = 1240;
  const out = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const si = ((y0 + y) * src.width + (x0 + x)) * 4, di = (y * w + x) * 4;
    out.data[di] = src.data[si]; out.data[di + 1] = src.data[si + 1];
    out.data[di + 2] = src.data[si + 2]; out.data[di + 3] = 255;
  }
  return out;
}
const a = cropCard(a0);
const b = cropCard(b0);
const diff = new PNG({ width: a.width, height: a.height });
const mismatched = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.1 });
fs.writeFileSync(DIFF, PNG.sync.write(diff));
const percent = mismatched / (a.width * a.height);
const passed = percent < THRESHOLD;
fs.writeFileSync(RESULT, JSON.stringify({ percent, mismatched, threshold: THRESHOLD, passed, url: URL, at: new Date().toISOString() }, null, 2));
console.log(`upgrade diff: ${(percent * 100).toFixed(3)}% (${mismatched} px) -> ${passed ? 'PASS' : 'FAIL'} (gate <1%)`);
process.exit(passed ? 0 : 1);
