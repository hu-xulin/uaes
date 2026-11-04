# UAES-01-008 — AI Model & Provider Governance Standard

| Metadata | Value |
|---|---|
| Standard ID | UAES-01-008 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P1 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-01, UAES-01-007 |

## 1. Purpose

管理 Uter 工程体系中使用的 AI 模型、模型供应商、API、Agent 平台和第三方 AI 服务。

## 2. Provider Inventory

所有正式使用的模型或服务应登记：

- Provider ID。
- Provider Name。
- Model ID。
- Model Version。
- Service Type。
- Data Processing Location（已知时）。
- Authentication Method。
- Access Scope。
- Retention Policy（已知时）。
- Training/Data Usage Policy（已知时）。
- Contract / License。
- Risk Classification。
- Owner。
- Approval Status。

## 3. Mandatory Rules

### UAES-MODEL-001 — Approved Provider

- 用于处理 D2/D3 数据的模型供应商必须经过适用的数据、安全和权限评估。

### UAES-MODEL-002 — Provider Change Review

更换模型供应商或模型版本时，必须评估：

- 数据处理方式。
- 数据保留。
- 模型行为差异。
- 工具调用能力。
- 输出可靠性。
- 成本和服务限制。
- 地域和合规影响。

### UAES-MODEL-003 — Model Capability Is Not Authority

- 模型能力不等于执行权限。
- 模型支持浏览器、命令执行或代码修改，不代表它获得相应授权。

### UAES-MODEL-004 — Fallback Governance

- 备用模型必须遵守相同或更严格的任务权限和数据政策。

### UAES-MODEL-005 — Model Version Traceability

- 关键 AI 执行记录应尽可能保存 Provider、Model ID、版本和调用时间。

### UAES-MODEL-006 — Provider Incident

- 供应商发生数据泄露、服务异常、模型行为重大变化或安全事件时，必须评估暂停、切换或限制使用。

## 4. Model Evaluation

根据应用风险评估：

- 指令遵循能力。
- 幻觉和错误率。
- 代码生成质量。
- 工具调用可靠性。
- 安全边界遵循。
- 提示词注入抵抗能力。
- 数据保护能力。
- 任务失败恢复能力。

R3/R4 应用不得只依赖供应商营销资料判定安全。

## 5. Model Retirement

模型停止服务、版本退役或不再符合安全要求时，必须：

- 识别受影响 Agent。
- 更新模型清单。
- 制定迁移计划。
- 验证替代模型。
- 处理历史任务兼容性。
- 撤销不再需要的凭据。

## 6. Acceptance Criteria

- 正式模型有清单。
- 高风险数据有供应商评估。
- 模型变化可追踪。
- 备用模型遵守统一权限。
- 供应商异常有处理机制。
- 模型退役有迁移计划。

## 7. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial release |
