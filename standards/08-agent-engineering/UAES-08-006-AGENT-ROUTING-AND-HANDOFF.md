# UAES-08-006 — Agent Routing and Handoff

| Metadata | Value |
|---|---|
| Standard ID | UAES-08-006 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

规范 Agent 选择、任务分配、协作交接和执行结果回传。

## 2. Scope

Agent Router、Orchestrator、Agent-to-Agent Handoff 和外部 Agent 调用。

## 3. Definitions

- Routing：将任务分配给适合的 Agent。
- Handoff：将任务控制权或子任务交给其他 Agent。
- Handoff Contract：交接数据和执行要求。
- Capability Matching：根据能力选择 Agent。

## 4. Core Principles

能力匹配、权限继承、上下文最小化、责任明确、交接可验证。

## 5. Mandatory Requirements

- UAES-08-006-001 MUST 根据任务需求选择 Agent。
- UAES-08-006-002 MUST 检查目标 Agent 的状态和能力。
- UAES-08-006-003 MUST 检查目标 Agent 的有效授权。
- UAES-08-006-004 MUST 为 Handoff 定义结构化契约。
- UAES-08-006-005 MUST 传递必要上下文和来源。
- UAES-08-006-006 MUST 传递任务范围、排除范围和完成条件。
- UAES-08-006-007 MUST 记录委派者、执行者和交接时间。
- UAES-08-006-008 MUST 明确交接后任务控制权归属。
- UAES-08-006-009 MUST 验证交接结果的完整性。
- UAES-08-006-010 MUST 处理 Agent 不可用和交接失败。
- UAES-08-006-011 MUST 防止循环委派和无限路由。
- UAES-08-006-012 MUST 保留最终任务责任链。

## 6. Implementation Rules

Handoff 至少包含：

- handoffId
- taskId
- parentAgentId
- targetAgentId
- objective
- scope
- exclusions
- constraints
- authorizationRefs
- contextRefs
- requiredOutputs
- acceptanceCriteria
- deadline
- workspaceRef
- returnProtocol

Agent 选择应考虑能力、可用性、成本、延迟、上下文兼容性和授权。

## 7. Prohibited Practices

- MUST NOT 仅根据 Agent 名称分配任务。
- MUST NOT 传递超过任务需要的敏感上下文。
- MUST NOT 通过 Handoff 扩大权限。
- MUST NOT 允许子 Agent 改写父任务的授权条件。
- MUST NOT 在没有交接结果时自动报告子任务完成。

## 8. AI Execution Rules

AI 委派任务前必须确认目标 Agent 能力、权限和上下文；接收结果后必须检查证据，而不是直接信任完成声明。

## 9. Verification

Agent Matching、Handoff Contract、Authorization Propagation、Loop Prevention 和 Result Validation。

## 10. Acceptance Criteria

任务交接可追踪、授权不扩大、上下文完整且最小化。

## 11. Exceptions

紧急任务可以使用预先批准的备用 Agent，但仍须保留交接记录。

## 12. References

UAES-01、UAES-03、UAES-08-001、UAES-08-007。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
