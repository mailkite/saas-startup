import Link from 'next/link';
import { NewsletterCard } from '@/components/NewsletterCard';
import { LogoLockup } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ThemeConfig } from '@/components/ThemeConfig';

const links = {
  Product: [
    { label: 'Pricing', href: '/pricing' },
    { label: 'Changelog', href: 'https://github.com/mailkite/saas-startup/releases' },
    { label: 'Roadmap', href: 'https://github.com/mailkite/saas-startup/issues' },
  ],
  Resources: [
    { label: 'Documentation', href: 'https://github.com/mailkite/saas-startup#readme' },
    { label: 'GitHub', href: 'https://github.com/mailkite/saas-startup' },
    { label: 'Support', href: 'mailto:support@mailkite.dev' },
  ],
  Company: [
    { label: 'About', href: 'https://github.com/mailkite/saas-startup' },
    { label: 'Blog', href: 'https://github.com/mailkite/saas-startup' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border-brand bg-bg">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                {category}
              </h4>
              <ul className="mt-4 space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-[var(--color-muted)] hover:text-text transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 sm:col-span-1">
            <NewsletterCard />
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border-brand flex flex-col sm:flex-row items-center justify-between gap-4">
          <LogoLockup className="gap-1.5" markClassName="h-5 w-5" labelClassName="text-sm" />

          <p className="text-xs text-[var(--color-muted)]">
            &copy; {new Date().getFullYear()} SaaS Starter. Released under the{' '}
            <a
              href="https://opensource.org/licenses/MIT"
              target="_blank"
              className="underline hover:text-text transition-colors"
            >
              MIT License
            </a>
            {' · '}
            Designed by{' '}
            <a
              href="https://mailkite.dev"
              target="_blank"
              className="underline hover:text-text transition-colors"
            >
              MailKite
            </a>
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/mailkite/saas-startup"
              target="_blank"
              className="text-[var(--color-muted)] hover:text-text transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <ThemeToggle />
            <ThemeConfig />
          </div>
        </div>
      </div>
    </footer>
  );
}
