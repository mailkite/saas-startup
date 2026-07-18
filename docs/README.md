# docs/ — how we think, decide, and remember

This folder is the project's memory. It is where research happens **before** code, where
every feature is described, and where each agent (or human) work session is logged. The rule
from the root [`AGENTS.md`](../AGENTS.md): **docs mirror the code, and research precedes
building.**

If you are an AI agent extending this starter, read `AGENTS.md` first, then work through the
loop below.

## The loop

```
question ──▶ docs/research/<topic>.md ──▶ human decision ──▶ docs/features/<feature>.md ──▶ build ──▶ docs/worklog/<date>.md
             (options + trade-offs)         (recorded in doc)   (what we're building)        (code)     (what shipped)
```

1. **Research first.** Any non-trivial build or positioning decision starts as an options doc
   in [`research/`](research/) — a pros/cons list and a weighted list of options with concrete
   trade-offs. A human reviews and records the decision **in the same doc**. Use the
   `saas-research` skill.
2. **Describe the feature.** Every feature gets a doc in [`features/`](features/) — what it is,
   the surfaces and files it touches, the decisions behind it. Code files link back with a
   top-of-file comment: `// Docs: docs/features/<feature>.md`.
3. **Build**, using the provider/UI skills (see `AGENTS.md` §Skills).
4. **Log the session.** Drop a short entry in [`worklog/`](worklog/) — what shipped, decisions
   made, open asks. This is the paper trail across context windows and sessions.

## Layout

| Folder | What lives here | Template |
|---|---|---|
| [`features/`](features/) | One doc per feature — the mirror of what the code does | [`features/_TEMPLATE.md`](features/_TEMPLATE.md) |
| [`research/`](research/) | Options docs + recorded decisions (build & product) | [`research/_TEMPLATE.md`](research/_TEMPLATE.md) |
| [`research/marketing/`](research/marketing/) | Positioning, competitor teardowns, channels, pricing, conversion | — |
| [`worklog/`](worklog/) | Dated session logs — what an agent/human actually did | [`worklog/_TEMPLATE.md`](worklog/_TEMPLATE.md) |

Reference docs that predate this structure also live here: [`AUTH.md`](AUTH.md),
[`DEPLOYMENT.md`](DEPLOYMENT.md), [`SUBMISSIONS.md`](SUBMISSIONS.md).

## Naming

- Features: `features/<kebab-feature-name>.md` (e.g. `features/team-invites.md`).
- Research: `research/<kebab-topic>.md` (e.g. `research/auth-provider-choice.md`);
  marketing under `research/marketing/`.
- Worklog: `worklog/YYYY-MM-DD-<short-slug>.md` (e.g. `worklog/2026-07-17-stack-diagram.md`).
