const fs = require('node:fs');
const { PNG } = require('pngjs');
function crop(src, x, y, w, h, dst) {
  const a = PNG.sync.read(fs.readFileSync(src));
  const S = 2;
  const o2 = new PNG({ width: w * S, height: h * S });
  for (let j = 0; j < h * S; j++) for (let i = 0; i < w * S; i++) {
    const s = ((y + ((j / S) | 0)) * a.width + (x + ((i / S) | 0))) * 4, d = (j * w * S + i) * 4;
    o2.data[d] = a.data[s]; o2.data[d + 1] = a.data[s + 1]; o2.data[d + 2] = a.data[s + 2]; o2.data[d + 3] = 255;
  }
  fs.writeFileSync(dst, PNG.sync.write(o2));
}
crop('.tmp_denoise/current.png', 60, 1126, 420, 50, '.tmp_denoise/zoom-title-cur.png');
crop('.tmp_denoise/baseline.flat.png', 60, 1126, 420, 50, '.tmp_denoise/zoom-title-base.png');
const A = PNG.sync.read(fs.readFileSync('.tmp_denoise/baseline.flat.png'));
const B = PNG.sync.read(fs.readFileSync('.tmp_denoise/current.png'));
function vcorr(y0, y1, x0, x1, label) {
  let best = { dy: 0, v: 1e18 };
  for (let dy = -6; dy <= 6; dy++) {
    let s = 0;
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x += 2) {
      const i = (y * A.width + x) * 4, j = ((y + dy) * B.width + x) * 4;
      const d = (A.data[i] - B.data[j]) + (A.data[i + 1] - B.data[j + 1]) + (A.data[i + 2] - B.data[j + 2]);
      s += d * d;
    }
    if (s < best.v) best = { dy, v: s };
  }
  console.log(label, best.dy);
}
vcorr(1130, 1175, 60, 480, 'feat-title dy:');
vcorr(490, 575, 500, 1400, 'drag dy:');
vcorr(5, 105, 0, 420, 'denoise dy:');
vcorr(1210, 1260, 60, 480, 'feat-body1 dy:');
