# Uter Module Map

**Knowledge status:** PARTIAL — repository structure inventory only.  
**Last checked:** 2026-11-05  
**Source:** Uter Git Tree at the integration audit baseline.

| Area | Path | Evidence status |
|---|---|---|
| Main Go application | repository root (`go.mod`) | Path verified |
| Relay library | `relaykit/go.mod` | Path verified |
| Token library | `tokenkit/go.mod` | Path verified |
| Nested token module | `tokenkit/tokenkit/go.mod` | Path verified |
| Web application | `web/` | Path verified |
| Desktop application | `electron/` | Path verified |
| Documentation web app | `docs-web/` | Path verified |
| Deployment assets | `deploy/` | Directory verified |

There are four Go module manifests in the inspected repository tree: root, `relaykit`, `tokenkit`, and `tokenkit/tokenkit`.

## Missing evidence

- Module import/dependency graph.
- Package ownership and public API boundaries.
- Runtime call graph and service startup graph.
- Cross-module cycle analysis.
- Data ownership and migration boundaries.

Do not treat this directory inventory as an architecture dependency map. Populate the missing evidence from `go list -deps`, source analysis, manifests, and CI checks.
