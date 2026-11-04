# UAES-08-010 — Execution State and Recovery

| Metadata | Value |
|---|---|
| Standard ID | UAES-08-010 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

规范 Agent 任务状态、工具调用状态、超时、重试、取消和故障恢复。

## 2. Scope

Agent Task、Subtask、Tool Invocation、Handoff 和 Orchestration。

## 3. Definitions

- Execution State：任务当前执行状态。
- Retry：在满足条件时重新执行。
- Idempotency：重复执行不会造成额外副作用。
- Timeout：执行超过允许时间。
- Cancellation：请求停止执行。
- Recovery：从中断或失败状态恢复。

## 4. Core Principles

状态显式、转换受控、副作用可核实、重试有界、恢复安全。

## 5. Mandatory Requirements

- UAES-08-010-001 MUST 为任务定义状态机。
- UAES-08-010-002 MUST 定义合法状态转换。
- UAES-08-010-003 MUST 区分任务状态和质量验证状态。
- UAES-08-010-004 MUST 为执行设置超时。
- UAES-08-010-005 MUST 对重试设置次数和退避策略。
- UAES-08-010-006 MUST 在重试前检查上一次执行是否产生副作用。
- UAES-08-010-007 MUST 为非幂等操作设置重复执行保护。
- UAES-08-010-008 MUST 支持任务取消或明确说明不支持取消的操作。
- UAES-08-010-009 MUST 记录失败原因和恢复过程。
- UAES-08-010-010 MUST 防止多个执行实例同时完成同一任务。
- UAES-08-010-011 MUST 在恢复前重新检查授权有效性。
- UAES-08-010-012 MUST 在恢复时检查工作区和外部资源状态。

## 6. Implementation Rules

建议任务状态：

- CREATED
- QUEUED
- PLANNING
- AUTHORIZATION_PENDING
- READY
- RUNNING
- WAITING
- BLOCKED
- VERIFYING
- SUCCEEDED
- FAILED
- CANCEL_REQUESTED
- CANCELLED
- EXPIRED

状态说明：

- SUCCEEDED 表示 Agent 执行流程完成，不代表业务质量 Gate 已 PASS。
- VERIFYING 表示结果正在接受独立验证。
- FAILED 表示任务执行失败。
- BLOCKED 表示因依赖、权限或环境等原因不能继续。
- EXPIRED 表示超过有效期限。

重试策略必须区分：

- 只读调用。
- 可幂等写操作。
- 不可幂等写操作。
- 外部状态不确定的操作。

对支付、充值、退款、数据库迁移、发布等外部副作用操作，不得仅凭超时直接重试；必须先查询执行结果或使用可靠幂等机制。

## 7. Prohibited Practices

- MUST NOT 将超时直接等同未执行。
- MUST NOT 无限重试。
- MUST NOT 在授权失效后恢复任务。
- MUST NOT 将任务 SUCCEEDED 等同质量 PASS。
- MUST NOT 在未知副作用状态下重复执行不可幂等操作。

## 8. AI Execution Rules

AI 遇到中断时必须先恢复任务上下文、检查实际状态、核对外部副作用，再决定继续、重试或停止。

## 9. Verification

State Transition Tests、Retry Tests、Timeout Tests、Cancellation Tests、Duplicate Execution Tests 和 Recovery Tests。

## 10. Acceptance Criteria

任务状态完整、恢复安全、重复操作可控、结果可追踪。

## 11. Exceptions

无法中断的系统操作必须标记为 NON_CANCELLABLE，并说明安全终止条件。

## 12. References

UAES-01、UAES-04-011、UAES-09、UAES-10。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
