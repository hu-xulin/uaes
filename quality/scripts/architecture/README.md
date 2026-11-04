# Architecture Check Entrypoints

The architecture gate remains **DRAFT**. A check is considered accepted only when its source input is pinned, it runs in CI, and positive/negative tests are automated.

| Script | Status | Current scope / remaining work |
|---|---|---|
| check-architecture-manifests | IMPLEMENTED; CI PASS | Validates module IDs, required fields, source paths, manifest existence, Go module identities and package names against the pinned Uter checkout. |
| check-module-boundaries | IMPLEMENTED FOR RELAYKIT; CI PASS | Uses `go list` to inspect RelayKit direct imports; rejects host-module imports, SQL/ORM/Redis and transport client/server APIs. Allows HTTP request metadata and standard status constants, while excluding test-only helpers from production API scanning. Does not yet validate every module's complete boundary graph. |
| check-dependency-rules | IMPLEMENTED FOR FOUR GO MODULES; CI PASS | Compares actual Go package imports against `.uaes/registry/module-dependencies.yaml`; resolves overlapping module paths by longest prefix and fails closed on missing modules or `go list` errors. |
| check-api-contracts | IMPLEMENTED FOR TWO OPENAPI DOCS; CI PASS | Validates OpenAPI 3.x structure, local references, security scheme references, operationId uniqueness, responses, and compatibility against the pinned baseline (operation removals, operationId changes, new required parameters/body fields, response removals, schema/property/type/enum breaks). |
| check-database-migrations | INVENTORY VALIDATION IMPLEMENTED; SAFETY NOT_VERIFIED | Validates pinned source identity, every registered custom migration source/function, unique IDs/order, and manual SQL files. It explicitly does not claim cross-dialect compatibility or rollback safety; those remain blocked. |
| check-frontend-module-inventory | INVENTORY ONLY; BOUNDARIES NOT_VERIFIED | Resolves alias/relative TypeScript/JavaScript imports and reports observed top-level module edges. It does not yet enforce allowed dependency directions; those require review of the measured graph. |

## Source requirements

All source-level checks require `UTER_REPO_ROOT` to point to a pinned Uter checkout. Missing source, missing manifests, or failed Go package discovery are NOT PASS conditions.

```bash
UTER_REPO_ROOT=/absolute/path/to/uter ruby quality/scripts/architecture/check-architecture-manifests
UTER_REPO_ROOT=/absolute/path/to/uter ruby quality/scripts/architecture/check-module-boundaries
ruby quality/scripts/architecture/test-module-boundaries.rb
ruby quality/scripts/architecture/check-dependency-rules
ruby quality/scripts/architecture/test-dependency-rules.rb
UTER_REPO_ROOT=/absolute/path/to/uter ruby quality/scripts/architecture/check-frontend-module-inventory
ruby quality/scripts/architecture/test-frontend-module-inventory.rb
```

## CI evidence

Current pinned source: Uter PR #15 head `442ddb5a7c234f2ee2d78651e0882407e9371c91`.

Latest Architecture Source Checks: **PASS** — https://github.com/hu-xulin/uaes/actions/runs/41900900229 (UAES commit `870553801fa568d34700ddaa227a882211f3fcad`).

Successful steps:
- Validate module manifests
- Validate RelayKit module boundary
- Run RelayKit boundary positive and negative controls
- Validate Go module dependency allowlist
- Run dependency allowlist positive and negative controls
- Validate OpenAPI contracts and compatibility
- Run API contract positive and negative controls
- Validate Go module dependency allowlist
- Run dependency allowlist positive and negative controls

The fixture suite covers:
- Positive: protocol metadata using `net/http` request types without transport APIs is accepted.
- Negative: SQL dependency is rejected.
- Negative: HTTP client transport API is rejected.
- Fail-closed: missing Uter source checkout is rejected.
- Dependency rules positive: explicitly allowed Root → RelayKit import accepted.
- Dependency rules negative: unlisted Root → RelayKit import rejected.

Observed Uter Go dependency graph: `MOD-GO-ROOT → MOD-RELAYKIT, MOD-TOKENKIT`; no other inter-module edges were reported. The dependency-rule fixture suite completed 2 runs / 4 assertions with 0 failures. The RelayKit boundary fixture suite completed 4 runs / 10 assertions with 0 failures. The API contract suite completed 4 runs / 10 assertions with 0 failures. OpenAPI inventory at the pinned Uter source contains 161 management operations / 8 schemas and 38 relay operations / 52 schemas. The checker detects breaking changes against the baseline; it does not yet prove router implementation drift against OpenAPI or frontend-client type parity.

Uter OpenAPI defects found during the audit were corrected in Uter PR #15: duplicate `operationId` on `/v1/images/generations` and `/v1/images/edits`, plus two undefined security scheme aliases in the management OpenAPI document. UAES checks use Uter source commit `442ddb5a7c234f2ee2d78651e0882407e9371c91`.

Database migration inventory integrity is now checked in CI: **20 custom migration steps and 2 manual SQL files** are present and source/function/path/order checks pass. The same job explicitly reports `DATABASE MIGRATION SAFETY: NOT_VERIFIED`; cross-database compatibility and a tested rollback/recovery harness remain NOT_VERIFIED and continue to block architecture-gate acceptance.

Frontend source inventory (same pinned Uter PR #15 head) shows distinct `routes/`, `features/`, `components/`, `design-system/`, `context/`, `hooks/`, `lib/`, `stores/`, `config/`, `i18n/`, and `styles/` roots. `features/` is itself organized into domain slices (for example auth, channels, chat, dashboard, keys, models, playground, wallet-related route areas). This is observed structure only: no frontend import-graph or boundary checker has been implemented or accepted yet. Do not infer dependency direction from folder names alone.

Router-to-OpenAPI implementation drift is also not yet covered. The current OpenAPI checker validates the document and compatibility baseline only; it does not extract Gin route registrations from `router/*.go`. This remains an explicit architecture blocker. Keep UAES-04-GATE-001 in DRAFT until the remaining controls are implemented and independently verified.
