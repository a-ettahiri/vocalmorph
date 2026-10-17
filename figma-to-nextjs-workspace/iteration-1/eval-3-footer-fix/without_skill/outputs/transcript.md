# Footer fix — transcript (baseline, without skill)

## 1. Steps taken
1. Read `components/app-sidebar.tsx` (footer/member section, lines 132–157).
   - Outer footer: `flex h-[4.05rem] w-[14.0625rem] items-center rounded-full bg-[#1A1A23]`.
   - Avatar 43px, text block `ml-[0.675rem]`, more-dots `ml-auto h-[1.8rem] w-[4.95rem]`.
2. Read `scripts/pixel-diff-cookies.mjs` for context.
   - Current gate: screenshot `/cookies-policy` at 1440×850 DSF 2, crop left sidebar strip `x=48css, w=266css`, pixelmatch threshold 0.1, gate <1%.
   - No dev server started, no screenshots run (per task constraints).
3. Diagnosed bug: footer pill is 225px wide but inner content (Frame 40) is 203.4px wide in Figma — i.e. 10.8px inset on each side. Without symmetric right padding the `ml-auto` 3-dots circle is pushed flush to the pill edge and hugs the right border.
4. Fix applied in snippet: keep `pl-[0.675rem]` and add matching `pr-[0.675rem]` (10.8px = 0.675rem):
   ```tsx
   // before (buggy): ... pl-[0.675rem]  (no pr — dots touch edge)
   // after (fixed):
   <div className="mt-[0.9rem] flex h-[4.05rem] w-[14.0625rem] flex-none items-center rounded-full bg-[#1A1A23] pl-[0.675rem] pr-[0.675rem]">
   ```
   Saved as `member-footer.tsx` in this outputs directory. No repo files modified.
5. Verified by reading only: avatar/text/dots sizes unchanged, only the pill padding changed; Tailwind v4 px-to-rem preserved (10.8/16 = 0.675, 64.8/16 = 4.05, 225/16 = 14.0625).

## 2. Narrowed-diff plan (footer region only)
Goal: prove the dots-circle fix without noise from the rest of the page.

- Reuse the existing script setup: viewport 1440×850, DSF 2, baseline `specs/003-cookies-policy/baseline/reference.png`, current screenshot `http://localhost:3000/cookies-policy`.
- Step 1 — sidebar strip crop (as today): `x = 48*DSF`, `w = 266*DSF` on both baseline and current.
- Step 2 — vertical footer crop on the strip: footer pill is 64.8css tall, bottom-anchored with `py 28.8css`. So pill occupies roughly `y = 756–821css` from the top of an 850tall viewport. Crop `y = 740css–835css` (95css tall, includes 14.4css gap + pill + bottom padding + margin) to tolerate 1–2px layout shift:
  ```js
  function cropRect(png, x, y, w, h) {
    const out = new PNG({ width: w, height: h });
    for (let j = 0; j < h; j++) {
      const srcY = y + j;
      png.data.copy(out.data, j * w * 4, (srcY * png.width + x) * 4, (srcY * png.width + x) * 4 + w * 4);
    }
    return out;
  }
  const FOOT_Y_CSS = 740, FOOT_H_CSS = 95; // 740..835css
  const a = cropRect(baselinePng, 48*DSF, FOOT_Y_CSS*DSF, 266*DSF, FOOT_H_CSS*DSF);
  const b = cropRect(currentPng, 48*DSF, FOOT_Y_CSS*DSF, 266*DSF, FOOT_H_CSS*DSF);
  ```
- Step 3 — diff with pixelmatch `{ threshold: 0.1 }`, write `diff-footer.png` + `result-footer.json`, gate `<1%` (expect ~0% after fix; before fix the ~10.5css-px dots shift shows as a concentrated red cluster on the right edge of the diff).
- Optional dots-scan: threshold the diff to red-only pixels and check their bounding box sits inside `x < 225-10-79` (dots width) rather than touching `x = 225`; post-fix dots should align within 1px@2x.
- Not executed here per instructions (no dev server / screenshots); script change is a ~15-line fork of `scripts/pixel-diff-cookies.mjs` (e.g. `scripts/pixel-diff-cookies-footer.mjs`).
