# UAES-12-014 — System Sunset and Decommission

| Metadata | Value |
|---|---|
| Standard ID | UAES-12-014 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Lifecycle & Evolution Owner |
| Dependencies | UAES-12, UAES-10, UAES-11 |

## 1. Purpose

安全终止系统、服务、模块和基础设施。

## 2. Scope

系统退役提案、消费者与依赖分析、数据保留与删除义务、凭证撤销、资源清理与审计。

## 3. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-12-014-M001 | 退役提案 MUST 有 Owner 和原因。 |
| UAES-12-014-M002 | 退役 MUST 分析消费者和依赖。 |
| UAES-12-014-M003 | 退役 MUST 评估数据保留和删除义务。 |
| UAES-12-014-M004 | 凭证和访问权限 MUST 有撤销计划。 |
| UAES-12-014-M005 | 网络、DNS、监控和基础设施 MUST 纳入检查。 |
| UAES-12-014-M006 | 关键退役 MUST 有审批。 |
| UAES-12-014-M007 | 退役执行 MUST 保留证据。 |
| UAES-12-014-M008 | 归档数据 MUST 有完整性和访问策略。 |
| UAES-12-014-M009 | 不得在未验证消费者迁移前直接移除关键服务。 |

## 4. Implementation Rules

退役前必须检查：Active Users、Traffic、Consumers、Dependencies、Data Retention、Legal / Compliance Obligations、Secrets / Credentials、DNS / Network、Monitoring / Alerting、Backups、Recovery、Cost、Final Owner Approval。

退役后必须验证资源清理、访问撤销、数据保留和审计证据。

## 5. Verification

- Dependency Scan
- Data Retention Check
- Credential Revocation
- Resource Cleanup
- Audit Review

## 6. Exceptions

遵循 UAES-00 Exception Management。例外必须有范围、风险、补偿控制、Owner、审批和到期时间。

## 7. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial standard |
