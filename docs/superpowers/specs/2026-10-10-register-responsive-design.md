# /register Responsive + Behavior Design

**Status:** Approved section-by-section (brainstorming complete, awaiting implementation plan)
**Route:** `/register` (`app/register/page.tsx` + `app/register/register-form.tsx`)
**Stack:** Next.js 16.4 App Router + React 19 + TypeScript + Tailwind CSS v4, Inter via `next/font/google`
**Builds on:** `docs/superpowers/specs/2026-10-10-register-redo-design.md` (desktop pixel-truth, UNCHANGED by this spec)
**Informed by:** Sage "Adaptive Design: The Most Effective Approach" (http://sage.com/en-us/blog/blog-adaptive-design-the-most-effective-approach/) — adaptive coefficient + rem system

## Locked decisions

1. **Responsive scope:** all screens — mobile (~360px), tablet (~768px), desktop (1440px), large (>1440px).
2. **Mobile:** adaptive single column — side panel hidden, form column full-width with page padding, all type/spacing in rem so the coefficient scales it. Breakpoint only hides the panel.
3. **Tablet:** same as mobile, wider — single column, panel hidden, form capped at 474px and centered. One layout for everything below `lg`.
4. **Large screens:** cap at 1600px and center — the 1440px Figma geometry stays intact and centered, gutters filled with page bg `#07070D`.
5. **Submit:** stays a stub — inline validation, console log, no navigation. Backend wiring is a separate future task.
6. **Google button:** stays a stub — log only, no loading theater, no OAuth.
7. **Validation UX:** as-is — error on submit, clears on edit. No blur/live validation.
8. **Links:** as-is — `/login` (nonexistent route, future task), Terms/Privacy `href="#"`. Placeholders until destinations exist.
9. **Approach:** A (adaptive coefficient + rem) over B (breakpoint px tweaks) and C (per-element clamp).

## Adaptive coefficient derivation

From the 1440x850 Figma frame with base 16px root:

- 1vw = 1440 / 100 = 14.4px; 1vh = 850 / 100 = 8.5px
- X = 16 / (14.4 + 8.5) = 16 / 22.9 = **0.6987** (X = Y: equal height/width impact)
- Root rule: `html { font-size: calc(0.6987vh + 0.6987vw); }`
- At exactly 1440x850 this yields precisely 16px, so every px-to-rem conversion (value / 16) renders bit-identically at desktop and the <1% pixel gate is unaffected.
- Panel hiding still uses the `lg` breakpoint (pure coefficient scaling would keep the 710px panel at 360px wide — unusable). The coefficient governs everything else.

## Architecture

Root coefficient declared once in `app/globals.css` with its derivation in a comment. `page.tsx` / `register-form.tsx` convert every px value to its exact rem equivalent (divide by 16, keep 4 significant digits, e.g. 474px -> 29.625rem, 89.1px radius -> 5.5688rem). Layout breakpoints stay minimal: `lg` toggles the panel (single column below, two-panel at/above); an outer `max-w-[100rem]` (1600px) wrapper centers wider viewports. No behavior changes, no asset changes, no harness changes.

## Components

Three units, same boundaries as today:

| Unit | Change |
|---|---|
| `RegisterPage` (server frame) | Outer 1600px centered wrapper; form section single-column below `lg`, `pl-[8.875rem]` left-aligned at `lg+`; `DecorativePanel` (`hidden lg:flex`, whole `group-20.svg` bytes untouched) |
| `RegisterForm` (client island) | Google stub, divider, email + Continue stub, legal line — all px to rem, validation and stubs behavior-identical |
| Root coefficient (`globals.css`) | One new rule + derivation comment; the only new unit |

## Data flow

No change: no backend, no fetching, no state beyond local `email` / `status`. Submit validates the email regex, then shows the error or stub-logs; Google button stub-logs. The coefficient flows purely through CSS inheritance (root to rem) — zero JS resize logic to test or break.

## Error handling

Unchanged: invalid email renders the inline `role="alert"` message, cleared on edit; `noValidate` keeps behavior deterministic. New edges from this task: very short heights (landscape phones) scroll via existing `min-h-screen` + vertical rhythm with no clipped content; sub-320px widths keep `px-6` padding with no fixed-width overflows (form column is `max-w`, never `min-w`). No new error states invented.

## Testing

1. Desktop gate re-run TWICE at 1440x850 — must still PASS <1%, proving the rem conversion is exact.
2. Fresh screenshots at 360x800 and 768x1024, reviewed against rules: no horizontal overflow, panel hidden, form capped at 474px and centered, tap targets >= 44px.
3. Regression trio unchanged: `tsc --noEmit` clean, lint 0 errors, `next build` with `/register` static.
4. Keyboard walk re-run: 6 elements in visual order, no traps.
5. No new harness files — responsive checks are manual screenshot review; the pixel gate stays desktop-only by design.
