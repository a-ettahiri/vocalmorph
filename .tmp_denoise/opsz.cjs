const { chromium } = require('playwright');
const fs = require('node:fs');
const { PNG } = require('pngjs');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 890, height: 744 }, deviceScaleFactor: 2 });
  await p.goto('http://localhost:3000/de-noise-harness', { waitUntil: 'networkidle' });
  await p.waitForTimeout(400);
  await p.evaluate(() => {
    document.querySelectorAll('p').forEach(e => { e.style.fontOpticalSizing = 'none'; });
  });
  await p.waitForTimeout(200);
  await p.screenshot({ path: '.tmp_denoise/opsz-none.png' });
  await b.close();
  const A = PNG.sync.read(fs.readFileSync('.tmp_denoise/baseline.flat.png'));
  const B = PNG.sync.read(fs.readFileSync('.tmp_denoise/opsz-none.png'));
  function ink(im, x0, x1, y0, y1) {
    let ink = 0, tot = 0;
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
      tot++; const i = (y * im.width + x) * 4;
      if ((im.data[i] + im.data[i + 1] + im.data[i + 2]) / 3 > 60) ink++;
    }
    return [ink, tot];
  }
  const regs = [
    ['sub-text', 600, 1300, 600, 665],
    ['feat-title1', 60, 500, 1126, 1180],
    ['feat-body', 60, 500, 1190, 1315],
    ['denoise-title', 0, 560, 0, 110],
  ];
  for (const [nm, x0, x1, y0, y1] of regs) {
    const [ia] = ink(A, x0, x1, y0, y1);
    const [ib] = ink(B, x0, x1, y0, y1);
    console.log(nm, 'base', ia, 'opsz-none', ib, 'ratio', (ib / Math.max(ia, 1)).toFixed(2));
  }
})();
