import Link from 'next/link';

export default function StructurePage() {
  return (
    <>
      <span className="eyebrow">Reference</span>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-text">Project Structure</h1>
      <pre className="code-block">
{`apps/web/
├── app/
│   ├── (dashboard)/     # Landing, pricing, dashboard
│   ├── (login)/         # Sign-in, sign-up
│   ├── api/             # API routes (auth, stripe, user, team)
│   └── docs/            # Documentation pages
├── components/
│   ├── ui/              # shadcn/ui components
│   └── ...              # Theme, footer, cards
├── lib/
│   ├── db/              # Schema, queries, migrations
│   ├── payments/        # Stripe integration
│   └── mailkite-auth/   # Authentication logic
├── middleware.ts         # Route protection
└── next.config.ts       # Next.js configuration

packages/
└── mailkite-auth/       # Auth package source`}</pre>
      <p>
        See the{' '}
        <Link href="https://github.com/mailkite/saas-startup" target="_blank">
          GitHub repo
        </Link>{' '}
        for the full source.
      </p>
    </>
  );
}
