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
| 2026-08-03 | [awesome-nextjs (officialrajdeepsingh)](https://github.com/officialrajdeepsingh/awesome-nextjs) | [PR #88](https://github.com/officialrajdeepsingh/awesome-nextjs/pull/88) | _pending merge_ | `[~]` submitted |
| 2026-07-31 | [awesome-nextjs (bytefer)](https://github.com/bytefer/awesome-nextjs) | [PR #23](https://github.com/bytefer/awesome-nextjs/pull/23) | _pending merge_ | `[~]` submitted |
| 2026-07-29 | [awesome-saas-boilerplates](https://github.com/xcomptek/awesome-saas-boilerplates) | [PR #222](https://github.com/xcomptek/awesome-saas-boilerplates/pull/222) | _pending merge_ | `[~]` submitted |
| 2026-07-29 | [awesome-shadcn-ui (bytefer)](https://github.com/bytefer/awesome-shadcn-ui) | [PR #29](https://github.com/bytefer/awesome-shadcn-ui/pull/29) | [LIVE — SaaS table](https://github.com/bytefer/awesome-shadcn-ui#saas) | `[x]` live |
| 2026-07-29 | [awesome-opensource-boilerplates](https://github.com/EinGuterWaran/awesome-opensource-boilerplates) | [PR #52](https://github.com/EinGuterWaran/awesome-opensource-boilerplates/pull/52) | _pending merge_ | `[~]` submitted |
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
| [~] | [bytefer/awesome-nextjs](https://github.com/bytefer/awesome-nextjs) | PR to README | 71★. **Submitted 2026-07-31** → [PR #23](https://github.com/bytefer/awesome-nextjs/pull/23), awaiting merge. Added to `## SaaS` |
| [x] | [bytefer/awesome-shadcn-ui](https://github.com/bytefer/awesome-shadcn-ui) | PR to README | 723★. **LIVE 2026-07-29** 🎉 → [PR #29](https://github.com/bytefer/awesome-shadcn-ui/pull/29) merged; entry in the **SaaS** table. **First confirmed live listing.** |
| [~] | [xcomptek/awesome-saas-boilerplates](https://github.com/xcomptek/awesome-saas-boilerplates) | PR to README | 3.1k★ — **highest-signal SaaS list.** Submitted 2026-07-29 → [PR #222](https://github.com/xcomptek/awesome-saas-boilerplates/pull/222), awaiting merge. Added to `## Next.js` |
| [~] | [EinGuterWaran/awesome-opensource-boilerplates](https://github.com/EinGuterWaran/awesome-opensource-boilerplates) | PR to README | 1.9k★ — "production-ready, free SaaS boilerplates". Submitted 2026-07-29 → [PR #52](https://github.com/EinGuterWaran/awesome-opensource-boilerplates/pull/52), awaiting merge (maintainer merges slowly) |
| [~] | [officialrajdeepsingh/awesome-nextjs](https://github.com/officialrajdeepsingh/awesome-nextjs) | PR to README | 707★. Submitted 2026-08-03 → [PR #88](https://github.com/officialrajdeepsingh/awesome-nextjs/pull/88), awaiting merge. Added to Next.js boilerplate section |
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
| [ ] | [Uneed](https://uneed.best) | Submit | Guessed URL 404'd — find the real one |

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

### Research notes (auto-run 2026-08-07)

The awesome-list / git-PR surface is now **saturated** — every fitting, free,
actively-merged list with >=700★ already has a `bucabay` PR (all five were found
unlogged this run via the fleet dedupe check and back-filled into the log + Tier 1
above). Findings:

- **Checked & rejected — no section fit:** `sindresorhus/awesome-nodejs` (66k★ — a
  packages/tools list; the only boilerplate entry is `node-module-boilerplate`, no
  full-app section), `enaqx/awesome-react` (already noted — no boilerplate section),
  `Correia-jpv/fucking-awesome-nextjs` (auto-mirror of `unicodeveloper/awesome-nextjs`,
  which we already PR'd — would duplicate).
- **Checked & rejected — wrong shape:** `PaulleDemon/awesome-landing-pages` (1.0k★) is
  a repo of *downloadable* landing-page templates (add via a template-issue request,
  not external links) and its maintainer is not actively merging PRs (an open PR from
  2026-05 is still unmerged) — not a fit for a full SaaS app.
- **No venue for our differentiators:** no dedicated `awesome-turborepo` /
  `awesome-drizzle` list exists with meaningful reach; `vercel/turbo` `examples/` and
  `vercel/examples` remain the same human-decision path already noted in Tier 1.
- **No emails sent this run** — emailing list maintainers purely to nudge merges of
  open PRs reads as spammy and is deliberately avoided; no new (b) contact-email
  venue surfaced.

Next runs: prioritize Tier-2 launch platforms and Tier-3 directory forms (manual),
and look for (b) template-directory curators with a public contact email.

## Assets for any submission

- **Repo**: <https://github.com/mailkite/saas-startup> (public, MIT)
- **Demo**: <https://saas-startup.mailkite.dev>
- **One-liner**: Production-ready Next.js 15 SaaS starter — self-contained auth (Google/GitHub OAuth + email/password, no auth vendor), Stripe subscriptions, teams, Postgres/Drizzle, dark-first UI.
- **Why it's different**: auth runs in your app, not a hosted service. No Clerk/Auth0/Supabase account needed — clone, add your own OAuth app, ship.
- **Social preview**: `apps/web/app/opengraph-image.png` (1200×630)
