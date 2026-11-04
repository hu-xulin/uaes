# UAES-06-011 — Code Documentation and Comments

| Metadata | Value |
|---|---|
| Standard ID | UAES-06-011 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P1 |
| Owner | Software Engineering Owner |
| Dependencies | UAES-06, UAES-03 |

## 1. Purpose

规范代码注释、公共 API 文档、模块说明和开发者文档。

## 2. Scope

代码注释、README、Package Documentation、API 文档、架构说明和操作说明。

## 3. Definitions

- **API Documentation**：公共接口说明。
- **Inline Comment**：代码内部注释。
- **Rationale Comment**：解释设计原因的注释。
- **Runbook**：操作和故障处理说明。

## 4. Core Principles

文档解释意图，代码表达行为；注释保持真实；文档与实现同步。

## 5. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-06-011-001 | MUST 为重要公共 API 提供文档。 |
| UAES-06-011-002 | MUST 为复杂业务约束解释设计原因。 |
| UAES-06-011-003 | MUST 为复杂算法记录关键假设。 |
| UAES-06-011-004 | MUST 为非显然并发和资源管理逻辑提供说明。 |
| UAES-06-011-005 | MUST 保持注释与代码一致。 |
| UAES-06-011-006 | MUST 为模块提供职责说明。 |
| UAES-06-011-007 | MUST 为关键配置说明默认值和影响。 |
| UAES-06-011-008 | MUST 对过时文档进行更新或弃用标记。 |

## 6. Implementation Rules

注释应回答：

- 为什么采用此实现？
- 哪些条件不能改变？
- 有什么容易被误用的边界？
- 哪些约束来自外部契约？

避免复述代码本身。

## 7. Prohibited Practices

- MUST NOT 留下与实际行为不一致的注释。
- MUST NOT 将 TODO 当成永久任务管理机制。
- MUST NOT 在注释中复制大量重复规范内容。
- MUST NOT 在文档中放入真实密钥或敏感信息。

## 8. AI Execution Rules

AI 修改行为时必须检查相关注释、README 和接口文档是否需要同步更新。

## 9. Verification

文档链接、示例编译、注释检查和文档漂移检测由 P09/P12 执行。

## 10. Acceptance Criteria

重要接口和复杂逻辑有准确文档，不存在明显过时说明。

## 11. Exceptions

简单局部实现不要求机械添加注释。

## 12. References

Go Documentation、TypeScript Documentation、UAES-03。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
