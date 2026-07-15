# AGENTS.md — how we work on saas-startup

Tool-agnostic guidance for every agent (and human) working in this repo — the
development process, coding standards, and deploy runbook. **This file is the single
source of truth (SSOT) for how we work and deploy.** Read it before writing code,
deploying, or making a non-trivial decision.

This is a **Turborepo monorepo** containing:
- **apps/web** — SaaS product website (Next.js 15 + OpenNext → Cloudflare Workers)
- **packages/mailkite-auth** — Shared auth package (JWT, OAuth, session, middleware)

Auth is fully separated into its own package so both apps import it cleanly.

---

## 1. Research first — always

No build decision is made before live research is done and documented.

1. **Research live.** Investigate usability, market, audience, and current best practice for
   the specific thing — using web research and the leaders in the vertical, not memory or reflex.
2. **Write the options doc.** Produce a **pros/cons list** and a **weighted list of options**
   in a doc under `docs/`. State trade-offs concretely.
3. **Human review + decision.** A human reviews the doc and makes the choice(s).
4. **Record the decision.** Update the doc with what was chosen and why. *Then* build.

Skip steps only for the genuinely trivial (a typo, a one-line copy tweak) — and even then,
prefer leaving a note in the relevant doc.

### Contract-first for non-trivial features

Before implementing any feature that introduces new functions, modules, or public interfaces:

1. **Grep for existing code** that does something similar. Search the codebase
   (`grep`, `rg`, file search) and report what exists before writing anything new.
2. **Write a brief interface contract** (3–5 lines) stating:
   - What the function/module **promises to callers** (outputs, return types)
   - What it **requires from dependencies** (inputs, preconditions)
   - What **invariants** it maintains
   - Which **existing code** it might overlap with (mandatory grep result)
3. **Then implement.** The contract survives the context window and binds future edits to
   declared scope.

## 2. Plan: phases for large work, a checklist for small

- **Large task** → a **phased plan**, each phase with its own **checklist**. Each phase is
  a shippable unit.
- **Small task** (a fix, a UI tweak, a copy change) → **just a checklist** in the relevant
  doc or the commit body. No ceremony.

## 3. Docs mirror the code — and the code links back

**Every feature, screen, component, library, and model has a doc, and every code file links
its doc at the top.** Docs live under `docs/` and **mirror the codebase / route structure**.

| What | Doc location | Example |
|---|---|---|
| Feature / architecture | `docs/architecture/<feature>.md` | `docs/architecture/auth.md` |
| Screen / route | `docs/<surface>/<route>.md` | `docs/web/pricing.md` |
| Component | `docs/<surface>/components/<name>.md` | `docs/web/components/pricing-card.md` |
| Library / util | `docs/<surface>/lib/<name>.md` | `docs/web/lib/db.md` |

Link the doc as a comment at the top of every code file it covers:

```tsx
// Docs: docs/web/pricing.md
```

## 4. Execution loop

For each phase, in order:

1. **Implement** the next checklist item.
2. **Check it off** in the phase checklist.
3. **Update the doc** (the screen/component/feature doc and the decision record).
4. **Build & lint clean** — `npm run build` + `npm run lint` in the affected app. Don't
   leave coding for done until it's green.
5. **Continue** to the next item.
6. **Push at the end of each phase.**

### Session discipline

- **One feature per session.** Start a fresh session between logically distinct changes.
- **Interleave refactoring sessions.** After every 2–3 feature sessions, review and
  refactor the accumulated code.
- **Commit before extending.** A git commit between features gives the next session a clean
  baseline and enables `git diff`-based quality comparison.
- **Compact early, not late.** If compacting, do it at ~60% context capacity, not at the limit.

## 5. Branching & parallel agents

- **Always work on `main`. Do not create a branch.** Multiple agents work at the same time.
- It's fine to share `main` — **work is scoped per agent** so parallel work has minimal
  overlap. Keep your changes tight to your scope to avoid stepping on others.

---

## 6. Coding standards

Keep it minimal and maintainable. No heavy style config (no repo-wide Prettier/Biome).
The bar: *the codebase stays small, legible, and free of dead weight.*

- **TypeScript strict.** No `any` without a one-line `//`-comment justifying it. Prefer
  precise types over casts; keep `tsc` green.
- **No dead code.** No unused exports, files, or deps. Delete rather than comment-out.
  Dead code is the opposite of maintainable.
- **No tangled deps.** No circular imports or cross-component reach-arounds. Each package
  and app owns its code.
- **Small, single-purpose files.** A file does one thing; if it sprawls, split it. Favor
  the smallest change that solves the problem over a clever abstraction.
- **Every code file links its doc** (`// Docs: …`, see §3) and **docs mirror the code.**
- **Lint clean.** Run `npm run lint` (ESLint) before calling it done. Don't silence a rule
  to pass — fix it, or note why in the disable comment.
- **Reuse before adding.** Check for an existing helper/lib before writing a new one;
  a new dependency needs a reason.
- **Search before writing any utility.** Before writing a formatting function, date helper,
  string util, or validation logic — `grep` or `rg` the codebase first. If an existing
  implementation exists, use it. This prevents the #1 AI agent failure mode: silently
  duplicating existing code under a new name.

---

## 7. Secrets — never read back, prefer the vault

- **Never echo a secret into chat.** Don't `cat` a key file, don't `echo $SECRET`, don't
  paste a token or password into a code block. Use secrets directly in commands where they
  serve their purpose (e.g. `curl -H "Authorization: Bearer $(cat /Volumes/secrets/...)"`),
  not to satisfy a confirmation reflex.
- **Prefer `/Volumes/secrets/` as the single source of truth.** When the user tells you a
  key is at a path under `/Volumes/secrets/`, read it from there and use it directly — don't
  copy it into `.env`, `.dev.vars`, or any config file unless the user explicitly asks you to.

---

## 8. Cloudflare DNS editing (from the agent)

When you need to create, list, or delete DNS records on Cloudflare (for subdomains,
Worker routes, email records, etc.), use the Cloudflare REST API directly. The token
lives in the vault.

### Prerequisites

```bash
CF_TOKEN=$(cat /Volumes/secrets/mailkite/cloudflare-api)
```

Token scope: `Zone · Zone · Read` (all zones) + `Zone · DNS · Edit`.

### Resolve the zone ID

```bash
ZONE_ID=$(curl -s -H "Authorization: Bearer $CF_TOKEN" \
  "https://api.cloudflare.com/client/v4/zones?name=mailkite.dev" | \
  python3 -c "import sys,json; print(json.load(sys.stdin)['result'][0]['id'])")
```

### List existing records

```bash
# All records for a subdomain
curl -s -H "Authorization: Bearer $CF_TOKEN" \
  "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?name=saas-startup.mailkite.dev" | \
  python3 -m json.tool

# All records in the zone (large output)
curl -s -H "Authorization: Bearer $CF_TOKEN" \
  "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" | \
  python3 -m json.tool
```

### Create a record

```bash
# CNAME (e.g. for a subdomain pointing to the zone)
curl -s -X POST -H "Authorization: Bearer $CF_TOKEN" -H "Content-Type: application/json" \
  "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -d '{"type":"CNAME","name":"saas-startup","content":"mailkite.dev","ttl":1,"proxied":true}'

# MX (e.g. for email receiving)
curl -s -X POST -H "Authorization: Bearer $CF_TOKEN" -H "Content-Type: application/json" \
  "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -d '{"type":"MX","name":"example.com","content":"mx.mailkite.dev","priority":10,"ttl":300}'

# TXT (e.g. SPF, DKIM, DMARC — TXT content must be double-quoted)
curl -s -X POST -H "Authorization: Bearer $CF_TOKEN" -H "Content-Type: application/json" \
  "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -d '{"type":"TXT","name":"example.com","content":"\"v=spf1 include:mailkite.dev ~all\"","ttl":300}'
```

### Delete a record

```bash
# First find the record ID from the list output, then:
curl -s -X DELETE -H "Authorization: Bearer $CF_TOKEN" \
  "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/<record_id>"
```

### Idempotency

Creating a record that already exists returns error codes 81053/81057/81058 — treat these
as success (idempotent). The Cloudflare dashboard shows warnings for unquoted TXT content;
always wrap TXT values in double quotes.

### Troubleshooting

If DNS doesn't resolve after creating a record:
1. Check the record exists: `curl ... /dns_records?name=<hostname>`
2. Check the Worker route exists: `wrangler deployments` (or check the dashboard)
3. Propagation can take 1–60 seconds for proxied records, longer for non-proxied

---

## 9. Deploying

### Web app (`apps/web`) → Cloudflare Workers

```bash
cd apps/web
npm run deploy          # opennextjs-cloudflare build && deploy
```

This builds the Next.js app with OpenNext, bundles it for Cloudflare Workers, and deploys.
The Worker name and route are configured in `apps/web/wrangler.jsonc`.

**Prerequisites:**
- `wrangler login` (OAuth — stored at `~/.Library/Preferences/.wrangler/config/default.toml`)
- R2 bucket `saas-startup-opennext-cache` exists (for incremental cache)
- DNS record created for the hostname (see §8)
- CF Worker secrets set (see §10)

### Setting CF Worker secrets

```bash
cd apps/web
echo "value" | wrangler secret put AUTH_SECRET
echo "value" | wrangler secret put STRIPE_SECRET_KEY
echo "value" | wrangler secret put STRIPE_WEBHOOK_SECRET
```

Or use the vault:

```bash
echo "$(cat /Volumes/secrets/mailkite/cloudflare-api)" | wrangler secret put CF_API_TOKEN
```

List configured secrets:

```bash
wrangler secret list
```

### Building without deploying

```bash
cd apps/web
npm run build:cf        # opennextjs-cloudflare build only (no deploy)
```

### Local development

```bash
cd apps/web
npm run dev             # next dev --turbopack (port 3000)
```

---

## 10. Never mutate account state without approval

- **Never change a user's plan, provider, or billing tier** without the user explicitly asking.
- **Never switch infrastructure configuration** without approval. Changing a domain's DNS,
  provider, or deployment target can break the live site. Ask first.

---

## 11. Deployable components

> Each component deploys independently. Deploy only what changed.

| Dir | What | Where it runs |
|---|---|---|
| `apps/web` | SaaS product website (Next.js 15 + OpenNext) | Cloudflare Workers → `saas-startup.mailkite.dev` |
| `packages/mailkite-auth` | Shared auth package (JWT, OAuth, session, middleware) | Imported by apps — not deployed directly |

**Dependencies:** `apps/web` depends on `@mailkite/auth` (workspace). Auth package changes
require a rebuild of the consuming app.
