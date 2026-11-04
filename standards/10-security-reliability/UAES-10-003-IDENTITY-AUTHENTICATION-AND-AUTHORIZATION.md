# UAES-10-003 — Identity, Authentication and Authorization

| Field | Value |
| --- | --- |
| ID | UAES-10-003 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

规范主体身份、认证凭据、权限判定、资源授权和权限撤销。

## 2. Authentication

- 认证必须由可信身份提供方或服务端认证逻辑完成。
- 登录、账户恢复、敏感信息修改和高风险操作 MUST 实施风险适配的验证。
- 登录错误信息不得泄漏账户是否存在等敏感信息。
- 登录、验证码、密码重置和 Token 签发接口 MUST 有速率限制和滥用检测。
- 身份验证成功不代表用户自动拥有所有资源权限。

## 3. Authorization

每次受保护操作 MUST 验证：

1. Subject：当前用户/服务身份；
2. Action：请求执行的操作；
3. Resource：目标资源；
4. Ownership：资源归属；
5. Scope：租户、项目或业务范围；
6. Policy：当前授权策略；
7. Context：环境、状态和风险条件。

必须防范：

- IDOR / BOLA；
- BFLA；
- 横向越权；
- 纵向越权；
- 租户边界穿透；
- 管理员权限误用；
- 权限缓存失效。

## 4. Service-to-Service Identity

服务间调用 MUST 使用明确的服务身份和最小权限凭据。不得因为请求来自内部网络就默认可信。

## 5. Permission Lifecycle

权限必须具备：

- 授予原因；
- 资源范围；
- 有效期；
- 授予者；
- 撤销条件；
- 审计记录。

权限变更 MUST 有可追踪记录。高风险权限 MUST 有定期复核。

## 6. Negative Tests

必须验证：

- 用户 A 访问用户 B 资源被拒绝；
- 普通用户调用管理员接口被拒绝；
- 过期会话被拒绝；
- 已撤销权限不能继续访问；
- 租户切换不能读取其他租户数据；
- 缺失资源归属检查的接口无法通过安全 Gate。

## 7. Acceptance

所有受保护 API 均有认证和授权策略；资源归属检查由服务端实施；越权负面测试通过。
