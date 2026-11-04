# UAES-10-004 — Session, Token and Secret Management

| Field | Value |
| --- | --- |
| ID | UAES-10-004 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

保护用户会话、访问令牌、API Key、服务凭据、签名密钥和加密密钥。

## 2. Session

- Session ID MUST 使用密码学安全随机数生成。
- 登录成功、权限变化和风险事件后 MUST 按策略更新或撤销 Session。
- Cookie MUST 根据部署场景设置 Secure、HttpOnly、SameSite、Path 和合理的过期时间。
- 高风险操作 SHOULD 要求重新认证。
- Session 撤销和全局退出 MUST 有明确服务端语义。
- 不得把长期敏感凭据存储在不受保护的浏览器存储中。

## 3. Token

- Access Token MUST 设置明确的受众、用途、有效期和权限范围。
- Refresh Token MUST 有轮换、重放检测和撤销策略。
- JWT 验证 MUST 校验算法白名单、签名、issuer、audience、expiry 和必要 claims。
- MUST NOT 信任客户端自行声明的身份或权限字段。
- Token 不得出现在 URL、Referer、错误信息和普通日志中。

## 4. Secrets

每个 Secret MUST 有：

- Secret ID；
- Owner；
- Purpose；
- Environment；
- Scope；
- Created At；
- Rotation Policy；
- Expiry；
- Revocation Procedure；
- Access Audit。

生产 Secret MUST 通过受控 Secret Manager 或等效安全机制管理。不得依赖人工把生产密钥复制进 `.env` 文件并提交到仓库。

## 5. Rotation and Revocation

密钥泄漏时必须能够：

1. 禁止继续使用旧凭据；
2. 签发新凭据；
3. 更新依赖服务；
4. 验证旧凭据失效；
5. 检查可能的未授权访问；
6. 保留事件证据。

## 6. Verification

- Secret Scanner；
- 仓库历史扫描；
- 日志脱敏测试；
- Token 过期/撤销测试；
- Refresh Token 重放测试；
- Cookie 属性检查；
- 密钥轮换演练。

## 7. Acceptance

不存在未处理的生产密钥泄漏；Token 生命周期可验证；密钥轮换与撤销流程经过测试。
