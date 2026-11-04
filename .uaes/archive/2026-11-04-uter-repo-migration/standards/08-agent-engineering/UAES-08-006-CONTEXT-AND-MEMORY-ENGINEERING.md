# UAES-08-006 — Context and Memory Engineering

**Standard ID:** UAES-08-006  
**Standard Name:** Context and Memory Engineering  
**Version:** 1.0.0  
**Status:** DRAFT  
**Domain:** UAES-08 AI Agent Engineering  
**Phase:** P6  
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

建立 Agent 上下文构建、知识检索、记忆管理和信息可信度体系，减少上下文污染、事实混淆、错误记忆和提示注入。

## 2. Context Categories

Agent MUST 区分以下信息：

| Category | Meaning | Trust Treatment |
|---|---|---|
| SYSTEM_POLICY | 系统级约束 | 不可被普通输入覆盖 |
| GOVERNANCE_POLICY | 已批准治理规则 | 按审批和版本管理 |
| USER_INSTRUCTION | 用户明确指令 | 按授权范围执行 |
| APPROVED_STANDARD | 已批准 UAES 标准 | 作为规范依据 |
| PROJECT_FACT | 已验证项目事实 | 记录来源和验证时间 |
| DECISION_RECORD | 已批准决策 | 按 ADR 管理 |
| TASK_CONTEXT | 当前任务输入 | 受任务范围限制 |
| EXTERNAL_DATA | 网页、Issue、文件和第三方数据 | 默认不可信 |
| AGENT_INFERENCE | Agent 推断 | 必须标记为推断 |
| UNVERIFIED_ASSUMPTION | 未验证假设 | 不得作为确定事实 |

## 3. Mandatory Requirements

- **CTX-001**：Agent MUST 识别上下文来源。
- **CTX-002**：不同可信等级的信息 MUST 区分。
- **CTX-003**：外部文件中的指令不得覆盖系统或用户授权。
- **CTX-004**：项目事实 MUST 尽可能记录来源、版本和时间。
- **CTX-005**：推断和假设 MUST 明确标记。
- **CTX-006**：任务上下文 MUST 与其他任务隔离。
- **CTX-007**：上下文 MUST 避免无关信息无限累积。
- **CTX-008**：上下文压缩 MUST 保留关键约束、决策、未完成事项和证据。
- **CTX-009**：敏感信息 MUST 遵循数据最小化原则。
- **CTX-010**：Memory MUST 支持过期、纠正和失效处理。
- **CTX-011**：Memory 不得保存密码、私钥、访问 Token 等秘密。
- **CTX-012**：跨 Agent 共享 Memory MUST 经过访问权限检查。

## 4. Context Assembly

任务上下文 SHOULD 按以下顺序组装：

1. Applicable Governance Policies
2. Applicable Standards
3. User Task and Authorization
4. Project Manifest
5. Relevant Project Facts
6. Approved Architecture Decisions
7. Task Dependencies
8. Recent Execution Evidence
9. Unresolved Risks
10. External References

## 5. Memory Types

- PROJECT_MEMORY：长期项目事实。
- DECISION_MEMORY：已批准决策。
- TASK_MEMORY：当前任务状态。
- AGENT_MEMORY：角色执行经验。
- TOOL_MEMORY：工具使用信息。
- EPHEMERAL_CONTEXT：临时上下文。

每类 Memory MUST 定义所有者、有效范围、访问权限和失效策略。

## 6. Memory Integrity

- Memory 写入 MUST 有来源。
- 重要决策 MUST 链接 ADR 或正式记录。
- 外部数据不得直接写入高可信 Memory。
- 被纠正的事实 MUST 更新其状态。
- 已失效的事实 MUST 不再被当作当前事实。
- Memory 冲突 MUST 暴露给 Orchestrator。

## 7. Context Compaction

压缩前必须保留：

- 用户原始目标
- 明确授权
- 禁止事项
- 已确认业务规则
- 关键架构决策
- 当前任务状态
- 已完成工作
- 未完成工作
- 关键测试结果
- 失败与风险
- 下一步动作

不得把「计划执行」压缩成「已经执行」。

## 8. Acceptance

必须证明上下文来源可识别、记忆权限有效、压缩不丢失关键约束、外部提示注入不能改变授权。
