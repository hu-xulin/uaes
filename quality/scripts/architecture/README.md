# Architecture Check Entrypoints

The architecture gate remains **DRAFT**. A check is considered implemented only when its source input is pinned, the check runs in CI, and positive/negative tests are part of the repository's automated validation.

| Script | Status | Current scope / remaining work |
|---|---|---|
| check-architecture-manifests | IMPLEMENTED, CI INTEGRATION PENDING | Validates module IDs, required fields, source paths, manifest existence, Go module paths and package.json names against a Uter checkout supplied through `UTER_REPO_ROOT`. Requires a pinned Uter source checkout. |
| check-module-boundaries | BLOCKED | Approved module boundary policy and source import scanner are not implemented. |
| check-dependency-rules | BLOCKED | Verified dependency allowlist and machine-readable dependency graph are not implemented. |
| check-api-contracts | BLOCKED | Generated API inventory and compatibility validator are not implemented. |
| check-database-migrations | BLOCKED | Migration inventory, compatibility policy, and rollback test harness are not implemented. |

## Architecture manifest validator

Run from the UAES repository root:

```bash
UTER_REPO_ROOT=/absolute/path/to/uter ruby quality/scripts/architecture/check-architecture-manifests
```

The validator fails closed with exit code 2 when the source checkout or registry is unavailable, and exits 1 when registered modules do not match the source tree. It currently validates registry identity and manifest presence; it does **not** yet prove import boundaries, dependency policy, API compatibility, or migration safety.

Local fixture verification performed for the validator:
- Positive fixture: valid Go module and web package manifests accepted.
- Negative control: mismatched Go module identity rejected with exit code 1.
- Ruby syntax check: passed.

These fixture checks are not a substitute for running the validator against the pinned Uter source tree in CI. The current governance workflow does not yet invoke this source-level check; its successful run must not be cited as architecture-manifest validation evidence.

Do not change a blocked check to exit 0 until it performs the named checks and has positive and negative tests. Keep UAES-04-GATE-001 in DRAFT until all blockers are resolved and independently verified.
