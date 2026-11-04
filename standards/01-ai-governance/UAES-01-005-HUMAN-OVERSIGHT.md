# UAES-01-005 — Human Oversight Standard

| Metadata | Value |
|---|---|
| Standard ID | UAES-01-005 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-01, UAES-01-003, UAES-01-004 |

## 1. Purpose

确保 AI 在重要工程和业务决策中受到适当监督，提供可理解的决策依据、人工介入和停止机制。

## 2. Oversight Modes

| Mode | Description | Applicable |
|---|---|---|
| H0 — Autonomous | 低风险任务自动执行 | R0/R1 |
| H1 — Supervised | 执行过程可检查，关键结果需复核 | R2 |
| H2 — Approval-Gated | 关键操作前需要人工批准 | R3 |
| H3 — Human-Controlled | 人类决定并执行或直接控制 | R4 |

风险等级提高时，监督强度不得降低。

## 3. Mandatory Rules

### UAES-HUM-001 — Oversight Assignment

- 每项 R2 及以上任务必须定义监督模式和责任主体。

### UAES-HUM-002 — Human Decision Boundary

- AI 可以分析和建议，但不得替代需要人类负责的重大业务、法律、财务或安全决策。

### UAES-HUM-003 — Stop Capability

- 监督者必须能够要求 Agent 停止后续执行。

### UAES-HUM-004 — Reviewability

- AI 必须提供足够的输入来源、关键假设、变更范围、风险和验证结果，使人类能够进行有效复核。
- 不要求暴露模型内部隐藏推理过程；应提供可审计的决策摘要和证据。

### UAES-HUM-005 — Override Recording

- 人工覆盖 AI 建议或停止任务时，必须记录最终决定和必要原因。

### UAES-HUM-006 — No Rubber-Stamp Approval

- 不得把没有审查实际风险、范围和证据的点击确认视为有效的高风险审批。

## 4. Human Review Triggers

以下情况必须人工复核：

- R3/R4 风险。
- 资金和账务规则变化。
- 生产数据操作。
- 身份验证和授权体系变化。
- 安全控制策略变化。
- 不可逆数据删除。
- 法律或合规影响。
- 重要架构决策。
- Agent 检测到目标不一致或高不确定性。

## 5. Oversight Evidence

必须保留：

- 监督模式。
- 监督责任主体。
- 审查内容。
- 人工决定。
- 审批时间。
- 相关证据。
- 最终执行状态。

## 6. Acceptance Criteria

- R2+ 任务有监督模式。
- R3/R4 有人工控制点。
- 停止机制可执行。
- 人工决定可追踪。
- 高风险审批不是形式性确认。

## 7. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial release |
