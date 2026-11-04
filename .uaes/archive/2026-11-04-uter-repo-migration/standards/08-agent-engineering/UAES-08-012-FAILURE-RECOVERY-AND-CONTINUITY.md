# UAES-08-012 — Failure Recovery and Continuity

**Standard ID:** UAES-08-012  
**Standard Name:** Failure Recovery and Continuity  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-08 AI Agent Engineering  
**Phase:** P6  
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

确保 Agent 在模型错误、工具异常、网络故障、上下文丢失、运行环境中断和多 Agent 失败时，能够安全恢复或明确终止。

## 2. Failure Categories

- MODEL_ERROR
- MODEL_TIMEOUT
- TOOL_ERROR
- TOOL_TIMEOUT
- NETWORK_FAILURE
- RATE_LIMITED
- PERMISSION_DENIED
- APPROVAL_REJECTED
- CONTEXT_OVERFLOW
- CONTEXT_LOSS
- WORKSPACE_FAILURE
- AGENT_CRASH
- HANDOFF_FAILURE
- RESOURCE_EXHAUSTED
- POLICY_VIOLATION
- EXTERNAL_SYSTEM_FAILURE
- DATA_INCONSISTENCY

## 3. Mandatory Requirements

- **REC-001**：失败 MUST 分类。
- **REC-002**：可恢复失败 MUST 有明确重试策略。
- **REC-003**：重试 MUST 有最大次数和退避机制。
- **REC-004**：不可重试失败 MUST 停止自动循环。
- **REC-005**：重复执行 MUST 有幂等保护。
- **REC-006**：任务恢复 MUST 验证原任务状态。
- **REC-007**：恢复 MUST 重新检查权限。
- **REC-008**：恢复 MUST 重新检查环境和工具版本。
- **REC-009**：恢复 MUST 保留原始失败证据。
- **REC-010**：外部副作用发生后不得假设回滚成功。
- **REC-011**：任务中断 MUST 能识别最后一个确认完成的步骤。
- **REC-012**：恢复后的输出 MUST 区分已完成、待确认和重新执行工作。
- **REC-013**：不可恢复任务 MUST 明确报告 FAILED 或 BLOCKED。
- **REC-014**：Agent MUST 支持用户主动取消。
- **REC-015**：取消后 MUST 阻止未开始的后续操作。

## 4. Retry Policy

默认建议：

- 仅对瞬时错误进行重试。
- 采用指数退避和随机抖动。
- 设置最大尝试次数。
- 对非幂等操作先查询原操作状态。
- 对支付、余额、订单等业务不得盲目重复提交。
- 对权限拒绝、审批拒绝和策略阻断不自动重试。
- 超出预算必须停止。

具体次数、超时和退避参数由 Workflow 根据风险配置，不应全局固定为适用于所有工具的数值。

## 5. Checkpoint

长任务 SHOULD 保存：

- Task State
- Completed Steps
- Pending Steps
- Agent Assignments
- Workspace Reference
- Commit SHA or Artifact Reference
- Tool Results
- Approval Records
- Test Results
- Known Risks
- Next Action

Checkpoint 不得包含明文密钥。

## 6. External Side Effects

对外部写操作，恢复前 MUST：

1. 查询目标系统当前状态。
2. 判断原操作是否已成功。
3. 检查是否重复执行会产生副作用。
4. 只有确认安全时才能继续。
5. 无法确认时暂停并请求人工处理。

## 7. Recovery Decision

允许的结果：

- RESUMED
- RETRIED
- RESTARTED
- PARTIALLY_RECOVERED
- BLOCKED
- FAILED
- CANCELLED

## 8. Acceptance

必须通过工具超时、模型中断、网络中断、重复提交、交接失败、权限变化、上下文压缩和外部操作状态未知等故障测试。
