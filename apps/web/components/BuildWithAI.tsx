// Docs: docs/features/ai-dev-platform.md
import {
  Palette,
  Code2,
  Mail,
  CreditCard,
  Database,
  Compass,
  Search,
  CheckCircle2,
  Hammer,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import { GradientCard } from '@/components/GradientCard';

// The six agent skills shipped in apps/web/.claude/skills. Each card advertises
// the real skill slug (mono) so it reads as "point your agent here and go".
const skills = [
  { icon: Palette, title: 'UI system', slug: 'saas-ui', body: 'shadcn (new-york) on Tailwind v4 — brand tokens, dark-first, motion.' },
  { icon: Code2, title: 'Next.js app', slug: 'nextjs-app', body: 'App Router conventions — pages, server actions, route handlers, layouts.' },
  { icon: Mail, title: 'MailKite', slug: 'mailkite-provider', body: 'Auth, sessions, OAuth, and transactional email.' },
  { icon: CreditCard, title: 'Stripe', slug: 'stripe-provider', body: 'Checkout, subscriptions, the customer portal, and webhooks.' },
  { icon: Database, title: 'Supabase', slug: 'supabase-provider', body: 'Postgres + Drizzle — schema, migrations, typed queries.' },
  { icon: Compass, title: 'Research', slug: 'saas-research', body: 'Market, competitors, positioning, pricing, and go-to-market.' },
];

// The build loop, mirrored from AGENTS.md.
const loop = [
  { icon: Search, title: 'Research', body: 'Options weighed in docs/research/.' },
  { icon: CheckCircle2, title: 'Decide', body: 'A human records the call.' },
  { icon: Hammer, title: 'Build', body: 'The skills know your stack.' },
  { icon: FileText, title: 'Log', body: 'Every session in docs/worklog/.' },
];

export function BuildWithAI() {
  return (
    <section className="relative overflow-hidden bg-bg py-24">
      <div className="absolute inset-0 brand-glow opacity-40" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow mb-4">Ships with an AI dev platform</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">
            Extend it with an agent that <span className="text-gradient">knows your stack</span>
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">
            This isn&apos;t just a template. It clones with agent <strong className="text-text font-semibold">skills</strong>,
            an <code className="font-mono text-[var(--color-accent)]">AGENTS.md</code> process, and a{' '}
            <code className="font-mono text-[var(--color-accent)]">docs/</code> memory — so an AI agent can
            build new features, sections, and integrations that already fit the codebase.
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map(({ icon: Icon, title, slug, body }) => (
            <GradientCard key={slug}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent-2)]/20 text-text">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-text leading-tight">{title}</h3>
                  <p className="font-mono text-[11px] text-[var(--color-accent)]">/{slug}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">{body}</p>
            </GradientCard>
          ))}
        </div>

        {/* The build loop */}
        <div className="mt-14">
          <p className="text-center text-sm font-mono text-[var(--color-muted)] mb-8">
            research → decide → build → log — the loop, baked in
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {loop.map(({ icon: Icon, title, body }, i) => (
              <div key={title} className="relative flex flex-col items-center text-center px-2">
                {i < loop.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="hidden lg:block absolute top-5 left-1/2 w-full h-px bg-gradient-to-r from-[var(--color-accent)]/40 to-[var(--color-accent-2)]/20"
                  />
                )}
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border-brand bg-panel text-[var(--color-accent)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="mt-3 text-sm font-semibold text-text">{title}</h4>
                <p className="mt-1 text-xs text-[var(--color-muted)]">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            href="https://github.com/mailkite/saas-startup/blob/main/AGENTS.md"
            target="_blank"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border-brand bg-panel px-6 py-2.5 text-sm font-semibold text-text transition-all hover:border-[var(--color-accent)]/40"
          >
            Read the AGENTS.md process
          </Link>
        </div>
      </div>
    </section>
  );
}
