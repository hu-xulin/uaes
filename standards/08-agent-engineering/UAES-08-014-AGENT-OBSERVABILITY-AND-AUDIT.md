# UAES-08-014 — Agent Observability and Audit

| Metadata | Value |
|---|---|
| Standard ID | UAES-08-014 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

建立 Agent 执行的日志、追踪、指标、审计和问题调查机制。

## 2. Scope

Agent 生命周期、任务执行、工具调用、委派、上下文装载、评估和恢复。

## 3. Definitions

- Trace：一次任务或执行链的追踪。
- Span：追踪中的单个执行步骤。
- Audit Event：需要保留的审计事件。
- Execution Evidence：证明执行行为和结果的证据。
- Correlation ID：关联任务、Agent 和工具事件的标识。

## 4. Core Principles

可观测、可追踪、可关联、最小敏感数据、证据完整。

## 5. Mandatory Requirements

- UAES-08-014-001 MUST 为任务建立 Trace ID。
- UAES-08-014-002 MUST 记录 Task ID、Agent ID 和 Instance ID。
- UAES-08-014-003 MUST 关联 Parent Agent 和 Handoff ID。
- UAES-08-014-004 MUST 记录关键工具调用。
- UAES-08-014-005 MUST 记录任务状态转换。
- UAES-08-014-006 MUST 记录执行时间、超时和失败。
- UAES-08-014-007 MUST 记录关键授权引用和审批结果。
- UAES-08-014-008 MUST 关联上下文来源和验证证据。
- UAES-08-014-009 MUST 对日志执行敏感数据过滤。
- UAES-08-014-010 MUST 定义日志保留和访问策略。
- UAES-08-014-011 MUST 支持从任务报告追踪到底层证据。
- UAES-08-014-012 MUST 保证审计记录不能被普通 Agent 任意篡改。

## 6. Implementation Rules

建议审计字段：

- eventId
- traceId
- taskId
- agentId
- agentInstanceId
- parentAgentId
- toolId
- skillId
- authorizationRef
- eventType
- executionState
- timestamp
- result
- evidenceRefs
- environment
- redactionStatus

建议指标：

- task_success_rate
- task_failure_rate
- task_blocked_rate
- tool_call_error_rate
- retry_rate
- timeout_rate
- handoff_failure_rate
- evaluation_pass_rate
- policy_violation_count
- average_execution_duration
- token_or_resource_consumption

指标必须结合任务类型和风险解释，不能单独作为 Agent 绩效结论。

## 7. Prohibited Practices

- MUST NOT 将密钥、访问令牌和完整敏感数据写入普通日志。
- MUST NOT 删除失败调用以美化指标。
- MUST NOT 将工具调用成功视为业务成功。
- MUST NOT 允许被审计 Agent 无痕修改审计记录。
- MUST NOT 仅记录最终摘要而丢失关键执行证据。

## 8. AI Execution Rules

AI 必须在执行报告中引用可核实的任务、工具、验证和审计证据；无法提供时必须标记证据缺失。

## 9. Verification

Trace Correlation、Audit Integrity、Sensitive Data Redaction、Retention Policy 和 Evidence Retrieval Tests。

## 10. Acceptance Criteria

执行链可追踪、关键事件可审计、敏感数据受保护、证据可检索。

## 11. Exceptions

低风险临时任务可采用简化追踪，但不能省略必要的授权和副作用审计。

## 12. References

UAES-01、UAES-03、UAES-09、UAES-10、UAES-11。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
