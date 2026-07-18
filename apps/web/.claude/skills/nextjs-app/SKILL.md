---
name: nextjs-app
description: >-
  How this repo does Next.js 15 App Router — adding a page or route, wiring a
  server action, adding a route handler under app/api, reading the session in a
  server component, and protecting routes via middleware. Use when adding or
  changing anything under app/, writing a form + server action (the contact
  example), a layout, or a route group.
version: 1.0.0
author: saas-startup
tags:
  - nextjs
  - app-router
  - server-actions
  - route-handlers
  - rsc
---

# nextjs-app

Next.js 15 App Router conventions in this repo: routes, pages, layouts, server actions, and route handlers.

## When to use

- Adding a page or route (new URL segment under `app/`).
- Writing a client form backed by a server action (follow the `contact` example).
- Adding a route handler under `app/api/*/route.ts` (JSON endpoints for client fetching).
- Adding or nesting a layout, or reaching for a route group `(name)` to share a layout without adding a URL segment.
- Reading the session / current user in a Server Component.
- Protecting a route (middleware) — or deciding you don't need to.

Next.js 15, React 19, RSC by default. Dev runs `next dev --turbopack` on port 3000 (`npm run dev`).

## Where it lives in this repo

| Path | What it is |
| --- | --- |
| `app/layout.tsx` | Root layout (html/body, fonts, global metadata). |
| `app/(dashboard)/` | Route group for public + dashboard pages. `(dashboard)/page.tsx` is `/` (home), `(dashboard)/dashboard/page.tsx` is `/dashboard`. Group name is **not** in the URL. |
| `app/(login)/` | Route group for `/sign-in`, `/sign-up`; auth server actions in `app/(login)/actions.ts`. |
| `app/api/*/route.ts` | Route handlers, e.g. `app/api/user/route.ts`, `app/api/team/route.ts`. |
| `app/docs/` | Docs site under `/docs` with its own `layout.tsx`. |
| `app/(dashboard)/contact/` | Reference page: `page.tsx` (RSC) + `contact-form.tsx` (`'use client'`) + `actions.ts` (`'use server'`). |
| `lib/server-actions.ts` | `validatedAction` / `validatedActionWithUser` wrappers + `ActionState` type. |
| `lib/auth/middleware.ts` | Team-scoped session helper (`getTeamForSession`). |
| `lib/db/queries.ts` | `getUser()`, `getTeamForUser()` — data access for Server Components/handlers. |
| `middleware.ts` | Edge middleware; wires `createAuthMiddleware` to protect `/dashboard`. |
| `next.config.ts` | `NextConfig`; `experimental.clientSegmentCache` on. |

Path alias: `@/*` maps to the package root (`tsconfig.json`), so import `@/lib/...`, `@/components/...`.

## How to add a page in a route group

Pages are Server Components by default — no `'use client'`. Export `metadata` for title/description. A page in `(dashboard)/foo/page.tsx` is served at `/foo` (the group is invisible in the URL) and inherits `(dashboard)/layout.tsx`.

```tsx
// app/(dashboard)/foo/page.tsx
// Docs: docs/features/foo.md
export const metadata = {
  title: 'Foo',
  description: 'What this page is for.',
};

export default function FooPage() {
  return <main className="flex-1">...</main>;
}
```

## How to add a client form + server action (the contact pattern)

Three files, one purpose each. This is the canonical mutation pattern — prefer it over an ad-hoc API route.

1. **`actions.ts`** — `'use server'`, a Zod schema, and `validatedAction` from `@/lib/server-actions`. Return `{ error }` or `{ success }` (an `ActionState`); spread `...data` on error so the form can repopulate.

```ts
// app/(dashboard)/foo/actions.ts
// Docs: docs/features/foo.md
'use server';

import { z } from 'zod';
import { validatedAction } from '@/lib/server-actions';

const schema = z.object({
  name: z.string().min(1, 'Please enter your name').max(100),
});

export const submitFoo = validatedAction(schema, async (data) => {
  // ...do the work (db write, sendEmail, etc.)
  if (badThing) return { error: 'Something went wrong.', ...data };
  return { success: 'Done.' };
});
```

`validatedAction(schema, fn)` returns a `(prevState, formData) => ...` — the exact signature `useActionState` wants. It `safeParse`s `Object.fromEntries(formData)` and short-circuits with `{ error: firstIssue.message }` on invalid input, so **the action body only runs on valid data**. Need the authenticated user? Use `validatedActionWithUser` instead — it loads `getUser()`, throws if unauthenticated, and passes `user` as the third arg.

2. **`contact-form.tsx`** — `'use client'`, driven by `useActionState`. Bind `formAction` to `<form action=...>`; name every field to match the schema keys.

```tsx
// app/(dashboard)/foo/foo-form.tsx
// Docs: docs/features/foo.md
'use client';

import { useActionState } from 'react';
import { submitFoo } from './actions';
import { ActionState } from '@/lib/server-actions';

export function FooForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    submitFoo,
    { error: '' },
  );
  if (state.success) return <p>{state.success}</p>;
  return (
    <form action={formAction}>
      <input name="name" defaultValue={state.name} required />
      {state.error && <span>{state.error}</span>}
      <button type="submit" disabled={pending}>Send</button>
    </form>
  );
}
```

3. **`page.tsx`** — a Server Component that renders the client form. See `app/(dashboard)/contact/` for the full, styled version (select field, escaping, MailKite delivery).

## How to add an API route handler

Only when you need a fetchable JSON endpoint (e.g. SWR polling from a client component, like `/api/team` + `/api/user` feeding the dashboard). Export an HTTP-verb function from `route.ts` and return `Response.json(...)`. Keep data access in `lib/db/queries.ts`.

```ts
// app/api/foo/route.ts
// Docs: docs/features/foo.md
import { getUser } from '@/lib/db/queries';

export async function GET() {
  const user = await getUser();
  return Response.json(user);
}
```

## How to read the session in a Server Component

Call the query helpers directly — they read the session cookie server-side. No `useSWR`, no fetch. (Client components fetch `/api/user` etc. instead, because they can't touch the cookie.)

```tsx
import { getUser } from '@/lib/db/queries';

export default async function Page() {
  const user = await getUser(); // User | null
  if (!user) redirect('/sign-in');
  return <p>Hi {user.name}</p>;
}
```

For team scope in a mutation, `validatedActionWithUser` gives you the `user`; `lib/auth/middleware.ts`'s `getTeamForSession()` resolves the team.

## How to protect a route via middleware

`middleware.ts` already guards everything under `/dashboard` and redirects to `/sign-in`:

```ts
export default createAuthMiddleware({
  protectedRoutes: ['/dashboard'],
  loginUrl: '/sign-in',
});
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

To protect a new area, add its path prefix to `protectedRoutes`. The `matcher` excludes `api`, `_next`, and static assets. For per-request checks (owner-only actions, etc.), gate inside the server action/handler with the loaded `user`, not middleware.

## Conventions (settled — don't relitigate)

- **RSC-first.** Add `'use client'` only when you need hooks/events (`useActionState`, `useState`, `onClick`). Pages and layouts stay server by default.
- **Server actions over ad-hoc API routes for mutations.** Route handlers are for read/fetch endpoints (SWR), not form writes.
- **Always validate inputs** with Zod through `validatedAction` / `validatedActionWithUser`. Never trust raw `FormData`.
- **`@/` imports**, never long `../../..` chains.
- **One file, one purpose** — page / client form / action stay in separate files, colocated in the route folder.
- **Link the doc at the top of every file**: `// Docs: docs/...`.

## Before you call it done

- `npm run build` and `npm run lint` are clean.
- No `any` without a written justification (the `ActionState` index signature is the one blessed exception).
- Field `name`s match the Zod schema keys exactly.
- Client components never read cookies/db directly — they fetch a route handler.
- The `// Docs:` comment is present and the referenced doc exists/updated.

## Related

- `saas-ui` — components, design tokens, and the shadcn/Tailwind styling used in these pages.
- `mailkite-provider` — `sendEmail` / auth helpers the contact action and session helpers call.
- `stripe-provider` — payments actions (`customerPortalAction`) surfaced on the dashboard.
- `supabase-provider` — Drizzle + Postgres behind `lib/db/queries.ts`.
- `saas-research` — where to record options and decisions.

After adding a feature, document it in `docs/features/<feature>.md`, link it at the top of new files (`// Docs: …`), record any options/decisions in `docs/research/`, and log the session in `docs/worklog/`. See the root `AGENTS.md`.
