# UAES-05-011 — Design-to-Code Sync

| Metadata | Value |
|---|---|
| Standard ID | UAES-05-011 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

建立设计资产、Token、组件实现和文档之间的同步机制。

## 2. Scope

设计工具文件、Token 导入导出、组件映射、图标、图片、字体和文档。

## 3. Definitions

- Design Asset：设计工具中的组件、样式、图标、图片等资产。
- Mapping：设计对象与代码对象之间的映射。
- Drift：设计与实现之间的差异。
- Generated Artifact：由源资产自动生成的文件。

## 4. Core Principles

源头明确、映射可追踪、自动同步、冲突可检测、人工审批关键变更。

## 5. Mandatory Requirements

- UAES-05-011-001 MUST 为设计资产分配唯一标识或稳定引用。
- UAES-05-011-002 MUST 记录设计资产与代码组件之间的映射。
- UAES-05-011-003 MUST 记录 Token 来源和生成关系。
- UAES-05-011-004 MUST 对资产变更执行影响分析。
- UAES-05-011-005 MUST 检测设计与代码漂移。
- UAES-05-011-006 MUST 对自动生成文件标明生成来源。
- UAES-05-011-007 MUST 对字体、图标、图片记录授权和来源。
- UAES-05-011-008 MUST 在同步失败时保留原有有效产物，不得生成半成品覆盖。
- UAES-05-011-009 MUST 为设计工具不可用或不适用的项目提供代码优先流程。

## 6. Implementation Rules

建议建立 Design Asset Registry，字段包括资产 ID、来源、版本、文件位置、代码映射、授权、Owner、状态和最近同步时间。

Figma 集成属于可选实现，不得将 UAES 与单一设计工具绑定。

## 7. Prohibited Practices

- MUST NOT 未经授权复制受版权保护的素材。
- MUST NOT 手工覆盖生成文件。
- MUST NOT 将设计工具导出结果直接视为通过工程验证的生产代码。

## 8. AI Execution Rules

AI 可读取、映射和生成设计资产；涉及外部素材、授权和品牌资产时必须验证来源，无法确认则标记 UNKNOWN。

## 9. Verification

检查资产映射、Token 同步、生成一致性、版权信息和漂移报告。

## 10. Acceptance Criteria

关键设计资产可追踪到代码实现，且同步失败不会破坏当前有效构建。

## 11. Exceptions

未使用设计工具的模块可采用代码优先模式，但仍必须遵循 Token 和组件契约。

## 12. References

DTCG 2025.10、UAES-05-002、UAES-05-006。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
