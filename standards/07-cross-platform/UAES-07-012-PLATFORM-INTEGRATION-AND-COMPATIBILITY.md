# UAES-07-012 — Platform Integration and Compatibility

| Metadata | Value |
|---|---|
| Standard ID | UAES-07-012 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

规范平台接入、共享模块兼容性、平台差异管理和集成验收。

## 2. Scope

新增平台、平台 SDK、第三方 SDK、系统 API、共享模块和平台专属组件。

## 3. Definitions

- Platform Integration：平台接入。
- Compatibility Contract：兼容性契约。
- Integration Evidence：集成证据。
- Platform Drift：平台实现与共享契约之间的偏差。

## 4. Core Principles

先定义契约、后接入实现；平台差异显式化；兼容性有证据。

## 5. Mandatory Requirements

- UAES-07-012-001 MUST 为新增平台提交接入方案。
- UAES-07-012-002 MUST 评估现有 Shared Core 的兼容性。
- UAES-07-012-003 MUST 评估平台 SDK 和第三方依赖。
- UAES-07-012-004 MUST 明确平台专属功能差异。
- UAES-07-012-005 MUST 为关键共享模块建立契约测试。
- UAES-07-012-006 MUST 记录平台集成失败和降级行为。
- UAES-07-012-007 MUST 评估新增平台对现有平台的回归影响。
- UAES-07-012-008 MUST 为平台接入保留独立验收证据。

## 6. Implementation Rules

平台接入流程：

```
PLATFORM PROPOSAL
  → CAPABILITY ASSESSMENT
  → ARCHITECTURE REVIEW
  → ADAPTER CONTRACT
  → PLATFORM IMPLEMENTATION
  → COMPATIBILITY TEST
  → SECURITY REVIEW
  → ACCEPTANCE
  → SUPPORT STATUS UPDATE
```

新增平台不得绕过架构、设计、质量和安全 Gate。

## 7. Prohibited Practices

- MUST NOT 直接复制整个应用作为新平台实现。
- MUST NOT 未经分析引入不兼容 SDK。
- MUST NOT 因新平台而破坏既有平台契约。
- MUST NOT 将部分功能可运行描述为平台完整支持。

## 8. AI Execution Rules

AI 必须输出新增平台影响分析、能力缺口、适配器设计、依赖变化和验证计划。

## 9. Verification

平台集成测试、契约测试、兼容性回归和安全检查。

## 10. Acceptance Criteria

新增平台满足声明的支持范围，既有平台无不可接受回归。

## 11. Exceptions

实验性平台可标记 EXPERIMENTAL，并限制用户范围。

## 12. References

UAES-04、UAES-06、UAES-09、UAES-10。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
