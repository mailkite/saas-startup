<p align="center">
  <img src="apps/web/public/brand/logo.svg" alt="SaaS Starter" width="264" />
</p>

# Next.js SaaS Starter

The **Next.js SaaS Starter** is a production-ready template to launch your SaaS. It wires together **authentication** (MailKite + NextAuth-compatible JWT sessions), **payments** (Stripe subscriptions and customer portal), **team management**, and a polished dark-first dashboard — so you can skip the boilerplate and ship your product.

- **Auth** — Email/password, magic links, Google and GitHub OAuth, powered by [MailKite](https://mailkite.dev)
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
| Auth | [MailKite](https://mailkite.dev) — JWT sessions, OAuth, email/password |
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
| `AUTH_SECRET` | Yes | JWT signing key — `openssl rand -base64 32` |
| `POSTGRES_URL` | Yes | PostgreSQL connection (Neon, Supabase, Vercel Postgres) |
| `STRIPE_SECRET_KEY` | Yes | Stripe secret key (`sk_test_...`) |
| `STRIPE_WEBHOOK_SECRET` | Yes | Stripe webhook secret (`whsec_...`) |
| `GOOGLE_CLIENT_ID` | No | Google OAuth |
| `GOOGLE_CLIENT_SECRET` | No | Google OAuth |
| `GITHUB_CLIENT_ID` | No | GitHub OAuth |
| `GITHUB_CLIENT_SECRET` | No | GitHub OAuth |

## Project Structure

```
apps/web/
├── app/                  # App Router
│   ├── (dashboard)/      # Landing, pricing, dashboard pages
│   ├── (login)/          # Sign in, sign up
│   └── api/              # API routes (stripe, user, team)
├── components/           # React components
├── lib/                  # DB schema, Stripe, auth
├── middleware.ts         # Route protection
└── vercel.json           # Vercel deploy config

packages/
└── mailkite-auth/        # Auth package (JWT, session, OAuth client)
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
