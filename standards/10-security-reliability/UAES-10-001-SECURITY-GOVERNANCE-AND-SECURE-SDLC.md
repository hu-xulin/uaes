# UAES-10-001 — Security Governance and Secure SDLC

| Field | Value |
| --- | --- |
| ID | UAES-10-001 |
| Version | 1.0.0 |
| Status | DRAFT |

## 1. Purpose

建立安全治理责任、资产安全基线和 Secure SDLC 工作机制。

## 2. Mandatory Requirements

### 2.1 Security Ownership

每个重要系统资产 MUST 定义：

- Asset ID
- Asset Name
- Business Owner
- Technical Owner
- Data Classification
- Environment
- Criticality
- Security Requirements
- Recovery Requirements
- Review Date

资产至少包括：身份系统、用户数据、Token/额度账本、支付订单、支付回调、API Key、模型供应商凭据、管理接口、数据库、Redis、构建系统和发布产物。

### 2.2 Secure SDLC

安全活动必须嵌入以下阶段：

| 阶段 | 强制安全活动 |
| --- | --- |
| 需求 | 安全需求、数据分类、滥用场景 |
| 设计 | Threat Model、信任边界、权限模型 |
| 开发 | Secure Coding、Secret 检查、依赖检查 |
| Review | 安全敏感代码审查 |
| 测试 | SAST、DAST、依赖扫描、专项安全测试 |
| 构建 | SBOM、产物来源和完整性 |
| 发布 | 风险确认、批准、回滚准备 |
| 运行 | 日志告警、漏洞监控、访问审计 |
| 退役 | 凭据撤销、数据处置、资产清理 |

### 2.3 Security Review Triggers

以下变更 MUST 触发安全评估：

- 新增登录、注册、账户恢复或权限功能；
- 新增管理端、管理员权限或跨用户数据访问；
- 新增支付、充值、退款、余额或账本流程；
- 新增文件上传、下载、导入、导出；
- 新增外部 URL 抓取、Webhook 或第三方集成；
- 新增密钥、Token、证书或加密逻辑；
- 新增数据库迁移、数据导出和数据保留规则；
- 新增 Electron IPC、Node Integration 或本地系统访问能力；
- 新增 Agent Tool、MCP Server 或模型调用权限。

### 2.4 Risk Acceptance

- 风险接受 MUST 由有权限的业务/安全责任人批准。
- 开发者不得单独批准自己引入的 S3/S4 风险。
- AI MUST NOT 批准自身发现或引入的安全风险。
- 风险接受必须设定到期时间和复核日期。

## 3. Prohibited Practices

- 将安全评审推迟到发布后再补。
- 无 Owner 的关键资产进入生产。
- 未完成安全评估的高风险变更直接发布。
- 用「内部系统」「只有管理员使用」作为免除授权和审计的理由。

## 4. Verification

检查资产登记、需求安全字段、威胁模型关联、Review 触发记录、Gate 记录和例外审批。

## 5. Acceptance

所有关键资产均有 Owner、分类、环境和安全要求；安全评审触发规则可自动识别；风险接受记录可追踪。
