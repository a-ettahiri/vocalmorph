# Feature Specification: User Registration Page

**Feature Branch**: `001-user-registration`

**Created**: 2026-10-09

**Status**: Draft

**Input**: User description: "i want to create a user registration page using this figma screen https://www.figma.com/design/EqW1vze2r9eFrdUdi8ajzp/SAAS-app?node-id=500-1077&t=AxQDVdFaFkLp18j6-11"

**Figma source**: SAAS-app file `EqW1vze2r9eFrdUdi8ajzp`, node `500-1077` ("Registration Page", 1440x850). Left form panel + right decorative media panel. Verified via rendered PNG.

**Decisions locked during brainstorming**: Frontend UI only (no auth backend); new `/register` route, keep `/` as-is; right panel recreated decoratively to match Figma; Approach A (pure Tailwind, no new deps) with constitution exception noted.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View registration page matching Figma (Priority: P1)

A new visitor navigates to `/register` and sees the two-panel registration screen matching the Figma design: logo, "Create your free account" heading, product subtext, Google button, divider, email field, Continue button, Terms/Privacy line, and Log in link on the left; dark decorative panel with faint media mark on the right.

**Why this priority**: This is the core deliverable — visual parity with the approved design. Without it there is no feature.

**Independent Test**: Navigate to `/register` on desktop and compare side-by-side with the Figma PNG. Page is viable on its own even if buttons are stubs.

**Acceptance Scenarios**:

1. **Given** a visitor on desktop (1440px wide), **When** they open `/register`, **Then** they see the heading "Create your free account", subtext about iconic voices, "Continue with Google", "or" divider, "Enter email address" field, "Continue" button, Terms/Privacy line, and "Already have an account? Log in".
2. **Given** a visitor on desktop, **When** they view the right half, **Then** they see a dark panel distinct from the form panel with a subtle centered media mark, matching Figma proportions (~710px of 1440px).

---

### User Story 2 - Enter email and see validation feedback (Priority: P2)

A visitor types an email address and clicks Continue. Since this release is UI-only, the page validates the format client-side (HTML5 + visible focus/error state) and gives stub feedback without creating an account.

**Why this priority**: Prevents a dead-feeling form; proves the form is wired correctly for a future backend.

**Independent Test**: Type valid/invalid/empty emails and click Continue; observe validation and stub console feedback independently of Google login.

**Acceptance Scenarios**:

1. **Given** an empty email field, **When** the visitor clicks Continue, **Then** the browser blocks submission and indicates the field is required.
2. **Given** text that is not an email (e.g. "abc"), **When** the visitor clicks Continue, **Then** an invalid-email indication appears and no stub success fires.
3. **Given** a valid email (e.g. "user@example.com"), **When** the visitor clicks Continue, **Then** a stub handler fires (e.g. console log) and the page does not navigate away or crash.

---

### User Story 3 - Choose alternate paths: Google, Terms, Log in (Priority: P3)

A visitor who prefers Google signup, wants to read legal text, or already has an account can use the Google button, Terms/Privacy links, and Log in link. In this UI-only release these are clearly visible stubs.

**Why this priority**: Completes the Figma surface; real OAuth/legal/login destinations are out of scope but affordances must exist.

**Independent Test**: Click each of Google button, Terms of Service, Privacy Policy, Log in; each gives visible stub feedback and does not break the page.

**Acceptance Scenarios**:

1. **Given** the registration page, **When** the visitor clicks "Continue with Google", **Then** a stub handler fires (no navigation to a broken page).
2. **Given** the registration page, **When** the visitor clicks "Terms of Service", "Privacy Policy", or "Log in", **Then** each link is keyboard-focusable, visible on hover/focus, and does not lead to a 404 in this release (placeholder `#` targets allowed).

---

### Edge Cases

- What happens on narrow screens (375px)? Right decorative panel collapses/hides; form stacks full-width with no horizontal scroll.
- How does the page handle keyboard-only use? All interactive elements reachable by Tab in logical order (Google → email → Continue → legal links → Log in) with visible focus.
- What happens with dark/light OS preference? Page stays dark per Figma (does not flip to light theme unexpectedly).
- What happens when images/SVG fail? Layout holds; text content remains readable without logo/media marks.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render a `/register` route that reproduces the Figma Registration Page layout: left form column and right decorative panel on desktop.
- **FR-002**: System MUST display the brand logo mark centered above the heading on the form panel.
- **FR-003**: System MUST display the heading "Create your free account" and the subtext "Access the world's most iconic voices in studio quality, The industry standard for high-fidelity celebrity voice clones."
- **FR-004**: System MUST provide a "Continue with Google" button showing the Google "G" mark.
- **FR-005**: System MUST render an "or" divider with horizontal rules on both sides between the Google button and the email field.
- **FR-006**: System MUST provide an email input with label (accessible) and placeholder "Enter email address", type email, required.
- **FR-007**: System MUST provide a "Continue" submit button that triggers client-side email validation and a stub handler (no account creation in this release).
- **FR-008**: System MUST display the legal line "By continuing, you agree to the app Terms of Service and Privacy Policy." with Terms of Service and Privacy Policy as distinct links.
- **FR-009**: System MUST display "Already have an account? Log in" with "Log in" as a distinct link.
- **FR-010**: System MUST hide/collapse the right decorative panel on viewports below the large breakpoint so the form is fully usable at 375px with no horizontal scrolling.
- **FR-011**: System MUST keep the page visually dark per Figma regardless of OS color-scheme preference.
- **FR-012**: System MUST make all controls keyboard-operable with visible focus states and sufficient text contrast on dark backgrounds.
- **FR-013**: System MUST NOT require any backend, database, or OAuth secret in this release; button/link handlers MUST be stubs that do not crash.

### Key Entities

- **RegistrationForm**: Visitor-supplied email string; validation state (empty/invalid/valid); no persistence in this release.
- **StubAuthAction**: Records which entry point was chosen (google | email-continue); used only for stub feedback, no identity created.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: New visitors reach the registration UI at `/register` in under 2 seconds on a standard broadband connection (visual render, not backend).
- **SC-002**: 9 out of 10 reviewers recognize the page as matching the Figma screenshot on first glance (heading, button order, divider, legal line, two-panel split).
- **SC-003**: 100% of invalid/empty email submissions show a validation indication before any stub success fires.
- **SC-004**: Page is fully usable at 375px width with zero horizontal scrolling and all form controls reachable.
- **SC-005**: 100% of interactive elements (Google, email, Continue, Terms, Privacy, Log in) are keyboard-reachable with visible focus during manual tab-through.

## Assumptions

- UI-only release: no Supabase/NextAuth/Clerk integration, no password or magic-link step; backend wiring is a future spec.
- Route `/register` is new; existing `/` homepage stays unchanged.
- Right-panel media is decorative; recreating the faint play-like mark with CSS/SVG is acceptable — no licensed image needed.
- Legal/login links may point to `#` placeholders in this release.
- Target is modern desktop + mobile browsers with JavaScript enabled; Internet connectivity assumed for page load only.
- Constitution exception: Approach A uses pure Tailwind (no shadcn install) because no primitive logic is needed for a static UI-only page; shadcn adoption deferred to the real-auth follow-up. Stack stays Next.js 16.4 App Router + React 19 + Tailwind 4; implementer MUST consult `node_modules/next/dist/docs/` per AGENTS.md before writing App Router code.
