# UAES-08-005 — Task Planning and Decomposition

| Metadata | Value |
|---|---|
| Standard ID | UAES-08-005 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

规范 Agent 对工程任务的理解、规划、分解、依赖分析和完成条件定义。

## 2. Scope

所有需要多步骤执行、跨模块修改或多 Agent 协作的任务。

## 3. Definitions

- Task：需要执行和验收的工作单元。
- Subtask：从父任务分解出的子任务。
- Plan：任务执行计划。
- Dependency：任务之间的前置关系。
- Definition of Done：明确的完成条件。

## 4. Core Principles

先理解后执行、任务可分解、依赖明确、完成条件可验证、授权贯穿全过程。

## 5. Mandatory Requirements

- UAES-08-005-001 MUST 为任务分配唯一 Task ID。
- UAES-08-005-002 MUST 记录任务来源和目标。
- UAES-08-005-003 MUST 识别任务范围和排除范围。
- UAES-08-005-004 MUST 识别业务、架构和安全风险。
- UAES-08-005-005 MUST 定义可验证的完成条件。
- UAES-08-005-006 MUST 为复杂任务建立子任务和依赖关系。
- UAES-08-005-007 MUST 识别关键路径和阻塞项。
- UAES-08-005-008 MUST 将任务分配与权限检查分离。
- UAES-08-005-009 MUST 为高影响变更建立验证计划。
- UAES-08-005-010 MUST 在需求不明确且影响正确性时请求澄清。
- UAES-08-005-011 MUST 在执行中记录计划偏差。
- UAES-08-005-012 MUST 在任务范围变化时重新评估影响。

## 6. Implementation Rules

复杂任务的标准执行流程：

```
INTAKE
  → CONTEXT_LOADING
  → REQUIREMENT_ANALYSIS
  → RISK_ASSESSMENT
  → AUTHORIZATION_CHECK
  → TASK_DECOMPOSITION
  → DEPENDENCY_ANALYSIS
  → EXECUTION_PLANNING
  → EXECUTION
  → VERIFICATION
  → COMPLETION_REPORT
```

任务计划至少包含：

- 目标。
- 范围。
- 排除范围。
- 子任务。
- 依赖。
- Agent 分配。
- 所需 Skills 和 Tools。
- 授权引用。
- 风险。
- 工作区。
- 验证策略。
- 完成条件。

任务可以动态调整，但任何超出原授权的操作必须重新执行授权检查。

## 7. Prohibited Practices

- MUST NOT 在未理解任务范围前执行高影响修改。
- MUST NOT 将子任务分配视为权限授予。
- MUST NOT 隐藏关键依赖和阻塞条件。
- MUST NOT 通过删除验收条件缩短执行时间。
- MUST NOT 将计划完成率当作实际质量证明。

## 8. AI Execution Rules

AI 必须根据任务复杂度选择适当规划粒度；简单任务不需要人为制造冗长计划，复杂任务必须先建立可追踪执行计划。

## 9. Verification

任务完整性、依赖关系、授权覆盖、完成条件和计划偏差检查。

## 10. Acceptance Criteria

任务可追踪、可分解、可调度、可验证。

## 11. Exceptions

低风险、单步骤任务可采用简化计划，但仍须遵守授权和验证要求。

## 12. References

UAES-01、UAES-02、UAES-03、UAES-09。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
