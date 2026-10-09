<!-- Sync Impact Report
Version change: 0.0.0 (template, unratified) → 1.0.0
Modified principles: [PRINCIPLE_1..5 placeholders] → I. shadcn-First UI, II. Spec-Completion Commits, III. Clarify-Don't-Assume, IV. Subagent Delegation, V. Orchestrator Main Agent (all new)
Added sections: Technology & Component Standards; Agent Workflow & Delivery Discipline; Governance rules concretized
Removed sections: none (template placeholders replaced)
Follow-up TODOs: none — all placeholders resolved
-->

# vocalmorph-test Constitution

## Core Principles

### I. shadcn-First UI Composition

MUST use the shadcn library for all unstyled / primitive component needs so component logic works out of the gate. MUST NOT build custom primitives (button, dialog, dropdown, form field, etc.) when a shadcn equivalent exists. Custom styling and composition on top of shadcn is allowed; replacing shadcn internals with hand-rolled logic is forbidden without explicit justification recorded in the plan.

Rationale: shadcn gives tested accessibility, keyboard handling, and composability by default, eliminating a whole class of UI logic bugs and keeping velocity high in this Next.js + React 19 + Tailwind codebase.

### II. Spec-Completion Commits

MUST commit changes whenever a new spec is done and implemented. Each completed spec (specify → clarify → plan → tasks → implement cycle) ends with a reviewable commit on the working branch before starting the next spec. MUST NOT batch multiple specs into one commit or leave implemented specs uncommitted.

Rationale: one-spec-per-commit keeps history bisectable, makes reviews map 1:1 to intent, and guarantees no completed work is lost to context switches.

### III. Clarify-Don't-Assume (NON-NEGOTIABLE)

MUST NOT assume intent when requirements are ambiguous, underspecified, or admit multiple reasonable interpretations. MUST ask clarifying questions via the opencode question tool before proceeding. Questions MUST be asked whenever there is material uncertainty about scope, behavior, UX, data shape, or acceptance criteria; proceeding on a guess is a violation.

Rationale: wrong assumptions are the most expensive defect — clarification is cheap, rework is not. The question tool forces explicit user decisions into the record.

### IV. Subagent Delegation & Context Preservation

MUST prefer task-specific subagents whenever work can be delegated, to protect the main agent context window. Independent research, exploration, implementation, and verification work MUST be dispatched to the most specific capable subagent type (e.g. explore for codebase searches, coder-agent for implementation) rather than executed inline when parallelism or context savings apply.

Rationale: the main context is the scarcest resource; subagents isolate noise, enable parallel progress, and keep the orchestrator's plan coherent.

### V. Orchestrator Main Agent

The main agent MUST act primarily as the orchestrator of work, not the implementer. It plans, decomposes, delegates to subagents, integrates results, and verifies outcomes. Direct implementation by the main agent is allowed only for trivial glue (single-file edits, final wiring) where delegation overhead exceeds benefit — and MUST be justified in context.

Rationale: orchestration scales; hero-implementer mains bottleneck, bloat context, and defeat the delegation model in Principle IV.

## Technology & Component Standards

Stack: Next.js 16.4 (App Router), React 19, TypeScript 5, Tailwind CSS 4, ESLint (next config). All UI primitives MUST come from shadcn (Principle I); Tailwind tokens and `next/font` conventions from the scaffold MUST be preserved. Before writing App Router code, MUST consult the version-pinned guide in `node_modules/next/dist/docs/` per `AGENTS.md`, since APIs differ from training data. No new UI dependency that duplicates shadcn primitives without plan-level justification.

## Agent Workflow & Delivery Discipline

Workflow: clarify via question tool (Principle III) → plan → delegate to specific subagents (Principle IV) under main-agent orchestration (Principle V) → verify by execution (build/lint/tests where applicable) → commit per completed spec (Principle II). Every spec implementation MUST end verified and committed; unverified claims of completion are forbidden. `.specify/extensions.yml` git hooks (commit prompts before/after each Spec Kit phase) MUST be honored.

## Governance

This constitution supersedes all other practices, agent defaults, and skill guidance where they conflict; user instructions in `AGENTS.md` and direct user requests take precedence over it. Amendments require: (a) documentation of the change and rationale, (b) semantic version bump per policy below, (c) update of `Last Amended` date. Versioning policy: MAJOR — backward-incompatible governance removals or principle redefinitions; MINOR — new principle/section added or materially expanded guidance; PATCH — clarifications, wording, typo fixes. All reviews and PRs MUST verify constitution compliance; any principle violation MUST be explicitly justified or the work MUST be reworked.

**Version**: 1.0.0 | **Ratified**: 2026-10-09 | **Last Amended**: 2026-10-09
