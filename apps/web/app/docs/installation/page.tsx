export default function InstallationPage() {
  return (
    <>
      <span className="eyebrow">Getting Started</span>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-text">Installation</h1>
      <p className="mt-4 text-lg text-[var(--color-muted)]">
        Get the Next.js SaaS Starter running on your machine in under 2 minutes.
      </p>

      <h2>Prerequisites</h2>
      <ul>
        <li><a href="https://nodejs.org" target="_blank">Node.js 18+</a></li>
        <li><a href="https://pnpm.io/installation" target="_blank">pnpm</a> (<code>npm install -g pnpm</code>)</li>
        <li>A <a href="https://neon.tech" target="_blank">PostgreSQL</a> database (Neon has a free tier)</li>
        <li>A <a href="https://stripe.com" target="_blank">Stripe</a> account (test mode works)</li>
        <li>A <a href="https://mailkite.dev" target="_blank">MailKite</a> account for auth (free)</li>
      </ul>

      <h2>1. Clone the repository</h2>
      <pre className="code-block">git clone https://github.com/mailkite/saas-startup{'\n'}cd saas-startup</pre>

      <h2>2. Install dependencies</h2>
      <pre className="code-block">pnpm install</pre>

      <h2>3. Configure environment</h2>
      <pre className="code-block">cp .env.example .env</pre>
      <p>Open <code>.env</code> and fill in:</p>
      <ul>
        <li><code>AUTH_SECRET</code> — generate with <code>openssl rand -base64 32</code></li>
        <li><code>POSTGRES_URL</code> — your PostgreSQL connection string</li>
        <li><code>STRIPE_SECRET_KEY</code> — from your Stripe dashboard (test mode)</li>
        <li><code>STRIPE_WEBHOOK_SECRET</code> — from Stripe webhooks page</li>
      </ul>

      <div className="docs-callout">
        <div>
          <strong>MailKite Auth</strong>
          <p className="mt-1 text-sm">
            Auth is powered by MailKite &mdash; create a free account at{' '}
            <a href="https://mailkite.dev" target="_blank">mailkite.dev</a>.
            The API URL defaults to <code>https://api.mailkite.dev</code>.
            No separate auth provider needed.
          </p>
        </div>
      </div>

      <h2>4. Run database migrations</h2>
      <pre className="code-block">cd apps/web{'\n'}npx drizzle-kit migrate</pre>

      <h2>5. Start the dev server</h2>
      <pre className="code-block">pnpm run dev</pre>
      <p>Visit <a href="http://localhost:3000" target="_blank">http://localhost:3000</a></p>

      <hr />

      <h2>What's included</h2>
      <p>Your app now has:</p>
      <ul>
        <li><strong>Landing page</strong> with animated background, gradient cards, and theme toggle</li>
        <li><strong>Auth pages</strong> — sign-in, sign-up with email/password and OAuth</li>
        <li><strong>Pricing page</strong> with Stripe integration</li>
        <li><strong>Dashboard</strong> with team management and security settings</li>
        <li><strong>Dark/light mode</strong> with configurable theme colors</li>
      </ul>

      <p>
        Ready to customize? Head to <a href="/docs/configuration">Configuration →</a>
      </p>
    </>
  );
}
