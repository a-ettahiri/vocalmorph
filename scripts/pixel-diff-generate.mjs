// Generate pixel gate: harness /generate-harness at 958 CSS width, DSF 2 vs .tmp_generate/baseline.png flattened on #07070D.
// Baseline PNG is 1917x1502 (958.5x751 CSS render bounds); crop to min size before compare.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BASELINE = path.join(ROOT, '.tmp_generate', 'baseline.png');
const FLAT = path.join(ROOT, '.tmp_generate', 'baseline.flat.png');
const OUT_DIR = path.join(ROOT, '.tmp_generate');
const CURRENT = path.join(OUT_DIR, 'current.png');
const DIFF = path.join(ROOT, '.tmp_generate', 'diff.png');
const RESULT = path.join(OUT_DIR, 'result.json');
const URL = process.env.PIXEL_DIFF_URL ?? 'http://localhost:3000/generate-harness';
const THRESHOLD = 0.01;
const DSF = 2;

if (!fs.existsSync(BASELINE)) { console.error(`Baseline missing: ${BASELINE}`); process.exit(2); }

const browser = await chromium.launch({ args: ['--disable-lcd-text', '--font-render-hinting=none'] });
try {
  const page = await browser.newPage({ viewport: { width: 958, height: 1156 }, deviceScaleFactor: DSF });
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: CURRENT });
} finally { await browser.close(); }

const base = PNG.sync.read(fs.readFileSync(BASELINE));
const cur = PNG.sync.read(fs.readFileSync(CURRENT));
const W = Math.min(base.width, cur.width);
const H = Math.min(base.height, cur.height);
const flat = new PNG({ width: W, height: H });
const curCrop = new PNG({ width: W, height: H });
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const bi = (y * base.width + x) * 4;
    const a = base.data[bi + 3] / 255;
    const fi = (y * W + x) * 4;
    flat.data[fi] = Math.round(base.data[bi] * a + 7 * (1 - a));
    flat.data[fi + 1] = Math.round(base.data[bi + 1] * a + 7 * (1 - a));
    flat.data[fi + 2] = Math.round(base.data[bi + 2] * a + 13 * (1 - a));
    flat.data[fi + 3] = 255;
    const ci = (y * cur.width + x) * 4;
    curCrop.data[fi] = cur.data[ci];
    curCrop.data[fi + 1] = cur.data[ci + 1];
    curCrop.data[fi + 2] = cur.data[ci + 2];
    curCrop.data[fi + 3] = 255;
  }
}
fs.writeFileSync(FLAT, PNG.sync.write(flat));
fs.writeFileSync(CURRENT, PNG.sync.write(curCrop));
const diff = new PNG({ width: W, height: H });
const mismatched = pixelmatch(flat.data, curCrop.data, diff.data, W, H, { threshold: 0.1 });
fs.writeFileSync(DIFF, PNG.sync.write(diff));
const percent = mismatched / (W * H);
const passed = percent < THRESHOLD;
fs.writeFileSync(RESULT, JSON.stringify({ percent, mismatched, threshold: THRESHOLD, passed, url: URL, at: new Date().toISOString() }, null, 2));
console.log(`generate diff: ${(percent * 100).toFixed(3)}% (${mismatched} px) -> ${passed ? 'PASS' : 'FAIL'} (gate <1%)`);
process.exit(passed ? 0 : 1);
