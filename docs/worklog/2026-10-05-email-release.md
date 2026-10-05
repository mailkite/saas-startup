# Email branding release — 2026-10-05

Ship the previously prepared branded welcome-email renderer and its configuration guide.
HTML uses a table-based branded shell; plaintext is rendered from the same content blocks.
The existing MailKite sender/domain and configured-key checks remain authoritative.

Local production build passes. The old `next lint` script prompted for configuration
instead of running a check, so this release adds the standard Next core-web-vitals ESLint
configuration and matching development tooling for non-interactive lint verification.
The first check found six unescaped JSX apostrophes and an incomplete terminal-effect
dependency list. Apostrophes now use entities (identical displayed copy); the effect
declares the step-count dependency. No rule is suppressed.

The repository is linked to Vercel project `saas-nextjs-starter`, production
`https://saas-startup.mailkite.dev`. Commit/push and production verification follow the
runbook in `docs/DEPLOYMENT.md`. No database migration or secret change is required.
