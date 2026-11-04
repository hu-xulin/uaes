# UAES Validator Contracts

This directory holds the **machine-readable contract layer** of the governance
system. Per `.uaes/STANDARD-REGISTRY.yaml` → `governance.script_directory`, the
executable validators live in `quality/scripts/uaes/`; this directory records
which validator owns which check, so tooling can discover the chain without
assuming a path.

| Layer | Validator contract | Executable | Default status |
| --- | --- | --- | --- |
| L1 Governance Validation | `G-001..G-018` in `validate-registry.mjs` | `quality/scripts/uaes/validate-registry.mjs` | executed |
| L2 Module / Change Impact | `change-impact.schema.json` | `quality/scripts/uaes/change-impact.mjs` | executed |
| L3 Domain Quality Gates | `.uaes/registry/gates.yaml` | `quality/scripts/uaes/quality-gate-runner.mjs` | `NOT_RUN` |
| L4 Global Quality Gate | `.uaes/registry/gates.yaml#global_gate` | `quality/scripts/uaes/quality-gate-runner.mjs` | `NOT_RUN` |

JSON Schema contracts (`.uaes/schemas/`):

- `module-registry.schema.json` → `.uaes/registry/modules.yaml`
- `standard-mapping.schema.json` → `.uaes/registry/mappings.yaml`
- `gate-registry.schema.json` → `.uaes/registry/gates.yaml`
- `repository-inventory.schema.json` → `reports/baseline/UAES-P13-REPOSITORY-INVENTORY.json`
- `change-impact.schema.json` → `reports/quality/UAES-P13-CHANGE-IMPACT.json`
- `quality-report.schema.json` → `reports/quality/UAES-P13-GOVERNANCE-VERIFICATION.json`

**Rule:** a validator that cannot run reports `NOT_RUN`. It never reports
`PASS` for a check it did not execute (`.uaes/policies/execution-policy.yaml`).
