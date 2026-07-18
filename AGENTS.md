# AGENTS.md — how we work on saas-startup

Tool-agnostic guidance for every agent (and human) working in this repo — the development
process, the skills toolkit, the docs system, and the deploy runbook. **This file is the single
source of truth (SSOT) for how we work and ship.** Read it before writing code, building UI,
deploying, or making a non-trivial decision.

This is a **Next.js SaaS starter** — "launch your SaaS" — with everything wired together:
**MailKite** for auth & transactional email, **Stripe** for payments, **Postgres on Supabase +
Drizzle ORM** for data, a polished dashboard, and deployment to **Vercel**.

It is a **Turborepo monorepo**:
- **apps/web** — the SaaS product website + dashboard (Next.js 15, App Router)
- **packages/mailkite-auth** — shared auth package (JWT, OAuth, session, middleware)

---

## 0. This repo is an AI-extensible starter

Beyond the running app, this starter ships an **AI development platform** so that whoever clones
it can extend it — new features, new sections, new integrations — with an agent that already
knows the codebase:

- **Skills** in `apps/web/.claude/skills/` — one per surface/provider (see §3). They are plain
  markdown; any agent tool can read them.
- **This `AGENTS.md`** — the process below.
- **`docs/`** — the project's memory: research, feature docs, and work logs.

The whole thing runs as one loop:

```
question ─▶ docs/research/<topic>.md ─▶ human decision ─▶ docs/features/<feature>.md ─▶ build (skills) ─▶ docs/worklog/<date>.md
            (options + trade-offs)        (recorded)        (what we're building)         (code)          (what shipped)
```

## 1. Scope every change to the vertical & audience

Before touching anything, frame the work inside what this product is and who it serves. Name
**the audience** and **the one job** the change serves — and write it down (in the research or
feature doc). Then:

- Study **how the strongest products in the space solve the same thing** — Vercel, Stripe,
  Linear, Clerk, Supabase, Resend, Cal.com, Dub, Neon — and adopt the pattern that already
  tested well with this audience, then improve it.
- Prefer **the stack, UX, and patterns that win in this vertical** over generic defaults.
- **Reuse what this codebase already does** before inventing something new.

## 2. Research first — always (non-negotiable)

No build decision is made before live research is done and documented. Use the **`saas-research`
skill**, which drives this loop.

1. **Research live.** Investigate usability, market, audience, and current best practice for the
   specific thing — via web research and the leaders above, not memory or reflex.
2. **Write the options doc** in `docs/research/<topic>.md` (marketing/GTM under
   `docs/research/marketing/`): a **pros/cons list** and a **weighted list of options** with
   concrete trade-offs.
3. **Human review + decision.** A human reviews the doc and makes the choice(s).
4. **Record the decision** in the same doc — what was chosen and why. *Then* build.

Skip steps only for the genuinely trivial (a typo, a one-line copy tweak) — and even then,
prefer leaving a note in the relevant doc.

### Contract-first for non-trivial features

Before implementing any feature that introduces new functions, modules, or public interfaces:

1. **Grep for existing code** that does something similar (`grep`, `rg`, file search) and report
   what exists before writing anything new.
2. **Write a brief interface contract** (3–5 lines): what it **promises callers** (outputs,
   types), what it **requires** (inputs, preconditions), what **invariants** it holds, and which
   **existing code** it overlaps with (mandatory grep result).
3. **Then implement.** The contract survives the context window and binds future edits to scope.

This prevents the two primary agent failure modes: hallucinated interfaces and mid-task
architectural drift.

## 3. Skills — your toolkit

Skills live in **`apps/web/.claude/skills/<name>/SKILL.md`** and are auto-discovered by agents
working under `apps/web/`. Load the relevant skill *before* building on that surface — each one
carries the real file map, the copy-pasteable patterns, and the settled conventions for its area.

| Skill | Use it when you… |
|---|---|
| `saas-ui` | Build or restyle UI — shadcn (new-york) components, Tailwind v4 tokens, the brand system, motion |
| `nextjs-app` | Add a page/route, server action, route handler, or layout (App Router, RSC-first) |
| `mailkite-provider` | Touch auth, sessions, OAuth, or send transactional email (MailKite) |
| `stripe-provider` | Touch payments — checkout, subscriptions, the customer portal, webhooks |
| `supabase-provider` | Touch the database — schema, migrations, queries (Postgres on Supabase + Drizzle) |
| `saas-research` | Decide *whether/what/how* to build or position — market, competitors, pricing, GTM |
| `neon` / `neon-postgres` | Use Neon instead of Supabase as the Postgres host (drop-in alternative) |

Host-level skills are also available where relevant: `deep-research` (multi-source reports),
the `blog` suite, `domain-check`, and the `stripe:*` / `mailkite:*` operational skills + MCP
servers referenced inside the provider skills.

**Adding a skill.** New capability worth codifying → add `apps/web/.claude/skills/<name>/SKILL.md`
following the format of the existing skills (frontmatter `name`/`description`/`version`; sections
*When to use → Where it lives → How to → Conventions → Before you call it done → Related*), then
list it in the table above.

## 4. Docs mirror the code — and the code links back

**Every feature, screen, component, library, and model has a doc, and every code file links its
doc at the top.** Docs live under `docs/` (see [`docs/README.md`](docs/README.md)).

| What | Doc location | Example |
|---|---|---|
| Feature | `docs/features/<feature>.md` | `docs/features/team-invites.md` |
| Research / decision | `docs/research/<topic>.md` | `docs/research/auth-provider-choice.md` |
| Marketing / GTM | `docs/research/marketing/<topic>.md` | `docs/research/marketing/pricing.md` |
| Session log | `docs/worklog/YYYY-MM-DD-<slug>.md` | `docs/worklog/2026-07-17-stack-diagram.md` |
| Architecture (cross-cutting) | `docs/<name>.md` | `docs/AUTH.md`, `docs/DEPLOYMENT.md` |

Link the doc as a comment at the top of every code file it covers:

```tsx
// Docs: docs/features/team-invites.md
```

Keep links accurate — if you move or rename code, move/rename its doc and fix the link. Each
folder has a `README.md` and a `_TEMPLATE.md`; copy the template to start.

## 5. Plan: phases for large work, a checklist for small

- **Large task** → a **phased plan**, each phase with its own **checklist**; each phase is a
  shippable unit. Capture it in the feature doc.
- **Small task** (a fix, a UI tweak, a copy change) → **just a checklist** in the relevant doc or
  the commit body. No ceremony.

## 6. Execution loop

For each phase, in order:

1. **Implement** the next checklist item (load the relevant skill from §3 first).
2. **Check it off** in the phase checklist.
3. **Update the docs** — the feature doc and the decision record.
4. **Verify it works** — drive the actual flow, not just types. Then `npm run build` +
   `npm run lint` in the affected app must be green before moving on.
5. **Continue** to the next item.
6. **At the end of each phase:** write a `docs/worklog/` entry, commit, and (if it changed
   something deployable) push.

### Session discipline (anti-erosion)

Code quality degrades within long agent sessions. The cheapest fix is breaking trajectories:

- **One feature per session.** Start fresh between logically distinct changes.
- **Interleave refactoring sessions.** After every 2–3 feature sessions, run one whose sole job
  is reviewing and refactoring the accumulated code.
- **Commit before extending.** A commit between features gives the next session a clean baseline.
- **Compact early, not late** — around ~60% context, not at the limit.

## 7. Branching & parallel agents

- **Always work on `main`. Do not create a branch.** Multiple agents may work at once.
- It's fine to share `main` — **work is scoped per agent**, so keep changes tight to your scope
  to avoid stepping on others.

---

## 8. Coding standards — keep it minimal & maintainable

No heavy style config (no repo-wide Prettier/Biome). The bar: *the codebase stays small,
legible, and free of dead weight.*

- **TypeScript strict.** No `any` without a one-line `//` justification. Prefer precise types
  over casts; keep `tsc` green.
- **No dead code.** No unused exports, files, or deps — delete rather than comment out.
- **No tangled deps.** No circular imports or cross-component reach-arounds. Each package/app
  owns its code.
- **Small, single-purpose files.** A file does one thing; if it sprawls, split it. Favor the
  smallest change that solves the problem over a clever abstraction — match the surrounding code.
- **Every code file links its doc** (`// Docs: …`, §4) and **docs mirror the code.**
- **Lint clean.** Run `npm run lint` before "done"; don't silence a rule to pass — fix it, or
  note why in the disable comment.
- **Reuse before adding.** Check for an existing helper/lib/component before writing a new one; a
  new dependency needs a reason (§2 research applies to tooling too).
- **Search before writing any utility.** Before a formatting fn, date helper, string util,
  validation, or API client method — `grep`/`rg` first. Duplicating existing code under a new
  name is the #1 agent failure mode.

---

## 9. Secrets — never read back, prefer the vault

- **Never echo a secret into chat.** Don't `cat` a key file, `echo $SECRET`, or paste a token
  into a code block. Use secrets directly in commands where they serve their purpose (e.g.
  `curl -H "Authorization: Bearer $(cat /Volumes/secrets/...)"`), not to satisfy a confirmation
  reflex. The conversation may be logged; a bare secret in chat is a leak.
- **Prefer `/Volumes/secrets/` as the single source of truth.** When told a key lives under
  `/Volumes/secrets/`, read it from there and use it directly — don't copy it into `.env`,
  `.dev.vars`, or config unless explicitly asked.

Local dev secrets go in `apps/web/.env.local` (see `.env.example`). Production secrets live in
**Vercel** — set them with `vercel env` or the dashboard, never in a committed file.

## 10. Never mutate account state without explicit approval

- **Never change a user's plan, provider, or billing tier** without the user explicitly asking.
  Upgrading Free → Pro or toggling any account-level setting changes the billing relationship —
  ask first.
- **Never switch infrastructure configuration** (DNS, provider, deploy target) without approval —
  it can break the live site.

---

## 11. Deploying

### Web app (`apps/web`) → Vercel

The repo is linked to the Vercel project **`saas-nextjs-starter`** (root `vercel.json` sets the monorepo build:
`cd apps/web && pnpm run build`). Two ways to ship:

```bash
# Preferred: push to main — Vercel's Git integration builds & deploys automatically
git push origin main

# Manual production deploy from the repo root
vercel --prod
```

Preview deploys come free on every branch/PR. Manage env with `vercel env pull` /
`vercel env add`. (See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for the full runbook.)

### Local development

```bash
cd apps/web
npm run dev            # next dev --turbopack (port 3000)
```

### Database migrations (Drizzle)

```bash
cd apps/web
npm run db:generate    # generate a migration from schema changes
npm run db:migrate     # apply migrations to POSTGRES_URL
npm run db:seed        # seed local/dev data
```

See the `supabase-provider` skill for the full DB workflow (pooler vs direct URL, etc.).

## 12. Cloudflare DNS editing (from the agent)

When you need to create, list, or delete DNS records on Cloudflare (subdomains, email records,
etc.), use the Cloudflare REST API directly. The token lives in the vault.

```bash
CF_TOKEN=$(cat /Volumes/secrets/mailkite/cloudflare-api)      # scope: Zone·Read + DNS·Edit
ZONE_ID=$(curl -s -H "Authorization: Bearer $CF_TOKEN" \
  "https://api.cloudflare.com/client/v4/zones?name=mailkite.dev" | \
  python3 -c "import sys,json; print(json.load(sys.stdin)['result'][0]['id'])")

# List for a hostname
curl -s -H "Authorization: Bearer $CF_TOKEN" \
  "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?name=app.example.com" | python3 -m json.tool

# Create (CNAME / MX / TXT — TXT content must be double-quoted)
curl -s -X POST -H "Authorization: Bearer $CF_TOKEN" -H "Content-Type: application/json" \
  "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -d '{"type":"CNAME","name":"app","content":"cname.vercel-dns.com","ttl":1,"proxied":false}'
```

Creating a record that already exists returns 81053/81057/81058 — treat as success (idempotent).
For MailKite email DNS (MX + SPF/DKIM), the **`mailkite` skill** and MCP set records for you.

---

## 13. Deployable components

> Each component deploys independently. Deploy only what changed.

| Dir | What | Where it runs |
|---|---|---|
| `apps/web` | SaaS product website + dashboard (Next.js 15) | Vercel |
| `packages/mailkite-auth` | Shared auth package (JWT, OAuth, session, middleware) | Imported by apps — not deployed directly |

**Dependencies:** `apps/web` depends on `@mailkite/auth` (workspace). Auth-package changes
require a rebuild of the consuming app.
