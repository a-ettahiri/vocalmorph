# Pixel-diff gate

## Viewport

- `viewport: { width: 1440, height: 850 }`.
- `deviceScaleFactor` follows baseline manifest (`@2x` → `2`).
- `waitUntil: 'networkidle'` + 500ms settle before screenshot.

## Compare

- `pixelmatch(a, b, diff, w, h, { threshold: 0.1 })`.
- `percent = mismatched / (w * h)`. **PASS when `percent < 0.01`.**
- Write to `.superpowers/pixel-diff-*/`: `current.png`, `diff*.png`, `result*.json` with `{ percent, mismatched, threshold, passed, url, at }`.

## Region crops

Full page: compare whole frames (see `scripts/pixel-diff-login.mjs`).

Sidebar only (content column is a stub): crop left 266px at x=48css (see `scripts/pixel-diff-cookies.mjs`):

```js
const SIDEBAR_CSS_PX = 266;
const CROP_X_CSS_PX = 48;
const DSF = 2;
cropLeft(png, CROP_X_CSS_PX * DSF, SIDEBAR_CSS_PX * DSF);
```

Why x=48: Frame 46 sits at x=48css inside the exported frame and the live page carries `px-[3rem]`, so both crops start at the same offset.

## Narrowed diffs

For footer/avatar/dots fixes, narrow the crop to that band to prove the fix without full-page noise.

## Pre-gate

Run `tsc`, lint new files, `npm run build`. Claim PASS only with artifacts on disk.
