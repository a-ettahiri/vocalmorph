const { chromium } = require('playwright');
const fs = require('node:fs');
const { PNG } = require('pngjs');
(async () => {
  for (const w of [300, 250, 200]) {
    const b = await chromium.launch();
    const p = await b.newPage({ viewport: { width: 890, height: 744 }, deviceScaleFactor: 2 });
    await p.goto('http://localhost:3000/de-noise-harness', { waitUntil: 'networkidle' });
    await p.waitForTimeout(400);
    await p.evaluate((wt) => {
      document.querySelectorAll('p').forEach(e => {
        if (getComputedStyle(e).fontWeight === '300') e.style.fontWeight = String(wt);
      });
    }, w);
    await p.waitForTimeout(200);
    await p.screenshot({ path: `.tmp_denoise/wtest-${w}.png` });
    await b.close();
    const im = PNG.sync.read(fs.readFileSync(`.tmp_denoise/wtest-${w}.png`));
    let ink = 0, tot = 0;
    for (let y = 1192; y < 1310; y++) for (let x = 120; x < 460; x++) {
      tot++; const i = (y * im.width + x) * 4;
      if ((im.data[i] + im.data[i + 1] + im.data[i + 2]) / 3 > 60) ink++;
    }
    console.log(`weight ${w}: ink ${ink} (baseline 5040)`);
  }
})();
