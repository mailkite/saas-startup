---
name: saas-ui
description: The UI system for this repo — shadcn/ui (new-york style) on Tailwind CSS v4 (CSS-first, no config), with a dark-first brand token contract and a set of custom brand components. Use when building or restyling any UI, adding a shadcn component, working with Tailwind tokens or the brand utilities (.brand-glow, .text-gradient, .eyebrow, .gradient-ring), composing classes with cn(), building motion, or touching theming/dark mode. Triggers: "add a button/card/dialog", "shadcn", "Tailwind", "style this", "brand color/accent", "dark mode", "animate", "GradientCard/FeatureCard/StackDiagram".
version: 1.0.0
author: saas-startup
tags:
  - ui
  - shadcn
  - tailwind
  - design-system
  - theming
  - motion
---

# saas-ui — the shadcn + Tailwind v4 UI system for this repo

How UI is built here: shadcn/ui (new-york) components sit on Tailwind v4 with a dark-first brand token layer defined in `app/globals.css`. Reuse the tokens, utilities, and brand components below before hand-rolling anything.

## When to use

- Adding or restyling any UI, page section, or component.
- Pulling in a shadcn primitive (`button`, `card`, `dialog`, …).
- Reaching for a color, radius, gradient, glow, grid, or eyebrow — use the tokens/utilities, not raw hex.
- Composing conditional class strings (use `cn()`).
- Building motion, or fixing something that misbehaves in light mode / under reduced motion.

## Where it lives in this repo

| Path | What it is |
| --- | --- |
| `components.json` | shadcn config: `style: new-york`, `baseColor: zinc`, `iconLibrary: lucide`, RSC on, aliases below. |
| `app/globals.css` | The whole CSS contract: `@theme` brand tokens, shadcn HSL tokens, and every brand utility. No `tailwind.config` exists — v4 is CSS-first. |
| `lib/utils.ts` | `cn()` = `twMerge(clsx(...))`. The only way to build class strings. |
| `components/ui/` | shadcn primitives (`avatar`, `button`, `card`, `dropdown-menu`, `input`, `label`, `radio-group`). Managed by the CLI — regenerate, don't fork. |
| `components/GradientCard.tsx` | `GradientCard` (gradient-ring panel) + `FeatureCard` (icon/title/body). Reuse for card surfaces. |
| `components/BackgroundPixels.tsx` | Canvas ripple backdrop; reads `--color-accent`/`-2` off the root, re-runs on theme change. |
| `components/StackDiagram.tsx` | Reference motion pattern: SVG rails + offset-path packets, resting = success state, motion gated behind `.is-live`. |
| `components/` (rest) | `Logo`, `SiteHeader`, `Footer`, `NewsletterCard`, and the `Theme*` set (`ThemeProvider`/`ThemeToggle`/`ThemeConfig`/`ThemeScript`). |

Aliases (from `components.json`): `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`. Always import through these.

## How to add a shadcn component

```bash
npx shadcn@latest add dialog
```

It lands in `components/ui/` in new-york style with zinc base + lucide icons, wired to the tokens already in `globals.css`. Don't paste components from the web by hand — the CLI keeps style/aliases/tokens consistent. Import with `import { Dialog } from "@/components/ui/dialog"`.

## How to compose classes with cn()

Never string-concat or template-literal class names — `cn()` merges and de-conflicts Tailwind classes (`twMerge`) and handles conditionals (`clsx`):

```tsx
import { cn } from "@/lib/utils";

<button
  className={cn(
    "rounded-lg px-4 py-2 text-sm font-medium",
    isPrimary && "bg-[var(--color-accent)] text-white",
    disabled && "opacity-50 pointer-events-none",
    className, // caller override wins, thanks to twMerge
  )}
/>
```

## How to use the brand tokens & utilities

The brand palette lives in `@theme` in `globals.css` and is dark-first; `html[data-theme="light"]` overrides it. Use the tokens, not literals:

| Token | Meaning |
| --- | --- |
| `--color-bg` / `--color-panel` | page bg / raised surface |
| `--color-text` / `--color-muted` | body text / secondary text |
| `--color-accent` (`#6ea8fe`) | primary blue |
| `--color-accent-2` (`#7c6cff`) | violet, for gradients |
| `--color-border-brand` | hairline borders |

`--color-bg/panel/text/muted/accent/accent-2/border-brand` are real Tailwind colors (v4 derives `bg-panel`, `text-text`, `border-border-brand`, etc. from the `@theme` names). For the ones without a shorthand or when mixing, reference the var directly, e.g. `bg-[var(--color-panel)]`, `text-[var(--color-muted)]`, `bg-[color-mix(in_oklab,var(--color-accent)_16%,transparent)]`.

Ready-made brand utilities (all in `globals.css`):

- `.text-gradient` — accent→accent-2 gradient text.
- `.brand-glow` — animated radial hero glow (dims to 0.5 opacity in light).
- `.grid-bg` — masked grid backdrop.
- `.gradient-ring` — 1px gradient border ring on any rounded box (used by `GradientCard`, `StackDiagram`).
- `.eyebrow` — uppercase accent label with a leading rule.
- `.animate-slide-up` (+ `.animate-slide-up-delayed`) with `.stagger-1..6` for entrance timing.

```tsx
<span className="eyebrow">Why teams switch</span>
<h2 className="text-gradient text-4xl font-bold">Ship faster</h2>
<p className="animate-slide-up stagger-2 text-[var(--color-muted)]">…</p>
```

## How to reuse GradientCard / FeatureCard

Prefer these over a fresh `<div>` for card surfaces — they already carry the gradient ring, panel mix, and hover lift:

```tsx
import { GradientCard, FeatureCard } from "@/components/GradientCard";
import { Mail } from "lucide-react";

<GradientCard>            {/* hover lift on by default; pass hover={false} to disable */}
  <p className="text-sm text-[var(--color-muted)]">Custom content…</p>
</GradientCard>

<FeatureCard
  icon={<Mail className="h-5 w-5" />}
  title="Email built in"
  body="Auth and transactional mail ship on day one."
/>
```

Note these two components take a `className` string and concatenate it (`hover ? … : ''`). That's their existing local convention; for your own new components use `cn()`.

## How to do dark-first + reduced-motion right

Dark is the default; everything must also read in `html[data-theme="light"]`. Don't hardcode `#000`/`#fff` — go through tokens so both themes track. If a component reads CSS vars in JS (like `BackgroundPixels`), re-read them when the theme changes (it keys its effect on `theme` from `useTheme()`).

Gate every non-trivial animation behind `prefers-reduced-motion`. CSS-only motion belongs inside `@media (prefers-reduced-motion: no-preference)` (the pattern `StackDiagram` uses) or add a `reduce` guard like the one already covering `.animate-slide-up`. JS-driven motion must bail early:

```ts
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
```

## How to build motion like StackDiagram

The house style for animated diagrams (`StackDiagram.tsx`):

1. **Resting state = success.** With no JS and under reduced motion the thing renders complete — every rail drawn, every node lit. Motion is pure enhancement, never load-bearing for meaning.
2. **Gate motion behind `.is-live`.** An `IntersectionObserver` (threshold ~0.35) adds `.is-live` when scrolled into view, then disconnects. The observer is skipped entirely under reduced motion or when `IntersectionObserver` is unavailable, so it stays in its rest state.
3. **SVG rails double as offset-paths.** The same path string is both the visible dashed `.sd-rail` and the packet's `offsetPath`, so track and packet can't drift apart.
4. **Colors from tokens.** Strokes/fills use `url(#sd-grad)` (accent→accent-2) and `color-mix(... var(--color-accent) ...)`, so it themes automatically.

Match this when adding any animated figure. Copy the observer + `@media (prefers-reduced-motion: no-preference)` scaffold rather than inventing a new approach.

## Conventions (settled — don't relitigate)

- **Reuse before hand-rolling.** Check `components/ui/`, then the brand components, then the utilities in `globals.css` before writing new CSS or markup.
- **Tokens, not raw hex.** Style through `--color-*` and the brand utilities so light/dark and future re-skins hold.
- **`cn()`, not string concat**, for any new component's class logic.
- **lucide icons only** (`import { X } from "lucide-react"`), sized with `h-*/w-*`.
- **Dark-first, and verify light.** `prefers-reduced-motion` is respected everywhere.
- **Import via `@/` aliases**, never deep relative paths.
- **shadcn primitives come from the CLI.** Don't fork files in `components/ui/`.

## Before you call it done

- [ ] Responsive — no fixed widths that break narrow; check ~375px up.
- [ ] Keyboard focus is visible (the base layer applies `outline-ring/50`; don't strip it).
- [ ] Verified in light theme (`html[data-theme="light"]`), not just dark.
- [ ] Reduced-motion path renders correctly and animations are actually suppressed.
- [ ] `npm run build` and `npm run lint` are clean.

## Related

- `nextjs-app` — routing, RSC/client boundaries, and where these components mount.
- `mailkite-provider` — email/auth surfaces (`NewsletterCard`, contact form) styled with this system.
- `stripe-provider` — billing/checkout UI.
- `supabase-provider` — data behind the screens you're building.
- `saas-research` — before adding a new dependency or pattern, check what's already decided.

After building UI for a feature, update its doc in `docs/features/<feature>.md`, link that doc at the top of new components (`// Docs: docs/features/<feature>.md`), and log the session in `docs/worklog/`. See the root `AGENTS.md`.
