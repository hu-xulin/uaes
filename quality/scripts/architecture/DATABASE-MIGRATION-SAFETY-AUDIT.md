# Database Migration Safety Audit

**Status:** DRAFT / EVIDENCE-BASED AUDIT / NOT A ROLLBACK CERTIFICATION  
**Uter source baseline:** `hu-xulin/uter@337485b4b19824f9bee59b6f8226802b455ab0ec`  
**UAES owner branch:** `ai/uaes-agent-skills-governance-2026-11-05`  
**Audit scope:** Main DB, log DB, GORM AutoMigrate, ordered custom migration functions, operator-invoked migration, legacy SQL scripts.

## 1. Executive result

The repository does not have an independent migration ledger or a rollback/replay harness. The existing database matrix is a selected-migration smoke/integration check, not proof that every migration can be replayed, rolled back, or recovered across SQLite, MySQL, PostgreSQL, and ClickHouse.

**Current classification:**
- Schema migration safety: **PARTIALLY VERIFIED**
- Data migration safety: **PARTIALLY VERIFIED**
- Full cross-database replay: **NOT VERIFIED**
- Rollback safety: **NOT VERIFIED**
- Backup/restore recovery: **NOT VERIFIED**
- Legacy manual SQL idempotency: **ONE CONFIRMED HIGH-RISK NON-IDEMPOTENT SCRIPT**

No production database was accessed or modified. This document does not authorize production migration.

## 2. Evidence anchors

All code observations below are tied to the exact Uter source commit above:
- `model/main.go#migrateDB`, `InitDB`, `InitLogDB`, `migrateLOGDB`
- `model/token_migration.go#migrateTokenKeyUniqueness`
- `model/prefill_group_migration.go#migratePrefillGroupUniqueness`
- `model/option_primary_key_migration.go#migrateOptionPrimaryKey`
- `model/usedata_migration.go#dedupeQuotaDataAggregatesOnce`
- `model/user_email_migration.go#migrateUserEmailNormalization`
- `model/twofa_migration.go#MigrateTwoFASecretsToEncrypted`
- `model/frontend_option_migration.go#MigrateRetiredFrontendOptions`
- `model/log_index_migration.go#migrateLogIndexRedundancy`
- `bin/migration_v0.2-v0.3.sql`
- `bin/migration_v0.3-v0.4.sql`

Migration entrypoint order is important: token-key uniqueness, prefill-group uniqueness, subscription-plan price conversion, token model_limits conversion, options PK repair, quota_data dedupe, GORM AutoMigrate, auth-version initialization, email normalization, legacy access-token retirement initialization, external identity claims, then subscription_plans handling. Log DB path separately runs audit-log migration, ClickHouse DDL or GORM Log AutoMigrate, redundant-index removal, and cache-token backfill after log DB initialization.

## 3. Confirmed findings

### DBM-LEGACY-001 — quota transfer SQL is not idempotent
**Source:** `bin/migration_v0.2-v0.3.sql`

The script adds the sum of every token's `remain_quota` to each user's `quota`. It does not mark migrated tokens, record a migration ledger entry, or otherwise prevent the same update from running again. Re-execution can credit the same remaining token quota to users more than once.

**Severity:** HIGH  
**Classification:** Confirmed repeat-execution hazard  
**Required action:** Do not rerun this script on a database where its execution status is unknown. Before any future execution, require a verified backup, per-user before/after reconciliation, and an owner-approved one-time execution protocol. Prefer a new guarded migration with an immutable execution record; do not silently rewrite historical behavior.

### DBM-LEGACY-002 — ability seed SQL is guarded but still requires semantic reconciliation
**Source:** `bin/migration_v0.3-v0.4.sql`

The insert uses `NOT EXISTS` on (group, model, channel_id), so repeated execution does not insert an identical tuple when the matching row remains. It is conditionally idempotent for that tuple. It does not reconcile existing disabled rows or rows with different tuple semantics.

**Severity:** MEDIUM  
**Required action:** Verify expected tuple count and enabled state before/after; test against actual unique constraints and dialect (script uses MySQL-style backtick quoting).

### DBM-001 — 64-bit wallet schema preflight is a hard stop with an explicit bypass
**Source:** `model/main.go#ensureUserQuotaColumns`

MySQL/PostgreSQL wallet columns are checked for 64-bit integer types; SQLite is skipped. Startup stops on unsupported 32-bit columns unless `SKIP_64BIT_QUOTA_SCHEMA_CHECK=true`.

**Severity:** HIGH (financial data integrity)  
**Recovery:** Operator-led schema conversion after backup and range/overflow validation. The bypass must not be used as a repair.

### DBM-002 / DBM-003 — PostgreSQL uniqueness rewrites are transactional but lock-sensitive
**Sources:** `model/token_migration.go`, `model/prefill_group_migration.go`

Both inspect existing PostgreSQL catalog definitions, acquire an ACCESS EXCLUSIVE table lock, and change constraints/indexes inside a transaction. Unknown token-key constraints fail closed. Prefill migration adds `deleted_at` if absent and replaces global uniqueness with a partial unique index for non-deleted rows.

**Severity:** HIGH (availability and uniqueness)  
**Evidence gap:** No live PostgreSQL version matrix, lock-timeout test, concurrent writer test, interrupted-transaction test, or pre-existing unusual index fixture was established by this audit. Transactional DDL is PostgreSQL-specific; do not generalize this guarantee to other engines.

### DBM-004 — subscription plan price conversion can silently retain old schema or round values
**Source:** `model/main.go#migrateSubscriptionPlanPriceAmount`

The migration is invoked before AutoMigrate and its caller does not receive an error. The complete function was inspected: MySQL alters the column to DECIMAL(10,6) NOT NULL DEFAULT 0; PostgreSQL casts using ::decimal(10,6). Metadata lookup errors are logged and the DDL attempt continues; DDL errors are also logged and swallowed, so startup proceeds with the old type. PostgreSQL returns early for any data_type='numeric' without checking precision/scale, so numeric columns with a different precision/scale may be incorrectly treated as already migrated. DECIMAL(10,6) conversion can round values beyond six fractional digits and may overflow values outside the target range. SQLite skips the conversion.

**Severity:** HIGH (financial amount precision)  
**Required action:** Inspect the complete function and test representative positive, negative, boundary, fractional, NULL, and malformed legacy values for each supported engine. Compare decimal values before/after, not only column types.

### DBM-005 — token model_limits type change has dialect-specific DDL
**Source:** `model/main.go#migrateTokenModelLimitsToText`

The migration skips SQLite, uses PostgreSQL ALTER COLUMN TYPE text and MySQL MODIFY COLUMN text. Metadata lookup failures are logged and execution proceeds to DDL; DDL failure returns an error and stops startup.

**Severity:** MEDIUM  
**Evidence gap:** No large-table lock/duration test, data-length preservation test, or MySQL/PostgreSQL upgrade-version matrix was run in this audit.

### DBM-006 — options primary-key repair creates a legacy snapshot table but recovery is not yet proven
**Source:** `model/option_primary_key_migration.go`

The repair reads rows, deduplicates them, rebuilds into `options_pk_tmp`, verifies the rebuilt row count, and uses an `options_legacy_*` backup table during replacement. The caller logs and continues if the migration returns an error.

**Severity:** HIGH (system configuration persistence)  
**Required action:** Verify exact rename/swap ordering and all failure points from the complete function; test duplicate and empty keys, process termination at every DDL boundary, retry with leftover temp/legacy tables, and restoration from the retained legacy table. Do not drop legacy tables without independent reconciliation.

### DBM-007 — quota_data dedupe is a destructive aggregate merge
**Source:** `model/usedata_migration.go#dedupeQuotaDataAggregatesOnce`

Duplicate aggregate groups are merged by summing count/quota/token_used into the lowest-ID row, then deleting other rows, inside a transaction. Errors are logged and startup continues.

**Severity:** MEDIUM  
**Recovery:** A reverse operation cannot reconstruct the original row partitioning from the merged row alone. Preserve a pre-migration snapshot or immutable duplicate-group export if exact row-level rollback is required. Validate aggregate totals and NULL/group-key semantics on all engines.

### DBM-008 — GORM AutoMigrate is not treated as reversible
**Source:** `model/main.go#migrateDB`, `migrateLOGDB`

AutoMigrate changes schema for dozens of models. There is no project-owned generated down migration or complete before/after schema diff evidence in the current inventory.

**Severity:** HIGH  
**Required action:** Capture schema snapshots per dialect and test upgrades from supported historical schema fixtures. Recovery is backup/restore or forward-fix unless a specific change has a separately verified reverse migration.

### DBM-009 / DBM-011 / DBM-012 — initializer and backfill side effects need per-function contracts
**Sources:** `model/main.go` and referenced initializer functions

These run after AutoMigrate and can mutate authentication versions, legacy access-token retirement metadata, and external identity claims. This audit has not yet established complete before/after invariants, row counts, and failure-injection evidence for each.

**Severity:** HIGH for auth identity state  
**Required action:** Review implementations and tests; require idempotency, no credential loss, uniqueness preservation, and interrupted-run retry tests.

### DBM-010 — email normalization intentionally skips case-duplicate accounts
**Source:** `model/user_email_migration.go#migrateUserEmailNormalization`

The migration checks case-insensitive duplicate groups. If any exist, it leaves all email values unchanged and keeps LOWER(email) lookup fallback. Otherwise it lowercases and trims stored email values.

**Severity:** HIGH (identity/account lookup)  
**Recovery:** Resolve duplicates through an explicit account-owner process before retry. Do not automatically merge accounts. Add tests for whitespace variants, Unicode/collation behavior, concurrent registration, and unique-index behavior.

### DBM-014 / DBM-015 / DBM-016 — audit and ClickHouse log schema/TTL are not rollback-certified
**Sources:** `model/audit_log.go`, `model/main.go`

ClickHouse log setup creates a MergeTree table and synchronizes TTL. A positive TTL can delete old log data; setting TTL to zero removes an existing TTL but does not restore already deleted rows.

**Severity:** HIGH (audit/log retention)  
**Required action:** Verify configured retention against business/legal retention policy; test TTL changes in disposable ClickHouse; capture DDL and row-count evidence. ClickHouse must remain a log DB only.

### DBM-017 — redundant log index removal is intentionally best-effort
**Source:** `model/log_index_migration.go#migrateLogIndexRedundancy`

Two named single-column indexes are dropped after checking existence. Failure is logged and startup continues. The code comment states they are covered by composite indexes; tests verify those composite indexes remain.

**Severity:** LOW/MEDIUM (performance)  
**Recovery:** Recreate from model/query plan only after verifying the composite index still covers production query patterns.

### DBM-018 — cache-token backfill is best-effort and marked once
**Source:** `model/main.go#runLogCacheTokenBackfillOnce`

The backfill updates log rows only when both new cache columns are zero, then writes a marker into the main `options` table. Errors are logged and retry is possible on a later startup. The SQL differs by SQLite/MySQL/PostgreSQL and filters invalid JSON differently.

**Severity:** MEDIUM (historical usage reporting)  
**Evidence gap:** Verify JSON scalar types, numeric overflow, malformed JSON handling, zero-valued source data, independent LOG_DB configurations, and marker-write failure. A successful SQL statement does not prove every historical row was semantically migrated.

### DBM-019 — legacy option migration may delete source keys when target exists
**Source:** `model/frontend_option_migration.go`

When a target option already exists, the migration deletes the legacy source key without comparing source and target values. Malformed values are otherwise retained and logged. Each option group runs in its own transaction.

**Severity:** MEDIUM/HIGH (configuration loss)  
**Required action:** Before release, export source and target values for conflicts, record the chosen authoritative value, and test conflict recovery. Consider preserving a migration archive rather than deleting divergent source values.

### DBM-020 — 2FA secret encryption is resumable but not a rollback
**Source:** `model/twofa_migration.go#MigrateTwoFASecretsToEncrypted`

The migration processes batches, uses conditional updates, verifies the encrypted envelope, and leaves failed plaintext records for retry. Already-encrypted rows are skipped. It is operator/explicit-call driven rather than part of the normal DB migration sequence.

**Severity:** HIGH (authentication secret confidentiality/availability)  
**Recovery:** Re-run after fixing key/configuration issues. Decryption/re-encryption recovery requires the correct key material; no plaintext rollback export should be created. Test key rotation, partial batch failure, concurrent rebind, and envelope verification.


### DBM-013 — SQLite subscription-plan table repair is additive, not a full schema reconciliation
**Source:** `model/main.go#ensureSubscriptionPlanTableSQLite`

When the table is absent, the function creates the full table with a primary key. When the table exists, it reads `PRAGMA table_info` and adds only missing columns. It does not reconcile existing column types, nullability, defaults, or primary-key definitions. This can leave a legacy table structurally different from the expected schema even though the function returns success.

**Severity:** MEDIUM/HIGH (subscription purchase and price configuration)  
**Required action:** Test historical table shapes and compare complete PRAGMA metadata, not just column presence. Verify existing price values, primary-key behavior, and constraints. Treat this as additive repair rather than schema convergence.

### DBM-014 — audit-log schema migration is repeatable but retention and engine behavior need separate proof
**Source:** `model/audit_log.go#MigrateAuditLogs`

SQLite/MySQL/PostgreSQL use GORM AutoMigrate. ClickHouse uses `CREATE TABLE IF NOT EXISTS` with MergeTree partitioned by month and ordered by (created_at, event_id), with no TTL clause. The existing audit-log test exercises SQLite and optionally MySQL/PostgreSQL, verifies repeated migration, ordering index, existing records and index preservation. This is stronger evidence than a source-only check, but it does not validate ClickHouse creation, upgrades of an existing ClickHouse table, or retention policy.

**Severity:** HIGH (security/audit evidence)  
**Required action:** Keep audit_logs retention independent from usage-log TTL; add disposable ClickHouse DDL/read/write test and existing-table upgrade test. Verify required fields and indexes after deployment upgrade.

### DBM-015 — ClickHouse usage-log TTL is an active data-deletion policy
**Source:** `model/main.go#migrateClickHouseLogDB`, `syncClickHouseLogTTL`

A positive `LOG_SQL_CLICKHOUSE_TTL_DAYS` modifies the `logs` table TTL to delete rows older than the configured period. Setting it to zero removes an existing TTL but cannot restore rows already deleted. Reducing the configured number can make historical data eligible for deletion; the deletion is asynchronous ClickHouse mutation behavior, not a reversible schema change. The audit-log table is deliberately created without this TTL.

**Severity:** HIGH (usage evidence, dispute investigation, reporting and retention)  
**Required action:** Require explicit retention owner approval, record old/new TTL and affected time range, test TTL mutation in disposable ClickHouse, and verify audit_logs is not affected. Document that removal of TTL is forward-only and does not restore deleted records.

### DBM-019 — retired frontend option migration intentionally prefers target and deletes source
**Source:** `model/frontend_option_migration.go#migrateLegacyOption`, `migrateLegacyUptimeOptions`

Each option group runs in a transaction. If the target key already exists, the migration deletes the legacy source key without comparing values. The test suite explicitly asserts that existing targets (including empty target values) remain authoritative and legacy source keys are removed. This is intentional conflict policy, not an untested accidental branch, but it is lossy when source and target diverge.

Malformed/invalid legacy values are retained and logged; valid values are transformed and moved. The function is invoked from `main.go` after main DB initialization and before option-map initialization, and its errors are logged while startup continues.

**Severity:** MEDIUM (administrative configuration loss)  
**Required action:** Before running on an unknown historical dataset, export source and target key/value pairs, preserve a conflict report, and confirm target-authoritative policy. Do not auto-merge or overwrite target values.

### DBM-020 — 2FA encryption migration has no colocated migration test file at the pinned source
**Source:** `model/twofa_migration.go#MigrateTwoFASecretsToEncrypted`

The implementation uses a primary-key cursor, conditional update, batch processing, skips already-encrypted envelopes, verifies the post-write envelope, and retains failed plaintext rows for retry. The pinned source tree has no `model/twofa_migration_test.go`; therefore the claimed retry/concurrency/envelope behavior is not covered by a dedicated migration test file in this source baseline.

**Severity:** HIGH (authentication availability and secret confidentiality)  
**Required action:** Add tests for empty dataset, mixed plaintext/encrypted records, batch boundary, wrong/missing encryption key, encryption failure, conditional-update miss caused by concurrent rebind, post-write verification, partial failure and rerun. Never export plaintext secrets as a rollback artifact.

## 4. Current migration risk register

| ID | Operation | Destructive / irreversible characteristic | Current evidence | Status |
|---|---|---|---|---|
| DBM-001 | 64-bit wallet preflight | No automatic conversion; explicit bypass | Source inspected | PARTIAL |
| DBM-002 | Token key uniqueness | Constraint/index replacement and exclusive lock | Source inspected | PARTIAL |
| DBM-003 | Prefill uniqueness | Global uniqueness replaced by partial uniqueness | Source inspected | PARTIAL |
| DBM-004 | Price float/double → decimal | Potential precision/rounding change; silent failure; PostgreSQL numeric precision/scale false-positive | Full converter source inspected; data fixtures pending | NOT VERIFIED |
| DBM-005 | model_limits → text | Type alteration / table lock | Source inspected | PARTIAL |
| DBM-006 | Options PK rebuild | Empty keys omitted; conflicting duplicates collapse to last value; two-step rename recovery | Full function inspected; failure fixtures pending | NOT VERIFIED |
| DBM-007 | quota_data dedupe | Duplicate rows deleted after aggregate merge | Source inspected | PARTIAL |
| DBM-008 | GORM AutoMigrate | Schema changes without down migration | Entrypoint inspected | NOT VERIFIED |
| DBM-009 | Auth version init | Auth state mutation | Not fully inspected | NOT VERIFIED |
| DBM-010 | Email normalization | Stored identity values rewritten | Source inspected | PARTIAL |
| DBM-011 | Access-token retirement init | Token lifecycle metadata mutation | Not fully inspected | NOT VERIFIED |
| DBM-012 | External identity claims init | Identity claim mutation | Not fully inspected | NOT VERIFIED |
| DBM-013 | SQLite subscription plan table | Existing-table path only adds missing columns; no type/default/PK reconciliation | Full function inspected; historical-shape fixtures pending | PARTIAL |
| DBM-014 | Audit log migration | Schema changes; audit retention must remain independent from usage-log TTL | Source + SQLite/MySQL/PostgreSQL test inspected; ClickHouse test pending | PARTIAL |
| DBM-015 | ClickHouse log DDL/TTL | TTL actively deletes old usage logs; removing TTL cannot restore deleted rows | Full TTL source inspected; disposable ClickHouse mutation test pending | NOT VERIFIED |
| DBM-016 | Log AutoMigrate | Schema changes without down migration | Entrypoint inspected | NOT VERIFIED |
| DBM-017 | Redundant log indexes | Index drop | Source + focused test inspected | PARTIAL |
| DBM-018 | Cache token backfill | Historical log columns rewritten; one-time marker | Source inspected | PARTIAL |
| DBM-019 | Legacy option migration | Existing target wins and legacy source is deleted without value comparison | Source + explicit conflict-policy tests inspected | PARTIAL |
| DBM-020 | 2FA encryption | Plaintext replaced with ciphertext; no dedicated migration test file at pinned source | Full function inspected; dedicated migration tests absent | NOT VERIFIED |
| LEGACY-SQL-001 | v0.2→v0.3 quota transfer | Re-run duplicates credit | SQL inspected | HIGH RISK |
| LEGACY-SQL-002 | v0.3→v0.4 ability seed | Conditional insert, not full reconciliation | SQL inspected | PARTIAL |

## 5. Required validation programme

Do not mark migration safety complete until all applicable gates have reproducible evidence.

### Gate A — historical schema fixtures
- Build disposable fixtures from supported historical Uter versions for SQLite, MySQL, PostgreSQL.
- Include duplicate/malformed/NULL/boundary records and legacy index/constraint variants.
- Capture schema and row-level checksums before migration.

### Gate B — forward replay and idempotency
- Run the complete startup migration sequence on each fixture.
- Restart and run it again; assert no unintended additional data/schema changes.
- Run legacy manual SQL only in dedicated fixtures with an explicit one-time marker and expected totals.
- Verify main DB and independent log DB configurations separately.

### Gate C — interruption and retry
- Inject failure immediately before/after each DDL and data mutation boundary.
- Terminate the process during table rebuild, index replacement, batch encryption, and backfill.
- Restart; assert no missing rows, duplicate credit, partial uniqueness, or unrecoverable temp state.

### Gate D — rollback/recovery
- Where reverse transformation is mathematically possible, implement and test down migration.
- Where it is not possible (aggregation, normalization, encryption, TTL deletion, destructive dedupe), classify as **forward-fix / backup-restore only**, retain a pre-change snapshot, and test restore into a clean isolated instance.
- Record RPO/RTO evidence; a backup file alone is not proof.

### Gate E — cross-database compatibility
- SQLite: WAL/immediate transaction behavior, table rebuilds, pragma/schema verification.
- MySQL: DDL implicit commits, advisory locks, metadata lock duration, charset/collation.
- PostgreSQL: transactional DDL, ACCESS EXCLUSIVE lock duration, partial indexes, catalog inspection.
- ClickHouse: MergeTree DDL, TTL mutation behavior, retention verification; log DB only.

### Gate F — financial and identity invariants
- Wallet balances and token remain_quota must not be credited twice.
- Top-up/order/refund records and usage logs must remain unchanged by unrelated migrations.
- Token key uniqueness and user identity uniqueness must be preserved.
- Subscription price values must compare exactly under the approved decimal/rounding policy.
- 2FA secrets must remain decryptable with the configured key and no failed record may be silently discarded.

## 6. Immediate implementation priorities

1. Add a regression test and a safe execution guard for LEGACY-SQL-001; do not run the historical script against any real dataset.
2. Add DBM-004 fixtures for precision/scale, overflow, PostgreSQL numeric variants, metadata-query failure, and swallowed DDL failure; decide whether the migration must fail startup rather than silently continue. 
3. Add DBM-006 fixtures for empty keys, conflicting duplicate values, concurrent writes, and process interruption between table renames; prove restoration from the legacy table. 
4. Add DBM-013 historical SQLite schema fixtures; add DBM-014 ClickHouse audit table tests; validate DBM-015 TTL mutation/retention in disposable ClickHouse; add DBM-020 dedicated migration tests.
5. Add before/after aggregate export and reconciliation assertions for DBM-007.
6. Add migration failure injection and retry harness for the full startup sequence.
7. Add disposable SQLite/MySQL/PostgreSQL/ClickHouse services to the test matrix, with independent log DB cases.
8. Establish migration ledger semantics for future migrations (ID, checksum, source commit, applied time, database identity, result); do not retroactively fabricate ledger entries for old databases.
9. Publish per-migration recovery classification: reversible, compensatable, forward-fix only, or backup-restore only.

## 7. Exit criteria

The migration programme may only be marked **VERIFIED** when:
- every registered migration has source and owner mapping;
- replay and idempotency tests pass from supported historical fixtures;
- interruption/retry tests pass;
- each destructive transformation has reconciliation evidence and an approved recovery class;
- supported database engines have executed their applicable integration matrix;
- backup/restore has been tested and RPO/RTO recorded;
- no production database was used as a test fixture.

Until then, the authoritative state remains **DATABASE MIGRATION SAFETY: NOT_VERIFIED**.
