# Database Migration Safety Addendum — 2026-11-05

**Status:** DRAFT / EVIDENCE UPDATE / NOT A ROLLBACK CERTIFICATION  
**Repository:** `hu-xulin/uter`  
**Reviewed source commit:** `008ec53adc9652ee454090b4fb1152536dd45bf3`  
**Review branch:** `ai/uaes-uter-integration-2026-11-05`  
**Related audit:** `DATABASE-MIGRATION-SAFETY-AUDIT.md`  
**Execution boundary:** Source inspection and CI only. No production database was accessed or modified.

## 1. DBM-006 — updated implementation evidence

The reviewed implementation is `model/option_primary_key_migration.go`.

### Confirmed behavior at the reviewed commit

- The migration returns immediately when the options table already has a single-column unique or primary key on `key`.
- It repeats that uniqueness check after acquiring its dialect-specific lock.
- MySQL uses `GET_LOCK` with a 60-second timeout. In commit `008ec53`, the migration callback is now executed through GORM `Connection`, pinning the rebuild statements to the same physical connection that owns the named lock. Lock release is attempted on that connection.
- PostgreSQL uses a transaction-scoped advisory lock and runs the repair in the same transaction.
- Other dialects run the repair in a transaction.
- The repair reads the original rows, excludes empty keys, collapses duplicate keys, creates `options_pk_tmp`, inserts the deduplicated rows, verifies the temporary row count, and swaps the tables.
- MySQL performs the two renames in one `RENAME TABLE` statement. Other dialects use two GORM rename calls within the surrounding transaction.
- The original table is retained under an `options_legacy_<timestamp>` name. The migration does not automatically delete that backup.
- A leftover `options_pk_tmp` table is dropped before a new rebuild is started.
- The caller in `model/main.go` logs the migration error and continues initialization; this is not a fail-closed startup gate.

### New code change and regression test

Commit `f8023c4f914a1e0987f078977349b87a6364d100` fixes the MySQL connection-scope mismatch: previously the lock was acquired through a dedicated `sql.Conn`, while the callback used the pooled `*gorm.DB`, which was not guaranteed to use the lock-owning connection.

Commit `008ec53adc9652ee454090b4fb1152536dd45bf3` adds `model/option_primary_key_migration_test.go`. The SQLite regression test asserts:
- duplicate keys are collapsed;
- the active rebuilt table enforces unique keys;
- empty-key rows are excluded from the active table;
- a legacy backup table is retained;
- the legacy backup retains all original rows, including empty-key rows.

The Uter PR CI run `41964304811` subsequently completed with 8/8 jobs passing at the then-reviewed Uter commit. Separately, UAES database migration matrix run `41965789257` completed successfully against the pinned Uter source commit `008ec53adc9652ee454090b4fb1152536dd45bf3`. Its job `127042361681` passed the selected SQLite, MySQL 8.4.4, and PostgreSQL 17.4 migration test set. Importantly, the options primary-key rebuild regression `TestMigrateOptionPrimaryKeyRebuildsAndPreservesLegacyRows` was executed in that matrix but remains SQLite-only; the MySQL and PostgreSQL services were used for the other selected migration tests. This is test execution evidence, not cross-dialect validation of DBM-006.

## 2. Remaining DBM-006 risks and evidence gaps

1. **Conflicting duplicate values are resolved by last row encountered.** `dedupeOptionRows` logs a conflict and keeps the last value, but the source query has no explicit ordering. Which value wins is therefore not a documented deterministic business rule. This is a configuration-integrity risk; do not silently change the winner policy without owner approval and a compatibility decision.
2. **Empty-key rows are intentionally omitted from the active table.** They remain in the legacy backup, but no semantic reconciliation proves they are disposable.
3. **Failure-injection coverage is incomplete.** There are no tests here for process interruption after temporary-table creation, partial inserts, row-count verification, first rename, or second rename; nor retry behavior with each possible leftover table state.
4. **Restore procedure is not proven.** Retaining a legacy table is not equivalent to a tested restore procedure. No tested operator procedure currently proves restoration of the original table name and preservation of writes made after migration.
5. **Dialect matrix remains incomplete.** The new regression test uses SQLite. The MySQL connection-lock behavior and atomic rename path, PostgreSQL advisory-lock/transaction path, and supported server-version combinations still need isolated integration tests.
6. **Startup continues after migration error.** This behavior can leave the application running with an unrepaired options schema. Whether startup must fail closed is an owner-level reliability decision; no behavior change is made in this addendum.

**Updated classification:** DBM-006 implementation has improved lock scoping and a new SQLite data-preservation regression test, but migration recovery and full dialect safety remain **NOT VERIFIED**. Severity remains **HIGH** for system configuration persistence.

## 3. Required next verification

- Extend DBM-006 itself to MySQL and PostgreSQL integration coverage, including lock ownership/concurrent attempts and dialect-specific table swap behavior; the current successful matrix does not execute the options rebuild test on those two dialects.
- Add deterministic fixtures for conflicting duplicate values only after the owner chooses the intended conflict policy.
- Add failure-injection/retry tests for each DDL boundary on each supported dialect.
- Test concurrent migration attempts using independent connections/processes on MySQL and PostgreSQL.
- Define and test a backup restore/runbook and post-migration write reconciliation.
- Decide whether options migration failure should block startup.

## 4. Audit conclusion

This addendum updates DBM-006 evidence only. It does not certify rollback, restore, production readiness, or complete UAES compliance. The parent audit remains DRAFT and the overall migration classification remains NOT_VERIFIED.


## 5. Additional CI evidence — run 41968301249

A second run of the selected migration dialect matrix completed successfully against Uter source `008ec53adc9652ee454090b4fb1152536dd45bf3`.

- Workflow: [Database Migration Dialect Matrix](https://github.com/hu-xulin/uaes/actions/runs/41968301249)
- Job: `SQLite, MySQL and PostgreSQL migration tests` (job ID `127050362364`)
- Result: **PASS**
- MySQL service: 8.4.4; PostgreSQL service: 17.4.
- Log evidence includes successful `TestMigrationSchemaStability` on SQLite/MySQL/PostgreSQL; `TestMigratePrefillGroupUniqueness` on all three; `TestMigrateTokenKeyUniqueness` on all three; and `TestUserSessionPreviousRefreshHashMigration` on all three.
- `TestMigrateOptionPrimaryKeyRebuildsAndPreservesLegacyRows` passed on SQLite only.

This run does not close the DBM-006 gaps in §2–§3: it does not exercise the Options rebuild's MySQL named-lock/atomic-rename path or PostgreSQL advisory-lock/transaction path, does not add interruption/failure-injection or restore tests, and does not resolve duplicate/empty-key semantics or startup fail-open policy. DBM-006 remains HIGH / NOT VERIFIED.
