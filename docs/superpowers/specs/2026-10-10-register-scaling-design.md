# Register scaling: subtle zoom + per-device buckets

> SUPERSEDED 2026-10-10: fluid zoom removed per user request. Root is now
> fixed `16px`; responsiveness comes purely from Tailwind breakpoints.
> Kept below for context.

Date: 2026-10-10. Scope: `/register` only. Desktop Figma PASS (1440x850, gate <1%, single run) stays valid. Right-panel video behavior deferred to a later spec.

## Decision

Pinned fluid root in `app/globals.css` (approach A; rejected stepped root for jumpiness, wrapper-scale for blur/focus issues):

```css
html { font-size: clamp(13px, 9.98px + 0.30vw + 0.20vh, 18px); }
```

Why: exactly 16.00px at 1440x850 (0.30x14.40 + 0.20x8.50 + 9.98), so all existing rem values render byte-identical at desktop. Elsewhere: 375x667 -> 12.44 clamped to 13px; 768x1024 -> 14.33px; 1920x1080 -> 17.90px. Subtle zoom feel, no per-element changes. `min-h-[44px]` guards keep touch targets legal.

## Layout buckets (`app/register/page.tsx`, already in place, no change needed)

- Phone (<640px): panel hidden, form centered `px-6 py-10`, max-w 474px.
- Tablet (640-1419px): panel hidden, form centered `sm:px-10`, width capped.
- Desktop (>=1420px, frozen): left column `pl-[142px]`, form 474x571, right Group 20 panel 710x850 full-bleed.

## Verify (no diff reruns)

Eye-check 375 / 768 / 1440 / 1920 (no h-scroll, panel hidden <1420), `tsc --noEmit`, `next build`, keyboard tab-through.
