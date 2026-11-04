# UAES-11-004 — Pull Request and Review Lifecycle

**Standard ID:** UAES-11-004
**Standard Name:** Pull Request and Review Lifecycle
**Version:** 1.0.0
**Status:** DRAFT
**Domain:** UAES-11 DevOps & Delivery
**Phase:** P11
**Classification:** Enterprise Engineering Standard

---

## 1. Purpose

规范变更审查、批准和合并。

## 2. Mandatory Requirements

| ID | Requirement |
|---|---|
| UAES-11-004-M001 | 受保护分支变更 MUST 经 PR。 |
| UAES-11-004-M002 | PR MUST 描述目的、范围、风险和验证结果。 |
| UAES-11-004-M003 | PR MUST 关联需求、任务或缺陷。 |
| UAES-11-004-M004 | PR MUST 等待必需的 CI 检查完成。 |
| UAES-11-004-M005 | 审查意见 MUST 有处理结果。 |
| UAES-11-004-M006 | 关键风险变更 MUST 由适格审查人批准。 |
| UAES-11-004-M007 | 变更后必须重新执行受影响的检查。 |
| UAES-11-004-M008 | PR 的批准、合并和发布状态 MUST 分开记录。 |
| UAES-11-004-M009 | 禁止通过关闭 PR 伪装为已合并。 |
| UAES-11-004-M010 | 合并策略 MUST 与分支保护规则一致。 |

## 3. Verification

检查 PR Template、Review 状态、Required Checks、Dismissal 和 Merge Policy。

## 4. Change History

| Version | Status | Change |
|---|---|---|
| 1.0.0 | DRAFT | Initial standard |
