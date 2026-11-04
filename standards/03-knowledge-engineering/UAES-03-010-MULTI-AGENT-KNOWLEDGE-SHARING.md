# UAES-03-010 — Multi-Agent Knowledge Sharing

| Metadata | Value |
|---|---|
| Standard ID | UAES-03-010 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-03, UAES-01 |

## 1. Purpose

规范多个 Agent 之间的知识共享、任务交接、数据隔离和知识回传。

## 2. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-03-010-M001 | 共享知识 MUST 标记来源 Agent。 |
| UAES-03-010-M002 | 共享范围 MUST 符合 P01 授权。 |
| UAES-03-010-M003 | 接收 Agent MUST 能识别知识的来源和可信度。 |
| UAES-03-010-M004 | 子 Agent MUST NOT 将未经验证的推断升级为项目事实。 |
| UAES-03-010-M005 | 不同项目或客户的受限知识 MUST 隔离。 |
| UAES-03-010-M006 | 任务交接 MUST 包含目标、约束、已完成事项、未完成事项和证据。 |
| UAES-03-010-M007 | Agent 之间 MUST NOT 通过知识共享传递隐含权限。 |
| UAES-03-010-M008 | 共享知识 MUST 保留版本和时间信息。 |

## 3. Handoff Contract

至少包括：

- Parent Task ID
- Child Task ID
- Sender Agent
- Receiver Agent
- Knowledge References
- Verified Findings
- Unverified Findings
- Open Questions
- Restrictions
- Expected Output
- Handoff Timestamp

## 4. Acceptance

通过跨 Agent 错误信息传播、权限越权传播和不同项目知识混用测试。

## 5. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial draft |
