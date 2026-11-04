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
| check-router-openapi-drift | RUNTIME CAPTURE IMPLEMENTED; TWO CONTRACT MISMATCHES FOUND | Captures 450 static Gin routes plus the active built-in task-plugin generation (34 plugin routes), then verifies documented OpenAPI operations against runtime route patterns. The latest completed runtime capture reduced 7 mismatches to 2: `POST /api/oauth/wechat/bind` and `GET /api/verify/status`. |
| check-router-openapi-drift | IMPLEMENTED; RUNTIME DRIFT FOUND; RECHECK PENDING | Captures static Gin routes plus the active built-in task-plugin generation, then checks documented OpenAPI operations against actual route patterns. First run exposed 7 mismatches; 5 are built-in dynamic plugin routes now added to inventory, while 2 management operations remain undocumented by runtime Gin routes. |

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
UTER_REPO_ROOT=/absolute/path/to/uter ruby quality/scripts/architecture/check-router-openapi-drift
ruby quality/scripts/architecture/test-router-openapi-drift.rb
```

## CI evidence

Current pinned source: Uter PR #15 head `442ddb5a7c234f2ee2d78651e0882407e9371c91`.

Latest fully successful Architecture Source Checks before the router/OpenAPI checker was added: https://github.com/hu-xulin/uaes/actions/runs/41901973265 (UAES commit `c00435e2d564eb563afb473101c0481ec923620f`). Current Governance Validation passed at `ecf539cf7696e7afec4b57916a8f87a09318bb38`; the current Architecture Source Checks run failed on the initial route inventory because built-in dynamic plugin routes were not yet included. The checker has been corrected; a new run is required before reporting its outcome.

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

Database migration inventory integrity is now checked in CI: **20 custom migration steps and 2 manual SQL files** are present and source/function/path/order checks pass. The same job explicitly reports `DATABASE MIGRATION SAFETY: NOT_VERIFIED`; cross-database compatibility and a tested rollback/recovery harness remain NOT_VERIFIED and continue to block architecture-gate acceptance. A separate `Database Migration Dialect Matrix` workflow has now been added. It runs existing migration schema/custom-migration tests against ephemeral SQLite, MySQL 8.4.4, and PostgreSQL 17.4 databases, including migration stability, token-key uniqueness, prefill-group uniqueness, and user-session hash-column migration. This is a selected-path dialect matrix, not full replay of all 20 migration steps, not ClickHouse coverage, and not certification that irreversible migrations can be rolled back; its result is pending.

Frontend import inventory is now implemented and runs in CI against the pinned Uter checkout. The first scan covered 1,500 TypeScript/JavaScript source files and resolved all alias/relative local imports. Observed edges include `components → features` (18), `hooks → features` (2), `lib → features` (4), `stores → features` (1), and `features → routes` (6); `features → features` (2,809) and `features → components` (1,751) are also substantial. These are evidence of existing cross-layer coupling, not automatically defects. The checker is inventory-only and prints `FRONTEND MODULE BOUNDARIES: NOT_VERIFIED`; the exact dependency policy must be designed around this measured graph, including workspace-level relative imports, before any MUST rule is enforced. `features/` is organized into domain slices such as auth, channels, chat, dashboard, keys, models, and playground.

Router-to-OpenAPI drift checking captures the real Gin route table in a temporary test and separately reads `jsplugin.DefaultRegistry.Generation().Routes()` so built-in dynamic plugin endpoints are included. The latest completed runtime capture recorded 450 static Gin routes and 34 built-in plugin routes. It reduced the initial seven mismatches to two: `POST /api/oauth/wechat/bind` and `GET /api/verify/status`. The four Kling operations and `POST /jimeng/` are confirmed by the built-in plugin registry and are now correctly covered. The two remaining management operations are absent from the current Gin router registrations: the router exposes WeChat web OAuth flows and `/api/verify/methods` / `/api/verify`, not the documented `/api/oauth/wechat/bind` or `/api/verify/status`. The checker correctly continues to fail rather than silently waiving them. Resolve by implementing and testing the promised endpoints or by an explicit API-contract owner decision to correct the OpenAPI document; do not remove or waive either operation automatically. Keep UAES-04-GATE-001 in DRAFT until the remaining controls are implemented and independently verified.
