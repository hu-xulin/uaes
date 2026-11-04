# UAES-08-002 — Agent Manifest and Registry

| Metadata | Value |
|---|---|
| Standard ID | UAES-08-002 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

通过机器可读 Manifest 和 Registry 管理 Agent 定义、能力、依赖和生命周期。

## 2. Scope

所有可注册、可复用和可调度的 Agent。

## 3. Definitions

- Manifest：Agent 的结构化声明。
- Registry：Agent 定义的登记索引。
- Capability Declaration：能力声明。
- Runtime Profile：运行环境配置。

## 4. Core Principles

配置显式、版本固定、来源可信、权限独立。

## 5. Mandatory Requirements

- UAES-08-002-001 MUST 为每个 Agent 提供 Manifest。
- UAES-08-002-002 MUST 声明 Agent ID、名称、版本和 Role。
- UAES-08-002-003 MUST 声明输入输出契约。
- UAES-08-002-004 MUST 声明允许使用的 Skills 和 Tools。
- UAES-08-002-005 MUST 声明模型和运行环境约束。
- UAES-08-002-006 MUST 声明上下文和资源预算。
- UAES-08-002-007 MUST 声明生命周期状态。
- UAES-08-002-008 MUST 声明 Manifest Owner 和变更记录。
- UAES-08-002-009 MUST 验证 Manifest 引用的 Skill 和 Tool 是否存在。
- UAES-08-002-010 MUST 防止 Manifest 自行声明未授权权限。

## 6. Implementation Rules

建议 Manifest 字段：

- agentId
- name
- version
- role
- description
- owner
- status
- runtime
- modelProfile
- inputContract
- outputContract
- skillRefs
- toolRefs
- contextBudget
- executionLimits
- evaluationProfile
- dependencies

权限必须引用 P01 授权系统，不得在 Manifest 中以自由文本创建权限。

Agent Registry 必须支持：

- 唯一性检查。
- 版本检查。
- 依赖存在性检查。
- 废弃和撤销状态检查。
- 变更审计。

## 7. Prohibited Practices

- MUST NOT 通过 Manifest 直接授予生产权限。
- MUST NOT 使用未固定版本的外部 Skill 作为关键依赖。
- MUST NOT 接受缺少 Owner 的正式 Agent。
- MUST NOT 将 Manifest 声明视为实际运行成功证据。

## 8. AI Execution Rules

AI 注册或修改 Agent 时必须校验 Manifest，并检查权限引用和依赖完整性。

## 9. Verification

Schema Validation、Registry Consistency、Dependency Validation 和 Lifecycle Validation。

## 10. Acceptance Criteria

Manifest 可解析、依赖可解析、权限引用合法、版本可追踪。

## 11. Exceptions

临时 Agent 可使用运行时 Manifest，但必须满足相同安全边界。

## 12. References

UAES-01、UAES-03、UAES-08-001。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
