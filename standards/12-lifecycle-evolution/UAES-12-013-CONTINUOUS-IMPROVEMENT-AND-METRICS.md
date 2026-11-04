# UAES-12-013 — Continuous Improvement and Metrics

| Metadata | Value |
|---|---|
| Standard ID | UAES-12-013 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P1 |
| Owner | Lifecycle & Evolution Owner |
| Dependencies | UAES-12, UAES-09 |

## 1. Purpose

将工程运行结果转化为可量化改进。

## 2. Scope

改进任务的基线、目标、度量方法、Owner、结果验证与统计口径管理。

## 3. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-12-013-M001 | 重要改进 MUST 有基线。 |
| UAES-12-013-M002 | 目标 MUST 有可测量指标。 |
| UAES-12-013-M003 | 指标 MUST 定义统计范围和时间窗口。 |
| UAES-12-013-M004 | 改进 MUST 有 Owner。 |
| UAES-12-013-M005 | 改进完成 MUST 验证实际结果。 |
| UAES-12-013-M006 | 未达到目标 MUST 如实记录。 |
| UAES-12-013-M007 | 不得通过改变统计口径掩盖退化。 |
| UAES-12-013-M008 | 指标 SHOULD 用于发现问题，而非鼓励不安全的行为优化。 |

## 4. Implementation Rules

改进任务必须定义：Baseline、Target、Measurement Method、Owner、Time Window、Evidence、Result、Follow-up Decision。

未达到目标时必须记录结果，不得修改原始基线来制造成功。

度量原则：P12 不应只考核代码提交量、Issue 关闭量或 AI 生成代码量。建议采用 DORA 软件交付指标（变更前置时间、部署频率、失败部署恢复时间、变更失败率和部署返工率）作为交付表现参考，同时结合系统可靠性、技术债务、用户影响和团队可持续性评估。

## 5. Verification

- Baseline Comparison
- Metric Integrity
- Outcome Verification
- Improvement Review

## 6. Exceptions

遵循 UAES-00 Exception Management。例外必须有范围、风险、补偿控制、Owner、审批和到期时间。

## 7. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial standard |
