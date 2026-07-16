import { cn } from '@/lib/utils';

/**
 * The "S" mark, drawn on a 64x64 grid.
 *
 * Kept in sync by hand with scripts/generate-icons.mjs, which renders the
 * favicon / app-icon / social-card variants from this same path.
 */
const GLYPH = 'M46 17 H26 A7.5 7.5 0 0 0 26 32 H38 A7.5 7.5 0 0 1 38 47 H18';

/**
 * The tile is a CSS gradient rather than an SVG one so it tracks the accent
 * colours ThemeConfig swaps at runtime, and so two instances on a page can't
 * collide over a gradient id.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 rounded-[22%] bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)]',
        'h-7 w-7',
        className,
      )}
    >
      <svg viewBox="0 0 64 64" className="h-full w-full" fill="none" aria-hidden="true">
        <path d={GLYPH} stroke="#fff" strokeWidth="7.5" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Mark plus wordmark, for headers and footers. */
export function LogoLockup({
  className,
  markClassName,
  labelClassName,
  label = 'SaaS',
}: {
  className?: string;
  markClassName?: string;
  labelClassName?: string;
  label?: string;
}) {
  return (
    <span className={cn('flex items-center gap-2', className)}>
      <Logo className={markClassName} />
      <span className={cn('text-lg font-semibold tracking-tight text-text', labelClassName)}>{label}</span>
    </span>
  );
}
