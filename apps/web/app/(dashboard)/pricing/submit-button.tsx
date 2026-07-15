'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton({ featured = false }: { featured?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full cursor-pointer rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition-opacity ${
        featured
          ? 'bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] text-white shadow-lg shadow-[var(--color-accent)]/20 hover:opacity-90'
          : 'border border-border-brand bg-bg text-text hover:border-[var(--color-accent)]'
      }`}
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading...
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          Get Started
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      )}
    </button>
  );
}
