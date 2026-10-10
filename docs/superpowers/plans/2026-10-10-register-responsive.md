# /register Responsive (Adaptive Coefficient) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `/register` adaptive across all screens via the Sage adaptive-coefficient system while keeping the 1440x850 desktop render bit-identical (pixel gate still PASS).

**Architecture:** One root rule `html { font-size: calc(0.6987vh + 0.6987vw); }` in `app/globals.css`; every hardcoded px in the two register files converted to exact rem (value / 16); breakpoints only hide the panel below `lg` and cap width at 1600px. No behavior, asset, or harness changes.

**Tech Stack:** Next.js 16.4 App Router, React 19, TypeScript, Tailwind CSS v4 (rem-based scale classes stay untouched), Playwright pixel-diff harness.

**Branch:** `001-user-registration` (already the isolated feature branch; work directly in the repo root, no worktree).

---

### Task 1: Root adaptive coefficient in globals.css

**Files:**
- Modify: `app/globals.css` (append after the `body` block, lines 22-26)

- [ ] **Step 1: Failing check — rule absent**

Run: `grep -n "adaptive-coefficient" app/globals.css`
Expected: exit 1, no matches (rule does not exist yet).

- [ ] **Step 2: Add the root rule**

Append exactly this to `app/globals.css`:

```css
/* Adaptive coefficient (Sage adaptive-design): X = 16px base / (14.4px per 1vw + 8.5px per 1vh
   on the 1440x850 design frame) = 0.6987. At exactly 1440x850 the root computes to 16.0002px,
   so all rem values below render identically to their px originals at desktop. */
html {
  font-size: calc(0.6987vh + 0.6987vw);
}
```

- [ ] **Step 3: Verify math and presence**

Run: `grep -n "Adaptive coefficient" app/globals.css`
Expected: match on the comment line (line 28).

Run: `node -e "console.log((0.6987 * (14.4 + 8.5)).toFixed(4))"`
Expected: `16.0002` (0.0002px over 16px — sub-pixel, invisible).

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat(register): add adaptive-coefficient root font-size"
```

---

### Task 2: page.tsx — px to rem + 1600px centered cap

**Files:**
- Modify: `app/register/page.tsx` (full current content is 78 lines; each edit below shows exact old/new strings)

- [ ] **Step 1: Failing check — px values present**

Run: `grep -c "px\]" app/register/page.tsx`
Expected: a number greater than 0 (currently 8 lines contain `px]`).

- [ ] **Step 2: Convert DecorativePanel dimensions**

Old:
```tsx
      className="hidden w-[710px] max-w-[49.3%] flex-none items-center justify-center bg-[#1A1922] lg:flex"
```
New:
```tsx
      className="hidden w-[44.375rem] max-w-[49.3%] flex-none items-center justify-center bg-[#1A1922] lg:flex"
```

Old:
```tsx
        className="h-[850px] w-[710px] max-w-none"
```
New:
```tsx
        className="h-[53.125rem] w-[44.375rem] max-w-none"
```

(Conversions: 710 / 16 = 44.375; 850 / 16 = 53.125 — both exact.)

- [ ] **Step 3: Add 1600px outer cap, convert frame**

Old:
```tsx
    <main className="flex min-h-screen w-full justify-center bg-[#07070D] text-white [color-scheme:dark]">
      <div className="flex min-h-[850px] w-full max-w-[1440px] flex-row shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
```
New:
```tsx
    <main className="flex min-h-screen w-full justify-center bg-[#07070D] text-white [color-scheme:dark]">
      <div className="flex min-h-[53.125rem] w-full max-w-[100rem] justify-center">
        <div className="flex w-full max-w-[90rem] flex-row shadow-[0_1.5625rem_5rem_rgba(0,0,0,0.55)]">
```

And close the extra div — old tail:
```tsx
        <DecorativePanel />
      </div>
    </main>
```
New tail:
```tsx
          <DecorativePanel />
        </div>
      </div>
    </main>
```

(Conversions: 850 / 16 = 53.125; 1600 / 16 = 100; 1440 / 16 = 90; 25 / 16 = 1.5625; 80 / 16 = 5. At viewports <= 1600px the outer div equals the viewport width, so rendering is identical to today; above 1600px the 90rem composition centers with page-bg gutters.)

- [ ] **Step 4: Convert section padding, logo, headings, footer**

Old: `className="flex min-w-0 flex-1 items-center justify-center px-6 py-14 sm:px-10 lg:justify-start lg:pl-[142px]"`
New: `className="flex min-w-0 flex-1 items-center justify-center px-6 py-14 sm:px-10 lg:justify-start lg:pl-[8.875rem]"`

(`px-6`, `py-14`, `sm:px-10` are Tailwind scale classes — already rem-based, keep them. 142 / 16 = 8.875 exact.)

Old: `className="h-11 w-[45px]"`
New: `className="h-11 w-[2.8125rem]"`

(`h-11` = 2.75rem = 44px exact, keep. 45 / 16 = 2.8125 exact.)

Old:
```tsx
                className="w-full text-center text-[36px] font-extrabold leading-[43.57px] tracking-[-1.08px] text-white"
```
New:
```tsx
                className="w-full text-center text-[2.25rem] font-extrabold leading-[2.7231rem] tracking-[-0.0675rem] text-white"
```

(36 / 16 = 2.25; 43.57 / 16 = 2.723125, rounded to 2.7231 — 0.0004px diff, invisible; -1.08 / 16 = -0.0675 exact.)

Old:
```tsx
                className="w-full text-center text-[14px] font-normal leading-[22.4px] text-[#DEDEE5]"
```
New:
```tsx
                className="w-full text-center text-[0.875rem] font-normal leading-[1.4rem] text-[#DEDEE5]"
```

(14 / 16 = 0.875; 22.4 / 16 = 1.4 — both exact.)

Old:
```tsx
            <p className="text-center text-[16px] font-semibold leading-[19px] text-[#EFEFF7]">
```
New:
```tsx
            <p className="text-center text-[1rem] font-semibold leading-[1.1875rem] text-[#EFEFF7]">
```

(16 / 16 = 1; 19 / 16 = 1.1875 — both exact.)

- [ ] **Step 5: Verify zero px remain and typecheck**

Run: `grep -n "px\]" app/register/page.tsx`
Expected: exit 1, no matches.

Run: `npx tsc --noEmit`
Expected: clean, no output.

- [ ] **Step 6: Commit**

```bash
git add app/register/page.tsx
git commit -m "feat(register): px-to-rem conversion and 1600px cap on page frame"
```

---

### Task 3: register-form.tsx — px to rem (behavior-identical)

**Files:**
- Modify: `app/register/register-form.tsx` (110 lines; logic untouched, class strings only)

- [ ] **Step 1: Failing check — px values present**

Run: `grep -c "px\]" app/register/register-form.tsx`
Expected: a number greater than 0 (currently 10 lines contain `px]`).

- [ ] **Step 2: Convert Google button, divider, input, error**

Old: `className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[99px] border border-[#9E9EA8] bg-transparent px-4 py-3 text-left transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"`
New: `className="flex h-[2.875rem] w-full items-center justify-center gap-2 rounded-[6.1875rem] border border-[#9E9EA8] bg-transparent px-4 py-3 text-left transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"`

(46 / 16 = 2.875; 99 / 16 = 6.1875 — exact. `gap-2`, `px-4`, `py-3` are Tailwind scale, keep.)

Old: `className="h-[22px] w-[22px] flex-none"`
New: `className="h-[1.375rem] w-[1.375rem] flex-none"`

(22 / 16 = 1.375 exact.)

Old: `<span className="text-[18px] font-medium leading-none text-[#EFEFF7]">`
New: `<span className="text-[1.125rem] font-medium leading-none text-[#EFEFF7]">`

(18 / 16 = 1.125 exact.)

Old: `<div className="flex h-[19px] w-full items-center gap-[19px]" aria-hidden="true">`
New: `<div className="flex h-[1.1875rem] w-full items-center gap-[1.1875rem]" aria-hidden="true">`

(19 / 16 = 1.1875 exact.)

Old: `<span className="h-px w-full max-w-[210px] flex-1 bg-[#B3B3BC]" />` (two occurrences — replace both)
New: `<span className="h-px w-full max-w-[13.125rem] flex-1 bg-[#B3B3BC]" />`

(210 / 16 = 13.125 exact. `h-px` is 1px by definition on all roots — keep, it is not a px-arbitrary value.)

Old: `<span className="text-[16px] font-medium leading-none text-[#B3B3BC]">`
New: `<span className="text-[1rem] font-medium leading-none text-[#B3B3BC]">`

Old:
```tsx
            className="h-[51px] w-full rounded-2xl border border-transparent bg-[#1A1A23] px-4 text-[16px] font-medium tracking-[0.48px] text-[#EFEFF7] placeholder:text-[#B3B3BC] focus:border-[#9E9EA8] focus:outline-none"
```
New:
```tsx
            className="h-[3.1875rem] w-full rounded-2xl border border-transparent bg-[#1A1A23] px-4 text-[1rem] font-medium tracking-[0.03rem] text-[#EFEFF7] placeholder:text-[#B3B3BC] focus:border-[#9E9EA8] focus:outline-none"
```

(51 / 16 = 3.1875; 0.48 / 16 = 0.03 — exact. `rounded-2xl` = 1rem scale, `px-4` scale — keep.)

Old: `<p id="register-email-error" role="alert" className="-mt-2 text-[14px] font-medium text-[#FF8A8A]">`
New: `<p id="register-email-error" role="alert" className="-mt-2 text-[0.875rem] font-medium text-[#FF8A8A]">`

(`-mt-2` is Tailwind scale, keep. 14 / 16 = 0.875 exact.)

- [ ] **Step 3: Convert Continue button and legal line**

Old:
```tsx
            className="flex h-[51px] w-full items-center justify-center rounded-[89.1px] bg-[#EFEFF7] px-[43.2px] py-[14.4px] text-center text-[18px] font-semibold leading-none text-[#07070D] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
```
New:
```tsx
            className="flex h-[3.1875rem] w-full items-center justify-center rounded-[5.5688rem] bg-[#EFEFF7] px-[2.7rem] py-[0.9rem] text-center text-[1.125rem] font-semibold leading-none text-[#07070D] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
```

(89.1 / 16 = 5.56875, rounded to 5.5688 — 0.0008px diff, invisible; 43.2 / 16 = 2.7; 14.4 / 16 = 0.9; 51 / 16 = 3.1875; 18 / 16 = 1.125 — exact.)

Old:
```tsx
        <p className="w-full text-center text-[14px] font-semibold leading-[17px] tracking-[-0.7px] text-[#C8C8D1]">
```
New:
```tsx
        <p className="w-full text-center text-[0.875rem] font-semibold leading-[1.0625rem] tracking-[-0.0438rem] text-[#C8C8D1]">
```

(17 / 16 = 1.0625 exact; -0.7 / 16 = -0.04375, rounded to -0.0438 — 0.0008px diff, invisible.)

- [ ] **Step 4: Verify zero px remain, no logic touched, typecheck**

Run: `grep -n "px\]" app/register/register-form.tsx`
Expected: exit 1, no matches.

Run: `git diff app/register/register-form.tsx | grep -E "^[-+].*(useState|handleSubmit|handleGoogle|setStatus|setEmail|console\.log)"`
Expected: exit 1, no matches (no logic lines changed).

Run: `npx tsc --noEmit`
Expected: clean, no output.

- [ ] **Step 5: Commit**

```bash
git add app/register/register-form.tsx
git commit -m "feat(register): px-to-rem conversion on register form"
```

---

### Task 4: Verification gate (desktop gate + responsive review + regression trio)

**Files:** none (read-only verification; `.superpowers/pixel-diff/` output is git-ignored)

- [ ] **Step 1: Dev server serves current tree**

Run: `curl -s http://localhost:3000/register --max-time 10 | grep -o -m1 "group-20\|Create your free account"`
Expected: `group-20` or the heading. If the port is dead or serves stale content, start `npm run dev` in the repo root and re-check before screenshotting (a stale server once produced a fake 1.773% reading).

- [ ] **Step 2: Desktop gate, run 1**

Run: `node scripts/pixel-diff.mjs`
Expected: `diff: <1% -> PASS (gate <1%)`, exit 0.

- [ ] **Step 3: Desktop gate, run 2 (one run can be luck)**

Run: `node scripts/pixel-diff.mjs`
Expected: PASS again, exit 0. If either run is >= 1%, stop and debug: first suspect a rem-rounding slip (recheck Task 2/3 conversions), then a masked region probe per the figma-pixel-replica skill — never bake offsets into screenshots.

- [ ] **Step 4: Responsive screenshots at 360x800 and 768x1024**

Run:
```bash
npx playwright screenshot --viewport-size=360,800 --wait-for-timeout=2000 http://localhost:3000/register /tmp/reg-360.png
npx playwright screenshot --viewport-size=768,1024 --wait-for-timeout=2000 http://localhost:3000/register /tmp/reg-768.png
```
Then open both PNGs and check every rule: no horizontal overflow or clipped content; side panel hidden; form column capped at 474px equivalent and centered; all text legible; Google button, input, and Continue each >= 44px tall. Record PASS/FAIL per rule; any FAIL sends back to Tasks 2-3 (layout fix, then re-run Steps 2-3).

- [ ] **Step 5: Regression trio + keyboard + audit**

Run: `npx tsc --noEmit` — Expected: clean.
Run: `npm run lint 2>&1 | tail -3` — Expected: 0 errors (the 3 `no-img-element` warnings on route files are by design).
Run: `npm run build 2>&1 | tail -6` — Expected: success, `/register` prerendered static.
Keyboard walk (DevTools or Playwright): Tab order must be Google button, email input, Continue, Terms, Privacy, Log in, then cycle — no traps.
Run: `grep -rn "<path\|<rect\|<circle" app/register/` — Expected: exit 1, no matches.
Run: `git status --short` — Expected: only intended modified files, no stray files.

- [ ] **Step 6: Report**

No commit (nothing to commit unless Step 4 found fixable FAILs, which go through Tasks 2-3 first). Report: both gate percents, responsive rule results per viewport, trio results, keyboard result, audit result, `git status --short`.
