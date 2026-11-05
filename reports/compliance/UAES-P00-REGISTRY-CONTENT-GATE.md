# UAES-P00 — Layer-1 注册表内容级门禁修复报告

| 项目 | 值 |
| --- | --- |
| 报告 ID | `UAES-P00-REGISTRY-CONTENT-GATE` |
| 日期 | 2026-11-05 |
| 仓库 / 分支 | `hu-xulin/uaes` / `ai/uaes-p00-content-gate-2026-11-05` |
| 基线 | `origin/main` @ `968e4a63648b7cd1ec9e242179ceef689849202b` |
| 范围 | Layer-1 `validate-registry.mjs` 门禁、注册表声明资产、CI 接入 |
| 状态 | **IMPLEMENTED + 本地 VERIFIED**；CI 远程结论 `NOT_RUN`（尚未推送） |
| 关联 | `_reports/UTER-UAES-FULL-COMPLIANCE/`（Uter 仓）R-001 / R-004 / R-005 / R-007 / GATE-THREE-WAY-TEST |

> 状态语义：`PRESENT` / `DRAFT` / `IMPLEMENTED` 不等于 `VERIFIED`。
> `FAIL=0` 也不等于 `VERIFIED`；未执行项必须以 `NOT_RUN` / `BLOCKED` 显式列出。
> 本报告只声明下述命令实际跑出的结论，不推断未运行的检查。

---

## 1. 结论摘要（三层判定）

| 层级 | 判定 | 依据 |
| --- | --- | --- |
| 规范已引入 | ✅ 成立 | `.uaes/STANDARD-REGISTRY.yaml` 早已有 `validation.files.require_registered_schema_files: true` |
| 规范已落实 | ✅ 部分成立 | 4 个 Schema + 1 份标准文档补齐字节；重复声明移除 |
| 规范已强制执行 | ✅ **本分支新成立（限内容级）** | 新增 G-019~G-023 + 三向测试 + CI workflow；Negative/Bypass 均被阻断 |

**本 PR 只关闭「Layer-1 注册表内容级」这一项。** 13 个标准域门禁、P05 组件契约、Uter 集成均未因此变为 `VERIFIED`。

---

## 2. 问题与根因

2026-11-05 基线审计（`R-001-UAES-BASELINE-AUDIT.md` / `R-005-SCHEMA-VALIDATION.md`）实测：

- `node quality/scripts/uaes/validate-registry.mjs --no-write` 返回 **18/18 PASS、退出码 0**；
- 同期 `origin/main` 中 4 个已注册 Schema 为 **0 字节**：
  `.uaes/schemas/{architecture-review,knowledge,report,task}.schema.json`；
- 1 份已注册标准文档为 **0 字节**：
  `standards/00-foundation/UAES-00-006-AI-ENGINEERING-EXECUTION-MODEL.md`；
- 把某个已注册 Schema 清空后重跑，仍是 18/18 PASS。

根因：`G-014` 只断言 `declared_in` **路径存在**，`G-002/003/004` 只校验三个注册表**结构 Schema**。
门禁从头到尾没有读取被登记资产的**内容**，因此「门禁能阻止违规」这一前提不成立。
注册表里早已写入的 `require_registered_schema_files: true` 属于「规范已引入」而非「已强制执行」。

### 2.1 证据驱动的自我修正（推翻阶段 0 的两条初步结论）

| 阶段 0 初步结论 | 复核后结论 | 处置 |
| --- | --- | --- |
| 需修复 4 空 Schema + 1 空标准 | 内容已在 UAES **PR #1 分支**修好但未合并 | 逐字复用 PR #1 已验证字节，不重复造内容 |
| 3 个「未注册标准 ID」（`UAES-00-007`、`UAES-02-009`、`UAES-02-010`） | 是域文档内的**规则条款编号**；注册表 `standards:` 段登记的是**文件级**条目 | **撤回该缺陷**，不补造注册表条目 |

---

## 3. 修复内容

| 文件 | 变更 | 证据 |
| --- | --- | --- |
| `.uaes/schemas/architecture-review.schema.json` | 0B → 2106B，JSON Schema 2020-12 | 复用 PR #1 |
| `.uaes/schemas/knowledge.schema.json` | 0B → 1434B | 复用 PR #1 |
| `.uaes/schemas/report.schema.json` | 0B → 2003B | 复用 PR #1 |
| `.uaes/schemas/task.schema.json` | 0B → 3218B | 复用 PR #1 |
| `standards/00-foundation/UAES-00-006-...md` | 0B → 7101B | 复用 PR #1 |
| `.uaes/STANDARD-REGISTRY.yaml` | 删除重复声明 `UAES-SCHEMA-08-003`（`agent-handoff.schema.json` 已由 `UAES-SCHEMA-01-003` 声明） | G-023 首次运行实测 `PASS=22 FAIL=1` |
| `quality/scripts/uaes/validate-registry.mjs` | +G-019~G-023；新增 `--scope=content` 与 `CONTENT_CHECK_IDS` | 见 §4 |
| `quality/scripts/uaes/validate-registry.test.mjs` | 新建三向测试（7 例），临时副本隔离 | 见 §5 |
| `.github/workflows/registry-content-integrity.yml` | 新建 CI workflow | 见 §7 |
| `reports/compliance/UAES-P00-REGISTRY-CONTENT-GATE.md` | 本报告 | — |

PR #1 资产大小经 `curl` 下载后逐个 `stat` 核对，写入前为 0 字节、写入后与源一致。

---

## 4. 新增门禁的精确语义

| ID | 名称 | 硬判定 |
| --- | --- | --- |
| G-019 | all schema files parseable and non-empty | 扫 `.uaes/schemas/**/*.json` + `design-system/**/*.schema.json`；0 字节 / JSON 解析失败 / 非对象 / 缺 `$schema` 一律 FAIL |
| G-020 | all standard documents non-empty | 扫 `standards/**/*.md`，`<100` 字节 FAIL（`.gitkeep` 不在扫描后缀内） |
| G-021 | declared schemas resolve at content level | 注册表声明的每个 Schema 必须通过 G-019 同级校验 |
| G-022 | declared standards resolve at content level | 注册表声明的每个标准文件必须存在且 ≥100 字节 |
| G-023 | no duplicate declared artefact paths | 声明路径去重；未注册的运行时 Schema 只做 informational，不误判 FAIL |

设计约束：注册表声明 **59** 个 Schema，磁盘 `.uaes/schemas` 有 **70** 个，差额 11 个是运行时工具 Schema，未注册属合法现状；连 `design-system` 共扫 **72** 个 Schema、`standards` 共 **178** 份 `.md`。

### 4.1 `--scope=content`（避免伪造证据）

CI 不签出 Uter 产品仓。最初方案是构造产品仓桩文件，但实测 `G-014` 还要求
`web/package.json#scripts.typecheck`、`.golangci.yml`、`scripts/quality/uter-quality.sh`、
`AGENTS.md` 等十余个真实产物；用空桩把这些检查凑成 PASS 属于**制造证据**，与门禁文件头
`No check is faked as PASS` 直接冲突，故否决。

改为：`runValidation({ scope: 'content' })` 只执行 G-019~G-023，其余 18 项**不执行**并显式记为
`NOT_RUN / not executed (--scope=content)`。全量 23 项结论只在有真实 Uter 检出时本地产生。

---

## 5. 三向测试（`validate-registry.test.mjs`）

每个用例在 `os.tmpdir()` 内复制治理仓，真实构造违规，不污染任何工作区。

| 用例 | 结果 | 断言 |
| --- | --- | --- |
| `positive/clean-repo` | PASS | 5 项内容检查全 PASS、FAIL=0 |
| `negative/empty-registered-schema` | PASS | G-019 + G-021 阻断（修复前 18/18 PASS） |
| `negative/malformed-unregistered-schema` | PASS | G-019 全目录扫描阻断 |
| `negative/empty-standard-doc` | PASS | G-020 + G-022 阻断 |
| `negative/missing-meta-schema` | PASS | G-019 阻断缺 `$schema` |
| `bypass/distractor-file-cannot-mask-empty-schema` | PASS | `.txt` 诱饵无法掩盖空 Schema |
| `negative/duplicate-declared-path` | PASS | G-023 阻断重复声明 |

实测：`three-way tests: 7 PASS / 0 FAIL`，退出码 `0`。

**变异测试（证明测试不是空壳）**：在临时副本把 G-019 改成恒 PASS 后重跑，
得到 `3 PASS / 4 FAIL`、退出码 `1`，4 个负向/绕过用例全部失效 → 测试确能发现门禁被削弱。

---

## 6. 修复前后对照（实际命令与退出码）

| 场景 | 命令 | 结果 |
| --- | --- | --- |
| 修复前 | `node validate-registry.mjs --no-write`（清空已注册 Schema 后仍） | `PASS=18 FAIL=0`，退出码 `0` |
| 修复后·全量本地 | `node quality/scripts/uaes/validate-registry.mjs --no-write` | `scope=all checks=23 PASS=23 FAIL=0 NOT_RUN=0`，退出码 `0` |
| 修复后·CI 范围 | `node quality/scripts/uaes/validate-registry.mjs --no-write --scope=content` | `scope=content checks=23 PASS=5 FAIL=0 NOT_RUN=18`，退出码 `0` |
| 三向测试 | `node quality/scripts/uaes/validate-registry.test.mjs` | `7 PASS / 0 FAIL`，退出码 `0` |
| 证据语义断言 | workflow 内联 Node 断言 | `evidence: content PASS=5, out-of-scope NOT_RUN=18, FAIL=0`，退出码 `0` |
| CI 模拟（无 js-yaml/ajv、无产品仓） | 临时副本强制 Python+PyYAML 降级 | 内容门禁 `EXIT=0`；三向测试 `7 PASS / 0 FAIL` |
| 变异测试 | 削弱 G-019 | `3 PASS / 4 FAIL`，退出码 `1` |
| workflow 静态校验 | PyYAML `safe_load` | 8 steps、3 个 action SHA 全部经 GitHub API 确认存在 |

期间发现并修正：原 workflow 中 `actions/setup-node@1d0ff469b7ec7b3cb9a8673f4dcbf885e53dbe5b`
不是有效 commit；官方 v4.2.0 实为 `1d0ff469b7ec7b3cb9d8673fde0c81c44821de2a`。
另两个 SHA（`checkout` v7.0.0、`setup-python` v5.6.0）经 API 复核有效。

**并发核验**：本地执行期间 `origin/main` 由 `968e4a6` 前进到 `fe3b678`
（`fix(uaes): validate all registered rule ID families`，新增
`quality/scripts/validate-p00-foundation.rb` 一个文件）。复核确认该提交**未**触碰本分支的
任何文件：5 份资产在 `origin/main` 仍为 0 字节、注册表仍含重复声明、门禁仍无 G-019。
本分支基于 `968e4a6`，与 `origin/main` 无文件级冲突，按普通 PR 提交，不做 rebase / 强推。

---

## 7. CI 接入

`.github/workflows/registry-content-integrity.yml`：

- 触发：`push` 到 `main` / `ai/**`，`pull_request` 到 `main`，`workflow_dispatch`；
- 权限 `contents: read`，10 分钟超时，同 ref 并发取消；
- Node 22 + Python 3.12 + 固定 `PyYAML==6.0.2`（`paths.mjs` 在无产品仓 `node_modules` 时走
  `python3 -c "import yaml"` 降级，必须固定版本）；
- 门禁 `--no-write --scope=content`，避免生成报告污染工作区；
- 独立的「证据语义断言」步骤：5 项内容检查必须全 PASS，范围外 18 项必须全 NOT_RUN，
  任何范围外 PASS 直接失败；
- 三向测试；最后 `git status --porcelain -- reports/` 必须为空。

三个 action 均锁定到经 GitHub API 验证的 commit SHA。

---

## 8. 未关闭风险（OPEN，不得据此宣布合规）

| ID | 风险 | 证据 |
| --- | --- | --- |
| F-01 | UAES `origin/main` 共 **113** 个 0 字节文件；本分支修复 5 个后仍有 **108** 个，其中 **59** 个非 `.gitkeep` 真实资产为空 | 含 `AGENTS.md` / `CLAUDE.md`（0B）、`agents/roles/*/manifest.json`（11）、`agents/adapters/*.md`（6）、`quality/scripts/architecture/check-*`（5）、`workflows/registry.yaml`、`skills/registry.yaml`、`.uaes/knowledge/**`（28）、`.uaes/TOOL-ADAPTERS/*`（5）等。均不在 G-019~G-023 扫描范围。**PR #1（100 文件、Open + Draft）已覆盖其中大部分，但未合并** |
| F-02 | 全局注册表 `status: DRAFT` | `.uaes/STANDARD-REGISTRY.yaml` `registry.status` |
| F-03 | 13 个标准域门禁全部 `NOT_RUN`，`quality-gate-runner` `BLOCKED / NOT_VERIFIED` | R-003 合规矩阵 |
| F-04 | P05 65 组件契约、视觉回归、axe、键盘焦点未关闭 | R-001 / R-003 |
| F-05 | CI 只跑内容范围，18 项产品仓相关检查恒为 `NOT_RUN` | 需另设签出 Uter 的独立 job 或集成流水线才能关闭 |
| F-06 | 11 个运行时 Schema 未在注册表声明 | G-023 informational |
| F-07 | 本分支 5 份资产逐字复用 PR #1；PR #1（`ai/uaes-agent-skills-governance-2026-11-05`）仍为 **Open + Draft / 100 文件**，PR #2 已 **CLOSED** | 存在合并顺序依赖：PR #1 的注册表为 v1.8.0 且**仍保留** `UAES-SCHEMA-08-003` 重复声明，其 `validate-registry.mjs` **没有** G-019~G-023。若 PR #1 后合并并整份覆盖注册表，会重新触发 G-023；合并前需在 PR #1 上同步本分支的注册表去重与门禁改动 |
| F-08 | `paths.mjs` 硬编码 `createRequire('/Users/lincolnhu/uter/web/package.json')` | 不具可移植性；CI 只能靠 PyYAML 降级 |
| F-09 | Uter `main` 仍**零 UAES 引用**；S2–S6 集成未开始 | R-002 Uter 基线审计 |
| F-10 | 本分支远程 CI 结论尚未产生 | `NOT_RUN`（尚未 push）；不得写成 VERIFIED |

---

## 9. 复现命令

```bash
cd /Users/lincolnhu/uaes
node quality/scripts/uaes/validate-registry.mjs --no-write                    # 全量 23 项
node quality/scripts/uaes/validate-registry.mjs --no-write --scope=content   # CI 内容范围
node quality/scripts/uaes/validate-registry.test.mjs                          # 三向测试
python3 -c "import yaml;yaml.safe_load(open('.github/workflows/registry-content-integrity.yml'))"
```

运行门禁**不要**省略 `--no-write`：默认行为会重写
`reports/quality/UAES-P13-REGISTRY-VALIDATION.json`，造成审计工作区污染（阶段 0 已发生过并复原）。
