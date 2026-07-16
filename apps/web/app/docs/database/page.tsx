import Link from 'next/link';

export default function DatabasePage() {
  return (
    <>
      <span className="eyebrow">Features</span>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-text">Database</h1>
      <p className="mt-4 text-lg text-[var(--color-muted)]">
        PostgreSQL with Drizzle ORM — type-safe schema, migrations, and queries.
      </p>
      <h2>Schema</h2>
      <p>The database includes tables for users, teams, team members, invitations, and activity logs.</p>
      <h2>Migrations</h2>
      <pre className="code-block">{`cd apps/web\nnpx drizzle-kit generate  # create migration\nnpx drizzle-kit migrate   # apply migration`}</pre>
      <p>See <Link href="/docs/configuration">Configuration →</Link> for database setup.</p>
    </>
  );
}
