// Sidebar-region pixel check: screenshot /cookies-policy at 1440x850 (DSF 2)
// and compare ONLY the left 266px sidebar region vs the Figma baseline.
// Full-page <1% is out of scope (content column is a stub); this gates the sidebar.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BASELINE = path.join(ROOT, 'specs/003-cookies-policy/baseline/reference.png');
const OUT_DIR = path.join(ROOT, '.superpowers/pixel-diff-cookies');
const CURRENT = path.join(OUT_DIR, 'current.png');
const DIFF = path.join(OUT_DIR, 'diff-sidebar.png');
const RESULT = path.join(OUT_DIR, 'result-sidebar.json');
const URL = process.env.PIXEL_DIFF_URL ?? 'http://localhost:3000/cookies-policy';
const THRESHOLD = 0.01;
const SIDEBAR_CSS_PX = 266; // Frame 46 width
// Frame 46 sits at x=48css inside the exported frame (9225-9177) and the
// live page carries px-[3rem], so both crops start at x=48css.
const CROP_X_CSS_PX = 48;
const DSF = 2;

if (!fs.existsSync(BASELINE)) {
  console.error(`Baseline missing: ${BASELINE}.`);
  process.exit(2);
}
fs.mkdirSync(OUT_DIR, { recursive: true });

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

function cropLeft(png, x, w) {
  const out = new PNG({ width: w, height: png.height });
  for (let y = 0; y < png.height; y++) {
    png.data.copy(out.data, y * w * 4, (y * png.width + x) * 4, (y * png.width + x) * 4 + w * 4);
  }
  return out;
}

const a = cropLeft(PNG.sync.read(fs.readFileSync(BASELINE)), CROP_X_CSS_PX * DSF, SIDEBAR_CSS_PX * DSF);
const bFull = PNG.sync.read(fs.readFileSync(CURRENT));
const b = cropLeft(bFull, CROP_X_CSS_PX * DSF, SIDEBAR_CSS_PX * DSF);
const diff = new PNG({ width: a.width, height: a.height });
const mismatched = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.1 });
fs.writeFileSync(DIFF, PNG.sync.write(diff));
const percent = mismatched / (a.width * a.height);
const passed = percent < THRESHOLD;
fs.writeFileSync(RESULT, JSON.stringify({ percent, mismatched, region: `left ${SIDEBAR_CSS_PX}px @${DSF}x`, threshold: THRESHOLD, passed, url: URL, at: new Date().toISOString() }, null, 2));
console.log(`sidebar diff: ${(percent * 100).toFixed(3)}% (${mismatched} px) -> ${passed ? 'PASS' : 'FAIL'} (gate <1%)`);
process.exit(passed ? 0 : 1);
