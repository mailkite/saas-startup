import Link from 'next/link';

export default function AuthPage() {
  return (
    <>
      <span className="eyebrow">Features</span>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-text">Authentication</h1>
      <p className="mt-4 text-lg text-[var(--color-muted)]">
        The template uses <Link href="https://mailkite.dev" target="_blank">MailKite</Link> for authentication — JWT-based sessions,
        email/password login, magic links, and OAuth with Google and GitHub.
      </p>

      <h2>How it works</h2>
      <p>
        Authentication is handled by MailKite&apos;s API at{' '}
        <code>https://api.mailkite.dev</code>. When a user signs in,
        the API returns a JWT which is set as an <code>httpOnly</code> cookie named{' '}
        <code>mk_session</code>. The middleware reads this cookie on every request
        to determine if the user is authenticated.
      </p>

      <h2>Auth Methods</h2>
      <ul>
        <li><strong>Email / Password</strong> — standard sign-in and sign-up forms</li>
        <li><strong>Magic Link</strong> — passwordless login via email (set <code>MAILKITE_MAGIC_LINK=true</code>)</li>
        <li><strong>Google OAuth</strong> — requires <code>GOOGLE_CLIENT_ID</code> and <code>GOOGLE_CLIENT_SECRET</code></li>
        <li><strong>GitHub OAuth</strong> — requires <code>GITHUB_CLIENT_ID</code> and <code>GITHUB_CLIENT_SECRET</code></li>
      </ul>

      <h2>Protected Routes</h2>
      <p>
        Routes under <code>/dashboard</code> are protected by default.
        Unauthenticated users are redirected to <code>/sign-in</code>.
      </p>
      <p>Configure this in <code>middleware.ts</code>:</p>
      <pre className="code-block">
{`import { createAuthMiddleware } from '@/lib/mailkite-auth';

export default createAuthMiddleware({
  protectedRoutes: ['/dashboard'],
  loginUrl: '/sign-in',
});`}</pre>

      <h2>Session Management</h2>
      <p>
        Sessions last 7 days and auto-refresh when within 24 hours of expiry.
        The session cookie is <code>httpOnly</code> for security — JavaScript
        cannot read it, protecting against XSS attacks.
      </p>

      <h2>Getting API Keys</h2>
      <ol>
        <li>Sign up at <Link href="https://mailkite.dev" target="_blank">mailkite.dev</Link></li>
        <li>By default, the <code>MAILKITE_API_URL</code> points to the hosted API</li>
        <li>Set <code>AUTH_SECRET</code> to any secure random string — this signs your JWTs</li>
      </ol>
    </>
  );
}
