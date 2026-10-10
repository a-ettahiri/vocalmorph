# Register Route Redo — Design

**Date:** 2026-10-10
**Status:** Approved + corrected 2026-10-10 (see Correction below) — implementation DONE in `.worktrees/001-user-registration-pixel-diff`, harness PASSED 0.62%
**Route:** `/register` (`app/register/page.tsx` + `app/register/register-form.tsx`)
**Stack:** Next.js 16.4 App Router + React 19 + TypeScript + Tailwind CSS v4, Inter via `next/font/google`
**Supersedes:** nothing — reaffirms `docs/superpowers/specs/2026-10-09-registration-pixel-diff-design.md` and executes via `docs/superpowers/plans/2026-10-09-registration-pixel-diff.md` **as revised in the worktree** (export-once bridge, @2x baseline)

## Correction (2026-10-10, accepted by user)

This spec as first written described the ORIGINAL plan (1440x850 @1x baseline, `group-17.svg` 176x176 mark, panel `#1A1822`, REST export). The worktree implementation instead followed the REVISED plan: Framelink Exporter plugin ZIP (zero API calls), baseline 2880x1700 @2x (viewport 1440x850 CSS, DSF 2), whole-panel `group-20.svg` export (Rectangle 69 `#1A1922` + Group 17 mark, per actual Figma bytes), harness auto-follows baseline dims. The @2x gate is strictly harder (4x pixels); whole-panel bytes are more exact than a hand-composed panel+mark. Sections below are corrected to that reality.

## Locked decisions (2026-10-10 brainstorming)

1. **Visual truth:** Figma file `EqW1vze2r9eFrdUdi8ajzp`, node `500:1077` ("Registration Page", 1440x850 CSS) as two panels only — center form INSTANCE 474x571 + right panel `Group 20` 710x850 `#1A1922` (Rectangle 69 per actual export bytes; the earlier `#1A1822` reading from the node tree was wrong). The `Frame 45` sidebar (91px rail, home pill, 4 icons, avatar) present in prior code and in raw Figma JSON is contamination (`visible=false`) and MUST be deleted.
2. **Asset rule:** byte-exact Figma SVG exports only (`form-logo` 45x44, `group-20` whole 710x850 panel incl. Group 17 mark, `Google G` 22x22). No hand-written `path d=`, no guessed rects/rotations. Every `<svg>`/`<img>` in route files traces to `public/figma/` imports; audit `grep -rn "<path\|<rect\|<circle" app/register/` MUST return zero matches.
3. **Pass mark:** Playwright screenshot of `/register` at viewport 1440x850 CSS with DSF following the baseline (DSF 2 for the 2880x1700 @2x baseline) vs baseline PNG via `pixelmatch` MUST be <1% different pixels. Recorded PASS 2026-10-09: 0.62% (30191 px @2x). Residual sub-1% is Inter anti-aliasing noise only.
4. **Scope:** UI-only. Client validation + stub console handlers, no backend/OAuth/DB. Legal/login links may stay `#`/`/login` placeholders. Existing `/` unchanged.

## 1. Architecture

- **Baseline store (create):** `specs/001-user-registration/baseline/reference.png` (Framelink plugin export of `500:1077`, cropped to frame box 2880x1700 @2x; uncropped node PNG kept in `specs/001-user-registration/export/` as provenance) + `baseline/manifest.json` (fileKey, nodeId, nodeName, exportedAt UTC, zipName, baseline dims, deviceScaleFactor 2, crop record, via).
- **Asset store (create):** `specs/001-user-registration/baseline/assets/{form-logo,group-20,google-g}.svg` mirrored byte-identical to `public/figma/*.svg` (verified with `diff -q`, expect `MIRROR-OK`).
- **Route files (modify):** `page.tsx` = server two-panel frame + headings + footer; `register-form.tsx` = client Google button + divider + email form + legal. `Sidebar*` code deleted.
- **Harness (create):** `scripts/pixel-diff.mjs` — chromium viewport 1440x850 with DSF following baseline dims (2 for 2880x1700, 1 for 1440x850), screenshot to `.superpowers/pixel-diff/current.png`, pixelmatch vs baseline, writes `diff.png` + `result.json` `{percent, passed}`, exits non-zero when `percent >= 0.01`. Output dir git-ignored.
- **Cleanup (delete, only after fresh baseline lands):** `specs/001-user-registration/figma-cache/`, root `specs001-user-registrationfigma-cache/` + `specs001-user-registrationchecklists/`, out-of-repo `~/.mcp-figma/cache/file_nodes_*.json` x4. Keep `spec.md` + `checklists/requirements.md`.

## 2. Components

| Element | Spec |
|---|---|
| Page frame | `main` bg `#07070D`, inner `max-w-[1440px] min-h-[850px] flex-row` |
| Form column | `max-w-[474px] gap-12` (Frame 89 gap48); logo `<img /figma/form-logo.svg>` 45x44 |
| Headings | H1 `Create your free account` 36px/800/-1.08 white center; sub 14px/400 `#DEDEE5` center, exact two-sentence copy |
| Google button | 474x46 radius99 1px `#9E9EA8` transparent, `<img /figma/google-g.svg>` 22x22 + label 18px/500 `#EFEFF7` |
| Divider | 474x19 gap19, 210px rules `#B3B3BC`, `or` 16px/500 `#B3B3BC` |
| Email form | input 474x51 `#1A1A23` radius16, 16px/500 ls 0.48, placeholder `Enter email address` `#B3B3BC`; Continue 474x51 `#EFEFF7` radius89.1, 18px/600 `#07070D` |
| Legal | 14px/600/-0.7 `#C8C8D1` center with Terms + Privacy links |
| Footer | 16px/600 `#EFEFF7` center, `Log in` link to `/login` |
| Right panel | `w-[710px] bg-[#1A1922]`, whole-panel `<img /figma/group-20.svg>` 710x850 (Rectangle 69 + Group 17 mark, exact bytes); hidden below `lg` |

## 3. Data flow

1. Human export from Figma Desktop via Framelink Exporter plugin (ZIP with PNG frames @2x + SVG icons + image fills); zero Figma API calls, so no 429 path. Fallback: manual Export from Figma UI into the same paths (still exact bytes).
2. Unpack ZIP to `specs/001-user-registration/export/`, crop root-frame PNG to frame box (offset 8,0 — removes canvas-only DROP_SHADOW padding), assert 2880x1700 via `pngjs`.
3. Map the 3 SVGs via the export manifest, copy to `baseline/assets/`, verify each starts with `<svg`.
4. Mirror to `public/figma/` + `diff -q` byte check.
5. Delete legacy caches (safety-gated on all 4 fresh files existing).
6. Rebuild the two route files against baseline + file imports.
7. Loop: `next dev` -> harness screenshot -> diff % -> fix top cluster from token table (max 3 rounds) -> repeat until PASS.
8. Gate: `tsc --noEmit` + `lint` + `build` clean, keyboard tab-through intact.

## 4. Error handling

- **Figma contact:** export-once via Framelink plugin ZIP; no API calls by design (the 429s seen 2x on 2026-10-09 with the old REST path are gone). If the plugin is unavailable, manual Export-from-Figma-UI fallback into the same `assets/` paths (still exact bytes, no drawing).
- **Missing baseline:** harness exits 2 with clear message, never compares against nothing.
- **Size mismatch:** harness exits 2; dims MUST be 2880x1700 (@2x) or 1440x850 (@1x), DSF follows baseline.
- **Font drift:** Inter pinned via `next/font/google`; glyph-edge clusters accepted only if total stays <1%, documented in `result.json`.

## 5. Testing

- **Primary gate:** harness `percent < 0.01` at 1440x850 CSS viewport (DSF 2 against the @2x baseline); responsive `<lg` collapse out of % scope.
- **Asset audit:** zero hand-drawn vector matches in `app/register/`.
- **Regression:** `npx tsc --noEmit`, `npm run lint`, `npm run build` (`/register` prerendered), manual Tab order Google -> email -> Continue -> Terms -> Privacy -> Log in with visible focus, no traps.
- **Out of scope:** mobile pixel-parity %, backend/auth/OAuth, homepage changes, shadcn, new deps beyond installed `playwright`/`pixelmatch`/`pngjs`.
