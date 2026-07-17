# Auth architecture

Everything here runs inside your Next.js app, against your own database. There is no
external auth service. The only outbound call is MailKite for sending email, and that is
optional — without `MAILKITE_API_KEY` the welcome mail is skipped, not failed.

## Why self-contained

An earlier revision delegated auth to a hosted API (`api.mailkite.dev`). That was removed
because it made the template unusable by anyone else:

- **It was single-tenant.** The API held exactly one GitHub and one Google OAuth app for
  every caller. A `code` issued for *your* OAuth app was redeemed with *its* client
  secret, which the provider always rejects. Cloning the template and registering your own
  OAuth app could never work.
- **Session identity didn't line up.** The API minted string ids (`usr_abc`); the local
  `users` table uses a `serial` primary key. `getUser()` did `Number(sessionData.userId)`,
  which is `NaN` for those ids, so a session never resolved to a local user.

Owning the flow fixes both, and means the only thing a new user configures is their own
OAuth app.

## The flows

### Email / password

`lib/auth/local.ts`

1. Sign-up hashes the password with PBKDF2-HMAC-SHA-256 (`lib/auth/password.ts`) and
   inserts `users` + `teams` + `team_members`.
2. Sign-in verifies the hash and mints a session JWT.
3. Both return a readable `{ error }` rather than throwing — an uncaught DB error renders
   Next's opaque "server-side exception … Digest" page.

Hashing uses **WebCrypto**, not bcrypt/argon2, so there is no native module to build. The
stored verifier is self-describing, so the cost can be raised later without a migration:

```
pbkdf2$<iterations>$<saltBase64>$<hashBase64>
```

Verification is constant-time. A `NULL` hash always fails, which is what makes an
OAuth-created account un-signable-into by password.

### OAuth (GitHub + Google)

`lib/auth/oauth/`, callbacks in `app/auth/<provider>/callback/route.ts`

1. The sign-in page renders a provider consent link (`oauth/urls.ts`).
2. The provider redirects back with a one-time `code`.
3. The callback exchanges it **server-side** using your client secret.
4. GitHub returns no ID token, so we read `/user` and `/user/emails` and take the verified
   primary address. Google returns an ID token, which we decode and check.
5. `oauth/account.ts` upserts the account by email and mints our session JWT.

Accounts are **email-keyed and provider-agnostic**: the same address on Google, GitHub and
email/password is one account, with `password_hash = NULL` when created via a provider.

## Security notes

These are deliberate, and worth preserving if you refactor:

- **`redirect_uri` must be absolute and identical in both steps.** The provider rejects a
  relative one, and the URI sent to `authorize` must byte-match the one sent during the
  code exchange. Both derive from `getBaseUrl()`.
- **`getBaseUrl()` must not fall back to localhost in production.** It prefers `BASE_URL`,
  then Vercel's `VERCEL_PROJECT_PRODUCTION_URL`. A localhost fallback silently produces a
  `redirect_uri` the provider refuses.
- **Google's `aud` is checked** against our client id. An ID token minted for a different
  client is not evidence about our user.
- **Google's `email_verified` is required.** Without it, someone could claim an address
  they don't control and be merged into an existing account.
- **`state` is only honoured when relative.** It is the post-sign-in destination and lands
  in `new URL(state, request.url)`; an absolute or protocol-relative value would be an
  open redirect.
- **The generic error is intentional.** The callbacks report "sign-in failed" while logging
  the real cause (`incorrect_client_credentials` / `bad_verification_code` /
  `redirect_uri_mismatch`). These routes are unauthenticated; the distinction is a
  diagnosis for you, not for a stranger.

## Sessions

`lib/mailkite-auth/session.ts`

A `jose` HS256 JWT in an httpOnly cookie (`mk_session`), signed with `AUTH_SECRET`, 7-day
expiry, refreshed by middleware when within a day of expiring. Rotating `AUTH_SECRET`
invalidates every existing session — `jwtVerify` *throws* on those, so every caller treats
a failed verify as "signed out" rather than letting it 500.

## Database

`POSTGRES_URL` is required. `getDb()` throws without it and `isDbConfigured()` lets
user-facing paths say so plainly instead of rendering a digest page.

```bash
cd apps/web && npx drizzle-kit migrate
```

`users.password_hash` is nullable by design (OAuth accounts), alongside `avatar_url` and
`email_verified` (migration `0001`).
