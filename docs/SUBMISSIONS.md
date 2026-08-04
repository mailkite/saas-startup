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
| 2026-08-03 | [brillout/awesome-react-components](https://github.com/brillout/awesome-react-components) | [PR #632](https://github.com/brillout/awesome-react-components/pull/632) | _pending merge_ | `[~]` submitted |
| 2026-08-03 | [officialrajdeepsingh/awesome-nextjs](https://github.com/officialrajdeepsingh/awesome-nextjs) | [PR #88](https://github.com/officialrajdeepsingh/awesome-nextjs/pull/88) | _pending merge_ | `[~]` submitted |
| 2026-08-02 | [iAmCorey/awesome-indie-hacker-tools](https://github.com/iAmCorey/awesome-indie-hacker-tools) | [PR #158](https://github.com/iAmCorey/awesome-indie-hacker-tools/pull/158) | _pending merge_ | `[~]` submitted |
| 2026-08-01 | [sorrycc/awesome-javascript](https://github.com/sorrycc/awesome-javascript) | [PR #1133](https://github.com/sorrycc/awesome-javascript/pull/1133) | _closed w/o merge (no comment) 2026-08-01_ | `[-]` rejected |
| 2026-08-01 | [lyqht/awesome-supabase](https://github.com/lyqht/awesome-supabase) | [PR #62](https://github.com/lyqht/awesome-supabase/pull/62) | _pending merge_ | `[~]` submitted |
| 2026-07-31 | [bytefer/awesome-nextjs](https://github.com/bytefer/awesome-nextjs) | [PR #23](https://github.com/bytefer/awesome-nextjs/pull/23) | _pending merge_ | `[~]` submitted |
| 2026-07-31 | [semlinker/awesome-typescript](https://github.com/semlinker/awesome-typescript) | [PR #177](https://github.com/semlinker/awesome-typescript/pull/177) | _pending merge_ | `[~]` submitted |
| 2026-07-30 | [bytefer/awesome-shadcn-ui](https://github.com/bytefer/awesome-shadcn-ui) | [PR #29](https://github.com/bytefer/awesome-shadcn-ui/pull/29) | ✅ **merged 2026-07-30** — listed in the `Saas` table | `[x]` live |
| 2026-07-30 | [merklefruit/SaaS4Devs](https://github.com/merklefruit/SaaS4Devs) | [PR #54](https://github.com/merklefruit/SaaS4Devs/pull/54) | _pending merge_ | `[~]` submitted |
| 2026-07-29 | [xcomptek/awesome-saas-boilerplates](https://github.com/xcomptek/awesome-saas-boilerplates) | [PR #222](https://github.com/xcomptek/awesome-saas-boilerplates/pull/222) | _pending merge_ | `[~]` submitted |
| 2026-07-29 | [EinGuterWaran/awesome-opensource-boilerplates](https://github.com/EinGuterWaran/awesome-opensource-boilerplates) | [PR #52](https://github.com/EinGuterWaran/awesome-opensource-boilerplates/pull/52) | _pending merge_ | `[~]` submitted |
| 2026-07-26 | [shadcnblocks/shadcntemplates](https://github.com/shadcnblocks/shadcntemplates) | [PR #14](https://github.com/shadcnblocks/shadcntemplates/pull/14) | _pending merge_ | `[~]` submitted |
| 2026-07-17 | [awesome-shadcn-ui](https://github.com/birobirobiro/awesome-shadcn-ui) | [PR #554](https://github.com/birobirobiro/awesome-shadcn-ui/pull/554) | _pending merge_ | `[~]` submitted |
| 2026-07-17 | [awesome-nextjs](https://github.com/unicodeveloper/awesome-nextjs) | [PR #536](https://github.com/unicodeveloper/awesome-nextjs/pull/536) | _pending merge_ | `[~]` submitted |

---

## Tier 1 — Git PR (easiest, highest signal)

Merge a PR, get listed. No account, no forms, no fees.

| ✓ | Place | How | Notes |
|---|-------|-----|-------|
| [ ] | [vercel/examples](https://github.com/vercel/examples) | PR — `pnpm new-example` | **Not a one-line entry** — the example must live inside their monorepo, MIT, and Next.js examples must use `@vercel/examples-ui` styling. Its front-matter feeds vercel.com/templates, which is **closed for new submissions** (see Tier 3), so a merge may not surface as a template yet. Needs a human decision on approach before investing |
| [~] | [brillout/awesome-react-components](https://github.com/brillout/awesome-react-components) | PR to README (`## Boilerplate`) | 48.0k★, CC0. **Submitted 2026-08-03** → [PR #632](https://github.com/brillout/awesome-react-components/pull/632), awaiting review (`## Boilerplate`). The flagship curated React-components list — has a literal "Boilerplate / scaffold / starter kit" section we fit. CONTRIBUTING has **no AI ban** but *requires* add = remove one un-awesome entry (PR removes archived `nwb`) and bans bare "React" in descriptions. Merge cadence is bursty (last batch 2026-01-26 merged 16 outside PRs; 57 open now) so it may wait — but at 48k★ it's the highest-reach venue we've tapped |
| [~] | [unicodeveloper/awesome-nextjs](https://github.com/unicodeveloper/awesome-nextjs) | PR to README | 11.1k★. **Submitted 2026-07-17** → [PR #536](https://github.com/unicodeveloper/awesome-nextjs/pull/536), awaiting review. Added to `## Boilerplates` |
| [-] | [aniftyco/awesome-tailwindcss](https://github.com/aniftyco/awesome-tailwindcss) | ~~PR~~ **hand-submit only** | 15.1k★. CONTRIBUTING.md **bans AI-authored/assisted PRs** — closed on sight, submitter may be banned. Gabe must add it by hand (📁 "Full templates" entry, `UI libraries, components & templates` section) |
| [-] | [enaqx/awesome-react](https://github.com/enaqx/awesome-react) | — | 74k★, but **no section fits** a full SaaS boilerplate. Skipped to avoid a rejected PR |
| [~] | [birobirobiro/awesome-shadcn-ui](https://github.com/birobirobiro/awesome-shadcn-ui) | PR to README | 20.1k★. **Submitted 2026-07-17** → [PR #554](https://github.com/birobirobiro/awesome-shadcn-ui/pull/554), awaiting review. Added to `## Boilerplates / Templates` |
| [~] | [bytefer/awesome-nextjs](https://github.com/bytefer/awesome-nextjs) | PR to README | 72★. **Submitted 2026-07-31** → [PR #23](https://github.com/bytefer/awesome-nextjs/pull/23), awaiting review (`## SaaS`) |
| [~] | [officialrajdeepsingh/awesome-nextjs](https://github.com/officialrajdeepsingh/awesome-nextjs) | PR to README | 708★, MIT. **Submitted 2026-08-03** → [PR #88](https://github.com/officialrajdeepsingh/awesome-nextjs/pull/88), awaiting review (`## Next.js boilerplate`). Actively merges outside PRs (last #86 same day; even merged an AI-agent PR #72) — AI-friendly, no AI-PR ban. CONTRIBUTING asks ≥100★ but explicitly invites *unique* projects for review; submitted on the self-contained-auth (no auth vendor) differentiator, disclosed honestly in the PR body |
| [x] | [bytefer/awesome-shadcn-ui](https://github.com/bytefer/awesome-shadcn-ui) | PR to README | 719★. **Listed 2026-07-30** → [PR #29](https://github.com/bytefer/awesome-shadcn-ui/pull/29) merged into the `Saas` table — ✅ our first live listing |
| [~] | [xcomptek/awesome-saas-boilerplates](https://github.com/xcomptek/awesome-saas-boilerplates) | PR to README | 3.1k★. A list *of* SaaS boilerplates — topical bullseye. **Submitted 2026-07-29** → [PR #222](https://github.com/xcomptek/awesome-saas-boilerplates/pull/222), awaiting review |
| [~] | [EinGuterWaran/awesome-opensource-boilerplates](https://github.com/EinGuterWaran/awesome-opensource-boilerplates) | PR to README | 1.9k★. "Free, production-ready" boilerplates. **Submitted 2026-07-29** → [PR #52](https://github.com/EinGuterWaran/awesome-opensource-boilerplates/pull/52), awaiting review |
| [~] | [semlinker/awesome-typescript](https://github.com/semlinker/awesome-typescript) | PR to README | 4.0k★. **Submitted 2026-07-31** → [PR #177](https://github.com/semlinker/awesome-typescript/pull/177), awaiting review (TypeScript Starters/Boilerplates) |
| [-] | [sorrycc/awesome-javascript](https://github.com/sorrycc/awesome-javascript) | PR to README | 35.0k★. **Submitted 2026-08-01** → [PR #1133](https://github.com/sorrycc/awesome-javascript/pull/1133), **closed without merge or comment** by a collaborator (2026-08-01, `## Boilerplates`). No AI-PR ban in CONTRIBUTING — simply not accepted. No recourse; do not re-submit |
| [~] | [merklefruit/SaaS4Devs](https://github.com/merklefruit/SaaS4Devs) | PR to README | 748★. **Submitted 2026-07-30** → [PR #54](https://github.com/merklefruit/SaaS4Devs/pull/54), awaiting review (Full-stack Boilerplates) |
| [~] | [shadcnblocks/shadcntemplates](https://github.com/shadcnblocks/shadcntemplates) | PR (content file) | 42★ — shadcn template directory (git-backed). **Submitted 2026-07-26** → [PR #14](https://github.com/shadcnblocks/shadcntemplates/pull/14), awaiting review |
| [~] | [lyqht/awesome-supabase](https://github.com/lyqht/awesome-supabase) | PR to README | 478★, CC0. **Official** Supabase awesome-list ("Starters & Resources"). **Submitted 2026-08-01** → [PR #62](https://github.com/lyqht/awesome-supabase/pull/62), awaiting review (`## Community Starters`). Honest fit — we run PostgreSQL on Supabase + Drizzle; entry describes this accurately and does **not** claim Supabase Auth |
| [~] | [iAmCorey/awesome-indie-hacker-tools](https://github.com/iAmCorey/awesome-indie-hacker-tools) | PR to README | 1,395★, MIT. Chinese-language indie-hacker tools list ("Find the best tools for indie hackers"). **Submitted 2026-08-02** → [PR #158](https://github.com/iAmCorey/awesome-indie-hacker-tools/pull/158), awaiting review (`## 模板` / Templates). Its Templates section already lists our paid competitors (Makerkit/Shipfast/Supastarter) — we fit as the free/OSS option. Actively merges outside PRs (last 2026-05); README explicitly invites tool PRs, no AI-PR ban |
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
| [ ] | [Tailkits](https://tailkits.com/submit-product/) | Submit | Verified reachable. **CONFIRMED PAID** (2026-08-01: submit page shows a pricing/sponsored tier, e.g. “$1” listings). Needs a human decision to pay — not auto-submitted |
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

### Researched & skipped (2026-08-04 run, 05:17 UTC)

Sixth backlog research pass (4-hour cadence). **No new venue acted on** — the first pass
with zero new external actions: the high-quality git-PR well is tapped (see the ~30 search
angles below), and cold-email outreach remains deliberately withheld (same reasoning as
prior passes). Re-confirmed all **12 pending external PRs still OPEN** — no merges or
closures since the 2026-08-03 21:17 pass. Do **not** re-research the items below.

Searched via `gh search repos` (sorting by stars **and** by `pushed_at`) across ~30 angles:
`awesome {saas-boilerplate, nextjs, shadcn, tailwind-templates, indie-hacker, micro-saas,
app-router, react-server-components, react-19, monorepo, starter-kit, vercel, open-source,
typescript-starter, react-boilerplate}`, `built with nextjs`, `nextjs templates gallery`,
`curated saas starter kits`, `nextjs boilerplate comparison`, `awesome open source projects`.
Nothing new passed all gates (fresh `pushed_at` ≤ ~6 mo, fitting section, MIT/CC0, actively
merging outside PRs, ≥~50★ reach, no AI-PR ban). New candidates evaluated this pass that
weren't in prior skips:

| Venue | ★ | Why skipped |
|-------|---|-------------|
| [tyaga001/awesome-saas-boilerplates-and-starter-kits](https://github.com/tyaga001/awesome-saas-boilerplates-and-starter-kits) | 26 | CC0, has a `### Next.js` section — **looks fresh by `updated` (2026-06-17) but that field is star/metadata only**: `pushed_at` = **2024-11-07** and last merged PR (#2) = 2024-11-07. Real content activity ~21 months stale. **Gotcha for future runs: gate on `pushed_at` + merge cadence, never on `updated`.** Fails freshness gate |
| [ixartz/awesome-saas-boilerplates](https://github.com/ixartz/awesome-saas-boilerplates) | 17 | **No license** (null) + **0 merged PRs ever** + `pushed_at` = 2024-09-13. Stale, unmoderated, license-murky (despite the author being a known Next.js-boilerplate maintainer) |
| [best-of-lists/best-of](https://github.com/best-of-lists/best-of) | 1,828 | Meta-list **of** best-of lists — its "Web Development" section indexes *best-of lists*, not starter kits. Entry-into-a-list-of-lists: same wrong-shape call as [mahseema/awesome-saas-directories](https://github.com/mahseema/awesome-saas-directories) |

> No email-channel venues again this run (same discipline): the fitting lists are PR-based,
> and cold-emailing curators to add us or to nudge our 12 open PRs is pestering, not outreach.

### Researched & skipped (2026-08-03 run, 21:17 UTC)

Fifth backlog research pass (4-hour cadence). **One** new venue acted on this run
([brillout/awesome-react-components](https://github.com/brillout/awesome-react-components),
48.0k★ → [PR #632](https://github.com/brillout/awesome-react-components/pull/632)) — the flagship
curated React-components list. It has a literal `## Boilerplate` section ("_Scaffold / starter
kit / Yeoman generator / stack ensemble / seed_") we fit exactly; CC0-licensed; demonstrably
merges outside PRs (16 merged 2026-01-26); **no AI-PR ban**. CONTRIBUTING *requires* that any add
also remove one un-awesome entry, so the PR is a 1:1 add/remove — it adds us (alphabetical, `M`)
and removes `insin/nwb` (that repo is **archived**, i.e. no longer awesome). Caveat noted honestly
in the PR body: the project is new/low-stars, and the list's merge cadence is bursty (last batch
~6 mo ago, 57 PRs open) so it may wait. All below were verified live this run (★, push/merge
cadence, README headings). Do **not** re-research.

Also this run: re-checked the 11 prior pending external PRs — all still **OPEN**, no new merges
or closures since the 2026-08-03 13:17 pass (12 pending total now, counting #632).

| Venue | ★ | Why skipped |
|-------|---|-------------|
| [markodenic/web-development-resources](https://github.com/markodenic/web-development-resources) | 8,071 | MIT, fresh (2026-06), actively merges outside PRs (every few weeks). **Wrong shape:** docsify list of web-dev *utilities/galleries* — Hosting, Learning Platforms, Icons, Fonts, Photos, Illustrations, CSS Games, Online Tools, UI Inspiration, "HTML/CSS/JavaScript templates" (which holds *static* template marketplaces like TemplateMo/ThemeFisher/Web3Templates, not full-stack apps), "React UI libraries" (component libs). **No SaaS-starter / full-stack-boilerplate section.** CONTRIBUTING also warns "automated bot submissions … will not be accepted" + manual review — a marginal-fit PR is risky. Not a fit |
| [lincolixavier/awesome-indie-hackers](https://github.com/lincolixavier/awesome-indie-hackers) | 118 | **No license** (null) + **no Templates/Boilerplates section** — it's a Portuguese-language tools-by-category list (Infra / Frontend / Pagamentos / Autenticação / Emails …). A full SaaS starter spans all categories; no single bucket fits. Wrong shape + license murk |
| [itsdouges/awesome-typescript-ecosystem](https://github.com/itsdouges/awesome-typescript-ecosystem) | 141 | Fresh (2026-05) but a TS *ecosystem/tools* index, not a starters/templates list, and 141★ is modest. Wrong shape |
| [devton/awesome-postgresql](https://github.com/devton/awesome-postgresql) | 85 | Sections: Extensions/Tools, Utilities, Blogs, Screencasts — Postgres *tooling*, no app-starter section. Same wrong-shape call as `dhamaniasad/awesome-postgres`. Re-check not warranted |
| [Bharathi4real/awesome-nextjs](https://github.com/Bharathi4real/awesome-nextjs), [mahdibrr/awesome-nextjs-supabase](https://github.com/mahdibrr/awesome-nextjs-supabase) | 5 each | Fresh (2026-07/08) but **5★ = near-zero reach**. Re-check if either grows past ~30★ |
| awesome-vercel variants (henryoman/awesome-vercel-native, *-vercel-alternatives, jacobhq/awesome-vercel) | ≤12 | All tiny (≤12★); the "alternatives" ones are wrong shape (hosting-alternative lists, not templates). Re-check not warranted |
| gitcommitshow/awesome-authentication (137★, last push 2020), Alex0x47/awesome-indie-hackers-tools (62★, 2024-12), brookshi/awesome-typescript-projects (894★, 2023-06) | — | Stale (fail the 6-mo freshness gate) or wrong shape (auth/tools lists) |

> No email-channel venues again this run (same discipline): the fitting lists are PR-based, and
> cold-emailing curators to add us or to nudge our 11 open PRs is pestering, not outreach.

### Researched & skipped (2026-08-03 run, 13:17 UTC)

Fourth backlog research pass (4-hour cadence). **One** new venue acted on this run
([officialrajdeepsingh/awesome-nextjs](https://github.com/officialrajdeepsingh/awesome-nextjs),
708★ → [PR #88](https://github.com/officialrajdeepsingh/awesome-nextjs/pull/88)) — a fresh, MIT,
actively-merging list (last outside PR merged the same day) with a `## Next.js boilerplate`
section; it even merged a `copilot-swe-agent` PR (#72), so AI-authored PRs are clearly welcome.
CONTRIBUTING lists a ≥100★ guideline but explicitly invites unique projects for review — our
self-contained-auth (no auth vendor) angle is genuinely unique, and that (plus the repo being
new/0★) is disclosed honestly in the PR body. All below were verified live this run (★, last
push/merge, README headings). Do **not** re-research.

Also this run: re-checked the 10 prior pending external PRs — all still **OPEN**, no new merges
or closures since the 2026-08-02 pass (11 pending total now).

| Venue | ★ | Why skipped |
|-------|---|-------------|
| [re50urces/Awesome-NextJs](https://github.com/re50urces/Awesome-NextJs) | 114 | **DEAD** — only PR ever merged is #1 on 2023-06-29; last push 2024-06-29. Fails the freshness gate hard |
| [mahseema/awesome-saas-directories](https://github.com/mahseema/awesome-saas-directories) | 238 | A meta-list **of** SaaS directory sites (where to *list* a SaaS), not starter kits/templates. Wrong shape — we'd be an entry-into-a-list-of-lists |
| [tyaga001/awesome-neon](https://github.com/tyaga001/awesome-neon) | 30 | Official-ish Neon list, but last push 2024-07-29 (~13 mo stale). Fails freshness gate |
| [victorocna/awesome-react-starter](https://github.com/victorocna/awesome-react-starter) | 20 | Re-checked; still ~20★ = near-zero reach. Re-check if it grows |
| [giovannism20/awesome-supabase](https://github.com/giovannism20/awesome-supabase) | 42 | Fresh (2026-08) but indexes **talks, tools, examples & articles** — not starters/templates. Wrong shape |
| [shyakadavis/awesome-shadcn-svelte](https://github.com/shyakadavis/awesome-shadcn-svelte) | 137 | **Svelte**, not React/Next.js — wrong framework |
| Remaining shadcn variants (agnostic-coder, y-h-v-h/shadverse, BankkRoll directory, vitalijalbu, ansarisaqlain987, vivek9patel) | ≤28 | Each <30★ and stale — near-zero reach. Re-check if any grows |

> No email-channel venues again this run (same discipline): the fitting lists are PR-based, and
> cold-emailing curators to add us or to nudge our 11 open PRs is pestering, not outreach.

### Researched & skipped (2026-08-02 run, 01:17 UTC)

Third backlog research pass (4-hour cadence). **One** new venue acted on this run
([iAmCorey/awesome-indie-hacker-tools](https://github.com/iAmCorey/awesome-indie-hacker-tools),
1,395★ → [PR #158](https://github.com/iAmCorey/awesome-indie-hacker-tools/pull/158)) — a fresh,
MIT, actively-merging list whose `模板` (Templates) section already lists our paid competitors
(Makerkit/Shipfast/Supastarter); we fit as the free/open-source option. Everything below was
verified live this run (★, last merge, README headings). Do **not** re-research.

Also this run: re-checked the 10 prior pending external PRs — [sorrycc/awesome-javascript #1133](https://github.com/sorrycc/awesome-javascript/pull/1133)
was **closed without merge** (no comment) and flipped to `[-]`; the other 9 remain open.

| Venue | ★ | Why skipped |
|-------|---|-------------|
| [melvin0008/awesome-projects-boilerplates](https://github.com/melvin0008/awesome-projects-boilerplates) | 1,398 | The canonical "awesome boilerplates" list — but **DEAD**: last outside PR merged **2023-04-01** (>3 yrs ago). A PR would rot forever |
| [2-fly-4-ai/awesome-shadcnui](https://github.com/2-fly-4-ai/awesome-shadcnui) | 555 | Despite the star count, **only 1 PR ever merged** (#1, 2025-06, by a collaborator); effectively unmoderated. Skip |
| [ripienaar/free-for-dev](https://github.com/ripienaar/free-for-dev) | 131k | Lists **free-tier SaaS/PaaS/IaaS services**, not templates/repos. A boilerplate isn't a free-tier service. Wrong shape |
| [RunaCapital/awesome-oss-alternatives](https://github.com/RunaCapital/awesome-oss-alternatives) | 19.4k | OSS **alternatives to hosted SaaS products** (Notion/Slack/…). A starter template isn't a product alternative. Wrong shape |
| [brandonhimpfen/awesome-tailwindcss](https://github.com/brandonhimpfen/awesome-tailwindcss) | 7 | Fresh (2026-05) and on-topic, but 7★ = near-zero reach. Re-check if it grows |
| [Correia-jpv/fucking-awesome-tailwindcss](https://github.com/Correia-jpv/fucking-awesome-tailwindcss) | 24 | Auto-updated static mirror, **no license** (same legal murkiness as the nextjs mirror already skipped) |
| [hevar/awesome-react-tailwindcss-ui-components](https://github.com/hevar/awesome-react-tailwindcss-ui-components) | 503 | UI **components** list, not starters; last push 2024-05 (stale) |
| [petermekhaeil/awesome-turborepo](https://github.com/petermekhaeil/awesome-turborepo) | 12 | Last push 2024-12 — fails the 6-month freshness gate |

> No email-channel venues again this run (same discipline): the fitting lists are PR-based, and
> cold-emailing curators to add us or to nudge our 10 open PRs is pestering, not outreach.

### Researched & skipped (2026-08-01 run, 17:17 UTC)

Second backlog research pass (4-hour cadence). One new venue acted on this run
([sorrycc/awesome-javascript](https://github.com/sorrycc/awesome-javascript), 35.0k★ →
[PR #1133](https://github.com/sorrycc/awesome-javascript/pull/1133)). All below were verified
live this run (★, last push, merge cadence, README headings). Do **not** re-research.

| Venue | ★ | Why skipped |
|-------|---|-------------|
| [bradtraversy/design-resources-for-developers](https://github.com/bradtraversy/design-resources-for-developers) | 66.6k | Design *resources* only — sections are UI Graphics, HTML & CSS Templates, UI Components & Kits, React/Vue/Angular UI **Libraries**. No app-boilerplate/SaaS-starter section. A full Next.js SaaS app is out of scope. Wrong shape |
| [bestofjs/bestofjs.org](https://bestofjs.org) | — | Auto-ranks JS **npm libraries/frameworks** by GitHub stars & downloads. Indexes libs, not templates/repos. No “submit your template” flow. Wrong shape |
| [saasforge/open-source-saas-boilerpate](https://github.com/saasforge/open-source-saas-boilerpate) | 842 | A competitor **product** (Python/PostgreSQL/React SaaS boilerplate), not a list; last merged PR 2020-07. Not a venue |
| [kevindeasis/awesome-fullstack](https://github.com/kevindeasis/awesome-fullstack) | 243 | Last pushed **2024-08** — fails the 6-month freshness gate. Dead-ish |
| awesome-app-router / awesome-rsc / awesome-react-19 | — | No fitting list exists at scale (`gh search` returned nothing ≥50★ with a starters section) |
| Tailkits | — | **Confirmed PAID** — see Tier 3 |

> No email-channel venues again this run, for the same reason as the 13:17 pass: the fitting
> lists are PR-based, and cold-emailing curators to add us (or to nudge the 8 open PRs) is
> borderline-spammy and violates *quality over volume*. Deliberately not done.

### Researched & skipped (2026-08-01 run, 13:17 UTC)

First backlog research pass. The high-quality git-PR well is largely tapped — the awesome-lists
in Tier 1 already cover the fresh, fitting lists. **One** new venue found and acted on this run
([lyqht/awesome-supabase](https://github.com/lyqht/awesome-supabase), 478★ → PR #62). Everything
below was verified live this run (★, last push, merge cadence, **and** section fit via the actual
README headings). Do **not** re-research.

| Venue | ★ | Why skipped |
|-------|---|-------------|
| [sindresorhus/awesome-nodejs](https://github.com/sindresorhus/awesome-nodejs) | 66.4k | Node **package** catalog (Official / Packages: HTTP, Web frameworks, Build tools…). Verified — **no boilerplate/starter section**. Wrong shape |
| [dhamaniasad/awesome-postgres](https://github.com/dhamaniasad/awesome-postgres) | 12k | Postgres *tools/libs* (HA, Backups, GUI, CLI, Extensions, Language bindings…). Verified headings — no app-starter section |
| [georgezouq/awesome-saas](https://github.com/georgezouq/awesome-saas) | 54 | Hosted SaaS *products* by category (Marketing, Analytics, CMS, AI…). Verified headings — no boilerplate/template section |
| [Atarity/deploy-your-own-saas](https://github.com/Atarity/deploy-your-own-saas) | 9.8k | "Deploy your own X" self-hostable *products* (VPN, Music, Netflix…). Verified headings — no boilerplate section |
| [automata/awesome-jamstack](https://github.com/automata/awesome-jamstack) | 1.4k | Sections: SSG / CMS / API / Jamstack Showcase. No starters section; we're a dynamic SaaS (sessions + Postgres + Stripe), not Jamstack. Misfit |
| [dzharii/awesome-typescript](https://github.com/dzharii/awesome-typescript) | 5.1k | **Archived** (read-only) — accepts no PRs |
| [lukasmasuch/best-of-react](https://github.com/lukasmasuch/best-of-react) | 1.1k | Auto-generated ranked list; **last PR merged 2025-08-28** (~11 mo stale). Fails freshness gate. (Content is CC-BY-SA-4.0 too) |
| [johackim/awesome-indiehackers](https://github.com/johackim/awesome-indiehackers) | 642 | **GPL-3.0** content — not MIT-compatible. License alone kills it |
| [korfuri/awesome-monorepo](https://github.com/korfuri/awesome-monorepo) | 5.8k | Monorepo *tools/architecture* list, no app-starter section; stale (last push 2024-08) |
| [shyuan/awesome-oauth-oidc](https://github.com/shyuan/awesome-oauth-oidc) | 28 | OAuth/OIDC **documentation** list — no starters/templates section. Wrong shape |
| [LoginRadius/awesome-login-pages](https://github.com/LoginRadius/awesome-login-pages) | 788 | Login-page **UI/design examples**, not starter kits |
| [fiatjaf/awesome-loginless](https://github.com/fiatjaf/awesome-loginless) | 1.6k | Lists services that *don't* require login. Wrong shape + stale (last push 2022) |
| [Correia-jpv/fucking-awesome-nextjs](https://github.com/Correia-jpv/fucking-awesome-nextjs) | 133 | Auto-updated static mirror; **no license** — contributing is legally murky. Skip |
| awesome-stripe (brandonhimpfen / codebruinc) | ≤4 | Only low-reach Stripe lists exist |
| [matthiasfeist/awesome-drizzle](https://github.com/matthiasfeist/awesome-drizzle) | 3 | `awesome-drizzle` exists now but 3★ / stale — too small. Re-check once it grows |
| [victorocna/awesome-react-starter](https://github.com/victorocna/awesome-react-starter) | 20 | Fresh (2026-07) but tiny reach; not worth a slot yet. Re-check if it grows |
| [nextjstemplates.com](https://nextjstemplates.com) | — | Curated Next.js template site (Creativeship). **No open submit flow** — `/submit` is 404, homepage exposes no submit/contact link. MANUAL only if a route turns up |

> No email-channel venues this run: the fitting awesome-lists are PR-based, and cold-emailing
> round-up bloggers/curators to add us is borderline-spammy and violates "quality over volume".
> Same for nudging the 8 open PRs — pestering, not outreach. Deliberately not done.

## Assets for any submission

- **Repo**: <https://github.com/mailkite/saas-startup> (public, MIT)
- **Demo**: <https://saas-startup.mailkite.dev>
- **One-liner**: Production-ready Next.js 15 SaaS starter — self-contained auth (Google/GitHub OAuth + email/password, no auth vendor), Stripe subscriptions, teams, Postgres/Drizzle, dark-first UI.
- **Why it's different**: auth runs in your app, not a hosted service. No Clerk/Auth0/Supabase account needed — clone, add your own OAuth app, ship.
- **Social preview**: `apps/web/app/opengraph-image.png` (1200×630)
