# UAES-08-002 — Agent Lifecycle and State

**Standard ID:** UAES-08-002  
**Standard Name:** Agent Lifecycle and State  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-08 AI Agent Engineering  
**Phase:** P6  
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

统一 Agent 的初始化、运行、暂停、完成、失败和恢复状态。

## 2. Lifecycle States

允许的生命周期状态：

- REGISTERED
- INITIALIZING
- READY
- RUNNING
- WAITING_FOR_TOOL
- WAITING_FOR_APPROVAL
- PAUSED
- RETRYING
- RECOVERING
- COMPLETED
- PARTIALLY_COMPLETED
- FAILED
- CANCELLED
- TERMINATED

## 3. State Transition

| From | To | Condition |
|---|---|---|
| REGISTERED | INITIALIZING | Runtime 启动 |
| INITIALIZING | READY | 环境和权限检查完成 |
| READY | RUNNING | 接收有效任务 |
| RUNNING | WAITING_FOR_TOOL | 等待工具返回 |
| RUNNING | WAITING_FOR_APPROVAL | 需要人工审批 |
| RUNNING | PAUSED | 主动暂停 |
| WAITING_FOR_TOOL | RUNNING | 工具返回 |
| WAITING_FOR_APPROVAL | RUNNING | 获得批准 |
| WAITING_FOR_APPROVAL | CANCELLED | 审批拒绝 |
| RUNNING | RETRYING | 可重试错误 |
| RETRYING | RUNNING | 重试成功 |
| RETRYING | FAILED | 重试耗尽 |
| PAUSED | RECOVERING | 恢复执行 |
| RECOVERING | RUNNING | 恢复成功 |
| RUNNING | COMPLETED | 验收通过 |
| RUNNING | PARTIALLY_COMPLETED | 部分任务完成 |
| RUNNING | FAILED | 不可恢复失败 |
| Any non-terminal state | CANCELLED | 用户或治理策略取消 |
| Any state | TERMINATED | 强制终止 |

## 4. Mandatory Requirements

- **LIFE-001**：状态变更 MUST 记录时间和原因。
- **LIFE-002**：终态 MUST 不允许未经授权的重新打开。
- **LIFE-003**：任务暂停 MUST 保留可恢复状态。
- **LIFE-004**：工具超时 MUST 有明确处理策略。
- **LIFE-005**：等待人工审批时不得绕过审批继续执行。
- **LIFE-006**：终止操作 MUST 停止后续工具调用。
- **LIFE-007**：重试 MUST 有次数和时间限制。
- **LIFE-008**：恢复 MUST 检查上下文和权限是否仍然有效。
- **LIFE-009**：状态持久化 MUST 防止重复消费和重复执行。
- **LIFE-010**：执行环境变化时 MUST 重新验证工具和权限。

## 5. Terminal State Rules

COMPLETED、PARTIALLY_COMPLETED、FAILED、CANCELLED、TERMINATED 均为终态。

重新执行必须创建新 Run 或明确的 Resume 记录。

## 6. Acceptance

必须证明状态转换合法、非法转换被拒绝、暂停恢复正常、重试受限、终止有效且事件记录完整。
