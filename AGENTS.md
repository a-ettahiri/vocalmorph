<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
## Agent skills

### Task: Fix MCP Schema Nesting Depth Error for REA

**Problem:** 
The REA (Reverse Engineer Anything) MCP tools have deeply nested JSON schemas (>10 levels) which trigger the upstream error: `JSON schema exceeds the maximum nesting depth of 10 levels` when using provider models like Muse Spark 1.3 / Moonshot.


### Responses
keep responses concise and to the point, unless the user asks otherwise

### Planning mode
- Always ask clarifying questions
- never assume design, tech stack or futures

### Issue tracker

Issues live as local markdown files under `.scratch/`. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context: one `GLOSSARY.md` plus `docs/adr/` at the repo root. See `docs/agents/domain.md`.

### BottomBar learnings (Figma → Next.js)

- Framelink export ZIP is ground truth. Transcribe `fills`, `gradientStops`, fill `opacity`, `effects`, and dimensions verbatim from the node JSON — never reconstruct from a prompt description. Flag prompt/export conflicts instead of silently following the prompt (e.g. prompt said "80% at bottom" while export says stops 0→80% at `opacity: 0.3`, effective 0→24%).
- Progressive blur: use feathered overlapping `backdrop-filter` layers, never hard-masked bands. Hard bands (`transparent X% → black X%`) render as visible steps. Working recipe: 8 layers `1.69 → 13.5px`, each mask feathered over 20% (`transparent start% → black start+20%`), smallest-blur-first so blur ramps 0 → 13.5 continuously with no edge at the overlay top.
- Button arrow: byte-identical export SVG from `public/figma/` via plain `<img>` — zero hand-drawn `<path>`/`<rect>` in app code (accept the `no-img-element` lint warning by design).
- Placement: `sticky bottom-0` scoped inside the right content column at `z-[200]`, not `fixed inset-x-0` over the sidebar.
### Fluid rem rule (Figma → Next.js, universal)

- Root in `app/globals.css`: `html { font-size: clamp(13px, calc(0.6987vw + 0.6987vh), 18px); }` — 16px at 1440x850 baseline (1vw=14.4px, 1vh=8.5px, X=16/22.9=0.6987). Min 13px keeps small screens readable, max 18px stops super-big on large screens.
- Every new component: write ALL dimensional CSS in `rem` (px/16, e.g. 775px → 48.4375rem, 43.2px → 2.7rem, 14.4px → 0.9rem). Applies to width/height, gap, padding/margin, fontSize/lineHeight/letterSpacing, radius, border-width, Tailwind arbitrary values (`w-[48.4375rem]`) and inline style objects (`fontSize: '2.7rem'`).
- Keep as `px`: clamp() bounds (13px/18px), media-query breakpoints (`min-[1420px]`), a11y touch guards (`min-h-[44px]`), `blur()` radii. Keep `vw`/`vh` as-is. `<img>` width/height numeric props stay as fallback (CSS class controls display). Comments keep Figma px as ground truth — never convert comments.
- Temp hygiene: prune `.tmp_*` extraction dirs after processing the export.
