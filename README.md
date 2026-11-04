# UTER AI Engineering Standard (UAES)

> 本仓库是 **UTER AI 工程标准库**（治理 / 规范库），不是产品应用代码仓库。
> 单一事实源：`.uaes/STANDARD-REGISTRY.yaml`（`registry.version: 1.7.0`，`status: DRAFT`）。

## 一、代码在哪里

全局注册表明确声明 `project.architecture_relationship: PARALLEL` —— 标准库与产品代码仓是**并行治理关系**，不复制产品源码。

| 仓库 | 路径 | 内容 |
| --- | --- | --- |
| 产品代码 | `/Users/lincolnhu/uter` | Go 后端 + React / TypeScript 前端，数千个源文件 |
| 标准库（本仓库） | `/Users/lincolnhu/uaes` | 规范文档、Schema、门禁、报告，以及少量「校验 / 生成」脚本 |

本仓库共 467 个受控文件，构成如下：

| 类型 | 数量 | 说明 |
| --- | --- | --- |
| `.md` | 303 | 标准、门禁、验收基线、报告（主体是文档，不是代码） |
| `.json` / `.yaml` | 89 / 7 | 其中 65 个是 `.uaes/schemas/` 下的 Schema，属规范定义 |
| `.gitkeep` 等空占位 | 113 | 保住 governance 目录层级，必须纳入版本控制 |
| **可执行 / 样式代码** | **12** | 见下表 |

**12 个代码文件（都在子目录里，顶层看不到「src」这类目录）：**

| 路径 | 数量 | 作用 |
| --- | --- | --- |
| `quality/scripts/design-system/*.mjs` | 6 | token 生成器、对比度校验、组件契约校验、设计令牌扫描、导入总校验、路径解析 |
| `design-system/tests/*.ts`、`design-system/reference/web/tests/*.ts` | 3 | Vitest 测试（token 源、导航选中态、状态徽标对比度） |
| `design-system/**/*.css` | 3 | `theme.css`、`index.css`、生成产物 `tokens/generated/brand.css` |

配套的可执行数据资产：`design-system/tokens/source/*.json`（token 源与投影）、`design-system/components/registry/component-registry.json`、`design-system/reference/web/package.json` 与 `ci.yml`。

从分支 `uaes/p4-design-token-engine` 导入的是**设计系统资产与校验脚本**，不是产品源码；完整前端组件与后端实现始终在 `/Users/lincolnhu/uter`。

## 二、启动本地控制台

控制台进程刻意放在仓库之外（零侵入，不改动规范库任何目录层级）：

```bash
node /Users/lincolnhu/uaes-console.mjs 4173
# 打开 http://127.0.0.1:4173
```

提供：左侧目录树、Markdown 渲染、全文检索、注册表概览、一键运行门禁校验。
除显式点击「运行门禁校验」会执行仓库自带脚本外，其余全部只读。

## 三、执行校验

```bash
node quality/scripts/design-system/verify-import.mjs
```

10 项检查，机器可读报告写入 `reports/quality/UAES-P05-IMPORT-VERIFICATION.json`（遵循 `.uaes/schemas/quality-report.schema.json`），组件契约差距记录在 `design-system/components/contracts/UAES-COMPONENT-CONTRACT-GAP.md`。

单项目录见 `quality/scripts/design-system/README.md`，设计资产布局见 `design-system/README.md`。

## 四、目录契约（来自注册表 `governance`）

| 目录 | 用途 |
| --- | --- |
| `standards/` | 13 个标准域（00–12）的标准文档 |
| `.uaes/schemas/` | JSON Schema 定义 |
| `quality/gates/` | 质量门禁 |
| `quality/acceptance/` | 阶段验收基线 |
| `quality/scripts/` | 可执行校验脚本（含 `architecture/`、`design-system/`） |
| `reports/` | `baseline/`、`compliance/`、`quality/`、`release/`、`security/` 五类报告 |
| `agents/`、`skills/`、`workflows/` | 角色、技能与工作流注册表 |
| `design-system/` | 依 `UAES-05` §6 导入的 token / 组件契约实现资产 |

## 五、当前状态

- 注册表 `v1.7.0 / DRAFT`；`verify-import` 10 项检查 **0 FAIL**。
- **P05 验收仍 BLOCKED**：组件契约缺 9 个必填字段（65 个组件）、品牌主色变更无正式审批、视觉回归 / axe / 键盘焦点检查未关闭、产品仓 CI 未执行。
- 本仓库未配置远端，未推送任何内容。
