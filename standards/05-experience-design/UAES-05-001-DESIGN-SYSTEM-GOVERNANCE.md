# UAES-05-001 — Design System Governance

| Metadata | Value |
|---|---|
| Standard ID | UAES-05-001 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

定义设计系统的所有权、决策权限、版本、发布和变更治理。

## 2. Scope

覆盖设计规范、Token、组件、交互模式、设计资产、文档和视觉基准。

## 3. Definitions

- Design System Owner：对设计系统完整性负责的角色。
- Design Contributor：提出或实施设计变更的人员或 Agent。
- Design Reviewer：评估设计质量、可访问性和一致性的人员。
- Design Release：经过审批、验证并发布的设计系统版本。

## 4. Core Principles

单一 Owner、职责分离、变更可追踪、版本可回退、例外可审计。

## 5. Mandatory Requirements

- UAES-05-001-001 MUST 指定 Design System Owner。
- UAES-05-001-002 MUST 为正式规范、Token、组件契约和视觉基准分配唯一 ID。
- UAES-05-001-003 MUST 区分 DRAFT、PROPOSED、IN_REVIEW、APPROVED、ACTIVE、DEPRECATED、RETIRED。
- UAES-05-001-004 MUST 记录设计变更的原因、影响范围、兼容性和迁移方式。
- UAES-05-001-005 MUST 对破坏性变更执行影响评估。
- UAES-05-001-006 MUST 保留历史版本和变更记录。
- UAES-05-001-007 MUST 将跨平台差异记录为明确的平台变体，不得隐式分叉。
- UAES-05-001-008 MUST 将例外纳入 UAES-00 例外治理。
- UAES-05-001-009 MUST 对高影响品牌、无障碍和核心交互变更执行人工评审。

## 6. Implementation Rules

建议设计变更流程：

```
PROPOSAL
  → IMPACT_ANALYSIS
  → REVIEW
  → APPROVAL
  → IMPLEMENTATION
  → VALIDATION
  → RELEASE
  → MONITORING
```

变更分类：

- PATCH：不改变现有设计语义的修正。
- MINOR：向后兼容的新增 Token、组件或变体。
- MAJOR：删除、重命名、语义改变或迁移成本较高的变化。

版本号采用 MAJOR.MINOR.PATCH。版本变更必须与实际兼容性一致。

## 7. Prohibited Practices

- MUST NOT 由 AI 自行批准自身提出的高影响设计变更。
- MUST NOT 静默覆盖已发布 Token。
- MUST NOT 在页面中创建长期存在且未登记的设计分支。
- MUST NOT 将设计稿中的临时标注直接视为生产规则。

## 8. AI Execution Rules

AI 可提出设计变更、生成实现和测试，但不得虚构审批状态。涉及品牌、核心导航、无障碍策略或全局 Token 的变更，必须先取得授权。

## 9. Verification

检查 Owner、版本、变更记录、审批证据、例外记录和版本兼容性。

## 10. Acceptance Criteria

每个 ACTIVE 设计系统版本均可追踪到批准记录、Token 版本、组件注册表版本和视觉基准版本。

## 11. Exceptions

依 UAES-00-005。

## 12. References

UAES-00-003、UAES-00-005、UAES-01。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
