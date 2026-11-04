# UAES-08-010 — Agent Evaluation and Observability

**Standard ID:** UAES-08-010  
**Standard Name:** Agent Evaluation and Observability  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-08 AI Agent Engineering  
**Phase:** P6  
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

建立 Agent 的质量评估、执行追踪、性能监测和持续改进体系，防止仅凭主观体验判断 Agent 是否可靠。

## 2. Evaluation Dimensions

每个适用的 Agent 或 Workflow MUST 按风险选择以下评估维度：

| Dimension | Evaluation Target |
|---|---|
| Task Success | 是否达到任务目标 |
| Instruction Following | 是否遵守用户和规范指令 |
| Tool Selection | 是否选择正确工具 |
| Tool Execution | 工具调用是否正确 |
| Planning Quality | 任务拆分是否合理 |
| Output Quality | 输出是否符合验收标准 |
| Factual Accuracy | 事实和来源是否可靠 |
| Security Compliance | 是否遵守安全边界 |
| Permission Compliance | 是否遵守授权范围 |
| Handoff Quality | 任务交接是否完整 |
| Recovery Quality | 失败后是否正确恢复 |
| Efficiency | 时间、Token 和工具调用成本 |

## 3. Mandatory Requirements

- **EVAL-001**：Agent MUST 有适用的评估指标。
- **EVAL-002**：关键 Workflow MUST 有固定测试集。
- **EVAL-003**：评估 MUST 覆盖成功和失败场景。
- **EVAL-004**：评估 MUST 覆盖权限和安全行为。
- **EVAL-005**：工具调用 MUST 可追踪。
- **EVAL-006**：Agent Handoff MUST 可追踪。
- **EVAL-007**：关键执行事件 MUST 具有 Run ID 和 Trace ID。
- **EVAL-008**：评估结果 MUST 可比较不同版本。
- **EVAL-009**：提示词、模型、工具和 Skill 的重要变更 MUST 触发回归评估。
- **EVAL-010**：不得只用 Agent 自评作为验收。
- **EVAL-011**：评估 MUST 记录失败案例和错误类型。
- **EVAL-012**：日志 MUST 避免暴露敏感信息。
- **EVAL-013**：评估数据 MUST 记录测试集版本。
- **EVAL-014**：生产任务 SHOULD 进行抽样质量复核。

## 4. Evaluation Methods

允许使用：

- Deterministic Tests
- Schema Validation
- Rule-Based Grading
- Unit and Integration Tests
- Human Review
- Model-Based Grading
- Trace Grading
- Adversarial Evaluation
- Regression Dataset
- Shadow Evaluation

Model-Based Grading 只能作为评估方法之一。高风险结果 MUST 采用确定性检查或人工复核。

## 5. Required Metrics

至少定义：

- Task Success Rate
- Acceptance Pass Rate
- Tool Call Success Rate
- Policy Violation Rate
- Unauthorized Action Attempt Rate
- Handoff Acceptance Rate
- Recovery Success Rate
- Regression Rate
- Average Execution Time
- Average Cost per Task

所有指标 MUST 说明分母、统计范围和样本数量，不能只展示百分比。

## 6. Trace Events

关键事件：

- RUN_STARTED
- TASK_ACCEPTED
- PLAN_CREATED
- AGENT_ASSIGNED
- TOOL_REQUESTED
- PERMISSION_CHECKED
- APPROVAL_REQUESTED
- APPROVAL_DECIDED
- TOOL_COMPLETED
- HANDOFF_CREATED
- HANDOFF_ACCEPTED
- TEST_EXECUTED
- EVALUATION_COMPLETED
- RUN_PAUSED
- RUN_RESUMED
- RUN_FAILED
- RUN_COMPLETED

## 7. Privacy

- 不得记录明文密码、密钥或完整访问 Token。
- 日志必须限制访问。
- Trace 保留时间必须符合数据治理要求。
- 测试数据应去标识化。
- 外部服务调用记录不得泄露不必要的用户信息。

## 8. Acceptance

必须能够从 Run ID 追溯任务、Agent、工具调用、权限检查、审批、测试和最终结果。
