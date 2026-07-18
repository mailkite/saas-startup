---
name: saas-research
description: The research-first process for this SaaS starter — how to research market, audience, competitors, positioning, pricing, and go-to-market BEFORE building or shipping copy, and how to record findings as an options doc a human decides on. Use before any non-trivial build decision, dependency, feature, or marketing/positioning move. Triggers: "research", "competitors", "market", "positioning", "should we build", "pricing", "marketing", "promotion", "launch", "go-to-market", "landing page strategy".
version: 1.0.0
author: saas-startup
tags:
  - research
  - market
  - positioning
  - pricing
  - marketing
  - go-to-market
---

# saas-research — research the space before you build it

Research first, build second. Any non-trivial change — a feature, a dependency, a pricing tier, a landing-page rewrite, a launch — starts by studying the market and the strongest products in the space *live*, then writing an options doc a human decides on. This skill is the entry point for "should we build/position it this way?"

## When to use

- Deciding whether (and how) to build a feature, add a dependency, or adopt a pattern.
- Any positioning, messaging, pricing, or packaging question.
- Planning a launch or promotion, or rewriting a landing page for conversion.
- Any moment you're about to reach for memory ("I think Stripe does X") instead of checking.

Skip only for the genuinely trivial (a typo, a one-line copy tweak). Even then, prefer a note in the relevant doc.

## The research-first loop

Non-negotiable. No build decision is made before this is done and written down.

1. **Scope to the vertical/audience.** Name the audience and the *one job* the change serves, in one sentence. If you can't, you're not ready to research. Write it at the top of the doc.
2. **Research live.** Investigate market, audience, and current best practice with web search — and by studying how the strongest products in the space solve the same thing. Never from memory. Reference set below.
3. **Write the options doc.** In `docs/research/<topic>.md`: a pros/cons list and a **weighted list of options** with concrete trade-offs. No recommendation without alternatives.
4. **Human review → record the decision.** A human picks; you record *what* was chosen and *why* back in the same doc. **Then** build.

**Done looks like:** a doc under `docs/research/` with a named audience+job, live/linked sources (not memory), a weighted options list, and a recorded decision with rationale. Only after the decision is logged does implementation start (the options doc gates the feature doc — see below).

## How to research a build decision

**Scope.** One line: *audience → the one job*. Example: "Solo founders shipping their first SaaS → sign in without standing up their own auth."

**Research live, against the reference set.** This starter lives next to the best dev-tools/SaaS products — study how they solve the same job, adopt what already tested well with this audience, then improve it:

> **Vercel, Stripe, Linear, Clerk, Supabase, Resend, Cal.com, Dub, Railway, Neon** — plus whatever competitors are specific to the feature.

For each relevant product, pull the *live* page (pricing, docs, the actual UI/flow) with `WebFetch`, and search for how the pattern plays out in practice with `WebSearch`. Prefer the stack, UX, and patterns that win in this vertical over generic defaults. Grep our own codebase first — reuse what's already decided before inventing.

**Options doc.** Lay out 2–4 real options, each with pros/cons and a weight/score against what matters (fit for the audience+job, effort, lock-in, cost, how well it fits the dark-first Vercel/Linear/Stripe/Clerk/Supabase look). State trade-offs concretely — "adds a $X/mo dependency" beats "some cost."

**Decision.** Human reviews, picks, and the choice + rationale go back in the same doc. That doc is now the source of truth the feature doc builds on.

## How to research marketing & promotion

Same loop, marketing surface. Each of these ends in a doc under `docs/research/marketing/`:

- **Positioning & messaging.** Who it's for, the one job, the promise, the primary differentiator, the words the audience actually uses. Study how the reference set frames the same job on their home/hero. → `docs/research/marketing/positioning.md`
- **Competitor teardown.** Pick the 3–5 closest competitors. Pull their live pricing, hero, onboarding, and docs. Capture positioning, price, target user, strengths, gaps we can win. Use the teardown template below. → `docs/research/marketing/teardown-<competitor>.md`
- **SEO / keyword angles.** What the audience searches, intent behind it, which terms are winnable, and the content/landing angles that map to them. → `docs/research/marketing/seo-keywords.md`
- **Launch channels.** Where this audience actually is and how each channel expects to be approached: Product Hunt, Hacker News, Reddit, dev.to, X/LinkedIn. Note timing, format, and rules per channel. → `docs/research/marketing/launch-plan.md`
- **Pricing & packaging.** Tiers, anchors, free/trial shape, what competitors gate vs give away, willingness-to-pay signals from live pricing pages. → `docs/research/marketing/pricing.md`
- **Landing-page conversion.** Above-the-fold pattern, social proof, CTA hierarchy, objection handling — sourced from what converts in this vertical, not taste. → `docs/research/marketing/landing-conversion.md`

Every one ends the same way: pros/cons, weighted options, a recorded decision. Positioning research feeds copy; copy feeds the landing page.

## Where findings live

| What | Where | Notes |
| --- | --- | --- |
| Build / options research | `docs/research/<topic>.md` | pros/cons + weighted options |
| Marketing / promotion research | `docs/research/marketing/<topic>.md` | positioning, teardown, SEO, launch, pricing, conversion |
| The decision | recorded in the **same** doc | what was chosen + why; dated |
| The feature that results | `docs/features/<feature>.md` | gated by the options doc's decision |
| The session | `docs/worklog/` | log what you researched and decided |

## Tooling

- **`WebSearch` / `WebFetch`** — the default. Search for current best practice; fetch the actual live competitor pages (pricing, docs, flows). This is how you avoid researching from memory.
- **`deep-research` skill** — for a multi-source, adversarially fact-checked, cited report when a decision is high-stakes or contested. Use it to *feed* the options doc; the options doc and decision still live here.
- **`blog` skill suite** — once positioning/keywords are decided, hand off to blog skills (strategy, brief, write) to produce the content. Research decides the angle; blog executes it.
- **`domain-check` skill** — when naming a product/feature or picking a launch domain, bulk-check availability before you commit copy to a name.

Keep this skill the front door: even when a decision leans on `deep-research` or feeds `blog`, the "should we build/position it this way?" call and its rationale get recorded here first.

## Templates

Options doc skeleton:

```markdown
# <Topic> — research & decision

**Audience → job:** <who> → <the one job this serves>
**Date:** <YYYY-MM-DD>  ·  **Status:** researching | decided

## Context
Why this is on the table; what we already do (grep results / existing docs).

## Research (live)
- <finding> — <source URL>
- How the reference set solves it: <Vercel/Stripe/Linear/... > — <URL>

## Options
### Option A — <name>
Pros: … Cons: … Weight: <score/notes on fit, effort, cost, lock-in>
### Option B — <name>
Pros: … Cons: … Weight: …

## Decision
Chosen: <option>. Rationale: <why, against the audience+job>. Decided by: <human>.
```

Competitor teardown skeleton:

```markdown
# Teardown — <Competitor>

**URL:** <link>  ·  **Date pulled:** <YYYY-MM-DD>

- **Positioning / hero promise:** …
- **Target user:** …
- **Pricing / packaging:** <tiers, anchors, free shape>
- **Onboarding / first-run:** <what the first 5 min feel like>
- **Strengths:** …
- **Gaps we can win:** …
- **What to borrow (and improve):** …
```

## Before you call it done

- [ ] The doc names the audience and the one job in a single line.
- [ ] Sources are **live and linked** — actual pages fetched/searched, not recalled from memory.
- [ ] The strongest products in the space were studied for this specific job.
- [ ] Options doc has pros/cons **and** a weighted list of options with concrete trade-offs.
- [ ] A decision is recorded in the same doc, with rationale and who decided.
- [ ] Marketing research landed under `docs/research/marketing/`; build research under `docs/research/`.

## Related

- `saas-ui` — the dark-first shadcn/Tailwind system any UI a decision produces must fit.
- `nextjs-app` — where a built feature mounts (routing, RSC/client boundaries).
- `mailkite-provider` — auth/email surfaces; research auth/email/onboarding decisions here first.
- `stripe-provider` — billing; pricing/packaging research gates the tiers you wire up.
- `supabase-provider` — the data model a feature decision implies.

Research precedes building: the options doc in `docs/research/` gates the feature doc in `docs/features/`. Log research sessions in `docs/worklog/`. See the root `AGENTS.md` §Research-first.
