# UAES-P08-ACCEPTANCE-BASELINE — Agent Engineering Acceptance Baseline

| Field | Value |
|---|---|
| Baseline ID | UAES-P08-ACCEPTANCE-BASELINE |
| Version | 1.0.0 |
| Status | DRAFT |
| Domain | UAES-08 |

## A. Agent Identity and Governance

- Agent ID 唯一。
- Agent Definition 与 Instance 分离。
- Role、Owner 和任务范围明确。
- 生命周期状态明确。
- 授权与能力声明分离。
- Agent 暂停和撤销能够生效。
- Agent 生命周期可审计。

## B. Agent Manifest and Registry

- Agent Manifest Schema 完整。
- Agent Registry 已建立。
- Skill 引用有效。
- Tool 引用有效。
- 模型和 Runtime 信息明确。
- 版本和依赖可追踪。
- 非法权限声明能够被拒绝。

## C. Skill Engineering

- Skill ID 唯一。
- 输入输出契约完整。
- 依赖明确。
- 副作用声明完整。
- 版本固定。
- 失败和重试行为明确。
- Skill 独立测试通过。
- 外部 Skill 来源经过评估。
- Skill 不得扩大 Agent 权限。

## D. Tool and MCP

- Tool Manifest 完整。
- 输入参数验证有效。
- 输出契约明确。
- 副作用等级明确。
- 工具授权有效。
- 超时和重试策略明确。
- MCP Server 来源可验证。
- 外部工具返回值按不可信数据处理。
- 敏感凭证受到保护。
- 高风险工具执行符合 P01 审批要求。

## E. Task Planning

- Task ID 唯一。
- 任务目标明确。
- 范围和排除范围明确。
- 任务风险得到识别。
- 完成条件可验证。
- 子任务依赖完整。
- 关键路径和阻塞项明确。
- 计划变化可追踪。
- 任务分配没有扩大权限。

## F. Routing and Handoff

- Agent 能力匹配有效。
- 目标 Agent 状态有效。
- 委派上下文完整且最小化。
- Handoff Contract 完整。
- 授权引用有效。
- 子 Agent 不得扩大权限。
- 委派责任链完整。
- 循环委派得到阻止。
- 结果经过独立检查。

## G. Multi-Agent Orchestration

- Orchestrator 明确。
- Agent 责任边界明确。
- 任务依赖图有效。
- 并行资源冲突可检测。
- 文件写入冲突受控。
- 失败传播策略明确。
- 汇总结果经过一致性检查。
- 重复副作用受控。
- 并发数量和资源预算受限。

## H. Context Engineering

- Context Manifest 完整。
- 知识来源可追踪。
- 事实与推断区分。
- 过期知识可识别。
- 冲突知识可识别。
- 敏感上下文最小化。
- 上下文预算明确。
- 压缩不丢失关键约束。
- 跨项目上下文隔离。

## I. Workspace Isolation

- 执行前检查 Git Status。
- 用户未提交修改得到保护。
- 并行任务具备独立工作区。
- 文件写入范围明确。
- 测试资源与生产资源隔离。
- Workspace 可追踪。
- 重要修改可恢复。
- 清理前检查成果完整性。

## J. Execution State and Recovery

- 任务状态机明确。
- 状态转换合法。
- 任务状态和质量状态分离。
- 超时策略明确。
- 重试次数受限。
- 幂等性得到验证。
- 外部副作用可核实。
- 取消行为明确。
- 恢复前重新验证授权。
- 中断后可安全恢复。

## K. Memory

- Working Memory 和长期记忆分离。
- 记忆来源明确。
- 记忆可信度明确。
- 记忆有效期或复核条件明确。
- 敏感信息最小化。
- 项目间隔离有效。
- 检查点与真实状态一致。
- 记忆冲突可以修正。

## L. Security

- 外部内容默认不可信。
- 指令与数据分离。
- 授权边界不可被注入覆盖。
- 工具访问受控。
- 文件系统访问受控。
- Shell 和代码执行隔离。
- 密钥不会外泄。
- 高风险副作用有审批。
- 安全异常可审计。

## M. Evaluation

- Agent Evaluation Profile 完整。
- 代表性任务集建立。
- 正常场景覆盖。
- 边界场景覆盖。
- 失败场景覆盖。
- 提示词注入场景覆盖。
- 工具调用准确性评估。
- 任务完成质量评估。
- 模型和 Skill 变更执行回归。
- 自动评分与人工评分区分。

## N. Observability and Audit

- Trace ID 完整。
- Task / Agent / Tool 关联完整。
- 关键状态转换可追踪。
- 工具调用可追踪。
- 授权记录可关联。
- 失败和重试有记录。
- 敏感数据过滤有效。
- 审计日志完整性得到保护。
- 执行报告可以追溯到底层证据。

## O. Negative Tests

必须验证：

1. 未登记 Agent 尝试执行受控任务。
2. Agent 通过 Manifest 自行增加权限。
3. 子 Agent 通过委派绕过父 Agent 授权。
4. Skill 隐式增加高风险 Tool。
5. MCP 返回内容诱导泄露密钥。
6. Tool 超时后重复执行不可幂等写入。
7. Agent 之间循环委派。
8. 多 Agent 同时覆盖同一文件。
9. Context 将其他项目的敏感数据加载进来。
10. Agent 记忆覆盖当前用户明确指令。
11. 任务中断后使用已撤销授权恢复。
12. Workspace 清理覆盖用户未提交修改。
13. Orchestrator 忽略失败的关键子任务。
14. Agent 将未验证结果报告为 PASS。
15. 审计日志包含明文凭证。
16. Agent 无法提供执行证据却声称任务已完成。

## P. Final Acceptance

P08 转为 APPROVED 必须满足：

- 全部标准文档完成审查。
- 四份 Schema 验证通过。
- Agent、Skill、Tool Registry Validator 已实现。
- P01 授权系统集成通过。
- P03 Context Manifest 集成通过。
- Workspace Isolation 测试通过。
- Task State 和 Recovery 测试通过。
- Prompt Injection 负面测试通过。
- Agent Evaluation Harness 已建立。
- Agent Observability 和 Audit 能够检索证据。
- Gate 已实现并完成试运行。
- AI 实战任务通过。
- 所有阻断问题关闭或正式豁免。
- Agent Engineering Owner 批准。

## Q. Current Status

| 项目 | 状态 |
|---|---|
| P08 标准文档 | 已交付 |
| Agent Manifest Schema | 已提供，未验证 |
| Skill Manifest Schema | 已提供，未验证 |
| Tool Manifest Schema | 已提供，未验证 |
| Agent Task Schema | 已提供，未验证 |
| Agent Registry Validator | 未实现 |
| Skill Validator | 未实现 |
| Tool Policy Validator | 未实现 |
| Orchestration Engine | 未实现 |
| Workspace Isolation Engine | 未实现 |
| Agent Evaluation Harness | 未实现 |
| Agent Quality Gate | 已定义，未实现 |
| CI / Runtime 集成 | 未执行 |
| AI 实战验收 | 未执行 |
| 正式批准 | 未批准 |

结论：P08 标准设计交付完成；运行时实现、Schema 校验、自动化 Gate 和 Agent 实战验收尚未完成。
