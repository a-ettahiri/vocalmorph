# Figma → Next.js Translation Workflow (locked 2026-10-10)

Reference example: `specs/001-user-registration/` + `app/register/`.
Fidelity gate: `scripts/pixel-diff-*.mjs` → `.superpowers/pixel-diff-*/`.

1. **Source.** Figma URL with `node-id` + Framelink ZIP export.
   Unpack JSON → `specs/00X-name/export/unpacked/`, baseline PNG →
   `specs/.../baseline/reference.png`, SVGs → `public/figma/*.svg`.
2. **Stack.** Next.js 16.4 App Router — consult
   `node_modules/next/dist/docs/` first per `AGENTS.md`. React 19,
   Tailwind v4 pure (no new deps unless needed), strict TypeScript.
3. **Units.** Fixed `16px` root (`app/globals.css`); convert px→rem
   (`px/16`, e.g. 710px → `44.375rem`). Exact hex colors from Figma.
4. **Structure.** One route per screen (`/register`, `/login`):
   `page.tsx` (metadata + layout) + `*-form.tsx` (`'use client'`,
   stub handlers via `console.log`, no backend). Decorative panels as
   verbatim Figma SVG exports. Dark via `[color-scheme:dark]`.
5. **Gate.** Playwright screenshot at 1440×850, `deviceScaleFactor`
   follows baseline (@2x → 2), `pixelmatch` threshold 0.1,
   **PASS < 1%**. Writes `current.png` + `diff.png` + `result.json`.
6. **Responsive.** Panel hidden below 1420px (`min-[1420px]:flex`),
   form centered `max-w-[29.625rem]` (474px), page cap
   `max-w-[100rem]` (1600px), `min-h-[44px]` touch floor. Tailwind
   breakpoints only — no fluid zoom (removed per user request).
7. **A11y.** Keyboard tab-through in logical order, visible focus
   states, `sr-only` labels, `aria-invalid`/`role="alert"` on errors.

Durable user prefs also live in Honcho memory (workspace `opencode`,
peer `user`); this doc covers the repo-specific how.
