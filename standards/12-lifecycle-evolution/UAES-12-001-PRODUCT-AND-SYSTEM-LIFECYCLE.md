# UAES-12-001 — Product and System Lifecycle

| Metadata | Value |
|---|---|
| Standard ID | UAES-12-001 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Lifecycle & Evolution Owner |
| Dependencies | UAES-12 |

## 1. Purpose

规范产品、服务、模块和系统的生命周期。

## 2. Scope

Uter 产品、服务、模块、库、API、数据库、平台、基础设施、Agent、Skill、标准和文档资产的生命周期定义、登记与状态管理。

## 3. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-12-001-M001 | 每个关键产品和系统 MUST 有唯一 Asset ID。 |
| UAES-12-001-M002 | 每个关键资产 MUST 有 Owner。 |
| UAES-12-001-M003 | 每个资产 MUST 有生命周期状态。 |
| UAES-12-001-M004 | 生命周期状态转换 MUST 有明确条件。 |
| UAES-12-001-M005 | 关键资产 MUST 记录依赖和消费者。 |
| UAES-12-001-M006 | ACTIVE 资产 MUST 有维护和复核计划。 |
| UAES-12-001-M007 | DEPRECATED 资产 MUST 有替代或退出策略。 |
| UAES-12-001-M008 | RETIRED 资产 MUST 完成访问、数据和资源处置检查。 |

## 4. Implementation Rules

资产至少分为 Product、Service、Module、Library、API、Database、Platform、Infrastructure、Agent、Skill、Standard、Document。

## 5. Verification

- Registry Completeness
- Owner Validation
- Lifecycle Transition Validation

## 6. Exceptions

遵循 UAES-00 Exception Management。例外必须有范围、风险、补偿控制、Owner、审批和到期时间。

## 7. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial standard |
