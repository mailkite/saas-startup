import { checkoutAction } from '@/lib/payments/actions';
import { getStripePrices, getStripeProducts } from '@/lib/payments/stripe';
import { SubmitButton } from './submit-button';

export const dynamic = 'force-dynamic';

export default async function PricingPage() {
  let prices: any[] = [];
  let products: any[] = [];

  try {
    [prices, products] = await Promise.all([
      getStripePrices(),
      getStripeProducts(),
    ]);
  } catch {
    // Stripe not configured — show defaults
  }

  const basePlan = products.find((p) => p.name === 'Base');
  const plusPlan = products.find((p) => p.name === 'Plus');

  const basePrice = prices.find((p) => p.productId === basePlan?.id);
  const plusPrice = prices.find((p) => p.productId === plusPlan?.id);

  const tiers = [
    {
      name: 'Base',
      price: basePrice?.unitAmount || 800,
      interval: basePrice?.interval || 'month',
      blurb: 'Everything you need to launch and validate.',
      features: [
        'Unlimited usage',
        'Unlimited workspace members',
        'Email support',
        'Community access',
      ],
      priceId: basePrice?.id,
      featured: false,
    },
    {
      name: 'Plus',
      price: plusPrice?.unitAmount || 1200,
      interval: plusPrice?.interval || 'month',
      blurb: 'For growing products with real traffic.',
      features: [
        'Everything in Base',
        'Early access to new features',
        'Slack & priority support',
        'Advanced analytics',
      ],
      priceId: plusPrice?.id,
      featured: true,
    },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="py-20 bg-bg relative overflow-hidden">
        <div className="absolute inset-0 brand-glow opacity-20" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow mb-4">Pricing</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text">
            Simple, <span className="text-gradient">transparent</span> pricing
          </h1>
          <p className="mt-4 text-lg text-[var(--color-muted)] max-w-xl mx-auto">
            Start free for 7 days. No hidden fees, no surprises. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Tier cards */}
      <section className="pb-24 bg-bg">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid gap-5 md:grid-cols-2 max-w-2xl mx-auto">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`relative flex flex-col rounded-2xl border bg-panel p-6 ${
                  t.featured
                    ? 'gradient-ring border-[var(--color-accent)]/60 shadow-lg shadow-[var(--color-accent)]/10'
                    : 'border-border-brand'
                }`}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] px-3 py-1 text-xs font-semibold text-white">
                    Most popular
                  </span>
                )}

                <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                  {t.name}
                </h3>

                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-text">
                    ${t.price / 100}
                  </span>
                  <span className="text-sm text-[var(--color-muted)]">
                    /{t.interval}
                  </span>
                </div>

                <p className="mt-3 text-sm text-[var(--color-muted)]">{t.blurb}</p>

                <div className="mt-5 rounded-lg border border-border-brand bg-bg/40 px-4 py-3">
                  <div className="text-sm font-semibold text-text">
                    7-day free trial
                  </div>
                  <div className="mt-0.5 text-xs text-[var(--color-muted)]">
                    No credit card required
                  </div>
                </div>

                <form action={checkoutAction} className="mt-5">
                  <input type="hidden" name="priceId" value={t.priceId} />
                  <SubmitButton featured={t.featured} />
                </form>

                <ul className="mt-6 space-y-3 text-sm text-text">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Every plan includes */}
      <section className="py-20 bg-panel">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-center text-2xl font-bold text-text mb-12">
            Every plan includes
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: 'No hidden fees',
                body: 'What you see is what you pay. No surprise overages, no per-seat gotchas.',
              },
              {
                title: 'Cancel anytime',
                body: 'No lock-in contracts. Cancel with one click and your data is yours.',
              },
              {
                title: 'Secure by default',
                body: 'SOC 2 compliant infrastructure. Encrypted at rest and in transit.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="gradient-ring rounded-xl border border-border-brand bg-bg/40 p-6"
              >
                <h3 className="text-sm font-semibold text-text">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
