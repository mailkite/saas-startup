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
| 2026-07-30 | _auto-run 17:17 UTC_ | 1 PR: [#54 merklefruit/SaaS4Devs](https://github.com/merklefruit/SaaS4Devs/pull/54) | bytefer/awesome-shadcn-ui ([PR #29 merged](https://github.com/bytefer/awesome-shadcn-ui/pull/29) → [live `## Saas`](https://github.com/bytefer/awesome-shadcn-ui#saas)) | `[x]` **🎉 FIRST LIVE LISTING** — bytefer/awesome-shadcn-ui **PR #29 merged 2026-07-30 01:29 UTC** (Saas table). Opened **1 external PR** (cap ≤3): **merklefruit/SaaS4Devs** → [#54](https://github.com/merklefruit/SaaS4Devs/pull/54) (`### Complete Full-stack Boilerplates`, appended after Nextless JS, `Name — Tech — Price` format; only Next.js 15 + shadcn entry). SaaS4Devs ★748/MIT/no AI-ban; flagged "unmaintained" **but merges outside PRs** (#36,#34 2026-02; steady since 2021) → actionable. **0 emails** — fresh research sweep (awesome-turborepo/postgres/vercel/monorepo/authentication/typescript/react-boilerplate/saas/indiehackers/startup/fullstack) found **no public tip email inviting submissions**: **casdoor/awesome-auth** ★537 is *auth-libraries-by-language* (wrong category; 6/8 last PRs closed-unmerged) → **skipped**; RunaCapital/awesome-oss-alternatives (19k★, "OSS alternatives to SaaS" — wrong category + dormant >6mo); johackim/awesome-indiehackers (resources list, no tools/templates section); korfuri/awesome-monorepo dormant 2024-08; all others dormant/>6mo/wrong-ecosystem (Nuxt/Vue/Flutter)/dup-of-already-staged. **Pending PRs unchanged:** xcomptek #222 (open), EinGuterWaran #52 (open), unicodeveloper #536 (open/stalled), birobirobiro #554 (open). **No paid venues, no manual tier additions this run.** **Wrap-up PR this run also lands all accumulated 07-19→07-29 research to `main`** (origin/main was stale at 94 lines — prior wrap-up PRs never merged; this branch builds on `submissions/auto-20260729-1717` which carries the full 139-line research). |
| 2026-07-29 | _auto-run 17:17 UTC_ | 3 PRs: [#222 xcomptek](https://github.com/xcomptek/awesome-saas-boilerplates/pull/222), [#52 EinGuterWaran](https://github.com/EinGuterWaran/awesome-opensource-boilerplates/pull/52), [#29 bytefer](https://github.com/bytefer/awesome-shadcn-ui/pull/29) | — (pending merge) | `[~]` **GH_TOKEN FIXED** (login `bucabay`, scopes incl. `repo`/`workflow`) — ends the **6-run / 10-day block** (401 since 2026-07-19). Opened **3 external PRs** (cap ≤3) from forks, each a clean 1-line diff, entry verified absent, no AI-PR ban, personalized body: **xcomptek/awesome-saas-boilerplates** → [#222](https://github.com/xcomptek/awesome-saas-boilerplates/pull/222) (`## Next.js`, alphabetical LaunchFa.st↔Mkdirs); **EinGuterWaran/awesome-opensource-boilerplates** → [#52](https://github.com/EinGuterWaran/awesome-opensource-boilerplates/pull/52) (`### React & Next.js`, appended); **bytefer/awesome-shadcn-ui** → [#29](https://github.com/bytefer/awesome-shadcn-ui/pull/29) (`## Saas` table row). Forks: bucabay/{awesome-saas-boilerplates, awesome-opensource-boilerplates, awesome-shadcn-ui-1}. **officialrajdeepsingh DOWNGRADED → MANUAL:** CONTRIBUTING requires **≥100★** + bans **new projects**; mailkite/saas-startup is **0★, created 2026-07-15** → fails both (escape clause “if unique, may submit” ⇒ human pitch only). **0 emails** — all awesome-lists are PR-based; dev newsletters (JS/React/Next Weeklies) use *forms*, so cold-emailing editors to pitch a 0-star/2-wk repo is non-compliant. Fresh research (GitHub search: nextjs / saas / shadcn / tailwind / drizzle / turborepo / typescript / postgres) found **no new strong venue** — niche saturated (hits were already-logged, dormant >6mo, wrong-ecosystem [Flutter/Svelte], archived [dzharii/awesome-typescript], or ≤28★; **shadverse** 28★/1-PR-ever skipped as negligible). Both prior PRs unchanged (**#536** unicodeveloper open/0 comments/stalled; **#554** birobirobiro open/1 bot comment). Stale **PR #1** (DRY RUN 07-19) to saas-startup left open (out of scope). |
| 2026-07-29 | _auto-run 13:17 UTC_ | — (no external action) | — | `[ ]` **BLOCKED — `GH_TOKEN` invalid (HTTP 401), 6th consecutive run (day 10).** Re-confirmed definitively this run: a direct `GET /user` with the token → **HTTP 401 "Bad credentials"**, and a real `git push --dry-run origin main` is rejected ("Invalid username or token"). Token last worked **2026-07-19**; broken every run since (07-27 ×3 + 07-28 + 07-29 01:17 + now). Reads still work (repo public). **0 external PRs, 0 emails, no wrap-up PR** (push/fork/PR all 401). **4 staged Tier-1 venues re-verified via the unauth API** — all un-archived + recently pushed + entry still absent (xcomptek 07-17 / EinGuterWaran 07-17 / bytefer·shadcn 07-08 / officialrajdeepsingh 07-26) → all 4 remain actionable, no re-research needed. Both pending PRs unchanged (**#536 unicodeveloper** open/0 comments/stalled; **#554 birobirobiro** open/1 bot comment). **NEW this run — auth-differentiation angle (never searched before):** deep-dived **`lyqht/awesome-supabase`** (★478, CC0-1.0, pushed 07-19, perfect-fit `## Community Starters` section [analogous: Basejump, Supastarter, Supanext], no AI ban, `awesome-lint` required) → **FLAGGED for human review, NOT auto-staged:** ~8 of its last ~12 closed PRs were **closed-unmerged**, incl. **PR #51 "Add Next.js + Supabase SaaS Starter to Community Starters" — our exact category — closed unmerged**; maintainer merges guides/fixes (#60, #55) but rejects most add-my-starter PRs. Per "when unsure, document as MANUAL, don't act." Other new searches yielded nothing actionable: awesome-stripe/drizzle/nextauth all tiny (≤★7) or dormant; the shadcn "registry/directory" hits are component *libraries* (wrong category — not awesome-lists); broad SaaS lists are already-staged or dormant. **Email-venue probe** (react.email / nextjs masters / smashingmagazine / css-tricks): all form-only/editorial, no public tip email → **0 emails** (note: `MAILKITE_API_KEY` is SET and is independent of the dead `GH_TOKEN`, so emails are NOT token-blocked — only venue-blocked). **Research is cumulative on local branch `submissions/auto-20260729-1317`** (branched from `0117`, inherits all staged entries + ready-to-paste text) — ready to `git push -u` + `gh pr create` the moment the token is fixed; top-3 to open first: **officialrajdeepsingh** (merges daily), **xcomptek** (3.1k★ reach), **bytefer/awesome-shadcn-ui**. **Human action (URGENT, unchanged): rotate `GH_TOKEN`** — 6 runs / 10 days blocked. |
| 2026-07-29 | _auto-run 01:17 UTC_ | — (no external action) | — | `[ ]` **BLOCKED — `GH_TOKEN` invalid (HTTP 401), 5th consecutive run.** Token broken since **2026-07-19** (10 days): `gh auth status` reports the token invalid and a real `git push --dry-run origin main` is rejected ("Invalid username or token"); reads still work (public repo needs no auth). **Could not fork/push/open PRs** → **0 external PRs, 0 emails**, no wrap-up PR to saas-startup. **Re-verified all 4 staged venues via the unauth API** — all un-archived + recently pushed (xcomptek 07-17 / EinGuterWaran 07-17 / bytefer·shadcn 07-08 / officialrajdeepsingh 07-26), entries still absent → all 4 remain actionable. Both pending PRs (**unicodeveloper #536, birobirobiro #554**) still **open / unmerged** (no change). Fresh GitHub search (awesome-nextjs / saas-boilerplate / awesome-shadcn / awesome-tailwind) found **NO new actionable venue**: `Correia-jpv/fucking-awesome-nextjs` (133★) is a low-merge fork; `2-fly-4-ai/awesome-shadcnui` (553★) is **dormant** (pushed 2025-06-19 → fails the 6-month rule); `y-h-v-h/shadverse` (28★) too low-reach; every SaaS-boilerplate hit is a competitor *product*, not an aggregator list. No new email venue surfaced (newsletter venues remain form-only). **CRITICAL INTEL — `origin/main` is STALE:** it still holds the 94-line 07-17-era doc; **none** of the 07-27/07-28 research (4 staged venues, ready-to-paste entries, pending-PR intel) ever reached it (every prior push 401'd; working-tree edits were lost on checkout). The research survived **only in local branches**. **This run re-commits the full research as a SINGLE clean commit** on `submissions/auto-20260729-0117` (branched straight from `main`) — ready to `git push -u` + `gh pr create` the moment the token is fixed, no re-research needed. **Human action (unchanged, URGENT): rotate `GH_TOKEN`** — 5 runs / 10 days blocked. Once fixed, top-3 staged PRs to open first: **officialrajdeepsingh** (merges daily), **xcomptek** (3.1k★ reach), **bytefer/awesome-shadcn-ui**. |
| 2026-07-28 | _auto-run 01:17 UTC_ | — (no external action) | — | `[ ]` **BLOCKED — `GH_TOKEN` invalid (HTTP 401), 4th consecutive run.** Token last worked **2026-07-19** (`submissions/auto-20260719-1316` pushed to origin); broken every run since (07-27 01:17 / 13:17 / 17:17 + today). Reads still work (repo public); all writes (push / fork / PR) return 401. Verified `osxkeychain` has **no** github.com entry — the inline `$GH_TOKEN` helper is the only credential provider, **no fallback**. Token is a classic `ghp_` PAT (revoked/expired). **Could not fork/push/open PRs** → 4 git-PR venues remain staged in Tier 1; the wrap-up PR to saas-startup could not be opened either (can't push the branch). **Re-verified all 4 staged venues this run via the unauth API**: un-archived, recently pushed, entries still absent. **officialrajdeepsingh/awesome-nextjs confirmed actively merging outside PRs** (#80 Kostra, #81, #84, #85 all merged 07-18→07-26, our exact SaaS-starter category) → **#1 priority the moment the token is fixed.** Searched GitHub for NEW venues — nothing stronger than the 4 staged (results dominated by competitor starter-kits [boxyhq / Blazity / makerkit …] and hosting-platform template repos [netlify-templates/*]); no dupes added. Probed email venues (nextjsweekly / react.statuscode / javascriptweekly / bytes.dev / builtat.com / uimodule.com) — **all form-only / editorial, none expose a public contact email that invites tool submissions** → **0 emails sent** (per "when unsure, document as MANUAL, don't act"). **NEW INTEL:** **unicodeveloper/awesome-nextjs is dormant for merges** (`pushed_at` = 2026-03-24; its last 5 closed PRs were all closed **unmerged**) → **PR #536 is effectively stalled** (flagged for a human decision; **not** auto-closed). PR #554 (birobirobiro) unchanged — still open, its only "comment" is a Vercel deploy-auth bot prompt (harmless). **Human action: rotate `GH_TOKEN`** (set a fresh classic PAT or fine-grained token with `repo` + `workflow` for mailkite/saas-startup + fork/PR scope). Branch `submissions/auto-20260728-0117` was branched from the prior unpushed research commit `10845c7` (not `main`) because `origin/main` still lacks the staged-venues doc and pushing it is itself blocked. |
| 2026-07-27 | _auto-run 17:17 UTC_ | — (no external action) | — | `[ ]` **BLOCKED — `GH_TOKEN` invalid (HTTP 401).** An earlier 13:17 UTC attempt today hit the same block; its working-tree edits to this file did **not** persist (working-tree-only, lost on a fresh checkout — its own warning realized), so this run re-derived + re-verified everything fresh via the unauthenticated GitHub API. Re-confirmed: `gh api`/`gh auth status` fail and a real `git push` of `submissions/auto-20260727-1717` was rejected ("Invalid username or token"); all git credential helpers route through `$GH_TOKEN`/`gh` with **no keychain fallback**. **Could not fork/push/open PRs** → **4 git-PR venues now staged in Tier 1 with ready-to-paste entries** (all verified active + merging external PRs + no AI ban + entry absent): xcomptek/awesome-saas-boilerplates (3.1k★), EinGuterWaran/awesome-opensource-boilerplates (1.9k★), bytefer/awesome-shadcn-ui (719★), and **NEW this run** officialrajdeepsingh/awesome-nextjs (707★, `## Next.js boilerplate`, merges daily). No emails sent (no email-target venue surfaced; + duplication-safety: log can't reach `origin` while push is down). Our 2 pending PRs (unicodeveloper #536, birobirobiro #554) both still open/awaiting. **Human action: rotate `GH_TOKEN`.** Next run acts on the best ≤3 staged venues (recommend xcomptek, officialrajdeepsingh [fastest merge], bytefer/awesome-shadcn-ui; then EinGuterWaran). Local branch `submissions/auto-20260727-1717` (unpushed). |
| 2026-07-17 | [awesome-shadcn-ui](https://github.com/birobirobiro/awesome-shadcn-ui) | [PR #554](https://github.com/birobirobiro/awesome-shadcn-ui/pull/554) | _pending merge_ | `[~]` submitted |
| 2026-07-17 | [awesome-nextjs](https://github.com/unicodeveloper/awesome-nextjs) | [PR #536](https://github.com/unicodeveloper/awesome-nextjs/pull/536) | _pending merge_ | `[~]` submitted |

---

## Tier 1 — Git PR (easiest, highest signal)

Merge a PR, get listed. No account, no forms, no fees.

| ✓ | Place | How | Notes |
|---|-------|-----|-------|
| [ ] | [vercel/examples](https://github.com/vercel/examples) | PR — `pnpm new-example` | **Not a one-line entry** — the example must live inside their monorepo, MIT, and Next.js examples must use `@vercel/examples-ui` styling. Its front-matter feeds vercel.com/templates, which is **closed for new submissions** (see Tier 3), so a merge may not surface as a template yet. Needs a human decision on approach before investing |
| [~] | [unicodeveloper/awesome-nextjs](https://github.com/unicodeveloper/awesome-nextjs) | PR to README | 11.1k★. **Submitted 2026-07-17** → [PR #536](https://github.com/unicodeveloper/awesome-nextjs/pull/536). ⚠️ **Likely stalled:** re-checked 2026-07-28 — repo `pushed_at` = **2026-03-24** and its last 5 closed PRs were all closed **unmerged** (maintainer isn't merging outside contributions). Human may consider closing #536 (left open pending decision). Added to `## Boilerplates` |
| [-] | [aniftyco/awesome-tailwindcss](https://github.com/aniftyco/awesome-tailwindcss) | ~~PR~~ **hand-submit only** | 15.1k★. CONTRIBUTING.md **bans AI-authored/assisted PRs** — closed on sight, submitter may be banned. Gabe must add it by hand (📁 "Full templates" entry, `UI libraries, components & templates` section) |
| [-] | [enaqx/awesome-react](https://github.com/enaqx/awesome-react) | — | 74k★, but **no section fits** a full SaaS boilerplate. Skipped to avoid a rejected PR |
| [~] | [birobirobiro/awesome-shadcn-ui](https://github.com/birobirobiro/awesome-shadcn-ui) | PR to README | 20.1k★. **Submitted 2026-07-17** → [PR #554](https://github.com/birobirobiro/awesome-shadcn-ui/pull/554), awaiting review. Added to `## Boilerplates / Templates` |
| [ ] | [bytefer/awesome-nextjs](https://github.com/bytefer/awesome-nextjs) | PR to README | 68★ — low reach, but trivial |
| [~] | [xcomptek/awesome-saas-boilerplates](https://github.com/xcomptek/awesome-saas-boilerplates) | PR to README → `## Next.js` | **3.1k★**. **Submitted 2026-07-29** → [PR #222](https://github.com/xcomptek/awesome-saas-boilerplates/pull/222) — inserted alphabetically between LaunchFa.st & Mkdirs, clean 1-line diff. No CONTRIBUTING, no AI-PR ban. Fork: `bucabay/awesome-saas-boilerplates` |
| [~] | [EinGuterWaran/awesome-opensource-boilerplates](https://github.com/EinGuterWaran/awesome-opensource-boilerplates) | PR to README → `### React & Next.js` | **1.9k★**. **Submitted 2026-07-29** → [PR #52](https://github.com/EinGuterWaran/awesome-opensource-boilerplates/pull/52) — appended after "Platforms Starter Kit", `- [Name](link) - desc` format. CC0-1.0, friendly `contributing.md` (no AI ban); requires OSS + ≤6mo (we qualify). Fork: `bucabay/awesome-opensource-boilerplates` |
| [x] | [bytefer/awesome-shadcn-ui](https://github.com/bytefer/awesome-shadcn-ui) | PR to README → `## Saas` table | **719★**. **Submitted 2026-07-29** → [PR #29](https://github.com/bytefer/awesome-shadcn-ui/pull/29). **✅ MERGED 2026-07-30 01:29 UTC → LIVE** at [bytefer/awesome-shadcn-ui (`## Saas` table)](https://github.com/bytefer/awesome-shadcn-ui#saas) — **our first live listing!** Row appended after "Next Money Stripe Starter", 3-col format. MIT, no CONTRIBUTING, no AI ban. Fork: `bucabay/awesome-shadcn-ui-1` (a prior `bucabay/awesome-shadcn-ui` already existed). **Different maintainer** from birobirobiro/awesome-shadcn-ui — not a dup |
| [~] | [merklefruit/SaaS4Devs](https://github.com/merklefruit/SaaS4Devs) | PR to README → `### Complete Full-stack Boilerplates` | **748★** · MIT · pushed 2026-02-17. **Submitted 2026-07-30** → [PR #54](https://github.com/merklefruit/SaaS4Devs/pull/54) — appended a `Name — Tech — Price` entry after "Nextless JS" (only Next.js 15 + shadcn/ui entry; "free & Open Source"). No CONTRIBUTING, no AI ban; Contributions says "Feel free to send PRs here on GitHub too." ⚠️ Repo marked "no longer being maintained" **but still merges outside PRs** (#36 x402, #34 ShipLegal merged 2026-02; #31 2024-09; steady outside-PR stream since 2021) → actionable on merge evidence. Fork: `bucabay/SaaS4Devs` |
| [ ] ⚠️ FLAG | [officialrajdeepsingh/awesome-nextjs](https://github.com/officialrajdeepsingh/awesome-nextjs) | ~~PR~~ **MANUAL / human-decision** | **707★** · MIT · pushed 2026-07-26 (near-daily), no AI ban, merges external PRs daily (Kostra #80 07-18; starter #84 07-26). **⚠️ CRITERIA NOT MET — do NOT auto-submit:** CONTRIBUTING "What we look for: **at least 100 stars**" + "What we do not accept: **new or unreleased projects**"; mailkite/saas-startup is **0★, created 2026-07-15** (fails both). Escape clause ("if unique, you may still submit a PR for review") ⇒ Gabe pitches the self-contained-auth uniqueness **by hand**, ideally once stars grow. Paste entry ↓ (manual) |
| [ ] ⚠️ FLAG | [lyqht/awesome-supabase](https://github.com/lyqht/awesome-supabase) | PR to README → `## Community Starters` (append to bottom) | **478★** · CC0-1.0 · pushed 2026-07-19 · no AI ban · perfect-fit section (analogous entries: Basejump, Supastarter, Supanext, SupaSasS Lite) · CONTRIBUTING requires `npx awesome-lint` clean. **⚠️ FLAG — human decision, do NOT auto-submit:** ~8 of last ~12 closed PRs closed-unmerged, incl. **PR #51 "Add Next.js + Supabase SaaS Starter to Community Starters" (our exact category) closed unmerged** — maintainer is highly selective (merges guides/fixes, rejects most add-my-starter PRs). Researched 2026-07-29 13:17 — re-try only with a human-reviewed pitch. (Note: leads with Supabase-Postgres, not the "no Supabase account" angle, to fit this list.) |
| [ ] | GitHub topics | repo settings | ✅ **done** — `nextjs`, `nextjs15`, `saas-starter`, `saas-boilerplate`, `template`, … |

### Tier 1 — ready-to-paste entries (auto-researched 2026-07-27, re-verified 2026-07-29 13:17 UTC)

**GH_TOKEN fixed 2026-07-29 17:17 UTC** (login `bucabay`, scopes incl. `repo`/`workflow`) —
ending the 6-run / 10-day block. **3 of the 4 staged venues were submitted this run** (cap ≤3 PRs):
xcomptek → #222, EinGuterWaran → #52, bytefer → #29 (see table above). The 4th,
**officialrajdeepsingh, is MANUAL** (fails its ≥100★ + "no new projects" criteria — our repo is
0★ / 2 weeks old). Paste-ready text below is retained for reference / amending the open PRs.

**✅ SUBMITTED 2026-07-29 → [PR #222](https://github.com/xcomptek/awesome-saas-boilerplates/pull/222)** · xcomptek/awesome-saas-boilerplates · `## Next.js` (inserted alphabetically between
`LaunchFa.st` and `Mkdirs`):

```md
- MailKite SaaS Starter - **Open Source** Next.js 15 SaaS starter with self-contained auth (Google/GitHub OAuth + email/password, no auth vendor), Stripe subscriptions, teams, Postgres/Drizzle, shadcn/ui, dark-first UI [https://github.com/mailkite/saas-startup](https://github.com/mailkite/saas-startup) [![Stars](https://img.shields.io/github/stars/mailkite/saas-startup.svg)](https://github.com/mailkite/saas-startup)
```

**✅ SUBMITTED 2026-07-29 → [PR #52](https://github.com/EinGuterWaran/awesome-opensource-boilerplates/pull/52)** · EinGuterWaran/awesome-opensource-boilerplates · `### React & Next.js` (appended; their
format is `- [Name](link) - what makes it unique`):

```md
- [MailKite SaaS Starter](https://github.com/mailkite/saas-startup) - Next.js 15 SaaS starter with self-contained auth (Google/GitHub OAuth + email/password — no Clerk/Auth0/Supabase account needed), Stripe subscriptions, teams, Postgres/Drizzle, and a dark-first shadcn/ui dashboard.
```

**✅ SUBMITTED 2026-07-29 → [PR #29](https://github.com/bytefer/awesome-shadcn-ui/pull/29)** · bytefer/awesome-shadcn-ui · `## Saas` table (appended a row, 3-column format):

```md
| MailKite SaaS Starter | Production-ready Next.js 15 SaaS starter: self-contained auth (Google/GitHub OAuth + email/password, no auth vendor), Stripe subscriptions, teams, Postgres/Drizzle, dark-first shadcn/ui. | https://github.com/mailkite/saas-startup |
```

**⚠️ MANUAL — criteria not met (≥100★ required; we're 0★)** · officialrajdeepsingh/awesome-nextjs · `## Next.js boilerplate` (append at the **end** of
the section; recent additions like Kostra are appended, not alphabetized):

```md
- [MailKite SaaS Starter](https://github.com/mailkite/saas-startup) - Production-ready Next.js 15 SaaS starter with self-contained auth (Google/GitHub OAuth + email/password — no auth vendor), Stripe subscriptions, teams, Postgres/Drizzle, and a dark-first shadcn/ui dashboard.
```

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

## Assets for any submission

- **Repo**: <https://github.com/mailkite/saas-startup> (public, MIT)
- **Demo**: <https://saas-startup.mailkite.dev>
- **One-liner**: Production-ready Next.js 15 SaaS starter — self-contained auth (Google/GitHub OAuth + email/password, no auth vendor), Stripe subscriptions, teams, Postgres/Drizzle, dark-first UI.
- **Why it's different**: auth runs in your app, not a hosted service. No Clerk/Auth0/Supabase account needed — clone, add your own OAuth app, ship.
- **Social preview**: `apps/web/app/opengraph-image.png` (1200×630)
