# Feature: <name>

> One sentence: what this feature lets a user do, and for whom.

- **Status:** draft | building | shipped
- **Owner:** <who>
- **Research:** [`../research/<topic>.md`](../research/<topic>.md) — the decision this came from
- **Skills used:** e.g. `nextjs-app`, `saas-ui`, `stripe-provider`

## The job it serves

Who is this for and what job does it do? (Keep it to the one job — see `AGENTS.md` §Scope.)

## Surfaces & files

| Surface | File(s) | Notes |
|---|---|---|
| Route / page | `app/…/page.tsx` | |
| Server action / API | `app/…/actions.ts` or `app/api/…/route.ts` | |
| UI component | `components/…` | |
| Data | `lib/db/schema.ts`, `lib/db/queries.ts` | |
| Provider wiring | `lib/mailkite-auth/…`, `lib/payments/…`, `lib/db/…` | |

Every file above links back here with `// Docs: docs/features/<name>.md`.

## Behavior

- Happy path:
- Empty / loading / error states:
- Permissions / gating:

## Decisions

- <decision> — because <why>. (Link the research doc for the full trade-off.)

## Open questions / follow-ups

- [ ]
