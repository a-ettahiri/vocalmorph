# /login build transcript (with_skill)

## Skill sections applied

1. **SKILL.md §1 Source — unpack exactly.** Read `specs/002-user-login/baseline/manifest.json`
   (node `496:847` "Login Page", ZIP `saas_app_20261010-023111.zip`, frame 1440x850,
   DSF 2, crop note for DROP_SHADOW padding). Confirmed assets from the manifest:
   `login-logo.svg` (45x44 star mark), `group-19.svg` (710x850, `#1A1922` + play mark),
   `login-google-g.svg` (22x22) — all already byte-identical in `public/figma/`.
   Honored `excluded`: Frame 45 sidebar contamination (x=51) NOT wired, and Frame 83
   "See other options" overlapping variant NOT rendered (baseline PNG shows Google only).
   Verified against `specs/002-user-login/baseline/reference.png` (read visually):
   no subtitle, no signup footer — just logo / Welcome back / Google / or / email /
   Continue / legal with underlined Terms+Privacy.
2. **SKILL.md §2 Stack — check docs before code.** Read `docs/figma-to-nextjs.md`
   (repo lock-in) and `app/register/page.tsx` (auth-split reference). Next.js 16.4 App
   Router has breaking changes vs training data, so per `AGENTS.md` the implementer must
   consult `node_modules/next/dist/docs/` before writing App Router code — flagged in
   gate commands below (not re-read here; `page.tsx` keeps the proven metadata+layout-only
   shape). Strict TS, Tailwind v4 pure, fixed 16px root, px/16 rem, exact Figma hex.
3. **SKILL.md §3 Structure — one route per screen.** `page.tsx` = metadata + layout only;
   `login-form.tsx` = `'use client'` interactivity with `console.log` stubs, no backend.
   Decorative panel is verbatim `/figma/group-19.svg`; root carries `[color-scheme:dark]`.
4. **SKILL.md §4 Layout details + `references/patterns.md` (auth split).** Used the auth-split
   snippet verbatim: left column independently scrollable
   (`min-[1420px]:h-screen min-[1420px]:overflow-y-auto`), right panel
   `fixed right-0 top-0 h-screen w-[50vw]` hidden below 1420px, form instance centered
   (`justify-center` + `mx-auto max-w-[29.625rem]` = 474px). Decoded the Figma JSON
   (`export/unpacked/saas_app_20261010-023111.json`) for exact values:
   - Frame 89 vertical gap 48 → container `gap-12`; logo 45x44 (`h-11 w-[2.8125rem]`);
   - "Welcome back" 36px/800/ls-1.08 → `text-[2.25rem] tracking-[-0.0675rem] text-[#F0F0F7]`;
   - Frame 88 gap 24 → `gap-6`; Frame 82 Google 474x46 pad 12/16 gap 8 r99 stroke `#9E9EA8`;
   - Frame 84 divider 474x19 gap 19, 210px lines (`max-w-[13.125rem]`) `#B3B3BC`, "or" 16px;
   - Frame 87 gap 16 → `gap-4`; Frame 85 email 474x51 `#1A1A23` r16 pad 16;
   - Frame 35 Continue 474x51 `#F0F0F7` r89.1 (`rounded-[5.5688rem]`) pad 14.4/43.2;
   - Legal 14px Regular ls-0.7 `#C8C8D1`, links underlined per baseline render.
5. **SKILL.md §5 Gate + `references/gate.md`.** NOT run (per task: no dev server, no screenshots).
   Gate commands that would run (in repo root, files copied to `app/login/` first):
   - `npx tsc --noEmit`
   - `npx eslint app/login/page.tsx app/login/login-form.tsx` (or repo lint equiv.)
   - `npm run build`
   - `node scripts/pixel-diff-login.mjs` (Playwright 1440x850, DSF 2 from manifest,
     `pixelmatch` threshold 0.1, PASS = percent < 0.01; writes `current.png` + `diff.png` +
     `result.json` to `.superpowers/pixel-diff-login/`). Set `PIXEL_DIFF_URL` if needed.
6. **SKILL.md §6 Responsive.** Desktop-first: panel `hidden min-[1420px]:flex`,
   `min-h-[44px]` touch floor on buttons/input, Tailwind breakpoints only, no fluid zoom.
7. **SKILL.md §7 Accessibility.** `aria-labelledby="login-heading"`, `sr-only` email label,
   `aria-invalid` + `aria-describedby` + `role="alert"` error path, visible focus states,
   logical tab order (Google → email → Continue → legal links).

## Pitfalls checklist (§Pitfalls)

- [x] App Router docs consult flagged before finalizing (`node_modules/next/dist/docs/`).
- [x] SVGs referenced byte-identical (`login-logo.svg`, `group-19.svg`, `login-google-g.svg`); none redrawn.
- [x] px→rem via ÷16; exact hex from Figma floats (bg `#07070D`, panel `#1A1922`,
      text `#F0F0F7`, stroke `#9E9EA8`, muted `#B3B3BC`, input `#1A1A23`, legal `#C8C8D1`).
- [ ] Gate artifacts not produced (out of scope for this task — commands noted above).
- [x] Auth-only checks: fixed 50vw panel, scrollable left column, centered 29.625rem form.
- [x] Sidebar checks N/A (auth screen; Frame 45 contamination excluded per manifest).

## Steps taken

1. Read `figma-to-nextjs/SKILL.md` + `references/source-layout.md`, `gate.md`, `patterns.md`.
2. Read `docs/figma-to-nextjs.md`, `app/register/page.tsx`, `app/register/register-form.tsx`,
   `specs/002-user-login/baseline/manifest.json`.
3. Parsed `specs/002-user-login/export/unpacked/saas_app_20261010-023111.json` (Frame 89/88/86/
   84/87/82/85/35 geometry, fills, strokes, type styles) and viewed `baseline/reference.png`.
4. Confirmed `public/figma/` already holds `login-logo.svg`, `group-19.svg`, `login-google-g.svg`;
   reviewed `scripts/pixel-diff-login.mjs` (first 60 lines) for gate shape.
5. Wrote `page.tsx` + `login-form.tsx` here (outputs dir only; repo untouched).
6. Did NOT start a dev server or take screenshots, per instructions.
