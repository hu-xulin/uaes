# UAES-03-004 — Project Memory Lifecycle

| Metadata | Value |
|---|---|
| Standard ID | UAES-03-004 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-03 |

## 1. Purpose

规范项目长期记忆的创建、筛选、更新、验证、归档和废弃。

## 2. Lifecycle

```
CANDIDATE → REVIEWED → ACTIVE → STALE → REVIEW_REQUIRED → ACTIVE / DEPRECATED → ARCHIVED
```

允许在必要时将候选知识标记为 `REJECTED`。

## 3. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-03-004-M001 | 记忆 MUST 有唯一 ID。 |
| UAES-03-004-M002 | 记忆 MUST 具有来源和责任人。 |
| UAES-03-004-M003 | 记忆 MUST 说明适用项目和适用范围。 |
| UAES-03-004-M004 | 记忆 MUST 记录创建和最后验证时间。 |
| UAES-03-004-M005 | 关键记忆 MUST 定义复核条件。 |
| UAES-03-004-M006 | 过期记忆 MUST NOT 被当作当前事实无条件使用。 |
| UAES-03-004-M007 | 被替代的记忆 MUST 指向替代项。 |
| UAES-03-004-M008 | 记忆 MUST NOT 保存不必要的密钥、凭据或个人敏感信息。 |

## 4. Memory Selection

进入长期项目记忆的内容应具有长期价值，例如：

- 已批准的工程约束
- 稳定的技术架构
- 长期有效的用户偏好
- 重要业务规则
- 已确认的工作流程
- 关键决策及其理由

临时日志、单次错误、未经确认的推测和短期任务状态不应自动升级为长期记忆。

## 5. Acceptance

模拟记忆更新、过期、替代和归档，验证引用不会断裂，过期知识不会继续被标记为 ACTIVE。

## 6. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial draft |
