# UAES-03-006 — Context Engineering

| Metadata | Value |
|---|---|
| Standard ID | UAES-03-006 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-03 |

## 1. Purpose

定义任务上下文的选择、排序、压缩、加载、隔离和记录规则，降低无关信息、过时信息和冲突信息对 Agent 执行的干扰。

## 2. Context Layers

1. **Governance Context**：P00/P01 中适用的治理规则。
2. **Project Context**：项目身份和工程事实。
3. **Task Context**：当前任务输入、目标和限制。
4. **Domain Context**：相关领域标准。
5. **Implementation Context**：相关代码、配置和依赖。
6. **Verification Context**：测试和质量证据。

## 3. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-03-006-M001 | 每个重要任务 MUST 形成 Context Manifest。 |
| UAES-03-006-M002 | 上下文 MUST 与任务目标相关。 |
| UAES-03-006-M003 | 高优先级约束 MUST 在压缩时保留。 |
| UAES-03-006-M004 | 上下文摘要 MUST 保留来源引用。 |
| UAES-03-006-M005 | 上下文 MUST 标记不确定信息。 |
| UAES-03-006-M006 | 上下文超预算时 MUST 优先移除低相关、低可信和可重新检索的信息。 |
| UAES-03-006-M007 | 安全、权限、数据保护和资金规则 MUST NOT 因压缩而丢失。 |
| UAES-03-006-M008 | 不同任务的临时上下文 MUST NOT 自动变成共享长期记忆。 |

## 4. Context Manifest

至少包含：

- Task ID
- Project ID
- Agent ID
- Context ID
- Loaded Knowledge IDs
- Source References
- Knowledge Versions
- Excluded Knowledge
- Conflicts
- Token Budget
- Compression Summary
- Created At

## 5. Acceptance

在上下文预算限制下执行任务，验证关键限制、来源和未决问题不会因摘要而丢失。

## 6. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial draft |
