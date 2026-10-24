const fs = require('node:fs');
const { PNG } = require('pngjs');
const A = PNG.sync.read(fs.readFileSync('.tmp_denoise/baseline.flat.png'));
const B = PNG.sync.read(fs.readFileSync('.tmp_denoise/current.png'));
function ink(im, x0, x1, y0, y1) {
  let ink = 0, tot = 0;
  for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
    tot++; const i = (y * im.width + x) * 4;
    if ((im.data[i] + im.data[i + 1] + im.data[i + 2]) / 3 > 60) ink++;
  }
  return [ink, tot];
}
// regions (device px): [name, x0,x1,y0,y1]
const regs = [
  ['denoise-title', 0, 560, 0, 110],
  ['drag-text', 480, 1420, 480, 585],
  ['sub-text', 600, 1300, 600, 665],
  ['buttons', 420, 1360, 745, 875],
  ['feat-title1', 60, 500, 1126, 1180],
  ['feat-body', 60, 500, 1190, 1315],
  ['icon', 800, 1000, 350, 470],
  ['card-bg', 100, 300, 200, 280],
  ['dash-top', 100, 1700, 285, 305],
];
for (const [nm, x0, x1, y0, y1] of regs) {
  const [ia] = ink(A, x0, x1, y0, y1);
  const [ib] = ink(B, x0, x1, y0, y1);
  console.log(nm, 'base', ia, 'cur', ib, 'ratio', (ib / Math.max(ia, 1)).toFixed(2));
}
