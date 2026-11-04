# UAES-08-007 — Multi-Agent Orchestration

| Metadata | Value |
|---|---|
| Standard ID | UAES-08-007 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

建立多 Agent 协作、调度、依赖管理、并发控制和结果汇总机制。

## 2. Scope

多 Agent 并行、串行、分层、流水线和监督式协作。

## 3. Definitions

- Orchestrator：任务协调和控制主体。
- Worker Agent：执行具体子任务的 Agent。
- Agent Graph：Agent 和任务之间的依赖图。
- Parallel Execution：多个任务并发执行。
- Result Aggregation：子任务结果汇总。

## 4. Core Principles

职责分离、并行受控、冲突可处理、结果独立验证、责任链完整。

## 5. Mandatory Requirements

- UAES-08-007-001 MUST 为每次多 Agent 执行指定 Orchestrator。
- UAES-08-007-002 MUST 为各 Agent 明确任务和责任边界。
- UAES-08-007-003 MUST 建立任务依赖图。
- UAES-08-007-004 MUST 对并行任务执行资源冲突检查。
- UAES-08-007-005 MUST 对共享文件实施所有权或锁定机制。
- UAES-08-007-006 MUST 对互相依赖的任务明确执行顺序。
- UAES-08-007-007 MUST 定义子任务失败后的处理策略。
- UAES-08-007-008 MUST 验证汇总结果的一致性。
- UAES-08-007-009 MUST 防止多个 Agent 重复执行同一非幂等操作。
- UAES-08-007-010 MUST 限制 Agent 数量、并发度和资源消耗。
- UAES-08-007-011 MUST 保留完整任务责任链。
- UAES-08-007-012 MUST 在最终完成前验证所有强制子任务。

## 6. Implementation Rules

允许的协作模式：

- Sequential：顺序执行。
- Parallel：独立任务并行。
- Pipeline：阶段流水线。
- Supervisor-Worker：监督者与执行者。
- Specialist Review：专家审查。
- Debate-and-Resolve：提出不同方案后由授权责任人决策。

并行执行前必须识别：

- 文件写入冲突。
- 数据资源冲突。
- 共享工具冲突。
- 相互依赖。
- 外部副作用。
- 取消和恢复策略。

Orchestrator 负责汇总，但不能替代各专业 Agent 对其输出的责任。

## 7. Prohibited Practices

- MUST NOT 让多个 Agent 无协调地写入同一文件。
- MUST NOT 通过多数 Agent 投票覆盖用户指令或授权政策。
- MUST NOT 将多个 Agent 的相同未经验证结论当作独立证据。
- MUST NOT 在子任务失败时静默忽略关键结果。
- MUST NOT 无限创建子 Agent。

## 8. AI Execution Rules

AI 必须根据任务独立性决定是否并行；并行带来的冲突和协调成本超过收益时，应采用顺序执行。

## 9. Verification

任务图完整性、并发冲突、失败传播、重复操作和汇总一致性测试。

## 10. Acceptance Criteria

多 Agent 任务可调度、可协调、可恢复、可追踪。

## 11. Exceptions

小型任务可由单 Agent 完成，不强制使用多 Agent。

## 12. References

UAES-01、UAES-08-005、UAES-08-006、UAES-09。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
