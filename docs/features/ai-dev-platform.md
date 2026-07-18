# Feature: AI development platform

> One sentence: this starter clones with agent **skills**, an `AGENTS.md` process, and a `docs/`
> memory, so anyone can extend it — new features, sections, integrations — with an AI agent that
> already knows the codebase. The homepage sells this.

- **Status:** shipped
- **Owner:** Gabe
- **Research:** — (product decision; the process itself is documented in `AGENTS.md`)
- **Skills used:** `saas-ui`, `nextjs-app`

## The job it serves

A developer clones this starter to launch a SaaS fast. The differentiator over a plain template:
they can point an AI agent at it and get **on-stack** extensions — code that fits the existing
MailKite / Stripe / Supabase / shadcn / Next.js conventions instead of generic boilerplate. This
feature is both the capability (the skills + process) and its marketing (a homepage section).

## Surfaces & files

| Surface | File(s) | Notes |
|---|---|---|
| Homepage section | `apps/web/components/BuildWithAI.tsx` | Skills grid + build loop + CTA to `AGENTS.md` |
| Homepage wiring | `apps/web/app/(dashboard)/page.tsx` | Rendered after the hero; hero eyebrow reads "AI-extensible" |
| The skills | `apps/web/.claude/skills/{saas-ui,nextjs-app,mailkite-provider,stripe-provider,supabase-provider,saas-research}/SKILL.md` | One per surface/provider |
| The process | `AGENTS.md` | SSOT: scope → research → docs → build → log |
| The memory | `docs/` (`features/`, `research/`, `worklog/`) | READMEs + `_TEMPLATE.md` in each |

## Behavior

- The section lists the six shipped skills (each with its real slug, e.g. `/saas-ui`) and the
  four-step build loop (research → decide → build → log) mirrored from `AGENTS.md`.
- CTA links to `AGENTS.md` on GitHub.
- Static server component; no client JS. Inherits the dark-first brand system and
  `prefers-reduced-motion` safety from the design tokens.

## Decisions

- **Skills live in `apps/web/.claude/skills/`** (not repo root) — consistent with the existing
  `neon` skills and directory-scoped to where all buildable code is.
- **A dedicated section, not a hero rewrite** — the hero already carries the animated stack
  diagram; the eyebrow gained "AI-extensible" as the only hero change.
- **Six skills** — one UI, one framework, three providers, one research — matching the stack the
  starter wires together.

## Open questions / follow-ups

- [ ] Consider a `/docs` page walking through the AGENTS.md loop for cloners.
- [ ] Mirror skills to `.agents/skills/` if a non-Claude agent tool needs them.
