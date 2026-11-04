# UAES-06-003 — Naming and Code Organization

| Metadata | Value |
|---|---|
| Standard ID | UAES-06-003 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Software Engineering Owner |
| Dependencies | UAES-06 |

## 1. Purpose

统一标识符、文件、目录、类型、函数和常量命名。

## 2. Scope

Go、TypeScript、React、Electron 和工程配置。

## 3. Definitions

- **Identifier**：代码标识符。
- **Public API**：对模块外部暴露的接口。
- **Domain Name**：表达业务领域含义的名称。

## 4. Core Principles

一致、明确、可搜索、可理解、与语言习惯一致。

## 5. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-06-003-001 | MUST 遵循语言官方命名惯例。 |
| UAES-06-003-002 | MUST 使名称表达业务语义。 |
| UAES-06-003-003 | MUST 为公共接口使用稳定名称。 |
| UAES-06-003-004 | MUST 避免同一概念在不同模块使用不同名称。 |
| UAES-06-003-005 | MUST 为缩写建立受控约定。 |
| UAES-06-003-006 | MUST 避免名称与实际责任不符。 |
| UAES-06-003-007 | MUST 对文件名和目录名保持一致风格。 |

## 6. Implementation Rules

Go：

- 包名使用简短、小写、无下划线。
- 导出标识符使用 PascalCase。
- 非导出标识符使用 camelCase。
- 接口名以行为表达，不机械添加 I 前缀。
- 错误变量通常使用 err，错误类型按 Go 惯例命名。

TypeScript：

- 变量和函数使用 camelCase。
- 类型、接口、组件使用 PascalCase。
- 常量按语义和项目约定命名，不要求所有常量都使用全大写。
- React 组件文件命名遵循项目统一策略。
- Hook 使用 use 前缀。

## 7. Prohibited Practices

- MUST NOT 使用无语义名称。
- MUST NOT 随意缩写核心业务概念。
- MUST NOT 通过文件名暗示不存在的责任。

## 8. AI Execution Rules

AI 应沿用相邻模块的命名方式；若发现术语冲突，应先对齐领域词汇，不得自行制造同义词体系。

## 9. Verification

命名 Linter、导出 API 检查和代码审查。

## 10. Acceptance Criteria

命名一致、职责清晰、术语统一。

## 11. Exceptions

历史兼容 API 可保留旧名称，但新增代码不得扩大不一致范围。

## 12. References

Effective Go、TypeScript Handbook。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
