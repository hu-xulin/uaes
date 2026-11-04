# UAES-P05-DESIGN-SYSTEM-ASSETS — Imported Design System Implementation Assets

| Field | Value |
|---|---|
| Report ID | UAES-P05-DESIGN-SYSTEM-ASSETS |
| Version | 1.0.0 |
| Status | DRAFT |
| Domain | UAES-05 Experience & Design |
| Phase | P4 |
| Gate | UAES-05-GATE-001 |
| Result | NOT_RUN |

> 本目录是从 `hu-xulin/uter` 分支 `uaes/p4-design-token-engine` 导入的**实施资产**，
> 不是 UAES 标准文件。权威标准：`standards/05-experience-design/`；
> 权威门禁：`quality/gates/UAES-05-GATE-001-DESIGN-QUALITY-GATE.md`；
> 权威验收基线：`quality/acceptance/UAES-P05-ACCEPTANCE-BASELINE.md`；
> 唯一事实源：`.uaes/STANDARD-REGISTRY.yaml`。
> 逐文件映射与冲突处置见 `reports/quality/UAES-P05-BRANCH-IMPORT-RECORD.md`。

## 1. Why this directory exists

`UAES-05-EXPERIENCE-DESIGN-STANDARD.md` §6 recommends a `design-system/` tree with
`tokens/{source,themes,generated}` and `components/{registry,contracts}`. The
registry's `governance` block additionally fixes `quality/scripts/` as the
script directory, `reports/` as the report directory and `.uaes/schemas/` as the
schema directory. This import follows those rules: **no pre-existing directory
or file in this project was moved, renamed or modified** (evidence:
`reports/quality/UAES-P05-PRE-IMPORT-BASELINE.sha256`).

## 2. Layout

| Path | Content | Authority status |
|---|---|---|
| `tokens/source/brand.tokens.json` | DTCG 2025.10 brand token source (single source of truth) | DRAFT, approval NOT_VERIFIED |
| `tokens/source/brand.tokens.schema.json` | Container schema for the DTCG source | imported, extended with governance fields |
| `tokens/source/uaes-tokens.projected.json` | **Generated** projection conforming to `.uaes/schemas/design-token.schema.json` | generated, never hand-edited |
| `tokens/generated/brand.css` | **Generated** CSS custom properties for light/dark | generated, never hand-edited |
| `components/registry/component-registry.json` | 65 React component registry entries | contract conformance NOT_VERIFIED |
| `components/contracts/component-registry.schema.json` | Registry container schema | imported, aligned to this layout |
| `components/contracts/UAES-COMPONENT-CONTRACT-GAP.md` | **Generated** gap record vs `.uaes/schemas/component-contract.schema.json` | generated evidence |
| `tests/token-source.test.ts` | Vitest suite for the token source | NOT_RUN here (no vitest runtime) |
| `docs/UTER-DESIGN-SYSTEM-3.0.md` | Reference copy of the product design-system document | evidence, not a standard |
| `reference/web/` | Reference copies of `package.json`, `ci.yml`, `theme.css`, `index.css` and two product tests | NOT_RUN here (product tree absent) |

Generated files carry the generator, generator version, source and source
version in their header, per `UAES-05-002` §6 and `UAES-05-011-006`.

## 3. What is deliberately NOT here

- The React component tree, product `web/src/`, visual baselines, browser and
  CI runtime. Those belong to the product repository; checks requiring them
  are `NOT_RUN`, never `PASS` (`UAES-05-GATE-001` §4/§6).
- Any duplicate of the UAES authoritative acceptance baseline or gate. Those
  live in `quality/acceptance/` and `quality/gates/`; the standard library
  versions win over the branch copies.

## 4. Regeneration and verification

```bash
node quality/scripts/design-system/generate-design-tokens.mjs        # regenerate artifacts
node quality/scripts/design-system/generate-design-tokens.mjs --check # DQ-024 drift check
node quality/scripts/design-system/verify-contrast.mjs               # DQ-006 + negative test
node quality/scripts/design-system/check-component-registry.mjs      # DQ-009 gap
node quality/scripts/design-system/check-design-tokens.mjs --root <product-web>/src
node quality/scripts/design-system/verify-import.mjs                 # full import verification
```

Machine-readable result: `reports/quality/UAES-P05-IMPORT-VERIFICATION.json`.
