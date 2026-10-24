// De-noise pixel gate: harness /de-noise-harness at 890x744 CSS, DSF 2 vs .tmp_denoise/baseline.png flattened on #07070D.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BASELINE = path.join(ROOT, '.tmp_denoise', 'baseline.png');
const FLAT = path.join(ROOT, '.tmp_denoise', 'baseline.flat.png');
const OUT_DIR = path.join(ROOT, '.tmp_denoise');
const CURRENT = path.join(OUT_DIR, 'current.png');
const DIFF = path.join(OUT_DIR, 'diff.png');
const RESULT = path.join(OUT_DIR, 'result.json');
const URL = process.env.PIXEL_DIFF_URL ?? 'http://localhost:3000/de-noise-harness';
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

const browser = await chromium.launch({ args: ["--disable-lcd-text", "--font-render-hinting=none"] });
try {
  const page = await browser.newPage({ viewport: { width: 890, height: 744 }, deviceScaleFactor: DSF });
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: CURRENT });
} finally { await browser.close(); }

const a = PNG.sync.read(fs.readFileSync(FLAT));
const b = PNG.sync.read(fs.readFileSync(CURRENT));
if (a.width !== b.width || a.height !== b.height) {
  console.error(`Size mismatch: baseline.flat ${a.width}x${a.height} vs current ${b.width}x${b.height}.`);
  process.exit(2);
}
const diff = new PNG({ width: a.width, height: a.height });
const mismatched = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.1 });
fs.writeFileSync(DIFF, PNG.sync.write(diff));
const percent = mismatched / (a.width * a.height);
const passed = percent < THRESHOLD;
fs.writeFileSync(RESULT, JSON.stringify({ percent, mismatched, threshold: THRESHOLD, passed, url: URL, at: new Date().toISOString() }, null, 2));
console.log(`de-noise diff: ${(percent * 100).toFixed(3)}% (${mismatched} px) -> ${passed ? 'PASS' : 'FAIL'} (gate <1%)`);
process.exit(passed ? 0 : 1);
