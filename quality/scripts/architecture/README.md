# Architecture Check Entrypoints

All five scripts in this directory currently fail closed with exit code 2. They are **BLOCKED placeholders**, not completed architecture checks.

| Script | Missing prerequisite |
|---|---|
| check-architecture-manifests | Canonical architecture manifest registry and schema mapping |
| check-module-boundaries | Approved module manifest and enforceable import-boundary rules |
| check-dependency-rules | Verified module ownership policy and machine-readable dependency graph |
| check-api-contracts | Generated API inventory and compatibility validator |
| check-database-migrations | Migration inventory, compatibility policy, and rollback test harness |

Do not change a placeholder to exit 0 until it performs the named checks and has positive and negative tests. The architecture quality gate remains DRAFT until all blockers are resolved and independently verified.
