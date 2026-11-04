# UAES-10 — Security & Reliability Engineering Standard

| Field | Value |
| --- | --- |
| Standard ID | UAES-10 |
| Version | 1.0.0 |
| Status | DRAFT |
| Domain | Security & Reliability Engineering |
| Owner | UAES Security Governance |
| Applies to | Uter Backend / Web / H5 / Electron / APIs / Data / Infrastructure / AI Integrations / Future Platforms |

## 1. Purpose

建立统一的安全与可靠性工程体系，使安全控制和业务连续性要求贯穿需求、设计、开发、测试、发布、运行、恢复及退役全过程。

## 2. Scope

覆盖：

- 应用与 API 安全
- 身份认证、授权、会话与凭据
- 数据分类、隐私、加密和完整性
- 输入验证、注入防御和输出编码
- 依赖、构建、供应链和 SBOM
- Go、React、Electron 运行时安全
- 安全测试、漏洞响应和披露
- 可靠性、韧性、备份、恢复与业务连续性
- 支付、充值、退款和余额等资金相关安全
- 安全事件响应和持续保证

## 3. Normative Language

- **MUST**：强制要求。
- **MUST NOT**：禁止行为。
- **SHOULD**：原则上应执行；不执行必须说明理由。
- **SHOULD NOT**：原则上不应执行；例外必须说明理由。
- **MAY**：可选措施。

## 4. Core Principles

1. **Secure by Design**：安全必须在设计阶段考虑。
2. **Zero Trust**：每次访问都必须验证身份、权限和资源范围。
3. **Least Privilege**：权限只授予完成任务所需的最小范围。
4. **Deny by Default**：未明确允许的操作默认拒绝。
5. **Defense in Depth**：不得依赖单一安全控制。
6. **Fail Securely**：安全控制发生异常时，不得自动退化为开放访问。
7. **Data Minimization**：只收集、处理和保留必要数据。
8. **Resilience by Design**：关键服务必须考虑故障隔离、恢复和降级。
9. **Evidence Based**：安全结论必须有可验证证据。
10. **Continuous Assurance**：安全不是一次性验收，而是持续验证。

## 5. Mandatory Requirements

### 5.1 Security Governance

- UAES-10-001 MUST 建立安全责任人、资产责任人和风险接受责任人。
- 所有安全要求 MUST 关联需求、资产或威胁模型。
- 高风险安全例外 MUST 通过 P00/P01 审批。
- AI Agent MUST NOT 自行扩大安全权限或批准自身风险例外。

### 5.2 Threat Modeling

- 新增认证、支付、数据访问、文件处理、外部集成和管理功能 MUST 进行威胁分析。
- 架构重大变化 MUST 更新数据流、信任边界和威胁模型。
- 威胁 MUST 有唯一 ID、资产、攻击路径、影响、控制措施和验证证据。

### 5.3 Identity and Access

- 所有受保护资源 MUST 在服务端执行身份和权限检查。
- 资源访问 MUST 同时验证主体权限与资源归属。
- 管理员、高风险操作和敏感数据访问 SHOULD 使用增强认证。
- 权限撤销 MUST 在规定的会话/令牌有效窗口内生效。
- 未知身份、过期凭据、无效签名和未授权访问 MUST 拒绝。

### 5.4 Secrets and Cryptography

- 密钥、密码、Token、私钥 MUST NOT 写入源代码、日志、文档、测试快照或提交历史。
- 生产密钥 MUST 与开发、测试密钥隔离。
- 密钥 MUST 有责任人、用途、环境、轮换策略和撤销流程。
- 密码 MUST 使用专用密码哈希方案存储，不得明文或可逆加密存储。
- 加密算法、模式和参数 MUST 使用当前受支持的安全配置。

### 5.5 Data Protection

- 数据 MUST 分类并定义访问、传输、存储、保留和删除策略。
- 敏感数据 MUST 采用传输加密和适当的静态加密保护。
- 生产数据不得未经授权复制到开发或测试环境。
- 日志、分析、导出和错误消息 MUST 避免暴露敏感数据。
- 数据删除 MUST 覆盖适用的副本、缓存和备份生命周期策略。

### 5.6 Application and API Security

- 所有输入 MUST 在服务端按类型、长度、格式、范围和业务语义校验。
- SQL、命令、模板、路径、HTML、URL 等上下文 MUST 使用安全 API 和上下文适配的编码/参数化处理。
- CORS、CSRF、CSP、Cookie、安全响应头和速率限制 MUST 根据应用风险配置。
- SSRF 防护 MUST 控制目标协议、主机、端口、DNS 解析结果、重定向和内网地址访问。
- Webhook MUST 验证签名、时间戳、事件来源和重放保护。

### 5.7 Supply Chain

- 生产构建 MUST 可追踪依赖、构建来源和产物。
- 依赖 MUST 执行漏洞、许可证和来源检查。
- 关键构建 MUST 生成 SBOM。
- 依赖漏洞 MUST 有风险分级、修复期限和处置记录。
- 未经批准不得引入来源不明、被篡改或无法审计的依赖。

### 5.8 Reliability

- 关键服务 MUST 定义 SLI、SLO、错误预算或等效可靠性目标。
- 外部调用 MUST 设置超时、取消、重试边界和熔断/隔离策略。
- 重试 MUST 具备幂等或明确的重复副作用防护。
- 关键任务 MUST 可观测、可恢复、可追踪。
- 系统 MUST 避免级联故障和无界资源消耗。

### 5.9 Backup and Recovery

- 关键数据 MUST 有备份策略、恢复目标和恢复责任人。
- 备份 MUST 保护机密性、完整性和可用性。
- 恢复 MUST 通过实际演练验证，不能仅以「备份任务成功」作为恢复成功证据。
- RPO、RTO MUST 由业务影响分析确定并经责任人批准。

### 5.10 Incident Response

- 安全事件 MUST 记录检测时间、影响资产、影响范围、处置动作和证据。
- 事件 MUST 分级、升级、遏制、根因分析、修复和复盘。
- 事件处置 MUST 保留必要审计证据。
- 安全事件不得通过删除日志、覆盖证据或静默修改记录来处理。

### 5.11 Financial and Payment Security

- 资金操作 MUST 以服务端订单和账本记录为可信依据。
- 支付回调 MUST 验签、核对商户、订单、金额、币种和支付状态。
- 充值到账 MUST 由服务端确认支付成功后执行，并保证幂等。
- 重复通知、乱序通知、延迟通知、主动查询和对账 MUST 有明确处理规则。
- 不得以客户端跳转成功页面作为到账依据。
- 生产支付密钥、真实商户配置和生产账本 MUST 受严格权限控制。

## 6. Security Risk Levels

- **S0**：无实质安全影响。
- **S1**：低影响、局部风险。
- **S2**：中等影响，需要计划修复。
- **S3**：高影响，必须限制发布或立即修复。
- **S4**：严重影响，必须阻断发布/操作并启动事件流程。

安全风险等级 S0–S4 是 P10 风险分级，不替代 P01 的 R0–R4 AI 执行风险等级，也不替代 CVSS 分数。

## 7. Prohibited Practices

- 明文存储密码或生产密钥。
- 仅依赖前端进行授权。
- 未验证签名即处理支付或 Webhook。
- 使用不受控 URL 抓取用户提供的地址。
- 将异常吞掉并返回成功。
- 以关闭安全检查、扫描器或审计日志来绕过 Gate。
- 将未验证的漏洞标记为已修复。
- 在未授权情况下进行生产渗透、破坏性测试或恢复操作。

## 8. AI Execution Rules

AI MUST：

1. 先读取适用的 P01、P04、P06、P08、P09、P11 规则。
2. 明确任务授权、工作区和环境边界。
3. 识别敏感数据、密钥、生产配置和不可逆操作。
4. 变更安全控制前进行影响分析。
5. 使用隔离测试数据和非生产凭据。
6. 对安全修复运行针对性测试和回归测试。
7. 提供修改文件、风险、测试命令、结果和未解决问题。
8. 不得声称扫描、测试、修复或验证成功，除非实际执行并取得证据。

AI MUST NOT：

- 读取、导出或打印无关生产密钥。
- 擅自更换生产凭据。
- 执行未经授权的攻击性测试。
- 修改生产数据库、生产环境或真实支付配置。
- 把漏洞扫描无发现等同于系统绝对安全。

## 9. Verification

所有 P10 控制必须映射到：

- Security Requirement ID
- Threat ID
- Control ID
- Test Case ID
- Evidence ID
- Owner
- Status

状态包括 PASS、FAIL、BLOCKED、NOT_RUN、NOT_APPLICABLE、NOT_VERIFIED。

NOT_RUN、NOT_VERIFIED 不得作为 PASS。

## 10. Acceptance Criteria

P10 只有在以下条件全部满足后才能申请正式批准：

- 子标准完成评审。
- Schema 通过实际校验。
- 安全控制清单覆盖关键资产。
- Threat Model 有效且关键威胁有处理结果。
- Gate 工具实现并接入 CI。
- 高风险漏洞处置符合策略。
- 备份恢复演练有证据。
- 事件响应流程经过演练。
- 关键支付和身份流程完成专项验证。
- 例外均有批准和到期时间。

## 11. Exceptions

例外必须符合 P00 Exception Management 和 P01 Human Approval：

- 明确受影响控制；
- 说明业务理由；
- 记录风险和补偿控制；
- 指定责任人；
- 设置失效时间；
- 明确复核和撤销条件。

S4 风险不得通过普通例外流程静默豁免。

## 12. References

- OWASP ASVS 5.0.0
- OWASP Top 10:2025
- NIST SP 800-218 SSDF 1.1
- CISA 2026 SBOM Minimum Elements
- OWASP Cheat Sheet Series
- UAES P00/P01/P04/P06/P08/P09/P11

## 13. Change History

| Version | Status | Change |
| --- | --- | --- |
| 1.0.0 | DRAFT | Initial enterprise security and reliability standard |
