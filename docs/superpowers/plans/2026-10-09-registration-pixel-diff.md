# Registration Pixel-Diff Replica Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `/register` pixel-match Figma node `500:1077` at 1440×850 CSS (2880×1700 actual @2x) to <1% diff, with zero hand-drawn assets and all old caches deleted.

**Architecture:** Export-once via the Framelink Exporter plugin ZIP + `figma-local-mcp` bridge (exact Figma bytes only, zero API calls), delete the four legacy cache locations, rebuild the two route files as a two-panel layout referencing file-imported assets, and gate everything on a Playwright + pixelmatch harness.

**Tech Stack:** Next.js 16.4 App Router, React 19, TypeScript, Tailwind CSS v4, Playwright 1.64 + pixelmatch 8 + pngjs 7 (all three already in `devDependencies`), `figma-local-mcp` bridge server (stdio, no API key).

---

## File structure

| File | Responsibility |
|---|---|
| `specs/001-user-registration/export/` (create, unpacked ZIP working dir) | Raw Framelink Exporter output: `<file>.json` + `<file>.assets/` (`node_*.png`, `icon_*.svg`, `image_*.png`) + `framelinkExport` manifest |
| `specs/001-user-registration/baseline/reference.png` (create) | Root-frame PNG from the export ZIP (@2x, 2880×1700) — the only diff baseline |
| `specs/001-user-registration/baseline/manifest.json` (create) | Export provenance: node id, export date, ZIP name, baseline dims, DSF |
| `specs/001-user-registration/baseline/assets/*.svg` (create, 3 files) | Authoritative Figma SVG exports: `form-logo.svg`, `group-17.svg`, `google-g.svg` |
| `public/figma/*.svg` (create, 3 files) | Served copies of the same exports; the only graphics the route may use |
| `scripts/pixel-diff.mjs` (create) | Harness: screenshot `/register` at 1440×850, pixelmatch vs baseline, writes `diff.png` + `result.json`, exits non-zero when diff ≥1% |
| `app/register/page.tsx` (modify) | Delete `Sidebar()` + icons; two-panel frame; `<img>` tags for `form-logo.svg` and `group-17.svg` |
| `app/register/register-form.tsx` (modify) | Delete hand-pathed `GoogleMark()`; `<img>` tag for `google-g.svg` |
| `specs/001-user-registration/figma-cache/` (delete) | Legacy official-MCP cache (`FIGMA-CACHE.md` + old `reference.png`) |
| `specs001-user-registrationfigma-cache/` + `specs001-user-registrationchecklists/` (delete) | Empty malformed root dirs |
| `~/.mcp-figma/cache/file_nodes_*.json` ×4 (delete) | Official-MCP dumps outside the repo |

---

### Task 1: Bridge setup + human export (replaces the REST probe — no API calls)

**Files:** `~/.config/opencode/opencode.json` (already swapped, pending opencode restart); no repo commit.

- [ ] **Step 1: Confirm the MCP swap is in place**

The `figma-local` server entry is now `{ "command": ["npx", "-y", "figma-local-mcp", "--stdio"] }` with no `FIGMA_API_KEY`. After an opencode restart the tools `get_figma_data_from_json`, `get_node_image`, and `get_node_svg` replace the old REST tools. The old 429 path is gone — there is nothing to probe.

- [ ] **Step 2: Human export from Figma Desktop (the only Figma contact)**

In Figma Desktop: install the **Framelink Exporter** Community plugin (Open in… → the SAAS-app file) → optionally delete/drag out the stray `Frame 45` sidebar layer → select **only** the Registration Page frame (`500:1077`) → all three asset toggles ON (PNG frames, SVG icons, image fills) → Export ZIP. Save the ZIP to the repo root as `figma-export.zip` (or hand the file path to the agent).

- [ ] **Step 3 (only if the plugin cannot be installed): manual-export fallback**

In the Figma UI, select frame `500:1077`, Export → PNG @2x into `specs/001-user-registration/baseline/reference.png` (create `baseline/` first). For each SVG in Task 3, right-click the layer → Export → SVG into `specs/001-user-registration/baseline/assets/`. All bytes still come from Figma; nothing is drawn by hand. Then skip to Task 4.

---

### Task 2: Unpack the export ZIP + wire baseline PNG + manifest

**Files:**
- Create: `specs/001-user-registration/export/` (unpacked ZIP: `<file>.json` + `<file>.assets/`)
- Create: `specs/001-user-registration/baseline/reference.png`
- Create: `specs/001-user-registration/baseline/manifest.json`

- [ ] **Step 1: Unpack the ZIP and inspect the manifest**

```bash
mkdir -p specs/001-user-registration/export && unzip -o figma-export.zip -d specs/001-user-registration/export && ls specs/001-user-registration/export
```

Expected: an exported `<file>.json` plus an `<file>.assets/` dir with `node_*.png` (frame renders @2x), `icon_*.svg`, and the `framelinkExport` manifest block inside the JSON. Read the manifest to map asset files → nodeIds.

- [ ] **Step 2: Wire the root-frame PNG to baseline + assert dims**

Copy the `node_*.png` for the Registration Page root frame to `specs/001-user-registration/baseline/reference.png`, then assert dims and derive the harness DSF:

```bash
node -e "const fs=require('fs');const {PNG}=require('pngjs');const p=PNG.sync.read(fs.readFileSync('specs/001-user-registration/baseline/reference.png'));console.log(p.width+'x'+p.height);if(!((p.width===2880&&p.height===1700)||(p.width===1440&&p.height===850))){process.exit(1)}"
```

Expected: `2880x1700` (DSF 2 — the normal plugin output) or `1440x850` (DSF 1). Anything else → wrong frame exported, re-export before continuing.

- [ ] **Step 3: Write manifest.json with the real export values**

Create `specs/001-user-registration/baseline/manifest.json` with exactly this shape, filling `exportedAt` with the current UTC timestamp and `zipName` with the actual ZIP filename:

```json
{
  "fileKey": "EqW1vze2r9eFrdUdi8ajzp",
  "nodeId": "500:1077",
  "nodeName": "Registration Page",
  "exportedAt": "2026-10-09T00:00:00.000Z",
  "zipName": "figma-export.zip",
  "baseline": { "width": 2880, "height": 1700 },
  "deviceScaleFactor": 2,
  "via": "Framelink Exporter plugin + figma-local-mcp (no API calls)"
}
```

- [ ] **Step 4: Commit**

```bash
git add specs/001-user-registration/export specs/001-user-registration/baseline/reference.png specs/001-user-registration/baseline/manifest.json
git commit -m "Add Framelink export + fresh baseline for registration pixel-diff"
```

---

### Task 3: Map the three exact SVG assets from the export ZIP

**Files:**
- Create: `specs/001-user-registration/baseline/assets/form-logo.svg`
- Create: `specs/001-user-registration/baseline/assets/group-17.svg`
- Create: `specs/001-user-registration/baseline/assets/google-g.svg`
- Create: `public/figma/form-logo.svg` (byte-identical copy)
- Create: `public/figma/group-17.svg` (byte-identical copy)
- Create: `public/figma/google-g.svg` (byte-identical copy)

Targets: form logo vector (45×44, inside login-form instance Frame 89), `Group 17` = `508:1135` (176×176), Google "G" frame (22×22, `devicon:google` inside the instance). The bridge server's ABSENT-ASSET RULE applies: only wire SVGs present in the export — never fabricate.

- [ ] **Step 1: Resolve the three SVGs via the export manifest**

Read the `framelinkExport` manifest (or `get_figma_data_from_json` over the exported JSON) and map `icon_*.svg` files → nodeIds for the three targets above. If the manifest lacks node mapping, match by size/order and report the mapping for sign-off before wiring.

- [ ] **Step 2: Copy the three SVGs into baseline/assets/ + verify**

Copy each resolved file to its `baseline/assets/` name. Verify all three start with `<svg`:

```bash
head -c 100 "specs/001-user-registration/baseline/assets/group-17.svg" && head -c 100 "specs/001-user-registration/baseline/assets/form-logo.svg" && head -c 100 "specs/001-user-registration/baseline/assets/google-g.svg"
```

Fallback (only if a target is missing from the export): manual Export → SVG from the Figma UI into the same path.

- [ ] **Step 3: Mirror the three SVGs into public/figma/**

```bash
mkdir -p public/figma && cp "specs/001-user-registration/baseline/assets/form-logo.svg" public/figma/form-logo.svg && cp "specs/001-user-registration/baseline/assets/group-17.svg" public/figma/group-17.svg && cp "specs/001-user-registration/baseline/assets/google-g.svg" public/figma/google-g.svg && diff -q "specs/001-user-registration/baseline/assets/form-logo.svg" public/figma/form-logo.svg && diff -q "specs/001-user-registration/baseline/assets/group-17.svg" public/figma/group-17.svg && diff -q "specs/001-user-registration/baseline/assets/google-g.svg" public/figma/google-g.svg && echo MIRROR-OK
```

Expected: `MIRROR-OK` (all three copies byte-identical).

- [ ] **Step 4: Commit**

```bash
git add "specs/001-user-registration/baseline/assets" public/figma/form-logo.svg public/figma/group-17.svg public/figma/google-g.svg
git commit -m "Add exact Figma SVG assets for registration page"
```

---

### Task 4: Delete legacy caches

**Files:** delete the four locations listed in the file-structure table. Keep `spec.md` and `checklists/requirements.md`.

- [ ] **Step 1: Confirm the fresh baseline exists (safety gate)**

```bash
ls -l "specs/001-user-registration/baseline/reference.png" "specs/001-user-registration/baseline/assets/form-logo.svg" "specs/001-user-registration/baseline/assets/group-17.svg" "specs/001-user-registration/baseline/assets/google-g.svg"
```

Expected: all four files listed. If any is missing, STOP — do not delete anything.

- [ ] **Step 2: Delete the in-repo legacy caches**

```bash
rm -rf "specs/001-user-registration/figma-cache" specs001-user-registrationfigma-cache specs001-user-registrationchecklists && ls specs/001-user-registration/ && ls -d specs001-user-registrationfigma-cache specs001-user-registrationchecklists 2>&1 || true
```

Expected: `specs/001-user-registration/` lists `baseline checklists spec.md` (no `figma-cache`); the second `ls` prints "No such file or directory" for both removed dirs.

- [ ] **Step 3: Delete the out-of-repo official-MCP dumps**

```bash
rm -f "/c/Users/ACER 3/.mcp-figma/cache/file_nodes_EqW1vze2r9eFrdUdi8ajzp_1791524767937.json" "/c/Users/ACER 3/.mcp-figma/cache/file_nodes_EqW1vze2r9eFrdUdi8ajzp_1791526197590.json" "/c/Users/ACER 3/.mcp-figma/cache/file_nodes_EqW1vze2r9eFrdUdi8ajzp_1791527510120.json" "/c/Users/ACER 3/.mcp-figma/cache/file_nodes_EqW1vze2r9eFrdUdi8ajzp_1791527521517.json" && ls "/c/Users/ACER 3/.mcp-figma/cache/" 2>&1 || true
```

Expected: the `ls` shows an empty dir or "No such file or directory".

- [ ] **Step 4: Verify no stale references remain**

```bash
grep -rn "figma-cache\|\.mcp-figma\|1791524\|1791526\|1791527" --include="*.tsx" --include="*.ts" --include="*.md" app specs public scripts 2>/dev/null; echo "grep-exit=$?"
```

Expected: `grep-exit=1` (zero matches). The only allowed mentions are in `docs/superpowers/` history (spec/plan) and git history.

- [ ] **Step 5: Commit the cleanup (only tracked files need it)**

```bash
git status --short | grep -E "figma-cache|specs001" && git add -u && git commit -m "Remove legacy official-MCP Figma caches" || echo NOTHING-TRACKED-TO-COMMIT
```

Expected: either a commit, or `NOTHING-TRACKED-TO-COMMIT` (all removed paths were untracked — deletion itself is the cleanup; the out-of-repo `~/.mcp-figma` dumps need no commit).

---

### Task 5: Write the pixel-diff harness (the failing test)

**Files:**
- Create: `scripts/pixel-diff.mjs`

TDD framing: this script IS the test. It must run red (>1% diff, sidebar still present) before the rebuild tasks.

- [ ] **Step 1: Ensure Playwright chromium is installed**

```bash
npx playwright install chromium --with-deps 2>&1 | tail -n 3 || npx playwright install chromium 2>&1 | tail -n 3
```

Expected: success message or "already installed". Idempotent — safe to re-run.

- [ ] **Step 1b: Gitignore the harness output dir**

```bash
if grep -q "^\.superpowers/" .gitignore; then echo IGNORE-ALREADY-PRESENT; else printf "\n# pixel-diff harness output\n.superpowers/\n" >> .gitignore && git add .gitignore && git commit -m "Ignore pixel-diff harness output"; fi
```

Expected: a commit, or `IGNORE-ALREADY-PRESENT` (the `grep -q` succeeds, short-circuiting before any write).

- [ ] **Step 2: Write scripts/pixel-diff.mjs**

Create `scripts/pixel-diff.mjs` with exactly this content:

```js
// Pixel-diff harness: screenshot /register at 1440x850 CSS and compare vs the
// Figma baseline. deviceScaleFactor follows the baseline dims (@2x plugin
// export -> DSF 2). PASS = diff < 1%. Writes current.png + diff.png + result.json.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BASELINE = path.join(ROOT, 'specs/001-user-registration/baseline/reference.png');
const OUT_DIR = path.join(ROOT, '.superpowers/pixel-diff');
const CURRENT = path.join(OUT_DIR, 'current.png');
const DIFF = path.join(OUT_DIR, 'diff.png');
const RESULT = path.join(OUT_DIR, 'result.json');
const URL = process.env.PIXEL_DIFF_URL ?? 'http://localhost:3000/register';
const THRESHOLD = 0.01; // 1% — the user-locked pass mark

if (!fs.existsSync(BASELINE)) {
  console.error(`Baseline missing: ${BASELINE}. Run Task 2 first.`);
  process.exit(2);
}
fs.mkdirSync(OUT_DIR, { recursive: true });

// Exporter renders frames @2x (2880x1700); tolerate a 1x manual export.
const dims = PNG.sync.read(fs.readFileSync(BASELINE));
const DSF =
  dims.width === 2880 && dims.height === 1700 ? 2 :
  dims.width === 1440 && dims.height === 850 ? 1 : 0;
if (!DSF) {
  console.error(
    `Unexpected baseline size ${dims.width}x${dims.height}; want 2880x1700 (@2x) or 1440x850 (@1x).`,
  );
  process.exit(2);
}

const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 850 },
    deviceScaleFactor: DSF,
  });
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: CURRENT });
} finally {
  await browser.close();
}

const a = PNG.sync.read(fs.readFileSync(BASELINE));
const b = PNG.sync.read(fs.readFileSync(CURRENT));
if (a.width !== b.width || a.height !== b.height) {
  console.error(
    `Size mismatch: baseline ${a.width}x${a.height} vs current ${b.width}x${b.height} (DSF ${DSF}).`,
  );
  process.exit(2);
}
const diff = new PNG({ width: a.width, height: a.height });
const mismatched = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.1 });
fs.writeFileSync(DIFF, PNG.sync.write(diff));
const percent = mismatched / (a.width * a.height);
const passed = percent < THRESHOLD;
fs.writeFileSync(
  RESULT,
  JSON.stringify(
    { percent, mismatched, width: a.width, height: a.height, threshold: THRESHOLD, passed, deviceScaleFactor: DSF, baseline: BASELINE, url: URL, at: new Date().toISOString() },
    null,
    2,
  ),
);
console.log(`diff: ${(percent * 100).toFixed(3)}% (${mismatched} px) -> ${passed ? 'PASS' : 'FAIL'} (gate <1%)`);
process.exit(passed ? 0 : 1);
```

- [ ] **Step 3: Start the dev server and run the harness to verify it FAILS (red)**

```bash
(npm run dev > .superpowers/pixel-diff/dev.log 2>&1 &) && sleep 12 && node scripts/pixel-diff.mjs; echo "harness-exit=$?"
```

Expected: `diff: <large>% ... -> FAIL`, `harness-exit=1`, and `.superpowers/pixel-diff/result.json` exists with `passed: false`. The large diff is driven by the stray sidebar. If it prints PASS already, stop and report — the premise is wrong.

- [ ] **Step 4: Commit the harness**

```bash
git add scripts/pixel-diff.mjs && git commit -m "Add registration pixel-diff harness"
```

Leave the dev server running for the next tasks; stop it at the end of Task 8.

---

### Task 6: Rebuild page.tsx — two panels, file-imported assets

**Files:**
- Modify: `app/register/page.tsx` (delete `SidebarLogo`, `HomeGlyph`, `SidebarIcon`, `SIDEBAR_ICONS`, `Sidebar`; replace `FormLogo` paths with `<img>`; replace `DecorativePanel` rects with `<img>`)

- [ ] **Step 1: Replace the whole file with the two-panel version**

Write `app/register/page.tsx` with exactly this content:

```tsx
import type { Metadata } from 'next';
import RegisterForm from './register-form';

export const metadata: Metadata = {
  title: 'Create your free account',
  description:
    'Create a free account to access iconic voices in studio quality.',
};

/** Right decorative panel — Group 20: 710x850 #1A1822, Group 17 mark is a Figma export. */
function DecorativePanel() {
  return (
    <aside
      aria-hidden="true"
      className="hidden w-[710px] max-w-[49.3%] flex-none items-center justify-center bg-[#1A1822] lg:flex"
    >
      <img
        src="/figma/group-17.svg"
        alt=""
        width={176}
        height={176}
        className="h-44 w-44"
      />
    </aside>
  );
}

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen w-full justify-center bg-[#07070D] text-white [color-scheme:dark]">
      <div className="flex min-h-[850px] w-full max-w-[1440px] flex-row shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
        {/* Center — registration form INSTANCE, 474x571 */}
        <section
          aria-labelledby="register-heading"
          className="flex min-w-0 flex-1 items-center justify-center px-6 py-14 sm:px-10"
        >
          {/* Frame 89: vertical, gap 48 */}
          <div className="flex w-full max-w-[474px] flex-col items-center gap-12">
            <img
              src="/figma/form-logo.svg"
              alt=""
              width={45}
              height={44}
              className="h-11 w-[45px]"
            />

            {/* Headings — Group 18: 474x100 */}
            <div className="flex w-full flex-col items-center gap-3">
              <h1
                id="register-heading"
                className="w-full text-center text-[36px] font-extrabold leading-[43.57px] tracking-[-1.08px] text-white"
              >
                Create your free account
              </h1>
              <p className="w-full text-center text-[14px] font-normal leading-[22.4px] text-[#DEDEE5]">
                Access the world&apos;s most iconic voices in studio quality,
                The industry standard for high-fidelity celebrity voice clones.
              </p>
            </div>

            {/* Frame 88: vertical, gap 24 */}
            <RegisterForm />

            {/* Footer — 236x19, #EFEFF7, 16px SemiBold, center */}
            <p className="text-center text-[16px] font-semibold leading-[19px] text-[#EFEFF7]">
              Already have an account?{' '}
              <a href="/login" className="text-[#EFEFF7] hover:underline">
                Log in
              </a>
            </p>
          </div>
        </section>

        <DecorativePanel />
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Typecheck the route**

```bash
npx tsc --noEmit
```

Expected: clean, no output, exit 0.

---

### Task 7: Rebuild register-form.tsx — Figma Google "G", no hand paths

**Files:**
- Modify: `app/register/register-form.tsx` (delete `GoogleMark()`; use `<img src="/figma/google-g.svg">`)

- [ ] **Step 1: Replace the GoogleMark component with the exported asset**

In `app/register/register-form.tsx`, delete the entire `GoogleMark` function (lines 5–42, the `svg` with 5 hand-written `path` elements) and replace its usage:

```tsx
<img
  src="/figma/google-g.svg"
  alt=""
  width={22}
  height={22}
  className="h-[22px] w-[22px] flex-none"
/>
```

so the Google button block reads exactly:

```tsx
<button
  type="button"
  onClick={handleGoogle}
  className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[99px] border border-[#9E9EA8] bg-transparent px-4 py-3 text-left transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
>
  <img
    src="/figma/google-g.svg"
    alt=""
    width={22}
    height={22}
    className="h-[22px] w-[22px] flex-none"
  />
  <span className="text-[18px] font-medium leading-none text-[#EFEFF7]">
    Continue with Google
  </span>
</button>
```

Everything else in the file stays byte-identical.

- [ ] **Step 2: Run the asset audit — zero hand-drawn vectors allowed**

```bash
grep -rn "<path\|<rect\|<circle\| d=\"" app/register/; echo "audit-exit=$?"
```

Expected: `audit-exit=1` (zero matches — no inline vector data remains in either route file).

- [ ] **Step 3: Typecheck + lint**

```bash
npx tsc --noEmit && npm run lint
```

Expected: both clean, no output, exit 0.

- [ ] **Step 4: Commit the rebuild**

```bash
git add app/register/page.tsx app/register/register-form.tsx && git commit -m "Rebuild register page as two-panel Figma replica with exported assets"
```

---

### Task 8: Run the harness green + iterate to <1%

**Files:** `app/register/page.tsx`, `app/register/register-form.tsx` (spacing/type token tweaks only — no new assets, no layout inventions).

- [ ] **Step 1: Re-run the harness against the rebuilt page**

```bash
node scripts/pixel-diff.mjs; echo "harness-exit=$?"
```

Expected first run: FAIL with a much smaller % than Task 5 (sidebar gone). Read `.superpowers/pixel-diff/result.json` for the exact percent and open `.superpowers/pixel-diff/diff.png` — bright clusters show where to fix.

- [ ] **Step 2: Fix the top diff cluster using Figma tokens (max 3 rounds)**

For each round, change ONLY the clustered region, using values from this table (no invented numbers):

| Element | Size | Class tokens |
|---|---|---|
| H1 | 36px/800 | `text-[36px] font-extrabold leading-[43.57px] tracking-[-1.08px] text-white text-center` |
| Sub | 14px/400 | `text-[14px] font-normal leading-[22.4px] text-[#DEDEE5] text-center` |
| Google btn | 474×46 | `h-[46px] w-full rounded-[99px] border border-[#9E9EA8]`, label `text-[18px] font-medium text-[#EFEFF7]` |
| Divider | 474×19 | `h-[19px] gap-[19px]`, rules `bg-[#B3B3BC]`, `or` `text-[16px] font-medium text-[#B3B3BC]` |
| Email | 474×51 | `h-[51px] rounded-2xl bg-[#1A1A23] px-4 text-[16px] font-medium tracking-[0.48px] placeholder:text-[#B3B3BC]` |
| Continue | 474×51 | `h-[51px] rounded-[89.1px] bg-[#EFEFF7] text-[18px] font-semibold text-[#07070D]` |
| Legal | 14px/600 | `text-[14px] font-semibold leading-[17px] tracking-[-0.7px] text-[#C8C8D1] text-center` |
| Footer | 16px/600 | `text-[16px] font-semibold leading-[19px] text-[#EFEFF7] text-center` |
| Right panel | 710×850 | `w-[710px] bg-[#1A1822]`, mark `h-44 w-44` (176×176) |
| Frame gaps | 48/24/16 | `gap-12` / `gap-6` / `gap-4` |

After each round, re-run `node scripts/pixel-diff.mjs` and record the percent. Stop at the first PASS (`harness-exit=0`). Residual sub-1% glyph-edge noise from Inter anti-aliasing is accepted — do not chase it past the gate.

- [ ] **Step 3: Stop the dev server, run full verification**

```bash
pkill -f "next dev" 2>/dev/null || true; npx tsc --noEmit && npm run lint && npm run build
```

Expected: `tsc` clean, `lint` clean, `build` success with `/register` prerendered static. If the build fails, fix and re-run until green.

- [ ] **Step 3b: Keyboard tab-through (spec testing requirement)**

With the dev server still running, open `http://localhost:3000/register` and press Tab repeatedly through Google → email → Continue → Terms → Privacy → Log in. Confirm every control receives visible focus and the order matches.
Expected: all 6 stops reachable with visible focus rings; no traps. If anything is unreachable, fix `tabIndex`/markup before continuing.

- [ ] **Step 4: Commit the final replica**

```bash
git add app/register/page.tsx app/register/register-form.tsx scripts/pixel-diff.mjs docs/superpowers/plans/2026-10-09-registration-pixel-diff.md && git status --short && git commit -m "Tune registration replica to <1% pixel diff"
```
