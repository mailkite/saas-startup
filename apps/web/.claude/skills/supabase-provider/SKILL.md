---
name: supabase-provider
description: The database provider for this repo — Postgres on Supabase, accessed through Drizzle ORM. Use for anything touching the database: adding a table to the schema, generating and applying a migration, writing a typed query, connecting Supabase (pooler vs direct URL), seeding local data, or guarding user paths against an unconfigured DB. Triggers: "database", "Postgres", "Supabase", "Drizzle", "schema", "migration", "query", "POSTGRES_URL", "drizzle-kit", "isDbConfigured", "seed".
version: 1.0.0
author: saas-startup
tags:
  - database
  - postgres
  - supabase
  - drizzle
  - migrations
  - orm
---

# supabase-provider — Postgres on Supabase via Drizzle in this repo

How data is stored here: Postgres (Supabase in production, or Neon / Vercel Postgres / local Docker — all speak the same wire protocol) reached through Drizzle ORM. One env var, `POSTGRES_URL`, points the app and the migration tooling at the database. Schema is code in `lib/db/schema.ts`; you never write SQL by hand.

## When to use

- Adding, changing, or dropping a table/column — anything in `lib/db/schema.ts`.
- Generating a migration and applying it (`db:generate` → `db:migrate`).
- Writing a query — add a typed function to `lib/db/queries.ts`, don't inline SQL in a component.
- Wiring up Supabase (or Neon/local) — picking the pooler vs direct connection string.
- Guarding a user-facing page/route against a missing DB config with `isDbConfigured()`.
- Seeding local dev data.

## Where it lives in this repo

| Path | What it is |
| --- | --- |
| `lib/db/drizzle.ts` | Builds a `postgres-js` Drizzle client from `process.env.POSTGRES_URL`. Exports `getDb()`, a lazy `db` proxy, and `isDbConfigured()`. Throws `No database configured. Set POSTGRES_URL.` if unset. |
| `lib/db/schema.ts` | The schema: `users`, `teams`, `teamMembers`, `activityLogs`, `invitations`, their `relations()`, inferred `$inferSelect`/`$inferInsert` types, and the `ActivityType` enum. Source of truth for migrations. |
| `lib/db/queries.ts` | Typed query functions (`getUser`, `getTeamForUser`, `getActivityLogs`, …). Import `db` and table objects here. |
| `lib/db/migrations/` | Generated SQL migrations (`out` dir). Drizzle-kit writes these — don't hand-edit. |
| `lib/db/setup.ts` | Interactive `db:setup` — prompts for local Docker Postgres or a remote URL, then writes `.env`. |
| `lib/db/seed.ts` | `db:seed` — inserts a test user/team and creates Stripe products. |
| `drizzle.config.ts` | drizzle-kit config: `dialect: 'postgresql'`, `schema: './lib/db/schema.ts'`, `out: './lib/db/migrations'`, `url` from `POSTGRES_URL`. |
| `.env.example` | `POSTGRES_URL=postgresql://***` (Neon / Supabase / Vercel Postgres). |

Scripts (`package.json`): `db:generate` (drizzle-kit generate), `db:migrate`, `db:setup`, `db:seed`, `db:studio`, plus `db:generate:sqlite` / `db:migrate:sqlite` variants that use `drizzle.config.sqlite.ts`.

## How to add a table + generate & apply a migration

1. Add the table to `lib/db/schema.ts`, following the existing style (serial PK, `notNull()`, `references()`, `defaultNow()`), and export inferred types:

```ts
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  name: varchar('name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
```

2. Generate the SQL migration from the diff, then apply it:

```bash
npm run db:generate   # writes lib/db/migrations/NNNN_*.sql
npm run db:migrate     # applies pending migrations to POSTGRES_URL
```

Both read `POSTGRES_URL` — run migrations against the **direct** connection (see below), not the pooler. Commit the generated `.sql` file alongside the schema change.

## How to write a typed query

Add a function to `lib/db/queries.ts` — import `db` and the table objects; never build raw SQL in a component or route:

```ts
import { and, eq } from 'drizzle-orm';
import { db } from './drizzle';
import { projects } from './schema';

export async function getProjectsForTeam(teamId: number) {
  return db.select().from(projects).where(eq(projects.teamId, teamId));
}
```

Relational reads use `db.query.<table>.findFirst({ with: … })` (see `getTeamForUser`). Where a DB hiccup must not 500 a page render, wrap in the local `safeDb()` fallback pattern already used in `getUser`.

## How to guard a user-facing path

Reaching `db` when `POSTGRES_URL` is unset **throws**, which Next.js surfaces as an opaque "server-side exception" digest page. On any user-facing page/route, check `isDbConfigured()` first and render a readable state:

```ts
import { isDbConfigured } from '@/lib/db/drizzle';

if (!isDbConfigured()) {
  // Show a "database not configured" message instead of a 500 digest.
  return <SetupNotice />;
}
```

## How to connect Supabase (pooler vs direct)

Set one `POSTGRES_URL` in `.env`. Supabase gives you two connection strings — use the right one for the job:

- **Pooler (Supavisor, port `6543`)** — for the running app on serverless/edge (Vercel functions). Transaction-mode pooling survives many short-lived connections. Append `?pgbouncer=true`:
  ```
  POSTGRES_URL=postgresql://postgres.<ref>:<pw>@aws-0-<region>.pooler.supabase.com:6543/postgres?pgbouncer=true
  ```
- **Direct (port `5432`)** — for `db:generate`/`db:migrate` and `db:studio`. drizzle-kit needs a real session, not a transaction pooler:
  ```
  postgresql://postgres.<ref>:<pw>@aws-0-<region>.pooler.supabase.com:5432/postgres
  ```

Find both under **Project Settings → Database → Connection string** in the Supabase dashboard (toggle the connection-pooling mode). A common setup is `POSTGRES_URL` = pooler for the app, and a temporary direct URL exported when running migrations.

## How to seed local data

```bash
npm run db:setup   # optional: interactive — local Docker Postgres or remote URL, writes .env
npm run db:seed    # inserts test@test.com / admin123 + a Test Team, creates Stripe products
```

`db:setup` local mode spins up `postgres:16.4-alpine` on `localhost:54322` via docker-compose. Note `db:seed` also touches Stripe, so it expects `STRIPE_SECRET_KEY` set.

## Supabase specifics

- **Pooler vs direct, again:** app → `6543` + `?pgbouncer=true`; migrations/studio → `5432`. Getting this wrong shows up as migrations hanging or prepared-statement errors under the pooler.
- **Where the URL lives:** Supabase dashboard → Project Settings → Database → Connection string.
- **RLS is optional here.** This app connects with a privileged (service-role-equivalent) Postgres user via `POSTGRES_URL` and does **all** auth/authorization in app code (session checks in `queries.ts`, team scoping in queries). It does not rely on Supabase Row Level Security. Don't assume RLS is protecting anything — if you want defense-in-depth you'd have to design and enable policies yourself, and they'd apply to this connection too. As-is, query scoping (`where teamId = …`, `isNull(deletedAt)`) is the only guard.
- **Neon / Vercel Postgres are drop-in.** Same `postgresql://` URL, same Drizzle client, no code change. See the `neon` and `neon-postgres` skills for Neon-specific branching and serverless-driver details.

## Conventions (settled — don't relitigate)

- **Never echo `POSTGRES_URL` or any credential** into output, logs, or committed files. It embeds the DB password. See the root `AGENTS.md` (Secrets rule).
- **Migrations are generated, not hand-written.** Change `schema.ts`, run `db:generate`, commit the emitted SQL. Don't edit files under `lib/db/migrations/`.
- **Queries live in `queries.ts`.** No ad-hoc SQL or inline Drizzle calls in components/routes — add a typed function and import it.
- **Guard user paths with `isDbConfigured()`** so a missing DB is a readable message, not a 500 digest.
- **Run migrations on the direct (5432) connection**, not the pooler.

## Before you call it done

- [ ] Schema change has a matching generated migration, committed (`db:generate`).
- [ ] Migration applied cleanly (`db:migrate`) against the direct connection.
- [ ] User-facing paths that read the DB check `isDbConfigured()` first.
- [ ] No credential / `POSTGRES_URL` value leaked into code, logs, or docs.
- [ ] `npm run build` is clean.

## Related

- `neon` — Neon platform overview; drop-in Postgres alternative to Supabase for this same `POSTGRES_URL`.
- `neon-postgres` — Neon Postgres specifics (branching, serverless driver) if you host there instead.
- `nextjs-app` — RSC/route structure that calls these queries; where `isDbConfigured()` guards mount.
- `stripe-provider` — reads/writes the Stripe columns on `teams`; `db:seed` creates Stripe products.
- `mailkite-provider` — auth/session layer that `queries.ts` verifies before touching the DB.
- `saas-ui` — the UI rendering the data behind these queries.
- `saas-research` — check what's already decided before adding a new DB dependency or pattern.

Document new data models/features in `docs/features/<feature>.md`, link the doc at the top of schema/query files, and log the session in `docs/worklog/`. See the root `AGENTS.md` (Secrets rule).
