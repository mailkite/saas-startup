'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Globe, Search } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ThemeConfig } from '@/components/ThemeConfig';
import { Button } from '@/components/ui/button';

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

const allLinks = sidebar.flatMap((s) => s.items);

function SidebarLink({ href, label, current }: { href: string; label: string; current: string }) {
  const isActive = current === href || (href !== '/docs' && current.startsWith(href));

  if (href.startsWith('http')) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className="docs-nav-link flex items-center gap-1"
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

function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const results = query
    ? allLinks.filter(
        (l) =>
          l.label.toLowerCase().includes(query.toLowerCase()) ||
          l.href.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[20vh]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-panel border border-border-brand rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border-brand">
          <Search className="h-4 w-4 text-[var(--color-muted)]" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search docs..."
            className="flex-1 bg-transparent text-text text-sm outline-none placeholder:text-[var(--color-muted)]"
          />
          <kbd className="hidden sm:inline-flex h-5 items-center gap-0.5 rounded border border-border-brand bg-bg px-1.5 font-mono text-[10px] font-medium text-[var(--color-muted)]">
            esc
          </kbd>
        </div>
        {results.length > 0 && (
          <ul className="max-h-64 overflow-y-auto py-2">
            {results.map((r) => (
              <li key={r.href}>
                <button
                  onClick={() => {
                    if (r.href.startsWith('http')) window.open(r.href, '_blank');
                    else router.push(r.href);
                    onClose();
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-text hover:bg-[color-mix(in_oklab,var(--color-accent)_10%,transparent)] transition-colors cursor-pointer"
                >
                  {r.label}
                </button>
              </li>
            ))}
          </ul>
        )}
        {query && results.length === 0 && (
          <div className="px-4 py-6 text-center text-sm text-[var(--color-muted)]">
            No results for &quot;{query}&quot;
          </div>
        )}
      </div>
    </div>
  );
}

function DocsHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-brand bg-bg/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-14">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)]">
              <Globe className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-text tracking-tight">SaaS</span>
          </Link>
          <span className="hidden sm:inline-block rounded-full border border-border-brand bg-panel px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-muted)]">
            Docs
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-sm font-medium text-[var(--color-muted)] hover:text-text transition-colors"
          >
            Home
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-[var(--color-muted)] hover:text-text transition-colors"
          >
            Pricing
          </Link>
          <ThemeToggle />
          <ThemeConfig />
          <Button asChild className="rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] text-white border-0 hover:opacity-90">
            <Link href="/sign-up">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setSearchOpen((v) => !v);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <DocsHeader />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      <div className="flex">
        {/* Mobile toggle */}
        <button
          className="lg:hidden fixed bottom-6 right-6 z-50 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] p-3 text-white shadow-lg cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Search trigger */}
        <button
          onClick={() => setSearchOpen(true)}
          className="fixed lg:hidden bottom-6 left-6 z-50 flex items-center gap-2 rounded-full border border-border-brand bg-panel px-4 py-2.5 text-sm text-[var(--color-muted)] shadow-lg cursor-pointer"
        >
          <Search className="h-4 w-4" />
          <kbd className="font-mono text-[10px]">⌘K</kbd>
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-14 z-40 h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-border-brand bg-bg transition-transform lg:translate-x-0 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Search bar in sidebar (desktop) */}
          <div className="px-3 py-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex w-full items-center gap-2 rounded-md border border-border-brand bg-bg px-3 py-1.5 text-sm text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-text transition-colors cursor-pointer"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="flex-1 text-left">Search docs</span>
              <kbd className="font-mono text-[10px] text-[var(--color-muted)]">⌘K</kbd>
            </button>
          </div>

          <div className="px-4 pb-6 space-y-7">
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
    </>
  );
}
