import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[100dvh]">
      <div className="max-w-md space-y-8 p-4 text-center">
        <div className="flex justify-center">
          <Logo className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-bold text-text tracking-tight">Page Not Found</h1>
        <p className="text-base text-muted">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="max-w-48 mx-auto flex justify-center py-2 px-4 rounded-full text-sm font-medium text-white bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] hover:opacity-90 transition-opacity"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
