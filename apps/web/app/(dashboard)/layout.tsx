'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import useSWR from 'swr';
import { mutate } from 'swr';
import { Button } from '@/components/ui/button';
import { Home, LogOut, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from '@/app/(login)/actions';
import { useRouter } from 'next/navigation';
import { Footer } from '@/components/Footer';
import type { User } from '@/lib/db/schema';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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
          href="/pricing"
          className="text-sm font-medium text-muted hover:text-text transition-colors"
        >
          Pricing
        </Link>
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
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer size-9">
          <AvatarImage alt={user.name || ''} />
          <AvatarFallback>
            {user.email
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-1">
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/dashboard" className="flex w-full items-center">
            <Home className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
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
  );
}

function Header() {
  return (
    <header className="border-b border-border-brand bg-bg/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)]">
            <Globe className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-text tracking-tight">SaaS</span>
        </Link>

        <div className="flex items-center gap-3">
          <Suspense fallback={<div className="h-9" />}>
            <UserMenu />
          </Suspense>
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      {children}
      <Footer />
    </section>
  );
}
