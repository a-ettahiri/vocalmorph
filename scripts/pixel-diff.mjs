// Pixel-diff harness: screenshot /register at 1440x850 CSS and compare vs the
// Figma baseline. deviceScaleFactor follows the baseline dims (@2x plugin
// export -> DSF 2). PASS = diff < 1%. Writes current.png + diff.png + result.json.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BASELINE = path.join(ROOT, 'specs/001-user-registration/baseline/reference.png');
const OUT_DIR = path.join(ROOT, '.superpowers/pixel-diff');
const CURRENT = path.join(OUT_DIR, 'current.png');
const DIFF = path.join(OUT_DIR, 'diff.png');
const RESULT = path.join(OUT_DIR, 'result.json');
const URL = process.env.PIXEL_DIFF_URL ?? 'http://localhost:3000/register';
const THRESHOLD = 0.01; // 1% — the user-locked pass mark

if (!fs.existsSync(BASELINE)) {
  console.error(`Baseline missing: ${BASELINE}. Run Task 2 first.`);
  process.exit(2);
}
fs.mkdirSync(OUT_DIR, { recursive: true });

// Exporter renders frames @2x (2880x1700); tolerate a 1x manual export.
const dims = PNG.sync.read(fs.readFileSync(BASELINE));
const DSF =
  dims.width === 2880 && dims.height === 1700 ? 2 :
  dims.width === 1440 && dims.height === 850 ? 1 : 0;
if (!DSF) {
  console.error(
    `Unexpected baseline size ${dims.width}x${dims.height}; want 2880x1700 (@2x) or 1440x850 (@1x).`,
  );
  process.exit(2);
}

const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 850 },
    deviceScaleFactor: DSF,
  });
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: CURRENT });
} finally {
  await browser.close();
}

const a = PNG.sync.read(fs.readFileSync(BASELINE));
const b = PNG.sync.read(fs.readFileSync(CURRENT));
if (a.width !== b.width || a.height !== b.height) {
  console.error(
    `Size mismatch: baseline ${a.width}x${a.height} vs current ${b.width}x${b.height} (DSF ${DSF}).`,
  );
  process.exit(2);
}
const diff = new PNG({ width: a.width, height: a.height });
const mismatched = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.1 });
fs.writeFileSync(DIFF, PNG.sync.write(diff));
const percent = mismatched / (a.width * a.height);
const passed = percent < THRESHOLD;
fs.writeFileSync(
  RESULT,
  JSON.stringify(
    { percent, mismatched, width: a.width, height: a.height, threshold: THRESHOLD, passed, deviceScaleFactor: DSF, baseline: BASELINE, url: URL, at: new Date().toISOString() },
    null,
    2,
  ),
);
console.log(`diff: ${(percent * 100).toFixed(3)}% (${mismatched} px) -> ${passed ? 'PASS' : 'FAIL'} (gate <1%)`);
process.exit(passed ? 0 : 1);
