# Transcript — sidebar route (with_skill)

## Steps taken
1. Read `figma-to-nextjs/SKILL.md` in full (workflow §§1–7, pitfalls, examples).
2. Read references: `source-layout.md` (manifest fields, `public/figma/` byte-identical SVGs),
   `gate.md` (1440x850 viewport, DSF from manifest, pixelmatch threshold 0.1, PASS <1%,
   sidebar-region crop 266px @ x=48css, pre-gate tsc/lint/build), `patterns.md`
   (sidebar page snippet: `px-[3rem]`, sticky `h-screen flex-none` wrapper, shared
   `components/app-sidebar.tsx`, pro-card image-transform transcription, footer dots inset,
   nav 18px Inter colors/letterSpacing, active row bg `#1A1A23`).
3. Read repo sources (read-only): `components/app-sidebar.tsx` (162 lines),
   `app/cookies-policy/page.tsx` (110 lines), `specs/003-cookies-policy/baseline/manifest.json`
   (node 453:3384, Frame 46 266x850 @ x=48, DSF 2), `scripts/pixel-diff-cookies.mjs`
   (sidebar-region gate), listed `public/figma/sidebar-*` (11 assets: 9 SVG + 2 PNG).
4. Copied both sources byte-identical into this outputs dir (`diff` confirms IDENTICAL)
   instead of re-typing, so verbatim SVG refs and px→rem values cannot drift.
5. Wrote this transcript. No dev server, no screenshots per task constraints.

## Skill sections applied
- §1 Source: manifest + baseline + `public/figma/sidebar-*.svg` reused verbatim; Frame 45
  (vis=false rail) excluded as contamination per manifest.
- §2 Stack: outputs preserve strict TS, Tailwind v4, exact hex, px/16 rem (e.g. 266px →
  `16.625rem`, 48px → `3rem`), `[color-scheme:dark]`.
- §3 Structure: shared chrome in `components/` (`app-sidebar.tsx`), route layout-only
  `page.tsx` with content stub; noted divergence — repo page has no separate `-form.tsx`
  since this route has no interactivity (nothing to stub via `console.log`).
- §4 Sidebar details: page `px-[3rem]` (48px sides), sidebar wrapper
  `sticky top-0 h-screen flex-none`, pro-card CROP image-transform transcription
  (247.4px-square img, top -48.5px, 24px radius — not plain `object-cover`), footer
  `pl/pr-[0.675rem]` (10.8px insets both sides), nav 18px / tracking -0.36 /
  Home Bold `#F0F0F7` / others Medium `#C9C9D1` / History active pill `#1A1A23`.
- §5 Gate (not run — commands noted below).
- §§6–7: `min-h-screen`, no fluid zoom added; `aria-label`s, `aria-current="page"`,
  focus-visible outlines preserved from source.

## Gate steps I would run (not executed per task)
```bash
npx tsc --noEmit
# lint new/changed files (repo equivalent of pnpm lint)
npm run build
# serve, then in another shell:
node scripts/pixel-diff-cookies.mjs
# optional: PIXEL_DIFF_URL=http://localhost:3000/cookies-policy node scripts/pixel-diff-cookies.mjs
```
- Gate config: viewport 1440x850, `deviceScaleFactor: 2` (manifest `@2x`),
  `waitUntil: 'networkidle'` + 500ms settle; crop left 266px @ x=48css (×DSF);
  `pixelmatch(..., { threshold: 0.1 })`, PASS = `percent < 0.01`.
- Artifacts: `.superpowers/pixel-diff-cookies/current.png`, `diff-sidebar.png`,
  `result-sidebar.json`. Reference result for these sources: PASS ~0.50%.
- Note: full-page <1% is out of scope — content column is a stub; the gate covers
  the sidebar region only.
- Docs check (§2/§7 prerequisite) before any rewrite of App Router code:
  `node_modules/next/dist/docs/` per `AGENTS.md`.
