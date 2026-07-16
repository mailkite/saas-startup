'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import useSWR from 'swr';
import { mutate } from 'swr';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from '@/app/(login)/actions';
import { LogoLockup } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ThemeConfig } from '@/components/ThemeConfig';
import type { User } from '@/lib/db/schema';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/docs', label: 'Docs' },
];

function initials(user: User) {
  if (user.name) {
    return user.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0]!.toUpperCase())
      .join('');
  }
  return user.email[0]!.toUpperCase();
}

function UserMenu() {
  const { data: user } = useSWR<User>('/api/user', fetcher);
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    mutate('/api/user');
    router.push('/');
  }

  if (!user) {
    return (
      <>
        <Link
          href="/sign-in"
          className="text-sm font-medium text-muted hover:text-text transition-colors"
        >
          Sign in
        </Link>
        <Button asChild className="rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] text-white border-0 hover:opacity-90">
          <Link href="/sign-up">Get started</Link>
        </Button>
      </>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="cursor-pointer size-9">
            <AvatarImage alt={user.name || user.email} />
            <AvatarFallback>{initials(user)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="flex flex-col px-2 py-1.5">
            <span className="text-sm font-medium text-text truncate">
              {user.name || 'Account'}
            </span>
            <span className="text-xs text-muted truncate">{user.email}</span>
          </div>
          <DropdownMenuSeparator />
          <form action={handleSignOut} className="w-full">
            <button type="submit" className="flex w-full">
              <DropdownMenuItem className="w-full flex-1 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </button>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button asChild className="rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] text-white border-0 hover:opacity-90">
        <Link href="/dashboard">Dashboard</Link>
      </Button>
    </>
  );
}

export function SiteHeader({ badge }: { badge?: string }) {
  const pathname = usePathname();
  const linkClass = (href: string) => {
    const isActive = href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
    return `text-sm font-medium transition-colors ${
      isActive
        ? 'text-text underline underline-offset-4 decoration-[var(--color-accent)] decoration-2'
        : 'text-muted hover:text-text no-underline'
    }`;
  };

  return (
    <header className="border-b border-border-brand bg-bg/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/" className="group">
            <LogoLockup />
          </Link>
          {badge && (
            <span className="hidden sm:inline-block rounded-full border border-border-brand bg-panel px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
              {badge}
            </span>
          )}
        </div>

        <div className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-3">
            <Suspense fallback={<div className="h-9" />}>
              <UserMenu />
            </Suspense>
          </div>
          <div className="flex items-center gap-1 ml-1 border-l border-border-brand pl-3">
            <ThemeToggle />
            <ThemeConfig />
          </div>
        </div>
      </div>
    </header>
  );
}
