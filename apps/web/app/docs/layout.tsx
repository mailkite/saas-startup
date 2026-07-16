'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavSection {
  title: string;
  items: { label: string; href: string }[];
}

const sidebar: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', href: '/docs' },
      { label: 'Installation', href: '/docs/installation' },
      { label: 'Configuration', href: '/docs/configuration' },
      { label: 'Deployment', href: '/docs/deployment' },
    ],
  },
  {
    title: 'Features',
    items: [
      { label: 'Authentication', href: '/docs/auth' },
      { label: 'Payments', href: '/docs/payments' },
      { label: 'Database', href: '/docs/database' },
      { label: 'Team Management', href: '/docs/team' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { label: 'Environment Variables', href: '/docs/env' },
      { label: 'Project Structure', href: '/docs/structure' },
      { label: 'GitHub', href: 'https://github.com/mailkite/saas-startup' },
    ],
  },
];

function SidebarLink({ href, label, current }: { href: string; label: string; current: string }) {
  const isActive = current === href || (href !== '/docs' && current.startsWith(href));

  if (href.startsWith('http')) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className={`docs-nav-link flex items-center gap-1`}
      >
        {label}
        <svg viewBox="0 0 24 24" className="h-3 w-3 opacity-50" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17L17 7M7 7h10v10" />
        </svg>
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`docs-nav-link ${isActive ? '!text-[var(--color-accent)] !font-semibold !bg-[color-mix(in_oklab,var(--color-accent)_12%,transparent)]' : ''}`}
    >
      {label}
    </Link>
  );
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed bottom-6 right-6 z-50 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] p-3 text-white shadow-lg cursor-pointer"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-16 z-40 h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-border-brand bg-bg transition-transform lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-4 py-6 space-y-7">
          {sidebar.map((section) => (
            <div key={section.title}>
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]/80">
                {section.title}
              </p>
              <ul className="mt-1 space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <SidebarLink {...item} current={pathname} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Content */}
      <main className="min-w-0 flex-1 py-10 lg:py-12 lg:pl-10 px-6">
        <article className="docs-prose max-w-3xl">{children}</article>
      </main>
    </div>
  );
}
