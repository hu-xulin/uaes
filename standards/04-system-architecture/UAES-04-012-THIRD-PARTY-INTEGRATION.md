# UAES-04-012 — Third-party Integration & Resilience Standard

**Standard ID:** UAES-04-012  
**Version:** 1.0.0  
**Status:** DRAFT

## 1. Purpose

规范 Uter 对支付渠道、AI 模型上游、认证服务、邮件、短信、云服务及其他第三方系统的集成方式。

## 2. Integration boundary

- UAES-EXT-001：第三方服务必须经过明确的集成边界。
- UAES-EXT-002：业务层不得散落第三方 SDK 调用。
- UAES-EXT-003：外部数据必须视为不可信输入。
- UAES-EXT-004：第三方响应必须经过校验和映射。
- UAES-EXT-005：第三方错误不得直接泄露内部实现。
- UAES-EXT-006：外部服务的认证凭据必须集中管理。
- UAES-EXT-007：第三方协议变更必须有兼容性评估。

## 3. Adapter pattern

推荐使用适配器隔离第三方实现：

```
Business Use Case
       |
       v
Integration Interface
       |
       v
Provider Adapter
       |
       v
Third-party API / SDK
```

业务层依赖内部定义的接口，不直接依赖某个供应商的 SDK 类型。

## 4. Timeout and retry

每项外部调用必须明确：

- 连接超时；
- 请求超时；
- 整体操作超时；
- 重试条件；
- 最大重试次数；
- 退避策略；
- 并发限制；
- 熔断或隔离策略（适用时）。

不得对所有外部错误无条件重试。

## 5. Circuit breaker and bulkhead

只有在实际负载、故障模式和恢复策略支持时才引入熔断或舱壁隔离。

必须明确：

- 触发条件；
- 半开恢复；
- 并发限制；
- 失败率统计窗口；
- 降级策略；
- 监控指标。

## 6. AI upstream integration

AI 模型上游必须考虑：

- Provider 身份；
- 模型标识；
- 请求超时；
- 流式响应中断；
- 上游错误映射；
- 限流；
- 重试边界；
- Token 计量来源；
- 价格版本；
- 计费依据；
- 上游请求追踪；
- 用户取消；
- 供应商故障切换。

不得将一次失败的上游调用直接记为成功计费。

Token 计量和实际计费必须区分上游返回数据、内部估算和最终结算依据。

## 7. Payment provider integration

支付集成必须：

- 校验回调签名；
- 校验订单号；
- 校验金额和币种；
- 校验渠道状态；
- 处理重复通知；
- 处理通知乱序；
- 支持主动查询；
- 支持对账；
- 记录原始必要证据；
- 防止跨商户、跨用户和跨订单关联错误。

不能把浏览器同步跳转结果直接视为最终到账凭据。

## 8. Acceptance criteria

- 第三方依赖有明确边界；
- 请求有超时；
- 重试不会破坏幂等性；
- 故障可以隔离；
- 错误可分类；
- 敏感凭据安全；
- 支付和 AI 上游数据可追踪；
- 第三方故障有恢复路径。
