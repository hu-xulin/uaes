# UAES-06-009 — API Client and Code Generation

| Metadata | Value |
|---|---|
| Standard ID | UAES-06-009 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Software Engineering Owner |
| Dependencies | UAES-06, UAES-04 |

## 1. Purpose

建立 API 契约、Client、类型和代码生成的一致性机制。

## 2. Scope

HTTP API、OpenAPI、SDK、TypeScript Client、Go Client、数据库模型映射和 IPC 类型生成。

## 3. Definitions

- **API Contract**：接口契约。
- **Generator**：代码生成器。
- **Generated Artifact**：生成产物。
- **Source Contract**：生成代码的权威来源。
- **Drift**：契约和实现之间的差异。

## 4. Core Principles

Contract First、Reproducible Generation、Source Traceability、Compatibility。

## 5. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-06-009-001 | MUST 为正式 API 定义契约。 |
| UAES-06-009-002 | MUST 明确请求、响应、错误和版本语义。 |
| UAES-06-009-003 | MUST 明确生成代码的源契约。 |
| UAES-06-009-004 | MUST 固定生成器版本和配置。 |
| UAES-06-009-005 | MUST 保证生成过程可重复。 |
| UAES-06-009-006 | MUST 检测生成产物漂移。 |
| UAES-06-009-007 | MUST 明确哪些文件可编辑、哪些文件只允许生成。 |
| UAES-06-009-008 | MUST 对接口破坏性变化执行兼容性评估。 |
| UAES-06-009-009 | MUST 对生成产物保留来源标识。 |
| UAES-06-009-010 | MUST 防止客户端与服务端错误模型长期分叉。 |

## 6. Implementation Rules

建议流程：

```
API CONTRACT
  → SCHEMA VALIDATION
  → GENERATOR
  → GENERATED TYPES / CLIENT
  → IMPLEMENTATION
  → CONTRACT CONSISTENCY CHECK
```

OpenAPI 或其他契约文件必须由 UAES-04-007 的 API Contract 规则管理。P06 负责代码生成和实现映射。

## 7. Prohibited Practices

- MUST NOT 手工修改自动生成文件。
- MUST NOT 同时维护互相冲突的 API 类型定义。
- MUST NOT 未经版本评估改变公共接口语义。
- MUST NOT 以生成成功替代契约正确性验证。

## 8. AI Execution Rules

AI 修改接口时必须同步评估服务端、客户端、类型、文档和兼容性；若文件由生成器管理，应修改源契约后重新生成。

## 9. Verification

Schema 校验、生成一致性、客户端编译和 API 契约测试由 P09 执行。

## 10. Acceptance Criteria

源契约、生成产物和实际实现保持一致。

## 11. Exceptions

无法自动生成的特殊接口必须记录手工映射规则。

## 12. References

UAES-04-007、UAES-09。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
