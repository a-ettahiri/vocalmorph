---
name: figma-to-nextjs
description: Translate a Figma screen to Next.js 16.4 App Router + React 19 + Tailwind v4 + strict TypeScript with pixel-diff verification. Use this skill whenever the user mentions Figma URL, node-id, Framelink ZIP/export, unpacked JSON, baseline/reference.png, public/figma SVGs, pixel-diff, pixelmatch, a new screen or route like /login /register /cookies-policy, sidebar Frame 46, decorative panel, or asks to build a page from a design — even if they don't say "figma-to-nextjs" explicitly.
---

# Figma to Next.js

Turn one Figma screen into one Next.js route that passes a <1% pixel-diff gate.

Read `docs/figma-to-nextjs.md` in the repo first when present — it is the repo-specific lock-in. This skill is the portable version of that workflow.

## When to use

- User provides a Figma URL with `node-id`, a Framelink ZIP, or points at `specs/00X-name/export/`.
- User asks for a new screen (`/login`, `/register`, `/cookies-policy`) from a design.
- User mentions pixel-diff, baseline, `reference.png`, or visual fidelity.

## Compatibility

Requires: Next.js 16.4 App Router repo, Playwright + pixelmatch + pngjs for the gate, Python 3 only for eval tooling. No new runtime deps unless needed.

## Workflow

Follow in order. Explain why at each step so future runs generalize.

### 1. Source — unpack exactly

Why: byte-identical inputs prevent drift between design and code.

- Get Figma URL with `node-id` + Framelink ZIP export.
- Unpack JSON to `specs/00X-name/export/unpacked/`.
- Save baseline PNG to `specs/.../baseline/reference.png` + write `manifest.json` (fileKey, nodeId, nodeName, frameBox, renderBounds, deviceScaleFactor, crop, sidebar notes).
- Copy SVGs byte-identical to `public/figma/*.svg`. Never hand-trace icons — use verbatim exports.
- Reference example: `specs/001-user-registration/` + `specs/003-cookies-policy/baseline/manifest.json`.
- See `references/source-layout.md` for paths and manifest fields.

### 2. Stack — check docs before code

Why: this Next.js version has breaking changes vs training data.

- Consult `node_modules/next/dist/docs/` first per `AGENTS.md` before any App Router code.
- Use React 19, Tailwind v4 pure, strict TypeScript.
- Fixed root in `app/globals.css`: `html { font-size: 16px; }`. No fluid zoom.
- Convert px to rem: `px/16` (e.g. 710px → `44.375rem`). Use exact hex colors from Figma.

### 3. Structure — one route per screen

Why: small, reviewable units keep the gate deterministic.

- Create `app/<route>/page.tsx` for metadata + layout only.
- Put interactivity in `app/<route>/<name>-form.tsx` with `'use client'`, stub handlers via `console.log`, no backend.
- Render decorative panels as verbatim Figma SVG exports (e.g. `/figma/group-20.svg`).
- Support dark with `[color-scheme:dark]` on the root.
- Shared chrome (e.g. sidebar Frame 46) lives in `components/` (see `components/app-sidebar.tsx`) and is reused across routes.

Report structure — ALWAYS use this shape:

```tsx
// app/<route>/page.tsx
import type { Metadata } from 'next';
export const metadata: Metadata = { title: '...', description: '...' };
export default function XPage() { /* layout only */ }
```

```tsx
// app/<route>/<name>-form.tsx
'use client';
export default function XForm() { /* interactive bits, console.log stubs */ }
```

### 4. Layout details that commonly fail

- Auth split: left form column independently scrollable (`min-[1420px]:h-screen min-[1420px]:overflow-y-auto`), right decorative panel `fixed right-0 top-0 h-screen w-[50vw]` and never scrolls with the form.
- Form instance centered: parent `justify-center` + child `mx-auto max-w-[29.625rem]` (474px).
- Sidebar (Frame 46, 266x850 @ x=48): page container `px-[3rem]` (48px sides), sidebar wrapper `sticky top-0 h-screen flex-none`. Pro card needs 24px radius + exact image-transform transcription — do NOT use plain `object-cover`. Footer three-dots pill needs its own left padding so it doesn't hug the edge.
- See `references/patterns.md` for auth vs sidebar snippets.

### 5. Gate — Playwright screenshot + pixelmatch

Why: eyeballing misses 2-3% drift; measurement forces 1:1 fidelity.

- Screenshot at 1440x850. Set `deviceScaleFactor` from the baseline manifest (`@2x` → `2`).
- Compare with `pixelmatch` threshold `0.1`. **PASS is <1%** (`percent < 0.01`).
- Write `current.png` + `diff.png` + `result.json` to `.superpowers/pixel-diff-*/`.
- Template: `scripts/pixel-diff-cookies.mjs` (sidebar-region crop) and `scripts/pixel-diff-login.mjs` (full page). Decode CROP windows exactly; sidebar canvas x=48 needs harness offset correction.
- Run `tsc`, lint new files, and `npm run build` before claiming done.
- See `references/gate.md` for script anatomy.

### 6. Responsive

- Desktop-first 1420px+: decorative panel `hidden min-[1420px]:flex`.
- Page cap `max-w-[100rem]` (1600px). Touch floor `min-h-[44px]`.
- Tailwind breakpoints only. Do not add fluid zoom (removed per user request).

### 7. Accessibility

- Keyboard tab-through in logical order, visible focus states, `sr-only` labels, `aria-invalid` / `role="alert"` on errors.

## Pitfalls — check before finishing

- Did you read `node_modules/next/dist/docs/` before App Router code?
- Are SVGs byte-identical verbatim exports (not redrawn)?
- Did px→rem use ÷16 and exact hex?
- Does the gate write all three artifacts and report PASS <1%?
- Sidebar only: 48px page padding, 266px region crop at x=48css, 24px pro-card radius, footer dots inset?
- Auth only: fixed 50vw panel, scrollable left column, centered 29.625rem form?

## Examples

**Example 1:**
Input: Build /register from Figma node 500:1077 with Framelink ZIP saas_app_20261009-140508.zip
Output: specs/001-user-registration/export/unpacked/*.json + baseline/reference.png + public/figma/*.svg, app/register/page.tsx + register-form.tsx, .superpowers/pixel-diff-*/current.png + diff.png + result.json with PASS <1%

**Example 2:**
Input: Add sidebar Frame 46 (266x850 @ x=48) to /cookies-policy for visual check
Output: components/app-sidebar.tsx reusing byte-identical sidebar-*.svg, app/cookies-policy/page.tsx with px-[3rem] + sticky sidebar + content stub, scripts/pixel-diff-cookies.mjs sidebar-region PASS 0.50%

**Example 3:**
Input: Fix bottom member card — dots hug the edge
Output: footer pill left padding corrected, narrowed pixel-diff on footer region, tsc + build clean
