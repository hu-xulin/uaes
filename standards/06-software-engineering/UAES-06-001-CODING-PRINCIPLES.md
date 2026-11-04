# UAES-06-001 — Coding Principles

| Metadata | Value |
|---|---|
| Standard ID | UAES-06-001 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Software Engineering Owner |
| Dependencies | UAES-06 |

## 1. Purpose

建立跨语言统一编码原则。

## 2. Scope

Go、TypeScript、React、Electron、脚本、代码生成和工程工具。

## 3. Definitions

- **Readability**：代码易于理解。
- **Cohesion**：相关职责集中程度。
- **Coupling**：模块间依赖程度。
- **Defensive Programming**：对不可信输入和异常条件进行防御性处理。

## 4. Core Principles

可读性优先于技巧性；明确优先于隐式；简单优先于过度抽象；业务语义优先于实现细节。

## 5. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-06-001-001 | MUST 使用清晰、具有业务含义的命名。 |
| UAES-06-001-002 | MUST 控制函数、模块和类的职责范围。 |
| UAES-06-001-003 | MUST 显式处理可预期的错误。 |
| UAES-06-001-004 | MUST 避免不必要的全局状态。 |
| UAES-06-001-005 | MUST 避免隐藏副作用。 |
| UAES-06-001-006 | MUST 对边界条件进行明确处理。 |
| UAES-06-001-007 | MUST 避免过度设计和过度抽象。 |
| UAES-06-001-008 | MUST 保持代码风格一致。 |
| UAES-06-001-009 | MUST 对关键业务约束使用类型、校验或不变量表达。 |
| UAES-06-001-010 | MUST 使代码的资源所有权和生命周期清晰。 |

## 6. Implementation Rules

优先采用：

- 小而明确的函数。
- 明确的输入和输出。
- 单向依赖。
- 不可变数据优先。
- 组合优先于继承。
- 明确的状态转换。
- 可预测的副作用边界。

复杂算法、状态机和非显然业务逻辑必须有解释性文档。

## 7. Prohibited Practices

- MUST NOT 为炫技使用晦涩语法。
- MUST NOT 随意创建通用框架。
- MUST NOT 使用无意义缩写。
- MUST NOT 隐藏异常或依赖隐式全局上下文。

## 8. AI Execution Rules

AI 必须优先遵循项目现有风格，不得仅为个人偏好进行大规模格式或结构重写。

## 9. Verification

由 Formatter、Linter、静态分析和 Code Review 检查。

## 10. Acceptance Criteria

代码可理解、责任清晰、无明显不必要复杂度。

## 11. Exceptions

特殊性能或兼容性要求可采用不同实现，但必须记录依据。

## 12. References

Effective Go、TypeScript Handbook、React Documentation。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
