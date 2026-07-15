# MailKite Next.js Template — Implementation Plan

## Overview

Turborepo monorepo at `./nextjs/saas-startup/` containing:
- **apps/web** — SaaS product website (from `nextjs/saas-starter`)
- **apps/dashboard** — Admin panel (full `arhamkhnz/next-shadcn-admin-dashboard`)
- **packages/mailkite-auth** — Shared auth package (Google, GitHub, email/pass, optional magic link)

Auth is fully separated into its own package so both apps import it cleanly. The dashboard stays as close to upstream as possible (only 2 new files + 1 dep addition) to enable painless upstream pulls.

---

## Phase 1: Scaffold Turborepo Root

- [ ] Create root `package.json` with workspace scripts
- [ ] Create `pnpm-workspace.yaml`
- [ ] Create `turbo.json` with build/dev/lint pipelines
- [ ] Create root `tsconfig.json` (base config)
- [ ] Create root `.gitignore`
- [ ] Create `.env.example` at root
- [ ] Create `apps/` and `packages/` directories
- [ ] Init git repo, commit scaffold

---

## Phase 2: Set Up apps/web (Product Website)

- [ ] Clone `nextjs/saas-starter` into `apps/web/`
- [ ] Remove `.git` from cloned repo (we're in monorepo now)
- [ ] Update `apps/web/package.json` — rename to `@mailkite/web`, add workspace deps
- [ ] Keep all saas-starter pages: landing (`/`), pricing (`/pricing`), dashboard shell
- [ ] Keep Drizzle PG schema (`lib/db/schema.pg.ts`) — unchanged
- [ ] Keep Stripe integration (`lib/stripe.ts`) — unchanged
- [ ] Remove saas-starter's auth code (`lib/auth/`) — replaced by `@mailkite/auth`
- [ ] Create `lib/db/schema.sqlite.ts` — SQLite equivalent of PG schema
- [ ] Create `lib/db/index.ts` — conditional PG/SQLite connection factory
- [ ] Create `drizzle.config.sqlite.ts`
- [ ] Rewrite `app/(auth)/` pages — use `@mailkite/auth` client functions
- [ ] Add `middleware.ts` — use `@mailkite/auth` middleware factory
- [ ] Update `next.config.ts` if needed
- [ ] Commit

---

## Phase 3: Build packages/mailkite-auth (Shared Auth)

- [ ] Create `packages/mailkite-auth/package.json`
- [ ] Create `packages/mailkite-auth/tsconfig.json`
- [ ] Create `src/types.ts` — AuthConfig, User, Session, Provider types
- [ ] Create `src/config.ts` — auth configuration from env vars
- [ ] Create `src/client.ts` — MailKite API fetch wrappers
  - [ ] `signInWithEmail(email, password)`
  - [ ] `signUpWithEmail(email, password, name)`
  - [ ] `signInWithGoogle(returnUrl)`
  - [ ] `signInWithGitHub(returnUrl)`
  - [ ] `sendMagicLink(email)` (optional)
  - [ ] `verifyEmail(token)`
  - [ ] `requestPasswordReset(email)`
  - [ ] `resetPasswordConfirm(token, newPassword)`
  - [ ] `handleOAuthCallback(provider, code, state)`
- [ ] Create `src/session.ts` — JWT + cookie management
  - [ ] `setSessionCookie(jwt)`
  - [ ] `getSession()`
  - [ ] `clearSession()`
  - [ ] `refreshSession(jwt)`
- [ ] Create `src/middleware.ts` — Next.js middleware factory
  - [ ] `createAuthMiddleware(options)`
- [ ] Create `src/providers.ts` — OAuth URL builders
- [ ] Create `src/index.ts` — public API exports
- [ ] Build and verify package compiles
- [ ] Commit

---

## Phase 4: Set Up apps/dashboard (Admin Panel)

- [ ] Clone `arhamkhnz/next-shadcn-admin-dashboard` into `apps/dashboard/`
- [ ] Remove `.git` from cloned repo
- [ ] Update `apps/dashboard/package.json` — rename to `@mailkite/dashboard`, add `@mailkite/auth` dep
- [ ] Add `src/middleware.ts` — session check using `@mailkite/auth` (ONLY new file)
- [ ] Add `src/app/(main)/auth/login-form.tsx` — form wired to `@mailkite/auth` (ONLY new file)
- [ ] Keep ALL other files untouched from upstream
- [ ] Verify dashboard structure matches upstream exactly
- [ ] Commit

---

## Phase 5: Wire Everything Together

- [ ] Create root `.env.example` with all variables documented
- [ ] Verify `apps/web` imports from `@mailkite/auth` correctly
- [ ] Verify `apps/dashboard` imports from `@mailkite/auth` correctly
- [ ] Add cross-link navigation: web → dashboard, dashboard → web
- [ ] Verify DB schema files are correct (PG + SQLite)
- [ ] Test `turbo build` passes for all packages
- [ ] Test `turbo dev` starts both apps
- [ ] Commit

---

## Phase 6: Final Polish & Push

- [ ] Update root README with setup instructions
- [ ] Verify `.gitignore` covers all generated files
- [ ] Final `turbo build` verification
- [ ] Commit all changes
- [ ] Push to origin

---

## Architecture Decisions

### Auth Separation
- All auth logic lives in `packages/mailkite-auth/`
- Both apps import from this package — zero auth code in either app
- Dashboard upstream pulls only conflict on 2 new files (middleware + login form)

### Database Support
- PG schema unchanged from saas-starter (backward compatible)
- SQLite schema added as equivalent (for D1/Turso)
- Runtime connection factory based on env vars

### Dashboard Upstream Compatibility
- Dashboard is a near-exact copy of upstream
- Only additions: `middleware.ts`, `login-form.tsx`, `@mailkite/auth` dep
- Upstream pulls = git merge with minimal conflicts

### Provider Defaults
- Google: enabled (when env vars set)
- GitHub: enabled (when env vars set)
- Email/password: always enabled
- Magic link: opt-in via `MAILKITE_MAGIC_LINK=true`
