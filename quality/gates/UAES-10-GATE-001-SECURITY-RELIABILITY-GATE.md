# UAES-10-GATE-001 — Security & Reliability Gate

| Field | Value |
| --- | --- |
| Gate ID | UAES-10-GATE-001 |
| Version | 1.0.0 |
| Status | DRAFT |
| Scope | Uter 全部生产相关代码、API、依赖、数据和运行环境 |

## 1. Gate Outcomes

- **PASS**：所有适用强制项通过，证据完整。
- **FAIL**：发现未满足的强制控制。
- **BLOCKED**：缺少授权、环境、证据或必要前置条件。
- **NOT_RUN**：未执行。
- **NOT_APPLICABLE**：经说明确认不适用。
- **NOT_VERIFIED**：执行了部分检查但不能形成可靠结论。

NOT_RUN、NOT_VERIFIED 不得计入 PASS。

## 2. Blocking Conditions

以下情况必须阻断对应发布或操作：

- S4 漏洞未遏制；
- S3 漏洞无批准处置方案；
- 认证或授权存在可利用绕过；
- 生产密钥泄漏或疑似泄漏未处置；
- 支付验签、金额核对、幂等到账存在缺陷；
- 关键数据存在未控制的泄露风险；
- 构建产物完整性无法确认；
- 关键恢复能力缺失且业务风险不可接受；
- 安全测试未获授权却尝试访问生产或第三方目标。

## 3. Gate Checklist

### A. Governance and Scope

- P10-001：安全责任人和资产 Owner 已明确。
- P10-002：变更范围和环境已明确。
- P10-003：适用安全标准和控制已映射。
- P10-004：例外均有有效审批和到期时间。

### B. Threat Modeling

- P10-005：关键资产和数据流已登记。
- P10-006：信任边界已识别。
- P10-007：关键威胁已分析。
- P10-008：S3/S4 威胁有已验证控制或有效阻断。

### C. Identity and Access

- P10-009：受保护 API 均有服务端认证策略。
- P10-010：资源授权和资源归属验证已覆盖。
- P10-011：跨用户、跨租户和管理员越权测试通过。
- P10-012：会话、Token 撤销和过期策略通过测试。

### D. Secrets and Data

- P10-013：Secret Scanner 无未处理的高风险发现。
- P10-014：生产和非生产凭据隔离。
- P10-015：日志脱敏和敏感数据访问控制通过。
- P10-016：数据分类、保留、删除和备份策略明确。

### E. Application and API

- P10-017：输入校验和输出编码通过。
- P10-018：SQL/命令/路径/模板注入测试通过。
- P10-019：SSRF、文件上传和下载控制通过。
- P10-020：CORS、CSRF、安全响应头和速率限制符合策略。
- P10-021：Webhook 验签、重放和幂等测试通过。

### F. Runtime and Platform

- P10-022：Go 服务端安全配置已验证。
- P10-023：React/Web/H5 不存在已知危险渲染或凭据暴露问题。
- P10-024：Electron IPC、Preload、Renderer 隔离通过。
- P10-025：数据库、Redis 和管理面板访问范围受控。

### G. Supply Chain

- P10-026：所有 Go Modules 均纳入漏洞扫描。
- P10-027：Web/Bun 和 Electron 依赖均纳入扫描。
- P10-028：锁文件和依赖来源检查通过。
- P10-029：关键构建生成 SBOM。
- P10-030：构建产物与 Commit SHA 可追踪。

### H. Cryptography

- P10-031：未使用自制密码算法或不安全随机源。
- P10-032：加密密钥有隔离、轮换和撤销策略。
- P10-033：签名和完整性校验测试通过。

### I. Vulnerability Management

- P10-034：漏洞有等级、Owner、期限和状态。
- P10-035：S3/S4 漏洞均有处置证据。
- P10-036：修复后执行专项和回归测试。
- P10-037：扫描工具、版本、范围和数据库更新时间已记录。

### J. Reliability

- P10-038：关键服务定义 SLI/SLO 或等效目标。
- P10-039：外部调用有超时、重试上限和隔离策略。
- P10-040：关键操作具备幂等、并发和异常恢复机制。
- P10-041：关键后台任务可观测、可恢复。
- P10-042：资源限制和降级策略明确。

### K. Backup and Recovery

- P10-043：关键数据定义 RPO/RTO。
- P10-044：备份完整性和访问控制已验证。
- P10-045：恢复演练有实际结果和证据。
- P10-046：恢复后关键业务数据一致性已验证。

### L. Incident Response

- P10-047：安全事件分级和升级机制明确。
- P10-048：事件证据保全机制明确。
- P10-049：凭据泄漏和系统隔离操作手册可用。
- P10-050：事件响应桌面演练已完成。

### M. Financial and Payment

- P10-051：支付回调验签通过。
- P10-052：订单、金额、币种和商户核对通过。
- P10-053：重复、并发、乱序通知不会重复入账。
- P10-054：支付成功与余额入账状态分离且可追踪。
- P10-055：主动查询、对账和异常恢复已验证。
- P10-056：生产支付密钥和账本权限受控。

### N. Evidence and Reporting

- P10-057：每项检查有状态和证据引用。
- P10-058：扫描结果关联固定 Commit SHA。
- P10-059：未运行项目未被标记 PASS。
- P10-060：未解决风险、例外和限制已披露。

## 4. Required Evidence

Gate 报告必须至少包含：

- Commit SHA；
- Branch；
- Environment；
- Tool Name / Version；
- Scan Scope；
- Start / End Time；
- Findings；
- Severity；
- Evidence Reference；
- Remediation Status；
- Residual Risk；
- Gate Result。

## 5. Final Decision

任何强制阻断项 FAIL，整体不得 PASS。任何关键项 NOT_RUN 或 NOT_VERIFIED，整体最多为 BLOCKED。所有 NOT_APPLICABLE 项必须有理由和审核记录。

Gate PASS 仅表示本次指定范围、指定 Commit 和指定环境通过了所执行的检查，不代表系统不存在未知漏洞。
