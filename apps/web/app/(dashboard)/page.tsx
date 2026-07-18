import { ArrowRight, CreditCard, Database, Globe, LayoutDashboard, Lock, Mail, MessageSquare, Palette, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import { BackgroundPixels } from '@/components/BackgroundPixels';
import { GradientCard, FeatureCard } from '@/components/GradientCard';
import { StackDiagram } from '@/components/StackDiagram';
import { BuildWithAI } from '@/components/BuildWithAI';

export default function HomePage() {
  return (
    <main>
      {/* ---- Hero --------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-bg">
        <div className="absolute inset-0 brand-glow" aria-hidden="true" />
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <BackgroundPixels />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
            {/* Copy */}
            <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
              <span className="eyebrow mb-6">
                Auth · Payments · Supabase Postgres · AI-extensible
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text animate-slide-up stagger-1">
                Next.js SaaS Starter —
                <span className="text-gradient"> launch your SaaS</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-[var(--color-muted)] max-w-2xl mx-auto lg:mx-0 animate-slide-up stagger-2">
                Everything wired together. MailKite for authentication, Stripe for payments,
                Postgres on Supabase with Drizzle ORM for your database, and a polished
                dashboard your users will love.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up stagger-3">
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--color-accent)]/30 transition-all hover:shadow-xl hover:shadow-[var(--color-accent)]/40 hover:scale-[1.02]"
                >
                  Get started free
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="https://github.com/mailkite/saas-startup"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border-brand bg-panel px-8 py-3 text-sm font-semibold text-text transition-all hover:border-[var(--color-accent)]/40"
                >
                  View the code
                </Link>
              </div>
            </div>

            {/* Animated architecture diagram */}
            <div className="animate-slide-up stagger-2 w-full">
              <StackDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* ---- Build with AI (the platform) --------------------------------- */}
      <BuildWithAI />

      {/* ---- Features ------------------------------------------------------ */}
      <section className="py-24 bg-panel">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow mb-4">Batteries included</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">
              Launch with <span className="text-gradient">production-ready</span> foundations
            </h2>
            <p className="mt-4 text-[var(--color-muted)]">
              Skip the boilerplate. Every essential is built in and ready to scale.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={<Zap className="h-5 w-5" />} provider={<Mail className="h-4 w-4" />} title="Authentication" body="Sign up, sign in, magic links, OAuth — powered by MailKite with JWT sessions out of the box." />
            <FeatureCard icon={<CreditCard className="h-5 w-5" />} provider={<CreditCard className="h-4 w-4" />} title="Payments" body="Stripe integration with checkout sessions, customer portal, and subscription management." />
            <FeatureCard icon={<Globe className="h-5 w-5" />} provider={<LayoutDashboard className="h-4 w-4" />} title="Team Management" body="Invite team members, manage roles, and collaborate from a shared dashboard." />
            <FeatureCard icon={<Database className="h-5 w-5" />} provider={<Database className="h-4 w-4" />} title="Supabase Postgres + Drizzle ORM" body="Type-safe queries and migrations on Postgres, hosted on Supabase — with Neon or any Postgres a drop-in swap." />
            <FeatureCard icon={<Lock className="h-5 w-5" />} provider={<Shield className="h-4 w-4" />} title="Security" body="CSRF protection, rate limiting, secure cookies, and password hashing — all configured." />
            <FeatureCard icon={<MessageSquare className="h-5 w-5" />} provider={<Palette className="h-4 w-4" />} title="Beautiful UI" body="Dark-first design system with shadcn components, responsive layouts, and a polished dashboard." />
          </div>
        </div>
      </section>

      {/* ---- How It Works -------------------------------------------------- */}
      <section className="py-24 bg-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="eyebrow mb-4">How it works</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">
              From zero to <span className="text-gradient">deployed</span> in minutes
            </h2>
          </div>

          <div className="space-y-8">
            {[
              { num: 1, title: 'Clone and configure', body: "Clone the repo, set your environment variables, and you're ready to go. One command gets you a running app." },
              { num: 2, title: 'Make it yours', body: 'Replace the placeholder copy, customize the design tokens, and add your product core features on top of solid foundations.' },
              { num: 3, title: 'Ship and scale', body: 'Deploy to Vercel with one command. Add your domain, connect your database, and start onboarding users — your SaaS is live.' },
            ].map((step, i, arr) => (
              <div key={step.num} className="relative">
                {i < arr.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute left-5 top-10 -bottom-8 w-px -translate-x-1/2 bg-gradient-to-b from-[var(--color-accent)]/40 to-[var(--color-accent-2)]/40"
                  />
                )}
                <div className="flex gap-6 items-start">
                  <div className="relative flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] text-white text-sm font-bold">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text">{step.title}</h3>
                    <p className="mt-2 text-[var(--color-muted)] leading-relaxed">{step.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA ----------------------------------------------------------- */}
      <section className="py-24 bg-bg relative overflow-hidden">
        <div className="absolute inset-0 brand-glow opacity-30" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">
            Ready to <span className="text-gradient">ship your SaaS</span>?
          </h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">
            Stop wrestling with boilerplate. Start building your product today.
          </p>
          <div className="mt-8">
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] px-10 py-3.5 text-base font-semibold text-white shadow-lg shadow-[var(--color-accent)]/30 transition-all hover:shadow-xl hover:shadow-[var(--color-accent)]/40 hover:scale-[1.02]"
            >
              Get started free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
