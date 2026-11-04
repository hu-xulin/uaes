# UAES 治理层可执行脚本

位置依据是注册表 `governance.script_directory: quality/scripts/`（与既有 `architecture/`、`design-system/` 平级），未在代码仓库新建 `scripts/uaes/`，也**未修改任何产品代码目录**。

## 总入口

```bash
cd /Users/lincolnhu/uaes
node quality/scripts/uaes/uaes.mjs all
```

| 命令 | 对应层 | 作用 |
| --- | --- | --- |
| `validate` | L1 Governance Validation | 校验 4 张注册表、JSON Schema、模块路径/manifest 真实存在、规则 ID 真实存在、门禁可解析、`declared_in` 与 npm script 真实存在、只读边界 |
| `impact` | L2 Module + Change Impact | 变更文件 → 直接模块 → 共享影响区扩展 → 适用域/真实规则 ID/门禁/必跑命令 |
| `inventory` | Phase I | 只读审计产品仓库，重生成 Repository Inventory（JSON + Markdown） |
| `gate` | L3/L4 | 汇总证据，生成符合 `quality-report.schema.json` 的报告 |
| `all` | 全部 | `validate → impact → inventory → gate → inventory`（末次刷新落库清单） |

`impact` 输入方式：`--files a,b,c`、`--stdin`、`--git-diff`（只读 `git diff --name-only`）、`--example`（文档中的「充值订单重复入账」场景）。

## 分层与执行边界

| 层 | 是否真实执行 | 说明 |
| --- | --- | --- |
| L1 / L2 | ✅ 真实执行 | 全部在治理库内完成，只读访问产品仓库 |
| L3 / L4 | ❌ 默认 `NOT_RUN` | 需在产品仓库内运行命令，须单独授权；`--execute` 只**打印**待授权命令，不执行 |

`quality-gate-runner.mjs` 默认 `gate_status: BLOCKED`、`review_status: NOT_VERIFIED`，绝不把未执行的门禁写成 PASS。

## 依赖

优先复用产品仓库已安装的 `js-yaml` / `ajv`；若不可用，`loadYaml` 自动降级到 `python3 + PyYAML`，Schema 校验记为 `NOT_RUN`（不冒充 PASS）。
产品仓库根由环境变量 `UTER_REPO_ROOT` 覆盖，默认 `/Users/lincolnhu/uter`。

## 输出证据

| 文件 | 内容 |
| --- | --- |
| `reports/quality/UAES-P13-REGISTRY-VALIDATION.json` | L1 逐项检查结果 |
| `reports/quality/UAES-P13-CHANGE-IMPACT.json` | L2 影响分析结果 |
| `reports/quality/UAES-P13-GOVERNANCE-VERIFICATION.json` | L3/L4 聚合质量报告 |
| `reports/baseline/UAES-P13-REPOSITORY-INVENTORY.{json,md}` | Phase I 九项清单 |

## 与现有体系的关系

产品仓库已有 `AGENTS.md`（Task-based spec routing 单一事实源）、`.ai/AIES.md`、`docs/ai-specs/`、`scripts/verify-all.sh`、`scripts/quality/uter-quality.sh`。本治理层**映射并复用**它们，不建立竞争性规则源；冲突时以产品仓库 `AGENTS.md` 为准。
