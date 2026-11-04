# Architecture Check Entrypoints

The architecture gate remains **DRAFT**. A check is considered accepted only when its source input is pinned, it runs in CI, and positive/negative tests are automated.

| Script | Status | Current scope / remaining work |
|---|---|---|
| check-architecture-manifests | IMPLEMENTED; CI PASS | Validates module IDs, required fields, source paths, manifest existence, Go module identities and package names against the pinned Uter checkout. |
| check-module-boundaries | IMPLEMENTED FOR RELAYKIT; CI PASS | Uses `go list` to inspect RelayKit direct imports; rejects host-module imports, SQL/ORM/Redis and transport client/server APIs. Allows HTTP request metadata and standard status constants, while excluding test-only helpers from production API scanning. Does not yet validate every module's complete boundary graph. |
| check-dependency-rules | IMPLEMENTED FOR FOUR GO MODULES; CI PASS | Compares actual Go package imports against `.uaes/registry/module-dependencies.yaml`; resolves overlapping module paths by longest prefix and fails closed on missing modules or `go list` errors. |
| check-api-contracts | BLOCKED | Generated API inventory and compatibility validator are not implemented. |
| check-database-migrations | BLOCKED | Migration inventory, compatibility policy, and rollback test harness are not implemented. |

## Source requirements

All source-level checks require `UTER_REPO_ROOT` to point to a pinned Uter checkout. Missing source, missing manifests, or failed Go package discovery are NOT PASS conditions.

```bash
UTER_REPO_ROOT=/absolute/path/to/uter ruby quality/scripts/architecture/check-architecture-manifests
UTER_REPO_ROOT=/absolute/path/to/uter ruby quality/scripts/architecture/check-module-boundaries
ruby quality/scripts/architecture/test-module-boundaries.rb\nruby quality/scripts/architecture/check-dependency-rules\nruby quality/scripts/architecture/test-dependency-rules.rb
```

## CI evidence

Pinned source: Uter commit `24a7d9a4f6525134c5fa8c2a6a2cf076e25cfacc`.

Latest Architecture Source Checks: **PASS** — https://github.com/hu-xulin/uaes/actions/runs/41896291067

Successful steps:
- Validate module manifests
- Validate RelayKit module boundary
- Run RelayKit boundary positive and negative controls
- Validate Go module dependency allowlist
- Run dependency allowlist positive and negative controls

The fixture suite covers:
- Positive: protocol metadata using `net/http` request types without transport APIs is accepted.
- Negative: SQL dependency is rejected.
- Negative: HTTP client transport API is rejected.
- Fail-closed: missing Uter source checkout is rejected.\n- Dependency rules positive: explicitly allowed Root → RelayKit import accepted.\n- Dependency rules negative: unlisted Root → RelayKit import rejected.

Observed Uter Go dependency graph: `MOD-GO-ROOT → MOD-RELAYKIT, MOD-TOKENKIT`; no other inter-module edges were reported. The dependency-rule fixture suite completed 2 runs / 4 assertions with 0 failures. The RelayKit boundary fixture suite completed 4 runs / 10 assertions with 0 failures. This validates the current four-module Go dependency policy; it does not prove frontend module boundaries, API compatibility, or database migration safety.

Keep UAES-04-GATE-001 in DRAFT until the remaining architecture controls are implemented and independently verified.
