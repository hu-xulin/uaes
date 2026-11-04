# UAES Project Context — Uter

## Project identity

- Product: **Uter**
- Product repository: https://github.com/hu-xulin/uter
- Standards repository: https://github.com/hu-xulin/uaes
- Relationship: parallel governance; UAES does not contain Uter product source code.

## Verified technical context

The Uter repository's root engineering instructions and module manifests identify the following current stack. Re-check the repository before relying on this context for implementation:

- Backend: Go, Gin, GORM.
- Frontend: React 19, TypeScript, Rsbuild, TanStack Router/Query/Table, Zustand, Base UI, Tailwind CSS 4.
- Frontend package manager: Bun.
- Databases: SQLite, MySQL, PostgreSQL; separately configured log database supports ClickHouse.
- Cache: Redis and in-memory cache.
- Desktop: Electron.
- Four Go module manifests were verified: `go.mod`, `relaykit/go.mod`, `tokenkit/go.mod`, and `tokenkit/tokenkit/go.mod`.

## Business and risk context

Uter is an AI API gateway/relay with upstream provider integrations, user management, billing, quota/token settlement, authentication, and an administrative web interface. Changes affecting payment, recharge, refunds, balance, quota, authentication, authorization, database migrations, secrets, or provider credentials require risk-based review and focused regression evidence.

## Project overlay ownership

The Uter repository remains authoritative for:
- Current architecture facts and implementation paths.
- Payment, balance, refund, and billing invariants.
- Authentication and authorization implementation details.
- Database compatibility and migration behavior.
- UTER Design System 3.0 and its token/component implementation.
- Existing test fixtures, quality scripts, CI workflows, and coverage baselines.

UAES defines shared governance and generic engineering standards; it must not erase these project-specific controls.
