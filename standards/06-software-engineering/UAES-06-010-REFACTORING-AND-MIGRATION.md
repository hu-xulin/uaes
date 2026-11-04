# UAES-06-010 — Refactoring and Migration

| Metadata | Value |
|---|---|
| Standard ID | UAES-06-010 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Software Engineering Owner |
| Dependencies | UAES-06, UAES-04, UAES-12 |

## 1. Purpose

规范代码重构、框架迁移、依赖升级、模块拆分和历史代码治理。

## 2. Scope

所有生产代码、公共接口、数据模型、配置、依赖和生成工具。

## 3. Definitions

- **Refactoring**：不改变外部可观察行为的内部结构改进。
- **Migration**：引入外部行为、数据或兼容性变化的迁移。
- **Strangler Migration**：逐步替换旧实现的迁移模式。
- **Rollback**：失败时恢复到已知安全状态。

## 4. Core Principles

小步变更、行为可验证、兼容优先、风险可控、可回滚。

## 5. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-06-010-001 | MUST 区分纯重构和行为变更。 |
| UAES-06-010-002 | MUST 明确重构目标和范围。 |
| UAES-06-010-003 | MUST 记录受影响模块和接口。 |
| UAES-06-010-004 | MUST 为迁移定义前置条件。 |
| UAES-06-010-005 | MUST 为破坏性变化定义兼容和过渡策略。 |
| UAES-06-010-006 | MUST 为不可逆操作定义恢复或补偿方案。 |
| UAES-06-010-007 | MUST 避免在一个变更中混合无关重构。 |
| UAES-06-010-008 | MUST 在每个阶段保留可验证状态。 |
| UAES-06-010-009 | MUST 保留旧实现移除的证据。 |
| UAES-06-010-010 | MUST 保护用户未提交的本地修改。 |

## 6. Implementation Rules

建议迁移阶段：

```
DISCOVERY
  → IMPACT ANALYSIS
  → MIGRATION PLAN
  → COMPATIBILITY LAYER
  → INCREMENTAL MIGRATION
  → VERIFICATION
  → DEPRECATION
  → REMOVAL
```

数据库迁移和数据兼容由 UAES-04-008、UAES-10、UAES-11 协同管理。

## 7. Prohibited Practices

- MUST NOT 未经评估删除公共 API。
- MUST NOT 将重构作为掩盖业务变更的方式。
- MUST NOT 未验证便删除兼容层。
- MUST NOT 直接覆盖用户未提交修改。
- MUST NOT 将数据库迁移成功等同于业务迁移成功。

## 8. AI Execution Rules

AI 必须先建立基线、影响清单和迁移计划；每个阶段执行适用验证，并报告未完成部分。

## 9. Verification

由 P09 检查行为回归，由 P04 检查架构变化，由 P10 检查安全影响。

## 10. Acceptance Criteria

迁移完成、旧路径清理、兼容性明确、风险和回滚证据完整。

## 11. Exceptions

紧急修复可以缩小流程，但必须保留事后审查和补齐证据。

## 12. References

UAES-02-006、UAES-04、UAES-09、UAES-12。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
