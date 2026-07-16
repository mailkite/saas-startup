import Link from 'next/link';

export default function Page() {
  const title = 'env' === 'env' ? 'Environment Variables' : 'env' === 'team' ? 'Team Management' : 'Project Structure';
  const eyebrow = 'env' === 'env' ? 'Reference' : 'Features';
  return (
    <>
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-text">{title}</h1>
      <p className="mt-4 text-lg text-[var(--color-muted)]">
        Coming soon. See the <Link href="https://github.com/mailkite/saas-startup" target="_blank">GitHub repo</Link> for full documentation.
      </p>
    </>
  );
}
