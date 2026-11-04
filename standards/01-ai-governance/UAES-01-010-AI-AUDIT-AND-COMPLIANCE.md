# UAES-01-010 — AI Audit & Compliance Standard

| Metadata | Value |
|---|---|
| Standard ID | UAES-01-010 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-01, UAES-01-006, UAES-01-009 |

## 1. Purpose

建立 AI 工程行为的审计机制，验证 AI 是否遵守标准、任务授权、风险控制和审批要求。

## 2. Audit Scope

审计范围包括：

- Agent 身份。
- 任务输入和范围。
- 权限与审批。
- 工具调用。
- 代码与配置变更。
- 风险评估。
- 测试和质量证据。
- 异常与例外。
- 最终交付结果。

## 3. Mandatory Rules

### UAES-AUD-001 — Auditability

- 重要执行活动必须具有可追踪记录。

### UAES-AUD-002 — Immutable Evidence

- 关键审计证据必须采用能够检测篡改的存储或版本控制机制。

### UAES-AUD-003 — Audit Completeness

- 审计报告必须记录未执行、失败和无法验证的项目。

### UAES-AUD-004 — Independent Review

- R3/R4 相关操作必须具有适当的独立复核。

### UAES-AUD-005 — Retention

- 审计记录保留期限必须依据业务、法律、安全和内部政策确定。
- 不得随意设定与法定要求冲突的期限。

### UAES-AUD-006 — No Compliance Fabrication

- 没有证据不得宣称符合某项标准或通过某项审计。

## 4. Audit Events

至少记录以下事件：

- TASK_CREATED
- AUTHORIZATION_GRANTED
- AUTHORIZATION_DENIED
- APPROVAL_REQUESTED
- APPROVAL_GRANTED
- APPROVAL_REJECTED
- AGENT_DELEGATED
- TOOL_INVOKED
- FILE_MODIFIED
- COMMAND_EXECUTED
- COMMIT_CREATED
- PUSH_COMPLETED
- PR_CREATED
- VERIFICATION_COMPLETED
- GATE_FAILED
- EXCEPTION_GRANTED
- INCIDENT_DETECTED
- TASK_CLOSED

## 5. Audit Record Integrity

每条记录应包含：

- Event ID。
- Event Type。
- Timestamp。
- Actor ID。
- Task ID。
- Resource。
- Action。
- Authorization Reference。
- Result。
- Evidence Reference。

关键事件应采用访问控制、追加式记录和完整性校验。

## 6. Audit Frequency

| Risk | Audit |
|---|---|
| R0/R1 | 按任务或抽样 |
| R2 | 任务结束时 |
| R3 | 执行前及执行后 |
| R4 | 全程受控，必须独立审查 |

## 7. Non-Conformity

发现不符合项时必须记录：

- Finding ID。
- Related Rule。
- Severity。
- Evidence。
- Affected Task。
- Root Cause。
- Corrective Action。
- Owner。
- Due Date。
- Retest Result。

## 8. Acceptance Criteria

- 重要事件可追踪。
- 证据完整。
- 记录具备完整性保护。
- 审计报告真实。
- 不符合项有修复和复验记录。

## 9. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial release |
