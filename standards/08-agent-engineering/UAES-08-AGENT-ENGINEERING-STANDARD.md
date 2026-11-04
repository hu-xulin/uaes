# UAES-08 — Agent Engineering Standard

| Metadata | Value |
|---|---|
| Standard ID | UAES-08 |
| Version | 1.0.0 |
| Status | DRAFT |
| Domain | Agent Engineering |
| Owner | Agent Engineering Owner |
| Dependencies | UAES-00, UAES-01, UAES-02, UAES-03, UAES-04, UAES-06 |
| Related Domains | UAES-07, UAES-09, UAES-10, UAES-11, UAES-12 |

## 1. Purpose

建立统一、可审计、可验证、可恢复的 Agent 工程体系，使不同 AI 工具能够在统一治理框架下执行工程任务。

## 2. Scope

适用于：

- 单 Agent 执行。
- 多 Agent 协作。
- Coding Agent。
- Review Agent。
- Testing Agent。
- Research Agent。
- Architecture Agent。
- Product Agent。
- Documentation Agent。
- 自定义 Agent、Skills、Tools、MCP 和 Plugin。

## 3. Definitions

- Agent：具有明确身份、职责、上下文和执行能力的 AI 执行主体。
- Agent Manifest：Agent 的机器可读身份和配置定义。
- Skill：可复用、具有明确输入输出和执行约束的能力单元。
- Tool：Agent 可调用的外部或内部操作接口。
- MCP：Model Context Protocol 工具与上下文连接机制。
- Orchestrator：负责任务分解、路由、调度和汇总的协调主体。
- Handoff：Agent 间的任务交接。
- Workspace：Agent 执行任务的隔离工作环境。
- Execution State：Agent 任务执行状态。
- Agent Evaluation：对 Agent 行为、结果和证据进行系统化评估。

## 4. Core Principles

1. Identity First：每个 Agent 必须具有明确身份。
2. Least Privilege：权限由 P01 授权治理决定。
3. Contract First：Agent、Skill 和 Tool 必须具有明确契约。
4. Context Provenance：上下文必须能够追溯来源。
5. Isolated Execution：并行任务必须具备合理隔离。
6. Deterministic Orchestration：任务调度和状态转换必须可追踪。
7. Controlled Delegation：委派不得扩大权限。
8. Recoverability：执行失败必须能够安全恢复。
9. Evidence-based Completion：完成声明必须具有验证证据。
10. Provider Independence：Agent 工程不得绑定单一 AI 工具。
11. Human Accountability：高风险决策遵循 P01 人工监督和审批要求。

## 5. Mandatory Requirements

- UAES-08 MUST 为每个 Agent 分配唯一 Agent ID。
- UAES-08 MUST 为 Agent 定义角色、职责和任务范围。
- UAES-08 MUST 使用 Agent Manifest 登记 Agent。
- UAES-08 MUST 为 Skill 定义输入、输出、依赖和失败行为。
- UAES-08 MUST 为 Tool 定义参数、权限、错误和副作用。
- UAES-08 MUST 对 MCP 和第三方工具执行来源与权限检查。
- UAES-08 MUST 对任务执行进行规划和状态跟踪。
- UAES-08 MUST 为委派任务传递必要上下文和约束。
- UAES-08 MUST 防止子 Agent 权限超过父 Agent 的有效授权。
- UAES-08 MUST 为并行执行提供文件和资源隔离。
- UAES-08 MUST 定义超时、重试、取消和恢复行为。
- UAES-08 MUST 区分任务状态与验证状态。
- UAES-08 MUST 记录关键工具调用和任务交接。
- UAES-08 MUST 对 Agent 执行结果进行评估。
- UAES-08 MUST 防止外部内容通过提示词注入改变授权边界。
- UAES-08 MUST 为关键执行行为保留审计证据。

## 6. Implementation Rules

Agent 工程分为：

- Identity：身份、角色和生命周期。
- Manifest：机器可读配置。
- Skills：可复用能力。
- Tools：外部执行接口。
- Planner：任务分析和分解。
- Router：Agent 选择和任务路由。
- Orchestrator：多 Agent 协调。
- Context Manager：上下文装配和预算。
- Workspace Manager：执行隔离。
- Execution Engine：任务状态和恢复。
- Memory Manager：记忆管理。
- Safety Layer：工具安全和注入防护。
- Evaluator：执行结果评估。
- Observability：日志、追踪和审计。

## 7. Prohibited Practices

- MUST NOT 将模型名称当作 Agent 身份。
- MUST NOT 让 Agent 自行授予自己或子 Agent 权限。
- MUST NOT 允许 Skill 隐式扩大 Agent 权限。
- MUST NOT 将工具返回内容当作授权指令。
- MUST NOT 让多个 Agent 无协调地修改同一工作区。
- MUST NOT 将超时任务直接视为失败或成功而不核对实际副作用。
- MUST NOT 在重试时重复执行不可幂等操作。
- MUST NOT 将未经验证的输出标记为已完成。
- MUST NOT 将不同用户或项目的上下文混合。
- MUST NOT 以隐藏错误、跳过检查或伪造证据获得成功状态。

## 8. AI Execution Rules

AI 必须：

1. 识别当前 Agent 身份。
2. 读取授权和任务约束。
3. 装载必要的项目知识。
4. 制定可追踪的任务计划。
5. 检查 Skill 和 Tool 的可用性及权限。
6. 在授权工作区执行任务。
7. 记录关键状态转换和工具调用。
8. 对委派任务传递完整必要约束。
9. 处理失败、重试和取消。
10. 提供结果、证据和未解决风险。

## 9. Verification

通过 Agent Manifest Validator、Skill Contract Validator、Tool Policy Validator、Workspace Isolation Tests、Orchestration Tests、Agent Evaluation Harness 和 Audit Validator 验证。

## 10. Acceptance Criteria

- Agent 身份唯一。
- Manifest 完整。
- Skill 和 Tool 契约可验证。
- 权限遵循 P01。
- 任务状态可追踪。
- 委派和协作边界明确。
- 工作区隔离有效。
- 失败恢复可验证。
- 上下文来源可追溯。
- 注入防护通过负面测试。
- Agent 评估结果可复现。
- 审计证据完整。

## 11. Exceptions

例外必须依据 UAES-00-005 登记，并遵循 P01 的审批要求。

## 12. References

UAES-00 至 UAES-07、UAES-09、UAES-10、UAES-11；Agent 和 Tool 所使用平台的官方协议与安全文档。

## 13. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial enterprise standard |
