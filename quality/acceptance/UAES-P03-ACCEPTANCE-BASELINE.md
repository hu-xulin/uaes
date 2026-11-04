# UAES-P03-ACCEPTANCE-BASELINE — Knowledge Engineering Acceptance

## 1. Metadata

| Field | Value |
|---|---|
| Acceptance ID | UAES-P03-ACCEPTANCE-BASELINE |
| Version | 1.0.0 |
| Status | DRAFT |
| Domain | UAES-03 |
| Gate | UAES-03-GATE-001 |

## A. Knowledge Model

- 项目知识具有唯一 ID。
- 知识类型和状态符合 Schema。
- 可信度和敏感级别明确。
- 每条关键知识具有 Owner。
- 知识适用范围明确。

## B. Source and Provenance

- 项目事实可追踪到仓库或项目证据。
- 外部资料有 URL 和访问时间。
- 工具结果具有执行记录。
- 测试结论具有可检查证据。
- 派生知识保留上游来源。
- 不存在虚构引用。

## C. Lifecycle and Freshness

- 知识生命周期状态合法。
- 关键知识具有复核策略。
- 过期知识能够被识别。
- 被替代知识能够追踪到替代项。
- 历史版本和变更记录可查询。

## D. Context Engineering

- 任务能够生成 Context Manifest。
- 上下文与任务目标相关。
- 上下文来源可追踪。
- 上下文预算能够记录。
- 摘要保留关键约束。
- 摘要不会将推断升级为事实。
- 临时任务信息不会自动污染长期记忆。

## E. Conflict Resolution

- 能发现不同来源之间的冲突。
- 冲突具有唯一 ID。
- 冲突具有责任人和影响等级。
- 解决过程具有审批和证据。
- 关键未解决冲突能够阻断相关任务。

## F. Traceability

- 需求能够关联业务规则。
- 业务规则能够关联架构和设计。
- 架构决策能够关联来源和证据。
- 实现能够关联需求和设计。
- 测试能够关联需求和风险。
- 关系断裂能够被检测。

## G. Multi-Agent and Security

- Agent 共享知识时保留来源。
- 子 Agent 不能通过知识共享获得隐含权限。
- 跨项目知识隔离有效。
- 外部提示词注入不能改变治理指令。
- 密钥不能被导入普通知识库。
- 敏感知识访问有审计记录。

## H. Negative Tests

- 重复 Knowledge ID 被拒绝。
- 不存在的 Source ID 被拒绝。
- 无证据的 VERIFIED 知识被拒绝。
- 过期知识被正确识别。
- 冲突知识不能静默覆盖。
- 无授权跨项目读取被拒绝。
- 恶意文档中的越权指令不会被执行。
- 上下文压缩不能删除强制安全约束。
- 断裂引用能够被发现。
- 循环 supersedes 关系能够被发现。

## I. Final Acceptance

P03 的验收必须同时包含：

1. Schema 正向测试。
2. Schema 负向测试。
3. 语义校验器测试。
4. 知识索引一致性测试。
5. 来源追踪测试。
6. 知识过期测试。
7. 冲突解决测试。
8. 上下文压缩测试。
9. 多 Agent 隔离测试。
10. 安全和提示词注入测试。

文档完成不等于知识系统实现完成。未经实际执行的测试必须保持 NOT_RUN。

## Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial draft |
