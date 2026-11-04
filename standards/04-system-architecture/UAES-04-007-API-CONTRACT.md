# UAES-04-007 — API Contract & Version Governance

**Standard ID:** UAES-04-007  
**Version:** 1.0.0  
**Status:** DRAFT

## 1. Purpose

建立 Uter 内外部 API 的契约标准，确保前后端、Electron、第三方服务和未来客户端之间的接口具有一致性、兼容性和可验证性。

## 2. API contract requirements

- UAES-API-001：每个对外 API 必须定义请求和响应结构。
- UAES-API-002：字段必须有明确名称、类型、含义和约束。
- UAES-API-003：必填与可选字段必须明确区分。
- UAES-API-004：时间字段必须明确时区和格式。
- UAES-API-005：金额字段必须明确币种、精度和单位。
- UAES-API-006：分页接口必须定义分页方式和边界。
- UAES-API-007：错误响应必须有稳定错误码。
- UAES-API-008：敏感字段不得无必要地返回客户端。
- UAES-API-009：不得将数据库内部实体直接视为公共 API 契约。
- UAES-API-010：API 契约变更必须经过兼容性分析。

## 3. Request and response

建议统一使用明确的 JSON 结构。具体外层格式应兼容现有 Uter API，不得在没有迁移方案时强行替换既有响应协议。

示例：

```
{
  "code": "SUCCESS",
  "message": "",
  "data": {},
  "request_id": "req_example"
}
```

上述为契约示例，不是要求所有现有接口立即改成该结构。

## 4. Error model

错误必须区分：

- Authentication error；
- Authorization error；
- Validation error；
- Business rule error；
- Resource not found；
- Conflict；
- Rate limit；
- Dependency failure；
- Timeout；
- Internal error。

每类错误必须有稳定的错误标识，不能要求客户端通过解析自然语言判断业务状态。

不得向外部暴露：

- 数据库内部错误；
- 堆栈；
- 内部 IP；
- 访问令牌；
- 私钥；
- 未公开的系统配置。

## 5. API versioning

- UAES-API-011：对外 API 必须有明确的兼容策略。
- UAES-API-012：破坏性变更必须有版本或迁移策略。
- UAES-API-013：新增可选字段通常应保持向后兼容。
- UAES-API-014：不得直接改变既有字段含义。
- UAES-API-015：废弃接口必须定义通知、迁移和停止支持计划。
- UAES-API-016：客户端必须对未知字段有合理处理能力。

## 6. Authentication and authorization

- UAES-API-017：身份认证与资源授权必须分开处理。
- UAES-API-018：客户端提供的用户 ID 不得直接作为授权依据。
- UAES-API-019：服务端必须基于可信身份上下文执行权限判断。
- UAES-API-020：敏感操作必须执行服务端权限校验。
- UAES-API-021：内部服务调用必须有明确的服务身份与权限范围。

## 7. Idempotency and retries

对于创建订单、支付、充值、退款、扣费和任务提交等可能重复请求的操作：

- 定义幂等键；
- 定义作用域；
- 定义有效期；
- 定义重复请求返回行为；
- 定义并发请求处理；
- 定义结果查询机制；
- 定义异常恢复方式。

客户端重试不得导致重复扣费、重复充值或重复创建不可控任务。

## 8. API documentation

API 文档必须与实现保持一致。

推荐采用 OpenAPI 等机器可读格式，具体工具和版本由项目技术选型确认。

要求：

- 契约变更可追踪；
- 参数和响应有说明；
- 错误码有定义；
- 认证方式有定义；
- 示例与实现一致；
- 自动检查能发现明显契约漂移。

## 9. Acceptance criteria

- 关键 API 有完整契约；
- 错误结构明确；
- 认证与授权分离；
- 破坏性变更可追踪；
- 幂等接口行为明确；
- API 文档与实现经过验证；
- 前端与后端类型没有未经解释的偏差。
