export default function ConfigPage() {
  return (
    <>
      <span className="eyebrow">Getting Started</span>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-text">Configuration</h1>
      <p className="mt-4 text-lg text-[var(--color-muted)]">
        All environment variables and how to configure the template for your SaaS.
      </p>

      <h2>Environment Variables</h2>
      <p>Create a <code>.env</code> file (copy from <code>.env.example</code>) and set these values:</p>

      <h3>Required</h3>
      <table>
        <thead>
          <tr><th>Variable</th><th>Description</th><th>How to get it</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code>AUTH_SECRET</code></td>
            <td>JWT signing secret</td>
            <td><code>openssl rand -base64 32</code></td>
          </tr>
          <tr>
            <td><code>POSTGRES_URL</code></td>
            <td>PostgreSQL connection string</td>
            <td>Neon, Supabase, or Vercel Postgres dashboard</td>
          </tr>
          <tr>
            <td><code>STRIPE_SECRET_KEY</code></td>
            <td>Stripe secret key</td>
            <td>Stripe Dashboard → Developers → API keys</td>
          </tr>
          <tr>
            <td><code>STRIPE_WEBHOOK_SECRET</code></td>
            <td>Stripe webhook signing key</td>
            <td>Stripe Dashboard → Webhooks → Add endpoint</td>
          </tr>
        </tbody>
      </table>

      <h3>Optional (OAuth)</h3>
      <table>
        <thead>
          <tr><th>Variable</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><code>GOOGLE_CLIENT_ID</code></td><td>Google OAuth client ID</td></tr>
          <tr><td><code>GOOGLE_CLIENT_SECRET</code></td><td>Google OAuth client secret</td></tr>
          <tr><td><code>GITHUB_CLIENT_ID</code></td><td>GitHub OAuth client ID</td></tr>
          <tr><td><code>GITHUB_CLIENT_SECRET</code></td><td>GitHub OAuth client secret</td></tr>
        </tbody>
      </table>

      <h2>Stripe Setup</h2>
      <ol>
        <li>Create a <a href="https://dashboard.stripe.com" target="_blank">Stripe account</a></li>
        <li>Create products and prices in Stripe Dashboard</li>
        <li>Set <code>STRIPE_SECRET_KEY</code> to your secret key (<code>sk_test_...</code>)</li>
        <li>Create a webhook endpoint pointing to <code>https://your-domain.com/api/stripe/webhook</code></li>
        <li>Set <code>STRIPE_WEBHOOK_SECRET</code> to the webhook signing secret</li>
      </ol>

      <div className="docs-callout">
        <div>
          <strong>Test Mode</strong>
          <p className="mt-1 text-sm">
            Use Stripe test mode (<code>sk_test_...</code>) while developing. Test card:
            <code> 4242 4242 4242 4242</code> with any future expiration and CVC.
          </p>
        </div>
      </div>

      <h2>Database Setup</h2>
      <ol>
        <li>Create a PostgreSQL database (we recommend <a href="https://neon.tech" target="_blank">Neon</a>)</li>
        <li>Copy the connection string to <code>POSTGRES_URL</code></li>
        <li>Run migrations: <code>npx drizzle-kit migrate</code></li>
      </ol>

      <p>The schema includes tables for users, teams, team members, invitations, activities, and Stripe subscriptions.</p>

      <p>Next: <a href="/docs/deployment">Deployment →</a></p>
    </>
  );
}
