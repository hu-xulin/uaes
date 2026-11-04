# Uter Technology Stack

**Knowledge status:** PARTIAL — repository manifests and root instructions inspected.  
**Last checked:** 2026-11-05.

| Area | Technology / location | Evidence |
|---|---|---|
| Backend language | Go | Root and nested `go.mod` files |
| Backend HTTP framework | Gin | Uter engineering instructions |
| ORM | GORM | Uter engineering instructions |
| Go modules | root, `relaykit`, `tokenkit`, `tokenkit/tokenkit` | Repository tree |
| Web framework | React 19 + TypeScript | `web/package.json` |
| Web build | Rsbuild | `web/package.json` |
| Web package manager | Bun | `web/package.json` and CI |
| Routing | TanStack Router | `web/package.json` |
| Server state | TanStack Query | `web/package.json` |
| Client state | Zustand | `web/package.json` |
| UI | Base UI / Tailwind CSS 4 | `web/package.json` |
| Desktop | Electron | `electron/package.json` |
| Documentation app | `docs-web/` | Repository tree |

Database, cache, provider SDK, and runtime versions MUST be verified from current configuration and source before implementation. This table is a discovery index, not permission to upgrade or replace technologies.
