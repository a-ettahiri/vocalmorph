# 3-footer-fix — transcript (with_skill)

## Symptom
Bottom member card on `/cookies-policy`: the 3-dots circle (pill `#25252C` + dots)
hugged the right edge of the footer pill.

## Steps (skill: `figma-to-nextjs/SKILL.md` followed exactly)

1. **Skill first (§Workflow order).** Read `SKILL.md` + all of `references/`
   (`source-layout.md`, `gate.md`, `patterns.md`) before touching any repo file.
2. **Source (§1 + `source-layout.md`).** Read-only context:
   - `specs/003-cookies-policy/baseline/manifest.json` → footer `453:3459 bg #1A1A23`,
     Member `#F0F0F7` 16.2 SemiBold, Trial `#B3B3BD` 12.6 Medium; dots asset
     `sidebar-more.svg` = `453:3465 GROUP 79.2x28.8 (pill #25252C + 3 dots #DFDFE6)`.
   - `components/app-sidebar.tsx` (footer/member section, Frame 42 comment):
     inner Frame 40 is 203.4 wide inside the 225-wide footer → 10.8px inset per side.
3. **Stack (§2).** No new deps. px→rem at ÷16: 10.8px → `0.675rem`,
   43.2px avatar → `2.7rem`, 64.8px height → `4.05rem`, 225px → `14.0625rem`.
   Exact hexes kept (`#1A1A23`, `#F0F0F7`, `#B3B3BD`).
4. **Structure (§3).** One route per screen; shared chrome in `components/`.
   Footer stays inside `AppSidebar`; output here is the extracted fixed snippet
   `member-footer.tsx` only (written to this outputs dir, repo untouched).
5. **Layout detail (§4 + `patterns.md` "Footer … dots pill … with left inset").**
   Diagnosis: container had `pl-[0.675rem]` but the trailing `pr-[0.675rem]`
   was the missing half of the symmetric 10.8px inset, so the `ml-auto` dots
   pill sat flush against the `rounded-full` edge. Fix: symmetric
   `pl-[0.675rem] pr-[0.675rem]` on the Frame 42 container (line 134 of
   `app-sidebar.tsx`). Avatar/text/dots classes unchanged.
6. **Gate plan (§5 + `gate.md` + `scripts/pixel-diff-cookies.mjs` region-crop
   pattern).** No dev server or screenshots run (per task hard rule) — plan only,
   see below.
7. **Pitfalls checklist.** SVGs verbatim, px÷16, gate artifacts shape,
   sidebar-only scope (48px page padding, 266px region crop at x=48css,
   24px pro-card radius, footer dots inset) — footer item now satisfied.

## Narrowed pixel-diff plan (footer band only)

Why narrow: `gate.md` §"Narrowed diffs" — for footer/avatar/dots fixes, crop to
that band so full-page stub noise can't mask the 10.5px-level fix.

Geometry (CSS px, from manifest + code comments):
- Viewport `1440x850`, `deviceScaleFactor: 2` (manifest `deviceScaleFactor: 2`,
  baseline `2880x1700`).
- Sidebar Frame 46: 266 wide @ x=48css → @2x: x=96, w=532.
- Footer Frame 42: 64.8 tall, bottom inset 28.8 (Frame 44 `py-[1.8rem]`) →
  css y-band `[850 - 28.8 - 64.8, 850 - 28.8]` = `[756.4, 821.2]` →
  @2x y-band `[1513, 1642]` (h≈129–130). Add ±4css-px pad for anti-aliasing.

Procedure (mirrors `scripts/pixel-diff-cookies.mjs`, adds a Y crop):
1. Screenshot `/cookies-policy` at `viewport { 1440x850 }`, `deviceScaleFactor: 2`,
   `waitUntil: 'networkidle'` + 500ms settle → `.superpowers/pixel-diff-cookies-footer/current.png`.
2. Reuse its `cropLeft(png, x, w)` for x=48css, then crop the footer y-band from
   BOTH baseline (`specs/003-cookies-policy/baseline/reference.png`) and current.
3. `pixelmatch(a, b, diff, w, h, { threshold: 0.1 })`;
   `percent = mismatched / (w*h)`; **PASS iff `percent < 0.01`**.
4. Write `current-footer.png` + `diff-footer.png` + `result-footer.json`
   (`{ percent, mismatched, region: "footer 266x64.8 @x48 y756.4 @2x", threshold, passed, url, at }`)
   to `.superpowers/pixel-diff-cookies-footer/`.
5. Expect: pre-fix dots column mismatches cluster at right edge (~10–11css-px wide
   stripe); post-fix band diff → PASS <1%, dots aligned within 1px@2x.
6. Pre-gate per skill: `tsc`, lint changed files, `npm run build` before claiming PASS.

## Outputs
- `member-footer.tsx` — fixed footer snippet (symmetric `pr-[0.675rem]`).
- `transcript.md` — this file.
