# UAES-06-007 — Error and Logging Standard

| Metadata | Value |
|---|---|
| Standard ID | UAES-06-007 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Software Engineering Owner |
| Dependencies | UAES-06 |

## 1. Purpose

统一错误分类、错误传播、日志结构和故障上下文。

## 2. Scope

Go 后端、Web、Electron、API Client、后台任务和外部集成。

## 3. Definitions

- **Error Classification**：错误分类。
- **Error Propagation**：错误向调用链传播。
- **Structured Logging**：结构化日志。
- **Correlation ID**：关联一次请求或业务操作的标识。
- **Sensitive Field**：不得在日志中直接暴露的敏感字段。

## 4. Core Principles

错误可识别、上下文充分、日志结构化、敏感数据最小化、避免重复记录。

## 5. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-06-007-001 | MUST 定义稳定的错误分类。 |
| UAES-06-007-002 | MUST 区分用户错误、业务错误、系统错误和依赖错误。 |
| UAES-06-007-003 | MUST 保留必要的错误因果链。 |
| UAES-06-007-004 | MUST 为请求和关键业务流程提供关联标识。 |
| UAES-06-007-005 | MUST 使用结构化日志。 |
| UAES-06-007-006 | MUST 明确日志级别和使用场景。 |
| UAES-06-007-007 | MUST 防止重复记录同一异常造成噪声。 |
| UAES-06-007-008 | MUST 对敏感信息进行脱敏或排除。 |
| UAES-06-007-009 | MUST 避免将内部堆栈和数据库细节直接返回用户。 |
| UAES-06-007-010 | MUST 对重试、超时和降级行为提供足够日志上下文。 |

## 6. Implementation Rules

建议错误类别：

- VALIDATION_ERROR
- AUTHENTICATION_ERROR
- AUTHORIZATION_ERROR
- BUSINESS_RULE_ERROR
- NOT_FOUND
- CONFLICT
- RATE_LIMITED
- DEPENDENCY_ERROR
- TIMEOUT
- INTERNAL_ERROR

建议日志字段：

```json
{
  "timestamp": "2026-01-01T00:00:00Z",
  "level": "ERROR",
  "service": "uter-api",
  "request_id": "opaque-id",
  "trace_id": "opaque-id",
  "operation": "example.operation",
  "error_code": "DEPENDENCY_ERROR",
  "message": "Dependency request failed"
}
```

以上仅为字段示例，不得使用真实密钥、用户令牌或个人敏感数据。

## 7. Prohibited Practices

- MUST NOT 记录密码、完整 Token、密钥和支付凭证。
- MUST NOT 将用户可控输入未经处理地写入结构化日志。
- MUST NOT 以 fmt.Println 或随意 console.log 代替正式日志体系。
- MUST NOT 将正常业务分支全部记录为 ERROR。

## 8. AI Execution Rules

AI 必须检查错误是否被吞掉、是否重复记录、是否泄漏敏感信息，以及日志是否能够关联请求和操作。

## 9. Verification

由 P09、P10 检查日志结构、错误映射和敏感字段。

## 10. Acceptance Criteria

错误可定位、可分类、可关联，且日志不泄漏敏感数据。

## 11. Exceptions

特殊合规环境可调整日志保留和字段策略。

## 12. References

UAES-04-013、UAES-09、UAES-10。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial release |
