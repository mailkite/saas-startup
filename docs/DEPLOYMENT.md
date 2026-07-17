# Deployment

## Vercel project

This repo deploys to a **single** Vercel project: **`web`**, which owns the
production domain **https://saas-startup.mailkite.dev** and all production env
vars (database, Stripe, OAuth, MailKite).

The repo is linked to it via `.vercel/project.json` (`projectName: "web"`).
Deploy with:

```bash
vercel --prod        # production (saas-startup.mailkite.dev)
vercel               # preview
```

> **One project only.** A second, orphaned project named `saas-startup` used to
> exist (no custom domain, `*.vercel.app` URLs only). If it's still present,
> remove it so there's a single source of truth:
>
> ```bash
> vercel project rm saas-startup
> ```

## Email configuration (MailKite)

All app email — the sign-up welcome email and the `/contact` form — is sent
through MailKite via `lib/mailkite-auth/email.ts`.

| Env var            | Required | Purpose |
| ------------------ | -------- | ------- |
| `MAILKITE_API_KEY` | yes      | Auth token from mailkite.dev → API Keys. |
| `MAILKITE_FROM`    | yes\*    | Default sender for all app email. |
| `CONTACT_EMAIL`    | for form | Inbox that `/contact` submissions are delivered to. |
| `CONTACT_FROM`     | no       | Overrides `MAILKITE_FROM` for the contact form only. |

\* Falls back to `noreply@mailkite.dev`, which only works if your key can send
from `mailkite.dev`.

### ⚠️ Domain-scoped keys (common 403)

A MailKite API key is often **scoped to a single verified domain**. When it is,
the `from` address **must be on that domain**, or the send fails with:

```
HTTP 403 — {"error":"this key can only send from its scoped domain","code":"key_scope"}
```

The failure surfaces to the user as a generic "Something went wrong" on the
form; the real cause is logged server-side (`[mailkite] send failed: HTTP 403 …`
— visible via `vercel logs <url>`).

**Fix:** set `MAILKITE_FROM` (and/or `CONTACT_FROM`) to an address on the key's
scoped domain. For this deployment the key is scoped to `nextjs.mailn.app`, so:

```
MAILKITE_FROM=noreply@nextjs.mailn.app
```

To use a different sending domain, add + verify it in the MailKite dashboard (or
`mailkite_create_domain`), mint a key scoped to it (dashboard → API Keys), set
`MAILKITE_API_KEY` and `MAILKITE_FROM` accordingly, then redeploy.

## Contact form

- Route: `app/(dashboard)/contact/` — `page.tsx`, `contact-form.tsx`, `actions.ts`.
- Fields: name, email, inquiry type (select), message.
- Delivery: emails `CONTACT_EMAIL`; the visitor's address is set as `replyTo`
  so you can reply directly.
- Nav links live in `components/SiteHeader.tsx` and `components/Footer.tsx`.
