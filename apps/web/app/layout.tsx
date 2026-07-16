import './globals.css';
import type { Metadata, Viewport } from 'next';
import { ThemeScript } from '@/components/ThemeScript';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SWRConfig } from 'swr';
import { getUser, getTeamForUser } from '@/lib/db/queries';

const title = 'Next.js SaaS Starter — Launch your SaaS';
const description =
  'Production-ready template with MailKite authentication, Stripe payments, team management, and a polished dark-first dashboard. Clone and ship in minutes.';

// Absolute URLs for og:image and friends. Vercel supplies VERCEL_PROJECT_PRODUCTION_URL
// on deploys; override with NEXT_PUBLIC_SITE_URL when self-hosting.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://saas-startup.mailkite.dev');

// favicon.ico, icon.svg, apple-icon.png, opengraph-image.png and twitter-image.png
// are picked up from app/ by file convention — see scripts/generate-icons.mjs.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: '%s · SaaS Starter' },
  description,
  applicationName: 'SaaS Starter',
  openGraph: { type: 'website', url: siteUrl, siteName: 'SaaS Starter', title, description },
  twitter: { card: 'summary_large_image', title, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0d12' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Safari <15 pinned tabs; declared here because Metadata.icons has no `color`. */}
        <link rel="mask-icon" href="/brand/mask-icon.svg" color="#6ea8fe" />
        <ThemeScript />
      </head>
      <body className="min-h-screen bg-bg text-text antialiased font-sans">
        <ThemeProvider>
          <SWRConfig
            value={{
              fallback: {
                '/api/user': getUser(),
                '/api/team': getTeamForUser(),
              },
            }}
          >
            {children}
          </SWRConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}
