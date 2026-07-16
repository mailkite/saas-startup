import type { ReactNode } from 'react';

export function GradientCard({
  children,
  className = '',
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`gradient-ring rounded-xl border border-border-brand bg-[color-mix(in_oklab,var(--color-panel)_60%,var(--color-bg))] p-6 ${
        hover ? 'transition-transform hover:-translate-y-1' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function FeatureCard({
  icon,
  title,
  body,
  className = '',
}: {
  icon: ReactNode;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <GradientCard className={className}>
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent-2)]/20 text-text">
        {icon}
      </div>
      <h3 className="mt-5 text-base font-semibold text-text">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{body}</p>
    </GradientCard>
  );
}
