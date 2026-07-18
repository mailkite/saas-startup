---
name: mailkite-provider
description: >-
  Sessions, config, route-guarding middleware, and MailKite transactional email
  as wired into this repo (auth itself — email/password + OAuth — runs against the
  local DB in lib/auth). Use whenever a task touches "auth", "session", "sign
  in/up", "send email", "transactional email", "welcome email", "OAuth", "magic
  link", or "MailKite": reading the current user in a server component, guarding a
  route, sending mail from a server action, or wiring a social login provider.
version: 1.0.0
author: saas-startup
tags:
  - auth
  - session
  - email
  - oauth
  - mailkite
  - middleware
---

# MailKite provider

Sessions + config + middleware + MailKite transactional email for this app. Auth (email/password, Google/GitHub OAuth) lives in `lib/auth` and runs against our own database.

## When to use

Reach for this skill when you are:

- Reading the signed-in user in a server component, route handler, or server action.
- Adding or changing a protected route.
- Sending transactional mail (welcome, receipts, notifications) from server code.
- Turning on a social login provider or magic-link sign-in via env.
- Debugging a stale session, a rejected OAuth redirect, or a `403 key_scope` on send.

If the task is "verify a domain / set up DNS / actually deliver a test email", that is operational — jump to **Operate & test it with agent tooling** below.

## Where it lives in this repo

| Concern | File / export |
| --- | --- |
| Public API surface | `lib/mailkite-auth/index.ts` |
| Config (apiUrl, cookie name, provider flags) | `lib/mailkite-auth/config.ts` — `getAuthConfig`, `getJwtSecret`, `getBaseUrl` |
| Session JWTs + cookie | `lib/mailkite-auth/session.ts` — `signSession`, `verifySession`, `setSessionCookie`, `getSession`, `clearSession`, `refreshSession` |
| Route guard middleware | `lib/mailkite-auth/middleware.ts` — `createAuthMiddleware` |
| MailKite email | `lib/mailkite-auth/email.ts` — `sendEmail`, `sendWelcomeEmail`, `isMailkiteEmailConfigured` |
| Email/password against local DB | `lib/auth/local.ts` — `signInWithEmail`, `signUpWithEmail`, `issueSession` |
| Password hashing (PBKDF2/WebCrypto) | `lib/auth/password.ts` — `hashPassword`, `verifyPassword` |
| OAuth authorize-URL builders | `lib/auth/oauth/urls.ts` — `getGoogleAuthUrl`, `getGitHubAuthUrl`; callbacks in `app/auth/<provider>/callback` |
| Middleware wiring | `middleware.ts` (repo root) — guards `/dashboard`, login at `/sign-in` |
| Session → DB user helper | `lib/db/queries.ts` — `getUser()` |
| Login server actions | `app/(login)/actions.ts` |
| Env template | `.env.example` |

## How to send a transactional email

`sendEmail` POSTs to `${MAILKITE_API_URL}/v1/send` with the `MAILKITE_API_KEY` bearer. It never throws — it returns `{ ok, error? }` and logs the real status/body server-side.

```ts
import { sendEmail } from '@/lib/mailkite-auth';

const res = await sendEmail({
  to: user.email,
  subject: 'Your export is ready',
  html: '<p>Download it from your dashboard.</p>',
  text: 'Download it from your dashboard.', // recommended: multipart improves deliverability
  // from / replyTo optional — default `from` is MAILKITE_FROM (falls back to noreply@mailkite.dev)
});
if (!res.ok) {
  // res.error is the raw "HTTP 403: ..." — keep it in logs, show the user something generic
}
```

`sendWelcomeEmail(to)` is the canned greeting used on sign-up. It short-circuits to `{ ok: true }` when MailKite isn't configured, so it is safe to call unconditionally.

## How to read the current session in a server component

Two entry points depending on what you need:

```ts
// Just "is there a valid session, and whose?" — no DB hit.
import { getSession } from '@/lib/mailkite-auth';
const session = await getSession(); // { jwt, userId } | null

// The full DB user record (most pages want this).
import { getUser } from '@/lib/db/queries';
const user = await getUser(); // User | null — verifies the cookie, then loads the row
```

`getSession` reads the `mk_session` cookie, verifies the JWT with `AUTH_SECRET`, and returns `null` on any failure (missing, tampered, expired, or after a secret rotation) — never throws.

## How to add a protected route

The root `middleware.ts` already mounts `createAuthMiddleware`. Add the path prefix to the guarded list:

```ts
// middleware.ts
import { createAuthMiddleware } from '@/lib/mailkite-auth';

export default createAuthMiddleware({
  protectedRoutes: ['/dashboard', '/settings'], // add prefixes here
  loginUrl: '/sign-in',
});
```

No matching session cookie on a protected prefix → redirect to `/sign-in?redirect=<path>`. On GET requests the middleware also refreshes a session that is within a day of expiry (7-day sliding window).

## How to wire an OAuth provider

OAuth is env-gated — no code change. A provider's buttons light up as soon as its client id is present (`config.providers.<name>.enabled`):

```bash
# .env.local
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
# or
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
```

`getGoogleAuthUrl` / `getGitHubAuthUrl` build the consent URL with `redirect_uri = ${getBaseUrl()}/auth/<provider>/callback`. That redirect must be registered verbatim in the provider console. In production `getBaseUrl()` uses `BASE_URL` or `VERCEL_PROJECT_PRODUCTION_URL` — set one, or the provider rejects the `redirect_uri`. Magic-link sign-in is a separate flag: `MAILKITE_MAGIC_LINK=true`.

## How to guard on isMailkiteEmailConfigured

On any user-facing path where a missing send would confuse the user, check first and degrade instead of pretending it worked:

```ts
import { isMailkiteEmailConfigured, sendEmail } from '@/lib/mailkite-auth';

if (!isMailkiteEmailConfigured()) {
  // No MAILKITE_API_KEY — skip (dev) or surface "email not configured", don't fake success.
  return { emailed: false };
}
await sendEmail({ to, subject, html });
```

`isMailkiteEmailConfigured()` is just `!!MAILKITE_API_KEY`. `sendWelcomeEmail` already guards internally; raw `sendEmail` does not.

## Operate & test it with agent tooling

Don't hand-roll domain/DNS/webhook setup or blind sends — this environment ships MailKite tooling:

- **`mailkite` skill** — end-to-end: create an account, add a sending/receiving domain, set DNS at the user's provider, register a webhook, design templates, send, and confirm inbound delivery.
- **`mailkite:send-test` skill** — fire a real test email from a verified domain (use this to prove `sendEmail` wiring works before shipping).
- **`mailkite:debug-webhook`** and **`mailkite:test-inbound`** — inspect webhook payloads and inbound routing.
- **MailKite MCP server** (`mcp__plugin_mailkite_mailkite__*`) — programmatic ops: `mailkite_send`, `mailkite_create_domain` / `mailkite_verify_domain`, `mailkite_set_webhook`, `mailkite_create_template`, and more.

Env for the app itself (see `.env.example`): `MAILKITE_API_URL` (default `https://api.mailkite.dev`), `AUTH_SECRET` (required — `openssl rand -base64 32`), plus `MAILKITE_API_KEY` and optional `MAILKITE_FROM` for outbound. Use the tooling above to obtain a verified domain and a scoped API key rather than guessing values.

## Conventions

- **Never echo secrets.** `AUTH_SECRET`, `MAILKITE_API_KEY`, and OAuth client secrets never go into logs, PR text, artifacts, or committed files — see the Secrets rule in the root `AGENTS.md`. `getMailkiteApiKey()` exists for internal calls, not for printing.
- **From/Reply-To hygiene.** A scoped `MAILKITE_API_KEY` only sends from its own domain — a mismatched `from` gets a `403 key_scope`. Keep the default `from` on the verified domain; set a real `replyTo` when a human should be able to reply.
- **Guard before user-path sends.** Check `isMailkiteEmailConfigured()` (or lean on `sendWelcomeEmail`'s built-in guard) so a missing key degrades gracefully instead of throwing on a user action.
- **Best-effort email, never fatal.** A failed send must not fail the surrounding action (sign-up sends the welcome email inside its own try/catch). Return `{ ok: false }` and log; don't bubble.
- **Sessions are HS256 JWTs.** Rotating `AUTH_SECRET` invalidates every live session by design — `verifySession` throws and callers treat it as signed-out.

## Before you call it done

- `getSession` / `getUser` return `null` cleanly on a bad or expired cookie — no 500s.
- Any new `sendEmail` caller handles `{ ok: false }` and doesn't leak `res.error` to the user.
- New user-path sends are gated on `isMailkiteEmailConfigured()`.
- New protected prefixes are in `middleware.ts`'s `protectedRoutes`.
- A new OAuth provider's `redirect_uri` matches the provider console and `getBaseUrl()` resolves correctly in the target env.
- You proved a real send with `mailkite:send-test` or the MCP `mailkite_send`, not just a green unit test.
- No secret landed in a log line, artifact, or commit.

## Related

- `saas-ui` — sign-in/up forms and the buttons these flows render.
- `nextjs-app` — server components, route handlers, and middleware conventions.
- `stripe-provider` — billing; welcome/receipt emails often ride alongside checkout.
- `supabase-provider` — the alternate data/auth backend if you're not on the local DB.
- `saas-research` — background on the starter's architecture and decisions.

Document new auth/email features in `docs/features/<feature>.md`, link the doc at the top of touched files, and log the session in `docs/worklog/`. See the root `AGENTS.md` (esp. the Secrets rule).
