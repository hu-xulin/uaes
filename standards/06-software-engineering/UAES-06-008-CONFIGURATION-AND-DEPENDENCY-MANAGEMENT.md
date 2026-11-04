# UAES-06-008 — Configuration and Dependency Management

| Metadata | Value |
|---|---|
| Standard ID | UAES-06-008 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Software Engineering Owner |
| Dependencies | UAES-06, UAES-10 |

## 1. Purpose

建立配置、环境变量、依赖和版本锁定的统一治理。

## 2. Scope

Go Modules、Bun、npm 兼容依赖、Electron、构建工具和运行时配置。

## 3. Definitions

- **Runtime Configuration**：运行时配置。
- **Build Configuration**：构建配置。
- **Dependency Lockfile**：依赖锁定文件。
- **Direct Dependency**：直接依赖。
- **Transitive Dependency**：传递依赖。

## 4. Core Principles

配置与代码分离、依赖可追踪、版本可重复、升级有依据。

## 5. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-06-008-001 | MUST 区分环境配置与业务代码。 |
| UAES-06-008-002 | MUST 对必要配置进行启动校验。 |
| UAES-06-008-003 | MUST 为必需配置提供明确缺失错误。 |
| UAES-06-008-004 | MUST 将依赖锁文件纳入版本控制。 |
| UAES-06-008-005 | MUST 在 CI 中执行锁文件一致性安装。 |
| UAES-06-008-006 | MUST 记录新增和升级依赖的理由。 |
| UAES-06-008-007 | MUST 检查依赖许可证和维护状态。 |
| UAES-06-008-008 | MUST 对依赖升级分析 API 和行为兼容性。 |
| UAES-06-008-009 | MUST 避免多个包管理器同时作为同一工作区的权威来源。 |
| UAES-06-008-010 | MUST 为关键工具链明确版本基线。 |
| UAES-06-008-011 | MUST 禁止将真实密钥提交到仓库。 |
| UAES-06-008-012 | MUST 明确配置默认值、敏感度和环境覆盖优先级。 |

## 6. Implementation Rules

Go：

- 使用 go.mod / go.sum。
- 明确 Go 工具链版本和模块依赖。
- 对多个 Go Module 进行完整依赖检查。

Web / Electron：

- 以项目选定的 Bun 作为包管理器基线。
- 提交 bun.lock。
- CI 使用冻结锁文件安装模式。
- 依赖升级必须同步更新锁文件并验证构建。

Bun 官方文档明确说明应提交 bun.lock，并可使用冻结锁文件模式保证安装与锁文件一致。
参考：<https://bun.com/docs/pm/lockfile> <https://bun.sh/docs/pm/cli/install>

配置：

- 使用 Schema 或等价方式定义配置结构。
- 启动阶段验证配置。
- 生产密钥通过受控密钥管理机制注入。
- 不得将开发默认值直接作为生产密钥配置。

## 7. Prohibited Practices

- MUST NOT 在 CI 中静默更新锁文件。
- MUST NOT 使用未经审查的浮动依赖版本作为生产基线。
- MUST NOT 在代码中硬编码环境密钥。
- MUST NOT 未经分析升级多个核心依赖并混合无关重构。

## 8. AI Execution Rules

AI 修改依赖前必须说明必要性、版本、影响、替代方案和验证方式；不得为方便实现随意引入依赖。

## 9. Verification

依赖一致性、锁文件检查、配置 Schema、漏洞扫描和许可证检查由 P09/P10 执行。

## 10. Acceptance Criteria

依赖可重复安装、配置可校验、升级可追踪、敏感配置未进入源码。

## 11. Exceptions

确有必要的临时依赖必须设置 Owner 和移除期限。

## 12. References

Go Modules Reference、Bun Documentation、UAES-10。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
