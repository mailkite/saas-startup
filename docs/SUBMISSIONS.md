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
| [ ] | [bytefer/awesome-nextjs](https://github.com/bytefer/awesome-nextjs) | PR to README | 68★ — low reach, but trivial |
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
| [ ] | [Peerlist](https://peerlist.io) | Project | Probe blocked (403) — check manually |
| [ ] | [Uneed](https://www.uneed.best/submit-a-tool) | Submit form | Real submit URL is `/submit-a-tool` (bare `/submit` 404s). Free tier exists alongside paid boosts; free submit is OK |

## Tier 3 — Template directories

| ✓ | Place | How | Notes |
|---|-------|-----|-------|
| [ ] | [HTMLrev](https://htmlrev.com/free-nextjs-templates.html) | Submit form | Free-only, curated, has a Next.js category. ⚠️ refused connection from our network — verify manually |
| [-] | [Tailkits](https://tailkits.com/submit-product/) | ~~Submit~~ **paid placement** | Verified reachable but it is a **paid** marketplace — promotion tiers $29–$499. Not free → flag for human; don't auto-submit |
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

### Research notes (auto-run 2026-08-07 17:17 UTC)

Corroborates the 13:17 run's saturation call and probes the Tier-2/Tier-3 paths
it flagged. **No external PR or email this run** (caps untouched) — the only
changes are two verified Tier-2/Tier-3 corrections (Uneed URL, Tailkits = paid,
both applied above). Findings:

- **Rejected — platform-specific:** `Alchemyst-ai/awesome-saas` (421★, MIT,
  pushed today) has a tempting "Community Templates" section, but CONTRIBUTING.md
  restricts it to "templates/projects built using the **Alchemyst AI Platform**".
  Our starter isn't → off-topic. Skipped.
- **Rejected — SaaS-product lists, not boilerplates:** `LlamaGenAI/awesome-free-saas`
  (333★) and `georgezouq/awesome-saas` (54★) categorize free SaaS *products*, not
  starter kits. No section fits.
- **Rejected — stale / wrong stack:** `2-fly-4-ai/awesome-shadcnui` (555★, last
  push 2025-06) and `re50urces/Awesome-NextJs` (114★, 2024-06) stale; the rest of
  the `awesome-shadcn*` variants are Svelte-specific or <20★.
- **Dedupe clean:** `mailkite/saas-startup` appears only in our own repos + the
  already-LIVE `bytefer/awesome-shadcn-ui` row. No unlogged listing to back-fill.
- **No (b) email venue** surfaced again; nudging open-PR merges is spammy → none sent.

Next runs: same guidance — Tier-2 launches (HN/PH/dev.to) and Tier-3 forms are the
remaining high-signal moves, all human-timed manual posts.

## Assets for any submission

- **Repo**: <https://github.com/mailkite/saas-startup> (public, MIT)
- **Demo**: <https://saas-startup.mailkite.dev>
- **One-liner**: Production-ready Next.js 15 SaaS starter — self-contained auth (Google/GitHub OAuth + email/password, no auth vendor), Stripe subscriptions, teams, Postgres/Drizzle, dark-first UI.
- **Why it's different**: auth runs in your app, not a hosted service. No Clerk/Auth0/Supabase account needed — clone, add your own OAuth app, ship.
- **Social preview**: `apps/web/app/opengraph-image.png` (1200×630)
