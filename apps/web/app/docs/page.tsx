import Link from 'next/link';

const cards = [
  { title: 'GitHub Repository', body: 'github.com/mailkite/saas-startup — star it, fork it, and browse the source.', href: 'https://github.com/mailkite/saas-startup', external: true },
  { title: 'Installation', body: 'Clone the repo, install dependencies, and configure your environment.', href: '/docs/installation' },
  { title: 'Configuration', body: 'Set environment variables, connect your database, and configure Stripe.', href: '/docs/configuration' },
  { title: 'Deployment', body: 'Deploy to Vercel, set up your domain, and go live.', href: '/docs/deployment' },
];

export default function DocsIndex() {
  return (
    <>
      <span className="eyebrow">Docs</span>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-text">
        Next.js SaaS Starter
      </h1>
      <p className="mt-4 text-lg text-[var(--color-muted)]">
        A production-ready template with MailKite authentication, Stripe payments,
        team management, and a polished dark-first dashboard.
      </p>

      <h2>Quick Start</h2>
      <pre className="code-block">
{`git clone https://github.com/mailkite/saas-startup
cd saas-startup
pnpm install
cp .env.example .env
cd apps/web
npx drizzle-kit migrate
pnpm run dev`}</pre>

      <p>
        Open <code>http://localhost:3000</code>. That's it.
      </p>

      <h2>Guides</h2>
      <div className="docs-grid">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="docs-card"
            {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <span className="docs-card-title">{c.title}</span>
            <span className="docs-card-body">{c.body}</span>
          </Link>
        ))}
      </div>

      <h2>Tech Stack</h2>
      <table>
        <thead>
          <tr>
            <th>Layer</th>
            <th>Technology</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Framework</td><td><a href="https://nextjs.org" target="_blank">Next.js 15</a> (App Router)</td></tr>
          <tr><td>Auth</td><td><a href="https://mailkite.dev" target="_blank">MailKite</a> — JWT sessions, OAuth, email/password</td></tr>
          <tr><td>Payments</td><td><a href="https://stripe.com" target="_blank">Stripe</a> — checkout, portal, webhooks</td></tr>
          <tr><td>Database</td><td><a href="https://www.postgresql.org" target="_blank">PostgreSQL</a> + <a href="https://orm.drizzle.team" target="_blank">Drizzle ORM</a></td></tr>
          <tr><td>UI</td><td><a href="https://tailwindcss.com" target="_blank">Tailwind CSS v4</a>, <a href="https://ui.shadcn.com" target="_blank">shadcn/ui</a></td></tr>
          <tr><td>Platform</td><td><a href="https://vercel.com" target="_blank">Vercel</a> (deploys anywhere)</td></tr>
        </tbody>
      </table>
    </>
  );
}
