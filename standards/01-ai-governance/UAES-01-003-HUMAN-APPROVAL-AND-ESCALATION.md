# UAES-01-003 — Human Approval & Escalation Standard

| Metadata | Value |
|---|---|
| Standard ID | UAES-01-003 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-01, UAES-01-002 |

## 1. Purpose

定义 AI 执行任务中的审批点、人工确认条件、升级机制和审批记录。

## 2. Approval Classes

| Class | Scenario | Approval |
|---|---|---|
| A0 | 普通读取、分析、文档生成 | 无需额外审批，但仍受任务范围约束 |
| A1 | 授权范围内的代码修改和测试 | 按既有任务授权 |
| A2 | 独立分支 Commit、Push、创建 PR | 必须满足对应工程授权和验证条件 |
| A3 | 删除重要数据、改变安全策略、改变权限体系 | 明确人工审批 |
| A4 | 生产部署、生产数据库修改、真实支付配置修改 | 独立的明确授权和专项审批；当前默认禁止 |

## 3. Mandatory Approval Rules

### UAES-APP-001 — Approval Before Execution

- 需要审批的操作必须在执行前获得批准。

### UAES-APP-002 — Exact Action Approval

- 审批必须明确操作对象、动作、环境和范围。
- 批准修改测试配置不代表批准修改生产配置。

### UAES-APP-003 — No Approval by Silence

- 沉默、超时、未回复或未拒绝均不得视为批准。

### UAES-APP-004 — No Approval Fabrication

- AI 不得生成虚假的用户确认、审批人或审批时间。

### UAES-APP-005 — Approval Expiration

- 审批必须绑定任务和有效期。任务范围变化后应重新确认审批是否仍然适用。

## 4. Approval Request Format

每个审批请求必须包含：

- Approval ID。
- Task ID。
- Requester。
- Requested Action。
- Target Resource。
- Environment。
- Risk Level。
- Business Reason。
- Expected Impact。
- Reversibility。
- Verification Plan。
- Rollback Plan。
- Approval Expiration。

## 5. Escalation Triggers

出现以下情况时必须升级：

- 权限与任务描述冲突。
- 需求存在影响资金或安全的歧义。
- 发现生产环境影响。
- 需要读取敏感凭据。
- 数据迁移可能导致数据丢失。
- 测试发现资金、身份或权限缺陷。
- Agent 无法验证执行结果。
- 多个标准之间存在不可消解的冲突。

## 6. Stop Conditions

必须停止相关操作并报告：

1. 授权不足。
2. 审批未完成。
3. 目标资源无法确认。
4. 风险超出授权等级。
5. 执行结果与预期不一致。
6. 出现未预期的数据或生产影响。
7. 验证失败且继续操作可能扩大损害。

停止不等于丢弃已有成果。应保留安全的工作状态和证据。

## 7. Approval Audit

审批记录必须关联：

- 原始请求。
- 实际审批主体。
- 批准的操作范围。
- 时间。
- 任务。
- 执行结果。
- 偏离情况。

## 8. Acceptance Criteria

- 审批级别可判断。
- 需要审批的操作能够阻断。
- 未审批不得执行。
- 审批不可跨任务无限复用。
- 审批范围变化能够触发重新评估。
- 升级和停止事件可以审计。

## 9. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial release |
