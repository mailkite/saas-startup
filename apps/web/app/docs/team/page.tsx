import Link from 'next/link';

export default function TeamPage() {
  return (
    <>
      <span className="eyebrow">Features</span>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-text">Team Management</h1>
      <p className="mt-4 text-lg text-[var(--color-muted)]">
        Invite team members, manage roles, and collaborate from a shared dashboard.
      </p>
      <p>
        Coming soon. See the{' '}
        <Link href="https://github.com/mailkite/saas-startup" target="_blank">
          GitHub repo
        </Link>{' '}
        for full documentation.
      </p>
    </>
  );
}
