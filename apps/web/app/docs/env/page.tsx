import Link from 'next/link';

export default function EnvPage() {
  return (
    <>
      <span className="eyebrow">Reference</span>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-text">Environment Variables</h1>
      <h2>Required</h2>
      <table>
        <thead><tr><th>Variable</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td><code>AUTH_SECRET</code></td><td>JWT signing key</td></tr>
          <tr><td><code>POSTGRES_URL</code></td><td>PostgreSQL connection string</td></tr>
          <tr><td><code>STRIPE_SECRET_KEY</code></td><td>Stripe secret key</td></tr>
          <tr><td><code>STRIPE_WEBHOOK_SECRET</code></td><td>Stripe webhook signing secret</td></tr>
        </tbody>
      </table>

      <h2>Optional</h2>
      <table>
        <thead><tr><th>Variable</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td><code>GOOGLE_CLIENT_ID</code></td><td>Google OAuth client ID</td></tr>
          <tr><td><code>GOOGLE_CLIENT_SECRET</code></td><td>Google OAuth client secret</td></tr>
          <tr><td><code>GITHUB_CLIENT_ID</code></td><td>GitHub OAuth client ID</td></tr>
          <tr><td><code>GITHUB_CLIENT_SECRET</code></td><td>GitHub OAuth client secret</td></tr>
          <tr><td><code>MAILKITE_API_URL</code></td><td>Auth API URL (defaults to https://api.mailkite.dev)</td></tr>
          <tr><td><code>MAILKITE_MAGIC_LINK</code></td><td>Enable magic link login</td></tr>
          <tr><td><code>MAILKITE_API_KEY</code></td><td>Send email (welcome email, contact form)</td></tr>
          <tr><td><code>MAILKITE_FROM</code></td><td>Default sender — an address on a verified MailKite domain</td></tr>
          <tr><td><code>CONTACT_EMAIL</code></td><td>Where contact form submissions are delivered</td></tr>
          <tr><td><code>APP_NAME</code></td><td>App name in email masthead, footer and subjects</td></tr>
          <tr><td><code>EMAIL_TAGLINE</code></td><td>Footer line under the app name in emails</td></tr>
          <tr><td><code>EMAIL_LOGO_URL</code></td><td>Hosted PNG wordmark for emails (SVG is blocked by mail clients)</td></tr>
          <tr><td><code>EMAIL_THEME</code></td><td>Email palette: <code>light</code> (default) or <code>dark</code></td></tr>
        </tbody>
      </table>

      <p>
        Full configuration guide:{' '}
        <Link href="/docs/configuration">Configuration →</Link>
      </p>
    </>
  );
}
