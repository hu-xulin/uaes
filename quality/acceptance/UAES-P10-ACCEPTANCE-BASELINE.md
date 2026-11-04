# UAES-P10-ACCEPTANCE-BASELINE — Security & Reliability Acceptance

| Field | Value |
| --- | --- |
| Baseline ID | UAES-P10-ACCEPTANCE-BASELINE |
| Version | 1.0.0 |
| Status | DRAFT |
| Applies to | UAES P10 |

## A. Governance Acceptance

- 安全 Owner 和资产 Owner 明确。
- 安全需求与产品需求、架构和测试可追踪。
- 安全风险接受符合 P00/P01。
- 安全例外具备期限、责任人和补偿控制。

## B. Threat Model Acceptance

- 核心系统存在有效 Threat Model。
- 身份、权限、支付、数据和第三方集成边界明确。
- 关键威胁具备控制和测试映射。
- 架构变化可触发威胁模型更新。

## C. Identity Acceptance

- 服务端认证和授权覆盖完整。
- 跨用户、跨租户、越权测试通过。
- Session 和 Token 生命周期明确。
- 高风险权限撤销可验证。

## D. Data and Secret Acceptance

- 数据分类覆盖关键数据。
- 日志不存在未处理的敏感信息泄漏。
- 生产密钥与非生产环境隔离。
- 密钥轮换、撤销和泄漏响应可执行。
- 生产数据在测试环境中的使用经过授权和脱敏。

## E. Application Security Acceptance

- 输入验证和输出编码有统一约束。
- SQL、命令、路径、模板注入测试通过。
- SSRF 和文件安全测试通过。
- CORS、CSRF、CSP 和安全响应头按场景验证。
- Webhook 签名、重放和幂等测试通过。

## F. Platform Acceptance

- Go HTTP 服务、数据库访问和并发资源生命周期符合基线。
- React/Web/H5 不依赖客户端逻辑保护服务端资源。
- Electron Main/Preload/Renderer 安全边界明确。
- Electron IPC 参数、发送者和权限验证通过。
- Redis、数据库和管理接口访问受控。

## G. Supply Chain Acceptance

- 根 Go Module 已扫描。
- relaykit 已扫描。
- tokenkit 已扫描。
- tokenkit/tokenkit 已扫描。
- Web/Bun 和 Electron 依赖已扫描。
- 锁文件一致性检查通过。
- 关键构建生成 SBOM。
- 产物与 Commit SHA 可追踪。
- 高风险许可证问题有处理记录。

## H. Cryptography Acceptance

- 密码存储采用适当的密码哈希方案。
- 加密和签名使用受支持的安全实现。
- 密钥用途、环境和轮换策略明确。
- 支付验签使用正确的渠道公钥/证书。

## I. Vulnerability Acceptance

- 安全扫描工具和版本已记录。
- 漏洞均有 Owner、等级和期限。
- S3/S4 漏洞均已处置或发布阻断。
- 修复后专项测试和回归测试通过。
- 不存在未验证关闭的漏洞。

## J. Reliability Acceptance

- 关键服务 SLI/SLO 明确。
- 外部调用有超时、重试和隔离策略。
- 关键业务操作有幂等与并发控制。
- 后台任务有失败恢复和监控。
- 资源限制和降级行为经过验证。

## K. Backup and Recovery Acceptance

- 关键数据 RPO/RTO 已批准。
- 备份访问控制和完整性验证通过。
- 实际恢复演练完成。
- 恢复后数据一致性验证通过。
- 支付订单和余额账本有专门恢复核对流程。

## L. Incident Acceptance

- 事件分级和响应责任明确。
- 凭据泄漏、数据泄漏和服务失陷有处置手册。
- 证据保全流程明确。
- 至少完成一次桌面演练。
- 复盘问题有 Owner 和完成期限。

## M. Payment Acceptance

- 不信任客户端到账结果。
- 回调签名验证通过。
- 订单、金额、币种、商户核对通过。
- 重复通知不会重复到账。
- 并发回调不会重复记账。
- 支付成功和充值入账状态分离。
- 主动查询和定期对账机制经过验证。
- 异常订单可恢复且全程可审计。
- 生产支付配置不被 AI 自动修改。

## N. Negative Security Tests

必须验证以下攻击或错误路径：

1. 用户 A 读取用户 B 的资源。
2. 普通用户调用管理员 API。
3. 使用过期 Token 请求受保护资源。
4. 已撤销权限仍然可访问。
5. SQL 注入输入进入数据库查询。
6. XSS 输入进入 HTML 渲染。
7. SSRF 请求访问 loopback 或云元数据地址。
8. 上传伪装成图片的可执行内容。
9. Webhook 使用错误签名。
10. Webhook 重放相同事件。
11. 支付回调修改金额或币种。
12. 并发回调重复记账。
13. Electron Renderer 调用未授权 IPC。
14. 恶意依赖或锁文件篡改。
15. Secret 被写入日志或构建产物。
16. 备份文件被未授权读取或篡改。
17. 外部服务超时导致无界重试。
18. 恢复后账本发生重复或丢失。

## O. Final Acceptance

P10 正式验收必须满足：

- 所有适用强制项 PASS；
- 关键负面测试通过；
- S3/S4 风险已处置；
- Schema 实际验证通过；
- Gate 已接入自动化流程；
- 恢复演练和事件演练完成；
- 安全证据可追踪；
- 例外有效且经过批准；
- 评审人和批准人明确。

最终结果：PASS / FAIL / BLOCKED / NOT_RUN。

文档完成、工具实现、仓库落地、自动化执行、生产环境验证和正式批准是不同的验收层级，不得合并成一个「已完成」状态。
