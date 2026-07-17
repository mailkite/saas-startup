<p align="center">
  <img src="apps/web/public/brand/logo.svg" alt="SaaS Starter" width="264" />
</p>

# Next.js SaaS Starter

The **Next.js SaaS Starter** is a production-ready template to launch your SaaS. It wires together **authentication** (self-contained, JWT sessions), **payments** (Stripe subscriptions and customer portal), **team management**, and a polished dark-first dashboard — so you can skip the boilerplate and ship your product.

**Auth runs entirely in your app.** There is no external auth service to sign up for: the OAuth code exchange, password hashing and session signing all happen in your own Next.js server, against your own database. The only outbound dependency is [MailKite](https://mailkite.dev) for sending email — and that's optional; without an API key the app simply skips the welcome mail.

- **Auth** — Email/password + Google and GitHub OAuth, self-contained. PBKDF2 hashing via WebCrypto (no native module), JWT sessions via `jose`
- **Payments** — Stripe Checkout, Customer Portal, webhooks, and subscription lifecycle
- **Team** — Invite members, manage permissions, shared workspace
- **UI** — Dark-first, animated backgrounds, gradient cards, light/dark toggle, color theme picker
- **DB** — PostgreSQL with Drizzle ORM (type-safe schema, migrations, seed scripts)

<br>

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmailkite%2Fsaas-startup&root-directory=apps%2Fweb&env=AUTH_SECRET,STRIPE_SECRET_KEY,STRIPE_WEBHOOK_SECRET&envDescription=Required%20environment%20variables&project-name=my-saas&repository-name=my-saas)

**[Live demo →](https://saas-startup.mailkite.dev)**

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| Auth | Self-contained — JWT sessions ([jose](https://github.com/panva/jose)), OAuth, PBKDF2 passwords |
| Email | [MailKite](https://mailkite.dev) — transactional send (optional) |
| Payments | [Stripe](https://stripe.com) — checkout, portal, webhooks |
| Database | [PostgreSQL](https://www.postgresql.org) + [Drizzle ORM](https://orm.drizzle.team) |
| UI | [Tailwind CSS v4](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com) |
| Platform | [Vercel](https://vercel.com) (deploys anywhere) |

## Quick Start

```bash
git clone https://github.com/mailkite/saas-startup
cd saas-startup
pnpm install
cp .env.example .env    # then fill in AUTH_SECRET, POSTGRES_URL, STRIPE_SECRET_KEY
cd apps/web
npx drizzle-kit migrate
pnpm run dev            # http://localhost:3000
```

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmailkite%2Fsaas-startup&root-directory=apps%2Fweb&env=AUTH_SECRET,STRIPE_SECRET_KEY,STRIPE_WEBHOOK_SECRET&envDescription=Required%20environment%20variables&project-name=my-saas&repository-name=my-saas)

## Env vars

| Variable | Required | Purpose |
|----------|----------|---------|
| `AUTH_SECRET` | Yes | JWT signing key — `openssl rand -base64 32`. Rotating it invalidates every session |
| `POSTGRES_URL` | Yes | PostgreSQL connection ([Neon](https://neon.tech), Supabase, or any Postgres) |
| `BASE_URL` | Prod | Public origin, e.g. `https://example.com`. OAuth `redirect_uri` is built from it; on Vercel it falls back to `VERCEL_PROJECT_PRODUCTION_URL` |
| `STRIPE_SECRET_KEY` | Yes | Stripe secret key (`sk_test_...`) |
| `STRIPE_WEBHOOK_SECRET` | Yes | Stripe webhook secret (`whsec_...`) |
| `MAILKITE_API_KEY` | No | Sends the welcome email. Omit and email is skipped, not failed |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google OAuth — enables the button (build-time inlined) |
| `GOOGLE_CLIENT_SECRET` | No | Google OAuth — required for the code exchange |
| `NEXT_PUBLIC_GITHUB_CLIENT_ID` | No | GitHub OAuth — enables the button (build-time inlined) |
| `GITHUB_CLIENT_SECRET` | No | GitHub OAuth — required for the code exchange |

Register these callback URLs with each provider:

| Provider | Callback URL |
|----------|--------------|
| Google | `<BASE_URL>/auth/google/callback` |
| GitHub | `<BASE_URL>/auth/github/callback` |

## Project Structure

```
apps/web/
├── app/
│   ├── (dashboard)/      # Landing, pricing, dashboard pages
│   ├── (login)/          # Sign in, sign up
│   ├── auth/             # OAuth callbacks — code exchange happens here
│   └── api/              # API routes (stripe, user, team)
├── components/           # React components
├── lib/
│   ├── auth/
│   │   ├── oauth/        # GitHub + Google exchange, identity, account upsert
│   │   ├── password.ts   # PBKDF2 hash/verify (WebCrypto)
│   │   └── local.ts      # Email/password sign-in + sign-up
│   ├── mailkite-auth/    # Sessions, config, middleware, MailKite email
│   └── db/               # Drizzle schema + migrations
├── middleware.ts         # Route protection
└── vercel.json           # Vercel deploy config
```

## Brand assets

Every icon is generated from one path definition in `apps/web/scripts/generate-icons.mjs`. Change the glyph or the accent colours there and re-run:

```bash
cd apps/web
pnpm run brand:icons
```

| File | Purpose |
|------|---------|
| `app/icon.svg` | Primary favicon — modern browsers prefer this |
| `app/favicon.ico` | Legacy favicon (16/32/48) |
| `app/apple-icon.png` | iOS home screen (180px, full bleed — iOS applies its own mask) |
| `app/opengraph-image.png` | Social preview (1200×630) |
| `app/twitter-image.png` | Twitter/X summary card |
| `public/brand/icon.svg` | The mark, standalone |
| `public/brand/icon-mono.svg` | Single-colour mark; inherits `currentColor` |
| `public/brand/logo.svg` | Mark + wordmark; adapts to light/dark automatically |
| `public/brand/logo-mono.svg` | Single-colour lockup |
| `public/brand/icon-{192,512}.png` | PWA manifest icons |
| `public/brand/icon-maskable-512.png` | Android maskable (glyph inside the 80% safe zone) |
| `public/brand/mask-icon.svg` | Safari pinned tab |

The in-app `<Logo />` component draws its tile with a CSS gradient rather than a baked SVG one, so the mark follows whichever accent the theme picker is set to. The static files above bake the default Ocean palette.

## License

[MIT](https://opensource.org/licenses/MIT) — use for anything. Attribution appreciated.

Designed by [MailKite](https://mailkite.dev).
