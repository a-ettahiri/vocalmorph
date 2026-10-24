const fs = require('node:fs');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch').default || require('pixelmatch');
const A = PNG.sync.read(fs.readFileSync('.tmp_denoise/baseline.flat.png'));
const B = PNG.sync.read(fs.readFileSync('.tmp_denoise/current.png'));
// region: features body x60-500 y1190-1315 (device)
const x0 = 60, x1 = 500, y0 = 1190, y1 = 1315, W = x1 - x0, H = y1 - y0;
function sub(im, dx, dy) {
  const o = new PNG({ width: W, height: H });
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const s = ((y0 + y + dy) * im.width + (x0 + x + dx)) * 4, d = (y * W + x) * 4;
    o.data[d] = im.data[s]; o.data[d + 1] = im.data[s + 1]; o.data[d + 2] = im.data[s + 2]; o.data[d + 3] = 255;
  }
  return o;
}
const a = sub(A, 0, 0);
for (const [dx, dy] of [[0, 0], [0, -1], [0, 1], [-1, 0], [1, 0], [0, -2]]) {
  const b = sub(B, dx, dy);
  const diff = new PNG({ width: W, height: H });
  const n = pixelmatch(a.data, b.data, diff.data, W, H, { threshold: 0.1 });
  console.log(`dx=${dx} dy=${dy}: mismatched ${n} (${(100 * n / (W * H)).toFixed(2)}%)`);
}
