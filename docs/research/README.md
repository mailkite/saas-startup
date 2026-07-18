# docs/research/ — decide before you build

No non-trivial build or positioning decision is made from memory or reflex. It starts here, as
an **options doc**: live research, a pros/cons list, and a **weighted list of options** with
concrete trade-offs. A human reviews it and records the decision **in the same doc**. Then, and
only then, does building start.

Use the `saas-research` skill — it drives this loop and names the reference products worth
studying (Vercel, Stripe, Linear, Clerk, Supabase, Resend, Cal.com, Dub, Railway, Neon, …).

## What goes where

| Topic | Location |
|---|---|
| Build / architecture / product choices | `research/<topic>.md` |
| Marketing, positioning, competitors, pricing, launch, conversion | [`marketing/`](marketing/) |

## Rules

- **Live sources, not memory.** Link every source. Study how the strongest products in the
  space solve the same thing before proposing options.
- **Options are weighted.** Give each option a concrete pro/con and a recommendation, not a
  neutral list.
- **The decision lives in the doc.** After a human decides, append _what was chosen and why_.
  The doc becomes the citation for the resulting [`../features/`](../features/) doc.

## Template

Copy [`_TEMPLATE.md`](_TEMPLATE.md).

## Index

<!-- - [Auth provider choice](auth-provider-choice.md) — decided: MailKite sessions + local DB -->
