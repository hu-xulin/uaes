# UAES-P05-DESIGN-SYSTEM-SCRIPTS — Imported Design System Tooling

| Field | Value |
|---|---|
| Report ID | UAES-P05-DESIGN-SYSTEM-SCRIPTS |
| Version | 1.0.0 |
| Status | DRAFT |
| Domain | UAES-05 Experience & Design |
| Phase | P4 |
| Gate | UAES-05-GATE-001 |
| Result | NOT_RUN |

> 本目录依据 `.uaes/STANDARD-REGISTRY.yaml` 的 `governance.script_directory`
> （`quality/scripts/`）落位，与既有 `quality/scripts/architecture/` 平级。
> 脚本从 `uaes/p4-design-token-engine` 导入并按本项目布局修正；
> 权威规范见 `standards/05-experience-design/`，唯一事实源见 `.uaes/STANDARD-REGISTRY.yaml`。

## Scripts

| Script | Purpose | Gate |
|---|---|---|
| `paths.mjs` | Single layout constant module. All scripts resolve from `import.meta.url`, never `process.cwd()` or an assumed `web/` tree. | — |
| `generate-design-tokens.mjs` | Deterministic build of `brand.css` and `uaes-tokens.projected.json` from the DTCG source; `--check` detects drift. | DQ-002, DQ-024 |
| `verify-contrast.mjs` | 14 brand contrast pairs, the remediated navigation selected pair, and a negative test for the pre-remediation 4.44:1 combination. | DQ-006, P05 §L.4 |
| `check-component-registry.mjs` | Registry structure, evidence status and gap analysis against `.uaes/schemas/component-contract.schema.json`; `--implementation-root` enables filesystem parity. | DQ-009, DQ-010 |
| `check-design-tokens.mjs` | T1–T16 static design-token scan. `--root <path>` selects the source tree; without the product tree it reports `NOT_RUN`. | DQ-004 |
| `verify-import.mjs` | Full import verification and generation of the machine-readable quality report and contract gap record. | DQ-002/006/009/024 |

## Rules applied to the imported code

1. `UAES-05-002` §6 / `UAES-05-011-006`: generated artifacts declare generator,
   generator version, source and source version.
2. `UAES-05-002-007`: identical source produces byte-identical artifacts.
3. `UAES-05-003` §6: the navigation selected combination `#5B5EE6` on
   `#F0F0FF` (4.44:1) must be fixed and re-measured, never waived. The
   remediated foreground `#5558D8` yields 4.93:1; a negative test proves the
   old combination is rejected.
4. `UAES-05-001-009` / §8: high-impact brand changes require human approval.
   The token source records `changeApproval: NOT_VERIFIED`; no Exception ID,
   approver or approval date is invented.
5. `UAES-05-006` / `UAES-05-GATE-001` §4/§6: missing component contract data
   is reported as `NOT_VERIFIED`; checks that cannot run are `NOT_RUN`, never
   `PASS`.
