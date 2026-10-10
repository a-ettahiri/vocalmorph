# Register Route Redo — Design

**Date:** 2026-10-10
**Status:** Approved (brainstorming complete, awaiting implementation plan)
**Route:** `/register` (`app/register/page.tsx` + `app/register/register-form.tsx`)
**Stack:** Next.js 16.4 App Router + React 19 + TypeScript + Tailwind CSS v4, Inter via `next/font/google`
**Supersedes:** nothing — reaffirms `docs/superpowers/specs/2026-10-09-registration-pixel-diff-design.md` and executes via `docs/superpowers/plans/2026-10-09-registration-pixel-diff.md`

## Locked decisions (2026-10-10 brainstorming)

1. **Visual truth:** Figma file `EqW1vze2r9eFrdUdi8ajzp`, node `500:1077` ("Registration Page", 1440x850) as two panels only — center form INSTANCE 474x571 + right panel `Group 20` 710x850 `#1A1822`. The `Frame 45` sidebar (91px rail, home pill, 4 icons, avatar) present in current code and in raw Figma JSON is contamination and MUST be deleted.
2. **Asset rule:** byte-exact Figma SVG exports only (`form-logo` 45x44, `Group 17` 176x176 `508:1135`, `Google G` 22x22). No hand-written `path d=`, no guessed rects/rotations. Every `<svg>`/`<img>` in route files traces to `public/figma/` imports; audit `grep -rn "<path\|<rect\|<circle" app/register/` MUST return zero matches.
3. **Pass mark:** Playwright screenshot of `/register` at exactly 1440x850 vs fresh baseline PNG via `pixelmatch` MUST be <1% different pixels. Residual sub-1% is Inter anti-aliasing noise only.
4. **Scope:** UI-only. Client validation + stub console handlers, no backend/OAuth/DB. Legal/login links may stay `#`/`/login` placeholders. Existing `/` unchanged.

## 1. Architecture

- **Baseline store (create):** `specs/001-user-registration/baseline/reference.png` (fresh 1x export of `500:1077`, asserted 1440x850) + `baseline/manifest.json` (fileKey, nodeId, nodeName, exportedAt UTC, format png, scale 1, viewport 1440x850, via).
- **Asset store (create):** `specs/001-user-registration/baseline/assets/{form-logo,group-17,google-g}.svg` mirrored byte-identical to `public/figma/*.svg` (verified with `diff -q`, expect `MIRROR-OK`).
- **Route files (modify):** `page.tsx` = server two-panel frame + headings + footer; `register-form.tsx` = client Google button + divider + email form + legal. `Sidebar*` code deleted.
- **Harness (create):** `scripts/pixel-diff.mjs` — chromium viewport 1440x850 DSF1, screenshot to `.superpowers/pixel-diff/current.png`, pixelmatch vs baseline, writes `diff.png` + `result.json` `{percent, passed}`, exits non-zero when `percent >= 0.01`. Output dir git-ignored.
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
| Right panel | `w-[710px] bg-[#1A1822]`, `<img /figma/group-17.svg>` 176x176 centered; hidden below `lg` |

## 3. Data flow

1. Probe `figma-local render_images(500:1077, png, 1x)` single-flight (the live check).
2. Download baseline PNG, assert exactly 1440x850 via `pngjs`.
3. Render 3 SVGs one node at a time, download to `baseline/assets/`, verify each starts with `<svg`.
4. Mirror to `public/figma/` + `diff -q` byte check.
5. Delete legacy caches (safety-gated on all 4 fresh files existing).
6. Rebuild the two route files against baseline + file imports.
7. Loop: `next dev` -> harness screenshot -> diff % -> fix top cluster from token table (max 3 rounds) -> repeat until PASS.
8. Gate: `tsc --noEmit` + `lint` + `build` clean, keyboard tab-through intact.

## 4. Error handling

- **429 rate limit (observed 2x on 2026-10-09):** single-flight requests, exponential backoff, max 5 attempts, then manual Export-from-Figma-UI fallback into the same `assets/` paths (still exact bytes, no drawing). Harness work proceeds without blocking.
- **Missing baseline:** harness exits 2 with clear message, never compares against nothing.
- **Size mismatch:** harness exits 2; both images MUST be 1440x850.
- **Font drift:** Inter pinned via `next/font/google`; glyph-edge clusters accepted only if total stays <1%, documented in `result.json`.

## 5. Testing

- **Primary gate:** harness `percent < 0.01` at 1440x850 desktop only; responsive `<lg` collapse out of % scope.
- **Asset audit:** zero hand-drawn vector matches in `app/register/`.
- **Regression:** `npx tsc --noEmit`, `npm run lint`, `npm run build` (`/register` prerendered), manual Tab order Google -> email -> Continue -> Terms -> Privacy -> Log in with visible focus, no traps.
- **Out of scope:** mobile pixel-parity %, backend/auth/OAuth, homepage changes, shadcn, new deps beyond installed `playwright`/`pixelmatch`/`pngjs`.
