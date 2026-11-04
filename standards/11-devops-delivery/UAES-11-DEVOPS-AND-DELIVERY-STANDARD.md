# UAES-11 — DevOps & Delivery Engineering Standard

**Standard ID:** UAES-11
**Standard Name:** DevOps & Delivery Engineering Standard
**Version:** 1.0.0
**Status:** DRAFT
**Domain:** P11 — DevOps & Delivery
**Applies To:** Uter repositories, modules, build pipelines, release processes, deployment environments, AI-assisted delivery workflows
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

建立统一、可审计、可验证的工程交付体系，确保每次代码变更、构建、制品生成、发布及部署均具有明确来源、授权、验证结果和回滚路径。

P11 不负责重新定义代码质量、安全策略或 Agent 权限，而是把 P01、P08、P09、P10 的要求落实到 Git、CI/CD、构建、发布和部署流程中。

特别明确 Uter 的自动修复交付边界：

- 允许在独立修复分支中修改代码，完成验证后 Commit、Push、创建 PR。
- 不允许 AI 合并 PR、部署、修改生产环境或生产数据库、修改真实支付配置。
- 必须保护用户未提交的本地修改。
- PR 创建成功不代表 PR 已批准、已合并或已发布。
- CI 通过不代表获得生产部署授权。

## 2. Scope

覆盖 Git、分支、Worktree、Commit、Pull Request、CI/CD、构建、制品、环境、配置、密钥、版本、发布、部署、数据库迁移、基础设施、运行验证和交付审计。

不重复定义代码质量、安全策略和 Agent 授权规则，分别引用 P09、P10、P01、P08。

## 3. Normative Language

- **MUST**：强制要求。
- **MUST NOT**：禁止行为。
- **SHOULD**：原则上应执行，例外必须说明理由。
- **SHOULD NOT**：原则上不应执行，例外必须说明理由。
- **MAY**：允许选择。

## 4. Core Principles

### 4.1 Traceable Delivery

每个交付制品 MUST 能追溯至：

- Repository URI
- Source Commit SHA
- Branch / Tag
- Pull Request（适用时）
- Build Run ID
- Build Workflow Version
- Dependency Lockfiles
- Build Environment
- Quality Gate Result
- Security Gate Result
- Artifact Digest
- Provenance（适用时）

### 4.2 Immutable Artifact Promotion

同一个构建制品在不同环境之间晋级时 MUST 保持制品内容与 Digest 不变。

禁止在生产环境重新编译一个与预发布环境不同来源、无法关联的制品。

### 4.3 Least Privilege

CI Job、部署身份、AI Agent 和第三方 Action MUST 使用最小权限。

默认权限应为只读；只有确实需要写入的 Job 才可申请对应权限。

### 4.4 Separation of Duties

代码编写、代码审查、质量验证、发布审批、生产部署应具有明确的责任边界。

AI 创建 PR 不等于批准 PR；PR 批准不等于合并；合并不等于部署。

### 4.5 Evidence Before Status

没有可验证证据，不得将 Build、Test、Security、Review、Release 或 Deployment 标记为 PASS 或 SUCCESS。

## 5. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-11-M001 | 每个正式交付制品 MUST 记录源 Commit、构建运行、制品 Digest 和构建来源。 |
| UAES-11-M002 | 默认分支和发布分支 MUST 配置保护规则，禁止未审查的直接写入。 |
| UAES-11-M003 | AI 自动修复 MUST 使用隔离分支或独立 Worktree；不得覆盖用户未提交的本地变更。 |
| UAES-11-M004 | 所有受保护分支的代码变更 MUST 通过 PR 流程及规定的审查与质量门禁。 |
| UAES-11-M005 | CI MUST 执行 P09 要求的质量门禁，并执行 P10 要求的适用安全门禁。 |
| UAES-11-M006 | 正式制品 MUST 具备唯一 Digest；发布过程 MUST 验证制品来源和完整性。 |
| UAES-11-M007 | 构建 MUST 使用锁定依赖、固定工具链和受控构建参数；不得依赖未记录的浮动输入。 |
| UAES-11-M008 | 开发、测试、预发布和生产环境 MUST 隔离配置、凭证、数据和部署权限。 |
| UAES-11-M009 | 密钥 MUST 通过受控 Secret Store 或 CI Secret 注入；不得写入源码、镜像、日志、制品或普通配置文件。 |
| UAES-11-M010 | 正式发布 MUST 具有明确版本、发布记录、质量证据和发布授权。 |
| UAES-11-M011 | 生产部署 MUST 具有独立授权和人工审批。CI 自动通过、Agent 任务成功或 PR 创建成功均不能替代生产部署授权。 |
| UAES-11-M012 | 数据库迁移 MUST 具备版本记录、兼容性分析、备份策略、执行证据和恢复方案。 |
| UAES-11-M013 | 部署完成后 MUST 验证健康状态、关键业务路径、错误率和核心指标。 |
| UAES-11-M014 | 交付过程 MUST 保留必要的操作主体、授权、审批、构建、制品、部署及验证记录。 |
| UAES-11-M015 | AI MUST 遵循 P01 权限决策和本标准定义的交付边界。不得将工具可执行能力解释为用户授权。 |

## 6. Implementation Rules

### 6.1 Repository and Branch Strategy

推荐分支：

- `main`：受保护的稳定主分支。
- `feature/<task-id>-<slug>`：功能开发。
- `fix/<task-id>-<slug>`：缺陷修复。
- `hotfix/<task-id>-<slug>`：紧急修复。
- `release/<version>`：需要独立发布稳定过程时使用。

不得仅凭分支名称认定其可信。必须检查分支来源、Commit、PR 和保护规则。

### 6.2 Worktree and Workspace

AI 并行任务优先使用独立 Git Worktree。

执行前 MUST：

1. 检查当前分支和 HEAD。
2. 检查工作区是否存在未提交变更。
3. 记录初始状态。
4. 为任务建立独立工作区。
5. 明确允许修改的路径。
6. 防止多个 Agent 并发修改同一文件。

发现用户未提交修改时，MUST 保留原样；不得 reset、checkout 覆盖、clean 或强制 stash 用户数据。

### 6.3 Commit Convention

推荐 Conventional Commits：`feat:`、`fix:`、`refactor:`、`perf:`、`test:`、`docs:`、`build:`、`ci:`、`chore:`、`revert:`。

Commit MUST 尽量保持单一目的，避免将无关改动混在一个 Commit 中。

重要发布分支 SHOULD 使用可信的 Commit 或 Tag 签名策略。签名验证失败时不得将其视为可信签名。

### 6.4 Pull Request Lifecycle

标准流程：

1. 创建任务分支。
2. 实施变更。
3. 本地基础检查。
4. 创建 Commit。
5. Push 分支。
6. 创建 PR。
7. 执行 CI。
8. 代码审查。
9. 处理 Review Findings。
10. 回归测试。
11. 获取所需审批。
12. 合并。
13. 记录合并 Commit。

PR 至少包含：Task / Requirement ID、Change Summary、Scope、Changed Files、Design / Architecture Impact、Risk Assessment、Test Evidence、Quality Gate Result、Security Gate Result、Migration Impact、Rollback Plan、Known Limitations。

### 6.5 CI Pipeline Architecture

流水线建议分层：

- Stage 0 — Event Validation
- Stage 1 — Source Integrity
- Stage 2 — Dependency Installation
- Stage 3 — Static Checks
- Stage 4 — Unit / Component Tests
- Stage 5 — Integration / Contract Tests
- Stage 6 — Build
- Stage 7 — Security Scanning
- Stage 8 — Artifact Integrity and Provenance
- Stage 9 — Quality Gate Aggregation
- Stage 10 — PR Evidence Publication

Release 和 Deployment 必须使用独立工作流，并实施独立授权。

### 6.6 Uter Build Matrix

**Go Modules**：必须分别执行根模块（go.mod）、relaykit/go.mod、tokenkit/go.mod、tokenkit/tokenkit/go.mod。每个模块分别执行适用的 Dependency Resolution、Formatting、go vet、Unit Tests、Build、Coverage、Race Detection（适用时）、Vulnerability Scan。不得只在根目录执行 go test ./... 后声称四个模块均已验证。

**Web**：必须使用项目锁文件进行冻结安装；使用项目声明的 Bun 版本及脚本。执行适用的 TypeScript Typecheck、Lint、Unit / Component Tests、Production Build、Dependency Audit、E2E Tests。

**Electron**：分别验证 Main、Preload、Renderer、IPC、打包与安装制品。Electron 的凭证持久化、IPC 权限边界和制品签名要求引用 P10。

### 6.7 Build and Artifact

正式构建必须记录：Source Commit、Toolchain Versions、Dependency Lockfile Digests、Build Parameters、Build Environment、Artifact Name、Artifact Digest、Build Run ID、Provenance Reference。

制品生成后不得无记录替换或覆盖。

### 6.8 Environment and Configuration

环境至少区分：Local、Development、Test / CI、Staging、Production。

每个环境必须有独立的配置边界和凭证边界。环境配置必须具有 Schema、Owner、用途、敏感级别和变更记录。生产配置不得从开发配置自动复制或通过 AI 猜测生成。

### 6.9 Release and Versioning

版本采用 SemVer 2.0.0 作为默认版本约定：`MAJOR.MINOR.PATCH`。

- MAJOR：不兼容变更。
- MINOR：向后兼容的新功能。
- PATCH：向后兼容的缺陷修复。

是否适用 SemVer 应根据产品发布类型明确，不得将构建编号、Git SHA 与产品版本混为一谈。

### 6.10 Deployment Promotion

环境晋级：Development → Test → Staging → Production。

生产部署必须：验证制品 Digest、验证 Provenance、验证安全和质量门禁、验证审批身份、验证目标环境、验证回滚方案、记录部署结果。

禁止未经授权跳过环境晋级和审批。

### 6.11 Database Migration

迁移必须具备：Migration ID、Schema Version、Forward Migration、Compatibility Analysis、Data Impact、Locking / Downtime Analysis、Backup / Recovery Plan、Rollback or Forward-Fix Plan、Verification Queries、Execution Evidence。

对于不可逆迁移，不得虚构所谓自动回滚能力；必须设计前向修复、恢复或数据补偿策略。

### 6.12 Infrastructure as Code

基础设施配置 SHOULD 版本化、可审查、可重复执行。

生产基础设施变更必须有计划、审批、差异预览和执行记录。不得将基础设施变更隐藏在普通应用部署脚本中。

### 6.13 Observability Handoff

发布必须关联部署版本与运行实例，确保日志、指标、追踪和告警能够定位到对应版本。

发布后必须验证核心业务指标，而不仅仅检查进程是否存活。

### 6.14 AI-Assisted Delivery

AI 自动修复的默认允许流程：

```
Inspect → Isolate → Plan → Modify → Verify → Commit → Push → Create PR
```

前提：P01 授权允许；工作区隔离；用户未提交修改得到保护；P09 所需验证完成；P10 适用安全门禁通过；PR 附带完整证据。

AI 不得自动执行：Merge PR、Production Deployment、Production Database Mutation、Real Payment Configuration Changes、Production Secret Rotation、Destructive Infrastructure Changes。

这些行为必须依据 P01 单独审批，且本项目当前已明确不包含在自动修复授权中。

## 7. Prohibited Practices

1. 禁止绕过 PR 直接写入受保护分支。
2. 禁止使用未经审查的第三方 CI Action。
3. 禁止默认授予 CI 全部仓库权限。
4. 禁止将 Secret 写入仓库、日志和构建制品。
5. 禁止使用未经锁定的依赖构建正式制品。
6. 禁止在环境晋级时重新构建并替换制品。
7. 禁止没有 Digest 的正式制品发布。
8. 禁止没有审批的生产部署。
9. 禁止没有迁移恢复策略的高风险数据库变更。
10. 禁止以 PR 创建成功宣称交付完成。
11. 禁止以 CI 通过宣称生产部署成功。
12. 禁止 AI 覆盖用户未提交的本地修改。
13. 禁止虚报 Build、Test、Scan、Approval、Release 或 Deployment 结果。

## 8. AI Execution Rules

AI 执行交付任务必须：

1. 加载 P01 授权策略。
2. 加载 P03 Context Manifest。
3. 加载 P08 Agent Task 和 Workspace 约束。
4. 加载 P09 Quality Gate。
5. 加载 P10 Security Gate。
6. 检查 Git 状态及目标 Commit。
7. 明确允许的文件、分支、工具和操作。
8. 在隔离工作区执行。
9. 保留所有验证证据。
10. 仅执行被明确授权的交付动作。

AI 必须区分以下状态：NOT_STARTED、IN_PROGRESS、BLOCKED、FAILED、SUCCEEDED、NOT_VERIFIED。

任务 SUCCEEDED 不等于质量 PASS；PR OPEN 不等于 MERGED；Release CREATED 不等于 DEPLOYED。

## 9. Verification

验证由以下部分构成：

- Repository Policy Verification
- Branch Protection Verification
- CI Workflow Validation
- Build Matrix Verification
- Artifact Digest Verification
- Provenance Verification
- Secret Exposure Verification
- Release Manifest Validation
- Deployment Authorization Verification
- Migration Safety Verification
- Post-Deployment Health Verification
- Delivery Evidence Completeness

## 10. Acceptance Criteria

P11 只有在以下条件全部满足后才能正式批准：

1. 所有子标准均已写入仓库。
2. Registry 与 Schema 已合并并校验。
3. CI/CD 工作流已实施。
4. 四个 Go Modules 均有独立验证任务。
5. Web 和 Electron 有完整构建验证。
6. PR 质量和安全门禁已接入。
7. 制品 Digest 和 Provenance 可验证。
8. 环境与 Secret 隔离通过验证。
9. 发布及部署授权机制有效。
10. 数据库迁移与恢复流程通过演练。
11. AI 自动修复权限边界通过负面测试。
12. 交付证据可以追溯到源 Commit 和构建制品。

## 11. Exceptions

所有例外必须通过 P00 Exception Management 流程登记，包含：Exception ID、Applicable Rule IDs、Scope、Reason、Risk、Compensating Controls、Owner、Approver、Expiration、Review Date。

不得通过修改 CI 配置、跳过 Job 或删除测试来隐式建立例外。

## 12. References

- UAES-00 Foundation
- UAES-01 AI Governance
- UAES-08 Agent Engineering
- UAES-09 Quality Engineering
- UAES-10 Security & Reliability
- UAES-12 Lifecycle & Evolution
- GitHub Actions Secure Use
- SLSA Build Provenance
- Semantic Versioning 2.0.0

## 13. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial enterprise DevOps and Delivery standard |
