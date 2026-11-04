# UAES-10-007 — API and Application Security

| Field | Value |
| --- | --- |
| ID | UAES-10-007 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. API Baseline

所有 API 必须定义：

- Authentication；
- Authorization；
- Input Schema；
- Output Schema；
- Error Contract；
- Rate Limit；
- Timeout；
- Idempotency；
- Audit Requirement；
- Data Classification。

## 2. Web Security

根据实际部署启用：

- CSP；
- HSTS；
- X-Content-Type-Options；
- Referrer-Policy；
- Frame 防护策略；
- 安全 Cookie；
- 合理 CORS；
- CSRF 防护。

安全响应头应按实际资源、嵌入和认证模式配置，不得机械复制导致业务失效。

## 3. API Abuse Protection

- 登录、验证码、Token 生成、密码恢复和高成本模型调用必须有速率限制。
- 限流策略应考虑用户、IP、API Key、租户和资源成本。
- 关键业务接口应限制并发、请求体大小和处理时长。
- 429 等限流响应必须有明确的客户端处理约定。

## 4. Webhook

Webhook 接收端 MUST：

- 验证签名；
- 验证事件来源；
- 验证时间戳和重放窗口；
- 使用事件 ID 或业务幂等键；
- 核对订单和业务状态；
- 对重复通知安全响应；
- 将异步处理与外部响应解耦。

## 5. Error Handling

- 不向外暴露堆栈、SQL、文件路径、密钥和内部拓扑。
- 内部错误必须有 Correlation ID / Trace ID。
- 失败不能伪装成功。
- 安全失败必须记录必要审计事件。

## 6. Acceptance

所有公开 API 有安全契约；Webhook 验签和重放防护通过测试；CORS、CSRF 和安全响应头有部署级验证。
