import './globals.css';
import type { Metadata } from 'next';
import { ThemeScript } from '@/components/ThemeScript';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SWRConfig } from 'swr';
import { getUser, getTeamForUser } from '@/lib/db/queries';

export const metadata: Metadata = {
  title: 'Next.js SaaS Starter — Launch your SaaS',
  description: 'Production-ready template with MailKite authentication, Stripe payments, team management, and a polished dark-first dashboard. Clone and ship in minutes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
