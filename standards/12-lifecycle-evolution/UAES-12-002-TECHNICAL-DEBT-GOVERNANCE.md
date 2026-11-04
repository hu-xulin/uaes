# UAES-12-002 — Technical Debt Governance

| Metadata | Value |
|---|---|
| Standard ID | UAES-12-002 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Lifecycle & Evolution Owner |
| Dependencies | UAES-12 |

## 1. Purpose

统一技术债务识别、评估、排序和关闭。

## 2. Scope

代码、架构、依赖、测试、安全、性能、运维和文档层面的技术债务登记、评估、排序、延期与关闭。

## 3. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-12-002-M001 | 已确认技术债务 MUST 登记。 |
| UAES-12-002-M002 | 技术债务 MUST 关联受影响资产。 |
| UAES-12-002-M003 | 技术债务 MUST 评估业务、质量、安全和维护影响。 |
| UAES-12-002-M004 | 技术债务 MUST 有 Owner。 |
| UAES-12-002-M005 | 高风险技术债务 MUST 有处理期限或经批准的延期理由。 |
| UAES-12-002-M006 | 技术债务延期 MUST 重新评估风险。 |
| UAES-12-002-M007 | 解决后的技术债务 MUST 有验证证据。 |
| UAES-12-002-M008 | 被拒绝或不再适用的债务 MUST 保留处置理由。 |

## 4. Implementation Rules

### 4.1 Priority Model

优先级应综合 Impact、Likelihood、Exposure、Remediation Cost、Urgency，不得只按代码行数或开发者主观偏好排序。

## 5. Verification

- Missing Owner
- Overdue Debt
- Risk Reassessment
- Closure Evidence

## 6. Exceptions

遵循 UAES-00 Exception Management。例外必须有范围、风险、补偿控制、Owner、审批和到期时间。

## 7. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial standard |
