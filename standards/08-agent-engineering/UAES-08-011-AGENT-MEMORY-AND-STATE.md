# UAES-08-011 — Agent Memory and State

| Metadata | Value |
|---|---|
| Standard ID | UAES-08-011 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

建立 Agent 运行记忆、任务状态和长期知识之间的边界与治理规则。

## 2. Scope

短期执行上下文、会话状态、任务检查点、长期项目记忆和外部记忆服务。

## 3. Definitions

- Working Memory：当前任务执行期间的临时记忆。
- Session State：Agent 会话状态。
- Checkpoint：可恢复的执行检查点。
- Long-term Memory：跨任务保留的信息。
- Project Knowledge：由 P03 管理的项目知识。

## 4. Core Principles

记忆不是事实源、来源可追溯、敏感信息最小化、生命周期明确、用户指令优先。

## 5. Mandatory Requirements

- UAES-08-011-001 MUST 区分工作记忆、会话状态、检查点和长期记忆。
- UAES-08-011-002 MUST 为长期记忆记录来源。
- UAES-08-011-003 MUST 记录记忆创建和验证时间。
- UAES-08-011-004 MUST 为记忆定义有效期或复核条件。
- UAES-08-011-005 MUST 区分事实、用户偏好、推断和临时假设。
- UAES-08-011-006 MUST 允许记忆失效、修正和废弃。
- UAES-08-011-007 MUST 避免存储不必要的敏感信息。
- UAES-08-011-008 MUST 防止跨用户和跨项目记忆泄漏。
- UAES-08-011-009 MUST 在恢复任务时验证检查点与当前状态的一致性。
- UAES-08-011-010 MUST 以 P03 项目知识治理规则为长期项目知识的权威依据。

## 6. Implementation Rules

记忆类别：

- EPHEMERAL：短期临时信息。
- SESSION：会话内状态。
- CHECKPOINT：任务恢复信息。
- PROJECT_MEMORY：项目长期上下文。
- USER_PREFERENCE：经允许保留的用户偏好。

记忆状态：

- CANDIDATE
- ACTIVE
- STALE
- REVIEW_REQUIRED
- DEPRECATED
- ARCHIVED

记忆应包含：

- memoryId
- type
- content
- sourceRefs
- confidence
- sensitivity
- createdAt
- verifiedAt
- expiresAt 或 reviewTrigger
- owner
- status

长期项目知识必须进入 P03 的知识管理流程，不能仅存在 Agent 私有记忆中。

## 7. Prohibited Practices

- MUST NOT 将 Agent 自己的推断保存为已确认事实。
- MUST NOT 让长期记忆覆盖当前明确用户指令。
- MUST NOT 把任务检查点当作当前真实执行状态。
- MUST NOT 无限制保存敏感内容。
- MUST NOT 让一个项目的记忆被其他项目默认读取。

## 8. AI Execution Rules

AI 必须标明记忆来源和可信度；发现记忆与当前证据冲突时，应优先核对事实并按 P03 冲突处理流程更新。

## 9. Verification

Memory Provenance、Cross-Project Isolation、Expiry、Checkpoint Consistency 和 Sensitivity Tests。

## 10. Acceptance Criteria

记忆可追溯、可更新、可隔离、可失效。

## 11. Exceptions

临时工作记忆可以不进入长期知识库，但不得作为长期项目事实引用。

## 12. References

UAES-03、UAES-01、UAES-10。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
