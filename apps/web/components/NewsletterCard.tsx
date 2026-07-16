'use client';

import { useState } from 'react';

export function NewsletterCard() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  }

  return (
    <div className="gradient-ring rounded-xl border border-border-brand bg-panel p-5">
      <h4 className="text-sm font-semibold text-text">Stay up to date</h4>
      <p className="mt-1 text-xs text-[var(--color-muted)]">
        Product updates, SaaS tips, and early access.
      </p>
      {sent ? (
        <p className="mt-3 text-sm text-[var(--color-accent)] font-medium">
          Thanks! We'll be in touch.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 rounded-md border border-border-brand bg-bg px-3 py-1.5 text-xs text-text placeholder:text-[var(--color-muted)]"
          />
          <button
            type="submit"
            className="cursor-pointer rounded-md bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Join
          </button>
        </form>
      )}
    </div>
  );
}
