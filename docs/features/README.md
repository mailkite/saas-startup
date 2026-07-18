# docs/features/ — one doc per feature

Every feature in this SaaS has a doc here. A feature doc is the human-and-agent-readable mirror
of what the code does: the job it serves, the surfaces and files it touches, and the decisions
behind it. When you add or change a feature, you write or update its doc **as part of the same
work** — not later.

## Rules

- **One doc per feature**, named `<kebab-feature-name>.md`.
- **Link it from the code.** Every code file the feature touches carries a top-of-file comment:
  ```ts
  // Docs: docs/features/<feature>.md
  ```
  If you move or rename code, move/rename its doc and fix the link.
- **Start from the decision.** A feature doc usually follows an options doc in
  [`../research/`](../research/) — link back to it so the "why" is one click away.
- **Keep it current.** The doc and the code must agree. A stale feature doc is a bug.

## Template

Copy [`_TEMPLATE.md`](_TEMPLATE.md) to start a new one.

## Index

_Add each feature here as you ship it:_

<!-- - [Team invites](team-invites.md) — invite teammates by email, role-gated -->
