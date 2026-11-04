# UAES P13 Repository Integration — Repository Inventory

生成时间：2026-11-04T17:16:38.572Z · 审计对象：`/Users/lincolnhu/uter` · HEAD `e4cbd007934be4825bde4cbc0345b1cbeebd0aa5` · 工作区脏文件 40 项（**只读审计，未触碰**）

规范库：`/Users/lincolnhu/uter-ai`（独立仓库，关系 `PARALLEL`）。

## 摘要

| 项 | 数量 |
|---|---|
| top_level_directories | 39 |
| go_modules | 4 |
| code_modules | 10 |
| uaes_domains | 13 |
| uaes_standards | 178 |
| uaes_gates | 13 |
| real_rule_ids | 590 |
| mappings | 9 |
| verification_entries | 20 |

## 1. 顶层目录完整清单（39）

`.agents`, `.ai`, `.github`, `.playwright-cli`, `.quality`, `.vscode`, `.workbuddy`, `.workbuddy-ai`, `_reports`, `assets`, `bin`, `common`, `constant`, `controller`, `data`, `deploy`, `docs`, `docs-dev`, `docs-web`, `dto`, `e2e`, `electron`, `i18n`, `logger`, `logs`, `middleware`, `model`, `oauth`, `pkg`, `plugins`, `relay`, `relaykit`, `router`, `scripts`, `service`, `setting`, `tokenkit`, `types`, `web`

## 2–3. 真实代码模块、职责、依赖与技术栈

| ID | 路径 | 类型 | Owner | 技术栈 | 适用域 |
|---|---|---|---|---|---|
| MOD-GO-ROOT | `.` | go-module | backend | go-module | UAES-04, UAES-06, UAES-09, UAES-10, UAES-11, UAES-12 |
| MOD-RELAYKIT | `relaykit` | go-module | backend | go-module | UAES-04, UAES-06, UAES-09, UAES-10, UAES-11, UAES-12 |
| MOD-TOKENKIT | `tokenkit` | go-module | backend | go-module | UAES-04, UAES-06, UAES-09, UAES-10, UAES-11, UAES-12 |
| MOD-TOKENKIT-INNER | `tokenkit/tokenkit` | go-module | backend | go-module | UAES-04, UAES-06, UAES-09, UAES-10 |
| MOD-WEB | `web` | web-application | frontend | React/TypeScript/Rsbuild/Bun/Vitest | UAES-04, UAES-05, UAES-06, UAES-07, UAES-09, UAES-10, UAES-11 |
| MOD-DOCS-WEB | `docs-web` | web-application | frontend | Next.js/Fumadocs/React/TypeScript | UAES-03, UAES-05, UAES-06, UAES-09, UAES-11, UAES-12 |
| MOD-ELECTRON | `electron` | desktop-application | desktop | Electron | UAES-04, UAES-05, UAES-06, UAES-07, UAES-09, UAES-10, UAES-11 |
| MOD-E2E | `e2e` | test-suite | quality | test-suite | UAES-09, UAES-10 |
| MOD-SCRIPTS | `scripts` | tooling | devops | tooling | UAES-09, UAES-11, UAES-12 |
| MOD-CI | `.github` | delivery | devops | delivery | UAES-09, UAES-10, UAES-11, UAES-12 |

Go manifests：

| manifest | module | go |
|---|---|---|
| `go.mod` | `github.com/uter-ai/uter` | 1.27.3 |
| `relaykit/go.mod` | `github.com/uter-ai/uter/relaykit` | 1.27.3 |
| `tokenkit/go.mod` | `github.com/uter-ai/uter/tokenkit` | 1.27.3 |
| `tokenkit/tokenkit/go.mod` | `github.com/QuantumNous/new-api/tokenkit` | 1.27.3 |

已有治理体系（本层映射复用、不替代）：

| ID | 位置 | 说明 |
|---|---|---|
| AIES | `.ai/AIES.md` | AI execution standard; AGENTS.md is higher priority. |
| SPEC-ROUTING | `AGENTS.md` | 14-row Task-based spec routing table is the single source of truth for spec loading. |
| AI-SPECS | `docs/ai-specs/` | 15 domain specs plus engineering-quality/ group. |
| QUALITY-SCRIPTS | `scripts/verify-all.sh` | Converged gate entry; scripts/quality/uter-quality.sh runs review/test/security/coverage. |
| QUALITY-STATE | `.quality/.state/` | Per-module coverage and regression status evidence. |

## 4. 领域 / 规则到模块的映射（9 条）

| Mapping | 域 | 模块 | 真实规则数 | 门禁 |
|---|---|---|---|---|
| MAP-WEB-DESIGN-TOKENS | UAES-05 | MOD-WEB, MOD-DOCS-WEB | 5 | UAES-05-GATE-001 |
| MAP-WEB-CROSS-PLATFORM | UAES-07 | MOD-WEB, MOD-ELECTRON, MOD-DOCS-WEB | 3 | UAES-07-GATE-001 |
| MAP-GO-ENGINEERING | UAES-06 | MOD-GO-ROOT, MOD-RELAYKIT, MOD-TOKENKIT, MOD-TOKENKIT-INNER | 5 | UAES-06-GATE-001 |
| MAP-QUALITY-ENGINEERING | UAES-09 | * | 0 | UAES-09-GATE-001 |
| MAP-GLOBAL-SECURITY | UAES-10 | * | 0 | UAES-10-GATE-001 |
| MAP-PRODUCT-ENGINEERING | UAES-02 | * | 3 | UAES-02-GATE-001 |
| MAP-AGENT-GOVERNANCE | UAES-08 | * | 5 | UAES-08-GATE-001 |
| MAP-DELIVERY | UAES-11 | MOD-CI, MOD-SCRIPTS | 0 | UAES-11-GATE-001 |
| MAP-FOUNDATION-SPEC-INTEGRITY | UAES-00 | * | 0 | UAES-00-GATE-001 |

**未登记规则级 ID 的域**：UAES-00, UAES-01, UAES-03, UAES-04, UAES-09, UAES-10, UAES-11, UAES-12。这些域仅做域级映射，rules 为空，**未编造任何 ID**。

## 5. 需要新增的治理目录

| 目录 | 所在仓库 | 理由 |
|---|---|---|
| `.uaes/registry/` | REPO-UAES | Modules / standards / mappings / gates registries. |
| `.uaes/policies/` | REPO-UAES | Machine-readable execution policy. |
| `.uaes/validators/` | REPO-UAES | Validator contracts (executables live in quality/scripts/uaes/). |
| `quality/scripts/uaes/` | REPO-UAES | governance.script_directory compliant executable location. |
| `reports/baseline/` | REPO-UAES | Repository Inventory evidence. |

CI 接入目标（本阶段未修改）：

| 路径 | 仓库 | 状态 | 理由 |
|---|---|---|---|
| `.github/workflows/` | REPO-UTER | NOT_MODIFIED | Phase IX requires separate authorisation. |
| `.github/CODEOWNERS` | REPO-UTER | NOT_MODIFIED | Already exists; ownership mapping pending Phase IX. |

## 6. 需要保留的现有目录

全部 39 个顶层目录原样保留。

## 7. 需要调整的目录及理由

| 路径 | 动作 | 理由 |
|---|---|---|
| `(none)` | NO_CHANGE | 核心原则：先适配现有代码，再逐步规范代码。不为适配 UAES 示意图而移动 backend/、web/、electron/ 等真实目录。 |
| `docs-web/` | REGISTER_AS_MODULE | 参考结构未列出，但真实仓库存在 Next.js/Fumadocs 文档站，登记为 MOD-DOCS-WEB。 |
| `tokenkit/tokenkit/` | REGISTER_AS_SEPARATE_MODULE | 第四个 Go module 真实存在且 module 名为上游标识，按 AGENTS.md 不得改名。 |

## 8. 完整文件落库清单（治理库新增 20 项）

| 文件 | 类型 |
|---|---|
| `.uaes/policies/execution-policy.yaml` | NEW_IN_GOVERNANCE_REPO |
| `.uaes/registry/gates.yaml` | NEW_IN_GOVERNANCE_REPO |
| `.uaes/registry/mappings.yaml` | NEW_IN_GOVERNANCE_REPO |
| `.uaes/registry/modules.yaml` | NEW_IN_GOVERNANCE_REPO |
| `.uaes/registry/standards.yaml` | NEW_IN_GOVERNANCE_REPO |
| `.uaes/validators/README.md` | NEW_IN_GOVERNANCE_REPO |
| `quality/scripts/uaes/change-impact.mjs` | NEW_IN_GOVERNANCE_REPO |
| `quality/scripts/uaes/ci/UAES-GOVERNANCE-WORKFLOW.yml.template` | NEW_IN_GOVERNANCE_REPO |
| `quality/scripts/uaes/generate-inventory.mjs` | NEW_IN_GOVERNANCE_REPO |
| `quality/scripts/uaes/paths.mjs` | NEW_IN_GOVERNANCE_REPO |
| `quality/scripts/uaes/quality-gate-runner.mjs` | NEW_IN_GOVERNANCE_REPO |
| `quality/scripts/uaes/README.md` | NEW_IN_GOVERNANCE_REPO |
| `quality/scripts/uaes/uaes.mjs` | NEW_IN_GOVERNANCE_REPO |
| `quality/scripts/uaes/validate-registry.mjs` | NEW_IN_GOVERNANCE_REPO |
| `reports/baseline/UAES-P13-REPOSITORY-INVENTORY.json` | GENERATED_EVIDENCE |
| `reports/baseline/UAES-P13-REPOSITORY-INVENTORY.md` | GENERATED_EVIDENCE |
| `reports/quality/UAES-P13-CHANGE-IMPACT.json` | GENERATED_EVIDENCE |
| `reports/quality/UAES-P13-GOVERNANCE-LAYER-IMPLEMENTATION.md` | GENERATED_EVIDENCE |
| `reports/quality/UAES-P13-GOVERNANCE-VERIFICATION.json` | GENERATED_EVIDENCE |
| `reports/quality/UAES-P13-REGISTRY-VALIDATION.json` | GENERATED_EVIDENCE |

## 9. 自动化实施顺序与验收条件

| 阶段 | 工作 | 交付物 | 状态 |
|---|---|---|---|
| I | 审计当前仓库真实目录和所有代码模块 | Repository Inventory | DONE |
| II | 建立 Module Registry | .uaes/registry/modules.yaml | DONE |
| III | 建立标准与模块映射 | .uaes/registry/mappings.yaml | DONE |
| IV | 建立统一标准注册表索引 | .uaes/registry/standards.yaml | DONE |
| V | 建立 Schema 和 Registry Validator | .uaes/schemas/*.schema.json + validate-registry.mjs | DONE |
| VI | 建立变更影响分析 | change-impact.mjs + shared_impact_zones | DONE |
| VII | 建立领域质量门禁 | gates.yaml + quality-gate-runner.mjs (NOT_RUN by default) | PARTIAL |
| VIII | 建立全局质量门禁 | UAES-GLOBAL-GATE-001 aggregation | PARTIAL |
| IX | 接入 GitHub Actions | requires authorisation to edit product repo .github/ | PENDING |
| X | 用真实 Uter 任务进行 AI 实战验收 | Operational Acceptance report | PENDING |

验收条件：

1. All module paths and manifests resolve against the real repository (validate-registry.mjs PASS).
2. Every mapped rule ID exists in standards/**/*.md; no invented IDs.
3. Every declared_in artefact and npm script exists (validate-registry.mjs PASS).
4. Change Impact Engine expands shared zones and never relies on git diff alone.
5. Domain gates and the global gate are NOT_RUN until explicitly authorised; never reported as PASS.
6. Machine-readable reports conform to their JSON Schemas (ajv).
7. No product-repository file is modified, staged or committed by the governance layer.
8. Phase IX CI wiring and Phase X operational acceptance require separate authorisation.
