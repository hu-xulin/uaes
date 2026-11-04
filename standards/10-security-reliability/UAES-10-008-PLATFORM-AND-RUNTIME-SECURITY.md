# UAES-10-008 — Platform and Runtime Security

| Field | Value |
| --- | --- |
| ID | UAES-10-008 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Go Backend

- 数据库访问必须使用参数化查询。
- HTTP Server 必须配置合理的 Header、Read、Write、Idle 和请求体限制。
- 外部请求必须有超时和 Context 取消。
- 错误不得泄漏内部敏感信息。
- Goroutine、文件、连接和临时资源必须有明确生命周期。
- 管理接口不得因监听内部端口而免除认证授权。

## 2. React / Web / H5

- 不得将不可信内容直接传入危险 HTML 渲染入口。
- Token 不得放入 URL。
- 不得把前端路由保护当作后端授权。
- 生产构建不得包含调试密钥、内部测试账户或敏感 Source Map（除非有受控上传策略）。
- 第三方脚本必须评估来源、权限和供应链风险。

## 3. Electron

- Production MUST 禁用 Node Integration（Renderer）。
- Context Isolation MUST 启用。
- Sandbox MUST 启用，除非有经过批准的兼容性例外。
- Renderer 与 Main 之间通过最小化、强类型 IPC API 通信。
- IPC MUST 校验发送者、参数、调用来源和授权。
- MUST NOT 暴露通用文件系统、Shell 或任意命令执行接口给不可信 Renderer。
- 导航、窗口打开、外部 URL 和下载必须使用白名单策略。
- Preload 只暴露最小必要能力。
- Electron 更新和安装产物必须验证来源与完整性。

## 4. Infrastructure

- 数据库、Redis、管理面板不得无必要暴露公网。
- 管理访问必须受身份、网络和审计策略约束。
- 生产与非生产环境必须隔离。
- 运行账户不得使用不必要的 root/管理员权限。
- 容器、主机和运行时配置必须有安全基线。

## 5. Acceptance

Go、Web、Electron 和基础设施安全配置均有自动化检查或明确人工验证证据；Electron IPC 越权测试通过。
