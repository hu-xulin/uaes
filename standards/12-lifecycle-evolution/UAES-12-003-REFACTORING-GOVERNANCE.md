# UAES-12-003 — Refactoring Governance

| Metadata | Value |
|---|---|
| Standard ID | UAES-12-003 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Lifecycle & Evolution Owner |
| Dependencies | UAES-12, UAES-06, UAES-09 |

## 1. Purpose

保证重构目标明确、行为可验证、风险可控制。

## 2. Scope

代码重构、模块边界调整、迁移类重构以及借重构之名引入的行为变更。

## 3. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-12-003-M001 | 中高风险重构 MUST 关联任务或技术债务。 |
| UAES-12-003-M002 | 重构前 MUST 建立行为基线。 |
| UAES-12-003-M003 | 重构 MUST 明确行为兼容性要求。 |
| UAES-12-003-M004 | 涉及模块边界的重构 MUST 评估架构影响。 |
| UAES-12-003-M005 | 涉及数据和 API 的重构 MUST 执行兼容性分析。 |
| UAES-12-003-M006 | 重构 MUST 执行相关回归测试。 |
| UAES-12-003-M007 | 重构不得隐藏未批准的功能变更。 |
| UAES-12-003-M008 | 重构完成 MUST 更新相关文档和知识。 |

## 4. Implementation Rules

重构前必须：确定问题和目标、确认行为兼容性要求、记录影响范围、识别数据和接口风险、建立基线测试、设计分阶段实施计划、定义回滚或前向修复方案。

## 5. Verification

- Baseline Comparison
- Regression Test
- Architecture Boundary Check
- Behavioral Compatibility

## 6. Exceptions

遵循 UAES-00 Exception Management。例外必须有范围、风险、补偿控制、Owner、审批和到期时间。

## 7. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial standard |
