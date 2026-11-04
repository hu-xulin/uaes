# UAES-P13-GOVERNANCE-LAYER-IMPLEMENTATION — Engineering Governance Layer 实施报告

| Field | Value |
|---|---|
| Report ID | UAES-P13-GOVERNANCE-LAYER-IMPLEMENTATION |
| Version | 1.0.0 |
| Status | DRAFT |
| Domain | UAES-13 Repository Integration（建议扩展阶段，尚未在注册表登记为 P13 域） |
| Phase | P13 / Repository Integration |
| Gate | UAES-GLOBAL-GATE-001（本层聚合门禁） |
| Result | PARTIAL — L1/L2 已执行，L3/L4 `NOT_RUN` |

> 本文件是实施证据，不是 UAES 标准文件。
> 唯一事实源：`.uaes/STANDARD-REGISTRY.yaml`。
> 产品代码仓库：`/Users/lincolnhu/uter`；规范库：`/Users/lincolnhu/uaes`，关系 `PARALLEL`。
> 核心原则：**先适配现有代码，再逐步规范代码；不移动、不重命名任何业务代码目录。**

## 1. 本次做了什么

依据「独立的 Engineering Governance Layer」设计，建立**规范体系 ↔ 代码体系**之间可机器验证的关联，而不是把规范文件散落到 Go / React / Electron 目录，也没有把两者合并成一套目录。

| 阶段 | 工作 | 状态 | 交付物 |
|---|---|---|---|
| I | 审计真实仓库目录与模块 | DONE | `reports/baseline/UAES-P13-REPOSITORY-INVENTORY.{json,md}`（九项清单） |
| II | Module Registry | DONE | `.uaes/registry/modules.yaml`（10 个真实模块） |
| III | 标准与模块映射 | DONE | `.uaes/registry/mappings.yaml`（9 条映射，三层结构） |
| IV | 统一标准注册表索引 | DONE | `.uaes/registry/standards.yaml`（从全局注册表派生，178 条） |
| V | Schema + Registry Validator | DONE | 5 份 Schema + `validate-registry.mjs`（18 项检查） |
| VI | 变更影响分析 | DONE | `change-impact.mjs` + 4 个共享影响区 |
| VII | 领域质量门禁 | PARTIAL | `gates.yaml`（13 门禁）+ `quality-gate-runner.mjs`，默认 `NOT_RUN` |
| VIII | 全局质量门禁 | PARTIAL | `UAES-GLOBAL-GATE-001` 聚合，默认 `NOT_RUN` |
| IX | 接入 GitHub Actions | PENDING | 仅产出模板 `quality/scripts/uaes/ci/*.yml.template`，**未改产品仓库 CI** |
| X | 真实 Uter 任务 AI 实战验收 | PENDING | 未执行 |

## 2. 真实审计结论（不依赖示意图假设）

- 产品仓库有 **4 个 Go module**：根 `github.com/uter-ai/uter`、`relaykit`、`tokenkit`、以及嵌套的 `tokenkit/tokenkit`（module 名为受保护的上游标识 `github.com/QuantumNous/new-api/tokenkit`，不得改名）。
- 有 **3 个前端/桌面模块**：`web`（React/Rsbuild/Bun）、`docs-web`（Next.js/Fumadocs）、`electron`。参考示意图没有列出 `docs-web`，审计后补登记为 `MOD-DOCS-WEB`。
- **不存在 `backend/`**；Go 业务包平铺在仓库根目录。因此未新建 `backend/`，也未移动任何目录。
- 产品仓库**已有**治理执行体系：`AGENTS.md`（14 行 Task-based spec routing 单一事实源）、`.ai/AIES.md`、`docs/ai-specs/`（15 份）、`scripts/verify-all.sh`、`scripts/quality/uter-quality.sh`、10 个 CI workflow、`CODEOWNERS`、PR 模板。本层**映射并复用**它们，不建立竞争性规则源；冲突以产品仓 `AGENTS.md` 为准。
- 规范库有 13 域 / 178 标准 / 13 门禁 / 13 验收基线 / 65+ Schema，**590 个真实规则 ID**；其中 **8 个域（00/01/03/04/09/10/11/12）没有规则级 ID**。

## 3. 关键设计决策

1. **治理层位置**：全部落在规范库（`.uaes/registry/`、`.uaes/policies/`、`.uaes/validators/`、`.uaes/schemas/`、`quality/scripts/uaes/`）。脚本放在 `quality/scripts/uaes/` 是遵循注册表 `governance.script_directory`，没有照搬示意图在产品仓库新建 `scripts/uaes/`。
2. **零写入产品仓库**：`config.yaml` 与 `execution-policy.yaml` 声明 `write_access: false`；所有校验只读访问代码库。主工作区 40+ 项并行 WIP 全程未被触碰、暂存或提交。
3. **多对多映射**：`modules.yaml#standards` 表达 Domain Mapping；`mappings.yaml#rules` 表达 Rule Mapping；`verification_catalog` 表达 Verification Mapping。一个模块受多域约束，一个标准作用于多模块。
4. **绝不编造规则 ID**：21 个被映射的规则 ID 全部从 `standards/**/*.md` 提取并由 `G-009` 逐项核验；无规则级 ID 的域 `rules: []` 并标注 `NO_RULE_IDS_REGISTERED_IN_DOMAIN`，由域级门禁承载。
5. **复用真实验证命令**：20 条 `verification_catalog` 的 `declared_in` 与 npm script 名均由 `G-014` 对真实文件核验；披露一个真实缺口——第 4 个 Go module 未出现在 `.quality/.state/inventory.txt`，而 UAES-06/09 门禁禁止用一次根 `go test ./...` 宣称四个模块全通过。
6. **影响分析不只看 git diff**：4 个 `shared_impact_zones` 覆盖共享 Go 核心（`model/**`、`go.mod` 等）、设计 Token、规则源与交付配置；命中即扩展模块范围。
7. **不冒充 PASS**：L3/L4 默认 `NOT_RUN`，`--execute` 只打印待授权命令；全局门禁如实记为 `BLOCKED` / `NOT_VERIFIED`。

## 4. 门禁执行证据

真实命令（均在治理库内执行，退出码 0）：

```
node quality/scripts/uaes/uaes.mjs all
node quality/scripts/uaes/validate-registry.mjs      # 18 项 PASS=18 FAIL=0
node quality/scripts/uaes/change-impact.mjs --example
node quality/scripts/uaes/generate-inventory.mjs
node quality/scripts/uaes/quality-gate-runner.mjs --example
```

| 证据 | 结果 |
|---|---|
| L1 检查 | `checks=18 PASS=18 FAIL=0 NOT_RUN=0`（含 Schema、模块路径、真实规则 ID、验证命令存在性） |
| L2 示例（充值订单重复入账） | 4 个变更文件 → 1 个直接模块 + 9 个扩展模块；9 个适用域、21 个真实规则 ID、9 道门禁、19 条必跑验证 |
| 报告 Schema | `quality-report.schema.json` 校验 PASS；`gate_status=BLOCKED`、`review_status=NOT_VERIFIED` |
| 机器可读产出 | `UAES-P13-REGISTRY-VALIDATION.json`、`UAES-P13-CHANGE-IMPACT.json`、`UAES-P13-GOVERNANCE-VERIFICATION.json`、`UAES-P13-REPOSITORY-INVENTORY.{json,md}` |
| 完整文件落库清单 | `reports/baseline/UAES-P13-REPOSITORY-INVENTORY.md` §8（18 项） |

## 5. 未关闭项与授权边界

| 项 | 状态 | 需要的动作 |
|---|---|---|
| 阶段 IX CI 接入 | 未执行 | 需授权修改产品仓库 `.github/`；且需决定两仓 checkout / submodule / 产物分发方式。模板已备 |
| 阶段 X 实战验收 | 未执行 | 用一个真实 Uter 任务走完 8 步流程并产出 Operational Acceptance 报告 |
| 第 4 个 Go module 覆盖缺口 | 已记录为 finding | 产品仓 `scripts/quality/uter-quality.sh` 与 inventory 需补该模块测试 |
| 8 个域无规则级 ID | 已如实标注 | 由规范 Owner 决定是否补全规则编号，本层不代写 |
| P05 验收 | BLOCKED | 组件契约 9 字段、品牌色正式审批、视觉回归 / axe / 键盘焦点未关闭 |
| P13 域登记 | 未登记 | 注册表当前仅 P0–P12；「P13 Repository Integration」是建议扩展阶段，尚未成为正式域 |
| 第 3/4 层门禁 | `NOT_RUN` | 需授权在产品仓库执行验证命令，之后才能判定 PASS |

**授权边界**：本次未修改、未暂存、未提交产品仓库任何文件；未配置远端、未推送；未建 PR、未合并。
