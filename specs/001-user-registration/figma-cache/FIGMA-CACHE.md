# Figma Cache — Registration Page (DO NOT re-fetch; API is rate-limited)

Source: file `EqW1vze2r9eFrdUdi8ajzp` ("SAAS app"), node `500:1077` ("Registration Page").
Fetched once; all work must use these local files. Do NOT call any `figma_*` MCP tools.

## Files

- `reference.png` — Figma-rendered baseline of node 500:1077 @1x (1440×850). THE diff target.
- Raw depth-3 node tree (full JSON): `C:\Users\ACER 3\.mcp-figma\cache\file_nodes_EqW1vze2r9eFrdUdi8ajzp_1791526197590.json`
- Full spec: `specs/001-user-registration/spec.md`

## Frame

- 1440×850, two columns. Left form panel ≈ 730 wide, bg near-black `#07070D` (rgb 7,7,13).
- Right decorative panel: `Rectangle 69`, x=16223 y=131 w=710 h=850, fill `#1A1922` (rgb 26,25,34).

## Right-panel media mark (centered: cx=16578, cy=556)

- `Group 17`, 176×176 at (16490,468). Two VECTORs, fill `#28272F` (rgb 40,39,48):
  - `508:1136`: 123×123 at (16490,521)
  - `508:1137`: 140×141 at (16526,468)
- Net effect (per baseline render): faint rounded-square + play-triangle + L-shaped underline, all ~15% opacity on `#1A1922`.
- Rebuild as inline SVG in the same geometry; do not hand-wave the shapes.

## Left form (instance `login form`, Frame 89 vertical, x=15635 w=474, y=271–842)

1. Logo mark: VECTOR 45×44 at (15849.5,271) — white rounded square (~10px radius) with dark star + dark wedge/notch bottom-left. Fills: `#F0F0F7` with white override.
2. Heading (in `Group 18`, 474×100 at y=363): `Create your free account` — white, bold, ≈32–36px, tight tracking, centered.
3. Subtext (in `Group 18`): `Access the world's most iconic voices in studio quality, The industry standard for high-fidelity celebrity voice clones.` — ≈15px, white/70, centered, two lines.
4. `Continue with Google` — pill button (h≈48, radius 9999), transparent bg, ~1px border white/30, white 15px medium text, Google "G" glyph left of label. (Standard Google G colors.)
5. Divider: hairline white/25 rules both sides, `or` 14px white/70 centered. (Frame 88, vertical stack, gap 24.)
6. Email field: dark fill (≈white 8% on dark), radius ≈14–16px, h≈52–56, placeholder `Enter email address` 15px white/50, left padding ≈20. `type=email required autocomplete=email`.
7. `Continue` — white pill (h≈48, radius 9999), black 15px semibold text.
8. Legal line: `By continuing, you agree to the app Terms of Service and Privacy Policy.` — 13px white/60 centered; `Terms of Service` + `Privacy Policy` semibold white underlined links.
9. Footer (y=822.8): `Already have an account? Log in` — Inter 16px, letter-spacing -0.32, Regular 400 + SemiBold 600 (`Log in`), centered, color `white 100` #F0F0F7.

## Styles

- `1:91` "white 100" FILL `#F0F0F7` (rgb 240,240,247) — text/icons on dark.
- `1:73` "black 900" FILL `#07070D` (rgb 7,7,13) — page bg.
- Font: Inter (fall back to scaffold Geist only if Inter unavailable; prefer next/font Inter).

## Constraints for the rebuild

- Viewport parity target: 1440×850 against `reference.png`.
- Responsive: right panel hidden below `lg`; form usable at 375px, no horizontal scroll.
- UI-only: stub handlers (console.log), `#` placeholder links. No backend.
