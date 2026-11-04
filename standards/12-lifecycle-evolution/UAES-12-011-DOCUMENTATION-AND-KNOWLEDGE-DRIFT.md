# UAES-12-011 — Documentation and Knowledge Drift

| Metadata | Value |
|---|---|
| Standard ID | UAES-12-011 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P1 |
| Owner | Lifecycle & Evolution Owner |
| Dependencies | UAES-12, UAES-03, UAES-04, UAES-05, UAES-06 |

## 1. Purpose

检测文档、知识和实际实现之间的偏差。

## 2. Scope

代码文档、API 文档、架构文档、自动生成内容以及 AI 生成知识的新鲜度与一致性。

## 3. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-12-011-M001 | 关键文档 MUST 有 Owner。 |
| UAES-12-011-M002 | 关键知识 MUST 有来源和验证时间。 |
| UAES-12-011-M003 | API 文档 MUST 能关联实际契约。 |
| UAES-12-011-M004 | 架构文档 MUST 能关联 ADR 和模块清单。 |
| UAES-12-011-M005 | 过期知识 MUST 标记 STALE 或 REVIEW_REQUIRED。 |
| UAES-12-011-M006 | 代码结构重大变化 MUST 触发文档影响检查。 |
| UAES-12-011-M007 | 文档自动生成内容 MUST 记录生成来源。 |
| UAES-12-011-M008 | 不得将未经验证的 AI 总结自动标记为 VERIFIED。 |

## 4. Implementation Rules

文档必须能关联对应代码、API、Schema、ADR、设计资产或运行配置。

发现内容过期时，应标记 STALE 或 REVIEW_REQUIRED，不得默认为当前有效事实。

## 5. Verification

- Link Validation
- Schema Drift
- Documentation Coverage
- Knowledge Freshness Audit

## 6. Exceptions

遵循 UAES-00 Exception Management。例外必须有范围、风险、补偿控制、Owner、审批和到期时间。

## 7. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial standard |
