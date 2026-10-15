# Submission checklist

Where to list this template. Tick a box only once the listing is **live** (not just
submitted) — put the submission date and PR/post URL in Notes so we can chase what stalls.

**Status key:** `[ ]` todo · `[~]` submitted, awaiting review · `[x]` live · `[-]` rejected/closed

The template must stay: MIT licensed, public, with a working live demo
(<https://saas-startup.mailkite.dev>) and a Deploy button.

> **GitHub is the source of truth, not this log.** Before opening any PR, run
> `gh pr list -R <owner/repo> --state all --author bucabay` — humans open PRs in sessions that
> no log records. The log below is reconciled to GitHub as of 2026-08-09 (12 bucabay PRs verified).

---

## Submission log

Every submission actually made, with its links. Fill in **Listing URL** once the PR merges
or the post goes live. Newest first (by PR open date). All entries verified against GitHub.

| Date | Venue (website) | Submission URL (PR/post) | Listing URL (when live) | Status |
|------|-----------------|--------------------------|-------------------------|--------|
| 2026-08-08 | [mahdibrr/awesome-nextjs-supabase](https://github.com/mahdibrr/awesome-nextjs-supabase) | [PR #24](https://github.com/mahdibrr/awesome-nextjs-supabase/pull/24) | _pending merge_ | `[~]` submitted (exact stack fit) |
| 2026-08-08 | [brandonhimpfen/awesome-saas](https://github.com/brandonhimpfen/awesome-saas) | [PR #46](https://github.com/brandonhimpfen/awesome-saas/pull/46) | — | `[-]` rejected/closed (maturity/adoption bar — not an AI-PR ban) |
| 2026-08-05 | [y-h-v-h/shadverse](https://github.com/y-h-v-h/shadverse) | [PR #3](https://github.com/y-h-v-h/shadverse/pull/3) | _pending merge_ | `[~]` submitted (found via dedupe 2026-08-09, was unlogged) |
| 2026-08-03 | [officialrajdeepsingh/awesome-nextjs](https://github.com/officialrajdeepsingh/awesome-nextjs) | [PR #88](https://github.com/officialrajdeepsingh/awesome-nextjs/pull/88) | _pending merge_ | `[~]` submitted (CONTRIBUTING prefers ≥100★) |
| 2026-08-01 | [lyqht/awesome-supabase](https://github.com/lyqht/awesome-supabase) | [PR #62](https://github.com/lyqht/awesome-supabase/pull/62) | _pending merge_ | `[~]` submitted (Community Starters) |
| 2026-07-31 | [bytefer/awesome-nextjs](https://github.com/bytefer/awesome-nextjs) | [PR #23](https://github.com/bytefer/awesome-nextjs/pull/23) | _pending merge_ | `[~]` submitted (SaaS section) |
| 2026-07-31 | [semlinker/awesome-typescript](https://github.com/semlinker/awesome-typescript) | [PR #177](https://github.com/semlinker/awesome-typescript/pull/177) | _pending merge_ | `[~]` submitted (TypeScript Starters/Boilerplates) |
| 2026-07-29 | [EinGuterWaran/awesome-opensource-boilerplates](https://github.com/EinGuterWaran/awesome-opensource-boilerplates) | [PR #52](https://github.com/EinGuterWaran/awesome-opensource-boilerplates/pull/52) | _pending merge_ | `[~]` submitted (found via dedupe 2026-08-09, was unlogged; `### React & Next.js`) |
| 2026-07-29 | [bytefer/awesome-shadcn-ui](https://github.com/bytefer/awesome-shadcn-ui) | [PR #29](https://github.com/bytefer/awesome-shadcn-ui/pull/29) (merged) | [Saas table](https://github.com/bytefer/awesome-shadcn-ui) | `[x]` **live** (only confirmed listing) |
| 2026-07-29 | [xcomptek/awesome-saas-boilerplates](https://github.com/xcomptek/awesome-saas-boilerplates) | [PR #222](https://github.com/xcomptek/awesome-saas-boilerplates/pull/222) | _pending merge_ | `[~]` submitted (Next.js section) |
| 2026-07-17 | [birobirobiro/awesome-shadcn-ui](https://github.com/birobirobiro/awesome-shadcn-ui) | [PR #554](https://github.com/birobirobiro/awesome-shadcn-ui/pull/554) | _pending merge_ | `[~]` submitted (Boilerplates / Templates) |
| 2026-07-17 | [unicodeveloper/awesome-nextjs](https://github.com/unicodeveloper/awesome-nextjs) | [PR #536](https://github.com/unicodeveloper/awesome-nextjs/pull/536) | _pending merge_ | `[~]` submitted (Boilerplates) |

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
| [x] | [bytefer/awesome-shadcn-ui](https://github.com/bytefer/awesome-shadcn-ui) | PR to README | 725★. **Merged 2026-07-29** → [PR #29](https://github.com/bytefer/awesome-shadcn-ui/pull/29) (Saas table). **LIVE.** Our only confirmed listing |
| [~] | [bytefer/awesome-nextjs](https://github.com/bytefer/awesome-nextjs) | PR to README | ~70★, low reach but trivial. **Submitted 2026-07-31** → [PR #23](https://github.com/bytefer/awesome-nextjs/pull/23) (SaaS section), awaiting review |
| [~] | [xcomptek/awesome-saas-boilerplates](https://github.com/xcomptek/awesome-saas-boilerplates) | PR to README | 3.1k★. **Submitted 2026-07-29** → [PR #222](https://github.com/xcomptek/awesome-saas-boilerplates/pull/222) (Next.js section), awaiting review |
| [~] | [officialrajdeepsingh/awesome-nextjs](https://github.com/officialrajdeepsingh/awesome-nextjs) | PR to README | 707★. **Submitted 2026-08-03** → [PR #88](https://github.com/officialrajdeepsingh/awesome-nextjs/pull/88) (boilerplate section), awaiting review. CONTRIBUTING prefers ≥100★ |
| [~] | [lyqht/awesome-supabase](https://github.com/lyqht/awesome-supabase) | PR to README | 479★. **Submitted 2026-08-01** → [PR #62](https://github.com/lyqht/awesome-supabase/pull/62) (Community Starters), awaiting review. Fits — starter supports Supabase Postgres |
| [~] | [mahdibrr/awesome-nextjs-supabase](https://github.com/mahdibrr/awesome-nextjs-supabase) | PR to README | 5★ but **exact stack match** (Next.js + Supabase + Stripe + Auth). **Submitted 2026-08-08** → [PR #24](https://github.com/mahdibrr/awesome-nextjs-supabase/pull/24) (`### SaaS Architecture and Open-Source Examples`) |
| [~] | [semlinker/awesome-typescript](https://github.com/semlinker/awesome-typescript) | PR to README | 4.0k★, inclusive list. **Submitted 2026-07-31** → [PR #177](https://github.com/semlinker/awesome-typescript/pull/177) (`## TypeScript Starters/Boilerplates`) |
| [~] | [EinGuterWaran/awesome-opensource-boilerplates](https://github.com/EinGuterWaran/awesome-opensource-boilerplates) | PR to README | 1.9k★. **Submitted 2026-07-29** → [PR #52](https://github.com/EinGuterWaran/awesome-opensource-boilerplates/pull/52) (`### React & Next.js`), awaiting review. Exact category fit (free open-source SaaS boilerplates). Found via dedupe 2026-08-09 (was unlogged) |
| [~] | [y-h-v-h/shadverse](https://github.com/y-h-v-h/shadverse) | PR to `data/projects.ts` | 28★. Collection of projects built with shadcn/ui (our dashboard is shadcn/ui). **Submitted 2026-08-05** → [PR #3](https://github.com/y-h-v-h/shadverse/pull/3), awaiting review. Found via dedupe 2026-08-09 (was unlogged) |
| [-] | [brandonhimpfen/awesome-saas](https://github.com/brandonhimpfen/awesome-saas) | ~~PR~~ **rejected** | 7★. **PR #46 closed 2026-08-08** — maintainer: "does not meet acceptance criteria… maturity, adoption". Editorial maturity bar, **not** an AI-PR ban (CONTRIBUTING has none). Resubmit once the repo has real ★/adoption. → Do **not** submit to any brandonhimpfen list meanwhile (`awesome-stripe`, `awesome-postgresql`, `awesome-tailwindcss`) |
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
| [ ] | [Peerlist](https://peerlist.io) | Project | Probe 403 — submit via browser, can't auto-verify |
| [ ] | [Uneed](https://uneed.best/submit-a-tool) | Submit | **Verified reachable** — real URL is `/submit-a-tool` (the old `/submit` & `/submit-product` 404) |

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

A periodic cron researches new venues and appends them here. Rules for anything it adds:

1. **Git-PR venues first** — no forms, no accounts, no fees.
2. **Verify before listing**: repo not archived, pushed within ~6 months, and actually
   merging outside PRs. A dead awesome-list is not a venue. (GitHub's repo "updated" date is
   metadata/star activity — **trust the push/commit date**.)
3. **Free only.** Paid placements need a human decision — flag, don't add.
4. **No duplicates** — check the tables above first, and **dedupe against GitHub** before any PR.
5. Record `★`, last-pushed date, and the evidence that it accepts submissions.

### Researched 2026-08-09 (run ~17:17 UTC) — log reconciliation; no new venue acted

**Why this run shipped no new PR/email:** every strong-fit git-PR venue is already acted-on.
**Two unlogged bucabay PRs were found via the mandatory dedupe check and logged this run** (not
re-PR'd — fleet rule 2026-08-03):
- `EinGuterWaran/awesome-opensource-boilerplates` (1.9k★, active, exact category fit) → **OPEN [PR #52](https://github.com/EinGuterWaran/awesome-opensource-boilerplates/pull/52)** (2026-07-29, `### React & Next.js`). Was unlogged.
- `y-h-v-h/shadverse` (28★, active, projects-built-with-shadcn list) → **OPEN [PR #3](https://github.com/y-h-v-h/shadverse/pull/3)** (2026-08-05, `data/projects.ts`). Was unlogged.

**Log reconciliation (the real win this run):** `main`'s log had fallen behind GitHub reality
(prior auto-run PRs were never merged to `main`). Re-verified all of bucabay's awesome-list PRs
on GitHub and wrote them into the log/Tier 1 above — **12 PRs total: 1 LIVE merge
(bytefer/awesome-shadcn-ui #29), 1 rejected (brandonhimpfen #46), 10 OPEN/pending**. Also lifted
the dedupe rule to the top of the doc.

**New skips — verified this run, do NOT re-research (reason):**
- `getaclue00/awesome-saas-starters` (16★) — **dead**: last commit **2021-01-16**; **5 open PRs sitting unmerged** (one since 2024-06); PR #1 closed. Maintainer does not merge outside PRs. (Search "updatedAt" 2026-06 is metadata, not code.)
- `sorrycc/awesome-javascript` (35k★, active, merges outside PRs) — **no boilerplate/starter section**; every section is a JS library/tool category. Same fit failure as enaqx/awesome-react & dhamaniasad/awesome-postgres.
- `brillout/awesome-react-components` (48k★, pushed 2026-01) — React **components & libraries**, not starters/boilerplates. Doesn't fit.
- `shadcn-examples/shadcn-examples` (466★, pushed 2026-04) — **examples/components** (copy-paste UI snippets), not full apps/starters; **zero merged outside PRs** (maintainer-curated). Fails both fit + the "merges outside PRs" check.
- `pg-tr/awesome-postgres` (200★, pushed 2024-06 ~26mo stale) — fork of dhamaniasad, stale.
- `devton/awesome-postgresql` (85★, active) — tools/scripts/slides, **no starter section**.
- `victorocna/awesome-react-starter` (20★, active) — the author's **own starter kit**, not a curation list. Not a venue.
- `lazylagom/awesome-nextjs15-*` & `awesome-turborepo-boilerplate` — all 0★, abandoned competitor boilerplates, not lists.
- `creotip/awesome-trpc` (9★, pushed 2024-02) — stale; we don't use tRPC anyway.
- `maileroo/awesome-transactional-emailing` (1★, 2025-06) — lists **services by pricing**, not starters.
- "awesome-fullstack" lists (newlinedotco, kevindeasis) — learning-resource lists, not starter directories; stale.

**Flagged for human (do not auto-act):**
- `madewithshadcn.com` (HTTP 200) — JS SPA; curl returns no HTML, no source repo found, **can't verify a public submit process**. Inspect in a browser.
- `openalternative.co` (`/submit` → 307 → "Sign In") — **login-gated**; an open-source-*alternatives*-to-commercial-products directory (self-hostable software). A starter *template* is a borderline/non-fit — same shape as open-saas-directory. Manual, human decision.
- `starter.dev` (thisdot/starter.dev, HTTP 200) — curated, hand-picked boilerplate set; CONTRIBUTING is for the repo's own code, not external boilerplate submissions. Manual/human.
- `boilerplatehub.com` (HTTP 200) — "Best SaaS Boilerplates" gallery, but links back to `EinGuterWaran/awesome-opensource-boilerplates` (already PR'd #52). No independent submit path found.

### Standing skips — verified across prior + this run, do NOT re-research

- `petermekhaeil/awesome-turborepo` (12★) — last push 2024-12-21 (~20mo stale).
- `korfuri/awesome-monorepo` (5.8k★) — last push 2024-08; "Notable public monorepos" is company-scale, no starter fit.
- `dhamaniasad/awesome-postgres` (12k★, active) — **no starter/templates section** (every section is a Postgres tool category).
- `giovannism20/awesome-supabase` (41★, active) — **no starters/templates section**; `lyqht/awesome-supabase` is the better fit (already PR'd).
- `dzharii/awesome-typescript` — **archived**.
- `georgezouq/awesome-saas` (54★, active) — **no boilerplate/starter section** (SaaS *product* categories).
- `open-saas-directory/awesome-saas-directory` (113★) — actually "Open-Source SaaS **Alternatives**"; a starter is only borderline → flag for human.
- `2-fly-4-ai/awesome-shadcnui` (555★) — last push 2025-06 (>1yr stale).
- `re50urces/Awesome-NextJs` (114★) — last push 2024-06 (>2yr stale).
- `matthiasfeist/awesome-drizzle` (3★) — only a "Packages" section, no starters.
- `tyaga001/awesome-saas-boilerplates-and-starter-kits` (26★) — last push 2024-11, inactive.
- `brandonhimpfen/awesome-tailwindcss` (6★) — zero merged PRs ever; negligible reach.
- `brandonhimpfen/awesome-stripe` / `awesome-postgresql` — **BLOCKED** (same maintainer that rejected PR #46 to awesome-saas on 2026-08-08). Do not submit to any brandonhimpfen list until the repo has real ★/adoption.
- `Correia-jpv/fucking-awesome-nextjs` & `fucking-awesome-tailwindcss` — mirrors of already-PR'd originals.

## Assets for any submission

- **Repo**: <https://github.com/mailkite/saas-startup> (public, MIT)
- **Demo**: <https://saas-startup.mailkite.dev>
- **One-liner**: Production-ready Next.js 15 SaaS starter — self-contained auth (Google/GitHub OAuth + email/password, no auth vendor), Stripe subscriptions, teams, Postgres/Drizzle, dark-first UI.
- **Why it's different**: auth runs in your app, not a hosted service. No Clerk/Auth0/Supabase account needed — clone, add your own OAuth app, ship.
- **Social preview**: `apps/web/app/opengraph-image.png` (1200×630)
