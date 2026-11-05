# Database Migration CI Evidence — 2026-11-05

**Status:** EVIDENCE UPDATE / SELECTED TEST MATRIX PASS / NOT ROLLBACK CERTIFICATION  
**UAES PR head tested:** `b11e4db2b03075232b5e97592743d7c1028ec215`  
**Uter source pinned by the workflow:** `337485b4b19824f9bee59b6f8226802b455ab0ec`

## Verified workflow evidence

Workflow: [Database Migration Dialect Matrix](https://github.com/hu-xulin/uaes/actions/runs/41965387384)  
Job: `SQLite, MySQL and PostgreSQL migration tests` — **PASS**.

The job ran selected migration paths against SQLite, MySQL 8.4.4 and PostgreSQL 17.4. The log confirms successful tests including:

- `TestMigrateOptionPrimaryKeyRebuildsAndPreservesLegacyRows` (SQLite).
- Prefill-group uniqueness migration on SQLite, MySQL and PostgreSQL, including PostgreSQL legacy constraint/index variants, preservation of unrelated indexes, and rollback on unsupported definitions/dependencies.
- Token-key uniqueness migration on SQLite, MySQL and PostgreSQL, including rejection of unsupported or invalid PostgreSQL constraint/index shapes.
- User-session previous-refresh-hash migration on SQLite, MySQL and PostgreSQL.

The test output contains expected duplicate-key errors used by negative assertions; the enclosing test cases passed. These are not reported as unexpected suite failures.

## Explicit scope limits

The workflow itself states that this matrix verifies selected schema/custom migration paths on SQLite, MySQL and PostgreSQL. It does **not** establish:

- full production-schema migration replay;
- rollback/recovery certification for every migration;
- ClickHouse log-database migration coverage;
- failure injection at every DDL/data-copy/rename boundary;
- concurrent multi-process migration safety for every migration;
- financial conversion correctness for DBM-004 price precision, rounding, overflow, NULL and legacy data.

DBM-004 remains a separate financial-semantics review. DBM-006 still has unresolved duplicate-winner determinism, interruption/retry and restore-procedure questions documented in its addendum.

## Acceptance statement

Record this run as **selected dialect migration tests: PASS** only. Keep overall database migration status **NOT_VERIFIED** until the remaining per-migration replay, interruption, recovery, concurrency, and business-invariant evidence is complete. Do not infer rollback safety from this workflow.
