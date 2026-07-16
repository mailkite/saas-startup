export default function DeployPage() {
  return (
    <>
      <span className="eyebrow">Getting Started</span>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-text">Deployment</h1>
      <p className="mt-4 text-lg text-[var(--color-muted)]">
        Deploy your SaaS to Vercel in one click — with your own domain, SSL, and auto-scaling.
      </p>

      <h2>Deploy to Vercel</h2>
      <p>The recommended deployment platform is Vercel. It auto-detects Next.js, handles SSL, and provides a global CDN.</p>

      <h3>One-Click Deploy</h3>
      <p>
        <a
          href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmailkite%2Fsaas-startup&root-directory=apps%2Fweb&env=AUTH_SECRET,STRIPE_SECRET_KEY,STRIPE_WEBHOOK_SECRET&envDescription=Required%20environment%20variables&project-name=my-saas&repository-name=my-saas"
          target="_blank"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1.5rem',
            borderRadius: '999px',
            background: 'linear-gradient(to right, var(--color-accent), var(--color-accent-2))',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.875rem',
            textDecoration: 'none',
          }}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M12 0l12 20H0z" />
          </svg>
          Deploy to Vercel
        </a>
      </p>

      <h3>Manual Deploy</h3>
      <pre className="code-block">
{`# Install the Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from the app directory
cd apps/web
vercel --prod`}</pre>

      <ol>
        <li>Set environment variables in the Vercel dashboard (Project → Settings → Environment Variables)</li>
        <li>Run <code>vercel --prod</code></li>
        <li>Add your custom domain in the Vercel dashboard</li>
      </ol>

      <h2>Postgres on Vercel</h2>
      <p>Create a <a href="https://vercel.com/docs/storage/vercel-postgres" target="_blank">Vercel Postgres</a> database or connect an external one (Neon, Supabase). Set <code>POSTGRES_URL</code> as an environment variable.</p>

      <h2>Stripe in Production</h2>
      <ol>
        <li>Switch from test to live mode in Stripe Dashboard</li>
        <li>Create live products and prices</li>
        <li>Update <code>STRIPE_SECRET_KEY</code> to your live key</li>
        <li>Update your webhook endpoint URL to your production domain</li>
      </ol>

      <h2>Domain Setup</h2>
      <p>In the Vercel dashboard:</p>
      <ol>
        <li>Go to Project → Settings → Domains</li>
        <li>Add your domain (e.g. <code>app.example.com</code>)</li>
        <li>Follow the DNS instructions (add a CNAME record)</li>
        <li>Vercel auto-provisions SSL via Let's Encrypt</li>
      </ol>

      <div className="docs-callout">
        <div>
          <strong>Keep your Cloudflare proxy off</strong>
          <p className="mt-1 text-sm">
            If your DNS is on Cloudflare, set the CNAME to DNS-only (grey cloud).
            The orange cloud (proxy) can conflict with Vercel&apos;s SSL provisioning.
          </p>
        </div>
      </div>
    </>
  );
}
