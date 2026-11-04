# UAES-P05-BRANCH-IMPORT-RECORD — P4 Design Token Branch Import Audit

| Field | Value |
|---|---|
| Report ID | UAES-P05-BRANCH-IMPORT-RECORD |
| Version | 1.0.0 |
| Status | DRAFT |
| Domain | UAES-05 Experience & Design |
| Phase | P4 |
| Gate | UAES-05-GATE-001 |
| Result | NOT_RUN |

> 本文件是导入审计证据，不是 UAES 标准文件。
> 唯一事实源：`.uaes/STANDARD-REGISTRY.yaml`；
> 权威验收基线：`quality/acceptance/UAES-P05-ACCEPTANCE-BASELINE.md`；
> 权威门禁：`quality/gates/UAES-05-GATE-001-DESIGN-QUALITY-GATE.md`。
> 导入来源：`hu-xulin/uter` 分支 `uaes/p4-design-token-engine`，
> 提交 `4bdea45bcff54f6bd8db39b52667b2ac39dd78bc`。

## 1. Scope and governing rules

分支相对 `origin/main` 共 29 个改动文件。导入遵循以下约束：

1. **不改动既有文件夹和层级**：不删除、不重命名、不移动、不修改任何既有文件；
   新增目录只依据 `UAES-05-EXPERIENCE-DESIGN-STANDARD.md` §6 的 `design-system/`
   建议结构，以及注册表 `governance.*` 指定的 `quality/scripts/`、`reports/`。
2. **冲突/重复以规范库为准**：分支中同名或同语义的权威文件、已存在的占位文件一律不导入。
3. **代码以规范库文档为准**：按 `UAES-05-001/002/003/006/011`、门禁 DQ 条款和
   `.uaes/schemas/` 下的 Schema 修正导入代码。
4. **不得伪造证据**：`NOT_RUN` / `NOT_VERIFIED` 不得记为 `PASS`
   （`UAES-05-GATE-001` §4/§6）；不臆造审批与组件契约数据。

导入前基线：`reports/quality/UAES-P05-PRE-IMPORT-BASELINE.sha256`（435 个文件）。
导入后复核：**modified = 0，deleted = 0**；既有 105 个目录全部保留。

## 2. File-by-file mapping

| # | 分支文件 | 处置 | 本项目目标路径 |
|---|---|---|---|
| 1 | `.github/workflows/ci.yml` | 导入（参考副本） | `design-system/reference/web/ci.yml` |
| 2 | `docs/design-system/UTER-DESIGN-SYSTEM-3.0.md` | 导入 + 合规声明头 | `design-system/docs/UTER-DESIGN-SYSTEM-3.0.md` |
| 3 | `quality/acceptance/UAES-P4-ACCEPTANCE-BASELINE.md` | **跳过：重复** | 以 `quality/acceptance/UAES-P05-ACCEPTANCE-BASELINE.md` 为准 |
| 4 | `quality/gates/UAES-05-GATE-001-EXPERIENCE-AND-DESIGN-GATE.md` | **跳过：重复** | 以 `quality/gates/UAES-05-GATE-001-DESIGN-QUALITY-GATE.md` 为准 |
| 5–8 | `reports/{baseline,compliance,release,security}/.gitkeep` | **跳过：已存在** | 保持不变 |
| 9 | `reports/compliance/UAES-P4-BRAND-PRIMARY-CHANGE-RECORD.md` | 导入 + 重制元数据头 + 改引用 | `reports/compliance/UAES-P05-BRAND-PRIMARY-CHANGE-RECORD.md` |
| 10 | `reports/quality/UAES-P4-ACCEPTANCE-STATUS.md` | 同上 | `reports/quality/UAES-P05-ACCEPTANCE-STATUS.md` |
| 11 | `reports/quality/UAES-P4-GATE-EXECUTION-MAPPING.md` | 同上 | `reports/quality/UAES-P05-GATE-EXECUTION-MAPPING.md` |
| 12 | `reports/quality/UAES-P4-IMPLEMENTATION-AUDIT.md` | 同上 | `reports/quality/UAES-P05-IMPLEMENTATION-AUDIT.md` |
| 13 | `reports/quality/UAES-P4-IV-COMPONENT-REGISTRY-IMPLEMENTATION.md` | 同上 | `reports/quality/UAES-P05-IV-COMPONENT-REGISTRY-IMPLEMENTATION.md` |
| 14 | `reports/quality/UAES-P4-IV-COMPONENT-REGISTRY-VALIDATION.md` | 同上 | `reports/quality/UAES-P05-IV-COMPONENT-REGISTRY-VALIDATION.md` |
| 15 | `web/scripts/check-component-registry.mjs` | 导入 + 路径/契约修正 | `quality/scripts/design-system/check-component-registry.mjs` |
| 16 | `web/scripts/check-design-tokens.mjs` | 导入 + `--root` / NOT_RUN | `quality/scripts/design-system/check-design-tokens.mjs` |
| 17 | `web/scripts/generate-design-tokens.mjs` | 导入 + 版本头 + Schema 投影 | `quality/scripts/design-system/generate-design-tokens.mjs` |
| 18 | `web/scripts/verify-contrast.mjs` | 导入 + 4.44:1 负向测试 | `quality/scripts/design-system/verify-contrast.mjs` |
| 19 | `web/src/design-system/__tests__/sidebar-active-guard.test.ts` | 导入（参考，NOT_RUN 声明） | `design-system/reference/web/tests/sidebar-active-guard.test.ts` |
| 20 | `web/src/design-system/__tests__/status-badge-contrast.test.ts` | 同上 | `design-system/reference/web/tests/status-badge-contrast.test.ts` |
| 21 | `web/src/design-system/__tests__/token-source.test.ts` | 导入 + 路径独立 + 规范断言 | `design-system/tests/token-source.test.ts` |
| 22 | `web/src/design-system/component-registry.json` | 导入 + 治理元数据 | `design-system/components/registry/component-registry.json` |
| 23 | `web/src/design-system/schemas/component-registry.schema.json` | 导入 + Schema 对齐 | `design-system/components/contracts/component-registry.schema.json` |
| 24 | `web/src/design-system/source/brand.tokens.json` | 导入 + 治理字段 | `design-system/tokens/source/brand.tokens.json` |
| 25 | `web/src/design-system/source/brand.tokens.schema.json` | 导入 + 新字段定义 | `design-system/tokens/source/brand.tokens.schema.json` |
| 26 | `web/src/design-system/tokens/generated/brand.css` | **由生成器重新生成**（禁止手工改） | `design-system/tokens/generated/brand.css` |
| 27 | `web/src/styles/index.css` | 导入（参考副本） | `design-system/reference/web/styles/index.css` |
| 28 | `web/src/styles/theme.css` | 导入（参考副本） | `design-system/reference/web/styles/theme.css` |
| 29 | `web/package.json` | 导入（参考副本） | `design-system/reference/web/package.json` |

新增支撑资产：`design-system/README.md`、`design-system/tokens/source/uaes-tokens.projected.json`（生成）、
`design-system/components/contracts/UAES-COMPONENT-CONTRACT-GAP.md`（生成）、
`quality/scripts/design-system/{paths.mjs,verify-import.mjs,README.md}`、
`reports/quality/UAES-P05-PRE-IMPORT-BASELINE.sha256`、
`reports/quality/UAES-P05-IMPORT-VERIFICATION.json`（生成）、本报告。

## 3. Code corrections required by UAES documents

| 规范依据 | 分支原状 | 修正 |
|---|---|---|
| `UAES-05-002` §6、`UAES-05-011-006` | 生成 CSS 只写 Source / Generator 名，无版本 | 生成头补 `Generator version`、`Source version`、规范条款；生成器拒绝未声明治理的源 |
| `UAES-05-002-007`、DQ-024 | 单一产物，无漂移校验 | 生成 CSS + Schema 投影两个产物，重复构建 SHA-256 一致；`--check` 检出漂移 |
| `.uaes/schemas/design-token.schema.json`、DQ-002 | Token 源为 DTCG 格式，无法用 UAES Schema 校验 | 保留 DTCG 为唯一权威源（`UAES-05` §6），新增**生成**的 `uaes-tokens.projected.json` 通过 UAES Schema 实际校验 |
| `UAES-05-003` §6、P05 §L.4 | 校验脚本未把组合与「导航选中态 4.44:1 整改」关联，缺负向测试 | 明确标注已整改组合（`#5558D8` on `#F0F0FF` = 4.93:1），新增负向测试证明旧组合 4.44:1 被 AA 规则拒绝 |
| `UAES-05-001-009` / §8、`prohibit_implicit_approval` | 品牌主色变更仅写「用户确认」，无正式审批 | Token 源增加 `changeApproval: NOT_VERIFIED` 与治理指针；文档加声明；不臆造 Exception ID / 审批人 / 日期 |
| `UAES-05-006`、`.uaes/schemas/component-contract.schema.json` | 注册表字段集与规范库契约 Schema 不一致 | 校验改以规范库 Schema 为准，输出 9 个缺失字段差距并生成差距记录，标 `NOT_VERIFIED`，不伪造 65 个组件的 props/variants/tests |
| 注册表 `governance.script_directory` | 脚本硬编码 `web/`、`process.cwd()` | 新增 `paths.mjs` 统一从 `import.meta.url` 解析；`--root` / `--implementation-root` 支持产品仓库；缺失环境一律 `NOT_RUN` |
| 注册表 v1.6/v1.7 命名规则 | 报告用旧 `UAES-P4-*` 命名并引用已废弃文件 | 重命名为 `UAES-P05-*`，元数据头改为规范库表格格式，失效引用全部改写 |

品牌主色 `#5B5EE6` 与 `UAES-05-003` §6 当前基线一致，予以保留；但审批状态仍为 NOT_VERIFIED。

## 4. Verification evidence

执行 `node quality/scripts/design-system/verify-import.mjs`（exit 0），10 项检查：

| 检查 | 结果 |
|---|---|
| DQ-002 Token 源 Schema（DTCG 容器） | PASS |
| DQ-002 UAES design-token Schema（投影） | PASS |
| DQ-009 注册表容器 Schema | PASS |
| DQ-024 生成产物一致性 | PASS |
| DQ-006 对比度 + 负向测试 | PASS |
| DQ-009 组件契约符合性 | **NOT_VERIFIED**（9 字段 / 65 组件缺口） |
| 报告元数据信封 | PASS（6/6） |
| 权威引用完整性 | PASS（6/6） |
| 既有资产零改动 | PASS（435 文件，modified 0 / deleted 0） |
| DQ-024 生成来源声明 | PASS |

机器可读报告：`reports/quality/UAES-P05-IMPORT-VERIFICATION.json`
（符合 `.uaes/schemas/quality-report.schema.json`）。

## 5. Open items — P05 remains BLOCKED

1. 组件契约：`props` / `variants` / `tests` / `purpose` / `platforms` / `version` 等需由 Design System Owner 在产品仓库补齐。
2. 品牌主色高影响变更：需正式 Exception ID、审批人、批准日期。
3. DQ-004 硬编码扫描、DQ-012/013 键盘与焦点、DQ-021/022 视觉回归与基准审批、axe 扫描：需产品仓库与浏览器环境，当前 `NOT_RUN`。
4. 完整 CI 执行与 P05 正式批准未完成（`UAES-P05-ACCEPTANCE-BASELINE.md` §M/§N）。

依 `UAES-05-GATE-001` §5，本报告结论为 **BLOCKED**，不得表述为 `ACCEPTED`。
