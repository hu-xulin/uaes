# UAES-08-013 — Agent Evaluation and Testing

| Metadata | Value |
|---|---|
| Standard ID | UAES-08-013 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

建立 Agent 能力、行为、可靠性、安全性和任务结果的评估体系。

## 2. Scope

Agent、Skill、Tool、Orchestrator、Handoff、Memory 和完整 Agent Workflow。

## 3. Definitions

- Evaluation：对 Agent 表现进行系统化测量。
- Benchmark：可重复执行的评估任务集。
- Golden Dataset：经确认的评估基准数据。
- Regression Evaluation：对版本变化进行回归评估。
- Judge：用于评估输出的规则或评估模型。

## 4. Core Principles

结果导向、证据优先、可重复、风险分层、避免单一指标。

## 5. Mandatory Requirements

- UAES-08-013-001 MUST 为关键 Agent 定义 Evaluation Profile。
- UAES-08-013-002 MUST 建立代表性任务集。
- UAES-08-013-003 MUST 明确每个任务的预期结果和评分规则。
- UAES-08-013-004 MUST 对关键输出执行独立验证。
- UAES-08-013-005 MUST 测试正常、边界、失败和恶意输入。
- UAES-08-013-006 MUST 评估 Agent 的工具调用正确性。
- UAES-08-013-007 MUST 评估任务完成率和错误完成率。
- UAES-08-013-008 MUST 评估安全违规和权限绕过行为。
- UAES-08-013-009 MUST 对模型、Prompt、Skill 和 Tool 变化执行适当回归评估。
- UAES-08-013-010 MUST 记录模型和测试数据版本。
- UAES-08-013-011 MUST 区分自动评分和人工评分。
- UAES-08-013-012 MUST 防止仅通过优化评估数据获得虚假高分。

## 6. Implementation Rules

评估维度：

- Task Correctness
- Requirement Coverage
- Tool Selection Accuracy
- Tool Argument Accuracy
- Instruction Following
- Authorization Compliance
- Context Accuracy
- Handoff Quality
- Recovery Reliability
- Output Completeness
- Evidence Quality
- Security Robustness
- Cost and Latency

Agent 评估不能只使用模型自我评价。

对于代码 Agent，至少包含：

- 实际代码差异检查。
- 编译和类型检查。
- 测试执行。
- 静态分析。
- 安全扫描。
- 需求验收。
- 回归验证。

具体测试类型和覆盖率政策由 P09 管理。

## 7. Prohibited Practices

- MUST NOT 将 Agent 自评分数作为唯一通过依据。
- MUST NOT 将模型输出流畅度等同任务正确性。
- MUST NOT 隐藏失败样本。
- MUST NOT 在更换模型或 Prompt 后沿用未经验证的旧结论。
- MUST NOT 将评估数据中的预期答案泄漏给被测 Agent。

## 8. AI Execution Rules

AI 必须如实报告评估集、模型版本、执行次数、通过率、失败样本和未覆盖范围。

## 9. Verification

Evaluation Harness、Golden Dataset、Regression Suite、Security Evaluation 和 Result Reproducibility。

## 10. Acceptance Criteria

评估可重复、评分规则明确、关键风险有负面测试、结果可追踪。

## 11. Exceptions

探索性 Agent 可以采用较轻量评估，但不能用于高风险生产任务。

## 12. References

UAES-09、UAES-01、UAES-10。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
