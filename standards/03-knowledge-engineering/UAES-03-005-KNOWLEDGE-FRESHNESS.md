# UAES-03-005 — Knowledge Freshness

| Metadata | Value |
|---|---|
| Standard ID | UAES-03-005 |
| Version | 1.0.0 |
| Status | DRAFT |
| Priority | P0 |
| Owner | Uter Engineering Governance |
| Dependencies | UAES-03 |

## 1. Purpose

识别知识的有效期和失效条件，防止 AI 使用过时的代码结构、依赖版本、部署状态、API 文档和业务规则。

## 2. Freshness Policy

知识至少应记录：

- `created_at`
- `last_verified_at`
- `review_due_at`
- `valid_until`（如适用）
- `invalidation_conditions`
- `source_version`

## 3. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-03-005-M001 | 时效敏感知识 MUST 有复核策略。 |
| UAES-03-005-M002 | 依赖版本 MUST 与版本锁定文件或官方来源核对。 |
| UAES-03-005-M003 | 仓库结构 MUST 绑定 Commit 或快照。 |
| UAES-03-005-M004 | API 和第三方服务文档 MUST 记录版本或访问时间。 |
| UAES-03-005-M005 | 发生重大变更时 MUST 触发相关知识重新验证。 |
| UAES-03-005-M006 | 超过复核期限的知识 MUST 标记为 STALE 或 REVIEW_REQUIRED。 |
| UAES-03-005-M007 | 知识复核失败 MUST 记录原因。 |

## 4. Invalidation Triggers

包括但不限于：

- 默认分支产生影响模块边界的重大提交。
- 依赖版本升级。
- API 版本变更。
- 业务规则变更。
- ADR 被替代。
- 部署架构发生变化。
- 安全事件或漏洞披露。
- 平台支持策略变化。

## 5. Acceptance

构造过期知识、版本变化和来源失效场景，验证系统能够识别并阻止其作为已确认事实被无条件使用。

## 6. Change History

| Version | Change |
|---|---|
| 1.0.0 | Initial draft |
