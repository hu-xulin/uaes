# UAES-08-001 — Agent Identity and Lifecycle

| Metadata | Value |
|---|---|
| Standard ID | UAES-08-001 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

建立 Agent 的身份、职责、生命周期和责任归属机制。

## 2. Scope

所有内部 Agent、第三方 Agent、临时 Agent 和委派 Agent。

## 3. Definitions

- Agent ID：唯一身份标识。
- Agent Role：职责角色。
- Agent Instance：一次具体运行实例。
- Parent Agent：创建或委派任务的上级 Agent。
- Agent Lifecycle：Agent 注册、启用、暂停、退役和注销过程。

## 4. Core Principles

身份唯一、角色明确、权限独立治理、生命周期可追踪。

## 5. Mandatory Requirements

- UAES-08-001-001 MUST 为每个 Agent 分配稳定且唯一的 Agent ID。
- UAES-08-001-002 MUST 区分 Agent Definition 和 Agent Instance。
- UAES-08-001-003 MUST 定义 Agent Role、职责和允许任务类型。
- UAES-08-001-004 MUST 记录 Agent 的创建者或责任 Owner。
- UAES-08-001-005 MUST 记录 Agent 所使用的模型或执行提供方。
- UAES-08-001-006 MUST 为临时 Agent 定义有效期和结束条件。
- UAES-08-001-007 MUST 定义 Agent 的生命周期状态。
- UAES-08-001-008 MUST 在 Agent 暂停或退役时撤销其有效执行会话。
- UAES-08-001-009 MUST 保留关键 Agent 生命周期审计记录。
- UAES-08-001-010 MUST 区分 Agent 能力声明与实际授权。

## 6. Implementation Rules

建议生命周期：

```
DRAFT → REGISTERED → ACTIVE → SUSPENDED → ACTIVE
ACTIVE → DEPRECATED → RETIRED
```

异常或撤销路径：

```
ACTIVE → REVOKED → TERMINATED
```

Agent Role 示例：

- ORCHESTRATOR
- PLANNER
- CODER
- REVIEWER
- TESTER
- SECURITY_ANALYST
- RESEARCHER
- DOCUMENTATION
- RELEASE_ASSISTANT

Role 只是职责分类，不自动赋予权限。

## 7. Prohibited Practices

- MUST NOT 通过更换模型绕过 Agent 身份和权限控制。
- MUST NOT 允许无身份 Agent 执行受控工具操作。
- MUST NOT 将子 Agent 的运行身份与父 Agent 混为一谈。
- MUST NOT 在 Agent 被撤销后继续接受其新任务。

## 8. AI Execution Rules

AI 必须在任务开始时报告 Agent ID、Role、Instance ID 和有效授权引用；不能确定时标记 UNKNOWN。

## 9. Verification

身份唯一性、生命周期转换、撤销传播和身份审计测试。

## 10. Acceptance Criteria

所有运行 Agent 可识别、可追踪、可暂停、可撤销。

## 11. Exceptions

临时实验 Agent 可使用短生命周期身份，但不得绕过权限治理。

## 12. References

UAES-01、UAES-08-002。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
