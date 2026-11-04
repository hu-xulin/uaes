# UAES P6 — AI Agent Engineering Acceptance Baseline

**Acceptance ID:** UAES-P6-ACCEPTANCE-BASELINE  
**Version:** 1.0.0  
**Status:** DRAFT  
**Target:** UAES P6 AI Agent Engineering  
**Phase:** P6  
**Gate:** UAES-08-GATE-001

---

## 1. Acceptance Layers

1. Document Acceptance
2. Schema and Registry Acceptance
3. Runtime and Permission Acceptance
4. Security Acceptance
5. Multi-Agent Acceptance
6. Evaluation and Recovery Acceptance

## 2. Document Acceptance

| ID | Acceptance Item | Expected |
|---|---|---|
| P6-D01 | UAES-08 Main Standard | PASS |
| P6-D02 | UAES-08-001 Identity | PASS |
| P6-D03 | UAES-08-002 Lifecycle | PASS |
| P6-D04 | UAES-08-003 Planning | PASS |
| P6-D05 | UAES-08-004 Tool Registry | PASS |
| P6-D06 | UAES-08-005 Authorization | PASS |
| P6-D07 | UAES-08-006 Context | PASS |
| P6-D08 | UAES-08-007 Orchestration | PASS |
| P6-D09 | UAES-08-008 Handoff | PASS |
| P6-D10 | UAES-08-009 Skills | PASS |
| P6-D11 | UAES-08-010 Evaluation | PASS |
| P6-D12 | UAES-08-011 Security | PASS |
| P6-D13 | UAES-08-012 Recovery | PASS |
| P6-D14 | Gate | PASS |
| P6-D15 | Acceptance Baseline | PASS |
| P6-D16 | Registry and Dependencies | PASS |

## 3. Schema Acceptance

| ID | Item | Pass Criteria |
|---|---|---|
| P6-S01 | Agent Manifest | Valid JSON Schema |
| P6-S02 | Agent Task | Valid JSON Schema |
| P6-S03 | Agent Handoff | Valid JSON Schema |
| P6-S04 | Permission Policy | Valid JSON Schema |
| P6-S05 | Evaluation Report | Valid JSON Schema |

另外必须测试非法输入：

- 缺少必需字段。
- 重复 Agent ID。
- 未知工具 ID。
- 非法状态转换。
- 未声明的权限动作。
- 不合法 Handoff。
- 未授权的环境目标。

## 4. Runtime Acceptance

必须证明：

- Agent 可以正确加载 Manifest。
- 未注册 Agent 无法进入正式运行状态。
- 未注册工具不能被调用。
- 默认拒绝策略有效。
- 文件系统和网络边界有效。
- 审批拒绝可以阻止执行。
- 权限变化可以被及时识别。
- Agent 不能修改自己的权限。
- 委派不会扩大权限。

## 5. Multi-Agent Acceptance

至少完成：

1. Orchestrator 创建任务。
2. Orchestrator 分解子任务。
3. 多个 Agent 按依赖执行。
4. Agent 完成结构化 Handoff。
5. 接收 Agent 验证交接产物。
6. 发生冲突时进入冲突处理。
7. 某个子任务失败时正确影响整体状态。
8. 最终结果由独立验证环节确认。

## 6. Security Acceptance

必须覆盖：

- Direct Prompt Injection
- Indirect Prompt Injection
- Malicious Repository Content
- Tool Output Injection
- Unauthorized File Access
- Unauthorized Shell Execution
- Network Exfiltration
- Credential Exposure
- MCP Permission Abuse
- Cross-Agent Privilege Escalation
- Memory Poisoning
- Infinite Loop and Resource Exhaustion

## 7. Recovery Acceptance

必须验证：

- 模型超时。
- 工具超时。
- 网络中断。
- 上下文丢失。
- Workspace 失败。
- Agent 崩溃。
- Handoff 失败。
- 权限被撤销。
- 用户取消。
- 外部操作结果未知。

## 8. Evaluation Acceptance

必须记录：

- Agent Version
- Task Dataset Version
- Evaluation Metrics
- Success / Failure
- Policy Violations
- Tool Errors
- Recovery Results
- Human Review
- Final Decision

## 9. Uter Workflow Acceptance

至少验证一条完整的软件工程工作流：

1. 用户提交任务。
2. Orchestrator 识别需求。
3. Product / Architecture Agent 分析影响。
4. Coding Agent 在隔离工作区修改代码。
5. Review Agent 独立检查。
6. Test Agent 执行测试。
7. Security Agent 检查安全影响。
8. Orchestrator 汇总结果。
9. Delivery Agent 生成交付材料或 PR。
10. 人类按授权边界执行最终审批。

必须验证：

- 未授权修改被阻止。
- 测试失败不会被报告为通过。
- 用户未提交的本地修改不被覆盖。
- PR 不会自动合并。
- 不会自动部署。
- 生产数据库和真实支付配置不会被修改。

## 10. Acceptance Result

结果只能为：

- PASS
- FAIL
- BLOCKED
- NOT_RUN
- NOT_APPLICABLE
- NOT_VERIFIED

## 11. Final Acceptance

P6 正式通过必须满足：

- 所有 P0 文档项 PASS。
- 所有 Schema 校验 PASS。
- 权限执行层通过正向和负向测试。
- 安全测试无未解决的 BLOCKER。
- Multi-Agent Handoff 正常。
- Agent Trace 完整。
- Recovery 测试通过。
- Uter 端到端 Agent Workflow 通过。
- 高风险例外得到正式审批。

## 12. Current Status

当前文档状态为 DRAFT。

本文件不代表：

- Agent Runtime 已实现。
- Registry 已部署。
- 权限策略已经在执行层强制执行。
- Schema 已实际运行校验。
- Multi-Agent 已通过真实工作流测试。
- Prompt Injection 测试已经通过。
- 生产环境已接入 Agent。

以上均须在工程化实施阶段单独验证。
