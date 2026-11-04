# UAES-08-008 — Agent Handoff and Collaboration

**Standard ID:** UAES-08-008  
**Standard Name:** Agent Handoff and Collaboration  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-08 AI Agent Engineering  
**Phase:** P6  
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

建立结构化 Agent 任务交接协议，避免上下文丢失、工作重复、权限扩大和交接状态不一致。

## 2. Handoff Requirements

- **HANDOFF-001**：交接 MUST 使用结构化数据。
- **HANDOFF-002**：交接 MUST 包含源 Agent 和目标 Agent。
- **HANDOFF-003**：交接 MUST 包含 Task ID 和 Run ID。
- **HANDOFF-004**：交接 MUST 明确目标和范围。
- **HANDOFF-005**：交接 MUST 记录已完成工作。
- **HANDOFF-006**：交接 MUST 记录未完成工作。
- **HANDOFF-007**：交接 MUST 提供相关产物和证据引用。
- **HANDOFF-008**：交接 MUST 提供已知风险和阻塞事项。
- **HANDOFF-009**：交接 MUST 明确剩余权限，不得隐式升级。
- **HANDOFF-010**：接收方 MUST 确认交接内容和执行条件。
- **HANDOFF-011**：交接 MUST 可追踪和审计。
- **HANDOFF-012**：失败交接 MUST 有恢复或重新分配策略。

## 3. Handoff Status

- CREATED
- PENDING
- ACCEPTED
- REJECTED
- IN_PROGRESS
- COMPLETED
- FAILED
- CANCELLED
- EXPIRED

## 4. Handoff Content

必须包含：

1. Handoff ID
2. Task ID
3. Run ID
4. From Agent
5. To Agent
6. Objective
7. Scope
8. Constraints
9. Authorization Reference
10. Completed Work
11. Remaining Work
12. Changed Files
13. Evidence References
14. Test Results
15. Risks
16. Blockers
17. Expected Output
18. Expiration
19. Acceptance Criteria

## 5. Collaboration Rules

- 接收 Agent 不得把交接内容中的未经验证结论视为事实。
- 接收 Agent MUST 检查交接产物是否仍然有效。
- 任务范围变化 MUST 重新检查授权。
- 交接中的外部数据仍然是不可信输入。
- 不得将原 Agent 的凭据或身份令牌直接传递给接收 Agent。
- 交接完成后，源 Agent 应停止对同一资源的并发写入，除非编排器明确安排。

## 6. Acceptance

必须验证交接 Schema、状态流转、权限继承、产物完整性和失败恢复。
