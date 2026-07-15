# @mailkite/auth

Shared authentication package for MailKite Next.js templates.

## Providers

| Provider | Default | Config |
|----------|---------|--------|
| Email/password | Always enabled | — |
| Google OAuth | Opt-in | `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` |
| GitHub OAuth | Opt-in | `GITHUB_CLIENT_ID` + `GITHUB_CLIENT_SECRET` |
| Magic link | Opt-in | `MAILKITE_MAGIC_LINK=true` |

## Usage

### Client-side (Server Actions, API Routes)

```ts
import { signInWithEmail, signUpWithEmail, setSessionCookie } from '@mailkite/auth';

// Sign in
const result = await signInWithEmail(email, password);
if (result.jwt) {
  await setSessionCookie(result.jwt);
}
```

### Middleware

```ts
// middleware.ts
import { createAuthMiddleware } from '@mailkite/auth';

export default createAuthMiddleware({
  protectedRoutes: ['/dashboard'],
  loginUrl: '/sign-in',
});
```

### OAuth

```ts
import { getGoogleAuthUrl, handleGoogleCallback } from '@mailkite/auth';

// Start OAuth flow (client-side)
window.location.href = getGoogleAuthUrl('/dashboard');

// Handle callback (Server Action or API route)
const result = await handleGoogleCallback(code, redirectUri);
if (result.jwt) {
  await setSessionCookie(result.jwt);
}
```

## Environment Variables

```env
MAILKITE_API_URL=https://api.mailkite.dev
AUTH_SECRET=              # openssl rand -base64 32
MAILKITE_SESSION_COOKIE=mk_session  # optional, defaults to mk_session
BASE_URL=http://localhost:3000

# OAuth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Magic link (optional)
MAILKITE_MAGIC_LINK=false
```
