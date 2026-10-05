# Branded transactional email

Audience: developers using the SaaS starter. Job: send a recognizable welcome email
with the application's branding and matching HTML/plaintext content.

`apps/web/lib/mailkite-auth/email-template.ts` supplies a table-based email shell,
light/dark palettes, typed content blocks, HTML escaping, and plaintext rendering.
`email.ts` composes the welcome message and sends it through the existing MailKite path.
Sending still skips when MailKite is not configured; sender/domain scoping stays authoritative.

Configuration: `APP_NAME`, `EMAIL_TAGLINE`, `EMAIL_LOGO_URL` (hosted PNG/JPG), and
`EMAIL_THEME` (`light` by default). The existing `BASE_URL`, `MAILKITE_API_KEY`,
`MAILKITE_FROM`, `CONTACT_EMAIL` and optional `CONTACT_FROM` retain their roles.
Do not put credentials in this document or commit actual environment files.

## Release verification

- [x] Review the email/configuration changes and exported helpers.
- [x] Next.js production build and TypeScript validation.
- [x] Non-interactive lint verification (zero warnings/errors).
- [x] Commit/push and verify the linked Vercel production deployment (`6302a30`).

Vercel Git status reports successful production deployment
`https://vercel.com/bucabays-projects/saas-nextjs-starter/8nsTMHuLgeS22pR4tcsntKy7CL8U`.
Production `/`, `/sign-in` and `/docs/env` return HTTP 200; `/docs/env` contains the
new `EMAIL_THEME` configuration documentation.
