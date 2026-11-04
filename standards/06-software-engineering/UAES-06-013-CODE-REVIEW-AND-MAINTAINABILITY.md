# UAES-06-013 — Code Review and Maintainability

| Metadata | Value |
|---|---|
| Standard ID | UAES-06-013 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Software Engineering Owner |
| Dependencies | UAES-06, UAES-01, UAES-09 |

## 1. Purpose

建立代码可维护性要求和代码审查输入输出契约。

## 2. Scope

所有新增代码、缺陷修复、重构、依赖升级和生成代码变更。

## 3. Definitions

- **Code Review**：对代码变更进行独立审查。
- **Maintainability**：长期理解、修改和维护代码的能力。
- **Review Finding**：审查发现。
- **Change Scope**：变更范围。

## 4. Core Principles

小范围变更、独立审查、问题有证据、修复有验证、结果可追踪。

## 5. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-06-013-001 | MUST 为每次正式变更提供变更说明。 |
| UAES-06-013-002 | MUST 说明业务和技术影响。 |
| UAES-06-013-003 | MUST 检查模块边界和依赖方向。 |
| UAES-06-013-004 | MUST 检查错误处理和资源生命周期。 |
| UAES-06-013-005 | MUST 检查类型安全和异常路径。 |
| UAES-06-013-006 | MUST 检查是否引入重复实现。 |
| UAES-06-013-007 | MUST 检查文档和契约是否同步。 |
| UAES-06-013-008 | MUST 将 Review Finding 关联文件、位置和证据。 |
| UAES-06-013-009 | MUST 为修复项执行相关验证。 |
| UAES-06-013-010 | MUST 保留未解决问题和风险。 |

## 6. Implementation Rules

Review Finding 等级：

- **CRITICAL**：可能造成严重业务、数据或系统影响。
- **HIGH**：核心功能、边界或一致性存在重大缺陷。
- **MEDIUM**：存在明确质量或维护问题。
- **LOW**：局部改进建议。

审查报告至少包含：

- Finding ID。
- 文件路径和行号。
- 问题证据。
- 触发条件或复现方式。
- 影响范围。
- 风险等级。
- 建议修复。
- 修复后验证要求。

P09 负责完整 Review Engine、Finding 生命周期和测试证据管理；P06 定义代码质量和审查契约。

## 7. Prohibited Practices

- MUST NOT 以代码行数作为代码质量的唯一指标。
- MUST NOT 将纯风格偏好伪装为缺陷。
- MUST NOT 无证据断言缺陷。
- MUST NOT 将未经验证的修复标记为 CLOSED。

## 8. AI Execution Rules

AI 可在明确授权范围内直接修复发现的问题；必须保护用户本地未提交修改，并按照 UAES-01 和 UAES-09 规定执行修复、验证和报告。

## 9. Verification

由 P09 执行独立审查、静态分析和回归验证。

## 10. Acceptance Criteria

审查发现可追踪、修复有证据、遗留风险明确。

## 11. Exceptions

紧急修复可缩短审查流程，但必须安排后续独立审查。

## 12. References

UAES-01、UAES-09、UAES-12。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
