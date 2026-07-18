---
name: stripe-provider
description: The Stripe billing layer for this repo — subscription Checkout, the customer portal, and webhooks, all wired to the Team model. Use for anything touching payments, checkout, subscriptions, billing, pricing, the Stripe webhook, the customer portal, or adding a new price/plan. Triggers: "add a plan", "start a checkout", "handle the Stripe webhook", "open the billing portal", "change pricing", "subscription status", "trial period", "why isn't my subscription updating".
version: 1.0.0
author: saas-startup
tags:
  - stripe
  - payments
  - subscriptions
  - billing
  - checkout
  - webhooks
---

# stripe-provider — Stripe subscriptions, checkout, portal & webhooks

How billing works here: Stripe Checkout in `subscription` mode with a trial, a self-serve customer portal, and two webhook-driven paths that write subscription state onto the `Team` model. Prices and products live in Stripe (seeded from `lib/db/seed.ts`), not in the DB. Reuse the helpers in `lib/payments/stripe.ts` before hand-rolling any Stripe call.

## When to use

- Starting a checkout from a pricing button, or changing what a plan includes.
- Handling the Stripe webhook or debugging why a `Team`'s `subscriptionStatus`/`planName` didn't update.
- Opening the billing/customer portal for a team.
- Adding a new price or plan, or changing the trial length.
- Anything reading or writing `stripeCustomerId` / `stripeSubscriptionId` / `stripeProductId` on a team.

## Where it lives in this repo

| Path | What it is |
| --- | --- |
| `lib/payments/stripe.ts` | The whole provider: `getStripe()`, the lazy `stripe` proxy (apiVersion `2025-08-27.basil`), `createCheckoutSession`, `createCustomerPortalSession`, `handleSubscriptionChange`, `getStripePrices`, `getStripeProducts`. |
| `lib/payments/actions.ts` | Server actions `checkoutAction` / `customerPortalAction` — the form-facing entry points. |
| `app/api/stripe/checkout/route.ts` | `GET` success handler. Checkout's `success_url` lands here to finalize the sub and set the session cookie. |
| `app/api/stripe/webhook/route.ts` | `POST` webhook. Verifies the signature and routes `customer.subscription.*` to `handleSubscriptionChange`. |
| `app/(dashboard)/pricing/page.tsx` | Server component: fetches live prices/products, renders Base/Plus tiers, posts to `checkoutAction`. |
| `app/(dashboard)/pricing/submit-button.tsx` | Client submit button using `useFormStatus()` for the pending state. |
| `lib/db/queries.ts` | `getTeamByStripeCustomerId`, `updateTeamSubscription` — the Team-side reads/writes the webhook uses. |
| `lib/db/seed.ts` | Seeds the Base ($8/mo) and Plus ($12/mo) products + prices in Stripe (`npm run db:seed`). |
| `lib/db/setup.ts` | `npm run db:setup` — checks the Stripe CLI is installed and authenticated. |
| `.env.example` | `STRIPE_SECRET_KEY` (`sk_test_…`), `STRIPE_WEBHOOK_SECRET` (`whsec_…`), `BASE_URL`. |

Subscription state is tracked on the **`Team`** model, not per-user — a checkout finalizes against the user's team.

## How to start a checkout from a pricing button

The pricing page fetches live prices, drops the `priceId` into a hidden input, and posts to the `checkoutAction` server action. Match this pattern — don't call `stripe.checkout` from a component.

```tsx
// app/(dashboard)/pricing/page.tsx  — form wiring
import { checkoutAction } from '@/lib/payments/actions';

<form action={checkoutAction}>
  <input type="hidden" name="priceId" value={tier.priceId} />
  <SubmitButton featured={tier.featured} />  {/* useFormStatus() → pending */}
</form>
```

```ts
// lib/payments/actions.ts  — the action
export async function checkoutAction(formData: FormData) {
  const team = await getTeamForSession();
  const priceId = formData.get('priceId') as string;
  await createCheckoutSession({ team, priceId });
}
```

`createCheckoutSession` (in `stripe.ts`) creates a `mode: 'subscription'` session with a **14-day trial** (`subscription_data.trial_period_days: 14`), promo codes on, reuses `team.stripeCustomerId` if present, stamps `client_reference_id: user.id`, and points `success_url` at `/api/stripe/checkout`. If there's no user or no team it **redirects to `/sign-up?redirect=checkout&priceId=…`** instead of erroring — so callers don't need to guard auth.

```ts
const session = await stripe.checkout.sessions.create({
  mode: 'subscription',
  line_items: [{ price: priceId, quantity: 1 }],
  success_url: `${process.env.BASE_URL}/api/stripe/checkout?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.BASE_URL}/pricing`,
  customer: team.stripeCustomerId || undefined,
  client_reference_id: user.id.toString(),
  allow_promotion_codes: true,
  subscription_data: { trial_period_days: 14 },
});
redirect(session.url!);
```

## How checkout is finalized (the success route)

`app/api/stripe/checkout/route.ts` `GET` runs after payment. It retrieves the session (expanding customer + subscription), pulls the plan's product, finds the user from `client_reference_id`, resolves their team via `teamMembers`, and writes `stripeCustomerId`, `stripeSubscriptionId`, `stripeProductId`, `planName`, `subscriptionStatus` onto that team — then `setSessionCookie(sessionId)` and redirects to `/dashboard`. On any failure it redirects to `/error`. This is the path that first attaches a `stripeCustomerId` to a team.

## How to handle the webhook + update the Team

`app/api/stripe/webhook/route.ts` **verifies the signature first** (`stripe.webhooks.constructEvent(payload, signature, STRIPE_WEBHOOK_SECRET)` — read the raw body via `request.text()`), then routes:

```ts
switch (event.type) {
  case 'customer.subscription.updated':
  case 'customer.subscription.deleted':
    await handleSubscriptionChange(event.data.object as Stripe.Subscription);
    break;
  default:
    console.log(`Unhandled event type ${event.type}`);
}
return NextResponse.json({ received: true });
```

`handleSubscriptionChange` (in `stripe.ts`) looks up the team by customer id and writes state via `updateTeamSubscription`:

```ts
const team = await getTeamByStripeCustomerId(subscription.customer as string);
if (!team) { console.error('Team not found for Stripe customer:', customerId); return; }

if (status === 'active' || status === 'trialing') {
  await updateTeamSubscription(team.id, {
    stripeSubscriptionId: subscription.id,
    stripeProductId: plan?.product as string,
    planName: (plan?.product as Stripe.Product).name,
    subscriptionStatus: status,
  });
} else if (status === 'canceled' || status === 'unpaid') {
  await updateTeamSubscription(team.id, {
    stripeSubscriptionId: null, stripeProductId: null, planName: null,
    subscriptionStatus: status,
  });
}
```

To handle a **new** event type, add a `case` in the webhook route and extend `handleSubscriptionChange` — keep all Team writes flowing through `updateTeamSubscription` so the Team model stays the single source of truth.

## How to open the customer portal

The dashboard posts to `customerPortalAction`, which calls `createCustomerPortalSession(team)` and redirects to `portalSession.url`. The helper redirects to `/pricing` if the team has no `stripeCustomerId`/`stripeProductId`, then **reuses an existing billing-portal configuration or creates one** (allowing price/quantity/promo updates and at-period-end cancellation) before creating the session with `return_url` `${BASE_URL}/dashboard`.

```ts
// lib/payments/actions.ts
export async function customerPortalAction() {
  const team = await getTeamForSession();
  const portalSession = await createCustomerPortalSession(team);
  redirect(portalSession.url);
}
```

## How to add a new price / plan

Products and prices live in **Stripe**, and the pricing page reads them live via `getStripePrices()` / `getStripeProducts()` (both filter `active: true`). The page matches products by **name** (`'Base'`, `'Plus'`) — so a new tier means a new named product.

1. Add it to the seed so it's reproducible — follow the existing shape in `lib/db/seed.ts`:

```ts
const proProduct = await stripe.products.create({ name: 'Pro', description: 'Pro subscription plan' });
await stripe.prices.create({
  product: proProduct.id,
  unit_amount: 2400, currency: 'usd',
  recurring: { interval: 'month', trial_period_days: 7 },
});
```

2. Run `npm run db:seed` (test mode), or create it via the Stripe MCP / dashboard.
3. Add the tier to the `tiers` array in `pricing/page.tsx`, matching the product by its exact `name`. No DB migration is needed — subscription state on the Team is written from whatever product the customer actually buys.

Note the seed uses a 7-day price-level trial while `createCheckoutSession` sets a 14-day trial at the session — the session value wins for checkouts. Keep them intentional if you touch trials.

## Operate & test it with agent tooling

- **`stripe:stripe-best-practices`** — load this before any design decision: Checkout Sessions vs PaymentIntents, subscription modeling, restricted keys, webhook and secure-key handling. This repo already chose hosted Checkout + subscription mode; keep it unless that skill says otherwise.
- **`stripe:test-cards`** — the canonical test-card numbers (e.g. `4242…`) for exercising checkout, trials, and declines in test mode.
- **`stripe:explain-error`** — decode a Stripe API error or decline code.
- **Stripe MCP** — inspect/create products, prices, and customers without leaving the session (test mode).
- **Local webhooks** — forward Stripe events to the running app and grab a signing secret:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
# prints whsec_… → put it in STRIPE_WEBHOOK_SECRET for local dev
stripe trigger customer.subscription.updated   # fire a test event
```

`npm run db:setup` verifies the Stripe CLI is installed and logged in before you start.

## Conventions

- **Test mode by default.** Keys are `sk_test_…` / `whsec_…`. Never point local or dev at a live key.
- **Never echo secret keys.** Don't `cat`, `echo`, or paste `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` into chat or a code block — use them in place. See `AGENTS.md` §7 (Secrets).
- **Always verify webhook signatures.** Read the raw body with `request.text()` and pass it to `stripe.webhooks.constructEvent` — never `JSON.parse` first. A bad signature returns `400`.
- **Never change a user's plan or billing tier without explicit approval.** No creating checkouts, cancelling subs, editing prices on a live account, or mutating `subscriptionStatus` unless the user asked. See `AGENTS.md` §10 ("Never mutate account state without approval").
- **Team is the source of truth.** Route every subscription write through `updateTeamSubscription`; don't scatter `db.update(teams)` calls (the one in the checkout route is the deliberate exception that first attaches the customer).
- **Use the `stripe` proxy / helpers**, not fresh `new Stripe(...)` instances — the proxy pins the apiVersion and lazily throws if `STRIPE_SECRET_KEY` is missing.

## Before you call it done

- [ ] Checkout runs end-to-end in test mode with a `stripe:test-cards` card, redirecting through `/api/stripe/checkout` to `/dashboard`.
- [ ] `stripe listen` forwarding is running and `customer.subscription.updated`/`deleted` update the Team's `planName` + `subscriptionStatus`.
- [ ] Customer portal opens and returns to `/dashboard`.
- [ ] New/changed plans appear on `/pricing` (product `name` matches the page lookup).
- [ ] No secret keys printed anywhere; webhook signature verification is intact.
- [ ] `npm run build` and `npm run lint` are clean.

## Related

- `saas-ui` — the billing/checkout/pricing UI (SubmitButton, tier cards) is built on this system.
- `nextjs-app` — routing, RSC vs client, and where the pricing page and API route handlers mount.
- `supabase-provider` — the DB/Drizzle layer behind `Team` and the `queries.ts` helpers.
- `mailkite-provider` — auth/session (`getTeamForSession`, `setSessionCookie`) that checkout ties into.
- `saas-research` — check what's already decided before adding a Stripe dependency or changing the billing model.

Document new billing features in `docs/features/<feature>.md`, link the doc at the top of touched files, record pricing/packaging decisions in `docs/research/`, and log the session in `docs/worklog/`. See the root `AGENTS.md` (Secrets + "never mutate account state without approval").
