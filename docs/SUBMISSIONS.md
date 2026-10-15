# Submission checklist

Where to list this template. Tick a box only once the listing is **live** (not just
submitted) — put the submission date and PR/post URL in Notes so we can chase what stalls.

**Status key:** `[ ]` todo · `[~]` submitted, awaiting review · `[x]` live · `[-]` rejected/closed

The template must stay: MIT licensed, public, with a working live demo
(<https://saas-startup.mailkite.dev>) and a Deploy button.

---

## Submission log

Every submission actually made, with its links. Fill in **Listing URL** once the PR merges
or the post goes live. Newest first.

| Date | Venue (website) | Submission URL (PR/post) | Listing URL (when live) | Status |
|------|-----------------|--------------------------|-------------------------|--------|
| 2026-08-08 | [mahdibrr/awesome-nextjs-supabase](https://github.com/mahdibrr/awesome-nextjs-supabase) | [PR #24](https://github.com/mahdibrr/awesome-nextjs-supabase/pull/24) | _pending merge_ | `[~]` submitted (exact stack fit) |
| 2026-08-08 | [semlinker/awesome-typescript](https://github.com/semlinker/awesome-typescript) | [PR #177](https://github.com/semlinker/awesome-typescript/pull/177) | _pending merge_ | `[~]` submitted (found via dedupe; opened 2026-07-31, was unlogged) |
| 2026-08-08 | [brandonhimpfen/awesome-saas](https://github.com/brandonhimpfen/awesome-saas) | [PR #46](https://github.com/brandonhimpfen/awesome-saas/pull/46) | — | `[-]` rejected/closed (maturity/adoption criteria) |
| 2026-08-03 | [officialrajdeepsingh/awesome-nextjs](https://github.com/officialrajdeepsingh/awesome-nextjs) | [PR #88](https://github.com/officialrajdeepsingh/awesome-nextjs/pull/88) | _pending merge_ | `[~]` submitted (found via dedupe) |
| 2026-08-01 | [lyqht/awesome-supabase](https://github.com/lyqht/awesome-supabase) | [PR #62](https://github.com/lyqht/awesome-supabase/pull/62) | _pending merge_ | `[~]` submitted (found via dedupe) |
| 2026-07-31 | [bytefer/awesome-nextjs](https://github.com/bytefer/awesome-nextjs) | [PR #23](https://github.com/bytefer/awesome-nextjs/pull/23) | _pending merge_ | `[~]` submitted (found via dedupe) |
| 2026-07-29 | [bytefer/awesome-shadcn-ui](https://github.com/bytefer/awesome-shadcn-ui) | [PR #29](https://github.com/bytefer/awesome-shadcn-ui/pull/29) (merged) | _merged_ | `[x]` live (found via dedupe) |
| 2026-07-29 | [xcomptek/awesome-saas-boilerplates](https://github.com/xcomptek/awesome-saas-boilerplates) | [PR #222](https://github.com/xcomptek/awesome-saas-boilerplates/pull/222) | _pending merge_ | `[~]` submitted (found via dedupe) |
| 2026-07-17 | [awesome-shadcn-ui](https://github.com/birobirobiro/awesome-shadcn-ui) | [PR #554](https://github.com/birobirobiro/awesome-shadcn-ui/pull/554) | _pending merge_ | `[~]` submitted |
| 2026-07-17 | [awesome-nextjs](https://github.com/unicodeveloper/awesome-nextjs) | [PR #536](https://github.com/unicodeveloper/awesome-nextjs/pull/536) | _pending merge_ | `[~]` submitted |

---

## Tier 1 — Git PR (easiest, highest signal)

Merge a PR, get listed. No account, no forms, no fees.

| ✓ | Place | How | Notes |
|---|-------|-----|-------|
| [ ] | [vercel/examples](https://github.com/vercel/examples) | PR — `pnpm new-example` | **Not a one-line entry** — the example must live inside their monorepo, MIT, and Next.js examples must use `@vercel/examples-ui` styling. Its front-matter feeds vercel.com/templates, which is **closed for new submissions** (see Tier 3), so a merge may not surface as a template yet. Needs a human decision on approach before investing |
| [~] | [unicodeveloper/awesome-nextjs](https://github.com/unicodeveloper/awesome-nextjs) | PR to README | 11.1k★. **Submitted 2026-07-17** → [PR #536](https://github.com/unicodeveloper/awesome-nextjs/pull/536), awaiting review. Added to `## Boilerplates` |
| [-] | [aniftyco/awesome-tailwindcss](https://github.com/aniftyco/awesome-tailwindcss) | ~~PR~~ **hand-submit only** | 15.1k★. CONTRIBUTING.md **bans AI-authored/assisted PRs** — closed on sight, submitter may be banned. Gabe must add it by hand (📁 "Full templates" entry, `UI libraries, components & templates` section) |
| [-] | [enaqx/awesome-react](https://github.com/enaqx/awesome-react) | — | 74k★, but **no section fits** a full SaaS boilerplate. Skipped to avoid a rejected PR |
| [~] | [birobirobiro/awesome-shadcn-ui](https://github.com/birobirobiro/awesome-shadcn-ui) | PR to README | 20.1k★. **Submitted 2026-07-17** → [PR #554](https://github.com/birobirobiro/awesome-shadcn-ui/pull/554), awaiting review. Added to `## Boilerplates / Templates` |
| [~] | [bytefer/awesome-nextjs](https://github.com/bytefer/awesome-nextjs) | PR to README | 71★. **Submitted 2026-07-31** → [PR #23](https://github.com/bytefer/awesome-nextjs/pull/23) (SaaS section), awaiting review. Found via dedupe 2026-08-08 |
| [x] | [bytefer/awesome-shadcn-ui](https://github.com/bytefer/awesome-shadcn-ui) | PR to README | 725★. **Merged 2026-07-29** → [PR #29](https://github.com/bytefer/awesome-shadcn-ui/pull/29) (Saas table). **LIVE.** Found via dedupe 2026-08-08 |
| [~] | [xcomptek/awesome-saas-boilerplates](https://github.com/xcomptek/awesome-saas-boilerplates) | PR to README | 3.1k★. **Submitted 2026-07-29** → [PR #222](https://github.com/xcomptek/awesome-saas-boilerplates/pull/222) (Next.js section), awaiting review. Found via dedupe |
| [~] | [officialrajdeepsingh/awesome-nextjs](https://github.com/officialrajdeepsingh/awesome-nextjs) | PR to README | 707★. **Submitted 2026-08-03** → [PR #88](https://github.com/officialrajdeepsingh/awesome-nextjs/pull/88) (boilerplate section), awaiting review. CONTRIBUTING prefers ≥100★. Found via dedupe |
| [~] | [lyqht/awesome-supabase](https://github.com/lyqht/awesome-supabase) | PR to README | 479★. **Submitted 2026-08-01** → [PR #62](https://github.com/lyqht/awesome-supabase/pull/62) (Community Starters), awaiting review. Fits — starter supports Supabase Postgres. Found via dedupe |
| [-] | [brandonhimpfen/awesome-saas](https://github.com/brandonhimpfen/awesome-saas) | ~~PR~~ **rejected** | 7★. **PR #46 closed/rejected 2026-08-08** — maintainer: "does not meet acceptance criteria… maturity, adoption, maintenance". This is an editorial **maturity bar, not an AI-PR ban** (CONTRIBUTING has none). Resubmit once the repo has real ★/adoption |
| [~] | [mahdibrr/awesome-nextjs-supabase](https://github.com/mahdibrr/awesome-nextjs-supabase) | PR to README | 5★ but **exact stack match** (Next.js + Supabase + Stripe + Auth). **Submitted 2026-08-08** → [PR #24](https://github.com/mahdibrr/awesome-nextjs-supabase/pull/24) (`### SaaS Architecture and Open-Source Examples`, alongside makerkit/KolbySisk starters). CONTRIBUTING explicitly solicits "Maintained SaaS starter kits"; bar = operational value, not stardom |
| [~] | [semlinker/awesome-typescript](https://github.com/semlinker/awesome-typescript) | PR to README | 4.0k★, inclusive list. **Submitted 2026-07-31** → [PR #177](https://github.com/semlinker/awesome-typescript/pull/177) (`## TypeScript Starters/Boilerplates`). Found via dedupe 2026-08-08 (was unlogged) |
| [ ] | GitHub topics | repo settings | ✅ **done** — `nextjs`, `nextjs15`, `saas-starter`, `saas-boilerplate`, `template`, … |

## Tier 2 — Launch platforms (one-shot traffic spikes)

Sequence these; don't burn them all at once. Product Hunt is worth preparing properly.

| ✓ | Place | How | Notes |
|---|-------|-----|-------|
| [ ] | [Hacker News](https://news.ycombinator.com/submit) | `Show HN:` post | Highest-quality dev audience. Verified reachable. Post Tue–Thu, ~9am ET |
| [ ] | [Product Hunt](https://www.producthunt.com/posts/new) | Launch | Biggest single spike. Needs gallery + tagline. Launch 12:01am PT |
| [ ] | [Indie Hackers](https://www.indiehackers.com/new-product) | Product + post | Verified reachable |
| [ ] | [dev.to](https://dev.to/new) | Article | Write the build story (self-contained auth), not an ad |
| [ ] | [Fazier](https://fazier.com/submit) | Submit | Verified reachable |
| [ ] | [MicroLaunch](https://microlaunch.net/submit) | Submit | Verified reachable |
| [ ] | [Peerlist](https://peerlist.io) | Project | Probe 403 (still blocked 2026-08-08) — submit via browser, can't auto-verify |
| [ ] | [Uneed](https://uneed.best/submit-a-tool) | Submit | **Verified reachable** — real submit URL is `/submit-a-tool` (the old `/submit` & `/submit-product` 404; homepage links the real path) |

## Tier 3 — Template directories

| ✓ | Place | How | Notes |
|---|-------|-----|-------|
| [ ] | [HTMLrev](https://htmlrev.com/free-nextjs-templates.html) | Submit form | Free-only, curated, has a Next.js category. ⚠️ refused connection from our network — verify manually |
| [ ] | [Tailkits](https://tailkits.com/submit-product/) | Submit | Verified reachable. Pricing unstated — check it's free before submitting |
| [-] | [Vercel Templates](https://vercel.com/templates) | — | **CLOSED.** Vercel staff (Amy Egan), 2026-06-10: "We're not taking new templates at the moment", no timeline. `/templates/submit` is dead. Use vercel/examples instead |

## Tier 4 — Communities (read each one's self-promo rules first)

A post that reads as an ad gets removed and can burn the account.

| ✓ | Place | How | Notes |
|---|-------|-----|-------|
| [ ] | [r/nextjs](https://www.reddit.com/r/nextjs/) | Post | Check rules — most subs gate self-promo on karma/tenure |
| [ ] | [r/SideProject](https://www.reddit.com/r/SideProject/) | Post | More promo-tolerant |
| [ ] | [r/webdev](https://www.reddit.com/r/webdev/) | Post | Showoff Saturday thread only |
| [ ] | [r/opensource](https://www.reddit.com/r/opensource/) | Post | Angle: MIT, no vendor lock-in |
| [ ] | Next.js Discord | `#showcase` | |
| [ ] | Reactiflux Discord | showcase | |

---

## Backlog → 100

A daily cron researches new venues and appends them here. Rules for anything it adds:

1. **Git-PR venues first** — no forms, no accounts, no fees.
2. **Verify before listing**: repo not archived, pushed within ~6 months, and actually
   merging outside PRs. A dead awesome-list is not a venue.
3. **Free only.** Paid placements need a human decision — flag, don't add.
4. **No duplicates** — check the tables above first.
5. Record `★`, last-pushed date, and the evidence that it accepts submissions.

### Researched 2026-08-08 (run ~17:17 UTC) — acted / skipped

**Acted this run:**
- `mahdibrr/awesome-nextjs-supabase` (5★, very active) → [PR #24](https://github.com/mahdibrr/awesome-nextjs-supabase/pull/24) in **SaaS Architecture and Open-Source Examples**. Exact stack match (Next.js + Supabase + Stripe + auth); CONTRIBUTING explicitly solicits "Maintained SaaS starter kits". Bar = operational value, not stardom.
- `semlinker/awesome-typescript` (4.0k★, active, inclusive) → **found unlogged [PR #177](https://github.com/semlinker/awesome-typescript/pull/177)** (opened 2026-07-31 by bucabay) via the mandatory dedupe check. Did **not** re-PR; logged it instead (fleet rule).

**brandonhimpfen rejection fallout:** PR #46 to awesome-saas was **closed/rejected** (2026-08-08) — maintainer: "does not meet acceptance criteria… maturity, adoption". This is an editorial maturity bar, **not** an AI-PR ban (CONTRIBUTING bans no such thing). → `brandonhimpfen/awesome-stripe` (same maintainer) is now **BLOCKED** for the same reason: do not submit to any brandonhimpfen list until the repo has real ★/adoption.

**New skips — verified, do NOT re-research:**
- `petermekhaeil/awesome-turborepo` (12★) — last push 2024-12-21 (~20mo stale). Fails 6-month rule. (NB: GitHub's repo "updated" date is metadata/star activity, not code — trust the commit date.)
- `korfuri/awesome-monorepo` (5.8k★) — last push 2024-08-16 (~24mo stale); `## Notable public monorepos` is for company-scale monorepos, no starter fit. Skip.
- `dhamaniasad/awesome-postgres` (12k★, active, merges outside PRs) — **no starter/templates section**; every section is a Postgres *tool* category (HA, Backups, GUI, Extensions…). Doesn't fit.
- `giovannism20/awesome-supabase` (41★, active, merges outside PRs) — **no starters/templates section** (SDKs/Postgrest/Realtime/GoTrue/UI/Tools-and-Extensions). A full SaaS boilerplate doesn't fit "Tools and Extensions"; already PR'd the better-fit `lyqht/awesome-supabase`. Skip.
- `dzharii/awesome-typescript` — **archived**. Skip.
- `brandonhimpfen/awesome-postgresql` — same maintainer that just rejected us. Skip.
- Sweep of `awesome-boilerplate`, `awesome-starter-kits`, `awesome-authentication`, `saas-boilerplate-directory` — all results stale (last push ≤ 2025-04) or tiny/niche/off-topic. No viable new venue.

### Researched 2026-08-08 (earlier run) — acted / future / skipped

**Acted that run:** `brandonhimpfen/awesome-saas` → PR #46 (now **rejected**, see fallout above).

**Future git-PR candidate — BLOCKED (brandonhimpfen fallout):**
- `brandonhimpfen/awesome-stripe` — has a "starter kits" section and our starter uses Stripe, **BUT** PR #46 to awesome-saas (same maintainer) was rejected 2026-08-08 on maturity/adoption grounds. Do **not** submit to any brandonhimpfen list until the repo has real ★/adoption.

**Skipped — verified, do NOT re-research (reason):**
- `georgezouq/awesome-saas` (54★, active) — **no boilerplate/starter section**; every section is a SaaS *product* category. Doesn't fit.
- `open-saas-directory/awesome-saas-directory` (113★, active) — actually "Open-Source SaaS **Alternatives**" (self-hostable products: Supabase, Strapi, Ghost…). A starter *template* is only a borderline fit (cf. LastSaaS under Backend & Infra) → **flag for human**, not auto-PR'd.
- `2-fly-4-ai/awesome-shadcnui` (555★) — last push 2025-06 (>1yr stale). Fails 6-month rule.
- `re50urces/Awesome-NextJs` (114★) — last push 2024-06 (>2yr stale). Fails 6-month rule.
- `matthiasfeist/awesome-drizzle` (3★) — last push 2025-11; only a "Packages" section, no starters. Skip.
- `tyaga001/awesome-saas-boilerplates-and-starter-kits` (26★) — last push 2024-11 (~9mo stale), inactive. Skip.
- `brandonhimpfen/awesome-tailwindcss` (6★) — zero merged PRs ever; negligible reach. Skip.
- `Correia-jpv/fucking-awesome-nextjs` & `fucking-awesome-tailwindcss` — mirrors of already-PR'd originals (unicodeveloper/awesome-nextjs, aniftyco/awesome-tailwindcss). Skip.

## Assets for any submission

- **Repo**: <https://github.com/mailkite/saas-startup> (public, MIT)
- **Demo**: <https://saas-startup.mailkite.dev>
- **One-liner**: Production-ready Next.js 15 SaaS starter — self-contained auth (Google/GitHub OAuth + email/password, no auth vendor), Stripe subscriptions, teams, Postgres/Drizzle, dark-first UI.
- **Why it's different**: auth runs in your app, not a hosted service. No Clerk/Auth0/Supabase account needed — clone, add your own OAuth app, ship.
- **Social preview**: `apps/web/app/opengraph-image.png` (1200×630)
