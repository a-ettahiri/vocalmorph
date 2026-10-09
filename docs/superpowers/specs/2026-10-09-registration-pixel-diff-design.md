# Registration Page Pixel-Diff Replica — Design

**Date:** 2026-10-09
**Status:** Approved (brainstorming complete, awaiting implementation plan)
**Source:** Figma file `EqW1vze2r9eFrdUdi8ajzp` ("SAAS app"), node `500:1077` ("Registration Page", FRAME 1440×850, fill `#07070D`)
**Route:** `/register` (`app/register/page.tsx` + `app/register/register-form.tsx`)
**Stack:** Next.js 16.4 App Router + React 19 + TypeScript + Tailwind CSS v4, Inter via `next/font/google`

## 1. Problem

The current `/register` replica is not a 1:1 match of Figma node `500:1077`. The largest defect: it renders a left icon sidebar (`Frame 45`, 91×900 with home pill, 4 icons, avatar) that does not exist in the approved visual truth. Secondary defects: the form logo (45×44), the right-panel abstract mark (`Group 17`, 176×176, 2 vectors `#28272F`), and the Google "G" are hand-authored SVG approximations, not Figma bytes. There is no repeatable measurement proving parity.

## 2. Ground truth (locked)

- The visual baseline is the live Figma node `500:1077` re-exported via `figma-local` at 1x (1440×850 PNG). It supersedes all prior caches.
- Geometry reference: `figma-local` `get_figma_file(ids=500:1077)` node tree (two panels: center form INSTANCE 474×571 at x15635 y271 + right panel `Group 20` 710×850 `#1A1822`). Raw JSON geometrically contains a stray `Frame 45` sidebar child; it is explicitly excluded as contamination — the approved page is two panels only.
- Text content (8 strings, all Inter): `Create your free account` (36px/800/-1.08, white, center); `Access the world's most iconic voices in studio quality, The industry standard for high-fidelity celebrity voice clones.` (14px/400, `#DEDEE5`, center); `Continue with Google` (18px/500, `#EFEFF7`); `or` (16px/500, `#B3B3BC`); `Enter email address` placeholder (16px/500, `#B3B3BC`); `Continue` (18px/600, `#07070D` on `#EFEFF7` pill); legal line (14px/600/-0.7, `#C8C8D1`); `Already have an account? Log in` (16px/600, `#EFEFF7`).
- Layout tokens: Frame 89 vertical gap48; Frame 88 vertical gap24; Frame 87 vertical gap16; Google button 474×46 radius99 1px `#9E9EA8` transparent; divider 210px rules `#B3B3BC` gap19; email input 474×51 `#1A1A23` radius16; Continue 474×51 `#EFEFF7` radius89.1; right panel `#1A1822`; page bg `#07070D`.

## 3. Hard rules (user-locked)

1. **Exact assets only — never approximate.** Every graphic (form logo, `Group 17` pair, Google "G", any future image fill) MUST be a byte-exact Figma export saved as a file and imported. No hand-written `path d=`, no guessed rects/rotations, no look-alike icons. Any inline hand-authored vector path in the route files fails review.
2. **Pass mark: near-zero diff.** Playwright screenshot of `/register` at exactly 1440×850 vs the fresh baseline PNG, compared with `pixelmatch` (+`pngjs`), MUST be <1% different pixels. Residual sub-1% is accepted as font anti-aliasing noise only.
3. **No Figma API calls during routine rebuilds** except the one-time live re-export step. Day-to-day iteration uses local files only.

## 4. Architecture

- **Baseline store (new):** `specs/001-user-registration/baseline/reference.png` (fresh 1x export) + `baseline/manifest.json` (node id, version id, export date, viewport). Replaces the deleted `figma-cache/` directory with a clean name.
- **Asset store (new):** `specs/001-user-registration/baseline/assets/*.svg` (authoritative Figma exports) mirrored to `public/figma/*.svg` for serving. Components import from `public/figma/`; the `assets/` copies are the audit source.
- **Route files:** `app/register/page.tsx` (server component: two-panel frame, headings, footer) + `app/register/register-form.tsx` (client: Google button, divider, email form, legal). Sidebar component and all sidebar code deleted.
- **Harness (new):** `scripts/pixel-diff.mjs` — launches Playwright chromium at viewport 1440×850 `deviceScaleFactor:1`, hides caret, screenshots `/.superpowers/pixel-diff/current.png`, runs `pixelmatch` vs `reference.png`, writes `diff.png` heatmap + `result.json` (`{percent, passed}`), exits non-zero when `percent >= 1`. Deps (`playwright`, `pixelmatch`, `pngjs`) are already in `package.json`.

## 5. Data flow

1. Verify `figma-local` live (single `render_images(500:1077, png, 1x)` probe).
2. Re-export baseline PNG + SVG assets + manifest via `figma-local` (one node at a time, backoff on 429).
3. Delete old caches (only after step 2 succeeds — never leave zero baseline).
4. Rebuild route files against baseline + file-imported assets.
5. Loop: `next dev` → harness screenshot → diff % → fix top contributor → repeat until <1%.
6. Gate: `tsc --noEmit` + `lint` + `build` clean, keyboard tab-through intact.

## 6. Cache removal (old official-MCP leftovers)

Delete in build mode, in this order (items 1–2 only after fresh baseline lands):

1. `specs/001-user-registration/figma-cache/` (`FIGMA-CACHE.md` + old `reference.png`) — superseded by `baseline/`.
2. `C:\Users\ACER 3\.mcp-figma\cache\file_nodes_EqW1vze2r9eFrdUdi8ajzp_*.json` (4 dumps) — outside repo.
3. `specs001-user-registrationfigma-cache/` + `specs001-user-registrationchecklists/` — empty malformed root dirs.
4. Keep `specs/001-user-registration/spec.md` + `checklists/requirements.md` (update sidebar references if contradicted).

Cleanup commits separately from the rebuild commit.

## 7. Error handling

- **429 rate limit (observed twice on 2026-10-09 with `figma-local` on `get_file_nodes` + `render_images`):** single-flight requests, exponential backoff, stop after 5 retries and surface. The "no rate limit" assumption is unverified — the probe in step 1 decides. If the API stays limited, the fallback is manual Export from Figma UI into the same `assets/` dir (still exact bytes, still no drawing), and harness work proceeds without blocking.
- **Missing baseline:** harness refuses to run and errors clearly rather than comparing against nothing.
- **Font drift:** Inter pinned via `next/font/google`; if residual diff clusters on glyph edges and total stays <1%, accepted and documented in `result.json` notes.

## 8. Testing

- **Primary gate:** harness `percent < 1` at 1440×850 (desktop only; responsive `<lg` behavior unchanged and out of scope for the %).
- **Asset audit:** grep route files for hand-authored vector data — every `<svg>`/`<img>` must trace to `public/figma/` imports.
- **Regression:** `npx tsc --noEmit`, `npm run lint`, `npm run build` (`/register` prerendered), manual keyboard tab order (Google → email → Continue → legal → Log in) with visible focus.

## 9. Out of scope

Mobile pixel-parity %, backend/auth/OAuth wiring (stubs stay), homepage changes, shadcn adoption, any new dependency beyond the installed harness trio.
