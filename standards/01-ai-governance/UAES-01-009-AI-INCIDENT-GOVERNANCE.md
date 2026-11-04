# UAES-01-009 — AI Incident Governance Standard

| Metadata | Value |
|---|---|
| Standard ID | UAES-01-009 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-01, UAES-01-004, UAES-01-007 |

## 1. Purpose

建立 AI 相关安全、权限、数据和执行事故的识别、报告、遏制、调查、恢复和复盘机制。

## 2. Incident Categories

| Category | Examples |
|---|---|
| AUTHORITY_VIOLATION | 未授权操作、越权委派 |
| DATA_EXPOSURE | 敏感数据泄露 |
| PROMPT_INJECTION | 外部内容诱导执行越权操作 |
| FALSE_REPORT | 虚报测试、提交或部署结果 |
| UNSAFE_CHANGE | AI 生成危险代码或配置 |
| FINANCIAL_IMPACT | 资金、余额、计费错误 |
| PRODUCTION_IMPACT | 生产服务异常 |
| PROVIDER_INCIDENT | 模型供应商事故 |
| TOOL_COMPROMISE | 插件、MCP、工具链异常 |

## 3. Severity

| Severity | Description |
|---|---|
| SEV-1 | 重大生产、安全、资金或敏感数据事故 |
| SEV-2 | 高影响事故，需要立即遏制 |
| SEV-3 | 局部影响，需要及时修复 |
| SEV-4 | 低影响问题或近失事件 |

## 4. Mandatory Rules

### UAES-INC-001 — Immediate Reporting

- 发现疑似越权、敏感数据泄漏、资金错误或生产影响时必须立即报告。

### UAES-INC-002 — Containment

- 优先停止继续产生损害的操作。
- 不得为了完成任务而继续执行可疑操作。

### UAES-INC-003 — Evidence Preservation

- 必须保留必要的日志、时间、任务、工具和变更证据。
- 敏感凭据不得为了保留证据而再次暴露。

### UAES-INC-004 — No Self-Concealment

- 发现 AI 自身执行错误时，不得删除、修改或隐瞒相关审计记录。

### UAES-INC-005 — Human Escalation

- SEV-1/SEV-2 必须立即升级到有权人类责任主体。

### UAES-INC-006 — Recovery Authorization

- 恢复、回滚和补救操作必须遵守对应权限要求。
- 不得因事故发生而默认获得生产操作权限。

## 5. Incident Workflow

```
DETECT
  ↓
CLASSIFY
  ↓
REPORT
  ↓
CONTAIN
  ↓
PRESERVE EVIDENCE
  ↓
INVESTIGATE
  ↓
REMEDIATE
  ↓
VERIFY RECOVERY
  ↓
POSTMORTEM
  ↓
POLICY IMPROVEMENT
```

## 6. Incident Report

必须记录：

- Incident ID。
- Detection Time。
- Reporter。
- Related Task ID。
- Agent / Tool。
- Incident Category。
- Severity。
- Affected Resources。
- Observed Impact。
- Containment Actions。
- Evidence。
- Root Cause。
- Corrective Actions。
- Recovery Verification。
- Owner。
- Closure Approval。

## 7. Postmortem

SEV-1/SEV-2 必须进行复盘，至少包含：

- 时间线。
- 影响范围。
- 根因。
- 为什么现有控制没有阻止事故。
- 检测是否及时。
- 处置是否有效。
- 长期修复。
- 规则和工具改进。

## 8. Acceptance Criteria

- 事故可分类。
- 高严重度事件能升级。
- 遏制措施可执行。
- 证据得到保护。
- 恢复经过验证。
- 复盘能够转化为工程改进。

## 9. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial release |
