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
| 2026-07-19 | [shadcn.io](https://github.com/shadcnblocks/shadcntemplates) | _DRY RUN — would open PR (add `content/mailkite-saas-startup.md`)_ | — | `[ ]` planned |
| 2026-07-19 | [awesome-saas (awesomelistsio)](https://github.com/brandonhimpfen/awesome-saas) | _DRY RUN — would open PR (add to "SaaS Boilerplates & Starter Kits")_ | — | `[ ]` planned |
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
| [ ] | [shadcnblocks/shadcntemplates](https://github.com/shadcnblocks/shadcntemplates) (backs [shadcn.io](https://www.shadcn.io/template)) | PR — add `content/mailkite-saas-startup.md` | 40★, pushed 2026-05-27, actively merges outside PRs (#8–#10). **Free open-source listings** (premium tier has fees — ours is MIT so free). No AI-PR ban. Add one markdown file with front-matter: `title`, `author: mailkite`, `demoUrl: https://saas-startup.mailkite.dev`, `githubUrl: https://github.com/mailkite/saas-startup`, `description`, `distribution: open-source`, `category: [nextjs, react, tailwind]`, then a `## Overview` / `## Features` body. **DRY RUN 2026-07-19 — would open PR** |
| [ ] | [brandonhimpfen/awesome-saas](https://github.com/brandonhimpfen/awesome-saas) | PR to README | 7★, pushed 2026-06-22. Fits `## SaaS Boilerplates & Starter Kits`; entry format `- [Name](url) — desc`, kept alphabetical. CONTRIBUTING **permits** AI PRs. Low reach but trivial + valid. **DRY RUN 2026-07-19 — would open PR** |
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
| [ ] | [Template0](https://template0.com/submit) | Submit form | "925 free templates, 20+ categories", has a **Boilerplate** category. Pricing unstated — ⚠️ verify free on `/pricing` before submitting. Steps: 1) go to <https://template0.com/submit>; 2) category **Boilerplate**; 3) name `MailKite SaaS Starter`; 4) repo <https://github.com/mailkite/saas-startup>, demo <https://saas-startup.mailkite.dev>; 5) paste the one-liner from *Assets* below |
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

### Researched & rejected (do not re-research)

Logged so future cron runs skip them. Reason it failed the verify gate:

- [georgezouq/awesome-saas](https://github.com/georgezouq/awesome-saas) — 53★, active, but it's a directory of **hosted SaaS products by business category** (Marketing, CRM, Data Analysis…). **No section fits** an open-source dev boilerplate. Rejected 2026-07-19.
- [tyaga001/awesome-saas-boilerplates-and-starter-kits](https://github.com/tyaga001/awesome-saas-boilerplates-and-starter-kits) — 26★, last pushed **2024-11-07** (>6 months). Inactive. Rejected 2026-07-19.
- [re50urces/Awesome-NextJs](https://github.com/re50urces/Awesome-NextJs) — 114★ but last pushed **2024-06** and only 1 external PR ever merged (2023). Not actively merging. Rejected 2026-07-19.
- [MrKomish/awesome-saas](https://github.com/MrKomish/awesome-saas) — last pushed **2019**. Dead. Rejected 2026-07-19.
- [turbo0.com](https://turbo0.com) — free, but requires a **verification badge on your site** to be approved and skews to "creative tools" not dev boilerplates. Flagged for a human decision, not added. 2026-07-19.

## Assets for any submission

- **Repo**: <https://github.com/mailkite/saas-startup> (public, MIT)
- **Demo**: <https://saas-startup.mailkite.dev>
- **One-liner**: Production-ready Next.js 15 SaaS starter — self-contained auth (Google/GitHub OAuth + email/password, no auth vendor), Stripe subscriptions, teams, Postgres/Drizzle, dark-first UI.
- **Why it's different**: auth runs in your app, not a hosted service. No Clerk/Auth0/Supabase account needed — clone, add your own OAuth app, ship.
- **Social preview**: `apps/web/app/opengraph-image.png` (1200×630)
