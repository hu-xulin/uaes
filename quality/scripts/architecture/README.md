# Architecture Check Entrypoints

The architecture gate remains **DRAFT**. A check is considered accepted only when its source input is pinned, it runs in CI, and positive/negative tests are automated.

| Script | Status | Current scope / remaining work |
|---|---|---|
| check-architecture-manifests | IMPLEMENTED; CI PASS | Validates module IDs, required fields, source paths, manifest existence, Go module identities and package names against the pinned Uter checkout. |
| check-module-boundaries | IMPLEMENTED FOR RELAYKIT; CI PASS | Uses `go list` to inspect RelayKit direct imports; rejects host-module imports, SQL/ORM/Redis and transport client/server APIs. Allows HTTP request metadata and standard status constants, while excluding test-only helpers from production API scanning. Does not yet validate every module's complete boundary graph. |
| check-dependency-rules | IMPLEMENTED FOR FOUR GO MODULES; CI PASS | Compares actual Go package imports against `.uaes/registry/module-dependencies.yaml`; resolves overlapping module paths by longest prefix and fails closed on missing modules or `go list` errors. |
| check-api-contracts | IMPLEMENTED FOR TWO OPENAPI DOCS; CI PASS | Validates OpenAPI 3.x structure, local references, security scheme references, operationId uniqueness, responses, and compatibility against the pinned baseline (operation removals, operationId changes, new required parameters/body fields, response removals, schema/property/type/enum breaks). |
| check-database-migrations | INVENTORY VALIDATION IMPLEMENTED; SAFETY NOT_VERIFIED | Validates pinned source identity, every registered custom migration source/function, unique IDs/order, and manual SQL files. It explicitly does not claim cross-dialect compatibility or rollback safety; those remain blocked. |
| check-frontend-module-inventory | PRODUCTION/TEST GRAPH INVENTORY; BOUNDARIES NOT_VERIFIED | Resolves alias/relative TypeScript/JavaScript imports, separates production imports from test-only imports, excludes generated route-tree modules from boundary edges, and reports evidence samples. It does not yet enforce allowed dependency directions; those require review of the measured production graph. |
| check-router-openapi-drift | RUNTIME CAPTURE IMPLEMENTED; TWO CONTRACT MISMATCHES FOUND | Captures 450 static Gin routes plus the active built-in task-plugin generation (34 plugin routes), then verifies documented OpenAPI operations against runtime route patterns. The latest completed runtime capture reduced 7 mismatches to 2: `POST /api/oauth/wechat/bind` and `GET /api/verify/status`. |


## Source requirements

All source-level checks require `UTER_REPO_ROOT` to point to a pinned Uter checkout. Missing source, missing manifests, or failed Go package discovery are NOT PASS conditions.

```bash
UTER_REPO_ROOT=/absolute/path/to/uter ruby quality/scripts/architecture/check-architecture-manifests
UTER_REPO_ROOT=/absolute/path/to/uter ruby quality/scripts/architecture/check-module-boundaries
ruby quality/scripts/architecture/test-module-boundaries.rb
ruby quality/scripts/architecture/check-dependency-rules
ruby quality/scripts/architecture/test-dependency-rules.rb
UTER_REPO_ROOT=/absolute/path/to/uter ruby quality/scripts/architecture/check-frontend-module-inventory # separates production/test edges; excludes generated route-tree imports
ruby quality/scripts/architecture/test-frontend-module-inventory.rb
UTER_REPO_ROOT=/absolute/path/to/uter ruby quality/scripts/architecture/check-router-openapi-drift
ruby quality/scripts/architecture/test-router-openapi-drift.rb
```

## CI evidence

Pinned source: Uter PR #15 head `442ddb5a7c234f2ee2d78651e0882407e9371c91`.

Latest UAES revision at this evidence refresh: `55a2fb38e4f82ca1cf917c4167699901d3e66187`.

- Governance Validation: PASS — https://github.com/hu-xulin/uaes/actions/runs/41906580256
- Database Migration Dialect Matrix: PASS — https://github.com/hu-xulin/uaes/actions/runs/41906580420
- Architecture Source Checks: expected blocking failure on the live route/OpenAPI comparison — https://github.com/hu-xulin/uaes/actions/runs/41906580552

The Architecture Source Checks run completed all preceding checks successfully: module manifests, RelayKit boundary and fixtures, Go module dependency allowlist and fixtures, API contract compatibility and fixtures, database migration inventory integrity, frontend production/test inventory and fixtures, and router/OpenAPI positive/negative fixtures. The final live router comparison correctly failed on the two unresolved documented operations listed below. This is not a green architecture gate.

### Go module and API evidence

Observed Uter Go dependency graph: `MOD-GO-ROOT → MOD-RELAYKIT, MOD-TOKENKIT`; no other inter-module edges were reported. The RelayKit boundary fixture suite completed 4 runs / 10 assertions with 0 failures. The dependency-rule fixture suite completed 2 runs / 4 assertions with 0 failures. The API contract suite completed 4 runs / 10 assertions with 0 failures. OpenAPI inventory at the pinned Uter source contains 161 management operations / 8 schemas and 38 relay operations / 52 schemas.

Uter OpenAPI defects found during the audit were corrected in Uter PR #15: duplicate `operationId` values on `/v1/images/generations` and `/v1/images/edits`, plus two undefined security scheme aliases in the management OpenAPI document. The compatibility checker detects breaking changes against the pinned baseline; it does not prove router implementation parity or frontend-client type parity.

### Database migration evidence

The inventory integrity check covers **20 custom migration steps and 2 manual SQL files**, including source/function/path/order validation. It explicitly reports `DATABASE MIGRATION SAFETY: NOT_VERIFIED`.

The selected dialect matrix passed on SQLite, MySQL 8.4.4, and PostgreSQL 17.4 in the latest run above:
- `TestMigrationSchemaStability` passed on all three dialects.
- Prefill-group uniqueness migration passed on all three, including PostgreSQL legacy-index/constraint and invalid-schema rollback cases.
- Token-key uniqueness migration passed on all three, including PostgreSQL legacy/invalid constraint cases.
- User-session previous-refresh-hash migration passed on all three.

This is not full replay of all 20 migration steps, not ClickHouse log-database coverage, and not full rollback/recovery certification. Migration safety remains NOT_VERIFIED.

### Frontend production dependency evidence

The scanner covers **1,500 source files**: 1,217 production, 282 test, and 1 generated source; it excludes 2 imports targeting generated route-tree files. All scanned local alias/relative imports resolved.

Production dependency edge counts include:
- `components → features`: 17
- `hooks → features`: 1
- `lib → features`: 2
- `stores → features`: 1
- `routes → features`: 100 (expected route-to-feature composition; not classified as a reverse-layer violation)
- `features → components`: 1,743
- `features → features`: 2,309

The 21 imports from lower-level/shared folders into feature slices are captured as candidates, not automatically declared violations:
- `components/ErrorBoundary.tsx → features/errors/general-error`
- `components/language-switcher.tsx → features/profile/lib/format`
- `components/layout/components/app-header.tsx` and `public-header.tsx → features/system-update/system-update-action`
- `components/layout/components/chat-presets-item.tsx → features/chat/*`
- `components/layout/config/system-settings.config.ts → features/system-settings/*/section-registry` (8 imports)
- `components/sign-out-dialog.tsx → features/auth/api`
- `hooks/use-status.ts → features/auth/types`
- `lib/auth-session.ts → features/auth/lib/auth-redirect`
- `lib/oauth.ts → features/auth/types`
- `stores/auth-store.ts → features/auth/secure-verification/types`

Routes importing feature slices are normal route composition and should not be blocked by a blanket rule. The next step is to classify the 21 lower-level-to-feature imports by runtime/type-only dependency and responsibility, identify shared contracts, and propose an explicit app-shell/composition boundary. No boundary enforcement has been enabled; `FRONTEND MODULE BOUNDARIES` remains `NOT_VERIFIED`.

### Router / OpenAPI runtime evidence

The runtime capture records **450 static Gin routes and 34 built-in dynamic plugin routes**. The route checker fixture suite passes before the live gate, including parameter routes, catch-all routes, missing-operation rejection, and method mismatch rejection.

The live comparison still reports exactly two documented operations with no matching runtime route:
- `POST /api/oauth/wechat/bind`
- `GET /api/verify/status`

Source inspection confirms that the current router exposes WeChat web OAuth routes under `/oauth/wechat-web/*`, not `/oauth/wechat/bind`; verification routes include `/verify/methods` and `/verify`, not `/verify/status`. These are contract-owner decisions: implement and test the promised endpoints, or explicitly revise the API contract after confirming intended behavior. Do not add speculative handlers, delete operations, or add waivers just to make CI green.

Keep UAES-04-GATE-001 in DRAFT until remaining controls and contract decisions are completed and independently verified.
