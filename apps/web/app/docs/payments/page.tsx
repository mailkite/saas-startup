export default function PaymentsPage() {
  return (
    <>
      <span className="eyebrow">Features</span>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-text">Payments</h1>
      <p className="mt-4 text-lg text-[var(--color-muted)]">
        Stripe integration for subscription billing — checkout sessions,
        customer portal, webhooks, and full subscription lifecycle management.
      </p>

      <h2>What's Included</h2>
      <ul>
        <li><strong>Checkout</strong> — Stripe Checkout sessions with trial periods and promotion codes</li>
        <li><strong>Customer Portal</strong> — self-serve billing management (upgrade, cancel, update payment method)</li>
        <li><strong>Webhooks</strong> — automatic subscription status sync (active, canceled, unpaid)</li>
        <li><strong>Pricing Page</strong> — server-rendered prices pulled from Stripe in real time</li>
        <li><strong>Subscription Management</strong> — database schema tracks plan, status, and Stripe IDs</li>
      </ul>

      <h2>Pricing Page</h2>
      <p>
        The pricing page at <code>/pricing</code> fetches products and prices
        directly from Stripe. Products named <strong>Base</strong> and <strong>Plus</strong>
        are displayed in gradient-ring cards with checkout buttons. If Stripe isn&apos;t
        configured, fallback default pricing is shown.
      </p>

      <h2>Checkout Flow</h2>
      <ol>
        <li>User clicks a plan on the pricing page</li>
        <li>Browser POSTs to a server action with the <code>priceId</code></li>
        <li>Server creates a Stripe Checkout session with trial and return URLs</li>
        <li>User is redirected to Stripe&apos;s hosted checkout page</li>
        <li>After payment, Stripe redirects back to <code>/api/stripe/checkout</code></li>
        <li>The success handler creates the team and sets the session cookie</li>
      </ol>

      <h2>Webhook Events Handled</h2>
      <table>
        <thead>
          <tr><th>Event</th><th>Action</th></tr>
        </thead>
        <tbody>
          <tr><td><code>customer.subscription.updated</code></td><td>Updates plan, status, and product ID in the database</td></tr>
          <tr><td><code>customer.subscription.deleted</code></td><td>Clears subscription fields (downgrade to free)</td></tr>
        </tbody>
      </table>

      <div className="docs-callout">
        <div>
          <strong>Stripe CLI for local testing</strong>
          <p className="mt-1 text-sm">
            Install the <a href="https://stripe.com/docs/stripe-cli" target="_blank">Stripe CLI</a> and run{' '}
            <code>stripe listen --forward-to localhost:3000/api/stripe/webhook</code> to
            forward webhook events to your local dev server.
          </p>
        </div>
      </div>
    </>
  );
}
