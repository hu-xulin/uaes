# Architecture Check Entrypoints

The architecture gate remains **DRAFT**. A check is considered accepted only when its source input is pinned, it runs in CI, and positive/negative tests are automated.

| Script | Status | Current scope / remaining work |
|---|---|---|
| check-architecture-manifests | IMPLEMENTED; CI INTEGRATION PENDING | Validates module IDs, required fields, source paths, manifest existence, Go module identities and package names against a Uter checkout supplied through `UTER_REPO_ROOT`. |
| check-module-boundaries | IMPLEMENTED PROTOTYPE; CI / FIXTURE TESTS PENDING | Uses `go list` in the independent RelayKit module and rejects imports from host application, HTTP transport, SQL/ORM and Redis packages. This currently enforces the documented RelayKit hard boundary only; it is not a complete cross-module boundary graph. |
| check-dependency-rules | BLOCKED | Verified dependency allowlist and machine-readable dependency graph are not implemented. |
| check-api-contracts | BLOCKED | Generated API inventory and compatibility validator are not implemented. |
| check-database-migrations | BLOCKED | Migration inventory, compatibility policy, and rollback test harness are not implemented. |

## Source requirements

Both implemented scripts require `UTER_REPO_ROOT` to point to a pinned Uter checkout. Missing source, missing manifests, or failed Go package discovery are NOT PASS conditions.

Run:

```bash
UTER_REPO_ROOT=/absolute/path/to/uter ruby quality/scripts/architecture/check-architecture-manifests
UTER_REPO_ROOT=/absolute/path/to/uter ruby quality/scripts/architecture/check-module-boundaries
```

## Evidence boundaries

The manifest validator has prior local positive/negative fixture evidence and a Ruby syntax check. The module-boundary prototype has not yet been run against the pinned Uter tree and has no committed positive/negative fixture suite. Neither check is currently wired into the existing governance workflow. Existing governance CI success must not be cited as evidence for either source-level check.

Do not change a blocked check to exit 0 until it performs the named checks and has positive and negative tests. Keep UAES-04-GATE-001 in DRAFT until all blockers are resolved and independently verified.
