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
| 2026-09-04 | [Boilerplates Directory](https://boilerplates.directory) | Intro email to curator Hugo Berton (hello@boilerplates.directory, msg `msg_4a757a13a4e14a89a96df8627897b9da`, exit 0). Free `/submit` form still needs a human (Tier 3 row) | _pending review_ | `[~]` submitted |
| 2026-09-04 | [Starter Kit Directory](https://www.starterkitdirectory.com) | Listing-request email (admin@starterkitdirectory.com, msg `msg_032e4a839f55441a83a1e50eb3da75f2`, exit 0). No public submit form — email is the channel | _pending review_ | `[~]` submitted |
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
| [ ] | [Uneed](https://uneed.best) | Submit | Guessed URL 404'd — find the real one |
| [ ] | [DevHunt](https://devhunt.org) | **Manual — GitHub login** | Open-source "Product Hunt for dev tools" (by @johnrushx), has an [Open Source](https://devhunt.org/tools/open-source) category. **How to submit:** 1) sign in at <https://devhunt.org> with GitHub; 2) click **Submit** (top nav); 3) fill name `MailKite SaaS Starter`, URL `https://saas-startup.mailkite.dev`, GitHub `https://github.com/mailkite/saas-startup`, category **Open Source**, tagline = one-liner from Assets, add `apps/web/app/opengraph-image.png` as cover; 4) pick a launch day (Tue–Thu), submit. **Free** tier exists (waits for a slot); paid "launch now" is ~$49 — **decline the paid option**. Verified 2026-09-04: `/new` is login-gated so the agent can't submit → human |

## Tier 3 — Template directories

| ✓ | Place | How | Notes |
|---|-------|-----|-------|
| [ ] | [HTMLrev](https://htmlrev.com/free-nextjs-templates.html) | Submit form | Free-only, curated, has a Next.js category. ⚠️ refused connection from our network — verify manually |
| [ ] | [Tailkits](https://tailkits.com/submit-product/) | Submit | Verified reachable. Pricing unstated — check it's free before submitting |
| [~] | [Boilerplates Directory](https://boilerplates.directory) | **Manual — free form** (+ email sent 2026-09-04) | 278+ starters in 10 categories, by Hugo Berton (Aix-en-Provence). Free standard review "up to four weeks"; Pro Launch is $49 — **decline**. **How to submit:** 1) open <https://boilerplates.directory/submit>; 2) **App URL** `https://saas-startup.mailkite.dev`; 3) **Name** `MailKite SaaS Starter`; 4) **Category** → SaaS / Next.js; 5) **Email** `gabe@mailkite.dev`; 6) **Short description** (≤300 chars) = one-liner from Assets; 7) **Notes**: "MIT, free, repo https://github.com/mailkite/saas-startup, auth is self-contained (no Clerk/Auth0/Supabase)"; 8) **Review preference** → Standard (free); submit. Curator emailed the same day (`msg_4a757a13…`) |
| [~] | [Starter Kit Directory](https://www.starterkitdirectory.com/kits) | **Email only** (sent 2026-09-04) | Directory of starter kits by platform; 71 Next.js kits incl. open-source ones (Open SaaS, SaaS Boilerplate). No public submit form; `/sponsor` is paid — **decline**. Listing request sent to `admin@starterkitdirectory.com` (`msg_032e4a83…`). If they reply with a form, Gabe releases the reply via `approve-reply.sh` |
| [ ] | [Made with React.js](https://madewithreactjs.com/submit) | **Manual — free form** | Curated React/Next.js project gallery (by Melanie, nifty.at); manual review, "6–8 weeks", accepted projects get X/Bluesky promo. **How to submit:** 1) open <https://madewithreactjs.com/submit>; 2) **Project URL** `https://saas-startup.mailkite.dev`; 3) **Repo** `https://github.com/mailkite/saas-startup`; 4) **Description** = one-liner + "Why it's different" from Assets; 5) accept privacy statement, submit. **Free.** Questions: `melanie@nifty.at` (not emailed — the form is the channel) |
| [ ] | [All Shadcn](https://allshadcn.com/submit-product/) | **Manual — free form** | ThemeSelection's shadcn directory (70+ templates/blocks/tools), free & premium listings; only shadcn-built resources (we ship `apps/web/components.json`, so we qualify). **Free "Starter" plan** = standard listing, 7+ day queue; Express $12/mo, Premium $49/mo, Elite $99/mo — **decline all paid tiers**. **How to submit:** 1) open <https://allshadcn.com/submit-product/>; 2) **Product name** `MailKite SaaS Starter`; 3) **Category** → Templates / Boilerplates; 4) **Frameworks** → Next.js; 5) **URL** `https://saas-startup.mailkite.dev` (repo link in description); 6) choose **Free** plan, submit |
| [ ] | [SaaSHub](https://www.saashub.com/submit) | **Manual — free, login** | Software-alternatives directory with a dev-tools/open-source audience; lists products then lets you push to their "108 directories" list. **Free**, account required. **How to submit:** 1) sign up at <https://www.saashub.com>; 2) **Submit** → product `MailKite SaaS Starter`, URL `https://saas-startup.mailkite.dev`, tagline = one-liner, tags `nextjs`, `saas-boilerplate`, `open-source`; 3) verify ownership via the email they send; 4) from the product management page, use the **Submit** tab to cross-post to relevant directories. Login-gated → human |
| [ ] | [Software Growth — SaaS Boilerplates](https://www.softwaregrowth.io/saas-boilerplates) | **Manual — form, pricing unstated** | Catalog of SaaS boilerplates with stack/price filters; lists many "$0 Free / Open Source" entries (Speedrail, DjaoDjin, Parthenon…). **How to submit:** 1) open <https://www.softwaregrowth.io/submit-new-saas-boilerplate> ("We'll review it and add it if it's a good fit"); 2) fill name `MailKite SaaS Starter`, URL `https://github.com/mailkite/saas-startup`, demo `https://saas-startup.mailkite.dev`, stack `Next.js 15 · TypeScript · Tailwind · Postgres/Drizzle · Stripe`, price **Free / Open Source**; 3) submit. ⚠️ No pricing shown on the form — stop if it asks for payment |
| [-] | [OpenSourceAlternative.to](https://www.opensourcealternative.to/submit) | **Flag — borderline fit** | Free waitlist is "6+ months"; $29 buys a 48-h review — **decline**. Criteria: open source, actively maintained, *self-hosted alternative to a named proprietary tool* — a starter template only fits if framed as an alternative to a paid boilerplate (e.g. ShipFast). Same non-fit shape as `openalternative.co` (already flagged). Contact `osa@reimer.me` (not emailed). Human decision |
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

### Checked and rejected (so future runs skip them)

- 2026-09-04 · `awesomelistsio/awesome-next.js` — 6★, no license, only one outside PR ever (closed). Not a venue.
- 2026-09-04 · `better-auth/awesome` — better-auth ecosystem only; we ship our own auth, no fit.
- 2026-09-04 · `piotrkulpinski/open-source-alternatives` (6.7k★, active) — "alternatives to proprietary software" taxonomy, no boilerplate/starter section. No fit.
- 2026-09-04 · `Alchemyst-ai/awesome-saas`, `awesome-saas/awesome-saas`, `theshubh77/awesome-saas-directories` — platform templates / SaaS tools / directory lists, not starters.
- 2026-09-04 · `lendai/awesome-saas`, `StartupGuns/awesome-saas-boilerplates`, `u4078974/awesome-saas-boilerplates` — last pushed 2024, dead.
- 2026-09-04 · `tailawesome.com` (ex tailwindawesome.com) — `/submit` 404s, no submission path found.
- 2026-09-04 · GitHub repo search (awesome × nextjs / shadcn / tailwindcss / saas / boilerplate / react-starter, sorted by push date) surfaced no un-logged list pushed since 2026-03 with ≥5★. Git-PR channel remains saturated; directories are where the reach is.

## Assets for any submission

- **Repo**: <https://github.com/mailkite/saas-startup> (public, MIT)
- **Demo**: <https://saas-startup.mailkite.dev>
- **One-liner**: Production-ready Next.js 15 SaaS starter — self-contained auth (Google/GitHub OAuth + email/password, no auth vendor), Stripe subscriptions, teams, Postgres/Drizzle, dark-first UI.
- **Why it's different**: auth runs in your app, not a hosted service. No Clerk/Auth0/Supabase account needed — clone, add your own OAuth app, ship.
- **Social preview**: `apps/web/app/opengraph-image.png` (1200×630)
