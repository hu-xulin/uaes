# DBM-004 Evidence Addendum — Subscription Plan Price Conversion

**Status:** DRAFT / SOURCE-VERIFIED / DATA-LOSS AND RECOVERY TESTS NOT VERIFIED  
**Uter source baseline:** `hu-xulin/uter@008ec53adc9652ee454090b4fb1152536dd45bf3`  
**UAES owner branch:** `ai/uaes-agent-skills-governance-2026-11-05`  
**Scope:** `model/main.go#migrateSubscriptionPlanPriceAmount`, `model/subscription.go#SubscriptionPlan`, subscription price consumers.

## 1. Executive finding

DBM-004 is a financial-data migration and must remain **HIGH / NOT_VERIFIED**. The source confirms a conversion target of `DECIMAL(10,6)`, but the migration has no before/after value reconciliation, no failure-injection coverage, and no verified rollback/restore procedure. Its errors are logged and swallowed; startup can continue with the old schema.

No production database was accessed or modified. This addendum does not authorize a production migration or define the business rounding policy.

## 2. Pinned source evidence

### 2.1 Migration implementation

At `model/main.go` lines 749–807 in the pinned source:

- SQLite returns without altering the column.
- The migration exits if `subscription_plans` or `price_amount` does not exist.
- PostgreSQL reads `information_schema.columns.data_type`; any value equal to `numeric` causes an early return. Precision and scale are not inspected.
- Otherwise PostgreSQL runs:
  `ALTER TABLE subscription_plans ALTER COLUMN price_amount TYPE decimal(10,6) USING price_amount::decimal(10,6)`.
- MySQL reads `COLUMN_TYPE`; any value whose lowercase text starts with `decimal` causes an early return. Precision and scale are not inspected.
- Otherwise MySQL runs:
  `ALTER TABLE subscription_plans MODIFY COLUMN price_amount decimal(10,6) NOT NULL DEFAULT 0`.
- Metadata lookup failures are warnings; the DDL attempt continues.
- DDL failures are warnings and are swallowed. The function has no error return, and its caller does not gate startup on migration success.

Consequences requiring explicit verification:
1. A PostgreSQL `numeric(p,s)` or MySQL `decimal(p,s)` column with a different precision/scale is accepted as already migrated.
2. If metadata lookup fails, the migration attempts DDL without knowing the current type.
3. If DDL fails, startup can continue while the physical schema remains unconverted.
4. The two dialects do not express identical nullability behavior: MySQL explicitly applies NOT NULL DEFAULT 0; PostgreSQL only changes the type.
5. Casting to `DECIMAL(10,6)` can round fractional values beyond six decimal places and can fail or otherwise be mode-dependent for values outside the target range. Exact behavior must be tested against supported engine versions and SQL modes, not assumed.

### 2.2 Application model and consumers

At `model/subscription.go`, `SubscriptionPlan.PriceAmount` is a Go `float64` with GORM tag `type:decimal(10,6);not null;default:0`. Subscription purchase logic copies this value into `SubscriptionOrder.Money` and computes balance quota through `decimal.NewFromFloat(priceAmount)`.

This means changing only the SQL column type does not make the application representation decimal-exact: the loaded amount is still represented as binary floating point before conversion to the decimal library. This is a separate application-level financial precision concern, not proof that current calculations are wrong. It requires an owner-approved design decision and compatibility analysis; do not silently change public JSON/API types or persisted order semantics as part of this migration audit.

## 3. Required test matrix

Tests must run only against disposable, version-pinned database instances and synthetic fixtures.

| Dimension | Required fixtures / assertions |
|---|---|
| PostgreSQL type detection | `numeric`, `numeric(10,6)`, `numeric(12,2)`, `numeric(20,8)`, float/double, integer; assert actual precision/scale and whether migration should run |
| MySQL type detection | `decimal(10,6)`, `decimal(12,2)`, `decimal(20,8)`, float/double, integer; assert actual precision/scale and whether migration should run |
| Fractional values | Exact 6-digit scale; 7+ fractional digits; trailing zeros; negative values if schema permits; values near half-way rounding boundaries |
| Range boundaries | Maximum representable positive and negative values; one step beyond; large integer component; overflow behavior |
| Nullability | NULL legacy rows, nullable source column, NOT NULL target expectations, default behavior on both engines |
| Data invariants | Row count, primary keys, currency, enabled flags, plan metadata, and exact before/after monetary values |
| Metadata failures | Inject/force information_schema query failure; assert the migration does not silently claim success |
| DDL failures | Permission denied, lock timeout, unsupported conversion, overflow; assert startup/migration result is explicit and observable |
| Idempotency | Run twice; second run must not alter values or hide a mismatched precision/scale |
| Recovery | Interrupt before/after DDL; restore backup into a clean instance; reconcile row-level values and schema |

Every fixture must record database engine/version, SQL mode/configuration, source schema, source row values, resulting schema, resulting values, row counts, and test output.

## 4. Safe remediation sequence (proposal, not yet implemented)

1. Obtain owner approval for the canonical price precision, scale, range, rounding mode, NULL policy, and compatibility requirements. Do not infer these from the current `DECIMAL(10,6)` tag alone.
2. Replace prefix/type-only detection with explicit precision, scale, signedness and nullability inspection for each supported dialect. Define whether a wider existing decimal is accepted, normalized, or rejected; never silently narrow it.
3. Preflight every existing value against the approved target range and scale before issuing DDL. Produce a deterministic report of rows that would round, overflow, or violate nullability.
4. Require explicit operator approval when any value changes under the approved rounding rule. Do not silently round production financial data.
5. Make migration outcome machine-readable and fail closed (or expose a separately approved degraded-start policy) when metadata inspection or DDL fails. A warning log alone is not a successful migration result.
6. Verify schema and row-level values after DDL using a fresh database read, not only in-memory state.
7. Retain a tested pre-migration backup and document whether recovery is restore-only or forward-fix. A successful DDL statement is not rollback evidence.
8. Separately evaluate replacing `float64` in the application model with an exact decimal or integer-minor-unit representation. This requires API, JSON, database, payment, order, quota, and historical-data compatibility tests.

## 5. Exit criteria

DBM-004 may not be marked VERIFIED until:
- owner-approved precision/scale/range/rounding/nullability policy exists;
- PostgreSQL and MySQL version-pinned fixtures pass the complete matrix;
- no unapproved row changes occur;
- metadata and DDL failures are surfaced as explicit failures;
- fresh database read-back confirms schema and value invariants;
- idempotency, interruption, and backup/restore recovery tests pass;
- the application-level float representation has a documented disposition.

**Current disposition: HIGH / NOT_VERIFIED. No production execution authorized.**
