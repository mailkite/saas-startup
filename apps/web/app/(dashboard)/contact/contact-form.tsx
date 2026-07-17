'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitContact } from './actions';
import { ActionState } from '@/lib/server-actions';

// Keep in sync with INQUIRY_TYPES in actions.ts.
const INQUIRY_TYPES = [
  { value: 'general', label: 'General inquiry' },
  { value: 'sales', label: 'Sales' },
  { value: 'support', label: 'Support' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'feedback', label: 'Feedback' },
];

export function ContactForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    submitContact,
    { error: '' }
  );

  if (state.success) {
    return (
      <div className="gradient-ring rounded-xl border border-border-brand bg-panel p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent)]/10">
          <CheckCircle2 className="h-6 w-6 text-[var(--color-accent)]" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-text">Message sent</h3>
        <p className="mt-1 text-sm text-[var(--color-muted)]">{state.success}</p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="gradient-ring space-y-5 rounded-xl border border-border-brand bg-panel p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" className="mb-1.5 text-text">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            defaultValue={state.name}
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <Label htmlFor="email" className="mb-1.5 text-text">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={255}
            defaultValue={state.email}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="inquiryType" className="mb-1.5 text-text">
          Inquiry type
        </Label>
        <select
          id="inquiryType"
          name="inquiryType"
          required
          defaultValue={state.inquiryType || 'general'}
          className="border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30"
        >
          {INQUIRY_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="message" className="mb-1.5 text-text">
          Message
        </Label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          defaultValue={state.message}
          placeholder="How can we help?"
          className="border-input placeholder:text-muted-foreground flex w-full min-w-0 resize-y rounded-md border bg-transparent px-3 py-2 text-base shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30"
        />
      </div>

      {state.error && (
        <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="w-full rounded-full border-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] text-white hover:opacity-90 sm:w-auto"
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          'Send message'
        )}
      </Button>
    </form>
  );
}
